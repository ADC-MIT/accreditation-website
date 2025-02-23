import { getExportData } from '@/lib/actions/export';

import ExportTableRootPageClient from '@/app/(core)/export/tables/[accreditation]/[slug]/page.client';

export default async function InputTableRootPage(props: {
  params: Promise<{ accreditation: string; slug: string }>;
}) {
  const { accreditation, slug } = await props.params;
  const table = await getExportData({ accreditation, slug });

  return (
    <ExportTableRootPageClient
      accreditation={accreditation}
      slug={slug}
      table={table}
      description={table.description || ''}
    />
  );
}
