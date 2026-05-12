import { memo } from 'react';
import DynamicField from './DynamicField';

type Props = {
  schema: any;
};

const FormRenderer = ({ schema }: Props) => {
  return (
    <div>
      <h2>{schema.title}</h2>

      {schema.fields.map((field: any) => (
        <DynamicField key={field.name} field={field} />
      ))}
    </div>
  );
};

export default memo(FormRenderer);
