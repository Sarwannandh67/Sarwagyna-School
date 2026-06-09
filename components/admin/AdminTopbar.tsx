'use client';

import { usePathname } from 'next/navigation';
import { Topbar } from '@/components/admin/Topbar';

function getPageTitle(pathname: string): string {
  if (pathname.includes('/events/new')) return 'New Event';
  if (pathname.match(/\/events\/[^/]+$/)) return 'Edit Event';
  if (pathname.includes('/speakers/new')) return 'New Speaker';
  if (pathname.match(/\/speakers\/[^/]+$/)) return 'Edit Speaker';
  if (pathname.includes('/partners/new')) return 'New Partner';
  if (pathname.match(/\/partners\/[^/]+$/)) return 'Edit Partner';
  if (pathname.includes('/certificates/new')) return 'Issue Certificate';
  if (pathname.match(/\/certificates\/[^/]+$/)) return 'Edit Certificate';

  const titles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/events': 'Events',
    '/admin/speakers': 'Speakers',
    '/admin/certificates': 'Certificates',
    '/admin/partners': 'Partners',
    '/admin/community': 'Community',
    '/admin/contact': 'Contact',
    '/admin/feedbacks': 'Feedbacks',
    '/admin/about': 'About Page',
    '/admin/settings': 'Site Settings',
  };

  return titles[pathname] ?? 'Admin';
}

interface AdminTopbarProps {
  adminName: string;
  onMenuToggle?: () => void;
}

export function AdminTopbar({ adminName, onMenuToggle }: AdminTopbarProps) {
  const pathname = usePathname();
  return <Topbar pageTitle={getPageTitle(pathname)} adminName={adminName} onMenuToggle={onMenuToggle} />;
}
