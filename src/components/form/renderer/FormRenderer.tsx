import { memo } from 'react';
import RenderNode from './RenderNode';
import type { FormField, FormSchema } from '../../../types/form.types';

type Props = {
  schema: FormSchema;
};

const FormRenderer = ({ schema }: Props) => {
  return (
    <div>
      <h2>{schema.title}</h2>

      {schema.fields.map(
        (node: FormField) => (
          <RenderNode
            key={node.name}
            node={node}
          />
        )
      )}
    </div>
  );
};

export default memo(FormRenderer);
