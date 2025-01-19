export type FormList = {
  id: string;
  name: string;
  description: string;
}[];

export interface FormDetails {
  name: string;
  description: string;
  priority: number;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  fieldType: 'input' | 'choice' | 'static';
  required?: boolean;
  inputOptions?: InputOptions;
  choiceOptions?: ChoiceOptions;
  staticOptions?: StaticOptions;
  relevantForms?: RelevantForm[];
}

interface InputOptions {
  inputType:
    | 'number'
    | 'string'
    | 'textarea'
    | 'date'
    | 'time'
    | 'datetime'
    | 'boolean'
    | 'multi-input';
  placeholder?: string;
}

interface ChoiceOptions {
  choiceType: 'single' | 'multi';
  choiceSource: 'enum' | 'table';
  enumOptions?: EnumOption[];
  tableOptions?: TableOptions;
}

interface EnumOption {
  name: string;
  value: string;
}

interface TableOptions {
  tableName: string;
  labelColumn: string;
  valueColumn: string;
}

interface StaticOptions {
  staticType: 'h1' | 'h2' | 'h3' | 'paragraph' | 'separator';
  content?: string;
}

interface RelevantForm {
  id: string;
  name: string;
}
