'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { createSpeaker, updateSpeaker } from '@/lib/actions/speakers';
import { getInitials } from '@/lib/utils';
import type { SpeakerWithEvents } from '@/types/database';

interface SpeakerFormProps {
  speaker?: SpeakerWithEvents;
}

const SUGGESTED_TAGS = ['STARTUP', 'CAREER', 'INVESTMENT', 'AI', 'TECH', 'DESIGN'];

export function SpeakerForm({ speaker }: SpeakerFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(speaker?.name ?? '');
  const [title, setTitle] = useState(speaker?.title ?? '');
  const [company, setCompany] = useState(speaker?.company ?? '');
  const [shortBio, setShortBio] = useState(speaker?.short_bio ?? '');
  const [bio, setBio] = useState(speaker?.bio ?? '');
  const [linkedinUrl, setLinkedinUrl] = useState(speaker?.linkedin_url ?? '');
  const [twitterUrl, setTwitterUrl] = useState(speaker?.twitter_url ?? '');
  const [websiteUrl, setWebsiteUrl] = useState(speaker?.website_url ?? '');
  const [avatarUrl, setAvatarUrl] = useState(speaker?.avatar_url ?? '');
  const [isActive, setIsActive] = useState(speaker?.is_active ?? true);
  const [isHiring, setIsHiring] = useState(speaker?.is_hiring ?? false);
  const [tags, setTags] = useState<string[]>(speaker?.tags ?? []);
  const [tagInput, setTagInput] = useState('');

  const addTag = (tag: string) => {
    const t = tag.trim().toUpperCase();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      title: title || undefined,
      company: company || undefined,
      short_bio: shortBio || undefined,
      bio: bio || undefined,
      linkedin_url: linkedinUrl || undefined,
      twitter_url: twitterUrl || undefined,
      website_url: websiteUrl || undefined,
      avatar_url: avatarUrl || undefined,
      tags,
      is_active: isActive,
      is_hiring: isHiring,
    };

    startTransition(async () => {
      const result = speaker
        ? await updateSpeaker(speaker.id, data)
        : await createSpeaker(data);

      if ('error' in result) {
        showToast(result.error, 'error');
      } else if (!speaker && 'id' in result) {
        window.location.href = `/admin/speakers/${result.id}`;
      } else {
        showToast('Speaker saved successfully.', 'success');
      }
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Founder, Data Engineer..." />
          <Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <Textarea
            label="Short bio"
            value={shortBio}
            onChange={(e) => setShortBio(e.target.value)}
            maxLength={160}
            charCount
            className="min-h-[80px]"
          />
          <Textarea label="Full bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          <Input label="LinkedIn URL" type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
          <Input label="Twitter URL" type="url" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} />
          <Input label="Website URL" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Avatar URL</label>
            <div className="flex items-center gap-4">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="h-16 w-16 flex-shrink-0 rounded-full object-cover" />
              ) : (
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-canvas-soft text-sm font-medium text-ink">
                  {name ? getInitials(name) : '??'}
                </div>
              )}
              <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <Toggle label="Active" checked={isActive} onChange={setIsActive} />
          <Toggle label="Actively hiring" checked={isHiring} onChange={setIsHiring} />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Tags</label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-pill bg-canvas-soft px-2.5 py-1 text-xs font-medium text-body">
                  {tag}
                  <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))} className="text-body-mid hover:text-ink">×</button>
                </span>
              ))}
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((tag) => (
                <button key={tag} type="button" onClick={() => addTag(tag)} className="rounded-pill border border-mute/50 px-2.5 py-1 text-xs text-body-mid hover:border-ink hover:text-ink">
                  + {tag}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
              placeholder="Type tag and press Enter"
              className="w-full rounded-[12px] border border-mute/50 bg-canvas px-4 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>

      {speaker?.event_speakers && speaker.event_speakers.length > 0 && (
        <div className="rounded-[12px] border border-canvas-soft bg-canvas p-5">
          <h3 className="mb-3 text-sm font-medium text-ink">Linked events</h3>
          <ul className="space-y-2">
            {speaker.event_speakers.map((es) => (
              <li key={es.id}>
                <Link href={`/admin/events/${es.event_id}`} className="text-sm text-primary hover:underline">
                  {es.event?.title ?? es.event_id}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-body-mid">Manage speaker assignments from the Events module.</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" variant="dark" loading={isPending}>
          {speaker ? 'Save changes' : 'Create speaker'}
        </Button>
        <Button href="/admin/speakers" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
