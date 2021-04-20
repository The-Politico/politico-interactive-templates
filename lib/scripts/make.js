#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var assign = _interopDefault(require('lodash/assign'));
var fsExtra = require('fs-extra');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var chalk = _interopDefault(require('chalk'));
var cli = _interopDefault(require('cli-progress'));
var inquirer = _interopDefault(require('inquirer'));

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

var name = (function () {
  return inquirer.prompt([{
    type: 'input',
    name: 'answer',
    message: "What do you want to call this template?"
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
});

var name$1 = "@politico/interactive-templates";
var version = "1.3.2";
var description = "Templating engine for generating codebases.";
var main = "dist/index.js";
var module$1 = "dist/module.js";
var bin = {
	pit: "dist/cli.js"
};
var scripts = {
	dev: "nodemon --ignore dist --exec npm run build",
	build: "rollup --config config/rollup.es.js",
	postbuild: "node ./bin/post-build.js",
	test: "nyc mocha $(find src/**/**/test.js -name '*.js') --require \"@babel/register\" --timeout 30000",
	"test-specific": "mocha $(find src/**/**/test.js -name '*.js') --require \"@babel/register\" --timeout 30000 -g",
	posttest: "rmdir test 2>/dev/null ; exit 0;",
	"posttest-specific": "npm run posttest"
};
var devDependencies = {
	"@babel/cli": "^7.1.0",
	"@babel/core": "^7.1.0",
	"@babel/plugin-proposal-class-properties": "^7.5.0",
	"@babel/plugin-transform-runtime": "^7.5.5",
	"@babel/preset-env": "^7.5.5",
	"@babel/preset-react": "^7.10.1",
	"@babel/register": "^7.0.0",
	"@politico/eslint-config-interactives": "^0.0.4",
	"@politico/interactive-bin": "^1.0.0",
	"babel-core": "7.0.0-bridge.0",
	"babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
	"babel-plugin-webpack-alias": "^2.1.2",
	"babel-preset-es2015": "^6.24.1",
	eslint: "^5.14.1",
	"eslint-plugin-mocha": "^5.3.0",
	"expect.js": "^0.3.1",
	"inquirer-test": "^2.0.1",
	mocha: "^5.2.0",
	nodemon: "^1.18.4",
	nyc: "^13.1.0",
	rollup: "^1.17.0",
	"rollup-plugin-alias": "^1.5.2",
	"rollup-plugin-babel": "^4.3.3",
	"rollup-plugin-json": "^4.0.0",
	"rollup-plugin-node-resolve": "^5.2.0",
	yarn: "^1.9.4"
};
var author = "";
var license = "MIT";
var dependencies = {
	"@babel/runtime": "^7.4.2",
	"@octokit/rest": "^17.1.2",
	chalk: "^2.4.2",
	"child-process-promise": "^2.2.1",
	"cli-progress": "^2.1.1",
	ejs: "^2.6.1",
	figlet: "^1.2.1",
	"fs-extra": "^7.0.1",
	glob: "^7.1.4",
	"glob-gitignore": "^1.0.13",
	ignore: "^5.1.2",
	inquirer: "^6.2.2",
	istextorbinary: "^2.5.1",
	lodash: "^4.17.11",
	"npm-api": "^0.4.12",
	"require-from-string": "^2.0.2",
	rimraf: "^2.6.3",
	semver: "^6.2.0",
	yargs: "^13.3.0"
};
var peerDependencies = {
	"@politico/interactive-bin": "*"
};
var repository = {
	type: "git",
	url: "git@github.com:The-Politico/politico-interactive-templates.git"
};
var nyc = {
	include: "src"
};
var meta = {
	name: name$1,
	version: version,
	description: description,
	main: main,
	module: module$1,
	bin: bin,
	scripts: scripts,
	devDependencies: devDependencies,
	author: author,
	license: license,
	dependencies: dependencies,
	peerDependencies: peerDependencies,
	repository: repository,
	nyc: nyc
};

var defaultConfig = {
  version: "^".concat(meta.version),
  name: '',
  renderer: 'ejs',
  category: null,
  prompts: [],
  statics: {},
  ignore: [],
  justCopy: [],
  rename: {},
  dependencies: []
};

/**
 * Creates a default .pitrc file in the current working directory
 * @param {string} [name] - The name of the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when .pitrc is built
 */

function index (_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(name$1) {
    var verbose,
        logger,
        log,
        config,
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
            log("\uD83E\uDDF1 PIT: Making a new template configuration file.");
            _context.next = 6;
            return fsExtra.exists('.pitrc');

          case 6:
            if (!_context.sent) {
              _context.next = 10;
              break;
            }

            log(".pitrc file already exists.", 'error');
            process.exitCode = 1;
            return _context.abrupt("return");

          case 10:
            if (name$1) {
              _context.next = 20;
              break;
            }

            if (!verbose) {
              _context.next = 17;
              break;
            }

            _context.next = 14;
            return name();

          case 14:
            name$1 = _context.sent;
            _context.next = 20;
            break;

          case 17:
            log('Missing first argument: "name"', 'error');
            process.exitCode = 1;
            return _context.abrupt("return");

          case 20:
            config = assign({}, defaultConfig, {
              name: name$1
            });
            _context.next = 23;
            return fsExtra.outputFile('.pitrc', "module.exports = ".concat(JSON.stringify(config, null, 2)));

          case 23:
            if (verbose) {
              log("New .pitrc file created.", 'success');
            }

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

module.exports = index;
