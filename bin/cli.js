#!/usr/bin/env node

var runSubdir = require('../src/index');
var cwd = process.cwd();
var command = process.argv.slice(2).join(' ');
var exec = require('child_process').exec;
runSubdir(cwd, command, exec);
