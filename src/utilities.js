import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getPathFolder = (meta) => {
  const pathToFile = fileURLToPath(meta);
  return dirname(pathToFile);
}