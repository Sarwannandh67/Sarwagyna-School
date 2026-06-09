-- Optional: add updated_at to site_settings if your table was created without it.
-- Safe to run multiple times.

ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
