const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const { join } = require('path');

const getPackageVersion = (path) => {
  const packageJsonPath = join(path, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath));
  return packageJson.version;
};

const mainBranchVersion = getPackageVersion('.');
const prBranchVersion = execSync('git merge-base HEAD main').toString().trim();
const baseVersion = getPackageVersion(prBranchVersion);

if (mainBranchVersion === baseVersion) {
  console.error('Version number must be incremented.');
  process.exit(1); // Fails the workflow if versions are the same
} else {
  console.log('Version number has been incremented.');
}