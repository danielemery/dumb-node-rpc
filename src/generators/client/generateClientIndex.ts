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
import * as serviceTypes from './${serviceName}.types';

export default class ${serviceName}Client implements I${serviceName} {
  private client: DumbNodeRPCBaseClient;

  constructor(apiUrl: string, loggerName: string) {
    this.client = new DumbNodeRPCBaseClient(apiUrl, loggerName);
  }
  ${services
    .map(
      (service) => `
  async ${service.name}(${service.requestType}: serviceTypes.${service.requestType}): Promise<serviceTypes.${service.responseType}> {
    return this.client.makeCall('${service.name}', ${service.requestType});
  }`,
    )
    .join('\n')}
}
`;
}
