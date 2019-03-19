"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = name => _inquirer2.default.prompt([{
  type: 'confirm',
  name: 'answer',
  message: `You already have a template named ${name} with a different GitHub path. Would you like to override it?`
}]).then(({
  answer
}) => answer);