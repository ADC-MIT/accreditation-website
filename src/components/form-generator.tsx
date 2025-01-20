import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormDetails, FormField } from '@/types/input';

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
  onSubmit,
}: {
  form: FormDetails;
  onSubmit?: (data: any) => void;
}) {
  const schema = generateZodSchema(form);
  const formMethods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const handleSubmission = (data: any) => {
    if (onSubmit) onSubmit(data);
    else console.log(data);
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
            return <DateTimePicker granularity="day" {...rhfField} />;
          case 'datetime':
            return <DateTimePicker granularity="minute" {...rhfField} />;
          case 'multi-input':
            return <MultiInput {...rhfField} />;
          case 'number':
            return <Input type="number" {...rhfField} />;
          case 'string':
            return <Input {...rhfField} />;
          case 'textarea':
            return <Textarea {...rhfField} />;
          case 'time':
            return (
              <div className="flex justify-start">
                <TimePicker granularity="minute" {...rhfField} />
              </div>
            );
        }
      case 'choice':
        switch (field.choiceOptions?.choiceSource) {
          case 'enum':
            return (
              <Select {...rhfField}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {field.choiceOptions.enumOptions?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          case 'table':
            // TODO: Implement table source
            return (
              <Select {...rhfField}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </Select>
            );
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
                  {field.label}{' '}
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
