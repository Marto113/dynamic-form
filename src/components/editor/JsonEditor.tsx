import EditorModule from 'react-simple-code-editor';
import { highlight } from 'prismjs';
import Prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css';
import 'prismjs/components/prism-json';

const Editor = (EditorModule as unknown as {
  default: typeof EditorModule;
}).default;

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const JsonEditor = ({
  value,
  onChange,
}: Props) => {
  return (
    <>
      <h2>JSON Schema Editor</h2>

      <div style={{ maxHeight: '600px', overflow: 'scroll' }}>
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={(code: string) =>
            highlight(
              code,
              Prism.languages.json,
              'json'
            )
          }
          padding={16}
          textareaId="json-editor"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'scroll',
            backgroundColor: '#f5f5f5',
          }}
        />
      </div>
    </>
  );
};

export default JsonEditor;