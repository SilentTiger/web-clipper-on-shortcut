const { writeFileSync } = require('fs');
const { version, dependencies } = require('../package.json');

const mainVersion = version;
const readabilityVersion = dependencies['@mozilla/readability']
const dompurifyVersion = dependencies['dompurify']
const showdownVersion = dependencies['showdown']

const versionFileContent = `${mainVersion}
${readabilityVersion}
${dompurifyVersion}
${showdownVersion}
`
console.log('versionFileContent', versionFileContent)
writeFileSync('./website/version.txt', versionFileContent)