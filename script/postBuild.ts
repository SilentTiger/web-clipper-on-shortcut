const { readFileSync, writeFileSync, renameSync } = require('fs');
const { createHash } = require('crypto');

function hashFile(): string {
  const fileDataBuffer = readFileSync('./dist/index.js');
  const hashSum = createHash('md5');
  hashSum.update(fileDataBuffer);
  return hashSum.digest('hex');
}
const fileHash = hashFile();
renameSync('./dist/index.js', `./website/${fileHash}.js`);
writeFileSync('./website/version.txt', fileHash);