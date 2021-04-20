#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var path = _interopDefault(require('path'));
var fsExtra = require('fs-extra');

function fileExists (_x, _x2) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(fp, dir) {
    var fullPath;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fullPath = path.join(dir, fp);
            _context.next = 3;
            return fsExtra.exists(fullPath);

          case 3:
            _context.t0 = _context.sent;

            if (!_context.t0) {
              _context.next = 6;
              break;
            }

            _context.t0 = !fsExtra.lstatSync(fullPath).isDirectory();

          case 6:
            if (!_context.t0) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", true);

          case 10:
            return _context.abrupt("return", false);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

module.exports = fileExists;
