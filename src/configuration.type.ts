export interface IConfiguration {
  name: string;
  sourceFolder: string;
  destinationFolder: string;
  services: IService[];
}

export interface IService {
  name: string;
  requestType?: string;
  responseType?: string;
}
