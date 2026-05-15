// yupGenerator.test.ts

import { describe, it, expect } from 'vitest';

import { generateYupSchema } from '../../validation/yupGenerator';

import type { FormSchema } from '../../types/form.types';

describe('generateYupSchema', () => {
  it('fails validation for required empty fields', async () => {
    const schema: FormSchema = {
      title: 'Test',

      fields: [
        {
          type: 'text',
          name: 'firstName',
          label: 'First Name',

          validation: {
            required: true,
          },
        },
      ],
    };

    const yupSchema =
      generateYupSchema(
        schema,
        {}
      );

    await expect(
      yupSchema.validate({
        firstName: '',
      })
    ).rejects.toThrow();
  });

  it('passes validation for valid values', async () => {
    const schema: FormSchema = {
      title: 'Test',

      fields: [
        {
          type: 'text',
          name: 'firstName',
          label: 'First Name',

          validation: {
            required: true,
            minLength: 2,
          },
        },
      ],
    };

    const yupSchema =
      generateYupSchema(
        schema,
        {}
      );

    await expect(
      yupSchema.validate({
        firstName: 'John',
      })
    ).resolves.toBeDefined();
  });
});