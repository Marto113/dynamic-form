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
          type: 'group',
          name: 'passportGroup',
          label: 'Passport Information',

          visibility: {
            dependsOn: 'documents.documentType',
            equals: 'passport',
          },

          fields: [
            {
              type: 'validated-text',
              name: 'passportNumber',
              label: 'Passport Number',

              validation: {
                required: true,
                minLength: 8,
                maxLength: 12,
              },
            },
          ],
        },

        {
          type: 'group',
          name: 'personalIdGroup',
          label: 'Personal ID Information',

          visibility: {
            dependsOn: 'documents.documentType',
            equals: 'personal-id',
          },

          fields: [
            {
              type: 'text',
              name: 'personalId',

              label: 'Personal ID',

              validation: {
                required: true,
                pattern: '^[0-9]+$',
              },
            },
          ],
        },

        {
          type: 'text',
          name: 'phone',
          label: 'Phone Number',

          validation: {
            required: true,
            pattern: '^\\+?[0-9\\- ]+$',
          },
        },
      ],
    },

    {
      type: 'group',
      name: 'additionalInfo',
      label: 'Additional Information',

      fields: [
        {
          type: 'textarea',
          name: 'about',
          label: 'About Yourself',

          validation: {
            required: true,
            minLength: 10,
          },
        },

        {
          type: 'dropdown',
          name: 'country',
          label: 'Country',

          options: [
            'Bulgaria',
            'Germany',
            'France',
            'USA',
          ],

          validation: {
            required: true,
          },
        },

        {
          type: 'radio',
          name: 'gender',
          label: 'Gender',

          options: [
            'Male',
            'Female',
            'Other',
          ],

          validation: {
            required: true,
          },
        },

        {
          type: 'checkbox',
          name: 'acceptedTerms',
          label: 'Accept Terms and Conditions',

          validation: {
            required: true,
          },
        },
      ],
    },
  ],
};