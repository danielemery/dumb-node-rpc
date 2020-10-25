import * as fs from 'fs';
import Joi from 'joi';
import path from 'path';

async function _readJsonFromFile<T>(filepath: string): Promise<T> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const parsedData = JSON.parse(data.toString());
        resolve(parsedData);
      }
    });
  });
}

export async function readJsonFromFile<T>(
  filepath: string,
  schema: Joi.ObjectSchema<T>,
): Promise<T> {
  const data = await _readJsonFromFile<T>(filepath);
  if (data !== undefined) {
    const result = schema.validate(data, { stripUnknown: true });
    if (result.error) {
      throw new Error(`Configuration file invalid: ${result.error}`);
    } else {
      return result.value;
    }
  }
  throw new Error('Timed out waiting for configuration in stdin');
}

async function ensureDirectories(...filePaths: string[]) {
  return Promise.all(
    filePaths.map(
      (filePath) =>
        new Promise((resolve, reject) => {
          const dirname = path.dirname(filePath);
          fs.mkdir(dirname, { recursive: true }, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }),
    ),
  );
}

export async function writeFileToDestinations(
  contents: string,
  ...destinationPaths: string[]
) {
  await ensureDirectories(...destinationPaths);
  return Promise.all(
    destinationPaths.map(
      (destinationPath) =>
        new Promise((resolve) => {
          fs.writeFile(destinationPath, contents, () => {
            resolve();
          });
        }),
    ),
  );
}

export async function copyFileToDestinations(
  srcPath: string,
  ...destinationPaths: string[]
) {
  await ensureDirectories(...destinationPaths);
  return Promise.all(
    destinationPaths.map(
      (destinationPath) =>
        new Promise((resolve) => {
          fs.copyFile(srcPath, destinationPath, () => {
            resolve();
          });
        }),
    ),
  );
}
