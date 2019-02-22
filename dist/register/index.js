"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getConfig = require("../utils/getConfig");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _outputConfig = require("../utils/outputConfig");

var _outputConfig2 = _interopRequireDefault(_outputConfig);

var _questions = require("./questions");

var q = _interopRequireWildcard(_questions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const register = async function (name, path, verbose = true) {
  if (!name) {
    name = await q.name();
  }

  if (!path) {
    path = await q.path();
  }

  const globalConfig = await (0, _getConfig2.default)();

  if (name in globalConfig.templates) {
    throw new Error('This template name has already been registered.');
  }

  globalConfig.templates[name] = {
    path
  };
  (0, _outputConfig2.default)(globalConfig);
};

exports.default = register;