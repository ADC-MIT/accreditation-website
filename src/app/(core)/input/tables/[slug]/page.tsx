import { getTableFields } from '@/lib/actions/tables';

import InputTableRootPageClient from '@/app/(core)/input/tables/[slug]/page.client';

export default async function InputTableRootPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const table = await getTableFields({ slug });

  return <InputTableRootPageClient slug={slug} table={table} />;
}
