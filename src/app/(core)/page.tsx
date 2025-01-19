'use client';

import { FileText, FolderInput, Globe, NotebookPen } from 'lucide-react';

import { useRouter } from 'next/navigation';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const items = [
  {
    title: 'Input Data',
    description: 'Enter new data into the system.',
    link: '/input',
    icon: NotebookPen,
  },
  {
    title: 'Export Data',
    description: 'Export data from the system.',
    link: '/export',
    icon: FolderInput,
  },
  {
    title: 'View Documentation',
    description: 'Access system documentation.',
    link: '/docs',
    icon: FileText,
  },
];

export default function CorePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-8">
      <Card className="relative overflow-hidden shadow-md">
        <CardHeader>
          <CardTitle className="font-heading font-bold tracking-normal">
            Accreditation and Reporting System
          </CardTitle>
          <CardDescription>
            An in-house data management system, built by the students of MIT
            Bengaluru.
          </CardDescription>
        </CardHeader>
        <div className="absolute -bottom-2 -right-2 -top-4">
          <Globe className="size-36 text-muted" />
        </div>
      </Card>
      <h1 className="flex justify-center font-heading text-xl font-bold text-muted-foreground">
        What would you like to do today?
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item.title}
            className="group relative cursor-pointer overflow-hidden shadow-sm transition-colors duration-300 hover:bg-accent"
            onClick={() => router.push(item.link)}
          >
            <CardHeader className="pb-24">
              <CardTitle className="tracking-normal">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <div className="absolute -bottom-8 -right-4">
              <item.icon
                strokeWidth={1.5}
                className="size-24 text-muted transition-colors duration-300 group-hover:text-[#f0981d]"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
