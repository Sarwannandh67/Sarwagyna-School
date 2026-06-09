'use client';

import { useState, useTransition } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface DeleteButtonProps {
  onDelete: () => Promise<{ error?: string; success?: boolean }>;
  label?: string;
  confirmMessage?: string;
}

export function DeleteButton({
  onDelete,
  label = 'Delete',
  confirmMessage = 'Are you sure you want to delete this item? This action cannot be undone.',
}: DeleteButtonProps) {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await onDelete();
      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
        setError(null);
        showToast('Deleted successfully.', 'success');
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-body-mid transition-colors hover:text-red-600"
        aria-label={label}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 6h10M8 6V4.5A1.5 1.5 0 019.5 3h1A1.5 1.5 0 0112 4.5V6m2 0v9.5a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 016 15.5V6h8z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm delete">
        <p className="mb-4 text-sm text-body">{confirmMessage}</p>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" loading={isPending} onClick={handleDelete}>
            {label}
          </Button>
        </div>
      </Modal>
    </>
  );
}
