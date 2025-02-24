'use client';

import type { FormDetails, FormField } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createItem } from '@/lib/actions/input';
import { getTableData } from '@/lib/actions/tables';

import { Combobox } from '@/components/ui/combobox';
import { DateTimePicker, TimePicker } from '@/components/ui/datetime-picker';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadcnFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiInput } from '@/components/ui/multi-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { Button } from './ui/button';

function generateZodSchema(form: FormDetails) {
  const shape: Record<string, any> = {};
  form.fields.forEach((field) => {
    let schema;
    switch (field.fieldType) {
      case 'input':
        switch (field.inputOptions?.inputType) {
          case 'boolean':
            schema = z.boolean();
            break;
          case 'number':
            schema = z.number();
            break;
          case 'date':
          case 'datetime':
          case 'time':
            schema = z.date();
            break;
          case 'multi-input':
            schema = z.array(z.string());
            break;
          default:
            schema = z.string();
        }
        break;
      case 'choice':
        schema = z.string();
        break;
      default:
        // static or unrecognized fields won't be in form data
        return;
    }
    shape[field.id] = field.required ? schema : schema.optional();
  });
  return z.object(shape);
}

export function FormGenerator({
  form,
  slug,
  onSubmit,
}: {
  form: FormDetails;
  slug: string;
  onSubmit?: (data: any) => void;
}) {
  const router = useRouter();
  const defaultValues: Record<string, any> = {};

  form.fields.forEach((field) => {
    if (field.fieldType === 'input') {
      switch (field.inputOptions?.inputType) {
        case 'boolean':
          defaultValues[field.id] = false;
          break;
        case 'number':
          defaultValues[field.id] = 0;
          break;
        case 'date':
        case 'datetime':
        case 'time':
          defaultValues[field.id] = null;
          break;
        case 'multi-input':
          defaultValues[field.id] = [];
          break;
        default:
          defaultValues[field.id] = '';
      }
    } else if (field.fieldType === 'choice') {
      defaultValues[field.id] = '';
    }
  });

  const schema = generateZodSchema(form);
  const formMethods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmission = async (data: any) => {
    toast.promise(
      () =>
        new Promise((resolve) => {
          createItem({ slug, entryData: data });
          router.push(`/input/tables/${slug}`);
          // Simulate a delay to show the loading state
          setTimeout(resolve, 500);
        }),
      {
        loading: 'Creating form entry...',
        success: 'Form entry created!',
        error: 'Failed to create form entry!',
      }
    );
  };

  const renderField = (field: FormField, rhfField: any) => {
    switch (field.fieldType) {
      case 'input':
        switch (field.inputOptions?.inputType) {
          case 'boolean':
            return (
              <Select {...rhfField}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            );
          case 'date':
            return (
              <DateTimePicker
                value={rhfField.value}
                onChange={(date) => rhfField.onChange(date)}
                granularity="day"
              />
            );
          case 'datetime':
            return (
              <DateTimePicker
                value={rhfField.value}
                onChange={(date) => rhfField.onChange(date)}
                granularity="minute"
              />
            );
          case 'multi-input':
            return (
              <MultiInput
                values={rhfField.value || []}
                onChange={(val) => rhfField.onChange(val)}
              />
            );
          case 'number':
            return (
              <Input
                type="number"
                {...rhfField}
                onChange={(e) => {
                  const value = e.target.value;
                  rhfField.onChange(
                    value === '' ? undefined : e.target.valueAsNumber
                  );
                }}
              />
            );
          case 'string':
            return <Input {...rhfField} />;
          case 'textarea':
            return <Textarea {...rhfField} />;
          case 'time':
            return (
              <div className="flex justify-start">
                <TimePicker
                  date={rhfField.value}
                  onChange={(date) => rhfField.onChange(date)}
                  granularity="minute"
                />
              </div>
            );
        }
      case 'choice': {
        const { choiceOptions } = field;
        const { choiceSource } = choiceOptions || {};

        if (choiceSource === 'enum') {
          return (
            <Select
              value={rhfField.value}
              onValueChange={(value) => rhfField.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {choiceOptions?.enumOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }

        if (choiceSource === 'table') {
          const tableName = choiceOptions?.tableOptions?.tableName;
          const labelColumn = choiceOptions?.tableOptions?.labelColumn;
          const valueColumn = choiceOptions?.tableOptions?.valueColumn;

          const [items, setItems] = useState<
            Array<{ label: string; value: string }>
          >([]);
          const [isLoading, setIsLoading] = useState(false);
          const [error, setError] = useState(false);
          const [optionsLoaded, setOptionsLoaded] = useState(false);
          const [open, setOpen] = useState(false);

          const handleOpenChange = (nextOpen: boolean) => {
            setOpen(nextOpen);
            if (
              nextOpen &&
              !optionsLoaded &&
              tableName &&
              labelColumn &&
              valueColumn
            ) {
              setIsLoading(true);
              setError(false);
              getTableData({
                slug: tableName,
                columns: [labelColumn, valueColumn],
              })
                .then((rows) => {
                  const mapped = rows.data.map((row: any) => ({
                    label: row[labelColumn],
                    value: row[valueColumn],
                  }));
                  setItems(mapped);
                  setOptionsLoaded(true);
                })
                .catch(() => setError(true))
                .finally(() => setIsLoading(false));
            }
          };

          return (
            <Combobox
              items={!optionsLoaded || error ? [] : items}
              onSelect={(val) => rhfField.onChange(val)}
              placeholder="Select an option"
              open={open}
              onOpenChange={handleOpenChange}
              isLoading={isLoading}
              hasError={error}
            />
          );
        }
        return null;
      }
      case 'static':
        switch (field.staticOptions?.staticType) {
          case 'h1':
            return (
              <h1 className="text-4xl font-bold">
                {field.staticOptions?.content}
              </h1>
            );
          case 'h2':
            return (
              <h2 className="text-3xl font-semibold">
                {field.staticOptions?.content}
              </h2>
            );
          case 'h3':
            return (
              <h3 className="text-2xl font-medium">
                {field.staticOptions?.content}
              </h3>
            );
          case 'paragraph':
            return <p>{field.staticOptions.content}</p>;
          case 'separator':
            return <Separator />;
        }
      default:
        return null;
    }
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(handleSubmission)}
        className="grid grid-cols-2 gap-4"
      >
        {form.fields.map((field) => (
          <ShadcnFormField
            key={field.id}
            control={formMethods.control}
            name={field.id}
            render={({ field: rhfField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.inputOptions?.inputType === 'multi-input' &&
                    ' (Multi-Input)'}{' '}
                  {field.required && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>{renderField(field, rhfField)}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="col-span-2 flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
