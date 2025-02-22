import { Fingerprint, Sheet } from 'lucide-react';

import { getTableFields } from '@/lib/actions/tables';

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

export default async function TableRootPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const table = await getTableFields({ slug });
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

        <Card className="p-0">
          <div className="overflow-x-auto">
            {data.length === 0 ? (
              <div className="p-4 text-center">
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
                          {header.toLowerCase().includes('id') ? (
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
    </TooltipProvider>
  );
}
