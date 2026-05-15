import type { FormSchema } from '../types/form.types';

export const basicSchema: FormSchema = {
  title: 'User Registration Form',

  fields: [
    {
      type: 'group',
      name: 'personalInfo',
      label: 'Personal Information',

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

        {
          type: 'text',
          name: 'lastName',
          label: 'Last Name',

          validation: {
            required: true,
            minLength: 2,
          },
        },

        {
          type: 'text',
          name: 'email',
          label: 'Email',

          validation: {
            required: true,
            email: true,
          },
        },
      ],
    },

    {
      type: 'group',
      name: 'documents',
      label: 'Documents Information',

      fields: [
        {
          type: 'dropdown',
          name: 'documentType',
          label: 'Document Type',

          options: [
            'passport',
            'personal-id',
          ],

          validation: {
            required: true,
          },
        },

        {
          type: 'text',
          name: 'documentNumber',
          label: 'Document Number',

          validation: {
            required: true,
          },

          dynamicValidation: [
            {
              dependsOn: 'documents.documentType',
              equals: 'passport',

              rules: {
                minLength: 8,
                maxLength: 12,
              },
            },

            {
              dependsOn: 'documents.documentType',
              equals: 'personal-id',

              rules: {
                pattern: '^[0-9]+$',
              },
            },
          ],
        },
      ],
    },

    {
      type: 'group',
      name: 'contactInfo',
      label: 'Contact Information',

      autoFill: {
        type: 'phone-to-country',

        dependencies: [
          'contactInfo.phone',
        ],

        targetField: 'country',
      },

      fields: [
        {
          type: 'text',
          name: 'phone',
          label: 'Phone Number',

          validation: {
            required: true,
            pattern:
              '^\\+?[0-9\\- ]+$',
          },
        },

        {
          type: 'text',
          name: 'country',
          label: 'Detected Country',

          visibility: {
            dependsOn: 'contactInfo.country',
            notEquals: 'Unknown',
          },
        },

        {
          type: 'dropdown',
          name: 'manualCountry',
          label: 'Select Country',

          visibility: {
            dependsOn: 'contactInfo.country',
            equals: 'Unknown',
          },

          options: [
            'Bulgaria',
            'Germany',
            'France',
            'USA',
          ],
        },
      ],
    }
  ],
};