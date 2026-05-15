# Dynamic Form

## Overview

Dynamic Form is a React and TypeScript application that turns a JSON schema into a working form UI. The app is built as a live form builder: the left side contains a JSON editor, and the right side renders the generated form preview in real time.

The current implementation focuses on schema-driven rendering, validation, conditional visibility, and autofill behavior. Form state is managed with **Formik**, validation is generated with **Yup**, and unit tests are written with **Vitest**.

## What The Project Does

- Converts JSON schema into form fields automatically
- Supports grouped and nested field structures
- Generates Formik initial values from the schema
- Builds Yup validation rules dynamically
- Hides and shows fields based on other field values
- Removes hidden fields from the submitted output
- Supports async autofill for dependent fields

## Tech Stack

- **React**
- **TypeScript**
- **Formik**
- **Yup**
- **Vite**
- **Vitest**
- **Material UI**
- **Emotion**
- **Lodash**
- **react-simple-code-editor**
- **PrismJS**

## Project Structure

```text
dynamic-form/
├── public/
├── src/
│   ├── components/
│   │   ├── editor/
│   │   └── form/
│   ├── examples/
│   ├── hooks/
│   ├── mock-api/
│   ├── pages/
│   ├── tests/
│   ├── types/
│   ├── utils/
│   └── validation/
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Main Areas

### `src/pages`

Contains the main builder page. `FormBuilderPage.tsx` connects the JSON editor to the rendered form preview and debounces schema updates before parsing.

### `src/components/editor`

Contains the JSON editor. The project uses `react-simple-code-editor` together with Prism syntax highlighting so the schema can be edited directly in the browser.

### `src/components/form`

Contains the form rendering flow. The form is rendered from schema nodes, grouped fields are handled recursively, and Formik is used to drive value updates, validation, and submission.

### `src/examples`

Contains the sample schema used as the starting point in the editor. It demonstrates grouped fields, dynamic validation, visibility rules, and autofill behavior.

### `src/types`

Defines the schema model for the application, including field types, validation rules, visibility configuration, dynamic validation rules, and autofill configuration.

### `src/utils`

Contains the main non-UI utility logic that makes the form engine dynamic.

### `src/validation`

Contains the Yup schema generator and the mapping between JSON validation keys and Yup validators.

### `src/mock-api`

Contains the mock async lookup used by autofill. In the current sample, a phone prefix is converted into a detected country.

### `src/tests`

Contains unit tests for validation, utility functions, and the mock autofill API.

## Current Rendering Behavior

Based on the current renderer, the implemented field types that are actively mapped into UI components are:

- `text`
- `textarea`
- `dropdown`
- `checkbox`
- `radio`
- `group`

The form is rendered recursively, so group fields can contain nested child fields and other schema-driven logic.

## Form Architecture

The form lifecycle currently works like this:

1. A schema is loaded from `src/examples/basic-schema.ts` and shown in the JSON editor.
2. The editor value is debounced with `useDebounce`.
3. The JSON is parsed into a schema object.
4. `FormContainer` creates Formik `initialValues` using `generateInitialValues`.
5. Validation is performed through a custom Formik `validate` function that calls `generateYupSchema`.
6. Field visibility is checked during rendering using `checkVisibility`.
7. `AutoFillHandler` listens to form values and updates dependent fields when autofill rules are configured.
8. On submit, hidden fields are removed from the final payload using `filterHiddenFields`.

## Key Utility Functions

### `generateInitialValues`

File: `src/utils/generateInitialValues.ts`

This utility creates the initial Formik values object from the schema.

What it does:

- Walks through every field in the schema
- Builds nested objects for `group` fields
- Uses `false` as the default value for checkboxes
- Uses empty strings for other field types

This function is important because Formik needs a complete initial shape that matches the generated form structure.

### `checkVisibility`

File: `src/utils/checkVisibility.ts`

This utility decides whether a field should be shown.

What it does:

- Reads dependency values from nested paths using `lodash/get`
- Supports `equals` visibility conditions
- Supports `notEquals` visibility conditions
- Defaults to visible when no visibility rule exists

This same logic is reused in rendering and output filtering so hidden-field behavior stays consistent.

### `filterHiddenFields`

File: `src/utils/filterOutput.ts`

This utility removes hidden values from the final submitted result.

What it does:

- Traverses the schema recursively
- Skips fields that are currently hidden
- Preserves visible nested group values
- Returns a cleaned payload aligned with the current UI state

This ensures the submitted output only contains fields the user was actually allowed to see and interact with.

### `generateYupSchema`

File: `src/validation/yupGenerator.ts`

This utility generates a Yup schema dynamically from the JSON form schema and the current Formik values.

What it does:

- Builds a Yup object shape from the schema
- Skips validation for hidden fields
- Recursively handles group fields
- Applies static field validation rules
- Applies dynamic validation rules when dependency conditions match

This is the core validation engine for the project.

### `validationMappings`

File: `src/validation/validationMappings.ts`

This file translates schema validation keys into actual Yup rule calls.

Currently supported validation rules:

- `required`
- `email`
- `minLength`
- `maxLength`
- `pattern`

This design keeps the schema format simple while making the validation layer easy to extend.

### `AutoFillHandler`

File: `src/components/form/AutoFillHandler.tsx`

This component implements schema-driven autofill as a Formik side effect.

What it currently does:

- Scans group fields for `autoFill` configuration
- Watches configured dependency values
- Triggers an async lookup for `phone-to-country`
- Writes the result back into the configured target field
- Avoids repeated lookups for the same phone prefix

In the current example, a phone number such as `+359...` or `+49...` is used to derive a country value.

## Validation

The project uses **Formik** for form state and **Yup** for validation.

Formik is responsible for:

- holding form values
- running validation
- tracking touched fields
- handling submit

Yup is responsible for:

- applying required field rules
- applying length and pattern rules
- applying email validation
- adapting validation based on current form values

The sample schema includes dynamic validation on `documents.documentNumber`:

- when `documents.documentType` is `passport`, min/max length rules are applied
- when `documents.documentType` is `personal-id`, a numeric pattern rule is applied

## Dynamic Hidden Fields

Hidden field logic is schema-driven through the `visibility` configuration.

The sample schema currently demonstrates this in the `contactInfo` group:

- `country` is shown when the detected country is not `Unknown`
- `manualCountry` is shown when the detected country is `Unknown`

This allows the form to respond to current values without hardcoding UI conditions in each field component.

## Autofill

Autofill is configured at the group level through `autoFill`.

The current sample uses:

- `type: phone-to-country`
- dependency: `contactInfo.phone`
- target field: `country`

The lookup is backed by `src/mock-api/countryApi.ts`, which currently returns:

- `Bulgaria` for `+359`
- `Germany` for `+49`
- `Unknown` for other prefixes

This structure can later be replaced with a real API without changing the general schema-driven approach.

## Testing

The project uses **Vitest** for unit tests.

The current tests cover:

- Yup schema generation
- visibility rule evaluation
- hidden field filtering
- initial value generation
- mock country autofill behavior

The existing test suite focuses mainly on the utility and validation layer, which is the most important part of a schema-driven form engine.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```

Run tests:

```bash
npx vitest
```

## Summary

This project is a JSON-driven form generator built with **React**, **Formik**, and **Yup**. Its main value is in the schema utility layer that handles:

- initial value generation
- conditional visibility
- output cleanup for hidden fields
- dynamic validation
- async autofill

Together, these parts turn a JSON definition into a dynamic form experience that can adapt both its UI and its validation rules at runtime.
