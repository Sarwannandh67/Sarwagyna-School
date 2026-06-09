'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND, SITE_NAME } from '@/lib/branding';
import { cn, getInitials } from '@/lib/utils';
import { logoutAction } from '@/lib/actions/auth';

const navSections = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin' }],
  },
  {
    label: 'Events',
    items: [
      { label: 'All Events', href: '/admin/events' },
      { label: 'Speakers', href: '/admin/speakers' },
      { label: 'Certificates', href: '/admin/certificates' },
    ],
  },
  {
    label: 'Growth',
    items: [
      { label: 'Partners', href: '/admin/partners' },
      { label: 'Community', href: '/admin/community' },
      { label: 'Contact', href: '/admin/contact' },
      { label: 'Feedbacks', href: '/admin/feedbacks' },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'About Page', href: '/admin/about' },
      { label: 'Site Settings', href: '/admin/settings' },
    ],
  },
];

interface SidebarProps {
  adminEmail: string;
  adminName: string;
}

export function Sidebar({ adminEmail, adminName }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col bg-ink">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image
            src={BRAND.symbol}
            alt={SITE_NAME}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="text-[15px] font-medium text-canvas-soft">{SITE_NAME}</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-white/40">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2 text-[13px] font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-primary text-on-primary'
                        : 'text-white/65 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-on-primary">
            {getInitials(adminName)}
          </div>
          <p className="truncate text-xs text-white/65">{adminEmail}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-md border border-white/20 px-3 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
