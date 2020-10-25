import PackageJsonRequirements from "../shared/packageJsonRequirements";

export default function packageJsonTemplate(
  requirements: PackageJsonRequirements,
) {
  const { author, license, name, version } = requirements;
  return `{
  "name": "${name}",
  "version": "${version}",
  "description": "Server generated by dumb-node-rpc.",
  "main": "dist/server.js",
  "scripts": {
    "build": "npx tsc",
  },
  "author": "${author}",
  "license": "${license}",
  "devDependencies": {
    "@types/node": "^14.14.2",
    "ts-node": "^9.0.0",
    "typescript": "^4.0.3"
  },
  "dependencies": {
    "@danielemeryau/dumb-node-rpc-base-server": "0.0.4"
  }
}`;
}
