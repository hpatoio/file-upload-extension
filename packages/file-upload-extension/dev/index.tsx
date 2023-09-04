import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { fileUploadPlugin, FileUploadFieldExtension } from '../src/extension';

createDevApp()
  .registerPlugin(fileUploadPlugin)
  .addPage({
    element: <FileUploadFieldExtension />,
  })
  .render();
