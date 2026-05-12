import DynamicField from './DynamicField';
import GroupRenderer from '../groups/GroupRenderer';
import type { FormField } from '../../../types/form.types';
import { useFormikContext } from 'formik';
import { checkVisibility } from '../../../utils/checkVisibility';

type Props = {
  node: FormField;
  parentPath?: string;
};

const RenderNode = ({
  node,
  parentPath,
}: Props) => {
  const { values } = useFormikContext();

  const isVisible = checkVisibility(
    values,
    node.visibility
  );

  if (!isVisible) {
    return null;
  }

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