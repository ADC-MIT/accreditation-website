import { Download, Sheet, SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function InputTableRootPageSkeleton() {
  // Create 5 skeleton rows
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);
  // Create 6 columns
  const skeletonCols = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section className="flex flex-col space-y-8">
      <Card className="relative overflow-hidden">
        <CardHeader className="relative z-10">
          <CardTitle className="font-heading tracking-normal">
            <Skeleton className="h-7 w-[200px]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-[300px]" />
          </CardDescription>
        </CardHeader>
        <span className="absolute -bottom-4 -right-3 -top-1 z-0">
          <Sheet className="size-36 text-muted" />
        </span>
      </Card>

      <section className="flex flex-col space-y-8">
        <div className="flex justify-between">
          <Button disabled>
            <SquarePen /> Input Data
          </Button>
          <Button variant="secondary" disabled>
            <Download /> Export Data
          </Button>
        </div>

        <Card className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {skeletonCols.map((col) => (
                    <TableHead key={col} className="whitespace-nowrap">
                      <Skeleton className="h-4 w-[100px]" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {skeletonRows.map((row) => (
                  <TableRow key={row}>
                    {skeletonCols.map((col) => (
                      <TableCell key={`${row}-${col}`}>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </section>
  );
}
