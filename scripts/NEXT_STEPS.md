# ✅ Shopify Sync - Ready to Run!

## Current Status

✅ Database schema created  
✅ Sync script created  
✅ Dependencies installed  
⏳ **Waiting for Shopify credentials**

## Next Steps

### 1. Add Shopify Credentials to `.env`

Open `c:\style-sphere\.env` and add these two lines:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxx
```

### 2. Get Your Shopify Token

1. Go to **Shopify Admin** → Settings → Apps and sales channels
2. Click **"Develop apps"** → **"Create an app"**
3. Name it: `Style Sphere Sync`
4. **Configure Storefront API scopes**:
   - Check: `unauthenticated_read_product_listings`
   - Check: `unauthenticated_read_product_inventory`
5. Click **"Save"** → **"Install app"**
6. Copy the **Storefront API access token**
7. Paste it in your `.env` file

### 3. Run the Sync

```powershell
cd c:\style-sphere\scripts
npm run sync-shopify
```

## What Will Happen

The script will:
1. ✅ Connect to your Shopify store (read-only)
2. ✅ Fetch all products
3. ✅ Copy them to Supabase
4. ✅ Include variants (sizes, colors)
5. ✅ Include all images
6. ❌ **Never modify your Shopify store**

## Troubleshooting

**"Missing Shopify credentials"**
→ Add `VITE_SHOPIFY_STORE_DOMAIN` and `VITE_SHOPIFY_STOREFRONT_TOKEN` to `.env`

**"Missing Supabase credentials"**
→ Your `.env` should already have `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**"Shopify API Error"**
→ Verify your token and store domain are correct

## After Sync Completes

Your Supabase database will have all your Shopify products, and Style Sphere will automatically use them with all the custom logo customization features!

---

**Ready?** Add your Shopify credentials to `.env` and run the sync! 🚀
