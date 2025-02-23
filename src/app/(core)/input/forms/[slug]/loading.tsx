import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function InputFormPageSkeleton() {
  return (
    <div className="flex flex-col space-y-8">
      <Card className="relative overflow-hidden">
        <CardHeader className="relative z-10">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
        </CardHeader>
      </Card>
      <Card className="p-8">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
