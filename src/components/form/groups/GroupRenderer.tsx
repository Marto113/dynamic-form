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
    <div className="form-group">
      <h3 className="form-group-title">
        {group.label}
      </h3>

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