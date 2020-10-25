#!/usr/bin/env node
import configurationSchema from './src/configuration/configuration.schema';
import {
  copyFileToDestinations,
  readJsonFromFile,
  writeFileToDestinations,
} from './src/file.helpers';
import Logger from '@danielemeryau/logger';
import generateInterfaceFile from './src/generators/shared/generateInterfaceFile';
import packageSchema from './src/package/package.schema';
import generateClientPackageJson from './src/generators/client/generateClientPackageJson';
import generateServerPackageJson from './src/generators/server/generateServerPackageJson';
import generateClientIndex from './src/generators/client/generateClientIndex';
import hydrateConfiguration from './src/configuration/hydrateConfiguration';
import generateServerIndex from './src/generators/server/generateServerIndex';

const logger = new Logger('rpc-generation-script');

const [,, configPath] = process.argv;

async function performGeneration() {
  logger.info(`Attempting to read configuration from ${configPath}`);
  const rawConfiguration = await readJsonFromFile(
    configPath,
    configurationSchema,
  );
  const packageJson = await readJsonFromFile('./package.json', packageSchema);
  logger.info('Details loaded from package.json', packageJson);
  logger.info('Configuration read successfully', rawConfiguration);

  const configuration = hydrateConfiguration(rawConfiguration, packageJson);
  const { name: serviceName, sourceFolder, destinationFolder } = configuration;

  const typesFileName = `${serviceName}.types.ts`;

  const packageJsonDetails = {
    author: packageJson.author,
    license: packageJson.license,
    version: packageJson.version,
  };

  // Shared
  await copyFileToDestinations(
    `${sourceFolder}/${typesFileName}`,
    `${destinationFolder}/server/${typesFileName}`,
    `${destinationFolder}/client/${typesFileName}`,
  );
  await copyFileToDestinations(
    `./tsconfig.json`,
    `${destinationFolder}/server/tsconfig.json`,
    `${destinationFolder}/client/tsconfig.json`,
  );
  await writeFileToDestinations(
    generateInterfaceFile(serviceName, configuration),
    `${destinationFolder}/server/I${serviceName}.ts`,
    `${destinationFolder}/client/I${serviceName}.ts`,
  );

  // Client
  await writeFileToDestinations(
    generateClientPackageJson({
      ...packageJsonDetails,
      name: configuration.clientNpmPackageName,
    }),
    `${destinationFolder}/client/package.json`,
  );
  await writeFileToDestinations(
    generateClientIndex({
      serviceName,
      services: configuration.services,
    }),
    `${destinationFolder}/client/client.ts`,
  );

  // Server
  await writeFileToDestinations(
    generateServerPackageJson({
      ...packageJsonDetails,
      name: configuration.serverNpmPackageName,
    }),
    `${destinationFolder}/server/package.json`,
  );
  await writeFileToDestinations(
    generateServerIndex({
      serviceName,
      services: configuration.services,
    }),
    `${destinationFolder}/server/server.ts`,
  );
}

performGeneration()
  .then(() => {
    logger.info('Generation completed successfully');
    process.exit(0);
  })
  .catch((err) => {
    logger.error('Generation failed', err);
    process.exit(1);
  });
