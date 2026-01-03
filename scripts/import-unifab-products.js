import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const WEBSITE_URL = 'https://wearunifab.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchAllProducts() {
    console.log('🔄 Fetching products from wearunifab.com...\n');

    const allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        // Shopify stores expose products via /products.json endpoint
        const url = `${WEBSITE_URL}/products.json?page=${page}&limit=250`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.products && data.products.length > 0) {
                allProducts.push(...data.products);
                console.log(`   Fetched page ${page}: ${data.products.length} products`);
                page++;

                // If we got less than 250, we're done
                if (data.products.length < 250) {
                    hasMore = false;
                }
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error(`   ❌ Error fetching page ${page}:`, error.message);
            hasMore = false;
        }
    }

    console.log(`\n✅ Total products fetched: ${allProducts.length}\n`);
    return allProducts;
}

async function importProductToSupabase(shopifyProduct) {
    try {
        // Determine category from product type or tags
        const category = shopifyProduct.product_type ||
            (shopifyProduct.tags && shopifyProduct.tags[0]) ||
            'Workwear';

        // Get price from first variant
        const price = shopifyProduct.variants && shopifyProduct.variants[0]
            ? parseFloat(shopifyProduct.variants[0].price)
            : 0;

        const compareAtPrice = shopifyProduct.variants && shopifyProduct.variants[0]?.compare_at_price
            ? parseFloat(shopifyProduct.variants[0].compare_at_price)
            : null;

        // Get main image
        const imageUrl = shopifyProduct.images && shopifyProduct.images[0]
            ? shopifyProduct.images[0].src
            : null;

        // Determine if it's a bundle
        const isBundle = shopifyProduct.title.toLowerCase().includes('bundle');

        const product = {
            name: shopifyProduct.title,
            description: shopifyProduct.body_html?.replace(/<[^>]*>/g, '') || '', // Strip HTML
            category: category,
            price: price,
            original_price: compareAtPrice,
            image_url: imageUrl,
            in_stock: shopifyProduct.variants?.some(v => v.available) || false,
            rating: 0,
            review_count: 0,
            featured: false,
        };

        // Insert product
        const { data: productData, error: productError } = await supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (productError) {
            // If product already exists, try to update it
            if (productError.code === '23505') {
                const { data: existingProduct } = await supabase
                    .from('products')
                    .select()
                    .eq('name', product.name)
                    .single();

                if (existingProduct) {
                    console.log(`   ⏭️  Skipping (already exists): ${product.name}`);
                    return existingProduct;
                }
            }
            console.error(`   ❌ Error importing "${product.name}":`, productError.message);
            return null;
        }

        console.log(`   ✅ Imported: ${product.name}`);

        // Import variants
        if (shopifyProduct.variants && shopifyProduct.variants.length > 0) {
            const variants = shopifyProduct.variants.map(variant => ({
                product_id: productData.id,
                size: variant.option1 || null,
                color: variant.option2 || null,
                sku: variant.sku || null,
                inventory_quantity: variant.inventory_quantity || 0,
                price_adjustment: 0,
            }));

            await supabase.from('product_variants').insert(variants);
        }

        // Import additional images
        if (shopifyProduct.images && shopifyProduct.images.length > 0) {
            const images = shopifyProduct.images.map((image, i) => ({
                product_id: productData.id,
                image_url: image.src,
                alt_text: image.alt || product.name,
                position: i,
            }));

            await supabase.from('product_images').insert(images);
        }

        return productData;
    } catch (error) {
        console.error(`   ❌ Error processing product:`, error.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Starting UniFab Product Import\n');
    console.log(`📍 Website: ${WEBSITE_URL}`);
    console.log(`📍 Supabase: ${SUPABASE_URL}\n`);

    // Validate Supabase credentials
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.error('❌ Missing Supabase credentials!');
        console.error('Please check your .env file has:');
        console.error('  VITE_SUPABASE_URL=your_supabase_url');
        console.error('  VITE_SUPABASE_ANON_KEY=your_supabase_key');
        process.exit(1);
    }

    try {
        // Fetch all products
        const products = await fetchAllProducts();

        if (products.length === 0) {
            console.log('⚠️  No products found!');
            return;
        }

        console.log('📦 Importing products to Supabase...\n');

        let successCount = 0;
        let errorCount = 0;

        for (const product of products) {
            const result = await importProductToSupabase(product);
            if (result) {
                successCount++;
            } else {
                errorCount++;
            }
        }

        console.log('\n✨ Import Complete!');
        console.log(`   ✅ Successfully imported: ${successCount} products`);
        if (errorCount > 0) {
            console.log(`   ❌ Failed: ${errorCount} products`);
        }
        console.log('\n🎉 Your Supabase database is now populated with UniFab products!');
        console.log('   You can now use them in Style Sphere with all the custom logo features!\n');

    } catch (error) {
        console.error('\n❌ Import failed:', error.message);
        process.exit(1);
    }
}

main();
