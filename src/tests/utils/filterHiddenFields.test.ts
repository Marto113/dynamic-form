// filterHiddenFields.test.ts

import { describe, it, expect } from 'vitest';

import { filterHiddenFields } from '../../utils/filterOutput';

import type { FormSchema } from '../../types/form.types';

describe('filterHiddenFields', () => {
  it('removes hidden fields from output', () => {
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
              name: 'country',
              label: 'Country',
            },

            {
              type: 'dropdown',
              name: 'manualCountry',
              label: 'Manual Country',

              visibility: {
                dependsOn: 'contactInfo.country',
                equals: 'Unknown',
              },

              options: [
                'Bulgaria',
                'Germany',
              ],
            },
          ],
        },
      ],
    };

    const values = {
      contactInfo: {
        country: 'Bulgaria',
        manualCountry: 'Germany',
      },
    };

    const result = filterHiddenFields(
      schema,
      values
    );

    expect(result).toEqual({
      contactInfo: {
        country: 'Bulgaria',
      },
    });
  });
});