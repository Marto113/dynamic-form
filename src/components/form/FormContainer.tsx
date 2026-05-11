import { memo, useMemo } from 'react';

import {
  Formik,
  Form,
} from 'formik';

import FormRenderer from './renderer/FormRenderer';

import { generateInitialValues } from '../../utils/generateInitialValues';

type Props = {
  schema: any;
};

const FormContainer = ({
  schema,
}: Props) => {
  const initialValues =
    useMemo(() => {
      return generateInitialValues(
        schema
      );
    }, [schema]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <FormRenderer
          schema={schema}
        />

        <button type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default memo(FormContainer);