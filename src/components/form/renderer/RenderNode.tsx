import DynamicField from './DynamicField';
import GroupRenderer from '../groups/GroupRenderer';

type Props = {
  node: any;
};

const RenderNode = ({
  node,
}: Props) => {
  if (node.type === 'group') {
    return (
      <GroupRenderer
        group={node}
      />
    );
  }

  return (
    <DynamicField
      field={node}
    />
  );
};

export default RenderNode;