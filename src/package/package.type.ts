export default interface Package {
  name: string;
  author: string;
  license: string;
  version: string;
  dependencies?: { [key: string]: string };
}
