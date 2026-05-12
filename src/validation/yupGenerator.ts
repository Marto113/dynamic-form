import * as Yup from 'yup';

import type {
  FormField,
  FormSchema,
} from '../types/form.types';

import { validationMappings } from './validationMappings';

const generateFieldValidation = (
  field: FormField
): Yup.AnySchema => {

  if (field.type === 'group') {
    const groupShape: Record<
      string,
      Yup.AnySchema
    > = {};

    field.fields.forEach(
      (child) => {
        groupShape[child.name] =
          generateFieldValidation(
            child
          );
      }
    );

    return Yup.object(
      groupShape
    );
  }

  /*
    DEFAULT STRING VALIDATOR
  */

  let validator =
    Yup.string();

  if (field.validation) {
    Object.entries(
      field.validation
    ).forEach(
      ([rule, value]) => {
        const mapping =
          validationMappings[
          rule as keyof typeof validationMappings
          ];

        if (mapping) {
          validator = mapping(
            validator,
            value as never
          );
        }
      }
    );
  }

  return validator;
};

export const generateYupSchema = (
  schema: FormSchema
) => {
  const shape: Record<
    string,
    Yup.AnySchema
  > = {};

  schema.fields.forEach(
    (field) => {
      shape[field.name] =
        generateFieldValidation(
          field
        );
    }
  );

  return Yup.object(shape);
};