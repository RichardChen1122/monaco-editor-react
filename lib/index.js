"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DiffEditor", {
  enumerable: true,
  get: function get() {
    return _DiffEditor.default;
  }
});
Object.defineProperty(exports, "ControlledEditor", {
  enumerable: true,
  get: function get() {
    return _ControlledEditor.default;
  }
});
Object.defineProperty(exports, "monaco", {
  enumerable: true,
  get: function get() {
    return _utils.monaco;
  }
});
exports.default = void 0;

var _Editor = _interopRequireDefault(require("./Editor"));

var _DiffEditor = _interopRequireDefault(require("./DiffEditor"));

var _ControlledEditor = _interopRequireDefault(require("./ControlledEditor"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Editor.default;
exports.default = _default;