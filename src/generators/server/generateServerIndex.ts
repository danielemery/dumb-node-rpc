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
import DumbNodeRPCBaseServer from '@danielemeryau/dumb-node-rpc-base-server';
import I${serviceName} from './I${serviceName}';

export default class ${serviceName}Server extends DumbNodeRPCBaseServer {
  constructor(loggerName: string, port: number, service: I${serviceName}) {
    super(loggerName, port);
    ${services
      .map(
        (service) => `
    this.addRoute('${service.name}', service.${service.name});`,
      )
      .join('')}
  }
}
`;
}
