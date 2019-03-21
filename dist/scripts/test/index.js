"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _new = require("../new");

var _rimraf = require("../../utils/rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const test = async function (templateDirectory = '', outputDirectory = '.tmp.pit', cleanup = true) {
  try {
    require(_path2.default.join(templateDirectory, '.pitrc'));
  } catch (err) {
    console.error(`Looks like there's something wrong with your ".pitrc" file`);
    throw err;
  }

  (0, _new.build)(null, templateDirectory, outputDirectory);

  if (cleanup) {
    (0, _rimraf2.default)(outputDirectory);
  }
};

exports.default = test;