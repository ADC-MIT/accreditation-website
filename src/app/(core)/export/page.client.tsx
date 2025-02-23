'use client';

import { AccreditationDetails } from '@/types';
import {
  ChevronRight,
  ExternalLink,
  FileText,
  FolderClosed,
  FolderDown,
  FolderOpen,
  Search,
} from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

function ExportCard({
  title,
  description,
  children,
  forceOpen = false,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  forceOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const effectiveOpen = isOpen || forceOpen;

  return (
    <div>
      <Card
        className="relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-accent"
        onClick={() => {
          if (!forceOpen) setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center p-4">
          {effectiveOpen ? (
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
            className={`size-6 transition-transform ${effectiveOpen ? 'rotate-90' : ''}`}
          />
        </div>
      </Card>
      {effectiveOpen && (
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

function IconCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} passHref>
      <Card className="group relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-accent">
        <div className="flex items-center p-4">
          <FileText strokeWidth={1.5} className="mr-4 size-8 text-[#f0981d]" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{title}</h2>
            <CardDescription>{description}</CardDescription>
          </div>
          <ExternalLink className="size-4 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
        </div>
      </Card>
    </Link>
  );
}

function parseTitleDescription(fullDescription: string) {
  const match = fullDescription.match(/^(.*?)\)\s?(.*)$/);
  if (!match) {
    return [fullDescription, ''];
  }
  return [match[1] + ')', match[2]];
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
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filterFields = (fields: AccreditationDetails) =>
    Object.entries(fields).filter(([_, field]) =>
      field.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const naacFiltered = filterFields(naacFields);
  const nbaFiltered = filterFields(nbaFields);
  const nirfFiltered = filterFields(nirfFields);

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={searchInputRef}
          className="bg-accent focus-visible:ring-accent"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <ExportCard
          title="NAAC"
          description="National Assessment and Accreditation Council"
          forceOpen={!!searchQuery && naacFiltered.length > 0}
        >
          {naacFiltered.map(([key, field]) => {
            const [iconTitle, iconDesc] = parseTitleDescription(
              field.description
            );
            return (
              <IconCard
                key={key}
                title={iconTitle}
                description={iconDesc}
                href={`/export/tables/naac/${key}${field.args === '(year: int)' ? '?year=2025' : ''}`}
              />
            );
          })}
        </ExportCard>
        <ExportCard
          title="NBA"
          description="National Board of Accreditation"
          forceOpen={!!searchQuery && nbaFiltered.length > 0}
        >
          {nbaFiltered.map(([key, field]) => {
            const [iconTitle, iconDesc] = parseTitleDescription(
              field.description
            );
            return (
              <IconCard
                key={key}
                title={iconTitle}
                description={iconDesc}
                href={`/export/tables/nba/${key}${field.args === '(year: int)' ? '?year=2025' : ''}`}
              />
            );
          })}
        </ExportCard>
        <ExportCard
          title="NIRF"
          description="National Institutional Ranking Framework"
          forceOpen={!!searchQuery && nirfFiltered.length > 0}
        >
          {nirfFiltered.map(([key, field]) => {
            const [iconTitle, iconDesc] = parseTitleDescription(
              field.description
            );
            return (
              <IconCard
                key={key}
                title={iconTitle}
                description={iconDesc}
                href={`/export/tables/nirf/${key}${field.args === '(year: int)' ? '?year=2025' : ''}`}
              />
            );
          })}
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
