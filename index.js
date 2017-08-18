#!/usr/bin/env node

const {bump} = require('./src/bump');

const [, , bumpArg = '', pkgSrc] = process.argv;

bump(bumpArg, pkgSrc);
