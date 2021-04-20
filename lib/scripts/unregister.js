#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var fs = _interopDefault(require('fs-extra'));
var os = _interopDefault(require('os'));
var path = _interopDefault(require('path'));
var inquirer = _interopDefault(require('inquirer'));
var find = _interopDefault(require('lodash/find'));
var keys = _interopDefault(require('lodash/keys'));

var configFilePath = path.join(os.homedir(), ".pitrc");

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

var outputGlobalConfig = (function (config) {
  return fs.outputJson(configFilePath, config)["catch"](function (e) {
    console.error(e);
  });
});

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
  _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(templates) {
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
  _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(templates) {
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

var search = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(templates) {
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
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(templates) {
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
  return _ref.apply(this, arguments);
}

/**
 * Removes a template from the user's global .pitrc file
 * @param {string} [name] - The name of the template to remove
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when the template is removed
 */

var unregister = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(name) {
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

module.exports = unregister;
