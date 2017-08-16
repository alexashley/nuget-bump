// const {parseNuSpec, writeNuSpec} = require('./src/nuspec.js');
const validateArgs = require('./src/validator');
const exitWithError = require('./src/error');
const glob = {sync: pattern => {}}

const usage = 'nuget-bump major|minor|patch feed.example.com';

const bump = (bumpIncrement, packageSource) => {    
    const [bump, pkgSrc, error] = validateArgs(bumpIncrement, packageSource);
    
    if (error) {
        exitWithError(error);
    }
}

const [, , bumpArg = '', pkgSrc] = process.argv;

bump(bumpArg, pkgSrc);
