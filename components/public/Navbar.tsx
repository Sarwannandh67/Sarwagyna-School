'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

export interface NavbarProps {
  whatsappUrl?: string;
}

export function Navbar({ whatsappUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-mute/30 bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <BrandLogo variant="symbol" height={32} priority />
          <span className="hidden text-base font-medium text-ink sm:inline sm:text-lg">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[12px] px-3 py-2 text-sm text-body transition-colors hover:bg-canvas-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {whatsappUrl && (
            <Button
              href={whatsappUrl}
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Join Community
            </Button>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] text-ink transition-colors hover:bg-canvas-soft lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M5 5l12 12M17 5L5 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path
                  d="M3 6h16M3 11h16M3 16h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 top-16 z-30 bg-ink/30 backdrop-blur-sm transition-opacity lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <nav
        className={cn(
          'fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 border-l border-mute/30 bg-canvas p-4 shadow-xl transition-transform lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-[12px] px-4 py-3 text-base text-body transition-colors hover:bg-canvas-soft hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {whatsappUrl && (
          <div className="mt-4 border-t border-mute/30 pt-4">
            <Button
              href={whatsappUrl}
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Join Community
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
