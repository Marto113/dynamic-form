export const generateInitialValues = (schema: any) => {
  const values: Record<string, any> = {};

  schema.fields.forEach((field: any) => {
    switch (field.type) {
      case 'checkbox':
        values[field.name] = false;
        break;

      default:
        values[field.name] = '';
    }
  });

  return values;
};
