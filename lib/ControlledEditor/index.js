"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _ControlledEditor = _interopRequireDefault(require("./ControlledEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _react.memo)(_ControlledEditor.default);

exports.default = _default;