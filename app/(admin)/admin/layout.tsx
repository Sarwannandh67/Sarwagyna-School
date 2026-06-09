import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { AdminShell } from '@/components/admin/AdminShell';
import { ToastProvider } from '@/components/ui/Toast';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <ToastProvider>
      <div className="min-h-screen bg-canvas-soft">
        <AdminShell adminEmail={session.email} adminName={session.name}>
          {children}
        </AdminShell>
      </div>
    </ToastProvider>
  );
}
