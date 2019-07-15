"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _configFile = require("../constants/configFile");

var _configFile2 = _interopRequireDefault(_configFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
  return new Promise((resolve, reject) => {
    _fsExtra2.default.readJson(_configFile2.default).then(d => {
      resolve(d);
    }).catch(e => {
      if (e.message.endsWith('Unexpected end of JSON input')) {
        resolve({});
      } else if (e.message.startsWith('ENOENT: no such file or directory')) {
        resolve({});
      } else {
        reject(e);
      }
    });
  });
};