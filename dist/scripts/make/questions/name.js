"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => _inquirer2.default.prompt([{
  type: 'input',
  name: 'answer',
  message: `What should this template be named? `
}]).then(({
  answer
}) => answer);