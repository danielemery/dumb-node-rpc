import configurationSchema from './configuration.schema';
import {
  copyFileToDestinations,
  readJsonFromFile,
  writeFileToDestinations,
} from './file.helpers';
import Logger from '@danielemeryau/logger';
import generateInterfaceFile from './generators/shared/generateInterfaceFile';
import packageSchema from './package.schema';
import clientPackageTemplate from './generators/client/generateClientPackageJson';
import generateClientIndex from './generators/client/generateClientIndex';

const logger = new Logger('rpc-generation-script');

const configPath = './samples/input/SampleService.specification.json';

async function performGeneration() {
  logger.info(`Attempting to read configuration from ${configPath}`);
  const configuration = await readJsonFromFile(configPath, configurationSchema);
  const packageJson = await readJsonFromFile('./package.json', packageSchema);
  logger.info('Configuration read successfully', packageJson);
  logger.info('Configuration read successfully', configuration);

  const { name: serviceName, sourceFolder, destinationFolder } = configuration;

  const typesFileName = `${serviceName}.types.ts`;

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
  )
  await writeFileToDestinations(
    generateInterfaceFile(serviceName, configuration),
    `${destinationFolder}/server/I${serviceName}.ts`,
    `${destinationFolder}/client/I${serviceName}.ts`,
  );

  // Client
  await writeFileToDestinations(
    clientPackageTemplate({
      author: packageJson.author,
      license: packageJson.license,
      name: 'test',
      repository: 'test',
      version: packageJson.version,
    }),
    `${destinationFolder}/client/package.json`,
  );
  await writeFileToDestinations(
    generateClientIndex({
      serviceName,
    }),
    `${destinationFolder}/client/client.ts`,
  );

  // Server
  // TODO
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
