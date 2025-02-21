import { FolderClosed, FolderDown } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingExportCard() {
  return (
    <Card className="relative cursor-pointer overflow-hidden">
      <div className="flex items-center p-4">
        <FolderClosed strokeWidth={1.5} className="mr-4 size-12 text-muted" />
        <div className="flex-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <div className="size-6" />
      </div>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col space-y-8">
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>
            Select an accreditation under which you want to export data.
          </CardDescription>
        </CardHeader>
        <div className="absolute -bottom-2 -right-2 -top-2">
          <FolderDown className="size-36 text-muted" />
        </div>
      </Card>
      <div className="flex flex-col space-y-4">
        <LoadingExportCard />
        <LoadingExportCard />
        <LoadingExportCard />
      </div>
    </div>
  );
}
