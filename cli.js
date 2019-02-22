#!/usr/bin/env node

var runSubdir = require('./index');
var cwd = process.cwd();
var command = process.argv.slice(2).join(' ');

runSubdir(cwd, command);
