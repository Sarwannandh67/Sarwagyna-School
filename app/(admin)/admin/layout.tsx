import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { Sidebar } from '@/components/admin/Sidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
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
        <Sidebar adminEmail={session.email} adminName={session.name} />
        <div className="ml-[240px] flex min-h-screen flex-col">
          <AdminTopbar adminName={session.name} />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
