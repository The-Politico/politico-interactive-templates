#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var fs = _interopDefault(require('fs-extra'));
var os = _interopDefault(require('os'));
var path$1 = _interopDefault(require('path'));
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
var inquirer = _interopDefault(require('inquirer'));

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

var configFilePath = path$1.join(os.homedir(), ".pitrc");

var getGlobalConfig = (function () {
  return new Promise(function (resolve, reject) {
    fs.readJson(configFilePath).then(function (d) {
      resolve(d);
    })["catch"](function (e) {
      if (e.message.endsWith('Unexpected end of JSON input')) {
        resolve({});
      } else if (e.message.startsWith('ENOENT: no such file or directory')) {
        resolve({});
      } else {
        reject(e);
      }
    });
  });
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

            pitrcPath = path$1.join(repoPath, '.pitrc');
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

var outputGlobalConfig = (function (config) {
  return fs.outputJson(configFilePath, config)["catch"](function (e) {
    console.error(e);
  });
});

var path = (function () {
  return inquirer.prompt([{
    type: 'input',
    name: 'answer',
    message: "What's the GitHub path? (You can find this by clicking \"Clone or download\" in the repo page)"
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
});

var override = (function (name) {
  return inquirer.prompt([{
    type: 'confirm',
    name: 'answer',
    message: "You already have a template named \"".concat(name, "\". Would you like to override it?")
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
});

/**
 * Registers a template in the user's global .pitrc file
 * @param {string} [githubPath] - The path to a repo
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @param {string} [tmpName] - The name of the directory to temporarily create in order to complete registration (mostly used for testing)
 * @return {Promise} Resolves when the template is registered
 */

var register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(githubPath) {
    var verbose,
        logger,
        log,
        globalConfig,
        repoInfo,
        pitrc,
        name,
        category,
        confirmOverride,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            verbose = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
            // Set up logger
            logger = new Logger({
              verbose: verbose
            });
            log = logger.log;
            log("\uD83E\uDDF1 PIT: Registering a new template."); // Check for required args

            if (githubPath) {
              _context.next = 13;
              break;
            }

            if (!verbose) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return path();

          case 9:
            githubPath = _context.sent;
            _context.next = 13;
            break;

          case 12:
            throw new Error('Missing first argument: "githubPath"');

          case 13:
            _context.next = 15;
            return getGlobalConfig();

          case 15:
            globalConfig = _context.sent;

            if (globalConfig === undefined) {
              globalConfig = {};
            }

            if (!('templates' in globalConfig)) {
              globalConfig.templates = {};
            } // Get the name/category from the repo's config


            repoInfo = parseRepoPath(githubPath);
            _context.next = 21;
            return getRepoConfig(repoInfo);

          case 21:
            pitrc = _context.sent;
            name = pitrc.name ? pitrc.name : null;
            category = pitrc.category ? pitrc.category : null;

            if (!(name in globalConfig.templates)) {
              _context.next = 34;
              break;
            }

            if (!verbose) {
              _context.next = 33;
              break;
            }

            _context.next = 28;
            return override(name);

          case 28:
            confirmOverride = _context.sent;

            if (confirmOverride) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return");

          case 31:
            _context.next = 34;
            break;

          case 33:
            return _context.abrupt("return");

          case 34:
            globalConfig.templates[name] = {
              owner: repoInfo.owner,
              repo: repoInfo.repo,
              category: category
            };
            _context.next = 37;
            return outputGlobalConfig(globalConfig);

          case 37:
            log("Your template, ".concat(name, ", has been registered. Run \"pit new\" to generate a new project."), 'success');

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = register;
