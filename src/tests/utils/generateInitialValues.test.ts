import { describe, it, expect } from 'vitest';
import { generateInitialValues } from '../../utils/generateInitialValues';
import type { FormSchema } from '../../types/form.types';

describe('generateInitialValues', () => {
  it('generates nested initial values correctly', () => {
    const schema: FormSchema = {
      title: 'Test',

      fields: [
        {
          type: 'group',
          name: 'contactInfo',
          label: 'Contact',

          fields: [
            {
              type: 'text',
              name: 'phone',
              label: 'Phone',
            },

            {
              type: 'text',
              name: 'country',
              label: 'Country',
            },
          ],
        },
      ],
    };

    const result = generateInitialValues(schema);

    expect(result).toEqual({
      contactInfo: {
        phone: '',
        country: '',
      },
    });
  });
});