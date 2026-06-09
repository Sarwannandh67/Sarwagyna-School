'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import type { InquiryType } from '@/types/database';

const inquiryOptions = [
  { value: 'general', label: 'General inquiry' },
  { value: 'speaker', label: 'Speak at Sarwagyna School' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'webinar', label: 'Webinar suggestion' },
  { value: 'certificate', label: 'Certificate issue' },
];

export interface ContactFormProps {
  defaultInquiryType?: InquiryType;
}

export function ContactForm({ defaultInquiryType = 'general' }: ContactFormProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry_type: defaultInquiryType,
    subject: '',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      showToast('Message sent. We will reply within 24–48 hours.', 'success');
      setForm({
        name: '',
        email: '',
        inquiry_type: defaultInquiryType,
        subject: '',
        message: '',
      });
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Select
        label="Inquiry type"
        options={inquiryOptions}
        value={form.inquiry_type}
        onChange={(e) => setForm({ ...form, inquiry_type: e.target.value as InquiryType })}
      />
      <Input
        label="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <Textarea
        label="Message"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <Button type="submit" variant="dark" size="lg" className="w-full" loading={loading}>
        Send Message
      </Button>
    </form>
  );
}
