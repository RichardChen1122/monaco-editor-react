'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _ = _interopRequireDefault(require('..'));

var _utils = require('../utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var ControlledEditor = function ControlledEditor(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    onMouseDown = _ref.onMouseDown,
    onKeyDown = _ref.onKeyDown,
    editorDidMount = _ref.editorDidMount,
    glyphMargin = _ref.glyphMargin,
    props = _objectWithoutProperties(_ref, ['value', 'onChange', 'editorDidMount', 'onMouseDown', 'onKeyDown']);

  var handleEditorDidMount = function handleEditorDidMount(getValue, editor) {
    editor.onDidChangeModelContent(function(ev) {
      var currentValue = editor.getValue();
      var value = onChange(ev, currentValue);

      if (typeof value === 'string') {
        if (currentValue !== value) {
          editor.setValue(value);
        }
      }
    });
    editor.onMouseDown(function(ev) {
      var element = ev.target.element;
      if (element.className === 'line-numbers') {
        console.log('MouseDown');
        onMouseDown(ev, editor);
      }
    });

    editor.onKeyDown(function(ev) {
      if (ev.keyCode === 3) {
        onKeyDown(ev);
      }
    });
    editorDidMount(getValue, editor);
  };

  return _react.default.createElement(
    _.default,
    _extends(
      {
        value: value,
        glyphMargin: glyphMargin,
        editorDidMount: handleEditorDidMount,
      },
      props,
    ),
  );
};

ControlledEditor.propTypes = {
  value: _propTypes.default.string,
  glyphMargin: _propTypes.default.bool,
  editorDidMount: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
};
ControlledEditor.defaultProps = {
  editorDidMount: _utils.noop,
  onChange: _utils.noop,
  onMouseDown: _utils.noop,
  onKeyDown: _utils.noop,
};
var _default = ControlledEditor;
exports.default = _default;
