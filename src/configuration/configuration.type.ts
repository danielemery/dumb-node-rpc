export interface IConfiguration {
  name: string;
  sourceFolder: string;
  destinationFolder: string;
  clientNpmPackageName: string;
  serverNpmPackageName: string;
  services: IService[];
}

export interface IService {
  name: string;
  requestType: string;
  responseType: string;
}

export interface IRawConfiguration {
  name: string;
  sourceFolder: string;
  destinationFolder: string;
  clientNpmPackageName?: string;
  serverNpmPackageName?: string;
  services: IRawService[];
}

export interface IRawService {
  name: string;
  requestType?: string;
  responseType?: string;
}
