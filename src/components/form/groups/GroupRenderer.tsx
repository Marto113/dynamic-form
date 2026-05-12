import type { GroupField } from '../../../types/form.types';

import RenderNode from '../renderer/RenderNode';

type Props = {
  group: GroupField;
  groupPath: string;
};

const GroupRenderer = ({
  group,
  groupPath,
}: Props) => {
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <h3>{group.label}</h3>

      {group.fields.map((node) => (
        <RenderNode
          key={node.name}
          node={node}
          parentPath={groupPath}
        />
      ))}
    </div>
  );
};

export default GroupRenderer;