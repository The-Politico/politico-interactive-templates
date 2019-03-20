"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (templates) {
  const type = await q.findType();
  return (0, _findType2.default)(type, templates);
};

var _questions = require("./questions");

var q = _interopRequireWildcard(_questions);

var _findType = require("./findType");

var _findType2 = _interopRequireDefault(_findType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }