import { Globe, Search } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function InputRootPageSkeleton() {
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
          className="bg-accent focus-visible:ring-accent"
          disabled
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, index) => (
          <Card key={index} className="p-4">
            <Skeleton className="mb-2 h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-2/3" />
          </Card>
        ))}
      </div>
    </div>
  );
}
