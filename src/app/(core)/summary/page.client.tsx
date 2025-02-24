'use client';

import type { SummaryResponse } from '@/types';
import { Globe } from 'lucide-react';
import { Award, BookOpen, GraduationCap, Trophy, Users2 } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function SummaryPageClient({ data }: { data: SummaryResponse }) {
  // Events Charts Data
  const eventsTypeData = [
    {
      name: 'Competitive',
      value: data.events.competitive.count,
      fill: 'var(--color-competitive)',
    },
    {
      name: 'Informational',
      value: data.events.informational.count,
      fill: 'var(--color-informational)',
    },
  ];

  // Calculate event categories from competitive events
  const eventCategories = data.events.competitive.events.reduce(
    (acc, event) => {
      if (event.type) {
        acc[event.type] = (acc[event.type] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const eventsCategoryData = Object.entries(eventCategories).map(
    ([category, count]) => ({
      name: category,
      value: count,
      fill: `var(--color-${category.toLowerCase()})`,
    })
  );

  // Calculate event classifications
  const eventClassifications = data.events.competitive.events.reduce(
    (acc, event) => {
      if (event.classification) {
        acc[event.classification] = (acc[event.classification] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const eventsClassificationData = Object.entries(eventClassifications).map(
    ([classification, count]) => ({
      name: classification,
      value: count,
      fill: `var(--chart-4)`,
    })
  );

  // Publications Charts Data
  const publicationsTypeData = [
    {
      name: 'Book',
      value: data.publications.book.count,
      fill: 'var(--color-book)',
    },
    {
      name: 'Journal',
      value: data.publications.journal.count,
      fill: 'var(--color-journal)',
    },
  ];

  // Calculate publications by semester
  const publicationsBySemester = [
    ...data.publications.book.book,
    ...data.publications.journal.journal,
  ].reduce(
    (acc, pub) => {
      acc[pub.semester] = (acc[pub.semester] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const publicationsSemesterData = Object.entries(publicationsBySemester).map(
    ([semester, count]) => ({
      name: semester,
      value: count,
      fill: `var(--color-${semester.toLowerCase()})`,
    })
  );

  // Calculate book types
  const bookTypes = data.publications.book.book.reduce(
    (acc, book) => {
      acc[book.type] = (acc[book.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const bookTypeData = Object.entries(bookTypes).map(([type, count]) => ({
    name: type,
    value: count,
    fill: `var(--color-${type.toLowerCase()})`,
  }));

  const totalEvents =
    data.events.competitive.count + data.events.informational.count;
  const totalPublications =
    data.publications.book.count + data.publications.journal.count;

  return (
    <div className="flex flex-col space-y-8">
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle>Accreditation Statistics</CardTitle>
          <CardDescription>
            Here's a list of domains under which you can input data.
          </CardDescription>
        </CardHeader>
        <div className="absolute -bottom-2 -right-2 -top-4">
          <Globe className="size-36 text-muted" />
        </div>
      </Card>
      <div className="flex flex-col space-y-4">
        {/* Events Overview */}
        <Card className="bg-card">
          <CardContent className="flex items-center p-6">
            <Trophy className="h-12 w-12 text-primary" />
            <div className="ml-4 flex-1">
              <h2 className="text-2xl font-bold">Events</h2>
              <p className="text-muted-foreground">
                Total events participated and organized
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <span className="text-3xl font-bold text-primary">
                {totalEvents}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Events Charts */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Event Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: 'Count',
                  },
                  competitive: {
                    label: 'Competitive',
                    color: 'hsl(var(--chart-1))',
                  },
                  informational: {
                    label: 'Informational',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="mx-auto aspect-square w-full max-w-xs"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={eventsTypeData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalEvents}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Events
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Event Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: 'Count',
                  },
                  sports: {
                    label: 'Sports',
                    color: 'hsl(var(--chart-3))',
                  },
                  cultural: {
                    label: 'Cultural',
                    color: 'hsl(var(--chart-4))',
                  },
                  academic: {
                    label: 'Academic',
                    color: 'hsl(var(--chart-5))',
                  },
                  other: {
                    label: 'Other',
                    color: 'hsl(var(--chart-6))',
                  },
                }}
                className="mx-auto aspect-square w-full max-w-xs"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={eventsCategoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          const total = eventsCategoryData.reduce(
                            (acc, curr) => acc + curr.value,
                            0
                          );
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {total}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Events
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users2 className="h-5 w-5" />
                Event Classification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: 'Count',
                  },
                  team: {
                    label: 'Team',
                    color: 'hsl(var(--chart-7))',
                  },
                  individual: {
                    label: 'Individual',
                    color: 'hsl(var(--chart-8))',
                  },
                }}
                className="mx-auto aspect-square w-full max-w-xs"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={eventsClassificationData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          const total = eventsClassificationData.reduce(
                            (acc, curr) => acc + curr.value,
                            0
                          );
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {total}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Events
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Publications Overview */}
        <Card className="bg-card">
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-12 w-12 text-primary" />
            <div className="ml-4 flex-1">
              <h2 className="text-2xl font-bold">Publications</h2>
              <p className="text-muted-foreground">
                Total research publications
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <span className="text-3xl font-bold text-primary">
                {totalPublications}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Publications Charts */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Publication Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: 'Count',
                  },
                  book: {
                    label: 'Book',
                    color: 'hsl(var(--chart-1))',
                  },
                  journal: {
                    label: 'Journal',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="mx-auto aspect-square w-full max-w-xs"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={publicationsTypeData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          const total = publicationsTypeData.reduce(
                            (acc, curr) => acc + curr.value,
                            0
                          );
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {total}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Publications
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Publication Semester
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: 'Count',
                  },
                  odd: {
                    label: 'Odd',
                    color: 'hsl(var(--chart-3))',
                  },
                  even: {
                    label: 'Even',
                    color: 'hsl(var(--chart-4))',
                  },
                }}
                className="mx-auto aspect-square w-full max-w-xs"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={publicationsSemesterData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          const total = publicationsSemesterData.reduce(
                            (acc, curr) => acc + curr.value,
                            0
                          );
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {total}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Publications
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Book Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: 'Count',
                  },
                  book: {
                    label: 'Book',
                    color: 'hsl(var(--chart-5))',
                  },
                  chapter: {
                    label: 'Chapter',
                    color: 'hsl(var(--chart-6))',
                  },
                }}
                className="mx-auto aspect-square w-full max-w-xs"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={bookTypeData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          const total = bookTypeData.reduce(
                            (acc, curr) => acc + curr.value,
                            0
                          );
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {total}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Books
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
