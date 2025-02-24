'use client';

import { FormList } from '@/types';
import { Globe, Search } from 'lucide-react';
import { toast } from 'sonner';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function navigateToInputTable(
  formId: string,
  router: ReturnType<typeof useRouter>
) {
  toast.promise(
    () =>
      new Promise((resolve) => {
        router.push(`/input/tables/${formId}`);
        // Simulate a delay to show the loading state
        setTimeout(resolve, 500);
      }),
    {
      loading: 'Loading table data...',
      success: 'Table data loaded!',
      error: 'Failed to load table data!',
    }
  );
}

export default function InputRootPageClient({ forms }: { forms: FormList }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-8">
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle>Input Data</CardTitle>
          <CardDescription>
            Here's a list of domains under which you can input data.
          </CardDescription>
        </CardHeader>
        <div className="absolute -bottom-2 -right-2 -top-4">
          <Globe className="size-36 text-muted" />
        </div>
      </Card>
      <div className="flex items-center space-x-2">
        <Search className="size-6 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Which domain are you looking for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={searchInputRef}
          className="bg-accent focus-visible:ring-accent"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredForms.length > 0 ? (
          filteredForms.map((form) => (
            <Card
              key={form.id}
              onClick={() => navigateToInputTable(form.id, router)}
              className="group flex cursor-pointer items-start p-4 transition-colors duration-300 hover:bg-accent"
            >
              <div>
                <h3 className="font-semibold">{form.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {form.description}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <p className="col-span-3 text-center text-muted-foreground">
            No forms found.
          </p>
        )}
      </div>
    </div>
  );
}
