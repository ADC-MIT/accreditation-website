'use client';

import { AccreditationDetails } from '@/types';
import {
  ChevronRight,
  ExternalLink,
  FileText,
  FolderClosed,
  FolderDown,
  FolderOpen,
} from 'lucide-react';

import { useState } from 'react';

import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function ExportCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Card
        className="relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center p-4">
          {isOpen ? (
            <FolderOpen
              strokeWidth={1.5}
              className="mr-4 size-12 text-[#f0981d]"
            />
          ) : (
            <FolderClosed
              strokeWidth={1.5}
              className="mr-4 size-12 text-[#f0981d]"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{title}</h2>
            <CardDescription>{description}</CardDescription>
          </div>
          <ChevronRight
            className={`size-6 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          />
        </div>
      </Card>
      {isOpen && (
        <div className="flex px-4">
          <Separator
            orientation="vertical"
            className="h-auto stroke-orange-600"
          />
          <div className="ml-8 flex w-full flex-col space-y-4 py-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function formatTitle(key: string): string {
  return key
    .replace(/(\d)_/g, '$1.')
    .replace(/(\d)_(\w)/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/(\d)([a-z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function IconCard({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href} passHref>
      <Card className="group relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-accent">
        <div className="flex items-center p-4">
          <FileText strokeWidth={1.5} className="mr-4 size-8 text-[#f0981d]" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <ExternalLink className="size-4 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
        </div>
      </Card>
    </Link>
  );
}

export default function ExportRootPageClient({
  naacFields,
  nbaFields,
  nirfFields,
}: {
  naacFields: AccreditationDetails;
  nbaFields: AccreditationDetails;
  nirfFields: AccreditationDetails;
}) {
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
        <ExportCard
          title="NAAC"
          description="National Assessment and Accreditation Council"
        >
          {Object.entries(naacFields).map(([key]) => (
            <IconCard key={key} title={formatTitle(key)} href={key} />
          ))}
        </ExportCard>
        <ExportCard title="NBA" description="National Board of Accreditation">
          {Object.entries(nbaFields).map(([key]) => (
            <IconCard key={key} title={formatTitle(key)} href={key} />
          ))}
        </ExportCard>
        <ExportCard
          title="NIRF"
          description="National Institutional Ranking Framework"
        >
          {Object.entries(nirfFields).map(([key]) => (
            <IconCard key={key} title={formatTitle(key)} href={key} />
          ))}
        </ExportCard>
        <Link href="/input" passHref>
          <Card className="relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-accent">
            <div className="flex items-center p-4">
              <FileText
                strokeWidth={1.5}
                className="mr-4 size-12 text-[#f0981d]"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Export Data Manually</h2>
                <CardDescription>
                  For IQAC, Academic Audit and other subjective accreditations,
                  export data here.
                </CardDescription>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
