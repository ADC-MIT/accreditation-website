import { getSummary } from '@/lib/actions/summary';

import SummaryPageClient from '@/app/(core)/summary/page.client';

export default async function SummaryPage() {
  const summary = await getSummary();

  return <SummaryPageClient data={summary} />;
}
