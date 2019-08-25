"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "monaco", {
  enumerable: true,
  get: function get() {
    return _monaco.default;
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function get() {
    return _noop.default;
  }
});

var _monaco = _interopRequireDefault(require("./monaco"));

var _noop = _interopRequireDefault(require("./noop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }