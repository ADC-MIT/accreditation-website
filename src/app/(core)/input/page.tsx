import { getForms } from '@/lib/actions/input';

import InputRootPageClient from '@/app/(core)/input/page.client';

export default async function InputRootPage() {
  const forms = await getForms();

  return <InputRootPageClient forms={forms} />;
}
