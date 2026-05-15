import get from 'lodash/get';
import * as Yup from 'yup';
import type {
  FormField,
  FormSchema,
  ValidationConfig
} from '../types/form.types';
import { validationMappings } from './validationMappings';
import { checkVisibility } from '../utils/checkVisibility';



const applyValidationRules = (
  validator: Yup.StringSchema,
  rules: ValidationConfig
) => {
  let updatedValidator =
    validator;

  Object.entries(rules).forEach(
    ([rule, value]) => {
      const mapping =
        validationMappings[
        rule as keyof typeof validationMappings
        ];

      if (mapping) {
        updatedValidator = mapping(
          updatedValidator,
          value as never
        );
      }
    }
  );

  return updatedValidator;
};

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

  let validator = Yup.string();

  // static
  if (field.validation) {
    validator = applyValidationRules(
      validator,
      field.validation
    );
  }

  // dynamic
  if (field.dynamicValidation) {
    field.dynamicValidation.forEach(
      (dynamicRule) => {
        const dependencyValue =
          get(
            values,
            dynamicRule.dependsOn
          );

        const shouldApply =
          dependencyValue ===
          dynamicRule.equals;

        if (shouldApply) {
          validator =
            applyValidationRules(
              validator,
              dynamicRule.rules
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