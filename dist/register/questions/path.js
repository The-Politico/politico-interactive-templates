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
  message: `What's the GitHub path? (You can find this by clicking "Clone or download" in the repo page)`
}]).then(({
  answer
}) => answer);