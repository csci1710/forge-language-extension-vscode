const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const { join } = require('path');

const getPackageVersion = (branch) => {


  const packageJsonPath = 'package.json';
  const package_contents = execSync(`git show ${branch}:${packageJsonPath}`).toString().trim();
  const packageJson = JSON.parse(package_contents);
  //console.log(`Version: ${packageJson.version}`);
  return packageJson.version;
};

const currBranchVersion = getPackageVersion('HEAD');
const mainVersion = getPackageVersion('main');

if (currBranchVersion == mainVersion) {
  console.error('Version number must be incremented.');
  process.exit(1); // Fails the workflow if versions are the same
} else {
  console.log('Version number has been incremented.');
}