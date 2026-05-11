export const basicSchema = {
  title: 'User Registration Form',

  fields: [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
    },

    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
    },

    {
      type: 'textarea',
      name: 'about',
      label: 'About Yourself',
    },

    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      options: [
        'Bulgaria',
        'Germany',
        'France',
      ],
    },

    {
      type: 'checkbox',
      name: 'acceptedTerms',
      label: 'Accept Terms',
    },

    {
      type: 'radio',
      name: 'gender',
      label: 'Gender',
      options: [
        'Male',
        'Female',
      ],
    },

    {
      type: 'validated-text',
      name: 'passportNumber',
      label: 'Passport Number',
    },
  ],
};