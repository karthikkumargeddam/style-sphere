import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

// Configuration
const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// GraphQL query to fetch all products from Shopify
const PRODUCTS_QUERY = `
  query GetProducts($cursor: String) {
    products(first: 50, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          availableForSale
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
                sku
                availableForSale
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchShopifyProducts() {
  console.log('🔄 Fetching products from Shopify...');

  const allProducts = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const response = await fetch(
      `https://${SHOPIFY_STORE}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: PRODUCTS_QUERY,
          variables: { cursor },
        }),
      }
    );

    const data = await response.json();

    if (data.errors) {
      console.error('❌ Shopify API Error:', data.errors);
      throw new Error('Failed to fetch products from Shopify');
    }

    const products = data.data.products.edges.map(edge => edge.node);
    allProducts.push(...products);

    hasNextPage = data.data.products.pageInfo.hasNextPage;
    cursor = data.data.products.pageInfo.endCursor;

    console.log(`   Fetched ${allProducts.length} products so far...`);
  }

  console.log(`✅ Fetched ${allProducts.length} total products from Shopify`);
  return allProducts;
}

async function syncProductToSupabase(shopifyProduct) {
  // Transform Shopify product to Supabase format
  const product = {
    name: shopifyProduct.title,
    description: shopifyProduct.description || '',
    category: shopifyProduct.productType || 'Uncategorized',
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    original_price: shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount
      ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
      : null,
    image_url: shopifyProduct.images.edges[0]?.node.url || null,
    in_stock: shopifyProduct.availableForSale,
    rating: 0,
    review_count: 0,
    featured: false,
  };

  // Upsert product (insert or update if exists)
  const { data: productData, error: productError } = await supabase
    .from('products')
    .upsert(product, { onConflict: 'name' })
    .select()
    .single();

  if (productError) {
    console.error(`   ❌ Error syncing product "${product.name}":`, productError);
    return null;
  }

  console.log(`   ✅ Synced product: ${product.name}`);

  // Sync variants
  for (const variantEdge of shopifyProduct.variants.edges) {
    const shopifyVariant = variantEdge.node;

    // Extract size and color from selectedOptions
    const sizeOption = shopifyVariant.selectedOptions.find(opt =>
      opt.name.toLowerCase() === 'size'
    );
    const colorOption = shopifyVariant.selectedOptions.find(opt =>
      opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour'
    );

    const variant = {
      product_id: productData.id,
      size: sizeOption?.value || null,
      color: colorOption?.value || null,
      sku: shopifyVariant.sku || null,
      inventory_quantity: shopifyVariant.quantityAvailable || 0,
      price_adjustment: 0,
    };

    await supabase
      .from('product_variants')
      .upsert(variant, { onConflict: 'product_id,size,color' });
  }

  // Sync images
  for (let i = 0; i < shopifyProduct.images.edges.length; i++) {
    const image = shopifyProduct.images.edges[i].node;

    await supabase
      .from('product_images')
      .upsert({
        product_id: productData.id,
        image_url: image.url,
        alt_text: image.altText || product.name,
        position: i,
      }, { onConflict: 'product_id,position' });
  }

  return productData;
}

async function syncAllProducts() {
  console.log('🚀 Starting Shopify → Supabase Product Sync\n');

  // Validate environment variables
  if (!SHOPIFY_STORE || !SHOPIFY_ACCESS_TOKEN) {
    console.error('❌ Missing Shopify credentials!');
    console.error('Please add these to your .env file:');
    console.error('  VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com');
    console.error('  VITE_SHOPIFY_STOREFRONT_TOKEN=your_token');
    process.exit(1);
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Missing Supabase credentials!');
    console.error('Please check your .env file has:');
    console.error('  VITE_SUPABASE_URL=your_supabase_url');
    console.error('  VITE_SUPABASE_ANON_KEY=your_supabase_key');
    process.exit(1);
  }

  console.log(`📍 Shopify Store: ${SHOPIFY_STORE}`);
  console.log(`📍 Supabase URL: ${SUPABASE_URL}\n`);

  try {
    // Fetch products from Shopify
    const shopifyProducts = await fetchShopifyProducts();

    console.log('\n📦 Syncing products to Supabase...');

    let successCount = 0;
    let errorCount = 0;

    for (const product of shopifyProducts) {
      const result = await syncProductToSupabase(product);
      if (result) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    console.log('\n✨ Sync Complete!');
    console.log(`   ✅ Successfully synced: ${successCount} products`);
    if (errorCount > 0) {
      console.log(`   ❌ Failed: ${errorCount} products`);
    }
    console.log('\n🎉 Your Supabase database is now populated with Shopify products!');

  } catch (error) {
    console.error('\n❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the sync
syncAllProducts();
