"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _new = require("./new");

Object.defineProperty(exports, "newProject", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_new).default;
  }
});

var _register = require("./register");

Object.defineProperty(exports, "register", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_register).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }