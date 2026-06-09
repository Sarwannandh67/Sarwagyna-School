-- Optional: add certificate_issued to events if your table was created without it.
-- Safe to run multiple times.

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS certificate_issued BOOLEAN DEFAULT false;
