"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _findType = require("../findType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => _inquirer2.default.prompt([{
  type: 'list',
  choices: _findType.list,
  name: 'answer',
  message: `How would you like to find your template?`
}]).then(({
  answer
}) => answer);