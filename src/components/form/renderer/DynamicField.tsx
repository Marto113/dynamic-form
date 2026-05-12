import type {
  FormField,
  DropdownField,
  RadioField,
} from '../../../types/form.types';

import TextFieldComponent from '../fields/TextFieldComponent';
import TextAreaComponent from '../fields/TextAreaComponent';
import DropdownComponent from '../fields/DropdownComponent';
import CheckboxComponent from '../fields/CheckboxComponent';
import RadioComponent from '../fields/RadioComponent';
import ValidatedTextFieldComponent from '../fields/ValidatedTextFieldComponent';

type Props = {
  field: FormField;
  fieldPath: string;
};

const DynamicField = ({
  field,
  fieldPath,
}: Props) => {
  console.log(fieldPath);

  switch (field.type) {
    case 'text':
      return (
        <TextFieldComponent
          name={fieldPath}
          label={field.label}
        />
      );

    case 'textarea':
      return (
        <TextAreaComponent
          name={fieldPath}
          label={field.label}
        />
      );

    case 'dropdown':
      return (
        <DropdownComponent
          name={fieldPath}
          label={field.label}
          options={
            (field as DropdownField)
              .options
          }
        />
      );

    case 'checkbox':
      return (
        <CheckboxComponent
          name={fieldPath}
          label={field.label}
        />
      );

    case 'radio':
      return (
        <RadioComponent
          name={fieldPath}
          label={field.label}
          options={
            (field as RadioField)
              .options
          }
        />
      );

    case 'validated-text':
      return (
        <ValidatedTextFieldComponent
          name={fieldPath}
          label={field.label}
        />
      );

    default:
      return null;
  }
};

export default DynamicField;