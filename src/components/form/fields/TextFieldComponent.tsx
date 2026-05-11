import { memo } from 'react';

import { FastField } from 'formik';
import type { FieldProps } from 'formik';

import { TextField } from '@mui/material';

type Props = {
  name: string;
  label: string;
};

const TextFieldComponent = ({
  name,
  label,
}: Props) => {
  return (
    <FastField name={name}>
      {({
        field,
        meta,
      }: FieldProps) => (
        <TextField
          {...field}
          fullWidth
          margin="normal"
          label={label}
          error={
            meta.touched &&
            Boolean(meta.error)
          }
          helperText={
            meta.touched &&
            meta.error
          }
        />
      )}
    </FastField>
  );
};

export default memo(
  TextFieldComponent
);