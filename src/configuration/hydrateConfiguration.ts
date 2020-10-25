import { IConfiguration, IRawConfiguration } from './configuration.type';
import PackageType from '../package/package.type';

export default function hydrateConfiguration(
  raw: IRawConfiguration,
  packageJson: PackageType,
): IConfiguration {
  return {
    ...raw,
    clientNpmPackageName:
      raw.clientNpmPackageName || `${packageJson.name}-client`,
    serverNpmPackageName:
      raw.serverNpmPackageName || `${packageJson.name}-server`,
    services: raw.services.map((rawService) => ({
      ...rawService,
      requestType: rawService.requestType || `${rawService.name}Request`,
      responseType: rawService.responseType || `${rawService.name}Response`,
    })),
  };
}
