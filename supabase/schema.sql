-- Sarwagyna School — Full Database Schema
-- Run in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- ADMIN USERS (plain text password, no hashing)
-- ─────────────────────────────────────────
CREATE TABLE admin_users (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO admin_users (name, email, password)
VALUES ('Sarwan', 'admin@sarwagyna.com', 'changeme123');

-- ─────────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────────
CREATE TABLE events (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title                TEXT NOT NULL,
  slug                 TEXT UNIQUE NOT NULL,
  event_type           TEXT CHECK (event_type IN (
                         'webinar','workshop','hackathon',
                         'ideathon','other'
                       )) NOT NULL DEFAULT 'webinar',
  description          TEXT,
  short_description    TEXT,
  session_number       INTEGER,
  event_date           TIMESTAMPTZ,
  event_end_date       TIMESTAMPTZ,
  duration_minutes     INTEGER DEFAULT 75,
  status               TEXT CHECK (status IN (
                         'draft','published','completed','cancelled'
                       )) DEFAULT 'draft',
  mode                 TEXT CHECK (mode IN (
                         'online','offline','hybrid'
                       )) DEFAULT 'online',
  platform             TEXT,
  venue                TEXT,
  registration_url     TEXT,
  recording_url        TEXT,
  thumbnail_url        TEXT,
  is_free              BOOLEAN DEFAULT true,
  price                NUMERIC(10,2) DEFAULT 0,
  max_registrations    INTEGER,
  registration_count   INTEGER DEFAULT 0,
  attendance_count     INTEGER DEFAULT 0,
  certificate_issued   BOOLEAN DEFAULT false,
  what_you_learn       JSONB DEFAULT '[]',
  who_should_attend    JSONB DEFAULT '[]',
  tags                 TEXT[] DEFAULT '{}',
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- SPEAKERS
-- ─────────────────────────────────────────
CREATE TABLE speakers (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name              TEXT NOT NULL,
  title             TEXT,
  company           TEXT,
  bio               TEXT,
  short_bio         TEXT,
  avatar_url        TEXT,
  linkedin_url      TEXT,
  twitter_url       TEXT,
  website_url       TEXT,
  tags              TEXT[] DEFAULT '{}',
  is_active         BOOLEAN DEFAULT true,
  is_hiring         BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- EVENT SPEAKERS (junction)
-- ─────────────────────────────────────────
CREATE TABLE event_speakers (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id    UUID REFERENCES events(id) ON DELETE CASCADE,
  speaker_id  UUID REFERENCES speakers(id) ON DELETE CASCADE,
  role        TEXT DEFAULT 'Speaker',
  sort_order  INTEGER DEFAULT 0,
  UNIQUE(event_id, speaker_id)
);

-- ─────────────────────────────────────────
-- PARTNERS
-- ─────────────────────────────────────────
CREATE TABLE partners (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  logo_url         TEXT,
  website_url      TEXT,
  description      TEXT,
  partnership_type TEXT CHECK (partnership_type IN (
                     'speaking','sponsoring',
                     'hiring_pipeline','knowledge','media'
                   )),
  is_active        BOOLEAN DEFAULT true,
  sort_order       INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- PARTNER APPLICATIONS
-- ─────────────────────────────────────────
CREATE TABLE partner_applications (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name     TEXT NOT NULL,
  contact_name     TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  partnership_type TEXT,
  message          TEXT,
  status           TEXT CHECK (status IN (
                     'new','reviewing','approved','rejected'
                   )) DEFAULT 'new',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CERTIFICATES
-- ─────────────────────────────────────────
CREATE TABLE certificates (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id    TEXT UNIQUE NOT NULL,
  event_id          UUID REFERENCES events(id) ON DELETE SET NULL,
  recipient_name    TEXT NOT NULL,
  recipient_email   TEXT,
  certificate_type  TEXT CHECK (certificate_type IN (
                      'participation','completion','achievement',
                      'speaker','volunteer'
                    )) DEFAULT 'participation',
  issued_date       DATE NOT NULL DEFAULT CURRENT_DATE,
  pdf_url           TEXT,
  is_valid          BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- TESTIMONIALS
-- ─────────────────────────────────────────
CREATE TABLE testimonials (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  college     TEXT,
  city        TEXT,
  role        TEXT,
  quote       TEXT NOT NULL,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CONTACT SUBMISSIONS
-- ─────────────────────────────────────────
CREATE TABLE contact_submissions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  inquiry_type  TEXT CHECK (inquiry_type IN (
                  'general','speaker','partnership','webinar','certificate'
                )) DEFAULT 'general',
  subject       TEXT,
  message       TEXT NOT NULL,
  status        TEXT CHECK (status IN (
                  'new','read','replied'
                )) DEFAULT 'new',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- SITE SETTINGS (key-value store)
-- ─────────────────────────────────────────
CREATE TABLE site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
  ('whatsapp_url',        ''),
  ('community_count',     '410'),
  ('instagram_url',       ''),
  ('linkedin_url',        ''),
  ('youtube_url',         ''),
  ('contact_email',       ''),
  ('about_mission',       ''),
  ('about_vision',        ''),
  ('about_milestone_1',   '2026 — Community and free webinars'),
  ('about_milestone_2',   '2027 — Low-cost paid courses'),
  ('about_milestone_3',   'Future — A full Sarwagyna institution'),
  ('meta_title',          'Sarwagyna School'),
  ('meta_description',    'Learn what your college forgot to teach you.');

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────
ALTER TABLE events              ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers            ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_speakers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners            ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates        ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials        ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users         ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read events"
  ON events FOR SELECT USING (status IN ('published','completed'));

CREATE POLICY "public read speakers"
  ON speakers FOR SELECT USING (is_active = true);

CREATE POLICY "public read event_speakers"
  ON event_speakers FOR SELECT USING (true);

CREATE POLICY "public read active partners"
  ON partners FOR SELECT USING (is_active = true);

CREATE POLICY "public read valid certificates"
  ON certificates FOR SELECT USING (is_valid = true);

CREATE POLICY "public read testimonials"
  ON testimonials FOR SELECT USING (is_active = true);

CREATE POLICY "public read site_settings"
  ON site_settings FOR SELECT USING (true);

CREATE POLICY "public insert contact"
  ON contact_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "public insert partner_application"
  ON partner_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "public select admin_users"
  ON admin_users FOR SELECT USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('School-assets', 'School-assets', true)
ON CONFLICT DO NOTHING;
