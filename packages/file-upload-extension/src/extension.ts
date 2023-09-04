import { createPlugin } from '@backstage/core-plugin-api';
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { FileUploadExtensionComponent, FileUploadFieldSchema } from './components/FileUploadExtensionComponent';

export const fileUploadPlugin = createPlugin({
  id: 'file-upload-plugin',
});

export const FileUploadFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
      name: 'FileUploadExtension',
      component: FileUploadExtensionComponent,
      schema: FileUploadFieldSchema,
  }),
);
