import { getSiteSettings } from '@/lib/utils';
import { AboutForm } from '@/components/admin/AboutForm';

export default async function AdminAboutPage() {
  const settings = await getSiteSettings();

  return (
    <AboutForm
      initialSettings={{
        about_mission: settings.about_mission ?? '',
        about_vision: settings.about_vision ?? '',
        about_milestone_1: settings.about_milestone_1 ?? '2026 — Community and free webinars',
        about_milestone_2: settings.about_milestone_2 ?? '2027 — Low-cost paid courses',
        about_milestone_3: settings.about_milestone_3 ?? 'Future — A full Sarwagyna institution',
      }}
    />
  );
}
