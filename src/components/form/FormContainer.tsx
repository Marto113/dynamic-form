import { memo, useMemo } from 'react';
import {
  Formik,
  Form,
  yupToFormErrors,
} from 'formik';
import * as Yup from 'yup';
import FormRenderer from './renderer/FormRenderer';
import { generateYupSchema } from '../../validation/yupGenerator';
import { generateInitialValues } from '../../utils/generateInitialValues';
import { filterHiddenFields } from '../../utils/filterOutput';
import type { FormSchema } from '../../types/form.types';
import AutoFillHandler from './AutoFillHandler';

type Props = {
  schema: FormSchema;
};

const FormContainer = ({ schema }: Props) => {
  const initialValues = useMemo(() => {
    return generateInitialValues(schema);
  }, [schema]);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        try {
          generateYupSchema(
            schema,
            values
          ).validateSync(values, {
            abortEarly: false,
          });

          return {};
        } catch (error) {
          if (
            error instanceof Yup.ValidationError
          ) {
            return yupToFormErrors(error);
          }

          return {};
        }
      }}
      onSubmit={(values) => {
        const filteredValues =
          filterHiddenFields(
            schema,
            values
          );

        console.log(filteredValues);
      }}
      validateOnChange
      validateOnBlur
    >
      <Form>
        <AutoFillHandler schema={schema} />

        <FormRenderer schema={schema} />

        <button type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default memo(FormContainer);