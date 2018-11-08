const path  = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);// remove build directory before compiling

const contractPath = path.resolve(__dirname,'contracts', 'Campaign.sol');
const source = fs.readFileSync(contractPath,'utf8');

const output = solc.compile(source, 1).contracts;

console.log(output);

fs.ensureDirSync(buildPath); // recreate the build directory

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
