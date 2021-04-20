#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var path = _interopDefault(require('path'));
var chalk = _interopDefault(require('chalk'));
var requireFromString = _interopDefault(require('require-from-string'));
require('@politico/interactive-bin/lib/scripts/env');
var rest = require('@octokit/rest');
require('@babel/runtime/helpers/toConsumableArray');
require('lodash/includes');
require('ignore');
require('lodash/keys');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var cli = _interopDefault(require('cli-progress'));

/*
 * Parses an owner and repo from a GitHub string
 * example The-Politico/template_pit-test
 * example: https://github.com/The-Politico/template_pit-test
 * example: git@github.com:The-Politico/template_pit-test.git
 */
var parseRepoPath = (function (repoPath) {
  var str = repoPath;
  str = str.replace(/git@github\.com:/, '');
  str = str.replace(/https?:\/\/github.com\//, '');
  str = str.replace(/\.git/, '');
  var parts = str.split('/');

  if (parts.length !== 2) {
    throw new Error("Invalid repo path: ".concat(repoPath));
  }

  return {
    owner: parts[0],
    repo: parts[1]
  };
});

var client = new rest.Octokit({
  auth: process.env.GITHUB_TOKEN
});

function toString(_x3) {
  return _toString.apply(this, arguments);
}

function _toString() {
  _toString = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data) {
    var text;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            text = Buffer.from(data.content, data.encoding).toString('utf8');
            return _context2.abrupt("return", text);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _toString.apply(this, arguments);
}

var Logger = function Logger() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Logger);

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

  _defineProperty(this, "log", function (message, type) {
    if (_this.verbose === false) {
      return;
    }

    var color = type === 'error' ? 'red' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'cyan';
    var logFunc = type === 'error' ? console.error : type === 'warning' ? console.warn : console.log;

    if (type) {
      logFunc(chalk[color](type), message);
    } else {
      logFunc(message);
    }
  });

  this.verbose = config.verbose;
  this.bar = new cli.Bar({
    clearOnComplete: true
  }, cli.Presets.shades_classic);
};

var defaultLogger = new Logger();

function getRepoConfig (_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(repoPath) {
    var local,
        logger,
        pitrc,
        pitrcPath,
        owner,
        repo,
        _parseRepoPath,
        fileData,
        _pitrc,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            local = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            logger = new Logger();

            if (!local) {
              _context.next = 15;
              break;
            }

            pitrcPath = path.join(repoPath, '.pitrc');
            _context.prev = 4;
            pitrc = require(pitrcPath);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](4);
            logger.log("File ".concat(chalk.bold(pitrcPath), " could not be loaded."), 'error');
            throw _context.t0;

          case 12:
            return _context.abrupt("return", pitrc);

          case 15:
            if (typeof repoPath === 'string') {
              _parseRepoPath = parseRepoPath(repoPath);
              owner = _parseRepoPath.owner;
              repo = _parseRepoPath.repo;
            } else {
              owner = repoPath.owner;
              repo = repoPath.repo;
            }

            _context.next = 18;
            return client.repos.getContent({
              owner: owner,
              repo: repo,
              path: '.pitrc'
            });

          case 18:
            fileData = _context.sent;
            _context.next = 21;
            return toString(fileData.data);

          case 21:
            _pitrc = _context.sent;
            return _context.abrupt("return", requireFromString(_pitrc));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 8]]);
  }));
  return _ref.apply(this, arguments);
}

function getRepoDependencies(_x) {
  return _getRepoDependencies.apply(this, arguments);
}

function _getRepoDependencies() {
  _getRepoDependencies = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(repoPath) {
    var local,
        depth,
        dependencies,
        repoConfig,
        idx,
        d,
        additions,
        _args2 = arguments;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            local = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
            depth = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 0;
            dependencies = [];
            _context2.next = 5;
            return getRepoConfig(repoPath, local);

          case 5:
            repoConfig = _context2.sent;

            if (!repoConfig.dependencies) {
              _context2.next = 18;
              break;
            }

            idx = 0;

          case 8:
            if (!(idx < repoConfig.dependencies.length)) {
              _context2.next = 18;
              break;
            }

            d = repoConfig.dependencies[idx];
            dependencies.push({
              path: d,
              idx: idx,
              depth: depth
            });
            _context2.next = 13;
            return getRepoDependencies(d, false, depth + 1);

          case 13:
            additions = _context2.sent;
            additions.forEach(function (a) {
              dependencies.push(a);
            });

          case 15:
            idx++;
            _context2.next = 8;
            break;

          case 18:
            return _context2.abrupt("return", dependencies);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getRepoDependencies.apply(this, arguments);
}

var getRepoDependencies$1 = /*#__PURE__*/(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(repoPath) {
    var local,
        dependencies,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            local = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            _context.next = 3;
            return getRepoDependencies(repoPath, local, 0);

          case 3:
            dependencies = _context.sent;
            return _context.abrupt("return", dependencies.sort(function (a, b) {
              if (a.depth === b.depth) {
                return a.idx - b.idx;
              } else {
                return b.depth - a.depth;
              }
            }).map(function (d) {
              return d.path;
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x2) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = getRepoDependencies$1;
