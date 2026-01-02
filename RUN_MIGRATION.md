# Quick Migration Guide

## ✅ Run This Migration Now

The migration script has been updated to be **safe** and **idempotent** (can run multiple times).

### What It Does:
- ✅ Creates tables **only if they don't exist**
- ✅ Drops and recreates **policies** (to avoid conflicts)
- ✅ Creates indexes **only if missing**
- ✅ Updates functions and triggers safely

### Steps to Run:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/kceoctwsftogrhwhczop

2. **Go to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Copy & Paste**
   - Open: `supabase/migrations/001_initial_schema.sql`
   - Select all (Ctrl+A)
   - Copy (Ctrl+C)
   - Paste into SQL Editor

4. **Run Migration**
   - Click "Run" button (or Ctrl+Enter)
   - Wait for completion (~5-10 seconds)

5. **Verify Success**
   - You should see: "Migration completed successfully!"
   - Check "Table Editor" to see all tables

### What Gets Created:

**Tables:**
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

**Security:**
- Row Level Security policies
- User access controls
- Admin permissions

**Performance:**
- Indexes on frequently queried columns
- Auto-update triggers
- Business logic functions

### After Migration:

Your app will be ready to use real database! All API layers are already created in `src/api/`.

**Next:** I'll help you test the connection and migrate components to use real data.

---

## Troubleshooting

**If you see errors:**
- Most errors are safe to ignore if they say "already exists"
- The script is designed to skip existing objects
- Check the final message for "Migration completed successfully!"

**If tables already have data:**
- The script preserves existing data
- Only adds missing tables/columns
- Policies are recreated (safe)

Ready to run? Let me know when it's complete!
