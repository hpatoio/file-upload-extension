import React, { useRef, useState, ChangeEvent } from 'react';
import { Button, FormControl, FormHelperText } from '@material-ui/core';
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '@backstage/plugin-scaffolder';

const FileUploadPluginFieldSchema = makeFieldSchemaFromZod(
  z.string(),
  z.object({
    accept: z
      .string()
      .describe('Accepted file extension. Es: .yaml, .yml'),
  }),
);

export const FileUploadFieldSchema = FileUploadPluginFieldSchema.schema;

type FileUploadFielType = typeof FileUploadPluginFieldSchema.type;

export const FileUploadExtensionComponent = ({
  rawErrors,
  required,
  formData,
  schema: { title, description },
  uiSchema: { 'ui:options': options },
}: FileUploadFielType) => {
    const [selectedFileName, setSelectedFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Use optional chaining

    if (selectedFile !== null && selectedFile !== undefined) {
      // Update the selectedFileName state with the name of the selected file
      setSelectedFileName(selectedFile.name);
      // Handle the selected file here
      console.log('Selected file:', selectedFile);
    }
  };

  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors?.length > 0 && !formData}
    >
      <Button variant="contained" color="primary" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
        {title === undefined ? "Select file" : title}
      </Button>
      <span style={{ marginLeft: '10px' }}>{selectedFileName}</span>
      <label>
        <input
          type="file"
          style={{ display: 'none' }}
          accept={options?.accept}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </label>
      {description && <FormHelperText>{description}</FormHelperText>}
    </FormControl >
  );
};