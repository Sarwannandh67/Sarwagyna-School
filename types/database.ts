export type EventType = 'webinar' | 'workshop' | 'hackathon' | 'ideathon' | 'other';
export type EventStatus = 'draft' | 'published' | 'completed' | 'cancelled';
export type EventMode = 'online' | 'offline' | 'hybrid';
export type PartnershipType = 'speaking' | 'sponsoring' | 'hiring_pipeline' | 'knowledge' | 'media';
export type ApplicationStatus = 'new' | 'reviewing' | 'approved' | 'rejected';
export type CertificateType = 'participation' | 'completion' | 'achievement' | 'speaker' | 'volunteer';
export type InquiryType = 'general' | 'speaker' | 'partnership' | 'webinar' | 'certificate';
export type ContactStatus = 'new' | 'read' | 'replied';
export type SpeakerRole = 'Speaker' | 'Mentor' | 'Judge' | 'Host';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  event_type: EventType;
  description: string | null;
  short_description: string | null;
  session_number: number | null;
  event_date: string | null;
  event_end_date: string | null;
  duration_minutes: number;
  status: EventStatus;
  mode: EventMode;
  platform: string | null;
  venue: string | null;
  registration_url: string | null;
  recording_url: string | null;
  thumbnail_url: string | null;
  is_free: boolean;
  price: number;
  max_registrations: number | null;
  registration_count: number;
  attendance_count: number;
  certificate_issued?: boolean;
  what_you_learn: string[];
  who_should_attend: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  bio: string | null;
  short_bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  tags: string[];
  is_active: boolean;
  is_hiring: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventSpeaker {
  id: string;
  event_id: string;
  speaker_id: string;
  role: SpeakerRole;
  sort_order: number;
  speaker?: Speaker;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  partnership_type: PartnershipType | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface PartnerApplication {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  partnership_type: string | null;
  message: string | null;
  status: ApplicationStatus;
  created_at: string;
}

export interface Certificate {
  id: string;
  certificate_id: string;
  event_id: string | null;
  recipient_name: string;
  recipient_email: string | null;
  certificate_type: CertificateType;
  issued_date: string;
  pdf_url: string | null;
  is_valid: boolean;
  created_at: string;
  event?: Event | null;
}

export interface Testimonial {
  id: string;
  name: string;
  college: string | null;
  city: string | null;
  role: string | null;
  quote: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  inquiry_type: InquiryType;
  subject: string | null;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string | null;
  updated_at?: string;
}

export type SiteSettings = Record<string, string>;

export interface EventWithSpeakers extends Event {
  event_speakers?: (EventSpeaker & { speaker: Speaker })[];
}

export interface SpeakerWithEvents extends Speaker {
  event_speakers?: (EventSpeaker & { event: Event })[];
}

export interface Feedback {
  id: string;
  name: string;
  email: string | null;
  college: string | null;
  city: string | null;
  role: string | null;
  rating: number;
  feedback_text: string;
  event_id: string | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  event?: { title: string; slug: string; event_type: string } | null;
}

export interface SessionPayload {
  id: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
