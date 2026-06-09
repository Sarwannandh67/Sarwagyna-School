'use client';

import { useCallback, useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { cn } from '@/lib/utils';

interface AdminShellProps {
  adminEmail: string;
  adminName: string;
  children: React.ReactNode;
}

export function AdminShell({ adminEmail, adminName, children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);
  const toggleCollapse = useCallback(() => setCollapsed((c) => !c), []);

  return (
    <>
      <Sidebar
        adminEmail={adminEmail}
        adminName={adminName}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />
      {/* Margin transitions in sync with sidebar width change */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-[margin] duration-300 ease-in-out',
          collapsed ? 'lg:ml-[88px]' : 'lg:ml-[264px]'
        )}
      >
        <AdminTopbar adminName={adminName} onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </>
  );
}
