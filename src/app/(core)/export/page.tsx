'use client';

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
        className="relative cursor-pointer overflow-hidden"
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

function IconCard({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href} passHref>
      <Card className="relative cursor-pointer overflow-hidden">
        <div className="flex items-center p-4">
          <FileText strokeWidth={1.5} className="mr-4 size-8 text-[#f0981d]" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <ExternalLink className="size-4" />
        </div>
      </Card>
    </Link>
  );
}

export default function ExportRootPage() {
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
          title="Accreditation 1"
          description="Description for accreditation 1"
        >
          <IconCard title="Link 1" href="https://example.com/1" />
          <IconCard title="Link 2" href="https://example.com/2" />
          <IconCard title="Link 3" href="https://example.com/3" />
        </ExportCard>
        <ExportCard
          title="Accreditation 2"
          description="Description for accreditation 2"
        >
          <IconCard title="Link 1" href="https://example.com/1" />
          <IconCard title="Link 2" href="https://example.com/2" />
          <IconCard title="Link 3" href="https://example.com/3" />
        </ExportCard>
        <ExportCard
          title="Accreditation 3"
          description="Description for accreditation 3"
        >
          <IconCard title="Link 1" href="https://example.com/1" />
          <IconCard title="Link 2" href="https://example.com/2" />
          <IconCard title="Link 3" href="https://example.com/3" />
        </ExportCard>
      </div>
    </div>
  );
}
