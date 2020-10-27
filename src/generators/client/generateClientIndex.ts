import { IService } from '../../configuration/configuration.type';

export interface ClientIndexRequirements {
  serviceName: string;
  services: IService[];
}

export default function generateClientIndex(
  requirements: ClientIndexRequirements,
) {
  const { serviceName, services } = requirements;
  return `
import DumbNodeRPCBaseClient from '@danielemeryau/dumb-node-rpc-base-client';

import I${serviceName} from './I${serviceName}';
import * as ${serviceName}Types from './${serviceName}.types';

class ${serviceName}Client implements I${serviceName} {
  private client: DumbNodeRPCBaseClient;

  constructor(apiUrl: string, loggerName: string) {
    this.client = new DumbNodeRPCBaseClient(apiUrl, loggerName);
  }
  ${services
    .map(
      (service) => `
  async ${service.name}(${service.requestType}: ${serviceName}Types.${service.requestType}): Promise<${serviceName}Types.${service.responseType}> {
    return this.client.makeCall('${service.name}', ${service.requestType});
  }`,
    )
    .join('\n')}
}

export { ${serviceName}Client, I${serviceName}, ${serviceName}Types };
`;
}
