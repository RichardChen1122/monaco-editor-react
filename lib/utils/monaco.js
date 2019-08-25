"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Monaco =
/*#__PURE__*/
function () {
  function Monaco() {
    var _this = this;

    _classCallCheck(this, Monaco);

    _defineProperty(this, "handleMainScriptLoad", function (_) {
      document.removeEventListener('monaco_init', _this.handleMainScriptLoad);

      _this.resolve(window.monaco);
    });

    _defineProperty(this, "isInitialized", false);

    _defineProperty(this, "wrapperPromise", new Promise(function (res, rej) {
      _this.resolve = res;
      _this.reject = rej;
    }));
  }

  _createClass(Monaco, [{
    key: "injectScripts",
    value: function injectScripts(script) {
      document.body.appendChild(script);
    }
  }, {
    key: "createScript",
    value: function createScript(src) {
      var script = document.createElement('script');
      return src && (script.src = src), script;
    }
  }, {
    key: "createMonacoLoaderScript",
    value: function createMonacoLoaderScript(mainScript) {
      var _this2 = this;

      var loaderScript = this.createScript(_config.default.urls.monacoLoader);

      loaderScript.onload = function (_) {
        return _this2.injectScripts(mainScript);
      };

      loaderScript.onerror = this.reject;
      return loaderScript;
    }
  }, {
    key: "createMainScript",
    value: function createMainScript() {
      var mainScript = this.createScript();
      mainScript.innerHTML = "\n      require.config({ paths: { 'vs': '".concat(_config.default.urls.monacoBase, "' } });\n      require(['vs/editor/editor.main'], function() {\n        document.dispatchEvent(new Event('monaco_init'));\n      });\n    ");
      mainScript.onerror = this.reject;
      return mainScript;
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.isInitialized) {
        if (window.monaco && window.monaco.editor) {
          return new Promise(function (res, rej) {
            return res(window.monaco);
          });
        }

        document.addEventListener('monaco_init', this.handleMainScriptLoad);
        var mainScript = this.createMainScript();
        var loaderScript = this.createMonacoLoaderScript(mainScript);
        this.injectScripts(loaderScript);
      }

      this.isInitialized = true;
      return this.wrapperPromise;
    }
  }]);

  return Monaco;
}();

var _default = new Monaco();

exports.default = _default;