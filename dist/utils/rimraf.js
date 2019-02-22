"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = path => {
  return new Promise((resolve, reject) => {
    (0, _rimraf2.default)(path, err => {
      if (err) {
        reject(err);
      }

      ;
      resolve();
    });
  });
};