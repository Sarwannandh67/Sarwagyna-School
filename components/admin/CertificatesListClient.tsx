'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/ui/Modal';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { revokeCertificate } from '@/lib/actions/certificates';
import { formatDate } from '@/lib/utils';
import type { Certificate } from '@/types/database';
import { useState } from 'react';

interface CertificatesListClientProps {
  certificates: Certificate[];
  events: { id: string; title: string }[];
  stats: { total: number; valid: number; revoked: number };
  currentEventId: string;
}

export function CertificatesListClient({
  certificates,
  events,
  stats,
  currentEventId,
}: CertificatesListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [revokeTarget, setRevokeTarget] = useState<Certificate | null>(null);

  const setEventFilter = (eventId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (eventId === 'all') params.delete('event');
    else params.set('event', eventId);
    router.push(`/admin/certificates?${params.toString()}`);
  };

  const handleRevoke = async () => {
    if (!revokeTarget) return;
    await revokeCertificate(revokeTarget.id, false);
    setRevokeTarget(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[12px] border border-canvas-soft bg-canvas p-4">
          <p className="text-3xl font-medium text-ink">{stats.total}</p>
          <p className="text-sm text-body-mid">Total Issued</p>
        </div>
        <div className="rounded-[12px] border border-canvas-soft bg-canvas p-4">
          <p className="text-3xl font-medium text-green-700">{stats.valid}</p>
          <p className="text-sm text-body-mid">Valid</p>
        </div>
        <div className="rounded-[12px] border border-canvas-soft bg-canvas p-4">
          <p className="text-3xl font-medium text-red-600">{stats.revoked}</p>
          <p className="text-sm text-body-mid">Revoked</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <select
          value={currentEventId}
          onChange={(e) => setEventFilter(e.target.value)}
          className="rounded-[12px] border border-mute/50 bg-canvas px-4 py-2 text-sm"
        >
          <option value="all">All Events</option>
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>
        <Button href="/admin/certificates/new" variant="primary" size="sm">
          + Issue Certificate
        </Button>
      </div>

      <DataTable
        data={certificates}
        searchPlaceholder="Search by name or certificate ID..."
        searchFn={(row, q) =>
          row.certificate_id.toLowerCase().includes(q) ||
          row.recipient_name.toLowerCase().includes(q)
        }
        columns={[
          { key: 'certificate_id', header: 'Certificate ID', render: (row) => <span className="font-mono text-xs">{row.certificate_id}</span> },
          { key: 'recipient_name', header: 'Recipient', render: (row) => <span className="font-medium">{row.recipient_name}</span> },
          {
            key: 'event',
            header: 'Event',
            render: (row) => row.event?.title ?? '—',
          },
          {
            key: 'certificate_type',
            header: 'Type',
            render: (row) => <span className="capitalize">{row.certificate_type}</span>,
          },
          {
            key: 'issued_date',
            header: 'Date',
            render: (row) => formatDate(row.issued_date),
          },
          {
            key: 'is_valid',
            header: 'Valid',
            render: (row) => (
              <Toggle
                label=""
                checked={row.is_valid}
                onChange={(checked) => {
                  if (!checked) setRevokeTarget(row);
                  else revokeCertificate(row.id, true).then(() => router.refresh());
                }}
                className="!gap-0"
              />
            ),
          },
        ]}
        actions={(row) => (
          <div className="flex items-center gap-3">
            {row.pdf_url && (
              <a href={row.pdf_url} target="_blank" rel="noopener noreferrer" className="text-body-mid hover:text-ink">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v10M6 9l4 4 4-4M4 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            <Link href={`/admin/certificates/${row.id}`} className="text-sm text-primary hover:underline">
              Edit
            </Link>
          </div>
        )}
        emptyMessage="No certificates issued yet."
      />

      <Modal
        isOpen={!!revokeTarget}
        onClose={() => setRevokeTarget(null)}
        title="Revoke certificate"
      >
        <p className="mb-4 text-sm text-body">
          Revoke certificate {revokeTarget?.certificate_id}? It will no longer be valid for verification.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setRevokeTarget(null)}>Cancel</Button>
          <Button variant="primary" onClick={handleRevoke}>Revoke</Button>
        </div>
      </Modal>
    </div>
  );
}
