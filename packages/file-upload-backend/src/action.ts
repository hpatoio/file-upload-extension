import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs-extra';
import { z } from 'zod';

export const createNewFileAction = () => {
  return createTemplateAction({
    id: 'hpatoio:file:save',
    schema: {
      input: z.object({
        content: z.string().describe('The contents of the file'),
        filename: z
          .string()
          .describe('The filename of the file that will be save'),
      }),
      output: z.object({
        filePath: z.string().describe('The full path of the file created'),
      }),
    },

    async handler(ctx) {

      console.log("Inizio");

      const explodedFile = ctx.input.content.split(";");
      const base64File = explodedFile[explodedFile.length-1].split(",")[1];
      const fileContents = Buffer.from(base64File, 'base64')
      const filePath = `${ctx.workspacePath}/${ctx.input.filename}`
    
      console.log("FilePath " + filePath);
      console.log("Content " + fileContents);

      try {
      
        await fs.outputFile(
          filePath,
          fileContents,
        );

      } catch (err) {
        console.error("Errore " + err)
      }

      ctx.output('filePath', filePath);
      
    },
    
  });
};