'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/public/BrandLogo';
import { SITE_NAME } from '@/lib/branding';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/speakers', label: 'Speakers' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
];

function isActivePath(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export interface NavbarProps {
  whatsappUrl?: string;
}

export function Navbar({ whatsappUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Floating header — pointer-events-none on the wrapper so the gap around the pill is click-through */}
      <header className="pointer-events-none sticky top-0 z-40 px-3 py-3 sm:px-6">
        <div className="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-mute/20 bg-canvas/95 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md sm:px-5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <BrandLogo variant="symbol" height={30} priority />
            <span className="text-[15px] font-semibold text-ink">{SITE_NAME}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-xl px-3 py-1.5 text-sm transition-colors',
                  isActivePath(link.href, pathname)
                    ? 'bg-ink/8 font-medium text-ink'
                    : 'text-body hover:bg-ink/5 hover:text-ink'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {whatsappUrl && (
              <Button href={whatsappUrl} variant="primary" size="sm" className="hidden sm:inline-flex">
                Join Community
              </Button>
            )}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink transition-colors hover:bg-ink/5 lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm transition-opacity lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <nav
        className={cn(
          'fixed right-0 top-0 z-40 h-dvh w-72 bg-canvas shadow-2xl transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex h-[68px] items-center justify-between border-b border-mute/20 px-5">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <BrandLogo variant="symbol" height={26} />
            <span className="text-sm font-semibold text-ink">{SITE_NAME}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-body transition-colors hover:bg-canvas-soft hover:text-ink"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col p-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center rounded-xl px-4 py-2.5 text-[15px] transition-colors',
                  isActivePath(link.href, pathname)
                    ? 'bg-canvas-soft font-medium text-ink'
                    : 'text-body hover:bg-canvas-soft hover:text-ink'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {whatsappUrl && (
          <div className="border-t border-mute/20 p-4">
            <Button href={whatsappUrl} variant="primary" size="md" className="w-full">
              Join Community
            </Button>
          </div>
        )}
      </nav>
    </>
  );
}
