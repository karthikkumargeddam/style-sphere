-- Seed 5 fake 4-star reviews for each product (product_id 1..400)
-- Uses PostgreSQL arrays and generate_series to avoid massive static INSERT lists

WITH params AS (
  SELECT p AS product_id,
         r AS review_index,
         ((p - 1) * 5 + r) AS seq
  FROM generate_series(1, 400) AS p,
       generate_series(1, 5) AS r
)
INSERT INTO public.reviews (product_id, user_id, author_name, rating, content, created_at)
SELECT
  product_id,
  NULL,
  -- cycle through a list of realistic-looking names
  (ARRAY[
    'Alice Smith','Bob Johnson','Carol Williams','David Brown','Eve Jones',
    'Frank Miller','Grace Davis','Henry Wilson','Ivy Moore','Jack Taylor',
    'Kara Anderson','Liam Thomas','Mia Jackson','Noah White','Olivia Harris',
    'Paul Martin','Quinn Thompson','Rachel Garcia','Sam Martinez','Tina Robinson'
  ])[((seq - 1) % 20) + 1],
  4,
  -- cycle through a set of short review phrases
  (ARRAY[
    'Good quality, meets expectations.',
    'Comfortable and durable for daily use.',
    'Great value for money and looks professional.',
    'Exactly as described — very happy with the fit.',
    'Well-made and solid construction.',
    'Materials feel premium and stitching is neat.',
    'Delivered quickly and packaging was secure.',
    'Performs well on site — no issues so far.',
    'Nice finish and good attention to detail.',
    'Would recommend to others for workwear needs.'
  ])[((seq - 1) % 10) + 1],
  -- stagger created_at over the past 90 days
  now() - ((seq % 90) || ' days')::interval
FROM params;

-- NOTE: This seed adds 5 reviews per product with a 4-star rating.
-- Run with: `supabase db push` or apply via your preferred migration flow.
