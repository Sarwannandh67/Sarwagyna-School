'use client';

import { useEffect, useState } from 'react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { WHATSAPP_CHANNEL_URL } from '@/lib/constants';
import { cn, isNavigableHref } from '@/lib/utils';

interface CommunityFunnelCTAProps {
  communityCount: string;
  whatsappUrl?: string;
}

/** Sticky mobile bar — appears after scrolling past hero */
export function CommunityFunnelCTA({ communityCount, whatsappUrl }: CommunityFunnelCTAProps) {
  const [visible, setVisible] = useState(false);
  const joinUrl = isNavigableHref(whatsappUrl) ? whatsappUrl! : WHATSAPP_CHANNEL_URL;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t border-mute/30 bg-canvas/95 p-3 shadow-[0_-4px_24px_rgba(32,21,21,0.08)] backdrop-blur-md transition-transform duration-300 sm:hidden',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      role="complementary"
      aria-label="Join community"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">Join {communityCount}+ students</p>
          <p className="truncate text-xs text-body-mid">Free WhatsApp community</p>
        </div>
        <WhatsAppButton href={joinUrl} size="sm">
          Join
        </WhatsAppButton>
      </div>
    </div>
  );
}
