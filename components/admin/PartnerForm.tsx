'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { createPartner, updatePartner } from '@/lib/actions/partners';
import type { Partner, PartnershipType } from '@/types/database';

interface PartnerFormProps {
  partner?: Partner;
}

const partnershipTypes = [
  { value: 'speaking', label: 'Speaking' },
  { value: 'sponsoring', label: 'Sponsoring' },
  { value: 'hiring_pipeline', label: 'Hiring Pipeline' },
  { value: 'knowledge', label: 'Knowledge' },
  { value: 'media', label: 'Media' },
];

export function PartnerForm({ partner }: PartnerFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(partner?.name ?? '');
  const [logoUrl, setLogoUrl] = useState(partner?.logo_url ?? '');
  const [websiteUrl, setWebsiteUrl] = useState(partner?.website_url ?? '');
  const [partnershipType, setPartnershipType] = useState(partner?.partnership_type ?? 'speaking');
  const [description, setDescription] = useState(partner?.description ?? '');
  const [isActive, setIsActive] = useState(partner?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(partner?.sort_order ?? 0);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      logo_url: logoUrl || undefined,
      website_url: websiteUrl || undefined,
      description: description || undefined,
      partnership_type: partnershipType,
      is_active: isActive,
      sort_order: sortOrder,
    };

    startTransition(async () => {
      const result = partner
        ? await updatePartner(partner.id, data)
        : await createPartner(data);

      if ('error' in result) {
        showToast(result.error, 'error');
      } else if (!partner && 'id' in result) {
        window.location.href = `/admin/partners/${result.id}`;
      } else {
        showToast('Partner saved successfully.', 'success');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <Input label="Company name" value={name} onChange={(e) => setName(e.target.value)} required />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Logo URL</label>
        <div className="flex items-center gap-4">
          {logoUrl && (
            <img src={logoUrl} alt="" className="h-14 w-14 flex-shrink-0 rounded-[10px] object-contain bg-canvas-soft p-1.5" />
          )}
          <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." />
        </div>
      </div>
      <Input label="Website URL" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
      <Select
        label="Partnership type"
        options={partnershipTypes}
        value={partnershipType ?? 'speaking'}
        onChange={(e) => setPartnershipType(e.target.value as PartnershipType)}
      />
      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input
        label="Sort order"
        type="number"
        value={sortOrder}
        onChange={(e) => setSortOrder(Number(e.target.value))}
      />
      <Toggle label="Active" checked={isActive} onChange={setIsActive} />
      <div className="flex gap-3">
        <Button type="submit" variant="dark" loading={isPending}>
          {partner ? 'Save changes' : 'Create partner'}
        </Button>
        <Button href="/admin/partners" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
