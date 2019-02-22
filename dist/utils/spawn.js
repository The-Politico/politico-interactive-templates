"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childProcessPromise = require("child-process-promise");

exports.default = (cmd, args, verbose = true) => {
  const promise = (0, _childProcessPromise.spawn)(cmd, args);
  const childProcess = promise.childProcess;

  if (verbose) {
    childProcess.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    childProcess.stderr.on('data', function (data) {
      console.log(data.toString());
    });
  }

  return promise;
};