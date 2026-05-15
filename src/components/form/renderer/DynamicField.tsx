import type { ComponentType } from 'react';

import type {
  FormField,
} from '../../../types/form.types';

import TextFieldComponent from '../fields/TextFieldComponent';
import TextAreaComponent from '../fields/TextAreaComponent';
import DropdownComponent from '../fields/DropdownComponent';
import CheckboxComponent from '../fields/CheckboxComponent';
import RadioComponent from '../fields/RadioComponent';

type Props = {
  field: FormField;
  fieldPath: string;
};

const FIELD_COMPONENTS = {
  text: TextFieldComponent,
  textarea: TextAreaComponent,
  dropdown: DropdownComponent,
  checkbox: CheckboxComponent,
  radio: RadioComponent,
} as const;

const DynamicField = ({
  field,
  fieldPath,
}: Props) => {
  if (field.type === 'group') {
    return null;
  }

  const Component =
    FIELD_COMPONENTS[
    field.type
    ] as ComponentType<any>;

  return (
    <Component
      name={fieldPath}
      label={field.label}
      {...(
        'options' in field
          ? {
            options:
              field.options,
          }
          : {}
      )}
    />
  );
};

export default DynamicField;