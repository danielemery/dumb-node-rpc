import { IService } from '../../configuration/configuration.type';

export interface ServerIndexRequirements {
  serviceName: string;
  services: IService[];
}

export default function generateServerIndex(
  requirements: ServerIndexRequirements,
) {
  const { serviceName, services } = requirements;
  return `
import DumbNodeRPCBaseServer, { IVersionInfo, IBaseServerOptions } from '@danielemeryau/dumb-node-rpc-base-server';

import I${serviceName} from './I${serviceName}';
import * as ${serviceName}Types from './${serviceName}.types';

class ${serviceName}Server extends DumbNodeRPCBaseServer {
  constructor(
    service: I${serviceName},
    loggerName: string,
    port: number,
    versionInfo: IVersionInfo,
    options?: IBaseServerOptions
  ) {

    super(loggerName, port, versionInfo, options);
    ${services
      .map(
        (service) => `
    this.addRoute('/${service.name}', service.${service.name});`,
      )
      .join('')}
  }
}

export {
  ${serviceName}Server,
  I${serviceName},
  ${serviceName}Types,
  IVersionInfo,
  IBaseServerOptions,
};
`;
}
