import { IConfiguration } from '../../configuration.type';

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
        const requestName = service.requestType || `${service.name}Request`;
        const requestType = `serviceTypes.${requestName}`;
        const responseName = service.responseType || `${service.name}Response`;
        const responseType = `serviceTypes.${responseName}`;

        return `  ${functionName} (${requestName}: ${requestType}): Promise<${responseType}>;`;
      }),
    )
    .concat(['}', '']);

  return interfaceFile.join('\n');
}
