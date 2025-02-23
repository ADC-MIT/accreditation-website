import {
  ChevronRight,
  FileText,
  FolderClosed,
  FolderDown,
  Search,
} from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingExportCard() {
  return (
    <Card className="relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-accent">
      <div className="flex items-center p-4">
        <FolderClosed strokeWidth={1.5} className="mr-4 size-12 text-muted" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="mt-1.5 h-4 w-64" />
        </div>
        <ChevronRight className="size-6 text-muted" />
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
      <div className="flex items-center space-x-2">
        <Search className="size-6 text-muted-foreground" />
        <Input
          type="text"
          placeholder="What would you like to export?"
          disabled
          className="bg-accent focus-visible:ring-accent"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <LoadingExportCard />
        <LoadingExportCard />
        <LoadingExportCard />
        <Card className="relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-accent">
          <div className="flex items-center p-4">
            <FileText strokeWidth={1.5} className="mr-4 size-12 text-muted" />
            <div className="flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-1.5 h-5 w-96" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
