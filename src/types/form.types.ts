export type ValidationConfig = {
  required?: boolean;

  email?: boolean;

  minLength?: number;

  maxLength?: number;

  pattern?: string;
};

export type BaseField = {
  type: string;

  name: string;

  label: string;

  validation?: ValidationConfig;
};

export type DropdownField = BaseField & {
  type: 'dropdown';

  options: string[];
};

export type RadioField = BaseField & {
  type: 'radio';

  options: string[];
};

export type FormField = BaseField | DropdownField | RadioField;

export type FormSchema = {
  title: string;

  fields: FormField[];
};
