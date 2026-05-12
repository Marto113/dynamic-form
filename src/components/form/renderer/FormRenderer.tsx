import { memo } from 'react';
import RenderNode from './RenderNode';

type Props = {
  schema: any;
};

const FormRenderer = ({ schema }: Props) => {
  return (
    <div>
      <h2>{schema.title}</h2>

      {schema.fields.map(
        (node: any) => (
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
