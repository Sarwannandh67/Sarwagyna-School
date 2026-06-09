import { fetchAllFeedbacksAdmin } from '@/lib/data/feedbacks';
import { FeedbacksPageClient } from '@/components/admin/FeedbacksPageClient';

export default async function AdminFeedbacksPage() {
  const feedbacks = await fetchAllFeedbacksAdmin();

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter((f) => !f.is_approved).length,
    approved: feedbacks.filter((f) => f.is_approved).length,
  };

  return <FeedbacksPageClient feedbacks={feedbacks} stats={stats} />;
}
