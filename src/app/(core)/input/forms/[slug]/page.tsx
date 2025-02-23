import { NotebookPen } from 'lucide-react';

import { getFormFields } from '@/lib/actions/input';

import { FormGenerator } from '@/components/form-generator';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function InputFormPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const form = await getFormFields({ slug });

  return (
    <div className="flex flex-col space-y-8">
      <Card className="relative overflow-hidden">
        <CardHeader className="relative z-10">
          <CardTitle className="font-heading tracking-normal">
            {form.name}
          </CardTitle>
          <CardDescription>{form.description}</CardDescription>
        </CardHeader>
        <div className="absolute -bottom-2 -right-2 -top-4 z-0">
          <NotebookPen className="size-36 text-muted" />
        </div>
      </Card>
      <Card className="p-8">
        <FormGenerator form={form} />
      </Card>
    </div>
  );
}
