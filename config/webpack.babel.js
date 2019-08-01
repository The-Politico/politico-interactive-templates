const path = require('path');

module.exports = {
  resolve: {
    alias: {
      Root: path.resolve(__dirname, '..'),
      Utils: path.resolve(__dirname, '../src/utils'),
      Constants: path.resolve(__dirname, '../src/constants'),
      Scripts: path.resolve(__dirname, '../src/scripts'),
      Meta: path.resolve(__dirname, '../package.json'),
    },
  },
};
