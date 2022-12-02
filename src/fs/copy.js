import fs from "fs/promises";
import { pipeline } from "stream/promises";
import path from "path";
import { getPathFolder } from "../utilities.js";

const targetFolder = "files";
const distFolder = "files_copy";
const scriptFolderPath = getPathFolder(import.meta.url);
const targetPath = path.join(scriptFolderPath, targetFolder);
const distPath = path.join(scriptFolderPath, distFolder);

export const copy = async (src = targetPath, dist = distPath) => {
  try {
    const files = await fs.readdir(src, { withFileTypes: true });
    await fs.mkdir(dist, { recursive: false });

    for (const file of files) {
      if (file.isDirectory()) {
        await copy(path.join(src, file.name), path.join(dist, file.name));
      } else {
        const readStream = (
          await fs.open(path.join(src, file.name), "r")
        ).createReadStream();
        const writeStream = (
          await fs.open(path.join(dist, file.name), "w")
        ).createWriteStream();
        await pipeline(readStream, writeStream);
      }
    }
  } catch {
    throw new Error("FS operation failed");
  }
};

// call function for test
try {
  await copy();
  console.log("Done.");
} catch (error) {
  console.error(error);
}
