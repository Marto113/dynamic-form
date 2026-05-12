import { memo } from 'react';
import { FastField } from 'formik';
import type { FieldProps } from 'formik';
import { Checkbox, FormControlLabel } from '@mui/material';

type Props = {
  name: string;
  label: string;
};

const CheckboxComponent = ({ name, label }: Props) => {
  return (
    <FastField name={name}>
      {({ field }: FieldProps) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={field.value} />}
          label={label}
        />
      )}
    </FastField>
  );
};

export default memo(CheckboxComponent);
