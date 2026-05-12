type Props = {
  value: string;
  onChange: (value: string) => void;
};

const JsonEditor = ({ value, onChange }: Props) => {
  return (
    <>
      <h2>JSON Schema Editor</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={35}
        style={{
          width: '100%',
          fontFamily: 'monospace',
        }}
      />
    </>
  );
};

export default JsonEditor;
