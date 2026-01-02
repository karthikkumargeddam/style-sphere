# Test Product Added - Payment Testing Guide

## ✅ Sample Product Created

**Product Details:**
- **Name**: Professional Work Polo Shirt - Navy Blue
- **Price**: ₹899 (Original: ₹1,299)
- **SKU**: TEST-POLO-001
- **Stock**: 100 units
- **Sizes**: S, M, L, XL, XXL, 3XL
- **Colors**: Navy Blue, Black, White, Grey
- **Rating**: 4.5/5 (12 reviews)

---

## 🚀 How to Add the Product

### Option 1: Run SQL in Supabase Dashboard
1. Go to Supabase SQL Editor
2. Copy contents of `supabase/seed/001_sample_product.sql`
3. Paste and Run
4. Product will be added to your database

### Option 2: Use Supabase Client (Programmatic)
```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('products')
  .insert({
    name: 'Professional Work Polo Shirt - Navy Blue',
    description: 'Premium quality polo shirt...',
    price: 899.00,
    original_price: 1299.00,
    stock_quantity: 100,
    sku: 'TEST-POLO-001',
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Navy Blue', 'Black', 'White', 'Grey'],
    rating: 4.5,
    review_count: 12,
    is_featured: true,
    is_active: true
  });
```

---

## 🧪 Testing Payment Flow

### Step 1: Add Product to Cart
```typescript
import { addToCart } from '@/api/cart';

// Add test product to cart
await addToCart(
  'user-id-here',  // Your test user ID
  'product-id',     // Product ID from database
  1,                // Quantity
  'L',              // Size
  'Navy Blue'       // Color
);
```

### Step 2: View Cart
```typescript
import { getCart } from '@/api/cart';

const cartItems = await getCart('user-id-here');
console.log('Cart:', cartItems);
```

### Step 3: Calculate Total
```typescript
import { getCartTotal } from '@/api/cart';

const total = await getCartTotal('user-id-here');
console.log('Total: ₹', total);
```

### Step 4: Create Test Order
```typescript
import { createOrder } from '@/api/orders';

const order = await createOrder({
  userId: 'user-id-here',
  items: [
    {
      productId: 'product-id',
      quantity: 1,
      price: 899.00,
      size: 'L',
      color: 'Navy Blue'
    }
  ],
  subtotal: 899.00,
  discount: 0,
  shippingCost: 50.00,
  shippingAddress: {
    name: 'Test User',
    address: '123 Test Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210'
  },
  billingAddress: {
    name: 'Test User',
    address: '123 Test Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210'
  },
  paymentMethod: 'razorpay' // or 'cod', 'card', etc.
});

console.log('Order created:', order);
```

---

## 💳 Payment Gateway Testing

### For Razorpay Integration:

1. **Test Mode Credentials**
   - Get test API keys from Razorpay Dashboard
   - Add to `.env`:
     ```
     VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
     VITE_RAZORPAY_KEY_SECRET=xxxxx
     ```

2. **Test Card Numbers**
   ```
   Card Number: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   ```

3. **Test UPI**
   ```
   UPI ID: success@razorpay
   ```

4. **Test Netbanking**
   - Select any bank
   - Use "Success" as password

### Payment Flow:
```typescript
// 1. Create order on backend
const order = await createOrder({...});

// 2. Initialize Razorpay
const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.total * 100, // Convert to paise
  currency: 'INR',
  name: 'Style Sphere',
  description: `Order #${order.order_number}`,
  order_id: order.id,
  handler: async (response) => {
    // Payment successful
    console.log('Payment ID:', response.razorpay_payment_id);
    
    // Update order status
    await updatePaymentStatus(order.id, 'paid');
  },
  prefill: {
    name: 'Test User',
    email: 'test@example.com',
    contact: '+919876543210'
  }
};

const razorpay = new Razorpay(options);
razorpay.open();
```

---

## ✅ Verification Checklist

- [ ] Product appears in database
- [ ] Product visible on website
- [ ] Can add to cart
- [ ] Cart total calculates correctly (₹899 + shipping)
- [ ] Can proceed to checkout
- [ ] Order created in database
- [ ] Payment gateway opens
- [ ] Test payment succeeds
- [ ] Order status updates to 'paid'
- [ ] Stock quantity decreases

---

## 🐛 Troubleshooting

**Product not showing?**
- Check `is_active = true` in database
- Verify RLS policies allow public read

**Cart not working?**
- Ensure user is authenticated
- Check user_id matches auth.uid()

**Payment failing?**
- Verify Razorpay test keys
- Check browser console for errors
- Ensure amount is in paise (multiply by 100)

---

## 📊 Expected Results

**Cart Total**: ₹899 (product) + ₹50 (shipping) = **₹949**

**Order in Database**:
```json
{
  "order_number": "ORD-2026-000001",
  "status": "pending",
  "subtotal": 899.00,
  "shipping_cost": 50.00,
  "total": 949.00,
  "payment_status": "pending"
}
```

**After Payment**:
```json
{
  "payment_status": "paid",
  "status": "processing"
}
```

---

Ready to test! 🚀
