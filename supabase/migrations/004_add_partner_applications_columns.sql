ALTER TABLE partner_applications
  ADD COLUMN IF NOT EXISTS company_name  TEXT,
  ADD COLUMN IF NOT EXISTS contact_name  TEXT,
  ADD COLUMN IF NOT EXISTS email         TEXT,
  ADD COLUMN IF NOT EXISTS phone         TEXT,
  ADD COLUMN IF NOT EXISTS partnership_type TEXT,
  ADD COLUMN IF NOT EXISTS message       TEXT,
  ADD COLUMN IF NOT EXISTS status        TEXT DEFAULT 'new';
