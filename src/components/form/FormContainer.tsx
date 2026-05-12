import { memo, useMemo } from 'react';
import { generateYupSchema } from '../../validation/yupGenerator';
import { Formik, Form } from 'formik';
import FormRenderer from './renderer/FormRenderer';
import { generateInitialValues } from '../../utils/generateInitialValues';
import type { FormSchema } from '../../types/form.types';
import { filterHiddenFields } from '../../utils/filterOutput';

type Props = {
  schema: FormSchema;
};

const FormContainer = ({ schema }: Props) => {
  const initialValues = useMemo(() => {
    return generateInitialValues(schema);
  }, [schema]);

  const validationSchema = useMemo(() => {
    return generateYupSchema(schema, initialValues);
  }, [schema, initialValues]);


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const filteredValues = filterHiddenFields(
          schema,
          values
        )

        console.log(filteredValues);
      }}
    >
      <Form>
        <FormRenderer schema={schema} />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default memo(FormContainer);
