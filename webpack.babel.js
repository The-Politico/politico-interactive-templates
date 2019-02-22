const path = require('path');

module.exports = {
  resolve: {
    alias: {
      Utils: path.resolve(__dirname, './src/utils'),
      Constants: path.resolve(__dirname, './src/constants'),
    },
  },
};
