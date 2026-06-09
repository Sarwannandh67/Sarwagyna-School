interface StatCardProps {
  value: string | number;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-[12px] border border-canvas-soft bg-canvas p-6">
      <p className="text-5xl font-medium text-ink">{value}</p>
      <p className="mt-1 text-sm text-body-mid">{label}</p>
    </div>
  );
}
