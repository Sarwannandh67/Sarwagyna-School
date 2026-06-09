import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { ToastProvider } from '@/components/ui/Toast';
import { fetchSiteSettings } from '@/lib/data/public';
import { isNavigableHref } from '@/lib/utils';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSiteSettings();

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar
          whatsappUrl={
            isNavigableHref(settings.whatsapp_url) ? settings.whatsapp_url : undefined
          }
        />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
    </ToastProvider>
  );
}
