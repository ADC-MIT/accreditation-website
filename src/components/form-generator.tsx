import { FormDetails, FormField } from '@/types/input';

import { DateTimePicker, TimePicker } from '@/components/ui/datetime-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export function FormGenerator({ form }: { form: FormDetails }) {
  const renderField = (field: FormField) => {
    switch (field.fieldType) {
      case 'input':
        switch (field.inputOptions?.inputType) {
          case 'boolean':
            return (
              <Select>
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
            return <DateTimePicker granularity="day" />;
          case 'datetime':
            return <DateTimePicker granularity="minute" />;
          case 'multi-input':
            return <MultiInput />;
          case 'number':
            return <Input type="number" />;
          case 'string':
            return <Input />;
          case 'textarea':
            return <Textarea />;
          case 'time':
            return (
              <div className="flex justify-start">
                <TimePicker granularity="minute" />
              </div>
            );
        }
      case 'choice':
        switch (field.choiceOptions?.choiceSource) {
          case 'enum':
            return (
              <Select>
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
              <Select>
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

  const renderFieldWithLabel = (field: FormField) => {
    if (field.fieldType === 'static') {
      return renderField(field);
    }

    return (
      <div className="space-y-2">
        <Label>
          {field.label}{' '}
          {field.required && <span className="text-destructive">*</span>}
        </Label>
        {renderField(field)}
      </div>
    );
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      {form.fields.map((field) => (
        <div key={field.id}>{renderFieldWithLabel(field)}</div>
      ))}
    </form>
  );
}
