import { getInitials } from '@/lib/utils';

interface TopbarProps {
  pageTitle: string;
  adminName: string;
  onMenuToggle?: () => void;
}

export function Topbar({ pageTitle, adminName, onMenuToggle }: TopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-canvas-soft bg-canvas px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-canvas-soft lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M2.5 5h15M2.5 10h15M2.5 15h15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-ink">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-medium text-canvas">
          {getInitials(adminName)}
        </div>
        <span className="hidden text-sm font-medium text-ink sm:inline">{adminName}</span>
      </div>
    </header>
  );
}
