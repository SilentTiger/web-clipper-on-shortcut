const { writeFileSync } = require('fs');
const { version, dependencies } = require('../package.json');

const mainVersion = version;
const readabilityVersion = dependencies['@mozilla/readability']
const dompurifyVersion = dependencies['dompurify']
const turndownVersion = dependencies['turndown']

const versionFileContent = `${mainVersion}
https://cdn.jsdelivr.net/npm/@mozilla/readability@${readabilityVersion}/Readability.js
https://cdn.jsdelivr.net/npm/dompurify@${dompurifyVersion}/dist/purify.min.js
https://cdn.jsdelivr.net/npm/turndown@${turndownVersion}/dist/turndown.js
`
console.log('versionFileContent', versionFileContent)
writeFileSync('./website/version.txt', versionFileContent)