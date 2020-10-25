export interface ClientIndexRequirements {
  serviceName: string;
}

export default function generateClientIndex(requirements: ClientIndexRequirements) {
  const { serviceName } = requirements;
  return `
import DumbNodeRPCBaseClient from '@danielemeryau/dumb-node-rpc-base-client';

export default class ${serviceName}Client {
  private client: DumbNodeRPCBaseClient;
  constructor(apiUrl: string) {
    this.client = new DumbNodeRPCBaseClient(apiUrl);
  }
}
  `;
}