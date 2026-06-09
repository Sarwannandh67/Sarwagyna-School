'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { updateSiteSettings } from '@/lib/actions/settings';

interface SettingsFormProps {
  initial: {
    meta_title: string;
    meta_description: string;
    whatsapp_url: string;
    community_count: string;
    instagram_url: string;
    linkedin_url: string;
    youtube_url: string;
    contact_email: string;
  };
}

export function SettingsForm({ initial }: SettingsFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(initial);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateSiteSettings(form);
      if (result.error) showToast(result.error, 'error');
      else showToast('All settings saved.', 'success');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <section className="space-y-4 rounded-[12px] border border-canvas-soft bg-canvas p-6">
        <h2 className="text-base font-medium text-ink">SEO</h2>
        <Input
          label="Meta title"
          value={form.meta_title}
          onChange={(e) => update('meta_title', e.target.value)}
          maxLength={60}
        />
        <Textarea
          label="Meta description"
          value={form.meta_description}
          onChange={(e) => update('meta_description', e.target.value)}
          maxLength={160}
          charCount
          className="min-h-[80px]"
        />
      </section>

      <section className="space-y-4 rounded-[12px] border border-canvas-soft bg-canvas p-6">
        <h2 className="text-base font-medium text-ink">Community</h2>
        <Input label="WhatsApp URL" type="url" value={form.whatsapp_url} onChange={(e) => update('whatsapp_url', e.target.value)} />
        <Input label="Community member count" value={form.community_count} onChange={(e) => update('community_count', e.target.value)} />
      </section>

      <section className="space-y-4 rounded-[12px] border border-canvas-soft bg-canvas p-6">
        <h2 className="text-base font-medium text-ink">Social</h2>
        <Input label="Instagram URL" type="url" value={form.instagram_url} onChange={(e) => update('instagram_url', e.target.value)} />
        <Input label="LinkedIn URL" type="url" value={form.linkedin_url} onChange={(e) => update('linkedin_url', e.target.value)} />
        <Input label="YouTube URL" type="url" value={form.youtube_url} onChange={(e) => update('youtube_url', e.target.value)} />
      </section>

      <section className="space-y-4 rounded-[12px] border border-canvas-soft bg-canvas p-6">
        <h2 className="text-base font-medium text-ink">Contact</h2>
        <Input label="Public contact email" type="email" value={form.contact_email} onChange={(e) => update('contact_email', e.target.value)} />
      </section>

      <Button type="submit" variant="primary" loading={isPending}>
        Save all settings
      </Button>
    </form>
  );
}
