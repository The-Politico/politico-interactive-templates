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

var _test = require("./test");

Object.defineProperty(exports, "test", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_test).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }