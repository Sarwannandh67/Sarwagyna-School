'use client';

import { StatusSelect } from '@/components/admin/StatusSelect';
import { updateApplicationStatus } from '@/lib/actions/partners';
import { formatDateTime } from '@/lib/utils';
import type { ApplicationStatus, PartnerApplication } from '@/types/database';

interface ApplicationDrawerProps {
  application: PartnerApplication | null;
  open: boolean;
  onClose: () => void;
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export function ApplicationDrawer({ application, open, onClose }: ApplicationDrawerProps) {
  if (!open || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-canvas shadow-xl">
        <div className="flex items-center justify-between border-b border-canvas-soft px-6 py-4">
          <h2 className="text-lg font-medium text-ink">Partner application</h2>
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
                value={application.status}
                options={statusOptions}
                onChange={(status) => updateApplicationStatus(application.id, status)}
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-body-mid">Date</p>
            <p className="text-sm text-ink">{formatDateTime(application.created_at)}</p>
          </div>

          <div>
            <p className="text-xs text-body-mid">Company</p>
            <p className="text-sm text-ink">{application.company_name}</p>
          </div>

          <div>
            <p className="text-xs text-body-mid">Contact</p>
            <p className="text-sm text-ink">{application.contact_name}</p>
          </div>

          <div>
            <p className="text-xs text-body-mid">Email</p>
            <p className="text-sm text-ink">{application.email}</p>
          </div>

          {application.phone && (
            <div>
              <p className="text-xs text-body-mid">Phone</p>
              <p className="text-sm text-ink">{application.phone}</p>
            </div>
          )}

          {application.partnership_type && (
            <div>
              <p className="text-xs text-body-mid">Partnership type</p>
              <p className="text-sm capitalize text-ink">
                {application.partnership_type.replace(/_/g, ' ')}
              </p>
            </div>
          )}

          {application.message && (
            <div>
              <p className="text-xs text-body-mid">Message</p>
              <p className="whitespace-pre-wrap text-sm text-ink">{application.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
