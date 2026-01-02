-- =====================================================
-- SAMPLE PRODUCT FOR TESTING (INR Pricing)
-- =====================================================

-- Insert a test product with Indian Rupee pricing
INSERT INTO public.products (
  id,
  name,
  description,
  price,
  original_price,
  stock_quantity,
  sku,
  images,
  sizes,
  colors,
  rating,
  review_count,
  is_featured,
  is_active
) VALUES (
  gen_random_uuid()::text,
  'Professional Work Polo Shirt - Navy Blue',
  'Premium quality polo shirt perfect for corporate and workwear. Made from 100% cotton with moisture-wicking technology. Durable, comfortable, and professional appearance. Ideal for uniforms, corporate events, and daily workwear.',
  '₹899.00',
  '₹1299.00',
  100,
  'TEST-POLO-001',
  '["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80", "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80"]'::jsonb,
  '["S", "M", "L", "XL", "XXL", "3XL"]'::jsonb,
  '["Navy Blue", "Black", "White", "Grey"]'::jsonb,
  4.5,
  12,
  true,
  true
);

-- Verify the insert
SELECT 
  id,
  name,
  price,
  stock_quantity,
  sku,
  is_active
FROM public.products 
WHERE sku = 'TEST-POLO-001';
