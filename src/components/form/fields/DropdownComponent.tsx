import { memo } from 'react';

import { FastField } from 'formik';
import type { FieldProps } from 'formik';

import {
  MenuItem,
  TextField,
} from '@mui/material';

type Props = {
  name: string;
  label: string;
  options: string[];
};

const DropdownComponent = ({
  name,
  label,
  options,
}: Props) => {
  return (
    <FastField name={name}>
      {({
        field,
        meta,
      }: FieldProps) => (
        <TextField
          {...field}
          select
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
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
    </FastField>
  );
};

export default memo(
  DropdownComponent
);