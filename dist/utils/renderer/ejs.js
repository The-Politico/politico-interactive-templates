"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ejs = require("ejs");

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (str, context, options) => {
  return _ejs2.default.render(str, context, options);
};