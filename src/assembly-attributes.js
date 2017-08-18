const fs = require('fs');

const assemblyAttributes = {
    AssemblyVersion: '',
    AssemblyFileVersion: '',
    AssemblyInformationalVersion: ''
}

const fileHeader = `
// Warning: this is an auto-generated file!
// Any edits here will be over-written.

using System.Reflection;    
`

const writeAssemblyInfo = (fileName, version) => {
    const fileBody = Object.keys(assemblyAttributes)
                        .map(attribute => `[assembly: ${attribute}("${version}")]`)
                        .join('\n');
    const csFile = [fileHeader, fileBody].join('\n');
    
    fs.writeFileSync(fileName, csFile);
};

module.exports = {
    writeAssemblyInfo
};