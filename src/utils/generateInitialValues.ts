import type {
  FormField,
  FormSchema,
} from '../types/form.types';

const generateFieldValue = (
  field: FormField
): unknown => {
  if (field.type === 'group') {
    const groupValues: Record<
      string,
      unknown
    > = {};

    field.fields.forEach(
      (child) => {
        groupValues[
          child.name
        ] = generateFieldValue(
          child
        );
      }
    );

    return groupValues;
  }

  if (field.type === 'checkbox') {
    return false;
  }

  return '';
};

export const generateInitialValues =
  (schema: FormSchema) => {
    const values: Record<
      string,
      unknown
    > = {};

    schema.fields.forEach(
      (field) => {
        values[field.name] =
          generateFieldValue(
            field
          );
      }
    );

    return values;
  };