"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _DiffEditor = _interopRequireDefault(require("./DiffEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _react.memo)(_DiffEditor.default);

exports.default = _default;