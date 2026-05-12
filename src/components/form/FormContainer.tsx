import { memo, useMemo } from 'react';
import { generateYupSchema } from '../../validation/yupGenerator';
import { Formik, Form } from 'formik';
import FormRenderer from './renderer/FormRenderer';
import { generateInitialValues } from '../../utils/generateInitialValues';

type Props = {
  schema: any;
};

const FormContainer = ({ schema }: Props) => {
  const initialValues = useMemo(() => {
    return generateInitialValues(schema);
  }, [schema]);

  const validationSchema = useMemo(() => {
    return generateYupSchema(schema, initialValues);
  }, [schema]);


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
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
