const fs = require('fs');
const builder = require('xmlbuilder');
const parse = require('xml-parser');
const glob = require('glob');

const flattenXmlNodes = (obj, {name, content}) => Object.assign({}, obj, {[name]: content}); 

const parseNuSpec = fileName => {
    const nuspecXml = parse(fs.readFileSync(fileName, 'utf-8'));
    const [package] = nuspecXml.root.children;
    
    return package.children.reduce(flattenXmlNodes, {});    
}

const writeNuSpec = (fileName, metadata) => {
    const schema = {
        package: {
            metadata
        }
    }
    const xml = builder.create(schema).end({pretty: true});

    fs.writeFileSync(fileName, xml);
}

const getPackageInfoFromNuSpec = () => {
    const [nuspecFileName] = glob.sync('*.nuspec');
    
    if (!nuspecFileName) {
        exitWithError('Unable to find nuspec');
    }
    const [projectName] = nuspecFileName.split('.'); 
    const pkgInfo = parseNuSpec(nuspecFileName);

    return {
        nuspecFileName,
        projectName,
        pkgInfo
    }
}

module.exports = {
    getPackageInfoFromNuSpec,
    parseNuSpec,
    writeNuSpec
}