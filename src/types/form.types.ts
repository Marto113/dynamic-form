export type ValidationConfig = {
  required?: boolean;

  email?: boolean;

  minLength?: number;

  maxLength?: number;

  pattern?: string;
};

export type VisibilityConfig = {
  dependsOn: string;

  equals: unknown;
};

export type BaseField = {
  type: string;

  name: string;

  label: string;

  validation?: ValidationConfig;

  visibility?: VisibilityConfig;
};

export type TextField =
  BaseField & {
    type: 'text';
  };

export type TextAreaField =
  BaseField & {
    type: 'textarea';
  };

export type CheckboxField =
  BaseField & {
    type: 'checkbox';
  };

export type DropdownField =
  BaseField & {
    type: 'dropdown';

    options: string[];
  };

export type RadioField =
  BaseField & {
    type: 'radio';

    options: string[];
  };

export type ValidatedTextField =
  BaseField & {
    type: 'validated-text';
  };

export type GroupField =
  BaseField & {
    type: 'group';

    fields: FormField[];
  };

export type FormField =
  | TextField
  | TextAreaField
  | CheckboxField
  | DropdownField
  | RadioField
  | ValidatedTextField
  | GroupField;

export type FormSchema = {
  title: string;

  fields: FormField[];
};