'use client';

import { useState, useTransition } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TestimonialForm } from '@/components/admin/TestimonialForm';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { updateCommunitySettings, deleteTestimonial } from '@/lib/actions/community';
import type { Testimonial } from '@/types/database';
import { useRouter } from 'next/navigation';

interface CommunityPageClientProps {
  settings: {
    community_count: string;
    whatsapp_url: string;
    instagram_url: string;
    linkedin_url: string;
    youtube_url: string;
  };
  testimonials: Testimonial[];
}

export function CommunityPageClient({ settings, testimonials }: CommunityPageClientProps) {
  const { showToast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const [communityCount, setCommunityCount] = useState(settings.community_count);
  const [whatsappUrl, setWhatsappUrl] = useState(settings.whatsapp_url);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagram_url);
  const [linkedinUrl, setLinkedinUrl] = useState(settings.linkedin_url);
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtube_url);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateCommunitySettings({
        community_count: communityCount,
        whatsapp_url: whatsappUrl,
        instagram_url: instagramUrl,
        linkedin_url: linkedinUrl,
        youtube_url: youtubeUrl,
      });

      if (result.error) showToast(result.error, 'error');
      else showToast('Settings saved.', 'success');
    });
  };

  return (
    <div className="space-y-10">
      <section className="rounded-[12px] border border-canvas-soft bg-canvas p-6">
        <h2 className="mb-4 text-base font-medium text-ink">Community settings</h2>
        <form onSubmit={handleSaveSettings} className="grid max-w-2xl gap-4">
          <Input label="Community member count" value={communityCount} onChange={(e) => setCommunityCount(e.target.value)} />
          <Input label="WhatsApp community URL" type="url" value={whatsappUrl} onChange={(e) => setWhatsappUrl(e.target.value)} />
          <Input label="Instagram URL" type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} />
          <Input label="LinkedIn URL" type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
          <Input label="YouTube URL" type="url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} />
          <Button type="submit" variant="dark" loading={isPending}>
            Save settings
          </Button>
        </form>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-medium text-ink">Testimonials</h2>
          <Button variant="primary" size="sm" onClick={() => { setShowForm(true); setEditing(null); }}>
            + Add testimonial
          </Button>
        </div>

        {(showForm || editing) && (
          <div className="mb-6">
            <TestimonialForm
              testimonial={editing ?? undefined}
              onSuccess={() => {
                setShowForm(false);
                setEditing(null);
                router.refresh();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          </div>
        )}

        <div className="overflow-x-auto rounded-[12px] border border-canvas-soft bg-canvas">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-canvas-soft bg-canvas-soft/50">
                <th className="px-4 py-3 font-medium text-body-mid">Quote</th>
                <th className="px-4 py-3 font-medium text-body-mid">Name</th>
                <th className="px-4 py-3 font-medium text-body-mid">College</th>
                <th className="px-4 py-3 font-medium text-body-mid">Active</th>
                <th className="px-4 py-3 font-medium text-body-mid">Sort</th>
                <th className="px-4 py-3 font-medium text-body-mid">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-body-mid">
                    No testimonials yet.
                  </td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id} className="border-b border-canvas-soft last:border-0">
                    <td className="max-w-xs truncate px-4 py-3 text-ink">{t.quote}</td>
                    <td className="px-4 py-3">{t.name}</td>
                    <td className="px-4 py-3 text-body-mid">{t.college ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={t.is_active ? 'text-green-700' : 'text-body-mid'}>
                        {t.is_active ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{t.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => { setEditing(t); setShowForm(false); }}
                          className="text-sm text-primary hover:underline"
                        >
                          Edit
                        </button>
                        <DeleteButton onDelete={() => deleteTestimonial(t.id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
