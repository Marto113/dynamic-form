import * as Yup from 'yup';

export const validationMappings = {
  required: (validator: Yup.StringSchema) => validator.required('Required'),

  email: (validator: Yup.StringSchema) => validator.email('Invalid email'),

  minLength: (validator: Yup.StringSchema, value: number) =>
    validator.min(value, `Minimum ${value} characters`),

  maxLength: (validator: Yup.StringSchema, value: number) =>
    validator.max(value, `Maximum ${value} characters`),

  pattern: (validator: Yup.StringSchema, value: string) =>
    validator.matches(new RegExp(value), 'Invalid format'),
};
