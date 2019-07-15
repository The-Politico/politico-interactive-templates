"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = exports.Logger = undefined;

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _cliProgress = require("cli-progress");

var _cliProgress2 = _interopRequireDefault(_cliProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Logger {
  constructor(config = {}) {
    _defineProperty(this, "progress", {
      start: function (totalValue, startValue) {
        if (this.verbose === false) {
          return;
        }

        this.bar.start(totalValue, startValue);
      }.bind(this),
      update: function () {
        if (this.verbose === false) {
          return;
        }

        this.bar.update(arguments);
      }.bind(this),
      increment: function (amount) {
        if (this.verbose === false) {
          return;
        }

        this.bar.increment(amount);
      }.bind(this),
      stop: function () {
        if (this.verbose === false) {
          return;
        }

        this.bar.stop();
      }.bind(this)
    });

    _defineProperty(this, "log", (message, type) => {
      if (this.verbose === false) {
        return;
      }

      const color = type === 'error' ? 'red' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'cyan';
      const logFunc = type === 'error' ? console.error : type === 'warning' ? console.warn : console.log;

      if (type) {
        logFunc(_chalk2.default[color](type), message);
      } else {
        logFunc(message);
      }
    });

    this.verbose = config.verbose;
    this.bar = new _cliProgress2.default.Bar({
      clearOnComplete: true
    }, _cliProgress2.default.Presets.shades_classic);
  }

}

const defaultLogger = new Logger();
const log = defaultLogger.log;
exports.Logger = Logger;
exports.log = log;