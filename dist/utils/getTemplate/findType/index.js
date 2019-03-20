"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = undefined;

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _all = require("./all.js");

var _all2 = _interopRequireDefault(_all);

var _category = require("./category.js");

var _category2 = _interopRequireDefault(_category);

var _search = require("./search.js");

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const list = exports.list = [{
  name: 'Show me template categories',
  value: 'category',
  func: _category2.default
}, {
  name: 'Let me search for something',
  value: 'search',
  func: _search2.default
}, {
  name: 'Show me all my templates',
  value: 'all',
  func: _all2.default
}];

exports.default = (type, templates) => {
  return (0, _find2.default)(list, {
    value: type
  }, {
    func: () => null
  }).func(templates);
};