import PackageJsonRequirements from '../shared/packageJsonRequirements';

export default function packageJsonTemplate(
  requirements: PackageJsonRequirements,
) {
  const { author, dependencies = {}, license, name, version } = requirements;
  const allDependencies = [
    ...Object.entries(dependencies),
    ['@danielemeryau/dumb-node-rpc-base-server', '0.1.0'],
  ].sort((a, b) => a[0].localeCompare(b[0]));
  return `{
  "name": "${name}",
  "version": "${version}",
  "description": "Server generated by dumb-node-rpc.",
  "main": "dist/server.js",
  "scripts": {
    "build": "npx tsc"
  },
  "author": "${author}",
  "license": "${license}",
  "devDependencies": {
    "typescript": "^4.0.5"
  },
  "dependencies": {
    ${allDependencies.map((dep) => `"${dep[0]}": "${dep[1]}"`).join(',\n    ')}
  }
}`;
}
