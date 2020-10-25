export default interface PackageJsonRequirements {
  author: string;
  license: string;
  name: string;
  version: string;
  dependencies?: { [key: string]: string };
}
