import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import JsonEditor from '../components/editor/JsonEditor';

import FormContainer from '../components/form/FormContainer';

import { basicSchema } from '../examples/basic-schema';

const initialJson = JSON.stringify(
  basicSchema,
  null,
  2
);

const FormBuilderPage = () => {
  const [editorValue, setEditorValue] =
    useState(initialJson);

  const [jsonInput, setJsonInput] =
    useState(initialJson);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setJsonInput(editorValue);
    }, 500);

    return () =>
      clearTimeout(timeout);
  }, [editorValue]);

  const parsedSchema = useMemo(() => {
    try {
      return JSON.parse(jsonInput);
    } catch {
      return null;
    }
  }, [jsonInput]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          '1fr 1fr',
        gap: '20px',
        padding: '20px',
      }}
    >
      <div>
        <JsonEditor
          value={editorValue}
          onChange={setEditorValue}
        />

        {!parsedSchema && (
          <p
            style={{ color: 'red' }}
          >
            Invalid JSON format
          </p>
        )}
      </div>

      <div>
        {parsedSchema && (
          <FormContainer
            key={jsonInput}
            schema={parsedSchema}
          />
        )}
      </div>
    </div>
  );
};

export default FormBuilderPage;