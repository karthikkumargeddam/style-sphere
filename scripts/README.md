# Shopify to Supabase Sync - Quick Start Guide

## Prerequisites

You need these credentials from Shopify:

1. **Store Domain**: `your-store.myshopify.com`
2. **Storefront API Token**: Get from Shopify Admin → Apps → Create custom app

## Setup Steps

### 1. Add Shopify Credentials to `.env`

Add these lines to your `.env` file:

```env
# Shopify Configuration
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token_here
```

### 2. Install Dependencies

```bash
cd scripts
npm install
cd ..
```

### 3. Run the Sync

```bash
cd scripts
npm run sync-shopify
```

## What Happens

1. ✅ Fetches ALL products from your Shopify store
2. ✅ Copies them to Supabase `products` table
3. ✅ Syncs product variants (sizes, colors)
4. ✅ Syncs product images
5. ✅ Your Shopify store is **NOT modified** (read-only)

## Re-running the Sync

You can run the sync anytime to update Supabase with latest Shopify data:

```bash
cd scripts
npm run sync-shopify
```

## Troubleshooting

**Error: "Cannot find module"**
- Run `npm install` in the `scripts` folder

**Error: "Shopify API Error"**
- Check your Storefront API token
- Ensure your custom app has `read_products` permission

**Error: "Supabase connection failed"**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`

## Next Steps

After sync completes:
1. Check Supabase dashboard to see your products
2. The Style Sphere app will automatically use Supabase products
3. All your custom logo features will work with real products!
