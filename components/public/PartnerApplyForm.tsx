'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';

const partnershipOptions = [
  { value: '', label: 'Select partnership type' },
  { value: 'speaking', label: 'Speaking' },
  { value: 'sponsoring', label: 'Sponsoring' },
  { value: 'hiring_pipeline', label: 'Hiring pipeline' },
  { value: 'knowledge', label: 'Knowledge sharing' },
  { value: 'media', label: 'Media' },
];

export function PartnerApplyForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    partnership_type: '',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/partner-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      showToast('Application submitted. We will be in touch soon.', 'success');
      setForm({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        partnership_type: '',
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
        label="Company name"
        required
        value={form.company_name}
        onChange={(e) => setForm({ ...form, company_name: e.target.value })}
      />
      <Input
        label="Contact name"
        required
        value={form.contact_name}
        onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
      />
      <Input
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="Phone"
        type="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <Select
        label="Partnership type"
        options={partnershipOptions}
        value={form.partnership_type}
        onChange={(e) => setForm({ ...form, partnership_type: e.target.value })}
      />
      <Textarea
        label="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
        Submit Application
      </Button>
    </form>
  );
}
