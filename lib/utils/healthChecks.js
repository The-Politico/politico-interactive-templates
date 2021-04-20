#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var semver = _interopDefault(require('semver'));
var chalk = _interopDefault(require('chalk'));

var name = "@politico/interactive-templates";
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
	name: name,
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

var https = require('https');

function getLastNonBetaVersion (name) {
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

function healthChecks () {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var latest, inGoodHealth;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getLastNonBetaVersion('@politico/interactive-templates');

          case 2:
            latest = _context.sent;
            inGoodHealth = true;

            if (semver.lt(meta.version, latest)) {
              console.log(chalk.yellow("\nIt looks like your version of PIT is out of date.\nYou should run \"npm install -g @politico/interactive-templates\" to update to version ".concat(chalk.bold(latest), ".\n")));
              inGoodHealth = false;
            }

            return _context.abrupt("return", inGoodHealth);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

module.exports = healthChecks;
