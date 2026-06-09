import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import { StatCard } from '@/components/admin/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  eventTypeColors,
  eventStatusColors,
  eventTypeLabels,
  eventStatusLabels,
  formatDate,
} from '@/lib/utils';
import type { ContactSubmission, Event } from '@/types/database';

export default async function AdminDashboardPage() {
  const [
    { count: totalEvents },
    { count: publishedEvents },
    { count: totalSpeakers },
    { data: settings },
    { data: recentEvents },
    { data: newContacts },
  ] = await Promise.all([
    supabaseAdmin.from('events').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('events').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabaseAdmin.from('speakers').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabaseAdmin.from('site_settings').select('value').eq('key', 'community_count').single(),
    supabaseAdmin.from('events').select('*').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .eq('status', 'new')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const communityCount = settings?.value ?? '0';
  const events = (recentEvents ?? []) as Event[];
  const contacts = (newContacts ?? []) as ContactSubmission[];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard value={totalEvents ?? 0} label="Total Events" />
        <StatCard value={publishedEvents ?? 0} label="Published Events" />
        <StatCard value={totalSpeakers ?? 0} label="Active Speakers" />
        <StatCard value={communityCount} label="Community Members" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href="/admin/events/new" variant="primary" size="sm">
          + New Event
        </Button>
        <Button href="/admin/speakers/new" variant="dark" size="sm">
          + Add Speaker
        </Button>
        <Button href="/admin/partners/new" variant="dark" size="sm">
          + New Partner
        </Button>
        <Button href="/admin/certificates/new" variant="dark" size="sm">
          Issue Certificate
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[12px] border border-canvas-soft bg-canvas p-5">
          <h2 className="mb-4 text-base font-medium text-ink">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-canvas-soft text-body-mid">
                  <th className="pb-2 pr-3 font-medium">Type</th>
                  <th className="pb-2 pr-3 font-medium">Title</th>
                  <th className="pb-2 pr-3 font-medium">Status</th>
                  <th className="pb-2 pr-3 font-medium">Date</th>
                  <th className="pb-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-body-mid">
                      No events yet.
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="border-b border-canvas-soft last:border-0">
                      <td className="py-3 pr-3">
                        <Badge className={eventTypeColors[event.event_type]}>
                          {eventTypeLabels[event.event_type]}
                        </Badge>
                      </td>
                      <td className="py-3 pr-3 font-medium text-ink">{event.title}</td>
                      <td className="py-3 pr-3">
                        <Badge className={eventStatusColors[event.status]}>
                          {eventStatusLabels[event.status]}
                        </Badge>
                      </td>
                      <td className="py-3 pr-3 text-body-mid">{formatDate(event.event_date)}</td>
                      <td className="py-3">
                        <Link href={`/admin/events/${event.id}`} className="text-sm text-primary hover:underline">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[12px] border border-canvas-soft bg-canvas p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-medium text-ink">New Contact Submissions</h2>
            {contacts.length > 0 && (
              <Badge className="bg-primary text-on-primary">{contacts.length} new</Badge>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-canvas-soft text-body-mid">
                  <th className="pb-2 pr-3 font-medium">Name</th>
                  <th className="pb-2 pr-3 font-medium">Type</th>
                  <th className="pb-2 pr-3 font-medium">Date</th>
                  <th className="pb-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-body-mid">
                      No new submissions.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-canvas-soft last:border-0">
                      <td className="py-3 pr-3 font-medium text-ink">{contact.name}</td>
                      <td className="py-3 pr-3 capitalize text-body-mid">{contact.inquiry_type}</td>
                      <td className="py-3 pr-3 text-body-mid">{formatDate(contact.created_at)}</td>
                      <td className="py-3">
                        <Link href="/admin/contact" className="text-sm text-primary hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
