# Supabase Database Setup Guide

## Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project: **kceoctwsftogrhwhczop**

## Step 2: Run Database Migration

1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run** button

This will create:
- ✅ 12 database tables
- ✅ Row Level Security policies
- ✅ Indexes for performance
- ✅ Triggers for auto-updates
- ✅ Functions for business logic

## Step 3: Verify Tables Created

1. Click on **Table Editor** in the left sidebar
2. You should see all these tables:
   - users
   - products
   - orders
   - order_items
   - reviews
   - referrals
   - newsletter_subscribers
   - cart_items
   - wishlist_items
   - bundles
   - bundle_items
   - analytics_events

## Step 4: Seed Initial Data (Optional)

### Create Admin User
1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Email: `admin@unifab.co.uk`
4. Password: (your choice)
5. After creating, go to **SQL Editor** and run:

```sql
INSERT INTO public.users (id, email, full_name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@unifab.co.uk'),
  'admin@unifab.co.uk',
  'Admin User',
  'admin'
);
```

### Add Sample Products
Run this SQL to add some initial products:

```sql
INSERT INTO public.products (name, description, category, price, original_price, stock_quantity, sku, images, sizes, colors, is_featured)
VALUES
  ('Hi-Vis Safety Vest', 'High visibility safety vest with reflective strips', 'Hi-Vis', 24.99, 34.99, 500, 'HV-001', 
   '["https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&q=80"]'::jsonb,
   '["S", "M", "L", "XL", "XXL"]'::jsonb,
   '["Yellow", "Orange"]'::jsonb,
   true),
  
  ('Work Polo Shirt', 'Professional polo shirt for corporate wear', 'Workwear', 19.99, NULL, 300, 'WP-001',
   '["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=80"]'::jsonb,
   '["S", "M", "L", "XL", "XXL"]'::jsonb,
   '["Navy", "Black", "White"]'::jsonb,
   true),
  
  ('Steel Toe Safety Boots', 'Durable safety boots with steel toe cap', 'Safety Boots', 59.99, 79.99, 200, 'SB-001',
   '["https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&q=80"]'::jsonb,
   '["6", "7", "8", "9", "10", "11", "12"]'::jsonb,
   '["Black", "Brown"]'::jsonb,
   true);
```

## Step 5: Test Database Connection

1. Open your project in VS Code
2. The Supabase client is already configured in `src/lib/supabase.ts`
3. Test the connection by running your dev server:
   ```bash
   pnpm run dev
   ```

## Step 6: Verify API Integration

All API layers are created in `src/api/`:
- ✅ `products.ts` - Product management
- ✅ `orders.ts` - Order processing
- ✅ `reviews.ts` - Review system
- ✅ `cart.ts` - Shopping cart
- ✅ `users.ts` - User profiles & loyalty
- ✅ `analytics.ts` - Event tracking

## Step 7: Enable Real-time (Optional)

For live updates:

1. Go to **Database** → **Replication**
2. Enable replication for these tables:
   - orders
   - cart_items
   - analytics_events

## Step 8: Configure Storage (For Images)

1. Go to **Storage**
2. Create buckets:
   - `product-images` (public)
   - `review-images` (public)
   - `user-uploads` (private)

3. Set policies for public buckets:
```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );
```

## Step 9: Security Checklist

- ✅ RLS enabled on all tables
- ✅ Policies restrict access appropriately
- ✅ Admin role checks in place
- ✅ Environment variables secured
- ✅ HTTPS only in production

## Step 10: Monitor & Maintain

1. **Database Health**: Check **Database** → **Health**
2. **API Logs**: Check **Logs** → **API**
3. **Auth Logs**: Check **Logs** → **Auth**
4. **Backups**: Automatic daily backups enabled

## Troubleshooting

### Connection Issues
- Verify `.env` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- Check project is not paused in Supabase dashboard

### RLS Errors
- Ensure user is authenticated
- Check policies match your use case
- Use SQL Editor to test queries directly

### Performance Issues
- Check indexes are created
- Monitor slow queries in **Database** → **Query Performance**
- Consider adding more indexes for frequently queried columns

## Next Steps

1. **Migrate Components**: Update components to use API instead of mock data
2. **Test Features**: Test cart, checkout, orders end-to-end
3. **Add More Products**: Import your full product catalog
4. **Configure Email**: Set up email templates for order confirmations
5. **Go Live**: Deploy to production when ready!

## Support

- Supabase Docs: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions
- Status: https://status.supabase.com
