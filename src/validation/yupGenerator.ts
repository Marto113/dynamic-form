import * as Yup from 'yup';
import type { FormSchema, FormField } from '../types/form.types';
import { validationMappings } from './validationMappings';

export const generateYupSchema = (schema: FormSchema) => {
  const shape: Record<string, Yup.AnySchema> = {};

  schema.fields.forEach((field: FormField) => {
    let validator = Yup.string();

    if (field.validation) {
      Object.entries(field.validation).forEach(([rule, value]) => {
        const mapping =
          validationMappings[rule as keyof typeof validationMappings];

        if (mapping) {
          validator = mapping(validator, value as never);
        }
      });
    }

    shape[field.name] = validator;
  });

  return Yup.object(shape);
};
