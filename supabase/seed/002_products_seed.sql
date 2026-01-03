-- Seed data for Style Sphere products
-- Run this after the schema migration

-- Insert sample products
INSERT INTO products (name, description, category, price, original_price, image_url, badge, rating, review_count, in_stock, featured) VALUES
('Hi-Vis Safety Jacket', 'Professional-grade high visibility safety jacket designed for maximum protection in hazardous work environments.', 'Safety Wear', 34.99, 44.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 'Best Seller', 4.8, 124, true, true),
('Heavy Duty Work Trousers', 'Rugged cargo work trousers built for demanding trades with reinforced stress points and ample storage.', 'Work Trousers', 29.99, null, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', null, 4.6, 89, true, false),
('Corporate Polo Shirt', 'Premium quality polo shirt perfect for corporate branding with superior comfort and professional appearance.', 'Polo Shirts', 18.99, null, 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800', 'New', 4.9, 256, true, true),
('Safety Hard Hat', 'Industrial-grade safety helmet with advanced impact protection and adjustable suspension system.', 'PPE Equipment', 12.99, null, 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=800', null, 4.7, 178, true, false),
('Premium Cotton Polo', 'Extra-fine piqué cotton polo with reinforced seams and professional finish.', 'Polo Shirts', 21.99, null, 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800', null, 4.7, 98, true, false),
('Classic Crew Neck Sweatshirt', 'Comfortable crew neck sweatshirt perfect for branding and everyday wear.', 'Sweatshirts', 24.99, null, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', null, 4.6, 145, true, false),
('Zip-Up Hoodie', 'Premium zip-up hoodie with kangaroo pocket and adjustable hood.', 'Sweatshirts', 32.99, null, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', null, 4.8, 203, true, true),
('Premium Softshell Jacket', 'Weather-resistant softshell jacket with breathable fabric and multiple pockets.', 'Softshell Jackets', 49.99, 59.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', null, 4.9, 167, true, true);

-- Get product IDs for variants (using names to match)
DO $$
DECLARE
  polo_id UUID;
  trousers_id UUID;
  jacket_id UUID;
  hardhat_id UUID;
  sweatshirt_id UUID;
  hoodie_id UUID;
  softshell_id UUID;
BEGIN
  -- Get product IDs
  SELECT id INTO polo_id FROM products WHERE name = 'Corporate Polo Shirt' LIMIT 1;
  SELECT id INTO trousers_id FROM products WHERE name = 'Heavy Duty Work Trousers' LIMIT 1;
  SELECT id INTO jacket_id FROM products WHERE name = 'Hi-Vis Safety Jacket' LIMIT 1;
  SELECT id INTO hardhat_id FROM products WHERE name = 'Safety Hard Hat' LIMIT 1;
  SELECT id INTO sweatshirt_id FROM products WHERE name = 'Classic Crew Neck Sweatshirt' LIMIT 1;
  SELECT id INTO hoodie_id FROM products WHERE name = 'Zip-Up Hoodie' LIMIT 1;
  SELECT id INTO softshell_id FROM products WHERE name = 'Premium Softshell Jacket' LIMIT 1;

  -- Insert variants for Corporate Polo
  INSERT INTO product_variants (product_id, size, color, color_hex, sku, inventory_quantity) VALUES
  (polo_id, 'XS', 'White', '#FFFFFF', 'POLO-WH-XS', 50),
  (polo_id, 'S', 'White', '#FFFFFF', 'POLO-WH-S', 100),
  (polo_id, 'M', 'White', '#FFFFFF', 'POLO-WH-M', 150),
  (polo_id, 'L', 'White', '#FFFFFF', 'POLO-WH-L', 120),
  (polo_id, 'XL', 'White', '#FFFFFF', 'POLO-WH-XL', 80),
  (polo_id, 'S', 'Navy', '#1a2d4a', 'POLO-NV-S', 100),
  (polo_id, 'M', 'Navy', '#1a2d4a', 'POLO-NV-M', 150),
  (polo_id, 'L', 'Navy', '#1a2d4a', 'POLO-NV-L', 120),
  (polo_id, 'XL', 'Navy', '#1a2d4a', 'POLO-NV-XL', 80),
  (polo_id, 'M', 'Black', '#000000', 'POLO-BK-M', 100),
  (polo_id, 'L', 'Black', '#000000', 'POLO-BK-L', 80);

  -- Insert variants for Work Trousers
  INSERT INTO product_variants (product_id, size, color, color_hex, sku, inventory_quantity) VALUES
  (trousers_id, '32', 'Black', '#1a1a1a', 'TROUSERS-BK-32', 60),
  (trousers_id, '34', 'Black', '#1a1a1a', 'TROUSERS-BK-34', 80),
  (trousers_id, '36', 'Black', '#1a1a1a', 'TROUSERS-BK-36', 70),
  (trousers_id, '32', 'Navy', '#1a2d4a', 'TROUSERS-NV-32', 60),
  (trousers_id, '34', 'Navy', '#1a2d4a', 'TROUSERS-NV-34', 80);

  -- Insert variants for Jackets (sizes only, one color)
  INSERT INTO product_variants (product_id, size, sku, inventory_quantity) VALUES
  (jacket_id, 'S', 'JACKET-S', 40),
  (jacket_id, 'M', 'JACKET-M', 60),
  (jacket_id, 'L', 'JACKET-L', 50),
  (jacket_id, 'XL', 'JACKET-XL', 40),
  (jacket_id, '2XL', 'JACKET-2XL', 30);

  -- Insert variants for Sweatshirt
  INSERT INTO product_variants (product_id, size, color, color_hex, sku, inventory_quantity) VALUES
  (sweatshirt_id, 'S', 'Black', '#000000', 'SWEAT-BK-S', 70),
  (sweatshirt_id, 'M', 'Black', '#000000', 'SWEAT-BK-M', 100),
  (sweatshirt_id, 'L', 'Black', '#000000', 'SWEAT-BK-L', 80),
  (sweatshirt_id, 'M', 'Navy', '#1a2d4a', 'SWEAT-NV-M', 90),
  (sweatshirt_id, 'L', 'Navy', '#1a2d4a', 'SWEAT-NV-L', 70);

  -- Insert variants for Hoodie
  INSERT INTO product_variants (product_id, size, color, color_hex, sku, inventory_quantity) VALUES
  (hoodie_id, 'S', 'Black', '#000000', 'HOODIE-BK-S', 60),
  (hoodie_id, 'M', 'Black', '#000000', 'HOODIE-BK-M', 90),
  (hoodie_id, 'L', 'Black', '#000000', 'HOODIE-BK-L', 70),
  (hoodie_id, 'XL', 'Black', '#000000', 'HOODIE-BK-XL', 50);

  -- Insert variants for Softshell
  INSERT INTO product_variants (product_id, size, color, color_hex, sku, inventory_quantity) VALUES
  (softshell_id, 'M', 'Black', '#000000', 'SOFT-BK-M', 40),
  (softshell_id, 'L', 'Black', '#000000', 'SOFT-BK-L', 50),
  (softshell_id, 'XL', 'Black', '#000000', 'SOFT-BK-XL', 35);

END $$;

-- Insert sample bundles
INSERT INTO bundles (name, description, price, original_price, image_url, item_count, savings, rating, review_count, featured) VALUES
('6 Item Kickstarter Embroidered Workwear Bundle', 'Perfect starter bundle for your team with free professional logo embroidery on Left Chest', 149.99, 219.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', 6, 70.00, 4.8, 1247, true),
('Professional Uniform Bundle', 'Complete professional uniform set with polo shirts and trousers', 89.99, 120.00, 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800', 4, 30.01, 4.7, 456, true);

SELECT 'Seed data inserted successfully!' AS status;
