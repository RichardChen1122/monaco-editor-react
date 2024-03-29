"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var useUpdate = function useUpdate(effect, deps) {
  var applyChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var isInitialMount = (0, _react.useRef)(true);
  (0, _react.useEffect)(isInitialMount.current || !applyChanges ? function (_) {
    isInitialMount.current = false;
  } : effect, deps);
};

var _default = useUpdate;
exports.default = _default;