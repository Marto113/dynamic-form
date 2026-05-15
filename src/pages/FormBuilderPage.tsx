import { useEffect, useMemo, useState } from 'react';
import JsonEditor from '../components/editor/JsonEditor';
import FormContainer from '../components/form/FormContainer';
import { basicSchema } from '../examples/basic-schema';
import { useDebounce } from '../hooks/useDebounce';

const initialJson = JSON.stringify(basicSchema, null, 2);

const FormBuilderPage = () => {
  const [editorValue, setEditorValue] = useState(initialJson);
  const debouncedJsonInput = useDebounce(editorValue, 300);

  const parsedSchema = useMemo(() => {
    try {
      return JSON.parse(debouncedJsonInput);
    } catch {
      return null;
    }
  }, [debouncedJsonInput]);

  return (
    <div className="app">
      <div className="editor-panel">
        <JsonEditor
          value={editorValue}
          onChange={setEditorValue}
        />

        {!parsedSchema && (
          <p className="json-error">
            Invalid JSON format
          </p>
        )}
      </div>

      <div className="form-panel">
        {parsedSchema && (
          <FormContainer
            key={debouncedJsonInput}
            schema={parsedSchema}
          />
        )}
      </div>
    </div>
  );
};

export default FormBuilderPage;
