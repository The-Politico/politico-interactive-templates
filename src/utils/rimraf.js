import rimraf from 'rimraf';

export default path => {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) { reject(err); };
      resolve();
    });
  });
};
