-- Add image_url column to product_preview_cards for real screenshot uploads
ALTER TABLE product_preview_cards
  ADD COLUMN IF NOT EXISTS image_url TEXT;
