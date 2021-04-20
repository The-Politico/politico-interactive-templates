#!/usr/bin/env node
'use strict';

var childProcessPromise = require('child-process-promise');

var spawn = (function (cmd, args) {
  var verbose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var promise = childProcessPromise.spawn(cmd, args);
  var childProcess = promise.childProcess;

  if (verbose) {
    childProcess.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    childProcess.stderr.on('data', function (data) {
      console.log(data.toString());
    });
  }

  return promise;
});

module.exports = spawn;
