import { memo, useMemo, useState } from 'react';
import {
  Formik,
  Form,
  yupToFormErrors,
  type FormikValues,
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

  const [submittedData, setSubmittedData,] = useState<FormikValues | null>(null);

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

        setSubmittedData(filteredValues);
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

        {submittedData && (
          <div className="submission-result">
            <h3>
              Form submitted successfully
            </h3>

            <pre>
              {JSON.stringify(
                submittedData,
                null,
                2
              )}
            </pre>

            <button
              type="button"
              onClick={() => {
                const blob =
                  new Blob(
                    [
                      JSON.stringify(
                        submittedData,
                        null,
                        2
                      ),
                    ],
                    {
                      type:
                        'application/json',
                    }
                  );

                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');

                link.href = url;
                link.download = 'form-data.json';

                link.click();

                URL.revokeObjectURL(url);
              }}
            >
              Download JSON
            </button>
          </div>
        )}
      </Form>
    </Formik>
  );
};

export default memo(FormContainer);