"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = allTemplates => {
  const output = {};
  const other = {};
  (0, _keys2.default)(allTemplates).forEach(key => {
    const template = allTemplates[key];
    const {
      category
    } = template;

    if (category && category !== 'All' && category !== 'Other') {
      if (!(category in output)) {
        output[category] = {};
      }

      output[category][key] = template;
    } else {
      other[key] = template;
    }
  });
  output.Other = other;
  return output;
};