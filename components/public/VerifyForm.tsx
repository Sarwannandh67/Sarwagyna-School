'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function VerifyForm() {
  const router = useRouter();
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = id.trim();
    if (trimmed) router.push(`/verify/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left">
      <Input
        label="Certificate ID"
        placeholder="e.g. SARW-2026-0001"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <Button type="submit" variant="dark" className="w-full" disabled={!id.trim()}>
        Verify Certificate
      </Button>
    </form>
  );
}
