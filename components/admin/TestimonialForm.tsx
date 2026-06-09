'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { createTestimonial, updateTestimonial } from '@/lib/actions/community';
import type { Testimonial } from '@/types/database';

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TestimonialForm({ testimonial, onSuccess, onCancel }: TestimonialFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [quote, setQuote] = useState(testimonial?.quote ?? '');
  const [name, setName] = useState(testimonial?.name ?? '');
  const [college, setCollege] = useState(testimonial?.college ?? '');
  const [city, setCity] = useState(testimonial?.city ?? '');
  const [role, setRole] = useState(testimonial?.role ?? '');
  const [isActive, setIsActive] = useState(testimonial?.is_active ?? true);
  const [sortOrder, setSortOrder] = useState(testimonial?.sort_order ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      quote,
      name,
      college: college || undefined,
      city: city || undefined,
      role: role || undefined,
      is_active: isActive,
      sort_order: sortOrder,
    };

    startTransition(async () => {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, data)
        : await createTestimonial(data);

      if (result.error) {
        showToast(result.error, 'error');
      } else {
        showToast('Testimonial saved.', 'success');
        onSuccess?.();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[12px] border border-canvas-soft bg-canvas p-5">
      <Textarea label="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="College" value={college} onChange={(e) => setCollege(e.target.value)} />
        <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <Input
          label="Sort order"
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
        />
      </div>
      <Toggle label="Active" checked={isActive} onChange={setIsActive} />
      <div className="flex gap-3">
        <Button type="submit" variant="dark" loading={isPending}>
          {testimonial ? 'Update' : 'Add'} testimonial
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
