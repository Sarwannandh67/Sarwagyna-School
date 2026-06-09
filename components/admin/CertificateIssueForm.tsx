'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { issueCertificate, updateCertificate } from '@/lib/actions/certificates';
import type { Certificate, CertificateType, Event } from '@/types/database';

interface CertificateIssueFormProps {
  certificate?: Certificate;
  events: Event[];
  defaultCertificateId?: string;
}

const certTypes: { value: CertificateType; label: string }[] = [
  { value: 'participation', label: 'Participation' },
  { value: 'completion', label: 'Completion' },
  { value: 'achievement', label: 'Achievement' },
  { value: 'speaker', label: 'Speaker' },
  { value: 'volunteer', label: 'Volunteer' },
];

export function CertificateIssueForm({
  certificate,
  events,
  defaultCertificateId,
}: CertificateIssueFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [recipientName, setRecipientName] = useState(certificate?.recipient_name ?? '');
  const [recipientEmail, setRecipientEmail] = useState(certificate?.recipient_email ?? '');
  const [eventId, setEventId] = useState(certificate?.event_id ?? '');
  const [certificateType, setCertificateType] = useState<CertificateType>(
    certificate?.certificate_type ?? 'participation'
  );
  const [issuedDate, setIssuedDate] = useState(
    certificate?.issued_date ?? new Date().toISOString().split('T')[0]
  );
  const [certificateId, setCertificateId] = useState(
    certificate?.certificate_id ?? defaultCertificateId ?? ''
  );
  const [isValid, setIsValid] = useState(certificate?.is_valid ?? true);
  const [pdfUrl, setPdfUrl] = useState(certificate?.pdf_url ?? '');

  const certEvents = events.filter(
    (e) => e.certificate_issued || e.status === 'completed'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      certificate_id: certificateId,
      event_id: eventId || null,
      recipient_name: recipientName,
      recipient_email: recipientEmail || undefined,
      certificate_type: certificateType,
      issued_date: issuedDate,
      pdf_url: pdfUrl || undefined,
      is_valid: isValid,
    };

    startTransition(async () => {
      if (certificate) {
        const result = await updateCertificate(certificate.id, data);
        if ('error' in result) {
          showToast(result.error, 'error');
        } else {
          showToast('Certificate saved successfully.', 'success');
        }
        return;
      }

      const result = await issueCertificate(data);
      if ('error' in result) {
        showToast(result.error, 'error');
      } else {
        showToast(
          `Certificate ${result.certificate.certificate_id} issued to ${result.certificate.recipient_name}.`,
          'success'
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <Input
        label="Recipient name"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        required
      />
      <Input
        label="Recipient email"
        type="email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <Select
        label="Event"
        options={[
          { value: '', label: 'No event' },
          ...certEvents.map((e) => ({ value: e.id, label: e.title })),
        ]}
        value={eventId ?? ''}
        onChange={(e) => setEventId(e.target.value)}
      />
      <Select
        label="Certificate type"
        options={certTypes}
        value={certificateType}
        onChange={(e) => setCertificateType(e.target.value as CertificateType)}
      />
      <Input
        label="Issued date"
        type="date"
        value={issuedDate}
        onChange={(e) => setIssuedDate(e.target.value)}
        required
      />
      <Input
        label="Certificate ID"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
        required
      />
      <Input
        label="PDF URL"
        type="url"
        value={pdfUrl}
        onChange={(e) => setPdfUrl(e.target.value)}
        placeholder="Optional — Supabase storage URL"
      />
      {certificate && <Toggle label="Valid" checked={isValid} onChange={setIsValid} />}
      <div className="flex gap-3">
        <Button type="submit" variant="primary" loading={isPending}>
          {certificate ? 'Save changes' : 'Issue certificate'}
        </Button>
        <Button href="/admin/certificates" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
