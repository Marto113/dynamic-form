import get from 'lodash/get';

import type {
  FormField,
  FormSchema,
} from '../types/form.types';

import { checkVisibility } from './checkVisibility';

const filterField = (
  field: FormField,
  values: Record<string, unknown>,
  currentValue: unknown
): unknown => {
  const isVisible = checkVisibility(
    values,
    field.visibility
  );

  if (!isVisible) {
    return undefined;
  }

  if (
    field.type === 'group' &&
    currentValue &&
    typeof currentValue === 'object'
  ) {
    const filteredGroup: Record<
      string,
      unknown
    > = {};

    field.fields.forEach(
      (child) => {
        const childValue = get(
          currentValue,
          child.name
        );

        const filteredChild =
          filterField(
            child,
            values,
            childValue
          );

        if (
          filteredChild !==
          undefined
        ) {
          filteredGroup[
            child.name
          ] = filteredChild;
        }
      }
    );

    return filteredGroup;
  }

  return currentValue;
};

export const filterHiddenFields = (
  schema: FormSchema,
  values: Record<string, unknown>
) => {
  const result: Record<
    string,
    unknown
  > = {};

  schema.fields.forEach(
    (field) => {
      const fieldValue = get(
        values,
        field.name
      );

      const filteredValue =
        filterField(
          field,
          values,
          fieldValue
        );

      if (
        filteredValue !==
        undefined
      ) {
        result[field.name] =
          filteredValue;
      }
    }
  );

  return result;
};