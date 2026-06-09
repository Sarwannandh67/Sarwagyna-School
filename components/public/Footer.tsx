import Link from 'next/link';
import { BrandLogo } from '@/components/public/BrandLogo';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import type { SiteSettingsMap } from '@/lib/data/public';
import { isNavigableHref } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/speakers', label: 'Speakers' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
  { href: '/feedbacks', label: 'Feedbacks' },
  { href: '/community-guidelines', label: 'Guidelines' },
  { href: '/verify', label: 'Verify Certificate' },
];

export interface FooterProps {
  settings: SiteSettingsMap;
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href?: string | null;
  label: string;
  children: React.ReactNode;
}) {
  const className =
    'inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-canvas-soft/20 text-canvas-soft transition-colors';

  if (!isNavigableHref(href)) {
    return (
      <span
        className={`${className} cursor-default opacity-40`}
        aria-label={`${label} (coming soon)`}
        title={`${label} link not set yet`}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${className} hover:bg-canvas-soft/10`}
    >
      {children}
    </a>
  );
}

const socialLinks = [
    {
      key: 'instagram',
      label: 'Instagram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      key: 'youtube',
      label: 'YouTube',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ] as const;

export function Footer({ settings }: FooterProps) {
  const whatsappUrl = isNavigableHref(settings.whatsapp_url)
    ? settings.whatsapp_url
    : undefined;

  const socialHrefs: Record<(typeof socialLinks)[number]['key'], string | undefined> = {
    instagram: settings.instagram_url,
    linkedin: settings.linkedin_url,
    youtube: settings.youtube_url,
  };

  return (
    <footer className="bg-ink px-4 py-12 text-canvas-soft sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <BrandLogo variant="full-light" height={40} />
          <p className="mt-4 text-sm leading-relaxed text-canvas-soft/80">
            Learn what your college forgot to teach you. Startup reality, investment fundamentals,
            AI tools, and career readiness — taught by founders.
          </p>
          <p className="mt-4 text-xs text-canvas-soft/60">
            A Sarwagyna Private Limited Initiative
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-canvas">Navigation</h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-canvas-soft/80 transition-colors hover:text-canvas"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-canvas">Join the community</h3>
          <p className="mt-4 text-sm text-canvas-soft/80">
            {settings.community_count || '410'}+ students School together. Get first access to events, resources, and opportunities.
          </p>
          <WhatsAppButton
            href={whatsappUrl || WHATSAPP_CHANNEL_URL}
            size="md"
            className="mt-4"
          >
            Join our WhatsApp Channel
          </WhatsAppButton>
          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-canvas-soft/60">
              Follow us
            </p>
            <div className="mt-3 flex gap-2">
              {socialLinks.map((link) => (
                <SocialIcon key={link.key} href={socialHrefs[link.key]} label={link.label}>
                  {link.icon}
                </SocialIcon>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-canvas-soft/10 pt-6 text-center text-xs text-canvas-soft/60">
        © {new Date().getFullYear()} Sarwagyna Private Limited. Know everything. Lose nothing.
      </div>
    </footer>
  );
}
