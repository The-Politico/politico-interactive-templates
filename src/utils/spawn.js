import { spawn } from 'child-process-promise';

export default (cmd, args, verbose = true) => {
  const promise = spawn(cmd, args);

  const childProcess = promise.childProcess;

  if (verbose) {
    childProcess.stdout.on('data', function(data) {
      console.log(data.toString());
    });
    childProcess.stderr.on('data', function(data) {
      console.log(data.toString());
    });
  }

  return promise;
};
