import DynamicField from './DynamicField';
import GroupRenderer from '../groups/GroupRenderer';
import type { FormField } from '../../../types/form.types';

type Props = {
  node: FormField;
  parentPath?: string;
};

const RenderNode = ({
  node,
  parentPath,
}: Props) => {
  const currentPath = parentPath
    ? `${parentPath}.${node.name}`
    : node.name;

  if (node.type === 'group') {
    return (
      <GroupRenderer
        group={node}
        groupPath={currentPath}
      />
    );
  }

  return (
    <DynamicField
      field={node}
      fieldPath={currentPath}
    />
  );
};

export default RenderNode;