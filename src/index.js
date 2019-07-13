var exec = null;
var fs = require('fs');
var join = require('path').join;
var basename = require('path').basename;

var async = require('async');
var command = '';

function isDirectory(file, callback) {
  return fs.stat(file, function(err, stats) {
    if (err) {
      var message = [
        'Something went wrong on "' + file + '"',
        'Message: ' + err.message
      ].join('\n');
      console.log(message);
      return callback(null, false);
    }
    return callback(null, stats.isDirectory());
  });
}

function run(command, options, callback) {
  options = options || {};
  return exec(command, options, callback);
}

function runCommand(dir, callback) {
  return run(command, { cwd: dir }, function(err, stdout, stderr) {
    console.log('\n\x1b[36m%s\x1b[0m', basename(dir) + '/');
    if (err) {
      var message = [
        'Something went wrong on "' + dir + '" ...',
        'Command: ' + command,
        'Message: \x1b[31m' + err.message + '\x1b[0m'
      ].join('\n');
      return console.log(message);
    }
    if (stdout) {
      process.stdout.write(stdout);
    }
    if (stderr) {
      process.stdout.write(stderr);
    }
    return callback();
  });
}

function readFiles(dir, callback) {
  return fs.readdir(dir, function(err, children) {
    if (err) {
      return callback(err);
    }
    var files = children.map(function(child) {
      return join(dir, child);
    });
    return callback(null, files);
  });
}

function runFromDirectory(parent) {
   return readFiles(parent, function(err, files) {
    if (err) {
      return console.log(err.message);
    }

    async.filter(files, isDirectory, function(err, results) {
      runCommandInEach(results)
    });
  });
}

function runCommandInEach(results) {
  async.each(results, runCommand);
}

module.exports = function(parent, _command, execFunction) {
  exec = execFunction
  command = _command
  console.log('\x1b[42m' + command + '\x1b[0m UTC:' + new Date().toISOString().replace('T', ' ').substr(0, 19));
  return runFromDirectory(parent);
};
