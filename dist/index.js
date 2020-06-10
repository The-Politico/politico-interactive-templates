'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var assign = _interopDefault(require('lodash/assign'));
var fs = require('fs-extra');
var fs__default = _interopDefault(fs);
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var chalk = _interopDefault(require('chalk'));
var cli = _interopDefault(require('cli-progress'));
var inquirer = _interopDefault(require('inquirer'));
var path$1 = _interopDefault(require('path'));
var flattenDeep = _interopDefault(require('lodash/flattenDeep'));
var uniqBy = _interopDefault(require('lodash/uniqBy'));
var reverse = _interopDefault(require('lodash/reverse'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var zipObject = _interopDefault(require('lodash/zipObject'));
var keys = _interopDefault(require('lodash/keys'));
var merge = _interopDefault(require('lodash/merge'));
var mergeWith = _interopDefault(require('lodash/mergeWith'));
var os = _interopDefault(require('os'));
var requireFromString = _interopDefault(require('require-from-string'));
require('@politico/interactive-bin/lib/scripts/env');
var { Octokit } = require('@octokit/rest');
var includes = _interopDefault(require('lodash/includes'));
var ignore = _interopDefault(require('ignore'));
var find = _interopDefault(require('lodash/find'));
var ejs$1 = _interopDefault(require('ejs'));
var semver = _interopDefault(require('semver'));
var findIndex = _interopDefault(require('lodash/findIndex'));
var glob = _interopDefault(require('glob'));
var rimraf$1 = _interopDefault(require('rimraf'));

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
var version = "1.3.1";
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
  _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(name$1) {
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
            return fs.exists('.pitrc');

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
            return fs.outputFile('.pitrc', "module.exports = ".concat(JSON.stringify(config, null, 2)));

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

var configFilePath = path$1.join(os.homedir(), ".pitrc");

var getGlobalConfig = (function () {
  return new Promise(function (resolve, reject) {
    fs__default.readJson(configFilePath).then(function (d) {
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

var client = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

var globalIgnores = ['.git', '.pitrc'];

var replaceFilepath = (function (filepath, replace, replaceWith) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var re = new RegExp(replace, 'g');

  if (typeof replaceWith === 'string') {
    return filepath.replace(re, replaceWith);
  } else if (typeof replaceWith === 'function') {
    var renderedReplaceWith = replaceWith(context);
    return filepath.replace(re, renderedReplaceWith);
  } else {
    throw new Error('Invalid filepath replacement type. Must be a string of function.');
  }
});

var renameFile = (function (filepath, config) {
  var renderedFilepath = filepath;
  keys(config.rename).forEach(function (replace) {
    var replaceWith = config.rename[replace];
    renderedFilepath = replaceFilepath(renderedFilepath, replace, replaceWith, config.context);
  });
  return renderedFilepath;
});

var BINARY_EXTENSIONS = ['png', 'jpg', 'tiff', 'wav', 'mp3', 'doc', 'pdf', 'ai'];

function hasBinaryExtension(filename) {
  return BINARY_EXTENSIONS.some(function (ext) {
    return includes(filename, ".".concat(ext));
  });
}

function toFile(_x, _x2) {
  return _toFile.apply(this, arguments);
}

function _toFile() {
  _toFile = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(data, opts) {
    var content, encoding, name, repoFilePath, destination, config, renderer, context, ig, relativePathName, jc, file, renderedFilepath;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = data.content, encoding = data.encoding, name = data.name, repoFilePath = data.path;
            destination = opts.destination, config = opts.config, renderer = opts.renderer, context = opts.context; // Ignore ignored files

            ig = ignore().add(Array.isArray(config.ignore) ? [].concat(_toConsumableArray(globalIgnores), _toConsumableArray(config.ignore)) : globalIgnores);
            relativePathName = repoFilePath[0] === '/' ? repoFilePath.substring(1, repoFilePath.length) : repoFilePath;

            if (!ig.ignores(relativePathName)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", null);

          case 6:
            // Set up justCopy ignored files
            jc = ignore().add(config.justCopy || []);

            if (!hasBinaryExtension(name)) {
              _context.next = 11;
              break;
            }

            file = Buffer.from(content, encoding);
            _context.next = 21;
            break;

          case 11:
            file = Buffer.from(content, encoding).toString('utf8');

            if (jc.ignores(relativePathName)) {
              _context.next = 21;
              break;
            }

            _context.prev = 13;
            file = renderer(file, context);
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](13);
            console.error("There was a problem rendering ".concat(repoFilePath, "."));
            throw _context.t0;

          case 21:
            renderedFilepath = path$1.join(destination, renameFile(repoFilePath, {
              rename: config.rename,
              context: context
            }));
            return _context.abrupt("return", {
              path: renderedFilepath,
              content: file
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[13, 17]]);
  }));
  return _toFile.apply(this, arguments);
}

function toString(_x3) {
  return _toString.apply(this, arguments);
}

function _toString() {
  _toString = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(data) {
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

function getRepoConfig (_x) {
  return _ref$1.apply(this, arguments);
}

function _ref$1() {
  _ref$1 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(repoPath) {
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
            return client.repos.getContents({
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
  return _ref$1.apply(this, arguments);
}

var q = function q(templates) {
  var choices = keys(templates).map(function (k) {
    return {
      name: k,
      value: k
    };
  });
  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a template:'
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
};

function all (_x) {
  return _ref2.apply(this, arguments);
}

function _ref2() {
  _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(templates) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", q(templates));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref2.apply(this, arguments);
}

var mapTemplates = (function (allTemplates) {
  var output = {};
  var other = {};
  keys(allTemplates).forEach(function (key) {
    var template = allTemplates[key];
    var category = template.category;

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
});

var qCategory = function qCategory(choices) {
  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a category:'
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
};

var qTemplate = function qTemplate(choices) {
  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a template:'
  }]).then(function (_ref2) {
    var answer = _ref2.answer;
    return answer;
  });
};

function category (_x) {
  return _ref3.apply(this, arguments);
}

function _ref3() {
  _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(templates) {
    var map, categories, category, templateChoices;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            map = mapTemplates(templates);
            categories = keys(map).map(function (c) {
              return {
                name: c,
                value: c
              };
            });
            _context.next = 4;
            return qCategory(categories);

          case 4:
            category = _context.sent;
            templateChoices = keys(map[category]).map(function (t) {
              return {
                name: t,
                value: t
              };
            });
            return _context.abrupt("return", qTemplate(templateChoices));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref3.apply(this, arguments);
}

var qSearch = function qSearch() {
  return inquirer.prompt([{
    type: 'input',
    name: 'answer',
    message: 'What are you looking for?'
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
};

var qEmpty = function qEmpty(choices) {
  return inquirer.prompt([{
    type: 'confirm',
    name: 'answer',
    "default": true,
    message: 'Looks like you don\'t have any registered templates that match this search. Try something else?'
  }]).then(function (_ref2) {
    var answer = _ref2.answer;
    return answer;
  });
};

var qTemplate$1 = function qTemplate(choices) {
  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a template:'
  }]).then(function (_ref3) {
    var answer = _ref3.answer;
    return answer;
  });
};

var search =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(templates) {
    var phrase, rgx, choices;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return qSearch();

          case 2:
            phrase = _context.sent;
            rgx = new RegExp(phrase, 'i');
            choices = keys(templates).filter(function (t) {
              return t.match(rgx);
            }).map(function (t) {
              return {
                name: t,
                value: t
              };
            });

            if (!(choices.length > 0)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", qTemplate$1(choices));

          case 9:
            _context.next = 11;
            return qEmpty();

          case 11:
            if (!_context.sent) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", search(templates));

          case 15:
            return _context.abrupt("return", null);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function search(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var list = [{
  name: 'Show me template categories',
  value: 'category',
  func: category
}, {
  name: 'Let me search for something',
  value: 'search',
  func: search
}, {
  name: 'Show me all my templates',
  value: 'all',
  func: all
}];
var findType = (function (type, templates) {
  return find(list, {
    value: type
  }, {
    func: function func() {
      return null;
    }
  }).func(templates);
});

var findType$1 = (function () {
  return inquirer.prompt([{
    type: 'list',
    choices: list,
    name: 'answer',
    message: "How would you like to find your template?"
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
});

function promptTemplate (_x) {
  return _ref$2.apply(this, arguments);
}

function _ref$2() {
  _ref$2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(templates) {
    var type;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return findType$1();

          case 2:
            type = _context.sent;
            return _context.abrupt("return", findType(type, templates));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref$2.apply(this, arguments);
}

function getRepoDependencies(_x) {
  return _getRepoDependencies.apply(this, arguments);
}

function _getRepoDependencies() {
  _getRepoDependencies = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(repoPath) {
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

var getRepoDependencies$1 = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(repoPath) {
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

var ejs = (function (str, context, options) {
  return ejs$1.render(str, context, options);
});



var renderMethods = /*#__PURE__*/Object.freeze({
  ejs: ejs
});

var validateTemplateVersion = (function (_ref) {
  var version = _ref.version;
  return version ? semver.satisfies(meta.version, version) : false;
});

function setup (_x) {
  return _ref2$1.apply(this, arguments);
}

function _ref2$1() {
  _ref2$1 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var template, destination, _ref$verbose, verbose, context, _ref$override, override, _ref$validateVersion, validateVersion, globalConfig, templateOptions, templateConfig, renderer, dependencyPaths, repos, dependencies, projectConfig, staticKeys, staticValues, statics;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            template = _ref.template, destination = _ref.destination, _ref$verbose = _ref.verbose, verbose = _ref$verbose === void 0 ? true : _ref$verbose, context = _ref.context, _ref$override = _ref.override, override = _ref$override === void 0 ? {} : _ref$override, _ref$validateVersion = _ref.validateVersion, validateVersion = _ref$validateVersion === void 0 ? true : _ref$validateVersion;
            _context.next = 3;
            return getGlobalConfig();

          case 3:
            globalConfig = _context.sent;

            if (!(!template && !override.config)) {
              _context.next = 14;
              break;
            }

            if (!verbose) {
              _context.next = 13;
              break;
            }

            _context.next = 8;
            return promptTemplate(globalConfig.templates);

          case 8:
            template = _context.sent;

            if (template) {
              _context.next = 11;
              break;
            }

            throw new Error('No template provided.');

          case 11:
            _context.next = 14;
            break;

          case 13:
            throw new Error('No template provided.');

          case 14:
            // Get the template's config
            templateOptions = globalConfig.templates[template];
            _context.t0 = override.config;

            if (_context.t0) {
              _context.next = 20;
              break;
            }

            _context.next = 19;
            return getRepoConfig(templateOptions);

          case 19:
            _context.t0 = _context.sent;

          case 20:
            templateConfig = _context.t0;

            if (validateTemplateVersion(templateConfig)) {
              _context.next = 23;
              break;
            }

            throw new Error("This template requires version: ".concat(chalk.bold(templateConfig.version), ". Version ").concat(chalk.bold(meta.version), " is installed."));

          case 23:
            // Get the tempalate's renderer
            renderer = renderMethods[templateConfig.renderer];

            if (!(renderer === undefined)) {
              _context.next = 26;
              break;
            }

            throw new Error("".concat(templateConfig.renderer, " is an invalid rendering method. Available methods are ").concat(keys(renderMethods).join(', ')));

          case 26:
            _context.t1 = override.dependencies;

            if (_context.t1) {
              _context.next = 31;
              break;
            }

            _context.next = 30;
            return getRepoDependencies$1(templateOptions);

          case 30:
            _context.t1 = _context.sent;

          case 31:
            dependencyPaths = _context.t1;
            _context.next = 34;
            return Promise.all([].concat(_toConsumableArray(dependencyPaths.map(function (repoPath) {
              return parseRepoPath(repoPath);
            })), [templateOptions]));

          case 34:
            repos = _context.sent;
            _context.next = 37;
            return Promise.all(dependencyPaths.map(function (repoPath) {
              return getRepoConfig(repoPath);
            }));

          case 37:
            dependencies = _context.sent;
            projectConfig = mergeWith.apply(void 0, [{}].concat([].concat(_toConsumableArray(dependencies), [templateConfig]), [function (obj, src) {
              if (Array.isArray(obj)) {
                return obj.concat(src);
              }
            }])); // Process template's static values (resolving promises)

            staticKeys = keys(projectConfig.statics);
            _context.next = 42;
            return Promise.all(staticKeys.map(function (k) {
              return typeof projectConfig.statics[k] === 'function' ? Promise.resolve(projectConfig.statics[k]()) : // resolve the function if it returns a promise
              Promise.resolve(projectConfig.statics[k]);
            } // if not a function, pass along the value
            ));

          case 42:
            staticValues = _context.sent;
            statics = zipObject(staticKeys, staticValues); // Set up/prompt for context values

            if (context) {
              _context.next = 48;
              break;
            }

            _context.next = 47;
            return inquirer.prompt(projectConfig.prompts);

          case 47:
            context = _context.sent;

          case 48:
            context = merge({}, context, statics);
            return _context.abrupt("return", {
              templateOptions: templateOptions,
              repos: repos,
              config: projectConfig,
              renderer: renderer,
              context: context
            });

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref2$1.apply(this, arguments);
}

var MAX_SIZE = 1000000;

function downloadFile(_x, _x2) {
  return _downloadFile.apply(this, arguments);
}

function _downloadFile() {
  _downloadFile = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(opts, preData) {
    var owner, repo, repoFilePath, size, sha, fileData;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            owner = opts.owner, repo = opts.repo, repoFilePath = opts.path;
            size = preData.size, sha = preData.sha;

            if (!(size > MAX_SIZE)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return client.gitdata.getBlob({
              owner: owner,
              repo: repo,
              sha: sha
            });

          case 5:
            fileData = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return client.repos.getContents({
              owner: owner,
              repo: repo,
              path: repoFilePath
            });

          case 10:
            fileData = _context.sent;

          case 11:
            if (!fileData) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", toFile(fileData.data, opts));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _downloadFile.apply(this, arguments);
}

function processRepo(_x) {
  return _processRepo.apply(this, arguments);
}

function _processRepo() {
  _processRepo = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(opts) {
    var owner, repo, repoPath, files, output;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (opts) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", []);

          case 2:
            owner = opts.owner, repo = opts.repo;

            if (!(!owner || !repo)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", []);

          case 5:
            repoPath = opts.path || '';
            _context.next = 8;
            return client.repos.getContents({
              owner: owner,
              repo: repo,
              path: repoPath
            });

          case 8:
            files = _context.sent;
            _context.next = 11;
            return Promise.all(files.data.map(function (data) {
              var type = data.type,
                  filePath = data.path;
              var recursedOpts = assign({}, opts, {
                path: filePath
              });

              if (type === 'file') {
                return downloadFile(recursedOpts, data);
              } else {
                return processRepo(recursedOpts);
              }
            }));

          case 11:
            output = _context.sent;
            // filter out nulls caused by ignored files
            output = flattenDeep(output).filter(function (x) {
              return x != null;
            });
            return _context.abrupt("return", output);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _processRepo.apply(this, arguments);
}

function output (_x, _x2) {
  return _ref$3.apply(this, arguments);
}

function _ref$3() {
  _ref$3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(files, verbose) {
    var logger, anyFilesExist, uniqueFiles;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Set up logger
            logger = new Logger({
              verbose: verbose
            });
            _context3.next = 3;
            return Promise.all(files.map(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee(f) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return fs.exists(f.path);

                      case 2:
                        _context.t0 = _context.sent;
                        _context.t1 = f.path;
                        return _context.abrupt("return", {
                          exists: _context.t0,
                          path: _context.t1
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 3:
            _context3.t0 = function (f) {
              return f.exists;
            };

            anyFilesExist = _context3.sent.filter(_context3.t0);

            if (!(anyFilesExist.length > 0)) {
              _context3.next = 7;
              break;
            }

            throw new Error("\"".concat(anyFilesExist[0].path, "\" already exists. Aborting template creation. No files were created."));

          case 7:
            uniqueFiles = [];
            files.forEach(function (f) {
              var fileIdx = findIndex(uniqueFiles, {
                path: f.path
              });

              if (fileIdx >= 0) {
                uniqueFiles.splice(fileIdx, 1);
              }

              uniqueFiles.push(f);
            });
            _context3.next = 11;
            return Promise.all(uniqueFiles.map(
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee2(f) {
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return fs.ensureDir(path$1.dirname(f.path));

                      case 2:
                        _context2.next = 4;
                        return fs.writeFile(f.path, f.content);

                      case 4:
                        logger.log(f.path, 'info');

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _ref$3.apply(this, arguments);
}

var cwd = process.cwd();

/**
 * Creates a new project.
 * @param {string} [template] - The name of the template
 * @param {string} [destination=""] - The directory in which to build the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */

function index$1 (_x, _x2) {
  return _ref$4.apply(this, arguments);
}

function _ref$4() {
  _ref$4 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(template, destination) {
    var verbose,
        defaultContext,
        setupOverride,
        logger,
        log,
        conf,
        _conf,
        repos,
        config,
        renderer,
        context,
        files,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            verbose = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;
            defaultContext = _args.length > 3 ? _args[3] : undefined;
            setupOverride = _args.length > 4 ? _args[4] : undefined;
            // Set up logger
            logger = new Logger({
              verbose: verbose
            });
            log = logger.log;
            log("\uD83E\uDDF1 PIT: Creating a new template in ".concat(chalk.bold(path$1.join(cwd, destination)), "."));
            log("\n[1/3] \u23F3  Loading template configuration...");
            _context.prev = 7;
            _context.next = 10;
            return setup({
              template: template,
              destination: destination,
              verbose: verbose,
              context: defaultContext,
              override: setupOverride
            });

          case 10:
            conf = _context.sent;
            _context.next = 19;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](7);
            log(_context.t0.message, 'error');
            process.exitCode = 1;
            _context.t0.handled = true;
            throw _context.t0;

          case 19:
            _conf = conf, repos = _conf.repos, config = _conf.config, renderer = _conf.renderer, context = _conf.context;
            log("\n[2/3] \u270F\uFE0F  Rendering template...");
            _context.t1 = flattenDeep;
            _context.next = 24;
            return Promise.all(repos.map(function (d) {
              return processRepo(assign({}, d, {
                destination: destination,
                config: config,
                renderer: renderer,
                context: context
              }));
            }));

          case 24:
            _context.t2 = _context.sent;
            files = (0, _context.t1)(_context.t2);
            files = uniqBy(reverse(files), 'path');
            log("\n[3/3] \uD83D\uDCBE  Saving files...");
            _context.prev = 28;
            _context.next = 31;
            return output(files, verbose);

          case 31:
            _context.next = 39;
            break;

          case 33:
            _context.prev = 33;
            _context.t3 = _context["catch"](28);
            log(_context.t3.message, 'error');
            process.exitCode = 1;
            _context.t3.handled = true;
            throw _context.t3;

          case 39:
            log('');
            log("New ".concat(chalk.bold(config.name), " saved to ").concat(chalk.bold(path$1.join(cwd, destination)), "."), 'success');

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 13], [28, 33]]);
  }));
  return _ref$4.apply(this, arguments);
}

var outputGlobalConfig = (function (config) {
  return fs__default.outputJson(configFilePath, config)["catch"](function (e) {
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

var register =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(githubPath) {
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

/**
 * Removes a template from the user's global .pitrc file
 * @param {string} [name] - The name of the template to remove
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when the template is removed
 */

var unregister =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(name) {
    var verbose,
        globalConfig,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            verbose = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
            _context.next = 3;
            return getGlobalConfig();

          case 3:
            globalConfig = _context.sent;

            if (name) {
              _context.next = 14;
              break;
            }

            if (!verbose) {
              _context.next = 13;
              break;
            }

            _context.next = 8;
            return promptTemplate(globalConfig.templates);

          case 8:
            name = _context.sent;

            if (name) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", false);

          case 11:
            _context.next = 14;
            break;

          case 13:
            return _context.abrupt("return", false);

          case 14:
            if (!(name in globalConfig.templates)) {
              _context.next = 21;
              break;
            }

            delete globalConfig.templates[name];
            _context.next = 18;
            return outputGlobalConfig(globalConfig);

          case 18:
            if (verbose) {
              console.log("Success! Your template, \"".concat(name, "\", has been unregistered."));
            }

            _context.next = 22;
            break;

          case 21:
            if (verbose) {
              console.log("You don't have a template with the name \"".concat(name, ".\""));
            }

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function unregister(_x) {
    return _ref.apply(this, arguments);
  };
}();

var rimraf = (function (path) {
  return new Promise(function (resolve, reject) {
    rimraf$1(path, function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
});

/**
 * Tests a tempalte directory
 * @param {Object} [context] - Data to pass for the test
 * @param {string} [templateDirectory=".tmp.pit"] - The directory containing template files
 * @param {string} [outputDirectory=""] - The directory in which to save the new template
 * @param {boolean} [cleanup=true] - Whether to delete the output files after the test completes
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */

function index$2 (_x) {
  return _ref$5.apply(this, arguments);
}

function _ref$5() {
  _ref$5 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(baseContext) {
    var templateDirectory,
        outputDirectory,
        cleanup,
        verbose,
        logger,
        log,
        absoluteTemplateDir,
        templateConfig,
        conf,
        setupOverride,
        _conf,
        repos,
        renderer,
        context,
        config,
        dependencyFiles,
        localFiles,
        files,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            templateDirectory = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
            outputDirectory = _args.length > 2 && _args[2] !== undefined ? _args[2] : '.tmp.pit';
            cleanup = _args.length > 3 && _args[3] !== undefined ? _args[3] : true;
            verbose = _args.length > 4 && _args[4] !== undefined ? _args[4] : true;
            // Set up logger
            logger = new Logger({
              verbose: verbose
            });
            log = logger.log;
            absoluteTemplateDir = path$1.join(cwd, templateDirectory);
            log("\uD83E\uDDF1 PIT: Testing your template in ".concat(chalk.bold(absoluteTemplateDir), "."));
            log("\n[1/5] \u23F3  Loading your local template configuration...");
            _context.next = 11;
            return getRepoConfig(absoluteTemplateDir, true);

          case 11:
            templateConfig = _context.sent;
            _context.prev = 12;
            _context.t0 = templateConfig;
            _context.next = 16;
            return getRepoDependencies$1(absoluteTemplateDir, true);

          case 16:
            _context.t1 = _context.sent;
            setupOverride = {
              config: _context.t0,
              dependencies: _context.t1
            };
            _context.next = 20;
            return setup({
              template: '',
              destination: outputDirectory,
              verbose: verbose,
              context: baseContext,
              override: setupOverride,
              validateVersion: false
            });

          case 20:
            conf = _context.sent;
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t2 = _context["catch"](12);
            throw _context.t2;

          case 26:
            _conf = conf, repos = _conf.repos, renderer = _conf.renderer, context = _conf.context, config = _conf.config;
            log("\n[2/5] \u270F\uFE0F  Rendering template dependencies...");
            _context.next = 30;
            return Promise.all(repos.map(function (d) {
              return processRepo(assign({}, d, {
                destination: outputDirectory,
                config: config,
                renderer: renderer,
                context: context
              }));
            }));

          case 30:
            dependencyFiles = _context.sent;
            log("\n[3/5] \u270F\uFE0F  Rendering local template...");
            _context.next = 34;
            return processLocalRepo(absoluteTemplateDir, {
              destination: outputDirectory,
              config: config,
              renderer: renderer,
              context: context
            });

          case 34:
            localFiles = _context.sent;
            files = flattenDeep([].concat(_toConsumableArray(dependencyFiles), [localFiles]));
            log("\n[4/5] \uD83D\uDCBE  Saving files...");
            _context.next = 39;
            return output(files, verbose);

          case 39:
            if (!cleanup) {
              _context.next = 45;
              break;
            }

            log("\n[5/5] \uD83D\uDDD1\uFE0F  Cleaning up test files...");
            _context.next = 43;
            return rimraf(outputDirectory);

          case 43:
            _context.next = 46;
            break;

          case 45:
            log("\n[5/5] \uD83D\uDDD1\uFE0F  Skipping cleanup...");

          case 46:
            if (verbose) {
              console.log();
            }

            log('');
            log('Test complete. Looks like your template is good to go!', 'success');

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 23]]);
  }));
  return _ref$5.apply(this, arguments);
}

function processLocalRepo(_x2, _x3) {
  return _processLocalRepo.apply(this, arguments);
}

function _processLocalRepo() {
  _processLocalRepo = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(dir, opts) {
    var files, filesData;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            files = glob.sync(path$1.join(dir, '**'), {
              dot: true
            });
            _context3.next = 3;
            return Promise.all(files.map(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee2(f) {
                var data;
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return fs.lstat(f);

                      case 2:
                        if (!_context2.sent.isFile()) {
                          _context2.next = 12;
                          break;
                        }

                        _context2.next = 5;
                        return fs.readFile(f);

                      case 5:
                        _context2.t0 = _context2.sent;
                        _context2.t1 = path$1.basename(f);
                        _context2.t2 = f.split(dir)[1];
                        data = {
                          content: _context2.t0,
                          encoding: 'base64',
                          name: _context2.t1,
                          path: _context2.t2
                        };
                        return _context2.abrupt("return", toFile(data, opts));

                      case 12:
                        return _context2.abrupt("return", null);

                      case 13:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 3:
            filesData = _context3.sent;
            return _context3.abrupt("return", filesData.filter(function (f) {
              return f;
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _processLocalRepo.apply(this, arguments);
}

var https = require('https');

function getLatestNonBetaVersion (name) {
  return new Promise(function (resolve, reject) {
    https.get("https://registry.npmjs.org/".concat(name), function (resp) {
      resp.setEncoding('utf8');
      var body = '';
      resp.on('data', function (data) {
        body += data;
      });
      resp.on('end', function () {
        var data = JSON.parse(body);
        var versions = Object.keys(data.versions).reverse();
        var latestNonBetaVersion = data['dist-tags'].latest;
        versions.some(function (v) {
          if (v.indexOf('beta') === -1 && v.indexOf('alpha') === -1) {
            latestNonBetaVersion = v;
            return true;
          }

          return false;
        });
        resolve(latestNonBetaVersion);
      });
    });
  });
}

function generateHash (length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';

  for (var i = length; i > 0; --i) {
    result += mask[Math.floor(Math.random() * mask.length)];
  }

  return result;
}

exports.downloadFile = downloadFile;
exports.generateHash = generateHash;
exports.getGlobalConfig = getGlobalConfig;
exports.getLatestNonBetaVersion = getLatestNonBetaVersion;
exports.getRepoConfig = getRepoConfig;
exports.git = client;
exports.make = index;
exports.newProject = index$1;
exports.outputGlobalConfig = outputGlobalConfig;
exports.register = register;
exports.test = index$2;
exports.unregister = unregister;
