import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import get from 'lodash/get';

import type {
  FormField,
  FormSchema,
} from '../../types/form.types';

import { mockFetchCountry } from '../../mock-api/countryApi';

type Props = {
  schema: FormSchema;
};

const AutoFillHandler = ({
  schema,
}: Props) => {
  const {
    values,
    setFieldValue,
  } = useFormikContext<
    Record<string, unknown>
  >();

  const previousValuesRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const processField = async (
      field: FormField,
      parentPath = ''
    ) => {
      if (field.type !== 'group') {
        return;
      }

      const currentPath =
        parentPath
          ? `${parentPath}.${field.name}`
          : field.name;

      if (field.autoFill) {
        switch (field.autoFill.type) {
          case 'phone-to-country': {
            const phone = get(
              values,
              field.autoFill
                .dependencies[0]
            );

            if (typeof phone !== 'string' || phone.length < 4) {
              return;
            }

            const prefix = phone.slice(0, 4);

            const cacheKey = `${currentPath}-phone-to-country`;

            if (previousValuesRef.current[cacheKey] === prefix) {
              return;
            }

            previousValuesRef.current[cacheKey] = prefix;

            const result = await mockFetchCountry(phone);

            console.log({
              phone,
              country: result.country,
            });

            const targetPath = `${currentPath}.${field.autoFill.targetField}`;

            const currentCountry = get(values, targetPath);

            if (currentCountry !== result.country) {
              setFieldValue(
                targetPath,
                result.country
              );
            }

            break;
          }
        }
      }

      await Promise.all(
        field.fields.map(
          async (child) => {
            await processField(
              child,
              currentPath
            );
          }
        )
      );
    };

    const runAutoFill =
      async () => {
        await Promise.all(
          schema.fields.map(
            async (field) => {
              await processField(field);
            }
          )
        );
      };

    runAutoFill();
  }, [values, schema, setFieldValue]);

  return null;
};

export default AutoFillHandler;