'use client';

import { TableDetails } from '@/types';
import { Fingerprint, Sheet, SquarePen } from 'lucide-react';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import ExportButton from '@/components/export-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function navigateToInputForm(
  formId: string,
  router: ReturnType<typeof useRouter>
) {
  toast.promise(
    () =>
      new Promise((resolve) => {
        router.push(`/input/forms/${formId}`);
        // Simulate a delay to show the loading state
        setTimeout(resolve, 500);
      }),
    {
      loading: 'Loading form details...',
      success: 'Form details loaded',
      error: 'Failed to load form details',
    }
  );
}

export default function InputTableRootPageClient({
  slug,
  table,
}: {
  slug: string;
  table: TableDetails;
}) {
  const router = useRouter();
  const data = table?.data || [];
  const headers = data.length ? Object.keys(data[0]) : [];
  const formattedHeaders = headers.map((header) =>
    header.toLowerCase().includes('id')
      ? header
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase())
          .replace(/Id/gi, 'ID')
      : header.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  );

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-8">
        <Card className="relative overflow-hidden">
          <CardHeader className="relative z-10">
            <CardTitle className="font-heading tracking-normal">
              {slug
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}{' '}
              Table
            </CardTitle>
            <CardDescription>
              View all the rows of the given table.
            </CardDescription>
          </CardHeader>
          <div className="absolute -bottom-4 -right-3 -top-1 z-0">
            <Sheet className="size-36 text-muted" />
          </div>
        </Card>

        <div className="flex flex-col space-y-8">
          <div className="flex justify-between">
            <Button onClick={() => navigateToInputForm(slug, router)}>
              <SquarePen /> Input Data
            </Button>
            <ExportButton
              title={`${slug
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())} Table`}
              description="This data has been exported manually from MIT-ARS."
              tableData={table.data || []}
            />
          </div>
          <Card className="p-0">
            <div className="overflow-x-auto">
              {data.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  There is no data in this table.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {formattedHeaders.map((h) => (
                        <TableHead key={h} className="whitespace-nowrap">
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.id}>
                        {headers.map((header) => (
                          <TableCell key={`${row.id}-${header}`}>
                            {header.toLowerCase().includes('id') ||
                            header.toLowerCase() === 'sdg_goals' ? (
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="cursor-pointer">
                                    <Fingerprint size={16} />
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>{row[header]}</TooltipContent>
                              </Tooltip>
                            ) : typeof row[header] === 'boolean' ? (
                              row[header] ? (
                                'Yes'
                              ) : (
                                'No'
                              )
                            ) : (
                              row[header]
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
