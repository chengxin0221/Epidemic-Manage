(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__07327AD",
    appName: "uni-epidemic",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.4",
    uniRuntimeVersion: "3.6.4",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__07327AD",
      appName: "uni-epidemic",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-epidemic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 10:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 11);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 11:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 12:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 149:
/*!**************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/mixins/before-into-teacherpage.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 12);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 导出一个 mixin 对象
var _default = {
  computed: _objectSpread({},
  (0, _vuex.mapState)('user', ['userInfo'])),

  onShow: function onShow() {
    // 在页面刚展示的时候，判断该用户的用户类型是否能够进入该页面
    if (this.userInfo.userType !== "教师") {
      return uni.switchTab({
        url: '/pages/home/home' });

    }
  },
  methods: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!*******************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/store/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireWildcard(__webpack_require__(/*! vue */ 4));


var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));

var _home = _interopRequireDefault(__webpack_require__(/*! ./modules/home.js */ 17));
var _user = _interopRequireDefault(__webpack_require__(/*! ./modules/user.js */ 18));
var _student = _interopRequireDefault(__webpack_require__(/*! ./modules/student.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} // 导入home页面的vuex模块

_vue.default.use(_vuex.default); //vue的插件机制

// 创建 Store 的实例对象
var store = new _vuex.default.Store({
  // 挂载 store 模块
  modules: {
    home: _home.default,
    user: _user.default,
    student: _student.default } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 17:
/*!**************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/store/modules/home.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: function state() {return {
      // 最新公告
      noticeData: JSON.parse(uni.getStorageSync('noticeData') || '[]'),
      // 上次编辑的资讯内容
      lastEpidemicInfo: JSON.parse(uni.getStorageSync('lastEpidemicInfo') || '{}'),
      // 上次编辑的公告内容
      lastNotice: JSON.parse(uni.getStorageSync('lastNotice') || '{}'),
      // 要编辑的公告内容
      editNotice: JSON.parse(uni.getStorageSync('editNotice') || '{}'),
      // 要编辑的资讯内容
      editEpidemicInfo: JSON.parse(uni.getStorageSync('editEpidemicInfo') || '{}') };},


  // 模块的 mutations 方法
  mutations: {
    // 更新noticeData
    updateNoticeData: function updateNoticeData(state, data) {
      state.noticeData = data;
      // 通过 this.commit() 方法，调用 home 模块下的 saveNoticeDataToStorage 方法，将数据持久化存储到本地
      this.commit('home/saveNoticeDataToStorage');
    },
    // 将noticeData持久化存储到本地
    saveNoticeDataToStorage: function saveNoticeDataToStorage(state) {
      uni.setStorageSync('noticeData', JSON.stringify(state.noticeData));
    },
    // 更新lastEpidemicInfo
    updateLastEpidemicInfo: function updateLastEpidemicInfo(state, data) {
      state.lastEpidemicInfo = data;
      // 通过 this.commit() 方法，调用 home 模块下的 saveLastEpidemicInfo 方法，将数据持久化存储到本地
      this.commit('home/saveLastEpidemicInfo');
    },
    // 将lastEpidemicInfo持久化存储到本地
    saveLastEpidemicInfo: function saveLastEpidemicInfo(state) {
      uni.setStorageSync('lastEpidemicInfo', JSON.stringify(state.lastEpidemicInfo));
    },
    // 更新lastNotice
    updateLastNotice: function updateLastNotice(state, data) {
      state.lastNotice = data;
      // 通过 this.commit() 方法，调用 home 模块下的 saveLastNotice 方法，将数据持久化存储到本地
      this.commit('home/saveLastNotice');
    },
    // 将lastNotice持久化存储到本地
    saveLastNotice: function saveLastNotice(state) {
      uni.setStorageSync('lastNotice', JSON.stringify(state.lastNotice));
    },
    // 更新editNotic
    updateEditNotice: function updateEditNotice(state, data) {
      state.editNotice = data;
      // 通过 this.commit() 方法，调用 home 模块下的 saveEditNoticeToStorage 方法，将数据持久化存储到本地
      this.commit('home/saveEditNoticeToStorage');
    },
    // 将editNotice持久化存储到本地
    saveEditNoticeToStorage: function saveEditNoticeToStorage(state) {
      uni.setStorageSync('editNotice', JSON.stringify(state.editNotice));
    },
    // 更新editEpidemicInfo
    updateEditEpidemicInfo: function updateEditEpidemicInfo(state, data) {
      state.editEpidemicInfo = data;
      // 通过 this.commit() 方法，调用 home 模块下的 saveEditEpidemicInfoToStorage 方法，将数据持久化存储到本地
      this.commit('home/saveEditEpidemicInfoToStorage');
    },
    // 将editEpidemicInfo持久化存储到本地
    saveEditEpidemicInfoToStorage: function saveEditEpidemicInfoToStorage(state) {
      uni.setStorageSync('editEpidemicInfo', JSON.stringify(state.editEpidemicInfo));
    } },


  // 模块的 getters 属性
  getters: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 174:
/*!*************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/subpkg_admin/addEpidemicInfo/some-methods.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 导出一个 mixin 对象
var _default = {
  methods: {
    // 选中的菜单项
    format: function format(e) {var _e$target$dataset =



      e.target.dataset,name = _e$target$dataset.name,value = _e$target$dataset.value;
      if (!name) return;
      // console.log('format', name, value)
      this.editorCtx.format(name, value);
    },
    // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
    onStatusChange: function onStatusChange(e) {
      var formats = e.detail;
      this.formats = formats;
    },
    // 撤销
    undo: function undo() {
      this.editorCtx.undo();
    },
    // 恢复
    redo: function redo() {
      this.editorCtx.redo();
    },
    // 分割线
    insertDivider: function insertDivider() {
      this.editorCtx.insertDivider();
    },
    // 移除样式
    removeFormat: function removeFormat() {
      this.editorCtx.removeFormat();
    },
    // 清空编辑器
    clear: function clear() {
      var that = this;
      uni.showModal({
        title: '清空编辑器',
        content: '确定清空编辑器全部内容吗？',
        cancelText: "取消", // 取消按钮的文字  
        confirmText: "确认", // 确认按钮文字 
        confirmColor: '#F54E40', //确认字体的颜色
        cancelColor: '#000', //取消字体的颜色
        success: function success(res) {
          if (res.confirm) {
            that.editorCtx.clear();
          }
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 175:
/*!************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/mixins/before-into-adminpage.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 12);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 导出一个 mixin 对象
var _default = {
  computed: _objectSpread({},
  (0, _vuex.mapState)('user', ['userInfo'])),

  onShow: function onShow() {
    // 在页面刚展示的时候，判断该用户的用户类型是否能够进入该页面
    if (this.userInfo.userType !== "管理员") {
      return uni.switchTab({
        url: '/pages/home/home' });

    }
  },
  methods: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!**************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/store/modules/user.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: function state() {return {
      // 登录成功之后的 token 字符串
      token: uni.getStorageSync('token') || '',
      // 用户的基本信息
      userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
      // 将要要编辑的用户信息
      userData: JSON.parse(uni.getStorageSync('userData') || '{}') };},


  // 模块的 mutations 方法
  mutations: {
    // 更新 token 字符串
    updateToken: function updateToken(state, token) {
      state.token = token;
      // 通过 this.commit() 方法，调用 user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
      this.commit('user/saveTokenToStorage');
    },

    // 将 token 字符串持久化存储到本地
    saveTokenToStorage: function saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token);
    },

    // 更新用户的基本信息
    updateUserInfo: function updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      // 将 userInfo 对象持久化存储到本地
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo));
    },

    // 更新将要要编辑的用户信息
    updateUserData: function updateUserData(state, userData) {
      state.userData = userData;
      // 将 userInfo 对象持久化存储到本地
      uni.setStorageSync('userData', JSON.stringify(state.userData));
    } },


  // 模块的 getters 属性
  getters: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!*****************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/store/modules/student.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: function state() {return {
      // 将要打开的打卡记录
      // daka: JSON.parse(uni.getStorageSync('daka') || '{}'),
      daka: null };},


  // 模块的 mutations 方法
  mutations: {
    // 更新将要打开的打卡记录
    updateDakaData: function updateDakaData(state, daka) {
      state.daka = daka;
      // 将 daka 对象持久化存储到本地
      // uni.setStorageSync('daka', JSON.stringify(state.daka))
    } },


  // 模块的 getters 属性
  getters: {} };exports.default = _default;

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!***********************************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/node_modules/@escook/request-miniprogram/miniprogram_dist/index.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.$http = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var Request = /*#__PURE__*/function () {
  function Request() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    // 请求的根路径
    this.baseUrl = options.baseUrl || '';
    // 请求的 url 地址
    this.url = options.url || '';
    // 请求方式
    this.method = 'GET';
    // 请求的参数对象
    this.data = null;
    // header 请求头
    this.header = options.header || {};
    this.beforeRequest = null;
    this.afterRequest = null;
  }_createClass(Request, [{ key: "get", value: function get(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'GET';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "post", value: function post(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'POST';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "put", value: function put(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'PUT';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "delete", value: function _delete(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'DELETE';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "_", value: function _()

    {var _this = this;
      // 清空 header 对象
      this.header = {};
      // 请求之前做一些事
      this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this);
      // 发起请求
      return new Promise(function (resolve, reject) {
        var weixin = wx;
        // 适配 uniapp
        if ('undefined' !== typeof uni) {
          weixin = uni;
        }
        weixin.request({
          url: _this.url,
          method: _this.method,
          data: _this.data,
          header: _this.header,
          success: function success(res) {resolve(res);},
          fail: function fail(err) {reject(err);},
          complete: function complete(res) {
            // 请求完成以后做一些事情
            _this.afterRequest && typeof _this.afterRequest === 'function' && _this.afterRequest(res);
          } });

      });
    } }]);return Request;}();


var $http = new Request();exports.$http = $http;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 200:
/*!***********************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/mixins/before-into-teadpage.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 12);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 导出一个 mixin 对象
var _default = {
  computed: _objectSpread({},
  (0, _vuex.mapState)('user', ['userInfo'])),

  onShow: function onShow() {
    // 用于管理员用户不可进入的页面
    if (this.userInfo.userType !== "教师" && this.userInfo.userType !== "管理员") {
      return uni.switchTab({
        url: '/pages/home/home' });

    }
  },
  methods: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 262:
/*!********************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ }),

/***/ 282:
/*!***************************************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/uni-swipe-action/components/uni-swipe-action-item/mpwxs.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var mpMixins = {};
var is_pc = null;








mpMixins = {
  data: function data() {
    return {
      is_show: 'none' };

  },
  watch: {
    show: function show(newVal) {
      this.is_show = this.show;
    } },

  created: function created() {
    this.swipeaction = this.getSwipeAction();
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.is_show = this.show;
  },
  methods: {
    // wxs 中调用
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      if (this.is_show !== e.open) {
        this.is_show = e.open;
      }
    },

    appTouchStart: function appTouchStart(e) {
      if (is_pc) return;var

      clientX =
      e.changedTouches[0].clientX;
      this.clientX = clientX;
      this.timestamp = new Date().getTime();
    },
    appTouchEnd: function appTouchEnd(e, index, item, position) {
      if (is_pc) return;var

      clientX =
      e.changedTouches[0].clientX;
      // fixed by xxxx 模拟点击事件，解决 ios 13 点击区域错位的问题
      var diff = Math.abs(this.clientX - clientX);
      var time = new Date().getTime() - this.timestamp;
      if (diff < 40 && time < 300) {
        this.$emit('click', {
          content: item,
          index: index,
          position: position });

      }
    },
    onClickForPC: function onClickForPC(index, item, position) {
      if (!is_pc) return;







    } } };var _default =




mpMixins;exports.default = _default;

/***/ }),

/***/ 283:
/*!******************************************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/uni-swipe-action/components/uni-swipe-action-item/bindingx.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var bindIngXMixins = {};var _default =












































































































































































































































































































bindIngXMixins;exports.default = _default;

/***/ }),

/***/ 284:
/*!*****************************************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/uni-swipe-action/components/uni-swipe-action-item/mpother.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var otherMixins = {};var _default =

































































































































































































































































otherMixins;exports.default = _default;

/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 322:
/*!*********************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = b;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //---------------------------------------------------------------------
// uQRCode二维码生成插件 v4.0.6
// 
// uQRCode是一款基于Javascript环境开发的二维码生成插件，适用所有Javascript运行环境的前端应用和Node.js。
// 
// Copyright (c) Sansnn uQRCode All rights reserved.
// 
// Licensed under the Apache License, Version 2.0.
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// github地址：
//   https://github.com/Sansnn/uQRCode
// 
// npm地址：
//   https://www.npmjs.com/package/uqrcodejs
// 
// uni-app插件市场地址：
//   https://ext.dcloud.net.cn/plugin?id=1287
// 
// 复制使用请保留本段注释，感谢支持开源！
// 
//---------------------------------------------------------------------

//---------------------------------------------------------------------
// 当前文件格式为 es，将 bundle 保留为 ES 模块文件，适用于其他打包工具以及支持 <script type=module> 标签的浏览器（别名: esm，module）
// 如需在其他环境使用，请获取环境对应的格式文件
// 格式说明：
// amd - 异步模块定义，适用于 RequireJS 等模块加载器
// cjs - CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
// es - 将 bundle 保留为 ES 模块文件，适用于其他打包工具以及支持 <script type=module> 标签的浏览器（别名: esm，module）
// umd - 通用模块定义，生成的包同时支持 amd、cjs 和 iife 三种格式
//---------------------------------------------------------------------

function o(o) {this.mode = r.MODE_8BIT_BYTE, this.data = o;}function e(o, e) {this.typeNumber = o, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();}o.prototype = { getLength: function getLength(o) {return this.data.length;}, write: function write(o) {for (var e = 0; e < this.data.length; e++) {o.put(this.data.charCodeAt(e), 8);}} }, e.prototype = { addData: function addData(e) {var r = new o(e);this.dataList.push(r), this.dataCache = null;}, isDark: function isDark(o, e) {if (o < 0 || this.moduleCount <= o || e < 0 || this.moduleCount <= e) throw new Error(o + "," + e);return this.modules[o][e];}, getModuleCount: function getModuleCount() {return this.moduleCount;}, make: function make() {if (this.typeNumber < 1) {var o = 1;for (o = 1; o < 40; o++) {for (var e = v.getRSBlocks(o, this.errorCorrectLevel), r = new p(), t = 0, i = 0; i < e.length; i++) {t += e[i].dataCount;}for (i = 0; i < this.dataList.length; i++) {var n = this.dataList[i];r.put(n.mode, 4), r.put(n.getLength(), h.getLengthInBits(n.mode, o)), n.write(r);}if (r.getLengthInBits() <= 8 * t) break;}this.typeNumber = o;}this.makeImpl(!1, this.getBestMaskPattern());}, makeImpl: function makeImpl(o, r) {this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);for (var t = 0; t < this.moduleCount; t++) {this.modules[t] = new Array(this.moduleCount);for (var i = 0; i < this.moduleCount; i++) {this.modules[t][i] = null;}}this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o, r), this.typeNumber >= 7 && this.setupTypeNumber(o), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r);}, setupPositionProbePattern: function setupPositionProbePattern(o, e) {for (var r = -1; r <= 7; r++) {if (!(o + r <= -1 || this.moduleCount <= o + r)) for (var t = -1; t <= 7; t++) {e + t <= -1 || this.moduleCount <= e + t || (this.modules[o + r][e + t] = 0 <= r && r <= 6 && (0 == t || 6 == t) || 0 <= t && t <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= t && t <= 4);}}}, getBestMaskPattern: function getBestMaskPattern() {for (var o = 0, e = 0, r = 0; r < 8; r++) {this.makeImpl(!0, r);var t = h.getLostPoint(this);(0 == r || o > t) && (o = t, e = r);}return e;}, createMovieClip: function createMovieClip(o, e, r) {var t = o.createEmptyMovieClip(e, r);this.make();for (var i = 0; i < this.modules.length; i++) {for (var n = 1 * i, a = 0; a < this.modules[i].length; a++) {var d = 1 * a;this.modules[i][a] && (t.beginFill(0, 100), t.moveTo(d, n), t.lineTo(d + 1, n), t.lineTo(d + 1, n + 1), t.lineTo(d, n + 1), t.endFill());}}return t;}, setupTimingPattern: function setupTimingPattern() {for (var o = 8; o < this.moduleCount - 8; o++) {null == this.modules[o][6] && (this.modules[o][6] = o % 2 == 0);}for (var e = 8; e < this.moduleCount - 8; e++) {null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);}}, setupPositionAdjustPattern: function setupPositionAdjustPattern() {for (var o = h.getPatternPosition(this.typeNumber), e = 0; e < o.length; e++) {for (var r = 0; r < o.length; r++) {var t = o[e],i = o[r];if (null == this.modules[t][i]) for (var n = -2; n <= 2; n++) {for (var a = -2; a <= 2; a++) {this.modules[t + n][i + a] = -2 == n || 2 == n || -2 == a || 2 == a || 0 == n && 0 == a;}}}}}, setupTypeNumber: function setupTypeNumber(o) {for (var e = h.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {var t = !o && 1 == (e >> r & 1);this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = t;}for (r = 0; r < 18; r++) {t = !o && 1 == (e >> r & 1);this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = t;}}, setupTypeInfo: function setupTypeInfo(o, e) {for (var r = this.errorCorrectLevel << 3 | e, t = h.getBCHTypeInfo(r), i = 0; i < 15; i++) {var n = !o && 1 == (t >> i & 1);i < 6 ? this.modules[i][8] = n : i < 8 ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n;}for (i = 0; i < 15; i++) {n = !o && 1 == (t >> i & 1);i < 8 ? this.modules[8][this.moduleCount - i - 1] = n : i < 9 ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n;}this.modules[this.moduleCount - 8][8] = !o;}, mapData: function mapData(o, e) {for (var r = -1, t = this.moduleCount - 1, i = 7, n = 0, a = this.moduleCount - 1; a > 0; a -= 2) {for (6 == a && a--;;) {for (var d = 0; d < 2; d++) {if (null == this.modules[t][a - d]) {var u = !1;n < o.length && (u = 1 == (o[n] >>> i & 1)), h.getMask(e, t, a - d) && (u = !u), this.modules[t][a - d] = u, -1 == --i && (n++, i = 7);}}if ((t += r) < 0 || this.moduleCount <= t) {t -= r, r = -r;break;}}}} }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function (o, r, t) {for (var i = v.getRSBlocks(o, r), n = new p(), a = 0; a < t.length; a++) {var d = t[a];n.put(d.mode, 4), n.put(d.getLength(), h.getLengthInBits(d.mode, o)), d.write(n);}var u = 0;for (a = 0; a < i.length; a++) {u += i[a].dataCount;}if (n.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * u + ")");for (n.getLengthInBits() + 4 <= 8 * u && n.put(0, 4); n.getLengthInBits() % 8 != 0;) {n.putBit(!1);}for (; !(n.getLengthInBits() >= 8 * u || (n.put(e.PAD0, 8), n.getLengthInBits() >= 8 * u));) {n.put(e.PAD1, 8);}return e.createBytes(n, i);}, e.createBytes = function (o, e) {for (var r = 0, t = 0, i = 0, n = new Array(e.length), a = new Array(e.length), d = 0; d < e.length; d++) {var u = e[d].dataCount,s = e[d].totalCount - u;t = Math.max(t, u), i = Math.max(i, s), n[d] = new Array(u);for (var g = 0; g < n[d].length; g++) {n[d][g] = 255 & o.buffer[g + r];}r += u;var l = h.getErrorCorrectPolynomial(s),c = new f(n[d], l.getLength() - 1).mod(l);a[d] = new Array(l.getLength() - 1);for (g = 0; g < a[d].length; g++) {var m = g + c.getLength() - a[d].length;a[d][g] = m >= 0 ? c.get(m) : 0;}}var v = 0;for (g = 0; g < e.length; g++) {v += e[g].totalCount;}var p = new Array(v),C = 0;for (g = 0; g < t; g++) {for (d = 0; d < e.length; d++) {g < n[d].length && (p[C++] = n[d][g]);}}for (g = 0; g < i; g++) {for (d = 0; d < e.length; d++) {g < a[d].length && (p[C++] = a[d][g]);}}return p;};for (var r = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, t = { L: 1, M: 0, Q: 3, H: 2 }, i = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function getBCHTypeInfo(o) {for (var e = o << 10; h.getBCHDigit(e) - h.getBCHDigit(h.G15) >= 0;) {e ^= h.G15 << h.getBCHDigit(e) - h.getBCHDigit(h.G15);}return (o << 10 | e) ^ h.G15_MASK;}, getBCHTypeNumber: function getBCHTypeNumber(o) {for (var e = o << 12; h.getBCHDigit(e) - h.getBCHDigit(h.G18) >= 0;) {e ^= h.G18 << h.getBCHDigit(e) - h.getBCHDigit(h.G18);}return o << 12 | e;}, getBCHDigit: function getBCHDigit(o) {for (var e = 0; 0 != o;) {e++, o >>>= 1;}return e;}, getPatternPosition: function getPatternPosition(o) {return h.PATTERN_POSITION_TABLE[o - 1];}, getMask: function getMask(o, e, r) {switch (o) {case i:return (e + r) % 2 == 0;case n:return e % 2 == 0;case a:return r % 3 == 0;case d:return (e + r) % 3 == 0;case u:return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;case s:return e * r % 2 + e * r % 3 == 0;case g:return (e * r % 2 + e * r % 3) % 2 == 0;case l:return (e * r % 3 + (e + r) % 2) % 2 == 0;default:throw new Error("bad maskPattern:" + o);}}, getErrorCorrectPolynomial: function getErrorCorrectPolynomial(o) {for (var e = new f([1], 0), r = 0; r < o; r++) {e = e.multiply(new f([1, c.gexp(r)], 0));}return e;}, getLengthInBits: function getLengthInBits(o, e) {if (1 <= e && e < 10) switch (o) {case r.MODE_NUMBER:return 10;case r.MODE_ALPHA_NUM:return 9;case r.MODE_8BIT_BYTE:case r.MODE_KANJI:return 8;default:throw new Error("mode:" + o);} else if (e < 27) switch (o) {case r.MODE_NUMBER:return 12;case r.MODE_ALPHA_NUM:return 11;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 10;default:throw new Error("mode:" + o);} else {if (!(e < 41)) throw new Error("type:" + e);switch (o) {case r.MODE_NUMBER:return 14;case r.MODE_ALPHA_NUM:return 13;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 12;default:throw new Error("mode:" + o);}}}, getLostPoint: function getLostPoint(o) {for (var e = o.getModuleCount(), r = 0, t = 0; t < e; t++) {for (var i = 0; i < e; i++) {for (var n = 0, a = o.isDark(t, i), d = -1; d <= 1; d++) {if (!(t + d < 0 || e <= t + d)) for (var u = -1; u <= 1; u++) {i + u < 0 || e <= i + u || 0 == d && 0 == u || a == o.isDark(t + d, i + u) && n++;}}n > 5 && (r += 3 + n - 5);}}for (t = 0; t < e - 1; t++) {for (i = 0; i < e - 1; i++) {var s = 0;o.isDark(t, i) && s++, o.isDark(t + 1, i) && s++, o.isDark(t, i + 1) && s++, o.isDark(t + 1, i + 1) && s++, 0 != s && 4 != s || (r += 3);}}for (t = 0; t < e; t++) {for (i = 0; i < e - 6; i++) {o.isDark(t, i) && !o.isDark(t, i + 1) && o.isDark(t, i + 2) && o.isDark(t, i + 3) && o.isDark(t, i + 4) && !o.isDark(t, i + 5) && o.isDark(t, i + 6) && (r += 40);}}for (i = 0; i < e; i++) {for (t = 0; t < e - 6; t++) {o.isDark(t, i) && !o.isDark(t + 1, i) && o.isDark(t + 2, i) && o.isDark(t + 3, i) && o.isDark(t + 4, i) && !o.isDark(t + 5, i) && o.isDark(t + 6, i) && (r += 40);}}var g = 0;for (i = 0; i < e; i++) {for (t = 0; t < e; t++) {o.isDark(t, i) && g++;}}return r += 10 * (Math.abs(100 * g / e / e - 50) / 5);} }, c = { glog: function glog(o) {if (o < 1) throw new Error("glog(" + o + ")");return c.LOG_TABLE[o];}, gexp: function gexp(o) {for (; o < 0;) {o += 255;}for (; o >= 256;) {o -= 255;}return c.EXP_TABLE[o];}, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }, m = 0; m < 8; m++) {c.EXP_TABLE[m] = 1 << m;}for (m = 8; m < 256; m++) {c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];}for (m = 0; m < 255; m++) {c.LOG_TABLE[c.EXP_TABLE[m]] = m;}function f(o, e) {if (null == o.length) throw new Error(o.length + "/" + e);for (var r = 0; r < o.length && 0 == o[r];) {r++;}this.num = new Array(o.length - r + e);for (var t = 0; t < o.length - r; t++) {this.num[t] = o[t + r];}}function v(o, e) {this.totalCount = o, this.dataCount = e;}function p() {this.buffer = new Array(), this.length = 0;}function C(o) {return o.setFillStyle = o.setFillStyle || function (e) {o.fillStyle = e;}, o.setFontSize = o.setFontSize || function (e) {o.font = "".concat(e, "px");}, o.setTextAlign = o.setTextAlign || function (e) {o.textAlign = e;}, o.setTextBaseline = o.setTextBaseline || function (e) {o.textBaseline = e;}, o.setGlobalAlpha = o.setGlobalAlpha || function (e) {o.globalAlpha = e;}, o.setStrokeStyle = o.setStrokeStyle || function (e) {o.strokeStyle = e;}, o.setShadow = o.setShadow || function (e, r, t, i) {o.shadowOffsetX = e, o.shadowOffsetY = r, o.shadowBlur = t, o.shadowColor = i;}, o.draw = o.draw || function (o, e) {e && e();}, o.clearRect = o.clearRect || function (e, r, t, i) {o.draw(!1);}, o;}function b(o, e) {var _this = this;var r = this.data = "",t = this.size = 200;this.useDynamicSize = !1, this.dynamicSize = t;var i = this.typeNumber = -1;this.errorCorrectLevel = b.errorCorrectLevel.H;var n = this.margin = 0;this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;var a = this.backgroundImageWidth = void 0,d = this.backgroundImageHeight = void 0,u = this.backgroundImageX = void 0,s = this.backgroundImageY = void 0;this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;var g = this.backgroundPadding = 0;this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;var l = this.foregroundImageWidth = void 0,h = this.foregroundImageHeight = void 0,c = this.foregroundImageX = void 0,m = this.foregroundImageY = void 0,f = this.foregroundImagePadding = 0;this.foregroundImageBackgroundColor = "#FFFFFF";var v = this.foregroundImageBorderRadius = 0,p = this.foregroundImageShadowOffsetX = 0,k = this.foregroundImageShadowOffsetY = 0,y = this.foregroundImageShadowBlur = 0;this.foregroundImageShadowColor = "#808080";var w = this.foregroundPadding = 0,I = this.positionProbeBackgroundColor = void 0,B = this.positionProbeForegroundColor = void 0,S = this.separatorColor = void 0,P = this.positionAdjustBackgroundColor = void 0,L = this.positionAdjustForegroundColor = void 0,D = this.timingBackgroundColor = void 0,A = this.timingForegroundColor = void 0,E = this.typeNumberBackgroundColor = void 0,T = this.typeNumberForegroundColor = void 0,N = this.darkBlockColor = void 0;this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];var M = this.canvasContext = void 0;this.loadImage, this.drawReserve = !1, this.isMaked = !1, Object.defineProperties(this, { data: { get: function get() {if ("" === r || void 0 === r) throw console.error("[uQRCode]: data must be set!"), new b.Error("data must be set!");return r;}, set: function set(o) {r = String(o);} }, size: { get: function get() {return t;}, set: function set(o) {t = Number(o);} }, typeNumber: { get: function get() {return i;}, set: function set(o) {i = Number(o);} }, margin: { get: function get() {return n;}, set: function set(o) {n = Number(o);} }, backgroundImageWidth: { get: function get() {return void 0 === a ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a : a;}, set: function set(o) {a = Number(o);} }, backgroundImageHeight: { get: function get() {return void 0 === d ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d : d;}, set: function set(o) {d = Number(o);} }, backgroundImageX: { get: function get() {return void 0 === u ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u : u;}, set: function set(o) {u = Number(o);} }, backgroundImageY: { get: function get() {return void 0 === s ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s : s;}, set: function set(o) {s = Number(o);} }, backgroundPadding: { get: function get() {return g;}, set: function set(o) {g = o > 1 ? 1 : o < 0 ? 0 : o;} }, foregroundImageWidth: { get: function get() {return void 0 === l ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l : l;}, set: function set(o) {l = Number(o);} }, foregroundImageHeight: { get: function get() {return void 0 === h ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h : h;}, set: function set(o) {h = Number(o);} }, foregroundImageX: { get: function get() {return void 0 === c ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c : c;}, set: function set(o) {c = Number(o);} }, foregroundImageY: { get: function get() {return void 0 === m ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m : m;}, set: function set(o) {m = Number(o);} }, foregroundImagePadding: { get: function get() {return this.useDynamicSize ? this.dynamicSize / this.size * f : f;}, set: function set(o) {f = Number(o);} }, foregroundImageBorderRadius: { get: function get() {return this.useDynamicSize ? this.dynamicSize / this.size * v : v;}, set: function set(o) {v = Number(o);} }, foregroundImageShadowOffsetX: { get: function get() {return this.useDynamicSize ? this.dynamicSize / this.size * p : p;}, set: function set(o) {p = Number(o);} }, foregroundImageShadowOffsetY: { get: function get() {return this.useDynamicSize ? this.dynamicSize / this.size * k : k;}, set: function set(o) {k = Number(o);} }, foregroundImageShadowBlur: { get: function get() {return this.useDynamicSize ? this.dynamicSize / this.size * y : y;}, set: function set(o) {y = Number(o);} }, foregroundPadding: { get: function get() {return w;}, set: function set(o) {w = o > 1 ? 1 : o < 0 ? 0 : o;} }, positionProbeBackgroundColor: { get: function get() {return I || this.backgroundColor;}, set: function set(o) {I = o;} }, positionProbeForegroundColor: { get: function get() {return B || this.foregroundColor;}, set: function set(o) {B = o;} }, separatorColor: { get: function get() {return S || this.backgroundColor;}, set: function set(o) {S = o;} }, positionAdjustBackgroundColor: { get: function get() {return P || this.backgroundColor;}, set: function set(o) {P = o;} }, positionAdjustForegroundColor: { get: function get() {return L || this.foregroundColor;}, set: function set(o) {L = o;} }, timingBackgroundColor: { get: function get() {return D || this.backgroundColor;}, set: function set(o) {D = o;} }, timingForegroundColor: { get: function get() {return A || this.foregroundColor;}, set: function set(o) {A = o;} }, typeNumberBackgroundColor: { get: function get() {return E || this.backgroundColor;}, set: function set(o) {E = o;} }, typeNumberForegroundColor: { get: function get() {return T || this.foregroundColor;}, set: function set(o) {T = o;} }, darkBlockColor: { get: function get() {return N || this.foregroundColor;}, set: function set(o) {N = o;} }, canvasContext: { get: function get() {if (void 0 === M) throw console.error("[uQRCode]: use drawCanvas, you need to set the canvasContext!"), new b.Error("use drawCanvas, you need to set the canvasContext!");return M;}, set: function set(o) {M = C(o);} } }), b.plugins.forEach(function (o) {return o(b, _this, !1);}), o && this.setOptions(o), e && (this.canvasContext = C(e));}f.prototype = { get: function get(o) {return this.num[o];}, getLength: function getLength() {return this.num.length;}, multiply: function multiply(o) {for (var e = new Array(this.getLength() + o.getLength() - 1), r = 0; r < this.getLength(); r++) {for (var t = 0; t < o.getLength(); t++) {e[r + t] ^= c.gexp(c.glog(this.get(r)) + c.glog(o.get(t)));}}return new f(e, 0);}, mod: function mod(o) {if (this.getLength() - o.getLength() < 0) return this;for (var e = c.glog(this.get(0)) - c.glog(o.get(0)), r = new Array(this.getLength()), t = 0; t < this.getLength(); t++) {r[t] = this.get(t);}for (t = 0; t < o.getLength(); t++) {r[t] ^= c.gexp(c.glog(o.get(t)) + e);}return new f(r, 0).mod(o);} }, v.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], v.getRSBlocks = function (o, e) {var r = v.getRsBlockTable(o, e);if (null == r) throw new Error("bad rs block @ typeNumber:" + o + "/errorCorrectLevel:" + e);for (var t = r.length / 3, i = new Array(), n = 0; n < t; n++) {for (var a = r[3 * n + 0], d = r[3 * n + 1], u = r[3 * n + 2], s = 0; s < a; s++) {i.push(new v(d, u));}}return i;}, v.getRsBlockTable = function (o, e) {switch (e) {case t.L:return v.RS_BLOCK_TABLE[4 * (o - 1) + 0];case t.M:return v.RS_BLOCK_TABLE[4 * (o - 1) + 1];case t.Q:return v.RS_BLOCK_TABLE[4 * (o - 1) + 2];case t.H:return v.RS_BLOCK_TABLE[4 * (o - 1) + 3];default:return;}}, p.prototype = { get: function get(o) {var e = Math.floor(o / 8);return 1 == (this.buffer[e] >>> 7 - o % 8 & 1);}, put: function put(o, e) {for (var r = 0; r < e; r++) {this.putBit(1 == (o >>> e - r - 1 & 1));}}, getLengthInBits: function getLengthInBits() {return this.length;}, putBit: function putBit(o) {var e = Math.floor(this.length / 8);this.buffer.length <= e && this.buffer.push(0), o && (this.buffer[e] |= 128 >>> this.length % 8), this.length++;} }, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function (o) {this.errMsg = "[uQRCode]: " + o;}, b.plugins = [], b.use = function (o) {"function" == typeof o && b.plugins.push(o);}, b.prototype.loadImage = function (o) {return Promise.resolve(o);}, b.prototype.setOptions = function (o) {var _this2 = this;var e, r, t, i, n, a, d, u, s, g, l, h, c, m, f, v, p, C, b, k, y, w, I, B, S, P, L, D, A, E, T, N, M, z, R, _, O, F, x, H, X, Y, j, W, G, K, Q, U, $, J, q, V, Z, oo, eo, ro;o && (Object.keys(o).forEach(function (e) {_this2[e] = o[e];}), function () {var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;var t;t = r ? o : _objectSpread({}, o);for (var _o in e) {var i = e[_o];null != i && (i.constructor == Object ? t[_o] = this.deepReplace(t[_o], i) : i.constructor != String || i ? t[_o] = i : t[_o] = t[_o]);}}(this, { data: o.data || o.text, size: o.size, useDynamicSize: o.useDynamicSize, typeNumber: o.typeNumber, errorCorrectLevel: o.errorCorrectLevel, margin: o.margin, areaColor: o.areaColor, backgroundColor: o.backgroundColor || (null === (e = o.background) || void 0 === e ? void 0 : e.color), backgroundImageSrc: o.backgroundImageSrc || (null === (r = o.background) || void 0 === r || null === (t = r.image) || void 0 === t ? void 0 : t.src), backgroundImageWidth: o.backgroundImageWidth || (null === (i = o.background) || void 0 === i || null === (n = i.image) || void 0 === n ? void 0 : n.width), backgroundImageHeight: o.backgroundImageHeight || (null === (a = o.background) || void 0 === a || null === (d = a.image) || void 0 === d ? void 0 : d.height), backgroundImageX: o.backgroundImageX || (null === (u = o.background) || void 0 === u || null === (s = u.image) || void 0 === s ? void 0 : s.x), backgroundImageY: o.backgroundImageY || (null === (g = o.background) || void 0 === g || null === (l = g.image) || void 0 === l ? void 0 : l.y), backgroundImageAlpha: o.backgroundImageAlpha || (null === (h = o.background) || void 0 === h || null === (c = h.image) || void 0 === c ? void 0 : c.alpha), backgroundImageBorderRadius: o.backgroundImageBorderRadius || (null === (m = o.background) || void 0 === m || null === (f = m.image) || void 0 === f ? void 0 : f.borderRadius), backgroundPadding: o.backgroundPadding, foregroundColor: o.foregroundColor || (null === (v = o.foreground) || void 0 === v ? void 0 : v.color), foregroundImageSrc: o.foregroundImageSrc || (null === (p = o.foreground) || void 0 === p || null === (C = p.image) || void 0 === C ? void 0 : C.src), foregroundImageWidth: o.foregroundImageWidth || (null === (b = o.foreground) || void 0 === b || null === (k = b.image) || void 0 === k ? void 0 : k.width), foregroundImageHeight: o.foregroundImageHeight || (null === (y = o.foreground) || void 0 === y || null === (w = y.image) || void 0 === w ? void 0 : w.height), foregroundImageX: o.foregroundImageX || (null === (I = o.foreground) || void 0 === I || null === (B = I.image) || void 0 === B ? void 0 : B.x), foregroundImageY: o.foregroundImageY || (null === (S = o.foreground) || void 0 === S || null === (P = S.image) || void 0 === P ? void 0 : P.y), foregroundImagePadding: o.foregroundImagePadding || (null === (L = o.foreground) || void 0 === L || null === (D = L.image) || void 0 === D ? void 0 : D.padding), foregroundImageBackgroundColor: o.foregroundImageBackgroundColor || (null === (A = o.foreground) || void 0 === A || null === (E = A.image) || void 0 === E ? void 0 : E.backgroundColor), foregroundImageBorderRadius: o.foregroundImageBorderRadius || (null === (T = o.foreground) || void 0 === T || null === (N = T.image) || void 0 === N ? void 0 : N.borderRadius), foregroundImageShadowOffsetX: o.foregroundImageShadowOffsetX || (null === (M = o.foreground) || void 0 === M || null === (z = M.image) || void 0 === z ? void 0 : z.shadowOffsetX), foregroundImageShadowOffsetY: o.foregroundImageShadowOffsetY || (null === (R = o.foreground) || void 0 === R || null === (_ = R.image) || void 0 === _ ? void 0 : _.shadowOffsetY), foregroundImageShadowBlur: o.foregroundImageShadowBlur || (null === (O = o.foreground) || void 0 === O || null === (F = O.image) || void 0 === F ? void 0 : F.shadowBlur), foregroundImageShadowColor: o.foregroundImageShadowColor || (null === (x = o.foreground) || void 0 === x || null === (H = x.image) || void 0 === H ? void 0 : H.shadowColor), foregroundPadding: o.foregroundPadding, positionProbeBackgroundColor: o.positionProbeBackgroundColor || (null === (X = o.positionProbe) || void 0 === X ? void 0 : X.backgroundColor) || (null === (Y = o.positionDetection) || void 0 === Y ? void 0 : Y.backgroundColor), positionProbeForegroundColor: o.positionProbeForegroundColor || (null === (j = o.positionProbe) || void 0 === j ? void 0 : j.foregroundColor) || (null === (W = o.positionDetection) || void 0 === W ? void 0 : W.foregroundColor), separatorColor: o.separatorColor || (null === (G = o.separator) || void 0 === G ? void 0 : G.color), positionAdjustBackgroundColor: o.positionAdjustBackgroundColor || (null === (K = o.positionAdjust) || void 0 === K ? void 0 : K.backgroundColor) || (null === (Q = o.alignment) || void 0 === Q ? void 0 : Q.backgroundColor), positionAdjustForegroundColor: o.positionAdjustForegroundColor || (null === (U = o.positionAdjust) || void 0 === U ? void 0 : U.foregroundColor) || (null === ($ = o.alignment) || void 0 === $ ? void 0 : $.foregroundColor), timingBackgroundColor: o.timingBackgroundColor || (null === (J = o.timing) || void 0 === J ? void 0 : J.backgroundColor), timingForegroundColor: o.timingForegroundColor || (null === (q = o.timing) || void 0 === q ? void 0 : q.foregroundColor), typeNumberBackgroundColor: o.typeNumberBackgroundColor || (null === (V = o.typeNumber) || void 0 === V ? void 0 : V.backgroundColor) || (null === (Z = o.versionInformation) || void 0 === Z ? void 0 : Z.backgroundColor), typeNumberForegroundColor: o.typeNumberForegroundColor || (null === (oo = o.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor), darkBlockColor: o.darkBlockColor || (null === (ro = o.darkBlock) || void 0 === ro ? void 0 : ro.color) }, !0));}, b.prototype.make = function () {var o = this.foregroundColor,r = this.backgroundColor,t = this.typeNumber,i = this.errorCorrectLevel,n = this.data,a = this.size,d = this.margin,u = this.useDynamicSize;if (o === r) throw console.error("[uQRCode]: foregroundColor and backgroundColor cannot be the same!"), new b.Error("foregroundColor and backgroundColor cannot be the same!");var s = new e(t, i);s.addData(function (o) {o = o.toString();for (var e, r = "", t = 0; t < o.length; t++) {(e = o.charCodeAt(t)) >= 1 && e <= 127 ? r += o.charAt(t) : e > 2047 ? (r += String.fromCharCode(224 | e >> 12 & 15), r += String.fromCharCode(128 | e >> 6 & 63), r += String.fromCharCode(128 | e >> 0 & 63)) : (r += String.fromCharCode(192 | e >> 6 & 31), r += String.fromCharCode(128 | e >> 0 & 63));}return r;}(n)), s.make(), this.base = s, this.typeNumber = s.typeNumber, this.modules = s.modules, this.moduleCount = s.moduleCount, this.dynamicSize = u ? Math.ceil((a - 2 * d) / s.moduleCount) * s.moduleCount + 2 * d : a, function (o) {var e = o.dynamicSize,r = o.margin,t = o.backgroundColor,i = o.backgroundPadding,n = o.foregroundColor,a = o.foregroundPadding,d = o.modules,u = o.moduleCount,s = (e - 2 * r) / u,g = s,l = 0;i > 0 && (l = g * i / 2, g -= 2 * l);var h = s,c = 0;a > 0 && (c = h * a / 2, h -= 2 * c);for (var m = 0; m < u; m++) {for (var f = 0; f < u; f++) {var v = f * s + r,p = m * s + r;if (d[m][f]) {var C = c,b = v + c,k = p + c,y = h,w = h;d[m][f] = { type: ["foreground"], color: n, isBlack: !0, isDrawn: !1, destX: v, destY: p, destWidth: s, destHeight: s, x: b, y: k, width: y, height: w, paddingTop: C, paddingRight: C, paddingBottom: C, paddingLeft: C };} else C = l, b = v + l, k = p + l, y = g, w = g, d[m][f] = { type: ["background"], color: t, isBlack: !1, isDrawn: !1, destX: v, destY: p, destWidth: s, destHeight: s, x: b, y: k, width: y, height: w, paddingTop: C, paddingRight: C, paddingBottom: C, paddingLeft: C };}}}(this), function (o) {var e = o.modules,r = o.moduleCount,t = o.positionProbeBackgroundColor,i = o.positionProbeForegroundColor,n = r - 7;[[0, 0, 1], [1, 0, 1], [2, 0, 1], [3, 0, 1], [4, 0, 1], [5, 0, 1], [6, 0, 1], [0, 1, 1], [1, 1, 0], [2, 1, 0], [3, 1, 0], [4, 1, 0], [5, 1, 0], [6, 1, 1], [0, 2, 1], [1, 2, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 0], [6, 2, 1], [0, 3, 1], [1, 3, 0], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 3, 0], [6, 3, 1], [0, 4, 1], [1, 4, 0], [2, 4, 1], [3, 4, 1], [4, 4, 1], [5, 4, 0], [6, 4, 1], [0, 5, 1], [1, 5, 0], [2, 5, 0], [3, 5, 0], [4, 5, 0], [5, 5, 0], [6, 5, 1], [0, 6, 1], [1, 6, 1], [2, 6, 1], [3, 6, 1], [4, 6, 1], [5, 6, 1], [6, 6, 1]].forEach(function (o) {var r = e[o[0]][o[1]],a = e[o[0] + n][o[1]],d = e[o[0]][o[1] + n];d.type.push("positionProbe"), a.type.push("positionProbe"), r.type.push("positionProbe"), r.color = 1 == o[2] ? i : t, a.color = 1 == o[2] ? i : t, d.color = 1 == o[2] ? i : t;});}(this), function (o) {var e = o.modules,r = o.moduleCount,t = o.separatorColor;[[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]].forEach(function (o) {var i = e[o[0]][o[1]],n = e[r - o[0] - 1][o[1]],a = e[o[0]][r - o[1] - 1];a.type.push("separator"), n.type.push("separator"), i.type.push("separator"), i.color = t, n.color = t, a.color = t;});}(this), function (o) {var e = o.typeNumber,r = o.modules,t = o.moduleCount,i = o.foregroundColor,n = o.backgroundColor,a = o.positionAdjustForegroundColor,d = o.positionAdjustBackgroundColor,u = o.timingForegroundColor,s = o.timingBackgroundColor;var g = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]][e - 1];if (g) {var _o2 = [[-2, -2, 1], [-1, -2, 1], [0, -2, 1], [1, -2, 1], [2, -2, 1], [-2, -1, 1], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [2, -1, 1], [-2, 0, 1], [-1, 0, 0], [0, 0, 1], [1, 0, 0], [2, 0, 1], [-2, 1, 1], [-1, 1, 0], [0, 1, 0], [1, 1, 0], [2, 1, 1], [-2, 2, 1], [-1, 2, 1], [0, 2, 1], [1, 2, 1], [2, 2, 1]],_e = g.length;for (var _l = 0; _l < _e; _l++) {var _loop = function _loop(_h) {var _x$y = { x: g[_l], y: g[_h] },e = _x$y.x,c = _x$y.y;e < 9 && c < 9 || e > t - 9 - 1 && c < 9 || c > t - 9 - 1 && e < 9 || _o2.forEach(function (o) {var t = r[e + o[0]][c + o[1]];t.type.push("positionAdjust"), t.type.includes("timing") ? 1 == o[2] ? t.color = a == i ? u : a : t.color = a == i && d == n ? s : d : t.color = 1 == o[2] ? a : d;});};for (var _h = 0; _h < _e; _h++) {_loop(_h);}}}}(this), function (o) {var e = o.modules,r = o.moduleCount,t = o.timingForegroundColor,i = o.timingBackgroundColor,n = r - 16;for (var _o3 = 0; _o3 < n; _o3++) {var a = e[6][8 + _o3],d = e[8 + _o3][6];a.type.push("timing"), d.type.push("timing"), a.color = 1 & _o3 ^ 1 ? t : i, d.color = 1 & _o3 ^ 1 ? t : i;}}(this), function (o) {var e = o.modules,r = o.moduleCount,t = o.darkBlockColor;var i = e[r - 7 - 1][8];i.type.push("darkBlock"), i.color = t;}(this), function (o) {var e = o.typeNumber,r = o.modules,t = o.moduleCount,i = o.typeNumberBackgroundColor,n = o.typeNumberForegroundColor;if (e < 7) return r;var a = [0, 0, 0, 0, 0, 0, 0, "000111110010010100", "001000010110111100", "001001101010011001", "001010010011010011", "001011101111110110", "001100011101100010", "001101100001000111", "001110011000001101", "001111100100101000", "010000101101111000", "010001010001011101", "010010101000010111", "010011010100110010", "010100100110100110", "010101011010000011", "010110100011001001", "010111011111101100", "011000111011000100", "011001000111100001", "011010111110101011", "011011000010001110", "011100110000011010", "011101001100111111", "011110110101110101", "011111001001010000", "100000100111010101", "100001011011110000", "100010100010111010", "100011011110011111", "100100101100001011", "100101010000101110", "100110101001100100", "100111010101000001", "101000110001101001"];var d = a[e] + a[e],u = [t - 11, t - 10, t - 9];[[5, u[2]], [5, u[1]], [5, u[0]], [4, u[2]], [4, u[1]], [4, u[0]], [3, u[2]], [3, u[1]], [3, u[0]], [2, u[2]], [2, u[1]], [2, u[0]], [1, u[2]], [1, u[1]], [1, u[0]], [0, u[2]], [0, u[1]], [0, u[0]], [u[2], 5], [u[1], 5], [u[0], 5], [u[2], 4], [u[1], 4], [u[0], 4], [u[2], 3], [u[1], 3], [u[0], 3], [u[2], 2], [u[1], 2], [u[0], 2], [u[2], 1], [u[1], 1], [u[0], 1], [u[2], 0], [u[1], 0], [u[0], 0]].forEach(function (o, e) {var t = r[o[0]][o[1]];t.type.push("typeNumber"), t.color = "1" == d[e] ? n : i;});}(this), this.isMaked = !0, this.drawModules = [];}, b.prototype.getDrawModules = function () {if (this.drawModules && this.drawModules.length > 0) return this.drawModules;var o = this.drawModules = [],e = this.modules,r = this.moduleCount,t = this.dynamicSize,i = this.areaColor,n = this.backgroundImageSrc,a = this.backgroundImageX,d = this.backgroundImageY,u = this.backgroundImageWidth,s = this.backgroundImageHeight,g = this.backgroundImageAlpha,l = this.backgroundImageBorderRadius,h = this.foregroundImageSrc,c = this.foregroundImageX,m = this.foregroundImageY,f = this.foregroundImageWidth,v = this.foregroundImageHeight,p = this.foregroundImagePadding,C = this.foregroundImageBackgroundColor,b = this.foregroundImageBorderRadius,k = this.foregroundImageShadowOffsetX,y = this.foregroundImageShadowOffsetY,w = this.foregroundImageShadowBlur,I = this.foregroundImageShadowColor;i && o.push({ name: "area", type: "area", color: i, x: 0, y: 0, width: t, height: t }), n && o.push({ name: "backgroundImage", type: "image", imageSrc: n, mappingName: "backgroundImageSrc", x: a, y: d, width: u, height: s, alpha: g, borderRadius: l });for (var B = 0; B < r; B++) {for (var S = 0; S < r; S++) {var P = e[B][S];P.isDrawn || (P.type.includes("foreground") ? o.push({ name: "foreground", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }) : o.push({ name: "background", type: "tile", color: P.color, destX: P.destX, destY: P.destY, destWidth: P.destWidth, destHeight: P.destHeight, x: P.x, y: P.y, width: P.width, height: P.height, paddingTop: P.paddingTop, paddingRight: P.paddingRight, paddingBottom: P.paddingBottom, paddingLeft: P.paddingLeft, rowIndex: B, colIndex: S }), P.isDrawn = !0);}}return h && o.push({ name: "foregroundImage", type: "image", imageSrc: h, mappingName: "foregroundImageSrc", x: c, y: m, width: f, height: v, padding: p, backgroundColor: C, borderRadius: b, shadowOffsetX: k, shadowOffsetY: y, shadowBlur: w, shadowColor: I }), o;}, b.prototype.isBlack = function (o, e) {var r = this.moduleCount;return !(0 > o || 0 > e || o >= r || e >= r) && this.modules[o][e].isBlack;}, b.prototype.drawCanvas = function () {var _this3 = this;var o = this.isMaked,e = this.canvasContext,r = this.useDynamicSize,t = this.dynamicSize,i = this.foregroundColor,n = this.foregroundPadding,a = this.backgroundColor,d = this.backgroundPadding,u = this.drawReserve,s = this.margin;if (!o) return console.error("[uQRCode]: please execute the make method first!"), Promise.reject(new b.Error("please execute the make method first!"));var g = this.getDrawModules(),l = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(o, r) {var i, n, a, d, s, l, h, c, m, f, v, p, C, k;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;e.clearRect(0, 0, t, t), e.draw(!1);i = 0;case 3:if (!(i < g.length)) {_context.next = 48;break;}n = g[i];_context.t0 = (e.save(), n.type);_context.next = _context.t0 === "area" ? 8 : _context.t0 === "tile" ? 10 : _context.t0 === "image" ? 13 : 44;break;case 8:e.setFillStyle(n.color), e.fillRect(n.x, n.y, n.width, n.height);return _context.abrupt("break", 44);case 10:a = n.x, d = n.y, s = n.width, l = n.height;e.setFillStyle(n.color), e.fillRect(a, d, s, l);return _context.abrupt("break", 44);case 13:if (!("backgroundImage" === n.name)) {_context.next = 28;break;}a = Math.round(n.x), d = Math.round(n.y), s = Math.round(n.width), l = Math.round(n.height);s < 2 * (c = Math.round(n.borderRadius)) && (c = s / 2), l < 2 * c && (c = l / 2), e.setGlobalAlpha(n.alpha), c > 0 && (e.beginPath(), e.moveTo(a + c, d), e.arcTo(a + s, d, a + s, d + l, c), e.arcTo(a + s, d + l, a, d + l, c), e.arcTo(a, d + l, a, d, c), e.arcTo(a, d, a + s, d, c), e.closePath(), e.setStrokeStyle("rgba(0,0,0,0)"), e.stroke(), e.clip());_context.prev = 16;_context.next = 19;return _this3.loadImage(n.imageSrc);case 19:h = _context.sent;e.drawImage(h, a, d, s, l);_context.next = 26;break;case 23:_context.prev = 23;_context.t1 = _context["catch"](16);throw console.error("[uQRCode]: ".concat(n.mappingName, " invalid!")), new b.Error("".concat(n.mappingName, " invalid!"));case 26:_context.next = 44;break;case 28:if (!("foregroundImage" === n.name)) {_context.next = 44;break;}a = Math.round(n.x), d = Math.round(n.y), s = Math.round(n.width), l = Math.round(n.height);m = Math.round(n.padding);s < 2 * (c = Math.round(n.borderRadius)) && (c = s / 2), l < 2 * c && (c = l / 2);f = a - m, v = d - m, p = s + 2 * m, C = l + 2 * m, k = Math.round(p / s * c);p < 2 * k && (k = p / 2), C < 2 * k && (k = C / 2), e.save(), e.setShadow(n.shadowOffsetX, n.shadowOffsetY, n.shadowBlur, n.shadowColor), k > 0 ? (e.beginPath(), e.moveTo(f + k, v), e.arcTo(f + p, v, f + p, v + C, k), e.arcTo(f + p, v + C, f, v + C, k), e.arcTo(f, v + C, f, v, k), e.arcTo(f, v, f + p, v, k), e.closePath(), e.setFillStyle(n.backgroundColor), e.fill()) : (e.setFillStyle(n.backgroundColor), e.fillRect(f, v, p, C)), e.restore(), e.save(), k > 0 ? (e.beginPath(), e.moveTo(f + k, v), e.arcTo(f + p, v, f + p, v + C, k), e.arcTo(f + p, v + C, f, v + C, k), e.arcTo(f, v + C, f, v, k), e.arcTo(f, v, f + p, v, k), e.closePath(), e.setFillStyle(m > 0 ? n.backgroundColor : "rgba(0,0,0,0)"), e.fill()) : (e.setFillStyle(m > 0 ? n.backgroundColor : "rgba(0,0,0,0)"), e.fillRect(f, v, p, C)), e.restore(), c > 0 && (e.beginPath(), e.moveTo(a + c, d), e.arcTo(a + s, d, a + s, d + l, c), e.arcTo(a + s, d + l, a, d + l, c), e.arcTo(a, d + l, a, d, c), e.arcTo(a, d, a + s, d, c), e.closePath(), e.setStrokeStyle("rgba(0,0,0,0)"), e.stroke(), e.clip());_context.prev = 34;_context.next = 37;return _this3.loadImage(n.imageSrc);case 37:h = _context.sent;e.drawImage(h, a, d, s, l);_context.next = 44;break;case 41:_context.prev = 41;_context.t2 = _context["catch"](34);throw console.error("[uQRCode]: ".concat(n.mappingName, " invalid!")), new b.Error("".concat(n.mappingName, " invalid!"));case 44:u && e.draw(!0), e.restore();case 45:i++;_context.next = 3;break;case 48:e.draw(!0), setTimeout(o, 150);_context.next = 56;break;case 51:_context.prev = 51;_context.t3 = _context["catch"](0);if (_context.t3 instanceof b.Error) {_context.next = 55;break;}throw _context.t3;case 55:r(_context.t3);case 56:case "end":return _context.stop();}}}, _callee, null, [[0, 51], [16, 23], [34, 41]]);}));return function l(_x, _x2) {return _ref.apply(this, arguments);};}();return new Promise(function (o, e) {l(o, e);});}, b.prototype.draw = function () {return this.drawCanvas();}, b.prototype.register = function (o) {o && o(b, this, !0);};

/***/ }),

/***/ 323:
/*!***********************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/Sansnn-uQRCode/common/queue.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queueLoadImage = exports.queueDraw = void 0;function Queue() {
  var waitingQueue = this.waitingQueue = [];
  var isRunning = this.isRunning = false; // 记录是否有未完成的任务

  function execute(task, resolve, reject) {
    task().
    then(function (data) {
      resolve(data);
    }).
    catch(function (e) {
      reject(e);
    }).
    finally(function () {
      // 等待任务队列中如果有任务，则触发它；否则设置isRunning = false,表示无任务状态
      if (waitingQueue.length) {
        var next = waitingQueue.shift();
        execute(next.task, next.resolve, next.reject);
      } else {
        isRunning = false;
      }
    });
  }
  this.exec = function (task) {
    return new Promise(function (resolve, reject) {
      if (isRunning) {
        waitingQueue.push({
          task: task,
          resolve: resolve,
          reject: reject });

      } else {
        isRunning = true;
        execute(task, resolve, reject);
      }
    });
  };
}

/* 队列实例，某些平台一起使用多个组件时需要通过队列逐一绘制，否则部分绘制方法异常，nvue端的iOS gcanvas尤其明显，在不通过队列绘制时会出现图片丢失的情况 */
var queueDraw = new Queue();exports.queueDraw = queueDraw;
var queueLoadImage = new Queue();exports.queueLoadImage = queueLoadImage;

/***/ }),

/***/ 324:
/*!***********************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/Sansnn-uQRCode/common/cache.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.cacheImageList = void 0;var cacheImageList = [];exports.cacheImageList = cacheImageList;

/***/ }),

/***/ 339:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);var _pages = _interopRequireDefault(__webpack_require__(/*! @/pages.json */ 340));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e32) {throw _e32;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e33) {didErr = true;err = _e33;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function n(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var o = s(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},o = s.lib = {},r = o.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = o.WordArray = r.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,o = e.sigBytes;if (this.clamp(), s % 4) for (var r = 0; r < o; r++) {var i = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;t[s + r >>> 2] |= i << 24 - (s + r) % 4 * 8;} else for (r = 0; r < o; r += 4) {t[s + r >>> 2] = n[r >>> 2];}return this.sigBytes += o, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = r.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], o = function o(t) {t = t;var n = 987654321,s = 4294967295;return function () {var o = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return o /= 4294967296, (o += .5) * (e.random() > .5 ? 1 : -1);};}, r = 0; r < t; r += 4) {var a = o(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], o = 0; o < n; o++) {var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;s.push((r >>> 4).toString(16)), s.push((15 & r).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], o = 0; o < n; o++) {var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;s.push(String.fromCharCode(r));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },l = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },h = o.BufferedBlockAlgorithm = r.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,o = n.sigBytes,r = this.blockSize,a = o / (4 * r),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * r,u = e.min(4 * c, o);if (c) {for (var l = 0; l < c; l += r) {this._doProcessBlock(s, l);}var h = s.splice(0, c);n.sigBytes -= u;}return new i.init(h, u);}, clone: function clone() {var e = r.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 });o.Hasher = h.extend({ cfg: r.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {h.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} });var d = s.algo = {};return s;}(Math), n);}),r = (s(function (e, t) {var n;e.exports = (n = o, function (e) {var t = n,s = t.lib,o = s.WordArray,r = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = r.extend({ _doReset: function _doReset() {this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,o = e[s];e[s] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);}var r = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],g = e[t + 3],p = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],k = e[t + 9],v = e[t + 10],T = e[t + 11],S = e[t + 12],P = e[t + 13],A = e[t + 14],I = e[t + 15],b = r[0],O = r[1],C = r[2],E = r[3];b = u(b, O, C, E, i, 7, a[0]), E = u(E, b, O, C, c, 12, a[1]), C = u(C, E, b, O, f, 17, a[2]), O = u(O, C, E, b, g, 22, a[3]), b = u(b, O, C, E, p, 7, a[4]), E = u(E, b, O, C, m, 12, a[5]), C = u(C, E, b, O, y, 17, a[6]), O = u(O, C, E, b, _, 22, a[7]), b = u(b, O, C, E, w, 7, a[8]), E = u(E, b, O, C, k, 12, a[9]), C = u(C, E, b, O, v, 17, a[10]), O = u(O, C, E, b, T, 22, a[11]), b = u(b, O, C, E, S, 7, a[12]), E = u(E, b, O, C, P, 12, a[13]), C = u(C, E, b, O, A, 17, a[14]), b = l(b, O = u(O, C, E, b, I, 22, a[15]), C, E, c, 5, a[16]), E = l(E, b, O, C, y, 9, a[17]), C = l(C, E, b, O, T, 14, a[18]), O = l(O, C, E, b, i, 20, a[19]), b = l(b, O, C, E, m, 5, a[20]), E = l(E, b, O, C, v, 9, a[21]), C = l(C, E, b, O, I, 14, a[22]), O = l(O, C, E, b, p, 20, a[23]), b = l(b, O, C, E, k, 5, a[24]), E = l(E, b, O, C, A, 9, a[25]), C = l(C, E, b, O, g, 14, a[26]), O = l(O, C, E, b, w, 20, a[27]), b = l(b, O, C, E, P, 5, a[28]), E = l(E, b, O, C, f, 9, a[29]), C = l(C, E, b, O, _, 14, a[30]), b = h(b, O = l(O, C, E, b, S, 20, a[31]), C, E, m, 4, a[32]), E = h(E, b, O, C, w, 11, a[33]), C = h(C, E, b, O, T, 16, a[34]), O = h(O, C, E, b, A, 23, a[35]), b = h(b, O, C, E, c, 4, a[36]), E = h(E, b, O, C, p, 11, a[37]), C = h(C, E, b, O, _, 16, a[38]), O = h(O, C, E, b, v, 23, a[39]), b = h(b, O, C, E, P, 4, a[40]), E = h(E, b, O, C, i, 11, a[41]), C = h(C, E, b, O, g, 16, a[42]), O = h(O, C, E, b, y, 23, a[43]), b = h(b, O, C, E, k, 4, a[44]), E = h(E, b, O, C, S, 11, a[45]), C = h(C, E, b, O, I, 16, a[46]), b = d(b, O = h(O, C, E, b, f, 23, a[47]), C, E, i, 6, a[48]), E = d(E, b, O, C, _, 10, a[49]), C = d(C, E, b, O, A, 15, a[50]), O = d(O, C, E, b, m, 21, a[51]), b = d(b, O, C, E, S, 6, a[52]), E = d(E, b, O, C, g, 10, a[53]), C = d(C, E, b, O, v, 15, a[54]), O = d(O, C, E, b, c, 21, a[55]), b = d(b, O, C, E, w, 6, a[56]), E = d(E, b, O, C, I, 10, a[57]), C = d(C, E, b, O, y, 15, a[58]), O = d(O, C, E, b, P, 21, a[59]), b = d(b, O, C, E, p, 6, a[60]), E = d(E, b, O, C, T, 10, a[61]), C = d(C, E, b, O, f, 15, a[62]), O = d(O, C, E, b, k, 21, a[63]), r[0] = r[0] + b | 0, r[1] = r[1] + O | 0, r[2] = r[2] + C | 0, r[3] = r[3] + E | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,o = 8 * t.sigBytes;n[o >>> 5] |= 128 << 24 - o % 32;var r = e.floor(s / 4294967296),i = s;n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var l = c[u];c[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);}return a;}, clone: function clone() {var e = r.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, o, r, i) {var a = e + (t & n | ~t & s) + o + i;return (a << r | a >>> 32 - r) + t;}function l(e, t, n, s, o, r, i) {var a = e + (t & s | n & ~s) + o + i;return (a << r | a >>> 32 - r) + t;}function h(e, t, n, s, o, r, i) {var a = e + (t ^ n ^ s) + o + i;return (a << r | a >>> 32 - r) + t;}function d(e, t, n, s, o, r, i) {var a = e + (n ^ (t | ~s)) + o + i;return (a << r | a >>> 32 - r) + t;}t.MD5 = r._createHelper(c), t.HmacMD5 = r._createHmacHelper(c);}(Math), n.MD5);}), s(function (e, t) {var n, s, r;e.exports = (s = (n = o).lib.Base, r = n.enc.Utf8, void (n.algo.HMAC = s.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = r.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var o = this._oKey = t.clone(), i = this._iKey = t.clone(), a = o.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}o.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), s(function (e, t) {e.exports = o.HmacMD5;}));var i = "FUNCTION",a = "OBJECT",c = "CLIENT_DB";function u(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function l(e) {return "object" === u(e);}function h(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var d = "development" === "development",f = "mp-weixin";var g;switch (f) {case "h5":g = "web";break;case "app-plus":g = "app";break;default:g = f;}var p = h(undefined),m = h(undefined) || [],y = true;var _ = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 341).default || __webpack_require__(/*! uni-stat-config */ 341);_ = _e2.appid;}} catch (e) {}var w = {};function k(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = w, s = e, Object.prototype.hasOwnProperty.call(n, s) || (w[e] = t), w[e];}"app" === g && (w = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var v = ["invoke", "success", "fail", "complete"],T = k("_globalUniCloudInterceptor");function S(e, t) {T[e] || (T[e] = {}), l(t) && Object.keys(t).forEach(function (n) {v.indexOf(n) > -1 && function (e, t, n) {var s = T[e][t];s || (s = T[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function P(e, t) {T[e] || (T[e] = {}), l(t) ? Object.keys(t).forEach(function (n) {v.indexOf(n) > -1 && function (e, t, n) {var s = T[e][t];if (!s) return;var o = s.indexOf(n);o > -1 && s.splice(o, 1);}(e, n, t[n]);}) : delete T[e];}function A(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function I(e, t) {return T[e] && T[e][t] || [];}function b(e) {S("callObject", e);}var O = k("_globalUniCloudListener"),C = "response",E = "needLogin",R = "refreshToken",U = "clientdb",x = "cloudfunction",L = "cloudobject";function D(e) {return O[e] || (O[e] = []), O[e];}function N(e, t) {var n = D(e);n.includes(t) || n.push(t);}function q(e, t) {var n = D(e),s = n.indexOf(t);-1 !== s && n.splice(s, 1);}function F(e, t) {var n = D(e);for (var _e3 = 0; _e3 < n.length; _e3++) {(0, n[_e3])(t);}}var M = !1;var j = new Promise(function (e) {M && e(), function t() {if ("function" == typeof getCurrentPages) {var _t2 = getCurrentPages();_t2 && _t2[0] && (M = !0, e());}M || setTimeout(function () {t();}, 30);}();});function $() {return j;}function K(e, t) {return t ? function (n) {var _this = this;var s = !1;if ("callFunction" === t) {var _e4 = n && n.type || i;s = _e4 !== i;}var o = "callFunction" === t && !s;var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var a = r.then(function () {return s ? Promise.resolve() : A(I(t, "invoke"), n);}).then(function () {return e.call(_this, n);}).then(function (e) {return s ? Promise.resolve(e) : A(I(t, "success"), e).then(function () {return A(I(t, "complete"), e);}).then(function () {return o && F(C, { type: x, content: e }), Promise.resolve(e);});}, function (e) {return s ? Promise.reject(e) : A(I(t, "fail"), e).then(function () {return A(I(t, "complete"), e);}).then(function () {return F(C, { type: x, content: e }), Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return a;a.then(function (e) {n.success && n.success(e), n.complete && n.complete(e), o && F(C, { type: x, content: e });}, function (e) {n.fail && n.fail(e), n.complete && n.complete(e), o && F(C, { type: x, content: e });});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var B = /*#__PURE__*/function (_Error) {_inherits(B, _Error);var _super = _createSuper(B);function B(e) {var _this2;_classCallCheck(this, B);_this2 = _super.call(this, e.message), _this2.errMsg = e.message || "", _this2.errCode = _this2.code = e.code || "SYSTEM_ERROR", _this2.requestId = e.requestId;return _this2;}return B;}( /*#__PURE__*/_wrapNativeSuper(Error));function H() {var e, t;try {if (uni.getLaunchOptionsSync) {if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1) return;var _uni$getLaunchOptions = uni.getLaunchOptionsSync(),_n = _uni$getLaunchOptions.scene,_s = _uni$getLaunchOptions.channel;e = _s, t = _n;}} catch (e) {}return { channel: e, scene: t };}var W;function z() {var e = uni.getLocale && uni.getLocale() || "en";if (W) return _objectSpread(_objectSpread({}, W), {}, { locale: e, LOCALE: e });var t = uni.getSystemInfoSync(),n = t.deviceId,s = t.osName,o = t.uniPlatform,r = t.appId,i = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];for (var _e5 = 0; _e5 < i.length; _e5++) {delete t[i[_e5]];}return W = _objectSpread(_objectSpread({ PLATFORM: o, OS: s, APPID: r, DEVICEID: n }, H()), t), _objectSpread(_objectSpread({}, W), {}, { locale: e, LOCALE: e });}var J = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), d && "web" === g && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new B({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var o = e.data;if (o.error) return s(new B({ code: o.error.code, message: o.error.message, requestId: t }));o.result = o.data, o.requestId = t, delete o.data, n(o);} }));});} };var V = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} },Y = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };var _e6 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: Y, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: Y }, "zh-Hans"),X = _e6.t;var G = /*#__PURE__*/function () {function G(e) {_classCallCheck(this, G);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(X("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = V, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(G, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return J.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this3 = this;return Promise.resolve().then(function () {return _this3.hasAccessToken ? t ? _this3.requestWrapped(e) : _this3.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this3.getAccessToken();}).then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});}) : _this3.getAccessToken().then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = J.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = J.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this4 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this4.setAccessToken(e.result.accessToken), _this4._getAccessTokenPromiseStatus = "fulfilled", t(_this4.accessToken)) : (_this4._getAccessTokenPromiseStatus = "rejected", n(new B({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this4._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this5 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,o = _ref.fileType,r = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this5.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: o, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new B({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof r && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {r({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this6 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,o = _ref2.config;if ("string" !== u(t)) throw new B({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });if (!(t = t.trim())) throw new B({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });if (/:\/\//.test(t)) throw new B({ code: "INVALID_PARAM", message: "cloudPath不合法" });var r = o && o.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: r, filename: t }).then(function (t) {var o = t.result;i = o.id, a = "https://" + o.cdnDomain + "/" + o.ossPath;var r = { url: "https://" + o.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: o.accessKeyId, Signature: o.signature, host: o.host, id: i, key: o.ossPath, policy: o.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this6.uploadFileToOSS(Object.assign({}, r, { onUploadProgress: s }));}).then(function () {return _this6.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: a }) : s(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new B({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return G;}();var Q = { init: function init(e) {var t = new G(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var Z = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var ee;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(ee || (ee = {}));var te = function te() {};var ne = function ne() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t3 = function _t3() {throw new B({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });};return Object.defineProperty(e.promise, "then", { get: _t3 }), Object.defineProperty(e.promise, "catch", { get: _t3 }), e;}var t = new Promise(function (t, n) {e = function e(_e7, s) {return _e7 ? n(_e7) : t(s);};});return e.promise = t, e;};function se(e) {return void 0 === e;}function oe(e) {return "[object Null]" === Object.prototype.toString.call(e);}var re;function ie(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e8 = _step.value;var _t4 = _e8.isMatch,_n2 = _e8.genAdapter,_s2 = _e8.runtime;if (_t4()) return { adapter: _n2(), runtime: _s2 };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(re || (re = {}));var ae = { adapter: null, runtime: void 0 },ce = ["anonymousUuidKey"];var ue = /*#__PURE__*/function (_te) {_inherits(ue, _te);var _super2 = _createSuper(ue);function ue() {var _this7;_classCallCheck(this, ue);_this7 = _super2.call(this), ae.adapter.root.tcbObject || (ae.adapter.root.tcbObject = {});return _this7;}_createClass(ue, [{ key: "setItem", value: function setItem(e, t) {ae.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return ae.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete ae.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete ae.adapter.root.tcbObject;} }]);return ue;}(te);function le(e, t) {switch (e) {case "local":return t.localStorage || new ue();case "none":return new ue();default:return t.sessionStorage || new ue();}}var he = /*#__PURE__*/function () {function he(e) {_classCallCheck(this, he);if (!this._storage) {this._persistence = ae.adapter.primaryStorage || e.persistence, this._storage = le(this._persistence, ae.adapter);var _t5 = "access_token_".concat(e.env),_n3 = "access_token_expire_".concat(e.env),_s3 = "refresh_token_".concat(e.env),_o = "anonymous_uuid_".concat(e.env),_r = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t5, accessTokenExpireKey: _n3, refreshTokenKey: _s3, anonymousUuidKey: _o, loginTypeKey: _r, userInfoKey: _i };}}_createClass(he, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = le(e, ae.adapter);for (var _e9 in this.keys) {var _s4 = this.keys[_e9];if (t && ce.includes(_e9)) continue;var _o2 = this._storage.getItem(_s4);se(_o2) || oe(_o2) || (n.setItem(_s4, _o2), this._storage.removeItem(_s4));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },o = JSON.stringify(s);try {this._storage.setItem(e, o);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return he;}();var de = {},fe = {};function ge(e) {return de[e];}var pe = function pe(e, t) {_classCallCheck(this, pe);this.data = t || null, this.name = e;};var me = /*#__PURE__*/function (_pe) {_inherits(me, _pe);var _super3 = _createSuper(me);function me(e, t) {var _this8;_classCallCheck(this, me);_this8 = _super3.call(this, "error", { error: e, data: t }), _this8.error = e;return _this8;}return me;}(pe);var ye = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s5 = n[e].indexOf(t);-1 !== _s5 && n[e].splice(_s5, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof me) return console.error(e.error), this;var n = "string" == typeof e ? new pe(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e10 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e10),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t6 = _step2.value;_t6.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function _e(e, t) {ye.on(e, t);}function we(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};ye.fire(e, t);}function ke(e, t) {ye.off(e, t);}var ve = "loginStateChanged",Te = "loginStateExpire",Se = "loginTypeChanged",Pe = "anonymousConverted",Ae = "refreshAccessToken";var Ie;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(Ie || (Ie = {}));var be = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],Oe = { "X-SDK-Version": "1.3.5" };function Ce(e, t, n) {var s = e[t];e[t] = function (t) {var o = {},r = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(o, s), Object.assign(r, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), o);else for (var _e11 in o) {i.append(_e11, o[_e11]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), r), s.call(e, t);};}function Ee() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, Oe), {}, { "x-seqid": e }) };}var Re = /*#__PURE__*/function () {function Re() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Re);var t;this.config = e, this._reqClass = new ae.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = ge(this.config.env), this._localCache = (t = this.config.env, fe[t]), Ce(this._reqClass, "post", [Ee]), Ce(this._reqClass, "upload", [Ee]), Ce(this._reqClass, "download", [Ee]);}_createClass(Re, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, o, r, i, a, _e12, _e13, _t7, _s6;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, o = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);r = this._cache.getStore(n);if (r) {_context5.next = 5;break;}throw new B({ message: "未登录CloudBase" });case 5:i = { refresh_token: r };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e12 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e12 || "REFRESH_TOKEN_EXPIRED" === _e12 || "INVALID_REFRESH_TOKEN" === _e12)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === Ie.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e12)) {_context5.next = 19;break;}_e13 = this._cache.getStore(o);_t7 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e13, refresh_token: _t7 });case 17:_s6 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s6.refresh_token), this._refreshAccessToken()));case 19:we(Te), this._cache.removeStore(n);case 20:throw new B({ code: a.data.code, message: "\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code) });case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (we(Ae), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, o, r;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new B({ message: "refresh token不存在，登录状态异常" });case 3:s = this._cache.getStore(e), o = this._cache.getStore(t), r = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, o);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}r = !1;case 12:return _context6.abrupt("return", (!s || !o || o < Date.now()) && r ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: o });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, o, r, _e14, i, _e15, _e16, a, c, u, l, h, d, f, g, p;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);o = "application/x-www-form-urlencoded";r = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === be.indexOf(e))) {_context7.next = 10;break;}_e14 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e14);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:r.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e15 in i) {i.hasOwnProperty(_e15) && void 0 !== i[_e15] && i.append(_e15, r[_e15]);}o = "multipart/form-data";} else {o = "application/json", i = {};for (_e16 in r) {void 0 !== r[_e16] && (i[_e16] = r[_e16]);}}a = { headers: { "content-type": o } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, l = t.inQuery, h = t.search;d = { env: this.config.env };u && (d.parse = !0), l && (d = _objectSpread(_objectSpread({}, l), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var o = "";for (var _e17 in n) {"" === o ? !s && (t += "?") : o += "&", o += "".concat(_e17, "=").concat(encodeURIComponent(n[_e17]));}return /^http(s)?\:\/\//.test(t += o) ? t : "".concat(e).concat(t);}(Z, "//tcb-api.tencentcloudapi.com/web", d);h && (f += h);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:g = _context7.sent;p = g.header && g.header["x-tcb-trace"];if (!(p && this._localCache.setStore(s, p), 200 !== Number(g.status) && 200 !== Number(g.statusCode) || !g.data)) {_context7.next = 26;break;}throw new B({ code: "NETWORK_ERROR", message: "network request error" });case 26:return _context7.abrupt("return", g);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n4,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === be.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n4 = _context8.sent;if (!_n4.data.code) {_context8.next = 12;break;}throw new B({ code: _n4.data.code, message: _n4.data.message });case 12:return _context8.abrupt("return", _n4.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new B({ code: n.data.code, message: n.data.message });case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return Re;}();var Ue = {};function xe(e) {return Ue[e];}var Le = /*#__PURE__*/function () {function Le(e) {_classCallCheck(this, Le);this.config = e, this._cache = ge(e.env), this._request = xe(e.env);}_createClass(Le, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return Le;}();var De = /*#__PURE__*/function () {function De(e) {_classCallCheck(this, De);if (!e) throw new B({ code: "PARAM_ERROR", message: "envId is not defined" });this._envId = e, this._cache = ge(this._envId), this._request = xe(this._envId), this.setUserInfo();}_createClass(De, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new B({ code: "PARAM_ERROR", message: "ticket must be string" });return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new B({ code: "PARAM_ERROR", message: "username must be a string" });return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, o, r, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;o = e.province;r = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: o, country: r, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this9 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this9[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return De;}();var Ne = /*#__PURE__*/function () {function Ne(e) {_classCallCheck(this, Ne);if (!e) throw new B({ code: "PARAM_ERROR", message: "envId is not defined" });this._cache = ge(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,o = this._cache.getStore(t),r = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: o, accessToken: r, accessTokenExpire: i }, this.user = new De(e);}_createClass(Ne, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === Ie.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === Ie.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === Ie.WECHAT || this.loginType === Ie.WECHAT_OPEN || this.loginType === Ie.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ne;}();var qe = /*#__PURE__*/function (_Le) {_inherits(qe, _Le);var _super4 = _createSuper(qe);function qe() {_classCallCheck(this, qe);return _super4.apply(this, arguments);}_createClass(qe, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, o, _e18;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:o = _context13.sent;if (!(o.uuid && o.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(o.uuid);this.setRefreshToken(o.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:we(ve);we(Se, { env: this.config.env, loginType: Ie.ANONYMOUS, persistence: "local" });_e18 = new Ne(this.config.env);_context13.next = 19;return _e18.user.refresh();case 19:return _context13.abrupt("return", _e18);case 20:throw new B({ message: "匿名登录失败" });case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, o, r;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);o = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: o, ticket: e });case 7:r = _context14.sent;if (!r.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(r.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:we(Pe, { env: this.config.env });we(Se, { loginType: Ie.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: r.refresh_token } });case 16:throw new B({ message: "匿名转化失败" });case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, Ie.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return qe;}(Le);var Fe = /*#__PURE__*/function (_Le2) {_inherits(Fe, _Le2);var _super5 = _createSuper(Fe);function Fe() {_classCallCheck(this, Fe);return _super5.apply(this, arguments);}_createClass(Fe, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new B({ param: "PARAM_ERROR", message: "ticket must be a string" });case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:we(ve);we(Se, { env: this.config.env, loginType: Ie.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new Ne(this.config.env));case 15:throw new B({ message: "自定义登录失败" });case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return Fe;}(Le);var Me = /*#__PURE__*/function (_Le3) {_inherits(Me, _Le3);var _super6 = _createSuper(Me);function Me() {_classCallCheck(this, Me);return _super6.apply(this, arguments);}_createClass(Me, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, o, r, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "email must be a string" });case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;o = s.refresh_token;r = s.access_token;i = s.access_token_expire;if (!o) {_context16.next = 22;break;}this.setRefreshToken(o);if (!(r && i)) {_context16.next = 15;break;}this.setAccessToken(r, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:we(ve);we(Se, { env: this.config.env, loginType: Ie.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new Ne(this.config.env));case 22:throw s.code ? new B({ code: s.code, message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ".concat(s.message) }) : new B({ message: "邮箱登录失败" });case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Me;}(Le);var je = /*#__PURE__*/function (_Le4) {_inherits(je, _Le4);var _super7 = _createSuper(je);function je() {_classCallCheck(this, je);return _super7.apply(this, arguments);}_createClass(je, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, o, r, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "username must be a string" });case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: Ie.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;o = s.refresh_token;r = s.access_token_expire;i = s.access_token;if (!o) {_context19.next = 23;break;}this.setRefreshToken(o);if (!(i && r)) {_context19.next = 16;break;}this.setAccessToken(i, r);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:we(ve);we(Se, { env: this.config.env, loginType: Ie.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new Ne(this.config.env));case 23:throw s.code ? new B({ code: s.code, message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ".concat(s.message) }) : new B({ message: "用户名密码登录失败" });case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return je;}(Le);var $e = /*#__PURE__*/function () {function $e(e) {_classCallCheck(this, $e);this.config = e, this._cache = ge(e.env), this._request = xe(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), _e(Se, this._onLoginTypeChanged);}_createClass($e, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new qe(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new Fe(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Me(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new je(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new qe(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Me(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new je(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new qe(this.config)), _e(Pe, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, o;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === Ie.ANONYMOUS)) {_context23.next = 2;break;}throw new B({ message: "匿名用户不支持登出操作" });case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:o = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), we(ve), we(Se, { env: this.config.env, loginType: Ie.NULL, persistence: this.config.persistence }), o));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this10 = this;_e(ve, function () {var t = _this10.hasLoginState();e.call(_this10, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {_e(Te, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {_e(Ae, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {_e(Pe, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this11 = this;_e(Se, function () {var t = _this11.hasLoginState();e.call(_this11, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new Ne(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new B({ code: "PARAM_ERROR", message: "username must be a string" });case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new Fe(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return $e;}();var Ke = function Ke(e, t) {t = t || ne();var n = xe(this.config.env),s = e.cloudPath,o = e.filePath,r = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,l = _e$data2.fileId,h = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": h, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: o, name: s, fileType: i, onUploadProgress: r }).then(function (e) {201 === e.statusCode ? t(null, { fileID: l, requestId: d }) : t(new B({ code: "STORAGE_REQUEST_FAIL", message: "STORAGE_REQUEST_FAIL: ".concat(e.data) }));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Be = function Be(e, t) {t = t || ne();var n = xe(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},He = function He(_ref5, t) {var e = _ref5.fileList;if (t = t || ne(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t8 = _step3.value;if (!_t8 || "string" != typeof _t8) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return xe(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},We = function We(_ref6, t) {var e = _ref6.fileList;t = t || ne(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s7 = _step4.value;"object" == typeof _s7 ? (_s7.hasOwnProperty("fileID") && _s7.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s7.fileID, max_age: _s7.maxAge })) : "string" == typeof _s7 ? n.push({ fileid: _s7 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return xe(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},ze = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, o;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return We.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = xe(this.config.env);o = n.download_url;if (!(o = encodeURI(o), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: o }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: o });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function ze(_x26, _x27) {return _ref8.apply(this, arguments);};}(),Je = function Je(_ref9, r) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,o = _ref9.search;var i = r || ne();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new B({ code: "PARAM_ERROR", message: "函数名不能为空" }));var c = { inQuery: n, parse: s, search: o, function_name: e, request_data: a };return xe(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t9 = e.data.response_data;if (s) i(null, { result: _t9, requestId: e.requestId });else try {_t9 = JSON.parse(e.data.response_data), i(null, { result: _t9, requestId: e.requestId });} catch (e) {i(new B({ message: "response data must be json" }));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ve = { timeout: 15e3, persistence: "session" },Ye = {};var Xe = /*#__PURE__*/function () {function Xe(e) {_classCallCheck(this, Xe);this.config = e || this.config, this.authObj = void 0;}_createClass(Xe, [{ key: "init", value: function init(e) {switch (ae.adapter || (this.requestClient = new ae.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ve), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new Xe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || ae.adapter.primaryStorage || Ve.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;de[t] = new he(e), fe[t] = new he(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, Ue[n.env] = new Re(n), this.authObj = new $e(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return _e.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return ke.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return Je.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return He.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return We.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return ze.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ke.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Be.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Ye[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Ye[e];if (n) {_context30.next = 3;break;}throw new B({ message: "\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C") });case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = ie(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (ae.adapter = t), n && (ae.runtime = n);} }]);return Xe;}();var Ge = new Xe();function Qe(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),o = "";for (var r in n) {"" === o ? !s && (t += "?") : o += "&", o += r + "=" + encodeURIComponent(n[r]);}return /^http(s)?:\/\//.test(t += o) ? t : "" + e + t;}var Ze = /*#__PURE__*/function () {function Ze() {_classCallCheck(this, Ze);}_createClass(Ze, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, o) {V.request({ url: Qe("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {o(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,o = e.file,r = e.data,i = e.headers,a = e.fileType,c = V.uploadFile({ url: Qe("https:", s), name: "file", formData: Object.assign({}, r), filePath: o, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && r.success_action_status && (n.statusCode = parseInt(r.success_action_status, 10)), t(n);}, fail: function fail(e) {n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Ze;}();var et = { setItem: function setItem(e, t) {V.setStorageSync(e, t);}, getItem: function getItem(e) {return V.getStorageSync(e);}, removeItem: function removeItem(e) {V.removeStorageSync(e);}, clear: function clear() {V.clearStorageSync();} };var tt = { genAdapter: function genAdapter() {return { root: {}, reqClass: Ze, localStorage: et, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Ge.useAdapters(tt);var nt = Ge,st = nt.init;nt.init = function (e) {e.env = e.spaceId;var t = st.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = K(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var ot = nt;function rt() {return { token: V.getStorageSync("uni_id_token") || V.getStorageSync("uniIdToken"), tokenExpired: V.getStorageSync("uni_id_token_expired") };}function it() {var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref12.token,t = _ref12.tokenExpired;e && V.setStorageSync("uni_id_token", e), t && V.setStorageSync("uni_id_token_expired", t);}function at() {if (!d || "web" !== g) return;uni.getStorageSync("__LAST_DCLOUD_APPID") !== _ && (uni.setStorageSync("__LAST_DCLOUD_APPID", _), console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), V.removeStorageSync("uni_id_token"), V.removeStorageSync("uniIdToken"), V.removeStorageSync("uni_id_token_expired"));}var ct = /*#__PURE__*/function (_G) {_inherits(ct, _G);var _super8 = _createSuper(ct);function ct() {_classCallCheck(this, ct);return _super8.apply(this, arguments);}_createClass(ct, [{ key: "getAccessToken", value: function getAccessToken() {var _this12 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this12.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = J.sign(n, this.config.clientSecret);var o = z();s["x-client-info"] = encodeURIComponent(JSON.stringify(o));var _rt = rt(),r = _rt.token;return s["x-client-token"] = r, { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref13) {var _this13 = this;var e = _ref13.url,t = _ref13.formData,n = _ref13.name,s = _ref13.filePath,o = _ref13.fileType,r = _ref13.onUploadProgress;return new Promise(function (i, a) {var c = _this13.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: o, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new B({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof r && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {r({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref14) {var _this14 = this;var e = _ref14.filePath,t = _ref14.cloudPath,_ref14$fileType = _ref14.fileType,n = _ref14$fileType === void 0 ? "image" : _ref14$fileType,s = _ref14.onUploadProgress;if (!t) throw new B({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,r = _t$result.url,i = _t$result.formData,a = _t$result.name;o = t.result.fileUrl;var c = { url: r, formData: i, name: a, filePath: e, fileType: n };return _this14.uploadFileToOSS(Object.assign({}, c, { onUploadProgress: s }));}).then(function () {return _this14.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: o }) : s(new B({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref15) {var e = _ref15.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.fileList;var t = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }]);return ct;}(G);var ut = { init: function init(e) {var t = new ct(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };function lt(_ref17) {var e = _ref17.data;var t;t = z();var n = JSON.parse(JSON.stringify(e || {}));if (Object.assign(n, { clientInfo: t }), !n.uniIdToken) {var _rt2 = rt(),_e19 = _rt2.token;_e19 && (n.uniIdToken = _e19);}return n;}function ht() {var _this15 = this;var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref18.name,t = _ref18.data;var _this$__dev__ = this.__dev__,n = _this$__dev__.localAddress,s = _this$__dev__.localPort,o = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],r = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {V.request({ method: "POST", url: i, data: { name: e, platform: g, provider: o, spaceId: r }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.data;var _ref20 = e || {},t = _ref20.code,n = _ref20.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref21) {var n = _ref21.code,s = _ref21.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e20 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e20), new Error(_e20);}case "SWITCH_TO_CLOUD":break;default:{var _e21 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e21), new Error(_e21);}}return _this15._callCloudFunction({ name: e, data: t });}return new Promise(function (e, n) {var s = lt.call(_this15, { data: t });V.request({ method: "POST", url: a, data: { provider: o, platform: g, param: s }, success: function success() {var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref22.statusCode,s = _ref22.data;return !t || t >= 400 ? n(new B({ code: s.code || "SYS_ERR", message: s.message || "request:fail" })) : e({ result: s });}, fail: function fail(e) {n(new B({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var dt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var ft = /[\\^$.*+?()[\]{}|]/g,gt = RegExp(ft.source);function pt(e, t, n) {return e.replace(new RegExp((s = t) && gt.test(s) ? s.replace(ft, "\\$&") : s, "g"), n);var s;}function mt(_ref23) {var e = _ref23.functionName,t = _ref23.result,n = _ref23.logPvd;if (this.__dev__.debugLog && t && t.requestId) {var _s8 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s8, "[/").concat(n, "-request]"));}}function yt(e) {var t = e.callFunction,n = function n(_n5) {var _this16 = this;var s = _n5.name;_n5.data = lt.call(e, { data: _n5.data });var o = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider];return t.call(this, _n5).then(function (e) {return e.errCode = 0, mt.call(_this16, { functionName: s, result: e, logPvd: o }), Promise.resolve(e);}, function (e) {return mt.call(_this16, { functionName: s, result: e, logPvd: o }), e && e.message && (e.message = function () {var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref24$message = _ref24.message,e = _ref24$message === void 0 ? "" : _ref24$message,_ref24$extraInfo = _ref24.extraInfo,t = _ref24$extraInfo === void 0 ? {} : _ref24$extraInfo,_ref24$formatter = _ref24.formatter,n = _ref24$formatter === void 0 ? [] : _ref24$formatter;for (var _s9 = 0; _s9 < n.length; _s9++) {var _n$_s = n[_s9],_o3 = _n$_s.rule,_r2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_o3);if (!_a) continue;var _c = _r2;for (var _e22 = 1; _e22 < _a.length; _e22++) {_c = pt(_c, "{$".concat(_e22, "}"), _a[_e22]);}for (var _e23 in t) {_c = pt(_c, "{".concat(_e23, "}"), t[_e23]);}return "replace" === i ? _c : e + _c;}return e;}({ message: "[".concat(_n5.name, "]: ").concat(e.message), formatter: dt, extraInfo: { functionName: s } })), Promise.reject(e);});};e.callFunction = function (t) {var s;d && e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && m ? (e._callCloudFunction || (e._callCloudFunction = n, e._callLocalFunction = ht), s = ht) : s = n;var o = s.call(this, t);return Object.defineProperty(o, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), o;};}var _t = Symbol("CLIENT_DB_INTERNAL");function wt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = _t, e.__ob__ = void 0, new Proxy(e, { get: function get(e, n, s) {if ("_uniClient" === n) return null;if (n in e || "string" != typeof n) {var _t10 = e[n];return "function" == typeof _t10 ? _t10.bind(e) : _t10;}return t.get(e, n, s);} });}function kt(e) {return { on: function on(t, n) {e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n);}, off: function off(t, n) {e[t] = e[t] || [];var s = e[t].indexOf(n);-1 !== s && e[t].splice(s, 1);} };}var vt = ["db.Geo", "db.command", "command.aggregate"];function Tt(e, t) {return vt.indexOf("".concat(e, ".").concat(t)) > -1;}function St(e) {switch (u(e)) {case "array":return e.map(function (e) {return St(e);});case "object":return e._internalType === _t || Object.keys(e).forEach(function (t) {e[t] = St(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function Pt(e) {return e && e.content && e.content.$method;}var At = /*#__PURE__*/function () {function At(e, t, n) {_classCallCheck(this, At);this.content = e, this.prevStage = t || null, this.udb = null, this._database = n;}_createClass(At, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: St(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),s = this.getCommand();if (s.$db.push({ $method: e, $param: St(t) }), d) {var _e24 = s.$db.find(function (e) {return "collection" === e.$method;}),_t11 = _e24 && _e24.$param;_t11 && 1 === _t11.length && "string" == typeof _e24.$param[0] && _e24.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");}return this._database._callCloudFunction({ action: n, command: s });} }, { key: "isAggregate", get: function get() {var e = this;for (; e;) {var t = Pt(e),_n6 = Pt(e.prevStage);if ("aggregate" === t && "collection" === _n6 || "pipeline" === t) return !0;e = e.prevStage;}return !1;} }, { key: "isCommand", get: function get() {var e = this;for (; e;) {if ("command" === Pt(e)) return !0;e = e.prevStage;}return !1;} }, { key: "isAggregateCommand", get: function get() {var e = this;for (; e;) {var t = Pt(e),_n7 = Pt(e.prevStage);if ("aggregate" === t && "command" === _n7) return !0;e = e.prevStage;}return !1;} }, { key: "count", get: function get() {if (!this.isAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return It({ $method: "count", $param: St(Array.from(arguments)) }, e, this._database);};} }, { key: "remove", get: function get() {if (!this.isCommand) return function () {return this._send("remove", Array.from(arguments));};var e = this;return function () {return It({ $method: "remove", $param: St(Array.from(arguments)) }, e, this._database);};} }, { key: "set", get: function get() {if (!this.isCommand) return function () {throw new Error("JQL禁止使用set方法");};var e = this;return function () {return It({ $method: "set", $param: St(Array.from(arguments)) }, e, this._database);};} }]);return At;}();function It(e, t, n) {return wt(new At(e, t, n), { get: function get(e, t) {var s = "db";return e && e.content && (s = e.content.$method), Tt(s, t) ? It({ $method: t }, e, n) : function () {return It({ $method: t, $param: St(Array.from(arguments)) }, e, n);};} });}function bt(_ref25) {var e = _ref25.path,t = _ref25.method;return /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);this.param = Array.from(arguments);}_createClass(_class2, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class2;}();}var Ot = /*#__PURE__*/function (_ref26) {_inherits(Ot, _ref26);var _super9 = _createSuper(Ot);function Ot() {_classCallCheck(this, Ot);return _super9.apply(this, arguments);}_createClass(Ot, [{ key: "_callCloudFunction", value: function _callCloudFunction(_ref27) {var _this17 = this;var e = _ref27.action,t = _ref27.command,n = _ref27.multiCommand,s = _ref27.queryList;function o(e, t) {if (n && s) for (var _n8 = 0; _n8 < s.length; _n8++) {var _o4 = s[_n8];_o4.udb && "function" == typeof _o4.udb.setResult && (t ? _o4.udb.setResult(t) : _o4.udb.setResult(e.result.dataList[_n8]));}}var r = this;function i(e) {return r._callback("error", [e]), A(I("database", "fail"), e).then(function () {return A(I("database", "complete"), e);}).then(function () {return o(null, e), F(C, { type: U, content: e }), Promise.reject(e);});}var a = A(I("database", "invoke")),u = this._uniClient;return a.then(function () {return u.callFunction({ name: "DCloud-clientDB", type: c, data: { action: e, command: t, multiCommand: n } });}).then(function (e) {var _e$result = e.result,t = _e$result.code,n = _e$result.message,s = _e$result.token,r = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,a = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (a) for (var _e25 = 0; _e25 < a.length; _e25++) {var _a$_e = a[_e25],_t12 = _a$_e.level,_n9 = _a$_e.message,_s10 = _a$_e.detail,_o5 = console["app" === g && "warn" === _t12 ? "error" : _t12] || console.log;var _r3 = "[System Info]" + _n9;_s10 && (_r3 = "".concat(_r3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s10)), _o5(_r3);}if (t) {return i(new B({ code: t, message: n, requestId: e.requestId }));}e.result.errCode = e.result.code, e.result.errMsg = e.result.message, s && r && (it({ token: s, tokenExpired: r }), _this17._callbackAuth("refreshToken", [{ token: s, tokenExpired: r }]), _this17._callback("refreshToken", [{ token: s, tokenExpired: r }]), F(R, { token: s, tokenExpired: r }));var c = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];var _loop = function _loop(_t13) {var _c$_t = c[_t13],n = _c$_t.prop,s = _c$_t.tips;if (n in e.result) {var _t14 = e.result[n];Object.defineProperty(e.result, n, { get: function get() {return console.warn(s), _t14;} });}};for (var _t13 = 0; _t13 < c.length; _t13++) {_loop(_t13);}return function (e) {return A(I("database", "success"), e).then(function () {return A(I("database", "complete"), e);}).then(function () {return o(e, null), F(C, { type: U, content: e }), Promise.resolve(e);});}(e);}, function (e) {/fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");return i(new B({ code: e.code || "SYSTEM_ERROR", message: e.message, requestId: e.requestId }));});} }]);return Ot;}( /*#__PURE__*/function () {function _class3() {var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref28$uniClient = _ref28.uniClient,e = _ref28$uniClient === void 0 ? {} : _ref28$uniClient;_classCallCheck(this, _class3);this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = k("_globalUniCloudDatabaseCallback")), this.auth = kt(this._authCallBacks), Object.assign(this, kt(this._dbCallBacks)), this.env = wt({}, { get: function get(e, t) {return { $env: t };} }), this.Geo = wt({}, { get: function get(e, t) {return bt({ path: ["Geo"], method: t });} }), this.serverDate = bt({ path: [], method: "serverDate" }), this.RegExp = bt({ path: [], method: "RegExp" });}_createClass(_class3, [{ key: "getCloudEnv", value: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };} }, { key: "_callback", value: function _callback(e, t) {var n = this._dbCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "_callbackAuth", value: function _callbackAuth(e, t) {var n = this._authCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "multiSend", value: function multiSend() {var e = Array.from(arguments),t = e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };});return this._callCloudFunction({ multiCommand: t, queryList: e });} }]);return _class3;}());function Ct(e) {e.database = function (t) {if (t && Object.keys(t).length > 0) return e.init(t).database();if (this._database) return this._database;var n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return wt(new e(t), { get: function get(e, t) {return Tt("db", t) ? It({ $method: t }, null, e) : function () {return It({ $method: t, $param: St(Array.from(arguments)) }, null, e);};} });}(Ot, { uniClient: e });return this._database = n, n;};}var Et = "token无效，跳转登录页面",Rt = "token过期，跳转登录页面",Ut = { TOKEN_INVALID_TOKEN_EXPIRED: Rt, TOKEN_INVALID_INVALID_CLIENTID: Et, TOKEN_INVALID: Et, TOKEN_INVALID_WRONG_TOKEN: Et, TOKEN_INVALID_ANONYMOUS_USER: Et },xt = { "uni-id-token-expired": Rt, "uni-id-check-token-failed": Et, "uni-id-token-not-exist": Et, "uni-id-check-device-feature-failed": Et };function Lt(e, t) {var n = "";return n = e ? "".concat(e, "/").concat(t) : t, n.replace(/^\//, "");}function Dt() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";var n = [],s = [];return e.forEach(function (e) {!0 === e.needLogin ? n.push(Lt(t, e.path)) : !1 === e.needLogin && s.push(Lt(t, e.path));}), { needLoginPage: n, notNeedLoginPage: s };}function Nt(e) {return e.split("?")[0].replace(/^\//, "");}function qt() {return function (e) {var t = e && e.$page && e.$page.fullPath || "";return t ? ("/" !== t.charAt(0) && (t = "/" + t), t) : t;}(function () {var e = getCurrentPages();return e[e.length - 1];}());}function Ft() {return Nt(qt());}function Mt() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};if (!e) return !1;if (!(t && t.list && t.list.length)) return !1;var n = t.list,s = Nt(e);return n.some(function (e) {return e.pagePath === s;});}var jt = !!_pages.default.uniIdRouter;var _ref29 = function () {var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pages.default,_ref30$pages = _ref30.pages,e = _ref30$pages === void 0 ? [] : _ref30$pages,_ref30$subPackages = _ref30.subPackages,n = _ref30$subPackages === void 0 ? [] : _ref30$subPackages,_ref30$uniIdRouter = _ref30.uniIdRouter,s = _ref30$uniIdRouter === void 0 ? {} : _ref30$uniIdRouter,_ref30$tabBar = _ref30.tabBar,o = _ref30$tabBar === void 0 ? {} : _ref30$tabBar;var r = s.loginPage,_s$needLogin = s.needLogin,i = _s$needLogin === void 0 ? [] : _s$needLogin,_s$resToLogin = s.resToLogin,a = _s$resToLogin === void 0 ? !0 : _s$resToLogin,_Dt = Dt(e),c = _Dt.needLoginPage,u = _Dt.notNeedLoginPage,_ref31 = function () {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var t = [],n = [];return e.forEach(function (e) {var s = e.root,_e$pages = e.pages,o = _e$pages === void 0 ? [] : _e$pages,_Dt2 = Dt(o, s),r = _Dt2.needLoginPage,i = _Dt2.notNeedLoginPage;t.push.apply(t, _toConsumableArray(r)), n.push.apply(n, _toConsumableArray(i));}), { needLoginPage: t, notNeedLoginPage: n };}(n),l = _ref31.needLoginPage,h = _ref31.notNeedLoginPage;return { loginPage: r, routerNeedLogin: i, resToLogin: a, needLoginPage: [].concat(_toConsumableArray(c), _toConsumableArray(l)), notNeedLoginPage: [].concat(_toConsumableArray(u), _toConsumableArray(h)), loginPageInTabBar: Mt(r, o) };}(),$t = _ref29.loginPage,Kt = _ref29.routerNeedLogin,Bt = _ref29.resToLogin,Ht = _ref29.needLoginPage,Wt = _ref29.notNeedLoginPage,zt = _ref29.loginPageInTabBar;if (Ht.indexOf($t) > -1) throw new Error("Login page [".concat($t, "] should not be \"needLogin\", please check your pages.json"));function Jt(e) {var t = Nt(function (e) {var t = Ft(),n = e.charAt(0),s = e.split("?")[0];if ("/" === n) return s;var o = s.replace(/^\//, "").split("/"),r = t.split("/");r.pop();for (var _e26 = 0; _e26 < o.length; _e26++) {var _t15 = o[_e26];".." === _t15 ? r.pop() : "." !== _t15 && r.push(_t15);}return "" === r[0] && r.shift(), r.join("/");}(e));return !(Wt.indexOf(t) > -1) && (Ht.indexOf(t) > -1 || Kt.some(function (t) {return function (e, t) {return new RegExp(t).test(e);}(e, t);}));}function Vt(_ref32) {var e = _ref32.redirect;var t = Nt(e),n = Nt($t);return Ft() !== n && t !== n;}function Yt() {var _ref33 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref33.api,t = _ref33.redirect;if (!t || !Vt({ redirect: t })) return;var n = function (e, t) {return "/" !== e.charAt(0) && (e = "/" + e), t ? e.indexOf("?") > -1 ? e + "&uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e + "?uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e;}($t, t);zt ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo"), setTimeout(function () {uni[e]({ url: n });});}function Xt() {var _ref34 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref34.url;var t = { abortLoginPageJump: !1, autoToLoginPage: !1 },n = function () {var _rt3 = rt(),e = _rt3.token,t = _rt3.tokenExpired;var n;if (e) {if (t < Date.now()) {var _e27 = "uni-id-token-expired";n = { errCode: _e27, errMsg: xt[_e27] };}} else {var _e28 = "uni-id-check-token-failed";n = { errCode: _e28, errMsg: xt[_e28] };}return n;}();if (Jt(e) && n) {n.uniIdRedirectUrl = e;if (D(E).length > 0) return setTimeout(function () {F(E, n);}, 0), t.abortLoginPageJump = !0, t;t.autoToLoginPage = !0;}return t;}function Gt() {!function () {var e = qt(),_Xt = Xt({ url: e }),t = _Xt.abortLoginPageJump,n = _Xt.autoToLoginPage;t || n && Yt({ api: "redirectTo", redirect: e });}();var e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];var _loop2 = function _loop2(_t16) {var n = e[_t16];uni.addInterceptor(n, { invoke: function invoke(e) {var _Xt2 = Xt({ url: e.url }),t = _Xt2.abortLoginPageJump,s = _Xt2.autoToLoginPage;return t ? e : s ? (Yt({ api: n, redirect: e.url }), !1) : e;} });};for (var _t16 = 0; _t16 < e.length; _t16++) {_loop2(_t16);}}function Qt() {this.onResponse(function (e) {var t = e.type,n = e.content;var s = !1;switch (t) {case "cloudobject":s = function (e) {var t = e.errCode;return t in xt;}(n);break;case "clientdb":s = function (e) {var t = e.errCode;return t in Ut;}(n);}s && function () {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var t = D(E);$().then(function () {var n = qt();if (n && Vt({ redirect: n })) return t.length > 0 ? F(E, Object.assign({ uniIdRedirectUrl: n }, e)) : void ($t && Yt({ api: "navigateTo", redirect: n }));});}(n);});}function Zt(e) {!function (e) {e.onResponse = function (e) {N(C, e);}, e.offResponse = function (e) {q(C, e);};}(e), function (e) {e.onNeedLogin = function (e) {N(E, e);}, e.offNeedLogin = function (e) {q(E, e);}, jt && (k("uni-cloud-status").needLoginInit || (k("uni-cloud-status").needLoginInit = !0, $().then(function () {Gt.call(e);}), Bt && Qt.call(e)));}(e), function (e) {e.onRefreshToken = function (e) {N(R, e);}, e.offRefreshToken = function (e) {q(R, e);};}(e);}var en;var tn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",nn = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function sn() {var e = rt().token || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(en(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}en = "function" != typeof atob ? function (e) {if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !nn.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e += "==".slice(2 - (3 & e.length));for (var n, s, o = "", r = 0; r < e.length;) {t = tn.indexOf(e.charAt(r++)) << 18 | tn.indexOf(e.charAt(r++)) << 12 | (n = tn.indexOf(e.charAt(r++))) << 6 | (s = tn.indexOf(e.charAt(r++))), o += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === s ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);}return o;} : atob;var on = s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function o(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref35) {var s = _ref35.onChooseFile,o = _ref35.onUploadProgress;return t.then(function (e) {if (s) {var _t17 = s(e);if (void 0 !== _t17) return Promise.resolve(_t17).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var o = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var r = t.tempFiles,i = r.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, o && o(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, o);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,r = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: r, extension: i, success: function success(t) {e(o(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,n = e.compressed,r = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: r, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,r = t.size,i = t.height,a = t.width;e(o({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: r, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, r) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return r({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(o(t));}, fail: function fail(e) {r({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}),rn = n(on);var an = "manual";function cn(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, spaceInfo: { type: Object, default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === an) return;var n = !1;var s = [];for (var _o6 = 2; _o6 < e.length; _o6++) {e[_o6] !== t[_o6] && (s.push(e[_o6]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref36 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref36$getone = _ref36.getone,e = _ref36$getone === void 0 ? !1 : _ref36$getone,t = _ref36.success,n = _ref36.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,o = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = o), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var r = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = r, t && t(r);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _n10;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database(this.spaceInfo);var s = t.action || this.action;s && (n = n.action(s));var o = t.collection || this.collection;n = Array.isArray(o) ? (_n10 = n).collection.apply(_n10, _toConsumableArray(o)) : n.collection(o);var r = t.where || this.where;r && Object.keys(r).length && (n = n.where(r));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var l = t.orderby || this.orderby;l && (n = n.orderBy(l));var h = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,g = void 0 !== t.gettree ? t.gettree : this.gettree,p = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return g && (m.getTree = y), p && (m.getTreePath = y), n = n.skip(d * (h - 1)).limit(d).get(m), n;} } };}function un(e) {return function (t) {var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return e.customUI = t.customUI || e.customUI, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), "object" == typeof t.secretMethods && (e.secretMethods = t.secretMethods), e;}({ customUI: !1, loadingOptions: { title: "加载中...", mask: !0 }, errorOptions: { type: "modal", retry: !1 } }, n);var _n11 = n,s = _n11.customUI,o = _n11.loadingOptions,r = _n11.errorOptions,i = !s;return new Proxy({}, { get: function get(s, c) {return function () {var _ref37 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref37.fn,t = _ref37.interceptorName,n = _ref37.getCallbackArgs;return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31() {var _len,s,_key,o,r,i,_args31 = arguments;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:for (_len = _args31.length, s = new Array(_len), _key = 0; _key < _len; _key++) {s[_key] = _args31[_key];}o = n ? n({ params: s }) : {};_context31.prev = 2;_context31.next = 5;return A(I(t, "invoke"), _objectSpread({}, o));case 5:_context31.next = 7;return e.apply(void 0, s);case 7:r = _context31.sent;_context31.next = 10;return A(I(t, "success"), _objectSpread(_objectSpread({}, o), {}, { result: r }));case 10:return _context31.abrupt("return", r);case 13:_context31.prev = 13;_context31.t0 = _context31["catch"](2);i = _context31.t0;_context31.next = 18;return A(I(t, "fail"), _objectSpread(_objectSpread({}, o), {}, { error: i }));case 18:throw i;case 19:_context31.prev = 19;_context31.next = 22;return A(I(t, "complete"), i ? _objectSpread(_objectSpread({}, o), {}, { error: i }) : _objectSpread(_objectSpread({}, o), {}, { result: r }));case 22:return _context31.finish(19);case 23:case "end":return _context31.stop();}}}, _callee31, null, [[2, 13, 19, 23]]);}));}({ fn: function () {var _s11 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee33() {var l,_len2,u,_key2,h,_ref39,d,f,g,_yield,_e30,_e29,_args33 = arguments;return _regenerator.default.wrap(function _callee33$(_context33) {while (1) {switch (_context33.prev = _context33.next) {case 0:i && uni.showLoading({ title: o.title, mask: o.mask });for (_len2 = _args33.length, u = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {u[_key2] = _args33[_key2];}h = { name: t, type: a, data: { method: c, params: u } };"object" == typeof n.secretMethods && function (e, t) {var n = t.data.method,s = e.secretMethods[n];s && (t.secret = s);}(n, h);_context33.prev = 4;_context33.next = 7;return e.callFunction(h);case 7:l = _context33.sent;_context33.next = 13;break;case 10:_context33.prev = 10;_context33.t0 = _context33["catch"](4);l = { result: _context33.t0 };case 13:_ref39 = l.result || {}, d = _ref39.errCode, f = _ref39.errMsg, g = _ref39.newToken;if (!(i && uni.hideLoading(), g && g.token && g.tokenExpired && (it(g), F(R, _objectSpread({}, g))), d)) {_context33.next = 30;break;}if (!i) {_context33.next = 28;break;}if (!("toast" === r.type)) {_context33.next = 20;break;}uni.showToast({ title: f, icon: "none" });_context33.next = 28;break;case 20:if (!("modal" !== r.type)) {_context33.next = 22;break;}throw new Error("Invalid errorOptions.type: ".concat(r.type));case 22:_context33.next = 24;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32() {var _ref41,e,t,n,s,o,_args32 = arguments;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:_ref41 = _args32.length > 0 && _args32[0] !== undefined ? _args32[0] : {}, e = _ref41.title, t = _ref41.content, n = _ref41.showCancel, s = _ref41.cancelText, o = _ref41.confirmText;return _context32.abrupt("return", new Promise(function (r, i) {uni.showModal({ title: e, content: t, showCancel: n, cancelText: s, confirmText: o, success: function success(e) {r(e);}, fail: function fail() {r({ confirm: !1, cancel: !0 });} });}));case 2:case "end":return _context32.stop();}}}, _callee32);}))({ title: "提示", content: f, showCancel: r.retry, cancelText: "取消", confirmText: r.retry ? "重试" : "确定" });case 24:_yield = _context33.sent;_e30 = _yield.confirm;if (!(r.retry && _e30)) {_context33.next = 28;break;}return _context33.abrupt("return", s.apply(void 0, u));case 28:_e29 = new B({ code: d, message: f, requestId: l.requestId });throw _e29.detail = l.result, F(C, { type: L, content: _e29 }), _e29;case 30:return _context33.abrupt("return", (F(C, { type: L, content: l.result }), l.result));case 31:case "end":return _context33.stop();}}}, _callee33, null, [[4, 10]]);}));function s() {return _s11.apply(this, arguments);}return s;}(), interceptorName: "callObject", getCallbackArgs: function getCallbackArgs() {var _ref42 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref42.params;return { objectName: t, methodName: c, params: e };} });} });};}function ln(_x30, _x31) {return _ln.apply(this, arguments);}function _ln() {_ln = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee35(e, t) {var n, _e34, s;return _regenerator.default.wrap(function _callee35$(_context35) {while (1) {switch (_context35.prev = _context35.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context35.prev = 1;_context35.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {V.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e34 = _context35.sent;return _context35.abrupt("return", !(!_e34.data || 0 !== _e34.data.code));case 8:_context35.prev = 8;_context35.t0 = _context35["catch"](1);return _context35.abrupt("return", !1);case 11:case "end":return _context35.stop();}}}, _callee35, null, [[1, 8]]);}));return _ln.apply(this, arguments);}function hn(e) {if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus) return;var t = Promise.resolve();var n;n = 1, t = new Promise(function (e, t) {setTimeout(function () {e();}, n);}), e.isReady = !1, e.isDefault = !1;var s = e.auth();e.initUniCloudStatus = "pending", e.initUniCloud = t.then(function () {return s.getLoginState();}).then(function (e) {return e ? Promise.resolve() : s.signInAnonymously();}).then(function () {if (!d) return Promise.resolve();if ("app" === g) {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),_e31 = _uni$getSystemInfoSyn.osName,_t18 = _uni$getSystemInfoSyn.osVersion;"ios" === _e31 && function (e) {if (!e || "string" != typeof e) return 0;var t = e.match(/^(\d+)./);return t && t[1] ? parseInt(t[1]) : 0;}(_t18) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");}if (d && e.__dev__.debugInfo) {var _e$__dev__$debugInfo = e.__dev__.debugInfo,_t19 = _e$__dev__$debugInfo.address,_n12 = _e$__dev__$debugInfo.servePort;return function () {var _ref43 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee34(e, t) {var n, _s12, _o7;return _regenerator.default.wrap(function _callee34$(_context34) {while (1) {switch (_context34.prev = _context34.next) {case 0:_s12 = 0;case 1:if (!(_s12 < e.length)) {_context34.next = 11;break;}_o7 = e[_s12];_context34.next = 5;return ln(_o7, t);case 5:if (!_context34.sent) {_context34.next = 8;break;}n = _o7;return _context34.abrupt("break", 11);case 8:_s12++;_context34.next = 1;break;case 11:return _context34.abrupt("return", { address: n, port: t });case 12:case "end":return _context34.stop();}}}, _callee34);}));return function (_x32, _x33) {return _ref43.apply(this, arguments);};}()(_t19, _n12);}}).then(function () {var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref44.address,n = _ref44.port;if (!d) return Promise.resolve();var s = console["app" === g ? "error" : "warn"];if (t) e.__dev__.localAddress = t, e.__dev__.localPort = n;else if (e.__dev__.debugInfo) {var _t20 = "";"remote" === e.__dev__.debugInfo.initialLaunchType ? (e.__dev__.debugInfo.forceRemote = !0, _t20 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs") : _t20 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs", "web" === g && (_t20 += "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"), 0 === g.indexOf("mp-") && (_t20 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s(_t20);}}).then(function () {at(), e.isReady = !0, e.initUniCloudStatus = "fulfilled";}).catch(function (t) {console.error(t), e.initUniCloudStatus = "rejected";});}var dn = { tcb: ot, tencent: ot, aliyun: Q, private: ut };var fn = new ( /*#__PURE__*/function () {function _class4() {_classCallCheck(this, _class4);}_createClass(_class4, [{ key: "init", value: function init(e) {var t = {};var n = dn[e.provider];if (!n) throw new Error("未提供正确的provider参数");t = n.init(e), t.__dev__ = {}, t.__dev__.debugLog = d && ("web" === g && navigator.userAgent.indexOf("HBuilderX") > 0 || "app" === g);var s = p;d && s && !s.code && (t.__dev__.debugInfo = s), hn(t), t.reInit = function () {hn(this);}, yt(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {return t.call(this, e);};}(t), Ct(t), function (e) {e.getCurrentUserInfo = sn, e.chooseAndUploadFile = rn.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return cn(e);} }), e.importObject = un(e);}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {if (!t[e]) return;var n = t[e];t[e] = function () {return t.reInit(), n.apply(t, Array.from(arguments));}, t[e] = K(t[e], e).bind(t);}), t.init = this.init, t;} }]);return _class4;}())();(function () {var e = m;var t = {};if (e && 1 === e.length) t = e[0], fn = fn.init(t), fn.isDefault = !0;else {var _t21 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];var _n13;_n13 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : y ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t21.forEach(function (e) {fn[e] = function () {return console.error(_n13), Promise.reject(new B({ code: "SYS_ERR", message: _n13 }));};});}Object.assign(fn, { get mixinDatacom() {return cn(fn);} }), Zt(fn), fn.addInterceptor = S, fn.removeInterceptor = P, fn.interceptObject = b, d && "web" === g && (window.uniCloud = fn);})();var gn = fn;exports.default = gn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 340:
/*!********************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/pages.json?{"type":"origin-pages-json"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": [{ "path": "pages/home/home", "style": { "enablePullDownRefresh": true, "backgroundColor": "#F8F8F8" } }, { "path": "pages/my/my" }], "permission": { "scope.userLocation": { "desc": "小程序需要使用您的位置信息 已确认您的采样地址" } }, "subPackages": [{ "root": "subpkg", "pages": [{ "path": "epidemic/epidemic", "style": { "navigationBarTitleText": "疫情资讯" } }, { "path": "health/health", "style": { "navigationBarTitleText": "健康打卡" } }, { "path": "daka/daka", "style": { "navigationBarTitleText": "健康打卡" } }, { "path": "personalInfo/personalInfo", "style": { "navigationBarTitleText": "个人信息" } }, { "path": "login/login", "style": { "navigationBarTitleText": "登录" } }, { "path": "application/application", "style": { "navigationBarTitleText": "申请" } }, { "path": "applicationRecord/applicationRecord", "style": { "navigationBarTitleText": "申请记录" } }, { "path": "announcement/announcement" }, { "path": "noticePage/noticePage", "style": { "navigationBarTitleText": "疫情防控公告" } }, { "path": "epidemicInfo/epidemicInfo", "style": { "navigationBarTitleText": "疫情资讯" } }, { "path": "modifyPwd/modifyPwd", "style": { "navigationBarTitleText": "修改密码" } }, { "path": "applyDetail/applyDetail", "style": { "navigationBarTitleText": "申请记录详情" } }, { "path": "QRCode/QRCode", "style": { "navigationBarTitleText": "返校/外出二维码" } }] }, { "root": "subpkg_admin", "pages": [{ "path": "daily/daily", "style": { "navigationBarTitleText": "健康日报", "enablePullDownRefresh": true } }, { "path": "classesManage/classesManage", "style": { "navigationBarTitleText": "管理班级" } }, { "path": "examination/examination", "style": { "navigationBarTitleText": "申请审批" } }, { "path": "addEpidemicInfo/addEpidemicInfo", "style": { "navigationBarTitleText": "发布资讯" } }, { "path": "addNotice/addNotice", "style": { "navigationBarTitleText": "发布公告" } }, { "path": "userManage/userManage", "style": { "navigationBarTitleText": "用户管理" } }, { "path": "addUser/addUser", "style": { "navigationBarTitleText": "添加用户" } }, { "path": "searchUser/searchUser", "style": { "navigationBarTitleText": "搜索用户" } }, { "path": "schoolStructure/schoolStructure", "style": { "navigationBarTitleText": "学校结构" } }, { "path": "healthState/healthState", "style": { "navigationBarTitleText": "健康打卡情况" } }, { "path": "healthDetail/healthDetail", "style": { "navigationBarTitleText": "打卡情况详细报告" } }, { "path": "reviewRecord/reviewRecord", "style": { "navigationBarTitleText": "审批记录" } }] }], "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "校园疫情防控", "navigationBarBackgroundColor": "#ffffff", "backgroundColor": "#ffffff", "app-plus": { "background": "#efeff4" } }, "tabBar": { "selectedColor": "#4f8dff", "list": [{ "pagePath": "pages/home/home", "text": "首页", "iconPath": "static/tab_icons/home.png", "selectedIconPath": "static/tab_icons/home-active.png" }, { "pagePath": "pages/my/my", "text": "个人中心", "iconPath": "static/tab_icons/my.png", "selectedIconPath": "static/tab_icons/my-active.png" }] } };exports.default = _default;

/***/ }),

/***/ 341:
/*!*******************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/pages.json?{"type":"stat"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__07327AD" };exports.default = _default;

/***/ }),

/***/ 342:
/*!*************************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * uCharts (R)
 * 高性能跨平台图表库，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360/快手）、Vue、Taro等支持canvas的框架平台
 * Copyright (C) 2018-2022 QIUN (R) 秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 复制使用请保留本段注释，感谢支持开源！
 * 
 * uCharts (R) 官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */

Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}

var config = {
  version: 'v2.4.4-20221102',
  yAxisWidth: 15,
  xAxisHeight: 22,
  xAxisTextPadding: 3,
  padding: [10, 10, 10, 10],
  pixelRatio: 1,
  rotate: false,
  fontSize: 13,
  fontColor: '#666666',
  dataPointShape: ['circle', 'circle', 'circle', 'circle'],
  color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  linearColor: ['#0EE2F8', '#2BDCA8', '#FA7D8D', '#EB88E2', '#2AE3A0', '#0EE2F8', '#EB88E2', '#6773E3', '#F78A85'],
  pieChartLinePadding: 15,
  pieChartTextPadding: 5,
  titleFontSize: 20,
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 20,
  radarLabelTextMargin: 13 };


var assign = function assign(target) {for (var _len2 = arguments.length, varArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {varArgs[_key2 - 1] = arguments[_key2];}
  if (target == null) {
    throw new TypeError('[uCharts] Cannot convert undefined or null to object');
  }
  if (!varArgs || varArgs.length <= 0) {
    return target;
  }
  // 深度合并对象
  function deepAssign(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ?
      deepAssign(obj1[key], obj2[key]) : obj1[key] = obj2[key];
    }
    return obj1;
  }
  varArgs.forEach(function (val) {
    target = deepAssign(target, val);
  });
  return target;
};

var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;
    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }
    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;
    return !flag;
  } };


//兼容H5点击事件
function getH5Offset(e) {
  e.mp = {
    changedTouches: [] };

  e.mp.changedTouches.push({
    x: e.offsetX,
    y: e.offsetY });

  return e;
}

// hex 转 rgba
function hexToRgb(hexValue, opc) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opc + ')';
}

function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error('[uCharts] series数据需为Number格式');
  }
  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;
  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }
  if (type === 'upper') {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
    if (type === 'upper') {
      if (num == num + 1) {//修复数据值过大num++无效的bug by 向日葵 @xrk_jy
        break;
      }
      num++;
    } else {
      num--;
    }
  }
  return num / multiple;
}

function calCandleMA(dayArr, nameArr, colorArr, kdata) {
  var seriesTemp = [];
  for (var k = 0; k < dayArr.length; k++) {
    var seriesItem = {
      data: [],
      name: nameArr[k],
      color: colorArr[k] };

    for (var i = 0, len = kdata.length; i < len; i++) {
      if (i < dayArr[k]) {
        seriesItem.data.push(null);
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayArr[k]; j++) {
        sum += kdata[i - j][1];
      }
      seriesItem.data.push(+(sum / dayArr[k]).toFixed(3));
    }
    seriesTemp.push(seriesItem);
  }
  return seriesTemp;
}

function calValidDistance(self, distance, chartData, config, opts) {
  var dataChartAreaWidth = opts.width - opts.area[1] - opts.area[3];
  var dataChartWidth = chartData.eachSpacing * (opts.chartData.xAxisData.xAxisPoints.length - 1);
  if (opts.type == 'mount' && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
    if (opts.extra.mount.widthRatio > 2) opts.extra.mount.widthRatio = 2;
    dataChartWidth += (opts.extra.mount.widthRatio - 1) * chartData.eachSpacing;
  }
  var validDistance = distance;
  if (distance >= 0) {
    validDistance = 0;
    self.uevent.trigger('scrollLeft');
    self.scrollOption.position = 'left';
    opts.xAxis.scrollPosition = 'left';
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
    self.uevent.trigger('scrollRight');
    self.scrollOption.position = 'right';
    opts.xAxis.scrollPosition = 'right';
  } else {
    self.scrollOption.position = distance;
    opts.xAxis.scrollPosition = distance;
  }
  return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI) {
      angle -= 2 * Math.PI;
    }
    return angle;
  }
  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);
  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;
    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }
  return angle >= startAngle && angle <= endAngle;
}

function createCurveControlPoints(points, i) {
  function isNotMiddlePoint(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y,
      points[i + 1].y);
    } else {
      return false;
    }
  }
  function isNotMiddlePointX(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].x >= Math.max(points[i - 1].x, points[i + 1].x) || points[i].x <= Math.min(points[i - 1].x,
      points[i + 1].x);
    } else {
      return false;
    }
  }
  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }
  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }
  if (isNotMiddlePointX(points, i + 1)) {
    pBx = points[i + 1].x;
  }
  if (isNotMiddlePointX(points, i)) {
    pAx = points[i].x;
  }
  if (pAy >= Math.max(points[i].y, points[i + 1].y) || pAy <= Math.min(points[i].y, points[i + 1].y)) {
    pAy = points[i].y;
  }
  if (pBy >= Math.max(points[i].y, points[i + 1].y) || pBy <= Math.min(points[i].y, points[i + 1].y)) {
    pBy = points[i + 1].y;
  }
  if (pAx >= Math.max(points[i].x, points[i + 1].x) || pAx <= Math.min(points[i].x, points[i + 1].x)) {
    pAx = points[i].x;
  }
  if (pBx >= Math.max(points[i].x, points[i + 1].x) || pBx <= Math.min(points[i].x, points[i + 1].x)) {
    pBx = points[i + 1].x;
  }
  return {
    ctrA: {
      x: pAx,
      y: pAy },

    ctrB: {
      x: pBx,
      y: pBy } };


}


function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y };

}

function avoidCollision(obj, target) {
  if (target) {
    // is collision test
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }
  return obj;
}

function fixPieSeries(series, opts, config) {
  var pieSeriesArr = [];
  if (series.length > 0 && series[0].data.constructor.toString().indexOf('Array') > -1) {
    opts._pieSeries_ = series;
    var oldseries = series[0].data;
    for (var i = 0; i < oldseries.length; i++) {
      oldseries[i].formatter = series[0].formatter;
      oldseries[i].data = oldseries[i].value;
      pieSeriesArr.push(oldseries[i]);
    }
    opts.series = pieSeriesArr;
  } else {
    pieSeriesArr = series;
  }
  return pieSeriesArr;
}

function fillSeries(series, opts, config) {
  var index = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    if (!item.color) {
      item.color = config.color[index];
      index = (index + 1) % config.color.length;
    }
    if (!item.linearIndex) {
      item.linearIndex = i;
    }
    if (!item.index) {
      item.index = 0;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (typeof item.show == "undefined") {
      item.show = true;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (!item.pointShape) {
      item.pointShape = "circle";
    }
    if (!item.legendShape) {
      switch (item.type) {
        case 'line':
          item.legendShape = "line";
          break;
        case 'column':
        case 'bar':
          item.legendShape = "rect";
          break;
        case 'area':
        case 'mount':
          item.legendShape = "triangle";
          break;
        default:
          item.legendShape = "circle";}

    }
  }
  return series;
}

function fillCustomColor(linearType, customColor, series, config) {
  var newcolor = customColor || [];
  if (linearType == 'custom' && newcolor.length == 0) {
    newcolor = config.linearColor;
  }
  if (linearType == 'custom' && newcolor.length < series.length) {
    var chazhi = series.length - newcolor.length;
    for (var i = 0; i < chazhi; i++) {
      newcolor.push(config.linearColor[(i + 1) % config.linearColor.length]);
    }
  }
  return newcolor;
}

function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 10000) {
    limit = 1000;
  } else if (range >= 1000) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else if (range >= 0.01) {
    limit = 0.01;
  } else if (range >= 0.001) {
    limit = 0.001;
  } else if (range >= 0.0001) {
    limit = 0.0001;
  } else if (range >= 0.00001) {
    limit = 0.00001;
  } else {
    limit = 0.000001;
  }
  return {
    minRange: findRange(minData, 'lower', limit),
    maxRange: findRange(maxData, 'upper', limit) };

}

function measureText(text, fontSize, context) {
  var width = 0;
  text = String(text);



  if (context !== false && context !== undefined && context.setFontSize && context.measureText) {
    context.setFontSize(fontSize);
    return context.measureText(text).width;
  } else {
    var text = text.split('');
    for (var i = 0; i < text.length; i++) {
      var item = text[i];
      if (/[a-zA-Z]/.test(item)) {
        width += 7;
      } else if (/[0-9]/.test(item)) {
        width += 5.5;
      } else if (/\./.test(item)) {
        width += 2.7;
      } else if (/-/.test(item)) {
        width += 3.25;
      } else if (/:/.test(item)) {
        width += 2.5;
      } else if (/[\u4e00-\u9fa5]/.test(item)) {
        width += 10;
      } else if (/\(|\)/.test(item)) {
        width += 3.73;
      } else if (/\s/.test(item)) {
        width += 2.5;
      } else if (/%/.test(item)) {
        width += 8;
      } else {
        width += 10;
      }
    }
    return width * fontSize / 10;
  }
}

function dataCombine(series) {
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}

function dataCombineStack(series, len) {
  var sum = new Array(len);
  for (var j = 0; j < sum.length; j++) {
    sum[j] = 0;
  }
  for (var i = 0; i < series.length; i++) {
    for (var j = 0; j < sum.length; j++) {
      sum[j] += series[i].data[j];
    }
  }
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data).concat(sum);
  }, []);
}

function getTouches(touches, opts, e) {
  var x, y;
  if (touches.clientX) {
    if (opts.rotate) {
      y = opts.height - touches.clientX * opts.pix;
      x = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pix / 2 * (opts.pix - 1)) * opts.pix;
    } else {
      x = touches.clientX * opts.pix;
      y = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pix / 2 * (opts.pix - 1)) * opts.pix;
    }
  } else {
    if (opts.rotate) {
      y = opts.height - touches.x * opts.pix;
      x = touches.y * opts.pix;
    } else {
      x = touches.x * opts.pix;
      y = touches.y * opts.pix;
    }
  }
  return {
    x: x,
    y: y };

}

function getSeriesDataItem(series, index, group) {
  var data = [];
  var newSeries = [];
  var indexIsArr = index.constructor.toString().indexOf('Array') > -1;
  if (indexIsArr) {
    var tempSeries = filterSeries(series);
    for (var i = 0; i < group.length; i++) {
      newSeries.push(tempSeries[group[i]]);
    }
  } else {
    newSeries = series;
  };
  for (var _i = 0; _i < newSeries.length; _i++) {
    var item = newSeries[_i];
    var tmpindex = -1;
    if (indexIsArr) {
      tmpindex = index[_i];
    } else {
      tmpindex = index;
    }
    if (item.data[tmpindex] !== null && typeof item.data[tmpindex] !== 'undefined' && item.show) {
      var seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.type = item.type;
      seriesItem.style = item.style;
      seriesItem.pointShape = item.pointShape;
      seriesItem.disableLegend = item.disableLegend;
      seriesItem.name = item.name;
      seriesItem.show = item.show;
      seriesItem.data = item.formatter ? item.formatter(item.data[tmpindex]) : item.data[tmpindex];
      data.push(seriesItem);
    }
  }
  return data;
}

function getMaxTextListLength(list, fontSize, context) {
  var lengthList = list.map(function (item) {
    return measureText(item, fontSize, context);
  });
  return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];
  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }
  return CoordinateSeries.map(function (item) {
    return -1 * item + Math.PI / 2;
  });
}

function getToolTipData(seriesData, opts, index, group, categories) {
  var option = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var calPoints = opts.chartData.calPoints ? opts.chartData.calPoints : [];
  var points = {};
  if (group.length > 0) {
    var filterPoints = [];
    for (var i = 0; i < group.length; i++) {
      filterPoints.push(calPoints[group[i]]);
    }
    points = filterPoints[0][index[0]];
  } else {
    for (var _i2 = 0; _i2 < calPoints.length; _i2++) {
      if (calPoints[_i2][index]) {
        points = calPoints[_i2][index];
        break;
      }
    }
  };
  var textList = seriesData.map(function (item) {
    var titleText = null;
    if (opts.categories && opts.categories.length > 0) {
      titleText = categories[index];
    };
    return {
      text: option.formatter ? option.formatter(item, titleText, index, opts) : item.name + ': ' + item.data,
      color: item.color };

  });
  var offset = {
    x: Math.round(points.x),
    y: Math.round(points.y) };

  return {
    textList: textList,
    offset: offset };

}

function getMixToolTipData(seriesData, opts, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var points = opts.chartData.xAxisPoints[index] + opts.chartData.eachSpacing / 2;
  var textList = seriesData.map(function (item) {
    return {
      text: option.formatter ? option.formatter(item, categories[index], index, opts) : item.name + ': ' + item.data,
      color: item.color,
      disableLegend: item.disableLegend ? true : false };

  });
  textList = textList.filter(function (item) {
    if (item.disableLegend !== true) {
      return item;
    }
  });
  var offset = {
    x: Math.round(points),
    y: 0 };

  return {
    textList: textList,
    offset: offset };

}

function getCandleToolTipData(series, seriesData, opts, index, categories, extra) {
  var option = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var calPoints = opts.chartData.calPoints;
  var upColor = extra.color.upFill;
  var downColor = extra.color.downFill;
  //颜色顺序为开盘，收盘，最低，最高
  var color = [upColor, upColor, downColor, upColor];
  var textList = [];
  seriesData.map(function (item) {
    if (index == 0) {
      if (item.data[1] - item.data[0] < 0) {
        color[1] = downColor;
      } else {
        color[1] = upColor;
      }
    } else {
      if (item.data[0] < series[index - 1][1]) {
        color[0] = downColor;
      }
      if (item.data[1] < item.data[0]) {
        color[1] = downColor;
      }
      if (item.data[2] > series[index - 1][1]) {
        color[2] = upColor;
      }
      if (item.data[3] < series[index - 1][1]) {
        color[3] = downColor;
      }
    }
    var text1 = {
      text: '开盘：' + item.data[0],
      color: color[0] };

    var text2 = {
      text: '收盘：' + item.data[1],
      color: color[1] };

    var text3 = {
      text: '最低：' + item.data[2],
      color: color[2] };

    var text4 = {
      text: '最高：' + item.data[3],
      color: color[3] };

    textList.push(text1, text2, text3, text4);
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  offset.x = Math.round(validCalPoints[0][0].x);
  return {
    textList: textList,
    offset: offset };

}

function filterSeries(series) {
  var tempSeries = [];
  for (var i = 0; i < series.length; i++) {
    if (series[i].show == true) {
      tempSeries.push(series[i]);
    }
  }
  return tempSeries;
}

function findCurrentIndex(currentPoints, calPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var current = { index: -1, group: [] };
  var spacing = opts.chartData.eachSpacing / 2;
  var xAxisPoints = [];
  if (calPoints && calPoints.length > 0) {
    if (!opts.categories) {
      spacing = 0;
    } else {
      for (var i = 1; i < opts.chartData.xAxisPoints.length; i++) {
        xAxisPoints.push(opts.chartData.xAxisPoints[i] - spacing);
      }
      if ((opts.type == 'line' || opts.type == 'area') && opts.xAxis.boundaryGap == 'justify') {
        xAxisPoints = opts.chartData.xAxisPoints;
      }
    }
    if (isInExactChartArea(currentPoints, opts, config)) {
      if (!opts.categories) {
        var timePoints = Array(calPoints.length);
        for (var _i3 = 0; _i3 < calPoints.length; _i3++) {
          timePoints[_i3] = Array(calPoints[_i3].length);
          for (var j = 0; j < calPoints[_i3].length; j++) {
            timePoints[_i3][j] = Math.abs(calPoints[_i3][j].x - currentPoints.x);
          }
        };
        var pointValue = Array(timePoints.length);
        var pointIndex = Array(timePoints.length);
        for (var _i4 = 0; _i4 < timePoints.length; _i4++) {
          pointValue[_i4] = Math.min.apply(null, timePoints[_i4]);
          pointIndex[_i4] = timePoints[_i4].indexOf(pointValue[_i4]);
        }
        var minValue = Math.min.apply(null, pointValue);
        current.index = [];
        for (var _i5 = 0; _i5 < pointValue.length; _i5++) {
          if (pointValue[_i5] == minValue) {
            current.group.push(_i5);
            current.index.push(pointIndex[_i5]);
          }
        };
      } else {
        xAxisPoints.forEach(function (item, index) {
          if (currentPoints.x + offset + spacing > item) {
            current.index = index;
          }
        });
      }
    }
  }
  return current;
}

function findBarChartCurrentIndex(currentPoints, calPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var current = { index: -1, group: [] };
  var spacing = opts.chartData.eachSpacing / 2;
  var yAxisPoints = opts.chartData.yAxisPoints;
  if (calPoints && calPoints.length > 0) {
    if (isInExactChartArea(currentPoints, opts, config)) {
      yAxisPoints.forEach(function (item, index) {
        if (currentPoints.y + offset + spacing > item) {
          current.index = index;
        }
      });
    }
  }
  return current;
}

function findLegendIndex(currentPoints, legendData, opts) {
  var currentIndex = -1;
  var gap = 0;
  if (isInExactLegendArea(currentPoints, legendData.area)) {
    var points = legendData.points;
    var index = -1;
    for (var i = 0, len = points.length; i < len; i++) {
      var item = points[i];
      for (var j = 0; j < item.length; j++) {
        index += 1;
        var area = item[j]['area'];
        if (area && currentPoints.x > area[0] - gap && currentPoints.x < area[2] + gap && currentPoints.y > area[1] - gap && currentPoints.y < area[3] + gap) {
          currentIndex = index;
          break;
        }
      }
    }
    return currentIndex;
  }
  return currentIndex;
}

function isInExactLegendArea(currentPoints, area) {
  return currentPoints.x > area.start.x && currentPoints.x < area.end.x && currentPoints.y > area.start.y && currentPoints.y < area.end.y;
}

function isInExactChartArea(currentPoints, opts, config) {
  return currentPoints.x <= opts.width - opts.area[1] + 10 && currentPoints.x >= opts.area[3] - 10 && currentPoints.y >= opts.area[0] && currentPoints.y <= opts.height - opts.area[2];
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle(angle) {
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      }
      return angle;
    };
    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;
    if (angle < 0) {
      angle += 2 * Math.PI;
    }
    var angleList = radarData.angleList.map(function (item) {
      item = fixAngle(-1 * item);
      return item;
    });
    angleList.forEach(function (item, index) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);
      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }
      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd) {
        currentIndex = index;
      }
    });
  }
  return currentIndex;
}

function findFunnelChartCurrentIndex(currentPoints, funnelData) {
  var currentIndex = -1;
  for (var i = 0, len = funnelData.series.length; i < len; i++) {
    var item = funnelData.series[i];
    if (currentPoints.x > item.funnelArea[0] && currentPoints.x < item.funnelArea[2] && currentPoints.y > item.funnelArea[1] && currentPoints.y < item.funnelArea[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findWordChartCurrentIndex(currentPoints, wordData) {
  var currentIndex = -1;
  for (var i = 0, len = wordData.length; i < len; i++) {
    var item = wordData[i];
    if (currentPoints.x > item.area[0] && currentPoints.x < item.area[2] && currentPoints.y > item.area[1] && currentPoints.y < item.area[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findMapChartCurrentIndex(currentPoints, opts) {
  var currentIndex = -1;
  var cData = opts.chartData.mapData;
  var data = opts.series;
  var tmp = pointToCoordinate(currentPoints.y, currentPoints.x, cData.bounds, cData.scale, cData.xoffset, cData.yoffset);
  var poi = [tmp.x, tmp.y];
  for (var i = 0, len = data.length; i < len; i++) {
    var item = data[i].geometry.coordinates;
    if (isPoiWithinPoly(poi, item, opts.chartData.mapData.mercator)) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findRoseChartCurrentIndex(currentPoints, pieData, opts) {
  var currentIndex = -1;
  var series = getRoseDataPoints(opts._series_, opts.extra.rose.type, pieData.radius, pieData.radius);
  if (pieData && pieData.center && isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    if (opts.extra.rose && opts.extra.rose.offsetAngle) {
      angle = angle - opts.extra.rose.offsetAngle * Math.PI / 180;
    }
    for (var i = 0, len = series.length; i < len; i++) {
      if (isInAngleRange(angle, series[i]._start_, series[i]._start_ + series[i]._rose_proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }
  return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData, opts) {
  var currentIndex = -1;
  var series = getPieDataPoints(pieData.series);
  if (pieData && pieData.center && isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    if (opts.extra.pie && opts.extra.pie.offsetAngle) {
      angle = angle - opts.extra.pie.offsetAngle * Math.PI / 180;
    }
    if (opts.extra.ring && opts.extra.ring.offsetAngle) {
      angle = angle - opts.extra.ring.offsetAngle * Math.PI / 180;
    }
    for (var i = 0, len = series.length; i < len; i++) {
      if (isInAngleRange(angle, series[i]._start_, series[i]._start_ + series[i]._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }
  return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}


function splitPoints(points, eachSeries) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
    if (eachSeries.connectNulls) {
      if (item !== null) {
        items.push(item);
      }
    } else {
      if (item !== null) {
        items.push(item);
      } else {
        if (items.length) {
          newPoints.push(items);
        }
        items = [];
      }
    }

  });
  if (items.length) {
    newPoints.push(items);
  }
  return newPoints;
}


function calLegendData(series, opts, config, chartData, context) {
  var legendData = {
    area: {
      start: {
        x: 0,
        y: 0 },

      end: {
        x: 0,
        y: 0 },

      width: 0,
      height: 0,
      wholeWidth: 0,
      wholeHeight: 0 },

    points: [],
    widthArr: [],
    heightArr: [] };

  if (opts.legend.show === false) {
    chartData.legendData = legendData;
    return legendData;
  }
  var padding = opts.legend.padding * opts.pix;
  var margin = opts.legend.margin * opts.pix;
  var fontSize = opts.legend.fontSize ? opts.legend.fontSize * opts.pix : config.fontSize;
  var shapeWidth = 15 * opts.pix;
  var shapeRight = 5 * opts.pix;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pix, fontSize);
  if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
    var legendList = [];
    var widthCount = 0;
    var widthCountArr = [];
    var currentRow = [];
    for (var i = 0; i < series.length; i++) {
      var item = series[i];
      var legendText = item.legendText ? item.legendText : item.name;
      var itemWidth = shapeWidth + shapeRight + measureText(legendText || 'undefined', fontSize, context) + opts.legend.itemGap * opts.pix;
      if (widthCount + itemWidth > opts.width - opts.area[1] - opts.area[3]) {
        legendList.push(currentRow);
        widthCountArr.push(widthCount - opts.legend.itemGap * opts.pix);
        widthCount = itemWidth;
        currentRow = [item];
      } else {
        widthCount += itemWidth;
        currentRow.push(item);
      }
    }
    if (currentRow.length) {
      legendList.push(currentRow);
      widthCountArr.push(widthCount - opts.legend.itemGap * opts.pix);
      legendData.widthArr = widthCountArr;
      var legendWidth = Math.max.apply(null, widthCountArr);
      switch (opts.legend.float) {
        case 'left':
          legendData.area.start.x = opts.area[3];
          legendData.area.end.x = opts.area[3] + legendWidth + 2 * padding;
          break;
        case 'right':
          legendData.area.start.x = opts.width - opts.area[1] - legendWidth - 2 * padding;
          legendData.area.end.x = opts.width - opts.area[1];
          break;
        default:
          legendData.area.start.x = (opts.width - legendWidth) / 2 - padding;
          legendData.area.end.x = (opts.width + legendWidth) / 2 + padding;}

      legendData.area.width = legendWidth + 2 * padding;
      legendData.area.wholeWidth = legendWidth + 2 * padding;
      legendData.area.height = legendList.length * lineHeight + 2 * padding;
      legendData.area.wholeHeight = legendList.length * lineHeight + 2 * padding + 2 * margin;
      legendData.points = legendList;
    }
  } else {
    var len = series.length;
    var maxHeight = opts.height - opts.area[0] - opts.area[2] - 2 * margin - 2 * padding;
    var maxLength = Math.min(Math.floor(maxHeight / lineHeight), len);
    legendData.area.height = maxLength * lineHeight + padding * 2;
    legendData.area.wholeHeight = maxLength * lineHeight + padding * 2;
    switch (opts.legend.float) {
      case 'top':
        legendData.area.start.y = opts.area[0] + margin;
        legendData.area.end.y = opts.area[0] + margin + legendData.area.height;
        break;
      case 'bottom':
        legendData.area.start.y = opts.height - opts.area[2] - margin - legendData.area.height;
        legendData.area.end.y = opts.height - opts.area[2] - margin;
        break;
      default:
        legendData.area.start.y = (opts.height - legendData.area.height) / 2;
        legendData.area.end.y = (opts.height + legendData.area.height) / 2;}

    var lineNum = len % maxLength === 0 ? len / maxLength : Math.floor(len / maxLength + 1);
    var _currentRow = [];
    for (var _i6 = 0; _i6 < lineNum; _i6++) {
      var temp = series.slice(_i6 * maxLength, _i6 * maxLength + maxLength);
      _currentRow.push(temp);
    }
    legendData.points = _currentRow;
    if (_currentRow.length) {
      for (var _i7 = 0; _i7 < _currentRow.length; _i7++) {
        var _item = _currentRow[_i7];
        var maxWidth = 0;
        for (var j = 0; j < _item.length; j++) {
          var _itemWidth = shapeWidth + shapeRight + measureText(_item[j].name || 'undefined', fontSize, context) + opts.legend.itemGap * opts.pix;
          if (_itemWidth > maxWidth) {
            maxWidth = _itemWidth;
          }
        }
        legendData.widthArr.push(maxWidth);
        legendData.heightArr.push(_item.length * lineHeight + padding * 2);
      }
      var _legendWidth = 0;
      for (var _i8 = 0; _i8 < legendData.widthArr.length; _i8++) {
        _legendWidth += legendData.widthArr[_i8];
      }
      legendData.area.width = _legendWidth - opts.legend.itemGap * opts.pix + 2 * padding;
      legendData.area.wholeWidth = legendData.area.width + padding;
    }
  }
  switch (opts.legend.position) {
    case 'top':
      legendData.area.start.y = opts.area[0] + margin;
      legendData.area.end.y = opts.area[0] + margin + legendData.area.height;
      break;
    case 'bottom':
      legendData.area.start.y = opts.height - opts.area[2] - legendData.area.height - margin;
      legendData.area.end.y = opts.height - opts.area[2] - margin;
      break;
    case 'left':
      legendData.area.start.x = opts.area[3];
      legendData.area.end.x = opts.area[3] + legendData.area.width;
      break;
    case 'right':
      legendData.area.start.x = opts.width - opts.area[1] - legendData.area.width;
      legendData.area.end.x = opts.width - opts.area[1];
      break;}

  chartData.legendData = legendData;
  return legendData;
}

function calCategoriesData(categories, opts, config, eachSpacing, context) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };

  var fontSize = opts.xAxis.fontSize * opts.pix || config.fontSize;
  var categoriesTextLenth = categories.map(function (item, index) {
    var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(item, index, opts) : item;
    return measureText(String(xitem), fontSize, context);
  });

  var maxTextLength = Math.max.apply(this, categoriesTextLenth);
  if (opts.xAxis.rotateLabel == true) {
    result.angle = opts.xAxis.rotateAngle * Math.PI / 180;
    var tempHeight = 2 * config.xAxisTextPadding + Math.abs(maxTextLength * Math.sin(result.angle));
    tempHeight = tempHeight < fontSize + 2 * config.xAxisTextPadding ? tempHeight + 2 * config.xAxisTextPadding : tempHeight;
    if (opts.enableScroll == true && opts.xAxis.scrollShow == true) {
      tempHeight += 12 * opts.pix;
    }
    result.xAxisHeight = tempHeight;
  }
  if (opts.xAxis.disabled) {
    result.xAxisHeight = 0;
  }
  return result;
}

function getXAxisTextList(series, opts, config, stack) {
  var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
  var data;
  if (stack == 'stack') {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      if (item.constructor.toString().indexOf('Array') > -1) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function (item) {
    if (typeof item === 'object') {
      if (item.constructor.toString().indexOf('Array') > -1) {
        if (opts.type == 'candle') {
          item.map(function (subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[0]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });

  var minData = 0;
  var maxData = 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  //为了兼容v1.9.0之前的项目
  if (index > -1) {
    if (typeof opts.xAxis.data[index].min === 'number') {
      minData = Math.min(opts.xAxis.data[index].min, minData);
    }
    if (typeof opts.xAxis.data[index].max === 'number') {
      maxData = Math.max(opts.xAxis.data[index].max, maxData);
    }
  } else {
    if (typeof opts.xAxis.min === 'number') {
      minData = Math.min(opts.xAxis.min, minData);
    }
    if (typeof opts.xAxis.max === 'number') {
      maxData = Math.max(opts.xAxis.max, maxData);
    }
  }
  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    maxData += rangeSpan;
  }
  //var dataRange = getDataRange(minData, maxData);
  var minRange = minData;
  var maxRange = maxData;
  var range = [];
  var eachRange = (maxRange - minRange) / opts.xAxis.splitNumber;
  for (var i = 0; i <= opts.xAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range;
}

function calXAxisData(series, opts, config, context) {
  //堆叠图重算Y轴
  var columnstyle = assign({}, {
    type: "" },
  opts.extra.bar);
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };

  result.ranges = getXAxisTextList(series, opts, config, columnstyle.type);
  result.rangesFormat = result.ranges.map(function (item) {
    //item = opts.xAxis.formatter ? opts.xAxis.formatter(item) : util.toFixed(item, 2);
    item = util.toFixed(item, 2);
    return item;
  });
  var xAxisScaleValues = result.ranges.map(function (item) {
    // 如果刻度值是浮点数,则保留两位小数
    item = util.toFixed(item, 2);
    // 若有自定义格式则调用自定义的格式化函数
    //item = opts.xAxis.formatter ? opts.xAxis.formatter(Number(item)) : item;
    return item;
  });
  result = Object.assign(result, getXAxisPoints(xAxisScaleValues, opts, config));
  // 计算X轴刻度的属性譬如每个刻度的间隔,刻度的起始点\结束点以及总长
  var eachSpacing = result.eachSpacing;
  var textLength = xAxisScaleValues.map(function (item) {
    return measureText(item, opts.xAxis.fontSize * opts.pix || config.fontSize, context);
  });
  // get max length of categories text
  var maxTextLength = Math.max.apply(this, textLength);
  // 如果刻度值文本内容过长,则将其逆时针旋转45°
  if (maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }
  if (opts.xAxis.disabled === true) {
    result.xAxisHeight = 0;
  }
  return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));
  var data = [];var _loop2 = function _loop2(
  i) {
    var each = series[i];
    var listItem = {};
    listItem.color = each.color;
    listItem.legendShape = each.legendShape;
    listItem.pointShape = each.pointShape;
    listItem.data = [];
    each.data.forEach(function (item, index) {
      var tmp = {};
      tmp.angle = angleList[index];
      tmp.proportion = item / maxData;
      tmp.value = item;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });
    data.push(listItem);};for (var i = 0; i < series.length; i++) {_loop2(i);
  }
  return data;
}

function getPieDataPoints(series, radius) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var count = 0;
  var _start_ = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  }
  for (var _i9 = 0; _i9 < series.length; _i9++) {
    var _item2 = series[_i9];
    _item2.data = _item2.data === null ? 0 : _item2.data;
    if (count === 0) {
      _item2._proportion_ = 1 / series.length * process;
    } else {
      _item2._proportion_ = _item2.data / count * process;
    }
    _item2._radius_ = radius;
  }
  for (var _i10 = 0; _i10 < series.length; _i10++) {
    var _item3 = series[_i10];
    _item3._start_ = _start_;
    _start_ += 2 * _item3._proportion_ * Math.PI;
  }
  return series;
}

function getFunnelDataPoints(series, radius, option, eachSpacing) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  for (var i = 0; i < series.length; i++) {
    if (option.type == 'funnel') {
      series[i].radius = series[i].data / series[0].data * radius * process;
    } else {
      series[i].radius = eachSpacing * (series.length - i) / (eachSpacing * series.length) * radius * process;
    }
    series[i]._proportion_ = series[i].data / series[0].data;
  }
  // if(option.type !== 'pyramid'){
  //   series.reverse();
  // }
  return series;
}

function getRoseDataPoints(series, type, minRadius, radius) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var count = 0;
  var _start_ = 0;
  var dataArr = [];
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
    dataArr.push(item.data);
  }
  var minData = Math.min.apply(null, dataArr);
  var maxData = Math.max.apply(null, dataArr);
  var radiusLength = radius - minRadius;
  for (var _i11 = 0; _i11 < series.length; _i11++) {
    var _item4 = series[_i11];
    _item4.data = _item4.data === null ? 0 : _item4.data;
    if (count === 0) {
      _item4._proportion_ = 1 / series.length * process;
      _item4._rose_proportion_ = 1 / series.length * process;
    } else {
      _item4._proportion_ = _item4.data / count * process;
      if (type == 'area') {
        _item4._rose_proportion_ = 1 / series.length * process;
      } else {
        _item4._rose_proportion_ = _item4.data / count * process;
      }
    }
    _item4._radius_ = minRadius + radiusLength * ((_item4.data - minData) / (maxData - minData)) || radius;
  }
  for (var _i12 = 0; _i12 < series.length; _i12++) {
    var _item5 = series[_i12];
    _item5._start_ = _start_;
    _start_ += 2 * _item5._rose_proportion_ * Math.PI;
  }
  return series;
}

function getArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    var totalAngle = void 0;
    if (arcbarOption.type == 'circle') {
      totalAngle = 2;
    } else {
      if (arcbarOption.direction == 'ccw') {
        if (arcbarOption.startAngle < arcbarOption.endAngle) {
          totalAngle = 2 + arcbarOption.startAngle - arcbarOption.endAngle;
        } else {
          totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
        }
      } else {
        if (arcbarOption.endAngle < arcbarOption.startAngle) {
          totalAngle = 2 + arcbarOption.endAngle - arcbarOption.startAngle;
        } else {
          totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
        }
      }
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (arcbarOption.direction == 'ccw') {
      item._proportion_ = arcbarOption.startAngle - totalAngle * item.data * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getGaugeArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    var totalAngle = void 0;
    if (arcbarOption.type == 'circle') {
      totalAngle = 2;
    } else {
      if (arcbarOption.endAngle < arcbarOption.startAngle) {
        totalAngle = 2 + arcbarOption.endAngle - arcbarOption.startAngle;
      } else {
        totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
      }
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getGaugeAxisPoints(categories, startAngle, endAngle) {
  var totalAngle = startAngle - endAngle + 1;
  var tempStartAngle = startAngle;
  for (var i = 0; i < categories.length; i++) {
    categories[i].value = categories[i].value === null ? 0 : categories[i].value;
    categories[i]._startAngle_ = tempStartAngle;
    categories[i]._endAngle_ = totalAngle * categories[i].value + startAngle;
    if (categories[i]._endAngle_ >= 2) {
      categories[i]._endAngle_ = categories[i]._endAngle_ % 2;
    }
    tempStartAngle = categories[i]._endAngle_;
  }
  return categories;
}

function getGaugeDataPoints(series, categories, gaugeOption) {
  var process = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    if (gaugeOption.pointer.color == 'auto') {
      for (var _i13 = 0; _i13 < categories.length; _i13++) {
        if (item.data <= categories[_i13].value) {
          item.color = categories[_i13].color;
          break;
        }
      }
    } else {
      item.color = gaugeOption.pointer.color;
    }
    var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    item._endAngle_ = totalAngle * item.data + gaugeOption.startAngle;
    item._oldAngle_ = gaugeOption.oldAngle;
    if (gaugeOption.oldAngle < gaugeOption.endAngle) {
      item._oldAngle_ += 2;
    }
    if (item.data >= gaugeOption.oldData) {
      item._proportion_ = (item._endAngle_ - item._oldAngle_) * process + gaugeOption.oldAngle;
    } else {
      item._proportion_ = item._oldAngle_ - (item._oldAngle_ - item._endAngle_) * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getPieTextMaxLength(series, config, context, opts) {
  series = getPieDataPoints(series);
  var maxLength = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var text = item.formatter ? item.formatter(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    maxLength = Math.max(maxLength, measureText(text, item.textSize * opts.pix || config.fontSize, context));
  }
  return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    var seriesGap = 0;
    var categoryGap = 0;
    if (opts.type == 'mix') {
      seriesGap = opts.extra.mix.column.seriesGap * opts.pix || 0;
      categoryGap = opts.extra.mix.column.categoryGap * opts.pix || 0;
    } else {
      seriesGap = opts.extra.column.seriesGap * opts.pix || 0;
      categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
    }
    seriesGap = Math.min(seriesGap, eachSpacing / columnLen);
    categoryGap = Math.min(categoryGap, eachSpacing / columnLen);
    item.width = Math.ceil((eachSpacing - 2 * categoryGap - seriesGap * (columnLen - 1)) / columnLen);
    if (opts.extra.mix && opts.extra.mix.column.width && +opts.extra.mix.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.mix.column.width * opts.pix);
    }
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.x += (index + 0.5 - columnLen / 2) * (item.width + seriesGap);
    return item;
  });
}

function fixBarData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    var seriesGap = 0;
    var categoryGap = 0;
    seriesGap = opts.extra.bar.seriesGap * opts.pix || 0;
    categoryGap = opts.extra.bar.categoryGap * opts.pix || 0;
    seriesGap = Math.min(seriesGap, eachSpacing / columnLen);
    categoryGap = Math.min(categoryGap, eachSpacing / columnLen);
    item.width = Math.ceil((eachSpacing - 2 * categoryGap - seriesGap * (columnLen - 1)) / columnLen);
    if (opts.extra.bar && opts.extra.bar.width && +opts.extra.bar.width > 0) {
      item.width = Math.min(item.width, +opts.extra.bar.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.y += (index + 0.5 - columnLen / 2) * (item.width + seriesGap);
    return item;
  });
}

function fixColumeMeterData(points, eachSpacing, columnLen, index, config, opts, border) {
  var categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = eachSpacing - 2 * categoryGap;
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (index > 0) {
      item.width -= border;
    }
    return item;
  });
}

function fixColumeStackData(points, eachSpacing, columnLen, index, config, opts, series) {
  var categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
  return points.map(function (item, indexn) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil(eachSpacing - 2 * categoryGap);
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    return item;
  });
}

function fixBarStackData(points, eachSpacing, columnLen, index, config, opts, series) {
  var categoryGap = opts.extra.bar.categoryGap * opts.pix || 0;
  return points.map(function (item, indexn) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil(eachSpacing - 2 * categoryGap);
    if (opts.extra.bar && opts.extra.bar.width && +opts.extra.bar.width > 0) {
      item.width = Math.min(item.width, +opts.extra.bar.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    return item;
  });
}

function getXAxisPoints(categories, opts, config) {
  var spacingValid = opts.width - opts.area[1] - opts.area[3];
  var dataCount = opts.enableScroll ? Math.min(opts.xAxis.itemCount, categories.length) : categories.length;
  if ((opts.type == 'line' || opts.type == 'area' || opts.type == 'scatter' || opts.type == 'bubble' || opts.type == 'bar') && dataCount > 1 && opts.xAxis.boundaryGap == 'justify') {
    dataCount -= 1;
  }
  var widthRatio = 0;
  if (opts.type == 'mount' && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
    if (opts.extra.mount.widthRatio > 2) opts.extra.mount.widthRatio = 2;
    widthRatio = opts.extra.mount.widthRatio - 1;
    dataCount += widthRatio;
  }
  var eachSpacing = spacingValid / dataCount;
  var xAxisPoints = [];
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  categories.forEach(function (item, index) {
    xAxisPoints.push(startX + widthRatio / 2 * eachSpacing + index * eachSpacing);
  });
  if (opts.xAxis.boundaryGap !== 'justify') {
    if (opts.enableScroll === true) {
      xAxisPoints.push(startX + widthRatio * eachSpacing + categories.length * eachSpacing);
    } else {
      xAxisPoints.push(endX);
    }
  }
  return {
    xAxisPoints: xAxisPoints,
    startX: startX,
    endX: endX,
    eachSpacing: eachSpacing };

}

function getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var cPoints = [];
      item.forEach(function (items, indexs) {
        var point = {};
        point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
        var value = items.value || items;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        height *= process;
        point.y = opts.height - Math.round(height) - opts.area[2];
        cPoints.push(point);
      });
      points.push(cPoints);
    }
  });
  return points;
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var boundaryGap = 'center';
  if (opts.type == 'line' || opts.type == 'area' || opts.type == 'scatter' || opts.type == 'bubble') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index];
      var value = item;
      if (typeof item === 'object' && item !== null) {
        if (item.constructor.toString().indexOf('Array') > -1) {
          var xranges, xminRange, xmaxRange;
          xranges = [].concat(opts.chartData.xAxisData.ranges);
          xminRange = xranges.shift();
          xmaxRange = xranges.pop();
          value = item[1];
          point.x = opts.area[3] + validWidth * (item[0] - xminRange) / (xmaxRange - xminRange);
          if (opts.type == 'bubble') {
            point.r = item[2];
            point.t = item[3];
          }
        } else {
          value = item.value;
        }
      }
      if (boundaryGap == 'center') {
        point.x += eachSpacing / 2;
      }
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - height - opts.area[2];
      points.push(point);
    }
  });
  return points;
}

function getMountDataPoints(series, minRange, maxRange, xAxisPoints, eachSpacing, opts, mountOption) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  var mountWidth = eachSpacing * mountOption.widthRatio;
  series.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index];
      point.x += eachSpacing / 2;
      var value = item.data;
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - height - opts.area[2];
      point.value = value;
      point.width = mountWidth;
      points.push(point);
    }
  });
  return points;
}

function getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.y = yAxisPoints[index];
      var value = item;
      if (typeof item === 'object' && item !== null) {
        value = item.value;
      }
      var height = validWidth * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.height = height;
      point.value = value;
      point.x = height + opts.area[3];
      points.push(point);
    }
  });
  return points;
}

function getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);

      if (seriesIndex > 0) {
        var value = 0;
        for (var i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        if (typeof item === 'object' && item !== null) {
          value = item.value;
        }
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.y = opts.height - Math.round(height) - opts.area[2];
      point.y0 = opts.height - Math.round(heightc) - opts.area[2];
      points.push(point);
    }
  });
  return points;
}

function getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.y = yAxisPoints[index];
      if (seriesIndex > 0) {
        var value = 0;
        for (var i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        if (typeof item === 'object' && item !== null) {
          value = item.value;
        }
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.height = height - heightc;
      point.x = opts.area[3] + height;
      point.x0 = opts.area[3] + heightc;
      points.push(point);
    }
  });
  return points;
}

function getYAxisTextList(series, opts, config, stack, yData) {
  var index = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
  var data;
  if (stack == 'stack') {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      if (item.constructor.toString().indexOf('Array') > -1) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function (item) {
    if (typeof item === 'object') {
      if (item.constructor.toString().indexOf('Array') > -1) {
        if (opts.type == 'candle') {
          item.map(function (subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[1]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });
  var minData = yData.min || 0;
  var maxData = yData.max || 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  if (minData === maxData) {
    if (maxData == 0) {
      maxData = 10;
    } else {
      minData = 0;
    }
  }
  var dataRange = getDataRange(minData, maxData);
  var minRange = yData.min === undefined || yData.min === null ? dataRange.minRange : yData.min;
  var maxRange = yData.max === undefined || yData.max === null ? dataRange.maxRange : yData.max;
  var eachRange = (maxRange - minRange) / opts.yAxis.splitNumber;
  var range = [];
  for (var i = 0; i <= opts.yAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range.reverse();
}

function calYAxisData(series, opts, config, context) {
  //堆叠图重算Y轴
  var columnstyle = assign({}, {
    type: "" },
  opts.extra.column);
  //如果是多Y轴，重新计算
  var YLength = opts.yAxis.data.length;
  var newSeries = new Array(YLength);
  if (YLength > 0) {
    for (var i = 0; i < YLength; i++) {
      newSeries[i] = [];
      for (var j = 0; j < series.length; j++) {
        if (series[j].index == i) {
          newSeries[i].push(series[j]);
        }
      }
    }
    var rangesArr = new Array(YLength);
    var rangesFormatArr = new Array(YLength);
    var yAxisWidthArr = new Array(YLength);var _loop3 = function _loop3(

    _i14) {
      var yData = opts.yAxis.data[_i14];
      //如果总开关不显示，强制每个Y轴为不显示
      if (opts.yAxis.disabled == true) {
        yData.disabled = true;
      }
      if (yData.type === 'categories') {
        if (!yData.formatter) {
          yData.formatter = function (val, index, opts) {return val + (yData.unit || '');};
        }
        yData.categories = yData.categories || opts.categories;
        rangesArr[_i14] = yData.categories;
      } else {
        if (!yData.formatter) {
          yData.formatter = function (val, index, opts) {return util.toFixed(val, yData.tofix || 0) + (yData.unit || '');};
        }
        rangesArr[_i14] = getYAxisTextList(newSeries[_i14], opts, config, columnstyle.type, yData, _i14);
      }
      var yAxisFontSizes = yData.fontSize * opts.pix || config.fontSize;
      yAxisWidthArr[_i14] = {
        position: yData.position ? yData.position : 'left',
        width: 0 };

      rangesFormatArr[_i14] = rangesArr[_i14].map(function (items, index) {
        items = yData.formatter(items, index, opts);
        yAxisWidthArr[_i14].width = Math.max(yAxisWidthArr[_i14].width, measureText(items, yAxisFontSizes, context) + 5);
        return items;
      });
      var calibration = yData.calibration ? 4 * opts.pix : 0;
      yAxisWidthArr[_i14].width += calibration + 3 * opts.pix;
      if (yData.disabled === true) {
        yAxisWidthArr[_i14].width = 0;
      }};for (var _i14 = 0; _i14 < YLength; _i14++) {_loop3(_i14);
    }
  } else {
    var rangesArr = new Array(1);
    var rangesFormatArr = new Array(1);
    var yAxisWidthArr = new Array(1);
    if (opts.type === 'bar') {
      rangesArr[0] = opts.categories;
    } else {
      rangesArr[0] = getYAxisTextList(series, opts, config, columnstyle.type, {});
    }
    yAxisWidthArr[0] = {
      position: 'left',
      width: 0 };


    if (opts.yAxis.disabled === true) {
      yAxisWidthArr[0] = {
        position: 'left',
        width: 0 };

      opts.yAxis.data[0] = {
        disabled: true };

    } else {
      opts.yAxis.data[0] = {
        disabled: false,
        position: 'left',
        max: opts.yAxis.max,
        min: opts.yAxis.min,
        formatter: function formatter(val, index, opts) {return val;} };

      if (opts.type === 'bar') {
        opts.yAxis.data[0].categories = opts.categories;
        opts.yAxis.data[0].type = 'categories';
      }
    }
    var yAxisFontSize = opts.yAxis.fontSize * opts.pix || config.fontSize;
    rangesFormatArr[0] = rangesArr[0].map(function (item, index) {
      item = opts.yAxis.data[0].formatter(item, index, opts);
      yAxisWidthArr[0].width = Math.max(yAxisWidthArr[0].width, measureText(item, yAxisFontSize, context) + 5);
      return item;
    });
    yAxisWidthArr[0].width += 3 * opts.pix;
  }
  return {
    rangesFormat: rangesFormatArr,
    ranges: rangesArr,
    yAxisWidth: yAxisWidthArr };

}

function calTooltipYAxisData(point, series, opts, config, eachSpacing) {
  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var minAxis = opts.area[0];
  var items = [];
  for (var i = 0; i < ranges.length; i++) {
    var maxVal = Math.max.apply(this, ranges[i]);
    var minVal = Math.min.apply(this, ranges[i]);
    var item = maxVal - (maxVal - minVal) * (point - minAxis) / spacingValid;
    item = opts.yAxis.data && opts.yAxis.data[i].formatter ? opts.yAxis.data[i].formatter(item, i, opts) : item.toFixed(0);
    items.push(String(item));
  }
  return items;
}

function calMarkLineData(points, opts) {
  var minRange, maxRange;
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  for (var i = 0; i < points.length; i++) {
    points[i].yAxisIndex = points[i].yAxisIndex ? points[i].yAxisIndex : 0;
    var range = [].concat(opts.chartData.yAxisData.ranges[points[i].yAxisIndex]);
    minRange = range.pop();
    maxRange = range.shift();
    var height = spacingValid * (points[i].value - minRange) / (maxRange - minRange);
    points[i].y = opts.height - Math.round(height) - opts.area[2];
  }
  return points;
}

function contextRotate(context, opts) {
  if (opts.rotateLock !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
  } else if (opts._rotate_ !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
    opts._rotate_ = true;
  }
}

function drawPointShape(points, color, shape, context, opts) {
  context.beginPath();
  if (opts.dataPointShapeType == 'hollow') {
    context.setStrokeStyle(color);
    context.setFillStyle(opts.background);
    context.setLineWidth(2 * opts.pix);
  } else {
    context.setStrokeStyle("#ffffff");
    context.setFillStyle(color);
    context.setLineWidth(1 * opts.pix);
  }
  if (shape === 'diamond') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'circle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x + 2.5 * opts.pix, item.y);
        context.arc(item.x, item.y, 3 * opts.pix, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === 'square') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === 'triangle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'none') {
    return;
  }
  context.closePath();
  context.fill();
  context.stroke();
}

function drawRingTitle(opts, config, context, center) {
  var titlefontSize = opts.title.fontSize || config.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
  var title = opts.title.name || '';
  var subtitle = opts.subtitle.name || '';
  var titleFontColor = opts.title.color || opts.fontColor;
  var subtitleFontColor = opts.subtitle.color || opts.fontColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;
  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize * opts.pix, context);
    var startX = center.x - textWidth / 2 + (opts.subtitle.offsetX || 0) * opts.pix;
    var startY = center.y + subtitlefontSize * opts.pix / 2 + (opts.subtitle.offsetY || 0) * opts.pix;
    if (title) {
      startY += (titleHeight * opts.pix + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(subtitlefontSize * opts.pix);
    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.closePath();
    context.stroke();
  }
  if (title) {
    var _textWidth = measureText(title, titlefontSize * opts.pix, context);
    var _startX = center.x - _textWidth / 2 + (opts.title.offsetX || 0);
    var _startY = center.y + titlefontSize * opts.pix / 2 + (opts.title.offsetY || 0) * opts.pix;
    if (subtitle) {
      _startY -= (subtitleHeight * opts.pix + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(titlefontSize * opts.pix);
    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.closePath();
    context.stroke();
  }
}

function drawPointText(points, series, config, context, opts) {
  // 绘制数据文案
  var data = series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  points.forEach(function (item, index) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series.textSize ? series.textSize * opts.pix : config.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series.textColor || opts.fontColor);
      var value = data[index];
      if (typeof data[index] === 'object' && data[index] !== null) {
        if (data[index].constructor.toString().indexOf('Array') > -1) {
          value = data[index][1];
        } else {
          value = data[index].value;
        }
      }
      var formatVal = series.formatter ? series.formatter(value, index, series, opts) : value;
      context.setTextAlign('center');
      context.fillText(String(formatVal), item.x, item.y - 4 + textOffset * opts.pix);
      context.closePath();
      context.stroke();
      context.setTextAlign('left');
    }
  });
}

function drawMountPointText(points, series, config, context, opts) {
  // 绘制数据文案
  var data = series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  points.forEach(function (item, index) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series[index].textSize ? series[index].textSize * opts.pix : config.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series[index].textColor || opts.fontColor);
      var value = item.value;
      var formatVal = series[index].formatter ? series[index].formatter(value, index, series, opts) : value;
      context.setTextAlign('center');
      context.fillText(String(formatVal), item.x, item.y - 4 + textOffset * opts.pix);
      context.closePath();
      context.stroke();
      context.setTextAlign('left');
    }
  });
}

function drawBarPointText(points, series, config, context, opts) {
  // 绘制数据文案
  var data = series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  points.forEach(function (item, index) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series.textSize ? series.textSize * opts.pix : config.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series.textColor || opts.fontColor);
      var value = data[index];
      if (typeof data[index] === 'object' && data[index] !== null) {
        value = data[index].value;
      }
      var formatVal = series.formatter ? series.formatter(value, index, series, opts) : value;
      context.setTextAlign('left');
      context.fillText(String(formatVal), item.x + 4 * opts.pix, item.y + fontSize / 2 - 3);
      context.closePath();
      context.stroke();
    }
  });
}

function drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context) {
  radius -= gaugeOption.width / 2 + gaugeOption.labelOffset * opts.pix;
  radius = radius < 10 ? 10 : radius;
  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var totalNumber = gaugeOption.endNumber - gaugeOption.startNumber;
  var splitNumber = totalNumber / gaugeOption.splitLine.splitNumber;
  var nowAngle = gaugeOption.startAngle;
  var nowNumber = gaugeOption.startNumber;
  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    var pos = {
      x: radius * Math.cos(nowAngle * Math.PI),
      y: radius * Math.sin(nowAngle * Math.PI) };

    var labelText = gaugeOption.formatter ? gaugeOption.formatter(nowNumber, i, opts) : nowNumber;
    pos.x += centerPosition.x - measureText(labelText, config.fontSize, context) / 2;
    pos.y += centerPosition.y;
    var startX = pos.x;
    var startY = pos.y;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(gaugeOption.labelColor || opts.fontColor);
    context.fillText(labelText, startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();
    nowAngle += splitAngle;
    if (nowAngle >= 2) {
      nowAngle = nowAngle % 2;
    }
    nowNumber += splitNumber;
  }
}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
  var radarOption = opts.extra.radar || {};
  angleList.forEach(function (angle, index) {
    if (radarOption.labelPointShow === true && opts.categories[index] !== '') {
      var posPoint = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle) };

      var posPointAxis = convertCoordinateOrigin(posPoint.x, posPoint.y, centerPosition);
      context.setFillStyle(radarOption.labelPointColor);
      context.beginPath();
      context.arc(posPointAxis.x, posPointAxis.y, radarOption.labelPointRadius * opts.pix, 0, 2 * Math.PI, false);
      context.closePath();
      context.fill();
    }
    var pos = {
      x: (radius + config.radarLabelTextMargin * opts.pix) * Math.cos(angle),
      y: (radius + config.radarLabelTextMargin * opts.pix) * Math.sin(angle) };

    var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
    var startX = posRelativeCanvas.x;
    var startY = posRelativeCanvas.y;
    if (util.approximatelyEqual(pos.x, 0)) {
      startX -= measureText(opts.categories[index] || '', config.fontSize, context) / 2;
    } else if (pos.x < 0) {
      startX -= measureText(opts.categories[index] || '', config.fontSize, context);
    }
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(radarOption.labelColor || opts.fontColor);
    context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();
  });

}

function drawPieText(series, opts, config, context, radius, center) {
  var lineRadius = config.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;
  var seriesConvert = series.map(function (item, index) {
    var text = item.formatter ? item.formatter(item, index, series, opts) : util.toFixed(item._proportion_.toFixed(4) * 100) + '%';
    text = item.labelText ? item.labelText : text;
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    if (item._rose_proportion_) {
      arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._rose_proportion_ / 2);
    }
    var color = item.color;
    var radius = item._radius_;
    return {
      arc: arc,
      text: text,
      color: color,
      radius: radius,
      textColor: item.textColor,
      textSize: item.textSize,
      labelShow: item.labelShow };

  });
  for (var i = 0; i < seriesConvert.length; i++) {
    var item = seriesConvert[i];
    // line end
    var orginX1 = Math.cos(item.arc) * (item.radius + lineRadius);
    var orginY1 = Math.sin(item.arc) * (item.radius + lineRadius);
    // line start
    var orginX2 = Math.cos(item.arc) * item.radius;
    var orginY2 = Math.sin(item.arc) * item.radius;
    // text start
    var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
    var orginY3 = orginY1;
    var textWidth = measureText(item.text, item.textSize * opts.pix || config.fontSize, context);
    var startY = orginY3;
    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, {
      x: orginX3 }))
    {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }
    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }
    var textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2 },

      lineEnd: {
        x: orginX1,
        y: orginY1 },

      start: {
        x: orginX3,
        y: startY },

      width: textWidth,
      height: config.fontSize,
      text: item.text,
      color: item.color,
      textColor: item.textColor,
      textSize: item.textSize };

    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  }
  for (var _i15 = 0; _i15 < textObjectCollection.length; _i15++) {
    if (seriesConvert[_i15].labelShow === false) {
      continue;
    }
    var _item6 = textObjectCollection[_i15];
    var lineStartPoistion = convertCoordinateOrigin(_item6.lineStart.x, _item6.lineStart.y, center);
    var lineEndPoistion = convertCoordinateOrigin(_item6.lineEnd.x, _item6.lineEnd.y, center);
    var textPosition = convertCoordinateOrigin(_item6.start.x, _item6.start.y, center);
    context.setLineWidth(1 * opts.pix);
    context.setFontSize(_item6.textSize * opts.pix || config.fontSize);
    context.beginPath();
    context.setStrokeStyle(_item6.color);
    context.setFillStyle(_item6.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    var curveStartX = _item6.start.x < 0 ? textPosition.x + _item6.width : textPosition.x;
    var textStartX = _item6.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + _item6.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2 * opts.pix, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFontSize(_item6.textSize * opts.pix || config.fontSize);
    context.setFillStyle(_item6.textColor || opts.fontColor);
    context.fillText(_item6.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();
    context.closePath();
  }
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
  var toolTipOption = opts.extra.tooltip || {};
  toolTipOption.gridType = toolTipOption.gridType == undefined ? 'solid' : toolTipOption.gridType;
  toolTipOption.dashLength = toolTipOption.dashLength == undefined ? 4 : toolTipOption.dashLength;
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pix);
  context.beginPath();
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.stroke();
  context.setLineDash([]);
  if (toolTipOption.xAxisLabel) {
    var labelText = opts.categories[opts.tooltip.index];
    context.setFontSize(config.fontSize);
    var textWidth = measureText(labelText, config.fontSize, context);
    var textX = offsetX - 0.5 * textWidth;
    var textY = endY + 2 * opts.pix;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
    context.setLineWidth(1 * opts.pix);
    context.rect(textX - config.toolTipPadding, textY, textWidth + 2 * config.toolTipPadding, config.fontSize + 2 * config.toolTipPadding);
    context.closePath();
    context.stroke();
    context.fill();
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || opts.fontColor);
    context.fillText(String(labelText), textX, textY + config.toolTipPadding + config.fontSize);
    context.closePath();
    context.stroke();
  }
}

function drawMarkLine(opts, config, context) {
  var markLineOption = assign({}, {
    type: 'solid',
    dashLength: 4,
    data: [] },
  opts.extra.markLine);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var points = calMarkLineData(markLineOption.data, opts);
  for (var i = 0; i < points.length; i++) {
    var item = assign({}, {
      lineColor: '#DE4A42',
      showLabel: false,
      labelFontColor: '#666666',
      labelBgColor: '#DFE8FF',
      labelBgOpacity: 0.8,
      labelAlign: 'left',
      labelOffsetX: 0,
      labelOffsetY: 0 },
    points[i]);
    if (markLineOption.type == 'dash') {
      context.setLineDash([markLineOption.dashLength, markLineOption.dashLength]);
    }
    context.setStrokeStyle(item.lineColor);
    context.setLineWidth(1 * opts.pix);
    context.beginPath();
    context.moveTo(startX, item.y);
    context.lineTo(endX, item.y);
    context.stroke();
    context.setLineDash([]);
    if (item.showLabel) {
      var labelText = item.labelText ? item.labelText : item.value;
      context.setFontSize(config.fontSize);
      var textWidth = measureText(labelText, config.fontSize, context);
      var bgWidth = textWidth + config.toolTipPadding * 2;
      var bgStartX = item.labelAlign == 'left' ? opts.area[3] - bgWidth : opts.width - opts.area[1];
      bgStartX += item.labelOffsetX;
      var bgStartY = item.y - 0.5 * config.fontSize - config.toolTipPadding;
      bgStartY += item.labelOffsetY;
      var textX = bgStartX + config.toolTipPadding;
      var textY = item.y;
      context.setFillStyle(hexToRgb(item.labelBgColor, item.labelBgOpacity));
      context.setStrokeStyle(item.labelBgColor);
      context.setLineWidth(1 * opts.pix);
      context.beginPath();
      context.rect(bgStartX, bgStartY, bgWidth, config.fontSize + 2 * config.toolTipPadding);
      context.closePath();
      context.stroke();
      context.fill();
      context.setFontSize(config.fontSize);
      context.setTextAlign('left');
      context.setFillStyle(item.labelFontColor);
      context.fillText(String(labelText), textX, bgStartY + config.fontSize + config.toolTipPadding / 2);
      context.stroke();
      context.setTextAlign('left');
    }
  }
}

function drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    gridType: 'solid',
    dashLength: 4 },
  opts.extra.tooltip);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pix);
  context.beginPath();
  context.moveTo(startX, opts.tooltip.offset.y);
  context.lineTo(endX, opts.tooltip.offset.y);
  context.stroke();
  context.setLineDash([]);
  if (toolTipOption.yAxisLabel) {
    var labelText = calTooltipYAxisData(opts.tooltip.offset.y, opts.series, opts, config, eachSpacing);
    var widthArr = opts.chartData.yAxisData.yAxisWidth;
    var tStartLeft = opts.area[3];
    var tStartRight = opts.width - opts.area[1];
    for (var i = 0; i < labelText.length; i++) {
      context.setFontSize(config.fontSize);
      var textWidth = measureText(labelText[i], config.fontSize, context);
      var bgStartX = void 0,bgEndX = void 0,bgWidth = void 0;
      if (widthArr[i].position == 'left') {
        bgStartX = tStartLeft - (textWidth + config.toolTipPadding * 2) - 2 * opts.pix;
        bgEndX = Math.max(bgStartX, bgStartX + textWidth + config.toolTipPadding * 2);
      } else {
        bgStartX = tStartRight + 2 * opts.pix;
        bgEndX = Math.max(bgStartX + widthArr[i].width, bgStartX + textWidth + config.toolTipPadding * 2);
      }
      bgWidth = bgEndX - bgStartX;
      var textX = bgStartX + (bgWidth - textWidth) / 2;
      var textY = opts.tooltip.offset.y;
      context.beginPath();
      context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
      context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
      context.setLineWidth(1 * opts.pix);
      context.rect(bgStartX, textY - 0.5 * config.fontSize - config.toolTipPadding, bgWidth, config.fontSize + 2 * config.toolTipPadding);
      context.closePath();
      context.stroke();
      context.fill();
      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle(toolTipOption.labelFontColor || opts.fontColor);
      context.fillText(labelText[i], textX, textY + 0.5 * config.fontSize);
      context.closePath();
      context.stroke();
      if (widthArr[i].position == 'left') {
        tStartLeft -= widthArr[i].width + opts.yAxis.padding * opts.pix;
      } else {
        tStartRight += widthArr[i].width + opts.yAxis.padding * opts.pix;
      }
    }
  }
}

function drawToolTipSplitArea(offsetX, opts, config, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: '#000000',
    activeBgOpacity: 0.08,
    activeWidth: eachSpacing },
  opts.extra.column);
  toolTipOption.activeWidth = toolTipOption.activeWidth > eachSpacing ? eachSpacing : toolTipOption.activeWidth;
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(offsetX - toolTipOption.activeWidth / 2, startY, toolTipOption.activeWidth, endY - startY);
  context.closePath();
  context.fill();
  context.setFillStyle("#FFFFFF");
}

function drawBarToolTipSplitArea(offsetX, opts, config, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: '#000000',
    activeBgOpacity: 0.08 },
  opts.extra.bar);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(startX, offsetX - eachSpacing / 2, endX - startX, eachSpacing);
  context.closePath();
  context.fill();
  context.setFillStyle("#FFFFFF");
}


function drawToolTip(textList, offset, opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    showBox: true,
    showArrow: true,
    showCategory: false,
    bgColor: '#000000',
    bgOpacity: 0.7,
    borderColor: '#000000',
    borderWidth: 0,
    borderRadius: 0,
    borderOpacity: 0.7,
    fontColor: '#FFFFFF',
    splitLine: true },
  opts.extra.tooltip);
  if (toolTipOption.showCategory == true && opts.categories) {
    textList.unshift({ text: opts.categories[opts.tooltip.index], color: null });
  }
  var legendWidth = 4 * opts.pix;
  var legendMarginRight = 5 * opts.pix;
  var arrowWidth = toolTipOption.showArrow ? 8 * opts.pix : 0;
  var isOverRightBorder = false;
  if (opts.type == 'line' || opts.type == 'mount' || opts.type == 'area' || opts.type == 'candle' || opts.type == 'mix') {
    if (toolTipOption.splitLine == true) {
      drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
    }
  }
  offset = assign({
    x: 0,
    y: 0 },
  offset);
  offset.y -= 8 * opts.pix;
  var textWidth = textList.map(function (item) {
    return measureText(item.text, config.fontSize, context);
  });
  var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;
  if (toolTipOption.showBox == false) {
    return;
  }
  // if beyond the right border
  if (offset.x - Math.abs(opts._scrollDistance_ || 0) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  }
  if (toolTipHeight + offset.y > opts.height) {
    offset.y = opts.height - toolTipHeight;
  }
  // draw background rect
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.bgColor || config.toolTipBackground, toolTipOption.bgOpacity || config.toolTipOpacity));
  context.setLineWidth(toolTipOption.borderWidth * opts.pix);
  context.setStrokeStyle(hexToRgb(toolTipOption.borderColor, toolTipOption.borderOpacity));
  var radius = toolTipOption.borderRadius;
  if (isOverRightBorder) {
    // 增加左侧仍然超出的判断
    if (toolTipWidth + arrowWidth > opts.width) {
      offset.x = opts.width + Math.abs(opts._scrollDistance_ || 0) + arrowWidth + (toolTipWidth - opts.width);
    }
    if (toolTipOption.showArrow) {
      context.moveTo(offset.x, offset.y + 10 * opts.pix);
      context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pix + 5 * opts.pix);
    }
    context.arc(offset.x - arrowWidth - radius, offset.y + toolTipHeight - radius, radius, 0, Math.PI / 2, false);
    context.arc(offset.x - arrowWidth - Math.round(toolTipWidth) + radius, offset.y + toolTipHeight - radius, radius,
    Math.PI / 2, Math.PI, false);
    context.arc(offset.x - arrowWidth - Math.round(toolTipWidth) + radius, offset.y + radius, radius, -Math.PI, -Math.PI / 2, false);
    context.arc(offset.x - arrowWidth - radius, offset.y + radius, radius, -Math.PI / 2, 0, false);
    if (toolTipOption.showArrow) {
      context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pix - 5 * opts.pix);
      context.lineTo(offset.x, offset.y + 10 * opts.pix);
    }
  } else {
    if (toolTipOption.showArrow) {
      context.moveTo(offset.x, offset.y + 10 * opts.pix);
      context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pix - 5 * opts.pix);
    }
    context.arc(offset.x + arrowWidth + radius, offset.y + radius, radius, -Math.PI, -Math.PI / 2, false);
    context.arc(offset.x + arrowWidth + Math.round(toolTipWidth) - radius, offset.y + radius, radius, -Math.PI / 2, 0,
    false);
    context.arc(offset.x + arrowWidth + Math.round(toolTipWidth) - radius, offset.y + toolTipHeight - radius, radius, 0,
    Math.PI / 2, false);
    context.arc(offset.x + arrowWidth + radius, offset.y + toolTipHeight - radius, radius, Math.PI / 2, Math.PI, false);
    if (toolTipOption.showArrow) {
      context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pix + 5 * opts.pix);
      context.lineTo(offset.x, offset.y + 10 * opts.pix);
    }
  }
  context.closePath();
  context.fill();
  if (toolTipOption.borderWidth > 0) {
    context.stroke();
  }
  // draw legend
  textList.forEach(function (item, index) {
    if (item.color !== null) {
      context.beginPath();
      context.setFillStyle(item.color);
      var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
      var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding + 1;
      if (isOverRightBorder) {
        startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
      }
      context.fillRect(startX, startY, legendWidth, config.fontSize);
      // 圆形图例请注释上行，并把下行取消注释
      // context.arc(startX + legendWidth / 2 , startY + opts.fontSize / 2, 4 * opts.pix, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    }
  });
  // draw text list
  textList.forEach(function (item, index) {
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
    }
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.fontColor);
    context.fillText(item.text, startX, startY + config.fontSize);
    context.closePath();
    context.stroke();
  });
}

function drawColumnDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var columnOption = assign({}, {
    type: 'group',
    width: eachSpacing / 2,
    meterBorder: 4,
    meterFillColor: '#FFFFFF',
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: 'none',
    linearOpacity: 1,
    customColor: [],
    colorStop: 0 },
  opts.extra.column);
  var calPoints = [];
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitArea(opts.tooltip.offset.x, opts, config, context, eachSpacing);
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config);
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    switch (columnOption.type) {
      case 'group':
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        var tooltipPoints = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
        for (var i = 0; i < points.length; i++) {
          var item = points[i];
          //fix issues/I27B1N yyoinge & Joeshu
          if (item !== null && i > leftNum && i < rightNum) {
            var startX = item.x - item.width / 2;
            var height = opts.height - item.y - opts.area[2];
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var strokeColor = item.color || eachSeries.color;
            if (columnOption.linearType !== 'none') {
              var grd = context.createLinearGradient(startX, item.y, startX, opts.height - opts.area[2]);
              //透明渐变
              if (columnOption.linearType == 'opacity') {
                grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              } else {
                grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              }
              fillColor = grd;
            }
            // 圆角边框
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              var left = startX;
              var top = item.y;
              var width = item.width;
              var _height = opts.height - opts.area[2] - item.y;
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
              }var _columnOption$barBord = _slicedToArray(
              columnOption.barBorderRadius, 4),r0 = _columnOption$barBord[0],r1 = _columnOption$barBord[1],r2 = _columnOption$barBord[2],r3 = _columnOption$barBord[3];
              var minRadius = Math.min(width / 2, _height / 2);
              r0 = r0 > minRadius ? minRadius : r0;
              r1 = r1 > minRadius ? minRadius : r1;
              r2 = r2 > minRadius ? minRadius : r2;
              r3 = r3 > minRadius ? minRadius : r3;
              r0 = r0 < 0 ? 0 : r0;
              r1 = r1 < 0 ? 0 : r1;
              r2 = r2 < 0 ? 0 : r2;
              r3 = r3 < 0 ? 0 : r3;
              context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
              context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
              context.arc(left + width - r2, top + _height - r2, r2, 0, Math.PI / 2);
              context.arc(left + r3, top + _height - r3, r3, Math.PI / 2, Math.PI);
            } else {
              context.moveTo(startX, item.y);
              context.lineTo(startX + item.width, item.y);
              context.lineTo(startX + item.width, opts.height - opts.area[2]);
              context.lineTo(startX, opts.height - opts.area[2]);
              context.lineTo(startX, item.y);
              context.setLineWidth(1);
              context.setStrokeStyle(strokeColor);
            }
            context.setFillStyle(fillColor);
            context.closePath();
            //context.stroke();
            context.fill();
          }
        };
        break;
      case 'stack':
        // 绘制堆叠数据图
        var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(points);
        points = fixColumeStackData(points, eachSpacing, series.length, seriesIndex, config, opts, series);
        for (var _i16 = 0; _i16 < points.length; _i16++) {
          var _item7 = points[_i16];
          if (_item7 !== null && _i16 > leftNum && _i16 < rightNum) {
            context.beginPath();
            var fillColor = _item7.color || eachSeries.color;
            var startX = _item7.x - _item7.width / 2 + 1;
            var height = opts.height - _item7.y - opts.area[2];
            var height0 = opts.height - _item7.y0 - opts.area[2];
            if (seriesIndex > 0) {
              height -= height0;
            }
            context.setFillStyle(fillColor);
            context.moveTo(startX, _item7.y);
            context.fillRect(startX, _item7.y, _item7.width, height);
            context.closePath();
            context.fill();
          }
        };
        break;
      case 'meter':
        // 绘制温度计数据图
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);
        points = fixColumeMeterData(points, eachSpacing, series.length, seriesIndex, config, opts, columnOption.meterBorder);
        for (var _i17 = 0; _i17 < points.length; _i17++) {
          var _item8 = points[_i17];
          if (_item8 !== null && _i17 > leftNum && _i17 < rightNum) {
            //画背景颜色
            context.beginPath();
            if (seriesIndex == 0 && columnOption.meterBorder > 0) {
              context.setStrokeStyle(eachSeries.color);
              context.setLineWidth(columnOption.meterBorder * opts.pix);
            }
            if (seriesIndex == 0) {
              context.setFillStyle(columnOption.meterFillColor);
            } else {
              context.setFillStyle(_item8.color || eachSeries.color);
            }
            var startX = _item8.x - _item8.width / 2;
            var height = opts.height - _item8.y - opts.area[2];
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              var _left = startX;
              var _top = _item8.y;
              var _width = _item8.width;
              var _height2 = opts.height - opts.area[2] - _item8.y;
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [_width / 2, _width / 2, 0, 0];
              }var _columnOption$barBord2 = _slicedToArray(
              columnOption.barBorderRadius, 4),_r = _columnOption$barBord2[0],_r2 = _columnOption$barBord2[1],_r3 = _columnOption$barBord2[2],_r4 = _columnOption$barBord2[3];
              var _minRadius = Math.min(_width / 2, _height2 / 2);
              _r = _r > _minRadius ? _minRadius : _r;
              _r2 = _r2 > _minRadius ? _minRadius : _r2;
              _r3 = _r3 > _minRadius ? _minRadius : _r3;
              _r4 = _r4 > _minRadius ? _minRadius : _r4;
              _r = _r < 0 ? 0 : _r;
              _r2 = _r2 < 0 ? 0 : _r2;
              _r3 = _r3 < 0 ? 0 : _r3;
              _r4 = _r4 < 0 ? 0 : _r4;
              context.arc(_left + _r, _top + _r, _r, -Math.PI, -Math.PI / 2);
              context.arc(_left + _width - _r2, _top + _r2, _r2, -Math.PI / 2, 0);
              context.arc(_left + _width - _r3, _top + _height2 - _r3, _r3, 0, Math.PI / 2);
              context.arc(_left + _r4, _top + _height2 - _r4, _r4, Math.PI / 2, Math.PI);
              context.fill();
            } else {
              context.moveTo(startX, _item8.y);
              context.lineTo(startX + _item8.width, _item8.y);
              context.lineTo(startX + _item8.width, opts.height - opts.area[2]);
              context.lineTo(startX, opts.height - opts.area[2]);
              context.lineTo(startX, _item8.y);
              context.fill();
            }
            if (seriesIndex == 0 && columnOption.meterBorder > 0) {
              context.closePath();
              context.stroke();
            }
          }
        }
        break;}

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      switch (columnOption.type) {
        case 'group':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
          drawPointText(points, eachSeries, config, context, opts);
          break;
        case 'stack':
          var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
          drawPointText(points, eachSeries, config, context, opts);
          break;
        case 'meter':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          drawPointText(points, eachSeries, config, context, opts);
          break;}

    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawMountDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var mountOption = assign({}, {
    type: 'mount',
    widthRatio: 1,
    borderWidth: 1,
    barBorderCircle: false,
    barBorderRadius: [],
    linearType: 'none',
    linearOpacity: 1,
    customColor: [],
    colorStop: 0 },
  opts.extra.mount);
  mountOption.widthRatio = mountOption.widthRatio <= 0 ? 0 : mountOption.widthRatio;
  mountOption.widthRatio = mountOption.widthRatio >= 2 ? 2 : mountOption.widthRatio;
  var calPoints = [];
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
  }
  mountOption.customColor = fillCustomColor(mountOption.linearType, mountOption.customColor, series, config);
  var ranges, minRange, maxRange;
  ranges = [].concat(opts.chartData.yAxisData.ranges[0]);
  minRange = ranges.pop();
  maxRange = ranges.shift();
  var points = getMountDataPoints(series, minRange, maxRange, xAxisPoints, eachSpacing, opts, mountOption, process);
  switch (mountOption.type) {
    case 'bar':
      for (var i = 0; i < points.length; i++) {
        var item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || series[i].color;
          var strokeColor = item.color || series[i].color;
          if (mountOption.linearType !== 'none') {
            var grd = context.createLinearGradient(startX, item.y, startX, opts.height - opts.area[2]);
            //透明渐变
            if (mountOption.linearType == 'opacity') {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          // 圆角边框
          if (mountOption.barBorderRadius && mountOption.barBorderRadius.length === 4 || mountOption.barBorderCircle === true) {
            var left = startX;
            var top = item.y;
            var width = item.width;
            var _height3 = opts.height - opts.area[2] - item.y - mountOption.borderWidth * opts.pix / 2;
            if (mountOption.barBorderCircle) {
              mountOption.barBorderRadius = [width / 2, width / 2, 0, 0];
            }var _mountOption$barBorde = _slicedToArray(
            mountOption.barBorderRadius, 4),r0 = _mountOption$barBorde[0],r1 = _mountOption$barBorde[1],r2 = _mountOption$barBorde[2],r3 = _mountOption$barBorde[3];
            var minRadius = Math.min(width / 2, _height3 / 2);
            r0 = r0 > minRadius ? minRadius : r0;
            r1 = r1 > minRadius ? minRadius : r1;
            r2 = r2 > minRadius ? minRadius : r2;
            r3 = r3 > minRadius ? minRadius : r3;
            r0 = r0 < 0 ? 0 : r0;
            r1 = r1 < 0 ? 0 : r1;
            r2 = r2 < 0 ? 0 : r2;
            r3 = r3 < 0 ? 0 : r3;
            context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
            context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
            context.arc(left + width - r2, top + _height3 - r2, r2, 0, Math.PI / 2);
            context.arc(left + r3, top + _height3 - r3, r3, Math.PI / 2, Math.PI);
          } else {
            context.moveTo(startX, item.y);
            context.lineTo(startX + item.width, item.y);
            context.lineTo(startX + item.width, opts.height - opts.area[2]);
            context.lineTo(startX, opts.height - opts.area[2]);
            context.lineTo(startX, item.y);
          }
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.closePath();
            context.stroke();
          }
          context.fill();
        }
      };
      break;
    case 'triangle':
      for (var _i18 = 0; _i18 < points.length; _i18++) {
        var _item9 = points[_i18];
        if (_item9 !== null && _i18 > leftNum && _i18 < rightNum) {
          var startX = _item9.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - _item9.y - opts.area[2];
          context.beginPath();
          var fillColor = _item9.color || series[_i18].color;
          var strokeColor = _item9.color || series[_i18].color;
          if (mountOption.linearType !== 'none') {
            var grd = context.createLinearGradient(startX, _item9.y, startX, opts.height - opts.area[2]);
            //透明渐变
            if (mountOption.linearType == 'opacity') {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[_i18].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[_i18].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          context.moveTo(startX, opts.height - opts.area[2]);
          context.lineTo(_item9.x, _item9.y);
          context.lineTo(startX + _item9.width, opts.height - opts.area[2]);
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.stroke();
          }
          context.fill();
        }
      };
      break;
    case 'mount':
      for (var _i19 = 0; _i19 < points.length; _i19++) {
        var _item10 = points[_i19];
        if (_item10 !== null && _i19 > leftNum && _i19 < rightNum) {
          var startX = _item10.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - _item10.y - opts.area[2];
          context.beginPath();
          var fillColor = _item10.color || series[_i19].color;
          var strokeColor = _item10.color || series[_i19].color;
          if (mountOption.linearType !== 'none') {
            var grd = context.createLinearGradient(startX, _item10.y, startX, opts.height - opts.area[2]);
            //透明渐变
            if (mountOption.linearType == 'opacity') {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[_i19].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[_i19].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          context.moveTo(startX, opts.height - opts.area[2]);
          context.bezierCurveTo(_item10.x - _item10.width / 4, opts.height - opts.area[2], _item10.x - _item10.width / 4, _item10.y, _item10.x, _item10.y);
          context.bezierCurveTo(_item10.x + _item10.width / 4, _item10.y, _item10.x + _item10.width / 4, opts.height - opts.area[2], startX + _item10.width, opts.height - opts.area[2]);
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.stroke();
          }
          context.fill();
        }
      };
      break;
    case 'sharp':
      for (var _i20 = 0; _i20 < points.length; _i20++) {
        var _item11 = points[_i20];
        if (_item11 !== null && _i20 > leftNum && _i20 < rightNum) {
          var startX = _item11.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - _item11.y - opts.area[2];
          context.beginPath();
          var fillColor = _item11.color || series[_i20].color;
          var strokeColor = _item11.color || series[_i20].color;
          if (mountOption.linearType !== 'none') {
            var grd = context.createLinearGradient(startX, _item11.y, startX, opts.height - opts.area[2]);
            //透明渐变
            if (mountOption.linearType == 'opacity') {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[_i20].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[_i20].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          context.moveTo(startX, opts.height - opts.area[2]);
          context.quadraticCurveTo(_item11.x - 0, opts.height - opts.area[2] - height / 4, _item11.x, _item11.y);
          context.quadraticCurveTo(_item11.x + 0, opts.height - opts.area[2] - height / 4, startX + _item11.width, opts.height - opts.area[2]);
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.stroke();
          }
          context.fill();
        }
      };
      break;}


  if (opts.dataLabel !== false && process === 1) {
    var _ranges, _minRange, _maxRange;
    _ranges = [].concat(opts.chartData.yAxisData.ranges[0]);
    _minRange = _ranges.pop();
    _maxRange = _ranges.shift();
    var points = getMountDataPoints(series, _minRange, _maxRange, xAxisPoints, eachSpacing, opts, mountOption, process);
    drawMountPointText(points, series, config, context, opts);
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: points,
    eachSpacing: eachSpacing };

}

function drawBarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var yAxisPoints = [];
  var eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / opts.categories.length;
  for (var i = 0; i < opts.categories.length; i++) {
    yAxisPoints.push(opts.area[0] + eachSpacing / 2 + eachSpacing * i);
  }
  var columnOption = assign({}, {
    type: 'group',
    width: eachSpacing / 2,
    meterBorder: 4,
    meterFillColor: '#FFFFFF',
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: 'none',
    linearOpacity: 1,
    customColor: [],
    colorStop: 0 },
  opts.extra.bar);
  var calPoints = [];
  context.save();
  var leftNum = -2;
  var rightNum = yAxisPoints.length + 2;
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawBarToolTipSplitArea(opts.tooltip.offset.y, opts, config, context, eachSpacing);
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config);
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.xAxisData.ranges);
    maxRange = ranges.pop();
    minRange = ranges.shift();
    var data = eachSeries.data;
    switch (columnOption.type) {
      case 'group':
        var points = getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, process);
        var tooltipPoints = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixBarData(points, eachSpacing, series.length, seriesIndex, config, opts);
        for (var _i21 = 0; _i21 < points.length; _i21++) {
          var item = points[_i21];
          //fix issues/I27B1N yyoinge & Joeshu
          if (item !== null && _i21 > leftNum && _i21 < rightNum) {
            //var startX = item.x - item.width / 2;
            var startX = opts.area[3];
            var startY = item.y - item.width / 2;
            var height = item.height;
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var strokeColor = item.color || eachSeries.color;
            if (columnOption.linearType !== 'none') {
              var grd = context.createLinearGradient(startX, item.y, item.x, item.y);
              //透明渐变
              if (columnOption.linearType == 'opacity') {
                grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              } else {
                grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              }
              fillColor = grd;
            }
            // 圆角边框
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              var left = startX;
              var width = item.width;
              var top = item.y - item.width / 2;
              var _height4 = item.height;
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
              }var _columnOption$barBord3 = _slicedToArray(
              columnOption.barBorderRadius, 4),r0 = _columnOption$barBord3[0],r1 = _columnOption$barBord3[1],r2 = _columnOption$barBord3[2],r3 = _columnOption$barBord3[3];
              var minRadius = Math.min(width / 2, _height4 / 2);
              r0 = r0 > minRadius ? minRadius : r0;
              r1 = r1 > minRadius ? minRadius : r1;
              r2 = r2 > minRadius ? minRadius : r2;
              r3 = r3 > minRadius ? minRadius : r3;
              r0 = r0 < 0 ? 0 : r0;
              r1 = r1 < 0 ? 0 : r1;
              r2 = r2 < 0 ? 0 : r2;
              r3 = r3 < 0 ? 0 : r3;

              context.arc(left + r3, top + r3, r3, -Math.PI, -Math.PI / 2);
              context.arc(item.x - r0, top + r0, r0, -Math.PI / 2, 0);
              context.arc(item.x - r1, top + width - r1, r1, 0, Math.PI / 2);
              context.arc(left + r2, top + width - r2, r2, Math.PI / 2, Math.PI);
            } else {
              context.moveTo(startX, startY);
              context.lineTo(item.x, startY);
              context.lineTo(item.x, startY + item.width);
              context.lineTo(startX, startY + item.width);
              context.lineTo(startX, startY);
              context.setLineWidth(1);
              context.setStrokeStyle(strokeColor);
            }
            context.setFillStyle(fillColor);
            context.closePath();
            //context.stroke();
            context.fill();
          }
        };
        break;
      case 'stack':
        // 绘制堆叠数据图
        var points = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(points);
        points = fixBarStackData(points, eachSpacing, series.length, seriesIndex, config, opts, series);
        for (var _i22 = 0; _i22 < points.length; _i22++) {
          var _item12 = points[_i22];
          if (_item12 !== null && _i22 > leftNum && _i22 < rightNum) {
            context.beginPath();
            var fillColor = _item12.color || eachSeries.color;
            var startX = _item12.x0;
            context.setFillStyle(fillColor);
            context.moveTo(startX, _item12.y - _item12.width / 2);
            context.fillRect(startX, _item12.y - _item12.width / 2, _item12.height, _item12.width);
            context.closePath();
            context.fill();
          }
        };
        break;}

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.xAxisData.ranges);
      maxRange = ranges.pop();
      minRange = ranges.shift();
      var data = eachSeries.data;
      switch (columnOption.type) {
        case 'group':
          var points = getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, process);
          points = fixBarData(points, eachSpacing, series.length, seriesIndex, config, opts);
          drawBarPointText(points, eachSeries, config, context, opts);
          break;
        case 'stack':
          var points = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
          drawBarPointText(points, eachSeries, config, context, opts);
          break;}

    });
  }
  return {
    yAxisPoints: yAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawCandleDataPoints(series, seriesMA, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var candleOption = assign({}, {
    color: {},
    average: {} },
  opts.extra.candle);
  candleOption.color = assign({}, {
    upLine: '#f04864',
    upFill: '#f04864',
    downLine: '#2fc25b',
    downFill: '#2fc25b' },
  candleOption.color);
  candleOption.average = assign({}, {
    show: false,
    name: [],
    day: [],
    color: config.color },
  candleOption.average);
  opts.extra.candle = candleOption;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  //画均线
  if (candleOption.average.show || seriesMA) {//Merge pull request !12 from 邱贵翔
    seriesMA.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      var splitPointList = splitPoints(points, eachSeries);
      for (var i = 0; i < splitPointList.length; i++) {
        var _points = splitPointList[i];
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(1);
        if (_points.length === 1) {
          context.moveTo(_points[0].x, _points[0].y);
          context.arc(_points[0].x, _points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(_points[0].x, _points[0].y);
          var startPoint = 0;
          for (var j = 0; j < _points.length; j++) {
            var item = _points[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(_points, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x,
              item.y);
            }
          }
          context.moveTo(_points[0].x, _points[0].y);
        }
        context.closePath();
        context.stroke();
      }
    });
  }
  //画K线
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    for (var i = 0; i < splitPointList[0].length; i++) {
      if (i > leftNum && i < rightNum) {
        var item = splitPointList[0][i];
        context.beginPath();
        //如果上涨
        if (data[i][1] - data[i][0] > 0) {
          context.setStrokeStyle(candleOption.color.upLine);
          context.setFillStyle(candleOption.color.upFill);
          context.setLineWidth(1 * opts.pix);
          context.moveTo(item[3].x, item[3].y); //顶点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y); //收盘左侧点
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y); //开盘左侧点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.lineTo(item[2].x, item[2].y); //底点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y); //开盘右侧点
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y); //收盘右侧点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.moveTo(item[3].x, item[3].y); //顶点
        } else {
          context.setStrokeStyle(candleOption.color.downLine);
          context.setFillStyle(candleOption.color.downFill);
          context.setLineWidth(1 * opts.pix);
          context.moveTo(item[3].x, item[3].y); //顶点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y); //开盘左侧点
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y); //收盘左侧点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.lineTo(item[2].x, item[2].y); //底点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y); //收盘右侧点
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y); //开盘右侧点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.moveTo(item[3].x, item[3].y); //顶点
        }
        context.closePath();
        context.fill();
        context.stroke();
      }
    }
  });
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawAreaDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var areaOption = assign({}, {
    type: 'straight',
    opacity: 0.2,
    addLine: false,
    width: 2,
    gradient: false },
  opts.extra.area);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var endY = opts.height - opts.area[2];
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    for (var i = 0; i < splitPointList.length; i++) {
      var _points2 = splitPointList[i];
      // 绘制区域数
      context.beginPath();
      context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      if (areaOption.gradient) {
        var gradient = context.createLinearGradient(0, opts.area[0], 0, opts.height - opts.area[2]);
        gradient.addColorStop('0', hexToRgb(eachSeries.color, areaOption.opacity));
        gradient.addColorStop('1.0', hexToRgb("#FFFFFF", 0.1));
        context.setFillStyle(gradient);
      } else {
        context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      }
      context.setLineWidth(areaOption.width * opts.pix);
      if (_points2.length > 1) {
        var firstPoint = _points2[0];
        var lastPoint = _points2[_points2.length - 1];
        context.moveTo(firstPoint.x, firstPoint.y);
        var startPoint = 0;
        if (areaOption.type === 'curve') {
          for (var j = 0; j < _points2.length; j++) {
            var item = _points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(_points2, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          };
        }
        if (areaOption.type === 'straight') {
          for (var _j = 0; _j < _points2.length; _j++) {
            var _item13 = _points2[_j];
            if (startPoint == 0 && _item13.x > leftSpace) {
              context.moveTo(_item13.x, _item13.y);
              startPoint = 1;
            }
            if (_j > 0 && _item13.x > leftSpace && _item13.x < rightSpace) {
              context.lineTo(_item13.x, _item13.y);
            }
          };
        }
        if (areaOption.type === 'step') {
          for (var _j2 = 0; _j2 < _points2.length; _j2++) {
            var _item14 = _points2[_j2];
            if (startPoint == 0 && _item14.x > leftSpace) {
              context.moveTo(_item14.x, _item14.y);
              startPoint = 1;
            }
            if (_j2 > 0 && _item14.x > leftSpace && _item14.x < rightSpace) {
              context.lineTo(_item14.x, _points2[_j2 - 1].y);
              context.lineTo(_item14.x, _item14.y);
            }
          };
        }
        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        var _item15 = _points2[0];
        context.moveTo(_item15.x - eachSpacing / 2, _item15.y);
        context.lineTo(_item15.x + eachSpacing / 2, _item15.y);
        context.lineTo(_item15.x + eachSpacing / 2, endY);
        context.lineTo(_item15.x - eachSpacing / 2, endY);
        context.moveTo(_item15.x - eachSpacing / 2, _item15.y);
      }
      context.closePath();
      context.fill();
      //画连线
      if (areaOption.addLine) {
        if (eachSeries.lineType == 'dash') {
          var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pix;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(areaOption.width * opts.pix);
        if (_points2.length === 1) {
          context.moveTo(_points2[0].x, _points2[0].y);
          context.arc(_points2[0].x, _points2[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(_points2[0].x, _points2[0].y);
          var _startPoint = 0;
          if (areaOption.type === 'curve') {
            for (var _j3 = 0; _j3 < _points2.length; _j3++) {
              var _item16 = _points2[_j3];
              if (_startPoint == 0 && _item16.x > leftSpace) {
                context.moveTo(_item16.x, _item16.y);
                _startPoint = 1;
              }
              if (_j3 > 0 && _item16.x > leftSpace && _item16.x < rightSpace) {
                var _ctrlPoint = createCurveControlPoints(_points2, _j3 - 1);
                context.bezierCurveTo(_ctrlPoint.ctrA.x, _ctrlPoint.ctrA.y, _ctrlPoint.ctrB.x, _ctrlPoint.ctrB.y, _item16.x, _item16.y);
              }
            };
          }
          if (areaOption.type === 'straight') {
            for (var _j4 = 0; _j4 < _points2.length; _j4++) {
              var _item17 = _points2[_j4];
              if (_startPoint == 0 && _item17.x > leftSpace) {
                context.moveTo(_item17.x, _item17.y);
                _startPoint = 1;
              }
              if (_j4 > 0 && _item17.x > leftSpace && _item17.x < rightSpace) {
                context.lineTo(_item17.x, _item17.y);
              }
            };
          }
          if (areaOption.type === 'step') {
            for (var _j5 = 0; _j5 < _points2.length; _j5++) {
              var _item18 = _points2[_j5];
              if (_startPoint == 0 && _item18.x > leftSpace) {
                context.moveTo(_item18.x, _item18.y);
                _startPoint = 1;
              }
              if (_j5 > 0 && _item18.x > leftSpace && _item18.x < rightSpace) {
                context.lineTo(_item18.x, _points2[_j5 - 1].y);
                context.lineTo(_item18.x, _item18.y);
              }
            };
          }
          context.moveTo(_points2[0].x, _points2[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      }
    }
    //画点
    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawScatterDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var scatterOption = assign({}, {
    type: 'circle' },
  opts.extra.scatter);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setFillStyle(eachSeries.color);
    context.setLineWidth(1 * opts.pix);
    var shape = eachSeries.pointShape;
    if (shape === 'diamond') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x, item.y - 4.5);
          context.lineTo(item.x - 4.5, item.y);
          context.lineTo(item.x, item.y + 4.5);
          context.lineTo(item.x + 4.5, item.y);
          context.lineTo(item.x, item.y - 4.5);
        }
      });
    } else if (shape === 'circle') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x + 2.5 * opts.pix, item.y);
          context.arc(item.x, item.y, 3 * opts.pix, 0, 2 * Math.PI, false);
        }
      });
    } else if (shape === 'square') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x - 3.5, item.y - 3.5);
          context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
        }
      });
    } else if (shape === 'triangle') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x, item.y - 4.5);
          context.lineTo(item.x - 4.5, item.y + 4.5);
          context.lineTo(item.x + 4.5, item.y + 4.5);
          context.lineTo(item.x, item.y - 4.5);
        }
      });
    } else if (shape === 'triangle') {
      return;
    }
    context.closePath();
    context.fill();
    context.stroke();
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawBubbleDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var bubbleOption = assign({}, {
    opacity: 1,
    border: 2 },
  opts.extra.bubble);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setLineWidth(bubbleOption.border * opts.pix);
    context.setFillStyle(hexToRgb(eachSeries.color, bubbleOption.opacity));
    points.forEach(function (item, index) {
      context.moveTo(item.x + item.r, item.y);
      context.arc(item.x, item.y, item.r * opts.pix, 0, 2 * Math.PI, false);
    });
    context.closePath();
    context.fill();
    context.stroke();

    if (opts.dataLabel !== false && process === 1) {
      points.forEach(function (item, index) {
        context.beginPath();
        var fontSize = eachSeries.textSize * opts.pix || config.fontSize;
        context.setFontSize(fontSize);
        context.setFillStyle(eachSeries.textColor || "#FFFFFF");
        context.setTextAlign('center');
        context.fillText(String(item.t), item.x, item.y + fontSize / 2);
        context.closePath();
        context.stroke();
        context.setTextAlign('left');
      });
    }
  });
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawLineDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var lineOption = assign({}, {
    type: 'straight',
    width: 2 },
  opts.extra.line);
  lineOption.width *= opts.pix;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    if (eachSeries.lineType == 'dash') {
      var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
      dashLength *= opts.pix;
      context.setLineDash([dashLength, dashLength]);
    }
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setLineWidth(lineOption.width);
    splitPointList.forEach(function (points, index) {
      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);
        var startPoint = 0;
        if (lineOption.type === 'curve') {
          for (var j = 0; j < points.length; j++) {
            var item = points[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(points, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          };
        }
        if (lineOption.type === 'straight') {
          for (var _j6 = 0; _j6 < points.length; _j6++) {
            var _item19 = points[_j6];
            if (startPoint == 0 && _item19.x > leftSpace) {
              context.moveTo(_item19.x, _item19.y);
              startPoint = 1;
            }
            if (_j6 > 0 && _item19.x > leftSpace && _item19.x < rightSpace) {
              context.lineTo(_item19.x, _item19.y);
            }
          };
        }
        if (lineOption.type === 'step') {
          for (var _j7 = 0; _j7 < points.length; _j7++) {
            var _item20 = points[_j7];
            if (startPoint == 0 && _item20.x > leftSpace) {
              context.moveTo(_item20.x, _item20.y);
              startPoint = 1;
            }
            if (_j7 > 0 && _item20.x > leftSpace && _item20.x < rightSpace) {
              context.lineTo(_item20.x, points[_j7 - 1].y);
              context.lineTo(_item20.x, _item20.y);
            }
          };
        }
        context.moveTo(points[0].x, points[0].y);
      }
    });
    context.stroke();
    context.setLineDash([]);
    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawMixDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var columnOption = assign({}, {
    width: eachSpacing / 2,
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: 'none',
    linearOpacity: 1,
    customColor: [],
    colorStop: 0 },
  opts.extra.mix.column);
  var areaOption = assign({}, {
    opacity: 0.2,
    gradient: false },
  opts.extra.mix.area);
  var lineOption = assign({}, {
    width: 2 },
  opts.extra.mix.line);
  var endY = opts.height - opts.area[2];
  var calPoints = [];
  var columnIndex = 0;
  var columnLength = 0;
  series.forEach(function (eachSeries, seriesIndex) {
    if (eachSeries.type == 'column') {
      columnLength += 1;
    }
  });
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config);
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    // 绘制柱状数据图
    if (eachSeries.type == 'column') {
      points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
      for (var i = 0; i < points.length; i++) {
        var item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - item.width / 2;
          var height = opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || eachSeries.color;
          var strokeColor = item.color || eachSeries.color;
          if (columnOption.linearType !== 'none') {
            var grd = context.createLinearGradient(startX, item.y, startX, opts.height - opts.area[2]);
            //透明渐变
            if (columnOption.linearType == 'opacity') {
              grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
              grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          // 圆角边框
          if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle) {
            var left = startX;
            var top = item.y;
            var width = item.width;
            var _height5 = opts.height - opts.area[2] - item.y;
            if (columnOption.barBorderCircle) {
              columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
            }var _columnOption$barBord4 = _slicedToArray(
            columnOption.barBorderRadius, 4),r0 = _columnOption$barBord4[0],r1 = _columnOption$barBord4[1],r2 = _columnOption$barBord4[2],r3 = _columnOption$barBord4[3];
            var minRadius = Math.min(width / 2, _height5 / 2);
            r0 = r0 > minRadius ? minRadius : r0;
            r1 = r1 > minRadius ? minRadius : r1;
            r2 = r2 > minRadius ? minRadius : r2;
            r3 = r3 > minRadius ? minRadius : r3;
            r0 = r0 < 0 ? 0 : r0;
            r1 = r1 < 0 ? 0 : r1;
            r2 = r2 < 0 ? 0 : r2;
            r3 = r3 < 0 ? 0 : r3;
            context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
            context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
            context.arc(left + width - r2, top + _height5 - r2, r2, 0, Math.PI / 2);
            context.arc(left + r3, top + _height5 - r3, r3, Math.PI / 2, Math.PI);
          } else {
            context.moveTo(startX, item.y);
            context.lineTo(startX + item.width, item.y);
            context.lineTo(startX + item.width, opts.height - opts.area[2]);
            context.lineTo(startX, opts.height - opts.area[2]);
            context.lineTo(startX, item.y);
            context.setLineWidth(1);
            context.setStrokeStyle(strokeColor);
          }
          context.setFillStyle(fillColor);
          context.closePath();
          context.fill();
        }
      }
      columnIndex += 1;
    }
    //绘制区域图数据
    if (eachSeries.type == 'area') {
      var _splitPointList = splitPoints(points, eachSeries);
      for (var _i23 = 0; _i23 < _splitPointList.length; _i23++) {
        var _points3 = _splitPointList[_i23];
        // 绘制区域数据
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
        if (areaOption.gradient) {
          var gradient = context.createLinearGradient(0, opts.area[0], 0, opts.height - opts.area[2]);
          gradient.addColorStop('0', hexToRgb(eachSeries.color, areaOption.opacity));
          gradient.addColorStop('1.0', hexToRgb("#FFFFFF", 0.1));
          context.setFillStyle(gradient);
        } else {
          context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
        }
        context.setLineWidth(2 * opts.pix);
        if (_points3.length > 1) {
          var firstPoint = _points3[0];
          var lastPoint = _points3[_points3.length - 1];
          context.moveTo(firstPoint.x, firstPoint.y);
          var startPoint = 0;
          if (eachSeries.style === 'curve') {
            for (var j = 0; j < _points3.length; j++) {
              var _item21 = _points3[j];
              if (startPoint == 0 && _item21.x > leftSpace) {
                context.moveTo(_item21.x, _item21.y);
                startPoint = 1;
              }
              if (j > 0 && _item21.x > leftSpace && _item21.x < rightSpace) {
                var ctrlPoint = createCurveControlPoints(_points3, j - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, _item21.x, _item21.y);
              }
            };
          } else {
            for (var _j8 = 0; _j8 < _points3.length; _j8++) {
              var _item22 = _points3[_j8];
              if (startPoint == 0 && _item22.x > leftSpace) {
                context.moveTo(_item22.x, _item22.y);
                startPoint = 1;
              }
              if (_j8 > 0 && _item22.x > leftSpace && _item22.x < rightSpace) {
                context.lineTo(_item22.x, _item22.y);
              }
            };
          }
          context.lineTo(lastPoint.x, endY);
          context.lineTo(firstPoint.x, endY);
          context.lineTo(firstPoint.x, firstPoint.y);
        } else {
          var _item23 = _points3[0];
          context.moveTo(_item23.x - eachSpacing / 2, _item23.y);
          context.lineTo(_item23.x + eachSpacing / 2, _item23.y);
          context.lineTo(_item23.x + eachSpacing / 2, endY);
          context.lineTo(_item23.x - eachSpacing / 2, endY);
          context.moveTo(_item23.x - eachSpacing / 2, _item23.y);
        }
        context.closePath();
        context.fill();
      }
    }
    // 绘制折线数据图
    if (eachSeries.type == 'line') {
      var splitPointList = splitPoints(points, eachSeries);
      splitPointList.forEach(function (points, index) {
        if (eachSeries.lineType == 'dash') {
          var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pix;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(lineOption.width * opts.pix);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          var _startPoint2 = 0;
          if (eachSeries.style == 'curve') {
            for (var _j9 = 0; _j9 < points.length; _j9++) {
              var _item24 = points[_j9];
              if (_startPoint2 == 0 && _item24.x > leftSpace) {
                context.moveTo(_item24.x, _item24.y);
                _startPoint2 = 1;
              }
              if (_j9 > 0 && _item24.x > leftSpace && _item24.x < rightSpace) {
                var ctrlPoint = createCurveControlPoints(points, _j9 - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y,
                _item24.x, _item24.y);
              }
            }
          } else {
            for (var _j10 = 0; _j10 < points.length; _j10++) {
              var _item25 = points[_j10];
              if (_startPoint2 == 0 && _item25.x > leftSpace) {
                context.moveTo(_item25.x, _item25.y);
                _startPoint2 = 1;
              }
              if (_j10 > 0 && _item25.x > leftSpace && _item25.x < rightSpace) {
                context.lineTo(_item25.x, _item25.y);
              }
            }
          }
          context.moveTo(points[0].x, points[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      });
    }
    // 绘制点数据图
    if (eachSeries.type == 'point') {
      eachSeries.addPoint = true;
    }
    if (eachSeries.addPoint == true && eachSeries.type !== 'column') {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    var columnIndex = 0;
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      if (eachSeries.type !== 'column') {
        drawPointText(points, eachSeries, config, context, opts);
      } else {
        points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
        drawPointText(points, eachSeries, config, context, opts);
        columnIndex += 1;
      }
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}


function drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || {};
  if (toolTipOption.horizentalLine && opts.tooltip && process === 1 && (opts.type == 'line' || opts.type == 'area' || opts.type == 'column' || opts.type == 'mount' || opts.type == 'candle' || opts.type == 'mix')) {
    drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context, eachSpacing, xAxisPoints);
  }
  context.restore();

}

function drawXAxis(categories, opts, config, context) {

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  startX = xAxisData.startX,
  endX = xAxisData.endX,
  eachSpacing = xAxisData.eachSpacing;
  var boundaryGap = 'center';
  if (opts.type == 'bar' || opts.type == 'line' || opts.type == 'area' || opts.type == 'scatter' || opts.type == 'bubble') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var startY = opts.height - opts.area[2];
  var endY = opts.area[0];

  //绘制滚动条
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    var scrollY = opts.height - opts.area[2] + config.xAxisHeight;
    var scrollScreenWidth = endX - startX;
    var scrollTotalWidth = eachSpacing * (xAxisPoints.length - 1);
    if (opts.type == 'mount' && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
      if (opts.extra.mount.widthRatio > 2) opts.extra.mount.widthRatio = 2;
      scrollTotalWidth += (opts.extra.mount.widthRatio - 1) * eachSpacing;
    }
    var scrollWidth = scrollScreenWidth * scrollScreenWidth / scrollTotalWidth;
    var scrollLeft = 0;
    if (opts._scrollDistance_) {
      scrollLeft = -opts._scrollDistance_ * scrollScreenWidth / scrollTotalWidth;
    }
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pix);
    context.setStrokeStyle(opts.xAxis.scrollBackgroundColor || "#EFEBEF");
    context.moveTo(startX, scrollY);
    context.lineTo(endX, scrollY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pix);
    context.setStrokeStyle(opts.xAxis.scrollColor || "#A6A6A6");
    context.moveTo(startX + scrollLeft, scrollY);
    context.lineTo(startX + scrollLeft + scrollWidth, scrollY);
    context.stroke();
    context.closePath();
    context.setLineCap('butt');
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }
  //绘制X轴刻度线
  if (opts.xAxis.calibration === true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap('butt');
    context.setLineWidth(1 * opts.pix);
    xAxisPoints.forEach(function (item, index) {
      if (index > 0) {
        context.beginPath();
        context.moveTo(item - eachSpacing / 2, startY);
        context.lineTo(item - eachSpacing / 2, startY + 3 * opts.pix);
        context.closePath();
        context.stroke();
      }
    });
  }
  //绘制X轴网格
  if (opts.xAxis.disableGrid !== true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap('butt');
    context.setLineWidth(1 * opts.pix);
    if (opts.xAxis.gridType == 'dash') {
      context.setLineDash([opts.xAxis.dashLength * opts.pix, opts.xAxis.dashLength * opts.pix]);
    }
    opts.xAxis.gridEval = opts.xAxis.gridEval || 1;
    xAxisPoints.forEach(function (item, index) {
      if (index % opts.xAxis.gridEval == 0) {
        context.beginPath();
        context.moveTo(item, startY);
        context.lineTo(item, endY);
        context.stroke();
      }
    });
    context.setLineDash([]);
  }
  //绘制X轴文案
  if (opts.xAxis.disabled !== true) {
    // 对X轴列表做抽稀处理
    //默认全部显示X轴标签
    var maxXAxisListLength = categories.length;
    //如果设置了X轴单屏数量
    if (opts.xAxis.labelCount) {
      //如果设置X轴密度
      if (opts.xAxis.itemCount) {
        maxXAxisListLength = Math.ceil(categories.length / opts.xAxis.itemCount * opts.xAxis.labelCount);
      } else {
        maxXAxisListLength = opts.xAxis.labelCount;
      }
      maxXAxisListLength -= 1;
    }

    var ratio = Math.ceil(categories.length / maxXAxisListLength);

    var newCategories = [];
    var cgLength = categories.length;
    for (var i = 0; i < cgLength; i++) {
      if (i % ratio !== 0) {
        newCategories.push("");
      } else {
        newCategories.push(categories[i]);
      }
    }
    newCategories[cgLength - 1] = categories[cgLength - 1];
    var xAxisFontSize = opts.xAxis.fontSize * opts.pix || config.fontSize;
    if (config._xAxisTextAngle_ === 0) {
      newCategories.forEach(function (item, index) {
        var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(item, index, opts) : item;
        var offset = -measureText(String(xitem), xAxisFontSize, context) / 2;
        if (boundaryGap == 'center') {
          offset += eachSpacing / 2;
        }
        var scrollHeight = 0;
        if (opts.xAxis.scrollShow) {
          scrollHeight = 6 * opts.pix;
        }
        // 如果在主视图区域内
        var _scrollDistance_ = opts._scrollDistance_ || 0;
        var truePoints = boundaryGap == 'center' ? xAxisPoints[index] + eachSpacing / 2 : xAxisPoints[index];
        if (truePoints - Math.abs(_scrollDistance_) >= opts.area[3] && truePoints - Math.abs(_scrollDistance_) <= opts.width - opts.area[1]) {
          context.beginPath();
          context.setFontSize(xAxisFontSize);
          context.setFillStyle(opts.xAxis.fontColor || opts.fontColor);
          context.fillText(String(xitem), xAxisPoints[index] + offset, startY + xAxisFontSize + (config.xAxisHeight - scrollHeight - xAxisFontSize) / 2);
          context.closePath();
          context.stroke();
        }
      });
    } else {
      newCategories.forEach(function (item, index) {
        var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(item) : item;
        // 如果在主视图区域内
        var _scrollDistance_ = opts._scrollDistance_ || 0;
        var truePoints = boundaryGap == 'center' ? xAxisPoints[index] + eachSpacing / 2 : xAxisPoints[index];
        if (truePoints - Math.abs(_scrollDistance_) >= opts.area[3] && truePoints - Math.abs(_scrollDistance_) <= opts.width - opts.area[1]) {
          context.save();
          context.beginPath();
          context.setFontSize(xAxisFontSize);
          context.setFillStyle(opts.xAxis.fontColor || opts.fontColor);
          var textWidth = measureText(String(xitem), xAxisFontSize, context);
          var offsetX = xAxisPoints[index];
          if (boundaryGap == 'center') {
            offsetX = xAxisPoints[index] + eachSpacing / 2;
          }
          var scrollHeight = 0;
          if (opts.xAxis.scrollShow) {
            scrollHeight = 6 * opts.pix;
          }
          var offsetY = startY + 6 * opts.pix + xAxisFontSize - xAxisFontSize * Math.abs(Math.sin(config._xAxisTextAngle_));
          if (opts.xAxis.rotateAngle < 0) {
            offsetX -= xAxisFontSize / 2;
            textWidth = 0;
          } else {
            offsetX += xAxisFontSize / 2;
            textWidth = -textWidth;
          }
          context.translate(offsetX, offsetY);
          context.rotate(-1 * config._xAxisTextAngle_);
          context.fillText(String(xitem), textWidth, 0);
          context.closePath();
          context.stroke();
          context.restore();
        }
      });
    }
  }
  context.restore();
  //绘制X轴轴线
  if (opts.xAxis.axisLine) {
    context.beginPath();
    context.setStrokeStyle(opts.xAxis.axisLineColor);
    context.setLineWidth(1 * opts.pix);
    context.moveTo(startX, opts.height - opts.area[2]);
    context.lineTo(endX, opts.height - opts.area[2]);
    context.stroke();
  }
}

function drawYAxisGrid(categories, opts, config, context) {
  if (opts.yAxis.disableGrid === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / opts.yAxis.splitNumber;
  var startX = opts.area[3];
  var xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
  xAxiseachSpacing = opts.chartData.xAxisData.eachSpacing;
  var TotalWidth = xAxiseachSpacing * (xAxisPoints.length - 1);
  if (opts.type == 'mount' && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
    if (opts.extra.mount.widthRatio > 2) opts.extra.mount.widthRatio = 2;
    TotalWidth += (opts.extra.mount.widthRatio - 1) * xAxiseachSpacing;
  }
  var endX = startX + TotalWidth;
  var points = [];
  var startY = 1;
  if (opts.xAxis.axisLine === false) {
    startY = 0;
  }
  for (var i = startY; i < opts.yAxis.splitNumber + 1; i++) {
    points.push(opts.height - opts.area[2] - eachSpacing * i);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.yAxis.gridType == 'dash') {
    context.setLineDash([opts.yAxis.dashLength * opts.pix, opts.yAxis.dashLength * opts.pix]);
  }
  context.setStrokeStyle(opts.yAxis.gridColor);
  context.setLineWidth(1 * opts.pix);
  points.forEach(function (item, index) {
    context.beginPath();
    context.moveTo(startX, item);
    context.lineTo(endX, item);
    context.stroke();
  });
  context.setLineDash([]);
  context.restore();
}

function drawYAxis(series, opts, config, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / opts.yAxis.splitNumber;
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var endY = opts.height - opts.area[2];
  // set YAxis background
  context.beginPath();
  context.setFillStyle(opts.background);
  if (opts.enableScroll == true && opts.xAxis.scrollPosition && opts.xAxis.scrollPosition !== 'left') {
    context.fillRect(0, 0, startX, endY + 2 * opts.pix);
  }
  if (opts.enableScroll == true && opts.xAxis.scrollPosition && opts.xAxis.scrollPosition !== 'right') {
    context.fillRect(endX, 0, opts.width, endY + 2 * opts.pix);
  }
  context.closePath();
  context.stroke();

  var tStartLeft = opts.area[3];
  var tStartRight = opts.width - opts.area[1];
  var tStartCenter = opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2;
  if (opts.yAxis.data) {var _loop4 = function _loop4(
    i) {
      var yData = opts.yAxis.data[i];
      points = [];
      if (yData.type === 'categories') {
        for (var _i24 = 0; _i24 <= yData.categories.length; _i24++) {
          points.push(opts.area[0] + spacingValid / yData.categories.length / 2 + spacingValid / yData.categories.length * _i24);
        }
      } else {
        for (var _i25 = 0; _i25 <= opts.yAxis.splitNumber; _i25++) {
          points.push(opts.area[0] + eachSpacing * _i25);
        }
      }
      if (yData.disabled !== true) {
        var rangesFormat = opts.chartData.yAxisData.rangesFormat[i];
        var yAxisFontSize = yData.fontSize ? yData.fontSize * opts.pix : config.fontSize;
        var yAxisWidth = opts.chartData.yAxisData.yAxisWidth[i];
        var textAlign = yData.textAlign || "right";
        //画Y轴刻度及文案
        rangesFormat.forEach(function (item, index) {
          var pos = points[index];
          context.beginPath();
          context.setFontSize(yAxisFontSize);
          context.setLineWidth(1 * opts.pix);
          context.setStrokeStyle(yData.axisLineColor || '#cccccc');
          context.setFillStyle(yData.fontColor || opts.fontColor);
          var tmpstrat = 0;
          var gapwidth = 4 * opts.pix;
          if (yAxisWidth.position == 'left') {
            //画刻度线
            if (yData.calibration == true) {
              context.moveTo(tStartLeft, pos);
              context.lineTo(tStartLeft - 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            //画文字
            switch (textAlign) {
              case "left":
                context.setTextAlign('left');
                tmpstrat = tStartLeft - yAxisWidth.width;
                break;
              case "right":
                context.setTextAlign('right');
                tmpstrat = tStartLeft - gapwidth;
                break;
              default:
                context.setTextAlign('center');
                tmpstrat = tStartLeft - yAxisWidth.width / 2;}

            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);

          } else if (yAxisWidth.position == 'right') {
            //画刻度线
            if (yData.calibration == true) {
              context.moveTo(tStartRight, pos);
              context.lineTo(tStartRight + 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            switch (textAlign) {
              case "left":
                context.setTextAlign('left');
                tmpstrat = tStartRight + gapwidth;
                break;
              case "right":
                context.setTextAlign('right');
                tmpstrat = tStartRight + yAxisWidth.width;
                break;
              default:
                context.setTextAlign('center');
                tmpstrat = tStartRight + yAxisWidth.width / 2;}

            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);
          } else if (yAxisWidth.position == 'center') {
            //画刻度线
            if (yData.calibration == true) {
              context.moveTo(tStartCenter, pos);
              context.lineTo(tStartCenter - 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            //画文字
            switch (textAlign) {
              case "left":
                context.setTextAlign('left');
                tmpstrat = tStartCenter - yAxisWidth.width;
                break;
              case "right":
                context.setTextAlign('right');
                tmpstrat = tStartCenter - gapwidth;
                break;
              default:
                context.setTextAlign('center');
                tmpstrat = tStartCenter - yAxisWidth.width / 2;}

            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);
          }
          context.closePath();
          context.stroke();
          context.setTextAlign('left');
        });
        //画Y轴轴线
        if (yData.axisLine !== false) {
          context.beginPath();
          context.setStrokeStyle(yData.axisLineColor || '#cccccc');
          context.setLineWidth(1 * opts.pix);
          if (yAxisWidth.position == 'left') {
            context.moveTo(tStartLeft, opts.height - opts.area[2]);
            context.lineTo(tStartLeft, opts.area[0]);
          } else if (yAxisWidth.position == 'right') {
            context.moveTo(tStartRight, opts.height - opts.area[2]);
            context.lineTo(tStartRight, opts.area[0]);
          } else if (yAxisWidth.position == 'center') {
            context.moveTo(tStartCenter, opts.height - opts.area[2]);
            context.lineTo(tStartCenter, opts.area[0]);
          }
          context.stroke();
        }
        //画Y轴标题
        if (opts.yAxis.showTitle) {
          var titleFontSize = yData.titleFontSize * opts.pix || config.fontSize;
          var title = yData.title;
          context.beginPath();
          context.setFontSize(titleFontSize);
          context.setFillStyle(yData.titleFontColor || opts.fontColor);
          if (yAxisWidth.position == 'left') {
            context.fillText(title, tStartLeft - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          } else if (yAxisWidth.position == 'right') {
            context.fillText(title, tStartRight - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          } else if (yAxisWidth.position == 'center') {
            context.fillText(title, tStartCenter - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          }
          context.closePath();
          context.stroke();
        }
        if (yAxisWidth.position == 'left') {
          tStartLeft -= yAxisWidth.width + opts.yAxis.padding * opts.pix;
        } else {
          tStartRight += yAxisWidth.width + opts.yAxis.padding * opts.pix;
        }
      }};for (var i = 0; i < opts.yAxis.data.length; i++) {var points;_loop4(i);
    }
  }

}

function drawLegend(series, opts, config, context, chartData) {
  if (opts.legend.show === false) {
    return;
  }
  var legendData = chartData.legendData;
  var legendList = legendData.points;
  var legendArea = legendData.area;
  var padding = opts.legend.padding * opts.pix;
  var fontSize = opts.legend.fontSize * opts.pix;
  var shapeWidth = 15 * opts.pix;
  var shapeRight = 5 * opts.pix;
  var itemGap = opts.legend.itemGap * opts.pix;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pix, fontSize);
  //画背景及边框
  context.beginPath();
  context.setLineWidth(opts.legend.borderWidth * opts.pix);
  context.setStrokeStyle(opts.legend.borderColor);
  context.setFillStyle(opts.legend.backgroundColor);
  context.moveTo(legendArea.start.x, legendArea.start.y);
  context.rect(legendArea.start.x, legendArea.start.y, legendArea.width, legendArea.height);
  context.closePath();
  context.fill();
  context.stroke();
  legendList.forEach(function (itemList, listIndex) {
    var width = 0;
    var height = 0;
    width = legendData.widthArr[listIndex];
    height = legendData.heightArr[listIndex];
    var startX = 0;
    var startY = 0;
    if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
      switch (opts.legend.float) {
        case 'left':
          startX = legendArea.start.x + padding;
          break;
        case 'right':
          startX = legendArea.start.x + legendArea.width - width;
          break;
        default:
          startX = legendArea.start.x + (legendArea.width - width) / 2;}

      startY = legendArea.start.y + padding + listIndex * lineHeight;
    } else {
      if (listIndex == 0) {
        width = 0;
      } else {
        width = legendData.widthArr[listIndex - 1];
      }
      startX = legendArea.start.x + padding + width;
      startY = legendArea.start.y + padding + (legendArea.height - height) / 2;
    }
    context.setFontSize(config.fontSize);
    for (var i = 0; i < itemList.length; i++) {
      var item = itemList[i];
      item.area = [0, 0, 0, 0];
      item.area[0] = startX;
      item.area[1] = startY;
      item.area[3] = startY + lineHeight;
      context.beginPath();
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.show ? item.color : opts.legend.hiddenColor);
      context.setFillStyle(item.show ? item.color : opts.legend.hiddenColor);
      switch (item.legendShape) {
        case 'line':
          context.moveTo(startX, startY + 0.5 * lineHeight - 2 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 2 * opts.pix, 15 * opts.pix, 4 * opts.pix);
          break;
        case 'triangle':
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          break;
        case 'diamond':
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          break;
        case 'circle':
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight);
          context.arc(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight, 5 * opts.pix, 0, 2 * Math.PI);
          break;
        case 'rect':
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);
          break;
        case 'square':
          context.moveTo(startX + 5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX + 5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix, 10 * opts.pix, 10 * opts.pix);
          break;
        case 'none':
          break;
        default:
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);}

      context.closePath();
      context.fill();
      context.stroke();
      startX += shapeWidth + shapeRight;
      var fontTrans = 0.5 * lineHeight + 0.5 * fontSize - 2;
      var legendText = item.legendText ? item.legendText : item.name;
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.show ? opts.legend.fontColor : opts.legend.hiddenColor);
      context.fillText(legendText, startX, startY + fontTrans);
      context.closePath();
      context.stroke();
      if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
        startX += measureText(legendText, fontSize, context) + itemGap;
        item.area[2] = startX;
      } else {
        item.area[2] = startX + measureText(legendText, fontSize, context) + itemGap;;
        startX -= shapeWidth + shapeRight;
        startY += lineHeight;
      }
    }
  });
}

function drawPieDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var pieOption = assign({}, {
    activeOpacity: 0.5,
    activeRadius: 10,
    offsetAngle: 0,
    labelWidth: 15,
    ringWidth: 30,
    customRadius: 0,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    centerColor: '#FFFFFF',
    linearType: 'none',
    customColor: [] },
  opts.type == "pie" ? opts.extra.pie : opts.extra.ring);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = pieOption.activeRadius * opts.pix;
  }

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);
  radius = radius < 10 ? 10 : radius;
  if (pieOption.customRadius > 0) {
    radius = pieOption.customRadius * opts.pix;
  }
  series = getPieDataPoints(series, radius, process);
  var activeRadius = pieOption.activeRadius * opts.pix;
  pieOption.customColor = fillCustomColor(pieOption.linearType, pieOption.customColor, series, config);
  series = series.map(function (eachSeries) {
    eachSeries._start_ += pieOption.offsetAngle * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, pieOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_ + activeRadius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(pieOption.borderWidth * opts.pix);
    context.lineJoin = "round";
    context.setStrokeStyle(pieOption.borderColor);
    var fillcolor = eachSeries.color;
    if (pieOption.linearType == 'custom') {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, eachSeries._radius_);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, eachSeries._radius_);
      }
      grd.addColorStop(0, hexToRgb(pieOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(1, hexToRgb(eachSeries.color, 1));
      fillcolor = grd;
    }
    context.setFillStyle(fillcolor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (pieOption.border == true) {
      context.stroke();
    }
  });
  if (opts.type === 'ring') {
    var innerPieWidth = radius * 0.6;
    if (typeof pieOption.ringWidth === 'number' && pieOption.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - pieOption.ringWidth * opts.pix);
    }
    context.beginPath();
    context.setFillStyle(pieOption.centerColor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
  if (opts.dataLabel !== false && process === 1) {
    drawPieText(series, opts, config, context, radius, centerPosition);
  }
  if (process === 1 && opts.type === 'ring') {
    drawRingTitle(opts, config, context, centerPosition);
  }
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawRoseDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var roseOption = assign({}, {
    type: 'area',
    activeOpacity: 0.5,
    activeRadius: 10,
    offsetAngle: 0,
    labelWidth: 15,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    linearType: 'none',
    customColor: [] },
  opts.extra.rose);
  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = roseOption.activeRadius * opts.pix;
  }
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);
  radius = radius < 10 ? 10 : radius;
  var minRadius = roseOption.minRadius || radius * 0.5;
  series = getRoseDataPoints(series, roseOption.type, minRadius, radius, process);
  var activeRadius = roseOption.activeRadius * opts.pix;
  roseOption.customColor = fillCustomColor(roseOption.linearType, roseOption.customColor, series, config);
  series = series.map(function (eachSeries) {
    eachSeries._start_ += (roseOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, roseOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, activeRadius + eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(roseOption.borderWidth * opts.pix);
    context.lineJoin = "round";
    context.setStrokeStyle(roseOption.borderColor);
    var fillcolor = eachSeries.color;
    if (roseOption.linearType == 'custom') {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, eachSeries._radius_);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, eachSeries._radius_);
      }
      grd.addColorStop(0, hexToRgb(roseOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(1, hexToRgb(eachSeries.color, 1));
      fillcolor = grd;
    }
    context.setFillStyle(fillcolor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (roseOption.border == true) {
      context.stroke();
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    drawPieText(series, opts, config, context, radius, centerPosition);
  }
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawArcbarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var arcbarOption = assign({}, {
    startAngle: 0.75,
    endAngle: 0.25,
    type: 'default',
    direction: 'cw',
    lineCap: 'round',
    width: 12,
    gap: 2,
    linearType: 'none',
    customColor: [] },
  opts.extra.arcbar);
  series = getArcbarDataPoints(series, arcbarOption, process);
  var centerPosition;
  if (arcbarOption.centerX || arcbarOption.centerY) {
    centerPosition = {
      x: arcbarOption.centerX ? arcbarOption.centerX : opts.width / 2,
      y: arcbarOption.centerY ? arcbarOption.centerY : opts.height / 2 };

  } else {
    centerPosition = {
      x: opts.width / 2,
      y: opts.height / 2 };

  }
  var radius;
  if (arcbarOption.radius) {
    radius = arcbarOption.radius;
  } else {
    radius = Math.min(centerPosition.x, centerPosition.y);
    radius -= 5 * opts.pix;
    radius -= arcbarOption.width / 2;
  }
  radius = radius < 10 ? 10 : radius;
  arcbarOption.customColor = fillCustomColor(arcbarOption.linearType, arcbarOption.customColor, series, config);

  for (var i = 0; i < series.length; i++) {
    var eachSeries = series[i];
    //背景颜色
    context.setLineWidth(arcbarOption.width * opts.pix);
    context.setStrokeStyle(arcbarOption.backgroundColor || '#E9E9E9');
    context.setLineCap(arcbarOption.lineCap);
    context.beginPath();
    if (arcbarOption.type == 'default') {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, arcbarOption.startAngle * Math.PI, arcbarOption.endAngle * Math.PI, arcbarOption.direction == 'ccw');
    } else {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, 0, 2 * Math.PI, arcbarOption.direction == 'ccw');
    }
    context.stroke();
    //进度条
    var fillColor = eachSeries.color;
    if (arcbarOption.linearType == 'custom') {
      var grd = context.createLinearGradient(centerPosition.x - radius, centerPosition.y, centerPosition.x + radius, centerPosition.y);
      grd.addColorStop(1, hexToRgb(arcbarOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(0, hexToRgb(eachSeries.color, 1));
      fillColor = grd;
    }
    context.setLineWidth(arcbarOption.width * opts.pix);
    context.setStrokeStyle(fillColor);
    context.setLineCap(arcbarOption.lineCap);
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, arcbarOption.startAngle * Math.PI, eachSeries._proportion_ * Math.PI, arcbarOption.direction == 'ccw');
    context.stroke();
  }
  drawRingTitle(opts, config, context, centerPosition);
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawGaugeDataPoints(categories, series, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var gaugeOption = assign({}, {
    type: 'default',
    startAngle: 0.75,
    endAngle: 0.25,
    width: 15,
    labelOffset: 13,
    splitLine: {
      fixRadius: 0,
      splitNumber: 10,
      width: 15,
      color: '#FFFFFF',
      childNumber: 5,
      childWidth: 5 },

    pointer: {
      width: 15,
      color: 'auto' } },

  opts.extra.gauge);
  if (gaugeOption.oldAngle == undefined) {
    gaugeOption.oldAngle = gaugeOption.startAngle;
  }
  if (gaugeOption.oldData == undefined) {
    gaugeOption.oldData = 0;
  }
  categories = getGaugeAxisPoints(categories, gaugeOption.startAngle, gaugeOption.endAngle);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);
  radius -= 5 * opts.pix;
  radius -= gaugeOption.width / 2;
  radius = radius < 10 ? 10 : radius;
  var innerRadius = radius - gaugeOption.width;
  var totalAngle = 0;
  //判断仪表盘的样式：default百度样式，progress新样式
  if (gaugeOption.type == 'progress') {
    //## 第一步画中心圆形背景和进度条背景
    //中心圆形背景
    var pieRadius = radius - gaugeOption.width * 3;
    context.beginPath();
    var gradient = context.createLinearGradient(centerPosition.x, centerPosition.y - pieRadius, centerPosition.x, centerPosition.y + pieRadius);
    //配置渐变填充（起点：中心点向上减半径；结束点中心点向下加半径）
    gradient.addColorStop('0', hexToRgb(series[0].color, 0.3));
    gradient.addColorStop('1.0', hexToRgb("#FFFFFF", 0.1));
    context.setFillStyle(gradient);
    context.arc(centerPosition.x, centerPosition.y, pieRadius, 0, 2 * Math.PI, false);
    context.fill();
    //画进度条背景
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, gaugeOption.endAngle * Math.PI, false);
    context.stroke();
    //## 第二步画刻度线
    totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
    var childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    var startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    var endX = -radius - gaugeOption.width - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    var len = gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1;
    var proc = series[0].data * process;
    for (var i = 0; i < len; i++) {
      context.beginPath();
      //刻度线随进度变色
      if (proc > i / len) {
        context.setStrokeStyle(hexToRgb(series[0].color, 1));
      } else {
        context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
      }
      context.setLineWidth(3 * opts.pix);
      context.moveTo(startX, 0);
      context.lineTo(endX, 0);
      context.stroke();
      context.rotate(childAngle * Math.PI);
    }
    context.restore();
    //## 第三步画进度条
    series = getGaugeArcbarDataPoints(series, gaugeOption, process);
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(series[0].color);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, series[0]._proportion_ * Math.PI, false);
    context.stroke();
    //## 第四步画指针
    var pointerRadius = radius - gaugeOption.width * 2.5;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((series[0]._proportion_ - 1) * Math.PI);
    context.beginPath();
    context.setLineWidth(gaugeOption.width / 3);
    var gradient3 = context.createLinearGradient(0, -pointerRadius * 0.6, 0, pointerRadius * 0.6);
    gradient3.addColorStop('0', hexToRgb('#FFFFFF', 0));
    gradient3.addColorStop('0.5', hexToRgb(series[0].color, 1));
    gradient3.addColorStop('1.0', hexToRgb('#FFFFFF', 0));
    context.setStrokeStyle(gradient3);
    context.arc(0, 0, pointerRadius, 0.85 * Math.PI, 1.15 * Math.PI, false);
    context.stroke();
    context.beginPath();
    context.setLineWidth(1);
    context.setStrokeStyle(series[0].color);
    context.setFillStyle(series[0].color);
    context.moveTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2 - 4, 0);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, 4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.stroke();
    context.fill();
    context.restore();
    //default百度样式
  } else {
    //画背景
    context.setLineWidth(gaugeOption.width);
    context.setLineCap('butt');
    for (var _i26 = 0; _i26 < categories.length; _i26++) {
      var eachCategories = categories[_i26];
      context.beginPath();
      context.setStrokeStyle(eachCategories.color);
      context.arc(centerPosition.x, centerPosition.y, radius, eachCategories._startAngle_ * Math.PI, eachCategories._endAngle_ * Math.PI, false);
      context.stroke();
    }
    context.save();
    //画刻度线
    totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    var _splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
    var _childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    var _startX2 = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    var _endX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    var childendX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.childWidth;
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    for (var _i27 = 0; _i27 < gaugeOption.splitLine.splitNumber + 1; _i27++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(2 * opts.pix);
      context.moveTo(_startX2, 0);
      context.lineTo(_endX, 0);
      context.stroke();
      context.rotate(_splitAngle * Math.PI);
    }
    context.restore();
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    for (var _i28 = 0; _i28 < gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1; _i28++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(1 * opts.pix);
      context.moveTo(_startX2, 0);
      context.lineTo(childendX, 0);
      context.stroke();
      context.rotate(_childAngle * Math.PI);
    }
    context.restore();
    //画指针
    series = getGaugeDataPoints(series, categories, gaugeOption, process);
    for (var _i29 = 0; _i29 < series.length; _i29++) {
      var eachSeries = series[_i29];
      context.save();
      context.translate(centerPosition.x, centerPosition.y);
      context.rotate((eachSeries._proportion_ - 1) * Math.PI);
      context.beginPath();
      context.setFillStyle(eachSeries.color);
      context.moveTo(gaugeOption.pointer.width, 0);
      context.lineTo(0, -gaugeOption.pointer.width / 2);
      context.lineTo(-innerRadius, 0);
      context.lineTo(0, gaugeOption.pointer.width / 2);
      context.lineTo(gaugeOption.pointer.width, 0);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFillStyle('#FFFFFF');
      context.arc(0, 0, gaugeOption.pointer.width / 6, 0, 2 * Math.PI, false);
      context.fill();
      context.restore();
    }
    if (opts.dataLabel !== false) {
      drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context);
    }
  }
  //画仪表盘标题，副标题
  drawRingTitle(opts, config, context, centerPosition);
  if (process === 1 && opts.type === 'gauge') {
    opts.extra.gauge.oldAngle = series[0]._proportion_;
    opts.extra.gauge.oldData = series[0].data;
  }
  return {
    center: centerPosition,
    radius: radius,
    innerRadius: innerRadius,
    categories: categories,
    totalAngle: totalAngle };

}

function drawRadarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var radarOption = assign({}, {
    gridColor: '#cccccc',
    gridType: 'radar',
    gridEval: 1,
    axisLabel: false,
    axisLabelTofix: 0,
    labelColor: '#666666',
    labelPointShow: false,
    labelPointRadius: 3,
    labelPointColor: '#cccccc',
    opacity: 0.2,
    gridCount: 3,
    border: false,
    borderWidth: 2,
    linearType: 'none',
    customColor: [] },
  opts.extra.radar);
  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  var xr = (opts.width - opts.area[1] - opts.area[3]) / 2;
  var yr = (opts.height - opts.area[0] - opts.area[2]) / 2;
  var radius = Math.min(xr - (getMaxTextListLength(opts.categories, config.fontSize, context) + config.radarLabelTextMargin), yr - config.radarLabelTextMargin);
  radius -= config.radarLabelTextMargin * opts.pix;
  radius = radius < 10 ? 10 : radius;
  // 画分割线
  context.beginPath();
  context.setLineWidth(1 * opts.pix);
  context.setStrokeStyle(radarOption.gridColor);
  coordinateAngle.forEach(function (angle, index) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    if (index % radarOption.gridEval == 0) {
      context.lineTo(pos.x, pos.y);
    }
  });
  context.stroke();
  context.closePath();

  // 画背景网格
  var _loop = function _loop(i) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1 * opts.pix);
    context.setStrokeStyle(radarOption.gridColor);
    if (radarOption.gridType == 'radar') {
      coordinateAngle.forEach(function (angle, index) {
        var pos = convertCoordinateOrigin(radius / radarOption.gridCount * i * Math.cos(angle), radius /
        radarOption.gridCount * i * Math.sin(angle), centerPosition);
        if (index === 0) {
          startPos = pos;
          context.moveTo(pos.x, pos.y);
        } else {
          context.lineTo(pos.x, pos.y);
        }
      });
      context.lineTo(startPos.x, startPos.y);
    } else {
      var pos = convertCoordinateOrigin(radius / radarOption.gridCount * i * Math.cos(1.5), radius / radarOption.gridCount * i * Math.sin(1.5), centerPosition);
      context.arc(centerPosition.x, centerPosition.y, centerPosition.y - pos.y, 0, 2 * Math.PI, false);
    }
    context.stroke();
    context.closePath();
  };
  for (var i = 1; i <= radarOption.gridCount; i++) {
    _loop(i);
  }
  radarOption.customColor = fillCustomColor(radarOption.linearType, radarOption.customColor, series, config);
  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);
  radarDataPoints.forEach(function (eachSeries, seriesIndex) {
    // 绘制区域数据
    context.beginPath();
    context.setLineWidth(radarOption.borderWidth * opts.pix);
    context.setStrokeStyle(eachSeries.color);

    var fillcolor = hexToRgb(eachSeries.color, radarOption.opacity);
    if (radarOption.linearType == 'custom') {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, radius);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, radius);
      }
      grd.addColorStop(0, hexToRgb(radarOption.customColor[series[seriesIndex].linearIndex], radarOption.opacity));
      grd.addColorStop(1, hexToRgb(eachSeries.color, radarOption.opacity));
      fillcolor = grd;
    }

    context.setFillStyle(fillcolor);
    eachSeries.data.forEach(function (item, index) {
      if (index === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();
    if (radarOption.border === true) {
      context.stroke();
    }
    context.closePath();
    if (opts.dataPointShape !== false) {
      var points = eachSeries.data.map(function (item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  // 画刻度值
  if (radarOption.axisLabel === true) {
    var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));
    var stepLength = radius / radarOption.gridCount;
    var fontSize = opts.fontSize * opts.pix;
    context.setFontSize(fontSize);
    context.setFillStyle(opts.fontColor);
    context.setTextAlign('left');
    for (var i = 0; i < radarOption.gridCount + 1; i++) {
      var label = i * maxData / radarOption.gridCount;
      label = label.toFixed(radarOption.axisLabelTofix);
      context.fillText(String(label), centerPosition.x + 3 * opts.pix, centerPosition.y - i * stepLength + fontSize / 2);
    }
  }

  // draw label text
  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);

  // draw dataLabel
  if (opts.dataLabel !== false && process === 1) {
    radarDataPoints.forEach(function (eachSeries, seriesIndex) {
      context.beginPath();
      var fontSize = eachSeries.textSize * opts.pix || config.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(eachSeries.textColor || opts.fontColor);
      eachSeries.data.forEach(function (item, index) {
        //如果是中心点垂直的上下点位
        if (Math.abs(item.position.x - centerPosition.x) < 2) {
          //如果在上面
          if (item.position.y < centerPosition.y) {
            context.setTextAlign('center');
            context.fillText(item.value, item.position.x, item.position.y - 4);
          } else {
            context.setTextAlign('center');
            context.fillText(item.value, item.position.x, item.position.y + fontSize + 2);
          }
        } else {
          //如果在左侧
          if (item.position.x < centerPosition.x) {
            context.setTextAlign('right');
            context.fillText(item.value, item.position.x - 4, item.position.y + fontSize / 2 - 2);
          } else {
            context.setTextAlign('left');
            context.fillText(item.value, item.position.x + 4, item.position.y + fontSize / 2 - 2);
          }
        }
      });
      context.closePath();
      context.stroke();
    });
    context.setTextAlign('left');
  }

  return {
    center: centerPosition,
    radius: radius,
    angleList: coordinateAngle };

}

// 经纬度转墨卡托
function lonlat2mercator(longitude, latitude) {
  var mercator = Array(2);
  var x = longitude * 20037508.34 / 180;
  var y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  mercator[0] = x;
  mercator[1] = y;
  return mercator;
}

// 墨卡托转经纬度
function mercator2lonlat(longitude, latitude) {
  var lonlat = Array(2);
  var x = longitude / 20037508.34 * 180;
  var y = latitude / 20037508.34 * 180;
  y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
  lonlat[0] = x;
  lonlat[1] = y;
  return lonlat;
}

function getBoundingBox(data) {
  var bounds = {},coords;
  bounds.xMin = 180;
  bounds.xMax = 0;
  bounds.yMin = 90;
  bounds.yMax = 0;
  for (var i = 0; i < data.length; i++) {
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var longitude = coords[j][0];
        var latitude = coords[j][1];
        var point = {
          x: longitude,
          y: latitude };

        bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x;
        bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x;
        bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y;
        bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y;
      }
    }
  }
  return bounds;
}

function coordinateToPoint(latitude, longitude, bounds, scale, xoffset, yoffset) {
  return {
    x: (longitude - bounds.xMin) * scale + xoffset,
    y: (bounds.yMax - latitude) * scale + yoffset };

}

function pointToCoordinate(pointY, pointX, bounds, scale, xoffset, yoffset) {
  return {
    x: (pointX - xoffset) / scale + bounds.xMin,
    y: bounds.yMax - (pointY - yoffset) / scale };

}

function isRayIntersectsSegment(poi, s_poi, e_poi) {
  if (s_poi[1] == e_poi[1]) {
    return false;
  }
  if (s_poi[1] > poi[1] && e_poi[1] > poi[1]) {
    return false;
  }
  if (s_poi[1] < poi[1] && e_poi[1] < poi[1]) {
    return false;
  }
  if (s_poi[1] == poi[1] && e_poi[1] > poi[1]) {
    return false;
  }
  if (e_poi[1] == poi[1] && s_poi[1] > poi[1]) {
    return false;
  }
  if (s_poi[0] < poi[0] && e_poi[1] < poi[1]) {
    return false;
  }
  var xseg = e_poi[0] - (e_poi[0] - s_poi[0]) * (e_poi[1] - poi[1]) / (e_poi[1] - s_poi[1]);
  if (xseg < poi[0]) {
    return false;
  } else {
    return true;
  }
}

function isPoiWithinPoly(poi, poly, mercator) {
  var sinsc = 0;
  for (var i = 0; i < poly.length; i++) {
    var epoly = poly[i][0];
    if (poly.length == 1) {
      epoly = poly[i][0];
    }
    for (var j = 0; j < epoly.length - 1; j++) {
      var s_poi = epoly[j];
      var e_poi = epoly[j + 1];
      if (mercator) {
        s_poi = lonlat2mercator(epoly[j][0], epoly[j][1]);
        e_poi = lonlat2mercator(epoly[j + 1][0], epoly[j + 1][1]);
      }
      if (isRayIntersectsSegment(poi, s_poi, e_poi)) {
        sinsc += 1;
      }
    }
  }
  if (sinsc % 2 == 1) {
    return true;
  } else {
    return false;
  }
}

function drawMapDataPoints(series, opts, config, context) {
  var mapOption = assign({}, {
    border: true,
    mercator: false,
    borderWidth: 1,
    active: true,
    borderColor: '#666666',
    fillOpacity: 0.6,
    activeBorderColor: '#f04864',
    activeFillColor: '#facc14',
    activeFillOpacity: 1 },
  opts.extra.map);
  var coords, point;
  var data = series;
  var bounds = getBoundingBox(data);
  if (mapOption.mercator) {
    var max = lonlat2mercator(bounds.xMax, bounds.yMax);
    var min = lonlat2mercator(bounds.xMin, bounds.yMin);
    bounds.xMax = max[0];
    bounds.yMax = max[1];
    bounds.xMin = min[0];
    bounds.yMin = min[1];
  }
  var xScale = opts.width / Math.abs(bounds.xMax - bounds.xMin);
  var yScale = opts.height / Math.abs(bounds.yMax - bounds.yMin);
  var scale = xScale < yScale ? xScale : yScale;
  var xoffset = opts.width / 2 - Math.abs(bounds.xMax - bounds.xMin) / 2 * scale;
  var yoffset = opts.height / 2 - Math.abs(bounds.yMax - bounds.yMin) / 2 * scale;
  for (var i = 0; i < data.length; i++) {
    context.beginPath();
    context.setLineWidth(mapOption.borderWidth * opts.pix);
    context.setStrokeStyle(mapOption.borderColor);
    context.setFillStyle(hexToRgb(series[i].color, series[i].fillOpacity || mapOption.fillOpacity));
    if (mapOption.active == true && opts.tooltip) {
      if (opts.tooltip.index == i) {
        context.setStrokeStyle(mapOption.activeBorderColor);
        context.setFillStyle(hexToRgb(mapOption.activeFillColor, mapOption.activeFillOpacity));
      }
    }
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var gaosi = Array(2);
        if (mapOption.mercator) {
          gaosi = lonlat2mercator(coords[j][0], coords[j][1]);
        } else {
          gaosi = coords[j];
        }
        point = coordinateToPoint(gaosi[1], gaosi[0], bounds, scale, xoffset, yoffset);
        if (j === 0) {
          context.beginPath();
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }
      context.fill();
      if (mapOption.border == true) {
        context.stroke();
      }
    }
  }
  if (opts.dataLabel == true) {
    for (var i = 0; i < data.length; i++) {
      var centerPoint = data[i].properties.centroid;
      if (centerPoint) {
        if (mapOption.mercator) {
          centerPoint = lonlat2mercator(data[i].properties.centroid[0], data[i].properties.centroid[1]);
        }
        point = coordinateToPoint(centerPoint[1], centerPoint[0], bounds, scale, xoffset, yoffset);
        var fontSize = data[i].textSize * opts.pix || config.fontSize;
        var fontColor = data[i].textColor || opts.fontColor;
        if (mapOption.active && mapOption.activeTextColor && opts.tooltip && opts.tooltip.index == i) {
          fontColor = mapOption.activeTextColor;
        }
        var text = data[i].properties.name;
        context.beginPath();
        context.setFontSize(fontSize);
        context.setFillStyle(fontColor);
        context.fillText(text, point.x - measureText(text, fontSize, context) / 2, point.y + fontSize / 2);
        context.closePath();
        context.stroke();
      }
    }
  }
  opts.chartData.mapData = {
    bounds: bounds,
    scale: scale,
    xoffset: xoffset,
    yoffset: yoffset,
    mercator: mapOption.mercator };

  drawToolTipBridge(opts, config, context, 1);
  context.draw();
}

function normalInt(min, max, iter) {
  iter = iter == 0 ? 1 : iter;
  var arr = [];
  for (var i = 0; i < iter; i++) {
    arr[i] = Math.random();
  };
  return Math.floor(arr.reduce(function (i, j) {
    return i + j;
  }) / iter * (max - min)) + min;
};

function collisionNew(area, points, width, height) {
  var isIn = false;
  for (var i = 0; i < points.length; i++) {
    if (points[i].area) {
      if (area[3] < points[i].area[1] || area[0] > points[i].area[2] || area[1] > points[i].area[3] || area[2] < points[i].area[0]) {
        if (area[0] < 0 || area[1] < 0 || area[2] > width || area[3] > height) {
          isIn = true;
          break;
        } else {
          isIn = false;
        }
      } else {
        isIn = true;
        break;
      }
    }
  }
  return isIn;
};

function getWordCloudPoint(opts, type, context) {
  var points = opts.series;
  switch (type) {
    case 'normal':
      for (var i = 0; i < points.length; i++) {
        var text = points[i].name;
        var tHeight = points[i].textSize * opts.pix;
        var tWidth = measureText(text, tHeight, context);
        var x = void 0,y = void 0;
        var area = void 0;
        var breaknum = 0;
        while (true) {
          breaknum++;
          x = normalInt(-opts.width / 2, opts.width / 2, 5) - tWidth / 2;
          y = normalInt(-opts.height / 2, opts.height / 2, 5) + tHeight / 2;
          area = [x - 5 + opts.width / 2, y - 5 - tHeight + opts.height / 2, x + tWidth + 5 + opts.width / 2, y + 5 +
          opts.height / 2];

          var isCollision = collisionNew(area, points, opts.width, opts.height);
          if (!isCollision) break;
          if (breaknum == 1000) {
            area = [-100, -100, -100, -100];
            break;
          }
        };
        points[i].area = area;
      }
      break;
    case 'vertical':var
      Spin = function Spin() {
        //获取均匀随机值，是否旋转，旋转的概率为（1-0.5）
        if (Math.random() > 0.7) {
          return true;
        } else {
          return false;
        };
      };;
      for (var _i30 = 0; _i30 < points.length; _i30++) {
        var _text = points[_i30].name;
        var _tHeight = points[_i30].textSize * opts.pix;
        var _tWidth = measureText(_text, _tHeight, context);
        var isSpin = Spin();
        var _x = void 0,_y = void 0,_area = void 0,areav = void 0;
        var _breaknum = 0;
        while (true) {
          _breaknum++;
          var _isCollision = void 0;
          if (isSpin) {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_y - 5 - _tWidth + opts.width / 2, -_x - 5 + opts.height / 2, _y + 5 + opts.width / 2, -_x + _tHeight + 5 + opts.height / 2];
            areav = [opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) - 5, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) - 5, opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) + _tHeight, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) + _tWidth + 5];
            _isCollision = collisionNew(areav, points, opts.height, opts.width);
          } else {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_x - 5 + opts.width / 2, _y - 5 - _tHeight + opts.height / 2, _x + _tWidth + 5 + opts.width / 2, _y + 5 + opts.height / 2];
            _isCollision = collisionNew(_area, points, opts.width, opts.height);
          }
          if (!_isCollision) break;
          if (_breaknum == 1000) {
            _area = [-1000, -1000, -1000, -1000];
            break;
          }
        };
        if (isSpin) {
          points[_i30].area = areav;
          points[_i30].areav = _area;
        } else {
          points[_i30].area = _area;
        }
        points[_i30].rotate = isSpin;
      };
      break;}

  return points;
}

function drawWordCloudDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var wordOption = assign({}, {
    type: 'normal',
    autoColors: true },
  opts.extra.word);
  if (!opts.chartData.wordCloudData) {
    opts.chartData.wordCloudData = getWordCloudPoint(opts, wordOption.type, context);
  }
  context.beginPath();
  context.setFillStyle(opts.background);
  context.rect(0, 0, opts.width, opts.height);
  context.fill();
  context.save();
  var points = opts.chartData.wordCloudData;
  context.translate(opts.width / 2, opts.height / 2);
  for (var i = 0; i < points.length; i++) {
    context.save();
    if (points[i].rotate) {
      context.rotate(90 * Math.PI / 180);
    }
    var text = points[i].name;
    var tHeight = points[i].textSize * opts.pix;
    var tWidth = measureText(text, tHeight, context);
    context.beginPath();
    context.setStrokeStyle(points[i].color);
    context.setFillStyle(points[i].color);
    context.setFontSize(tHeight);
    if (points[i].rotate) {
      if (points[i].areav[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    } else {
      if (points[i].area[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    }
    context.stroke();
    context.restore();
  }
  context.restore();
}

function drawFunnelDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var funnelOption = assign({}, {
    type: 'funnel',
    activeWidth: 10,
    activeOpacity: 0.3,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    fillOpacity: 1,
    minSize: 0,
    labelAlign: 'right',
    linearType: 'none',
    customColor: [] },
  opts.extra.funnel);
  var eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / series.length;
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.height - opts.area[2] };

  var activeWidth = funnelOption.activeWidth * opts.pix;
  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - activeWidth, (opts.height - opts.area[0] - opts.area[2]) / 2 - activeWidth);
  var seriesNew = getFunnelDataPoints(series, radius, funnelOption, eachSpacing, process);
  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  funnelOption.customColor = fillCustomColor(funnelOption.linearType, funnelOption.customColor, series, config);
  if (funnelOption.type == 'pyramid') {
    for (var i = 0; i < seriesNew.length; i++) {
      if (i == seriesNew.length - 1) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[i].color, funnelOption.activeOpacity));
            context.moveTo(-activeWidth, -eachSpacing);
            context.lineTo(-seriesNew[i].radius - activeWidth, 0);
            context.lineTo(seriesNew[i].radius + activeWidth, 0);
            context.lineTo(activeWidth, -eachSpacing);
            context.lineTo(-activeWidth, -eachSpacing);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[i].funnelArea = [centerPosition.x - seriesNew[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + seriesNew[i].radius, centerPosition.y - eachSpacing * i];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(seriesNew[i].radius, -eachSpacing, -seriesNew[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, -eachSpacing);
        context.lineTo(-seriesNew[i].radius, 0);
        context.lineTo(seriesNew[i].radius, 0);
        context.lineTo(0, -eachSpacing);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      } else {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[i].color, funnelOption.activeOpacity));
            context.moveTo(0, 0);
            context.lineTo(-seriesNew[i].radius - activeWidth, 0);
            context.lineTo(-seriesNew[i + 1].radius - activeWidth, -eachSpacing);
            context.lineTo(seriesNew[i + 1].radius + activeWidth, -eachSpacing);
            context.lineTo(seriesNew[i].radius + activeWidth, 0);
            context.lineTo(0, 0);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[i].funnelArea = [centerPosition.x - seriesNew[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + seriesNew[i].radius, centerPosition.y - eachSpacing * i];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(seriesNew[i].radius, -eachSpacing, -seriesNew[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-seriesNew[i].radius, 0);
        context.lineTo(-seriesNew[i + 1].radius, -eachSpacing);
        context.lineTo(seriesNew[i + 1].radius, -eachSpacing);
        context.lineTo(seriesNew[i].radius, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      }
      context.translate(0, -eachSpacing);
    }
  } else {
    context.translate(0, -(seriesNew.length - 1) * eachSpacing);
    for (var _i31 = 0; _i31 < seriesNew.length; _i31++) {
      if (_i31 == seriesNew.length - 1) {
        if (opts.tooltip) {
          if (opts.tooltip.index == _i31) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[_i31].color, funnelOption.activeOpacity));
            context.moveTo(-activeWidth - funnelOption.minSize / 2, 0);
            context.lineTo(-seriesNew[_i31].radius - activeWidth, -eachSpacing);
            context.lineTo(seriesNew[_i31].radius + activeWidth, -eachSpacing);
            context.lineTo(activeWidth + funnelOption.minSize / 2, 0);
            context.lineTo(-activeWidth - funnelOption.minSize / 2, 0);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[_i31].funnelArea = [centerPosition.x - seriesNew[_i31].radius, centerPosition.y - eachSpacing, centerPosition.x + seriesNew[_i31].radius, centerPosition.y];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[_i31].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(seriesNew[_i31].radius, -eachSpacing, -seriesNew[_i31].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[_i31].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[_i31].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[_i31].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-funnelOption.minSize / 2, 0);
        context.lineTo(-seriesNew[_i31].radius, -eachSpacing);
        context.lineTo(seriesNew[_i31].radius, -eachSpacing);
        context.lineTo(funnelOption.minSize / 2, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      } else {
        if (opts.tooltip) {
          if (opts.tooltip.index == _i31) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[_i31].color, funnelOption.activeOpacity));
            context.moveTo(0, 0);
            context.lineTo(-seriesNew[_i31 + 1].radius - activeWidth, 0);
            context.lineTo(-seriesNew[_i31].radius - activeWidth, -eachSpacing);
            context.lineTo(seriesNew[_i31].radius + activeWidth, -eachSpacing);
            context.lineTo(seriesNew[_i31 + 1].radius + activeWidth, 0);
            context.lineTo(0, 0);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[_i31].funnelArea = [centerPosition.x - seriesNew[_i31].radius, centerPosition.y - eachSpacing * (seriesNew.length - _i31), centerPosition.x + seriesNew[_i31].radius, centerPosition.y - eachSpacing * (seriesNew.length - _i31 - 1)];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[_i31].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(seriesNew[_i31].radius, -eachSpacing, -seriesNew[_i31].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[_i31].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[_i31].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[_i31].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-seriesNew[_i31 + 1].radius, 0);
        context.lineTo(-seriesNew[_i31].radius, -eachSpacing);
        context.lineTo(seriesNew[_i31].radius, -eachSpacing);
        context.lineTo(seriesNew[_i31 + 1].radius, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      }
      context.translate(0, eachSpacing);
    }
  }

  context.restore();
  if (opts.dataLabel !== false && process === 1) {
    drawFunnelText(seriesNew, opts, context, eachSpacing, funnelOption.labelAlign, activeWidth, centerPosition);
  }
  if (process === 1) {
    drawFunnelCenterText(seriesNew, opts, context, eachSpacing, funnelOption.labelAlign, activeWidth, centerPosition);
  }
  return {
    center: centerPosition,
    radius: radius,
    series: seriesNew };

}

function drawFunnelText(series, opts, context, eachSpacing, labelAlign, activeWidth, centerPosition) {
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    if (item.labelShow === false) {
      continue;
    }
    var startX = void 0,endX = void 0,startY = void 0,fontSize = void 0;
    var text = item.formatter ? item.formatter(item, i, series, opts) : util.toFixed(item._proportion_ * 100) + '%';
    text = item.labelText ? item.labelText : text;
    if (labelAlign == 'right') {
      if (i == series.length - 1) {
        startX = (item.funnelArea[2] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[2] + series[i + 1].funnelArea[2]) / 2;
      }
      endX = startX + activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize * opts.pix || opts.fontSize * opts.pix;
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2 * opts.pix, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || opts.fontColor);
      context.fillText(text, endX + 5, startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }
    if (labelAlign == 'left') {
      if (i == series.length - 1) {
        startX = (item.funnelArea[0] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[0] + series[i + 1].funnelArea[0]) / 2;
      }
      endX = startX - activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize * opts.pix || opts.fontSize * opts.pix;
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || opts.fontColor);
      context.fillText(text, endX - 5 - measureText(text, fontSize, context), startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }
  }
}

function drawFunnelCenterText(series, opts, context, eachSpacing, labelAlign, activeWidth, centerPosition) {
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var startY = void 0,fontSize = void 0;
    if (item.centerText) {
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.centerTextSize * opts.pix || opts.fontSize * opts.pix;
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.centerTextColor || "#FFFFFF");
      context.fillText(item.centerText, centerPosition.x - measureText(item.centerText, fontSize, context) / 2, startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }
  }
}


function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },
  linear: function linear(pos) {
    return pos;
  } };


function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'easeInOut';
  var delay = 17;
  function createAnimationFrame() {
    if (typeof setTimeout !== 'undefined') {
      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else {
      return function (step) {
        step(null);
      };
    }
  };
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;
  var _step = function step(timestamp) {
    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);
      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);
  animationFrame(_step, delay);
}

Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {var _this2 = this;
  var _this = this;
  var series = opts.series;
  //兼容ECharts饼图类数据格式
  if (type === 'pie' || type === 'ring' || type === 'mount' || type === 'rose' || type === 'funnel') {
    series = fixPieSeries(series, opts, config);
  }
  var categories = opts.categories;
  if (type === 'mount') {
    categories = [];
    for (var j = 0; j < series.length; j++) {
      if (series[j].show !== false) categories.push(series[j].name);
    }
    opts.categories = categories;
  }
  series = fillSeries(series, opts, config);
  var duration = opts.animation ? opts.duration : 0;
  _this.animationInstance && _this.animationInstance.stop();
  var seriesMA = null;
  if (type == 'candle') {
    var average = assign({}, opts.extra.candle.average);
    if (average.show) {
      seriesMA = calCandleMA(average.day, average.name, average.color, series[0].data);
      seriesMA = fillSeries(seriesMA, opts, config);
      opts.seriesMA = seriesMA;
    } else if (opts.seriesMA) {
      seriesMA = opts.seriesMA = fillSeries(opts.seriesMA, opts, config);
    } else {
      seriesMA = series;
    }
  } else {
    seriesMA = series;
  }
  /* 过滤掉show=false的series */
  opts._series_ = series = filterSeries(series);
  //重新计算图表区域
  opts.area = new Array(4);
  //复位绘图区域
  for (var _j11 = 0; _j11 < 4; _j11++) {
    opts.area[_j11] = opts.padding[_j11] * opts.pix;
  }
  //通过计算三大区域：图例、X轴、Y轴的大小，确定绘图区域
  var _calLegendData = calLegendData(seriesMA, opts, config, opts.chartData, context),
  legendHeight = _calLegendData.area.wholeHeight,
  legendWidth = _calLegendData.area.wholeWidth;

  switch (opts.legend.position) {
    case 'top':
      opts.area[0] += legendHeight;
      break;
    case 'bottom':
      opts.area[2] += legendHeight;
      break;
    case 'left':
      opts.area[3] += legendWidth;
      break;
    case 'right':
      opts.area[1] += legendWidth;
      break;}


  var _calYAxisData = {},
  yAxisWidth = 0;
  if (opts.type === 'line' || opts.type === 'column' || opts.type === 'mount' || opts.type === 'area' || opts.type === 'mix' || opts.type === 'candle' || opts.type === 'scatter' || opts.type === 'bubble' || opts.type === 'bar') {
    _calYAxisData = calYAxisData(series, opts, config, context);
    yAxisWidth = _calYAxisData.yAxisWidth;
    //如果显示Y轴标题
    if (opts.yAxis.showTitle) {
      var maxTitleHeight = 0;
      for (var i = 0; i < opts.yAxis.data.length; i++) {
        maxTitleHeight = Math.max(maxTitleHeight, opts.yAxis.data[i].titleFontSize ? opts.yAxis.data[i].titleFontSize * opts.pix : config.fontSize);
      }
      opts.area[0] += maxTitleHeight;
    }
    var rightIndex = 0,
    leftIndex = 0;
    //计算主绘图区域左右位置
    for (var _i32 = 0; _i32 < yAxisWidth.length; _i32++) {
      if (yAxisWidth[_i32].position == 'left') {
        if (leftIndex > 0) {
          opts.area[3] += yAxisWidth[_i32].width + opts.yAxis.padding * opts.pix;
        } else {
          opts.area[3] += yAxisWidth[_i32].width;
        }
        leftIndex += 1;
      } else if (yAxisWidth[_i32].position == 'right') {
        if (rightIndex > 0) {
          opts.area[1] += yAxisWidth[_i32].width + opts.yAxis.padding * opts.pix;
        } else {
          opts.area[1] += yAxisWidth[_i32].width;
        }
        rightIndex += 1;
      }
    }
  } else {
    config.yAxisWidth = yAxisWidth;
  }
  opts.chartData.yAxisData = _calYAxisData;

  if (opts.categories && opts.categories.length && opts.type !== 'radar' && opts.type !== 'gauge' && opts.type !== 'bar') {
    opts.chartData.xAxisData = getXAxisPoints(opts.categories, opts, config);
    var _calCategoriesData = calCategoriesData(opts.categories, opts, config, opts.chartData.xAxisData.eachSpacing, context),
    xAxisHeight = _calCategoriesData.xAxisHeight,
    angle = _calCategoriesData.angle;
    config.xAxisHeight = xAxisHeight;
    config._xAxisTextAngle_ = angle;
    opts.area[2] += xAxisHeight;
    opts.chartData.categoriesData = _calCategoriesData;
  } else {
    if (opts.type === 'line' || opts.type === 'area' || opts.type === 'scatter' || opts.type === 'bubble' || opts.type === 'bar') {
      opts.chartData.xAxisData = calXAxisData(series, opts, config, context);
      categories = opts.chartData.xAxisData.rangesFormat;
      var _calCategoriesData2 = calCategoriesData(categories, opts, config, opts.chartData.xAxisData.eachSpacing, context),
      _xAxisHeight = _calCategoriesData2.xAxisHeight,
      _angle = _calCategoriesData2.angle;
      config.xAxisHeight = _xAxisHeight;
      config._xAxisTextAngle_ = _angle;
      opts.area[2] += _xAxisHeight;
      opts.chartData.categoriesData = _calCategoriesData2;
    } else {
      opts.chartData.xAxisData = {
        xAxisPoints: [] };

    }
  }

  //计算右对齐偏移距离
  if (opts.enableScroll && opts.xAxis.scrollAlign == 'right' && opts._scrollDistance_ === undefined) {
    var offsetLeft = 0,
    xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
    startX = opts.chartData.xAxisData.startX,
    endX = opts.chartData.xAxisData.endX,
    eachSpacing = opts.chartData.xAxisData.eachSpacing;
    var totalWidth = eachSpacing * (xAxisPoints.length - 1);
    var screenWidth = endX - startX;
    offsetLeft = screenWidth - totalWidth;
    _this.scrollOption.currentOffset = offsetLeft;
    _this.scrollOption.startTouchX = offsetLeft;
    _this.scrollOption.distance = 0;
    _this.scrollOption.lastMoveTime = 0;
    opts._scrollDistance_ = offsetLeft;
  }

  if (type === 'pie' || type === 'ring' || type === 'rose') {
    config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(seriesMA, config, context, opts);
  }

  switch (type) {
    case 'word':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawWordCloudDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'map':
      context.clearRect(0, 0, opts.width, opts.height);
      drawMapDataPoints(series, opts, config, context);
      setTimeout(function () {
        _this2.uevent.trigger('renderComplete');
      }, 50);
      break;
    case 'funnel':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.funnelData = drawFunnelDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'line':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawLineDataPoints.xAxisPoints,
          calPoints = _drawLineDataPoints.calPoints,
          eachSpacing = _drawLineDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'scatter':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawScatterDataPoints = drawScatterDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawScatterDataPoints.xAxisPoints,
          calPoints = _drawScatterDataPoints.calPoints,
          eachSpacing = _drawScatterDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'bubble':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawBubbleDataPoints = drawBubbleDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawBubbleDataPoints.xAxisPoints,
          calPoints = _drawBubbleDataPoints.calPoints,
          eachSpacing = _drawBubbleDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'mix':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawMixDataPoints = drawMixDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawMixDataPoints.xAxisPoints,
          calPoints = _drawMixDataPoints.calPoints,
          eachSpacing = _drawMixDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'column':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawColumnDataPoints.xAxisPoints,
          calPoints = _drawColumnDataPoints.calPoints,
          eachSpacing = _drawColumnDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'mount':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawMountDataPoints = drawMountDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawMountDataPoints.xAxisPoints,
          calPoints = _drawMountDataPoints.calPoints,
          eachSpacing = _drawMountDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'bar':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawXAxis(categories, opts, config, context);
          var _drawBarDataPoints = drawBarDataPoints(series, opts, config, context, process),
          yAxisPoints = _drawBarDataPoints.yAxisPoints,
          calPoints = _drawBarDataPoints.calPoints,
          eachSpacing = _drawBarDataPoints.eachSpacing;
          opts.chartData.yAxisPoints = yAxisPoints;
          opts.chartData.xAxisPoints = opts.chartData.xAxisData.xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, yAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'area':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawAreaDataPoints.xAxisPoints,
          calPoints = _drawAreaDataPoints.calPoints,
          eachSpacing = _drawAreaDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'ring':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'pie':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'rose':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawRoseDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'radar':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'arcbar':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.arcbarData = drawArcbarDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'gauge':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.gaugeData = drawGaugeDataPoints(categories, series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'candle':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawCandleDataPoints = drawCandleDataPoints(series, seriesMA, opts, config, context, process),
          xAxisPoints = _drawCandleDataPoints.xAxisPoints,
          calPoints = _drawCandleDataPoints.calPoints,
          eachSpacing = _drawCandleDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          if (seriesMA) {
            drawLegend(seriesMA, opts, config, context, opts.chartData);
          } else {
            drawLegend(opts.series, opts, config, context, opts.chartData);
          }
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;}

}

function uChartsEvent() {
  this.events = {};
}

uChartsEvent.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

uChartsEvent.prototype.delEventListener = function (type) {
  this.events[type] = [];
};

uChartsEvent.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        //console.log('[uCharts] '+e);
      }
    });
  }
};

var uCharts = function uCharts(opts) {
  opts.pix = opts.pixelRatio ? opts.pixelRatio : 1;
  opts.fontSize = opts.fontSize ? opts.fontSize : 13;
  opts.fontColor = opts.fontColor ? opts.fontColor : config.fontColor;
  if (opts.background == "" || opts.background == "none") {
    opts.background = "#FFFFFF";
  }
  opts.title = assign({}, opts.title);
  opts.subtitle = assign({}, opts.subtitle);
  opts.duration = opts.duration ? opts.duration : 1000;
  opts.yAxis = assign({}, {
    data: [],
    showTitle: false,
    disabled: false,
    disableGrid: false,
    gridSet: 'number',
    splitNumber: 5,
    gridType: 'solid',
    dashLength: 4 * opts.pix,
    gridColor: '#cccccc',
    padding: 10,
    fontColor: '#666666' },
  opts.yAxis);
  opts.xAxis = assign({}, {
    rotateLabel: false,
    rotateAngle: 45,
    disabled: false,
    disableGrid: false,
    splitNumber: 5,
    calibration: false,
    gridType: 'solid',
    dashLength: 4,
    scrollAlign: 'left',
    boundaryGap: 'center',
    axisLine: true,
    axisLineColor: '#cccccc' },
  opts.xAxis);
  opts.xAxis.scrollPosition = opts.xAxis.scrollAlign;
  opts.legend = assign({}, {
    show: true,
    position: 'bottom',
    float: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    padding: 5,
    margin: 5,
    itemGap: 10,
    fontSize: opts.fontSize,
    lineHeight: opts.fontSize,
    fontColor: opts.fontColor,
    formatter: {},
    hiddenColor: '#CECECE' },
  opts.legend);
  opts.extra = assign({}, opts.extra);
  opts.rotate = opts.rotate ? true : false;
  opts.animation = opts.animation ? true : false;
  opts.rotate = opts.rotate ? true : false;
  opts.canvas2d = opts.canvas2d ? true : false;

  var config$$1 = assign({}, config);
  config$$1.color = opts.color ? opts.color : config$$1.color;
  if (opts.type == 'pie') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.pie.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  if (opts.type == 'ring') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.ring.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  if (opts.type == 'rose') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.rose.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding * opts.pix;

  //屏幕旋转
  config$$1.rotate = opts.rotate;
  if (opts.rotate) {
    var tempWidth = opts.width;
    var tempHeight = opts.height;
    opts.width = tempHeight;
    opts.height = tempWidth;
  }

  //适配高分屏
  opts.padding = opts.padding ? opts.padding : config$$1.padding;
  config$$1.yAxisWidth = config.yAxisWidth * opts.pix;
  config$$1.xAxisHeight = config.xAxisHeight * opts.pix;
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    config$$1.xAxisHeight += 6 * opts.pix;
  }
  config$$1.fontSize = opts.fontSize * opts.pix;
  config$$1.titleFontSize = config.titleFontSize * opts.pix;
  config$$1.subtitleFontSize = config.subtitleFontSize * opts.pix;
  config$$1.toolTipPadding = config.toolTipPadding * opts.pix;
  config$$1.toolTipLineHeight = config.toolTipLineHeight * opts.pix;
  if (!opts.context) {
    throw new Error('[uCharts] 未获取到context！注意：v2.0版本后，需要自行获取canvas的绘图上下文并传入opts.context！');
  }
  this.context = opts.context;
  if (!this.context.setTextAlign) {
    this.context.setStrokeStyle = function (e) {
      return this.strokeStyle = e;
    };
    this.context.setLineWidth = function (e) {
      return this.lineWidth = e;
    };
    this.context.setLineCap = function (e) {
      return this.lineCap = e;
    };
    this.context.setFontSize = function (e) {
      return this.font = e + "px sans-serif";
    };
    this.context.setFillStyle = function (e) {
      return this.fillStyle = e;
    };
    this.context.setTextAlign = function (e) {
      return this.textAlign = e;
    };
    this.context.draw = function () {};
  }
  //兼容NVUEsetLineDash
  if (!this.context.setLineDash) {
    this.context.setLineDash = function (e) {};
  }
  opts.chartData = {};
  this.uevent = new uChartsEvent();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0 };

  this.opts = opts;
  this.config = config$$1;
  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

uCharts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.opts = assign({}, this.opts, data);
  this.opts.updateData = true;
  var scrollPosition = data.scrollPosition || 'current';
  switch (scrollPosition) {
    case 'current':
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      break;
    case 'left':
      this.opts._scrollDistance_ = 0;
      this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0,
        lastMoveTime: 0 };

      break;
    case 'right':
      var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config, this.context),yAxisWidth = _calYAxisData.yAxisWidth;
      this.config.yAxisWidth = yAxisWidth;
      var offsetLeft = 0;
      var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),xAxisPoints = _getXAxisPoints0.xAxisPoints,
      startX = _getXAxisPoints0.startX,
      endX = _getXAxisPoints0.endX,
      eachSpacing = _getXAxisPoints0.eachSpacing;
      var totalWidth = eachSpacing * (xAxisPoints.length - 1);
      var screenWidth = endX - startX;
      offsetLeft = screenWidth - totalWidth;
      this.scrollOption = {
        currentOffset: offsetLeft,
        startTouchX: offsetLeft,
        distance: 0,
        lastMoveTime: 0 };

      this.opts._scrollDistance_ = offsetLeft;
      break;}

  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

uCharts.prototype.zoom = function () {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.opts.xAxis.itemCount;
  if (this.opts.enableScroll !== true) {
    console.log('[uCharts] 请启用滚动条后使用');
    return;
  }
  //当前屏幕中间点
  var centerPoint = Math.round(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + Math.round(this.opts.xAxis.itemCount / 2);
  this.opts.animation = false;
  this.opts.xAxis.itemCount = val.itemCount;
  //重新计算x轴偏移距离
  var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config, this.context),
  yAxisWidth = _calYAxisData.yAxisWidth;
  this.config.yAxisWidth = yAxisWidth;
  var offsetLeft = 0;
  var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
  xAxisPoints = _getXAxisPoints0.xAxisPoints,
  startX = _getXAxisPoints0.startX,
  endX = _getXAxisPoints0.endX,
  eachSpacing = _getXAxisPoints0.eachSpacing;
  var centerLeft = eachSpacing * centerPoint;
  var screenWidth = endX - startX;
  var MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = screenWidth / 2 - centerLeft;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption = {
    currentOffset: offsetLeft,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0 };

  calValidDistance(this, offsetLeft, this.opts.chartData, this.config, this.opts);
  this.opts._scrollDistance_ = offsetLeft;
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

uCharts.prototype.dobuleZoom = function (e) {
  if (this.opts.enableScroll !== true) {
    console.log('[uCharts] 请启用滚动条后使用');
    return;
  }
  var tcs = e.changedTouches;
  if (tcs.length < 2) {
    return;
  }
  for (var i = 0; i < tcs.length; i++) {
    tcs[i].x = tcs[i].x ? tcs[i].x : tcs[i].clientX;
    tcs[i].y = tcs[i].y ? tcs[i].y : tcs[i].clientY;
  }
  var ntcs = [getTouches(tcs[0], this.opts, e), getTouches(tcs[1], this.opts, e)];
  var xlength = Math.abs(ntcs[0].x - ntcs[1].x);
  // 记录初始的两指之间的数据
  if (!this.scrollOption.moveCount) {
    var cts0 = { changedTouches: [{ x: tcs[0].x, y: this.opts.area[0] / this.opts.pix + 2 }] };
    var cts1 = { changedTouches: [{ x: tcs[1].x, y: this.opts.area[0] / this.opts.pix + 2 }] };
    if (this.opts.rotate) {
      cts0 = { changedTouches: [{ x: this.opts.height / this.opts.pix - this.opts.area[0] / this.opts.pix - 2, y: tcs[0].y }] };
      cts1 = { changedTouches: [{ x: this.opts.height / this.opts.pix - this.opts.area[0] / this.opts.pix - 2, y: tcs[1].y }] };
    }
    var moveCurrent1 = this.getCurrentDataIndex(cts0).index;
    var moveCurrent2 = this.getCurrentDataIndex(cts1).index;
    var moveCount = Math.abs(moveCurrent1 - moveCurrent2);
    this.scrollOption.moveCount = moveCount;
    this.scrollOption.moveCurrent1 = Math.min(moveCurrent1, moveCurrent2);
    this.scrollOption.moveCurrent2 = Math.max(moveCurrent1, moveCurrent2);
    return;
  }

  var currentEachSpacing = xlength / this.scrollOption.moveCount;
  var itemCount = (this.opts.width - this.opts.area[1] - this.opts.area[3]) / currentEachSpacing;
  itemCount = itemCount <= 2 ? 2 : itemCount;
  itemCount = itemCount >= this.opts.categories.length ? this.opts.categories.length : itemCount;
  this.opts.animation = false;
  this.opts.xAxis.itemCount = itemCount;
  // 重新计算滚动条偏移距离
  var offsetLeft = 0;
  var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
  xAxisPoints = _getXAxisPoints0.xAxisPoints,
  startX = _getXAxisPoints0.startX,
  endX = _getXAxisPoints0.endX,
  eachSpacing = _getXAxisPoints0.eachSpacing;
  var currentLeft = eachSpacing * this.scrollOption.moveCurrent1;
  var screenWidth = endX - startX;
  var MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = -currentLeft + Math.min(ntcs[0].x, ntcs[1].x) - this.opts.area[3] - eachSpacing;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption.currentOffset = offsetLeft;
  this.scrollOption.startTouchX = 0;
  this.scrollOption.distance = 0;
  calValidDistance(this, offsetLeft, this.opts.chartData, this.config, this.opts);
  this.opts._scrollDistance_ = offsetLeft;
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

uCharts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

uCharts.prototype.addEventListener = function (type, listener) {
  this.uevent.addEventListener(type, listener);
};

uCharts.prototype.delEventListener = function (type) {
  this.uevent.delEventListener(type);
};

uCharts.prototype.getCurrentDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    if (this.opts.type === 'pie' || this.opts.type === 'ring') {
      return findPieChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.pieData, this.opts);
    } else if (this.opts.type === 'rose') {
      return findRoseChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.pieData, this.opts);
    } else if (this.opts.type === 'radar') {
      return findRadarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.radarData, this.opts.categories.length);
    } else if (this.opts.type === 'funnel') {
      return findFunnelChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.funnelData);
    } else if (this.opts.type === 'map') {
      return findMapChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts);
    } else if (this.opts.type === 'word') {
      return findWordChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.wordCloudData);
    } else if (this.opts.type === 'bar') {
      return findBarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    } else {
      return findCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }
  return -1;
};

uCharts.prototype.getLegendDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    return findLegendIndex({
      x: _touches$.x,
      y: _touches$.y },
    this.opts.chartData.legendData);
  }
  return -1;
};

uCharts.prototype.touchLegend = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    var index = this.getLegendDataIndex(e);
    if (index >= 0) {
      if (this.opts.type == 'candle') {
        this.opts.seriesMA[index].show = !this.opts.seriesMA[index].show;
      } else {
        this.opts.series[index].show = !this.opts.series[index].show;
      }
      this.opts.animation = option.animation ? true : false;
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
    }
  }

};

uCharts.prototype.showToolTip = function (e) {var _this3 = this;
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (!touches) {
    console.log("[uCharts] 未获取到event坐标信息");
  }
  var _touches$ = getTouches(touches, this.opts, e);
  var currentOffset = this.scrollOption.currentOffset;
  var opts = assign({}, this.opts, {
    _scrollDistance_: currentOffset,
    animation: false });

  if (this.opts.type === 'line' || this.opts.type === 'area' || this.opts.type === 'column' || this.opts.type === 'scatter' || this.opts.type === 'bubble') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1 || index.length > 0) {
      var seriesData = getSeriesDataItem(this.opts.series, index, current.group);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts, index, current.group, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList !== undefined ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'mount') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e).index : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, opts._series_[index]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, undefined, index, opts) : seriesData.name + ': ' + seriesData.data,
        color: seriesData.color }];

      var offset = {
        x: opts.chartData.calPoints[index].x,
        y: _touches$.y };

      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== undefined ? option.offset : offset,
        option: option,
        index: index };

    }

    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'bar') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1 || index.length > 0) {
      var seriesData = getSeriesDataItem(this.opts.series, index, current.group);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts, index, current.group, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.x = _touches$.x;
        opts.tooltip = {
          textList: option.textList !== undefined ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'mix') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getMixToolTipData = getMixToolTipData(seriesData, this.opts, index, this.opts.categories, option),
        textList = _getMixToolTipData.textList,
        offset = _getMixToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'candle') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getCandleToolTipData(this.opts.series[0].data, seriesData, this.opts, index, this.opts.categories, this.opts.extra.candle, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'rose' || this.opts.type === 'funnel') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, opts._series_[index]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, undefined, index, opts) : seriesData.name + ': ' + seriesData.data,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== undefined ? option.offset : offset,
        option: option,
        index: index };

    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'map') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, this.opts.series[index]);
      seriesData.name = seriesData.properties.name;
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, undefined, index, this.opts) : seriesData.name,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== undefined ? option.offset : offset,
        option: option,
        index: index };

    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'word') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, this.opts.series[index]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, undefined, index, this.opts) : seriesData.name,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== undefined ? option.offset : offset,
        option: option,
        index: index };

    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'radar') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var textList = seriesData.map(function (item) {
          return {
            text: option.formatter ? option.formatter(item, _this3.opts.categories[index], index, _this3.opts) : item.name + ': ' + item.data,
            color: item.color };

        });
        var offset = {
          x: _touches$.x,
          y: _touches$.y };

        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

uCharts.prototype.translate = function (distance) {
  this.scrollOption = {
    currentOffset: distance,
    startTouchX: distance,
    distance: 0,
    lastMoveTime: 0 };

  var opts = assign({}, this.opts, {
    _scrollDistance_: distance,
    animation: false });

  drawCharts.call(this, this.opts.type, opts, this.config, this.context);
};

uCharts.prototype.scrollStart = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  var _touches$ = getTouches(touches, this.opts, e);
  if (touches && this.opts.enableScroll === true) {
    this.scrollOption.startTouchX = _touches$.x;
  }
};

uCharts.prototype.scroll = function (e) {
  if (this.scrollOption.lastMoveTime === 0) {
    this.scrollOption.lastMoveTime = Date.now();
  }
  var Limit = this.opts.touchMoveLimit || 60;
  var currMoveTime = Date.now();
  var duration = currMoveTime - this.scrollOption.lastMoveTime;
  if (duration < Math.floor(1000 / Limit)) return;
  if (this.scrollOption.startTouchX == 0) return;
  this.scrollOption.lastMoveTime = currMoveTime;
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches && this.opts.enableScroll === true) {
    var _touches$ = getTouches(touches, this.opts, e);
    var _distance;
    _distance = _touches$.x - this.scrollOption.startTouchX;
    var currentOffset = this.scrollOption.currentOffset;
    var validDistance = calValidDistance(this, currentOffset + _distance, this.opts.chartData, this.config, this.opts);
    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false });

    this.opts = opts;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
    return currentOffset + _distance;
  }
};

uCharts.prototype.scrollEnd = function (e) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption,
    currentOffset = _scrollOption.currentOffset,
    distance = _scrollOption.distance;
    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
    this.scrollOption.moveCount = 0;
  }
};var _default =

uCharts;exports.default = _default;

/***/ }),

/***/ 343:
/*!*******************************************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * uCharts®
                                                                                                      * 高性能跨平台图表库，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）、Vue、Taro等支持canvas的框架平台
                                                                                                      * Copyright (c) 2021 QIUN®秋云 https://www.ucharts.cn All rights reserved.
                                                                                                      * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
                                                                                                      * 复制使用请保留本段注释，感谢支持开源！
                                                                                                      * 
                                                                                                      * uCharts®官方网站
                                                                                                      * https://www.uCharts.cn
                                                                                                      * 
                                                                                                      * 开源地址:
                                                                                                      * https://gitee.com/uCharts/uCharts
                                                                                                      * 
                                                                                                      * uni-app插件市场地址：
                                                                                                      * http://ext.dcloud.net.cn/plugin?id=271
                                                                                                      * 
                                                                                                      */

// 主题颜色配置：如每个图表类型需要不同主题，请在对应图表类型上更改color属性
var color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];

//事件转换函数，主要用作格式化x轴为时间轴，根据需求自行修改
var formatDateTime = function formatDateTime(timeStamp, returnType) {
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  h = h < 10 ? '0' + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  if (returnType == 'full') {return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;}
  if (returnType == 'y-m-d') {return y + '-' + m + '-' + d;}
  if (returnType == 'h:m') {return h + ':' + minute;}
  if (returnType == 'h:m:s') {return h + ':' + minute + ':' + second;}
  return [y, m, d, h, minute, second];
};

var cfu = {
  //demotype为自定义图表类型，一般不需要自定义图表类型，只需要改根节点上对应的类型即可
  "type": ["pie", "ring", "rose", "word", "funnel", "map", "arcbar", "line", "column", "mount", "bar", "area", "radar", "gauge", "candle", "mix", "tline", "tarea", "scatter", "bubble", "demotype"],
  "range": ["饼状图", "圆环图", "玫瑰图", "词云图", "漏斗图", "地图", "圆弧进度条", "折线图", "柱状图", "山峰图", "条状图", "区域图", "雷达图", "仪表盘", "K线图", "混合图", "时间轴折线", "时间轴区域", "散点图", "气泡图", "自定义类型"],
  //增加自定义图表类型，如果需要categories，请在这里加入您的图表类型，例如最后的"demotype"
  //自定义类型时需要注意"tline","tarea","scatter","bubble"等时间轴（矢量x轴）类图表，没有categories，不需要加入categories
  "categories": ["line", "column", "mount", "bar", "area", "radar", "gauge", "candle", "mix", "demotype"],
  //instance为实例变量承载属性，不要删除
  "instance": {},
  //option为opts及eopts承载属性，不要删除
  "option": {},
  //下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
  "formatter": {
    "yAxisDemo1": function yAxisDemo1(val, index, opts) {return val + '元';},
    "yAxisDemo2": function yAxisDemo2(val, index, opts) {return val.toFixed(2);},
    "xAxisDemo1": function xAxisDemo1(val, index, opts) {return val + '年';},
    "xAxisDemo2": function xAxisDemo2(val, index, opts) {return formatDateTime(val, 'h:m');},
    "seriesDemo1": function seriesDemo1(val, index, series, opts) {return val + '元';},
    "tooltipDemo1": function tooltipDemo1(item, category, index, opts) {
      if (index == 0) {
        return '随便用' + item.data + '年';
      } else {
        return '其他我没改' + item.data + '天';
      }
    },
    "pieDemo": function pieDemo(val, index, series, opts) {
      if (index !== undefined) {
        return series[index].name + '：' + series[index].data + '元';
      }
    } },

  //这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在opts参数，会将demotype与opts中option合并后渲染图表。
  "demotype": {
    //我这里把曲线图当做了自定义图表类型，您可以根据需要随意指定类型或配置
    "type": "line",
    "color": color,
    "padding": [15, 10, 0, 15],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2 },

    "legend": {},

    "extra": {
      "line": {
        "type": "curve",
        "width": 2 } } },



  //下面是自定义配置，请添加项目所需的通用配置
  "pie": {
    "type": "pie",
    "color": color,
    "padding": [5, 5, 5, 5],
    "extra": {
      "pie": {
        "activeOpacity": 0.5,
        "activeRadius": 10,
        "offsetAngle": 0,
        "labelWidth": 15,
        "border": true,
        "borderWidth": 3,
        "borderColor": "#FFFFFF" } } },



  "ring": {
    "type": "ring",
    "color": color,
    "padding": [5, 5, 5, 5],
    "rotate": false,
    "dataLabel": true,
    "legend": {
      "show": true,
      "position": "right",
      "lineHeight": 25 },

    "title": {
      "name": "收益率",
      "fontSize": 15,
      "color": "#666666" },

    "subtitle": {
      "name": "70%",
      "fontSize": 25,
      "color": "#7cb5ec" },

    "extra": {
      "ring": {
        "ringWidth": 30,
        "activeOpacity": 0.5,
        "activeRadius": 10,
        "offsetAngle": 0,
        "labelWidth": 15,
        "border": true,
        "borderWidth": 3,
        "borderColor": "#FFFFFF" } } },



  "rose": {
    "type": "rose",
    "color": color,
    "padding": [5, 5, 5, 5],
    "legend": {
      "show": true,
      "position": "left",
      "lineHeight": 25 },

    "extra": {
      "rose": {
        "type": "area",
        "minRadius": 50,
        "activeOpacity": 0.5,
        "activeRadius": 10,
        "offsetAngle": 0,
        "labelWidth": 15,
        "border": false,
        "borderWidth": 2,
        "borderColor": "#FFFFFF" } } },



  "word": {
    "type": "word",
    "color": color,
    "extra": {
      "word": {
        "type": "normal",
        "autoColors": false } } },



  "funnel": {
    "type": "funnel",
    "color": color,
    "padding": [15, 15, 0, 15],
    "extra": {
      "funnel": {
        "activeOpacity": 0.3,
        "activeWidth": 10,
        "border": true,
        "borderWidth": 2,
        "borderColor": "#FFFFFF",
        "fillOpacity": 1,
        "labelAlign": "right" } } },



  "map": {
    "type": "map",
    "color": color,
    "padding": [0, 0, 0, 0],
    "dataLabel": true,
    "extra": {
      "map": {
        "border": true,
        "borderWidth": 1,
        "borderColor": "#666666",
        "fillOpacity": 0.6,
        "activeBorderColor": "#F04864",
        "activeFillColor": "#FACC14",
        "activeFillOpacity": 1 } } },



  "arcbar": {
    "type": "arcbar",
    "color": color,
    "title": {
      "name": "百分比",
      "fontSize": 25,
      "color": "#00FF00" },

    "subtitle": {
      "name": "默认标题",
      "fontSize": 15,
      "color": "#666666" },

    "extra": {
      "arcbar": {
        "type": "default",
        "width": 12,
        "backgroundColor": "#E9E9E9",
        "startAngle": 0.75,
        "endAngle": 0.25,
        "gap": 2 } } },



  "line": {
    "type": "line",
    "color": color,
    "padding": [15, 10, 0, 15],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2 },

    "legend": {},

    "extra": {
      "line": {
        "type": "straight",
        "width": 2 } } },



  "tline": {
    "type": "line",
    "color": color,
    "padding": [15, 10, 0, 15],
    "xAxis": {
      "disableGrid": false,
      "boundaryGap": "justify" },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2,
      "data": [
      {
        "min": 0,
        "max": 80 }] },



    "legend": {},

    "extra": {
      "line": {
        "type": "curve",
        "width": 2 } } },



  "tarea": {
    "type": "area",
    "color": color,
    "padding": [15, 10, 0, 15],
    "xAxis": {
      "disableGrid": true,
      "boundaryGap": "justify" },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2,
      "data": [
      {
        "min": 0,
        "max": 80 }] },



    "legend": {},

    "extra": {
      "area": {
        "type": "curve",
        "opacity": 0.2,
        "addLine": true,
        "width": 2,
        "gradient": true } } },



  "column": {
    "type": "column",
    "color": color,
    "padding": [15, 15, 0, 5],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "data": [{ "min": 0 }] },

    "legend": {},

    "extra": {
      "column": {
        "type": "group",
        "width": 30,
        "activeBgColor": "#000000",
        "activeBgOpacity": 0.08 } } },



  "mount": {
    "type": "mount",
    "color": color,
    "padding": [15, 15, 0, 5],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "data": [{ "min": 0 }] },

    "legend": {},

    "extra": {
      "mount": {
        "type": "mount",
        "widthRatio": 1.5 } } },



  "bar": {
    "type": "bar",
    "color": color,
    "padding": [15, 30, 0, 5],
    "xAxis": {
      "boundaryGap": "justify",
      "disableGrid": false,
      "min": 0,
      "axisLine": false },

    "yAxis": {},

    "legend": {},

    "extra": {
      "bar": {
        "type": "group",
        "width": 30,
        "meterBorde": 1,
        "meterFillColor": "#FFFFFF",
        "activeBgColor": "#000000",
        "activeBgOpacity": 0.08 } } },



  "area": {
    "type": "area",
    "color": color,
    "padding": [15, 15, 0, 15],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2 },

    "legend": {},

    "extra": {
      "area": {
        "type": "straight",
        "opacity": 0.2,
        "addLine": true,
        "width": 2,
        "gradient": false } } },



  "radar": {
    "type": "radar",
    "color": color,
    "padding": [5, 5, 5, 5],
    "dataLabel": false,
    "legend": {
      "show": true,
      "position": "right",
      "lineHeight": 25 },

    "extra": {
      "radar": {
        "gridType": "radar",
        "gridColor": "#CCCCCC",
        "gridCount": 3,
        "opacity": 0.2,
        "max": 200 } } },



  "gauge": {
    "type": "gauge",
    "color": color,
    "title": {
      "name": "66Km/H",
      "fontSize": 25,
      "color": "#2fc25b",
      "offsetY": 50 },

    "subtitle": {
      "name": "实时速度",
      "fontSize": 15,
      "color": "#1890ff",
      "offsetY": -50 },

    "extra": {
      "gauge": {
        "type": "default",
        "width": 30,
        "labelColor": "#666666",
        "startAngle": 0.75,
        "endAngle": 0.25,
        "startNumber": 0,
        "endNumber": 100,
        "labelFormat": "",
        "splitLine": {
          "fixRadius": 0,
          "splitNumber": 10,
          "width": 30,
          "color": "#FFFFFF",
          "childNumber": 5,
          "childWidth": 12 },

        "pointer": {
          "width": 24,
          "color": "auto" } } } },




  "candle": {
    "type": "candle",
    "color": color,
    "padding": [15, 15, 0, 15],
    "enableScroll": true,
    "enableMarkLine": true,
    "dataLabel": false,
    "xAxis": {
      "labelCount": 4,
      "itemCount": 40,
      "disableGrid": true,
      "gridColor": "#CCCCCC",
      "gridType": "solid",
      "dashLength": 4,
      "scrollShow": true,
      "scrollAlign": "left",
      "scrollColor": "#A6A6A6",
      "scrollBackgroundColor": "#EFEBEF" },

    "yAxis": {},

    "legend": {},

    "extra": {
      "candle": {
        "color": {
          "upLine": "#f04864",
          "upFill": "#f04864",
          "downLine": "#2fc25b",
          "downFill": "#2fc25b" },

        "average": {
          "show": true,
          "name": ["MA5", "MA10", "MA30"],
          "day": [5, 10, 20],
          "color": ["#1890ff", "#2fc25b", "#facc14"] } },


      "markLine": {
        "type": "dash",
        "dashLength": 5,
        "data": [
        {
          "value": 2150,
          "lineColor": "#f04864",
          "showLabel": true },

        {
          "value": 2350,
          "lineColor": "#f04864",
          "showLabel": true }] } } },





  "mix": {
    "type": "mix",
    "color": color,
    "padding": [15, 15, 0, 15],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "disabled": false,
      "disableGrid": false,
      "splitNumber": 5,
      "gridType": "dash",
      "dashLength": 4,
      "gridColor": "#CCCCCC",
      "padding": 10,
      "showTitle": true,
      "data": [] },

    "legend": {},

    "extra": {
      "mix": {
        "column": {
          "width": 20 } } } },




  "scatter": {
    "type": "scatter",
    "color": color,
    "padding": [15, 15, 0, 15],
    "dataLabel": false,
    "xAxis": {
      "disableGrid": false,
      "gridType": "dash",
      "splitNumber": 5,
      "boundaryGap": "justify",
      "min": 0 },

    "yAxis": {
      "disableGrid": false,
      "gridType": "dash" },

    "legend": {},

    "extra": {
      "scatter": {} } },



  "bubble": {
    "type": "bubble",
    "color": color,
    "padding": [15, 15, 0, 15],
    "xAxis": {
      "disableGrid": false,
      "gridType": "dash",
      "splitNumber": 5,
      "boundaryGap": "justify",
      "min": 0,
      "max": 250 },

    "yAxis": {
      "disableGrid": false,
      "gridType": "dash",
      "data": [{
        "min": 0,
        "max": 150 }] },


    "legend": {},

    "extra": {
      "bubble": {
        "border": 2,
        "opacity": 0.5 } } } };var _default =





cfu;exports.default = _default;

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-epidemic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-epidemic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-epidemic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-epidemic","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!***************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/pages.json ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 51:
/*!**************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/mixins/before-into-studentpage.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 12);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 导出一个 mixin 对象
var _default = {
  computed: _objectSpread({},
  (0, _vuex.mapState)('user', ['userInfo'])),

  onShow: function onShow() {
    // 在页面刚展示的时候，判断该用户的用户类型是否能够进入该页面
    if (this.userInfo.userType !== "学生") {
      uni.switchTab({
        url: '/pages/home/home' });

      return;
    }
  },
  methods: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 60:
/*!***************************************************************************************!*\
  !*** D:/361/Epidemic/Epidemic-Manage/uni-epidemic/mixins/before-nologin-into-page.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 12);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 导出一个 mixin 对象
var _default = {
  computed: _objectSpread({},
  (0, _vuex.mapState)('user', ['userInfo'])),

  onShow: function onShow() {
    // 用于未登录用户不可进入的页面
    if (!this.userInfo) {
      return uni.switchTab({
        url: '/pages/home/home' });

    }
    if (this.userInfo.userType !== "学生" && this.userInfo.userType !== "教师" && this.userInfo.userType !== '管理员') {
      return uni.switchTab({
        url: '/pages/home/home' });

    }
  },
  methods: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 9:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 10);

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map