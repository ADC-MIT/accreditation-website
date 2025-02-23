import {
  getNAACFields,
  getNBAFields,
  getNIRFFields,
} from '@/lib/actions/export';

import ExportRootPageClient from '@/app/(core)/export/page.client';

export default async function ExportRootPage() {
  const naacFields = await getNAACFields({});
  const nbaFields = await getNBAFields({});
  const nirfFields = await getNIRFFields({});

  return (
    <ExportRootPageClient
      naacFields={naacFields}
      nbaFields={nbaFields}
      nirfFields={nirfFields}
    />
  );
}
