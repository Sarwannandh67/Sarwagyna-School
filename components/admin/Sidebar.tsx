'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BRAND, SITE_NAME } from '@/lib/branding';
import { cn, getInitials } from '@/lib/utils';
import { logoutAction } from '@/lib/actions/auth';

type NavItem = { label: string; href: string; icon: React.ReactNode };

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/admin',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Events',
    items: [
      {
        label: 'All Events',
        href: '/admin/events',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        ),
      },
      {
        label: 'Speakers',
        href: '/admin/speakers',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        ),
      },
      {
        label: 'Certificates',
        href: '/admin/certificates',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Growth',
    items: [
      {
        label: 'Partners',
        href: '/admin/partners',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        ),
      },
      {
        label: 'Community',
        href: '/admin/community',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        ),
      },
      {
        label: 'Contact',
        href: '/admin/contact',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        ),
      },
      {
        label: 'Feedbacks',
        href: '/admin/feedbacks',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        label: 'About Page',
        href: '/admin/about',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        ),
      },
      {
        label: 'Site Settings',
        href: '/admin/settings',
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        ),
      },
    ],
  },
];

interface SidebarProps {
  adminEmail: string;
  adminName: string;
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  adminEmail,
  adminName,
  isOpen = false,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed z-40 flex flex-col bg-ink',
          // Mobile: full-width drawer; desktop: floating card with margins
          'left-0 top-0 h-screen w-[240px]',
          'lg:left-3 lg:top-3 lg:h-[calc(100vh-1.5rem)] lg:rounded-2xl',
          'lg:shadow-[0_4px_32px_rgba(0,0,0,0.18)]',
          // Width transition on desktop
          collapsed ? 'lg:w-16' : 'lg:w-[240px]',
          // Smooth transitions for both transform (mobile) and width (desktop)
          'transition-all duration-300 ease-in-out',
          // Visibility
          'lg:visible lg:translate-x-0',
          isOpen ? 'translate-x-0 visible' : '-translate-x-full invisible lg:visible'
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex items-center border-b border-white/10 py-[18px] transition-all duration-300',
            collapsed ? 'px-5 lg:justify-center lg:px-0' : 'px-5'
          )}
        >
          <Link
            href="/admin"
            className={cn('flex items-center gap-2.5', collapsed && 'lg:justify-center')}
          >
            <Image
              src={BRAND.symbol}
              alt={SITE_NAME}
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 object-contain"
            />
            <span
              className={cn(
                'overflow-hidden whitespace-nowrap text-[15px] font-medium text-canvas-soft transition-all duration-300',
                collapsed && 'lg:hidden'
              )}
            >
              {SITE_NAME}
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          {navSections.map((section) => (
            <div key={section.label} className="mb-4">
              <p
                className={cn(
                  'mb-1.5 px-3 text-[11px] font-medium uppercase tracking-wider text-white/40 transition-all duration-300',
                  collapsed && 'lg:hidden'
                )}
              >
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors',
                        collapsed && 'lg:justify-center lg:px-0 lg:py-2.5',
                        isActive(item.href)
                          ? 'bg-primary text-on-primary'
                          : 'text-white/65 hover:bg-white/8 hover:text-white'
                      )}
                    >
                      {item.icon}
                      <span className={cn('whitespace-nowrap', collapsed && 'lg:hidden')}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Collapse toggle — desktop only */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            'hidden items-center border-t border-white/10 py-3 text-[13px] font-medium text-white/40 transition-colors hover:text-white lg:flex',
            collapsed ? 'justify-center' : 'gap-2 px-5'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={cn('h-4 w-4 shrink-0 transition-transform duration-300', collapsed && 'rotate-180')}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className={cn('whitespace-nowrap', collapsed && 'lg:hidden')}>Collapse</span>
        </button>

        {/* Profile + sign out */}
        <div
          className={cn(
            'border-t border-white/10 py-4 transition-all duration-300',
            collapsed ? 'px-4 lg:flex lg:flex-col lg:items-center lg:px-2' : 'px-4'
          )}
        >
          <div
            className={cn(
              'mb-3 flex items-center gap-2',
              collapsed && 'lg:mb-2 lg:justify-center'
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-on-primary">
              {getInitials(adminName)}
            </div>
            <p className={cn('truncate text-xs text-white/65', collapsed && 'lg:hidden')}>
              {adminEmail}
            </p>
          </div>
          <form action={logoutAction} className="w-full">
            <button
              type="submit"
              title={collapsed ? 'Sign Out' : undefined}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white',
                collapsed && 'lg:px-0'
              )}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className={cn('h-4 w-4 shrink-0', collapsed ? 'lg:block' : 'hidden')}
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={cn(collapsed && 'lg:hidden')}>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
