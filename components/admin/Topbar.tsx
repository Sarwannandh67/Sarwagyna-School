import { getInitials } from '@/lib/utils';

interface TopbarProps {
  pageTitle: string;
  adminName: string;
}

export function Topbar({ pageTitle, adminName }: TopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-canvas-soft bg-canvas px-8">
      <h1 className="text-lg font-semibold text-ink">{pageTitle}</h1>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-medium text-canvas">
          {getInitials(adminName)}
        </div>
        <span className="text-sm font-medium text-ink">{adminName}</span>
      </div>
    </header>
  );
}
