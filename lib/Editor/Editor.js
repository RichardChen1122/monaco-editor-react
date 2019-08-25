'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _Loading = _interopRequireDefault(require('../Loading'));

var _utils = require('../utils');

var _hooks = require('../utils/hooks');

var _config = _interopRequireDefault(require('../config'));

var _styles = _interopRequireDefault(require('./styles'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var Editor = function Editor(_ref) {
  var value = _ref.value,
    language = _ref.language,
    glyphMargin = _ref.glyphMargin,
    editorDidMount = _ref.editorDidMount,
    theme = _ref.theme,
    line = _ref.line,
    width = _ref.width,
    height = _ref.height,
    loading = _ref.loading,
    options = _ref.options;

  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isEditorReady = _useState2[0],
    setIsEditorReady = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isMonacoMounting = _useState4[0],
    setIsMonacoMounting = _useState4[1];

  var editorRef = (0, _react.useRef)();
  var monacoRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  (0, _hooks.useMount)(function(_) {
    _utils.monaco
      .init()
      .then(function(monaco) {
        return (monacoRef.current = monaco) && setIsMonacoMounting(false);
      })
      .catch(function(error) {
        return console.error('An error occurred during initialization of Monaco: ', error);
      });

    return removeEditor;
  });
  (0, _hooks.useUpdate)(
    function(_) {
      editorRef.current.executeEdits('', [
        {
          range: editorRef.current.getModel().getFullModelRange(),
          text: value,
        },
      ]);
      editorRef.current.pushUndoStop();
    },
    [value],
    isEditorReady,
  );
  (0, _hooks.useUpdate)(
    function(_) {
      monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), language);
    },
    [language],
    isEditorReady,
  );
  (0, _hooks.useUpdate)(
    function(_) {
      monacoRef.current.editor.setModelglyphMargin(editorRef.current.getModel(), glyphMargin);
    },
    [glyphMargin],
    isEditorReady,
  );
  (0, _hooks.useUpdate)(
    function(_) {
      editorRef.current.setScrollPosition({
        scrollTop: line,
      });
    },
    [line],
    isEditorReady,
  );
  (0, _hooks.useUpdate)(
    function(_) {
      monacoRef.current.editor.setTheme(theme);
    },
    [theme],
    isEditorReady,
  );
  (0, _hooks.useUpdate)(
    function(_) {
      editorRef.current.updateOptions(options);
    },
    [options],
    isEditorReady,
  );
  var createEditor = (0, _react.useCallback)(
    function(_) {
      editorRef.current = monacoRef.current.editor.create(
        containerRef.current,
        _objectSpread(
          {
            value: value,
            language: language,
            glyphMargin: glyphMargin,
            automaticLayout: true,
          },
          options,
        ),
      );
      editorDidMount(editorRef.current.getValue.bind(editorRef.current), editorRef.current);
      monacoRef.current.editor.defineTheme('dark', _config.default.theme['night-dark']);
      monacoRef.current.editor.setTheme(theme);
      setIsEditorReady(true);
    },
    [editorDidMount, language, options, theme, value, glyphMargin],
  );
  (0, _react.useEffect)(
    function(_) {
      !isMonacoMounting && !isEditorReady && createEditor();
    },
    [isMonacoMounting, isEditorReady, createEditor],
  );

  var removeEditor = function removeEditor(_) {
    return editorRef.current.dispose();
  };

  return _react.default.createElement(
    'section',
    {
      style: _objectSpread({}, _styles.default.wrapper, {
        width: width,
        height: height,
      }),
    },
    !isEditorReady &&
      _react.default.createElement(_Loading.default, {
        content: loading,
      }),
    _react.default.createElement('div', {
      ref: containerRef,
      style: _objectSpread({}, _styles.default.fullWidth, {}, !isEditorReady && _styles.default.hide),
    }),
  );
};

Editor.propTypes = {
  value: _propTypes.default.string,
  language: _propTypes.default.string,
  glyphMargin: _propTypes.default.bool,
  editorDidMount: _propTypes.default.func,
  theme: _propTypes.default.string,
  line: _propTypes.default.number,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  loading: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  options: _propTypes.default.object,
};
Editor.defaultProps = {
  editorDidMount: _utils.noop,
  theme: 'light',
  width: '100%',
  height: '100%',
  loading: 'Loading...',
  options: {},
};
var _default = Editor;
exports.default = _default;
