import * as Yup from 'yup';
import type {
  FormField,
  FormSchema,
} from '../types/form.types';
import { validationMappings } from './validationMappings';
import { checkVisibility } from '../utils/checkVisibility';

const generateFieldValidation = (
  field: FormField,
  values: unknown
): Yup.AnySchema => {
  const isVisible = checkVisibility(
    values,
    field.visibility
  );

  if (!isVisible) {
    return Yup.mixed().notRequired();
  }

  if (field.type === 'group') {
    const groupShape: Record<
      string,
      Yup.AnySchema
    > = {};

    field.fields.forEach(
      (child) => {
        groupShape[child.name] =
          generateFieldValidation(
            child,
            values
          );
      }
    );

    return Yup.object(groupShape);
  }

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
  schema: FormSchema,
  values: unknown
) => {
  const shape: Record<
    string,
    Yup.AnySchema
  > = {};

  schema.fields.forEach(
    (field) => {
      shape[field.name] =
        generateFieldValidation(
          field,
          values
        );
    }
  );

  return Yup.object(shape);
};