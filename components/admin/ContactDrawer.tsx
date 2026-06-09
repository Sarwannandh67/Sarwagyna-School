'use client';

import { StatusSelect } from '@/components/admin/StatusSelect';
import { updateContactStatus } from '@/lib/actions/contact';
import { formatDateTime } from '@/lib/utils';
import type { ContactSubmission, ContactStatus } from '@/types/database';
import { Button } from '@/components/ui/Button';

interface ContactDrawerProps {
  submission: ContactSubmission | null;
  open: boolean;
  onClose: () => void;
}

const statusOptions: { value: ContactStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
];

export function ContactDrawer({ submission, open, onClose }: ContactDrawerProps) {
  if (!open || !submission) return null;

  const mailto = `mailto:${submission.email}?subject=${encodeURIComponent(
    submission.subject ? `Re: ${submission.subject}` : 'Re: Your inquiry to Sarwagyna School'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-canvas shadow-xl">
        <div className="flex items-center justify-between border-b border-canvas-soft px-6 py-4">
          <h2 className="text-lg font-medium text-ink">Contact submission</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-body-mid hover:bg-canvas-soft hover:text-ink"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <p className="text-xs text-body-mid">Status</p>
            <div className="mt-1">
              <StatusSelect
                value={submission.status}
                options={statusOptions}
                onChange={(status) => updateContactStatus(submission.id, status)}
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-body-mid">Date</p>
            <p className="text-sm text-ink">{formatDateTime(submission.created_at)}</p>
          </div>

          <div>
            <p className="text-xs text-body-mid">Name</p>
            <p className="text-sm text-ink">{submission.name}</p>
          </div>

          <div>
            <p className="text-xs text-body-mid">Email</p>
            <p className="text-sm text-ink">{submission.email}</p>
          </div>

          <div>
            <p className="text-xs text-body-mid">Inquiry type</p>
            <p className="text-sm capitalize text-ink">{submission.inquiry_type}</p>
          </div>

          {submission.subject && (
            <div>
              <p className="text-xs text-body-mid">Subject</p>
              <p className="text-sm text-ink">{submission.subject}</p>
            </div>
          )}

          <div>
            <p className="text-xs text-body-mid">Message</p>
            <p className="whitespace-pre-wrap text-sm text-ink">{submission.message}</p>
          </div>
        </div>

        <div className="border-t border-canvas-soft px-6 py-4">
          <Button href={mailto} variant="dark" className="w-full">
            Reply via Email
          </Button>
        </div>
      </div>
    </div>
  );
}
