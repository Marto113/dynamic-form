import RenderNode from '../renderer/RenderNode';

type Props = {
  group: any;
};

const GroupRenderer = ({
  group,
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

      {group.fields.map(
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

export default GroupRenderer;