const semver = require('semver');

const {validateArgs} = require('./validator');
const {exitWithError} = require('./error');
const {
    parseNuSpec, 
    writeNuSpec,
    getPackageInfoFromNuSpec
} = require('./nuspec');
const git = require('./git');
const {writeAssemblyInfo} = require('./assembly-attributes');

const tagAndPush = version => {
    const msg = `Release v${version}`;

    git.commit(msg);
    git.tag(version, msg);
    git.pushWithTags();
}

const bump = async (bumpIncrement, packageSource) => {    
    const [bump, pkgSrc, error] = validateArgs(bumpIncrement, packageSource);
    if (error) {
        exitWithError(error);
    }
    const {
        nuspecFileName,
        projectName,
        pkgInfo
    } = getPackageInfoFromNuSpec();
    const nextVersion = semver.inc(pkgInfo.version, bump); 

    console.log(`bumping ${projectName} from ${pkgInfo.version} to ${nextVersion}`);

    writeNuSpec(nuspecFileName, Object.assign({}, pkgInfo, {version: nextVersion})),
    writeAssemblyInfo('Properties/AssemblyInfo.cs', nextVersion)
    tagAndPush(nextVersion);
}

module.exports = {
    bump
}