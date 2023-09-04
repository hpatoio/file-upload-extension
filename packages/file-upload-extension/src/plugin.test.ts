import { fileUploadPlugin } from './extension';

describe('file-upload-extension', () => {
  it('should export plugin', () => {
    expect(fileUploadPlugin).toBeDefined();
  });
});