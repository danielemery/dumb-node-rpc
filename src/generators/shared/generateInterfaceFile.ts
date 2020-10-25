import { IConfiguration } from '../../configuration/configuration.type';

export default function generateInterfaceFile(
  serviceName: string,
  configuration: IConfiguration,
): string {
  const interfaceFile = [
    `import * as serviceTypes from './${serviceName}.types';`,
    '',
    `export default interface I${serviceName} {`,
  ]
    .concat(
      configuration.services.map((service) => {
        const functionName = service.name;
        const requestType = `serviceTypes.${service.requestType}`;
        const responseType = `serviceTypes.${service.responseType}`;

        return `  ${functionName} (${service.requestType}: ${requestType}): Promise<${responseType}>;`;
      }),
    )
    .concat(['}', '']);

  return interfaceFile.join('\n');
}
