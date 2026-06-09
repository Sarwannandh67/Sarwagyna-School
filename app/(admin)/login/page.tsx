'use client';

import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from '@/lib/actions/auth';
import { BRAND, SITE_NAME } from '@/lib/branding';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="dark" className="w-full" loading={pending}>
      {pending ? 'Signing in...' : 'Sign In'}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas-soft px-4">
      <div className="w-full max-w-md rounded-[12px] border border-ink bg-canvas p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src={BRAND.logoMain}
            alt={SITE_NAME}
            width={200}
            height={56}
            className="mb-4 h-14 w-auto object-contain"
            priority
          />
          <h1 className="text-xl font-medium text-ink">Admin</h1>
        </div>

        <form action={formAction} className="space-y-4">
          <Input label="Email" name="email" type="email" required autoComplete="email" />
          <Input label="Password" name="password" type="password" required autoComplete="current-password" />
          {state?.error && (
            <p className="text-sm text-red-600" role="alert">
              {state.error}
            </p>
          )}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
