import Image from 'next/image';
import type { Partner } from '@/types/database';

export interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const content = (
    <div className="card-outlined flex h-full flex-col items-center justify-center p-6 text-center transition-colors hover:border-primary/30">
      {partner.logo_url ? (
        <div className="relative mb-4 h-16 w-full">
          <Image
            src={partner.logo_url}
            alt={partner.name}
            fill
            className="object-contain"
            sizes="200px"
          />
        </div>
      ) : (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[12px] bg-canvas-soft text-xl font-medium text-ink">
          {partner.name.charAt(0)}
        </div>
      )}
      <h3 className="text-base font-medium text-ink">{partner.name}</h3>
      {partner.description && (
        <p className="mt-2 line-clamp-2 text-sm text-body">{partner.description}</p>
      )}
    </div>
  );

  if (partner.website_url) {
    return (
      <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
