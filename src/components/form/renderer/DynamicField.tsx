import { memo } from 'react';
import TextFieldComponent from '../fields/TextFieldComponent';
import TextAreaComponent from '../fields/TextAreaComponent';
import DropdownComponent from '../fields/DropdownComponent';
import CheckboxComponent from '../fields/CheckboxComponent';
import RadioComponent from '../fields/RadioComponent';
import ValidatedTextFieldComponent from '../fields/ValidatedTextFieldComponent';

type Props = {
  field: any;
};

const DynamicField = ({ field }: Props) => {
  switch (field.type) {
    case 'text':
      return <TextFieldComponent name={field.name} label={field.label} />;

    case 'textarea':
      return <TextAreaComponent name={field.name} label={field.label} />;

    case 'dropdown':
      return (
        <DropdownComponent
          name={field.name}
          label={field.label}
          options={field.options}
        />
      );

    case 'checkbox':
      return <CheckboxComponent name={field.name} label={field.label} />;

    case 'radio':
      return (
        <RadioComponent
          name={field.name}
          label={field.label}
          options={field.options}
        />
      );

    case 'validated-text':
      return (
        <ValidatedTextFieldComponent name={field.name} label={field.label} />
      );

    default:
      return null;
  }
};

export default memo(DynamicField);
