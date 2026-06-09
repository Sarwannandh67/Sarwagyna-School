'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { ApplicationDrawer } from '@/components/admin/ApplicationDrawer';
import { StatusSelect } from '@/components/admin/StatusSelect';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { cn, formatDateTime } from '@/lib/utils';
import {
  deletePartner,
  togglePartnerActive,
  updateApplicationStatus,
} from '@/lib/actions/partners';
import type { ApplicationStatus, Partner, PartnerApplication } from '@/types/database';

interface PartnersListClientProps {
  partners: Partner[];
  applications: PartnerApplication[];
}

export function PartnersListClient({ partners, applications }: PartnersListClientProps) {
  const router = useRouter();
  const [tab, setTab] = useState<'partners' | 'applications'>('partners');
  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusOptions: { value: ApplicationStatus; label: string }[] = [
    { value: 'new', label: 'New' },
    { value: 'reviewing', label: 'Reviewing' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab('partners')}
            className={cn(
              'rounded-pill px-4 py-1.5 text-sm font-medium',
              tab === 'partners' ? 'bg-ink text-canvas' : 'border border-ink text-ink'
            )}
          >
            Partners
          </button>
          <button
            type="button"
            onClick={() => setTab('applications')}
            className={cn(
              'rounded-pill px-4 py-1.5 text-sm font-medium',
              tab === 'applications' ? 'bg-ink text-canvas' : 'border border-ink text-ink'
            )}
          >
            Applications ({applications.filter((a) => a.status === 'new').length} new)
          </button>
        </div>
        {tab === 'partners' && (
          <Button href="/admin/partners/new" variant="primary" size="sm">
            + New Partner
          </Button>
        )}
      </div>

      {tab === 'partners' ? (
        <DataTable
          data={partners}
          searchPlaceholder="Search partners..."
          searchFn={(row, q) => row.name.toLowerCase().includes(q)}
          onRowClick={(row) => router.push(`/admin/partners/${row.id}`)}
          columns={[
            {
              key: 'logo',
              header: 'Logo',
              render: (row) =>
                row.logo_url ? (
                  <img src={row.logo_url} alt="" className="h-8 w-8 rounded object-contain" />
                ) : (
                  '—'
                ),
            },
            { key: 'name', header: 'Name', render: (row) => <span className="font-medium">{row.name}</span> },
            {
              key: 'partnership_type',
              header: 'Type',
              render: (row) => row.partnership_type?.replace(/_/g, ' ') ?? '—',
            },
            {
              key: 'is_active',
              header: 'Active',
              render: (row) => (
                <Toggle
                  label=""
                  checked={row.is_active}
                  onChange={(checked) => togglePartnerActive(row.id, checked).then(() => router.refresh())}
                  className="!gap-0"
                />
              ),
            },
            { key: 'sort_order', header: 'Sort' },
          ]}
          actions={(row) => (
            <div className="flex items-center gap-3">
              <Link href={`/admin/partners/${row.id}`} className="text-sm text-primary hover:underline">
                Edit
              </Link>
              <DeleteButton onDelete={() => deletePartner(row.id)} />
            </div>
          )}
          emptyMessage="No partners yet."
        />
      ) : (
        <DataTable
          data={applications}
          searchPlaceholder="Search applications..."
          columns={[
            {
              key: 'created_at',
              header: 'Date',
              render: (row) => formatDateTime(row.created_at),
            },
            { key: 'company_name', header: 'Company' },
            { key: 'contact_name', header: 'Contact' },
            { key: 'email', header: 'Email' },
            {
              key: 'partnership_type',
              header: 'Type',
              render: (row) => row.partnership_type?.replace(/_/g, ' ') ?? '—',
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <StatusSelect
                  value={row.status}
                  options={statusOptions}
                  onChange={(status) => updateApplicationStatus(row.id, status)}
                />
              ),
            },
          ]}
          actions={(row) => (
            <button
              type="button"
              onClick={() => {
                setSelectedApp(row);
                setDrawerOpen(true);
              }}
              className="text-sm text-primary hover:underline"
            >
              View
            </button>
          )}
          emptyMessage="No applications yet."
        />
      )}

      <ApplicationDrawer
        application={selectedApp}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedApp(null);
        }}
      />
    </div>
  );
}
