import { memo } from 'react';
import { FastField } from 'formik';
import type { FieldProps } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type Props = {
  name: string;
  label: string;
  options: string[];
};

const RadioComponent = ({ name, label, options }: Props) => {
  return (
    <FastField name={name}>
      {({ field }: FieldProps) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>

          <RadioGroup {...field}>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    </FastField>
  );
};

export default memo(RadioComponent);
