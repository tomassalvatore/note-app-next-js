(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["pages/_app"],{

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/@emotion/cache/node_modules/stylis/index.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js");





var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.identifier)(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var defaultStylisPlugins = [stylis__WEBPACK_IMPORTED_MODULE_3__.prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_3__.stringify,  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_3__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : 0];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_3__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ __webpack_exports__["default"] = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Enum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_Enum_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _src_Enum_js__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_Utility_js__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _src_Utility_js__WEBPACK_IMPORTED_MODULE_1__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Parser.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Parser.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_Parser_js__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _src_Parser_js__WEBPACK_IMPORTED_MODULE_2__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Prefixer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Prefixer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_Prefixer_js__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _src_Prefixer_js__WEBPACK_IMPORTED_MODULE_3__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Tokenizer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _src_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Serializer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Serializer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_Serializer_js__WEBPACK_IMPORTED_MODULE_5__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _src_Serializer_js__WEBPACK_IMPORTED_MODULE_5__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _src_Middleware_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Middleware.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Middleware.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_Middleware_js__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _src_Middleware_js__WEBPACK_IMPORTED_MODULE_6__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);









/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MS": function() { return /* binding */ MS; },
/* harmony export */   "MOZ": function() { return /* binding */ MOZ; },
/* harmony export */   "WEBKIT": function() { return /* binding */ WEBKIT; },
/* harmony export */   "COMMENT": function() { return /* binding */ COMMENT; },
/* harmony export */   "RULESET": function() { return /* binding */ RULESET; },
/* harmony export */   "DECLARATION": function() { return /* binding */ DECLARATION; },
/* harmony export */   "PAGE": function() { return /* binding */ PAGE; },
/* harmony export */   "MEDIA": function() { return /* binding */ MEDIA; },
/* harmony export */   "IMPORT": function() { return /* binding */ IMPORT; },
/* harmony export */   "CHARSET": function() { return /* binding */ CHARSET; },
/* harmony export */   "VIEWPORT": function() { return /* binding */ VIEWPORT; },
/* harmony export */   "SUPPORTS": function() { return /* binding */ SUPPORTS; },
/* harmony export */   "DOCUMENT": function() { return /* binding */ DOCUMENT; },
/* harmony export */   "NAMESPACE": function() { return /* binding */ NAMESPACE; },
/* harmony export */   "KEYFRAMES": function() { return /* binding */ KEYFRAMES; },
/* harmony export */   "FONT_FACE": function() { return /* binding */ FONT_FACE; },
/* harmony export */   "COUNTER_STYLE": function() { return /* binding */ COUNTER_STYLE; },
/* harmony export */   "FONT_FEATURE_VALUES": function() { return /* binding */ FONT_FEATURE_VALUES; }
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Middleware.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Middleware.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": function() { return /* binding */ middleware; },
/* harmony export */   "rulesheet": function() { return /* binding */ rulesheet; },
/* harmony export */   "prefixer": function() { return /* binding */ prefixer; },
/* harmony export */   "namespace": function() { return /* binding */ namespace; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (!element.return)
		switch (element.type) {
			case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length)
				break
			case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
				return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT), element, '')], callback)
			case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
				if (element.length)
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
						switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
							// :read-(only|write)
							case ':read-only': case ':read-write':
								return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1'), element, '')], callback)
							// :placeholder
							case '::placeholder':
								return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
									(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1'), element, ''),
									(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1'), element, ''),
									(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1'), element, '')
								], callback)
						}

						return ''
					})
		}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Parser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Parser.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compile": function() { return /* binding */ compile; },
/* harmony export */   "parse": function() { return /* binding */ parse; },
/* harmony export */   "ruleset": function() { return /* binding */ ruleset; },
/* harmony export */   "comment": function() { return /* binding */ comment; },
/* harmony export */   "declaration": function() { return /* binding */ declaration; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// " ' [ (
			case 34: case 39: case 91: case 40:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset:
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, length, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Prefixer.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": function() { return /* binding */ prefix; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix (value, length) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// flex, flex-direction
		case 6828: case 4268:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/, '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length) + value : value
				}
			break
		// position: sticky
		case 4949:
			// (s)ticky?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1) !== 115)
				break
		// display: (flex|inline-flex)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 3 - (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, '!important') && 10))) {
				// stic(k)y
				case 107:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
				// (inline-)?fl(e)x
				case 101:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
			}
			break
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
			}

			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Serializer.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": function() { return /* binding */ serialize; },
/* harmony export */   "stringify": function() { return /* binding */ stringify; }
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Tokenizer.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "line": function() { return /* binding */ line; },
/* harmony export */   "column": function() { return /* binding */ column; },
/* harmony export */   "length": function() { return /* binding */ length; },
/* harmony export */   "position": function() { return /* binding */ position; },
/* harmony export */   "character": function() { return /* binding */ character; },
/* harmony export */   "characters": function() { return /* binding */ characters; },
/* harmony export */   "node": function() { return /* binding */ node; },
/* harmony export */   "copy": function() { return /* binding */ copy; },
/* harmony export */   "char": function() { return /* binding */ char; },
/* harmony export */   "prev": function() { return /* binding */ prev; },
/* harmony export */   "next": function() { return /* binding */ next; },
/* harmony export */   "peek": function() { return /* binding */ peek; },
/* harmony export */   "caret": function() { return /* binding */ caret; },
/* harmony export */   "slice": function() { return /* binding */ slice; },
/* harmony export */   "token": function() { return /* binding */ token; },
/* harmony export */   "alloc": function() { return /* binding */ alloc; },
/* harmony export */   "dealloc": function() { return /* binding */ dealloc; },
/* harmony export */   "delimit": function() { return /* binding */ delimit; },
/* harmony export */   "tokenize": function() { return /* binding */ tokenize; },
/* harmony export */   "whitespace": function() { return /* binding */ whitespace; },
/* harmony export */   "tokenizer": function() { return /* binding */ tokenizer; },
/* harmony export */   "escaping": function() { return /* binding */ escaping; },
/* harmony export */   "delimiter": function() { return /* binding */ delimiter; },
/* harmony export */   "commenter": function() { return /* binding */ commenter; },
/* harmony export */   "identifier": function() { return /* binding */ identifier; }
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string} type
 * @param {string[]} props
 * @param {object[]} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {string} value
 * @param {object} root
 * @param {string} type
 */
function copy (value, root, type) {
	return node(value, root.root, root.parent, type, root.props, root.children, 0)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				return delimiter(type === 34 || type === 39 ? type : character)
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js":
/*!************************************************************************!*\
  !*** ./node_modules/@emotion/cache/node_modules/stylis/src/Utility.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": function() { return /* binding */ abs; },
/* harmony export */   "from": function() { return /* binding */ from; },
/* harmony export */   "hash": function() { return /* binding */ hash; },
/* harmony export */   "trim": function() { return /* binding */ trim; },
/* harmony export */   "match": function() { return /* binding */ match; },
/* harmony export */   "replace": function() { return /* binding */ replace; },
/* harmony export */   "indexof": function() { return /* binding */ indexof; },
/* harmony export */   "charat": function() { return /* binding */ charat; },
/* harmony export */   "substr": function() { return /* binding */ substr; },
/* harmony export */   "strlen": function() { return /* binding */ strlen; },
/* harmony export */   "sizeof": function() { return /* binding */ sizeof; },
/* harmony export */   "append": function() { return /* binding */ append; },
/* harmony export */   "combine": function() { return /* binding */ combine; }
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} value
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/hash.browser.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/hash.browser.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ __webpack_exports__["default"] = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__.default)(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ __webpack_exports__["default"] = (isPropValid);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-99289b21.browser.esm.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-99289b21.browser.esm.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": function() { return /* binding */ CacheProvider; },
/* harmony export */   "E": function() { return /* binding */ Emotion; },
/* harmony export */   "T": function() { return /* binding */ ThemeContext; },
/* harmony export */   "_": function() { return /* binding */ __unsafe_useEmotionCache; },
/* harmony export */   "a": function() { return /* binding */ ThemeProvider; },
/* harmony export */   "b": function() { return /* binding */ withTheme; },
/* harmony export */   "c": function() { return /* binding */ createEmotionProps; },
/* harmony export */   "h": function() { return /* binding */ hasOwnProperty; },
/* harmony export */   "u": function() { return /* binding */ useTheme; },
/* harmony export */   "w": function() { return /* binding */ withEmotionCache; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js");
/* harmony import */ var _isolated_hoist_non_react_statics_do_not_use_this_in_your_code_dist_emotion_react_isolated_hoist_non_react_statics_do_not_use_this_in_your_code_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.browser.esm.js */ "./node_modules/@emotion/react/isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");








var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__.default)({
  key: 'css'
}) : null);

if (true) {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    // the cache will never be null in the browser
    var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

if (true) {
  ThemeContext.displayName = 'EmotionThemeContext';
}

var useTheme = function useTheme() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__.default)({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__.default)(function (outerTheme) {
  return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__.default)(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__.default)({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return (0,_isolated_hoist_non_react_statics_do_not_use_this_in_your_code_dist_emotion_react_isolated_hoist_non_react_statics_do_not_use_this_in_your_code_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__.default)(WithTheme, Component);
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (true) {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};
var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(registeredStyles, undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext));

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(type, newProps);

  return ele;
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}




/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheProvider": function() { return /* reexport safe */ _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.C; },
/* harmony export */   "ThemeContext": function() { return /* reexport safe */ _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T; },
/* harmony export */   "ThemeProvider": function() { return /* reexport safe */ _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.a; },
/* harmony export */   "__unsafe_useEmotionCache": function() { return /* reexport safe */ _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__._; },
/* harmony export */   "useTheme": function() { return /* reexport safe */ _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.u; },
/* harmony export */   "withEmotionCache": function() { return /* reexport safe */ _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w; },
/* harmony export */   "withTheme": function() { return /* reexport safe */ _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.b; },
/* harmony export */   "ClassNames": function() { return /* binding */ ClassNames; },
/* harmony export */   "Global": function() { return /* binding */ Global; },
/* harmony export */   "createElement": function() { return /* binding */ jsx; },
/* harmony export */   "css": function() { return /* binding */ css; },
/* harmony export */   "jsx": function() { return /* binding */ jsx; },
/* harmony export */   "keyframes": function() { return /* binding */ keyframes; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-99289b21.browser.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-99289b21.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");












var pkg = {
	name: "@emotion/react",
	version: "11.4.1",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"isolated-hoist-non-react-statics-do-not-use-this-in-your-code",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "mitchellhamilton <mitchell@mitchellhamilton.me>",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.13.10",
		"@emotion/cache": "^11.4.0",
		"@emotion/serialize": "^1.0.2",
		"@emotion/sheet": "^1.0.2",
		"@emotion/utils": "^1.0.0",
		"@emotion/weak-memoize": "^0.2.5",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.13.10",
		"@emotion/css": "11.1.3",
		"@emotion/css-prettifier": "1.0.0",
		"@emotion/server": "11.4.0",
		"@emotion/styled": "11.3.0",
		"@types/react": "^16.9.11",
		dtslint: "^0.3.0",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js"
		],
		umdName: "emotionReact"
	}
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !_emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.h.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.E;
  createElementArgArray[1] = (0,_emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(0,_emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)([styles], undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function () {
    var key = cache.key + "-global";
    var sheet = new _emotion_sheet__WEBPACK_IMPORTED_MODULE_8__.StyleSheet({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (true) {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if ( true && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = /* #__PURE__ */(0,_emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  var hasRendered = false;

  var css = function css() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args, cache.registered);

    {
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized, false);
    }

    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_99289b21_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T)
  };
  var ele = props.children(content);
  hasRendered = true;

  return ele;
});

if (true) {
  ClassNames.displayName = 'EmotionClassNames';
}

if (true) {
  var isBrowser = "object" !== 'undefined'; // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined';

  if (isBrowser && !isJest) {
    var globalContext = isBrowser ? window : __webpack_require__.g;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}




/***/ }),

/***/ "./node_modules/@emotion/react/isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.browser.esm.js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.browser.esm.js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
});

/* harmony default export */ __webpack_exports__["default"] = (hoistNonReactStatics);


/***/ }),

/***/ "./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@emotion/react/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
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

/***/ }),

/***/ "./node_modules/@emotion/react/package.json":
/*!**************************************************!*\
  !*** ./node_modules/@emotion/react/package.json ***!
  \**************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"name":"@emotion/react","version":"11.4.1","main":"dist/emotion-react.cjs.js","module":"dist/emotion-react.esm.js","browser":{"./dist/emotion-react.cjs.js":"./dist/emotion-react.browser.cjs.js","./dist/emotion-react.esm.js":"./dist/emotion-react.browser.esm.js"},"types":"types/index.d.ts","files":["src","dist","jsx-runtime","jsx-dev-runtime","isolated-hoist-non-react-statics-do-not-use-this-in-your-code","types/*.d.ts","macro.js","macro.d.ts","macro.js.flow"],"sideEffects":false,"author":"mitchellhamilton <mitchell@mitchellhamilton.me>","license":"MIT","scripts":{"test:typescript":"dtslint types"},"dependencies":{"@babel/runtime":"^7.13.10","@emotion/cache":"^11.4.0","@emotion/serialize":"^1.0.2","@emotion/sheet":"^1.0.2","@emotion/utils":"^1.0.0","@emotion/weak-memoize":"^0.2.5","hoist-non-react-statics":"^3.3.1"},"peerDependencies":{"@babel/core":"^7.0.0","react":">=16.8.0"},"peerDependenciesMeta":{"@babel/core":{"optional":true},"@types/react":{"optional":true}},"devDependencies":{"@babel/core":"^7.13.10","@emotion/css":"11.1.3","@emotion/css-prettifier":"1.0.0","@emotion/server":"11.4.0","@emotion/styled":"11.3.0","@types/react":"^16.9.11","dtslint":"^0.3.0","html-tag-names":"^1.1.2","react":"16.14.0","svg-tag-names":"^1.1.1"},"repository":"https://github.com/emotion-js/emotion/tree/main/packages/react","publishConfig":{"access":"public"},"umd:main":"dist/emotion-react.umd.min.js","preconstruct":{"entrypoints":["./index.js","./jsx-runtime.js","./jsx-dev-runtime.js","./isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js"],"umdName":"emotionReact"}}');

/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": function() { return /* binding */ serializeStyles; }
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/hash.browser.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__.default)(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__.default[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__.default)(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": function() { return /* binding */ StyleSheet; }
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");







var testOmitPropsOnStringTag = _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__.default;

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";

var createStyled = function createStyled(tag, options) {
  if (true) {
    if (tag === undefined) {
      throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
    }
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if ( true && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        if ( true && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.withEmotionCache)(function (props, cache, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_emotion_react__WEBPACK_IMPORTED_MODULE_5__.ThemeContext);
      }

      if (typeof props.className === 'string') {
        className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.getRegisteredStyles)(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)(styles.concat(classInterpolations), cache.registered, mergedProps);
      var rules = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_3__.insertStyles)(cache, serialized, typeof finalTag === 'string');
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if ( // $FlowFixMe
        finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;
      newProps.ref = ref;
      var ele = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(finalTag, newProps);

      return ele;
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "development" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.default)({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };

    return Styled;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createStyled);


/***/ }),

/***/ "./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.browser.esm.js");
/* harmony import */ var _base_dist_emotion_styled_base_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/dist/emotion-styled-base.browser.esm.js */ "./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");








var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled = _base_dist_emotion_styled_base_browser_esm_js__WEBPACK_IMPORTED_MODULE_3__.default.bind();
tags.forEach(function (tagName) {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName);
});

/* harmony default export */ __webpack_exports__["default"] = (newStyled);


/***/ }),

/***/ "./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@emotion/styled/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
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

/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/unitless.browser.esm.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": function() { return /* binding */ getRegisteredStyles; },
/* harmony export */   "insertStyles": function() { return /* binding */ insertStyles; }
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (weakMemoize);


/***/ }),

/***/ "./node_modules/@mdx-js/react/dist/esm.js":
/*!************************************************!*\
  !*** ./node_modules/@mdx-js/react/dist/esm.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MDXContext": function() { return /* binding */ MDXContext; },
/* harmony export */   "MDXProvider": function() { return /* binding */ MDXProvider; },
/* harmony export */   "mdx": function() { return /* binding */ createElement; },
/* harmony export */   "useMDXComponents": function() { return /* binding */ useMDXComponents; },
/* harmony export */   "withMDXComponents": function() { return /* binding */ withMDXComponents; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
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

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var MDXContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
var withMDXComponents = function withMDXComponents(Component) {
  return function (props) {
    var allComponents = useMDXComponents(props.components);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _extends({}, props, {
      components: allComponents
    }));
  };
};
var useMDXComponents = function useMDXComponents(components) {
  var contextComponents = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(MDXContext);
  var allComponents = contextComponents;

  if (components) {
    allComponents = isFunction(components) ? components(contextComponents) : _objectSpread2(_objectSpread2({}, contextComponents), components);
  }

  return allComponents;
};
var MDXProvider = function MDXProvider(props) {
  var allComponents = useMDXComponents(props.components);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MDXContext.Provider, {
    value: allComponents
  }, props.children);
};

var TYPE_PROP_NAME = 'mdxType';
var DEFAULTS = {
  inlineCode: 'code',
  wrapper: function wrapper(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {}, children);
  }
};
var MDXCreateElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function (props, ref) {
  var propComponents = props.components,
      mdxType = props.mdxType,
      originalType = props.originalType,
      parentName = props.parentName,
      etc = _objectWithoutProperties(props, ["components", "mdxType", "originalType", "parentName"]);

  var components = useMDXComponents(propComponents);
  var type = mdxType;
  var Component = components["".concat(parentName, ".").concat(type)] || components[type] || DEFAULTS[type] || originalType;

  if (propComponents) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _objectSpread2(_objectSpread2({
      ref: ref
    }, etc), {}, {
      components: propComponents
    }));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _objectSpread2({
    ref: ref
  }, etc));
});
MDXCreateElement.displayName = 'MDXCreateElement';
function createElement (type, props) {
  var args = arguments;
  var mdxType = props && props.mdxType;

  if (typeof type === 'string' || mdxType) {
    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = MDXCreateElement;
    var newProps = {};

    for (var key in props) {
      if (hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }

    newProps.originalType = type;
    newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type : mdxType;
    createElementArgArray[1] = newProps;

    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = args[i];
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement.apply(null, createElementArgArray);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement.apply(null, args);
}




/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _slicedToArray = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");

var _s = $RefreshSig$();

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _router = __webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js");

var _router2 = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

var prefetched = {};

function prefetch(router, href, as, options) {
  if ( false || !router) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options)["catch"](function (err) {
    if (true) {
      // rethrow to show invalid URL errors
      throw err;
    }
  });
  var curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  var target = event.currentTarget.target;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  var nodeName = e.currentTarget.nodeName;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null && as.indexOf('#') >= 0) {
    scroll = false;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow: shallow,
    locale: locale,
    scroll: scroll
  });
}

function Link(props) {
  _s();

  if (true) {
    var createPropError = function createPropError(args) {
      return new Error("Failed prop type: The prop `".concat(args.key, "` expects a ").concat(args.expected, " in `<Link>`, but got `").concat(args.actual, "` instead.") + ( true ? "\nOpen your browser's console to view the Component stack trace." : 0));
    }; // TypeScript trick for type-guarding:


    var requiredPropsGuard = {
      href: true
    };
    var requiredProps = Object.keys(requiredPropsGuard);
    requiredProps.forEach(function (key) {
      if (key === 'href') {
        if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
          throw createPropError({
            key: key,
            expected: '`string` or `object`',
            actual: props[key] === null ? 'null' : typeof props[key]
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var _ = key;
      }
    }); // TypeScript trick for type-guarding:

    var optionalPropsGuard = {
      as: true,
      replace: true,
      scroll: true,
      shallow: true,
      passHref: true,
      prefetch: true,
      locale: true
    };
    var optionalProps = Object.keys(optionalPropsGuard);
    optionalProps.forEach(function (key) {
      var valType = typeof props[key];

      if (key === 'as') {
        if (props[key] && valType !== 'string' && valType !== 'object') {
          throw createPropError({
            key: key,
            expected: '`string` or `object`',
            actual: valType
          });
        }
      } else if (key === 'locale') {
        if (props[key] && valType !== 'string') {
          throw createPropError({
            key: key,
            expected: '`string`',
            actual: valType
          });
        }
      } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'prefetch') {
        if (props[key] != null && valType !== 'boolean') {
          throw createPropError({
            key: key,
            expected: '`boolean`',
            actual: valType
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var _ = key;
      }
    }); // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks

    var hasWarned = _react["default"].useRef(false);

    if (props.prefetch && !hasWarned.current) {
      hasWarned.current = true;
      console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated');
    }
  }

  var p = props.prefetch !== false;
  var router = (0, _router2.useRouter)();

  var _react$default$useMem = _react["default"].useMemo(function () {
    var _ref = (0, _router.resolveHref)(router, props.href, true),
        _ref2 = _slicedToArray(_ref, 2),
        resolvedHref = _ref2[0],
        resolvedAs = _ref2[1];

    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(router, props.as) : resolvedAs || resolvedHref
    };
  }, [router, props.href, props.as]),
      href = _react$default$useMem.href,
      as = _react$default$useMem.as;

  var children = props.children,
      replace = props.replace,
      shallow = props.shallow,
      scroll = props.scroll,
      locale = props.locale; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react["default"].createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  var child;

  if (true) {
    try {
      child = _react.Children.only(children);
    } catch (err) {
      throw new Error("Multiple children were passed to <Link> with `href` of `".concat(props.href, "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children") + ( true ? "\nOpen your browser's console to view the Component stack trace." : 0));
    }
  } else {}

  var childRef = child && typeof child === 'object' && child.ref;

  var _ref3 = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  }),
      _ref4 = _slicedToArray(_ref3, 2),
      setIntersectionRef = _ref4[0],
      isVisible = _ref4[1];

  var setRef = _react["default"].useCallback(function (el) {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(function () {
    var shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    var isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  var childProps = {
    ref: setRef,
    onClick: function onClick(e) {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = function (e) {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    var curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    var localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react["default"].cloneElement(child, childProps);
}

_s(Link, "7cX92ILFgstKFyzTMH+g73G4t5k=");

_c = Link;
var _default = Link;
exports.default = _default;

var _c;

$RefreshReg$(_c, "Link");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _slicedToArray = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");

exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

var hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection(_ref) {
  var rootMargin = _ref.rootMargin,
      disabled = _ref.disabled;
  var isDisabled = disabled || !hasIntersectionObserver;
  var unobserve = (0, _react.useRef)();

  var _ref2 = (0, _react.useState)(false),
      _ref3 = _slicedToArray(_ref2, 2),
      visible = _ref3[0],
      setVisible = _ref3[1];

  var setRef = (0, _react.useCallback)(function (el) {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, function (isVisible) {
        return isVisible && setVisible(isVisible);
      }, {
        rootMargin: rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(function () {
    if (!hasIntersectionObserver) {
      if (!visible) {
        var idleCallback = (0, _requestIdleCallback.requestIdleCallback)(function () {
          return setVisible(true);
        });
        return function () {
          return (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
        };
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  var _createObserver = createObserver(options),
      id = _createObserver.id,
      observer = _createObserver.observer,
      elements = _createObserver.elements;

  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements["delete"](element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers["delete"](id);
    }
  };
}

var observers = new Map();

function createObserver(options) {
  var id = options.rootMargin || '';
  var instance = observers.get(id);

  if (instance) {
    return instance;
  }

  var elements = new Map();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var callback = elements.get(entry.target);
      var isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id: id,
    observer: observer,
    elements: elements
  });
  return instance;
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./pages/_app.jsx":
/*!************************!*\
  !*** ./pages/_app.jsx ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ App; }
/* harmony export */ });
/* harmony import */ var C_Users_USER_Desktop_NextJs_Course_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! theme-ui */ "./node_modules/theme-ui/dist/theme-ui.esm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../theme */ "./theme.js");
/* harmony import */ var _src_components_nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/components/nav */ "./src/components/nav.jsx");
/* module decorator */ module = __webpack_require__.hmd(module);

var _jsxFileName = "C:\\Users\\USER\\Desktop\\NextJs Course\\pages\\_app.jsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,C_Users_USER_Desktop_NextJs_Course_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @jsxRuntime classic */

/** @jsx jsx */




function App(_ref) {
  var Component = _ref.Component,
      pageProps = _ref.pageProps;
  return (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(theme_ui__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {
    theme: _theme__WEBPACK_IMPORTED_MODULE_1__.default,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 5
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(_src_components_nav__WEBPACK_IMPORTED_MODULE_2__.default, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }), (0,theme_ui__WEBPACK_IMPORTED_MODULE_3__.jsx)(Component, _objectSpread(_objectSpread({}, pageProps), {}, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  }))));
}
_c = App;

var _c;

$RefreshReg$(_c, "App");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./src/components/nav.jsx":
/*!********************************!*\
  !*** ./src/components/nav.jsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! theme-ui */ "./node_modules/theme-ui/dist/theme-ui.esm.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var process = __webpack_require__(/*! process */ "./node_modules/process/browser.js");
var _jsxFileName = "C:\\Users\\USER\\Desktop\\NextJs Course\\src\\components\\nav.jsx",
    _this = undefined;

/** @jsxRuntime classic */

/** @jsx jsx */



var Nav = function Nav() {
  return (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.jsx)("header", {
    sx: {
      height: '60px',
      width: '100vw',
      bg: 'primary',
      borderBottom: '1px solid',
      borderColor: 'primary'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 3
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.jsx)("nav", {
    sx: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      variant: 'containers.page',
      height: '100%'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 5
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
    href: "/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
    sx: {
      fontWeight: 'bold',
      fontSize: 4,
      cursor: 'pointer'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 9
    }
  }, "Note App")), (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
    href: "/notes",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }, (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
    sx: {
      color: 'text',
      fontSize: 3,
      cursor: 'pointer'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }, "notes")), (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
    sx: {
      color: 'text',
      fontSize: 3,
      cursor: 'pointer'
    },
    href: process.env.HELP_APP_URL,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }
  }, "Help")));
};

_c = Nav;
/* harmony default export */ __webpack_exports__["default"] = (Nav);

var _c;

$RefreshReg$(_c, "Nav");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./theme.js":
/*!******************!*\
  !*** ./theme.js ***!
  \******************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_USER_Desktop_NextJs_Course_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _theme_ui_presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theme-ui/presets */ "./node_modules/@theme-ui/presets/dist/theme-ui-presets.esm.js");
/* module decorator */ module = __webpack_require__.hmd(module);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,C_Users_USER_Desktop_NextJs_Course_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var theme = _objectSpread(_objectSpread({}, _theme_ui_presets__WEBPACK_IMPORTED_MODULE_1__.roboto), {}, {
  containers: {
    card: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      border: '1px solid',
      borderColor: 'muted',
      borderRadius: '4px',
      p: 2
    },
    page: {
      width: '100%',
      maxWidth: '960px',
      m: 0,
      mx: 'auto'
    }
  },
  styles: _objectSpread({}, _theme_ui_presets__WEBPACK_IMPORTED_MODULE_1__.roboto.styles)
});

/* harmony default export */ __webpack_exports__["default"] = (theme);

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/@styled-system/background/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@styled-system/background/dist/index.esm.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "background": function() { return /* binding */ background; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var config = {
  background: true,
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true
};
config.bgImage = config.backgroundImage;
config.bgSize = config.backgroundSize;
config.bgPosition = config.backgroundPosition;
config.bgRepeat = config.backgroundRepeat;
var background = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (background);


/***/ }),

/***/ "./node_modules/@styled-system/border/dist/index.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/@styled-system/border/dist/index.esm.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "border": function() { return /* binding */ border; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var config = {
  border: {
    property: 'border',
    scale: 'borders'
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'borderWidths'
  },
  borderStyle: {
    property: 'borderStyle',
    scale: 'borderStyles'
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors'
  },
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii'
  },
  borderTop: {
    property: 'borderTop',
    scale: 'borders'
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii'
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii'
  },
  borderRight: {
    property: 'borderRight',
    scale: 'borders'
  },
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders'
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii'
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii'
  },
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders'
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders'
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders'
  }
};
config.borderTopWidth = {
  property: 'borderTopWidth',
  scale: 'borderWidths'
};
config.borderTopColor = {
  property: 'borderTopColor',
  scale: 'colors'
};
config.borderTopStyle = {
  property: 'borderTopStyle',
  scale: 'borderStyles'
};
config.borderTopLeftRadius = {
  property: 'borderTopLeftRadius',
  scale: 'radii'
};
config.borderTopRightRadius = {
  property: 'borderTopRightRadius',
  scale: 'radii'
};
config.borderBottomWidth = {
  property: 'borderBottomWidth',
  scale: 'borderWidths'
};
config.borderBottomColor = {
  property: 'borderBottomColor',
  scale: 'colors'
};
config.borderBottomStyle = {
  property: 'borderBottomStyle',
  scale: 'borderStyles'
};
config.borderBottomLeftRadius = {
  property: 'borderBottomLeftRadius',
  scale: 'radii'
};
config.borderBottomRightRadius = {
  property: 'borderBottomRightRadius',
  scale: 'radii'
};
config.borderLeftWidth = {
  property: 'borderLeftWidth',
  scale: 'borderWidths'
};
config.borderLeftColor = {
  property: 'borderLeftColor',
  scale: 'colors'
};
config.borderLeftStyle = {
  property: 'borderLeftStyle',
  scale: 'borderStyles'
};
config.borderRightWidth = {
  property: 'borderRightWidth',
  scale: 'borderWidths'
};
config.borderRightColor = {
  property: 'borderRightColor',
  scale: 'colors'
};
config.borderRightStyle = {
  property: 'borderRightStyle',
  scale: 'borderStyles'
};
var border = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (border);


/***/ }),

/***/ "./node_modules/@styled-system/color/dist/index.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@styled-system/color/dist/index.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "color": function() { return /* binding */ color; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var config = {
  color: {
    property: 'color',
    scale: 'colors'
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors'
  },
  opacity: true
};
config.bg = config.backgroundColor;
var color = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (color);


/***/ }),

/***/ "./node_modules/@styled-system/core/dist/index.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/@styled-system/core/dist/index.esm.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "merge": function() { return /* binding */ merge; },
/* harmony export */   "get": function() { return /* binding */ get; },
/* harmony export */   "createParser": function() { return /* binding */ createParser; },
/* harmony export */   "createStyleFunction": function() { return /* binding */ createStyleFunction; },
/* harmony export */   "system": function() { return /* binding */ system; },
/* harmony export */   "compose": function() { return /* binding */ compose; }
/* harmony export */ });
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_0__);

var merge = function merge(a, b) {
  var result = object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, a, b);

  for (var key in a) {
    var _assign;

    if (!a[key] || typeof b[key] !== 'object') continue;
    object_assign__WEBPACK_IMPORTED_MODULE_0___default()(result, (_assign = {}, _assign[key] = object_assign__WEBPACK_IMPORTED_MODULE_0___default()(a[key], b[key]), _assign));
  }

  return result;
}; // sort object-value responsive styles

var sort = function sort(obj) {
  var next = {};
  Object.keys(obj).sort(function (a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  }).forEach(function (key) {
    next[key] = obj[key];
  });
  return next;
};

var defaults = {
  breakpoints: [40, 52, 64].map(function (n) {
    return n + 'em';
  })
};

var createMediaQuery = function createMediaQuery(n) {
  return "@media screen and (min-width: " + n + ")";
};

var getValue = function getValue(n, scale) {
  return get(scale, n, n);
};

var get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};
var createParser = function createParser(config) {
  var cache = {};

  var parse = function parse(props) {
    var styles = {};
    var shouldSort = false;
    var isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;

    for (var key in props) {
      if (!config[key]) continue;
      var sx = config[key];
      var raw = props[key];
      var scale = get(props.theme, sx.scale, sx.defaults);

      if (typeof raw === 'object') {
        cache.breakpoints = !isCacheDisabled && cache.breakpoints || get(props.theme, 'breakpoints', defaults.breakpoints);

        if (Array.isArray(raw)) {
          cache.media = !isCacheDisabled && cache.media || [null].concat(cache.breakpoints.map(createMediaQuery));
          styles = merge(styles, parseResponsiveStyle(cache.media, sx, scale, raw, props));
          continue;
        }

        if (raw !== null) {
          styles = merge(styles, parseResponsiveObject(cache.breakpoints, sx, scale, raw, props));
          shouldSort = true;
        }

        continue;
      }

      object_assign__WEBPACK_IMPORTED_MODULE_0___default()(styles, sx(raw, scale, props));
    } // sort object-based responsive styles


    if (shouldSort) {
      styles = sort(styles);
    }

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;
  var keys = Object.keys(config).filter(function (k) {
    return k !== 'config';
  });

  if (keys.length > 1) {
    keys.forEach(function (key) {
      var _createParser;

      parse[key] = createParser((_createParser = {}, _createParser[key] = config[key], _createParser));
    });
  }

  return parse;
};

var parseResponsiveStyle = function parseResponsiveStyle(mediaQueries, sx, scale, raw, _props) {
  var styles = {};
  raw.slice(0, mediaQueries.length).forEach(function (value, i) {
    var media = mediaQueries[i];
    var style = sx(value, scale, _props);

    if (!media) {
      object_assign__WEBPACK_IMPORTED_MODULE_0___default()(styles, style);
    } else {
      var _assign2;

      object_assign__WEBPACK_IMPORTED_MODULE_0___default()(styles, (_assign2 = {}, _assign2[media] = object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, styles[media], style), _assign2));
    }
  });
  return styles;
};

var parseResponsiveObject = function parseResponsiveObject(breakpoints, sx, scale, raw, _props) {
  var styles = {};

  for (var key in raw) {
    var breakpoint = breakpoints[key];
    var value = raw[key];
    var style = sx(value, scale, _props);

    if (!breakpoint) {
      object_assign__WEBPACK_IMPORTED_MODULE_0___default()(styles, style);
    } else {
      var _assign3;

      var media = createMediaQuery(breakpoint);
      object_assign__WEBPACK_IMPORTED_MODULE_0___default()(styles, (_assign3 = {}, _assign3[media] = object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, styles[media], style), _assign3));
    }
  }

  return styles;
};

var createStyleFunction = function createStyleFunction(_ref) {
  var properties = _ref.properties,
      property = _ref.property,
      scale = _ref.scale,
      _ref$transform = _ref.transform,
      transform = _ref$transform === void 0 ? getValue : _ref$transform,
      defaultScale = _ref.defaultScale;
  properties = properties || [property];

  var sx = function sx(value, scale, _props) {
    var result = {};
    var n = transform(value, scale, _props);
    if (n === null) return;
    properties.forEach(function (prop) {
      result[prop] = n;
    });
    return result;
  };

  sx.scale = scale;
  sx.defaults = defaultScale;
  return sx;
}; // new v5 API

var system = function system(args) {
  if (args === void 0) {
    args = {};
  }

  var config = {};
  Object.keys(args).forEach(function (key) {
    var conf = args[key];

    if (conf === true) {
      // shortcut definition
      config[key] = createStyleFunction({
        property: key,
        scale: key
      });
      return;
    }

    if (typeof conf === 'function') {
      config[key] = conf;
      return;
    }

    config[key] = createStyleFunction(conf);
  });
  var parser = createParser(config);
  return parser;
};
var compose = function compose() {
  var config = {};

  for (var _len = arguments.length, parsers = new Array(_len), _key = 0; _key < _len; _key++) {
    parsers[_key] = arguments[_key];
  }

  parsers.forEach(function (parser) {
    if (!parser || !parser.config) return;
    object_assign__WEBPACK_IMPORTED_MODULE_0___default()(config, parser.config);
  });
  var parser = createParser(config);
  return parser;
};


/***/ }),

/***/ "./node_modules/@styled-system/css/dist/index.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@styled-system/css/dist/index.esm.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": function() { return /* binding */ get; },
/* harmony export */   "responsive": function() { return /* binding */ responsive; },
/* harmony export */   "css": function() { return /* binding */ css; }
/* harmony export */ });
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// based on https://github.com/developit/dlv
var get = function get(obj, key, def, p, undef) {
  key = key && key.split ? key.split('.') : [key];

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
};
var defaultBreakpoints = [40, 52, 64].map(function (n) {
  return n + 'em';
});
var defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY'
};
var multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height']
};
var scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  outlineColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors'
};

var positiveOrNegative = function positiveOrNegative(scale, value) {
  if (typeof value !== 'number' || value >= 0) {
    return get(scale, value, value);
  }

  var absolute = Math.abs(value);
  var n = get(scale, absolute, absolute);
  if (typeof n === 'string') return '-' + n;
  return n * -1;
};

var transforms = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'top', 'bottom', 'left', 'right'].reduce(function (acc, curr) {
  var _extends2;

  return _extends({}, acc, (_extends2 = {}, _extends2[curr] = positiveOrNegative, _extends2));
}, {});
var responsive = function responsive(styles) {
  return function (theme) {
    var next = {};
    var breakpoints = get(theme, 'breakpoints', defaultBreakpoints);
    var mediaQueries = [null].concat(breakpoints.map(function (n) {
      return "@media screen and (min-width: " + n + ")";
    }));

    for (var key in styles) {
      var value = typeof styles[key] === 'function' ? styles[key](theme) : styles[key];
      if (value == null) continue;

      if (!Array.isArray(value)) {
        next[key] = value;
        continue;
      }

      for (var i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
        var media = mediaQueries[i];

        if (!media) {
          next[key] = value[i];
          continue;
        }

        next[media] = next[media] || {};
        if (value[i] == null) continue;
        next[media][key] = value[i];
      }
    }

    return next;
  };
};
var css = function css(args) {
  return function (props) {
    if (props === void 0) {
      props = {};
    }

    var theme = _extends({}, defaultTheme, {}, props.theme || props);

    var result = {};
    var obj = typeof args === 'function' ? args(theme) : args;
    var styles = responsive(obj)(theme);

    for (var key in styles) {
      var x = styles[key];
      var val = typeof x === 'function' ? x(theme) : x;

      if (key === 'variant') {
        var variant = css(get(theme, val))(theme);
        result = _extends({}, result, {}, variant);
        continue;
      }

      if (val && typeof val === 'object') {
        result[key] = css(val)(theme);
        continue;
      }

      var prop = get(aliases, key, key);
      var scaleName = get(scales, prop);
      var scale = get(theme, scaleName, get(theme, prop, {}));
      var transform = get(transforms, prop, get);
      var value = transform(scale, val, val);

      if (multiples[prop]) {
        var dirs = multiples[prop];

        for (var i = 0; i < dirs.length; i++) {
          result[dirs[i]] = value;
        }
      } else {
        result[prop] = value;
      }
    }

    return result;
  };
};
/* harmony default export */ __webpack_exports__["default"] = (css);


/***/ }),

/***/ "./node_modules/@styled-system/flexbox/dist/index.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@styled-system/flexbox/dist/index.esm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flexbox": function() { return /* binding */ flexbox; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var config = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  // item
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true
};
var flexbox = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (flexbox);


/***/ }),

/***/ "./node_modules/@styled-system/grid/dist/index.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/@styled-system/grid/dist/index.esm.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "grid": function() { return /* binding */ grid; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};
var config = {
  gridGap: {
    property: 'gridGap',
    scale: 'space',
    defaultScale: defaults.space
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
    defaultScale: defaults.space
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
    defaultScale: defaults.space
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true
};
var grid = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (grid);


/***/ }),

/***/ "./node_modules/@styled-system/layout/dist/index.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/@styled-system/layout/dist/index.esm.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "layout": function() { return /* binding */ layout; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");


var isNumber = function isNumber(n) {
  return typeof n === 'number' && !isNaN(n);
};

var getWidth = function getWidth(n, scale) {
  return (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.get)(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');
};

var config = {
  width: {
    property: 'width',
    scale: 'sizes',
    transform: getWidth
  },
  height: {
    property: 'height',
    scale: 'sizes'
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes'
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes'
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes'
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes'
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes'
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true
};
var layout = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (layout);


/***/ }),

/***/ "./node_modules/@styled-system/position/dist/index.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/@styled-system/position/dist/index.esm.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "position": function() { return /* binding */ position; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};
var config = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices'
  },
  top: {
    property: 'top',
    scale: 'space',
    defaultScale: defaults.space
  },
  right: {
    property: 'right',
    scale: 'space',
    defaultScale: defaults.space
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    defaultScale: defaults.space
  },
  left: {
    property: 'left',
    scale: 'space',
    defaultScale: defaults.space
  }
};
var position = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (position);


/***/ }),

/***/ "./node_modules/@styled-system/shadow/dist/index.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/@styled-system/shadow/dist/index.esm.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shadow": function() { return /* binding */ shadow; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var shadow = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)({
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows'
  },
  textShadow: {
    property: 'textShadow',
    scale: 'shadows'
  }
});
/* harmony default export */ __webpack_exports__["default"] = (shadow);


/***/ }),

/***/ "./node_modules/@styled-system/should-forward-prop/dist/index.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@styled-system/should-forward-prop/dist/index.esm.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "props": function() { return /* binding */ props; },
/* harmony export */   "createShouldForwardProp": function() { return /* binding */ createShouldForwardProp; }
/* harmony export */ });
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/memoize/dist/memoize.browser.esm.js");
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");



var all = (0,styled_system__WEBPACK_IMPORTED_MODULE_2__.compose)(styled_system__WEBPACK_IMPORTED_MODULE_2__.space, styled_system__WEBPACK_IMPORTED_MODULE_2__.typography, styled_system__WEBPACK_IMPORTED_MODULE_2__.color, styled_system__WEBPACK_IMPORTED_MODULE_2__.layout, styled_system__WEBPACK_IMPORTED_MODULE_2__.flexbox, styled_system__WEBPACK_IMPORTED_MODULE_2__.border, styled_system__WEBPACK_IMPORTED_MODULE_2__.background, styled_system__WEBPACK_IMPORTED_MODULE_2__.position, styled_system__WEBPACK_IMPORTED_MODULE_2__.grid, styled_system__WEBPACK_IMPORTED_MODULE_2__.shadow, styled_system__WEBPACK_IMPORTED_MODULE_2__.buttonStyle, styled_system__WEBPACK_IMPORTED_MODULE_2__.textStyle, styled_system__WEBPACK_IMPORTED_MODULE_2__.colorStyle);
var props = all.propNames;
var createShouldForwardProp = function createShouldForwardProp(props) {
  var regex = new RegExp("^(" + props.join('|') + ")$");
  return (0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__.default)(function (prop) {
    return (0,_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_1__.default)(prop) && !regex.test(prop);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (createShouldForwardProp(props));


/***/ }),

/***/ "./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js ***!
  \*******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/memoize/dist/memoize.browser.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = (0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__.default)(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ __webpack_exports__["default"] = (index);


/***/ }),

/***/ "./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/memoize/dist/memoize.browser.esm.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@styled-system/should-forward-prop/node_modules/@emotion/memoize/dist/memoize.browser.esm.js ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);


/***/ }),

/***/ "./node_modules/@styled-system/space/dist/index.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@styled-system/space/dist/index.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "margin": function() { return /* binding */ margin; },
/* harmony export */   "padding": function() { return /* binding */ padding; },
/* harmony export */   "space": function() { return /* binding */ space; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};

var isNumber = function isNumber(n) {
  return typeof n === 'number' && !isNaN(n);
};

var getMargin = function getMargin(n, scale) {
  if (!isNumber(n)) {
    return (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.get)(scale, n, n);
  }

  var isNegative = n < 0;
  var absolute = Math.abs(n);
  var value = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.get)(scale, absolute, absolute);

  if (!isNumber(value)) {
    return isNegative ? '-' + value : value;
  }

  return value * (isNegative ? -1 : 1);
};

var configs = {};
configs.margin = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space
  }
};
configs.margin.m = configs.margin.margin;
configs.margin.mt = configs.margin.marginTop;
configs.margin.mr = configs.margin.marginRight;
configs.margin.mb = configs.margin.marginBottom;
configs.margin.ml = configs.margin.marginLeft;
configs.margin.mx = configs.margin.marginX;
configs.margin.my = configs.margin.marginY;
configs.padding = {
  padding: {
    property: 'padding',
    scale: 'space',
    defaultScale: defaults.space
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
    defaultScale: defaults.space
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
    defaultScale: defaults.space
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
    defaultScale: defaults.space
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
    defaultScale: defaults.space
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    defaultScale: defaults.space
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    defaultScale: defaults.space
  }
};
configs.padding.p = configs.padding.padding;
configs.padding.pt = configs.padding.paddingTop;
configs.padding.pr = configs.padding.paddingRight;
configs.padding.pb = configs.padding.paddingBottom;
configs.padding.pl = configs.padding.paddingLeft;
configs.padding.px = configs.padding.paddingX;
configs.padding.py = configs.padding.paddingY;
var margin = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(configs.margin);
var padding = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(configs.padding);
var space = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.compose)(margin, padding);
/* harmony default export */ __webpack_exports__["default"] = (space);


/***/ }),

/***/ "./node_modules/@styled-system/typography/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@styled-system/typography/dist/index.esm.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "typography": function() { return /* binding */ typography; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");

var defaults = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var config = {
  fontFamily: {
    property: 'fontFamily',
    scale: 'fonts'
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
    defaultScale: defaults.fontSizes
  },
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights'
  },
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights'
  },
  letterSpacing: {
    property: 'letterSpacing',
    scale: 'letterSpacings'
  },
  textAlign: true,
  fontStyle: true
};
var typography = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system)(config);
/* harmony default export */ __webpack_exports__["default"] = (typography);


/***/ }),

/***/ "./node_modules/@styled-system/variant/dist/index.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@styled-system/variant/dist/index.esm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "variant": function() { return /* binding */ variant; },
/* harmony export */   "buttonStyle": function() { return /* binding */ buttonStyle; },
/* harmony export */   "textStyle": function() { return /* binding */ textStyle; },
/* harmony export */   "colorStyle": function() { return /* binding */ colorStyle; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");
/* harmony import */ var _styled_system_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @styled-system/css */ "./node_modules/@styled-system/css/dist/index.esm.js");


var variant = function variant(_ref) {
  var _config;

  var scale = _ref.scale,
      _ref$prop = _ref.prop,
      prop = _ref$prop === void 0 ? 'variant' : _ref$prop,
      _ref$variants = _ref.variants,
      variants = _ref$variants === void 0 ? {} : _ref$variants,
      key = _ref.key;
  var sx;

  if (Object.keys(variants).length) {
    sx = function sx(value, scale, props) {
      return (0,_styled_system_css__WEBPACK_IMPORTED_MODULE_1__.default)((0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.get)(scale, value, null))(props.theme);
    };
  } else {
    sx = function sx(value, scale) {
      return (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.get)(scale, value, null);
    };
  }

  sx.scale = scale || key;
  sx.defaults = variants;
  var config = (_config = {}, _config[prop] = sx, _config);
  var parser = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.createParser)(config);
  return parser;
};
/* harmony default export */ __webpack_exports__["default"] = (variant);
var buttonStyle = variant({
  key: 'buttons'
});
var textStyle = variant({
  key: 'textStyles',
  prop: 'textStyle'
});
var colorStyle = variant({
  key: 'colorStyles',
  prop: 'colors'
});


/***/ }),

/***/ "./node_modules/@theme-ui/color-modes/dist/theme-ui-color-modes.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theme-ui/color-modes/dist/theme-ui-color-modes.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorModeProvider": function() { return /* binding */ ColorModeProvider; },
/* harmony export */   "InitializeColorMode": function() { return /* binding */ InitializeColorMode; },
/* harmony export */   "useColorMode": function() { return /* binding */ useColorMode; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _theme_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @theme-ui/core */ "./node_modules/@theme-ui/core/dist/theme-ui-core.esm.js");
/* harmony import */ var _theme_ui_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theme-ui/css */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");





const toVarName = key => `--theme-ui-${key.replace('-__default', '')}`;

const toVarValue = key => `var(${toVarName(key)})`;

const join = (...args) => args.filter(Boolean).join('-');
const reservedKeys = {
  useCustomProperties: true,
  initialColorModeName: true,
  printColorModeName: true,
  initialColorMode: true,
  useLocalStorage: true
};


const toCustomProperties = (obj, parent, themeKey) => {
  const next = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = obj[key];
    const name = join(parent, key);

    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name);
      continue;
    }

    if (reservedKeys[key]) {
      next[key] = value;
      continue;
    }
    next[key] = toVarValue(name);
  }

  return next;
};
const objectToVars = (parent, obj) => {
  let vars = {};

  for (let key in obj) {
    if (key === 'modes') continue;
    const name = join(parent, key);
    const value = obj[key];

    if (value && typeof value === 'object') {
      vars = { ...vars,
        ...objectToVars(name, value)
      };
    } else {
      vars[toVarName(name)] = value;
    }
  }

  return vars;
}; // create root styles for color modes

const createColorStyles = (theme = {}) => {
  const {
    useCustomProperties,
    initialColorModeName,
    printColorModeName,
    useRootStyles
  } = theme.config || theme || {};
  const colors = theme.rawColors || theme.colors;
  if (!colors || useRootStyles === false) return {};

  if (useCustomProperties === false) {
    return (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_1__.css)({
      html: {
        color: 'text',
        bg: 'background'
      }
    })(theme);
  }

  const modes = colors.modes || {};
  const styles = objectToVars('colors', colors);
  Object.keys(modes).forEach(mode => {
    const key = `&.theme-ui-${mode}`;
    styles[key] = objectToVars('colors', modes[mode]);
  });

  if (printColorModeName) {
    const mode = printColorModeName === 'initial' || printColorModeName === initialColorModeName ? colors : modes[printColorModeName];
    styles['@media print'] = objectToVars('colors', mode);
  }

  const colorToVarValue = color => toVarValue(`colors-${color}`);

  return (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_1__.css)({
    html: { ...styles,
      color: colorToVarValue('text'),
      bg: colorToVarValue('background')
    }
  })(theme);
};

const STORAGE_KEY = 'theme-ui-color-mode';
const storage = {
  get: () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.warn('localStorage is disabled and color mode might not work as expected.', 'Please check your Site Settings.', e);
    }
  },
  set: value => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      console.warn('localStorage is disabled and color mode might not work as expected.', 'Please check your Site Settings.', e);
    }
  }
};

const getPreferredColorScheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }

  return null;
};

const getModeFromClass = () => {
  let mode;

  if (typeof document !== 'undefined') {
    document.documentElement.classList.forEach(className => {
      if (className.startsWith('theme-ui-')) {
        mode = className.replace('theme-ui-', '');
      }
    });
  }

  return mode;
};

const useColorModeState = (theme = {}) => {
  const {
    initialColorModeName,
    useColorSchemeMediaQuery,
    useLocalStorage
  } = theme.config || theme;
  let [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    const modeFromClass = getModeFromClass();

    if (modeFromClass) {
      return modeFromClass;
    }

    const preferredMode = useColorSchemeMediaQuery !== false && getPreferredColorScheme();
    return preferredMode || initialColorModeName;
  }); // on first render, we read the color mode from localStorage and
  // clear the class on document element body

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const stored = useLocalStorage !== false && storage.get();

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-ui-' + stored);
      document.body.classList.remove('theme-ui-' + stored);
    }

    if (stored && stored !== mode) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mode = stored;
      setMode(stored);
    }
  }, []); // when mode changes, we save it to localStorage

  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
    if (mode && useLocalStorage !== false) {
      storage.set(mode);
    }
  }, [mode, useLocalStorage]);

  if (true) {
    var _theme$colors;

    if ((_theme$colors = theme.colors) != null && _theme$colors.modes && initialColorModeName && Object.keys(theme.colors.modes).indexOf(initialColorModeName) > -1) {
      console.warn('[theme-ui] The `initialColorModeName` value should be a unique name' + ' and cannot reference a key in `theme.colors.modes`.');
    }
  }

  return [mode, setMode];
};

function useColorMode() {
  const {
    colorMode,
    setColorMode
  } = (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_2__.useThemeUI)();

  if (typeof setColorMode !== 'function') {
    throw new Error(`[useColorMode] requires the ColorModeProvider component`);
  } // We're allowing the user to specify a narrower type for its color mode name.


  return [colorMode, setColorMode];
}

const omitModes = colors => {
  const res = { ...colors
  };
  delete res.modes;
  return res;
};

function copyRawColors(colors, outerThemeRawColors) {
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string' && !value.startsWith('var(')) {
      outerThemeRawColors[key] = value;
    }

    if (typeof value === 'object') {
      outerThemeRawColors[key] = { ...outerThemeRawColors[key],
        ...copyRawColors(value, {})
      };
    }
  }

  return outerThemeRawColors;
}

const ColorModeProvider = ({
  children
}) => {
  const outer = (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_2__.useThemeUI)();
  const outerTheme = outer.theme;
  const [colorMode, setColorMode] = useColorModeState(outerTheme);
  const theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const res = { ...outerTheme
    };
    const modes = (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_1__.get)(res, 'colors.modes', {});
    const currentColorMode = (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_1__.get)(modes, colorMode, {});

    if (colorMode) {
      res.colors = { ...res.colors,
        ...currentColorMode
      };
    }

    const {
      useCustomProperties,
      initialColorModeName = '__default'
    } = outerTheme.config || outerTheme;
    let outerThemeRawColors = outerTheme.rawColors || outerTheme.colors || {};

    if (useCustomProperties !== false) {
      const alreadyHasRawColors = res.rawColors != null;
      const colors = res.colors || {};

      if (alreadyHasRawColors) {
        outerThemeRawColors = { ...outerThemeRawColors
        };
        copyRawColors(colors, outerThemeRawColors);

        if ('modes' in outerThemeRawColors) {
          var _res$rawColors;

          res.rawColors = { ...outerThemeRawColors,
            modes: { ...((_res$rawColors = res.rawColors) == null ? void 0 : _res$rawColors.modes),
              [initialColorModeName]: omitModes(outerThemeRawColors)
            }
          };
        } else {
          res.rawColors = outerThemeRawColors;
        }
      } else {
        if (!('modes' in outerThemeRawColors)) {
          res.rawColors = colors;
        } else {
          const modes = {
            [initialColorModeName]: omitModes(outerThemeRawColors),
            ...outerThemeRawColors.modes
          };
          res.rawColors = { ...colors,
            modes
          };
          /* modes doesn't match index signature by design */
        }
      }

      res.colors = toCustomProperties(omitModes(outerThemeRawColors), 'colors');
    }

    return res;
  }, [colorMode, outerTheme]);
  const context = { ...outer,
    theme,
    colorMode,
    setColorMode
  };
  const isTopLevelColorModeProvider = outer.setColorMode === undefined;
  return (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_2__.jsx)(_theme_ui_core__WEBPACK_IMPORTED_MODULE_2__.__ThemeUIInternalBaseThemeProvider, {
    context
  }, isTopLevelColorModeProvider ? (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_2__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_3__.Global, {
    styles: () => {
      return createColorStyles(theme);
    }
  }) : (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_2__.jsx)('div', {
    className: 'theme-ui__nested-color-mode-provider',
    style: createColorStyles(theme)['html']
  }), children);
};
const noflash = `(function() { try {
  var mode = localStorage.getItem('theme-ui-color-mode');
  if (!mode) return
  document.documentElement.classList.add('theme-ui-' + mode);
  document.body.classList.add('theme-ui-' + mode);
} catch (e) {} })();`;
const InitializeColorMode = () => (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_2__.jsx)('script', {
  key: 'theme-ui-no-flash',
  dangerouslySetInnerHTML: {
    __html: noflash
  }
});




/***/ }),

/***/ "./node_modules/@theme-ui/components/dist/theme-ui-components.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@theme-ui/components/dist/theme-ui-components.esm.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alert": function() { return /* binding */ Alert; },
/* harmony export */   "AspectImage": function() { return /* binding */ AspectImage; },
/* harmony export */   "AspectRatio": function() { return /* binding */ AspectRatio; },
/* harmony export */   "Avatar": function() { return /* binding */ Avatar; },
/* harmony export */   "Badge": function() { return /* binding */ Badge; },
/* harmony export */   "Box": function() { return /* binding */ Box; },
/* harmony export */   "Button": function() { return /* binding */ Button; },
/* harmony export */   "Card": function() { return /* binding */ Card; },
/* harmony export */   "Checkbox": function() { return /* binding */ Checkbox; },
/* harmony export */   "Close": function() { return /* binding */ Close; },
/* harmony export */   "Container": function() { return /* binding */ Container; },
/* harmony export */   "Divider": function() { return /* binding */ Divider; },
/* harmony export */   "Donut": function() { return /* binding */ Donut; },
/* harmony export */   "Embed": function() { return /* binding */ Embed; },
/* harmony export */   "Field": function() { return /* binding */ Field; },
/* harmony export */   "Flex": function() { return /* binding */ Flex; },
/* harmony export */   "Grid": function() { return /* binding */ Grid; },
/* harmony export */   "Heading": function() { return /* binding */ Heading; },
/* harmony export */   "IconButton": function() { return /* binding */ IconButton; },
/* harmony export */   "Image": function() { return /* binding */ Image; },
/* harmony export */   "Input": function() { return /* binding */ Input; },
/* harmony export */   "Label": function() { return /* binding */ Label; },
/* harmony export */   "Link": function() { return /* binding */ Link; },
/* harmony export */   "MenuButton": function() { return /* binding */ MenuButton; },
/* harmony export */   "Message": function() { return /* binding */ Message; },
/* harmony export */   "NavLink": function() { return /* binding */ NavLink; },
/* harmony export */   "Paragraph": function() { return /* binding */ Paragraph; },
/* harmony export */   "Progress": function() { return /* binding */ Progress; },
/* harmony export */   "Radio": function() { return /* binding */ Radio; },
/* harmony export */   "Select": function() { return /* binding */ Select; },
/* harmony export */   "Slider": function() { return /* binding */ Slider; },
/* harmony export */   "Spinner": function() { return /* binding */ Spinner; },
/* harmony export */   "Switch": function() { return /* binding */ Switch; },
/* harmony export */   "Text": function() { return /* binding */ Text; },
/* harmony export */   "Textarea": function() { return /* binding */ Textarea; }
/* harmony export */ });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");
/* harmony import */ var _theme_ui_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @theme-ui/css */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");
/* harmony import */ var _styled_system_should_forward_prop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @styled-system/should-forward-prop */ "./node_modules/@styled-system/should-forward-prop/dist/index.esm.js");
/* harmony import */ var _styled_system_space__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @styled-system/space */ "./node_modules/@styled-system/space/dist/index.esm.js");
/* harmony import */ var _styled_system_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @styled-system/color */ "./node_modules/@styled-system/color/dist/index.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");








const boxSystemProps = [..._styled_system_space__WEBPACK_IMPORTED_MODULE_2__.default.propNames, ..._styled_system_color__WEBPACK_IMPORTED_MODULE_3__.default.propNames];
/**
 * @internal
 * @type {(prop: string) => boolean}
 */

const __isBoxStyledSystemProp = prop => boxSystemProps.includes(prop);
const shouldForwardProp = (0,_styled_system_should_forward_prop__WEBPACK_IMPORTED_MODULE_1__.createShouldForwardProp)(boxSystemProps);

const sx = props => (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.css)(props.sx)(props.theme);

const base = props => (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.css)(props.__css)(props.theme);

const variant = ({
  theme,
  variant,
  __themeKey = 'variants'
}) => (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.css)((0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.get)(theme, __themeKey + '.' + variant, (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.get)(theme, variant)));

const Box = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
  shouldForwardProp
})({
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0
}, base, variant, _styled_system_space__WEBPACK_IMPORTED_MODULE_2__.default, _styled_system_color__WEBPACK_IMPORTED_MODULE_3__.default, sx, props => props.css);
Box.displayName = 'Box';

const Flex = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.default)(Box)({
  display: 'flex'
});
Flex.displayName = 'Flex';

function _extends() {
  _extends = Object.assign || function (target) {
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

const px = n => typeof n === 'number' ? n + 'px' : n;

const widthToColumns = (width, repeat) => Array.isArray(width) ? width.map(w => widthToColumns(w, repeat)) : !!width && `repeat(auto-${repeat}, minmax(${px(width)}, 1fr))`;

const countToColumns = n => Array.isArray(n) ? n.map(countToColumns) : !!n && (typeof n === 'number' ? `repeat(${n}, 1fr)` : n);

const Grid = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Grid({
  width,
  columns,
  gap = 3,
  repeat = 'fit',
  ...props
}, ref) {
  const gridTemplateColumns = !!width ? widthToColumns(width, repeat) : countToColumns(columns);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref
  }, props, {
    __themeKey: "grids",
    __css: {
      display: 'grid',
      gridGap: gap,
      gridTemplateColumns
    }
  }));
});

const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Button(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "button",
    variant: "primary"
  }, props, {
    __themeKey: "buttons",
    __css: {
      appearance: 'none',
      display: props.hidden ? undefined : 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      px: 3,
      py: 2,
      color: 'white',
      bg: 'primary',
      border: 0,
      borderRadius: 4
    }
  }));
});

const Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Link(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "a",
    variant: "styles.a"
  }, props, {
    __themeKey: "links"
  }));
});

const Paragraph = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Paragraph(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "p",
    variant: "paragraph",
    __themeKey: "text",
    __css: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  }, props));
});

const Text = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Text(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    as: "span",
    ref: ref,
    variant: "default"
  }, props, {
    __themeKey: "text"
  }));
});

const Heading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Heading(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "h2",
    variant: "heading"
  }, props, {
    __themeKey: "text",
    __css: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading'
    }
  }));
});

const Image = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Image(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "img"
  }, props, {
    __themeKey: "images",
    __css: {
      maxWidth: '100%',
      height: 'auto',
      ...props.__css
    }
  }));
});

const Card = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Card(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "cards"
  }));
});

const Label = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Label(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "label",
    variant: "label"
  }, props, {
    __themeKey: "forms",
    __css: {
      width: '100%',
      display: 'flex'
    }
  }));
});

/** @type {import('theme-ui').ThemeUIStyleObject} */

const autofillStyles = {
  boxShadow: 'inset 0 0 0 1000px var(--theme-ui-input-autofill-bg)',
  fontSize: 'inherit',
  ':first-line': {
    fontSize: '1rem'
  }
};
/** @type {import('theme-ui').ThemeUIStyleObject} */

const defaultInputStyles = {
  display: 'block',
  width: '100%',
  p: 2,
  appearance: 'none',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  border: '1px solid',
  borderRadius: 4,
  color: 'inherit',
  bg: 'transparent',
  ':autofill, :autofill:hover, :autofill:focus': autofillStyles,
  ':-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus': autofillStyles
};
const Input = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Input({
  sx,
  autofillBackgroundColor = 'background',
  ...rest
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "input",
    variant: "input",
    sx: {
      '--theme-ui-input-autofill-bg': theme => (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.get)(theme.colors, autofillBackgroundColor, null),
      ...sx
    }
  }, rest, {
    __themeKey: "forms",
    __css: defaultInputStyles
  }));
});

const SVG = ({
  size = 24,
  ...props
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
  as: "svg",
  xmlns: "http://www.w3.org/2000/svg",
  width: size + '',
  height: size + '',
  viewBox: "0 0 24 24",
  fill: "currentcolor"
}, props));

SVG.displayName = 'SVG';

const getProps = test => props => {
  const next = {};

  for (const key in props) {
    if (test(key || '')) next[key] = props[key];
  }

  return next;
};
const MRE = /^m[trblxy]?$/;
const getMargin = getProps(k => MRE.test(k));
const omitMargin = getProps(k => !MRE.test(k));

const DownArrow = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(SVG, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("path", {
  d: "M7 10l5 5 5-5z"
}));

const Select = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Select({
  arrow,
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({}, getMargin(props), {
    sx: {
      display: 'flex'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "select",
    variant: "select"
  }, omitMargin(props), {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      p: 2,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderRadius: 4,
      color: 'inherit',
      backgroundColor: theme => (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.get)(theme, 'colors.background', null)
    }
  })), arrow || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(DownArrow, {
    sx: {
      ml: -28,
      alignSelf: 'center',
      pointerEvents: 'none'
    }
  }));
});

const Textarea = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Textarea(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "textarea",
    variant: "textarea"
  }, props, {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      p: 2,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderRadius: 4,
      color: 'inherit',
      bg: 'transparent'
    }
  }));
});

const RadioChecked = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(SVG, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("path", {
  d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}));

const RadioUnchecked = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(SVG, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}));

const RadioIcon = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(RadioChecked, _extends({}, props, {
  __css: {
    display: 'none',
    'input:checked ~ &': {
      display: 'block'
    }
  }
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(RadioUnchecked, _extends({}, props, {
  __css: {
    display: 'block',
    'input:checked ~ &': {
      display: 'none'
    }
  }
})));

const Radio = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Radio({
  className,
  sx,
  variant = 'radio',
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    sx: {
      minWidth: 'min-content'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "radio"
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    as: RadioIcon,
    "aria-hidden": "true",
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      // todo: system props??
      mr: 2,
      borderRadius: 9999,
      color: 'gray',
      flexShrink: 0,
      'input:checked ~ &': {
        color: 'primary'
      },
      'input:focus ~ &': {
        bg: 'highlight'
      }
    }
  }));
});

const CheckboxChecked = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(SVG, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}));

const CheckboxUnchecked = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(SVG, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}));

const CheckboxIcon = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(CheckboxChecked, _extends({}, props, {
  __css: {
    display: 'none',
    'input:checked ~ &': {
      display: 'block'
    }
  }
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(CheckboxUnchecked, _extends({}, props, {
  __css: {
    display: 'block',
    'input:checked ~ &': {
      display: 'none'
    }
  }
})));

const Checkbox = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Checkbox({
  className,
  sx,
  variant = 'checkbox',
  children,
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    sx: {
      minWidth: 'min-content'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "checkbox"
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    as: CheckboxIcon,
    "aria-hidden": "true",
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      mr: 2,
      borderRadius: 4,
      color: 'gray',
      flexShrink: 0,
      'input:checked ~ &': {
        color: 'primary'
      },
      'input:focus ~ &': {
        color: 'primary',
        bg: 'highlight'
      }
    }
  }), children);
});

const GUTTER = 2;
const SIZE = 18;
const Switch = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Switch({
  className,
  label,
  sx,
  variant = 'switch',
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Label, {
    sx: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "checkbox",
    __themeKey: "forms",
    "aria-label": label
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    css: {
      padding: GUTTER
    },
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      position: 'relative',
      bg: 'gray',
      borderRadius: SIZE,
      height: SIZE + GUTTER * 2,
      width: SIZE * 2 + GUTTER * 2,
      mr: 2,
      'input:disabled ~ &': {
        opacity: 0.5,
        cursor: 'not-allowed'
      },
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50%',
        height: SIZE,
        width: SIZE,
        bg: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        transform: 'translateX(0%)',
        transition: `transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)`
      },
      'input:checked ~ &': {
        bg: 'primary',
        '> div': {
          transform: 'translateX(100%)'
        }
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("span", null, label));
});

const thumb = {
  appearance: 'none',
  width: 16,
  height: 16,
  bg: 'currentcolor',
  border: 0,
  borderRadius: 9999,
  variant: 'forms.slider.thumb'
};
const Slider = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Slider(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "range",
    variant: "slider"
  }, props, {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      height: 4,
      my: 2,
      cursor: 'pointer',
      appearance: 'none',
      borderRadius: 9999,
      color: 'inherit',
      bg: 'gray',
      ':focus': {
        outline: 'none',
        color: 'primary'
      },
      '&::-webkit-slider-thumb': thumb,
      '&::-moz-range-thumb': thumb,
      '&::-ms-thumb': thumb
    }
  }));
});

const Field = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Field({
  as: Control = Input,
  label,
  id,
  name,
  ...props
}, ref) {
  const fieldIdentifier = id || name;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, getMargin(props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Label, {
    htmlFor: fieldIdentifier
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Control, _extends({
    ref: ref,
    id: fieldIdentifier,
    name: name
  }, omitMargin(props))));
});

const Progress = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Progress(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "progress",
    variant: "styles.progress"
  }, props, {
    __css: {
      display: 'block',
      width: '100%',
      height: '4px',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      appearance: 'none',
      color: 'primary',
      bg: 'gray',
      borderRadius: 9999,
      border: 'none',
      '&::-webkit-progress-bar': {
        bg: 'transparent'
      },
      '&::-webkit-progress-value': {
        bg: 'currentcolor'
      },
      '&::-moz-progress-bar': {
        bg: 'currentcolor'
      }
    }
  }));
});

const Donut = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Donut({
  size = 128,
  strokeWidth = 2,
  value = 0,
  min = 0,
  max = 1,
  title,
  ...props
}, ref) {
  const r = 16 - strokeWidth;
  const C = 2 * r * Math.PI;
  const offset = C - (value - min) / (max - min) * C;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "svg",
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    strokeWidth: strokeWidth,
    fill: "none",
    stroke: "currentcolor",
    role: "img",
    "aria-valuenow": value,
    "aria-valuemin": min,
    "aria-valuemax": max
  }, props, {
    __css: {
      color: 'primary'
    }
  }), title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("title", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    opacity: 1 / 8
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    strokeDasharray: C,
    strokeDashoffset: offset,
    transform: "rotate(-90 16 16)"
  }));
});

const spin = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_6__.keyframes)({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
});
const Spinner = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Spinner({
  size = 48,
  strokeWidth = 4,
  max = 1,
  title = 'Loading...',
  duration = 500,
  ...props
}, ref) {
  const r = 16 - strokeWidth;
  const C = 2 * r * Math.PI;
  const offset = C - 1 / 4 * C;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "svg",
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    strokeWidth: strokeWidth,
    fill: "none",
    stroke: "currentcolor",
    role: "img"
  }, props, {
    __css: {
      color: 'primary',
      overflow: 'visible'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("title", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    opacity: 1 / 8
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    as: "circle",
    cx: 16,
    cy: 16,
    r: r,
    strokeDasharray: C,
    strokeDashoffset: offset,
    __css: {
      transformOrigin: '50% 50%',
      animationName: spin.toString(),
      animationTimingFunction: 'linear',
      animationDuration: duration + 'ms',
      animationIterationCount: 'infinite'
    }
  }));
});

const Avatar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Avatar({
  size = 48,
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Image, _extends({
    ref: ref,
    width: size,
    height: size,
    variant: "avatar"
  }, props, {
    __css: {
      borderRadius: 9999
    }
  }));
});

const Badge = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Badge(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "badges",
    __css: {
      display: 'inline-block',
      verticalAlign: 'baseline',
      fontSize: 0,
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      px: 1,
      borderRadius: 2,
      color: 'white',
      bg: 'primary'
    }
  }));
});

const IconButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function IconButton({
  size = 32,
  ...props
}, ref) {
  var _props$__css;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "button",
    variant: "icon"
  }, props, {
    __themeKey: "buttons",
    __css: {
      label: ((_props$__css = props.__css) == null ? void 0 : _props$__css.label) || 'IconButton',
      appearance: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      width: size,
      height: size,
      color: 'inherit',
      bg: 'transparent',
      border: 'none',
      borderRadius: 4
    }
  }));
});

const x = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "currentcolor",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}));
const Close = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Close({
  size = 32,
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(IconButton, _extends({
    ref: ref,
    size: size,
    title: "Close",
    "aria-label": "Close",
    variant: "close"
  }, props, {
    children: x
  }));
});

const Alert = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Alert(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "alerts",
    __css: {
      display: 'flex',
      alignItems: 'center',
      px: 3,
      py: 2,
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      borderRadius: 4
    }
  }));
});

const Divider = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Divider(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "hr",
    variant: "styles.hr"
  }, props, {
    __css: {
      color: 'gray',
      m: 0,
      my: 2,
      border: 0,
      borderBottom: '1px solid'
    }
  }));
});

const getContainerProps = getProps(__isBoxStyledSystemProp);
const getIframeProps = getProps(str => !__isBoxStyledSystemProp(str));
/** @typedef {import("../index").EmbedProps} EmbedProps */

/** @type {React.ForwardRefExoticComponent<EmbedProps>} */

const Embed = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Embed({
  variant,
  sx,
  ratio = 16 / 9,
  src,
  frameBorder = 0,
  allowFullScreen = true,
  width = 560,
  height = 315,
  allow,
  ...rest
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    variant: variant,
    sx: sx,
    __css: {
      width: '100%',
      height: 0,
      paddingBottom: 100 / ratio + '%',
      position: 'relative',
      overflow: 'hidden'
    }
  }, getContainerProps(rest)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    as: "iframe",
    src: src,
    width: width,
    height: height,
    frameBorder: frameBorder,
    allowFullScreen: allowFullScreen,
    allow: allow
  }, getIframeProps(rest), {
    __css: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      border: 0
    }
  })));
});

const AspectRatio = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function AspectRatio({
  ratio = 4 / 3,
  children,
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    ref: ref,
    sx: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
    sx: {
      width: '100%',
      height: 0,
      paddingBottom: 100 / ratio + '%'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({}, props, {
    __css: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }), children));
});

const AspectImage = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function AspectImage({
  ratio,
  ...props
}, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(AspectRatio, {
    ratio: ratio
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Image, _extends({
    ref: ref
  }, props, {
    __css: {
      objectFit: 'cover'
    }
  })));
});

const Container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Container(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref,
    variant: "container"
  }, props, {
    __themeKey: "layout",
    __css: {
      width: '100%',
      maxWidth: 'container',
      mx: 'auto'
    }
  }));
});

const NavLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function NavLink(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Link, _extends({
    ref: ref,
    variant: "nav"
  }, props, {
    __css: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-block',
      '&:hover, &:focus, &.active': {
        color: 'primary'
      }
    }
  }));
});

const Message = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function Message(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, _extends({
    ref: ref
  }, props, {
    __themeKey: "messages",
    __css: {
      padding: 3,
      paddingLeft: t => t.space[3] - t.space[1],
      borderLeftWidth: t => t.space[1],
      borderLeftStyle: 'solid',
      borderLeftColor: 'primary',
      borderRadius: 4,
      bg: 'highlight'
    }
  }));
});

const MenuIcon = ({
  size = 24
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Box, {
  as: "svg",
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  fill: "currentcolor",
  viewBox: "0 0 24 24",
  sx: {
    display: 'block',
    margin: 0
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}));
const MenuButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().forwardRef(function MenuButton(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(IconButton, _extends({
    ref: ref,
    title: "Menu",
    "aria-label": "Toggle Menu",
    variant: "menu"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(MenuIcon, null));
});




/***/ }),

/***/ "./node_modules/@theme-ui/core/dist/theme-ui-core.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@theme-ui/core/dist/theme-ui-core.esm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemeProvider": function() { return /* binding */ ThemeProvider; },
/* harmony export */   "__ThemeUIContext": function() { return /* binding */ __ThemeUIContext; },
/* harmony export */   "__ThemeUIInternalBaseThemeProvider": function() { return /* binding */ __ThemeUIInternalBaseThemeProvider; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "jsx": function() { return /* binding */ jsx; },
/* harmony export */   "merge": function() { return /* binding */ merge; },
/* harmony export */   "useThemeUI": function() { return /* binding */ useThemeUI; }
/* harmony export */ });
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_react_package_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react/package.json */ "./node_modules/@emotion/react/package.json");
/* harmony import */ var _theme_ui_parse_props__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theme-ui/parse-props */ "./node_modules/@theme-ui/parse-props/dist/theme-ui-parse-props.esm.js");






const __EMOTION_VERSION__ = _emotion_react_package_json__WEBPACK_IMPORTED_MODULE_2__.version;
const jsx = (type, props, ...children) => (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.jsx)(type, (0,_theme_ui_parse_props__WEBPACK_IMPORTED_MODULE_4__.default)(props), ...children);
/**
 * @internal for Babel JSX pragma
 * @see https://github.com/system-ui/theme-ui/issues/1603
 */

const createElement = jsx;

/**
 * @internal
 */
const __ThemeUIContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  __EMOTION_VERSION__,
  theme: {}
});
const useThemeUI = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(__ThemeUIContext);
const canUseSymbol = typeof Symbol === 'function' && Symbol.for;
const REACT_ELEMENT = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
const FORWARD_REF = canUseSymbol ? Symbol.for('react.forward_ref') : 0xeac7;
const deepmergeOptions = {
  isMergeableObject: n => {
    return !!n && typeof n === 'object' && n.$$typeof !== REACT_ELEMENT && n.$$typeof !== FORWARD_REF;
  },
  arrayMerge: (_leftArray, rightArray) => rightArray
};
/**
 * Deeply merge themes
 */

const merge = (a, b) => deepmerge__WEBPACK_IMPORTED_MODULE_1___default()(a, b, deepmergeOptions);

function mergeAll(...args) {
  return deepmerge__WEBPACK_IMPORTED_MODULE_1___default().all(args, deepmergeOptions);
}

merge.all = mergeAll;

/**
 * @internal
 */
const __ThemeUIInternalBaseThemeProvider = ({
  context,
  children
}) => jsx(_emotion_react__WEBPACK_IMPORTED_MODULE_3__.ThemeContext.Provider, {
  value: context.theme
}, jsx(__ThemeUIContext.Provider, {
  value: context,
  children
}));
function ThemeProvider({
  theme,
  children
}) {
  const outer = useThemeUI();

  if (true) {
    if (outer.__EMOTION_VERSION__ !== __EMOTION_VERSION__) {
      console.warn('Multiple versions of Emotion detected,', 'and theming might not work as expected.', 'Please ensure there is only one copy of @emotion/react installed in your application.');
    }
  }

  const context = typeof theme === 'function' ? { ...outer,
    theme: theme(outer.theme)
  } : merge.all({}, outer, {
    theme
  });
  return jsx(__ThemeUIInternalBaseThemeProvider, {
    context
  }, children);
}




/***/ }),

/***/ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "THEME_UI_DEFAULT_KEY": function() { return /* binding */ THEME_UI_DEFAULT_KEY; },
/* harmony export */   "css": function() { return /* binding */ css; },
/* harmony export */   "defaultBreakpoints": function() { return /* binding */ defaultBreakpoints; },
/* harmony export */   "get": function() { return /* binding */ get; },
/* harmony export */   "getObjectWithVariants": function() { return /* binding */ getObjectWithVariants; },
/* harmony export */   "multiples": function() { return /* binding */ multiples; },
/* harmony export */   "scales": function() { return /* binding */ scales; }
/* harmony export */ });
/**
 * Allows for nested scales with shorthand values
 * @example
 * {
 *   colors: {
 *     primary: { __default: '#00f', light: '#33f' }
 *   }
 * }
 * css({ color: 'primary' }); // { color: '#00f' }
 * css({ color: 'primary.light' }) // { color: '#33f' }
 */

const THEME_UI_DEFAULT_KEY = '__default';

const hasDefault = x => {
  return typeof x === 'object' && x !== null && THEME_UI_DEFAULT_KEY in x;
};
/**
 * Extracts value under path from a deeply nested object.
 * Used for Themes, variants and Theme UI style objects.
 * Given a path to object with `__default` key, returns the value under that key.
 *
 * @param obj a theme, variant or style object
 * @param path path separated with dots (`.`)
 * @param fallback default value returned if get(obj, path) is not found
 */


function get(obj, path, fallback, p, undef) {
  const pathArray = path && typeof path === 'string' ? path.split('.') : [path];

  for (p = 0; p < pathArray.length; p++) {
    obj = obj ? obj[pathArray[p]] : undef;
  }

  if (obj === undef) return fallback;
  return hasDefault(obj) ? obj[THEME_UI_DEFAULT_KEY] : obj;
}
const getObjectWithVariants = (obj, theme) => {
  if (obj && obj['variant']) {
    let result = {};

    for (const key in obj) {
      const x = obj[key];

      if (key === 'variant') {
        const val = typeof x === 'function' ? x(theme) : x;
        const variant = getObjectWithVariants(get(theme, val), theme);
        result = { ...result,
          ...variant
        };
      } else {
        result[key] = x;
      }
    }

    return result;
  }

  return obj;
};
const defaultBreakpoints = [40, 52, 64].map(n => n + 'em');
const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
const aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY'
};
const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  scrollMarginX: ['scrollMarginLeft', 'scrollMarginRight'],
  scrollMarginY: ['scrollMarginTop', 'scrollMarginBottom'],
  scrollPaddingX: ['scrollPaddingLeft', 'scrollPaddingRight'],
  scrollPaddingY: ['scrollPaddingTop', 'scrollPaddingBottom'],
  size: ['width', 'height']
};
const scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  caretColor: 'colors',
  columnRuleColor: 'colors',
  textDecorationColor: 'colors',
  opacity: 'opacities',
  transition: 'transitions',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  scrollMargin: 'space',
  scrollMarginTop: 'space',
  scrollMarginRight: 'space',
  scrollMarginBottom: 'space',
  scrollMarginLeft: 'space',
  scrollMarginX: 'space',
  scrollMarginY: 'space',
  scrollPadding: 'space',
  scrollPaddingTop: 'space',
  scrollPaddingRight: 'space',
  scrollPaddingBottom: 'space',
  scrollPaddingLeft: 'space',
  scrollPaddingX: 'space',
  scrollPaddingY: 'space',
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  borderBlock: 'borders',
  borderBlockColor: 'colors',
  borderBlockEnd: 'borders',
  borderBlockEndColor: 'colors',
  borderBlockEndStyle: 'borderStyles',
  borderBlockEndWidth: 'borderWidths',
  borderBlockStart: 'borders',
  borderBlockStartColor: 'colors',
  borderBlockStartStyle: 'borderStyles',
  borderBlockStartWidth: 'borderWidths',
  borderBlockStyle: 'borderStyles',
  borderBlockWidth: 'borderWidths',
  borderEndEndRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderInline: 'borders',
  borderInlineColor: 'colors',
  borderInlineEnd: 'borders',
  borderInlineEndColor: 'colors',
  borderInlineEndStyle: 'borderStyles',
  borderInlineEndWidth: 'borderWidths',
  borderInlineStart: 'borders',
  borderInlineStartColor: 'colors',
  borderInlineStartStyle: 'borderStyles',
  borderInlineStartWidth: 'borderWidths',
  borderInlineStyle: 'borderStyles',
  borderInlineWidth: 'borderWidths',
  borderStartEndRadius: 'radii',
  borderStartStartRadius: 'radii',
  columnRuleWidth: 'borderWidths',
  outlineColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  blockSize: 'sizes',
  inlineSize: 'sizes',
  maxBlockSize: 'sizes',
  maxInlineSize: 'sizes',
  minBlockSize: 'sizes',
  minInlineSize: 'sizes',
  columnWidth: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors'
};

const positiveOrNegative = (scale, value) => {
  if (typeof value !== 'number' || value >= 0) {
    if (typeof value === 'string' && value.startsWith('-')) {
      const valueWithoutMinus = value.substring(1);
      const n = get(scale, valueWithoutMinus, valueWithoutMinus);

      if (typeof n === 'number') {
        return n * -1;
      }

      return `-${n}`;
    }

    return get(scale, value, value);
  }

  const absolute = Math.abs(value);
  const n = get(scale, absolute, absolute);
  if (typeof n === 'string') return '-' + n;
  return Number(n) * -1;
};

const transforms = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'marginBlock', 'marginBlockEnd', 'marginBlockStart', 'marginInline', 'marginInlineEnd', 'marginInlineStart', 'top', 'bottom', 'left', 'right'].reduce((acc, curr) => ({ ...acc,
  [curr]: positiveOrNegative
}), {});

const responsive = styles => theme => {
  const next = {};
  const breakpoints = theme && theme.breakpoints || defaultBreakpoints;
  const mediaQueries = [null, ...breakpoints.map(n => n.includes('@media') ? n : `@media screen and (min-width: ${n})`)];

  for (const k in styles) {
    const key = k;
    let value = styles[key];

    if (typeof value === 'function') {
      value = value(theme || {});
    }

    if (value === false || value == null) {
      continue;
    }

    if (!Array.isArray(value)) {
      next[key] = value;
      continue;
    }

    for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
      const media = mediaQueries[i];

      if (!media) {
        next[key] = value[i];
        continue;
      }

      next[media] = next[media] || {};
      if (value[i] == null) continue;
      next[media][key] = value[i];
    }
  }

  return next;
};

const css = (args = {}) => (props = {}) => {
  const theme = { ...defaultTheme,
    ...('theme' in props ? props.theme : props)
  }; // insert variant props before responsive styles, so they can be merged
  // we need to maintain order of the style props, so if a variant is place in the middle
  // of other props, it will extends its props at that same location order.

  const obj = getObjectWithVariants(typeof args === 'function' ? args(theme) : args, theme);
  const styles = responsive(obj)(theme);
  let result = {};

  for (const key in styles) {
    const x = styles[key];
    const val = typeof x === 'function' ? x(theme) : x;

    if (val && typeof val === 'object') {
      if (hasDefault(val)) {
        result[key] = val[THEME_UI_DEFAULT_KEY];
        continue;
      } // On type level, val can also be an array here,
      // but we transform all arrays in `responsive` function.


      result[key] = css(val)(theme);
      continue;
    }

    const prop = key in aliases ? aliases[key] : key;
    const scaleName = prop in scales ? scales[prop] : undefined;
    const scale = scaleName ? theme == null ? void 0 : theme[scaleName] : get(theme, prop, {});
    const transform = get(transforms, prop, get);
    const value = transform(scale, val, val);

    if (prop in multiples) {
      const dirs = multiples[prop];

      for (let i = 0; i < dirs.length; i++) {
        result[dirs[i]] = value;
      }
    } else {
      result[prop] = value;
    }
  }

  return result;
};




/***/ }),

/***/ "./node_modules/@theme-ui/mdx/dist/theme-ui-mdx.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@theme-ui/mdx/dist/theme-ui-mdx.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MDXProvider": function() { return /* binding */ MDXProvider; },
/* harmony export */   "Styled": function() { return /* binding */ Styled; },
/* harmony export */   "Themed": function() { return /* binding */ Themed; },
/* harmony export */   "components": function() { return /* binding */ components; },
/* harmony export */   "themed": function() { return /* binding */ themed; }
/* harmony export */ });
/* harmony import */ var _theme_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theme-ui/core */ "./node_modules/@theme-ui/core/dist/theme-ui-core.esm.js");
/* harmony import */ var _theme_ui_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @theme-ui/css */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mdx-js/react */ "./node_modules/@mdx-js/react/dist/esm.js");






// mdx components
const tags = ['p', 'b', 'i', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'pre', 'code', 'ol', 'ul', 'li', 'blockquote', 'hr', 'em', 'table', 'tr', 'th', 'td', 'em', 'strong', 'del', // mdx
'inlineCode', 'thematicBreak', // other
'div', // theme-ui
'root'];
const aliases = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  root: 'div'
};

const isAlias = x => x in aliases;

const alias = n => isAlias(n) ? aliases[n] : n;

const propOverrides = {
  th: {
    align: 'textAlign'
  },
  td: {
    align: 'textAlign'
  }
};
const themed = key => ({
  theme,
  ...rest
}) => {
  const propsStyle = propOverrides[key];
  const extraStyles = propsStyle ? Object.keys(rest).filter(prop => propsStyle[prop] !== undefined).reduce((acc, prop) => ({ ...acc,
    [propsStyle[prop]]: rest[prop]
  }), {}) : undefined;
  return (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_3__.css)({ ...(0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_3__.get)(theme, `styles.${key}`),
    ...extraStyles
  })(theme);
}; // opt out of typechecking whenever `as` prop is used

const Themed = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__.default)('div')(themed('div'));
/**
 * @deprecated since 0.6.0.
 *
 * `Styled` was renamed to `Themed` to avoid confusion with styled components.
 */

const Styled = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__.default)('div')(themed('div'));

const warnStyled = tag => props => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (true) {
      console.warn('[theme-ui] The Styled component from "@theme-ui/mdx" is deprecated and will be removed in a future version. It has been renamed to Themed with the same API.');
    }
  }, []);
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(alias(tag), props);
};

const components = {};
tags.forEach(tag => {
  // fixme?
  components[tag] = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__.default)(alias(tag))(themed(tag));
  Themed[tag] = components[tag];
  Styled[tag] = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__.default)(warnStyled(tag))(themed(tag));
});

const createComponents = comps => {
  const next = { ...components
  };
  const componentKeys = Object.keys(comps);
  componentKeys.forEach(key => {
    next[key] = (0,_emotion_styled__WEBPACK_IMPORTED_MODULE_1__.default)(comps[key])(themed(key));
  });
  return next;
};

const MDXProvider = ({
  components,
  children
}) => {
  const outer = (0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__.useMDXComponents)();
  return (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mdx_js_react__WEBPACK_IMPORTED_MODULE_2__.MDXProvider, {
    components: createComponents({ ...outer,
      ...components
    }),
    children
  });
};




/***/ }),

/***/ "./node_modules/@theme-ui/parse-props/dist/theme-ui-parse-props.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theme-ui/parse-props/dist/theme-ui-parse-props.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _theme_ui_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/css */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");


const getCSS = props => theme => {
  const styles = (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_0__.css)(props.sx)(theme);
  const raw = typeof props.css === 'function' ? props.css(theme) : props.css;
  return [styles, raw];
};

const parseProps = props => {
  if (!props || !props.sx && !props.css) return props;
  const next = {};

  for (let key in props) {
    if (key === 'sx') continue;
    next[key] = props[key];
  }

  next.css = getCSS(props);
  return next;
};

/* harmony default export */ __webpack_exports__["default"] = (parseProps);


/***/ }),

/***/ "./node_modules/@theme-ui/preset-base/dist/theme-ui-preset-base.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-base/dist/theme-ui-preset-base.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "base": function() { return /* binding */ base; }
/* harmony export */ });
const heading = {
  color: 'text',
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading'
};
const base = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#30c',
    muted: '#f6f6f6'
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: { ...heading,
      fontSize: 5
    },
    h2: { ...heading,
      fontSize: 4
    },
    h3: { ...heading,
      fontSize: 3
    },
    h4: { ...heading,
      fontSize: 2
    },
    h5: { ...heading,
      fontSize: 1
    },
    h6: { ...heading,
      fontSize: 0
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (base);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-bootstrap/dist/theme-ui-preset-bootstrap.esm.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-bootstrap/dist/theme-ui-preset-bootstrap.esm.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseColors": function() { return /* binding */ baseColors; },
/* harmony export */   "bootstrap": function() { return /* binding */ bootstrap; },
/* harmony export */   "breakpoints": function() { return /* binding */ breakpoints; },
/* harmony export */   "colors": function() { return /* binding */ colors; },
/* harmony export */   "fontSizes": function() { return /* binding */ fontSizes; },
/* harmony export */   "fontWeights": function() { return /* binding */ fontWeights; },
/* harmony export */   "fonts": function() { return /* binding */ fonts; },
/* harmony export */   "lineHeights": function() { return /* binding */ lineHeights; },
/* harmony export */   "radii": function() { return /* binding */ radii; },
/* harmony export */   "shadows": function() { return /* binding */ shadows; },
/* harmony export */   "sizes": function() { return /* binding */ sizes; },
/* harmony export */   "space": function() { return /* binding */ space; },
/* harmony export */   "styles": function() { return /* binding */ styles; }
/* harmony export */ });
const baseColors = {
  white: '#fff',
  black: '#000',
  gray: ['#fff', // 0 index
  '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529'],
  blue: '#007bff',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8' // gray: gray[6],

};
const colors = { ...baseColors,
  grayDark: baseColors.gray[8],
  text: baseColors.gray[9],
  background: baseColors.white,
  primary: baseColors.blue,
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  success: baseColors.green,
  info: baseColors.cyan,
  warning: baseColors.yellow,
  danger: baseColors.red,
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  textMuted: baseColors.gray[6]
};
const space = [0, 0.25, 0.5, 1, 1.5, 3].map(n => n + 'rem');
const breakpoints = ['576px', '768px', '992px', '1200px'];
const fonts = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  heading: 'inherit',
  monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  // NOTE(@mxstbr): TypeScript does not let us do the self-references below if we don't provide "default" values
  sans: ''
};
fonts.sans = fonts.body;
const fontWeights = {
  body: 400,
  heading: 500,
  bold: 700,
  light: 300,
  // NOTE(@mxstbr): TypeScript does not let us do the self-references below if we don't provide "default" values
  normal: 0,
  display: 0
};
fontWeights.normal = fontWeights.body;
fontWeights.display = fontWeights.light;
const fontSizes = ['0.75rem', // '80%',
'0.875rem', '1rem', '1.25rem', '1.5rem', '1.75rem', '2rem', '2.5rem', '3.5rem', '4.5rem', '5.5rem', '6rem'];
fontSizes.lead = fontSizes[3];
const lineHeights = {
  body: 1.5,
  heading: 1.2
};
const sizes = {
  // container widths
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140
};
const radii = {
  default: '0.25rem',
  sm: '0.2rem',
  lg: '0.3rem',
  pill: '50rem'
};
const shadows = {
  default: '0 .5rem 1rem rgba(0, 0, 0, .15)',
  sm: '0 .125rem .25rem rgba(0, 0, 0, .075)',
  lg: '0 1rem 3rem rgba(0, 0, 0, .175)'
};
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  mt: 0,
  mb: 2
};
const display = {
  fontWeight: 'display',
  lineHeight: 'heading'
}; // variants

const typeStyles = {
  heading,
  display
};
const styles = {
  root: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body'
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  p: {
    mb: 3,
    lineHeight: 'body'
  },
  h1: { ...heading,
    fontSize: 7
  },
  h2: { ...heading,
    fontSize: 6
  },
  h3: { ...heading,
    fontSize: 5
  },
  h4: { ...heading,
    fontSize: 4
  },
  h5: { ...heading,
    fontSize: 3
  },
  h6: { ...heading,
    fontSize: 2
  },
  blockquote: {
    fontSize: 3,
    mb: 3
  },
  table: {
    // todo
    width: '100%',
    marginBottom: 3,
    color: 'gray.9',
    borderCollapse: 'collapse'
  },
  th: {
    verticalAlign: 'bottom',
    borderTopWidth: 2,
    borderTopStyle: 'solid',
    borderTopColor: 'gray.3',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: 'gray.3',
    padding: '.75rem',
    textAlign: 'inherit'
  },
  td: {
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: 'gray.3',
    verticalAlign: 'top',
    padding: '.75rem'
  },
  inlineCode: {
    color: 'pink'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
};
const bootstrap = {
  breakpoints,
  colors,
  space,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  sizes,
  shadows,
  radii,
  typeStyles,
  styles
};

/* harmony default export */ __webpack_exports__["default"] = (bootstrap);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-bulma/dist/theme-ui-preset-bulma.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-bulma/dist/theme-ui-preset-bulma.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseColors": function() { return /* binding */ baseColors; },
/* harmony export */   "bulma": function() { return /* binding */ bulma; },
/* harmony export */   "colors": function() { return /* binding */ colors; },
/* harmony export */   "fontSizes": function() { return /* binding */ fontSizes; },
/* harmony export */   "fontWeights": function() { return /* binding */ fontWeights; },
/* harmony export */   "fonts": function() { return /* binding */ fonts; },
/* harmony export */   "lineHeights": function() { return /* binding */ lineHeights; },
/* harmony export */   "space": function() { return /* binding */ space; },
/* harmony export */   "styles": function() { return /* binding */ styles; }
/* harmony export */ });
// Based on https://github.com/jgthms/bulma/blob/master/sass/utilities/initial-variables.sass
// https://github.com/jgthms/bulma/blob/master/sass/base/minireset.sass
// https://github.com/jgthms/bulma/blob/master/sass/base/generic.sass
const baseColors = {
  black: 'hsl(0, 0%, 4%)',
  blackBis: 'hsl(0, 0%, 7%)',
  blackTer: 'hsl(0, 0%, 14%)',
  // (sic)
  greyDarker: 'hsl(0, 0%, 21%)',
  greyDark: 'hsl(0, 0%, 29%)',
  grey: 'hsl(0, 0%, 48%)',
  greyLight: 'hsl(0, 0%, 71%)',
  greyLighter: 'hsl(0, 0%, 86%)',
  whiteTer: 'hsl(0, 0%, 96%)',
  whiteBis: 'hsl(0, 0%, 98%)',
  white: 'hsl(0, 0%, 100%)',
  orange: 'hsl(14,  100%, 53%)',
  yellow: 'hsl(48,  100%, 67%)',
  green: 'hsl(141, 71%,  48%)',
  turquoise: 'hsl(171, 100%, 41%)',
  cyan: 'hsl(204, 86%,  53%)',
  blue: 'hsl(217, 71%,  53%)',
  purple: 'hsl(271, 100%, 71%)',
  red: 'hsl(348, 100%, 61%)'
};
const colors = { ...baseColors,
  text: baseColors.greyDark,
  background: baseColors.white,
  primary: baseColors.blue,
  muted: baseColors.whiteTer,
  // bulma-specific
  info: baseColors.cyan,
  success: baseColors.green,
  warning: baseColors.yellow,
  danger: baseColors.red,
  light: baseColors.whiteTer,
  dark: baseColors.greyDarker,
  modes: {
    invert: {}
  }
};
const fonts = {
  body: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  heading: 'inherit',
  monospace: 'monospace'
};
const fontSizes = ['0.75rem', '0.875rem', // tweener
'1rem', '1.25rem', '1.5rem', '1.75rem', '2rem', '2.5rem', '3rem'];
const fontWeights = {
  body: 400,
  heading: 700,
  bold: 700,
  light: 300,
  medium: 500,
  semibold: 500
};
const lineHeights = {
  body: 1.5,
  heading: 1.125
}; // guesstimate

const space = [0, 0.5, 1, 1.5, 2, 2.5, 3].map(n => n + 'rem');
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  m: 0,
  mb: 1
}; // needs works

const styles = {
  root: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body'
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  h1: { ...heading,
    fontSize: 6,
    mt: 2
  },
  h2: { ...heading,
    fontSize: 5,
    mt: 2
  },
  h3: { ...heading,
    fontSize: 4,
    mt: 3
  },
  h4: { ...heading,
    fontSize: 3
  },
  h5: { ...heading,
    fontSize: 2
  },
  h6: { ...heading,
    fontSize: 1,
    mb: 2
  },
  code: {},
  pre: {},
  hr: {
    bg: 'muted',
    border: 0,
    height: '1px',
    m: 3
  }
};
const bulma = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  space,
  styles
};

/* harmony default export */ __webpack_exports__["default"] = (bulma);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-dark/dist/theme-ui-preset-dark.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-dark/dist/theme-ui-preset-dark.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dark": function() { return /* binding */ dark; }
/* harmony export */ });
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading'
};
const dark = {
  colors: {
    text: '#fff',
    background: '#060606',
    primary: '#3cf',
    secondary: '#e0f',
    muted: '#191919',
    highlight: '#29112c',
    gray: '#999',
    purple: '#c0f'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  textStyles: {
    heading,
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6],
      fontWeight: 'display',
      letterSpacing: '-0.03em',
      mt: 3
    }
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      variant: 'textStyles.display'
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary'
      }
    },
    pre: {
      variant: 'prism',
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      color: 'secondary',
      fontSize: 1
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted'
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px'
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px'
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted'
    },
    img: {
      maxWidth: '100%'
    }
  },
  prism: {
    '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
      color: 'gray'
    },
    '.comment': {
      fontStyle: 'italic'
    },
    '.property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable': {
      color: 'purple'
    },
    '.atrule,.attr-value,.keyword': {
      color: 'primary'
    },
    '.selector,.attr-name,.string,.char,.builtin,.inserted': {
      color: 'secondary'
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (dark);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-deep/dist/theme-ui-preset-deep.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-deep/dist/theme-ui-preset-deep.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deep": function() { return /* binding */ deep; }
/* harmony export */ });
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading'
};
const deep = {
  colors: {
    text: 'hsl(210, 50%, 96%)',
    background: 'hsl(230, 25%, 18%)',
    primary: 'hsl(260, 100%, 80%)',
    secondary: 'hsl(290, 100%, 80%)',
    highlight: 'hsl(260, 20%, 40%)',
    purple: 'hsl(290, 100%, 80%)',
    muted: 'hsla(230, 20%, 0%, 20%)',
    gray: 'hsl(210, 50%, 60%)'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  textStyles: {
    heading,
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6],
      fontWeight: 'display',
      letterSpacing: '-0.03em',
      mt: 3
    }
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      variant: 'textStyles.display'
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary'
      }
    },
    pre: {
      variant: 'prism',
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      color: 'secondary',
      fontSize: 1
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted'
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px'
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px'
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted'
    },
    img: {
      maxWidth: '100%'
    }
  },
  prism: {
    '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
      color: 'gray'
    },
    '.comment': {
      fontStyle: 'italic'
    },
    '.property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable': {
      color: 'purple'
    },
    '.atrule,.attr-value,.keyword': {
      color: 'primary'
    },
    '.selector,.attr-name,.string,.char,.builtin,.inserted': {
      color: 'secondary'
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (deep);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-funk/dist/theme-ui-preset-funk.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-funk/dist/theme-ui-preset-funk.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "funk": function() { return /* binding */ funk; }
/* harmony export */ });
/* harmony import */ var _theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/preset-base */ "./node_modules/@theme-ui/preset-base/dist/theme-ui-preset-base.esm.js");


const funk = { ..._theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__.default,
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
    monospace: 'Menlo, monospace'
  },
  lineHeights: {
    body: 1.625,
    heading: 1.25
  },
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700
  },
  colors: { ..._theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__.default.colors,
    primary: '#609',
    secondary: '#306'
  },
  styles: { ..._theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__.default.styles
  }
};

/* harmony default export */ __webpack_exports__["default"] = (funk);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-future/dist/theme-ui-preset-future.esm.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-future/dist/theme-ui-preset-future.esm.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "future": function() { return /* binding */ future; }
/* harmony export */ });
/* harmony import */ var _theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/preset-base */ "./node_modules/@theme-ui/preset-base/dist/theme-ui-preset-base.esm.js");


const future = { ..._theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__.default,
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#11e',
    secondary: '#c0c',
    highlight: '#e0e',
    muted: '#f6f6ff',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0fc',
        secondary: '#0cf',
        highlight: '#f0c',
        muted: '#011'
      }
    }
  },
  fonts: {
    body: '"Avenir Next", system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700
  },
  lineHeights: {
    body: 1.75,
    heading: 1.25
  }
};

/* harmony default export */ __webpack_exports__["default"] = (future);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-polaris/dist/theme-ui-preset-polaris.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-polaris/dist/theme-ui-preset-polaris.esm.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "polaris": function() { return /* binding */ polaris; }
/* harmony export */ });
/* harmony import */ var _theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/preset-base */ "./node_modules/@theme-ui/preset-base/dist/theme-ui-preset-base.esm.js");


const text = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';
const polaris = { ..._theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__.default,
  colors: {
    text: '#454f5b',
    background: '#fff',
    primary: '#5c6ac4',
    secondary: '#006fbb',
    highlight: '#47c1bf',
    muted: '#e6e6e6',
    gray: '#dfe3e8',
    accent: '#f49342',
    darken: '#00044c',
    modes: {
      dark: {
        text: '#3e4155',
        background: '#000639',
        primary: '#9c6ade',
        secondary: '#b4e1fa',
        highlight: '#b7ecec',
        muted: '#e6e6e6'
      }
    }
  },
  fonts: {
    body: text,
    heading: text,
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700
  },
  lineHeights: {
    body: 1.75,
    heading: 1.25
  }
};

/* harmony default export */ __webpack_exports__["default"] = (polaris);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-roboto/dist/theme-ui-preset-roboto.esm.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-roboto/dist/theme-ui-preset-roboto.esm.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "roboto": function() { return /* binding */ roboto; }
/* harmony export */ });
/* harmony import */ var _theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/preset-base */ "./node_modules/@theme-ui/preset-base/dist/theme-ui-preset-base.esm.js");


const roboto = { ..._theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__.default,
  colors: {
    text: '#202124',
    background: '#fff',
    primary: '#1a73e8',
    secondary: '#9c27b0',
    muted: '#f1f3f4'
  },
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    monospace: '"Roboto Mono", monospace'
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 600
  }
};

/* harmony default export */ __webpack_exports__["default"] = (roboto);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-sketchy/dist/theme-ui-preset-sketchy.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-sketchy/dist/theme-ui-preset-sketchy.esm.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const defaultBorderStyles = {
  border: 'thick',
  color: 'text',
  borderRadius: 'sketchy0'
};
const buttonStyles = { ...defaultBorderStyles,
  transition: 'all 250ms ease',
  bg: 'muted',
  boxShadow: 'default',
  fontFamily: 'inherit',
  '&:hover': {
    boxShadow: 'hover'
  }
};
const formStyles = {
  borderRadius: 'sketchy3',
  borderColor: 'text',
  fontFamily: 'inherit',
  '&:focus': {
    boxShadow: 'outline',
    outline: 'none'
  }
};
const theme = {
  colors: {
    text: '#000200',
    background: '#FAFAF9',
    muted: 'rgba(0,0,0,.1)',
    primary: '#F25F5C',
    primaryDark: '#B51916',
    primaryLight: '#FCBAB1',
    blue: '#B6DEE2',
    blueDark: '#247BA0',
    greenDark: '#2D5948',
    green: '#B2E4DC',
    yellowDark: '#FFDA3A',
    yellow: '#FCF5C7'
  },
  fonts: {
    body: '"Architects Daughter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  sizes: {
    container: 800
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  radii: {
    sketchy0: '225px 25px 225px / 25px 225px',
    sketchy1: '15px 255px 15px / 225px 15px',
    sketchy2: '10px 125px 20px / 205px 25px',
    sketchy3: '225px 15px 15px / 15px 225px',
    sketchy4: '80px 15px 105px / 25px 250px',
    circle: '200px 185px 160px / 195px 160px'
  },
  borders: {
    thick: '2px solid var(--theme-ui-colors-text, black)',
    thin: '1px solid var(--theme-ui-colors-text, black)'
  },
  shadows: {
    outline: '0 0 0px 1px black rgba(0,0,0,.4)',
    default: '15px 24px 25px -18px rgba(0,0,0,.4)',
    hover: '2px 8px 10px -6px rgba(0,0,0,.4)'
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'primaryDark'
      }
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto'
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'blueDark'
    },
    table: {
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      border: 'thick',
      borderRadius: 'sketchy3',
      borderBottomWidth: '1px',
      p: 2
    },
    td: {
      border: 'thick',
      borderRadius: 'sketchy1',
      p: 2
    },
    hr: {
      border: 0,
      borderBottom: 'thin'
    },
    img: {
      maxWidth: '100%'
    }
  },
  buttons: {
    primary: buttonStyles,
    danger: { ...buttonStyles,
      borderColor: 'primary',
      backgroundColor: 'primaryLight'
    },
    info: { ...buttonStyles,
      borderColor: 'blueDark',
      backgroundColor: 'blue'
    },
    warning: { ...buttonStyles,
      borderColor: 'yellowDark',
      backgroundColor: 'yellow'
    },
    success: { ...buttonStyles,
      borderColor: 'greenDark',
      backgroundColor: 'green'
    }
  },
  cards: {
    primary: {
      color: 'text',
      borderRadius: 'sketchy1',
      boxShadow: 'default',
      border: 'thick',
      fontFamily: 'inherit'
    }
  },
  forms: {
    input: formStyles,
    select: formStyles,
    textarea: formStyles,
    slider: {
      bg: 'muted'
    },
    radio: {
      bg: 'transparent',
      border: 'thin',
      borderRadius: 'circle',
      ...{
        'input:focus ~ &': {
          bg: 'transparent',
          border: 'thick'
        },
        '> path': {
          fill: 'none',
          d: ''
        },
        'input:checked ~ &': {
          '> path': {
            fill: 'text',
            d: 'path("M 10.652237623048844 7.578611366838201 C 11.6115227800823 7.22981180626388, 13.889540717124019 6.621252514969635, 15.006068983724713 7.026960398489625 C 16.122597250325406 7.432668282009615, 17.24515580522389 8.872089685429708, 17.35140722265301 10.01285866795814 C 17.457658640082126 11.153627650486571, 16.03912316416566 12.76488553177375, 15.643577488299421 13.871574293660212 C 15.248031812433185 14.978263055546673, 15.70404673710284 15.989337062262969, 14.978133167455589 16.65299123927691 C 14.252219597808338 17.316645416290854, 12.610153195677707 17.94949960782212, 11.288096070415921 17.85349935574386 C 9.966038945154136 17.7574991036656, 7.781697843868845 17.274206036451343, 7.045790415884869 16.07698972680735 C 6.309882987900893 14.879773417163358, 6.667167006900895 11.870389393142492, 6.8726515025120625 10.670201497879903 C 7.07813599812323 9.470013602617314, 7.509354351285175 9.623932126594248, 8.278697389551876 8.87586235523182 C 9.048040427818577 8.127792583869393, 10.800397347992876 6.511149736417917, 11.488709732112266 6.181782869705334 C 12.177022116231656 5.85241600299275, 12.362948941900267 6.800560104746367, 12.408571694268218 6.899661154956319 M 13.086326549703468 6.334372159562634 C 14.045726949181018 6.585576587705861, 14.02815772607352 8.130937315240134, 14.793913170925268 8.926035996194482 C 15.559668615777017 9.72113467714883, 17.46622859426858 9.94150723842843, 17.680859218813964 11.104964245288727 C 17.89548984335935 12.268421252149023, 16.762624629428604 14.78314657395292, 16.081696918197572 15.906778037356261 C 15.400769206966542 17.030409500759603, 14.496037988376179 17.905210314899808, 13.59529295142778 17.846753025708782 C 12.694547914479381 17.788295736517757, 11.830922537359877 15.961407961261365, 10.677226696507184 15.556034302210117 C 9.52353085565449 15.150660643158869, 7.46854225335996 16.452930254273024, 6.673117906311619 15.414511071401293 C 5.877693559263278 14.376091888529562, 5.510665357146541 10.851337607072976, 5.904680614217136 9.325519204979734 C 6.29869587128773 7.799700802886492, 8.005394513273384 6.6233206129496365, 9.037209448735185 6.2596006588418405 C 10.069024384196986 5.8958807047340445, 11.66025806903873 7.303422381948635, 12.095570226987942 7.143199480332959 C 12.530882384937154 6.982976578717284, 11.801551634336983 5.127314121350047, 11.649082396430458 5.298263249147787")'
          }
        }
      }
    },
    checkbox: {
      color: 'text',
      borderRadius: 'sketchy1',
      border: 'thin',
      ...{
        '> path': {
          d: "path('')"
        },
        'input:checked ~ &': {
          '> path': {
            fill: 'text',
            strokeWidth: 1,
            d: 'path("M 4.919908 9.946009 C 6.78687 12.35396, 11.267954 19.167892, 11.244466681494456 17.627486 M 4.769042 9.779518 C 8.798076303434634 11.73868628417444, 10.99146627954846 17.425105, 10.675698 20.863192 M 9.268309 20.523752 C 20.141903 2.909804, 34.051755 -1.122666, 30.36023 -3.770398 M 9.805838 17.521756 C 20.949272 9.844316, 22.870222 0.34781, 29.66209 -4.694285")'
          }
        },
        'input:focus ~ &': {
          background: 'transparent',
          border: 'thick',
          '> path': {
            strokeWidth: 2
          }
        }
      }
    }
  },
  links: {
    nav: {
      borderRadius: 'sketchy1',
      textDecoration: 'none',
      px: 2,
      py: 1,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      '&:hover': {
        bg: 'primaryLight'
      }
    }
  },
  badges: {
    primary: {
      borderRadius: 'sketchy1',
      color: 'background',
      bg: 'primary'
    },
    outline: {
      borderRadius: 'sketchy1',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px'
    }
  },
  alerts: {
    danger: { ...defaultBorderStyles,
      borderColor: 'primary',
      backgroundColor: 'primaryLight'
    },
    info: { ...defaultBorderStyles,
      borderColor: 'blueDark',
      backgroundColor: 'blue'
    },
    warning: { ...defaultBorderStyles,
      borderColor: 'yellowDark',
      backgroundColor: 'yellow'
    },
    success: { ...defaultBorderStyles,
      borderColor: 'greenDark',
      backgroundColor: 'green'
    }
  },
  messages: {
    danger: { ...defaultBorderStyles,
      borderColor: 'primary',
      backgroundColor: 'primaryLight'
    },
    info: { ...defaultBorderStyles,
      borderColor: 'blueDark',
      backgroundColor: 'blue'
    },
    warning: { ...defaultBorderStyles,
      borderColor: 'yellowDark',
      backgroundColor: 'yellow'
    },
    success: { ...defaultBorderStyles,
      borderColor: 'greenDark',
      backgroundColor: 'green'
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (theme);


/***/ }),

/***/ "./node_modules/@theme-ui/preset-swiss/dist/theme-ui-preset-swiss.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-swiss/dist/theme-ui-preset-swiss.esm.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "swiss": function() { return /* binding */ swiss; }
/* harmony export */ });
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading'
};
const swiss = {
  colors: {
    text: 'hsl(10, 20%, 20%)',
    background: 'hsl(10, 10%, 98%)',
    primary: 'hsl(10, 80%, 50%)',
    secondary: 'hsl(10, 60%, 50%)',
    highlight: 'hsl(10, 40%, 90%)',
    purple: 'hsl(250, 60%, 30%)',
    muted: 'hsl(10, 20%, 94%)',
    gray: 'hsl(10, 20%, 50%)'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  textStyles: {
    heading,
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6],
      fontWeight: 'display',
      letterSpacing: '-0.03em',
      mt: 3
    }
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      variant: 'textStyles.display'
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary'
      }
    },
    pre: {
      variant: 'prism',
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      color: 'secondary',
      fontSize: 1
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted'
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px'
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px'
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted'
    },
    img: {
      maxWidth: '100%'
    }
  },
  prism: {
    '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
      color: 'gray'
    },
    '.comment': {
      fontStyle: 'italic'
    },
    '.property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable': {
      color: 'purple'
    },
    '.atrule,.attr-value,.keyword': {
      color: 'primary'
    },
    '.selector,.attr-name,.string,.char,.builtin,.inserted': {
      color: 'secondary'
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (swiss);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-system/dist/theme-ui-preset-system.esm.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-system/dist/theme-ui-preset-system.esm.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "system": function() { return /* binding */ system; }
/* harmony export */ });
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading'
};
const system = {
  config: {
    useCustomProperties: true,
    initialColorMode: 'system'
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#119',
    muted: '#f6f6f6',
    highlight: '#efeffe',
    // '#ffffcc',
    gray: '#777',
    accent: '#609',
    modes: {
      dark: {
        text: '#fff',
        background: '#060606',
        primary: '#3cf',
        secondary: '#e0f',
        muted: '#191919',
        highlight: '#29112c',
        gray: '#999',
        accent: '#c0f'
      },
      deep: {
        text: 'hsl(210, 50%, 96%)',
        background: 'hsl(230, 25%, 18%)',
        primary: 'hsl(260, 100%, 80%)',
        secondary: 'hsl(290, 100%, 80%)',
        highlight: 'hsl(260, 20%, 40%)',
        accent: 'hsl(290, 100%, 80%)',
        muted: 'hsla(230, 20%, 0%, 20%)',
        gray: 'hsl(210, 50%, 60%)'
      },
      swiss: {
        text: 'hsl(10, 20%, 20%)',
        background: 'hsl(10, 10%, 98%)',
        primary: 'hsl(10, 80%, 50%)',
        secondary: 'hsl(10, 60%, 50%)',
        highlight: 'hsl(10, 40%, 90%)',
        accent: 'hsl(250, 60%, 30%)',
        muted: 'hsl(10, 20%, 94%)',
        gray: 'hsl(10, 20%, 50%)'
      }
    }
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  textStyles: {
    heading,
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6],
      fontWeight: 'display',
      letterSpacing: '-0.03em',
      mt: 3
    }
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      variant: 'textStyles.display'
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary'
      }
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted'
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px'
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px'
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted'
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (system);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-tailwind/dist/theme-ui-preset-tailwind.esm.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-tailwind/dist/theme-ui-preset-tailwind.esm.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseColors": function() { return /* binding */ baseColors; },
/* harmony export */   "baseFontWeights": function() { return /* binding */ baseFontWeights; },
/* harmony export */   "baseFonts": function() { return /* binding */ baseFonts; },
/* harmony export */   "baseLineHeights": function() { return /* binding */ baseLineHeights; },
/* harmony export */   "borderWidths": function() { return /* binding */ borderWidths; },
/* harmony export */   "breakpoints": function() { return /* binding */ breakpoints; },
/* harmony export */   "buttons": function() { return /* binding */ buttons; },
/* harmony export */   "colors": function() { return /* binding */ colors; },
/* harmony export */   "fontSizes": function() { return /* binding */ fontSizes; },
/* harmony export */   "fontWeights": function() { return /* binding */ fontWeights; },
/* harmony export */   "fonts": function() { return /* binding */ fonts; },
/* harmony export */   "inputs": function() { return /* binding */ inputs; },
/* harmony export */   "letterSpacings": function() { return /* binding */ letterSpacings; },
/* harmony export */   "lineHeights": function() { return /* binding */ lineHeights; },
/* harmony export */   "radii": function() { return /* binding */ radii; },
/* harmony export */   "shadows": function() { return /* binding */ shadows; },
/* harmony export */   "sizes": function() { return /* binding */ sizes; },
/* harmony export */   "space": function() { return /* binding */ space; },
/* harmony export */   "styles": function() { return /* binding */ styles; },
/* harmony export */   "tailwind": function() { return /* binding */ tailwind; },
/* harmony export */   "transforms": function() { return /* binding */ transforms; },
/* harmony export */   "transitions": function() { return /* binding */ transitions; },
/* harmony export */   "zIndices": function() { return /* binding */ zIndices; }
/* harmony export */ });
// Based on https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
// and https://tailwindcss.com/components
const borderWidths = {
  px: '1px',
  '0': '0',
  '2': '2px',
  '4': '4px',
  '8': '8px'
};
const breakpoints = ['640px', '768px', '1024px', '1280px'];
const baseColors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  gray: [null, '#f7fafc', '#edf2f7', '#e2e8f0', '#cbd5e0', '#a0aec0', '#718096', '#4a5568', '#2d3748', '#1a202c'],
  red: [null, '#fff5f5', '#fed7d7', '#feb2b2', '#fc8181', '#f56565', '#e53e3e', '#c53030', '#9b2c2c', '#742a2a'],
  orange: [null, '#fffaf0', '#feebc8', '#fbd38d', '#f6ad55', '#ed8936', '#dd6b20', '#c05621', '#9c4221', '#7b341e'],
  yellow: [null, '#fffff0', '#fefcbf', '#faf089', '#f6e05e', '#ecc94b', '#d69e2e', '#b7791f', '#975a16', '#744210'],
  green: [null, '#f0fff4', '#c6f6d5', '#9ae6b4', '#68d391', '#48bb78', '#38a169', '#2f855a', '#276749', '#22543d'],
  teal: [null, '#e6fffa', '#b2f5ea', '#81e6d9', '#4fd1c5', '#38b2ac', '#319795', '#2c7a7b', '#285e61', '#234e52'],
  blue: [null, '#ebf8ff', '#bee3f8', '#90cdf4', '#63b3ed', '#4299e1', '#3182ce', '#2b6cb0', '#2c5282', '#2a4365'],
  indigo: [null, '#ebf4ff', '#c3dafe', '#a3bffa', '#7f9cf5', '#667eea', '#5a67d8', '#4c51bf', '#434190', '#3c366b'],
  purple: [null, '#faf5ff', '#e9d8fd', '#d6bcfa', '#b794f4', '#9f7aea', '#805ad5', '#6b46c1', '#553c9a', '#44337a'],
  pink: [null, '#fff5f7', '#fed7e2', '#fbb6ce', '#f687b3', '#ed64a6', '#d53f8c', '#b83280', '#97266d', '#702459']
};
const commonButtonStyles = {
  py: 2,
  px: 3,
  cursor: `pointer`,
  fontSize: `100%`,
  lineHeight: `inherit`
};
const buttons = {
  simple: { ...commonButtonStyles,
    backgroundColor: `primary`,
    border: `none`,
    color: `white`,
    fontWeight: `bold`,
    borderRadius: `default`,
    '&:hover': {
      backgroundColor: `primaryHover`
    }
  },
  pill: { ...commonButtonStyles,
    backgroundColor: `primary`,
    border: `none`,
    color: `white`,
    fontWeight: `bold`,
    borderRadius: `full`,
    '&:hover': {
      backgroundColor: `primaryHover`
    }
  },
  outline: { ...commonButtonStyles,
    backgroundColor: `transparent`,
    borderWidth: `1px`,
    borderStyle: `solid`,
    borderColor: `primary`,
    color: `primary`,
    fontWeight: `semibold`,
    borderRadius: `default`,
    '&:hover': {
      backgroundColor: `primary`,
      color: `white`,
      borderColor: `transparent`
    }
  },
  bordered: { ...commonButtonStyles,
    backgroundColor: `primary`,
    borderWidth: `1px`,
    borderStyle: `solid`,
    borderColor: `primaryHover`,
    color: `white`,
    fontWeight: `bold`,
    borderRadius: `default`,
    '&:hover': {
      backgroundColor: `primaryHover`
    }
  },
  disabled: { ...commonButtonStyles,
    backgroundColor: `primary`,
    border: `none`,
    opacity: 0.5,
    cursor: `not-allowed`,
    color: `white`,
    fontWeight: `bold`,
    borderRadius: `default`
  },
  '3D': { ...commonButtonStyles,
    backgroundColor: `primary`,
    border: `none`,
    borderBottomWidth: `4px`,
    borderBottomStyle: `solid`,
    borderBottomColor: `primaryHover`,
    color: `white`,
    fontWeight: `bold`,
    borderRadius: `default`,
    transition: `transform 0.3s ease-in-out`,
    '&:hover': {
      transform: `translateY(-1px)`
    }
  },
  elevated: { ...commonButtonStyles,
    backgroundColor: `white`,
    borderWidth: `1px`,
    borderStyle: `solid`,
    borderColor: `gray.4`,
    color: `text`,
    fontWeight: `bold`,
    borderRadius: `default`,
    boxShadow: `default`,
    '&:hover': {
      backgroundColor: `gray.1`
    }
  }
};
const colors = { ...baseColors,
  grayDark: baseColors.gray[8],
  text: baseColors.gray[8],
  background: baseColors.white,
  primary: baseColors.blue[7],
  primaryHover: baseColors.blue[8],
  secondary: baseColors.gray[6],
  muted: baseColors.gray[3],
  success: baseColors.green[3],
  info: baseColors.blue[4],
  warning: baseColors.yellow[3],
  danger: baseColors.red[3],
  light: baseColors.gray[1],
  dark: baseColors.gray[8],
  textMuted: baseColors.gray[6]
};
const baseFonts = {
  sans: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  serif: 'Georgia,Cambria,"Times New Roman",Times,serif',
  mono: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
};
const fonts = { ...baseFonts,
  body: baseFonts.sans,
  heading: 'inherit',
  monospace: baseFonts.mono
};
const fontSizes = ['0.875rem', '1rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', '3rem', '4rem', '4.5rem'];
const baseFontWeights = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900'
};
const fontWeights = { ...baseFontWeights,
  body: baseFontWeights.normal,
  heading: baseFontWeights.bold
};
const commonInputStyles = {
  py: 2,
  px: 3,
  fontSize: `100%`,
  borderRadius: `default`,
  appearance: `none`,
  lineHeight: `tight`
};
const inputs = {
  shadow: { ...commonInputStyles,
    border: `none`,
    color: `gray.7`,
    boxShadow: `default`,
    '&:focus': {
      outline: `none`,
      boxShadow: `outline`
    }
  },
  inline: { ...commonInputStyles,
    backgroundColor: `gray.2`,
    borderWidth: `2px`,
    borderStyle: `solid`,
    borderColor: `gray.2`,
    color: `gray.7`,
    '&:focus': {
      outline: `none`,
      borderColor: `primary`,
      backgroundColor: `white`
    }
  },
  underline: { ...commonInputStyles,
    backgroundColor: `transparent`,
    border: `none`,
    borderBottomWidth: `2px`,
    borderBottomStyle: `solid`,
    borderBottomColor: `primary`,
    borderRadius: `0px`,
    color: `gray.7`,
    '&:focus': {
      outline: `none`,
      borderColor: `primary`,
      backgroundColor: `white`
    }
  }
};
const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};
const baseLineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2'
};
const lineHeights = { ...baseLineHeights,
  body: baseLineHeights.relaxed,
  heading: baseLineHeights.tight
};
const radii = {
  none: '0',
  sm: '0.125rem',
  default: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  full: '9999px'
};
const tailwindSpacing = {
  px: '1px',
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem'
};
const tailwindMaxWidth = {
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem'
};
const tailwindWidth = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%'
};
const sizes = { ...tailwindSpacing,
  ...tailwindMaxWidth,
  ...tailwindWidth,
  full: '100%',
  screenHeight: '100vh',
  screenWidth: '100vw'
};
const shadows = {
  xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  none: 'none'
};
const space = ["0", '0.25rem', '0.5rem', '1rem', '2rem', '4rem', '8rem', '16rem', '32rem'];
const zIndices = {
  auto: 'auto',
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50'
};
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  m: 0,
  mb: 1
};
const styles = {
  root: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body'
  },
  a: {
    color: 'primary',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  h1: { ...heading,
    fontSize: 6,
    mt: 2
  },
  h2: { ...heading,
    fontSize: 5,
    mt: 2
  },
  h3: { ...heading,
    fontSize: 4,
    mt: 3
  },
  h4: { ...heading,
    fontSize: 3
  },
  h5: { ...heading,
    fontSize: 2
  },
  h6: { ...heading,
    fontSize: 1,
    mb: 2
  },
  code: {},
  pre: {},
  hr: {
    bg: 'muted',
    border: 0,
    height: '1px',
    m: 3
  }
};
const transforms = {
  transformOrigin: {
    center: 'center',
    top: 'top',
    'top-right': 'top right',
    right: 'right',
    'bottom-right': 'bottom right',
    bottom: 'bottom',
    'bottom-left': 'bottom left',
    left: 'left',
    'top-left': 'top left'
  },
  translate: { ...tailwindSpacing,
    '-full': '-100%',
    '-1/2': '-50%',
    '1/2': '50%',
    full: '100%'
  },
  scale: {
    '0': '0',
    '50': '.5',
    '75': '.75',
    '90': '.9',
    '95': '.95',
    '100': '1',
    '105': '1.05',
    '110': '1.1',
    '125': '1.25',
    '150': '1.5'
  },
  rotate: {
    '-180': '-180deg',
    '-90': '-90deg',
    '-45': '-45deg',
    '0': '0',
    '45': '45deg',
    '90': '90deg',
    '180': '180deg'
  },
  skew: {
    '-12': '-12deg',
    '-6': '-6deg',
    '-3': '-3deg',
    '0': '0',
    '3': '3deg',
    '6': '6deg',
    '12': '12deg'
  }
};
const transitions = {
  property: {
    none: 'none',
    all: 'all',
    default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform'
  },
  timingFunction: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  duration: {
    '75': '75ms',
    '100': '100ms',
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    '500': '500ms',
    '700': '700ms',
    '1000': '1000ms'
  }
};
const tailwind = {
  borderWidths,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  sizes,
  shadows,
  space,
  radii,
  zIndices,
  styles,
  buttons,
  inputs,
  transforms,
  transitions
};

/* harmony default export */ __webpack_exports__["default"] = (tailwind);



/***/ }),

/***/ "./node_modules/@theme-ui/preset-tosh/dist/theme-ui-preset-tosh.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theme-ui/preset-tosh/dist/theme-ui-preset-tosh.esm.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tosh": function() { return /* binding */ tosh; }
/* harmony export */ });
const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading'
};
const tosh = {
  config: {
    useCustomProperties: true,
    initialColorMode: 'light'
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#000',
    secondary: '#3f3f3f',
    muted: '#e0e0e0',
    highlight: '#9f9f9f',
    gray: '#6c6c6c',
    accent: '#3f3f3f',
    modes: {
      dark: {
        text: '#fff',
        background: '#060606',
        primary: '#d2d2d2',
        secondary: '#b2b2b2',
        muted: '#191919',
        highlight: '#3c3c3c',
        gray: '#999',
        accent: '#e0e0e0'
      }
    }
  },
  fonts: {
    body: 'Silom, monospace',
    heading: 'Silom, monospace',
    monospace: 'Silom, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  textStyles: {
    heading,
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6],
      fontWeight: 'display',
      letterSpacing: '-0.03em',
      mt: 3
    }
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      variant: 'textStyles.display'
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1
    },
    p: {
      fontSize: 2
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary'
      }
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      borderColor: 'text',
      borderStyle: 'solid',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 8,
      borderBottomWidth: 8,
      overflow: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
      px: 2
    },
    ul: {
      listStyleType: 'square'
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'text',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      backgroundColor: 'muted',
      verticalAlign: 'bottom',
      borderBottomWidth: 8
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: 4
    },
    hr: {
      border: 0,
      borderBottom: '8px solid',
      borderColor: 'text'
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (tosh);



/***/ }),

/***/ "./node_modules/@theme-ui/presets/dist/theme-ui-presets.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@theme-ui/presets/dist/theme-ui-presets.esm.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "base": function() { return /* reexport safe */ _theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__.default; },
/* harmony export */   "dark": function() { return /* reexport safe */ _theme_ui_preset_dark__WEBPACK_IMPORTED_MODULE_1__.default; },
/* harmony export */   "deep": function() { return /* reexport safe */ _theme_ui_preset_deep__WEBPACK_IMPORTED_MODULE_2__.default; },
/* harmony export */   "funk": function() { return /* reexport safe */ _theme_ui_preset_funk__WEBPACK_IMPORTED_MODULE_3__.default; },
/* harmony export */   "future": function() { return /* reexport safe */ _theme_ui_preset_future__WEBPACK_IMPORTED_MODULE_4__.default; },
/* harmony export */   "roboto": function() { return /* reexport safe */ _theme_ui_preset_roboto__WEBPACK_IMPORTED_MODULE_5__.default; },
/* harmony export */   "swiss": function() { return /* reexport safe */ _theme_ui_preset_swiss__WEBPACK_IMPORTED_MODULE_6__.default; },
/* harmony export */   "system": function() { return /* reexport safe */ _theme_ui_preset_system__WEBPACK_IMPORTED_MODULE_7__.default; },
/* harmony export */   "tosh": function() { return /* reexport safe */ _theme_ui_preset_tosh__WEBPACK_IMPORTED_MODULE_8__.default; },
/* harmony export */   "bootstrap": function() { return /* reexport safe */ _theme_ui_preset_bootstrap__WEBPACK_IMPORTED_MODULE_9__.default; },
/* harmony export */   "bulma": function() { return /* reexport safe */ _theme_ui_preset_bulma__WEBPACK_IMPORTED_MODULE_10__.default; },
/* harmony export */   "polaris": function() { return /* reexport safe */ _theme_ui_preset_polaris__WEBPACK_IMPORTED_MODULE_11__.default; },
/* harmony export */   "tailwind": function() { return /* reexport safe */ _theme_ui_preset_tailwind__WEBPACK_IMPORTED_MODULE_12__.default; },
/* harmony export */   "sketchy": function() { return /* reexport safe */ _theme_ui_preset_sketchy__WEBPACK_IMPORTED_MODULE_13__.default; }
/* harmony export */ });
/* harmony import */ var _theme_ui_preset_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/preset-base */ "./node_modules/@theme-ui/preset-base/dist/theme-ui-preset-base.esm.js");
/* harmony import */ var _theme_ui_preset_dark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theme-ui/preset-dark */ "./node_modules/@theme-ui/preset-dark/dist/theme-ui-preset-dark.esm.js");
/* harmony import */ var _theme_ui_preset_deep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @theme-ui/preset-deep */ "./node_modules/@theme-ui/preset-deep/dist/theme-ui-preset-deep.esm.js");
/* harmony import */ var _theme_ui_preset_funk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @theme-ui/preset-funk */ "./node_modules/@theme-ui/preset-funk/dist/theme-ui-preset-funk.esm.js");
/* harmony import */ var _theme_ui_preset_future__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theme-ui/preset-future */ "./node_modules/@theme-ui/preset-future/dist/theme-ui-preset-future.esm.js");
/* harmony import */ var _theme_ui_preset_roboto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @theme-ui/preset-roboto */ "./node_modules/@theme-ui/preset-roboto/dist/theme-ui-preset-roboto.esm.js");
/* harmony import */ var _theme_ui_preset_swiss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @theme-ui/preset-swiss */ "./node_modules/@theme-ui/preset-swiss/dist/theme-ui-preset-swiss.esm.js");
/* harmony import */ var _theme_ui_preset_system__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @theme-ui/preset-system */ "./node_modules/@theme-ui/preset-system/dist/theme-ui-preset-system.esm.js");
/* harmony import */ var _theme_ui_preset_tosh__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @theme-ui/preset-tosh */ "./node_modules/@theme-ui/preset-tosh/dist/theme-ui-preset-tosh.esm.js");
/* harmony import */ var _theme_ui_preset_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @theme-ui/preset-bootstrap */ "./node_modules/@theme-ui/preset-bootstrap/dist/theme-ui-preset-bootstrap.esm.js");
/* harmony import */ var _theme_ui_preset_bulma__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @theme-ui/preset-bulma */ "./node_modules/@theme-ui/preset-bulma/dist/theme-ui-preset-bulma.esm.js");
/* harmony import */ var _theme_ui_preset_polaris__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @theme-ui/preset-polaris */ "./node_modules/@theme-ui/preset-polaris/dist/theme-ui-preset-polaris.esm.js");
/* harmony import */ var _theme_ui_preset_tailwind__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @theme-ui/preset-tailwind */ "./node_modules/@theme-ui/preset-tailwind/dist/theme-ui-preset-tailwind.esm.js");
/* harmony import */ var _theme_ui_preset_sketchy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @theme-ui/preset-sketchy */ "./node_modules/@theme-ui/preset-sketchy/dist/theme-ui-preset-sketchy.esm.js");
















/***/ }),

/***/ "./node_modules/@theme-ui/theme-provider/dist/theme-ui-theme-provider.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theme-ui/theme-provider/dist/theme-ui-theme-provider.esm.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemeProvider": function() { return /* binding */ ThemeProvider; }
/* harmony export */ });
/* harmony import */ var _theme_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/core */ "./node_modules/@theme-ui/core/dist/theme-ui-core.esm.js");
/* harmony import */ var _theme_ui_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @theme-ui/css */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");
/* harmony import */ var _theme_ui_color_modes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theme-ui/color-modes */ "./node_modules/@theme-ui/color-modes/dist/theme-ui-color-modes.esm.js");
/* harmony import */ var _theme_ui_mdx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @theme-ui/mdx */ "./node_modules/@theme-ui/mdx/dist/theme-ui-mdx.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");






const RootStyles = () => (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_1__.Global, {
  styles: emotionTheme => {
    var _theme$config;

    const theme = emotionTheme;
    const {
      useRootStyles
    } = theme.config || theme;

    if (useRootStyles === false || theme.styles && !theme.styles.root) {
      return null;
    }

    const boxSizing = ((_theme$config = theme.config) == null ? void 0 : _theme$config.useBorderBox) === false ? undefined : 'border-box';
    return (0,_theme_ui_css__WEBPACK_IMPORTED_MODULE_2__.css)({
      '*': {
        boxSizing
      },
      html: {
        variant: 'styles.root'
      },
      body: {
        margin: 0
      }
    })(theme);
  }
});

const ThemeProvider = ({
  theme,
  components,
  children
}) => {
  const outer = (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.useThemeUI)();

  if (typeof outer.setColorMode === 'function') {
    return (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.ThemeProvider, {
      theme
    }, (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_ui_mdx__WEBPACK_IMPORTED_MODULE_3__.MDXProvider, {
      components,
      children
    }));
  }

  return (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.ThemeProvider, {
    theme
  }, (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_ui_color_modes__WEBPACK_IMPORTED_MODULE_4__.ColorModeProvider, null, (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(RootStyles), (0,_theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_ui_mdx__WEBPACK_IMPORTED_MODULE_3__.MDXProvider, {
    components,
    children
  })));
};




/***/ }),

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/***/ (function(module) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
  \*****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_app&absolutePagePath=private-next-pages%2F_app.jsx!":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_app&absolutePagePath=private-next-pages%2F_app.jsx! ***!
  \***********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/_app",
      function () {
        return __webpack_require__(/*! private-next-pages/_app.jsx */ "./pages/_app.jsx");
      }
    ]);
  

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ (function(module) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/styled-system/dist/index.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/styled-system/dist/index.esm.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": function() { return /* reexport safe */ _styled_system_core__WEBPACK_IMPORTED_MODULE_0__.get; },
/* harmony export */   "createParser": function() { return /* reexport safe */ _styled_system_core__WEBPACK_IMPORTED_MODULE_0__.createParser; },
/* harmony export */   "createStyleFunction": function() { return /* reexport safe */ _styled_system_core__WEBPACK_IMPORTED_MODULE_0__.createStyleFunction; },
/* harmony export */   "compose": function() { return /* reexport safe */ _styled_system_core__WEBPACK_IMPORTED_MODULE_0__.compose; },
/* harmony export */   "system": function() { return /* reexport safe */ _styled_system_core__WEBPACK_IMPORTED_MODULE_0__.system; },
/* harmony export */   "margin": function() { return /* reexport safe */ _styled_system_space__WEBPACK_IMPORTED_MODULE_9__.margin; },
/* harmony export */   "padding": function() { return /* reexport safe */ _styled_system_space__WEBPACK_IMPORTED_MODULE_9__.padding; },
/* harmony export */   "space": function() { return /* reexport safe */ _styled_system_space__WEBPACK_IMPORTED_MODULE_9__.space; },
/* harmony export */   "color": function() { return /* reexport safe */ _styled_system_color__WEBPACK_IMPORTED_MODULE_2__.color; },
/* harmony export */   "layout": function() { return /* reexport safe */ _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.layout; },
/* harmony export */   "typography": function() { return /* reexport safe */ _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.typography; },
/* harmony export */   "flexbox": function() { return /* reexport safe */ _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.flexbox; },
/* harmony export */   "border": function() { return /* reexport safe */ _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.border; },
/* harmony export */   "background": function() { return /* reexport safe */ _styled_system_background__WEBPACK_IMPORTED_MODULE_7__.background; },
/* harmony export */   "position": function() { return /* reexport safe */ _styled_system_position__WEBPACK_IMPORTED_MODULE_8__.position; },
/* harmony export */   "grid": function() { return /* reexport safe */ _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.grid; },
/* harmony export */   "shadow": function() { return /* reexport safe */ _styled_system_shadow__WEBPACK_IMPORTED_MODULE_10__.shadow; },
/* harmony export */   "boxShadow": function() { return /* reexport safe */ _styled_system_shadow__WEBPACK_IMPORTED_MODULE_10__.default; },
/* harmony export */   "textShadow": function() { return /* reexport safe */ _styled_system_shadow__WEBPACK_IMPORTED_MODULE_10__.default; },
/* harmony export */   "variant": function() { return /* reexport safe */ _styled_system_variant__WEBPACK_IMPORTED_MODULE_11__.variant; },
/* harmony export */   "buttonStyle": function() { return /* reexport safe */ _styled_system_variant__WEBPACK_IMPORTED_MODULE_11__.buttonStyle; },
/* harmony export */   "textStyle": function() { return /* reexport safe */ _styled_system_variant__WEBPACK_IMPORTED_MODULE_11__.textStyle; },
/* harmony export */   "colorStyle": function() { return /* reexport safe */ _styled_system_variant__WEBPACK_IMPORTED_MODULE_11__.colorStyle; },
/* harmony export */   "borders": function() { return /* reexport safe */ _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default; },
/* harmony export */   "width": function() { return /* binding */ width; },
/* harmony export */   "height": function() { return /* binding */ height; },
/* harmony export */   "minWidth": function() { return /* binding */ minWidth; },
/* harmony export */   "minHeight": function() { return /* binding */ minHeight; },
/* harmony export */   "maxWidth": function() { return /* binding */ maxWidth; },
/* harmony export */   "maxHeight": function() { return /* binding */ maxHeight; },
/* harmony export */   "size": function() { return /* binding */ size; },
/* harmony export */   "verticalAlign": function() { return /* binding */ verticalAlign; },
/* harmony export */   "display": function() { return /* binding */ display; },
/* harmony export */   "overflow": function() { return /* binding */ overflow; },
/* harmony export */   "overflowX": function() { return /* binding */ overflowX; },
/* harmony export */   "overflowY": function() { return /* binding */ overflowY; },
/* harmony export */   "opacity": function() { return /* binding */ opacity; },
/* harmony export */   "fontSize": function() { return /* binding */ fontSize; },
/* harmony export */   "fontFamily": function() { return /* binding */ fontFamily; },
/* harmony export */   "fontWeight": function() { return /* binding */ fontWeight; },
/* harmony export */   "lineHeight": function() { return /* binding */ lineHeight; },
/* harmony export */   "textAlign": function() { return /* binding */ textAlign; },
/* harmony export */   "fontStyle": function() { return /* binding */ fontStyle; },
/* harmony export */   "letterSpacing": function() { return /* binding */ letterSpacing; },
/* harmony export */   "alignItems": function() { return /* binding */ alignItems; },
/* harmony export */   "alignContent": function() { return /* binding */ alignContent; },
/* harmony export */   "justifyItems": function() { return /* binding */ justifyItems; },
/* harmony export */   "justifyContent": function() { return /* binding */ justifyContent; },
/* harmony export */   "flexWrap": function() { return /* binding */ flexWrap; },
/* harmony export */   "flexDirection": function() { return /* binding */ flexDirection; },
/* harmony export */   "flex": function() { return /* binding */ flex; },
/* harmony export */   "flexGrow": function() { return /* binding */ flexGrow; },
/* harmony export */   "flexShrink": function() { return /* binding */ flexShrink; },
/* harmony export */   "flexBasis": function() { return /* binding */ flexBasis; },
/* harmony export */   "justifySelf": function() { return /* binding */ justifySelf; },
/* harmony export */   "alignSelf": function() { return /* binding */ alignSelf; },
/* harmony export */   "order": function() { return /* binding */ order; },
/* harmony export */   "gridGap": function() { return /* binding */ gridGap; },
/* harmony export */   "gridColumnGap": function() { return /* binding */ gridColumnGap; },
/* harmony export */   "gridRowGap": function() { return /* binding */ gridRowGap; },
/* harmony export */   "gridColumn": function() { return /* binding */ gridColumn; },
/* harmony export */   "gridRow": function() { return /* binding */ gridRow; },
/* harmony export */   "gridAutoFlow": function() { return /* binding */ gridAutoFlow; },
/* harmony export */   "gridAutoColumns": function() { return /* binding */ gridAutoColumns; },
/* harmony export */   "gridAutoRows": function() { return /* binding */ gridAutoRows; },
/* harmony export */   "gridTemplateColumns": function() { return /* binding */ gridTemplateColumns; },
/* harmony export */   "gridTemplateRows": function() { return /* binding */ gridTemplateRows; },
/* harmony export */   "gridTemplateAreas": function() { return /* binding */ gridTemplateAreas; },
/* harmony export */   "gridArea": function() { return /* binding */ gridArea; },
/* harmony export */   "borderWidth": function() { return /* binding */ borderWidth; },
/* harmony export */   "borderStyle": function() { return /* binding */ borderStyle; },
/* harmony export */   "borderColor": function() { return /* binding */ borderColor; },
/* harmony export */   "borderTop": function() { return /* binding */ borderTop; },
/* harmony export */   "borderRight": function() { return /* binding */ borderRight; },
/* harmony export */   "borderBottom": function() { return /* binding */ borderBottom; },
/* harmony export */   "borderLeft": function() { return /* binding */ borderLeft; },
/* harmony export */   "borderRadius": function() { return /* binding */ borderRadius; },
/* harmony export */   "backgroundImage": function() { return /* binding */ backgroundImage; },
/* harmony export */   "backgroundSize": function() { return /* binding */ backgroundSize; },
/* harmony export */   "backgroundPosition": function() { return /* binding */ backgroundPosition; },
/* harmony export */   "backgroundRepeat": function() { return /* binding */ backgroundRepeat; },
/* harmony export */   "zIndex": function() { return /* binding */ zIndex; },
/* harmony export */   "top": function() { return /* binding */ top; },
/* harmony export */   "right": function() { return /* binding */ right; },
/* harmony export */   "bottom": function() { return /* binding */ bottom; },
/* harmony export */   "left": function() { return /* binding */ left; },
/* harmony export */   "style": function() { return /* binding */ style; }
/* harmony export */ });
/* harmony import */ var _styled_system_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styled-system/core */ "./node_modules/@styled-system/core/dist/index.esm.js");
/* harmony import */ var _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @styled-system/layout */ "./node_modules/@styled-system/layout/dist/index.esm.js");
/* harmony import */ var _styled_system_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @styled-system/color */ "./node_modules/@styled-system/color/dist/index.esm.js");
/* harmony import */ var _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @styled-system/typography */ "./node_modules/@styled-system/typography/dist/index.esm.js");
/* harmony import */ var _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @styled-system/flexbox */ "./node_modules/@styled-system/flexbox/dist/index.esm.js");
/* harmony import */ var _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @styled-system/grid */ "./node_modules/@styled-system/grid/dist/index.esm.js");
/* harmony import */ var _styled_system_border__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @styled-system/border */ "./node_modules/@styled-system/border/dist/index.esm.js");
/* harmony import */ var _styled_system_background__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @styled-system/background */ "./node_modules/@styled-system/background/dist/index.esm.js");
/* harmony import */ var _styled_system_position__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @styled-system/position */ "./node_modules/@styled-system/position/dist/index.esm.js");
/* harmony import */ var _styled_system_space__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @styled-system/space */ "./node_modules/@styled-system/space/dist/index.esm.js");
/* harmony import */ var _styled_system_shadow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @styled-system/shadow */ "./node_modules/@styled-system/shadow/dist/index.esm.js");
/* harmony import */ var _styled_system_variant__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @styled-system/variant */ "./node_modules/@styled-system/variant/dist/index.esm.js");
 // v4 api shims






















var width = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.width,
    height = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.height,
    minWidth = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.minWidth,
    minHeight = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.minHeight,
    maxWidth = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.maxWidth,
    maxHeight = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.maxHeight,
    size = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.size,
    verticalAlign = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.verticalAlign,
    display = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.display,
    overflow = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.overflow,
    overflowX = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.overflowX,
    overflowY = _styled_system_layout__WEBPACK_IMPORTED_MODULE_1__.default.overflowY;
var opacity = _styled_system_color__WEBPACK_IMPORTED_MODULE_2__.default.opacity;
var fontSize = _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.default.fontSize,
    fontFamily = _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.default.fontFamily,
    fontWeight = _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.default.fontWeight,
    lineHeight = _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.default.lineHeight,
    textAlign = _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.default.textAlign,
    fontStyle = _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.default.fontStyle,
    letterSpacing = _styled_system_typography__WEBPACK_IMPORTED_MODULE_3__.default.letterSpacing;
var alignItems = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.alignItems,
    alignContent = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.alignContent,
    justifyItems = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.justifyItems,
    justifyContent = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.justifyContent,
    flexWrap = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.flexWrap,
    flexDirection = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.flexDirection,
    flex = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.flex,
    flexGrow = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.flexGrow,
    flexShrink = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.flexShrink,
    flexBasis = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.flexBasis,
    justifySelf = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.justifySelf,
    alignSelf = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.alignSelf,
    order = _styled_system_flexbox__WEBPACK_IMPORTED_MODULE_4__.default.order;
var gridGap = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridGap,
    gridColumnGap = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridColumnGap,
    gridRowGap = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridRowGap,
    gridColumn = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridColumn,
    gridRow = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridRow,
    gridAutoFlow = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridAutoFlow,
    gridAutoColumns = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridAutoColumns,
    gridAutoRows = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridAutoRows,
    gridTemplateColumns = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridTemplateColumns,
    gridTemplateRows = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridTemplateRows,
    gridTemplateAreas = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridTemplateAreas,
    gridArea = _styled_system_grid__WEBPACK_IMPORTED_MODULE_5__.default.gridArea;
var borderWidth = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderWidth,
    borderStyle = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderStyle,
    borderColor = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderColor,
    borderTop = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderTop,
    borderRight = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderRight,
    borderBottom = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderBottom,
    borderLeft = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderLeft,
    borderRadius = _styled_system_border__WEBPACK_IMPORTED_MODULE_6__.default.borderRadius;
var backgroundImage = _styled_system_background__WEBPACK_IMPORTED_MODULE_7__.default.backgroundImage,
    backgroundSize = _styled_system_background__WEBPACK_IMPORTED_MODULE_7__.default.backgroundSize,
    backgroundPosition = _styled_system_background__WEBPACK_IMPORTED_MODULE_7__.default.backgroundPosition,
    backgroundRepeat = _styled_system_background__WEBPACK_IMPORTED_MODULE_7__.default.backgroundRepeat;
var zIndex = _styled_system_position__WEBPACK_IMPORTED_MODULE_8__.default.zIndex,
    top = _styled_system_position__WEBPACK_IMPORTED_MODULE_8__.default.top,
    right = _styled_system_position__WEBPACK_IMPORTED_MODULE_8__.default.right,
    bottom = _styled_system_position__WEBPACK_IMPORTED_MODULE_8__.default.bottom,
    left = _styled_system_position__WEBPACK_IMPORTED_MODULE_8__.default.left;

 // v4 style API shim

var style = function style(_ref) {
  var prop = _ref.prop,
      cssProperty = _ref.cssProperty,
      alias = _ref.alias,
      key = _ref.key,
      transformValue = _ref.transformValue,
      scale = _ref.scale,
      properties = _ref.properties;
  var config = {};
  config[prop] = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.createStyleFunction)({
    properties: properties,
    property: cssProperty || prop,
    scale: key,
    defaultScale: scale,
    transform: transformValue
  });
  if (alias) config[alias] = config[prop];
  var parse = (0,_styled_system_core__WEBPACK_IMPORTED_MODULE_0__.createParser)(config);
  return parse;
};


/***/ }),

/***/ "./node_modules/theme-ui/dist/theme-ui.esm.js":
/*!****************************************************!*\
  !*** ./node_modules/theme-ui/dist/theme-ui.esm.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__ThemeUIContext": function() { return /* reexport safe */ _theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.__ThemeUIContext; },
/* harmony export */   "createElement": function() { return /* reexport safe */ _theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.createElement; },
/* harmony export */   "merge": function() { return /* reexport safe */ _theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.merge; },
/* harmony export */   "useThemeUI": function() { return /* reexport safe */ _theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.useThemeUI; },
/* harmony export */   "InitializeColorMode": function() { return /* reexport safe */ _theme_ui_color_modes__WEBPACK_IMPORTED_MODULE_1__.InitializeColorMode; },
/* harmony export */   "useColorMode": function() { return /* reexport safe */ _theme_ui_color_modes__WEBPACK_IMPORTED_MODULE_1__.useColorMode; },
/* harmony export */   "Styled": function() { return /* reexport safe */ _theme_ui_mdx__WEBPACK_IMPORTED_MODULE_2__.Styled; },
/* harmony export */   "Themed": function() { return /* reexport safe */ _theme_ui_mdx__WEBPACK_IMPORTED_MODULE_2__.Themed; },
/* harmony export */   "components": function() { return /* reexport safe */ _theme_ui_mdx__WEBPACK_IMPORTED_MODULE_2__.components; },
/* harmony export */   "ThemeProvider": function() { return /* reexport safe */ _theme_ui_theme_provider__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider; },
/* harmony export */   "css": function() { return /* reexport safe */ _theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.css; },
/* harmony export */   "get": function() { return /* reexport safe */ _theme_ui_css__WEBPACK_IMPORTED_MODULE_5__.get; },
/* harmony export */   "BaseStyles": function() { return /* binding */ BaseStyles; },
/* harmony export */   "jsx": function() { return /* binding */ jsx; }
/* harmony export */ });
/* harmony import */ var _theme_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theme-ui/core */ "./node_modules/@theme-ui/core/dist/theme-ui-core.esm.js");
/* harmony import */ var _theme_ui_color_modes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theme-ui/color-modes */ "./node_modules/@theme-ui/color-modes/dist/theme-ui-color-modes.esm.js");
/* harmony import */ var _theme_ui_mdx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @theme-ui/mdx */ "./node_modules/@theme-ui/mdx/dist/theme-ui-mdx.esm.js");
/* harmony import */ var _theme_ui_theme_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @theme-ui/theme-provider */ "./node_modules/@theme-ui/theme-provider/dist/theme-ui-theme-provider.esm.js");
/* harmony import */ var _theme_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theme-ui/components */ "./node_modules/@theme-ui/components/dist/theme-ui-components.esm.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _theme_ui_components__WEBPACK_IMPORTED_MODULE_4__) if(["default","__ThemeUIContext","createElement","merge","useThemeUI","InitializeColorMode","useColorMode","Styled","Themed","components","ThemeProvider","css","get","BaseStyles","jsx"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _theme_ui_components__WEBPACK_IMPORTED_MODULE_4__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _theme_ui_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @theme-ui/css */ "./node_modules/@theme-ui/css/dist/theme-ui-css.esm.js");








const BaseStyles = props => jsx('div', { ...props,
  sx: {
    fontFamily: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
    variant: 'styles'
  }
});
const jsx = _theme_ui_core__WEBPACK_IMPORTED_MODULE_0__.jsx;




/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["main"], function() { return __webpack_exec__("./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_app&absolutePagePath=private-next-pages%2F_app.jsx!"), __webpack_exec__("./node_modules/next/dist/client/router.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvZGlzdC9lbW90aW9uLWNhY2hlLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvbm9kZV9tb2R1bGVzL3N0eWxpcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL25vZGVfbW9kdWxlcy9zdHlsaXMvc3JjL0VudW0uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9jYWNoZS9ub2RlX21vZHVsZXMvc3R5bGlzL3NyYy9NaWRkbGV3YXJlLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvbm9kZV9tb2R1bGVzL3N0eWxpcy9zcmMvUGFyc2VyLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvbm9kZV9tb2R1bGVzL3N0eWxpcy9zcmMvUHJlZml4ZXIuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9jYWNoZS9ub2RlX21vZHVsZXMvc3R5bGlzL3NyYy9TZXJpYWxpemVyLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvbm9kZV9tb2R1bGVzL3N0eWxpcy9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vY2FjaGUvbm9kZV9tb2R1bGVzL3N0eWxpcy9zcmMvVXRpbGl0eS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2hhc2gvZGlzdC9oYXNoLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vaXMtcHJvcC12YWxpZC9kaXN0L2Vtb3Rpb24taXMtcHJvcC12YWxpZC5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL21lbW9pemUvZGlzdC9lbW90aW9uLW1lbW9pemUuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9yZWFjdC9kaXN0L2Vtb3Rpb24tZWxlbWVudC05OTI4OWIyMS5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL3JlYWN0L2Rpc3QvZW1vdGlvbi1yZWFjdC5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL3JlYWN0L2lzb2xhdGVkLWhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzLWRvLW5vdC11c2UtdGhpcy1pbi15b3VyLWNvZGUvZGlzdC9lbW90aW9uLXJlYWN0LWlzb2xhdGVkLWhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzLWRvLW5vdC11c2UtdGhpcy1pbi15b3VyLWNvZGUuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9yZWFjdC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL3NlcmlhbGl6ZS9kaXN0L2Vtb3Rpb24tc2VyaWFsaXplLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vc2hlZXQvZGlzdC9lbW90aW9uLXNoZWV0LmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vc3R5bGVkL2Jhc2UvZGlzdC9lbW90aW9uLXN0eWxlZC1iYXNlLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vc3R5bGVkL2Rpc3QvZW1vdGlvbi1zdHlsZWQuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsZWQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi91bml0bGVzcy9kaXN0L3VuaXRsZXNzLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vdXRpbHMvZGlzdC9lbW90aW9uLXV0aWxzLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vd2Vhay1tZW1vaXplL2Rpc3Qvd2Vhay1tZW1vaXplLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQG1keC1qcy9yZWFjdC9kaXN0L2VzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvbGluay5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvdXNlLWludGVyc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvX2FwcC5qc3giLCJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL25hdi5qc3giLCJ3ZWJwYWNrOi8vX05fRS8uL3RoZW1lLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHN0eWxlZC1zeXN0ZW0vYmFja2dyb3VuZC9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzdHlsZWQtc3lzdGVtL2JvcmRlci9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzdHlsZWQtc3lzdGVtL2NvbG9yL2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHN0eWxlZC1zeXN0ZW0vY29yZS9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzdHlsZWQtc3lzdGVtL2Nzcy9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzdHlsZWQtc3lzdGVtL2ZsZXhib3gvZGlzdC9pbmRleC5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac3R5bGVkLXN5c3RlbS9ncmlkL2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHN0eWxlZC1zeXN0ZW0vbGF5b3V0L2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHN0eWxlZC1zeXN0ZW0vcG9zaXRpb24vZGlzdC9pbmRleC5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac3R5bGVkLXN5c3RlbS9zaGFkb3cvZGlzdC9pbmRleC5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac3R5bGVkLXN5c3RlbS9zaG91bGQtZm9yd2FyZC1wcm9wL2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHN0eWxlZC1zeXN0ZW0vc2hvdWxkLWZvcndhcmQtcHJvcC9ub2RlX21vZHVsZXMvQGVtb3Rpb24vaXMtcHJvcC12YWxpZC9kaXN0L2lzLXByb3AtdmFsaWQuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9Ac3R5bGVkLXN5c3RlbS9zaG91bGQtZm9yd2FyZC1wcm9wL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9tZW1vaXplL2Rpc3QvbWVtb2l6ZS5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzdHlsZWQtc3lzdGVtL3NwYWNlL2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHN0eWxlZC1zeXN0ZW0vdHlwb2dyYXBoeS9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BzdHlsZWQtc3lzdGVtL3ZhcmlhbnQvZGlzdC9pbmRleC5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvY29sb3ItbW9kZXMvZGlzdC90aGVtZS11aS1jb2xvci1tb2Rlcy5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvY29tcG9uZW50cy9kaXN0L3RoZW1lLXVpLWNvbXBvbmVudHMuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL2NvcmUvZGlzdC90aGVtZS11aS1jb3JlLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0B0aGVtZS11aS9jc3MvZGlzdC90aGVtZS11aS1jc3MuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL21keC9kaXN0L3RoZW1lLXVpLW1keC5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvcGFyc2UtcHJvcHMvZGlzdC90aGVtZS11aS1wYXJzZS1wcm9wcy5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvcHJlc2V0LWJhc2UvZGlzdC90aGVtZS11aS1wcmVzZXQtYmFzZS5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvcHJlc2V0LWJvb3RzdHJhcC9kaXN0L3RoZW1lLXVpLXByZXNldC1ib290c3RyYXAuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL3ByZXNldC1idWxtYS9kaXN0L3RoZW1lLXVpLXByZXNldC1idWxtYS5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvcHJlc2V0LWRhcmsvZGlzdC90aGVtZS11aS1wcmVzZXQtZGFyay5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvcHJlc2V0LWRlZXAvZGlzdC90aGVtZS11aS1wcmVzZXQtZGVlcC5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvcHJlc2V0LWZ1bmsvZGlzdC90aGVtZS11aS1wcmVzZXQtZnVuay5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AdGhlbWUtdWkvcHJlc2V0LWZ1dHVyZS9kaXN0L3RoZW1lLXVpLXByZXNldC1mdXR1cmUuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL3ByZXNldC1wb2xhcmlzL2Rpc3QvdGhlbWUtdWktcHJlc2V0LXBvbGFyaXMuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL3ByZXNldC1yb2JvdG8vZGlzdC90aGVtZS11aS1wcmVzZXQtcm9ib3RvLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0B0aGVtZS11aS9wcmVzZXQtc2tldGNoeS9kaXN0L3RoZW1lLXVpLXByZXNldC1za2V0Y2h5LmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0B0aGVtZS11aS9wcmVzZXQtc3dpc3MvZGlzdC90aGVtZS11aS1wcmVzZXQtc3dpc3MuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL3ByZXNldC1zeXN0ZW0vZGlzdC90aGVtZS11aS1wcmVzZXQtc3lzdGVtLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0B0aGVtZS11aS9wcmVzZXQtdGFpbHdpbmQvZGlzdC90aGVtZS11aS1wcmVzZXQtdGFpbHdpbmQuZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL3ByZXNldC10b3NoL2Rpc3QvdGhlbWUtdWktcHJlc2V0LXRvc2guZXNtLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvQHRoZW1lLXVpL3ByZXNldHMvZGlzdC90aGVtZS11aS1wcmVzZXRzLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0B0aGVtZS11aS90aGVtZS1wcm92aWRlci9kaXN0L3RoZW1lLXVpLXRoZW1lLXByb3ZpZGVyLmVzbS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2RlZXBtZXJnZS9kaXN0L2Nqcy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2Rpc3QvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MuY2pzLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3Mvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9fTl9FLyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvbGluay5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3N0eWxlZC1zeXN0ZW0vZGlzdC9pbmRleC5lc20uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy90aGVtZS11aS9kaXN0L3RoZW1lLXVpLmVzbS5qcyJdLCJuYW1lcyI6WyJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsInJlcXVpcmUiLCJleHBvcnRzIiwiX3JlYWN0IiwiX3JvdXRlciIsIl9yb3V0ZXIyIiwiX3VzZUludGVyc2VjdGlvbiIsInByZWZldGNoZWQiLCJwcmVmZXRjaCIsInJvdXRlciIsImhyZWYiLCJhcyIsIm9wdGlvbnMiLCJpc0xvY2FsVVJMIiwiZXJyIiwiY3VyTG9jYWxlIiwibG9jYWxlIiwiaXNNb2RpZmllZEV2ZW50IiwiZXZlbnQiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwibWV0YUtleSIsImN0cmxLZXkiLCJzaGlmdEtleSIsImFsdEtleSIsIm5hdGl2ZUV2ZW50Iiwid2hpY2giLCJsaW5rQ2xpY2tlZCIsImUiLCJyZXBsYWNlIiwic2hhbGxvdyIsInNjcm9sbCIsIm5vZGVOYW1lIiwicHJldmVudERlZmF1bHQiLCJpbmRleE9mIiwiTGluayIsInByb3BzIiwiY3JlYXRlUHJvcEVycm9yIiwiYXJncyIsIkVycm9yIiwia2V5IiwiZXhwZWN0ZWQiLCJhY3R1YWwiLCJyZXF1aXJlZFByb3BzR3VhcmQiLCJyZXF1aXJlZFByb3BzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJfIiwib3B0aW9uYWxQcm9wc0d1YXJkIiwicGFzc0hyZWYiLCJvcHRpb25hbFByb3BzIiwidmFsVHlwZSIsImhhc1dhcm5lZCIsInVzZVJlZiIsImN1cnJlbnQiLCJjb25zb2xlIiwid2FybiIsInAiLCJ1c2VSb3V0ZXIiLCJ1c2VNZW1vIiwicmVzb2x2ZUhyZWYiLCJyZXNvbHZlZEhyZWYiLCJyZXNvbHZlZEFzIiwiY2hpbGRyZW4iLCJjcmVhdGVFbGVtZW50IiwiY2hpbGQiLCJDaGlsZHJlbiIsIm9ubHkiLCJjaGlsZFJlZiIsInJlZiIsInVzZUludGVyc2VjdGlvbiIsInJvb3RNYXJnaW4iLCJzZXRJbnRlcnNlY3Rpb25SZWYiLCJpc1Zpc2libGUiLCJzZXRSZWYiLCJ1c2VDYWxsYmFjayIsImVsIiwidXNlRWZmZWN0Iiwic2hvdWxkUHJlZmV0Y2giLCJpc1ByZWZldGNoZWQiLCJjaGlsZFByb3BzIiwib25DbGljayIsImRlZmF1bHRQcmV2ZW50ZWQiLCJvbk1vdXNlRW50ZXIiLCJwcmlvcml0eSIsInR5cGUiLCJsb2NhbGVEb21haW4iLCJpc0xvY2FsZURvbWFpbiIsImdldERvbWFpbkxvY2FsZSIsImxvY2FsZXMiLCJkb21haW5Mb2NhbGVzIiwiYWRkQmFzZVBhdGgiLCJhZGRMb2NhbGUiLCJkZWZhdWx0TG9jYWxlIiwiY2xvbmVFbGVtZW50IiwiX2RlZmF1bHQiLCJfcmVxdWVzdElkbGVDYWxsYmFjayIsImhhc0ludGVyc2VjdGlvbk9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJkaXNhYmxlZCIsImlzRGlzYWJsZWQiLCJ1bm9ic2VydmUiLCJ1c2VTdGF0ZSIsInZpc2libGUiLCJzZXRWaXNpYmxlIiwidW5kZWZpbmVkIiwidGFnTmFtZSIsIm9ic2VydmUiLCJpZGxlQ2FsbGJhY2siLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwiY2FuY2VsSWRsZUNhbGxiYWNrIiwiZWxlbWVudCIsImNhbGxiYWNrIiwiY3JlYXRlT2JzZXJ2ZXIiLCJpZCIsIm9ic2VydmVyIiwiZWxlbWVudHMiLCJzZXQiLCJzaXplIiwiZGlzY29ubmVjdCIsIm9ic2VydmVycyIsIk1hcCIsImluc3RhbmNlIiwiZ2V0IiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJpbnRlcnNlY3Rpb25SYXRpbyIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInRoZW1lIiwiTmF2IiwiaGVpZ2h0Iiwid2lkdGgiLCJiZyIsImJvcmRlckJvdHRvbSIsImJvcmRlckNvbG9yIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJqdXN0aWZ5Q29udGVudCIsInZhcmlhbnQiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJjdXJzb3IiLCJjb2xvciIsInByb2Nlc3MiLCJlbnYiLCJIRUxQX0FQUF9VUkwiLCJyb2JvdG8iLCJjb250YWluZXJzIiwiY2FyZCIsImJveFNoYWRvdyIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsInBhZ2UiLCJtYXhXaWR0aCIsIm0iLCJteCIsInN0eWxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2I0QztBQUM2SDtBQUMxSTtBQUNMOztBQUUxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLDZDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxnQ0FBZ0MsNENBQUk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5QixrREFBVSxDQUFDLDRDQUFRO0FBQzVDOztBQUVBO0FBQ0EseUJBQXlCLCtDQUFPO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDRDQUFJO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHlCQUF5Qiw0Q0FBSTtBQUM3QjtBQUNBLEdBQUcsb0JBQW9CLDRDQUFJOztBQUUzQjtBQUNBOztBQUVBO0FBQ0EsU0FBUywrQ0FBTyxTQUFTLDZDQUFLO0FBQzlCLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0Isa0JBQWtCO0FBQzFDLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0gsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNILE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0gsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNILE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtEQUFlLFNBQVMsRUFBQztBQUMrRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEx4STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0gsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNILE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNILFVBQVU7QUFDVixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtEQUFlLEtBQUssRUFBQztBQUMyRTs7Ozs7Ozs7Ozs7Ozs7OztBQzVIaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtEQUFlLElBQUksRUFBQztBQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDekpoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQWUsSUFBSSxFQUFDO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekp5Qjs7QUFFekMsY0FBYyxJQUFJLDBEQUFJO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxXQUFXLElBQUksaUVBQVc7QUFDMUI7QUFDQTtBQUNBLEdBQUc7QUFDSCxXQUFXLElBQUksaUVBQVc7QUFDMUI7QUFDQTs7QUFFQSwrREFBZSxJQUFJLEVBQUM7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQnlCOztBQUV6QyxnQkFBZ0IsSUFBSSwwREFBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQWUsTUFBTSxFQUFDO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEN1Qjs7QUFFekM7QUFDQSxpQkFBaUIsSUFBSSwwREFBSTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQWUsT0FBTyxFQUFDO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNzQjs7QUFFekMsZ0JBQWdCLElBQUksMERBQUk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrREFBZSxNQUFNLEVBQUM7QUFDSjs7Ozs7Ozs7Ozs7OztBQ3ZCbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsV0FBVztBQUNYO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsY0FBYztBQUNkO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBO0FBQ0EsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTCxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTCxjQUFjO0FBQ2Q7QUFDQTtBQUNBLEtBQUs7QUFDTCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrREFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrREFBZSxLQUFLLEVBQUM7QUFDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ3pKakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtEQUFlLE1BQU0sRUFBQztBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hLbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNILE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSCxVQUFVO0FBQ1YsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQWUsUUFBUSxFQUFDO0FBQzhPOzs7Ozs7Ozs7Ozs7Ozs7O0FDdGR0UTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtEQUFlLElBQUksRUFBQztBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakt3QztBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDRjtBQUNFO0FBQ0o7QUFDVTtBQUNSO0FBQ0k7QUFDRTtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNicUI7QUFDL0M7QUFDc0I7QUFDZDtBQUNKOztBQUV4Qyx5QkFBeUIsbURBQUcsQ0FBQyxrREFBTTtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxrREFBRztBQUNkO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdCQUFnQiwwREFBVTs7QUFFMUI7QUFDQSxXQUFXLG1EQUFHLENBQUMseURBQWU7QUFDOUI7QUFDQSxLQUFLLEVBQUUsbURBQUcsQ0FBQyxzREFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLFNBQVMsbURBQUcsQ0FBQyx5REFBZTtBQUM1QjtBQUNBLEdBQUcsRUFBRSxtREFBRyxDQUFDLG9FQUFpQixRQUFRLG1EQUFHLGNBQWMsbURBQUcsQ0FBQyxzREFBVztBQUNsRTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUV5Qjs7Ozs7Ozs7Ozs7O0FDMURaOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNwSWE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLHVGQUFVOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7O0FBSWIsSUFBSSxJQUFxQztBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCO0FBQ2pCLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsdUJBQXVCO0FBQ3ZCLGVBQWU7QUFDZixrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixZQUFZO0FBQ1osY0FBYztBQUNkLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLG1CQUFtQjtBQUNuQix3QkFBd0I7QUFDeEIseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QixpQkFBaUI7QUFDakIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixjQUFjO0FBQ2QsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQiwwQkFBMEI7QUFDMUIsY0FBYztBQUNkLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7O0FDcExhOztBQUViLElBQUksS0FBcUMsRUFBRSxFQUUxQztBQUNELEVBQUUscUtBQXlEO0FBQzNEOzs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFPLENBQUMscURBQTZCO0FBQ3BEO0FBQ0E7Ozs7Ozs7Ozs7O0FDTkEseUdBQThDOzs7Ozs7Ozs7OztBQ0E5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2TGtDOztBQUU3QjtBQUNGO0FBQ1U7QUFDTjtBQUNOO0FBQ0k7QUFDUTtBQUNKO0FBQytDO0FBQ2hDO0FBQ2pCO0FBQ0U7QUFDUTtBQUNOO0FBQ0Y7QUFDUTtBQUNKO0FBQ1I7QUFDSTtBQUNxQztBQUNDO0FBQ3JGLFlBQVksZ0VBQVk7QUFDeEIsYUFBYSxpRUFBYTtBQUMxQixlQUFlLG1FQUFlO0FBQzlCLGdCQUFnQixvRUFBZ0I7QUFDaEMsZUFBZSxtRUFBZTtBQUM5QixnQkFBZ0Isb0VBQWdCO0FBQ2hDLFdBQVcsK0RBQVc7QUFDdEIsb0JBQW9CLHdFQUFvQjtBQUN4QyxjQUFjLGtFQUFjO0FBQzVCLGVBQWUsbUVBQWU7QUFDOUIsZ0JBQWdCLG9FQUFnQjtBQUNoQyxnQkFBZ0Isb0VBQWdCO0FBQ2hDLGNBQWMsaUVBQWE7QUFDM0IsZUFBZSx1RUFBbUI7QUFDbEMsaUJBQWlCLHlFQUFxQjtBQUN0QyxpQkFBaUIseUVBQXFCO0FBQ3RDLGlCQUFpQix5RUFBcUI7QUFDdEMsZ0JBQWdCLHdFQUFvQjtBQUNwQyxnQkFBZ0Isd0VBQW9CO0FBQ3BDLG9CQUFvQiw0RUFBd0I7QUFDNUMsaUJBQWlCLHNFQUFrQjtBQUNuQyxtQkFBbUIsd0VBQW9CO0FBQ3ZDLG1CQUFtQix3RUFBb0I7QUFDdkMscUJBQXFCLDBFQUFzQjtBQUMzQyxlQUFlLG9FQUFnQjtBQUMvQixvQkFBb0IseUVBQXFCO0FBQ3pDLFdBQVcsZ0VBQVk7QUFDdkIsZUFBZSxvRUFBZ0I7QUFDL0IsaUJBQWlCLHNFQUFrQjtBQUNuQyxnQkFBZ0IscUVBQWlCO0FBQ2pDLGtCQUFrQix1RUFBbUI7QUFDckMsZ0JBQWdCLHFFQUFpQjtBQUNqQyxZQUFZLGlFQUFhO0FBQ3pCLGNBQWMsZ0VBQVk7QUFDMUIsb0JBQW9CLHNFQUFrQjtBQUN0QyxpQkFBaUIsbUVBQWU7QUFDaEMsaUJBQWlCLG1FQUFlO0FBQ2hDLGNBQWMsZ0VBQVk7QUFDMUIsbUJBQW1CLHFFQUFpQjtBQUNwQyxzQkFBc0Isd0VBQW9CO0FBQzFDLG1CQUFtQixxRUFBaUI7QUFDcEMsMEJBQTBCLDRFQUF3QjtBQUNsRCx1QkFBdUIseUVBQXFCO0FBQzVDLHdCQUF3QiwwRUFBc0I7QUFDOUMsZUFBZSxpRUFBYTtBQUM1QixrQkFBa0Isc0VBQWtCO0FBQ3BDLGtCQUFrQixzRUFBa0I7QUFDcEMsa0JBQWtCLHNFQUFrQjtBQUNwQyxnQkFBZ0Isb0VBQWdCO0FBQ2hDLGtCQUFrQixzRUFBa0I7QUFDcEMsbUJBQW1CLHVFQUFtQjtBQUN0QyxpQkFBaUIscUVBQWlCO0FBQ2xDLG1CQUFtQix1RUFBbUI7QUFDdEMsc0JBQXNCLDhFQUEwQjtBQUNoRCxxQkFBcUIsNkVBQXlCO0FBQzlDLHlCQUF5QixpRkFBNkI7QUFDdEQsdUJBQXVCLCtFQUEyQjtBQUNsRCxhQUFhLG1FQUFlO0FBQzVCLFVBQVUsZ0VBQVk7QUFDdEIsWUFBWSxrRUFBYztBQUMxQixhQUFhLG1FQUFlO0FBQzVCLFdBQVcsaUVBQWE7QUFDbUM7QUFRdEI7O0FBRTlCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix3RUFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGNBQWMsaUVBQVk7QUFDMUI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSDhDO0FBQ3NDO0FBQ1Y7QUFDZjtBQUNGO0FBQ3BCO0FBQ0k7O0FBRXpDLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsWUFBWSwrQ0FBSzs7QUFFVSIsImZpbGUiOiJzdGF0aWMvY2h1bmtzL3BhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJpbXBvcnQgeyBTdHlsZVNoZWV0IH0gZnJvbSAnQGVtb3Rpb24vc2hlZXQnO1xuaW1wb3J0IHsgZGVhbGxvYywgYWxsb2MsIG5leHQsIHRva2VuLCBmcm9tLCBwZWVrLCBkZWxpbWl0LCBpZGVudGlmaWVyLCBwb3NpdGlvbiwgc3RyaW5naWZ5LCBDT01NRU5ULCBydWxlc2hlZXQsIG1pZGRsZXdhcmUsIHByZWZpeGVyLCBzZXJpYWxpemUsIGNvbXBpbGUgfSBmcm9tICdzdHlsaXMnO1xuaW1wb3J0ICdAZW1vdGlvbi93ZWFrLW1lbW9pemUnO1xuaW1wb3J0ICdAZW1vdGlvbi9tZW1vaXplJztcblxudmFyIGxhc3QgPSBmdW5jdGlvbiBsYXN0KGFycikge1xuICByZXR1cm4gYXJyLmxlbmd0aCA/IGFyclthcnIubGVuZ3RoIC0gMV0gOiBudWxsO1xufTtcblxudmFyIHRvUnVsZXMgPSBmdW5jdGlvbiB0b1J1bGVzKHBhcnNlZCwgcG9pbnRzKSB7XG4gIC8vIHByZXRlbmQgd2UndmUgc3RhcnRlZCB3aXRoIGEgY29tbWFcbiAgdmFyIGluZGV4ID0gLTE7XG4gIHZhciBjaGFyYWN0ZXIgPSA0NDtcblxuICBkbyB7XG4gICAgc3dpdGNoICh0b2tlbihjaGFyYWN0ZXIpKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIC8vICZcXGZcbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gMzggJiYgcGVlaygpID09PSAxMikge1xuICAgICAgICAgIC8vIHRoaXMgaXMgbm90IDEwMCUgY29ycmVjdCwgd2UgZG9uJ3QgYWNjb3VudCBmb3IgbGl0ZXJhbCBzZXF1ZW5jZXMgaGVyZSAtIGxpa2UgZm9yIGV4YW1wbGUgcXVvdGVkIHN0cmluZ3NcbiAgICAgICAgICAvLyBzdHlsaXMgaW5zZXJ0cyBcXGYgYWZ0ZXIgJiB0byBrbm93IHdoZW4gJiB3aGVyZSBpdCBzaG91bGQgcmVwbGFjZSB0aGlzIHNlcXVlbmNlIHdpdGggdGhlIGNvbnRleHQgc2VsZWN0b3JcbiAgICAgICAgICAvLyBhbmQgd2hlbiBpdCBzaG91bGQganVzdCBjb25jYXRlbmF0ZSB0aGUgb3V0ZXIgYW5kIGlubmVyIHNlbGVjdG9yc1xuICAgICAgICAgIC8vIGl0J3MgdmVyeSB1bmxpa2VseSBmb3IgdGhpcyBzZXF1ZW5jZSB0byBhY3R1YWxseSBhcHBlYXIgaW4gYSBkaWZmZXJlbnQgY29udGV4dCwgc28gd2UganVzdCBsZXZlcmFnZSB0aGlzIGZhY3QgaGVyZVxuICAgICAgICAgIHBvaW50c1tpbmRleF0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyc2VkW2luZGV4XSArPSBpZGVudGlmaWVyKHBvc2l0aW9uIC0gMSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHBhcnNlZFtpbmRleF0gKz0gZGVsaW1pdChjaGFyYWN0ZXIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0OlxuICAgICAgICAvLyBjb21tYVxuICAgICAgICBpZiAoY2hhcmFjdGVyID09PSA0NCkge1xuICAgICAgICAgIC8vIGNvbG9uXG4gICAgICAgICAgcGFyc2VkWysraW5kZXhdID0gcGVlaygpID09PSA1OCA/ICcmXFxmJyA6ICcnO1xuICAgICAgICAgIHBvaW50c1tpbmRleF0gPSBwYXJzZWRbaW5kZXhdLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAvLyBmYWxsdGhyb3VnaFxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwYXJzZWRbaW5kZXhdICs9IGZyb20oY2hhcmFjdGVyKTtcbiAgICB9XG4gIH0gd2hpbGUgKGNoYXJhY3RlciA9IG5leHQoKSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbnZhciBnZXRSdWxlcyA9IGZ1bmN0aW9uIGdldFJ1bGVzKHZhbHVlLCBwb2ludHMpIHtcbiAgcmV0dXJuIGRlYWxsb2ModG9SdWxlcyhhbGxvYyh2YWx1ZSksIHBvaW50cykpO1xufTsgLy8gV2Vha1NldCB3b3VsZCBiZSBtb3JlIGFwcHJvcHJpYXRlLCBidXQgb25seSBXZWFrTWFwIGlzIHN1cHBvcnRlZCBpbiBJRTExXG5cblxudmFyIGZpeGVkRWxlbWVudHMgPSAvKiAjX19QVVJFX18gKi9uZXcgV2Vha01hcCgpO1xudmFyIGNvbXBhdCA9IGZ1bmN0aW9uIGNvbXBhdChlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50LnR5cGUgIT09ICdydWxlJyB8fCAhZWxlbWVudC5wYXJlbnQgfHwgLy8gLmxlbmd0aCBpbmRpY2F0ZXMgaWYgdGhpcyBydWxlIGNvbnRhaW5zIHBzZXVkbyBvciBub3RcbiAgIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHZhbHVlID0gZWxlbWVudC52YWx1ZSxcbiAgICAgIHBhcmVudCA9IGVsZW1lbnQucGFyZW50O1xuICB2YXIgaXNJbXBsaWNpdFJ1bGUgPSBlbGVtZW50LmNvbHVtbiA9PT0gcGFyZW50LmNvbHVtbiAmJiBlbGVtZW50LmxpbmUgPT09IHBhcmVudC5saW5lO1xuXG4gIHdoaWxlIChwYXJlbnQudHlwZSAhPT0gJ3J1bGUnKSB7XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xuICB9IC8vIHNob3J0LWNpcmN1aXQgZm9yIHRoZSBzaW1wbGVzdCBjYXNlXG5cblxuICBpZiAoZWxlbWVudC5wcm9wcy5sZW5ndGggPT09IDEgJiYgdmFsdWUuY2hhckNvZGVBdCgwKSAhPT0gNThcbiAgLyogY29sb24gKi9cbiAgJiYgIWZpeGVkRWxlbWVudHMuZ2V0KHBhcmVudCkpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gaWYgdGhpcyBpcyBhbiBpbXBsaWNpdGx5IGluc2VydGVkIHJ1bGUgKHRoZSBvbmUgZWFnZXJseSBpbnNlcnRlZCBhdCB0aGUgZWFjaCBuZXcgbmVzdGVkIGxldmVsKVxuICAvLyB0aGVuIHRoZSBwcm9wcyBoYXMgYWxyZWFkeSBiZWVuIG1hbmlwdWxhdGVkIGJlZm9yZWhhbmQgYXMgdGhleSB0aGF0IGFycmF5IGlzIHNoYXJlZCBiZXR3ZWVuIGl0IGFuZCBpdHMgXCJydWxlIHBhcmVudFwiXG5cblxuICBpZiAoaXNJbXBsaWNpdFJ1bGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmaXhlZEVsZW1lbnRzLnNldChlbGVtZW50LCB0cnVlKTtcbiAgdmFyIHBvaW50cyA9IFtdO1xuICB2YXIgcnVsZXMgPSBnZXRSdWxlcyh2YWx1ZSwgcG9pbnRzKTtcbiAgdmFyIHBhcmVudFJ1bGVzID0gcGFyZW50LnByb3BzO1xuXG4gIGZvciAodmFyIGkgPSAwLCBrID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYXJlbnRSdWxlcy5sZW5ndGg7IGorKywgaysrKSB7XG4gICAgICBlbGVtZW50LnByb3BzW2tdID0gcG9pbnRzW2ldID8gcnVsZXNbaV0ucmVwbGFjZSgvJlxcZi9nLCBwYXJlbnRSdWxlc1tqXSkgOiBwYXJlbnRSdWxlc1tqXSArIFwiIFwiICsgcnVsZXNbaV07XG4gICAgfVxuICB9XG59O1xudmFyIHJlbW92ZUxhYmVsID0gZnVuY3Rpb24gcmVtb3ZlTGFiZWwoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC50eXBlID09PSAnZGVjbCcpIHtcbiAgICB2YXIgdmFsdWUgPSBlbGVtZW50LnZhbHVlO1xuXG4gICAgaWYgKCAvLyBjaGFyY29kZSBmb3IgbFxuICAgIHZhbHVlLmNoYXJDb2RlQXQoMCkgPT09IDEwOCAmJiAvLyBjaGFyY29kZSBmb3IgYlxuICAgIHZhbHVlLmNoYXJDb2RlQXQoMikgPT09IDk4KSB7XG4gICAgICAvLyB0aGlzIGlnbm9yZXMgbGFiZWxcbiAgICAgIGVsZW1lbnRbXCJyZXR1cm5cIl0gPSAnJztcbiAgICAgIGVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG4gIH1cbn07XG52YXIgaWdub3JlRmxhZyA9ICdlbW90aW9uLWRpc2FibGUtc2VydmVyLXJlbmRlcmluZy11bnNhZmUtc2VsZWN0b3Itd2FybmluZy1wbGVhc2UtZG8tbm90LXVzZS10aGlzLXRoZS13YXJuaW5nLWV4aXN0cy1mb3ItYS1yZWFzb24nO1xuXG52YXIgaXNJZ25vcmluZ0NvbW1lbnQgPSBmdW5jdGlvbiBpc0lnbm9yaW5nQ29tbWVudChlbGVtZW50KSB7XG4gIHJldHVybiAhIWVsZW1lbnQgJiYgZWxlbWVudC50eXBlID09PSAnY29tbScgJiYgZWxlbWVudC5jaGlsZHJlbi5pbmRleE9mKGlnbm9yZUZsYWcpID4gLTE7XG59O1xuXG52YXIgY3JlYXRlVW5zYWZlU2VsZWN0b3JzQWxhcm0gPSBmdW5jdGlvbiBjcmVhdGVVbnNhZmVTZWxlY3RvcnNBbGFybShjYWNoZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4LCBjaGlsZHJlbikge1xuICAgIGlmIChlbGVtZW50LnR5cGUgIT09ICdydWxlJykgcmV0dXJuO1xuICAgIHZhciB1bnNhZmVQc2V1ZG9DbGFzc2VzID0gZWxlbWVudC52YWx1ZS5tYXRjaCgvKDpmaXJzdHw6bnRofDpudGgtbGFzdCktY2hpbGQvZyk7XG5cbiAgICBpZiAodW5zYWZlUHNldWRvQ2xhc3NlcyAmJiBjYWNoZS5jb21wYXQgIT09IHRydWUpIHtcbiAgICAgIHZhciBwcmV2RWxlbWVudCA9IGluZGV4ID4gMCA/IGNoaWxkcmVuW2luZGV4IC0gMV0gOiBudWxsO1xuXG4gICAgICBpZiAocHJldkVsZW1lbnQgJiYgaXNJZ25vcmluZ0NvbW1lbnQobGFzdChwcmV2RWxlbWVudC5jaGlsZHJlbikpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdW5zYWZlUHNldWRvQ2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uICh1bnNhZmVQc2V1ZG9DbGFzcykge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIHBzZXVkbyBjbGFzcyBcXFwiXCIgKyB1bnNhZmVQc2V1ZG9DbGFzcyArIFwiXFxcIiBpcyBwb3RlbnRpYWxseSB1bnNhZmUgd2hlbiBkb2luZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuIFRyeSBjaGFuZ2luZyBpdCB0byBcXFwiXCIgKyB1bnNhZmVQc2V1ZG9DbGFzcy5zcGxpdCgnLWNoaWxkJylbMF0gKyBcIi1vZi10eXBlXFxcIi5cIik7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgaXNJbXBvcnRSdWxlID0gZnVuY3Rpb24gaXNJbXBvcnRSdWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQudHlwZS5jaGFyQ29kZUF0KDEpID09PSAxMDUgJiYgZWxlbWVudC50eXBlLmNoYXJDb2RlQXQoMCkgPT09IDY0O1xufTtcblxudmFyIGlzUHJlcGVuZGVkV2l0aFJlZ3VsYXJSdWxlcyA9IGZ1bmN0aW9uIGlzUHJlcGVuZGVkV2l0aFJlZ3VsYXJSdWxlcyhpbmRleCwgY2hpbGRyZW4pIHtcbiAgZm9yICh2YXIgaSA9IGluZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoIWlzSW1wb3J0UnVsZShjaGlsZHJlbltpXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07IC8vIHVzZSB0aGlzIHRvIHJlbW92ZSBpbmNvcnJlY3QgZWxlbWVudHMgZnJvbSBmdXJ0aGVyIHByb2Nlc3Npbmdcbi8vIHNvIHRoZXkgZG9uJ3QgZ2V0IGhhbmRlZCB0byB0aGUgYHNoZWV0YCAob3IgYW55dGhpbmcgZWxzZSlcbi8vIGFzIHRoYXQgY291bGQgcG90ZW50aWFsbHkgbGVhZCB0byBhZGRpdGlvbmFsIGxvZ3Mgd2hpY2ggaW4gdHVybiBjb3VsZCBiZSBvdmVyaGVsbWluZyB0byB0aGUgdXNlclxuXG5cbnZhciBudWxsaWZ5RWxlbWVudCA9IGZ1bmN0aW9uIG51bGxpZnlFbGVtZW50KGVsZW1lbnQpIHtcbiAgZWxlbWVudC50eXBlID0gJyc7XG4gIGVsZW1lbnQudmFsdWUgPSAnJztcbiAgZWxlbWVudFtcInJldHVyblwiXSA9ICcnO1xuICBlbGVtZW50LmNoaWxkcmVuID0gJyc7XG4gIGVsZW1lbnQucHJvcHMgPSAnJztcbn07XG5cbnZhciBpbmNvcnJlY3RJbXBvcnRBbGFybSA9IGZ1bmN0aW9uIGluY29ycmVjdEltcG9ydEFsYXJtKGVsZW1lbnQsIGluZGV4LCBjaGlsZHJlbikge1xuICBpZiAoIWlzSW1wb3J0UnVsZShlbGVtZW50KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlbGVtZW50LnBhcmVudCkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJgQGltcG9ydGAgcnVsZXMgY2FuJ3QgYmUgbmVzdGVkIGluc2lkZSBvdGhlciBydWxlcy4gUGxlYXNlIG1vdmUgaXQgdG8gdGhlIHRvcCBsZXZlbCBhbmQgcHV0IGl0IGJlZm9yZSByZWd1bGFyIHJ1bGVzLiBLZWVwIGluIG1pbmQgdGhhdCB0aGV5IGNhbiBvbmx5IGJlIHVzZWQgd2l0aGluIGdsb2JhbCBzdHlsZXMuXCIpO1xuICAgIG51bGxpZnlFbGVtZW50KGVsZW1lbnQpO1xuICB9IGVsc2UgaWYgKGlzUHJlcGVuZGVkV2l0aFJlZ3VsYXJSdWxlcyhpbmRleCwgY2hpbGRyZW4pKSB7XG4gICAgY29uc29sZS5lcnJvcihcImBAaW1wb3J0YCBydWxlcyBjYW4ndCBiZSBhZnRlciBvdGhlciBydWxlcy4gUGxlYXNlIHB1dCB5b3VyIGBAaW1wb3J0YCBydWxlcyBiZWZvcmUgeW91ciBvdGhlciBydWxlcy5cIik7XG4gICAgbnVsbGlmeUVsZW1lbnQoZWxlbWVudCk7XG4gIH1cbn07XG5cbnZhciBkZWZhdWx0U3R5bGlzUGx1Z2lucyA9IFtwcmVmaXhlcl07XG5cbnZhciBjcmVhdGVDYWNoZSA9IGZ1bmN0aW9uIGNyZWF0ZUNhY2hlKG9wdGlvbnMpIHtcbiAgdmFyIGtleSA9IG9wdGlvbnMua2V5O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFrZXkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgaGF2ZSB0byBjb25maWd1cmUgYGtleWAgZm9yIHlvdXIgY2FjaGUuIFBsZWFzZSBtYWtlIHN1cmUgaXQncyB1bmlxdWUgKGFuZCBub3QgZXF1YWwgdG8gJ2NzcycpIGFzIGl0J3MgdXNlZCBmb3IgbGlua2luZyBzdHlsZXMgdG8geW91ciBjYWNoZS5cXG5cIiArIFwiSWYgbXVsdGlwbGUgY2FjaGVzIHNoYXJlIHRoZSBzYW1lIGtleSB0aGV5IG1pZ2h0IFxcXCJmaWdodFxcXCIgZm9yIGVhY2ggb3RoZXIncyBzdHlsZSBlbGVtZW50cy5cIik7XG4gIH1cblxuICBpZiAoIGtleSA9PT0gJ2NzcycpIHtcbiAgICB2YXIgc3NyU3R5bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN0eWxlW2RhdGEtZW1vdGlvbl06bm90KFtkYXRhLXNdKVwiKTsgLy8gZ2V0IFNTUmVkIHN0eWxlcyBvdXQgb2YgdGhlIHdheSBvZiBSZWFjdCdzIGh5ZHJhdGlvblxuICAgIC8vIGRvY3VtZW50LmhlYWQgaXMgYSBzYWZlIHBsYWNlIHRvIG1vdmUgdGhlbSB0byh0aG91Z2ggbm90ZSBkb2N1bWVudC5oZWFkIGlzIG5vdCBuZWNlc3NhcmlseSB0aGUgbGFzdCBwbGFjZSB0aGV5IHdpbGwgYmUpXG4gICAgLy8gbm90ZSB0aGlzIHZlcnkgdmVyeSBpbnRlbnRpb25hbGx5IHRhcmdldHMgYWxsIHN0eWxlIGVsZW1lbnRzIHJlZ2FyZGxlc3Mgb2YgdGhlIGtleSB0byBlbnN1cmVcbiAgICAvLyB0aGF0IGNyZWF0aW5nIGEgY2FjaGUgd29ya3MgaW5zaWRlIG9mIHJlbmRlciBvZiBhIFJlYWN0IGNvbXBvbmVudFxuXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChzc3JTdHlsZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAvLyB3ZSB3YW50IHRvIG9ubHkgbW92ZSBlbGVtZW50cyB3aGljaCBoYXZlIGEgc3BhY2UgaW4gdGhlIGRhdGEtZW1vdGlvbiBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgIC8vIGJlY2F1c2UgdGhhdCBpbmRpY2F0ZXMgdGhhdCBpdCBpcyBhbiBFbW90aW9uIDExIHNlcnZlci1zaWRlIHJlbmRlcmVkIHN0eWxlIGVsZW1lbnRzXG4gICAgICAvLyB3aGlsZSB3ZSB3aWxsIGFscmVhZHkgaWdub3JlIEVtb3Rpb24gMTEgY2xpZW50LXNpZGUgaW5zZXJ0ZWQgc3R5bGVzIGJlY2F1c2Ugb2YgdGhlIDpub3QoW2RhdGEtc10pIHBhcnQgaW4gdGhlIHNlbGVjdG9yXG4gICAgICAvLyBFbW90aW9uIDEwIGNsaWVudC1zaWRlIGluc2VydGVkIHN0eWxlcyBkaWQgbm90IGhhdmUgZGF0YS1zIChidXQgaW1wb3J0YW50bHkgZGlkIG5vdCBoYXZlIGEgc3BhY2UgaW4gdGhlaXIgZGF0YS1lbW90aW9uIGF0dHJpYnV0ZXMpXG4gICAgICAvLyBzbyBjaGVja2luZyBmb3IgdGhlIHNwYWNlIGVuc3VyZXMgdGhhdCBsb2FkaW5nIEVtb3Rpb24gMTEgYWZ0ZXIgRW1vdGlvbiAxMCBoYXMgaW5zZXJ0ZWQgc29tZSBzdHlsZXNcbiAgICAgIC8vIHdpbGwgbm90IHJlc3VsdCBpbiB0aGUgRW1vdGlvbiAxMCBzdHlsZXMgYmVpbmcgZGVzdHJveWVkXG4gICAgICB2YXIgZGF0YUVtb3Rpb25BdHRyaWJ1dGUgPSBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1lbW90aW9uJyk7XG5cbiAgICAgIGlmIChkYXRhRW1vdGlvbkF0dHJpYnV0ZS5pbmRleE9mKCcgJykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1zJywgJycpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHN0eWxpc1BsdWdpbnMgPSBvcHRpb25zLnN0eWxpc1BsdWdpbnMgfHwgZGVmYXVsdFN0eWxpc1BsdWdpbnM7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyAkRmxvd0ZpeE1lXG4gICAgaWYgKC9bXmEtei1dLy50ZXN0KGtleSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtb3Rpb24ga2V5IG11c3Qgb25seSBjb250YWluIGxvd2VyIGNhc2UgYWxwaGFiZXRpY2FsIGNoYXJhY3RlcnMgYW5kIC0gYnV0IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgcGFzc2VkXCIpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbnNlcnRlZCA9IHt9OyAvLyAkRmxvd0ZpeE1lXG5cbiAgdmFyIGNvbnRhaW5lcjtcbiAgdmFyIG5vZGVzVG9IeWRyYXRlID0gW107XG5cbiAge1xuICAgIGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IGRvY3VtZW50LmhlYWQ7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCggLy8gdGhpcyBtZWFucyB3ZSB3aWxsIGlnbm9yZSBlbGVtZW50cyB3aGljaCBkb24ndCBoYXZlIGEgc3BhY2UgaW4gdGhlbSB3aGljaFxuICAgIC8vIG1lYW5zIHRoYXQgdGhlIHN0eWxlIGVsZW1lbnRzIHdlJ3JlIGxvb2tpbmcgYXQgYXJlIG9ubHkgRW1vdGlvbiAxMSBzZXJ2ZXItcmVuZGVyZWQgc3R5bGUgZWxlbWVudHNcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3R5bGVbZGF0YS1lbW90aW9uXj1cXFwiXCIgKyBrZXkgKyBcIiBcXFwiXVwiKSwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHZhciBhdHRyaWIgPSBub2RlLmdldEF0dHJpYnV0ZShcImRhdGEtZW1vdGlvblwiKS5zcGxpdCgnICcpOyAvLyAkRmxvd0ZpeE1lXG5cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXR0cmliLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluc2VydGVkW2F0dHJpYltpXV0gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBub2Rlc1RvSHlkcmF0ZS5wdXNoKG5vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9pbnNlcnQ7XG5cbiAgdmFyIG9tbmlwcmVzZW50UGx1Z2lucyA9IFtjb21wYXQsIHJlbW92ZUxhYmVsXTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIG9tbmlwcmVzZW50UGx1Z2lucy5wdXNoKGNyZWF0ZVVuc2FmZVNlbGVjdG9yc0FsYXJtKHtcbiAgICAgIGdldCBjb21wYXQoKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5jb21wYXQ7XG4gICAgICB9XG5cbiAgICB9KSwgaW5jb3JyZWN0SW1wb3J0QWxhcm0pO1xuICB9XG5cbiAge1xuICAgIHZhciBjdXJyZW50U2hlZXQ7XG4gICAgdmFyIGZpbmFsaXppbmdQbHVnaW5zID0gW3N0cmluZ2lmeSwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICBpZiAoIWVsZW1lbnQucm9vdCkge1xuICAgICAgICBpZiAoZWxlbWVudFtcInJldHVyblwiXSkge1xuICAgICAgICAgIGN1cnJlbnRTaGVldC5pbnNlcnQoZWxlbWVudFtcInJldHVyblwiXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC52YWx1ZSAmJiBlbGVtZW50LnR5cGUgIT09IENPTU1FTlQpIHtcbiAgICAgICAgICAvLyBpbnNlcnQgZW1wdHkgcnVsZSBpbiBub24tcHJvZHVjdGlvbiBlbnZpcm9ubWVudHNcbiAgICAgICAgICAvLyBzbyBAZW1vdGlvbi9qZXN0IGNhbiBncmFiIGBrZXlgIGZyb20gdGhlIChKUylET00gZm9yIGNhY2hlcyB3aXRob3V0IGFueSBydWxlcyBpbnNlcnRlZCB5ZXRcbiAgICAgICAgICBjdXJyZW50U2hlZXQuaW5zZXJ0KGVsZW1lbnQudmFsdWUgKyBcInt9XCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSA6IHJ1bGVzaGVldChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgY3VycmVudFNoZWV0Lmluc2VydChydWxlKTtcbiAgICB9KV07XG4gICAgdmFyIHNlcmlhbGl6ZXIgPSBtaWRkbGV3YXJlKG9tbmlwcmVzZW50UGx1Z2lucy5jb25jYXQoc3R5bGlzUGx1Z2lucywgZmluYWxpemluZ1BsdWdpbnMpKTtcblxuICAgIHZhciBzdHlsaXMgPSBmdW5jdGlvbiBzdHlsaXMoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gc2VyaWFsaXplKGNvbXBpbGUoc3R5bGVzKSwgc2VyaWFsaXplcik7XG4gICAgfTtcblxuICAgIF9pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQoc2VsZWN0b3IsIHNlcmlhbGl6ZWQsIHNoZWV0LCBzaG91bGRDYWNoZSkge1xuICAgICAgY3VycmVudFNoZWV0ID0gc2hlZXQ7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHNlcmlhbGl6ZWQubWFwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3VycmVudFNoZWV0ID0ge1xuICAgICAgICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KHJ1bGUpIHtcbiAgICAgICAgICAgIHNoZWV0Lmluc2VydChydWxlICsgc2VyaWFsaXplZC5tYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgc3R5bGlzKHNlbGVjdG9yID8gc2VsZWN0b3IgKyBcIntcIiArIHNlcmlhbGl6ZWQuc3R5bGVzICsgXCJ9XCIgOiBzZXJpYWxpemVkLnN0eWxlcyk7XG5cbiAgICAgIGlmIChzaG91bGRDYWNoZSkge1xuICAgICAgICBjYWNoZS5pbnNlcnRlZFtzZXJpYWxpemVkLm5hbWVdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIGNhY2hlID0ge1xuICAgIGtleToga2V5LFxuICAgIHNoZWV0OiBuZXcgU3R5bGVTaGVldCh7XG4gICAgICBrZXk6IGtleSxcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgbm9uY2U6IG9wdGlvbnMubm9uY2UsXG4gICAgICBzcGVlZHk6IG9wdGlvbnMuc3BlZWR5LFxuICAgICAgcHJlcGVuZDogb3B0aW9ucy5wcmVwZW5kXG4gICAgfSksXG4gICAgbm9uY2U6IG9wdGlvbnMubm9uY2UsXG4gICAgaW5zZXJ0ZWQ6IGluc2VydGVkLFxuICAgIHJlZ2lzdGVyZWQ6IHt9LFxuICAgIGluc2VydDogX2luc2VydFxuICB9O1xuICBjYWNoZS5zaGVldC5oeWRyYXRlKG5vZGVzVG9IeWRyYXRlKTtcbiAgcmV0dXJuIGNhY2hlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ2FjaGU7XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYy9FbnVtLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvVXRpbGl0eS5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL1BhcnNlci5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL1ByZWZpeGVyLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvVG9rZW5pemVyLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvU2VyaWFsaXplci5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL01pZGRsZXdhcmUuanMnXG4iLCJleHBvcnQgdmFyIE1TID0gJy1tcy0nXG5leHBvcnQgdmFyIE1PWiA9ICctbW96LSdcbmV4cG9ydCB2YXIgV0VCS0lUID0gJy13ZWJraXQtJ1xuXG5leHBvcnQgdmFyIENPTU1FTlQgPSAnY29tbSdcbmV4cG9ydCB2YXIgUlVMRVNFVCA9ICdydWxlJ1xuZXhwb3J0IHZhciBERUNMQVJBVElPTiA9ICdkZWNsJ1xuXG5leHBvcnQgdmFyIFBBR0UgPSAnQHBhZ2UnXG5leHBvcnQgdmFyIE1FRElBID0gJ0BtZWRpYSdcbmV4cG9ydCB2YXIgSU1QT1JUID0gJ0BpbXBvcnQnXG5leHBvcnQgdmFyIENIQVJTRVQgPSAnQGNoYXJzZXQnXG5leHBvcnQgdmFyIFZJRVdQT1JUID0gJ0B2aWV3cG9ydCdcbmV4cG9ydCB2YXIgU1VQUE9SVFMgPSAnQHN1cHBvcnRzJ1xuZXhwb3J0IHZhciBET0NVTUVOVCA9ICdAZG9jdW1lbnQnXG5leHBvcnQgdmFyIE5BTUVTUEFDRSA9ICdAbmFtZXNwYWNlJ1xuZXhwb3J0IHZhciBLRVlGUkFNRVMgPSAnQGtleWZyYW1lcydcbmV4cG9ydCB2YXIgRk9OVF9GQUNFID0gJ0Bmb250LWZhY2UnXG5leHBvcnQgdmFyIENPVU5URVJfU1RZTEUgPSAnQGNvdW50ZXItc3R5bGUnXG5leHBvcnQgdmFyIEZPTlRfRkVBVFVSRV9WQUxVRVMgPSAnQGZvbnQtZmVhdHVyZS12YWx1ZXMnXG4iLCJpbXBvcnQge01TLCBNT1osIFdFQktJVCwgUlVMRVNFVCwgS0VZRlJBTUVTLCBERUNMQVJBVElPTn0gZnJvbSAnLi9FbnVtLmpzJ1xuaW1wb3J0IHttYXRjaCwgY2hhcmF0LCBzdWJzdHIsIHN0cmxlbiwgc2l6ZW9mLCByZXBsYWNlLCBjb21iaW5lfSBmcm9tICcuL1V0aWxpdHkuanMnXG5pbXBvcnQge2NvcHksIHRva2VuaXplfSBmcm9tICcuL1Rva2VuaXplci5qcydcbmltcG9ydCB7c2VyaWFsaXplfSBmcm9tICcuL1NlcmlhbGl6ZXIuanMnXG5pbXBvcnQge3ByZWZpeH0gZnJvbSAnLi9QcmVmaXhlci5qcydcblxuLyoqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uW119IGNvbGxlY3Rpb25cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZSAoY29sbGVjdGlvbikge1xuXHR2YXIgbGVuZ3RoID0gc2l6ZW9mKGNvbGxlY3Rpb24pXG5cblx0cmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCwgY2hpbGRyZW4sIGNhbGxiYWNrKSB7XG5cdFx0dmFyIG91dHB1dCA9ICcnXG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuXHRcdFx0b3V0cHV0ICs9IGNvbGxlY3Rpb25baV0oZWxlbWVudCwgaW5kZXgsIGNoaWxkcmVuLCBjYWxsYmFjaykgfHwgJydcblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bGVzaGVldCAoY2FsbGJhY2spIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0aWYgKCFlbGVtZW50LnJvb3QpXG5cdFx0XHRpZiAoZWxlbWVudCA9IGVsZW1lbnQucmV0dXJuKVxuXHRcdFx0XHRjYWxsYmFjayhlbGVtZW50KVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHtvYmplY3RbXX0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVmaXhlciAoZWxlbWVudCwgaW5kZXgsIGNoaWxkcmVuLCBjYWxsYmFjaykge1xuXHRpZiAoIWVsZW1lbnQucmV0dXJuKVxuXHRcdHN3aXRjaCAoZWxlbWVudC50eXBlKSB7XG5cdFx0XHRjYXNlIERFQ0xBUkFUSU9OOiBlbGVtZW50LnJldHVybiA9IHByZWZpeChlbGVtZW50LnZhbHVlLCBlbGVtZW50Lmxlbmd0aClcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgS0VZRlJBTUVTOlxuXHRcdFx0XHRyZXR1cm4gc2VyaWFsaXplKFtjb3B5KHJlcGxhY2UoZWxlbWVudC52YWx1ZSwgJ0AnLCAnQCcgKyBXRUJLSVQpLCBlbGVtZW50LCAnJyldLCBjYWxsYmFjaylcblx0XHRcdGNhc2UgUlVMRVNFVDpcblx0XHRcdFx0aWYgKGVsZW1lbnQubGVuZ3RoKVxuXHRcdFx0XHRcdHJldHVybiBjb21iaW5lKGVsZW1lbnQucHJvcHMsIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtYXRjaCh2YWx1ZSwgLyg6OnBsYWNcXHcrfDpyZWFkLVxcdyspLykpIHtcblx0XHRcdFx0XHRcdFx0Ly8gOnJlYWQtKG9ubHl8d3JpdGUpXG5cdFx0XHRcdFx0XHRcdGNhc2UgJzpyZWFkLW9ubHknOiBjYXNlICc6cmVhZC13cml0ZSc6XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNlcmlhbGl6ZShbY29weShyZXBsYWNlKHZhbHVlLCAvOihyZWFkLVxcdyspLywgJzonICsgTU9aICsgJyQxJyksIGVsZW1lbnQsICcnKV0sIGNhbGxiYWNrKVxuXHRcdFx0XHRcdFx0XHQvLyA6cGxhY2Vob2xkZXJcblx0XHRcdFx0XHRcdFx0Y2FzZSAnOjpwbGFjZWhvbGRlcic6XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNlcmlhbGl6ZShbXG5cdFx0XHRcdFx0XHRcdFx0XHRjb3B5KHJlcGxhY2UodmFsdWUsIC86KHBsYWNcXHcrKS8sICc6JyArIFdFQktJVCArICdpbnB1dC0kMScpLCBlbGVtZW50LCAnJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRjb3B5KHJlcGxhY2UodmFsdWUsIC86KHBsYWNcXHcrKS8sICc6JyArIE1PWiArICckMScpLCBlbGVtZW50LCAnJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRjb3B5KHJlcGxhY2UodmFsdWUsIC86KHBsYWNcXHcrKS8sIE1TICsgJ2lucHV0LSQxJyksIGVsZW1lbnQsICcnKVxuXHRcdFx0XHRcdFx0XHRcdF0sIGNhbGxiYWNrKVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gJydcblx0XHRcdFx0XHR9KVxuXHRcdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge29iamVjdFtdfSBjaGlsZHJlblxuICovXG5leHBvcnQgZnVuY3Rpb24gbmFtZXNwYWNlIChlbGVtZW50KSB7XG5cdHN3aXRjaCAoZWxlbWVudC50eXBlKSB7XG5cdFx0Y2FzZSBSVUxFU0VUOlxuXHRcdFx0ZWxlbWVudC5wcm9wcyA9IGVsZW1lbnQucHJvcHMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gY29tYmluZSh0b2tlbml6ZSh2YWx1ZSksIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChjaGFyYXQodmFsdWUsIDApKSB7XG5cdFx0XHRcdFx0XHQvLyBcXGZcblx0XHRcdFx0XHRcdGNhc2UgMTI6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzdWJzdHIodmFsdWUsIDEsIHN0cmxlbih2YWx1ZSkpXG5cdFx0XHRcdFx0XHQvLyBcXDAgKCArID4gflxuXHRcdFx0XHRcdFx0Y2FzZSAwOiBjYXNlIDQwOiBjYXNlIDQzOiBjYXNlIDYyOiBjYXNlIDEyNjpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdFx0XHQvLyA6XG5cdFx0XHRcdFx0XHRjYXNlIDU4OlxuXHRcdFx0XHRcdFx0XHRpZiAoY2hpbGRyZW5bKytpbmRleF0gPT09ICdnbG9iYWwnKVxuXHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuW2luZGV4XSA9ICcnLCBjaGlsZHJlblsrK2luZGV4XSA9ICdcXGYnICsgc3Vic3RyKGNoaWxkcmVuW2luZGV4XSwgaW5kZXggPSAxLCAtMSlcblx0XHRcdFx0XHRcdC8vIFxcc1xuXHRcdFx0XHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGluZGV4ID09PSAxID8gJycgOiB2YWx1ZVxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0c3dpdGNoIChpbmRleCkge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgMDogZWxlbWVudCA9IHZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2l6ZW9mKGNoaWxkcmVuKSA+IDEgPyAnJyA6IHZhbHVlXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBpbmRleCA9IHNpemVvZihjaGlsZHJlbikgLSAxOiBjYXNlIDI6XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5kZXggPT09IDIgPyB2YWx1ZSArIGVsZW1lbnQgKyBlbGVtZW50IDogdmFsdWUgKyBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0fVxufVxuIiwiaW1wb3J0IHtDT01NRU5ULCBSVUxFU0VULCBERUNMQVJBVElPTn0gZnJvbSAnLi9FbnVtLmpzJ1xuaW1wb3J0IHthYnMsIHRyaW0sIGZyb20sIHNpemVvZiwgc3RybGVuLCBzdWJzdHIsIGFwcGVuZCwgcmVwbGFjZX0gZnJvbSAnLi9VdGlsaXR5LmpzJ1xuaW1wb3J0IHtub2RlLCBjaGFyLCBwcmV2LCBuZXh0LCBwZWVrLCBjYXJldCwgYWxsb2MsIGRlYWxsb2MsIGRlbGltaXQsIHdoaXRlc3BhY2UsIGVzY2FwaW5nLCBpZGVudGlmaWVyLCBjb21tZW50ZXJ9IGZyb20gJy4vVG9rZW5pemVyLmpzJ1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7b2JqZWN0W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlICh2YWx1ZSkge1xuXHRyZXR1cm4gZGVhbGxvYyhwYXJzZSgnJywgbnVsbCwgbnVsbCwgbnVsbCwgWycnXSwgdmFsdWUgPSBhbGxvYyh2YWx1ZSksIDAsIFswXSwgdmFsdWUpKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IHJvb3RcbiAqIEBwYXJhbSB7b2JqZWN0P30gcGFyZW50XG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBydWxlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBydWxlc1xuICogQHBhcmFtIHtzdHJpbmdbXX0gcnVsZXNldHNcbiAqIEBwYXJhbSB7bnVtYmVyW119IHBzZXVkb1xuICogQHBhcmFtIHtudW1iZXJbXX0gcG9pbnRzXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBkZWNsYXJhdGlvbnNcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlICh2YWx1ZSwgcm9vdCwgcGFyZW50LCBydWxlLCBydWxlcywgcnVsZXNldHMsIHBzZXVkbywgcG9pbnRzLCBkZWNsYXJhdGlvbnMpIHtcblx0dmFyIGluZGV4ID0gMFxuXHR2YXIgb2Zmc2V0ID0gMFxuXHR2YXIgbGVuZ3RoID0gcHNldWRvXG5cdHZhciBhdHJ1bGUgPSAwXG5cdHZhciBwcm9wZXJ0eSA9IDBcblx0dmFyIHByZXZpb3VzID0gMFxuXHR2YXIgdmFyaWFibGUgPSAxXG5cdHZhciBzY2FubmluZyA9IDFcblx0dmFyIGFtcGVyc2FuZCA9IDFcblx0dmFyIGNoYXJhY3RlciA9IDBcblx0dmFyIHR5cGUgPSAnJ1xuXHR2YXIgcHJvcHMgPSBydWxlc1xuXHR2YXIgY2hpbGRyZW4gPSBydWxlc2V0c1xuXHR2YXIgcmVmZXJlbmNlID0gcnVsZVxuXHR2YXIgY2hhcmFjdGVycyA9IHR5cGVcblxuXHR3aGlsZSAoc2Nhbm5pbmcpXG5cdFx0c3dpdGNoIChwcmV2aW91cyA9IGNoYXJhY3RlciwgY2hhcmFjdGVyID0gbmV4dCgpKSB7XG5cdFx0XHQvLyBcIiAnIFsgKFxuXHRcdFx0Y2FzZSAzNDogY2FzZSAzOTogY2FzZSA5MTogY2FzZSA0MDpcblx0XHRcdFx0Y2hhcmFjdGVycyArPSBkZWxpbWl0KGNoYXJhY3Rlcilcblx0XHRcdFx0YnJlYWtcblx0XHRcdC8vIFxcdCBcXG4gXFxyIFxcc1xuXHRcdFx0Y2FzZSA5OiBjYXNlIDEwOiBjYXNlIDEzOiBjYXNlIDMyOlxuXHRcdFx0XHRjaGFyYWN0ZXJzICs9IHdoaXRlc3BhY2UocHJldmlvdXMpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHQvLyBcXFxuXHRcdFx0Y2FzZSA5Mjpcblx0XHRcdFx0Y2hhcmFjdGVycyArPSBlc2NhcGluZyhjYXJldCgpIC0gMSwgNylcblx0XHRcdFx0Y29udGludWVcblx0XHRcdC8vIC9cblx0XHRcdGNhc2UgNDc6XG5cdFx0XHRcdHN3aXRjaCAocGVlaygpKSB7XG5cdFx0XHRcdFx0Y2FzZSA0MjogY2FzZSA0Nzpcblx0XHRcdFx0XHRcdGFwcGVuZChjb21tZW50KGNvbW1lbnRlcihuZXh0KCksIGNhcmV0KCkpLCByb290LCBwYXJlbnQpLCBkZWNsYXJhdGlvbnMpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRjaGFyYWN0ZXJzICs9ICcvJ1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHQvLyB7XG5cdFx0XHRjYXNlIDEyMyAqIHZhcmlhYmxlOlxuXHRcdFx0XHRwb2ludHNbaW5kZXgrK10gPSBzdHJsZW4oY2hhcmFjdGVycykgKiBhbXBlcnNhbmRcblx0XHRcdC8vIH0gOyBcXDBcblx0XHRcdGNhc2UgMTI1ICogdmFyaWFibGU6IGNhc2UgNTk6IGNhc2UgMDpcblx0XHRcdFx0c3dpdGNoIChjaGFyYWN0ZXIpIHtcblx0XHRcdFx0XHQvLyBcXDAgfVxuXHRcdFx0XHRcdGNhc2UgMDogY2FzZSAxMjU6IHNjYW5uaW5nID0gMFxuXHRcdFx0XHRcdC8vIDtcblx0XHRcdFx0XHRjYXNlIDU5ICsgb2Zmc2V0OlxuXHRcdFx0XHRcdFx0aWYgKHByb3BlcnR5ID4gMCAmJiAoc3RybGVuKGNoYXJhY3RlcnMpIC0gbGVuZ3RoKSlcblx0XHRcdFx0XHRcdFx0YXBwZW5kKHByb3BlcnR5ID4gMzIgPyBkZWNsYXJhdGlvbihjaGFyYWN0ZXJzICsgJzsnLCBydWxlLCBwYXJlbnQsIGxlbmd0aCAtIDEpIDogZGVjbGFyYXRpb24ocmVwbGFjZShjaGFyYWN0ZXJzLCAnICcsICcnKSArICc7JywgcnVsZSwgcGFyZW50LCBsZW5ndGggLSAyKSwgZGVjbGFyYXRpb25zKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvLyBAIDtcblx0XHRcdFx0XHRjYXNlIDU5OiBjaGFyYWN0ZXJzICs9ICc7J1xuXHRcdFx0XHRcdC8vIHsgcnVsZS9hdC1ydWxlXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGFwcGVuZChyZWZlcmVuY2UgPSBydWxlc2V0KGNoYXJhY3RlcnMsIHJvb3QsIHBhcmVudCwgaW5kZXgsIG9mZnNldCwgcnVsZXMsIHBvaW50cywgdHlwZSwgcHJvcHMgPSBbXSwgY2hpbGRyZW4gPSBbXSwgbGVuZ3RoKSwgcnVsZXNldHMpXG5cblx0XHRcdFx0XHRcdGlmIChjaGFyYWN0ZXIgPT09IDEyMylcblx0XHRcdFx0XHRcdFx0aWYgKG9mZnNldCA9PT0gMClcblx0XHRcdFx0XHRcdFx0XHRwYXJzZShjaGFyYWN0ZXJzLCByb290LCByZWZlcmVuY2UsIHJlZmVyZW5jZSwgcHJvcHMsIHJ1bGVzZXRzLCBsZW5ndGgsIHBvaW50cywgY2hpbGRyZW4pXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGF0cnVsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gZCBtIHNcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMTAwOiBjYXNlIDEwOTogY2FzZSAxMTU6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhcnNlKHZhbHVlLCByZWZlcmVuY2UsIHJlZmVyZW5jZSwgcnVsZSAmJiBhcHBlbmQocnVsZXNldCh2YWx1ZSwgcmVmZXJlbmNlLCByZWZlcmVuY2UsIDAsIDAsIHJ1bGVzLCBwb2ludHMsIHR5cGUsIHJ1bGVzLCBwcm9wcyA9IFtdLCBsZW5ndGgpLCBjaGlsZHJlbiksIHJ1bGVzLCBjaGlsZHJlbiwgbGVuZ3RoLCBwb2ludHMsIHJ1bGUgPyBwcm9wcyA6IGNoaWxkcmVuKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFyc2UoY2hhcmFjdGVycywgcmVmZXJlbmNlLCByZWZlcmVuY2UsIHJlZmVyZW5jZSwgWycnXSwgY2hpbGRyZW4sIGxlbmd0aCwgcG9pbnRzLCBjaGlsZHJlbilcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbmRleCA9IG9mZnNldCA9IHByb3BlcnR5ID0gMCwgdmFyaWFibGUgPSBhbXBlcnNhbmQgPSAxLCB0eXBlID0gY2hhcmFjdGVycyA9ICcnLCBsZW5ndGggPSBwc2V1ZG9cblx0XHRcdFx0YnJlYWtcblx0XHRcdC8vIDpcblx0XHRcdGNhc2UgNTg6XG5cdFx0XHRcdGxlbmd0aCA9IDEgKyBzdHJsZW4oY2hhcmFjdGVycyksIHByb3BlcnR5ID0gcHJldmlvdXNcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmICh2YXJpYWJsZSA8IDEpXG5cdFx0XHRcdFx0aWYgKGNoYXJhY3RlciA9PSAxMjMpXG5cdFx0XHRcdFx0XHQtLXZhcmlhYmxlXG5cdFx0XHRcdFx0ZWxzZSBpZiAoY2hhcmFjdGVyID09IDEyNSAmJiB2YXJpYWJsZSsrID09IDAgJiYgcHJldigpID09IDEyNSlcblx0XHRcdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdFx0c3dpdGNoIChjaGFyYWN0ZXJzICs9IGZyb20oY2hhcmFjdGVyKSwgY2hhcmFjdGVyICogdmFyaWFibGUpIHtcblx0XHRcdFx0XHQvLyAmXG5cdFx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRcdGFtcGVyc2FuZCA9IG9mZnNldCA+IDAgPyAxIDogKGNoYXJhY3RlcnMgKz0gJ1xcZicsIC0xKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvLyAsXG5cdFx0XHRcdFx0Y2FzZSA0NDpcblx0XHRcdFx0XHRcdHBvaW50c1tpbmRleCsrXSA9IChzdHJsZW4oY2hhcmFjdGVycykgLSAxKSAqIGFtcGVyc2FuZCwgYW1wZXJzYW5kID0gMVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvLyBAXG5cdFx0XHRcdFx0Y2FzZSA2NDpcblx0XHRcdFx0XHRcdC8vIC1cblx0XHRcdFx0XHRcdGlmIChwZWVrKCkgPT09IDQ1KVxuXHRcdFx0XHRcdFx0XHRjaGFyYWN0ZXJzICs9IGRlbGltaXQobmV4dCgpKVxuXG5cdFx0XHRcdFx0XHRhdHJ1bGUgPSBwZWVrKCksIG9mZnNldCA9IHN0cmxlbih0eXBlID0gY2hhcmFjdGVycyArPSBpZGVudGlmaWVyKGNhcmV0KCkpKSwgY2hhcmFjdGVyKytcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly8gLVxuXHRcdFx0XHRcdGNhc2UgNDU6XG5cdFx0XHRcdFx0XHRpZiAocHJldmlvdXMgPT09IDQ1ICYmIHN0cmxlbihjaGFyYWN0ZXJzKSA9PSAyKVxuXHRcdFx0XHRcdFx0XHR2YXJpYWJsZSA9IDBcblx0XHRcdFx0fVxuXHRcdH1cblxuXHRyZXR1cm4gcnVsZXNldHNcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSByb290XG4gKiBAcGFyYW0ge29iamVjdD99IHBhcmVudFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBydWxlc1xuICogQHBhcmFtIHtudW1iZXJbXX0gcG9pbnRzXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHNcbiAqIEBwYXJhbSB7c3RyaW5nW119IGNoaWxkcmVuXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydWxlc2V0ICh2YWx1ZSwgcm9vdCwgcGFyZW50LCBpbmRleCwgb2Zmc2V0LCBydWxlcywgcG9pbnRzLCB0eXBlLCBwcm9wcywgY2hpbGRyZW4sIGxlbmd0aCkge1xuXHR2YXIgcG9zdCA9IG9mZnNldCAtIDFcblx0dmFyIHJ1bGUgPSBvZmZzZXQgPT09IDAgPyBydWxlcyA6IFsnJ11cblx0dmFyIHNpemUgPSBzaXplb2YocnVsZSlcblxuXHRmb3IgKHZhciBpID0gMCwgaiA9IDAsIGsgPSAwOyBpIDwgaW5kZXg7ICsraSlcblx0XHRmb3IgKHZhciB4ID0gMCwgeSA9IHN1YnN0cih2YWx1ZSwgcG9zdCArIDEsIHBvc3QgPSBhYnMoaiA9IHBvaW50c1tpXSkpLCB6ID0gdmFsdWU7IHggPCBzaXplOyArK3gpXG5cdFx0XHRpZiAoeiA9IHRyaW0oaiA+IDAgPyBydWxlW3hdICsgJyAnICsgeSA6IHJlcGxhY2UoeSwgLyZcXGYvZywgcnVsZVt4XSkpKVxuXHRcdFx0XHRwcm9wc1trKytdID0gelxuXG5cdHJldHVybiBub2RlKHZhbHVlLCByb290LCBwYXJlbnQsIG9mZnNldCA9PT0gMCA/IFJVTEVTRVQgOiB0eXBlLCBwcm9wcywgY2hpbGRyZW4sIGxlbmd0aClcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSByb290XG4gKiBAcGFyYW0ge29iamVjdD99IHBhcmVudFxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWVudCAodmFsdWUsIHJvb3QsIHBhcmVudCkge1xuXHRyZXR1cm4gbm9kZSh2YWx1ZSwgcm9vdCwgcGFyZW50LCBDT01NRU5ULCBmcm9tKGNoYXIoKSksIHN1YnN0cih2YWx1ZSwgMiwgLTIpLCAwKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IHJvb3RcbiAqIEBwYXJhbSB7b2JqZWN0P30gcGFyZW50XG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNsYXJhdGlvbiAodmFsdWUsIHJvb3QsIHBhcmVudCwgbGVuZ3RoKSB7XG5cdHJldHVybiBub2RlKHZhbHVlLCByb290LCBwYXJlbnQsIERFQ0xBUkFUSU9OLCBzdWJzdHIodmFsdWUsIDAsIGxlbmd0aCksIHN1YnN0cih2YWx1ZSwgbGVuZ3RoICsgMSwgLTEpLCBsZW5ndGgpXG59XG4iLCJpbXBvcnQge01TLCBNT1osIFdFQktJVH0gZnJvbSAnLi9FbnVtLmpzJ1xuaW1wb3J0IHtoYXNoLCBjaGFyYXQsIHN0cmxlbiwgaW5kZXhvZiwgcmVwbGFjZX0gZnJvbSAnLi9VdGlsaXR5LmpzJ1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlZml4ICh2YWx1ZSwgbGVuZ3RoKSB7XG5cdHN3aXRjaCAoaGFzaCh2YWx1ZSwgbGVuZ3RoKSkge1xuXHRcdC8vIGNvbG9yLWFkanVzdFxuXHRcdGNhc2UgNTEwMzpcblx0XHRcdHJldHVybiBXRUJLSVQgKyAncHJpbnQtJyArIHZhbHVlICsgdmFsdWVcblx0XHQvLyBhbmltYXRpb24sIGFuaW1hdGlvbi0oZGVsYXl8ZGlyZWN0aW9ufGR1cmF0aW9ufGZpbGwtbW9kZXxpdGVyYXRpb24tY291bnR8bmFtZXxwbGF5LXN0YXRlfHRpbWluZy1mdW5jdGlvbilcblx0XHRjYXNlIDU3Mzc6IGNhc2UgNDIwMTogY2FzZSAzMTc3OiBjYXNlIDM0MzM6IGNhc2UgMTY0MTogY2FzZSA0NDU3OiBjYXNlIDI5MjE6XG5cdFx0Ly8gdGV4dC1kZWNvcmF0aW9uLCBmaWx0ZXIsIGNsaXAtcGF0aCwgYmFja2ZhY2UtdmlzaWJpbGl0eSwgY29sdW1uLCBib3gtZGVjb3JhdGlvbi1icmVha1xuXHRcdGNhc2UgNTU3MjogY2FzZSA2MzU2OiBjYXNlIDU4NDQ6IGNhc2UgMzE5MTogY2FzZSA2NjQ1OiBjYXNlIDMwMDU6XG5cdFx0Ly8gbWFzaywgbWFzay1pbWFnZSwgbWFzay0obW9kZXxjbGlwfHNpemUpLCBtYXNrLShyZXBlYXR8b3JpZ2luKSwgbWFzay1wb3NpdGlvbiwgbWFzay1jb21wb3NpdGUsXG5cdFx0Y2FzZSA2MzkxOiBjYXNlIDU4Nzk6IGNhc2UgNTYyMzogY2FzZSA2MTM1OiBjYXNlIDQ1OTk6IGNhc2UgNDg1NTpcblx0XHQvLyBiYWNrZ3JvdW5kLWNsaXAsIGNvbHVtbnMsIGNvbHVtbi0oY291bnR8ZmlsbHxnYXB8cnVsZXxydWxlLWNvbG9yfHJ1bGUtc3R5bGV8cnVsZS13aWR0aHxzcGFufHdpZHRoKVxuXHRcdGNhc2UgNDIxNTogY2FzZSA2Mzg5OiBjYXNlIDUxMDk6IGNhc2UgNTM2NTogY2FzZSA1NjIxOiBjYXNlIDM4Mjk6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgdmFsdWUgKyB2YWx1ZVxuXHRcdC8vIGFwcGVhcmFuY2UsIHVzZXItc2VsZWN0LCB0cmFuc2Zvcm0sIGh5cGhlbnMsIHRleHQtc2l6ZS1hZGp1c3Rcblx0XHRjYXNlIDUzNDk6IGNhc2UgNDI0NjogY2FzZSA0ODEwOiBjYXNlIDY5Njg6IGNhc2UgMjc1Njpcblx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1PWiArIHZhbHVlICsgTVMgKyB2YWx1ZSArIHZhbHVlXG5cdFx0Ly8gZmxleCwgZmxleC1kaXJlY3Rpb25cblx0XHRjYXNlIDY4Mjg6IGNhc2UgNDI2ODpcblx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgdmFsdWUgKyB2YWx1ZVxuXHRcdC8vIG9yZGVyXG5cdFx0Y2FzZSA2MTY1OlxuXHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyAnZmxleC0nICsgdmFsdWUgKyB2YWx1ZVxuXHRcdC8vIGFsaWduLWl0ZW1zXG5cdFx0Y2FzZSA1MTg3OlxuXHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgcmVwbGFjZSh2YWx1ZSwgLyhcXHcrKS4rKDpbXl0rKS8sIFdFQktJVCArICdib3gtJDEkMicgKyBNUyArICdmbGV4LSQxJDInKSArIHZhbHVlXG5cdFx0Ly8gYWxpZ24tc2VsZlxuXHRcdGNhc2UgNTQ0Mzpcblx0XHRcdHJldHVybiBXRUJLSVQgKyB2YWx1ZSArIE1TICsgJ2ZsZXgtaXRlbS0nICsgcmVwbGFjZSh2YWx1ZSwgL2ZsZXgtfC1zZWxmLywgJycpICsgdmFsdWVcblx0XHQvLyBhbGlnbi1jb250ZW50XG5cdFx0Y2FzZSA0Njc1OlxuXHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyAnZmxleC1saW5lLXBhY2snICsgcmVwbGFjZSh2YWx1ZSwgL2FsaWduLWNvbnRlbnR8ZmxleC18LXNlbGYvLCAnJykgKyB2YWx1ZVxuXHRcdC8vIGZsZXgtc2hyaW5rXG5cdFx0Y2FzZSA1NTQ4OlxuXHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyByZXBsYWNlKHZhbHVlLCAnc2hyaW5rJywgJ25lZ2F0aXZlJykgKyB2YWx1ZVxuXHRcdC8vIGZsZXgtYmFzaXNcblx0XHRjYXNlIDUyOTI6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArIHJlcGxhY2UodmFsdWUsICdiYXNpcycsICdwcmVmZXJyZWQtc2l6ZScpICsgdmFsdWVcblx0XHQvLyBmbGV4LWdyb3dcblx0XHRjYXNlIDYwNjA6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgJ2JveC0nICsgcmVwbGFjZSh2YWx1ZSwgJy1ncm93JywgJycpICsgV0VCS0lUICsgdmFsdWUgKyBNUyArIHJlcGxhY2UodmFsdWUsICdncm93JywgJ3Bvc2l0aXZlJykgKyB2YWx1ZVxuXHRcdC8vIHRyYW5zaXRpb25cblx0XHRjYXNlIDQ1NTQ6XG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgcmVwbGFjZSh2YWx1ZSwgLyhbXi1dKSh0cmFuc2Zvcm0pL2csICckMScgKyBXRUJLSVQgKyAnJDInKSArIHZhbHVlXG5cdFx0Ly8gY3Vyc29yXG5cdFx0Y2FzZSA2MTg3OlxuXHRcdFx0cmV0dXJuIHJlcGxhY2UocmVwbGFjZShyZXBsYWNlKHZhbHVlLCAvKHpvb20tfGdyYWIpLywgV0VCS0lUICsgJyQxJyksIC8oaW1hZ2Utc2V0KS8sIFdFQktJVCArICckMScpLCB2YWx1ZSwgJycpICsgdmFsdWVcblx0XHQvLyBiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kLWltYWdlXG5cdFx0Y2FzZSA1NDk1OiBjYXNlIDM5NTk6XG5cdFx0XHRyZXR1cm4gcmVwbGFjZSh2YWx1ZSwgLyhpbWFnZS1zZXRcXChbXl0qKS8sIFdFQktJVCArICckMScgKyAnJGAkMScpXG5cdFx0Ly8ganVzdGlmeS1jb250ZW50XG5cdFx0Y2FzZSA0OTY4OlxuXHRcdFx0cmV0dXJuIHJlcGxhY2UocmVwbGFjZSh2YWx1ZSwgLyguKzopKGZsZXgtKT8oLiopLywgV0VCS0lUICsgJ2JveC1wYWNrOiQzJyArIE1TICsgJ2ZsZXgtcGFjazokMycpLCAvcy4rLWJbXjtdKy8sICdqdXN0aWZ5JykgKyBXRUJLSVQgKyB2YWx1ZSArIHZhbHVlXG5cdFx0Ly8gKG1hcmdpbnxwYWRkaW5nKS1pbmxpbmUtKHN0YXJ0fGVuZClcblx0XHRjYXNlIDQwOTU6IGNhc2UgMzU4MzogY2FzZSA0MDY4OiBjYXNlIDI1MzI6XG5cdFx0XHRyZXR1cm4gcmVwbGFjZSh2YWx1ZSwgLyguKyktaW5saW5lKC4rKS8sIFdFQktJVCArICckMSQyJykgKyB2YWx1ZVxuXHRcdC8vIChtaW58bWF4KT8od2lkdGh8aGVpZ2h0fGlubGluZS1zaXplfGJsb2NrLXNpemUpXG5cdFx0Y2FzZSA4MTE2OiBjYXNlIDcwNTk6IGNhc2UgNTc1MzogY2FzZSA1NTM1OlxuXHRcdGNhc2UgNTQ0NTogY2FzZSA1NzAxOiBjYXNlIDQ5MzM6IGNhc2UgNDY3Nzpcblx0XHRjYXNlIDU1MzM6IGNhc2UgNTc4OTogY2FzZSA1MDIxOiBjYXNlIDQ3NjU6XG5cdFx0XHQvLyBzdHJldGNoLCBtYXgtY29udGVudCwgbWluLWNvbnRlbnQsIGZpbGwtYXZhaWxhYmxlXG5cdFx0XHRpZiAoc3RybGVuKHZhbHVlKSAtIDEgLSBsZW5ndGggPiA2KVxuXHRcdFx0XHRzd2l0Y2ggKGNoYXJhdCh2YWx1ZSwgbGVuZ3RoICsgMSkpIHtcblx0XHRcdFx0XHQvLyAobSlheC1jb250ZW50LCAobSlpbi1jb250ZW50XG5cdFx0XHRcdFx0Y2FzZSAxMDk6XG5cdFx0XHRcdFx0XHQvLyAtXG5cdFx0XHRcdFx0XHRpZiAoY2hhcmF0KHZhbHVlLCBsZW5ndGggKyA0KSAhPT0gNDUpXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly8gKGYpaWxsLWF2YWlsYWJsZSwgKGYpaXQtY29udGVudFxuXHRcdFx0XHRcdGNhc2UgMTAyOlxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlcGxhY2UodmFsdWUsIC8oLis6KSguKyktKFteXSspLywgJyQxJyArIFdFQktJVCArICckMi0kMycgKyAnJDEnICsgTU9aICsgKGNoYXJhdCh2YWx1ZSwgbGVuZ3RoICsgMykgPT0gMTA4ID8gJyQzJyA6ICckMi0kMycpKSArIHZhbHVlXG5cdFx0XHRcdFx0Ly8gKHMpdHJldGNoXG5cdFx0XHRcdFx0Y2FzZSAxMTU6XG5cdFx0XHRcdFx0XHRyZXR1cm4gfmluZGV4b2YodmFsdWUsICdzdHJldGNoJykgPyBwcmVmaXgocmVwbGFjZSh2YWx1ZSwgJ3N0cmV0Y2gnLCAnZmlsbC1hdmFpbGFibGUnKSwgbGVuZ3RoKSArIHZhbHVlIDogdmFsdWVcblx0XHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHQvLyBwb3NpdGlvbjogc3RpY2t5XG5cdFx0Y2FzZSA0OTQ5OlxuXHRcdFx0Ly8gKHMpdGlja3k/XG5cdFx0XHRpZiAoY2hhcmF0KHZhbHVlLCBsZW5ndGggKyAxKSAhPT0gMTE1KVxuXHRcdFx0XHRicmVha1xuXHRcdC8vIGRpc3BsYXk6IChmbGV4fGlubGluZS1mbGV4KVxuXHRcdGNhc2UgNjQ0NDpcblx0XHRcdHN3aXRjaCAoY2hhcmF0KHZhbHVlLCBzdHJsZW4odmFsdWUpIC0gMyAtICh+aW5kZXhvZih2YWx1ZSwgJyFpbXBvcnRhbnQnKSAmJiAxMCkpKSB7XG5cdFx0XHRcdC8vIHN0aWMoayl5XG5cdFx0XHRcdGNhc2UgMTA3OlxuXHRcdFx0XHRcdHJldHVybiByZXBsYWNlKHZhbHVlLCAnOicsICc6JyArIFdFQktJVCkgKyB2YWx1ZVxuXHRcdFx0XHQvLyAoaW5saW5lLSk/ZmwoZSl4XG5cdFx0XHRcdGNhc2UgMTAxOlxuXHRcdFx0XHRcdHJldHVybiByZXBsYWNlKHZhbHVlLCAvKC4rOikoW147IV0rKSg7fCEuKyk/LywgJyQxJyArIFdFQktJVCArIChjaGFyYXQodmFsdWUsIDE0KSA9PT0gNDUgPyAnaW5saW5lLScgOiAnJykgKyAnYm94JDMnICsgJyQxJyArIFdFQktJVCArICckMiQzJyArICckMScgKyBNUyArICckMmJveCQzJykgKyB2YWx1ZVxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHQvLyB3cml0aW5nLW1vZGVcblx0XHRjYXNlIDU5MzY6XG5cdFx0XHRzd2l0Y2ggKGNoYXJhdCh2YWx1ZSwgbGVuZ3RoICsgMTEpKSB7XG5cdFx0XHRcdC8vIHZlcnRpY2FsLWwocilcblx0XHRcdFx0Y2FzZSAxMTQ6XG5cdFx0XHRcdFx0cmV0dXJuIFdFQktJVCArIHZhbHVlICsgTVMgKyByZXBsYWNlKHZhbHVlLCAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sICd0YicpICsgdmFsdWVcblx0XHRcdFx0Ly8gdmVydGljYWwtcihsKVxuXHRcdFx0XHRjYXNlIDEwODpcblx0XHRcdFx0XHRyZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArIHJlcGxhY2UodmFsdWUsIC9bc3ZoXVxcdystW3RibHJdezJ9LywgJ3RiLXJsJykgKyB2YWx1ZVxuXHRcdFx0XHQvLyBob3Jpem9udGFsKC0pdGJcblx0XHRcdFx0Y2FzZSA0NTpcblx0XHRcdFx0XHRyZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArIHJlcGxhY2UodmFsdWUsIC9bc3ZoXVxcdystW3RibHJdezJ9LywgJ2xyJykgKyB2YWx1ZVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gV0VCS0lUICsgdmFsdWUgKyBNUyArIHZhbHVlICsgdmFsdWVcblx0fVxuXG5cdHJldHVybiB2YWx1ZVxufVxuIiwiaW1wb3J0IHtJTVBPUlQsIENPTU1FTlQsIFJVTEVTRVQsIERFQ0xBUkFUSU9OfSBmcm9tICcuL0VudW0uanMnXG5pbXBvcnQge3N0cmxlbiwgc2l6ZW9mfSBmcm9tICcuL1V0aWxpdHkuanMnXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3RbXX0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUgKGNoaWxkcmVuLCBjYWxsYmFjaykge1xuXHR2YXIgb3V0cHV0ID0gJydcblx0dmFyIGxlbmd0aCA9IHNpemVvZihjaGlsZHJlbilcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuXHRcdG91dHB1dCArPSBjYWxsYmFjayhjaGlsZHJlbltpXSwgaSwgY2hpbGRyZW4sIGNhbGxiYWNrKSB8fCAnJ1xuXG5cdHJldHVybiBvdXRwdXRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge29iamVjdFtdfSBjaGlsZHJlblxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSAoZWxlbWVudCwgaW5kZXgsIGNoaWxkcmVuLCBjYWxsYmFjaykge1xuXHRzd2l0Y2ggKGVsZW1lbnQudHlwZSkge1xuXHRcdGNhc2UgSU1QT1JUOiBjYXNlIERFQ0xBUkFUSU9OOiByZXR1cm4gZWxlbWVudC5yZXR1cm4gPSBlbGVtZW50LnJldHVybiB8fCBlbGVtZW50LnZhbHVlXG5cdFx0Y2FzZSBDT01NRU5UOiByZXR1cm4gJydcblx0XHRjYXNlIFJVTEVTRVQ6IGVsZW1lbnQudmFsdWUgPSBlbGVtZW50LnByb3BzLmpvaW4oJywnKVxuXHR9XG5cblx0cmV0dXJuIHN0cmxlbihjaGlsZHJlbiA9IHNlcmlhbGl6ZShlbGVtZW50LmNoaWxkcmVuLCBjYWxsYmFjaykpID8gZWxlbWVudC5yZXR1cm4gPSBlbGVtZW50LnZhbHVlICsgJ3snICsgY2hpbGRyZW4gKyAnfScgOiAnJ1xufVxuIiwiaW1wb3J0IHtmcm9tLCB0cmltLCBjaGFyYXQsIHN0cmxlbiwgc3Vic3RyLCBhcHBlbmR9IGZyb20gJy4vVXRpbGl0eS5qcydcblxuZXhwb3J0IHZhciBsaW5lID0gMVxuZXhwb3J0IHZhciBjb2x1bW4gPSAxXG5leHBvcnQgdmFyIGxlbmd0aCA9IDBcbmV4cG9ydCB2YXIgcG9zaXRpb24gPSAwXG5leHBvcnQgdmFyIGNoYXJhY3RlciA9IDBcbmV4cG9ydCB2YXIgY2hhcmFjdGVycyA9ICcnXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gcm9vdFxuICogQHBhcmFtIHtvYmplY3Q/fSBwYXJlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wc1xuICogQHBhcmFtIHtvYmplY3RbXX0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vZGUgKHZhbHVlLCByb290LCBwYXJlbnQsIHR5cGUsIHByb3BzLCBjaGlsZHJlbiwgbGVuZ3RoKSB7XG5cdHJldHVybiB7dmFsdWU6IHZhbHVlLCByb290OiByb290LCBwYXJlbnQ6IHBhcmVudCwgdHlwZTogdHlwZSwgcHJvcHM6IHByb3BzLCBjaGlsZHJlbjogY2hpbGRyZW4sIGxpbmU6IGxpbmUsIGNvbHVtbjogY29sdW1uLCBsZW5ndGg6IGxlbmd0aCwgcmV0dXJuOiAnJ31cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSByb290XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weSAodmFsdWUsIHJvb3QsIHR5cGUpIHtcblx0cmV0dXJuIG5vZGUodmFsdWUsIHJvb3Qucm9vdCwgcm9vdC5wYXJlbnQsIHR5cGUsIHJvb3QucHJvcHMsIHJvb3QuY2hpbGRyZW4sIDApXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hhciAoKSB7XG5cdHJldHVybiBjaGFyYWN0ZXJcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ICgpIHtcblx0Y2hhcmFjdGVyID0gcG9zaXRpb24gPiAwID8gY2hhcmF0KGNoYXJhY3RlcnMsIC0tcG9zaXRpb24pIDogMFxuXG5cdGlmIChjb2x1bW4tLSwgY2hhcmFjdGVyID09PSAxMClcblx0XHRjb2x1bW4gPSAxLCBsaW5lLS1cblxuXHRyZXR1cm4gY2hhcmFjdGVyXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dCAoKSB7XG5cdGNoYXJhY3RlciA9IHBvc2l0aW9uIDwgbGVuZ3RoID8gY2hhcmF0KGNoYXJhY3RlcnMsIHBvc2l0aW9uKyspIDogMFxuXG5cdGlmIChjb2x1bW4rKywgY2hhcmFjdGVyID09PSAxMClcblx0XHRjb2x1bW4gPSAxLCBsaW5lKytcblxuXHRyZXR1cm4gY2hhcmFjdGVyXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGVlayAoKSB7XG5cdHJldHVybiBjaGFyYXQoY2hhcmFjdGVycywgcG9zaXRpb24pXG59XG5cbi8qKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FyZXQgKCkge1xuXHRyZXR1cm4gcG9zaXRpb25cbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gYmVnaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmRcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG5cdHJldHVybiBzdWJzdHIoY2hhcmFjdGVycywgYmVnaW4sIGVuZClcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZVxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9rZW4gKHR5cGUpIHtcblx0c3dpdGNoICh0eXBlKSB7XG5cdFx0Ly8gXFwwIFxcdCBcXG4gXFxyIFxccyB3aGl0ZXNwYWNlIHRva2VuXG5cdFx0Y2FzZSAwOiBjYXNlIDk6IGNhc2UgMTA6IGNhc2UgMTM6IGNhc2UgMzI6XG5cdFx0XHRyZXR1cm4gNVxuXHRcdC8vICEgKyAsIC8gPiBAIH4gaXNvbGF0ZSB0b2tlblxuXHRcdGNhc2UgMzM6IGNhc2UgNDM6IGNhc2UgNDQ6IGNhc2UgNDc6IGNhc2UgNjI6IGNhc2UgNjQ6IGNhc2UgMTI2OlxuXHRcdC8vIDsgeyB9IGJyZWFrcG9pbnQgdG9rZW5cblx0XHRjYXNlIDU5OiBjYXNlIDEyMzogY2FzZSAxMjU6XG5cdFx0XHRyZXR1cm4gNFxuXHRcdC8vIDogYWNjb21wYW5pZWQgdG9rZW5cblx0XHRjYXNlIDU4OlxuXHRcdFx0cmV0dXJuIDNcblx0XHQvLyBcIiAnICggWyBvcGVuaW5nIGRlbGltaXQgdG9rZW5cblx0XHRjYXNlIDM0OiBjYXNlIDM5OiBjYXNlIDQwOiBjYXNlIDkxOlxuXHRcdFx0cmV0dXJuIDJcblx0XHQvLyApIF0gY2xvc2luZyBkZWxpbWl0IHRva2VuXG5cdFx0Y2FzZSA0MTogY2FzZSA5Mzpcblx0XHRcdHJldHVybiAxXG5cdH1cblxuXHRyZXR1cm4gMFxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGxvYyAodmFsdWUpIHtcblx0cmV0dXJuIGxpbmUgPSBjb2x1bW4gPSAxLCBsZW5ndGggPSBzdHJsZW4oY2hhcmFjdGVycyA9IHZhbHVlKSwgcG9zaXRpb24gPSAwLCBbXVxufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVhbGxvYyAodmFsdWUpIHtcblx0cmV0dXJuIGNoYXJhY3RlcnMgPSAnJywgdmFsdWVcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsaW1pdCAodHlwZSkge1xuXHRyZXR1cm4gdHJpbShzbGljZShwb3NpdGlvbiAtIDEsIGRlbGltaXRlcih0eXBlID09PSA5MSA/IHR5cGUgKyAyIDogdHlwZSA9PT0gNDAgPyB0eXBlICsgMSA6IHR5cGUpKSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge3N0cmluZ1tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5pemUgKHZhbHVlKSB7XG5cdHJldHVybiBkZWFsbG9jKHRva2VuaXplcihhbGxvYyh2YWx1ZSkpKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGl0ZXNwYWNlICh0eXBlKSB7XG5cdHdoaWxlIChjaGFyYWN0ZXIgPSBwZWVrKCkpXG5cdFx0aWYgKGNoYXJhY3RlciA8IDMzKVxuXHRcdFx0bmV4dCgpXG5cdFx0ZWxzZVxuXHRcdFx0YnJlYWtcblxuXHRyZXR1cm4gdG9rZW4odHlwZSkgPiAyIHx8IHRva2VuKGNoYXJhY3RlcikgPiAzID8gJycgOiAnICdcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBjaGlsZHJlblxuICogQHJldHVybiB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZXIgKGNoaWxkcmVuKSB7XG5cdHdoaWxlIChuZXh0KCkpXG5cdFx0c3dpdGNoICh0b2tlbihjaGFyYWN0ZXIpKSB7XG5cdFx0XHRjYXNlIDA6IGFwcGVuZChpZGVudGlmaWVyKHBvc2l0aW9uIC0gMSksIGNoaWxkcmVuKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOiBhcHBlbmQoZGVsaW1pdChjaGFyYWN0ZXIpLCBjaGlsZHJlbilcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6IGFwcGVuZChmcm9tKGNoYXJhY3RlciksIGNoaWxkcmVuKVxuXHRcdH1cblxuXHRyZXR1cm4gY2hpbGRyZW5cbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBpbmcgKGluZGV4LCBjb3VudCkge1xuXHR3aGlsZSAoLS1jb3VudCAmJiBuZXh0KCkpXG5cdFx0Ly8gbm90IDAtOSBBLUYgYS1mXG5cdFx0aWYgKGNoYXJhY3RlciA8IDQ4IHx8IGNoYXJhY3RlciA+IDEwMiB8fCAoY2hhcmFjdGVyID4gNTcgJiYgY2hhcmFjdGVyIDwgNjUpIHx8IChjaGFyYWN0ZXIgPiA3MCAmJiBjaGFyYWN0ZXIgPCA5NykpXG5cdFx0XHRicmVha1xuXG5cdHJldHVybiBzbGljZShpbmRleCwgY2FyZXQoKSArIChjb3VudCA8IDYgJiYgcGVlaygpID09IDMyICYmIG5leHQoKSA9PSAzMikpXG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHR5cGVcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGltaXRlciAodHlwZSkge1xuXHR3aGlsZSAobmV4dCgpKVxuXHRcdHN3aXRjaCAoY2hhcmFjdGVyKSB7XG5cdFx0XHQvLyBdICkgXCIgJ1xuXHRcdFx0Y2FzZSB0eXBlOlxuXHRcdFx0XHRyZXR1cm4gcG9zaXRpb25cblx0XHRcdC8vIFwiICdcblx0XHRcdGNhc2UgMzQ6IGNhc2UgMzk6XG5cdFx0XHRcdHJldHVybiBkZWxpbWl0ZXIodHlwZSA9PT0gMzQgfHwgdHlwZSA9PT0gMzkgPyB0eXBlIDogY2hhcmFjdGVyKVxuXHRcdFx0Ly8gKFxuXHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0aWYgKHR5cGUgPT09IDQxKVxuXHRcdFx0XHRcdGRlbGltaXRlcih0eXBlKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Ly8gXFxcblx0XHRcdGNhc2UgOTI6XG5cdFx0XHRcdG5leHQoKVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRyZXR1cm4gcG9zaXRpb25cbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZVxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tZW50ZXIgKHR5cGUsIGluZGV4KSB7XG5cdHdoaWxlIChuZXh0KCkpXG5cdFx0Ly8gLy9cblx0XHRpZiAodHlwZSArIGNoYXJhY3RlciA9PT0gNDcgKyAxMClcblx0XHRcdGJyZWFrXG5cdFx0Ly8gLypcblx0XHRlbHNlIGlmICh0eXBlICsgY2hhcmFjdGVyID09PSA0MiArIDQyICYmIHBlZWsoKSA9PT0gNDcpXG5cdFx0XHRicmVha1xuXG5cdHJldHVybiAnLyonICsgc2xpY2UoaW5kZXgsIHBvc2l0aW9uIC0gMSkgKyAnKicgKyBmcm9tKHR5cGUgPT09IDQ3ID8gdHlwZSA6IG5leHQoKSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZpZXIgKGluZGV4KSB7XG5cdHdoaWxlICghdG9rZW4ocGVlaygpKSlcblx0XHRuZXh0KClcblxuXHRyZXR1cm4gc2xpY2UoaW5kZXgsIHBvc2l0aW9uKVxufVxuIiwiLyoqXG4gKiBAcGFyYW0ge251bWJlcn1cbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZXhwb3J0IHZhciBhYnMgPSBNYXRoLmFic1xuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgdmFyIGZyb20gPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoICh2YWx1ZSwgbGVuZ3RoKSB7XG5cdHJldHVybiAoKCgoKCgobGVuZ3RoIDw8IDIpIF4gY2hhcmF0KHZhbHVlLCAwKSkgPDwgMikgXiBjaGFyYXQodmFsdWUsIDEpKSA8PCAyKSBeIGNoYXJhdCh2YWx1ZSwgMikpIDw8IDIpIF4gY2hhcmF0KHZhbHVlLCAzKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpbSAodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLnRyaW0oKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtSZWdFeHB9IHBhdHRlcm5cbiAqIEByZXR1cm4ge3N0cmluZz99XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaCAodmFsdWUsIHBhdHRlcm4pIHtcblx0cmV0dXJuICh2YWx1ZSA9IHBhdHRlcm4uZXhlYyh2YWx1ZSkpID8gdmFsdWVbMF0gOiB2YWx1ZVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHBhdHRlcm5cbiAqIEBwYXJhbSB7c3RyaW5nfSByZXBsYWNlbWVudFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZSAodmFsdWUsIHBhdHRlcm4sIHJlcGxhY2VtZW50KSB7XG5cdHJldHVybiB2YWx1ZS5yZXBsYWNlKHBhdHRlcm4sIHJlcGxhY2VtZW50KVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRleG9mICh2YWx1ZSwgc2VhcmNoKSB7XG5cdHJldHVybiB2YWx1ZS5pbmRleE9mKHNlYXJjaClcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hhcmF0ICh2YWx1ZSwgaW5kZXgpIHtcblx0cmV0dXJuIHZhbHVlLmNoYXJDb2RlQXQoaW5kZXgpIHwgMFxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGJlZ2luXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdWJzdHIgKHZhbHVlLCBiZWdpbiwgZW5kKSB7XG5cdHJldHVybiB2YWx1ZS5zbGljZShiZWdpbiwgZW5kKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RybGVuICh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUubGVuZ3RoXG59XG5cbi8qKlxuICogQHBhcmFtIHthbnlbXX0gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpemVvZiAodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLmxlbmd0aFxufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHthbnlbXX0gYXJyYXlcbiAqIEByZXR1cm4ge2FueX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZCAodmFsdWUsIGFycmF5KSB7XG5cdHJldHVybiBhcnJheS5wdXNoKHZhbHVlKSwgdmFsdWVcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBhcnJheVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmUgKGFycmF5LCBjYWxsYmFjaykge1xuXHRyZXR1cm4gYXJyYXkubWFwKGNhbGxiYWNrKS5qb2luKCcnKVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9nYXJ5Y291cnQvbXVybXVyaGFzaC1qc1xuLy8gUG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FhcHBsZWJ5L3NtaGFzaGVyL2Jsb2IvNjFhMDUzMGYyODI3N2YyZTg1MGJmYzM5NjAwY2U2MWQwMmI1MThkZS9zcmMvTXVybXVySGFzaDIuY3BwI0wzNy1MODZcbmZ1bmN0aW9uIG11cm11cjIoc3RyKSB7XG4gIC8vICdtJyBhbmQgJ3InIGFyZSBtaXhpbmcgY29uc3RhbnRzIGdlbmVyYXRlZCBvZmZsaW5lLlxuICAvLyBUaGV5J3JlIG5vdCByZWFsbHkgJ21hZ2ljJywgdGhleSBqdXN0IGhhcHBlbiB0byB3b3JrIHdlbGwuXG4gIC8vIGNvbnN0IG0gPSAweDViZDFlOTk1O1xuICAvLyBjb25zdCByID0gMjQ7XG4gIC8vIEluaXRpYWxpemUgdGhlIGhhc2hcbiAgdmFyIGggPSAwOyAvLyBNaXggNCBieXRlcyBhdCBhIHRpbWUgaW50byB0aGUgaGFzaFxuXG4gIHZhciBrLFxuICAgICAgaSA9IDAsXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xuXG4gIGZvciAoOyBsZW4gPj0gNDsgKytpLCBsZW4gLT0gNCkge1xuICAgIGsgPSBzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYgfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDggfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDE2IHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAyNDtcbiAgICBrID1cbiAgICAvKiBNYXRoLmltdWwoaywgbSk6ICovXG4gICAgKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoayA+Pj4gMTYpICogMHhlOTk1IDw8IDE2KTtcbiAgICBrIF49XG4gICAgLyogayA+Pj4gcjogKi9cbiAgICBrID4+PiAyNDtcbiAgICBoID1cbiAgICAvKiBNYXRoLmltdWwoaywgbSk6ICovXG4gICAgKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoayA+Pj4gMTYpICogMHhlOTk1IDw8IDE2KSBeXG4gICAgLyogTWF0aC5pbXVsKGgsIG0pOiAqL1xuICAgIChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKGggPj4+IDE2KSAqIDB4ZTk5NSA8PCAxNik7XG4gIH0gLy8gSGFuZGxlIHRoZSBsYXN0IGZldyBieXRlcyBvZiB0aGUgaW5wdXQgYXJyYXlcblxuXG4gIHN3aXRjaCAobGVuKSB7XG4gICAgY2FzZSAzOlxuICAgICAgaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDIpICYgMHhmZikgPDwgMTY7XG5cbiAgICBjYXNlIDI6XG4gICAgICBoIF49IChzdHIuY2hhckNvZGVBdChpICsgMSkgJiAweGZmKSA8PCA4O1xuXG4gICAgY2FzZSAxOlxuICAgICAgaCBePSBzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmY7XG4gICAgICBoID1cbiAgICAgIC8qIE1hdGguaW11bChoLCBtKTogKi9cbiAgICAgIChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKGggPj4+IDE2KSAqIDB4ZTk5NSA8PCAxNik7XG4gIH0gLy8gRG8gYSBmZXcgZmluYWwgbWl4ZXMgb2YgdGhlIGhhc2ggdG8gZW5zdXJlIHRoZSBsYXN0IGZld1xuICAvLyBieXRlcyBhcmUgd2VsbC1pbmNvcnBvcmF0ZWQuXG5cblxuICBoIF49IGggPj4+IDEzO1xuICBoID1cbiAgLyogTWF0aC5pbXVsKGgsIG0pOiAqL1xuICAoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKChoID4+PiAxNikgKiAweGU5OTUgPDwgMTYpO1xuICByZXR1cm4gKChoIF4gaCA+Pj4gMTUpID4+PiAwKS50b1N0cmluZygzNik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG11cm11cjI7XG4iLCJpbXBvcnQgbWVtb2l6ZSBmcm9tICdAZW1vdGlvbi9tZW1vaXplJztcblxudmFyIHJlYWN0UHJvcHNSZWdleCA9IC9eKChjaGlsZHJlbnxkYW5nZXJvdXNseVNldElubmVySFRNTHxrZXl8cmVmfGF1dG9Gb2N1c3xkZWZhdWx0VmFsdWV8ZGVmYXVsdENoZWNrZWR8aW5uZXJIVE1MfHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ3xzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmd8dmFsdWVMaW5rfGFjY2VwdHxhY2NlcHRDaGFyc2V0fGFjY2Vzc0tleXxhY3Rpb258YWxsb3d8YWxsb3dVc2VyTWVkaWF8YWxsb3dQYXltZW50UmVxdWVzdHxhbGxvd0Z1bGxTY3JlZW58YWxsb3dUcmFuc3BhcmVuY3l8YWx0fGFzeW5jfGF1dG9Db21wbGV0ZXxhdXRvUGxheXxjYXB0dXJlfGNlbGxQYWRkaW5nfGNlbGxTcGFjaW5nfGNoYWxsZW5nZXxjaGFyU2V0fGNoZWNrZWR8Y2l0ZXxjbGFzc0lEfGNsYXNzTmFtZXxjb2xzfGNvbFNwYW58Y29udGVudHxjb250ZW50RWRpdGFibGV8Y29udGV4dE1lbnV8Y29udHJvbHN8Y29udHJvbHNMaXN0fGNvb3Jkc3xjcm9zc09yaWdpbnxkYXRhfGRhdGVUaW1lfGRlY29kaW5nfGRlZmF1bHR8ZGVmZXJ8ZGlyfGRpc2FibGVkfGRpc2FibGVQaWN0dXJlSW5QaWN0dXJlfGRvd25sb2FkfGRyYWdnYWJsZXxlbmNUeXBlfGZvcm18Zm9ybUFjdGlvbnxmb3JtRW5jVHlwZXxmb3JtTWV0aG9kfGZvcm1Ob1ZhbGlkYXRlfGZvcm1UYXJnZXR8ZnJhbWVCb3JkZXJ8aGVhZGVyc3xoZWlnaHR8aGlkZGVufGhpZ2h8aHJlZnxocmVmTGFuZ3xodG1sRm9yfGh0dHBFcXVpdnxpZHxpbnB1dE1vZGV8aW50ZWdyaXR5fGlzfGtleVBhcmFtc3xrZXlUeXBlfGtpbmR8bGFiZWx8bGFuZ3xsaXN0fGxvYWRpbmd8bG9vcHxsb3d8bWFyZ2luSGVpZ2h0fG1hcmdpbldpZHRofG1heHxtYXhMZW5ndGh8bWVkaWF8bWVkaWFHcm91cHxtZXRob2R8bWlufG1pbkxlbmd0aHxtdWx0aXBsZXxtdXRlZHxuYW1lfG5vbmNlfG5vVmFsaWRhdGV8b3BlbnxvcHRpbXVtfHBhdHRlcm58cGxhY2Vob2xkZXJ8cGxheXNJbmxpbmV8cG9zdGVyfHByZWxvYWR8cHJvZmlsZXxyYWRpb0dyb3VwfHJlYWRPbmx5fHJlZmVycmVyUG9saWN5fHJlbHxyZXF1aXJlZHxyZXZlcnNlZHxyb2xlfHJvd3N8cm93U3BhbnxzYW5kYm94fHNjb3BlfHNjb3BlZHxzY3JvbGxpbmd8c2VhbWxlc3N8c2VsZWN0ZWR8c2hhcGV8c2l6ZXxzaXplc3xzbG90fHNwYW58c3BlbGxDaGVja3xzcmN8c3JjRG9jfHNyY0xhbmd8c3JjU2V0fHN0YXJ0fHN0ZXB8c3R5bGV8c3VtbWFyeXx0YWJJbmRleHx0YXJnZXR8dGl0bGV8dHJhbnNsYXRlfHR5cGV8dXNlTWFwfHZhbHVlfHdpZHRofHdtb2RlfHdyYXB8YWJvdXR8ZGF0YXR5cGV8aW5saXN0fHByZWZpeHxwcm9wZXJ0eXxyZXNvdXJjZXx0eXBlb2Z8dm9jYWJ8YXV0b0NhcGl0YWxpemV8YXV0b0NvcnJlY3R8YXV0b1NhdmV8Y29sb3J8ZmFsbGJhY2t8aW5lcnR8aXRlbVByb3B8aXRlbVNjb3BlfGl0ZW1UeXBlfGl0ZW1JRHxpdGVtUmVmfG9ufG9wdGlvbnxyZXN1bHRzfHNlY3VyaXR5fHVuc2VsZWN0YWJsZXxhY2NlbnRIZWlnaHR8YWNjdW11bGF0ZXxhZGRpdGl2ZXxhbGlnbm1lbnRCYXNlbGluZXxhbGxvd1Jlb3JkZXJ8YWxwaGFiZXRpY3xhbXBsaXR1ZGV8YXJhYmljRm9ybXxhc2NlbnR8YXR0cmlidXRlTmFtZXxhdHRyaWJ1dGVUeXBlfGF1dG9SZXZlcnNlfGF6aW11dGh8YmFzZUZyZXF1ZW5jeXxiYXNlbGluZVNoaWZ0fGJhc2VQcm9maWxlfGJib3h8YmVnaW58Ymlhc3xieXxjYWxjTW9kZXxjYXBIZWlnaHR8Y2xpcHxjbGlwUGF0aFVuaXRzfGNsaXBQYXRofGNsaXBSdWxlfGNvbG9ySW50ZXJwb2xhdGlvbnxjb2xvckludGVycG9sYXRpb25GaWx0ZXJzfGNvbG9yUHJvZmlsZXxjb2xvclJlbmRlcmluZ3xjb250ZW50U2NyaXB0VHlwZXxjb250ZW50U3R5bGVUeXBlfGN1cnNvcnxjeHxjeXxkfGRlY2VsZXJhdGV8ZGVzY2VudHxkaWZmdXNlQ29uc3RhbnR8ZGlyZWN0aW9ufGRpc3BsYXl8ZGl2aXNvcnxkb21pbmFudEJhc2VsaW5lfGR1cnxkeHxkeXxlZGdlTW9kZXxlbGV2YXRpb258ZW5hYmxlQmFja2dyb3VuZHxlbmR8ZXhwb25lbnR8ZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZHxmaWxsfGZpbGxPcGFjaXR5fGZpbGxSdWxlfGZpbHRlcnxmaWx0ZXJSZXN8ZmlsdGVyVW5pdHN8Zmxvb2RDb2xvcnxmbG9vZE9wYWNpdHl8Zm9jdXNhYmxlfGZvbnRGYW1pbHl8Zm9udFNpemV8Zm9udFNpemVBZGp1c3R8Zm9udFN0cmV0Y2h8Zm9udFN0eWxlfGZvbnRWYXJpYW50fGZvbnRXZWlnaHR8Zm9ybWF0fGZyb218ZnJ8Znh8Znl8ZzF8ZzJ8Z2x5cGhOYW1lfGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsfGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbHxnbHlwaFJlZnxncmFkaWVudFRyYW5zZm9ybXxncmFkaWVudFVuaXRzfGhhbmdpbmd8aG9yaXpBZHZYfGhvcml6T3JpZ2luWHxpZGVvZ3JhcGhpY3xpbWFnZVJlbmRlcmluZ3xpbnxpbjJ8aW50ZXJjZXB0fGt8azF8azJ8azN8azR8a2VybmVsTWF0cml4fGtlcm5lbFVuaXRMZW5ndGh8a2VybmluZ3xrZXlQb2ludHN8a2V5U3BsaW5lc3xrZXlUaW1lc3xsZW5ndGhBZGp1c3R8bGV0dGVyU3BhY2luZ3xsaWdodGluZ0NvbG9yfGxpbWl0aW5nQ29uZUFuZ2xlfGxvY2FsfG1hcmtlckVuZHxtYXJrZXJNaWR8bWFya2VyU3RhcnR8bWFya2VySGVpZ2h0fG1hcmtlclVuaXRzfG1hcmtlcldpZHRofG1hc2t8bWFza0NvbnRlbnRVbml0c3xtYXNrVW5pdHN8bWF0aGVtYXRpY2FsfG1vZGV8bnVtT2N0YXZlc3xvZmZzZXR8b3BhY2l0eXxvcGVyYXRvcnxvcmRlcnxvcmllbnR8b3JpZW50YXRpb258b3JpZ2lufG92ZXJmbG93fG92ZXJsaW5lUG9zaXRpb258b3ZlcmxpbmVUaGlja25lc3N8cGFub3NlMXxwYWludE9yZGVyfHBhdGhMZW5ndGh8cGF0dGVybkNvbnRlbnRVbml0c3xwYXR0ZXJuVHJhbnNmb3JtfHBhdHRlcm5Vbml0c3xwb2ludGVyRXZlbnRzfHBvaW50c3xwb2ludHNBdFh8cG9pbnRzQXRZfHBvaW50c0F0WnxwcmVzZXJ2ZUFscGhhfHByZXNlcnZlQXNwZWN0UmF0aW98cHJpbWl0aXZlVW5pdHN8cnxyYWRpdXN8cmVmWHxyZWZZfHJlbmRlcmluZ0ludGVudHxyZXBlYXRDb3VudHxyZXBlYXREdXJ8cmVxdWlyZWRFeHRlbnNpb25zfHJlcXVpcmVkRmVhdHVyZXN8cmVzdGFydHxyZXN1bHR8cm90YXRlfHJ4fHJ5fHNjYWxlfHNlZWR8c2hhcGVSZW5kZXJpbmd8c2xvcGV8c3BhY2luZ3xzcGVjdWxhckNvbnN0YW50fHNwZWN1bGFyRXhwb25lbnR8c3BlZWR8c3ByZWFkTWV0aG9kfHN0YXJ0T2Zmc2V0fHN0ZERldmlhdGlvbnxzdGVtaHxzdGVtdnxzdGl0Y2hUaWxlc3xzdG9wQ29sb3J8c3RvcE9wYWNpdHl8c3RyaWtldGhyb3VnaFBvc2l0aW9ufHN0cmlrZXRocm91Z2hUaGlja25lc3N8c3RyaW5nfHN0cm9rZXxzdHJva2VEYXNoYXJyYXl8c3Ryb2tlRGFzaG9mZnNldHxzdHJva2VMaW5lY2FwfHN0cm9rZUxpbmVqb2lufHN0cm9rZU1pdGVybGltaXR8c3Ryb2tlT3BhY2l0eXxzdHJva2VXaWR0aHxzdXJmYWNlU2NhbGV8c3lzdGVtTGFuZ3VhZ2V8dGFibGVWYWx1ZXN8dGFyZ2V0WHx0YXJnZXRZfHRleHRBbmNob3J8dGV4dERlY29yYXRpb258dGV4dFJlbmRlcmluZ3x0ZXh0TGVuZ3RofHRvfHRyYW5zZm9ybXx1MXx1Mnx1bmRlcmxpbmVQb3NpdGlvbnx1bmRlcmxpbmVUaGlja25lc3N8dW5pY29kZXx1bmljb2RlQmlkaXx1bmljb2RlUmFuZ2V8dW5pdHNQZXJFbXx2QWxwaGFiZXRpY3x2SGFuZ2luZ3x2SWRlb2dyYXBoaWN8dk1hdGhlbWF0aWNhbHx2YWx1ZXN8dmVjdG9yRWZmZWN0fHZlcnNpb258dmVydEFkdll8dmVydE9yaWdpblh8dmVydE9yaWdpbll8dmlld0JveHx2aWV3VGFyZ2V0fHZpc2liaWxpdHl8d2lkdGhzfHdvcmRTcGFjaW5nfHdyaXRpbmdNb2RlfHh8eEhlaWdodHx4MXx4Mnx4Q2hhbm5lbFNlbGVjdG9yfHhsaW5rQWN0dWF0ZXx4bGlua0FyY3JvbGV8eGxpbmtIcmVmfHhsaW5rUm9sZXx4bGlua1Nob3d8eGxpbmtUaXRsZXx4bGlua1R5cGV8eG1sQmFzZXx4bWxuc3x4bWxuc1hsaW5rfHhtbExhbmd8eG1sU3BhY2V8eXx5MXx5Mnx5Q2hhbm5lbFNlbGVjdG9yfHp8em9vbUFuZFBhbnxmb3J8Y2xhc3N8YXV0b2ZvY3VzKXwoKFtEZF1bQWFdW1R0XVtBYV18W0FhXVtScl1bSWldW0FhXXx4KS0uKikpJC87IC8vIGh0dHBzOi8vZXNiZW5jaC5jb20vYmVuY2gvNWJmZWU2OGE0Y2Q3ZTYwMDllZjYxZDIzXG5cbnZhciBpc1Byb3BWYWxpZCA9IC8qICNfX1BVUkVfXyAqL21lbW9pemUoZnVuY3Rpb24gKHByb3ApIHtcbiAgcmV0dXJuIHJlYWN0UHJvcHNSZWdleC50ZXN0KHByb3ApIHx8IHByb3AuY2hhckNvZGVBdCgwKSA9PT0gMTExXG4gIC8qIG8gKi9cbiAgJiYgcHJvcC5jaGFyQ29kZUF0KDEpID09PSAxMTBcbiAgLyogbiAqL1xuICAmJiBwcm9wLmNoYXJDb2RlQXQoMikgPCA5MTtcbn1cbi8qIForMSAqL1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgaXNQcm9wVmFsaWQ7XG4iLCJmdW5jdGlvbiBtZW1vaXplKGZuKSB7XG4gIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgaWYgKGNhY2hlW2FyZ10gPT09IHVuZGVmaW5lZCkgY2FjaGVbYXJnXSA9IGZuKGFyZyk7XG4gICAgcmV0dXJuIGNhY2hlW2FyZ107XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemU7XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCBmb3J3YXJkUmVmLCBjcmVhdGVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZUNhY2hlIGZyb20gJ0BlbW90aW9uL2NhY2hlJztcbmltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCB3ZWFrTWVtb2l6ZSBmcm9tICdAZW1vdGlvbi93ZWFrLW1lbW9pemUnO1xuaW1wb3J0IGhvaXN0Tm9uUmVhY3RTdGF0aWNzIGZyb20gJy4uL2lzb2xhdGVkLWhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzLWRvLW5vdC11c2UtdGhpcy1pbi15b3VyLWNvZGUvZGlzdC9lbW90aW9uLXJlYWN0LWlzb2xhdGVkLWhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzLWRvLW5vdC11c2UtdGhpcy1pbi15b3VyLWNvZGUuYnJvd3Nlci5lc20uanMnO1xuaW1wb3J0IHsgZ2V0UmVnaXN0ZXJlZFN0eWxlcywgaW5zZXJ0U3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vdXRpbHMnO1xuaW1wb3J0IHsgc2VyaWFsaXplU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vc2VyaWFsaXplJztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIEVtb3Rpb25DYWNoZUNvbnRleHQgPSAvKiAjX19QVVJFX18gKi9jcmVhdGVDb250ZXh0KCAvLyB3ZSdyZSBkb2luZyB0aGlzIHRvIGF2b2lkIHByZWNvbnN0cnVjdCdzIGRlYWQgY29kZSBlbGltaW5hdGlvbiBpbiB0aGlzIG9uZSBjYXNlXG4vLyBiZWNhdXNlIHRoaXMgbW9kdWxlIGlzIHByaW1hcmlseSBpbnRlbmRlZCBmb3IgdGhlIGJyb3dzZXIgYW5kIG5vZGVcbi8vIGJ1dCBpdCdzIGFsc28gcmVxdWlyZWQgaW4gcmVhY3QgbmF0aXZlIGFuZCBzaW1pbGFyIGVudmlyb25tZW50cyBzb21ldGltZXNcbi8vIGFuZCB3ZSBjb3VsZCBoYXZlIGEgc3BlY2lhbCBidWlsZCBqdXN0IGZvciB0aGF0XG4vLyBidXQgdGhpcyBpcyBtdWNoIGVhc2llciBhbmQgdGhlIG5hdGl2ZSBwYWNrYWdlc1xuLy8gbWlnaHQgdXNlIGEgZGlmZmVyZW50IHRoZW1lIGNvbnRleHQgaW4gdGhlIGZ1dHVyZSBhbnl3YXlcbnR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAvKiAjX19QVVJFX18gKi9jcmVhdGVDYWNoZSh7XG4gIGtleTogJ2Nzcydcbn0pIDogbnVsbCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIEVtb3Rpb25DYWNoZUNvbnRleHQuZGlzcGxheU5hbWUgPSAnRW1vdGlvbkNhY2hlQ29udGV4dCc7XG59XG5cbnZhciBDYWNoZVByb3ZpZGVyID0gRW1vdGlvbkNhY2hlQ29udGV4dC5Qcm92aWRlcjtcbnZhciBfX3Vuc2FmZV91c2VFbW90aW9uQ2FjaGUgPSBmdW5jdGlvbiB1c2VFbW90aW9uQ2FjaGUoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KEVtb3Rpb25DYWNoZUNvbnRleHQpO1xufTtcblxudmFyIHdpdGhFbW90aW9uQ2FjaGUgPSBmdW5jdGlvbiB3aXRoRW1vdGlvbkNhY2hlKGZ1bmMpIHtcbiAgLy8gJEZsb3dGaXhNZVxuICByZXR1cm4gLyojX19QVVJFX18qL2ZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHtcbiAgICAvLyB0aGUgY2FjaGUgd2lsbCBuZXZlciBiZSBudWxsIGluIHRoZSBicm93c2VyXG4gICAgdmFyIGNhY2hlID0gdXNlQ29udGV4dChFbW90aW9uQ2FjaGVDb250ZXh0KTtcbiAgICByZXR1cm4gZnVuYyhwcm9wcywgY2FjaGUsIHJlZik7XG4gIH0pO1xufTtcblxudmFyIFRoZW1lQ29udGV4dCA9IC8qICNfX1BVUkVfXyAqL2NyZWF0ZUNvbnRleHQoe30pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBUaGVtZUNvbnRleHQuZGlzcGxheU5hbWUgPSAnRW1vdGlvblRoZW1lQ29udGV4dCc7XG59XG5cbnZhciB1c2VUaGVtZSA9IGZ1bmN0aW9uIHVzZVRoZW1lKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xufTtcblxudmFyIGdldFRoZW1lID0gZnVuY3Rpb24gZ2V0VGhlbWUob3V0ZXJUaGVtZSwgdGhlbWUpIHtcbiAgaWYgKHR5cGVvZiB0aGVtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBtZXJnZWRUaGVtZSA9IHRoZW1lKG91dGVyVGhlbWUpO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgKG1lcmdlZFRoZW1lID09IG51bGwgfHwgdHlwZW9mIG1lcmdlZFRoZW1lICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KG1lcmdlZFRoZW1lKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW1RoZW1lUHJvdmlkZXJdIFBsZWFzZSByZXR1cm4gYW4gb2JqZWN0IGZyb20geW91ciB0aGVtZSBmdW5jdGlvbiwgaS5lLiB0aGVtZT17KCkgPT4gKHt9KX0hJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lcmdlZFRoZW1lO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgKHRoZW1lID09IG51bGwgfHwgdHlwZW9mIHRoZW1lICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHRoZW1lKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUaGVtZVByb3ZpZGVyXSBQbGVhc2UgbWFrZSB5b3VyIHRoZW1lIHByb3AgYSBwbGFpbiBvYmplY3QnKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgb3V0ZXJUaGVtZSwgdGhlbWUpO1xufTtcblxudmFyIGNyZWF0ZUNhY2hlV2l0aFRoZW1lID0gLyogI19fUFVSRV9fICovd2Vha01lbW9pemUoZnVuY3Rpb24gKG91dGVyVGhlbWUpIHtcbiAgcmV0dXJuIHdlYWtNZW1vaXplKGZ1bmN0aW9uICh0aGVtZSkge1xuICAgIHJldHVybiBnZXRUaGVtZShvdXRlclRoZW1lLCB0aGVtZSk7XG4gIH0pO1xufSk7XG52YXIgVGhlbWVQcm92aWRlciA9IGZ1bmN0aW9uIFRoZW1lUHJvdmlkZXIocHJvcHMpIHtcbiAgdmFyIHRoZW1lID0gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xuXG4gIGlmIChwcm9wcy50aGVtZSAhPT0gdGhlbWUpIHtcbiAgICB0aGVtZSA9IGNyZWF0ZUNhY2hlV2l0aFRoZW1lKHRoZW1lKShwcm9wcy50aGVtZSk7XG4gIH1cblxuICByZXR1cm4gLyojX19QVVJFX18qL2NyZWF0ZUVsZW1lbnQoVGhlbWVDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IHRoZW1lXG4gIH0sIHByb3BzLmNoaWxkcmVuKTtcbn07XG5mdW5jdGlvbiB3aXRoVGhlbWUoQ29tcG9uZW50KSB7XG4gIHZhciBjb21wb25lbnROYW1lID0gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xuXG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIocHJvcHMsIHJlZikge1xuICAgIHZhciB0aGVtZSA9IHVzZUNvbnRleHQoVGhlbWVDb250ZXh0KTtcbiAgICByZXR1cm4gLyojX19QVVJFX18qL2NyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7XG4gICAgICB0aGVtZTogdGhlbWUsXG4gICAgICByZWY6IHJlZlxuICAgIH0sIHByb3BzKSk7XG4gIH07IC8vICRGbG93Rml4TWVcblxuXG4gIHZhciBXaXRoVGhlbWUgPSAvKiNfX1BVUkVfXyovZm9yd2FyZFJlZihyZW5kZXIpO1xuICBXaXRoVGhlbWUuZGlzcGxheU5hbWUgPSBcIldpdGhUaGVtZShcIiArIGNvbXBvbmVudE5hbWUgKyBcIilcIjtcbiAgcmV0dXJuIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKFdpdGhUaGVtZSwgQ29tcG9uZW50KTtcbn1cblxuLy8gdGh1cyB3ZSBvbmx5IG5lZWQgdG8gcmVwbGFjZSB3aGF0IGlzIGEgdmFsaWQgY2hhcmFjdGVyIGZvciBKUywgYnV0IG5vdCBmb3IgQ1NTXG5cbnZhciBzYW5pdGl6ZUlkZW50aWZpZXIgPSBmdW5jdGlvbiBzYW5pdGl6ZUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICByZXR1cm4gaWRlbnRpZmllci5yZXBsYWNlKC9cXCQvZywgJy0nKTtcbn07XG5cbnZhciB0eXBlUHJvcE5hbWUgPSAnX19FTU9USU9OX1RZUEVfUExFQVNFX0RPX05PVF9VU0VfXyc7XG52YXIgbGFiZWxQcm9wTmFtZSA9ICdfX0VNT1RJT05fTEFCRUxfUExFQVNFX0RPX05PVF9VU0VfXyc7XG52YXIgY3JlYXRlRW1vdGlvblByb3BzID0gZnVuY3Rpb24gY3JlYXRlRW1vdGlvblByb3BzKHR5cGUsIHByb3BzKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBwcm9wcy5jc3MgPT09ICdzdHJpbmcnICYmIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY3NzIGRlY2xhcmF0aW9uXG4gIHByb3BzLmNzcy5pbmRleE9mKCc6JykgIT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5ncyBhcmUgbm90IGFsbG93ZWQgYXMgY3NzIHByb3AgdmFsdWVzLCBwbGVhc2Ugd3JhcCBpdCBpbiBhIGNzcyB0ZW1wbGF0ZSBsaXRlcmFsIGZyb20gJ0BlbW90aW9uL3JlYWN0JyBsaWtlIHRoaXM6IGNzc2BcIiArIHByb3BzLmNzcyArIFwiYFwiKTtcbiAgfVxuXG4gIHZhciBuZXdQcm9wcyA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCBrZXkpKSB7XG4gICAgICBuZXdQcm9wc1trZXldID0gcHJvcHNba2V5XTtcbiAgICB9XG4gIH1cblxuICBuZXdQcm9wc1t0eXBlUHJvcE5hbWVdID0gdHlwZTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXG4gICAgaWYgKGVycm9yLnN0YWNrKSB7XG4gICAgICAvLyBjaHJvbWVcbiAgICAgIHZhciBtYXRjaCA9IGVycm9yLnN0YWNrLm1hdGNoKC9hdCAoPzpPYmplY3RcXC58TW9kdWxlXFwufCkoPzpqc3h8Y3JlYXRlRW1vdGlvblByb3BzKS4qXFxuXFxzK2F0ICg/Ok9iamVjdFxcLnwpKFtBLVpdW0EtWmEtejAtOSRdKykgLyk7XG5cbiAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgLy8gc2FmYXJpIGFuZCBmaXJlZm94XG4gICAgICAgIG1hdGNoID0gZXJyb3Iuc3RhY2subWF0Y2goLy4qXFxuKFtBLVpdW0EtWmEtejAtOSRdKylALyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBuZXdQcm9wc1tsYWJlbFByb3BOYW1lXSA9IHNhbml0aXplSWRlbnRpZmllcihtYXRjaFsxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld1Byb3BzO1xufTtcbnZhciBFbW90aW9uID0gLyogI19fUFVSRV9fICovd2l0aEVtb3Rpb25DYWNoZShmdW5jdGlvbiAocHJvcHMsIGNhY2hlLCByZWYpIHtcbiAgdmFyIGNzc1Byb3AgPSBwcm9wcy5jc3M7IC8vIHNvIHRoYXQgdXNpbmcgYGNzc2AgZnJvbSBgZW1vdGlvbmAgYW5kIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgY3NzIHByb3Agd29ya3NcbiAgLy8gbm90IHBhc3NpbmcgdGhlIHJlZ2lzdGVyZWQgY2FjaGUgdG8gc2VyaWFsaXplU3R5bGVzIGJlY2F1c2UgaXQgd291bGRcbiAgLy8gbWFrZSBjZXJ0YWluIGJhYmVsIG9wdGltaXNhdGlvbnMgbm90IHBvc3NpYmxlXG5cbiAgaWYgKHR5cGVvZiBjc3NQcm9wID09PSAnc3RyaW5nJyAmJiBjYWNoZS5yZWdpc3RlcmVkW2Nzc1Byb3BdICE9PSB1bmRlZmluZWQpIHtcbiAgICBjc3NQcm9wID0gY2FjaGUucmVnaXN0ZXJlZFtjc3NQcm9wXTtcbiAgfVxuXG4gIHZhciB0eXBlID0gcHJvcHNbdHlwZVByb3BOYW1lXTtcbiAgdmFyIHJlZ2lzdGVyZWRTdHlsZXMgPSBbY3NzUHJvcF07XG4gIHZhciBjbGFzc05hbWUgPSAnJztcblxuICBpZiAodHlwZW9mIHByb3BzLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICBjbGFzc05hbWUgPSBnZXRSZWdpc3RlcmVkU3R5bGVzKGNhY2hlLnJlZ2lzdGVyZWQsIHJlZ2lzdGVyZWRTdHlsZXMsIHByb3BzLmNsYXNzTmFtZSk7XG4gIH0gZWxzZSBpZiAocHJvcHMuY2xhc3NOYW1lICE9IG51bGwpIHtcbiAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyBcIiBcIjtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkID0gc2VyaWFsaXplU3R5bGVzKHJlZ2lzdGVyZWRTdHlsZXMsIHVuZGVmaW5lZCwgdXNlQ29udGV4dChUaGVtZUNvbnRleHQpKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBzZXJpYWxpemVkLm5hbWUuaW5kZXhPZignLScpID09PSAtMSkge1xuICAgIHZhciBsYWJlbEZyb21TdGFjayA9IHByb3BzW2xhYmVsUHJvcE5hbWVdO1xuXG4gICAgaWYgKGxhYmVsRnJvbVN0YWNrKSB7XG4gICAgICBzZXJpYWxpemVkID0gc2VyaWFsaXplU3R5bGVzKFtzZXJpYWxpemVkLCAnbGFiZWw6JyArIGxhYmVsRnJvbVN0YWNrICsgJzsnXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJ1bGVzID0gaW5zZXJ0U3R5bGVzKGNhY2hlLCBzZXJpYWxpemVkLCB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpO1xuICBjbGFzc05hbWUgKz0gY2FjaGUua2V5ICsgXCItXCIgKyBzZXJpYWxpemVkLm5hbWU7XG4gIHZhciBuZXdQcm9wcyA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCBrZXkpICYmIGtleSAhPT0gJ2NzcycgJiYga2V5ICE9PSB0eXBlUHJvcE5hbWUgJiYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgfHwga2V5ICE9PSBsYWJlbFByb3BOYW1lKSkge1xuICAgICAgbmV3UHJvcHNba2V5XSA9IHByb3BzW2tleV07XG4gICAgfVxuICB9XG5cbiAgbmV3UHJvcHMucmVmID0gcmVmO1xuICBuZXdQcm9wcy5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gIHZhciBlbGUgPSAvKiNfX1BVUkVfXyovY3JlYXRlRWxlbWVudCh0eXBlLCBuZXdQcm9wcyk7XG5cbiAgcmV0dXJuIGVsZTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBFbW90aW9uLmRpc3BsYXlOYW1lID0gJ0Vtb3Rpb25Dc3NQcm9wSW50ZXJuYWwnO1xufVxuXG5leHBvcnQgeyBDYWNoZVByb3ZpZGVyIGFzIEMsIEVtb3Rpb24gYXMgRSwgVGhlbWVDb250ZXh0IGFzIFQsIF9fdW5zYWZlX3VzZUVtb3Rpb25DYWNoZSBhcyBfLCBUaGVtZVByb3ZpZGVyIGFzIGEsIHdpdGhUaGVtZSBhcyBiLCBjcmVhdGVFbW90aW9uUHJvcHMgYXMgYywgaGFzT3duUHJvcGVydHkgYXMgaCwgdXNlVGhlbWUgYXMgdSwgd2l0aEVtb3Rpb25DYWNoZSBhcyB3IH07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VDb250ZXh0LCB1c2VSZWYsIHVzZUxheW91dEVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgaCBhcyBoYXNPd25Qcm9wZXJ0eSwgRSBhcyBFbW90aW9uLCBjIGFzIGNyZWF0ZUVtb3Rpb25Qcm9wcywgdyBhcyB3aXRoRW1vdGlvbkNhY2hlLCBUIGFzIFRoZW1lQ29udGV4dCB9IGZyb20gJy4vZW1vdGlvbi1lbGVtZW50LTk5Mjg5YjIxLmJyb3dzZXIuZXNtLmpzJztcbmV4cG9ydCB7IEMgYXMgQ2FjaGVQcm92aWRlciwgVCBhcyBUaGVtZUNvbnRleHQsIGEgYXMgVGhlbWVQcm92aWRlciwgXyBhcyBfX3Vuc2FmZV91c2VFbW90aW9uQ2FjaGUsIHUgYXMgdXNlVGhlbWUsIHcgYXMgd2l0aEVtb3Rpb25DYWNoZSwgYiBhcyB3aXRoVGhlbWUgfSBmcm9tICcuL2Vtb3Rpb24tZWxlbWVudC05OTI4OWIyMS5icm93c2VyLmVzbS5qcyc7XG5pbXBvcnQgJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcyc7XG5pbXBvcnQgJ0BlbW90aW9uL3dlYWstbWVtb2l6ZSc7XG5pbXBvcnQgJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcbmltcG9ydCAnLi4vaXNvbGF0ZWQtaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MtZG8tbm90LXVzZS10aGlzLWluLXlvdXItY29kZS9kaXN0L2Vtb3Rpb24tcmVhY3QtaXNvbGF0ZWQtaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MtZG8tbm90LXVzZS10aGlzLWluLXlvdXItY29kZS5icm93c2VyLmVzbS5qcyc7XG5pbXBvcnQgeyBpbnNlcnRTdHlsZXMsIGdldFJlZ2lzdGVyZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi91dGlscyc7XG5pbXBvcnQgeyBzZXJpYWxpemVTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9zZXJpYWxpemUnO1xuaW1wb3J0IHsgU3R5bGVTaGVldCB9IGZyb20gJ0BlbW90aW9uL3NoZWV0JztcblxudmFyIHBrZyA9IHtcblx0bmFtZTogXCJAZW1vdGlvbi9yZWFjdFwiLFxuXHR2ZXJzaW9uOiBcIjExLjQuMVwiLFxuXHRtYWluOiBcImRpc3QvZW1vdGlvbi1yZWFjdC5janMuanNcIixcblx0bW9kdWxlOiBcImRpc3QvZW1vdGlvbi1yZWFjdC5lc20uanNcIixcblx0YnJvd3Nlcjoge1xuXHRcdFwiLi9kaXN0L2Vtb3Rpb24tcmVhY3QuY2pzLmpzXCI6IFwiLi9kaXN0L2Vtb3Rpb24tcmVhY3QuYnJvd3Nlci5janMuanNcIixcblx0XHRcIi4vZGlzdC9lbW90aW9uLXJlYWN0LmVzbS5qc1wiOiBcIi4vZGlzdC9lbW90aW9uLXJlYWN0LmJyb3dzZXIuZXNtLmpzXCJcblx0fSxcblx0dHlwZXM6IFwidHlwZXMvaW5kZXguZC50c1wiLFxuXHRmaWxlczogW1xuXHRcdFwic3JjXCIsXG5cdFx0XCJkaXN0XCIsXG5cdFx0XCJqc3gtcnVudGltZVwiLFxuXHRcdFwianN4LWRldi1ydW50aW1lXCIsXG5cdFx0XCJpc29sYXRlZC1ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy1kby1ub3QtdXNlLXRoaXMtaW4teW91ci1jb2RlXCIsXG5cdFx0XCJ0eXBlcy8qLmQudHNcIixcblx0XHRcIm1hY3JvLmpzXCIsXG5cdFx0XCJtYWNyby5kLnRzXCIsXG5cdFx0XCJtYWNyby5qcy5mbG93XCJcblx0XSxcblx0c2lkZUVmZmVjdHM6IGZhbHNlLFxuXHRhdXRob3I6IFwibWl0Y2hlbGxoYW1pbHRvbiA8bWl0Y2hlbGxAbWl0Y2hlbGxoYW1pbHRvbi5tZT5cIixcblx0bGljZW5zZTogXCJNSVRcIixcblx0c2NyaXB0czoge1xuXHRcdFwidGVzdDp0eXBlc2NyaXB0XCI6IFwiZHRzbGludCB0eXBlc1wiXG5cdH0sXG5cdGRlcGVuZGVuY2llczoge1xuXHRcdFwiQGJhYmVsL3J1bnRpbWVcIjogXCJeNy4xMy4xMFwiLFxuXHRcdFwiQGVtb3Rpb24vY2FjaGVcIjogXCJeMTEuNC4wXCIsXG5cdFx0XCJAZW1vdGlvbi9zZXJpYWxpemVcIjogXCJeMS4wLjJcIixcblx0XHRcIkBlbW90aW9uL3NoZWV0XCI6IFwiXjEuMC4yXCIsXG5cdFx0XCJAZW1vdGlvbi91dGlsc1wiOiBcIl4xLjAuMFwiLFxuXHRcdFwiQGVtb3Rpb24vd2Vhay1tZW1vaXplXCI6IFwiXjAuMi41XCIsXG5cdFx0XCJob2lzdC1ub24tcmVhY3Qtc3RhdGljc1wiOiBcIl4zLjMuMVwiXG5cdH0sXG5cdHBlZXJEZXBlbmRlbmNpZXM6IHtcblx0XHRcIkBiYWJlbC9jb3JlXCI6IFwiXjcuMC4wXCIsXG5cdFx0cmVhY3Q6IFwiPj0xNi44LjBcIlxuXHR9LFxuXHRwZWVyRGVwZW5kZW5jaWVzTWV0YToge1xuXHRcdFwiQGJhYmVsL2NvcmVcIjoge1xuXHRcdFx0b3B0aW9uYWw6IHRydWVcblx0XHR9LFxuXHRcdFwiQHR5cGVzL3JlYWN0XCI6IHtcblx0XHRcdG9wdGlvbmFsOiB0cnVlXG5cdFx0fVxuXHR9LFxuXHRkZXZEZXBlbmRlbmNpZXM6IHtcblx0XHRcIkBiYWJlbC9jb3JlXCI6IFwiXjcuMTMuMTBcIixcblx0XHRcIkBlbW90aW9uL2Nzc1wiOiBcIjExLjEuM1wiLFxuXHRcdFwiQGVtb3Rpb24vY3NzLXByZXR0aWZpZXJcIjogXCIxLjAuMFwiLFxuXHRcdFwiQGVtb3Rpb24vc2VydmVyXCI6IFwiMTEuNC4wXCIsXG5cdFx0XCJAZW1vdGlvbi9zdHlsZWRcIjogXCIxMS4zLjBcIixcblx0XHRcIkB0eXBlcy9yZWFjdFwiOiBcIl4xNi45LjExXCIsXG5cdFx0ZHRzbGludDogXCJeMC4zLjBcIixcblx0XHRcImh0bWwtdGFnLW5hbWVzXCI6IFwiXjEuMS4yXCIsXG5cdFx0cmVhY3Q6IFwiMTYuMTQuMFwiLFxuXHRcdFwic3ZnLXRhZy1uYW1lc1wiOiBcIl4xLjEuMVwiXG5cdH0sXG5cdHJlcG9zaXRvcnk6IFwiaHR0cHM6Ly9naXRodWIuY29tL2Vtb3Rpb24tanMvZW1vdGlvbi90cmVlL21haW4vcGFja2FnZXMvcmVhY3RcIixcblx0cHVibGlzaENvbmZpZzoge1xuXHRcdGFjY2VzczogXCJwdWJsaWNcIlxuXHR9LFxuXHRcInVtZDptYWluXCI6IFwiZGlzdC9lbW90aW9uLXJlYWN0LnVtZC5taW4uanNcIixcblx0cHJlY29uc3RydWN0OiB7XG5cdFx0ZW50cnlwb2ludHM6IFtcblx0XHRcdFwiLi9pbmRleC5qc1wiLFxuXHRcdFx0XCIuL2pzeC1ydW50aW1lLmpzXCIsXG5cdFx0XHRcIi4vanN4LWRldi1ydW50aW1lLmpzXCIsXG5cdFx0XHRcIi4vaXNvbGF0ZWQtaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MtZG8tbm90LXVzZS10aGlzLWluLXlvdXItY29kZS5qc1wiXG5cdFx0XSxcblx0XHR1bWROYW1lOiBcImVtb3Rpb25SZWFjdFwiXG5cdH1cbn07XG5cbnZhciBqc3ggPSBmdW5jdGlvbiBqc3godHlwZSwgcHJvcHMpIHtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgaWYgKHByb3BzID09IG51bGwgfHwgIWhhc093blByb3BlcnR5LmNhbGwocHJvcHMsICdjc3MnKSkge1xuICAgIC8vICRGbG93Rml4TWVcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudC5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICB9XG5cbiAgdmFyIGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgdmFyIGNyZWF0ZUVsZW1lbnRBcmdBcnJheSA9IG5ldyBBcnJheShhcmdzTGVuZ3RoKTtcbiAgY3JlYXRlRWxlbWVudEFyZ0FycmF5WzBdID0gRW1vdGlvbjtcbiAgY3JlYXRlRWxlbWVudEFyZ0FycmF5WzFdID0gY3JlYXRlRW1vdGlvblByb3BzKHR5cGUsIHByb3BzKTtcblxuICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3NMZW5ndGg7IGkrKykge1xuICAgIGNyZWF0ZUVsZW1lbnRBcmdBcnJheVtpXSA9IGFyZ3NbaV07XG4gIH0gLy8gJEZsb3dGaXhNZVxuXG5cbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQuYXBwbHkobnVsbCwgY3JlYXRlRWxlbWVudEFyZ0FycmF5KTtcbn07XG5cbnZhciB3YXJuZWRBYm91dENzc1Byb3BGb3JHbG9iYWwgPSBmYWxzZTsgLy8gbWFpbnRhaW4gcGxhY2Ugb3ZlciByZXJlbmRlcnMuXG4vLyBpbml0aWFsIHJlbmRlciBmcm9tIGJyb3dzZXIsIGluc2VydEJlZm9yZSBjb250ZXh0LnNoZWV0LnRhZ3NbMF0gb3IgaWYgYSBzdHlsZSBoYXNuJ3QgYmVlbiBpbnNlcnRlZCB0aGVyZSB5ZXQsIGFwcGVuZENoaWxkXG4vLyBpbml0aWFsIGNsaWVudC1zaWRlIHJlbmRlciBmcm9tIFNTUiwgdXNlIHBsYWNlIG9mIGh5ZHJhdGluZyB0YWdcblxudmFyIEdsb2JhbCA9IC8qICNfX1BVUkVfXyAqL3dpdGhFbW90aW9uQ2FjaGUoZnVuY3Rpb24gKHByb3BzLCBjYWNoZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhd2FybmVkQWJvdXRDc3NQcm9wRm9yR2xvYmFsICYmICggLy8gY2hlY2sgZm9yIGNsYXNzTmFtZSBhcyB3ZWxsIHNpbmNlIHRoZSB1c2VyIGlzXG4gIC8vIHByb2JhYmx5IHVzaW5nIHRoZSBjdXN0b20gY3JlYXRlRWxlbWVudCB3aGljaFxuICAvLyBtZWFucyBpdCB3aWxsIGJlIHR1cm5lZCBpbnRvIGEgY2xhc3NOYW1lIHByb3BcbiAgLy8gJEZsb3dGaXhNZSBJIGRvbid0IHJlYWxseSB3YW50IHRvIGFkZCBpdCB0byB0aGUgdHlwZSBzaW5jZSBpdCBzaG91bGRuJ3QgYmUgdXNlZFxuICBwcm9wcy5jbGFzc05hbWUgfHwgcHJvcHMuY3NzKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJJdCBsb29rcyBsaWtlIHlvdSdyZSB1c2luZyB0aGUgY3NzIHByb3Agb24gR2xvYmFsLCBkaWQgeW91IG1lYW4gdG8gdXNlIHRoZSBzdHlsZXMgcHJvcCBpbnN0ZWFkP1wiKTtcbiAgICB3YXJuZWRBYm91dENzc1Byb3BGb3JHbG9iYWwgPSB0cnVlO1xuICB9XG5cbiAgdmFyIHN0eWxlcyA9IHByb3BzLnN0eWxlcztcbiAgdmFyIHNlcmlhbGl6ZWQgPSBzZXJpYWxpemVTdHlsZXMoW3N0eWxlc10sIHVuZGVmaW5lZCwgdXNlQ29udGV4dChUaGVtZUNvbnRleHQpKTtcbiAgLy8gYnV0IGl0IGlzIGJhc2VkIG9uIGEgY29uc3RhbnQgdGhhdCB3aWxsIG5ldmVyIGNoYW5nZSBhdCBydW50aW1lXG4gIC8vIGl0J3MgZWZmZWN0aXZlbHkgbGlrZSBoYXZpbmcgdHdvIGltcGxlbWVudGF0aW9ucyBhbmQgc3dpdGNoaW5nIHRoZW0gb3V0XG4gIC8vIHNvIGl0J3Mgbm90IGFjdHVhbGx5IGJyZWFraW5nIGFueXRoaW5nXG5cblxuICB2YXIgc2hlZXRSZWYgPSB1c2VSZWYoKTtcbiAgdXNlTGF5b3V0RWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIga2V5ID0gY2FjaGUua2V5ICsgXCItZ2xvYmFsXCI7XG4gICAgdmFyIHNoZWV0ID0gbmV3IFN0eWxlU2hlZXQoe1xuICAgICAga2V5OiBrZXksXG4gICAgICBub25jZTogY2FjaGUuc2hlZXQubm9uY2UsXG4gICAgICBjb250YWluZXI6IGNhY2hlLnNoZWV0LmNvbnRhaW5lcixcbiAgICAgIHNwZWVkeTogY2FjaGUuc2hlZXQuaXNTcGVlZHlcbiAgICB9KTtcbiAgICB2YXIgcmVoeWRyYXRpbmcgPSBmYWxzZTsgLy8gJEZsb3dGaXhNZVxuXG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3R5bGVbZGF0YS1lbW90aW9uPVxcXCJcIiArIGtleSArIFwiIFwiICsgc2VyaWFsaXplZC5uYW1lICsgXCJcXFwiXVwiKTtcblxuICAgIGlmIChjYWNoZS5zaGVldC50YWdzLmxlbmd0aCkge1xuICAgICAgc2hlZXQuYmVmb3JlID0gY2FjaGUuc2hlZXQudGFnc1swXTtcbiAgICB9XG5cbiAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgcmVoeWRyYXRpbmcgPSB0cnVlOyAvLyBjbGVhciB0aGUgaGFzaCBzbyB0aGlzIG5vZGUgd29uJ3QgYmUgcmVjb2duaXphYmxlIGFzIHJlaHlkcmF0YWJsZSBieSBvdGhlciA8R2xvYmFsLz5zXG5cbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWVtb3Rpb24nLCBrZXkpO1xuICAgICAgc2hlZXQuaHlkcmF0ZShbbm9kZV0pO1xuICAgIH1cblxuICAgIHNoZWV0UmVmLmN1cnJlbnQgPSBbc2hlZXQsIHJlaHlkcmF0aW5nXTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgc2hlZXQuZmx1c2goKTtcbiAgICB9O1xuICB9LCBbY2FjaGVdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2hlZXRSZWZDdXJyZW50ID0gc2hlZXRSZWYuY3VycmVudDtcbiAgICB2YXIgc2hlZXQgPSBzaGVldFJlZkN1cnJlbnRbMF0sXG4gICAgICAgIHJlaHlkcmF0aW5nID0gc2hlZXRSZWZDdXJyZW50WzFdO1xuXG4gICAgaWYgKHJlaHlkcmF0aW5nKSB7XG4gICAgICBzaGVldFJlZkN1cnJlbnRbMV0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2VyaWFsaXplZC5uZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGluc2VydCBrZXlmcmFtZXNcbiAgICAgIGluc2VydFN0eWxlcyhjYWNoZSwgc2VyaWFsaXplZC5uZXh0LCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoc2hlZXQudGFncy5sZW5ndGgpIHtcbiAgICAgIC8vIGlmIHRoaXMgZG9lc24ndCBleGlzdCB0aGVuIGl0IHdpbGwgYmUgbnVsbCBzbyB0aGUgc3R5bGUgZWxlbWVudCB3aWxsIGJlIGFwcGVuZGVkXG4gICAgICB2YXIgZWxlbWVudCA9IHNoZWV0LnRhZ3Nbc2hlZXQudGFncy5sZW5ndGggLSAxXS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBzaGVldC5iZWZvcmUgPSBlbGVtZW50O1xuICAgICAgc2hlZXQuZmx1c2goKTtcbiAgICB9XG5cbiAgICBjYWNoZS5pbnNlcnQoXCJcIiwgc2VyaWFsaXplZCwgc2hlZXQsIGZhbHNlKTtcbiAgfSwgW2NhY2hlLCBzZXJpYWxpemVkLm5hbWVdKTtcbiAgcmV0dXJuIG51bGw7XG59KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgR2xvYmFsLmRpc3BsYXlOYW1lID0gJ0Vtb3Rpb25HbG9iYWwnO1xufVxuXG5mdW5jdGlvbiBjc3MoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gc2VyaWFsaXplU3R5bGVzKGFyZ3MpO1xufVxuXG52YXIga2V5ZnJhbWVzID0gZnVuY3Rpb24ga2V5ZnJhbWVzKCkge1xuICB2YXIgaW5zZXJ0YWJsZSA9IGNzcy5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gIHZhciBuYW1lID0gXCJhbmltYXRpb24tXCIgKyBpbnNlcnRhYmxlLm5hbWU7IC8vICRGbG93Rml4TWVcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgc3R5bGVzOiBcIkBrZXlmcmFtZXMgXCIgKyBuYW1lICsgXCJ7XCIgKyBpbnNlcnRhYmxlLnN0eWxlcyArIFwifVwiLFxuICAgIGFuaW06IDEsXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIFwiX0VNT19cIiArIHRoaXMubmFtZSArIFwiX1wiICsgdGhpcy5zdHlsZXMgKyBcIl9FTU9fXCI7XG4gICAgfVxuICB9O1xufTtcblxudmFyIGNsYXNzbmFtZXMgPSBmdW5jdGlvbiBjbGFzc25hbWVzKGFyZ3MpIHtcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBjbHMgPSAnJztcblxuICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGFyZyA9IGFyZ3NbaV07XG4gICAgaWYgKGFyZyA9PSBudWxsKSBjb250aW51ZTtcbiAgICB2YXIgdG9BZGQgPSB2b2lkIDA7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBhcmcpIHtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIHRvQWRkID0gY2xhc3NuYW1lcyhhcmcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBhcmcuc3R5bGVzICE9PSB1bmRlZmluZWQgJiYgYXJnLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdZb3UgaGF2ZSBwYXNzZWQgc3R5bGVzIGNyZWF0ZWQgd2l0aCBgY3NzYCBmcm9tIGBAZW1vdGlvbi9yZWFjdGAgcGFja2FnZSB0byB0aGUgYGN4YC5cXG4nICsgJ2BjeGAgaXMgbWVhbnQgdG8gY29tcG9zZSBjbGFzcyBuYW1lcyAoc3RyaW5ncykgc28geW91IHNob3VsZCBjb252ZXJ0IHRob3NlIHN0eWxlcyB0byBhIGNsYXNzIG5hbWUgYnkgcGFzc2luZyB0aGVtIHRvIHRoZSBgY3NzYCByZWNlaXZlZCBmcm9tIDxDbGFzc05hbWVzLz4gY29tcG9uZW50LicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b0FkZCA9ICcnO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIGFyZykge1xuICAgICAgICAgICAgICBpZiAoYXJnW2tdICYmIGspIHtcbiAgICAgICAgICAgICAgICB0b0FkZCAmJiAodG9BZGQgKz0gJyAnKTtcbiAgICAgICAgICAgICAgICB0b0FkZCArPSBrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAge1xuICAgICAgICAgIHRvQWRkID0gYXJnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvQWRkKSB7XG4gICAgICBjbHMgJiYgKGNscyArPSAnICcpO1xuICAgICAgY2xzICs9IHRvQWRkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbHM7XG59O1xuXG5mdW5jdGlvbiBtZXJnZShyZWdpc3RlcmVkLCBjc3MsIGNsYXNzTmFtZSkge1xuICB2YXIgcmVnaXN0ZXJlZFN0eWxlcyA9IFtdO1xuICB2YXIgcmF3Q2xhc3NOYW1lID0gZ2V0UmVnaXN0ZXJlZFN0eWxlcyhyZWdpc3RlcmVkLCByZWdpc3RlcmVkU3R5bGVzLCBjbGFzc05hbWUpO1xuXG4gIGlmIChyZWdpc3RlcmVkU3R5bGVzLmxlbmd0aCA8IDIpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgcmV0dXJuIHJhd0NsYXNzTmFtZSArIGNzcyhyZWdpc3RlcmVkU3R5bGVzKTtcbn1cblxudmFyIENsYXNzTmFtZXMgPSAvKiAjX19QVVJFX18gKi93aXRoRW1vdGlvbkNhY2hlKGZ1bmN0aW9uIChwcm9wcywgY2FjaGUpIHtcbiAgdmFyIGhhc1JlbmRlcmVkID0gZmFsc2U7XG5cbiAgdmFyIGNzcyA9IGZ1bmN0aW9uIGNzcygpIHtcbiAgICBpZiAoaGFzUmVuZGVyZWQgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjc3MgY2FuIG9ubHkgYmUgdXNlZCBkdXJpbmcgcmVuZGVyJyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBzZXJpYWxpemVkID0gc2VyaWFsaXplU3R5bGVzKGFyZ3MsIGNhY2hlLnJlZ2lzdGVyZWQpO1xuXG4gICAge1xuICAgICAgaW5zZXJ0U3R5bGVzKGNhY2hlLCBzZXJpYWxpemVkLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlLmtleSArIFwiLVwiICsgc2VyaWFsaXplZC5uYW1lO1xuICB9O1xuXG4gIHZhciBjeCA9IGZ1bmN0aW9uIGN4KCkge1xuICAgIGlmIChoYXNSZW5kZXJlZCAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N4IGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIHJlbmRlcicpO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiBtZXJnZShjYWNoZS5yZWdpc3RlcmVkLCBjc3MsIGNsYXNzbmFtZXMoYXJncykpO1xuICB9O1xuXG4gIHZhciBjb250ZW50ID0ge1xuICAgIGNzczogY3NzLFxuICAgIGN4OiBjeCxcbiAgICB0aGVtZTogdXNlQ29udGV4dChUaGVtZUNvbnRleHQpXG4gIH07XG4gIHZhciBlbGUgPSBwcm9wcy5jaGlsZHJlbihjb250ZW50KTtcbiAgaGFzUmVuZGVyZWQgPSB0cnVlO1xuXG4gIHJldHVybiBlbGU7XG59KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgQ2xhc3NOYW1lcy5kaXNwbGF5TmFtZSA9ICdFbW90aW9uQ2xhc3NOYW1lcyc7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpc0Jyb3dzZXIgPSBcIm9iamVjdFwiICE9PSAndW5kZWZpbmVkJzsgLy8gIzE3MjcgZm9yIHNvbWUgcmVhc29uIEplc3QgZXZhbHVhdGVzIG1vZHVsZXMgdHdpY2UgaWYgc29tZSBjb25zdW1pbmcgbW9kdWxlIGdldHMgbW9ja2VkIHdpdGggamVzdC5tb2NrXG5cbiAgdmFyIGlzSmVzdCA9IHR5cGVvZiBqZXN0ICE9PSAndW5kZWZpbmVkJztcblxuICBpZiAoaXNCcm93c2VyICYmICFpc0plc3QpIHtcbiAgICB2YXIgZ2xvYmFsQ29udGV4dCA9IGlzQnJvd3NlciA/IHdpbmRvdyA6IGdsb2JhbDtcbiAgICB2YXIgZ2xvYmFsS2V5ID0gXCJfX0VNT1RJT05fUkVBQ1RfXCIgKyBwa2cudmVyc2lvbi5zcGxpdCgnLicpWzBdICsgXCJfX1wiO1xuXG4gICAgaWYgKGdsb2JhbENvbnRleHRbZ2xvYmFsS2V5XSkge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgYXJlIGxvYWRpbmcgQGVtb3Rpb24vcmVhY3Qgd2hlbiBpdCBpcyBhbHJlYWR5IGxvYWRlZC4gUnVubmluZyAnICsgJ211bHRpcGxlIGluc3RhbmNlcyBtYXkgY2F1c2UgcHJvYmxlbXMuIFRoaXMgY2FuIGhhcHBlbiBpZiBtdWx0aXBsZSAnICsgJ3ZlcnNpb25zIGFyZSB1c2VkLCBvciBpZiBtdWx0aXBsZSBidWlsZHMgb2YgdGhlIHNhbWUgdmVyc2lvbiBhcmUgJyArICd1c2VkLicpO1xuICAgIH1cblxuICAgIGdsb2JhbENvbnRleHRbZ2xvYmFsS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ2xhc3NOYW1lcywgR2xvYmFsLCBqc3ggYXMgY3JlYXRlRWxlbWVudCwgY3NzLCBqc3gsIGtleWZyYW1lcyB9O1xuIiwiaW1wb3J0IGhvaXN0Tm9uUmVhY3RTdGF0aWNzJDEgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuXG4vLyB0aGlzIGZpbGUgaXNvbGF0ZXMgdGhpcyBwYWNrYWdlIHRoYXQgaXMgbm90IHRyZWUtc2hha2VhYmxlXG4vLyBhbmQgaWYgdGhpcyBtb2R1bGUgZG9lc24ndCBhY3R1YWxseSBjb250YWluIGFueSBsb2dpYyBvZiBpdHMgb3duXG4vLyB0aGVuIFJvbGx1cCBqdXN0IHVzZSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnIGRpcmVjdGx5IGluIG90aGVyIGNodW5rc1xuXG52YXIgaG9pc3ROb25SZWFjdFN0YXRpY3MgPSAoZnVuY3Rpb24gKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50KSB7XG4gIHJldHVybiBob2lzdE5vblJlYWN0U3RhdGljcyQxKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBob2lzdE5vblJlYWN0U3RhdGljcztcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiaW1wb3J0IGhhc2hTdHJpbmcgZnJvbSAnQGVtb3Rpb24vaGFzaCc7XG5pbXBvcnQgdW5pdGxlc3MgZnJvbSAnQGVtb3Rpb24vdW5pdGxlc3MnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnQGVtb3Rpb24vbWVtb2l6ZSc7XG5cbnZhciBJTExFR0FMX0VTQ0FQRV9TRVFVRU5DRV9FUlJPUiA9IFwiWW91IGhhdmUgaWxsZWdhbCBlc2NhcGUgc2VxdWVuY2UgaW4geW91ciB0ZW1wbGF0ZSBsaXRlcmFsLCBtb3N0IGxpa2VseSBpbnNpZGUgY29udGVudCdzIHByb3BlcnR5IHZhbHVlLlxcbkJlY2F1c2UgeW91IHdyaXRlIHlvdXIgQ1NTIGluc2lkZSBhIEphdmFTY3JpcHQgc3RyaW5nIHlvdSBhY3R1YWxseSBoYXZlIHRvIGRvIGRvdWJsZSBlc2NhcGluZywgc28gZm9yIGV4YW1wbGUgXFxcImNvbnRlbnQ6ICdcXFxcMDBkNyc7XFxcIiBzaG91bGQgYmVjb21lIFxcXCJjb250ZW50OiAnXFxcXFxcXFwwMGQ3JztcXFwiLlxcbllvdSBjYW4gcmVhZCBtb3JlIGFib3V0IHRoaXMgaGVyZTpcXG5odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFscyNFUzIwMThfcmV2aXNpb25fb2ZfaWxsZWdhbF9lc2NhcGVfc2VxdWVuY2VzXCI7XG52YXIgVU5ERUZJTkVEX0FTX09CSkVDVF9LRVlfRVJST1IgPSBcIllvdSBoYXZlIHBhc3NlZCBpbiBmYWxzeSB2YWx1ZSBhcyBzdHlsZSBvYmplY3QncyBrZXkgKGNhbiBoYXBwZW4gd2hlbiBpbiBleGFtcGxlIHlvdSBwYXNzIHVuZXhwb3J0ZWQgY29tcG9uZW50IGFzIGNvbXB1dGVkIGtleSkuXCI7XG52YXIgaHlwaGVuYXRlUmVnZXggPSAvW0EtWl18Xm1zL2c7XG52YXIgYW5pbWF0aW9uUmVnZXggPSAvX0VNT18oW15fXSs/KV8oW15dKj8pX0VNT18vZztcblxudmFyIGlzQ3VzdG9tUHJvcGVydHkgPSBmdW5jdGlvbiBpc0N1c3RvbVByb3BlcnR5KHByb3BlcnR5KSB7XG4gIHJldHVybiBwcm9wZXJ0eS5jaGFyQ29kZUF0KDEpID09PSA0NTtcbn07XG5cbnZhciBpc1Byb2Nlc3NhYmxlVmFsdWUgPSBmdW5jdGlvbiBpc1Byb2Nlc3NhYmxlVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbic7XG59O1xuXG52YXIgcHJvY2Vzc1N0eWxlTmFtZSA9IC8qICNfX1BVUkVfXyAqL21lbW9pemUoZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xuICByZXR1cm4gaXNDdXN0b21Qcm9wZXJ0eShzdHlsZU5hbWUpID8gc3R5bGVOYW1lIDogc3R5bGVOYW1lLnJlcGxhY2UoaHlwaGVuYXRlUmVnZXgsICctJCYnKS50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbnZhciBwcm9jZXNzU3R5bGVWYWx1ZSA9IGZ1bmN0aW9uIHByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgc3dpdGNoIChrZXkpIHtcbiAgICBjYXNlICdhbmltYXRpb24nOlxuICAgIGNhc2UgJ2FuaW1hdGlvbk5hbWUnOlxuICAgICAge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKGFuaW1hdGlvblJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gsIHAxLCBwMikge1xuICAgICAgICAgICAgY3Vyc29yID0ge1xuICAgICAgICAgICAgICBuYW1lOiBwMSxcbiAgICAgICAgICAgICAgc3R5bGVzOiBwMixcbiAgICAgICAgICAgICAgbmV4dDogY3Vyc29yXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHAxO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBpZiAodW5pdGxlc3Nba2V5XSAhPT0gMSAmJiAhaXNDdXN0b21Qcm9wZXJ0eShrZXkpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdmFsdWUgKyAncHgnO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGNvbnRlbnRWYWx1ZVBhdHRlcm4gPSAvKGF0dHJ8Y291bnRlcnM/fHVybHwoKChyZXBlYXRpbmctKT8obGluZWFyfHJhZGlhbCkpfGNvbmljKS1ncmFkaWVudClcXCh8KG5vLSk/KG9wZW58Y2xvc2UpLXF1b3RlLztcbiAgdmFyIGNvbnRlbnRWYWx1ZXMgPSBbJ25vcm1hbCcsICdub25lJywgJ2luaXRpYWwnLCAnaW5oZXJpdCcsICd1bnNldCddO1xuICB2YXIgb2xkUHJvY2Vzc1N0eWxlVmFsdWUgPSBwcm9jZXNzU3R5bGVWYWx1ZTtcbiAgdmFyIG1zUGF0dGVybiA9IC9eLW1zLS87XG4gIHZhciBoeXBoZW5QYXR0ZXJuID0gLy0oLikvZztcbiAgdmFyIGh5cGhlbmF0ZWRDYWNoZSA9IHt9O1xuXG4gIHByb2Nlc3NTdHlsZVZhbHVlID0gZnVuY3Rpb24gcHJvY2Vzc1N0eWxlVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgPT09ICdjb250ZW50Jykge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgY29udGVudFZhbHVlcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEgJiYgIWNvbnRlbnRWYWx1ZVBhdHRlcm4udGVzdCh2YWx1ZSkgJiYgKHZhbHVlLmNoYXJBdCgwKSAhPT0gdmFsdWUuY2hhckF0KHZhbHVlLmxlbmd0aCAtIDEpIHx8IHZhbHVlLmNoYXJBdCgwKSAhPT0gJ1wiJyAmJiB2YWx1ZS5jaGFyQXQoMCkgIT09IFwiJ1wiKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3Ugc2VlbSB0byBiZSB1c2luZyBhIHZhbHVlIGZvciAnY29udGVudCcgd2l0aG91dCBxdW90ZXMsIHRyeSByZXBsYWNpbmcgaXQgd2l0aCBgY29udGVudDogJ1xcXCJcIiArIHZhbHVlICsgXCJcXFwiJ2BcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByb2Nlc3NlZCA9IG9sZFByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpO1xuXG4gICAgaWYgKHByb2Nlc3NlZCAhPT0gJycgJiYgIWlzQ3VzdG9tUHJvcGVydHkoa2V5KSAmJiBrZXkuaW5kZXhPZignLScpICE9PSAtMSAmJiBoeXBoZW5hdGVkQ2FjaGVba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoeXBoZW5hdGVkQ2FjaGVba2V5XSA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVXNpbmcga2ViYWItY2FzZSBmb3IgY3NzIHByb3BlcnRpZXMgaW4gb2JqZWN0cyBpcyBub3Qgc3VwcG9ydGVkLiBEaWQgeW91IG1lYW4gXCIgKyBrZXkucmVwbGFjZShtc1BhdHRlcm4sICdtcy0nKS5yZXBsYWNlKGh5cGhlblBhdHRlcm4sIGZ1bmN0aW9uIChzdHIsIF9jaGFyKSB7XG4gICAgICAgIHJldHVybiBfY2hhci50b1VwcGVyQ2FzZSgpO1xuICAgICAgfSkgKyBcIj9cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2Nlc3NlZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlSW50ZXJwb2xhdGlvbihtZXJnZWRQcm9wcywgcmVnaXN0ZXJlZCwgaW50ZXJwb2xhdGlvbikge1xuICBpZiAoaW50ZXJwb2xhdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKGludGVycG9sYXRpb24uX19lbW90aW9uX3N0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaW50ZXJwb2xhdGlvbi50b1N0cmluZygpID09PSAnTk9fQ09NUE9ORU5UX1NFTEVDVE9SJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgc2VsZWN0b3JzIGNhbiBvbmx5IGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBAZW1vdGlvbi9iYWJlbC1wbHVnaW4uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVycG9sYXRpb247XG4gIH1cblxuICBzd2l0Y2ggKHR5cGVvZiBpbnRlcnBvbGF0aW9uKSB7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICB7XG4gICAgICAgIGlmIChpbnRlcnBvbGF0aW9uLmFuaW0gPT09IDEpIHtcbiAgICAgICAgICBjdXJzb3IgPSB7XG4gICAgICAgICAgICBuYW1lOiBpbnRlcnBvbGF0aW9uLm5hbWUsXG4gICAgICAgICAgICBzdHlsZXM6IGludGVycG9sYXRpb24uc3R5bGVzLFxuICAgICAgICAgICAgbmV4dDogY3Vyc29yXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gaW50ZXJwb2xhdGlvbi5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGludGVycG9sYXRpb24uc3R5bGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgbmV4dCA9IGludGVycG9sYXRpb24ubmV4dDtcblxuICAgICAgICAgIGlmIChuZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIG5vdCB0aGUgbW9zdCBlZmZpY2llbnQgdGhpbmcgZXZlciBidXQgdGhpcyBpcyBhIHByZXR0eSByYXJlIGNhc2VcbiAgICAgICAgICAgIC8vIGFuZCB0aGVyZSB3aWxsIGJlIHZlcnkgZmV3IGl0ZXJhdGlvbnMgb2YgdGhpcyBnZW5lcmFsbHlcbiAgICAgICAgICAgIHdoaWxlIChuZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgY3Vyc29yID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IG5leHQubmFtZSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IG5leHQuc3R5bGVzLFxuICAgICAgICAgICAgICAgIG5leHQ6IGN1cnNvclxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBuZXh0ID0gbmV4dC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdHlsZXMgPSBpbnRlcnBvbGF0aW9uLnN0eWxlcyArIFwiO1wiO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaW50ZXJwb2xhdGlvbi5tYXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3R5bGVzICs9IGludGVycG9sYXRpb24ubWFwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3JlYXRlU3RyaW5nRnJvbU9iamVjdChtZXJnZWRQcm9wcywgcmVnaXN0ZXJlZCwgaW50ZXJwb2xhdGlvbik7XG4gICAgICB9XG5cbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICB7XG4gICAgICAgIGlmIChtZXJnZWRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHByZXZpb3VzQ3Vyc29yID0gY3Vyc29yO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBpbnRlcnBvbGF0aW9uKG1lcmdlZFByb3BzKTtcbiAgICAgICAgICBjdXJzb3IgPSBwcmV2aW91c0N1cnNvcjtcbiAgICAgICAgICByZXR1cm4gaGFuZGxlSW50ZXJwb2xhdGlvbihtZXJnZWRQcm9wcywgcmVnaXN0ZXJlZCwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRnVuY3Rpb25zIHRoYXQgYXJlIGludGVycG9sYXRlZCBpbiBjc3MgY2FsbHMgd2lsbCBiZSBzdHJpbmdpZmllZC5cXG4nICsgJ0lmIHlvdSB3YW50IHRvIGhhdmUgYSBjc3MgY2FsbCBiYXNlZCBvbiBwcm9wcywgY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgY3NzIGNhbGwgbGlrZSB0aGlzXFxuJyArICdsZXQgZHluYW1pY1N0eWxlID0gKHByb3BzKSA9PiBjc3NgY29sb3I6ICR7cHJvcHMuY29sb3J9YFxcbicgKyAnSXQgY2FuIGJlIGNhbGxlZCBkaXJlY3RseSB3aXRoIHByb3BzIG9yIGludGVycG9sYXRlZCBpbiBhIHN0eWxlZCBjYWxsIGxpa2UgdGhpc1xcbicgKyBcImxldCBTb21lQ29tcG9uZW50ID0gc3R5bGVkKCdkaXYnKWAke2R5bmFtaWNTdHlsZX1gXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBbXTtcbiAgICAgICAgdmFyIHJlcGxhY2VkID0gaW50ZXJwb2xhdGlvbi5yZXBsYWNlKGFuaW1hdGlvblJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gsIHAxLCBwMikge1xuICAgICAgICAgIHZhciBmYWtlVmFyTmFtZSA9IFwiYW5pbWF0aW9uXCIgKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgICBtYXRjaGVkLnB1c2goXCJjb25zdCBcIiArIGZha2VWYXJOYW1lICsgXCIgPSBrZXlmcmFtZXNgXCIgKyBwMi5yZXBsYWNlKC9eQGtleWZyYW1lcyBhbmltYXRpb24tXFx3Ky8sICcnKSArIFwiYFwiKTtcbiAgICAgICAgICByZXR1cm4gXCIke1wiICsgZmFrZVZhck5hbWUgKyBcIn1cIjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1hdGNoZWQubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignYGtleWZyYW1lc2Agb3V0cHV0IGdvdCBpbnRlcnBvbGF0ZWQgaW50byBwbGFpbiBzdHJpbmcsIHBsZWFzZSB3cmFwIGl0IHdpdGggYGNzc2AuXFxuXFxuJyArICdJbnN0ZWFkIG9mIGRvaW5nIHRoaXM6XFxuXFxuJyArIFtdLmNvbmNhdChtYXRjaGVkLCBbXCJgXCIgKyByZXBsYWNlZCArIFwiYFwiXSkuam9pbignXFxuJykgKyAnXFxuXFxuWW91IHNob3VsZCB3cmFwIGl0IHdpdGggYGNzc2AgbGlrZSB0aGlzOlxcblxcbicgKyAoXCJjc3NgXCIgKyByZXBsYWNlZCArIFwiYFwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gIH0gLy8gZmluYWxpemUgc3RyaW5nIHZhbHVlcyAocmVndWxhciBzdHJpbmdzIGFuZCBmdW5jdGlvbnMgaW50ZXJwb2xhdGVkIGludG8gY3NzIGNhbGxzKVxuXG5cbiAgaWYgKHJlZ2lzdGVyZWQgPT0gbnVsbCkge1xuICAgIHJldHVybiBpbnRlcnBvbGF0aW9uO1xuICB9XG5cbiAgdmFyIGNhY2hlZCA9IHJlZ2lzdGVyZWRbaW50ZXJwb2xhdGlvbl07XG4gIHJldHVybiBjYWNoZWQgIT09IHVuZGVmaW5lZCA/IGNhY2hlZCA6IGludGVycG9sYXRpb247XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0cmluZ0Zyb21PYmplY3QobWVyZ2VkUHJvcHMsIHJlZ2lzdGVyZWQsIG9iaikge1xuICB2YXIgc3RyaW5nID0gJyc7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHJpbmcgKz0gaGFuZGxlSW50ZXJwb2xhdGlvbihtZXJnZWRQcm9wcywgcmVnaXN0ZXJlZCwgb2JqW2ldKSArIFwiO1wiO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBfa2V5IGluIG9iaikge1xuICAgICAgdmFyIHZhbHVlID0gb2JqW19rZXldO1xuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAocmVnaXN0ZXJlZCAhPSBudWxsICYmIHJlZ2lzdGVyZWRbdmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdHJpbmcgKz0gX2tleSArIFwie1wiICsgcmVnaXN0ZXJlZFt2YWx1ZV0gKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIGlmIChpc1Byb2Nlc3NhYmxlVmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgc3RyaW5nICs9IHByb2Nlc3NTdHlsZU5hbWUoX2tleSkgKyBcIjpcIiArIHByb2Nlc3NTdHlsZVZhbHVlKF9rZXksIHZhbHVlKSArIFwiO1wiO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX2tleSA9PT0gJ05PX0NPTVBPTkVOVF9TRUxFQ1RPUicgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29tcG9uZW50IHNlbGVjdG9ycyBjYW4gb25seSBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggQGVtb3Rpb24vYmFiZWwtcGx1Z2luLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZVswXSA9PT0gJ3N0cmluZycgJiYgKHJlZ2lzdGVyZWQgPT0gbnVsbCB8fCByZWdpc3RlcmVkW3ZhbHVlWzBdXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB2YWx1ZS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGlmIChpc1Byb2Nlc3NhYmxlVmFsdWUodmFsdWVbX2ldKSkge1xuICAgICAgICAgICAgICBzdHJpbmcgKz0gcHJvY2Vzc1N0eWxlTmFtZShfa2V5KSArIFwiOlwiICsgcHJvY2Vzc1N0eWxlVmFsdWUoX2tleSwgdmFsdWVbX2ldKSArIFwiO1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaW50ZXJwb2xhdGVkID0gaGFuZGxlSW50ZXJwb2xhdGlvbihtZXJnZWRQcm9wcywgcmVnaXN0ZXJlZCwgdmFsdWUpO1xuXG4gICAgICAgICAgc3dpdGNoIChfa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdhbmltYXRpb24nOlxuICAgICAgICAgICAgY2FzZSAnYW5pbWF0aW9uTmFtZSc6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gcHJvY2Vzc1N0eWxlTmFtZShfa2V5KSArIFwiOlwiICsgaW50ZXJwb2xhdGVkICsgXCI7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIF9rZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFVOREVGSU5FRF9BU19PQkpFQ1RfS0VZX0VSUk9SKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gX2tleSArIFwie1wiICsgaW50ZXJwb2xhdGVkICsgXCJ9XCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nO1xufVxuXG52YXIgbGFiZWxQYXR0ZXJuID0gL2xhYmVsOlxccyooW15cXHM7XFxue10rKVxccyooO3wkKS9nO1xudmFyIHNvdXJjZU1hcFBhdHRlcm47XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHNvdXJjZU1hcFBhdHRlcm4gPSAvXFwvXFwqI1xcc3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvblxcL2pzb247XFxTK1xccytcXCpcXC8vZztcbn0gLy8gdGhpcyBpcyB0aGUgY3Vyc29yIGZvciBrZXlmcmFtZXNcbi8vIGtleWZyYW1lcyBhcmUgc3RvcmVkIG9uIHRoZSBTZXJpYWxpemVkU3R5bGVzIG9iamVjdCBhcyBhIGxpbmtlZCBsaXN0XG5cblxudmFyIGN1cnNvcjtcbnZhciBzZXJpYWxpemVTdHlsZXMgPSBmdW5jdGlvbiBzZXJpYWxpemVTdHlsZXMoYXJncywgcmVnaXN0ZXJlZCwgbWVyZ2VkUHJvcHMpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JyAmJiBhcmdzWzBdICE9PSBudWxsICYmIGFyZ3NbMF0uc3R5bGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYXJnc1swXTtcbiAgfVxuXG4gIHZhciBzdHJpbmdNb2RlID0gdHJ1ZTtcbiAgdmFyIHN0eWxlcyA9ICcnO1xuICBjdXJzb3IgPSB1bmRlZmluZWQ7XG4gIHZhciBzdHJpbmdzID0gYXJnc1swXTtcblxuICBpZiAoc3RyaW5ncyA9PSBudWxsIHx8IHN0cmluZ3MucmF3ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdHJpbmdNb2RlID0gZmFsc2U7XG4gICAgc3R5bGVzICs9IGhhbmRsZUludGVycG9sYXRpb24obWVyZ2VkUHJvcHMsIHJlZ2lzdGVyZWQsIHN0cmluZ3MpO1xuICB9IGVsc2Uge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHN0cmluZ3NbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5lcnJvcihJTExFR0FMX0VTQ0FQRV9TRVFVRU5DRV9FUlJPUik7XG4gICAgfVxuXG4gICAgc3R5bGVzICs9IHN0cmluZ3NbMF07XG4gIH0gLy8gd2Ugc3RhcnQgYXQgMSBzaW5jZSB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgdGhlIGZpcnN0IGFyZ1xuXG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3R5bGVzICs9IGhhbmRsZUludGVycG9sYXRpb24obWVyZ2VkUHJvcHMsIHJlZ2lzdGVyZWQsIGFyZ3NbaV0pO1xuXG4gICAgaWYgKHN0cmluZ01vZGUpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHN0cmluZ3NbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKElMTEVHQUxfRVNDQVBFX1NFUVVFTkNFX0VSUk9SKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVzICs9IHN0cmluZ3NbaV07XG4gICAgfVxuICB9XG5cbiAgdmFyIHNvdXJjZU1hcDtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHN0eWxlcyA9IHN0eWxlcy5yZXBsYWNlKHNvdXJjZU1hcFBhdHRlcm4sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgc291cmNlTWFwID0gbWF0Y2g7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG4gIH0gLy8gdXNpbmcgYSBnbG9iYWwgcmVnZXggd2l0aCAuZXhlYyBpcyBzdGF0ZWZ1bCBzbyBsYXN0SW5kZXggaGFzIHRvIGJlIHJlc2V0IGVhY2ggdGltZVxuXG5cbiAgbGFiZWxQYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gIHZhciBpZGVudGlmaWVyTmFtZSA9ICcnO1xuICB2YXIgbWF0Y2g7IC8vIGh0dHBzOi8vZXNiZW5jaC5jb20vYmVuY2gvNWI4MDljMmNmMjk0OTgwMGEwZjYxZmI1XG5cbiAgd2hpbGUgKChtYXRjaCA9IGxhYmVsUGF0dGVybi5leGVjKHN0eWxlcykpICE9PSBudWxsKSB7XG4gICAgaWRlbnRpZmllck5hbWUgKz0gJy0nICsgLy8gJEZsb3dGaXhNZSB3ZSBrbm93IGl0J3Mgbm90IG51bGxcbiAgICBtYXRjaFsxXTtcbiAgfVxuXG4gIHZhciBuYW1lID0gaGFzaFN0cmluZyhzdHlsZXMpICsgaWRlbnRpZmllck5hbWU7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyAkRmxvd0ZpeE1lIFNlcmlhbGl6ZWRTdHlsZXMgdHlwZSBkb2Vzbid0IGhhdmUgdG9TdHJpbmcgcHJvcGVydHkgKGFuZCB3ZSBkb24ndCB3YW50IHRvIGFkZCBpdClcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHN0eWxlczogc3R5bGVzLFxuICAgICAgbWFwOiBzb3VyY2VNYXAsXG4gICAgICBuZXh0OiBjdXJzb3IsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBcIllvdSBoYXZlIHRyaWVkIHRvIHN0cmluZ2lmeSBvYmplY3QgcmV0dXJuZWQgZnJvbSBgY3NzYCBmdW5jdGlvbi4gSXQgaXNuJ3Qgc3VwcG9zZWQgdG8gYmUgdXNlZCBkaXJlY3RseSAoZS5nLiBhcyB2YWx1ZSBvZiB0aGUgYGNsYXNzTmFtZWAgcHJvcCksIGJ1dCByYXRoZXIgaGFuZGVkIHRvIGVtb3Rpb24gc28gaXQgY2FuIGhhbmRsZSBpdCAoZS5nLiBhcyB2YWx1ZSBvZiBgY3NzYCBwcm9wKS5cIjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHN0eWxlczogc3R5bGVzLFxuICAgIG5leHQ6IGN1cnNvclxuICB9O1xufTtcblxuZXhwb3J0IHsgc2VyaWFsaXplU3R5bGVzIH07XG4iLCIvKlxuXG5CYXNlZCBvZmYgZ2xhbW9yJ3MgU3R5bGVTaGVldCwgdGhhbmtzIFN1bmlsIOKdpO+4j1xuXG5oaWdoIHBlcmZvcm1hbmNlIFN0eWxlU2hlZXQgZm9yIGNzcy1pbi1qcyBzeXN0ZW1zXG5cbi0gdXNlcyBtdWx0aXBsZSBzdHlsZSB0YWdzIGJlaGluZCB0aGUgc2NlbmVzIGZvciBtaWxsaW9ucyBvZiBydWxlc1xuLSB1c2VzIGBpbnNlcnRSdWxlYCBmb3IgYXBwZW5kaW5nIGluIHByb2R1Y3Rpb24gZm9yICptdWNoKiBmYXN0ZXIgcGVyZm9ybWFuY2VcblxuLy8gdXNhZ2VcblxuaW1wb3J0IHsgU3R5bGVTaGVldCB9IGZyb20gJ0BlbW90aW9uL3NoZWV0J1xuXG5sZXQgc3R5bGVTaGVldCA9IG5ldyBTdHlsZVNoZWV0KHsga2V5OiAnJywgY29udGFpbmVyOiBkb2N1bWVudC5oZWFkIH0pXG5cbnN0eWxlU2hlZXQuaW5zZXJ0KCcjYm94IHsgYm9yZGVyOiAxcHggc29saWQgcmVkOyB9Jylcbi0gYXBwZW5kcyBhIGNzcyBydWxlIGludG8gdGhlIHN0eWxlc2hlZXRcblxuc3R5bGVTaGVldC5mbHVzaCgpXG4tIGVtcHRpZXMgdGhlIHN0eWxlc2hlZXQgb2YgYWxsIGl0cyBjb250ZW50c1xuXG4qL1xuLy8gJEZsb3dGaXhNZVxuZnVuY3Rpb24gc2hlZXRGb3JUYWcodGFnKSB7XG4gIGlmICh0YWcuc2hlZXQpIHtcbiAgICAvLyAkRmxvd0ZpeE1lXG4gICAgcmV0dXJuIHRhZy5zaGVldDtcbiAgfSAvLyB0aGlzIHdlaXJkbmVzcyBicm91Z2h0IHRvIHlvdSBieSBmaXJlZm94XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZG9jdW1lbnQuc3R5bGVTaGVldHNbaV0ub3duZXJOb2RlID09PSB0YWcpIHtcbiAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgIHJldHVybiBkb2N1bWVudC5zdHlsZVNoZWV0c1tpXTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHRhZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtZW1vdGlvbicsIG9wdGlvbnMua2V5KTtcblxuICBpZiAob3B0aW9ucy5ub25jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCBvcHRpb25zLm5vbmNlKTtcbiAgfVxuXG4gIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICB0YWcuc2V0QXR0cmlidXRlKCdkYXRhLXMnLCAnJyk7XG4gIHJldHVybiB0YWc7XG59XG5cbnZhciBTdHlsZVNoZWV0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGVTaGVldChvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX2luc2VydFRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIHZhciBiZWZvcmU7XG5cbiAgICAgIGlmIChfdGhpcy50YWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBiZWZvcmUgPSBfdGhpcy5wcmVwZW5kID8gX3RoaXMuY29udGFpbmVyLmZpcnN0Q2hpbGQgOiBfdGhpcy5iZWZvcmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiZWZvcmUgPSBfdGhpcy50YWdzW190aGlzLnRhZ3MubGVuZ3RoIC0gMV0ubmV4dFNpYmxpbmc7XG4gICAgICB9XG5cbiAgICAgIF90aGlzLmNvbnRhaW5lci5pbnNlcnRCZWZvcmUodGFnLCBiZWZvcmUpO1xuXG4gICAgICBfdGhpcy50YWdzLnB1c2godGFnKTtcbiAgICB9O1xuXG4gICAgdGhpcy5pc1NwZWVkeSA9IG9wdGlvbnMuc3BlZWR5ID09PSB1bmRlZmluZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nIDogb3B0aW9ucy5zcGVlZHk7XG4gICAgdGhpcy50YWdzID0gW107XG4gICAgdGhpcy5jdHIgPSAwO1xuICAgIHRoaXMubm9uY2UgPSBvcHRpb25zLm5vbmNlOyAvLyBrZXkgaXMgdGhlIHZhbHVlIG9mIHRoZSBkYXRhLWVtb3Rpb24gYXR0cmlidXRlLCBpdCdzIHVzZWQgdG8gaWRlbnRpZnkgZGlmZmVyZW50IHNoZWV0c1xuXG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuICAgIHRoaXMucHJlcGVuZCA9IG9wdGlvbnMucHJlcGVuZDtcbiAgICB0aGlzLmJlZm9yZSA9IG51bGw7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU3R5bGVTaGVldC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmh5ZHJhdGUgPSBmdW5jdGlvbiBoeWRyYXRlKG5vZGVzKSB7XG4gICAgbm9kZXMuZm9yRWFjaCh0aGlzLl9pbnNlcnRUYWcpO1xuICB9O1xuXG4gIF9wcm90by5pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQocnVsZSkge1xuICAgIC8vIHRoZSBtYXggbGVuZ3RoIGlzIGhvdyBtYW55IHJ1bGVzIHdlIGhhdmUgcGVyIHN0eWxlIHRhZywgaXQncyA2NTAwMCBpbiBzcGVlZHkgbW9kZVxuICAgIC8vIGl0J3MgMSBpbiBkZXYgYmVjYXVzZSB3ZSBpbnNlcnQgc291cmNlIG1hcHMgdGhhdCBtYXAgYSBzaW5nbGUgcnVsZSB0byBhIGxvY2F0aW9uXG4gICAgLy8gYW5kIHlvdSBjYW4gb25seSBoYXZlIG9uZSBzb3VyY2UgbWFwIHBlciBzdHlsZSB0YWdcbiAgICBpZiAodGhpcy5jdHIgJSAodGhpcy5pc1NwZWVkeSA/IDY1MDAwIDogMSkgPT09IDApIHtcbiAgICAgIHRoaXMuX2luc2VydFRhZyhjcmVhdGVTdHlsZUVsZW1lbnQodGhpcykpO1xuICAgIH1cblxuICAgIHZhciB0YWcgPSB0aGlzLnRhZ3NbdGhpcy50YWdzLmxlbmd0aCAtIDFdO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBpc0ltcG9ydFJ1bGUgPSBydWxlLmNoYXJDb2RlQXQoMCkgPT09IDY0ICYmIHJ1bGUuY2hhckNvZGVBdCgxKSA9PT0gMTA1O1xuXG4gICAgICBpZiAoaXNJbXBvcnRSdWxlICYmIHRoaXMuX2FscmVhZHlJbnNlcnRlZE9yZGVySW5zZW5zaXRpdmVSdWxlKSB7XG4gICAgICAgIC8vIHRoaXMgd291bGQgb25seSBjYXVzZSBwcm9ibGVtIGluIHNwZWVkeSBtb2RlXG4gICAgICAgIC8vIGJ1dCB3ZSBkb24ndCB3YW50IGVuYWJsaW5nIHNwZWVkeSB0byBhZmZlY3QgdGhlIG9ic2VydmFibGUgYmVoYXZpb3JcbiAgICAgICAgLy8gc28gd2UgcmVwb3J0IHRoaXMgZXJyb3IgYXQgYWxsIHRpbWVzXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJZb3UncmUgYXR0ZW1wdGluZyB0byBpbnNlcnQgdGhlIGZvbGxvd2luZyBydWxlOlxcblwiICsgcnVsZSArICdcXG5cXG5gQGltcG9ydGAgcnVsZXMgbXVzdCBiZSBiZWZvcmUgYWxsIG90aGVyIHR5cGVzIG9mIHJ1bGVzIGluIGEgc3R5bGVzaGVldCBidXQgb3RoZXIgcnVsZXMgaGF2ZSBhbHJlYWR5IGJlZW4gaW5zZXJ0ZWQuIFBsZWFzZSBlbnN1cmUgdGhhdCBgQGltcG9ydGAgcnVsZXMgYXJlIGJlZm9yZSBhbGwgb3RoZXIgcnVsZXMuJyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9hbHJlYWR5SW5zZXJ0ZWRPcmRlckluc2Vuc2l0aXZlUnVsZSA9IHRoaXMuX2FscmVhZHlJbnNlcnRlZE9yZGVySW5zZW5zaXRpdmVSdWxlIHx8ICFpc0ltcG9ydFJ1bGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNTcGVlZHkpIHtcbiAgICAgIHZhciBzaGVldCA9IHNoZWV0Rm9yVGFnKHRhZyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHVsdHJhZmFzdCB2ZXJzaW9uLCB3b3JrcyBhY3Jvc3MgYnJvd3NlcnNcbiAgICAgICAgLy8gdGhlIGJpZyBkcmF3YmFjayBpcyB0aGF0IHRoZSBjc3Mgd29uJ3QgYmUgZWRpdGFibGUgaW4gZGV2dG9vbHNcbiAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShydWxlLCBzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhLzooLW1vei1wbGFjZWhvbGRlcnwtbW96LWZvY3VzLWlubmVyfC1tb3otZm9jdXNyaW5nfC1tcy1pbnB1dC1wbGFjZWhvbGRlcnwtbW96LXJlYWQtd3JpdGV8LW1vei1yZWFkLW9ubHl8LW1zLWNsZWFyKXsvLnRlc3QocnVsZSkpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBpbnNlcnRpbmcgdGhlIGZvbGxvd2luZyBydWxlOiBcXFwiXCIgKyBydWxlICsgXCJcXFwiXCIsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShydWxlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jdHIrKztcbiAgfTtcblxuICBfcHJvdG8uZmx1c2ggPSBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAvLyAkRmxvd0ZpeE1lXG4gICAgdGhpcy50YWdzLmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuICAgICAgcmV0dXJuIHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZyk7XG4gICAgfSk7XG4gICAgdGhpcy50YWdzID0gW107XG4gICAgdGhpcy5jdHIgPSAwO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHRoaXMuX2FscmVhZHlJbnNlcnRlZE9yZGVySW5zZW5zaXRpdmVSdWxlID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTdHlsZVNoZWV0O1xufSgpO1xuXG5leHBvcnQgeyBTdHlsZVNoZWV0IH07XG4iLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcyc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCBjcmVhdGVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGlzUHJvcFZhbGlkIGZyb20gJ0BlbW90aW9uL2lzLXByb3AtdmFsaWQnO1xuaW1wb3J0IHsgd2l0aEVtb3Rpb25DYWNoZSwgVGhlbWVDb250ZXh0IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgZ2V0UmVnaXN0ZXJlZFN0eWxlcywgaW5zZXJ0U3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vdXRpbHMnO1xuaW1wb3J0IHsgc2VyaWFsaXplU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vc2VyaWFsaXplJztcblxudmFyIHRlc3RPbWl0UHJvcHNPblN0cmluZ1RhZyA9IGlzUHJvcFZhbGlkO1xuXG52YXIgdGVzdE9taXRQcm9wc09uQ29tcG9uZW50ID0gZnVuY3Rpb24gdGVzdE9taXRQcm9wc09uQ29tcG9uZW50KGtleSkge1xuICByZXR1cm4ga2V5ICE9PSAndGhlbWUnO1xufTtcblxudmFyIGdldERlZmF1bHRTaG91bGRGb3J3YXJkUHJvcCA9IGZ1bmN0aW9uIGdldERlZmF1bHRTaG91bGRGb3J3YXJkUHJvcCh0YWcpIHtcbiAgcmV0dXJuIHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnICYmIC8vIDk2IGlzIG9uZSBsZXNzIHRoYW4gdGhlIGNoYXIgY29kZVxuICAvLyBmb3IgXCJhXCIgc28gdGhpcyBpcyBjaGVja2luZyB0aGF0XG4gIC8vIGl0J3MgYSBsb3dlcmNhc2UgY2hhcmFjdGVyXG4gIHRhZy5jaGFyQ29kZUF0KDApID4gOTYgPyB0ZXN0T21pdFByb3BzT25TdHJpbmdUYWcgOiB0ZXN0T21pdFByb3BzT25Db21wb25lbnQ7XG59O1xudmFyIGNvbXBvc2VTaG91bGRGb3J3YXJkUHJvcHMgPSBmdW5jdGlvbiBjb21wb3NlU2hvdWxkRm9yd2FyZFByb3BzKHRhZywgb3B0aW9ucywgaXNSZWFsKSB7XG4gIHZhciBzaG91bGRGb3J3YXJkUHJvcDtcblxuICBpZiAob3B0aW9ucykge1xuICAgIHZhciBvcHRpb25zU2hvdWxkRm9yd2FyZFByb3AgPSBvcHRpb25zLnNob3VsZEZvcndhcmRQcm9wO1xuICAgIHNob3VsZEZvcndhcmRQcm9wID0gdGFnLl9fZW1vdGlvbl9mb3J3YXJkUHJvcCAmJiBvcHRpb25zU2hvdWxkRm9yd2FyZFByb3AgPyBmdW5jdGlvbiAocHJvcE5hbWUpIHtcbiAgICAgIHJldHVybiB0YWcuX19lbW90aW9uX2ZvcndhcmRQcm9wKHByb3BOYW1lKSAmJiBvcHRpb25zU2hvdWxkRm9yd2FyZFByb3AocHJvcE5hbWUpO1xuICAgIH0gOiBvcHRpb25zU2hvdWxkRm9yd2FyZFByb3A7XG4gIH1cblxuICBpZiAodHlwZW9mIHNob3VsZEZvcndhcmRQcm9wICE9PSAnZnVuY3Rpb24nICYmIGlzUmVhbCkge1xuICAgIHNob3VsZEZvcndhcmRQcm9wID0gdGFnLl9fZW1vdGlvbl9mb3J3YXJkUHJvcDtcbiAgfVxuXG4gIHJldHVybiBzaG91bGRGb3J3YXJkUHJvcDtcbn07XG5cbnZhciBJTExFR0FMX0VTQ0FQRV9TRVFVRU5DRV9FUlJPUiA9IFwiWW91IGhhdmUgaWxsZWdhbCBlc2NhcGUgc2VxdWVuY2UgaW4geW91ciB0ZW1wbGF0ZSBsaXRlcmFsLCBtb3N0IGxpa2VseSBpbnNpZGUgY29udGVudCdzIHByb3BlcnR5IHZhbHVlLlxcbkJlY2F1c2UgeW91IHdyaXRlIHlvdXIgQ1NTIGluc2lkZSBhIEphdmFTY3JpcHQgc3RyaW5nIHlvdSBhY3R1YWxseSBoYXZlIHRvIGRvIGRvdWJsZSBlc2NhcGluZywgc28gZm9yIGV4YW1wbGUgXFxcImNvbnRlbnQ6ICdcXFxcMDBkNyc7XFxcIiBzaG91bGQgYmVjb21lIFxcXCJjb250ZW50OiAnXFxcXFxcXFwwMGQ3JztcXFwiLlxcbllvdSBjYW4gcmVhZCBtb3JlIGFib3V0IHRoaXMgaGVyZTpcXG5odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFscyNFUzIwMThfcmV2aXNpb25fb2ZfaWxsZWdhbF9lc2NhcGVfc2VxdWVuY2VzXCI7XG5cbnZhciBjcmVhdGVTdHlsZWQgPSBmdW5jdGlvbiBjcmVhdGVTdHlsZWQodGFnLCBvcHRpb25zKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKHRhZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBhcmUgdHJ5aW5nIHRvIGNyZWF0ZSBhIHN0eWxlZCBlbGVtZW50IHdpdGggYW4gdW5kZWZpbmVkIGNvbXBvbmVudC5cXG5Zb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIGltcG9ydCBpdC4nKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNSZWFsID0gdGFnLl9fZW1vdGlvbl9yZWFsID09PSB0YWc7XG4gIHZhciBiYXNlVGFnID0gaXNSZWFsICYmIHRhZy5fX2Vtb3Rpb25fYmFzZSB8fCB0YWc7XG4gIHZhciBpZGVudGlmaWVyTmFtZTtcbiAgdmFyIHRhcmdldENsYXNzTmFtZTtcblxuICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWRlbnRpZmllck5hbWUgPSBvcHRpb25zLmxhYmVsO1xuICAgIHRhcmdldENsYXNzTmFtZSA9IG9wdGlvbnMudGFyZ2V0O1xuICB9XG5cbiAgdmFyIHNob3VsZEZvcndhcmRQcm9wID0gY29tcG9zZVNob3VsZEZvcndhcmRQcm9wcyh0YWcsIG9wdGlvbnMsIGlzUmVhbCk7XG4gIHZhciBkZWZhdWx0U2hvdWxkRm9yd2FyZFByb3AgPSBzaG91bGRGb3J3YXJkUHJvcCB8fCBnZXREZWZhdWx0U2hvdWxkRm9yd2FyZFByb3AoYmFzZVRhZyk7XG4gIHZhciBzaG91bGRVc2VBcyA9ICFkZWZhdWx0U2hvdWxkRm9yd2FyZFByb3AoJ2FzJyk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIHN0eWxlcyA9IGlzUmVhbCAmJiB0YWcuX19lbW90aW9uX3N0eWxlcyAhPT0gdW5kZWZpbmVkID8gdGFnLl9fZW1vdGlvbl9zdHlsZXMuc2xpY2UoMCkgOiBbXTtcblxuICAgIGlmIChpZGVudGlmaWVyTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzdHlsZXMucHVzaChcImxhYmVsOlwiICsgaWRlbnRpZmllck5hbWUgKyBcIjtcIik7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3NbMF0gPT0gbnVsbCB8fCBhcmdzWzBdLnJhdyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzdHlsZXMucHVzaC5hcHBseShzdHlsZXMsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBhcmdzWzBdWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTExFR0FMX0VTQ0FQRV9TRVFVRU5DRV9FUlJPUik7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlcy5wdXNoKGFyZ3NbMF1bMF0pO1xuICAgICAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICAgICAgdmFyIGkgPSAxO1xuXG4gICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGFyZ3NbMF1baV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSUxMRUdBTF9FU0NBUEVfU0VRVUVOQ0VfRVJST1IpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGVzLnB1c2goYXJnc1tpXSwgYXJnc1swXVtpXSk7XG4gICAgICB9XG4gICAgfSAvLyAkRmxvd0ZpeE1lOiB3ZSBuZWVkIHRvIGNhc3QgU3RhdGVsZXNzRnVuY3Rpb25hbENvbXBvbmVudCB0byBvdXIgUHJpdmF0ZVN0eWxlZENvbXBvbmVudCBjbGFzc1xuXG5cbiAgICB2YXIgU3R5bGVkID0gd2l0aEVtb3Rpb25DYWNoZShmdW5jdGlvbiAocHJvcHMsIGNhY2hlLCByZWYpIHtcbiAgICAgIHZhciBmaW5hbFRhZyA9IHNob3VsZFVzZUFzICYmIHByb3BzLmFzIHx8IGJhc2VUYWc7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gJyc7XG4gICAgICB2YXIgY2xhc3NJbnRlcnBvbGF0aW9ucyA9IFtdO1xuICAgICAgdmFyIG1lcmdlZFByb3BzID0gcHJvcHM7XG5cbiAgICAgIGlmIChwcm9wcy50aGVtZSA9PSBudWxsKSB7XG4gICAgICAgIG1lcmdlZFByb3BzID0ge307XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgbWVyZ2VkUHJvcHNba2V5XSA9IHByb3BzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBtZXJnZWRQcm9wcy50aGVtZSA9IHVzZUNvbnRleHQoVGhlbWVDb250ZXh0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBwcm9wcy5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNsYXNzTmFtZSA9IGdldFJlZ2lzdGVyZWRTdHlsZXMoY2FjaGUucmVnaXN0ZXJlZCwgY2xhc3NJbnRlcnBvbGF0aW9ucywgcHJvcHMuY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcHMuY2xhc3NOYW1lICE9IG51bGwpIHtcbiAgICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBzZXJpYWxpemVkID0gc2VyaWFsaXplU3R5bGVzKHN0eWxlcy5jb25jYXQoY2xhc3NJbnRlcnBvbGF0aW9ucyksIGNhY2hlLnJlZ2lzdGVyZWQsIG1lcmdlZFByb3BzKTtcbiAgICAgIHZhciBydWxlcyA9IGluc2VydFN0eWxlcyhjYWNoZSwgc2VyaWFsaXplZCwgdHlwZW9mIGZpbmFsVGFnID09PSAnc3RyaW5nJyk7XG4gICAgICBjbGFzc05hbWUgKz0gY2FjaGUua2V5ICsgXCItXCIgKyBzZXJpYWxpemVkLm5hbWU7XG5cbiAgICAgIGlmICh0YXJnZXRDbGFzc05hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbGFzc05hbWUgKz0gXCIgXCIgKyB0YXJnZXRDbGFzc05hbWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBmaW5hbFNob3VsZEZvcndhcmRQcm9wID0gc2hvdWxkVXNlQXMgJiYgc2hvdWxkRm9yd2FyZFByb3AgPT09IHVuZGVmaW5lZCA/IGdldERlZmF1bHRTaG91bGRGb3J3YXJkUHJvcChmaW5hbFRhZykgOiBkZWZhdWx0U2hvdWxkRm9yd2FyZFByb3A7XG4gICAgICB2YXIgbmV3UHJvcHMgPSB7fTtcblxuICAgICAgZm9yICh2YXIgX2tleSBpbiBwcm9wcykge1xuICAgICAgICBpZiAoc2hvdWxkVXNlQXMgJiYgX2tleSA9PT0gJ2FzJykgY29udGludWU7XG5cbiAgICAgICAgaWYgKCAvLyAkRmxvd0ZpeE1lXG4gICAgICAgIGZpbmFsU2hvdWxkRm9yd2FyZFByb3AoX2tleSkpIHtcbiAgICAgICAgICBuZXdQcm9wc1tfa2V5XSA9IHByb3BzW19rZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5ld1Byb3BzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgIG5ld1Byb3BzLnJlZiA9IHJlZjtcbiAgICAgIHZhciBlbGUgPSAvKiNfX1BVUkVfXyovY3JlYXRlRWxlbWVudChmaW5hbFRhZywgbmV3UHJvcHMpO1xuXG4gICAgICByZXR1cm4gZWxlO1xuICAgIH0pO1xuICAgIFN0eWxlZC5kaXNwbGF5TmFtZSA9IGlkZW50aWZpZXJOYW1lICE9PSB1bmRlZmluZWQgPyBpZGVudGlmaWVyTmFtZSA6IFwiU3R5bGVkKFwiICsgKHR5cGVvZiBiYXNlVGFnID09PSAnc3RyaW5nJyA/IGJhc2VUYWcgOiBiYXNlVGFnLmRpc3BsYXlOYW1lIHx8IGJhc2VUYWcubmFtZSB8fCAnQ29tcG9uZW50JykgKyBcIilcIjtcbiAgICBTdHlsZWQuZGVmYXVsdFByb3BzID0gdGFnLmRlZmF1bHRQcm9wcztcbiAgICBTdHlsZWQuX19lbW90aW9uX3JlYWwgPSBTdHlsZWQ7XG4gICAgU3R5bGVkLl9fZW1vdGlvbl9iYXNlID0gYmFzZVRhZztcbiAgICBTdHlsZWQuX19lbW90aW9uX3N0eWxlcyA9IHN0eWxlcztcbiAgICBTdHlsZWQuX19lbW90aW9uX2ZvcndhcmRQcm9wID0gc2hvdWxkRm9yd2FyZFByb3A7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0eWxlZCwgJ3RvU3RyaW5nJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgICBpZiAodGFyZ2V0Q2xhc3NOYW1lID09PSB1bmRlZmluZWQgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHJldHVybiAnTk9fQ09NUE9ORU5UX1NFTEVDVE9SJztcbiAgICAgICAgfSAvLyAkRmxvd0ZpeE1lOiBjb2VyY2UgdW5kZWZpbmVkIHRvIHN0cmluZ1xuXG5cbiAgICAgICAgcmV0dXJuIFwiLlwiICsgdGFyZ2V0Q2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgU3R5bGVkLndpdGhDb21wb25lbnQgPSBmdW5jdGlvbiAobmV4dFRhZywgbmV4dE9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBjcmVhdGVTdHlsZWQobmV4dFRhZywgX2V4dGVuZHMoe30sIG9wdGlvbnMsIG5leHRPcHRpb25zLCB7XG4gICAgICAgIHNob3VsZEZvcndhcmRQcm9wOiBjb21wb3NlU2hvdWxkRm9yd2FyZFByb3BzKFN0eWxlZCwgbmV4dE9wdGlvbnMsIHRydWUpXG4gICAgICB9KSkuYXBwbHkodm9pZCAwLCBzdHlsZXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gU3R5bGVkO1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3R5bGVkO1xuIiwiaW1wb3J0ICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHMnO1xuaW1wb3J0ICdyZWFjdCc7XG5pbXBvcnQgJ0BlbW90aW9uL2lzLXByb3AtdmFsaWQnO1xuaW1wb3J0IGNyZWF0ZVN0eWxlZCBmcm9tICcuLi9iYXNlL2Rpc3QvZW1vdGlvbi1zdHlsZWQtYmFzZS5icm93c2VyLmVzbS5qcyc7XG5pbXBvcnQgJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCAnQGVtb3Rpb24vdXRpbHMnO1xuaW1wb3J0ICdAZW1vdGlvbi9zZXJpYWxpemUnO1xuXG52YXIgdGFncyA9IFsnYScsICdhYmJyJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmFzZScsICdiZGknLCAnYmRvJywgJ2JpZycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlhbG9nJywgJ2RpdicsICdkbCcsICdkdCcsICdlbScsICdlbWJlZCcsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2lmcmFtZScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdrZXlnZW4nLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ2xpbmsnLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0YScsICdtZXRlcicsICduYXYnLCAnbm9zY3JpcHQnLCAnb2JqZWN0JywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwYXJhbScsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NjcmlwdCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhbicsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndGl0bGUnLCAndHInLCAndHJhY2snLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJywgLy8gU1ZHXG4nY2lyY2xlJywgJ2NsaXBQYXRoJywgJ2RlZnMnLCAnZWxsaXBzZScsICdmb3JlaWduT2JqZWN0JywgJ2cnLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJHcmFkaWVudCcsICdtYXNrJywgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbEdyYWRpZW50JywgJ3JlY3QnLCAnc3RvcCcsICdzdmcnLCAndGV4dCcsICd0c3BhbiddO1xuXG52YXIgbmV3U3R5bGVkID0gY3JlYXRlU3R5bGVkLmJpbmQoKTtcbnRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnTmFtZSkge1xuICAvLyAkRmxvd0ZpeE1lOiB3ZSBjYW4gaWdub3JlIHRoaXMgYmVjYXVzZSBpdHMgZXhwb3NlZCB0eXBlIGlzIGRlZmluZWQgYnkgdGhlIENyZWF0ZVN0eWxlZCB0eXBlXG4gIG5ld1N0eWxlZFt0YWdOYW1lXSA9IG5ld1N0eWxlZCh0YWdOYW1lKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBuZXdTdHlsZWQ7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufSIsInZhciB1bml0bGVzc0tleXMgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiAxLFxuICBib3JkZXJJbWFnZU91dHNldDogMSxcbiAgYm9yZGVySW1hZ2VTbGljZTogMSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogMSxcbiAgYm94RmxleDogMSxcbiAgYm94RmxleEdyb3VwOiAxLFxuICBib3hPcmRpbmFsR3JvdXA6IDEsXG4gIGNvbHVtbkNvdW50OiAxLFxuICBjb2x1bW5zOiAxLFxuICBmbGV4OiAxLFxuICBmbGV4R3JvdzogMSxcbiAgZmxleFBvc2l0aXZlOiAxLFxuICBmbGV4U2hyaW5rOiAxLFxuICBmbGV4TmVnYXRpdmU6IDEsXG4gIGZsZXhPcmRlcjogMSxcbiAgZ3JpZFJvdzogMSxcbiAgZ3JpZFJvd0VuZDogMSxcbiAgZ3JpZFJvd1NwYW46IDEsXG4gIGdyaWRSb3dTdGFydDogMSxcbiAgZ3JpZENvbHVtbjogMSxcbiAgZ3JpZENvbHVtbkVuZDogMSxcbiAgZ3JpZENvbHVtblNwYW46IDEsXG4gIGdyaWRDb2x1bW5TdGFydDogMSxcbiAgbXNHcmlkUm93OiAxLFxuICBtc0dyaWRSb3dTcGFuOiAxLFxuICBtc0dyaWRDb2x1bW46IDEsXG4gIG1zR3JpZENvbHVtblNwYW46IDEsXG4gIGZvbnRXZWlnaHQ6IDEsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG9wYWNpdHk6IDEsXG4gIG9yZGVyOiAxLFxuICBvcnBoYW5zOiAxLFxuICB0YWJTaXplOiAxLFxuICB3aWRvd3M6IDEsXG4gIHpJbmRleDogMSxcbiAgem9vbTogMSxcbiAgV2Via2l0TGluZUNsYW1wOiAxLFxuICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gIGZpbGxPcGFjaXR5OiAxLFxuICBmbG9vZE9wYWNpdHk6IDEsXG4gIHN0b3BPcGFjaXR5OiAxLFxuICBzdHJva2VEYXNoYXJyYXk6IDEsXG4gIHN0cm9rZURhc2hvZmZzZXQ6IDEsXG4gIHN0cm9rZU1pdGVybGltaXQ6IDEsXG4gIHN0cm9rZU9wYWNpdHk6IDEsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCB1bml0bGVzc0tleXM7XG4iLCJ2YXIgaXNCcm93c2VyID0gXCJvYmplY3RcIiAhPT0gJ3VuZGVmaW5lZCc7XG5mdW5jdGlvbiBnZXRSZWdpc3RlcmVkU3R5bGVzKHJlZ2lzdGVyZWQsIHJlZ2lzdGVyZWRTdHlsZXMsIGNsYXNzTmFtZXMpIHtcbiAgdmFyIHJhd0NsYXNzTmFtZSA9ICcnO1xuICBjbGFzc05hbWVzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHJlZ2lzdGVyZWRbY2xhc3NOYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZWdpc3RlcmVkU3R5bGVzLnB1c2gocmVnaXN0ZXJlZFtjbGFzc05hbWVdICsgXCI7XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYXdDbGFzc05hbWUgKz0gY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJhd0NsYXNzTmFtZTtcbn1cbnZhciBpbnNlcnRTdHlsZXMgPSBmdW5jdGlvbiBpbnNlcnRTdHlsZXMoY2FjaGUsIHNlcmlhbGl6ZWQsIGlzU3RyaW5nVGFnKSB7XG4gIHZhciBjbGFzc05hbWUgPSBjYWNoZS5rZXkgKyBcIi1cIiArIHNlcmlhbGl6ZWQubmFtZTtcblxuICBpZiAoIC8vIHdlIG9ubHkgbmVlZCB0byBhZGQgdGhlIHN0eWxlcyB0byB0aGUgcmVnaXN0ZXJlZCBjYWNoZSBpZiB0aGVcbiAgLy8gY2xhc3MgbmFtZSBjb3VsZCBiZSB1c2VkIGZ1cnRoZXIgZG93blxuICAvLyB0aGUgdHJlZSBidXQgaWYgaXQncyBhIHN0cmluZyB0YWcsIHdlIGtub3cgaXQgd29uJ3RcbiAgLy8gc28gd2UgZG9uJ3QgaGF2ZSB0byBhZGQgaXQgdG8gcmVnaXN0ZXJlZCBjYWNoZS5cbiAgLy8gdGhpcyBpbXByb3ZlcyBtZW1vcnkgdXNhZ2Ugc2luY2Ugd2UgY2FuIGF2b2lkIHN0b3JpbmcgdGhlIHdob2xlIHN0eWxlIHN0cmluZ1xuICAoaXNTdHJpbmdUYWcgPT09IGZhbHNlIHx8IC8vIHdlIG5lZWQgdG8gYWx3YXlzIHN0b3JlIGl0IGlmIHdlJ3JlIGluIGNvbXBhdCBtb2RlIGFuZFxuICAvLyBpbiBub2RlIHNpbmNlIGVtb3Rpb24tc2VydmVyIHJlbGllcyBvbiB3aGV0aGVyIGEgc3R5bGUgaXMgaW5cbiAgLy8gdGhlIHJlZ2lzdGVyZWQgY2FjaGUgdG8ga25vdyB3aGV0aGVyIGEgc3R5bGUgaXMgZ2xvYmFsIG9yIG5vdFxuICAvLyBhbHNvLCBub3RlIHRoYXQgdGhpcyBjaGVjayB3aWxsIGJlIGRlYWQgY29kZSBlbGltaW5hdGVkIGluIHRoZSBicm93c2VyXG4gIGlzQnJvd3NlciA9PT0gZmFsc2UgKSAmJiBjYWNoZS5yZWdpc3RlcmVkW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIGNhY2hlLnJlZ2lzdGVyZWRbY2xhc3NOYW1lXSA9IHNlcmlhbGl6ZWQuc3R5bGVzO1xuICB9XG5cbiAgaWYgKGNhY2hlLmluc2VydGVkW3NlcmlhbGl6ZWQubmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBjdXJyZW50ID0gc2VyaWFsaXplZDtcblxuICAgIGRvIHtcbiAgICAgIHZhciBtYXliZVN0eWxlcyA9IGNhY2hlLmluc2VydChzZXJpYWxpemVkID09PSBjdXJyZW50ID8gXCIuXCIgKyBjbGFzc05hbWUgOiAnJywgY3VycmVudCwgY2FjaGUuc2hlZXQsIHRydWUpO1xuXG4gICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgIH0gd2hpbGUgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdldFJlZ2lzdGVyZWRTdHlsZXMsIGluc2VydFN0eWxlcyB9O1xuIiwidmFyIHdlYWtNZW1vaXplID0gZnVuY3Rpb24gd2Vha01lbW9pemUoZnVuYykge1xuICAvLyAkRmxvd0ZpeE1lIGZsb3cgZG9lc24ndCBpbmNsdWRlIGFsbCBub24tcHJpbWl0aXZlIHR5cGVzIGFzIGFsbG93ZWQgZm9yIHdlYWttYXBzXG4gIHZhciBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG4gIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgaWYgKGNhY2hlLmhhcyhhcmcpKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lXG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGFyZyk7XG4gICAgfVxuXG4gICAgdmFyIHJldCA9IGZ1bmMoYXJnKTtcbiAgICBjYWNoZS5zZXQoYXJnLCByZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3ZWFrTWVtb2l6ZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG4gICAgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7XG4gICAgfSk7XG4gICAga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpO1xuICB9XG5cbiAgcmV0dXJuIGtleXM7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuXG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG5cbiAgdmFyIHRhcmdldCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuXG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG59O1xuXG52YXIgTURYQ29udGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVDb250ZXh0KHt9KTtcbnZhciB3aXRoTURYQ29tcG9uZW50cyA9IGZ1bmN0aW9uIHdpdGhNRFhDb21wb25lbnRzKENvbXBvbmVudCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgdmFyIGFsbENvbXBvbmVudHMgPSB1c2VNRFhDb21wb25lbnRzKHByb3BzLmNvbXBvbmVudHMpO1xuICAgIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICAgICAgY29tcG9uZW50czogYWxsQ29tcG9uZW50c1xuICAgIH0pKTtcbiAgfTtcbn07XG52YXIgdXNlTURYQ29tcG9uZW50cyA9IGZ1bmN0aW9uIHVzZU1EWENvbXBvbmVudHMoY29tcG9uZW50cykge1xuICB2YXIgY29udGV4dENvbXBvbmVudHMgPSBSZWFjdC51c2VDb250ZXh0KE1EWENvbnRleHQpO1xuICB2YXIgYWxsQ29tcG9uZW50cyA9IGNvbnRleHRDb21wb25lbnRzO1xuXG4gIGlmIChjb21wb25lbnRzKSB7XG4gICAgYWxsQ29tcG9uZW50cyA9IGlzRnVuY3Rpb24oY29tcG9uZW50cykgPyBjb21wb25lbnRzKGNvbnRleHRDb21wb25lbnRzKSA6IF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBjb250ZXh0Q29tcG9uZW50cyksIGNvbXBvbmVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGFsbENvbXBvbmVudHM7XG59O1xudmFyIE1EWFByb3ZpZGVyID0gZnVuY3Rpb24gTURYUHJvdmlkZXIocHJvcHMpIHtcbiAgdmFyIGFsbENvbXBvbmVudHMgPSB1c2VNRFhDb21wb25lbnRzKHByb3BzLmNvbXBvbmVudHMpO1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTURYQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiBhbGxDb21wb25lbnRzXG4gIH0sIHByb3BzLmNoaWxkcmVuKTtcbn07XG5cbnZhciBUWVBFX1BST1BfTkFNRSA9ICdtZHhUeXBlJztcbnZhciBERUZBVUxUUyA9IHtcbiAgaW5saW5lQ29kZTogJ2NvZGUnLFxuICB3cmFwcGVyOiBmdW5jdGlvbiB3cmFwcGVyKF9yZWYpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuICAgIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwge30sIGNoaWxkcmVuKTtcbiAgfVxufTtcbnZhciBNRFhDcmVhdGVFbGVtZW50ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHtcbiAgdmFyIHByb3BDb21wb25lbnRzID0gcHJvcHMuY29tcG9uZW50cyxcbiAgICAgIG1keFR5cGUgPSBwcm9wcy5tZHhUeXBlLFxuICAgICAgb3JpZ2luYWxUeXBlID0gcHJvcHMub3JpZ2luYWxUeXBlLFxuICAgICAgcGFyZW50TmFtZSA9IHByb3BzLnBhcmVudE5hbWUsXG4gICAgICBldGMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMocHJvcHMsIFtcImNvbXBvbmVudHNcIiwgXCJtZHhUeXBlXCIsIFwib3JpZ2luYWxUeXBlXCIsIFwicGFyZW50TmFtZVwiXSk7XG5cbiAgdmFyIGNvbXBvbmVudHMgPSB1c2VNRFhDb21wb25lbnRzKHByb3BDb21wb25lbnRzKTtcbiAgdmFyIHR5cGUgPSBtZHhUeXBlO1xuICB2YXIgQ29tcG9uZW50ID0gY29tcG9uZW50c1tcIlwiLmNvbmNhdChwYXJlbnROYW1lLCBcIi5cIikuY29uY2F0KHR5cGUpXSB8fCBjb21wb25lbnRzW3R5cGVdIHx8IERFRkFVTFRTW3R5cGVdIHx8IG9yaWdpbmFsVHlwZTtcblxuICBpZiAocHJvcENvbXBvbmVudHMpIHtcbiAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7XG4gICAgICByZWY6IHJlZlxuICAgIH0sIGV0YyksIHt9LCB7XG4gICAgICBjb21wb25lbnRzOiBwcm9wQ29tcG9uZW50c1xuICAgIH0pKTtcbiAgfVxuXG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9vYmplY3RTcHJlYWQyKHtcbiAgICByZWY6IHJlZlxuICB9LCBldGMpKTtcbn0pO1xuTURYQ3JlYXRlRWxlbWVudC5kaXNwbGF5TmFtZSA9ICdNRFhDcmVhdGVFbGVtZW50JztcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKHR5cGUsIHByb3BzKSB7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbWR4VHlwZSA9IHByb3BzICYmIHByb3BzLm1keFR5cGU7XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCBtZHhUeXBlKSB7XG4gICAgdmFyIGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgICB2YXIgY3JlYXRlRWxlbWVudEFyZ0FycmF5ID0gbmV3IEFycmF5KGFyZ3NMZW5ndGgpO1xuICAgIGNyZWF0ZUVsZW1lbnRBcmdBcnJheVswXSA9IE1EWENyZWF0ZUVsZW1lbnQ7XG4gICAgdmFyIG5ld1Byb3BzID0ge307XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCBrZXkpKSB7XG4gICAgICAgIG5ld1Byb3BzW2tleV0gPSBwcm9wc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld1Byb3BzLm9yaWdpbmFsVHlwZSA9IHR5cGU7XG4gICAgbmV3UHJvcHNbVFlQRV9QUk9QX05BTUVdID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZSA6IG1keFR5cGU7XG4gICAgY3JlYXRlRWxlbWVudEFyZ0FycmF5WzFdID0gbmV3UHJvcHM7XG5cbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3NMZW5ndGg7IGkrKykge1xuICAgICAgY3JlYXRlRWxlbWVudEFyZ0FycmF5W2ldID0gYXJnc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudC5hcHBseShudWxsLCBjcmVhdGVFbGVtZW50QXJnQXJyYXkpO1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQuYXBwbHkobnVsbCwgYXJncyk7XG59XG5cbmV4cG9ydCB7IE1EWENvbnRleHQsIE1EWFByb3ZpZGVyLCBjcmVhdGVFbGVtZW50IGFzIG1keCwgdXNlTURYQ29tcG9uZW50cywgd2l0aE1EWENvbXBvbmVudHMgfTtcbiIsIlwidXNlIHN0cmljdFwiO3ZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZD1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkXCIpO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuZGVmYXVsdD12b2lkIDA7dmFyIF9yZWFjdD1faW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwicmVhY3RcIikpO3ZhciBfcm91dGVyPXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlclwiKTt2YXIgX3JvdXRlcjI9cmVxdWlyZShcIi4vcm91dGVyXCIpO3ZhciBfdXNlSW50ZXJzZWN0aW9uPXJlcXVpcmUoXCIuL3VzZS1pbnRlcnNlY3Rpb25cIik7Y29uc3QgcHJlZmV0Y2hlZD17fTtmdW5jdGlvbiBwcmVmZXRjaChyb3V0ZXIsaHJlZixhcyxvcHRpb25zKXtpZih0eXBlb2Ygd2luZG93PT09J3VuZGVmaW5lZCd8fCFyb3V0ZXIpcmV0dXJuO2lmKCEoMCxfcm91dGVyLmlzTG9jYWxVUkwpKGhyZWYpKXJldHVybjsvLyBQcmVmZXRjaCB0aGUgSlNPTiBwYWdlIGlmIGFza2VkIChvbmx5IGluIHRoZSBjbGllbnQpXG4vLyBXZSBuZWVkIHRvIGhhbmRsZSBhIHByZWZldGNoIGVycm9yIGhlcmUgc2luY2Ugd2UgbWF5IGJlXG4vLyBsb2FkaW5nIHdpdGggcHJpb3JpdHkgd2hpY2ggY2FuIHJlamVjdCBidXQgd2UgZG9uJ3Rcbi8vIHdhbnQgdG8gZm9yY2UgbmF2aWdhdGlvbiBzaW5jZSB0aGlzIGlzIG9ubHkgYSBwcmVmZXRjaFxucm91dGVyLnByZWZldGNoKGhyZWYsYXMsb3B0aW9ucykuY2F0Y2goZXJyPT57aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0ncHJvZHVjdGlvbicpey8vIHJldGhyb3cgdG8gc2hvdyBpbnZhbGlkIFVSTCBlcnJvcnNcbnRocm93IGVycjt9fSk7Y29uc3QgY3VyTG9jYWxlPW9wdGlvbnMmJnR5cGVvZiBvcHRpb25zLmxvY2FsZSE9PSd1bmRlZmluZWQnP29wdGlvbnMubG9jYWxlOnJvdXRlciYmcm91dGVyLmxvY2FsZTsvLyBKb2luIG9uIGFuIGludmFsaWQgVVJJIGNoYXJhY3RlclxucHJlZmV0Y2hlZFtocmVmKyclJythcysoY3VyTG9jYWxlPyclJytjdXJMb2NhbGU6JycpXT10cnVlO31mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpe2NvbnN0e3RhcmdldH09ZXZlbnQuY3VycmVudFRhcmdldDtyZXR1cm4gdGFyZ2V0JiZ0YXJnZXQhPT0nX3NlbGYnfHxldmVudC5tZXRhS2V5fHxldmVudC5jdHJsS2V5fHxldmVudC5zaGlmdEtleXx8ZXZlbnQuYWx0S2V5fHwvLyB0cmlnZ2VycyByZXNvdXJjZSBkb3dubG9hZFxuZXZlbnQubmF0aXZlRXZlbnQmJmV2ZW50Lm5hdGl2ZUV2ZW50LndoaWNoPT09Mjt9ZnVuY3Rpb24gbGlua0NsaWNrZWQoZSxyb3V0ZXIsaHJlZixhcyxyZXBsYWNlLHNoYWxsb3csc2Nyb2xsLGxvY2FsZSl7Y29uc3R7bm9kZU5hbWV9PWUuY3VycmVudFRhcmdldDtpZihub2RlTmFtZT09PSdBJyYmKGlzTW9kaWZpZWRFdmVudChlKXx8ISgwLF9yb3V0ZXIuaXNMb2NhbFVSTCkoaHJlZikpKXsvLyBpZ25vcmUgY2xpY2sgZm9yIGJyb3dzZXLigJlzIGRlZmF1bHQgYmVoYXZpb3JcbnJldHVybjt9ZS5wcmV2ZW50RGVmYXVsdCgpOy8vICBhdm9pZCBzY3JvbGwgZm9yIHVybHMgd2l0aCBhbmNob3IgcmVmc1xuaWYoc2Nyb2xsPT1udWxsJiZhcy5pbmRleE9mKCcjJyk+PTApe3Njcm9sbD1mYWxzZTt9Ly8gcmVwbGFjZSBzdGF0ZSBpbnN0ZWFkIG9mIHB1c2ggaWYgcHJvcCBpcyBwcmVzZW50XG5yb3V0ZXJbcmVwbGFjZT8ncmVwbGFjZSc6J3B1c2gnXShocmVmLGFzLHtzaGFsbG93LGxvY2FsZSxzY3JvbGx9KTt9ZnVuY3Rpb24gTGluayhwcm9wcyl7aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0ncHJvZHVjdGlvbicpe2Z1bmN0aW9uIGNyZWF0ZVByb3BFcnJvcihhcmdzKXtyZXR1cm4gbmV3IEVycm9yKGBGYWlsZWQgcHJvcCB0eXBlOiBUaGUgcHJvcCBcXGAke2FyZ3Mua2V5fVxcYCBleHBlY3RzIGEgJHthcmdzLmV4cGVjdGVkfSBpbiBcXGA8TGluaz5cXGAsIGJ1dCBnb3QgXFxgJHthcmdzLmFjdHVhbH1cXGAgaW5zdGVhZC5gKyh0eXBlb2Ygd2luZG93IT09J3VuZGVmaW5lZCc/XCJcXG5PcGVuIHlvdXIgYnJvd3NlcidzIGNvbnNvbGUgdG8gdmlldyB0aGUgQ29tcG9uZW50IHN0YWNrIHRyYWNlLlwiOicnKSk7fS8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG5jb25zdCByZXF1aXJlZFByb3BzR3VhcmQ9e2hyZWY6dHJ1ZX07Y29uc3QgcmVxdWlyZWRQcm9wcz1PYmplY3Qua2V5cyhyZXF1aXJlZFByb3BzR3VhcmQpO3JlcXVpcmVkUHJvcHMuZm9yRWFjaChrZXk9PntpZihrZXk9PT0naHJlZicpe2lmKHByb3BzW2tleV09PW51bGx8fHR5cGVvZiBwcm9wc1trZXldIT09J3N0cmluZycmJnR5cGVvZiBwcm9wc1trZXldIT09J29iamVjdCcpe3Rocm93IGNyZWF0ZVByb3BFcnJvcih7a2V5LGV4cGVjdGVkOidgc3RyaW5nYCBvciBgb2JqZWN0YCcsYWN0dWFsOnByb3BzW2tleV09PT1udWxsPydudWxsJzp0eXBlb2YgcHJvcHNba2V5XX0pO319ZWxzZXsvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuY29uc3QgXz1rZXk7fX0pOy8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG5jb25zdCBvcHRpb25hbFByb3BzR3VhcmQ9e2FzOnRydWUscmVwbGFjZTp0cnVlLHNjcm9sbDp0cnVlLHNoYWxsb3c6dHJ1ZSxwYXNzSHJlZjp0cnVlLHByZWZldGNoOnRydWUsbG9jYWxlOnRydWV9O2NvbnN0IG9wdGlvbmFsUHJvcHM9T2JqZWN0LmtleXMob3B0aW9uYWxQcm9wc0d1YXJkKTtvcHRpb25hbFByb3BzLmZvckVhY2goa2V5PT57Y29uc3QgdmFsVHlwZT10eXBlb2YgcHJvcHNba2V5XTtpZihrZXk9PT0nYXMnKXtpZihwcm9wc1trZXldJiZ2YWxUeXBlIT09J3N0cmluZycmJnZhbFR5cGUhPT0nb2JqZWN0Jyl7dGhyb3cgY3JlYXRlUHJvcEVycm9yKHtrZXksZXhwZWN0ZWQ6J2BzdHJpbmdgIG9yIGBvYmplY3RgJyxhY3R1YWw6dmFsVHlwZX0pO319ZWxzZSBpZihrZXk9PT0nbG9jYWxlJyl7aWYocHJvcHNba2V5XSYmdmFsVHlwZSE9PSdzdHJpbmcnKXt0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe2tleSxleHBlY3RlZDonYHN0cmluZ2AnLGFjdHVhbDp2YWxUeXBlfSk7fX1lbHNlIGlmKGtleT09PSdyZXBsYWNlJ3x8a2V5PT09J3Njcm9sbCd8fGtleT09PSdzaGFsbG93J3x8a2V5PT09J3Bhc3NIcmVmJ3x8a2V5PT09J3ByZWZldGNoJyl7aWYocHJvcHNba2V5XSE9bnVsbCYmdmFsVHlwZSE9PSdib29sZWFuJyl7dGhyb3cgY3JlYXRlUHJvcEVycm9yKHtrZXksZXhwZWN0ZWQ6J2Bib29sZWFuYCcsYWN0dWFsOnZhbFR5cGV9KTt9fWVsc2V7Ly8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmNvbnN0IF89a2V5O319KTsvLyBUaGlzIGhvb2sgaXMgaW4gYSBjb25kaXRpb25hbCBidXQgdGhhdCBpcyBvayBiZWNhdXNlIGBwcm9jZXNzLmVudi5OT0RFX0VOVmAgbmV2ZXIgY2hhbmdlc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG5jb25zdCBoYXNXYXJuZWQ9X3JlYWN0LmRlZmF1bHQudXNlUmVmKGZhbHNlKTtpZihwcm9wcy5wcmVmZXRjaCYmIWhhc1dhcm5lZC5jdXJyZW50KXtoYXNXYXJuZWQuY3VycmVudD10cnVlO2NvbnNvbGUud2FybignTmV4dC5qcyBhdXRvLXByZWZldGNoZXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiB2aWV3cG9ydC4gVGhlIHByZWZldGNoIGF0dHJpYnV0ZSBpcyBubyBsb25nZXIgbmVlZGVkLiBNb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9wcmVmZXRjaC10cnVlLWRlcHJlY2F0ZWQnKTt9fWNvbnN0IHA9cHJvcHMucHJlZmV0Y2ghPT1mYWxzZTtjb25zdCByb3V0ZXI9KDAsX3JvdXRlcjIudXNlUm91dGVyKSgpO2NvbnN0e2hyZWYsYXN9PV9yZWFjdC5kZWZhdWx0LnVzZU1lbW8oKCk9Pntjb25zdFtyZXNvbHZlZEhyZWYscmVzb2x2ZWRBc109KDAsX3JvdXRlci5yZXNvbHZlSHJlZikocm91dGVyLHByb3BzLmhyZWYsdHJ1ZSk7cmV0dXJue2hyZWY6cmVzb2x2ZWRIcmVmLGFzOnByb3BzLmFzPygwLF9yb3V0ZXIucmVzb2x2ZUhyZWYpKHJvdXRlcixwcm9wcy5hcyk6cmVzb2x2ZWRBc3x8cmVzb2x2ZWRIcmVmfTt9LFtyb3V0ZXIscHJvcHMuaHJlZixwcm9wcy5hc10pO2xldHtjaGlsZHJlbixyZXBsYWNlLHNoYWxsb3csc2Nyb2xsLGxvY2FsZX09cHJvcHM7Ly8gRGVwcmVjYXRlZC4gV2FybmluZyBzaG93biBieSBwcm9wVHlwZSBjaGVjay4gSWYgdGhlIGNoaWxkcmVuIHByb3ZpZGVkIGlzIGEgc3RyaW5nICg8TGluaz5leGFtcGxlPC9MaW5rPikgd2Ugd3JhcCBpdCBpbiBhbiA8YT4gdGFnXG5pZih0eXBlb2YgY2hpbGRyZW49PT0nc3RyaW5nJyl7Y2hpbGRyZW49LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsbnVsbCxjaGlsZHJlbik7fS8vIFRoaXMgd2lsbCByZXR1cm4gdGhlIGZpcnN0IGNoaWxkLCBpZiBtdWx0aXBsZSBhcmUgcHJvdmlkZWQgaXQgd2lsbCB0aHJvdyBhbiBlcnJvclxubGV0IGNoaWxkO2lmKHByb2Nlc3MuZW52Lk5PREVfRU5WPT09J2RldmVsb3BtZW50Jyl7dHJ5e2NoaWxkPV9yZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTt9Y2F0Y2goZXJyKXt0aHJvdyBuZXcgRXJyb3IoYE11bHRpcGxlIGNoaWxkcmVuIHdlcmUgcGFzc2VkIHRvIDxMaW5rPiB3aXRoIFxcYGhyZWZcXGAgb2YgXFxgJHtwcm9wcy5ocmVmfVxcYCBidXQgb25seSBvbmUgY2hpbGQgaXMgc3VwcG9ydGVkIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2xpbmstbXVsdGlwbGUtY2hpbGRyZW5gKyh0eXBlb2Ygd2luZG93IT09J3VuZGVmaW5lZCc/XCJcXG5PcGVuIHlvdXIgYnJvd3NlcidzIGNvbnNvbGUgdG8gdmlldyB0aGUgQ29tcG9uZW50IHN0YWNrIHRyYWNlLlwiOicnKSk7fX1lbHNle2NoaWxkPV9yZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTt9Y29uc3QgY2hpbGRSZWY9Y2hpbGQmJnR5cGVvZiBjaGlsZD09PSdvYmplY3QnJiZjaGlsZC5yZWY7Y29uc3Rbc2V0SW50ZXJzZWN0aW9uUmVmLGlzVmlzaWJsZV09KDAsX3VzZUludGVyc2VjdGlvbi51c2VJbnRlcnNlY3Rpb24pKHtyb290TWFyZ2luOicyMDBweCd9KTtjb25zdCBzZXRSZWY9X3JlYWN0LmRlZmF1bHQudXNlQ2FsbGJhY2soZWw9PntzZXRJbnRlcnNlY3Rpb25SZWYoZWwpO2lmKGNoaWxkUmVmKXtpZih0eXBlb2YgY2hpbGRSZWY9PT0nZnVuY3Rpb24nKWNoaWxkUmVmKGVsKTtlbHNlIGlmKHR5cGVvZiBjaGlsZFJlZj09PSdvYmplY3QnKXtjaGlsZFJlZi5jdXJyZW50PWVsO319fSxbY2hpbGRSZWYsc2V0SW50ZXJzZWN0aW9uUmVmXSk7KDAsX3JlYWN0LnVzZUVmZmVjdCkoKCk9Pntjb25zdCBzaG91bGRQcmVmZXRjaD1pc1Zpc2libGUmJnAmJigwLF9yb3V0ZXIuaXNMb2NhbFVSTCkoaHJlZik7Y29uc3QgY3VyTG9jYWxlPXR5cGVvZiBsb2NhbGUhPT0ndW5kZWZpbmVkJz9sb2NhbGU6cm91dGVyJiZyb3V0ZXIubG9jYWxlO2NvbnN0IGlzUHJlZmV0Y2hlZD1wcmVmZXRjaGVkW2hyZWYrJyUnK2FzKyhjdXJMb2NhbGU/JyUnK2N1ckxvY2FsZTonJyldO2lmKHNob3VsZFByZWZldGNoJiYhaXNQcmVmZXRjaGVkKXtwcmVmZXRjaChyb3V0ZXIsaHJlZixhcyx7bG9jYWxlOmN1ckxvY2FsZX0pO319LFthcyxocmVmLGlzVmlzaWJsZSxsb2NhbGUscCxyb3V0ZXJdKTtjb25zdCBjaGlsZFByb3BzPXtyZWY6c2V0UmVmLG9uQ2xpY2s6ZT0+e2lmKGNoaWxkLnByb3BzJiZ0eXBlb2YgY2hpbGQucHJvcHMub25DbGljaz09PSdmdW5jdGlvbicpe2NoaWxkLnByb3BzLm9uQ2xpY2soZSk7fWlmKCFlLmRlZmF1bHRQcmV2ZW50ZWQpe2xpbmtDbGlja2VkKGUscm91dGVyLGhyZWYsYXMscmVwbGFjZSxzaGFsbG93LHNjcm9sbCxsb2NhbGUpO319fTtjaGlsZFByb3BzLm9uTW91c2VFbnRlcj1lPT57aWYoISgwLF9yb3V0ZXIuaXNMb2NhbFVSTCkoaHJlZikpcmV0dXJuO2lmKGNoaWxkLnByb3BzJiZ0eXBlb2YgY2hpbGQucHJvcHMub25Nb3VzZUVudGVyPT09J2Z1bmN0aW9uJyl7Y2hpbGQucHJvcHMub25Nb3VzZUVudGVyKGUpO31wcmVmZXRjaChyb3V0ZXIsaHJlZixhcyx7cHJpb3JpdHk6dHJ1ZX0pO307Ly8gSWYgY2hpbGQgaXMgYW4gPGE+IHRhZyBhbmQgZG9lc24ndCBoYXZlIGEgaHJlZiBhdHRyaWJ1dGUsIG9yIGlmIHRoZSAncGFzc0hyZWYnIHByb3BlcnR5IGlzXG4vLyBkZWZpbmVkLCB3ZSBzcGVjaWZ5IHRoZSBjdXJyZW50ICdocmVmJywgc28gdGhhdCByZXBldGl0aW9uIGlzIG5vdCBuZWVkZWQgYnkgdGhlIHVzZXJcbmlmKHByb3BzLnBhc3NIcmVmfHxjaGlsZC50eXBlPT09J2EnJiYhKCdocmVmJ2luIGNoaWxkLnByb3BzKSl7Y29uc3QgY3VyTG9jYWxlPXR5cGVvZiBsb2NhbGUhPT0ndW5kZWZpbmVkJz9sb2NhbGU6cm91dGVyJiZyb3V0ZXIubG9jYWxlOy8vIHdlIG9ubHkgcmVuZGVyIGRvbWFpbiBsb2NhbGVzIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gYSBkb21haW4gbG9jYWxlXG4vLyBzbyB0aGF0IGxvY2FsZSBsaW5rcyBhcmUgc3RpbGwgdmlzaXRhYmxlIGluIGRldmVsb3BtZW50L3ByZXZpZXcgZW52c1xuY29uc3QgbG9jYWxlRG9tYWluPXJvdXRlciYmcm91dGVyLmlzTG9jYWxlRG9tYWluJiYoMCxfcm91dGVyLmdldERvbWFpbkxvY2FsZSkoYXMsY3VyTG9jYWxlLHJvdXRlciYmcm91dGVyLmxvY2FsZXMscm91dGVyJiZyb3V0ZXIuZG9tYWluTG9jYWxlcyk7Y2hpbGRQcm9wcy5ocmVmPWxvY2FsZURvbWFpbnx8KDAsX3JvdXRlci5hZGRCYXNlUGF0aCkoKDAsX3JvdXRlci5hZGRMb2NhbGUpKGFzLGN1ckxvY2FsZSxyb3V0ZXImJnJvdXRlci5kZWZhdWx0TG9jYWxlKSk7fXJldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jbG9uZUVsZW1lbnQoY2hpbGQsY2hpbGRQcm9wcyk7fXZhciBfZGVmYXVsdD1MaW5rO2V4cG9ydHMuZGVmYXVsdD1fZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmsuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy51c2VJbnRlcnNlY3Rpb249dXNlSW50ZXJzZWN0aW9uO3ZhciBfcmVhY3Q9cmVxdWlyZShcInJlYWN0XCIpO3ZhciBfcmVxdWVzdElkbGVDYWxsYmFjaz1yZXF1aXJlKFwiLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2tcIik7Y29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXI9dHlwZW9mIEludGVyc2VjdGlvbk9ic2VydmVyIT09J3VuZGVmaW5lZCc7ZnVuY3Rpb24gdXNlSW50ZXJzZWN0aW9uKHtyb290TWFyZ2luLGRpc2FibGVkfSl7Y29uc3QgaXNEaXNhYmxlZD1kaXNhYmxlZHx8IWhhc0ludGVyc2VjdGlvbk9ic2VydmVyO2NvbnN0IHVub2JzZXJ2ZT0oMCxfcmVhY3QudXNlUmVmKSgpO2NvbnN0W3Zpc2libGUsc2V0VmlzaWJsZV09KDAsX3JlYWN0LnVzZVN0YXRlKShmYWxzZSk7Y29uc3Qgc2V0UmVmPSgwLF9yZWFjdC51c2VDYWxsYmFjaykoZWw9PntpZih1bm9ic2VydmUuY3VycmVudCl7dW5vYnNlcnZlLmN1cnJlbnQoKTt1bm9ic2VydmUuY3VycmVudD11bmRlZmluZWQ7fWlmKGlzRGlzYWJsZWR8fHZpc2libGUpcmV0dXJuO2lmKGVsJiZlbC50YWdOYW1lKXt1bm9ic2VydmUuY3VycmVudD1vYnNlcnZlKGVsLGlzVmlzaWJsZT0+aXNWaXNpYmxlJiZzZXRWaXNpYmxlKGlzVmlzaWJsZSkse3Jvb3RNYXJnaW59KTt9fSxbaXNEaXNhYmxlZCxyb290TWFyZ2luLHZpc2libGVdKTsoMCxfcmVhY3QudXNlRWZmZWN0KSgoKT0+e2lmKCFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcil7aWYoIXZpc2libGUpe2NvbnN0IGlkbGVDYWxsYmFjaz0oMCxfcmVxdWVzdElkbGVDYWxsYmFjay5yZXF1ZXN0SWRsZUNhbGxiYWNrKSgoKT0+c2V0VmlzaWJsZSh0cnVlKSk7cmV0dXJuKCk9PigwLF9yZXF1ZXN0SWRsZUNhbGxiYWNrLmNhbmNlbElkbGVDYWxsYmFjaykoaWRsZUNhbGxiYWNrKTt9fX0sW3Zpc2libGVdKTtyZXR1cm5bc2V0UmVmLHZpc2libGVdO31mdW5jdGlvbiBvYnNlcnZlKGVsZW1lbnQsY2FsbGJhY2ssb3B0aW9ucyl7Y29uc3R7aWQsb2JzZXJ2ZXIsZWxlbWVudHN9PWNyZWF0ZU9ic2VydmVyKG9wdGlvbnMpO2VsZW1lbnRzLnNldChlbGVtZW50LGNhbGxiYWNrKTtvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO3JldHVybiBmdW5jdGlvbiB1bm9ic2VydmUoKXtlbGVtZW50cy5kZWxldGUoZWxlbWVudCk7b2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpOy8vIERlc3Ryb3kgb2JzZXJ2ZXIgd2hlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byB3YXRjaDpcbmlmKGVsZW1lbnRzLnNpemU9PT0wKXtvYnNlcnZlci5kaXNjb25uZWN0KCk7b2JzZXJ2ZXJzLmRlbGV0ZShpZCk7fX07fWNvbnN0IG9ic2VydmVycz1uZXcgTWFwKCk7ZnVuY3Rpb24gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucyl7Y29uc3QgaWQ9b3B0aW9ucy5yb290TWFyZ2lufHwnJztsZXQgaW5zdGFuY2U9b2JzZXJ2ZXJzLmdldChpZCk7aWYoaW5zdGFuY2Upe3JldHVybiBpbnN0YW5jZTt9Y29uc3QgZWxlbWVudHM9bmV3IE1hcCgpO2NvbnN0IG9ic2VydmVyPW5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzPT57ZW50cmllcy5mb3JFYWNoKGVudHJ5PT57Y29uc3QgY2FsbGJhY2s9ZWxlbWVudHMuZ2V0KGVudHJ5LnRhcmdldCk7Y29uc3QgaXNWaXNpYmxlPWVudHJ5LmlzSW50ZXJzZWN0aW5nfHxlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbz4wO2lmKGNhbGxiYWNrJiZpc1Zpc2libGUpe2NhbGxiYWNrKGlzVmlzaWJsZSk7fX0pO30sb3B0aW9ucyk7b2JzZXJ2ZXJzLnNldChpZCxpbnN0YW5jZT17aWQsb2JzZXJ2ZXIsZWxlbWVudHN9KTtyZXR1cm4gaW5zdGFuY2U7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlLWludGVyc2VjdGlvbi5qcy5tYXAiLCIvKiogQGpzeFJ1bnRpbWUgY2xhc3NpYyAqL1xyXG4vKiogQGpzeCBqc3ggKi9cclxuaW1wb3J0IHsganN4IH0gZnJvbSAndGhlbWUtdWknXHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICd0aGVtZS11aSdcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uL3RoZW1lJ1xyXG5pbXBvcnQgTmF2IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL25hdidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8TmF2IC8+XHJcbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvVGhlbWVQcm92aWRlcj5cclxuICApXHJcbn1cclxuIiwiLyoqIEBqc3hSdW50aW1lIGNsYXNzaWMgKi9cclxuLyoqIEBqc3gganN4ICovXHJcbmltcG9ydCB7IGpzeCB9IGZyb20gJ3RoZW1lLXVpJ1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcblxyXG5jb25zdCBOYXYgPSAoKSA9PiAoXHJcbiAgPGhlYWRlciBzeD17e2hlaWdodDogJzYwcHgnLCB3aWR0aDogJzEwMHZ3JywgYmc6ICdwcmltYXJ5JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkJywgYm9yZGVyQ29sb3I6ICdwcmltYXJ5J319PlxyXG4gICAgPG5hdiBzeD17e2Rpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCB2YXJpYW50OiAnY29udGFpbmVycy5wYWdlJywgaGVpZ2h0OiAnMTAwJSd9fT5cclxuICAgICAgPExpbmsgaHJlZj1cIi9cIj5cclxuICAgICAgICA8YSBzeD17e2ZvbnRXZWlnaHQ6ICdib2xkJywgZm9udFNpemU6IDQsIGN1cnNvcjogJ3BvaW50ZXInfX0+Tm90ZSBBcHA8L2E+XHJcbiAgICAgIDwvTGluaz5cclxuXHJcbiAgICAgIDxMaW5rIGhyZWY9XCIvbm90ZXNcIj5cclxuICAgICAgICA8YSBzeD17e2NvbG9yOiAndGV4dCcsIGZvbnRTaXplOiAzLCBjdXJzb3I6ICdwb2ludGVyJ319Pm5vdGVzPC9hPlxyXG4gICAgICA8L0xpbms+XHJcblxyXG4gICAgPGEgc3g9e3tcclxuICAgICAgICBjb2xvcjogJ3RleHQnLFxyXG4gICAgICAgIGZvbnRTaXplOiAzLFxyXG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgICAgIH19XHJcbiAgICAgIGhyZWY9e3Byb2Nlc3MuZW52LkhFTFBfQVBQX1VSTH1cclxuICAgICAgPlxyXG4gICAgICBIZWxwXHJcbiAgICA8L2E+XHJcblxyXG4gICAgPC9uYXY+XHJcbiAgPC9oZWFkZXI+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdlxyXG4iLCJpbXBvcnQgeyByb2JvdG8gfSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0cyc7XHJcblxyXG5jb25zdCB0aGVtZSA9IHtcclxuICAuLi5yb2JvdG8sXHJcbiAgY29udGFpbmVyczoge1xyXG4gICAgY2FyZDoge1xyXG4gICAgICBib3hTaGFkb3c6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjEyKSwgMCAxcHggMnB4IHJnYmEoMCwwLDAsMC4yNCknLFxyXG4gICAgICBib3JkZXI6ICcxcHggc29saWQnLFxyXG4gICAgICBib3JkZXJDb2xvcjogJ211dGVkJyxcclxuICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgcDogMixcclxuICAgIH0sXHJcbiAgICBwYWdlOiB7XHJcbiAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgIG1heFdpZHRoOiAnOTYwcHgnLFxyXG4gICAgICBtOiAwLFxyXG4gICAgICBteDogJ2F1dG8nLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHN0eWxlczoge1xyXG4gICAgLi4ucm9ib3RvLnN0eWxlcyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGhlbWU7XHJcbiIsImltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2NvcmUnO1xudmFyIGNvbmZpZyA9IHtcbiAgYmFja2dyb3VuZDogdHJ1ZSxcbiAgYmFja2dyb3VuZEltYWdlOiB0cnVlLFxuICBiYWNrZ3JvdW5kU2l6ZTogdHJ1ZSxcbiAgYmFja2dyb3VuZFBvc2l0aW9uOiB0cnVlLFxuICBiYWNrZ3JvdW5kUmVwZWF0OiB0cnVlXG59O1xuY29uZmlnLmJnSW1hZ2UgPSBjb25maWcuYmFja2dyb3VuZEltYWdlO1xuY29uZmlnLmJnU2l6ZSA9IGNvbmZpZy5iYWNrZ3JvdW5kU2l6ZTtcbmNvbmZpZy5iZ1Bvc2l0aW9uID0gY29uZmlnLmJhY2tncm91bmRQb3NpdGlvbjtcbmNvbmZpZy5iZ1JlcGVhdCA9IGNvbmZpZy5iYWNrZ3JvdW5kUmVwZWF0O1xuZXhwb3J0IHZhciBiYWNrZ3JvdW5kID0gc3lzdGVtKGNvbmZpZyk7XG5leHBvcnQgZGVmYXVsdCBiYWNrZ3JvdW5kO1xuIiwiaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29yZSc7XG52YXIgY29uZmlnID0ge1xuICBib3JkZXI6IHtcbiAgICBwcm9wZXJ0eTogJ2JvcmRlcicsXG4gICAgc2NhbGU6ICdib3JkZXJzJ1xuICB9LFxuICBib3JkZXJXaWR0aDoge1xuICAgIHByb3BlcnR5OiAnYm9yZGVyV2lkdGgnLFxuICAgIHNjYWxlOiAnYm9yZGVyV2lkdGhzJ1xuICB9LFxuICBib3JkZXJTdHlsZToge1xuICAgIHByb3BlcnR5OiAnYm9yZGVyU3R5bGUnLFxuICAgIHNjYWxlOiAnYm9yZGVyU3R5bGVzJ1xuICB9LFxuICBib3JkZXJDb2xvcjoge1xuICAgIHByb3BlcnR5OiAnYm9yZGVyQ29sb3InLFxuICAgIHNjYWxlOiAnY29sb3JzJ1xuICB9LFxuICBib3JkZXJSYWRpdXM6IHtcbiAgICBwcm9wZXJ0eTogJ2JvcmRlclJhZGl1cycsXG4gICAgc2NhbGU6ICdyYWRpaSdcbiAgfSxcbiAgYm9yZGVyVG9wOiB7XG4gICAgcHJvcGVydHk6ICdib3JkZXJUb3AnLFxuICAgIHNjYWxlOiAnYm9yZGVycydcbiAgfSxcbiAgYm9yZGVyVG9wTGVmdFJhZGl1czoge1xuICAgIHByb3BlcnR5OiAnYm9yZGVyVG9wTGVmdFJhZGl1cycsXG4gICAgc2NhbGU6ICdyYWRpaSdcbiAgfSxcbiAgYm9yZGVyVG9wUmlnaHRSYWRpdXM6IHtcbiAgICBwcm9wZXJ0eTogJ2JvcmRlclRvcFJpZ2h0UmFkaXVzJyxcbiAgICBzY2FsZTogJ3JhZGlpJ1xuICB9LFxuICBib3JkZXJSaWdodDoge1xuICAgIHByb3BlcnR5OiAnYm9yZGVyUmlnaHQnLFxuICAgIHNjYWxlOiAnYm9yZGVycydcbiAgfSxcbiAgYm9yZGVyQm90dG9tOiB7XG4gICAgcHJvcGVydHk6ICdib3JkZXJCb3R0b20nLFxuICAgIHNjYWxlOiAnYm9yZGVycydcbiAgfSxcbiAgYm9yZGVyQm90dG9tTGVmdFJhZGl1czoge1xuICAgIHByb3BlcnR5OiAnYm9yZGVyQm90dG9tTGVmdFJhZGl1cycsXG4gICAgc2NhbGU6ICdyYWRpaSdcbiAgfSxcbiAgYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM6IHtcbiAgICBwcm9wZXJ0eTogJ2JvcmRlckJvdHRvbVJpZ2h0UmFkaXVzJyxcbiAgICBzY2FsZTogJ3JhZGlpJ1xuICB9LFxuICBib3JkZXJMZWZ0OiB7XG4gICAgcHJvcGVydHk6ICdib3JkZXJMZWZ0JyxcbiAgICBzY2FsZTogJ2JvcmRlcnMnXG4gIH0sXG4gIGJvcmRlclg6IHtcbiAgICBwcm9wZXJ0aWVzOiBbJ2JvcmRlckxlZnQnLCAnYm9yZGVyUmlnaHQnXSxcbiAgICBzY2FsZTogJ2JvcmRlcnMnXG4gIH0sXG4gIGJvcmRlclk6IHtcbiAgICBwcm9wZXJ0aWVzOiBbJ2JvcmRlclRvcCcsICdib3JkZXJCb3R0b20nXSxcbiAgICBzY2FsZTogJ2JvcmRlcnMnXG4gIH1cbn07XG5jb25maWcuYm9yZGVyVG9wV2lkdGggPSB7XG4gIHByb3BlcnR5OiAnYm9yZGVyVG9wV2lkdGgnLFxuICBzY2FsZTogJ2JvcmRlcldpZHRocydcbn07XG5jb25maWcuYm9yZGVyVG9wQ29sb3IgPSB7XG4gIHByb3BlcnR5OiAnYm9yZGVyVG9wQ29sb3InLFxuICBzY2FsZTogJ2NvbG9ycydcbn07XG5jb25maWcuYm9yZGVyVG9wU3R5bGUgPSB7XG4gIHByb3BlcnR5OiAnYm9yZGVyVG9wU3R5bGUnLFxuICBzY2FsZTogJ2JvcmRlclN0eWxlcydcbn07XG5jb25maWcuYm9yZGVyVG9wTGVmdFJhZGl1cyA9IHtcbiAgcHJvcGVydHk6ICdib3JkZXJUb3BMZWZ0UmFkaXVzJyxcbiAgc2NhbGU6ICdyYWRpaSdcbn07XG5jb25maWcuYm9yZGVyVG9wUmlnaHRSYWRpdXMgPSB7XG4gIHByb3BlcnR5OiAnYm9yZGVyVG9wUmlnaHRSYWRpdXMnLFxuICBzY2FsZTogJ3JhZGlpJ1xufTtcbmNvbmZpZy5ib3JkZXJCb3R0b21XaWR0aCA9IHtcbiAgcHJvcGVydHk6ICdib3JkZXJCb3R0b21XaWR0aCcsXG4gIHNjYWxlOiAnYm9yZGVyV2lkdGhzJ1xufTtcbmNvbmZpZy5ib3JkZXJCb3R0b21Db2xvciA9IHtcbiAgcHJvcGVydHk6ICdib3JkZXJCb3R0b21Db2xvcicsXG4gIHNjYWxlOiAnY29sb3JzJ1xufTtcbmNvbmZpZy5ib3JkZXJCb3R0b21TdHlsZSA9IHtcbiAgcHJvcGVydHk6ICdib3JkZXJCb3R0b21TdHlsZScsXG4gIHNjYWxlOiAnYm9yZGVyU3R5bGVzJ1xufTtcbmNvbmZpZy5ib3JkZXJCb3R0b21MZWZ0UmFkaXVzID0ge1xuICBwcm9wZXJ0eTogJ2JvcmRlckJvdHRvbUxlZnRSYWRpdXMnLFxuICBzY2FsZTogJ3JhZGlpJ1xufTtcbmNvbmZpZy5ib3JkZXJCb3R0b21SaWdodFJhZGl1cyA9IHtcbiAgcHJvcGVydHk6ICdib3JkZXJCb3R0b21SaWdodFJhZGl1cycsXG4gIHNjYWxlOiAncmFkaWknXG59O1xuY29uZmlnLmJvcmRlckxlZnRXaWR0aCA9IHtcbiAgcHJvcGVydHk6ICdib3JkZXJMZWZ0V2lkdGgnLFxuICBzY2FsZTogJ2JvcmRlcldpZHRocydcbn07XG5jb25maWcuYm9yZGVyTGVmdENvbG9yID0ge1xuICBwcm9wZXJ0eTogJ2JvcmRlckxlZnRDb2xvcicsXG4gIHNjYWxlOiAnY29sb3JzJ1xufTtcbmNvbmZpZy5ib3JkZXJMZWZ0U3R5bGUgPSB7XG4gIHByb3BlcnR5OiAnYm9yZGVyTGVmdFN0eWxlJyxcbiAgc2NhbGU6ICdib3JkZXJTdHlsZXMnXG59O1xuY29uZmlnLmJvcmRlclJpZ2h0V2lkdGggPSB7XG4gIHByb3BlcnR5OiAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gIHNjYWxlOiAnYm9yZGVyV2lkdGhzJ1xufTtcbmNvbmZpZy5ib3JkZXJSaWdodENvbG9yID0ge1xuICBwcm9wZXJ0eTogJ2JvcmRlclJpZ2h0Q29sb3InLFxuICBzY2FsZTogJ2NvbG9ycydcbn07XG5jb25maWcuYm9yZGVyUmlnaHRTdHlsZSA9IHtcbiAgcHJvcGVydHk6ICdib3JkZXJSaWdodFN0eWxlJyxcbiAgc2NhbGU6ICdib3JkZXJTdHlsZXMnXG59O1xuZXhwb3J0IHZhciBib3JkZXIgPSBzeXN0ZW0oY29uZmlnKTtcbmV4cG9ydCBkZWZhdWx0IGJvcmRlcjtcbiIsImltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2NvcmUnO1xudmFyIGNvbmZpZyA9IHtcbiAgY29sb3I6IHtcbiAgICBwcm9wZXJ0eTogJ2NvbG9yJyxcbiAgICBzY2FsZTogJ2NvbG9ycydcbiAgfSxcbiAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgcHJvcGVydHk6ICdiYWNrZ3JvdW5kQ29sb3InLFxuICAgIHNjYWxlOiAnY29sb3JzJ1xuICB9LFxuICBvcGFjaXR5OiB0cnVlXG59O1xuY29uZmlnLmJnID0gY29uZmlnLmJhY2tncm91bmRDb2xvcjtcbmV4cG9ydCB2YXIgY29sb3IgPSBzeXN0ZW0oY29uZmlnKTtcbmV4cG9ydCBkZWZhdWx0IGNvbG9yO1xuIiwiaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcbmV4cG9ydCB2YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIHZhciByZXN1bHQgPSBhc3NpZ24oe30sIGEsIGIpO1xuXG4gIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgdmFyIF9hc3NpZ247XG5cbiAgICBpZiAoIWFba2V5XSB8fCB0eXBlb2YgYltrZXldICE9PSAnb2JqZWN0JykgY29udGludWU7XG4gICAgYXNzaWduKHJlc3VsdCwgKF9hc3NpZ24gPSB7fSwgX2Fzc2lnbltrZXldID0gYXNzaWduKGFba2V5XSwgYltrZXldKSwgX2Fzc2lnbikpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07IC8vIHNvcnQgb2JqZWN0LXZhbHVlIHJlc3BvbnNpdmUgc3R5bGVzXG5cbnZhciBzb3J0ID0gZnVuY3Rpb24gc29ydChvYmopIHtcbiAgdmFyIG5leHQgPSB7fTtcbiAgT2JqZWN0LmtleXMob2JqKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiLCB1bmRlZmluZWQsIHtcbiAgICAgIG51bWVyaWM6IHRydWUsXG4gICAgICBzZW5zaXRpdml0eTogJ2Jhc2UnXG4gICAgfSk7XG4gIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIG5leHRba2V5XSA9IG9ialtrZXldO1xuICB9KTtcbiAgcmV0dXJuIG5leHQ7XG59O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGJyZWFrcG9pbnRzOiBbNDAsIDUyLCA2NF0ubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuIG4gKyAnZW0nO1xuICB9KVxufTtcblxudmFyIGNyZWF0ZU1lZGlhUXVlcnkgPSBmdW5jdGlvbiBjcmVhdGVNZWRpYVF1ZXJ5KG4pIHtcbiAgcmV0dXJuIFwiQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogXCIgKyBuICsgXCIpXCI7XG59O1xuXG52YXIgZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZShuLCBzY2FsZSkge1xuICByZXR1cm4gZ2V0KHNjYWxlLCBuLCBuKTtcbn07XG5cbmV4cG9ydCB2YXIgZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iaiwga2V5LCBkZWYsIHAsIHVuZGVmKSB7XG4gIGtleSA9IGtleSAmJiBrZXkuc3BsaXQgPyBrZXkuc3BsaXQoJy4nKSA6IFtrZXldO1xuXG4gIGZvciAocCA9IDA7IHAgPCBrZXkubGVuZ3RoOyBwKyspIHtcbiAgICBvYmogPSBvYmogPyBvYmpba2V5W3BdXSA6IHVuZGVmO1xuICB9XG5cbiAgcmV0dXJuIG9iaiA9PT0gdW5kZWYgPyBkZWYgOiBvYmo7XG59O1xuZXhwb3J0IHZhciBjcmVhdGVQYXJzZXIgPSBmdW5jdGlvbiBjcmVhdGVQYXJzZXIoY29uZmlnKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuXG4gIHZhciBwYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHByb3BzKSB7XG4gICAgdmFyIHN0eWxlcyA9IHt9O1xuICAgIHZhciBzaG91bGRTb3J0ID0gZmFsc2U7XG4gICAgdmFyIGlzQ2FjaGVEaXNhYmxlZCA9IHByb3BzLnRoZW1lICYmIHByb3BzLnRoZW1lLmRpc2FibGVTdHlsZWRTeXN0ZW1DYWNoZTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgaWYgKCFjb25maWdba2V5XSkgY29udGludWU7XG4gICAgICB2YXIgc3ggPSBjb25maWdba2V5XTtcbiAgICAgIHZhciByYXcgPSBwcm9wc1trZXldO1xuICAgICAgdmFyIHNjYWxlID0gZ2V0KHByb3BzLnRoZW1lLCBzeC5zY2FsZSwgc3guZGVmYXVsdHMpO1xuXG4gICAgICBpZiAodHlwZW9mIHJhdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY2FjaGUuYnJlYWtwb2ludHMgPSAhaXNDYWNoZURpc2FibGVkICYmIGNhY2hlLmJyZWFrcG9pbnRzIHx8IGdldChwcm9wcy50aGVtZSwgJ2JyZWFrcG9pbnRzJywgZGVmYXVsdHMuYnJlYWtwb2ludHMpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdykpIHtcbiAgICAgICAgICBjYWNoZS5tZWRpYSA9ICFpc0NhY2hlRGlzYWJsZWQgJiYgY2FjaGUubWVkaWEgfHwgW251bGxdLmNvbmNhdChjYWNoZS5icmVha3BvaW50cy5tYXAoY3JlYXRlTWVkaWFRdWVyeSkpO1xuICAgICAgICAgIHN0eWxlcyA9IG1lcmdlKHN0eWxlcywgcGFyc2VSZXNwb25zaXZlU3R5bGUoY2FjaGUubWVkaWEsIHN4LCBzY2FsZSwgcmF3LCBwcm9wcykpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhdyAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0eWxlcyA9IG1lcmdlKHN0eWxlcywgcGFyc2VSZXNwb25zaXZlT2JqZWN0KGNhY2hlLmJyZWFrcG9pbnRzLCBzeCwgc2NhbGUsIHJhdywgcHJvcHMpKTtcbiAgICAgICAgICBzaG91bGRTb3J0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBhc3NpZ24oc3R5bGVzLCBzeChyYXcsIHNjYWxlLCBwcm9wcykpO1xuICAgIH0gLy8gc29ydCBvYmplY3QtYmFzZWQgcmVzcG9uc2l2ZSBzdHlsZXNcblxuXG4gICAgaWYgKHNob3VsZFNvcnQpIHtcbiAgICAgIHN0eWxlcyA9IHNvcnQoc3R5bGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9O1xuXG4gIHBhcnNlLmNvbmZpZyA9IGNvbmZpZztcbiAgcGFyc2UucHJvcE5hbWVzID0gT2JqZWN0LmtleXMoY29uZmlnKTtcbiAgcGFyc2UuY2FjaGUgPSBjYWNoZTtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhjb25maWcpLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgIHJldHVybiBrICE9PSAnY29uZmlnJztcbiAgfSk7XG5cbiAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgX2NyZWF0ZVBhcnNlcjtcblxuICAgICAgcGFyc2Vba2V5XSA9IGNyZWF0ZVBhcnNlcigoX2NyZWF0ZVBhcnNlciA9IHt9LCBfY3JlYXRlUGFyc2VyW2tleV0gPSBjb25maWdba2V5XSwgX2NyZWF0ZVBhcnNlcikpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlO1xufTtcblxudmFyIHBhcnNlUmVzcG9uc2l2ZVN0eWxlID0gZnVuY3Rpb24gcGFyc2VSZXNwb25zaXZlU3R5bGUobWVkaWFRdWVyaWVzLCBzeCwgc2NhbGUsIHJhdywgX3Byb3BzKSB7XG4gIHZhciBzdHlsZXMgPSB7fTtcbiAgcmF3LnNsaWNlKDAsIG1lZGlhUXVlcmllcy5sZW5ndGgpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG4gICAgdmFyIG1lZGlhID0gbWVkaWFRdWVyaWVzW2ldO1xuICAgIHZhciBzdHlsZSA9IHN4KHZhbHVlLCBzY2FsZSwgX3Byb3BzKTtcblxuICAgIGlmICghbWVkaWEpIHtcbiAgICAgIGFzc2lnbihzdHlsZXMsIHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9hc3NpZ24yO1xuXG4gICAgICBhc3NpZ24oc3R5bGVzLCAoX2Fzc2lnbjIgPSB7fSwgX2Fzc2lnbjJbbWVkaWFdID0gYXNzaWduKHt9LCBzdHlsZXNbbWVkaWFdLCBzdHlsZSksIF9hc3NpZ24yKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN0eWxlcztcbn07XG5cbnZhciBwYXJzZVJlc3BvbnNpdmVPYmplY3QgPSBmdW5jdGlvbiBwYXJzZVJlc3BvbnNpdmVPYmplY3QoYnJlYWtwb2ludHMsIHN4LCBzY2FsZSwgcmF3LCBfcHJvcHMpIHtcbiAgdmFyIHN0eWxlcyA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiByYXcpIHtcbiAgICB2YXIgYnJlYWtwb2ludCA9IGJyZWFrcG9pbnRzW2tleV07XG4gICAgdmFyIHZhbHVlID0gcmF3W2tleV07XG4gICAgdmFyIHN0eWxlID0gc3godmFsdWUsIHNjYWxlLCBfcHJvcHMpO1xuXG4gICAgaWYgKCFicmVha3BvaW50KSB7XG4gICAgICBhc3NpZ24oc3R5bGVzLCBzdHlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfYXNzaWduMztcblxuICAgICAgdmFyIG1lZGlhID0gY3JlYXRlTWVkaWFRdWVyeShicmVha3BvaW50KTtcbiAgICAgIGFzc2lnbihzdHlsZXMsIChfYXNzaWduMyA9IHt9LCBfYXNzaWduM1ttZWRpYV0gPSBhc3NpZ24oe30sIHN0eWxlc1ttZWRpYV0sIHN0eWxlKSwgX2Fzc2lnbjMpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3R5bGVzO1xufTtcblxuZXhwb3J0IHZhciBjcmVhdGVTdHlsZUZ1bmN0aW9uID0gZnVuY3Rpb24gY3JlYXRlU3R5bGVGdW5jdGlvbihfcmVmKSB7XG4gIHZhciBwcm9wZXJ0aWVzID0gX3JlZi5wcm9wZXJ0aWVzLFxuICAgICAgcHJvcGVydHkgPSBfcmVmLnByb3BlcnR5LFxuICAgICAgc2NhbGUgPSBfcmVmLnNjYWxlLFxuICAgICAgX3JlZiR0cmFuc2Zvcm0gPSBfcmVmLnRyYW5zZm9ybSxcbiAgICAgIHRyYW5zZm9ybSA9IF9yZWYkdHJhbnNmb3JtID09PSB2b2lkIDAgPyBnZXRWYWx1ZSA6IF9yZWYkdHJhbnNmb3JtLFxuICAgICAgZGVmYXVsdFNjYWxlID0gX3JlZi5kZWZhdWx0U2NhbGU7XG4gIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IFtwcm9wZXJ0eV07XG5cbiAgdmFyIHN4ID0gZnVuY3Rpb24gc3godmFsdWUsIHNjYWxlLCBfcHJvcHMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgdmFyIG4gPSB0cmFuc2Zvcm0odmFsdWUsIHNjYWxlLCBfcHJvcHMpO1xuICAgIGlmIChuID09PSBudWxsKSByZXR1cm47XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICByZXN1bHRbcHJvcF0gPSBuO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgc3guc2NhbGUgPSBzY2FsZTtcbiAgc3guZGVmYXVsdHMgPSBkZWZhdWx0U2NhbGU7XG4gIHJldHVybiBzeDtcbn07IC8vIG5ldyB2NSBBUElcblxuZXhwb3J0IHZhciBzeXN0ZW0gPSBmdW5jdGlvbiBzeXN0ZW0oYXJncykge1xuICBpZiAoYXJncyA9PT0gdm9pZCAwKSB7XG4gICAgYXJncyA9IHt9O1xuICB9XG5cbiAgdmFyIGNvbmZpZyA9IHt9O1xuICBPYmplY3Qua2V5cyhhcmdzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgY29uZiA9IGFyZ3Nba2V5XTtcblxuICAgIGlmIChjb25mID09PSB0cnVlKSB7XG4gICAgICAvLyBzaG9ydGN1dCBkZWZpbml0aW9uXG4gICAgICBjb25maWdba2V5XSA9IGNyZWF0ZVN0eWxlRnVuY3Rpb24oe1xuICAgICAgICBwcm9wZXJ0eToga2V5LFxuICAgICAgICBzY2FsZToga2V5XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbmZpZ1trZXldID0gY29uZjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25maWdba2V5XSA9IGNyZWF0ZVN0eWxlRnVuY3Rpb24oY29uZik7XG4gIH0pO1xuICB2YXIgcGFyc2VyID0gY3JlYXRlUGFyc2VyKGNvbmZpZyk7XG4gIHJldHVybiBwYXJzZXI7XG59O1xuZXhwb3J0IHZhciBjb21wb3NlID0gZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJzZXJzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHBhcnNlcnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBwYXJzZXJzLmZvckVhY2goZnVuY3Rpb24gKHBhcnNlcikge1xuICAgIGlmICghcGFyc2VyIHx8ICFwYXJzZXIuY29uZmlnKSByZXR1cm47XG4gICAgYXNzaWduKGNvbmZpZywgcGFyc2VyLmNvbmZpZyk7XG4gIH0pO1xuICB2YXIgcGFyc2VyID0gY3JlYXRlUGFyc2VyKGNvbmZpZyk7XG4gIHJldHVybiBwYXJzZXI7XG59O1xuIiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cblxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdC9kbHZcbmV4cG9ydCB2YXIgZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iaiwga2V5LCBkZWYsIHAsIHVuZGVmKSB7XG4gIGtleSA9IGtleSAmJiBrZXkuc3BsaXQgPyBrZXkuc3BsaXQoJy4nKSA6IFtrZXldO1xuXG4gIGZvciAocCA9IDA7IHAgPCBrZXkubGVuZ3RoOyBwKyspIHtcbiAgICBvYmogPSBvYmogPyBvYmpba2V5W3BdXSA6IHVuZGVmO1xuICB9XG5cbiAgcmV0dXJuIG9iaiA9PT0gdW5kZWYgPyBkZWYgOiBvYmo7XG59O1xudmFyIGRlZmF1bHRCcmVha3BvaW50cyA9IFs0MCwgNTIsIDY0XS5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgcmV0dXJuIG4gKyAnZW0nO1xufSk7XG52YXIgZGVmYXVsdFRoZW1lID0ge1xuICBzcGFjZTogWzAsIDQsIDgsIDE2LCAzMiwgNjQsIDEyOCwgMjU2LCA1MTJdLFxuICBmb250U2l6ZXM6IFsxMiwgMTQsIDE2LCAyMCwgMjQsIDMyLCA0OCwgNjQsIDcyXVxufTtcbnZhciBhbGlhc2VzID0ge1xuICBiZzogJ2JhY2tncm91bmRDb2xvcicsXG4gIG06ICdtYXJnaW4nLFxuICBtdDogJ21hcmdpblRvcCcsXG4gIG1yOiAnbWFyZ2luUmlnaHQnLFxuICBtYjogJ21hcmdpbkJvdHRvbScsXG4gIG1sOiAnbWFyZ2luTGVmdCcsXG4gIG14OiAnbWFyZ2luWCcsXG4gIG15OiAnbWFyZ2luWScsXG4gIHA6ICdwYWRkaW5nJyxcbiAgcHQ6ICdwYWRkaW5nVG9wJyxcbiAgcHI6ICdwYWRkaW5nUmlnaHQnLFxuICBwYjogJ3BhZGRpbmdCb3R0b20nLFxuICBwbDogJ3BhZGRpbmdMZWZ0JyxcbiAgcHg6ICdwYWRkaW5nWCcsXG4gIHB5OiAncGFkZGluZ1knXG59O1xudmFyIG11bHRpcGxlcyA9IHtcbiAgbWFyZ2luWDogWydtYXJnaW5MZWZ0JywgJ21hcmdpblJpZ2h0J10sXG4gIG1hcmdpblk6IFsnbWFyZ2luVG9wJywgJ21hcmdpbkJvdHRvbSddLFxuICBwYWRkaW5nWDogWydwYWRkaW5nTGVmdCcsICdwYWRkaW5nUmlnaHQnXSxcbiAgcGFkZGluZ1k6IFsncGFkZGluZ1RvcCcsICdwYWRkaW5nQm90dG9tJ10sXG4gIHNpemU6IFsnd2lkdGgnLCAnaGVpZ2h0J11cbn07XG52YXIgc2NhbGVzID0ge1xuICBjb2xvcjogJ2NvbG9ycycsXG4gIGJhY2tncm91bmRDb2xvcjogJ2NvbG9ycycsXG4gIGJvcmRlckNvbG9yOiAnY29sb3JzJyxcbiAgbWFyZ2luOiAnc3BhY2UnLFxuICBtYXJnaW5Ub3A6ICdzcGFjZScsXG4gIG1hcmdpblJpZ2h0OiAnc3BhY2UnLFxuICBtYXJnaW5Cb3R0b206ICdzcGFjZScsXG4gIG1hcmdpbkxlZnQ6ICdzcGFjZScsXG4gIG1hcmdpblg6ICdzcGFjZScsXG4gIG1hcmdpblk6ICdzcGFjZScsXG4gIHBhZGRpbmc6ICdzcGFjZScsXG4gIHBhZGRpbmdUb3A6ICdzcGFjZScsXG4gIHBhZGRpbmdSaWdodDogJ3NwYWNlJyxcbiAgcGFkZGluZ0JvdHRvbTogJ3NwYWNlJyxcbiAgcGFkZGluZ0xlZnQ6ICdzcGFjZScsXG4gIHBhZGRpbmdYOiAnc3BhY2UnLFxuICBwYWRkaW5nWTogJ3NwYWNlJyxcbiAgdG9wOiAnc3BhY2UnLFxuICByaWdodDogJ3NwYWNlJyxcbiAgYm90dG9tOiAnc3BhY2UnLFxuICBsZWZ0OiAnc3BhY2UnLFxuICBncmlkR2FwOiAnc3BhY2UnLFxuICBncmlkQ29sdW1uR2FwOiAnc3BhY2UnLFxuICBncmlkUm93R2FwOiAnc3BhY2UnLFxuICBnYXA6ICdzcGFjZScsXG4gIGNvbHVtbkdhcDogJ3NwYWNlJyxcbiAgcm93R2FwOiAnc3BhY2UnLFxuICBmb250RmFtaWx5OiAnZm9udHMnLFxuICBmb250U2l6ZTogJ2ZvbnRTaXplcycsXG4gIGZvbnRXZWlnaHQ6ICdmb250V2VpZ2h0cycsXG4gIGxpbmVIZWlnaHQ6ICdsaW5lSGVpZ2h0cycsXG4gIGxldHRlclNwYWNpbmc6ICdsZXR0ZXJTcGFjaW5ncycsXG4gIGJvcmRlcjogJ2JvcmRlcnMnLFxuICBib3JkZXJUb3A6ICdib3JkZXJzJyxcbiAgYm9yZGVyUmlnaHQ6ICdib3JkZXJzJyxcbiAgYm9yZGVyQm90dG9tOiAnYm9yZGVycycsXG4gIGJvcmRlckxlZnQ6ICdib3JkZXJzJyxcbiAgYm9yZGVyV2lkdGg6ICdib3JkZXJXaWR0aHMnLFxuICBib3JkZXJTdHlsZTogJ2JvcmRlclN0eWxlcycsXG4gIGJvcmRlclJhZGl1czogJ3JhZGlpJyxcbiAgYm9yZGVyVG9wUmlnaHRSYWRpdXM6ICdyYWRpaScsXG4gIGJvcmRlclRvcExlZnRSYWRpdXM6ICdyYWRpaScsXG4gIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAncmFkaWknLFxuICBib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiAncmFkaWknLFxuICBib3JkZXJUb3BXaWR0aDogJ2JvcmRlcldpZHRocycsXG4gIGJvcmRlclRvcENvbG9yOiAnY29sb3JzJyxcbiAgYm9yZGVyVG9wU3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJCb3R0b21XaWR0aDogJ2JvcmRlcldpZHRocycsXG4gIGJvcmRlckJvdHRvbUNvbG9yOiAnY29sb3JzJyxcbiAgYm9yZGVyQm90dG9tU3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJMZWZ0V2lkdGg6ICdib3JkZXJXaWR0aHMnLFxuICBib3JkZXJMZWZ0Q29sb3I6ICdjb2xvcnMnLFxuICBib3JkZXJMZWZ0U3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJSaWdodFdpZHRoOiAnYm9yZGVyV2lkdGhzJyxcbiAgYm9yZGVyUmlnaHRDb2xvcjogJ2NvbG9ycycsXG4gIGJvcmRlclJpZ2h0U3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBvdXRsaW5lQ29sb3I6ICdjb2xvcnMnLFxuICBib3hTaGFkb3c6ICdzaGFkb3dzJyxcbiAgdGV4dFNoYWRvdzogJ3NoYWRvd3MnLFxuICB6SW5kZXg6ICd6SW5kaWNlcycsXG4gIHdpZHRoOiAnc2l6ZXMnLFxuICBtaW5XaWR0aDogJ3NpemVzJyxcbiAgbWF4V2lkdGg6ICdzaXplcycsXG4gIGhlaWdodDogJ3NpemVzJyxcbiAgbWluSGVpZ2h0OiAnc2l6ZXMnLFxuICBtYXhIZWlnaHQ6ICdzaXplcycsXG4gIGZsZXhCYXNpczogJ3NpemVzJyxcbiAgc2l6ZTogJ3NpemVzJyxcbiAgLy8gc3ZnXG4gIGZpbGw6ICdjb2xvcnMnLFxuICBzdHJva2U6ICdjb2xvcnMnXG59O1xuXG52YXIgcG9zaXRpdmVPck5lZ2F0aXZlID0gZnVuY3Rpb24gcG9zaXRpdmVPck5lZ2F0aXZlKHNjYWxlLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSA+PSAwKSB7XG4gICAgcmV0dXJuIGdldChzY2FsZSwgdmFsdWUsIHZhbHVlKTtcbiAgfVxuXG4gIHZhciBhYnNvbHV0ZSA9IE1hdGguYWJzKHZhbHVlKTtcbiAgdmFyIG4gPSBnZXQoc2NhbGUsIGFic29sdXRlLCBhYnNvbHV0ZSk7XG4gIGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycpIHJldHVybiAnLScgKyBuO1xuICByZXR1cm4gbiAqIC0xO1xufTtcblxudmFyIHRyYW5zZm9ybXMgPSBbJ21hcmdpbicsICdtYXJnaW5Ub3AnLCAnbWFyZ2luUmlnaHQnLCAnbWFyZ2luQm90dG9tJywgJ21hcmdpbkxlZnQnLCAnbWFyZ2luWCcsICdtYXJnaW5ZJywgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCddLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXJyKSB7XG4gIHZhciBfZXh0ZW5kczI7XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBhY2MsIChfZXh0ZW5kczIgPSB7fSwgX2V4dGVuZHMyW2N1cnJdID0gcG9zaXRpdmVPck5lZ2F0aXZlLCBfZXh0ZW5kczIpKTtcbn0sIHt9KTtcbmV4cG9ydCB2YXIgcmVzcG9uc2l2ZSA9IGZ1bmN0aW9uIHJlc3BvbnNpdmUoc3R5bGVzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhlbWUpIHtcbiAgICB2YXIgbmV4dCA9IHt9O1xuICAgIHZhciBicmVha3BvaW50cyA9IGdldCh0aGVtZSwgJ2JyZWFrcG9pbnRzJywgZGVmYXVsdEJyZWFrcG9pbnRzKTtcbiAgICB2YXIgbWVkaWFRdWVyaWVzID0gW251bGxdLmNvbmNhdChicmVha3BvaW50cy5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgICAgIHJldHVybiBcIkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IFwiICsgbiArIFwiKVwiO1xuICAgIH0pKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzdHlsZXMpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHR5cGVvZiBzdHlsZXNba2V5XSA9PT0gJ2Z1bmN0aW9uJyA/IHN0eWxlc1trZXldKHRoZW1lKSA6IHN0eWxlc1trZXldO1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIG5leHRba2V5XSA9IHZhbHVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5zbGljZSgwLCBtZWRpYVF1ZXJpZXMubGVuZ3RoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbWVkaWEgPSBtZWRpYVF1ZXJpZXNbaV07XG5cbiAgICAgICAgaWYgKCFtZWRpYSkge1xuICAgICAgICAgIG5leHRba2V5XSA9IHZhbHVlW2ldO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dFttZWRpYV0gPSBuZXh0W21lZGlhXSB8fCB7fTtcbiAgICAgICAgaWYgKHZhbHVlW2ldID09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICBuZXh0W21lZGlhXVtrZXldID0gdmFsdWVbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQ7XG4gIH07XG59O1xuZXhwb3J0IHZhciBjc3MgPSBmdW5jdGlvbiBjc3MoYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgaWYgKHByb3BzID09PSB2b2lkIDApIHtcbiAgICAgIHByb3BzID0ge307XG4gICAgfVxuXG4gICAgdmFyIHRoZW1lID0gX2V4dGVuZHMoe30sIGRlZmF1bHRUaGVtZSwge30sIHByb3BzLnRoZW1lIHx8IHByb3BzKTtcblxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIgb2JqID0gdHlwZW9mIGFyZ3MgPT09ICdmdW5jdGlvbicgPyBhcmdzKHRoZW1lKSA6IGFyZ3M7XG4gICAgdmFyIHN0eWxlcyA9IHJlc3BvbnNpdmUob2JqKSh0aGVtZSk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc3R5bGVzKSB7XG4gICAgICB2YXIgeCA9IHN0eWxlc1trZXldO1xuICAgICAgdmFyIHZhbCA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCh0aGVtZSkgOiB4O1xuXG4gICAgICBpZiAoa2V5ID09PSAndmFyaWFudCcpIHtcbiAgICAgICAgdmFyIHZhcmlhbnQgPSBjc3MoZ2V0KHRoZW1lLCB2YWwpKSh0aGVtZSk7XG4gICAgICAgIHJlc3VsdCA9IF9leHRlbmRzKHt9LCByZXN1bHQsIHt9LCB2YXJpYW50KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBjc3ModmFsKSh0aGVtZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcCA9IGdldChhbGlhc2VzLCBrZXksIGtleSk7XG4gICAgICB2YXIgc2NhbGVOYW1lID0gZ2V0KHNjYWxlcywgcHJvcCk7XG4gICAgICB2YXIgc2NhbGUgPSBnZXQodGhlbWUsIHNjYWxlTmFtZSwgZ2V0KHRoZW1lLCBwcm9wLCB7fSkpO1xuICAgICAgdmFyIHRyYW5zZm9ybSA9IGdldCh0cmFuc2Zvcm1zLCBwcm9wLCBnZXQpO1xuICAgICAgdmFyIHZhbHVlID0gdHJhbnNmb3JtKHNjYWxlLCB2YWwsIHZhbCk7XG5cbiAgICAgIGlmIChtdWx0aXBsZXNbcHJvcF0pIHtcbiAgICAgICAgdmFyIGRpcnMgPSBtdWx0aXBsZXNbcHJvcF07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcmVzdWx0W2RpcnNbaV1dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuZXhwb3J0IGRlZmF1bHQgY3NzO1xuIiwiaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29yZSc7XG52YXIgY29uZmlnID0ge1xuICBhbGlnbkl0ZW1zOiB0cnVlLFxuICBhbGlnbkNvbnRlbnQ6IHRydWUsXG4gIGp1c3RpZnlJdGVtczogdHJ1ZSxcbiAganVzdGlmeUNvbnRlbnQ6IHRydWUsXG4gIGZsZXhXcmFwOiB0cnVlLFxuICBmbGV4RGlyZWN0aW9uOiB0cnVlLFxuICAvLyBpdGVtXG4gIGZsZXg6IHRydWUsXG4gIGZsZXhHcm93OiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4QmFzaXM6IHRydWUsXG4gIGp1c3RpZnlTZWxmOiB0cnVlLFxuICBhbGlnblNlbGY6IHRydWUsXG4gIG9yZGVyOiB0cnVlXG59O1xuZXhwb3J0IHZhciBmbGV4Ym94ID0gc3lzdGVtKGNvbmZpZyk7XG5leHBvcnQgZGVmYXVsdCBmbGV4Ym94O1xuIiwiaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29yZSc7XG52YXIgZGVmYXVsdHMgPSB7XG4gIHNwYWNlOiBbMCwgNCwgOCwgMTYsIDMyLCA2NCwgMTI4LCAyNTYsIDUxMl1cbn07XG52YXIgY29uZmlnID0ge1xuICBncmlkR2FwOiB7XG4gICAgcHJvcGVydHk6ICdncmlkR2FwJyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIGdyaWRDb2x1bW5HYXA6IHtcbiAgICBwcm9wZXJ0eTogJ2dyaWRDb2x1bW5HYXAnLFxuICAgIHNjYWxlOiAnc3BhY2UnLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuc3BhY2VcbiAgfSxcbiAgZ3JpZFJvd0dhcDoge1xuICAgIHByb3BlcnR5OiAnZ3JpZFJvd0dhcCcsXG4gICAgc2NhbGU6ICdzcGFjZScsXG4gICAgZGVmYXVsdFNjYWxlOiBkZWZhdWx0cy5zcGFjZVxuICB9LFxuICBncmlkQ29sdW1uOiB0cnVlLFxuICBncmlkUm93OiB0cnVlLFxuICBncmlkQXV0b0Zsb3c6IHRydWUsXG4gIGdyaWRBdXRvQ29sdW1uczogdHJ1ZSxcbiAgZ3JpZEF1dG9Sb3dzOiB0cnVlLFxuICBncmlkVGVtcGxhdGVDb2x1bW5zOiB0cnVlLFxuICBncmlkVGVtcGxhdGVSb3dzOiB0cnVlLFxuICBncmlkVGVtcGxhdGVBcmVhczogdHJ1ZSxcbiAgZ3JpZEFyZWE6IHRydWVcbn07XG5leHBvcnQgdmFyIGdyaWQgPSBzeXN0ZW0oY29uZmlnKTtcbmV4cG9ydCBkZWZhdWx0IGdyaWQ7XG4iLCJpbXBvcnQgeyBzeXN0ZW0sIGdldCB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2NvcmUnO1xuXG52YXIgaXNOdW1iZXIgPSBmdW5jdGlvbiBpc051bWJlcihuKSB7XG4gIHJldHVybiB0eXBlb2YgbiA9PT0gJ251bWJlcicgJiYgIWlzTmFOKG4pO1xufTtcblxudmFyIGdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgobiwgc2NhbGUpIHtcbiAgcmV0dXJuIGdldChzY2FsZSwgbiwgIWlzTnVtYmVyKG4pIHx8IG4gPiAxID8gbiA6IG4gKiAxMDAgKyAnJScpO1xufTtcblxudmFyIGNvbmZpZyA9IHtcbiAgd2lkdGg6IHtcbiAgICBwcm9wZXJ0eTogJ3dpZHRoJyxcbiAgICBzY2FsZTogJ3NpemVzJyxcbiAgICB0cmFuc2Zvcm06IGdldFdpZHRoXG4gIH0sXG4gIGhlaWdodDoge1xuICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcbiAgICBzY2FsZTogJ3NpemVzJ1xuICB9LFxuICBtaW5XaWR0aDoge1xuICAgIHByb3BlcnR5OiAnbWluV2lkdGgnLFxuICAgIHNjYWxlOiAnc2l6ZXMnXG4gIH0sXG4gIG1pbkhlaWdodDoge1xuICAgIHByb3BlcnR5OiAnbWluSGVpZ2h0JyxcbiAgICBzY2FsZTogJ3NpemVzJ1xuICB9LFxuICBtYXhXaWR0aDoge1xuICAgIHByb3BlcnR5OiAnbWF4V2lkdGgnLFxuICAgIHNjYWxlOiAnc2l6ZXMnXG4gIH0sXG4gIG1heEhlaWdodDoge1xuICAgIHByb3BlcnR5OiAnbWF4SGVpZ2h0JyxcbiAgICBzY2FsZTogJ3NpemVzJ1xuICB9LFxuICBzaXplOiB7XG4gICAgcHJvcGVydGllczogWyd3aWR0aCcsICdoZWlnaHQnXSxcbiAgICBzY2FsZTogJ3NpemVzJ1xuICB9LFxuICBvdmVyZmxvdzogdHJ1ZSxcbiAgb3ZlcmZsb3dYOiB0cnVlLFxuICBvdmVyZmxvd1k6IHRydWUsXG4gIGRpc3BsYXk6IHRydWUsXG4gIHZlcnRpY2FsQWxpZ246IHRydWVcbn07XG5leHBvcnQgdmFyIGxheW91dCA9IHN5c3RlbShjb25maWcpO1xuZXhwb3J0IGRlZmF1bHQgbGF5b3V0O1xuIiwiaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29yZSc7XG52YXIgZGVmYXVsdHMgPSB7XG4gIHNwYWNlOiBbMCwgNCwgOCwgMTYsIDMyLCA2NCwgMTI4LCAyNTYsIDUxMl1cbn07XG52YXIgY29uZmlnID0ge1xuICBwb3NpdGlvbjogdHJ1ZSxcbiAgekluZGV4OiB7XG4gICAgcHJvcGVydHk6ICd6SW5kZXgnLFxuICAgIHNjYWxlOiAnekluZGljZXMnXG4gIH0sXG4gIHRvcDoge1xuICAgIHByb3BlcnR5OiAndG9wJyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIHJpZ2h0OiB7XG4gICAgcHJvcGVydHk6ICdyaWdodCcsXG4gICAgc2NhbGU6ICdzcGFjZScsXG4gICAgZGVmYXVsdFNjYWxlOiBkZWZhdWx0cy5zcGFjZVxuICB9LFxuICBib3R0b206IHtcbiAgICBwcm9wZXJ0eTogJ2JvdHRvbScsXG4gICAgc2NhbGU6ICdzcGFjZScsXG4gICAgZGVmYXVsdFNjYWxlOiBkZWZhdWx0cy5zcGFjZVxuICB9LFxuICBsZWZ0OiB7XG4gICAgcHJvcGVydHk6ICdsZWZ0JyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH1cbn07XG5leHBvcnQgdmFyIHBvc2l0aW9uID0gc3lzdGVtKGNvbmZpZyk7XG5leHBvcnQgZGVmYXVsdCBwb3NpdGlvbjtcbiIsImltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2NvcmUnO1xuZXhwb3J0IHZhciBzaGFkb3cgPSBzeXN0ZW0oe1xuICBib3hTaGFkb3c6IHtcbiAgICBwcm9wZXJ0eTogJ2JveFNoYWRvdycsXG4gICAgc2NhbGU6ICdzaGFkb3dzJ1xuICB9LFxuICB0ZXh0U2hhZG93OiB7XG4gICAgcHJvcGVydHk6ICd0ZXh0U2hhZG93JyxcbiAgICBzY2FsZTogJ3NoYWRvd3MnXG4gIH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgc2hhZG93O1xuIiwiaW1wb3J0IG1lbW9pemUgZnJvbSAnQGVtb3Rpb24vbWVtb2l6ZSc7XG5pbXBvcnQgaXNQcm9wVmFsaWQgZnJvbSAnQGVtb3Rpb24vaXMtcHJvcC12YWxpZCc7XG5pbXBvcnQgeyBjb21wb3NlLCBzcGFjZSwgdHlwb2dyYXBoeSwgY29sb3IsIGxheW91dCwgZmxleGJveCwgYm9yZGVyLCBiYWNrZ3JvdW5kLCBwb3NpdGlvbiwgZ3JpZCwgc2hhZG93LCBidXR0b25TdHlsZSwgdGV4dFN0eWxlLCBjb2xvclN0eWxlIH0gZnJvbSAnc3R5bGVkLXN5c3RlbSc7XG52YXIgYWxsID0gY29tcG9zZShzcGFjZSwgdHlwb2dyYXBoeSwgY29sb3IsIGxheW91dCwgZmxleGJveCwgYm9yZGVyLCBiYWNrZ3JvdW5kLCBwb3NpdGlvbiwgZ3JpZCwgc2hhZG93LCBidXR0b25TdHlsZSwgdGV4dFN0eWxlLCBjb2xvclN0eWxlKTtcbmV4cG9ydCB2YXIgcHJvcHMgPSBhbGwucHJvcE5hbWVzO1xuZXhwb3J0IHZhciBjcmVhdGVTaG91bGRGb3J3YXJkUHJvcCA9IGZ1bmN0aW9uIGNyZWF0ZVNob3VsZEZvcndhcmRQcm9wKHByb3BzKSB7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJeKFwiICsgcHJvcHMuam9pbignfCcpICsgXCIpJFwiKTtcbiAgcmV0dXJuIG1lbW9pemUoZnVuY3Rpb24gKHByb3ApIHtcbiAgICByZXR1cm4gaXNQcm9wVmFsaWQocHJvcCkgJiYgIXJlZ2V4LnRlc3QocHJvcCk7XG4gIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNob3VsZEZvcndhcmRQcm9wKHByb3BzKTtcbiIsImltcG9ydCBtZW1vaXplIGZyb20gJ0BlbW90aW9uL21lbW9pemUnO1xuXG52YXIgcmVhY3RQcm9wc1JlZ2V4ID0gL14oKGNoaWxkcmVufGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MfGtleXxyZWZ8YXV0b0ZvY3VzfGRlZmF1bHRWYWx1ZXxkZWZhdWx0Q2hlY2tlZHxpbm5lckhUTUx8c3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nfHN1cHByZXNzSHlkcmF0aW9uV2FybmluZ3x2YWx1ZUxpbmt8YWNjZXB0fGFjY2VwdENoYXJzZXR8YWNjZXNzS2V5fGFjdGlvbnxhbGxvd3xhbGxvd1VzZXJNZWRpYXxhbGxvd1BheW1lbnRSZXF1ZXN0fGFsbG93RnVsbFNjcmVlbnxhbGxvd1RyYW5zcGFyZW5jeXxhbHR8YXN5bmN8YXV0b0NvbXBsZXRlfGF1dG9QbGF5fGNhcHR1cmV8Y2VsbFBhZGRpbmd8Y2VsbFNwYWNpbmd8Y2hhbGxlbmdlfGNoYXJTZXR8Y2hlY2tlZHxjaXRlfGNsYXNzSUR8Y2xhc3NOYW1lfGNvbHN8Y29sU3Bhbnxjb250ZW50fGNvbnRlbnRFZGl0YWJsZXxjb250ZXh0TWVudXxjb250cm9sc3xjb250cm9sc0xpc3R8Y29vcmRzfGNyb3NzT3JpZ2lufGRhdGF8ZGF0ZVRpbWV8ZGVjb2Rpbmd8ZGVmYXVsdHxkZWZlcnxkaXJ8ZGlzYWJsZWR8ZGlzYWJsZVBpY3R1cmVJblBpY3R1cmV8ZG93bmxvYWR8ZHJhZ2dhYmxlfGVuY1R5cGV8Zm9ybXxmb3JtQWN0aW9ufGZvcm1FbmNUeXBlfGZvcm1NZXRob2R8Zm9ybU5vVmFsaWRhdGV8Zm9ybVRhcmdldHxmcmFtZUJvcmRlcnxoZWFkZXJzfGhlaWdodHxoaWRkZW58aGlnaHxocmVmfGhyZWZMYW5nfGh0bWxGb3J8aHR0cEVxdWl2fGlkfGlucHV0TW9kZXxpbnRlZ3JpdHl8aXN8a2V5UGFyYW1zfGtleVR5cGV8a2luZHxsYWJlbHxsYW5nfGxpc3R8bG9hZGluZ3xsb29wfGxvd3xtYXJnaW5IZWlnaHR8bWFyZ2luV2lkdGh8bWF4fG1heExlbmd0aHxtZWRpYXxtZWRpYUdyb3VwfG1ldGhvZHxtaW58bWluTGVuZ3RofG11bHRpcGxlfG11dGVkfG5hbWV8bm9uY2V8bm9WYWxpZGF0ZXxvcGVufG9wdGltdW18cGF0dGVybnxwbGFjZWhvbGRlcnxwbGF5c0lubGluZXxwb3N0ZXJ8cHJlbG9hZHxwcm9maWxlfHJhZGlvR3JvdXB8cmVhZE9ubHl8cmVmZXJyZXJQb2xpY3l8cmVsfHJlcXVpcmVkfHJldmVyc2VkfHJvbGV8cm93c3xyb3dTcGFufHNhbmRib3h8c2NvcGV8c2NvcGVkfHNjcm9sbGluZ3xzZWFtbGVzc3xzZWxlY3RlZHxzaGFwZXxzaXplfHNpemVzfHNsb3R8c3BhbnxzcGVsbENoZWNrfHNyY3xzcmNEb2N8c3JjTGFuZ3xzcmNTZXR8c3RhcnR8c3RlcHxzdHlsZXxzdW1tYXJ5fHRhYkluZGV4fHRhcmdldHx0aXRsZXx0eXBlfHVzZU1hcHx2YWx1ZXx3aWR0aHx3bW9kZXx3cmFwfGFib3V0fGRhdGF0eXBlfGlubGlzdHxwcmVmaXh8cHJvcGVydHl8cmVzb3VyY2V8dHlwZW9mfHZvY2FifGF1dG9DYXBpdGFsaXplfGF1dG9Db3JyZWN0fGF1dG9TYXZlfGNvbG9yfGluZXJ0fGl0ZW1Qcm9wfGl0ZW1TY29wZXxpdGVtVHlwZXxpdGVtSUR8aXRlbVJlZnxvbnxyZXN1bHRzfHNlY3VyaXR5fHVuc2VsZWN0YWJsZXxhY2NlbnRIZWlnaHR8YWNjdW11bGF0ZXxhZGRpdGl2ZXxhbGlnbm1lbnRCYXNlbGluZXxhbGxvd1Jlb3JkZXJ8YWxwaGFiZXRpY3xhbXBsaXR1ZGV8YXJhYmljRm9ybXxhc2NlbnR8YXR0cmlidXRlTmFtZXxhdHRyaWJ1dGVUeXBlfGF1dG9SZXZlcnNlfGF6aW11dGh8YmFzZUZyZXF1ZW5jeXxiYXNlbGluZVNoaWZ0fGJhc2VQcm9maWxlfGJib3h8YmVnaW58Ymlhc3xieXxjYWxjTW9kZXxjYXBIZWlnaHR8Y2xpcHxjbGlwUGF0aFVuaXRzfGNsaXBQYXRofGNsaXBSdWxlfGNvbG9ySW50ZXJwb2xhdGlvbnxjb2xvckludGVycG9sYXRpb25GaWx0ZXJzfGNvbG9yUHJvZmlsZXxjb2xvclJlbmRlcmluZ3xjb250ZW50U2NyaXB0VHlwZXxjb250ZW50U3R5bGVUeXBlfGN1cnNvcnxjeHxjeXxkfGRlY2VsZXJhdGV8ZGVzY2VudHxkaWZmdXNlQ29uc3RhbnR8ZGlyZWN0aW9ufGRpc3BsYXl8ZGl2aXNvcnxkb21pbmFudEJhc2VsaW5lfGR1cnxkeHxkeXxlZGdlTW9kZXxlbGV2YXRpb258ZW5hYmxlQmFja2dyb3VuZHxlbmR8ZXhwb25lbnR8ZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZHxmaWxsfGZpbGxPcGFjaXR5fGZpbGxSdWxlfGZpbHRlcnxmaWx0ZXJSZXN8ZmlsdGVyVW5pdHN8Zmxvb2RDb2xvcnxmbG9vZE9wYWNpdHl8Zm9jdXNhYmxlfGZvbnRGYW1pbHl8Zm9udFNpemV8Zm9udFNpemVBZGp1c3R8Zm9udFN0cmV0Y2h8Zm9udFN0eWxlfGZvbnRWYXJpYW50fGZvbnRXZWlnaHR8Zm9ybWF0fGZyb218ZnJ8Znh8Znl8ZzF8ZzJ8Z2x5cGhOYW1lfGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsfGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbHxnbHlwaFJlZnxncmFkaWVudFRyYW5zZm9ybXxncmFkaWVudFVuaXRzfGhhbmdpbmd8aG9yaXpBZHZYfGhvcml6T3JpZ2luWHxpZGVvZ3JhcGhpY3xpbWFnZVJlbmRlcmluZ3xpbnxpbjJ8aW50ZXJjZXB0fGt8azF8azJ8azN8azR8a2VybmVsTWF0cml4fGtlcm5lbFVuaXRMZW5ndGh8a2VybmluZ3xrZXlQb2ludHN8a2V5U3BsaW5lc3xrZXlUaW1lc3xsZW5ndGhBZGp1c3R8bGV0dGVyU3BhY2luZ3xsaWdodGluZ0NvbG9yfGxpbWl0aW5nQ29uZUFuZ2xlfGxvY2FsfG1hcmtlckVuZHxtYXJrZXJNaWR8bWFya2VyU3RhcnR8bWFya2VySGVpZ2h0fG1hcmtlclVuaXRzfG1hcmtlcldpZHRofG1hc2t8bWFza0NvbnRlbnRVbml0c3xtYXNrVW5pdHN8bWF0aGVtYXRpY2FsfG1vZGV8bnVtT2N0YXZlc3xvZmZzZXR8b3BhY2l0eXxvcGVyYXRvcnxvcmRlcnxvcmllbnR8b3JpZW50YXRpb258b3JpZ2lufG92ZXJmbG93fG92ZXJsaW5lUG9zaXRpb258b3ZlcmxpbmVUaGlja25lc3N8cGFub3NlMXxwYWludE9yZGVyfHBhdGhMZW5ndGh8cGF0dGVybkNvbnRlbnRVbml0c3xwYXR0ZXJuVHJhbnNmb3JtfHBhdHRlcm5Vbml0c3xwb2ludGVyRXZlbnRzfHBvaW50c3xwb2ludHNBdFh8cG9pbnRzQXRZfHBvaW50c0F0WnxwcmVzZXJ2ZUFscGhhfHByZXNlcnZlQXNwZWN0UmF0aW98cHJpbWl0aXZlVW5pdHN8cnxyYWRpdXN8cmVmWHxyZWZZfHJlbmRlcmluZ0ludGVudHxyZXBlYXRDb3VudHxyZXBlYXREdXJ8cmVxdWlyZWRFeHRlbnNpb25zfHJlcXVpcmVkRmVhdHVyZXN8cmVzdGFydHxyZXN1bHR8cm90YXRlfHJ4fHJ5fHNjYWxlfHNlZWR8c2hhcGVSZW5kZXJpbmd8c2xvcGV8c3BhY2luZ3xzcGVjdWxhckNvbnN0YW50fHNwZWN1bGFyRXhwb25lbnR8c3BlZWR8c3ByZWFkTWV0aG9kfHN0YXJ0T2Zmc2V0fHN0ZERldmlhdGlvbnxzdGVtaHxzdGVtdnxzdGl0Y2hUaWxlc3xzdG9wQ29sb3J8c3RvcE9wYWNpdHl8c3RyaWtldGhyb3VnaFBvc2l0aW9ufHN0cmlrZXRocm91Z2hUaGlja25lc3N8c3RyaW5nfHN0cm9rZXxzdHJva2VEYXNoYXJyYXl8c3Ryb2tlRGFzaG9mZnNldHxzdHJva2VMaW5lY2FwfHN0cm9rZUxpbmVqb2lufHN0cm9rZU1pdGVybGltaXR8c3Ryb2tlT3BhY2l0eXxzdHJva2VXaWR0aHxzdXJmYWNlU2NhbGV8c3lzdGVtTGFuZ3VhZ2V8dGFibGVWYWx1ZXN8dGFyZ2V0WHx0YXJnZXRZfHRleHRBbmNob3J8dGV4dERlY29yYXRpb258dGV4dFJlbmRlcmluZ3x0ZXh0TGVuZ3RofHRvfHRyYW5zZm9ybXx1MXx1Mnx1bmRlcmxpbmVQb3NpdGlvbnx1bmRlcmxpbmVUaGlja25lc3N8dW5pY29kZXx1bmljb2RlQmlkaXx1bmljb2RlUmFuZ2V8dW5pdHNQZXJFbXx2QWxwaGFiZXRpY3x2SGFuZ2luZ3x2SWRlb2dyYXBoaWN8dk1hdGhlbWF0aWNhbHx2YWx1ZXN8dmVjdG9yRWZmZWN0fHZlcnNpb258dmVydEFkdll8dmVydE9yaWdpblh8dmVydE9yaWdpbll8dmlld0JveHx2aWV3VGFyZ2V0fHZpc2liaWxpdHl8d2lkdGhzfHdvcmRTcGFjaW5nfHdyaXRpbmdNb2RlfHh8eEhlaWdodHx4MXx4Mnx4Q2hhbm5lbFNlbGVjdG9yfHhsaW5rQWN0dWF0ZXx4bGlua0FyY3JvbGV8eGxpbmtIcmVmfHhsaW5rUm9sZXx4bGlua1Nob3d8eGxpbmtUaXRsZXx4bGlua1R5cGV8eG1sQmFzZXx4bWxuc3x4bWxuc1hsaW5rfHhtbExhbmd8eG1sU3BhY2V8eXx5MXx5Mnx5Q2hhbm5lbFNlbGVjdG9yfHp8em9vbUFuZFBhbnxmb3J8Y2xhc3N8YXV0b2ZvY3VzKXwoKFtEZF1bQWFdW1R0XVtBYV18W0FhXVtScl1bSWldW0FhXXx4KS0uKikpJC87IC8vIGh0dHBzOi8vZXNiZW5jaC5jb20vYmVuY2gvNWJmZWU2OGE0Y2Q3ZTYwMDllZjYxZDIzXG5cbnZhciBpbmRleCA9IG1lbW9pemUoZnVuY3Rpb24gKHByb3ApIHtcbiAgcmV0dXJuIHJlYWN0UHJvcHNSZWdleC50ZXN0KHByb3ApIHx8IHByb3AuY2hhckNvZGVBdCgwKSA9PT0gMTExXG4gIC8qIG8gKi9cbiAgJiYgcHJvcC5jaGFyQ29kZUF0KDEpID09PSAxMTBcbiAgLyogbiAqL1xuICAmJiBwcm9wLmNoYXJDb2RlQXQoMikgPCA5MTtcbn1cbi8qIForMSAqL1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCJmdW5jdGlvbiBtZW1vaXplKGZuKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgIGlmIChjYWNoZVthcmddID09PSB1bmRlZmluZWQpIGNhY2hlW2FyZ10gPSBmbihhcmcpO1xuICAgIHJldHVybiBjYWNoZVthcmddO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZW1vaXplO1xuIiwiaW1wb3J0IHsgZ2V0LCBzeXN0ZW0sIGNvbXBvc2UgfSBmcm9tICdAc3R5bGVkLXN5c3RlbS9jb3JlJztcbnZhciBkZWZhdWx0cyA9IHtcbiAgc3BhY2U6IFswLCA0LCA4LCAxNiwgMzIsIDY0LCAxMjgsIDI1NiwgNTEyXVxufTtcblxudmFyIGlzTnVtYmVyID0gZnVuY3Rpb24gaXNOdW1iZXIobikge1xuICByZXR1cm4gdHlwZW9mIG4gPT09ICdudW1iZXInICYmICFpc05hTihuKTtcbn07XG5cbnZhciBnZXRNYXJnaW4gPSBmdW5jdGlvbiBnZXRNYXJnaW4obiwgc2NhbGUpIHtcbiAgaWYgKCFpc051bWJlcihuKSkge1xuICAgIHJldHVybiBnZXQoc2NhbGUsIG4sIG4pO1xuICB9XG5cbiAgdmFyIGlzTmVnYXRpdmUgPSBuIDwgMDtcbiAgdmFyIGFic29sdXRlID0gTWF0aC5hYnMobik7XG4gIHZhciB2YWx1ZSA9IGdldChzY2FsZSwgYWJzb2x1dGUsIGFic29sdXRlKTtcblxuICBpZiAoIWlzTnVtYmVyKHZhbHVlKSkge1xuICAgIHJldHVybiBpc05lZ2F0aXZlID8gJy0nICsgdmFsdWUgOiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZSAqIChpc05lZ2F0aXZlID8gLTEgOiAxKTtcbn07XG5cbnZhciBjb25maWdzID0ge307XG5jb25maWdzLm1hcmdpbiA9IHtcbiAgbWFyZ2luOiB7XG4gICAgcHJvcGVydHk6ICdtYXJnaW4nLFxuICAgIHNjYWxlOiAnc3BhY2UnLFxuICAgIHRyYW5zZm9ybTogZ2V0TWFyZ2luLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuc3BhY2VcbiAgfSxcbiAgbWFyZ2luVG9wOiB7XG4gICAgcHJvcGVydHk6ICdtYXJnaW5Ub3AnLFxuICAgIHNjYWxlOiAnc3BhY2UnLFxuICAgIHRyYW5zZm9ybTogZ2V0TWFyZ2luLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuc3BhY2VcbiAgfSxcbiAgbWFyZ2luUmlnaHQ6IHtcbiAgICBwcm9wZXJ0eTogJ21hcmdpblJpZ2h0JyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICB0cmFuc2Zvcm06IGdldE1hcmdpbixcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIG1hcmdpbkJvdHRvbToge1xuICAgIHByb3BlcnR5OiAnbWFyZ2luQm90dG9tJyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICB0cmFuc2Zvcm06IGdldE1hcmdpbixcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIG1hcmdpbkxlZnQ6IHtcbiAgICBwcm9wZXJ0eTogJ21hcmdpbkxlZnQnLFxuICAgIHNjYWxlOiAnc3BhY2UnLFxuICAgIHRyYW5zZm9ybTogZ2V0TWFyZ2luLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuc3BhY2VcbiAgfSxcbiAgbWFyZ2luWDoge1xuICAgIHByb3BlcnRpZXM6IFsnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddLFxuICAgIHNjYWxlOiAnc3BhY2UnLFxuICAgIHRyYW5zZm9ybTogZ2V0TWFyZ2luLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuc3BhY2VcbiAgfSxcbiAgbWFyZ2luWToge1xuICAgIHByb3BlcnRpZXM6IFsnbWFyZ2luVG9wJywgJ21hcmdpbkJvdHRvbSddLFxuICAgIHNjYWxlOiAnc3BhY2UnLFxuICAgIHRyYW5zZm9ybTogZ2V0TWFyZ2luLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuc3BhY2VcbiAgfVxufTtcbmNvbmZpZ3MubWFyZ2luLm0gPSBjb25maWdzLm1hcmdpbi5tYXJnaW47XG5jb25maWdzLm1hcmdpbi5tdCA9IGNvbmZpZ3MubWFyZ2luLm1hcmdpblRvcDtcbmNvbmZpZ3MubWFyZ2luLm1yID0gY29uZmlncy5tYXJnaW4ubWFyZ2luUmlnaHQ7XG5jb25maWdzLm1hcmdpbi5tYiA9IGNvbmZpZ3MubWFyZ2luLm1hcmdpbkJvdHRvbTtcbmNvbmZpZ3MubWFyZ2luLm1sID0gY29uZmlncy5tYXJnaW4ubWFyZ2luTGVmdDtcbmNvbmZpZ3MubWFyZ2luLm14ID0gY29uZmlncy5tYXJnaW4ubWFyZ2luWDtcbmNvbmZpZ3MubWFyZ2luLm15ID0gY29uZmlncy5tYXJnaW4ubWFyZ2luWTtcbmNvbmZpZ3MucGFkZGluZyA9IHtcbiAgcGFkZGluZzoge1xuICAgIHByb3BlcnR5OiAncGFkZGluZycsXG4gICAgc2NhbGU6ICdzcGFjZScsXG4gICAgZGVmYXVsdFNjYWxlOiBkZWZhdWx0cy5zcGFjZVxuICB9LFxuICBwYWRkaW5nVG9wOiB7XG4gICAgcHJvcGVydHk6ICdwYWRkaW5nVG9wJyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIHBhZGRpbmdSaWdodDoge1xuICAgIHByb3BlcnR5OiAncGFkZGluZ1JpZ2h0JyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIHBhZGRpbmdCb3R0b206IHtcbiAgICBwcm9wZXJ0eTogJ3BhZGRpbmdCb3R0b20nLFxuICAgIHNjYWxlOiAnc3BhY2UnLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuc3BhY2VcbiAgfSxcbiAgcGFkZGluZ0xlZnQ6IHtcbiAgICBwcm9wZXJ0eTogJ3BhZGRpbmdMZWZ0JyxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIHBhZGRpbmdYOiB7XG4gICAgcHJvcGVydGllczogWydwYWRkaW5nTGVmdCcsICdwYWRkaW5nUmlnaHQnXSxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH0sXG4gIHBhZGRpbmdZOiB7XG4gICAgcHJvcGVydGllczogWydwYWRkaW5nVG9wJywgJ3BhZGRpbmdCb3R0b20nXSxcbiAgICBzY2FsZTogJ3NwYWNlJyxcbiAgICBkZWZhdWx0U2NhbGU6IGRlZmF1bHRzLnNwYWNlXG4gIH1cbn07XG5jb25maWdzLnBhZGRpbmcucCA9IGNvbmZpZ3MucGFkZGluZy5wYWRkaW5nO1xuY29uZmlncy5wYWRkaW5nLnB0ID0gY29uZmlncy5wYWRkaW5nLnBhZGRpbmdUb3A7XG5jb25maWdzLnBhZGRpbmcucHIgPSBjb25maWdzLnBhZGRpbmcucGFkZGluZ1JpZ2h0O1xuY29uZmlncy5wYWRkaW5nLnBiID0gY29uZmlncy5wYWRkaW5nLnBhZGRpbmdCb3R0b207XG5jb25maWdzLnBhZGRpbmcucGwgPSBjb25maWdzLnBhZGRpbmcucGFkZGluZ0xlZnQ7XG5jb25maWdzLnBhZGRpbmcucHggPSBjb25maWdzLnBhZGRpbmcucGFkZGluZ1g7XG5jb25maWdzLnBhZGRpbmcucHkgPSBjb25maWdzLnBhZGRpbmcucGFkZGluZ1k7XG5leHBvcnQgdmFyIG1hcmdpbiA9IHN5c3RlbShjb25maWdzLm1hcmdpbik7XG5leHBvcnQgdmFyIHBhZGRpbmcgPSBzeXN0ZW0oY29uZmlncy5wYWRkaW5nKTtcbmV4cG9ydCB2YXIgc3BhY2UgPSBjb21wb3NlKG1hcmdpbiwgcGFkZGluZyk7XG5leHBvcnQgZGVmYXVsdCBzcGFjZTtcbiIsImltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2NvcmUnO1xudmFyIGRlZmF1bHRzID0ge1xuICBmb250U2l6ZXM6IFsxMiwgMTQsIDE2LCAyMCwgMjQsIDMyLCA0OCwgNjQsIDcyXVxufTtcbnZhciBjb25maWcgPSB7XG4gIGZvbnRGYW1pbHk6IHtcbiAgICBwcm9wZXJ0eTogJ2ZvbnRGYW1pbHknLFxuICAgIHNjYWxlOiAnZm9udHMnXG4gIH0sXG4gIGZvbnRTaXplOiB7XG4gICAgcHJvcGVydHk6ICdmb250U2l6ZScsXG4gICAgc2NhbGU6ICdmb250U2l6ZXMnLFxuICAgIGRlZmF1bHRTY2FsZTogZGVmYXVsdHMuZm9udFNpemVzXG4gIH0sXG4gIGZvbnRXZWlnaHQ6IHtcbiAgICBwcm9wZXJ0eTogJ2ZvbnRXZWlnaHQnLFxuICAgIHNjYWxlOiAnZm9udFdlaWdodHMnXG4gIH0sXG4gIGxpbmVIZWlnaHQ6IHtcbiAgICBwcm9wZXJ0eTogJ2xpbmVIZWlnaHQnLFxuICAgIHNjYWxlOiAnbGluZUhlaWdodHMnXG4gIH0sXG4gIGxldHRlclNwYWNpbmc6IHtcbiAgICBwcm9wZXJ0eTogJ2xldHRlclNwYWNpbmcnLFxuICAgIHNjYWxlOiAnbGV0dGVyU3BhY2luZ3MnXG4gIH0sXG4gIHRleHRBbGlnbjogdHJ1ZSxcbiAgZm9udFN0eWxlOiB0cnVlXG59O1xuZXhwb3J0IHZhciB0eXBvZ3JhcGh5ID0gc3lzdGVtKGNvbmZpZyk7XG5leHBvcnQgZGVmYXVsdCB0eXBvZ3JhcGh5O1xuIiwiaW1wb3J0IHsgZ2V0LCBjcmVhdGVQYXJzZXIgfSBmcm9tICdAc3R5bGVkLXN5c3RlbS9jb3JlJztcbmltcG9ydCBjc3MgZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY3NzJztcbmV4cG9ydCB2YXIgdmFyaWFudCA9IGZ1bmN0aW9uIHZhcmlhbnQoX3JlZikge1xuICB2YXIgX2NvbmZpZztcblxuICB2YXIgc2NhbGUgPSBfcmVmLnNjYWxlLFxuICAgICAgX3JlZiRwcm9wID0gX3JlZi5wcm9wLFxuICAgICAgcHJvcCA9IF9yZWYkcHJvcCA9PT0gdm9pZCAwID8gJ3ZhcmlhbnQnIDogX3JlZiRwcm9wLFxuICAgICAgX3JlZiR2YXJpYW50cyA9IF9yZWYudmFyaWFudHMsXG4gICAgICB2YXJpYW50cyA9IF9yZWYkdmFyaWFudHMgPT09IHZvaWQgMCA/IHt9IDogX3JlZiR2YXJpYW50cyxcbiAgICAgIGtleSA9IF9yZWYua2V5O1xuICB2YXIgc3g7XG5cbiAgaWYgKE9iamVjdC5rZXlzKHZhcmlhbnRzKS5sZW5ndGgpIHtcbiAgICBzeCA9IGZ1bmN0aW9uIHN4KHZhbHVlLCBzY2FsZSwgcHJvcHMpIHtcbiAgICAgIHJldHVybiBjc3MoZ2V0KHNjYWxlLCB2YWx1ZSwgbnVsbCkpKHByb3BzLnRoZW1lKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHN4ID0gZnVuY3Rpb24gc3godmFsdWUsIHNjYWxlKSB7XG4gICAgICByZXR1cm4gZ2V0KHNjYWxlLCB2YWx1ZSwgbnVsbCk7XG4gICAgfTtcbiAgfVxuXG4gIHN4LnNjYWxlID0gc2NhbGUgfHwga2V5O1xuICBzeC5kZWZhdWx0cyA9IHZhcmlhbnRzO1xuICB2YXIgY29uZmlnID0gKF9jb25maWcgPSB7fSwgX2NvbmZpZ1twcm9wXSA9IHN4LCBfY29uZmlnKTtcbiAgdmFyIHBhcnNlciA9IGNyZWF0ZVBhcnNlcihjb25maWcpO1xuICByZXR1cm4gcGFyc2VyO1xufTtcbmV4cG9ydCBkZWZhdWx0IHZhcmlhbnQ7XG5leHBvcnQgdmFyIGJ1dHRvblN0eWxlID0gdmFyaWFudCh7XG4gIGtleTogJ2J1dHRvbnMnXG59KTtcbmV4cG9ydCB2YXIgdGV4dFN0eWxlID0gdmFyaWFudCh7XG4gIGtleTogJ3RleHRTdHlsZXMnLFxuICBwcm9wOiAndGV4dFN0eWxlJ1xufSk7XG5leHBvcnQgdmFyIGNvbG9yU3R5bGUgPSB2YXJpYW50KHtcbiAga2V5OiAnY29sb3JTdHlsZXMnLFxuICBwcm9wOiAnY29sb3JzJ1xufSk7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbywgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVRoZW1lVUksIGpzeCwgX19UaGVtZVVJSW50ZXJuYWxCYXNlVGhlbWVQcm92aWRlciB9IGZyb20gJ0B0aGVtZS11aS9jb3JlJztcbmltcG9ydCB7IGNzcywgZ2V0IH0gZnJvbSAnQHRoZW1lLXVpL2Nzcyc7XG5pbXBvcnQgeyBHbG9iYWwgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IHRvVmFyTmFtZSA9IGtleSA9PiBgLS10aGVtZS11aS0ke2tleS5yZXBsYWNlKCctX19kZWZhdWx0JywgJycpfWA7XG5cbmNvbnN0IHRvVmFyVmFsdWUgPSBrZXkgPT4gYHZhcigke3RvVmFyTmFtZShrZXkpfSlgO1xuXG5jb25zdCBqb2luID0gKC4uLmFyZ3MpID0+IGFyZ3MuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJy0nKTtcbmNvbnN0IHJlc2VydmVkS2V5cyA9IHtcbiAgdXNlQ3VzdG9tUHJvcGVydGllczogdHJ1ZSxcbiAgaW5pdGlhbENvbG9yTW9kZU5hbWU6IHRydWUsXG4gIHByaW50Q29sb3JNb2RlTmFtZTogdHJ1ZSxcbiAgaW5pdGlhbENvbG9yTW9kZTogdHJ1ZSxcbiAgdXNlTG9jYWxTdG9yYWdlOiB0cnVlXG59O1xuXG5cbmNvbnN0IHRvQ3VzdG9tUHJvcGVydGllcyA9IChvYmosIHBhcmVudCwgdGhlbWVLZXkpID0+IHtcbiAgY29uc3QgbmV4dCA9IEFycmF5LmlzQXJyYXkob2JqKSA/IFtdIDoge307XG5cbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG4gICAgY29uc3QgbmFtZSA9IGpvaW4ocGFyZW50LCBrZXkpO1xuXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG5leHRba2V5XSA9IHRvQ3VzdG9tUHJvcGVydGllcyh2YWx1ZSwgbmFtZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAocmVzZXJ2ZWRLZXlzW2tleV0pIHtcbiAgICAgIG5leHRba2V5XSA9IHZhbHVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIG5leHRba2V5XSA9IHRvVmFyVmFsdWUobmFtZSk7XG4gIH1cblxuICByZXR1cm4gbmV4dDtcbn07XG5jb25zdCBvYmplY3RUb1ZhcnMgPSAocGFyZW50LCBvYmopID0+IHtcbiAgbGV0IHZhcnMgPSB7fTtcblxuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGtleSA9PT0gJ21vZGVzJykgY29udGludWU7XG4gICAgY29uc3QgbmFtZSA9IGpvaW4ocGFyZW50LCBrZXkpO1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG5cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFycyA9IHsgLi4udmFycyxcbiAgICAgICAgLi4ub2JqZWN0VG9WYXJzKG5hbWUsIHZhbHVlKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyc1t0b1Zhck5hbWUobmFtZSldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhcnM7XG59OyAvLyBjcmVhdGUgcm9vdCBzdHlsZXMgZm9yIGNvbG9yIG1vZGVzXG5cbmNvbnN0IGNyZWF0ZUNvbG9yU3R5bGVzID0gKHRoZW1lID0ge30pID0+IHtcbiAgY29uc3Qge1xuICAgIHVzZUN1c3RvbVByb3BlcnRpZXMsXG4gICAgaW5pdGlhbENvbG9yTW9kZU5hbWUsXG4gICAgcHJpbnRDb2xvck1vZGVOYW1lLFxuICAgIHVzZVJvb3RTdHlsZXNcbiAgfSA9IHRoZW1lLmNvbmZpZyB8fCB0aGVtZSB8fCB7fTtcbiAgY29uc3QgY29sb3JzID0gdGhlbWUucmF3Q29sb3JzIHx8IHRoZW1lLmNvbG9ycztcbiAgaWYgKCFjb2xvcnMgfHwgdXNlUm9vdFN0eWxlcyA9PT0gZmFsc2UpIHJldHVybiB7fTtcblxuICBpZiAodXNlQ3VzdG9tUHJvcGVydGllcyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gY3NzKHtcbiAgICAgIGh0bWw6IHtcbiAgICAgICAgY29sb3I6ICd0ZXh0JyxcbiAgICAgICAgYmc6ICdiYWNrZ3JvdW5kJ1xuICAgICAgfVxuICAgIH0pKHRoZW1lKTtcbiAgfVxuXG4gIGNvbnN0IG1vZGVzID0gY29sb3JzLm1vZGVzIHx8IHt9O1xuICBjb25zdCBzdHlsZXMgPSBvYmplY3RUb1ZhcnMoJ2NvbG9ycycsIGNvbG9ycyk7XG4gIE9iamVjdC5rZXlzKG1vZGVzKS5mb3JFYWNoKG1vZGUgPT4ge1xuICAgIGNvbnN0IGtleSA9IGAmLnRoZW1lLXVpLSR7bW9kZX1gO1xuICAgIHN0eWxlc1trZXldID0gb2JqZWN0VG9WYXJzKCdjb2xvcnMnLCBtb2Rlc1ttb2RlXSk7XG4gIH0pO1xuXG4gIGlmIChwcmludENvbG9yTW9kZU5hbWUpIHtcbiAgICBjb25zdCBtb2RlID0gcHJpbnRDb2xvck1vZGVOYW1lID09PSAnaW5pdGlhbCcgfHwgcHJpbnRDb2xvck1vZGVOYW1lID09PSBpbml0aWFsQ29sb3JNb2RlTmFtZSA/IGNvbG9ycyA6IG1vZGVzW3ByaW50Q29sb3JNb2RlTmFtZV07XG4gICAgc3R5bGVzWydAbWVkaWEgcHJpbnQnXSA9IG9iamVjdFRvVmFycygnY29sb3JzJywgbW9kZSk7XG4gIH1cblxuICBjb25zdCBjb2xvclRvVmFyVmFsdWUgPSBjb2xvciA9PiB0b1ZhclZhbHVlKGBjb2xvcnMtJHtjb2xvcn1gKTtcblxuICByZXR1cm4gY3NzKHtcbiAgICBodG1sOiB7IC4uLnN0eWxlcyxcbiAgICAgIGNvbG9yOiBjb2xvclRvVmFyVmFsdWUoJ3RleHQnKSxcbiAgICAgIGJnOiBjb2xvclRvVmFyVmFsdWUoJ2JhY2tncm91bmQnKVxuICAgIH1cbiAgfSkodGhlbWUpO1xufTtcblxuY29uc3QgU1RPUkFHRV9LRVkgPSAndGhlbWUtdWktY29sb3ItbW9kZSc7XG5jb25zdCBzdG9yYWdlID0ge1xuICBnZXQ6ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQgYW5kIGNvbG9yIG1vZGUgbWlnaHQgbm90IHdvcmsgYXMgZXhwZWN0ZWQuJywgJ1BsZWFzZSBjaGVjayB5b3VyIFNpdGUgU2V0dGluZ3MuJywgZSk7XG4gICAgfVxuICB9LFxuICBzZXQ6IHZhbHVlID0+IHtcbiAgICB0cnkge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCB2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQgYW5kIGNvbG9yIG1vZGUgbWlnaHQgbm90IHdvcmsgYXMgZXhwZWN0ZWQuJywgJ1BsZWFzZSBjaGVjayB5b3VyIFNpdGUgU2V0dGluZ3MuJywgZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBnZXRQcmVmZXJyZWRDb2xvclNjaGVtZSA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tYXRjaE1lZGlhKSB7XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcykge1xuICAgICAgcmV0dXJuICdkYXJrJztcbiAgICB9XG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykge1xuICAgICAgcmV0dXJuICdsaWdodCc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBnZXRNb2RlRnJvbUNsYXNzID0gKCkgPT4ge1xuICBsZXQgbW9kZTtcblxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgaWYgKGNsYXNzTmFtZS5zdGFydHNXaXRoKCd0aGVtZS11aS0nKSkge1xuICAgICAgICBtb2RlID0gY2xhc3NOYW1lLnJlcGxhY2UoJ3RoZW1lLXVpLScsICcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBtb2RlO1xufTtcblxuY29uc3QgdXNlQ29sb3JNb2RlU3RhdGUgPSAodGhlbWUgPSB7fSkgPT4ge1xuICBjb25zdCB7XG4gICAgaW5pdGlhbENvbG9yTW9kZU5hbWUsXG4gICAgdXNlQ29sb3JTY2hlbWVNZWRpYVF1ZXJ5LFxuICAgIHVzZUxvY2FsU3RvcmFnZVxuICB9ID0gdGhlbWUuY29uZmlnIHx8IHRoZW1lO1xuICBsZXQgW21vZGUsIHNldE1vZGVdID0gdXNlU3RhdGUoKCkgPT4ge1xuICAgIGNvbnN0IG1vZGVGcm9tQ2xhc3MgPSBnZXRNb2RlRnJvbUNsYXNzKCk7XG5cbiAgICBpZiAobW9kZUZyb21DbGFzcykge1xuICAgICAgcmV0dXJuIG1vZGVGcm9tQ2xhc3M7XG4gICAgfVxuXG4gICAgY29uc3QgcHJlZmVycmVkTW9kZSA9IHVzZUNvbG9yU2NoZW1lTWVkaWFRdWVyeSAhPT0gZmFsc2UgJiYgZ2V0UHJlZmVycmVkQ29sb3JTY2hlbWUoKTtcbiAgICByZXR1cm4gcHJlZmVycmVkTW9kZSB8fCBpbml0aWFsQ29sb3JNb2RlTmFtZTtcbiAgfSk7IC8vIG9uIGZpcnN0IHJlbmRlciwgd2UgcmVhZCB0aGUgY29sb3IgbW9kZSBmcm9tIGxvY2FsU3RvcmFnZSBhbmRcbiAgLy8gY2xlYXIgdGhlIGNsYXNzIG9uIGRvY3VtZW50IGVsZW1lbnQgYm9keVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc3RvcmVkID0gdXNlTG9jYWxTdG9yYWdlICE9PSBmYWxzZSAmJiBzdG9yYWdlLmdldCgpO1xuXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0aGVtZS11aS0nICsgc3RvcmVkKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgndGhlbWUtdWktJyArIHN0b3JlZCk7XG4gICAgfVxuXG4gICAgaWYgKHN0b3JlZCAmJiBzdG9yZWQgIT09IG1vZGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgICAgIG1vZGUgPSBzdG9yZWQ7XG4gICAgICBzZXRNb2RlKHN0b3JlZCk7XG4gICAgfVxuICB9LCBbXSk7IC8vIHdoZW4gbW9kZSBjaGFuZ2VzLCB3ZSBzYXZlIGl0IHRvIGxvY2FsU3RvcmFnZVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG1vZGUgJiYgdXNlTG9jYWxTdG9yYWdlICE9PSBmYWxzZSkge1xuICAgICAgc3RvcmFnZS5zZXQobW9kZSk7XG4gICAgfVxuICB9LCBbbW9kZSwgdXNlTG9jYWxTdG9yYWdlXSk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgX3RoZW1lJGNvbG9ycztcblxuICAgIGlmICgoX3RoZW1lJGNvbG9ycyA9IHRoZW1lLmNvbG9ycykgIT0gbnVsbCAmJiBfdGhlbWUkY29sb3JzLm1vZGVzICYmIGluaXRpYWxDb2xvck1vZGVOYW1lICYmIE9iamVjdC5rZXlzKHRoZW1lLmNvbG9ycy5tb2RlcykuaW5kZXhPZihpbml0aWFsQ29sb3JNb2RlTmFtZSkgPiAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdbdGhlbWUtdWldIFRoZSBgaW5pdGlhbENvbG9yTW9kZU5hbWVgIHZhbHVlIHNob3VsZCBiZSBhIHVuaXF1ZSBuYW1lJyArICcgYW5kIGNhbm5vdCByZWZlcmVuY2UgYSBrZXkgaW4gYHRoZW1lLmNvbG9ycy5tb2Rlc2AuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFttb2RlLCBzZXRNb2RlXTtcbn07XG5cbmZ1bmN0aW9uIHVzZUNvbG9yTW9kZSgpIHtcbiAgY29uc3Qge1xuICAgIGNvbG9yTW9kZSxcbiAgICBzZXRDb2xvck1vZGVcbiAgfSA9IHVzZVRoZW1lVUkoKTtcblxuICBpZiAodHlwZW9mIHNldENvbG9yTW9kZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgW3VzZUNvbG9yTW9kZV0gcmVxdWlyZXMgdGhlIENvbG9yTW9kZVByb3ZpZGVyIGNvbXBvbmVudGApO1xuICB9IC8vIFdlJ3JlIGFsbG93aW5nIHRoZSB1c2VyIHRvIHNwZWNpZnkgYSBuYXJyb3dlciB0eXBlIGZvciBpdHMgY29sb3IgbW9kZSBuYW1lLlxuXG5cbiAgcmV0dXJuIFtjb2xvck1vZGUsIHNldENvbG9yTW9kZV07XG59XG5cbmNvbnN0IG9taXRNb2RlcyA9IGNvbG9ycyA9PiB7XG4gIGNvbnN0IHJlcyA9IHsgLi4uY29sb3JzXG4gIH07XG4gIGRlbGV0ZSByZXMubW9kZXM7XG4gIHJldHVybiByZXM7XG59O1xuXG5mdW5jdGlvbiBjb3B5UmF3Q29sb3JzKGNvbG9ycywgb3V0ZXJUaGVtZVJhd0NvbG9ycykge1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2xvcnMpKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgIXZhbHVlLnN0YXJ0c1dpdGgoJ3ZhcignKSkge1xuICAgICAgb3V0ZXJUaGVtZVJhd0NvbG9yc1trZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG91dGVyVGhlbWVSYXdDb2xvcnNba2V5XSA9IHsgLi4ub3V0ZXJUaGVtZVJhd0NvbG9yc1trZXldLFxuICAgICAgICAuLi5jb3B5UmF3Q29sb3JzKHZhbHVlLCB7fSlcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dGVyVGhlbWVSYXdDb2xvcnM7XG59XG5cbmNvbnN0IENvbG9yTW9kZVByb3ZpZGVyID0gKHtcbiAgY2hpbGRyZW5cbn0pID0+IHtcbiAgY29uc3Qgb3V0ZXIgPSB1c2VUaGVtZVVJKCk7XG4gIGNvbnN0IG91dGVyVGhlbWUgPSBvdXRlci50aGVtZTtcbiAgY29uc3QgW2NvbG9yTW9kZSwgc2V0Q29sb3JNb2RlXSA9IHVzZUNvbG9yTW9kZVN0YXRlKG91dGVyVGhlbWUpO1xuICBjb25zdCB0aGVtZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHJlcyA9IHsgLi4ub3V0ZXJUaGVtZVxuICAgIH07XG4gICAgY29uc3QgbW9kZXMgPSBnZXQocmVzLCAnY29sb3JzLm1vZGVzJywge30pO1xuICAgIGNvbnN0IGN1cnJlbnRDb2xvck1vZGUgPSBnZXQobW9kZXMsIGNvbG9yTW9kZSwge30pO1xuXG4gICAgaWYgKGNvbG9yTW9kZSkge1xuICAgICAgcmVzLmNvbG9ycyA9IHsgLi4ucmVzLmNvbG9ycyxcbiAgICAgICAgLi4uY3VycmVudENvbG9yTW9kZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICB1c2VDdXN0b21Qcm9wZXJ0aWVzLFxuICAgICAgaW5pdGlhbENvbG9yTW9kZU5hbWUgPSAnX19kZWZhdWx0J1xuICAgIH0gPSBvdXRlclRoZW1lLmNvbmZpZyB8fCBvdXRlclRoZW1lO1xuICAgIGxldCBvdXRlclRoZW1lUmF3Q29sb3JzID0gb3V0ZXJUaGVtZS5yYXdDb2xvcnMgfHwgb3V0ZXJUaGVtZS5jb2xvcnMgfHwge307XG5cbiAgICBpZiAodXNlQ3VzdG9tUHJvcGVydGllcyAhPT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGFscmVhZHlIYXNSYXdDb2xvcnMgPSByZXMucmF3Q29sb3JzICE9IG51bGw7XG4gICAgICBjb25zdCBjb2xvcnMgPSByZXMuY29sb3JzIHx8IHt9O1xuXG4gICAgICBpZiAoYWxyZWFkeUhhc1Jhd0NvbG9ycykge1xuICAgICAgICBvdXRlclRoZW1lUmF3Q29sb3JzID0geyAuLi5vdXRlclRoZW1lUmF3Q29sb3JzXG4gICAgICAgIH07XG4gICAgICAgIGNvcHlSYXdDb2xvcnMoY29sb3JzLCBvdXRlclRoZW1lUmF3Q29sb3JzKTtcblxuICAgICAgICBpZiAoJ21vZGVzJyBpbiBvdXRlclRoZW1lUmF3Q29sb3JzKSB7XG4gICAgICAgICAgdmFyIF9yZXMkcmF3Q29sb3JzO1xuXG4gICAgICAgICAgcmVzLnJhd0NvbG9ycyA9IHsgLi4ub3V0ZXJUaGVtZVJhd0NvbG9ycyxcbiAgICAgICAgICAgIG1vZGVzOiB7IC4uLigoX3JlcyRyYXdDb2xvcnMgPSByZXMucmF3Q29sb3JzKSA9PSBudWxsID8gdm9pZCAwIDogX3JlcyRyYXdDb2xvcnMubW9kZXMpLFxuICAgICAgICAgICAgICBbaW5pdGlhbENvbG9yTW9kZU5hbWVdOiBvbWl0TW9kZXMob3V0ZXJUaGVtZVJhd0NvbG9ycylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcy5yYXdDb2xvcnMgPSBvdXRlclRoZW1lUmF3Q29sb3JzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoISgnbW9kZXMnIGluIG91dGVyVGhlbWVSYXdDb2xvcnMpKSB7XG4gICAgICAgICAgcmVzLnJhd0NvbG9ycyA9IGNvbG9ycztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBtb2RlcyA9IHtcbiAgICAgICAgICAgIFtpbml0aWFsQ29sb3JNb2RlTmFtZV06IG9taXRNb2RlcyhvdXRlclRoZW1lUmF3Q29sb3JzKSxcbiAgICAgICAgICAgIC4uLm91dGVyVGhlbWVSYXdDb2xvcnMubW9kZXNcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcy5yYXdDb2xvcnMgPSB7IC4uLmNvbG9ycyxcbiAgICAgICAgICAgIG1vZGVzXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvKiBtb2RlcyBkb2Vzbid0IG1hdGNoIGluZGV4IHNpZ25hdHVyZSBieSBkZXNpZ24gKi9cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXMuY29sb3JzID0gdG9DdXN0b21Qcm9wZXJ0aWVzKG9taXRNb2RlcyhvdXRlclRoZW1lUmF3Q29sb3JzKSwgJ2NvbG9ycycpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH0sIFtjb2xvck1vZGUsIG91dGVyVGhlbWVdKTtcbiAgY29uc3QgY29udGV4dCA9IHsgLi4ub3V0ZXIsXG4gICAgdGhlbWUsXG4gICAgY29sb3JNb2RlLFxuICAgIHNldENvbG9yTW9kZVxuICB9O1xuICBjb25zdCBpc1RvcExldmVsQ29sb3JNb2RlUHJvdmlkZXIgPSBvdXRlci5zZXRDb2xvck1vZGUgPT09IHVuZGVmaW5lZDtcbiAgcmV0dXJuIGpzeChfX1RoZW1lVUlJbnRlcm5hbEJhc2VUaGVtZVByb3ZpZGVyLCB7XG4gICAgY29udGV4dFxuICB9LCBpc1RvcExldmVsQ29sb3JNb2RlUHJvdmlkZXIgPyBqc3goR2xvYmFsLCB7XG4gICAgc3R5bGVzOiAoKSA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlQ29sb3JTdHlsZXModGhlbWUpO1xuICAgIH1cbiAgfSkgOiBqc3goJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd0aGVtZS11aV9fbmVzdGVkLWNvbG9yLW1vZGUtcHJvdmlkZXInLFxuICAgIHN0eWxlOiBjcmVhdGVDb2xvclN0eWxlcyh0aGVtZSlbJ2h0bWwnXVxuICB9KSwgY2hpbGRyZW4pO1xufTtcbmNvbnN0IG5vZmxhc2ggPSBgKGZ1bmN0aW9uKCkgeyB0cnkge1xuICB2YXIgbW9kZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZS11aS1jb2xvci1tb2RlJyk7XG4gIGlmICghbW9kZSkgcmV0dXJuXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0aGVtZS11aS0nICsgbW9kZSk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgndGhlbWUtdWktJyArIG1vZGUpO1xufSBjYXRjaCAoZSkge30gfSkoKTtgO1xuY29uc3QgSW5pdGlhbGl6ZUNvbG9yTW9kZSA9ICgpID0+IGpzeCgnc2NyaXB0Jywge1xuICBrZXk6ICd0aGVtZS11aS1uby1mbGFzaCcsXG4gIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgX19odG1sOiBub2ZsYXNoXG4gIH1cbn0pO1xuXG5leHBvcnQgeyBDb2xvck1vZGVQcm92aWRlciwgSW5pdGlhbGl6ZUNvbG9yTW9kZSwgdXNlQ29sb3JNb2RlIH07XG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjc3MsIGdldCB9IGZyb20gJ0B0aGVtZS11aS9jc3MnO1xuaW1wb3J0IHsgY3JlYXRlU2hvdWxkRm9yd2FyZFByb3AgfSBmcm9tICdAc3R5bGVkLXN5c3RlbS9zaG91bGQtZm9yd2FyZC1wcm9wJztcbmltcG9ydCBzcGFjZSBmcm9tICdAc3R5bGVkLXN5c3RlbS9zcGFjZSc7XG5pbXBvcnQgY29sb3IgZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29sb3InO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuY29uc3QgYm94U3lzdGVtUHJvcHMgPSBbLi4uc3BhY2UucHJvcE5hbWVzLCAuLi5jb2xvci5wcm9wTmFtZXNdO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqIEB0eXBlIHsocHJvcDogc3RyaW5nKSA9PiBib29sZWFufVxuICovXG5cbmNvbnN0IF9faXNCb3hTdHlsZWRTeXN0ZW1Qcm9wID0gcHJvcCA9PiBib3hTeXN0ZW1Qcm9wcy5pbmNsdWRlcyhwcm9wKTtcbmNvbnN0IHNob3VsZEZvcndhcmRQcm9wID0gY3JlYXRlU2hvdWxkRm9yd2FyZFByb3AoYm94U3lzdGVtUHJvcHMpO1xuXG5jb25zdCBzeCA9IHByb3BzID0+IGNzcyhwcm9wcy5zeCkocHJvcHMudGhlbWUpO1xuXG5jb25zdCBiYXNlID0gcHJvcHMgPT4gY3NzKHByb3BzLl9fY3NzKShwcm9wcy50aGVtZSk7XG5cbmNvbnN0IHZhcmlhbnQgPSAoe1xuICB0aGVtZSxcbiAgdmFyaWFudCxcbiAgX190aGVtZUtleSA9ICd2YXJpYW50cydcbn0pID0+IGNzcyhnZXQodGhlbWUsIF9fdGhlbWVLZXkgKyAnLicgKyB2YXJpYW50LCBnZXQodGhlbWUsIHZhcmlhbnQpKSk7XG5cbmNvbnN0IEJveCA9IHN0eWxlZCgnZGl2Jywge1xuICBzaG91bGRGb3J3YXJkUHJvcFxufSkoe1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgbWFyZ2luOiAwLFxuICBtaW5XaWR0aDogMFxufSwgYmFzZSwgdmFyaWFudCwgc3BhY2UsIGNvbG9yLCBzeCwgcHJvcHMgPT4gcHJvcHMuY3NzKTtcbkJveC5kaXNwbGF5TmFtZSA9ICdCb3gnO1xuXG5jb25zdCBGbGV4ID0gc3R5bGVkKEJveCkoe1xuICBkaXNwbGF5OiAnZmxleCdcbn0pO1xuRmxleC5kaXNwbGF5TmFtZSA9ICdGbGV4JztcblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuY29uc3QgcHggPSBuID0+IHR5cGVvZiBuID09PSAnbnVtYmVyJyA/IG4gKyAncHgnIDogbjtcblxuY29uc3Qgd2lkdGhUb0NvbHVtbnMgPSAod2lkdGgsIHJlcGVhdCkgPT4gQXJyYXkuaXNBcnJheSh3aWR0aCkgPyB3aWR0aC5tYXAodyA9PiB3aWR0aFRvQ29sdW1ucyh3LCByZXBlYXQpKSA6ICEhd2lkdGggJiYgYHJlcGVhdChhdXRvLSR7cmVwZWF0fSwgbWlubWF4KCR7cHgod2lkdGgpfSwgMWZyKSlgO1xuXG5jb25zdCBjb3VudFRvQ29sdW1ucyA9IG4gPT4gQXJyYXkuaXNBcnJheShuKSA/IG4ubWFwKGNvdW50VG9Db2x1bW5zKSA6ICEhbiAmJiAodHlwZW9mIG4gPT09ICdudW1iZXInID8gYHJlcGVhdCgke259LCAxZnIpYCA6IG4pO1xuXG5jb25zdCBHcmlkID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gR3JpZCh7XG4gIHdpZHRoLFxuICBjb2x1bW5zLFxuICBnYXAgPSAzLFxuICByZXBlYXQgPSAnZml0JyxcbiAgLi4ucHJvcHNcbn0sIHJlZikge1xuICBjb25zdCBncmlkVGVtcGxhdGVDb2x1bW5zID0gISF3aWR0aCA/IHdpZHRoVG9Db2x1bW5zKHdpZHRoLCByZXBlYXQpIDogY291bnRUb0NvbHVtbnMoY29sdW1ucyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwiZ3JpZHNcIixcbiAgICBfX2Nzczoge1xuICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgZ3JpZEdhcDogZ2FwLFxuICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uc1xuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IEJ1dHRvbiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIEJ1dHRvbihwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJidXR0b25cIixcbiAgICB2YXJpYW50OiBcInByaW1hcnlcIlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwiYnV0dG9uc1wiLFxuICAgIF9fY3NzOiB7XG4gICAgICBhcHBlYXJhbmNlOiAnbm9uZScsXG4gICAgICBkaXNwbGF5OiBwcm9wcy5oaWRkZW4gPyB1bmRlZmluZWQgOiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsaW5lSGVpZ2h0OiAnaW5oZXJpdCcsXG4gICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICAgIHB4OiAzLFxuICAgICAgcHk6IDIsXG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIGJnOiAncHJpbWFyeScsXG4gICAgICBib3JkZXI6IDAsXG4gICAgICBib3JkZXJSYWRpdXM6IDRcbiAgICB9XG4gIH0pKTtcbn0pO1xuXG5jb25zdCBMaW5rID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gTGluayhwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJhXCIsXG4gICAgdmFyaWFudDogXCJzdHlsZXMuYVwiXG4gIH0sIHByb3BzLCB7XG4gICAgX190aGVtZUtleTogXCJsaW5rc1wiXG4gIH0pKTtcbn0pO1xuXG5jb25zdCBQYXJhZ3JhcGggPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBQYXJhZ3JhcGgocHJvcHMsIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgYXM6IFwicFwiLFxuICAgIHZhcmlhbnQ6IFwicGFyYWdyYXBoXCIsXG4gICAgX190aGVtZUtleTogXCJ0ZXh0XCIsXG4gICAgX19jc3M6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdib2R5JyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2R5JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICdib2R5J1xuICAgIH1cbiAgfSwgcHJvcHMpKTtcbn0pO1xuXG5jb25zdCBUZXh0ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gVGV4dChwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICBhczogXCJzcGFuXCIsXG4gICAgcmVmOiByZWYsXG4gICAgdmFyaWFudDogXCJkZWZhdWx0XCJcbiAgfSwgcHJvcHMsIHtcbiAgICBfX3RoZW1lS2V5OiBcInRleHRcIlxuICB9KSk7XG59KTtcblxuY29uc3QgSGVhZGluZyA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIEhlYWRpbmcocHJvcHMsIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgYXM6IFwiaDJcIixcbiAgICB2YXJpYW50OiBcImhlYWRpbmdcIlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwidGV4dFwiLFxuICAgIF9fY3NzOiB7XG4gICAgICBmb250RmFtaWx5OiAnaGVhZGluZycsXG4gICAgICBmb250V2VpZ2h0OiAnaGVhZGluZycsXG4gICAgICBsaW5lSGVpZ2h0OiAnaGVhZGluZydcbiAgICB9XG4gIH0pKTtcbn0pO1xuXG5jb25zdCBJbWFnZSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIEltYWdlKHByb3BzLCByZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIGFzOiBcImltZ1wiXG4gIH0sIHByb3BzLCB7XG4gICAgX190aGVtZUtleTogXCJpbWFnZXNcIixcbiAgICBfX2Nzczoge1xuICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgLi4ucHJvcHMuX19jc3NcbiAgICB9XG4gIH0pKTtcbn0pO1xuXG5jb25zdCBDYXJkID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gQ2FyZChwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICB2YXJpYW50OiBcInByaW1hcnlcIlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwiY2FyZHNcIlxuICB9KSk7XG59KTtcblxuY29uc3QgTGFiZWwgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBMYWJlbChwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJsYWJlbFwiLFxuICAgIHZhcmlhbnQ6IFwibGFiZWxcIlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwiZm9ybXNcIixcbiAgICBfX2Nzczoge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGRpc3BsYXk6ICdmbGV4J1xuICAgIH1cbiAgfSkpO1xufSk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd0aGVtZS11aScpLlRoZW1lVUlTdHlsZU9iamVjdH0gKi9cblxuY29uc3QgYXV0b2ZpbGxTdHlsZXMgPSB7XG4gIGJveFNoYWRvdzogJ2luc2V0IDAgMCAwIDEwMDBweCB2YXIoLS10aGVtZS11aS1pbnB1dC1hdXRvZmlsbC1iZyknLFxuICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAnOmZpcnN0LWxpbmUnOiB7XG4gICAgZm9udFNpemU6ICcxcmVtJ1xuICB9XG59O1xuLyoqIEB0eXBlIHtpbXBvcnQoJ3RoZW1lLXVpJykuVGhlbWVVSVN0eWxlT2JqZWN0fSAqL1xuXG5jb25zdCBkZWZhdWx0SW5wdXRTdHlsZXMgPSB7XG4gIGRpc3BsYXk6ICdibG9jaycsXG4gIHdpZHRoOiAnMTAwJScsXG4gIHA6IDIsXG4gIGFwcGVhcmFuY2U6ICdub25lJyxcbiAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgbGluZUhlaWdodDogJ2luaGVyaXQnLFxuICBib3JkZXI6ICcxcHggc29saWQnLFxuICBib3JkZXJSYWRpdXM6IDQsXG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIGJnOiAndHJhbnNwYXJlbnQnLFxuICAnOmF1dG9maWxsLCA6YXV0b2ZpbGw6aG92ZXIsIDphdXRvZmlsbDpmb2N1cyc6IGF1dG9maWxsU3R5bGVzLFxuICAnOi13ZWJraXQtYXV0b2ZpbGwsIDotd2Via2l0LWF1dG9maWxsOmhvdmVyLCA6LXdlYmtpdC1hdXRvZmlsbDpmb2N1cyc6IGF1dG9maWxsU3R5bGVzXG59O1xuY29uc3QgSW5wdXQgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBJbnB1dCh7XG4gIHN4LFxuICBhdXRvZmlsbEJhY2tncm91bmRDb2xvciA9ICdiYWNrZ3JvdW5kJyxcbiAgLi4ucmVzdFxufSwgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJpbnB1dFwiLFxuICAgIHZhcmlhbnQ6IFwiaW5wdXRcIixcbiAgICBzeDoge1xuICAgICAgJy0tdGhlbWUtdWktaW5wdXQtYXV0b2ZpbGwtYmcnOiB0aGVtZSA9PiBnZXQodGhlbWUuY29sb3JzLCBhdXRvZmlsbEJhY2tncm91bmRDb2xvciwgbnVsbCksXG4gICAgICAuLi5zeFxuICAgIH1cbiAgfSwgcmVzdCwge1xuICAgIF9fdGhlbWVLZXk6IFwiZm9ybXNcIixcbiAgICBfX2NzczogZGVmYXVsdElucHV0U3R5bGVzXG4gIH0pKTtcbn0pO1xuXG5jb25zdCBTVkcgPSAoe1xuICBzaXplID0gMjQsXG4gIC4uLnByb3BzXG59KSA9PiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgYXM6IFwic3ZnXCIsXG4gIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gIHdpZHRoOiBzaXplICsgJycsXG4gIGhlaWdodDogc2l6ZSArICcnLFxuICB2aWV3Qm94OiBcIjAgMCAyNCAyNFwiLFxuICBmaWxsOiBcImN1cnJlbnRjb2xvclwiXG59LCBwcm9wcykpO1xuXG5TVkcuZGlzcGxheU5hbWUgPSAnU1ZHJztcblxuY29uc3QgZ2V0UHJvcHMgPSB0ZXN0ID0+IHByb3BzID0+IHtcbiAgY29uc3QgbmV4dCA9IHt9O1xuXG4gIGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XG4gICAgaWYgKHRlc3Qoa2V5IHx8ICcnKSkgbmV4dFtrZXldID0gcHJvcHNba2V5XTtcbiAgfVxuXG4gIHJldHVybiBuZXh0O1xufTtcbmNvbnN0IE1SRSA9IC9ebVt0cmJseHldPyQvO1xuY29uc3QgZ2V0TWFyZ2luID0gZ2V0UHJvcHMoayA9PiBNUkUudGVzdChrKSk7XG5jb25zdCBvbWl0TWFyZ2luID0gZ2V0UHJvcHMoayA9PiAhTVJFLnRlc3QoaykpO1xuXG5jb25zdCBEb3duQXJyb3cgPSBwcm9wcyA9PiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChTVkcsIHByb3BzLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk03IDEwbDUgNSA1LTV6XCJcbn0pKTtcblxuY29uc3QgU2VsZWN0ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gU2VsZWN0KHtcbiAgYXJyb3csXG4gIC4uLnByb3BzXG59LCByZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe30sIGdldE1hcmdpbihwcm9wcyksIHtcbiAgICBzeDoge1xuICAgICAgZGlzcGxheTogJ2ZsZXgnXG4gICAgfVxuICB9KSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgYXM6IFwic2VsZWN0XCIsXG4gICAgdmFyaWFudDogXCJzZWxlY3RcIlxuICB9LCBvbWl0TWFyZ2luKHByb3BzKSwge1xuICAgIF9fdGhlbWVLZXk6IFwiZm9ybXNcIixcbiAgICBfX2Nzczoge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBwOiAyLFxuICAgICAgYXBwZWFyYW5jZTogJ25vbmUnLFxuICAgICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICdpbmhlcml0JyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCcsXG4gICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICBjb2xvcjogJ2luaGVyaXQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZSA9PiBnZXQodGhlbWUsICdjb2xvcnMuYmFja2dyb3VuZCcsIG51bGwpXG4gICAgfVxuICB9KSksIGFycm93IHx8IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KERvd25BcnJvdywge1xuICAgIHN4OiB7XG4gICAgICBtbDogLTI4LFxuICAgICAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJ1xuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IFRleHRhcmVhID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gVGV4dGFyZWEocHJvcHMsIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgYXM6IFwidGV4dGFyZWFcIixcbiAgICB2YXJpYW50OiBcInRleHRhcmVhXCJcbiAgfSwgcHJvcHMsIHtcbiAgICBfX3RoZW1lS2V5OiBcImZvcm1zXCIsXG4gICAgX19jc3M6IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgcDogMixcbiAgICAgIGFwcGVhcmFuY2U6ICdub25lJyxcbiAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgICBsaW5lSGVpZ2h0OiAnaW5oZXJpdCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQnLFxuICAgICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgICAgY29sb3I6ICdpbmhlcml0JyxcbiAgICAgIGJnOiAndHJhbnNwYXJlbnQnXG4gICAgfVxuICB9KSk7XG59KTtcblxuY29uc3QgUmFkaW9DaGVja2VkID0gcHJvcHMgPT4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoU1ZHLCBwcm9wcywgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgZDogXCJNMTIgN2MtMi43NiAwLTUgMi4yNC01IDVzMi4yNCA1IDUgNSA1LTIuMjQgNS01LTIuMjQtNS01LTV6bTAtNUM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOC04IDh6XCJcbn0pKTtcblxuY29uc3QgUmFkaW9VbmNoZWNrZWQgPSBwcm9wcyA9PiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChTVkcsIHByb3BzLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHpcIlxufSkpO1xuXG5jb25zdCBSYWRpb0ljb24gPSBwcm9wcyA9PiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmFkaW9DaGVja2VkLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgX19jc3M6IHtcbiAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgJ2lucHV0OmNoZWNrZWQgfiAmJzoge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH1cbiAgfVxufSkpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSYWRpb1VuY2hlY2tlZCwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gIF9fY3NzOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAnaW5wdXQ6Y2hlY2tlZCB+ICYnOiB7XG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9XG4gIH1cbn0pKSk7XG5cbmNvbnN0IFJhZGlvID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gUmFkaW8oe1xuICBjbGFzc05hbWUsXG4gIHN4LFxuICB2YXJpYW50ID0gJ3JhZGlvJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7XG4gICAgc3g6IHtcbiAgICAgIG1pbldpZHRoOiAnbWluLWNvbnRlbnQnXG4gICAgfVxuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJpbnB1dFwiLFxuICAgIHR5cGU6IFwicmFkaW9cIlxuICB9LCBwcm9wcywge1xuICAgIHN4OiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6SW5kZXg6IC0xLFxuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICB9XG4gIH0pKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7XG4gICAgYXM6IFJhZGlvSWNvbixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIF9fdGhlbWVLZXk6IFwiZm9ybXNcIixcbiAgICB2YXJpYW50OiB2YXJpYW50LFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgIHN4OiBzeCxcbiAgICBfX2Nzczoge1xuICAgICAgLy8gdG9kbzogc3lzdGVtIHByb3BzPz9cbiAgICAgIG1yOiAyLFxuICAgICAgYm9yZGVyUmFkaXVzOiA5OTk5LFxuICAgICAgY29sb3I6ICdncmF5JyxcbiAgICAgIGZsZXhTaHJpbms6IDAsXG4gICAgICAnaW5wdXQ6Y2hlY2tlZCB+ICYnOiB7XG4gICAgICAgIGNvbG9yOiAncHJpbWFyeSdcbiAgICAgIH0sXG4gICAgICAnaW5wdXQ6Zm9jdXMgfiAmJzoge1xuICAgICAgICBiZzogJ2hpZ2hsaWdodCdcbiAgICAgIH1cbiAgICB9XG4gIH0pKTtcbn0pO1xuXG5jb25zdCBDaGVja2JveENoZWNrZWQgPSBwcm9wcyA9PiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChTVkcsIHByb3BzLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk0xOSAzSDVjLTEuMTEgMC0yIC45LTIgMnYxNGMwIDEuMS44OSAyIDIgMmgxNGMxLjExIDAgMi0uOSAyLTJWNWMwLTEuMS0uODktMi0yLTJ6bS05IDE0bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDcuNTktNy41OUwxOSA4bC05IDl6XCJcbn0pKTtcblxuY29uc3QgQ2hlY2tib3hVbmNoZWNrZWQgPSBwcm9wcyA9PiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChTVkcsIHByb3BzLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk0xOSA1djE0SDVWNWgxNG0wLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yelwiXG59KSk7XG5cbmNvbnN0IENoZWNrYm94SWNvbiA9IHByb3BzID0+IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChDaGVja2JveENoZWNrZWQsIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICBfX2Nzczoge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAnaW5wdXQ6Y2hlY2tlZCB+ICYnOiB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgfVxuICB9XG59KSksIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KENoZWNrYm94VW5jaGVja2VkLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgX19jc3M6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICdpbnB1dDpjaGVja2VkIH4gJic6IHtcbiAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH1cbiAgfVxufSkpKTtcblxuY29uc3QgQ2hlY2tib3ggPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBDaGVja2JveCh7XG4gIGNsYXNzTmFtZSxcbiAgc3gsXG4gIHZhcmlhbnQgPSAnY2hlY2tib3gnLFxuICBjaGlsZHJlbixcbiAgLi4ucHJvcHNcbn0sIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7XG4gICAgc3g6IHtcbiAgICAgIG1pbldpZHRoOiAnbWluLWNvbnRlbnQnXG4gICAgfVxuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJpbnB1dFwiLFxuICAgIHR5cGU6IFwiY2hlY2tib3hcIlxuICB9LCBwcm9wcywge1xuICAgIHN4OiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6SW5kZXg6IC0xLFxuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICB9XG4gIH0pKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7XG4gICAgYXM6IENoZWNrYm94SWNvbixcbiAgICBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLFxuICAgIF9fdGhlbWVLZXk6IFwiZm9ybXNcIixcbiAgICB2YXJpYW50OiB2YXJpYW50LFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgIHN4OiBzeCxcbiAgICBfX2Nzczoge1xuICAgICAgbXI6IDIsXG4gICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICBjb2xvcjogJ2dyYXknLFxuICAgICAgZmxleFNocmluazogMCxcbiAgICAgICdpbnB1dDpjaGVja2VkIH4gJic6IHtcbiAgICAgICAgY29sb3I6ICdwcmltYXJ5J1xuICAgICAgfSxcbiAgICAgICdpbnB1dDpmb2N1cyB+ICYnOiB7XG4gICAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgICAgIGJnOiAnaGlnaGxpZ2h0J1xuICAgICAgfVxuICAgIH1cbiAgfSksIGNoaWxkcmVuKTtcbn0pO1xuXG5jb25zdCBHVVRURVIgPSAyO1xuY29uc3QgU0laRSA9IDE4O1xuY29uc3QgU3dpdGNoID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gU3dpdGNoKHtcbiAgY2xhc3NOYW1lLFxuICBsYWJlbCxcbiAgc3gsXG4gIHZhcmlhbnQgPSAnc3dpdGNoJyxcbiAgLi4ucHJvcHNcbn0sIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIHtcbiAgICBzeDoge1xuICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9XG4gIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIGFzOiBcImlucHV0XCIsXG4gICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgIF9fdGhlbWVLZXk6IFwiZm9ybXNcIixcbiAgICBcImFyaWEtbGFiZWxcIjogbGFiZWxcbiAgfSwgcHJvcHMsIHtcbiAgICBzeDoge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgekluZGV4OiAtMSxcbiAgICAgIHdpZHRoOiAxLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgfVxuICB9KSksIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwge1xuICAgIGNzczoge1xuICAgICAgcGFkZGluZzogR1VUVEVSXG4gICAgfSxcbiAgICBfX3RoZW1lS2V5OiBcImZvcm1zXCIsXG4gICAgdmFyaWFudDogdmFyaWFudCxcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICBzeDogc3gsXG4gICAgX19jc3M6IHtcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgYmc6ICdncmF5JyxcbiAgICAgIGJvcmRlclJhZGl1czogU0laRSxcbiAgICAgIGhlaWdodDogU0laRSArIEdVVFRFUiAqIDIsXG4gICAgICB3aWR0aDogU0laRSAqIDIgKyBHVVRURVIgKiAyLFxuICAgICAgbXI6IDIsXG4gICAgICAnaW5wdXQ6ZGlzYWJsZWQgfiAmJzoge1xuICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgIGN1cnNvcjogJ25vdC1hbGxvd2VkJ1xuICAgICAgfSxcbiAgICAgICcmID4gZGl2Jzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICBoZWlnaHQ6IFNJWkUsXG4gICAgICAgIHdpZHRoOiBTSVpFLFxuICAgICAgICBiZzogJ3doaXRlJyxcbiAgICAgICAgYm94U2hhZG93OiAnMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKScsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKScsXG4gICAgICAgIHRyYW5zaXRpb246IGB0cmFuc2Zvcm0gMjQwbXMgY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0MCwgMC40NDAsIDEuMDAwKWBcbiAgICAgIH0sXG4gICAgICAnaW5wdXQ6Y2hlY2tlZCB+ICYnOiB7XG4gICAgICAgIGJnOiAncHJpbWFyeScsXG4gICAgICAgICc+IGRpdic6IHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIG51bGwpKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIGxhYmVsKSk7XG59KTtcblxuY29uc3QgdGh1bWIgPSB7XG4gIGFwcGVhcmFuY2U6ICdub25lJyxcbiAgd2lkdGg6IDE2LFxuICBoZWlnaHQ6IDE2LFxuICBiZzogJ2N1cnJlbnRjb2xvcicsXG4gIGJvcmRlcjogMCxcbiAgYm9yZGVyUmFkaXVzOiA5OTk5LFxuICB2YXJpYW50OiAnZm9ybXMuc2xpZGVyLnRodW1iJ1xufTtcbmNvbnN0IFNsaWRlciA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIFNsaWRlcihwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJpbnB1dFwiLFxuICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICB2YXJpYW50OiBcInNsaWRlclwiXG4gIH0sIHByb3BzLCB7XG4gICAgX190aGVtZUtleTogXCJmb3Jtc1wiLFxuICAgIF9fY3NzOiB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogNCxcbiAgICAgIG15OiAyLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICBhcHBlYXJhbmNlOiAnbm9uZScsXG4gICAgICBib3JkZXJSYWRpdXM6IDk5OTksXG4gICAgICBjb2xvcjogJ2luaGVyaXQnLFxuICAgICAgYmc6ICdncmF5JyxcbiAgICAgICc6Zm9jdXMnOiB7XG4gICAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgY29sb3I6ICdwcmltYXJ5J1xuICAgICAgfSxcbiAgICAgICcmOjotd2Via2l0LXNsaWRlci10aHVtYic6IHRodW1iLFxuICAgICAgJyY6Oi1tb3otcmFuZ2UtdGh1bWInOiB0aHVtYixcbiAgICAgICcmOjotbXMtdGh1bWInOiB0aHVtYlxuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IEZpZWxkID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gRmllbGQoe1xuICBhczogQ29udHJvbCA9IElucHV0LFxuICBsYWJlbCxcbiAgaWQsXG4gIG5hbWUsXG4gIC4uLnByb3BzXG59LCByZWYpIHtcbiAgY29uc3QgZmllbGRJZGVudGlmaWVyID0gaWQgfHwgbmFtZTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgZ2V0TWFyZ2luKHByb3BzKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIHtcbiAgICBodG1sRm9yOiBmaWVsZElkZW50aWZpZXJcbiAgfSwgbGFiZWwpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChDb250cm9sLCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgaWQ6IGZpZWxkSWRlbnRpZmllcixcbiAgICBuYW1lOiBuYW1lXG4gIH0sIG9taXRNYXJnaW4ocHJvcHMpKSkpO1xufSk7XG5cbmNvbnN0IFByb2dyZXNzID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gUHJvZ3Jlc3MocHJvcHMsIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgYXM6IFwicHJvZ3Jlc3NcIixcbiAgICB2YXJpYW50OiBcInN0eWxlcy5wcm9ncmVzc1wiXG4gIH0sIHByb3BzLCB7XG4gICAgX19jc3M6IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnNHB4JyxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIHBhZGRpbmc6IDAsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICBhcHBlYXJhbmNlOiAnbm9uZScsXG4gICAgICBjb2xvcjogJ3ByaW1hcnknLFxuICAgICAgYmc6ICdncmF5JyxcbiAgICAgIGJvcmRlclJhZGl1czogOTk5OSxcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgJyY6Oi13ZWJraXQtcHJvZ3Jlc3MtYmFyJzoge1xuICAgICAgICBiZzogJ3RyYW5zcGFyZW50J1xuICAgICAgfSxcbiAgICAgICcmOjotd2Via2l0LXByb2dyZXNzLXZhbHVlJzoge1xuICAgICAgICBiZzogJ2N1cnJlbnRjb2xvcidcbiAgICAgIH0sXG4gICAgICAnJjo6LW1vei1wcm9ncmVzcy1iYXInOiB7XG4gICAgICAgIGJnOiAnY3VycmVudGNvbG9yJ1xuICAgICAgfVxuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IERvbnV0ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gRG9udXQoe1xuICBzaXplID0gMTI4LFxuICBzdHJva2VXaWR0aCA9IDIsXG4gIHZhbHVlID0gMCxcbiAgbWluID0gMCxcbiAgbWF4ID0gMSxcbiAgdGl0bGUsXG4gIC4uLnByb3BzXG59LCByZWYpIHtcbiAgY29uc3QgciA9IDE2IC0gc3Ryb2tlV2lkdGg7XG4gIGNvbnN0IEMgPSAyICogciAqIE1hdGguUEk7XG4gIGNvbnN0IG9mZnNldCA9IEMgLSAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbikgKiBDO1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgYXM6IFwic3ZnXCIsXG4gICAgdmlld0JveDogXCIwIDAgMzIgMzJcIixcbiAgICB3aWR0aDogc2l6ZSxcbiAgICBoZWlnaHQ6IHNpemUsXG4gICAgc3Ryb2tlV2lkdGg6IHN0cm9rZVdpZHRoLFxuICAgIGZpbGw6IFwibm9uZVwiLFxuICAgIHN0cm9rZTogXCJjdXJyZW50Y29sb3JcIixcbiAgICByb2xlOiBcImltZ1wiLFxuICAgIFwiYXJpYS12YWx1ZW5vd1wiOiB2YWx1ZSxcbiAgICBcImFyaWEtdmFsdWVtaW5cIjogbWluLFxuICAgIFwiYXJpYS12YWx1ZW1heFwiOiBtYXhcbiAgfSwgcHJvcHMsIHtcbiAgICBfX2Nzczoge1xuICAgICAgY29sb3I6ICdwcmltYXJ5J1xuICAgIH1cbiAgfSksIHRpdGxlICYmIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwgbnVsbCwgdGl0bGUpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgY3g6IDE2LFxuICAgIGN5OiAxNixcbiAgICByOiByLFxuICAgIG9wYWNpdHk6IDEgLyA4XG4gIH0pLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgY3g6IDE2LFxuICAgIGN5OiAxNixcbiAgICByOiByLFxuICAgIHN0cm9rZURhc2hhcnJheTogQyxcbiAgICBzdHJva2VEYXNob2Zmc2V0OiBvZmZzZXQsXG4gICAgdHJhbnNmb3JtOiBcInJvdGF0ZSgtOTAgMTYgMTYpXCJcbiAgfSkpO1xufSk7XG5cbmNvbnN0IHNwaW4gPSBrZXlmcmFtZXMoe1xuICBmcm9tOiB7XG4gICAgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJ1xuICB9LFxuICB0bzoge1xuICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJ1xuICB9XG59KTtcbmNvbnN0IFNwaW5uZXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBTcGlubmVyKHtcbiAgc2l6ZSA9IDQ4LFxuICBzdHJva2VXaWR0aCA9IDQsXG4gIG1heCA9IDEsXG4gIHRpdGxlID0gJ0xvYWRpbmcuLi4nLFxuICBkdXJhdGlvbiA9IDUwMCxcbiAgLi4ucHJvcHNcbn0sIHJlZikge1xuICBjb25zdCByID0gMTYgLSBzdHJva2VXaWR0aDtcbiAgY29uc3QgQyA9IDIgKiByICogTWF0aC5QSTtcbiAgY29uc3Qgb2Zmc2V0ID0gQyAtIDEgLyA0ICogQztcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIGFzOiBcInN2Z1wiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDMyIDMyXCIsXG4gICAgd2lkdGg6IHNpemUsXG4gICAgaGVpZ2h0OiBzaXplLFxuICAgIHN0cm9rZVdpZHRoOiBzdHJva2VXaWR0aCxcbiAgICBmaWxsOiBcIm5vbmVcIixcbiAgICBzdHJva2U6IFwiY3VycmVudGNvbG9yXCIsXG4gICAgcm9sZTogXCJpbWdcIlxuICB9LCBwcm9wcywge1xuICAgIF9fY3NzOiB7XG4gICAgICBjb2xvcjogJ3ByaW1hcnknLFxuICAgICAgb3ZlcmZsb3c6ICd2aXNpYmxlJ1xuICAgIH1cbiAgfSksIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidGl0bGVcIiwgbnVsbCwgdGl0bGUpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgY3g6IDE2LFxuICAgIGN5OiAxNixcbiAgICByOiByLFxuICAgIG9wYWNpdHk6IDEgLyA4XG4gIH0pLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHtcbiAgICBhczogXCJjaXJjbGVcIixcbiAgICBjeDogMTYsXG4gICAgY3k6IDE2LFxuICAgIHI6IHIsXG4gICAgc3Ryb2tlRGFzaGFycmF5OiBDLFxuICAgIHN0cm9rZURhc2hvZmZzZXQ6IG9mZnNldCxcbiAgICBfX2Nzczoge1xuICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnNTAlIDUwJScsXG4gICAgICBhbmltYXRpb25OYW1lOiBzcGluLnRvU3RyaW5nKCksXG4gICAgICBhbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2xpbmVhcicsXG4gICAgICBhbmltYXRpb25EdXJhdGlvbjogZHVyYXRpb24gKyAnbXMnLFxuICAgICAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6ICdpbmZpbml0ZSdcbiAgICB9XG4gIH0pKTtcbn0pO1xuXG5jb25zdCBBdmF0YXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBBdmF0YXIoe1xuICBzaXplID0gNDgsXG4gIC4uLnByb3BzXG59LCByZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgd2lkdGg6IHNpemUsXG4gICAgaGVpZ2h0OiBzaXplLFxuICAgIHZhcmlhbnQ6IFwiYXZhdGFyXCJcbiAgfSwgcHJvcHMsIHtcbiAgICBfX2Nzczoge1xuICAgICAgYm9yZGVyUmFkaXVzOiA5OTk5XG4gICAgfVxuICB9KSk7XG59KTtcblxuY29uc3QgQmFkZ2UgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBCYWRnZShwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICB2YXJpYW50OiBcInByaW1hcnlcIlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwiYmFkZ2VzXCIsXG4gICAgX19jc3M6IHtcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgdmVydGljYWxBbGlnbjogJ2Jhc2VsaW5lJyxcbiAgICAgIGZvbnRTaXplOiAwLFxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICBweDogMSxcbiAgICAgIGJvcmRlclJhZGl1czogMixcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmc6ICdwcmltYXJ5J1xuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IEljb25CdXR0b24gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBJY29uQnV0dG9uKHtcbiAgc2l6ZSA9IDMyLFxuICAuLi5wcm9wc1xufSwgcmVmKSB7XG4gIHZhciBfcHJvcHMkX19jc3M7XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIGFzOiBcImJ1dHRvblwiLFxuICAgIHZhcmlhbnQ6IFwiaWNvblwiXG4gIH0sIHByb3BzLCB7XG4gICAgX190aGVtZUtleTogXCJidXR0b25zXCIsXG4gICAgX19jc3M6IHtcbiAgICAgIGxhYmVsOiAoKF9wcm9wcyRfX2NzcyA9IHByb3BzLl9fY3NzKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJF9fY3NzLmxhYmVsKSB8fCAnSWNvbkJ1dHRvbicsXG4gICAgICBhcHBlYXJhbmNlOiAnbm9uZScsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICBwYWRkaW5nOiAxLFxuICAgICAgd2lkdGg6IHNpemUsXG4gICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICBjb2xvcjogJ2luaGVyaXQnLFxuICAgICAgYmc6ICd0cmFuc3BhcmVudCcsXG4gICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgIGJvcmRlclJhZGl1czogNFxuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IHggPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7XG4gIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gIHdpZHRoOiBcIjI0XCIsXG4gIGhlaWdodDogXCIyNFwiLFxuICBmaWxsOiBcImN1cnJlbnRjb2xvclwiLFxuICB2aWV3Qm94OiBcIjAgMCAyNCAyNFwiXG59LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6XCJcbn0pKTtcbmNvbnN0IENsb3NlID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gQ2xvc2Uoe1xuICBzaXplID0gMzIsXG4gIC4uLnByb3BzXG59LCByZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBzaXplOiBzaXplLFxuICAgIHRpdGxlOiBcIkNsb3NlXCIsXG4gICAgXCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2VcIixcbiAgICB2YXJpYW50OiBcImNsb3NlXCJcbiAgfSwgcHJvcHMsIHtcbiAgICBjaGlsZHJlbjogeFxuICB9KSk7XG59KTtcblxuY29uc3QgQWxlcnQgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBBbGVydChwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICB2YXJpYW50OiBcInByaW1hcnlcIlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwiYWxlcnRzXCIsXG4gICAgX19jc3M6IHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgcHg6IDMsXG4gICAgICBweTogMixcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmc6ICdwcmltYXJ5JyxcbiAgICAgIGJvcmRlclJhZGl1czogNFxuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IERpdmlkZXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBEaXZpZGVyKHByb3BzLCByZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIGFzOiBcImhyXCIsXG4gICAgdmFyaWFudDogXCJzdHlsZXMuaHJcIlxuICB9LCBwcm9wcywge1xuICAgIF9fY3NzOiB7XG4gICAgICBjb2xvcjogJ2dyYXknLFxuICAgICAgbTogMCxcbiAgICAgIG15OiAyLFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkJ1xuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IGdldENvbnRhaW5lclByb3BzID0gZ2V0UHJvcHMoX19pc0JveFN0eWxlZFN5c3RlbVByb3ApO1xuY29uc3QgZ2V0SWZyYW1lUHJvcHMgPSBnZXRQcm9wcyhzdHIgPT4gIV9faXNCb3hTdHlsZWRTeXN0ZW1Qcm9wKHN0cikpO1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9pbmRleFwiKS5FbWJlZFByb3BzfSBFbWJlZFByb3BzICovXG5cbi8qKiBAdHlwZSB7UmVhY3QuRm9yd2FyZFJlZkV4b3RpY0NvbXBvbmVudDxFbWJlZFByb3BzPn0gKi9cblxuY29uc3QgRW1iZWQgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBFbWJlZCh7XG4gIHZhcmlhbnQsXG4gIHN4LFxuICByYXRpbyA9IDE2IC8gOSxcbiAgc3JjLFxuICBmcmFtZUJvcmRlciA9IDAsXG4gIGFsbG93RnVsbFNjcmVlbiA9IHRydWUsXG4gIHdpZHRoID0gNTYwLFxuICBoZWlnaHQgPSAzMTUsXG4gIGFsbG93LFxuICAuLi5yZXN0XG59LCByZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe1xuICAgIHZhcmlhbnQ6IHZhcmlhbnQsXG4gICAgc3g6IHN4LFxuICAgIF9fY3NzOiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgcGFkZGluZ0JvdHRvbTogMTAwIC8gcmF0aW8gKyAnJScsXG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgIH1cbiAgfSwgZ2V0Q29udGFpbmVyUHJvcHMocmVzdCkpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHtcbiAgICByZWY6IHJlZixcbiAgICBhczogXCJpZnJhbWVcIixcbiAgICBzcmM6IHNyYyxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgZnJhbWVCb3JkZXI6IGZyYW1lQm9yZGVyLFxuICAgIGFsbG93RnVsbFNjcmVlbjogYWxsb3dGdWxsU2NyZWVuLFxuICAgIGFsbG93OiBhbGxvd1xuICB9LCBnZXRJZnJhbWVQcm9wcyhyZXN0KSwge1xuICAgIF9fY3NzOiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBib3JkZXI6IDBcbiAgICB9XG4gIH0pKSk7XG59KTtcblxuY29uc3QgQXNwZWN0UmF0aW8gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBBc3BlY3RSYXRpbyh7XG4gIHJhdGlvID0gNCAvIDMsXG4gIGNoaWxkcmVuLFxuICAuLi5wcm9wc1xufSwgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHtcbiAgICByZWY6IHJlZixcbiAgICBzeDoge1xuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICB9XG4gIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwge1xuICAgIHN4OiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgcGFkZGluZ0JvdHRvbTogMTAwIC8gcmF0aW8gKyAnJSdcbiAgICB9XG4gIH0pLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICAgIF9fY3NzOiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIHJpZ2h0OiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgbGVmdDogMFxuICAgIH1cbiAgfSksIGNoaWxkcmVuKSk7XG59KTtcblxuY29uc3QgQXNwZWN0SW1hZ2UgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBBc3BlY3RJbWFnZSh7XG4gIHJhdGlvLFxuICAuLi5wcm9wc1xufSwgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBc3BlY3RSYXRpbywge1xuICAgIHJhdGlvOiByYXRpb1xuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJbWFnZSwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgX19jc3M6IHtcbiAgICAgIG9iamVjdEZpdDogJ2NvdmVyJ1xuICAgIH1cbiAgfSkpKTtcbn0pO1xuXG5jb25zdCBDb250YWluZXIgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBDb250YWluZXIocHJvcHMsIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgdmFyaWFudDogXCJjb250YWluZXJcIlxuICB9LCBwcm9wcywge1xuICAgIF9fdGhlbWVLZXk6IFwibGF5b3V0XCIsXG4gICAgX19jc3M6IHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBtYXhXaWR0aDogJ2NvbnRhaW5lcicsXG4gICAgICBteDogJ2F1dG8nXG4gICAgfVxuICB9KSk7XG59KTtcblxuY29uc3QgTmF2TGluayA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIE5hdkxpbmsocHJvcHMsIHJlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTGluaywgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmLFxuICAgIHZhcmlhbnQ6IFwibmF2XCJcbiAgfSwgcHJvcHMsIHtcbiAgICBfX2Nzczoge1xuICAgICAgY29sb3I6ICdpbmhlcml0JyxcbiAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICcmOmhvdmVyLCAmOmZvY3VzLCAmLmFjdGl2ZSc6IHtcbiAgICAgICAgY29sb3I6ICdwcmltYXJ5J1xuICAgICAgfVxuICAgIH1cbiAgfSkpO1xufSk7XG5cbmNvbnN0IE1lc3NhZ2UgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBNZXNzYWdlKHByb3BzLCByZWYpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgX2V4dGVuZHMoe1xuICAgIHJlZjogcmVmXG4gIH0sIHByb3BzLCB7XG4gICAgX190aGVtZUtleTogXCJtZXNzYWdlc1wiLFxuICAgIF9fY3NzOiB7XG4gICAgICBwYWRkaW5nOiAzLFxuICAgICAgcGFkZGluZ0xlZnQ6IHQgPT4gdC5zcGFjZVszXSAtIHQuc3BhY2VbMV0sXG4gICAgICBib3JkZXJMZWZ0V2lkdGg6IHQgPT4gdC5zcGFjZVsxXSxcbiAgICAgIGJvcmRlckxlZnRTdHlsZTogJ3NvbGlkJyxcbiAgICAgIGJvcmRlckxlZnRDb2xvcjogJ3ByaW1hcnknLFxuICAgICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgICAgYmc6ICdoaWdobGlnaHQnXG4gICAgfVxuICB9KSk7XG59KTtcblxuY29uc3QgTWVudUljb24gPSAoe1xuICBzaXplID0gMjRcbn0pID0+IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEJveCwge1xuICBhczogXCJzdmdcIixcbiAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgd2lkdGg6IHNpemUsXG4gIGhlaWdodDogc2l6ZSxcbiAgZmlsbDogXCJjdXJyZW50Y29sb3JcIixcbiAgdmlld0JveDogXCIwIDAgMjQgMjRcIixcbiAgc3g6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIG1hcmdpbjogMFxuICB9XG59LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk0zIDE4aDE4di0ySDN2MnptMC01aDE4di0ySDN2MnptMC03djJoMThWNkgzelwiXG59KSk7XG5jb25zdCBNZW51QnV0dG9uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gTWVudUJ1dHRvbihwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCBfZXh0ZW5kcyh7XG4gICAgcmVmOiByZWYsXG4gICAgdGl0bGU6IFwiTWVudVwiLFxuICAgIFwiYXJpYS1sYWJlbFwiOiBcIlRvZ2dsZSBNZW51XCIsXG4gICAgdmFyaWFudDogXCJtZW51XCJcbiAgfSwgcHJvcHMpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChNZW51SWNvbiwgbnVsbCkpO1xufSk7XG5cbmV4cG9ydCB7IEFsZXJ0LCBBc3BlY3RJbWFnZSwgQXNwZWN0UmF0aW8sIEF2YXRhciwgQmFkZ2UsIEJveCwgQnV0dG9uLCBDYXJkLCBDaGVja2JveCwgQ2xvc2UsIENvbnRhaW5lciwgRGl2aWRlciwgRG9udXQsIEVtYmVkLCBGaWVsZCwgRmxleCwgR3JpZCwgSGVhZGluZywgSWNvbkJ1dHRvbiwgSW1hZ2UsIElucHV0LCBMYWJlbCwgTGluaywgTWVudUJ1dHRvbiwgTWVzc2FnZSwgTmF2TGluaywgUGFyYWdyYXBoLCBQcm9ncmVzcywgUmFkaW8sIFNlbGVjdCwgU2xpZGVyLCBTcGlubmVyLCBTd2l0Y2gsIFRleHQsIFRleHRhcmVhIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMganN4JDEsIFRoZW1lQ29udGV4dCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZGVlcG1lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgcGFja2FnZUluZm8gZnJvbSAnQGVtb3Rpb24vcmVhY3QvcGFja2FnZS5qc29uJztcbmltcG9ydCBwYXJzZVByb3BzIGZyb20gJ0B0aGVtZS11aS9wYXJzZS1wcm9wcyc7XG5cbmNvbnN0IF9fRU1PVElPTl9WRVJTSU9OX18gPSBwYWNrYWdlSW5mby52ZXJzaW9uO1xuY29uc3QganN4ID0gKHR5cGUsIHByb3BzLCAuLi5jaGlsZHJlbikgPT4ganN4JDEodHlwZSwgcGFyc2VQcm9wcyhwcm9wcyksIC4uLmNoaWxkcmVuKTtcbi8qKlxuICogQGludGVybmFsIGZvciBCYWJlbCBKU1ggcHJhZ21hXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zeXN0ZW0tdWkvdGhlbWUtdWkvaXNzdWVzLzE2MDNcbiAqL1xuXG5jb25zdCBjcmVhdGVFbGVtZW50ID0ganN4O1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCBfX1RoZW1lVUlDb250ZXh0ID0gLyojX19QVVJFX18qL2NyZWF0ZUNvbnRleHQoe1xuICBfX0VNT1RJT05fVkVSU0lPTl9fLFxuICB0aGVtZToge31cbn0pO1xuY29uc3QgdXNlVGhlbWVVSSA9ICgpID0+IHVzZUNvbnRleHQoX19UaGVtZVVJQ29udGV4dCk7XG5jb25zdCBjYW5Vc2VTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG5jb25zdCBSRUFDVF9FTEVNRU5UID0gY2FuVXNlU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xuY29uc3QgRk9SV0FSRF9SRUYgPSBjYW5Vc2VTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWM3O1xuY29uc3QgZGVlcG1lcmdlT3B0aW9ucyA9IHtcbiAgaXNNZXJnZWFibGVPYmplY3Q6IG4gPT4ge1xuICAgIHJldHVybiAhIW4gJiYgdHlwZW9mIG4gPT09ICdvYmplY3QnICYmIG4uJCR0eXBlb2YgIT09IFJFQUNUX0VMRU1FTlQgJiYgbi4kJHR5cGVvZiAhPT0gRk9SV0FSRF9SRUY7XG4gIH0sXG4gIGFycmF5TWVyZ2U6IChfbGVmdEFycmF5LCByaWdodEFycmF5KSA9PiByaWdodEFycmF5XG59O1xuLyoqXG4gKiBEZWVwbHkgbWVyZ2UgdGhlbWVzXG4gKi9cblxuY29uc3QgbWVyZ2UgPSAoYSwgYikgPT4gZGVlcG1lcmdlKGEsIGIsIGRlZXBtZXJnZU9wdGlvbnMpO1xuXG5mdW5jdGlvbiBtZXJnZUFsbCguLi5hcmdzKSB7XG4gIHJldHVybiBkZWVwbWVyZ2UuYWxsKGFyZ3MsIGRlZXBtZXJnZU9wdGlvbnMpO1xufVxuXG5tZXJnZS5hbGwgPSBtZXJnZUFsbDtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuY29uc3QgX19UaGVtZVVJSW50ZXJuYWxCYXNlVGhlbWVQcm92aWRlciA9ICh7XG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuXG59KSA9PiBqc3goVGhlbWVDb250ZXh0LlByb3ZpZGVyLCB7XG4gIHZhbHVlOiBjb250ZXh0LnRoZW1lXG59LCBqc3goX19UaGVtZVVJQ29udGV4dC5Qcm92aWRlciwge1xuICB2YWx1ZTogY29udGV4dCxcbiAgY2hpbGRyZW5cbn0pKTtcbmZ1bmN0aW9uIFRoZW1lUHJvdmlkZXIoe1xuICB0aGVtZSxcbiAgY2hpbGRyZW5cbn0pIHtcbiAgY29uc3Qgb3V0ZXIgPSB1c2VUaGVtZVVJKCk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAob3V0ZXIuX19FTU9USU9OX1ZFUlNJT05fXyAhPT0gX19FTU9USU9OX1ZFUlNJT05fXykge1xuICAgICAgY29uc29sZS53YXJuKCdNdWx0aXBsZSB2ZXJzaW9ucyBvZiBFbW90aW9uIGRldGVjdGVkLCcsICdhbmQgdGhlbWluZyBtaWdodCBub3Qgd29yayBhcyBleHBlY3RlZC4nLCAnUGxlYXNlIGVuc3VyZSB0aGVyZSBpcyBvbmx5IG9uZSBjb3B5IG9mIEBlbW90aW9uL3JlYWN0IGluc3RhbGxlZCBpbiB5b3VyIGFwcGxpY2F0aW9uLicpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSB0eXBlb2YgdGhlbWUgPT09ICdmdW5jdGlvbicgPyB7IC4uLm91dGVyLFxuICAgIHRoZW1lOiB0aGVtZShvdXRlci50aGVtZSlcbiAgfSA6IG1lcmdlLmFsbCh7fSwgb3V0ZXIsIHtcbiAgICB0aGVtZVxuICB9KTtcbiAgcmV0dXJuIGpzeChfX1RoZW1lVUlJbnRlcm5hbEJhc2VUaGVtZVByb3ZpZGVyLCB7XG4gICAgY29udGV4dFxuICB9LCBjaGlsZHJlbik7XG59XG5cbmV4cG9ydCB7IFRoZW1lUHJvdmlkZXIsIF9fVGhlbWVVSUNvbnRleHQsIF9fVGhlbWVVSUludGVybmFsQmFzZVRoZW1lUHJvdmlkZXIsIGNyZWF0ZUVsZW1lbnQsIGpzeCwgbWVyZ2UsIHVzZVRoZW1lVUkgfTtcbiIsIi8qKlxuICogQWxsb3dzIGZvciBuZXN0ZWQgc2NhbGVzIHdpdGggc2hvcnRoYW5kIHZhbHVlc1xuICogQGV4YW1wbGVcbiAqIHtcbiAqICAgY29sb3JzOiB7XG4gKiAgICAgcHJpbWFyeTogeyBfX2RlZmF1bHQ6ICcjMDBmJywgbGlnaHQ6ICcjMzNmJyB9XG4gKiAgIH1cbiAqIH1cbiAqIGNzcyh7IGNvbG9yOiAncHJpbWFyeScgfSk7IC8vIHsgY29sb3I6ICcjMDBmJyB9XG4gKiBjc3MoeyBjb2xvcjogJ3ByaW1hcnkubGlnaHQnIH0pIC8vIHsgY29sb3I6ICcjMzNmJyB9XG4gKi9cblxuY29uc3QgVEhFTUVfVUlfREVGQVVMVF9LRVkgPSAnX19kZWZhdWx0JztcblxuY29uc3QgaGFzRGVmYXVsdCA9IHggPT4ge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGwgJiYgVEhFTUVfVUlfREVGQVVMVF9LRVkgaW4geDtcbn07XG4vKipcbiAqIEV4dHJhY3RzIHZhbHVlIHVuZGVyIHBhdGggZnJvbSBhIGRlZXBseSBuZXN0ZWQgb2JqZWN0LlxuICogVXNlZCBmb3IgVGhlbWVzLCB2YXJpYW50cyBhbmQgVGhlbWUgVUkgc3R5bGUgb2JqZWN0cy5cbiAqIEdpdmVuIGEgcGF0aCB0byBvYmplY3Qgd2l0aCBgX19kZWZhdWx0YCBrZXksIHJldHVybnMgdGhlIHZhbHVlIHVuZGVyIHRoYXQga2V5LlxuICpcbiAqIEBwYXJhbSBvYmogYSB0aGVtZSwgdmFyaWFudCBvciBzdHlsZSBvYmplY3RcbiAqIEBwYXJhbSBwYXRoIHBhdGggc2VwYXJhdGVkIHdpdGggZG90cyAoYC5gKVxuICogQHBhcmFtIGZhbGxiYWNrIGRlZmF1bHQgdmFsdWUgcmV0dXJuZWQgaWYgZ2V0KG9iaiwgcGF0aCkgaXMgbm90IGZvdW5kXG4gKi9cblxuXG5mdW5jdGlvbiBnZXQob2JqLCBwYXRoLCBmYWxsYmFjaywgcCwgdW5kZWYpIHtcbiAgY29uc3QgcGF0aEFycmF5ID0gcGF0aCAmJiB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoLnNwbGl0KCcuJykgOiBbcGF0aF07XG5cbiAgZm9yIChwID0gMDsgcCA8IHBhdGhBcnJheS5sZW5ndGg7IHArKykge1xuICAgIG9iaiA9IG9iaiA/IG9ialtwYXRoQXJyYXlbcF1dIDogdW5kZWY7XG4gIH1cblxuICBpZiAob2JqID09PSB1bmRlZikgcmV0dXJuIGZhbGxiYWNrO1xuICByZXR1cm4gaGFzRGVmYXVsdChvYmopID8gb2JqW1RIRU1FX1VJX0RFRkFVTFRfS0VZXSA6IG9iajtcbn1cbmNvbnN0IGdldE9iamVjdFdpdGhWYXJpYW50cyA9IChvYmosIHRoZW1lKSA9PiB7XG4gIGlmIChvYmogJiYgb2JqWyd2YXJpYW50J10pIHtcbiAgICBsZXQgcmVzdWx0ID0ge307XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgIGNvbnN0IHggPSBvYmpba2V5XTtcblxuICAgICAgaWYgKGtleSA9PT0gJ3ZhcmlhbnQnKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCh0aGVtZSkgOiB4O1xuICAgICAgICBjb25zdCB2YXJpYW50ID0gZ2V0T2JqZWN0V2l0aFZhcmlhbnRzKGdldCh0aGVtZSwgdmFsKSwgdGhlbWUpO1xuICAgICAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCxcbiAgICAgICAgICAuLi52YXJpYW50XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5XSA9IHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuY29uc3QgZGVmYXVsdEJyZWFrcG9pbnRzID0gWzQwLCA1MiwgNjRdLm1hcChuID0+IG4gKyAnZW0nKTtcbmNvbnN0IGRlZmF1bHRUaGVtZSA9IHtcbiAgc3BhY2U6IFswLCA0LCA4LCAxNiwgMzIsIDY0LCAxMjgsIDI1NiwgNTEyXSxcbiAgZm9udFNpemVzOiBbMTIsIDE0LCAxNiwgMjAsIDI0LCAzMiwgNDgsIDY0LCA3Ml1cbn07XG5jb25zdCBhbGlhc2VzID0ge1xuICBiZzogJ2JhY2tncm91bmRDb2xvcicsXG4gIG06ICdtYXJnaW4nLFxuICBtdDogJ21hcmdpblRvcCcsXG4gIG1yOiAnbWFyZ2luUmlnaHQnLFxuICBtYjogJ21hcmdpbkJvdHRvbScsXG4gIG1sOiAnbWFyZ2luTGVmdCcsXG4gIG14OiAnbWFyZ2luWCcsXG4gIG15OiAnbWFyZ2luWScsXG4gIHA6ICdwYWRkaW5nJyxcbiAgcHQ6ICdwYWRkaW5nVG9wJyxcbiAgcHI6ICdwYWRkaW5nUmlnaHQnLFxuICBwYjogJ3BhZGRpbmdCb3R0b20nLFxuICBwbDogJ3BhZGRpbmdMZWZ0JyxcbiAgcHg6ICdwYWRkaW5nWCcsXG4gIHB5OiAncGFkZGluZ1knXG59O1xuY29uc3QgbXVsdGlwbGVzID0ge1xuICBtYXJnaW5YOiBbJ21hcmdpbkxlZnQnLCAnbWFyZ2luUmlnaHQnXSxcbiAgbWFyZ2luWTogWydtYXJnaW5Ub3AnLCAnbWFyZ2luQm90dG9tJ10sXG4gIHBhZGRpbmdYOiBbJ3BhZGRpbmdMZWZ0JywgJ3BhZGRpbmdSaWdodCddLFxuICBwYWRkaW5nWTogWydwYWRkaW5nVG9wJywgJ3BhZGRpbmdCb3R0b20nXSxcbiAgc2Nyb2xsTWFyZ2luWDogWydzY3JvbGxNYXJnaW5MZWZ0JywgJ3Njcm9sbE1hcmdpblJpZ2h0J10sXG4gIHNjcm9sbE1hcmdpblk6IFsnc2Nyb2xsTWFyZ2luVG9wJywgJ3Njcm9sbE1hcmdpbkJvdHRvbSddLFxuICBzY3JvbGxQYWRkaW5nWDogWydzY3JvbGxQYWRkaW5nTGVmdCcsICdzY3JvbGxQYWRkaW5nUmlnaHQnXSxcbiAgc2Nyb2xsUGFkZGluZ1k6IFsnc2Nyb2xsUGFkZGluZ1RvcCcsICdzY3JvbGxQYWRkaW5nQm90dG9tJ10sXG4gIHNpemU6IFsnd2lkdGgnLCAnaGVpZ2h0J11cbn07XG5jb25zdCBzY2FsZXMgPSB7XG4gIGNvbG9yOiAnY29sb3JzJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnY29sb3JzJyxcbiAgYm9yZGVyQ29sb3I6ICdjb2xvcnMnLFxuICBjYXJldENvbG9yOiAnY29sb3JzJyxcbiAgY29sdW1uUnVsZUNvbG9yOiAnY29sb3JzJyxcbiAgdGV4dERlY29yYXRpb25Db2xvcjogJ2NvbG9ycycsXG4gIG9wYWNpdHk6ICdvcGFjaXRpZXMnLFxuICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbnMnLFxuICBtYXJnaW46ICdzcGFjZScsXG4gIG1hcmdpblRvcDogJ3NwYWNlJyxcbiAgbWFyZ2luUmlnaHQ6ICdzcGFjZScsXG4gIG1hcmdpbkJvdHRvbTogJ3NwYWNlJyxcbiAgbWFyZ2luTGVmdDogJ3NwYWNlJyxcbiAgbWFyZ2luWDogJ3NwYWNlJyxcbiAgbWFyZ2luWTogJ3NwYWNlJyxcbiAgbWFyZ2luQmxvY2s6ICdzcGFjZScsXG4gIG1hcmdpbkJsb2NrRW5kOiAnc3BhY2UnLFxuICBtYXJnaW5CbG9ja1N0YXJ0OiAnc3BhY2UnLFxuICBtYXJnaW5JbmxpbmU6ICdzcGFjZScsXG4gIG1hcmdpbklubGluZUVuZDogJ3NwYWNlJyxcbiAgbWFyZ2luSW5saW5lU3RhcnQ6ICdzcGFjZScsXG4gIHBhZGRpbmc6ICdzcGFjZScsXG4gIHBhZGRpbmdUb3A6ICdzcGFjZScsXG4gIHBhZGRpbmdSaWdodDogJ3NwYWNlJyxcbiAgcGFkZGluZ0JvdHRvbTogJ3NwYWNlJyxcbiAgcGFkZGluZ0xlZnQ6ICdzcGFjZScsXG4gIHBhZGRpbmdYOiAnc3BhY2UnLFxuICBwYWRkaW5nWTogJ3NwYWNlJyxcbiAgcGFkZGluZ0Jsb2NrOiAnc3BhY2UnLFxuICBwYWRkaW5nQmxvY2tFbmQ6ICdzcGFjZScsXG4gIHBhZGRpbmdCbG9ja1N0YXJ0OiAnc3BhY2UnLFxuICBwYWRkaW5nSW5saW5lOiAnc3BhY2UnLFxuICBwYWRkaW5nSW5saW5lRW5kOiAnc3BhY2UnLFxuICBwYWRkaW5nSW5saW5lU3RhcnQ6ICdzcGFjZScsXG4gIHNjcm9sbE1hcmdpbjogJ3NwYWNlJyxcbiAgc2Nyb2xsTWFyZ2luVG9wOiAnc3BhY2UnLFxuICBzY3JvbGxNYXJnaW5SaWdodDogJ3NwYWNlJyxcbiAgc2Nyb2xsTWFyZ2luQm90dG9tOiAnc3BhY2UnLFxuICBzY3JvbGxNYXJnaW5MZWZ0OiAnc3BhY2UnLFxuICBzY3JvbGxNYXJnaW5YOiAnc3BhY2UnLFxuICBzY3JvbGxNYXJnaW5ZOiAnc3BhY2UnLFxuICBzY3JvbGxQYWRkaW5nOiAnc3BhY2UnLFxuICBzY3JvbGxQYWRkaW5nVG9wOiAnc3BhY2UnLFxuICBzY3JvbGxQYWRkaW5nUmlnaHQ6ICdzcGFjZScsXG4gIHNjcm9sbFBhZGRpbmdCb3R0b206ICdzcGFjZScsXG4gIHNjcm9sbFBhZGRpbmdMZWZ0OiAnc3BhY2UnLFxuICBzY3JvbGxQYWRkaW5nWDogJ3NwYWNlJyxcbiAgc2Nyb2xsUGFkZGluZ1k6ICdzcGFjZScsXG4gIGluc2V0OiAnc3BhY2UnLFxuICBpbnNldEJsb2NrOiAnc3BhY2UnLFxuICBpbnNldEJsb2NrRW5kOiAnc3BhY2UnLFxuICBpbnNldEJsb2NrU3RhcnQ6ICdzcGFjZScsXG4gIGluc2V0SW5saW5lOiAnc3BhY2UnLFxuICBpbnNldElubGluZUVuZDogJ3NwYWNlJyxcbiAgaW5zZXRJbmxpbmVTdGFydDogJ3NwYWNlJyxcbiAgdG9wOiAnc3BhY2UnLFxuICByaWdodDogJ3NwYWNlJyxcbiAgYm90dG9tOiAnc3BhY2UnLFxuICBsZWZ0OiAnc3BhY2UnLFxuICBncmlkR2FwOiAnc3BhY2UnLFxuICBncmlkQ29sdW1uR2FwOiAnc3BhY2UnLFxuICBncmlkUm93R2FwOiAnc3BhY2UnLFxuICBnYXA6ICdzcGFjZScsXG4gIGNvbHVtbkdhcDogJ3NwYWNlJyxcbiAgcm93R2FwOiAnc3BhY2UnLFxuICBmb250RmFtaWx5OiAnZm9udHMnLFxuICBmb250U2l6ZTogJ2ZvbnRTaXplcycsXG4gIGZvbnRXZWlnaHQ6ICdmb250V2VpZ2h0cycsXG4gIGxpbmVIZWlnaHQ6ICdsaW5lSGVpZ2h0cycsXG4gIGxldHRlclNwYWNpbmc6ICdsZXR0ZXJTcGFjaW5ncycsXG4gIGJvcmRlcjogJ2JvcmRlcnMnLFxuICBib3JkZXJUb3A6ICdib3JkZXJzJyxcbiAgYm9yZGVyUmlnaHQ6ICdib3JkZXJzJyxcbiAgYm9yZGVyQm90dG9tOiAnYm9yZGVycycsXG4gIGJvcmRlckxlZnQ6ICdib3JkZXJzJyxcbiAgYm9yZGVyV2lkdGg6ICdib3JkZXJXaWR0aHMnLFxuICBib3JkZXJTdHlsZTogJ2JvcmRlclN0eWxlcycsXG4gIGJvcmRlclJhZGl1czogJ3JhZGlpJyxcbiAgYm9yZGVyVG9wUmlnaHRSYWRpdXM6ICdyYWRpaScsXG4gIGJvcmRlclRvcExlZnRSYWRpdXM6ICdyYWRpaScsXG4gIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAncmFkaWknLFxuICBib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiAncmFkaWknLFxuICBib3JkZXJUb3BXaWR0aDogJ2JvcmRlcldpZHRocycsXG4gIGJvcmRlclRvcENvbG9yOiAnY29sb3JzJyxcbiAgYm9yZGVyVG9wU3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJCb3R0b21XaWR0aDogJ2JvcmRlcldpZHRocycsXG4gIGJvcmRlckJvdHRvbUNvbG9yOiAnY29sb3JzJyxcbiAgYm9yZGVyQm90dG9tU3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJMZWZ0V2lkdGg6ICdib3JkZXJXaWR0aHMnLFxuICBib3JkZXJMZWZ0Q29sb3I6ICdjb2xvcnMnLFxuICBib3JkZXJMZWZ0U3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJSaWdodFdpZHRoOiAnYm9yZGVyV2lkdGhzJyxcbiAgYm9yZGVyUmlnaHRDb2xvcjogJ2NvbG9ycycsXG4gIGJvcmRlclJpZ2h0U3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJCbG9jazogJ2JvcmRlcnMnLFxuICBib3JkZXJCbG9ja0NvbG9yOiAnY29sb3JzJyxcbiAgYm9yZGVyQmxvY2tFbmQ6ICdib3JkZXJzJyxcbiAgYm9yZGVyQmxvY2tFbmRDb2xvcjogJ2NvbG9ycycsXG4gIGJvcmRlckJsb2NrRW5kU3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJCbG9ja0VuZFdpZHRoOiAnYm9yZGVyV2lkdGhzJyxcbiAgYm9yZGVyQmxvY2tTdGFydDogJ2JvcmRlcnMnLFxuICBib3JkZXJCbG9ja1N0YXJ0Q29sb3I6ICdjb2xvcnMnLFxuICBib3JkZXJCbG9ja1N0YXJ0U3R5bGU6ICdib3JkZXJTdHlsZXMnLFxuICBib3JkZXJCbG9ja1N0YXJ0V2lkdGg6ICdib3JkZXJXaWR0aHMnLFxuICBib3JkZXJCbG9ja1N0eWxlOiAnYm9yZGVyU3R5bGVzJyxcbiAgYm9yZGVyQmxvY2tXaWR0aDogJ2JvcmRlcldpZHRocycsXG4gIGJvcmRlckVuZEVuZFJhZGl1czogJ3JhZGlpJyxcbiAgYm9yZGVyRW5kU3RhcnRSYWRpdXM6ICdyYWRpaScsXG4gIGJvcmRlcklubGluZTogJ2JvcmRlcnMnLFxuICBib3JkZXJJbmxpbmVDb2xvcjogJ2NvbG9ycycsXG4gIGJvcmRlcklubGluZUVuZDogJ2JvcmRlcnMnLFxuICBib3JkZXJJbmxpbmVFbmRDb2xvcjogJ2NvbG9ycycsXG4gIGJvcmRlcklubGluZUVuZFN0eWxlOiAnYm9yZGVyU3R5bGVzJyxcbiAgYm9yZGVySW5saW5lRW5kV2lkdGg6ICdib3JkZXJXaWR0aHMnLFxuICBib3JkZXJJbmxpbmVTdGFydDogJ2JvcmRlcnMnLFxuICBib3JkZXJJbmxpbmVTdGFydENvbG9yOiAnY29sb3JzJyxcbiAgYm9yZGVySW5saW5lU3RhcnRTdHlsZTogJ2JvcmRlclN0eWxlcycsXG4gIGJvcmRlcklubGluZVN0YXJ0V2lkdGg6ICdib3JkZXJXaWR0aHMnLFxuICBib3JkZXJJbmxpbmVTdHlsZTogJ2JvcmRlclN0eWxlcycsXG4gIGJvcmRlcklubGluZVdpZHRoOiAnYm9yZGVyV2lkdGhzJyxcbiAgYm9yZGVyU3RhcnRFbmRSYWRpdXM6ICdyYWRpaScsXG4gIGJvcmRlclN0YXJ0U3RhcnRSYWRpdXM6ICdyYWRpaScsXG4gIGNvbHVtblJ1bGVXaWR0aDogJ2JvcmRlcldpZHRocycsXG4gIG91dGxpbmVDb2xvcjogJ2NvbG9ycycsXG4gIGJveFNoYWRvdzogJ3NoYWRvd3MnLFxuICB0ZXh0U2hhZG93OiAnc2hhZG93cycsXG4gIHpJbmRleDogJ3pJbmRpY2VzJyxcbiAgd2lkdGg6ICdzaXplcycsXG4gIG1pbldpZHRoOiAnc2l6ZXMnLFxuICBtYXhXaWR0aDogJ3NpemVzJyxcbiAgaGVpZ2h0OiAnc2l6ZXMnLFxuICBtaW5IZWlnaHQ6ICdzaXplcycsXG4gIG1heEhlaWdodDogJ3NpemVzJyxcbiAgZmxleEJhc2lzOiAnc2l6ZXMnLFxuICBzaXplOiAnc2l6ZXMnLFxuICBibG9ja1NpemU6ICdzaXplcycsXG4gIGlubGluZVNpemU6ICdzaXplcycsXG4gIG1heEJsb2NrU2l6ZTogJ3NpemVzJyxcbiAgbWF4SW5saW5lU2l6ZTogJ3NpemVzJyxcbiAgbWluQmxvY2tTaXplOiAnc2l6ZXMnLFxuICBtaW5JbmxpbmVTaXplOiAnc2l6ZXMnLFxuICBjb2x1bW5XaWR0aDogJ3NpemVzJyxcbiAgLy8gc3ZnXG4gIGZpbGw6ICdjb2xvcnMnLFxuICBzdHJva2U6ICdjb2xvcnMnXG59O1xuXG5jb25zdCBwb3NpdGl2ZU9yTmVnYXRpdmUgPSAoc2NhbGUsIHZhbHVlKSA9PiB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHZhbHVlID49IDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIGNvbnN0IHZhbHVlV2l0aG91dE1pbnVzID0gdmFsdWUuc3Vic3RyaW5nKDEpO1xuICAgICAgY29uc3QgbiA9IGdldChzY2FsZSwgdmFsdWVXaXRob3V0TWludXMsIHZhbHVlV2l0aG91dE1pbnVzKTtcblxuICAgICAgaWYgKHR5cGVvZiBuID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gbiAqIC0xO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYC0ke259YDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0KHNjYWxlLCB2YWx1ZSwgdmFsdWUpO1xuICB9XG5cbiAgY29uc3QgYWJzb2x1dGUgPSBNYXRoLmFicyh2YWx1ZSk7XG4gIGNvbnN0IG4gPSBnZXQoc2NhbGUsIGFic29sdXRlLCBhYnNvbHV0ZSk7XG4gIGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycpIHJldHVybiAnLScgKyBuO1xuICByZXR1cm4gTnVtYmVyKG4pICogLTE7XG59O1xuXG5jb25zdCB0cmFuc2Zvcm1zID0gWydtYXJnaW4nLCAnbWFyZ2luVG9wJywgJ21hcmdpblJpZ2h0JywgJ21hcmdpbkJvdHRvbScsICdtYXJnaW5MZWZ0JywgJ21hcmdpblgnLCAnbWFyZ2luWScsICdtYXJnaW5CbG9jaycsICdtYXJnaW5CbG9ja0VuZCcsICdtYXJnaW5CbG9ja1N0YXJ0JywgJ21hcmdpbklubGluZScsICdtYXJnaW5JbmxpbmVFbmQnLCAnbWFyZ2luSW5saW5lU3RhcnQnLCAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0J10ucmVkdWNlKChhY2MsIGN1cnIpID0+ICh7IC4uLmFjYyxcbiAgW2N1cnJdOiBwb3NpdGl2ZU9yTmVnYXRpdmVcbn0pLCB7fSk7XG5cbmNvbnN0IHJlc3BvbnNpdmUgPSBzdHlsZXMgPT4gdGhlbWUgPT4ge1xuICBjb25zdCBuZXh0ID0ge307XG4gIGNvbnN0IGJyZWFrcG9pbnRzID0gdGhlbWUgJiYgdGhlbWUuYnJlYWtwb2ludHMgfHwgZGVmYXVsdEJyZWFrcG9pbnRzO1xuICBjb25zdCBtZWRpYVF1ZXJpZXMgPSBbbnVsbCwgLi4uYnJlYWtwb2ludHMubWFwKG4gPT4gbi5pbmNsdWRlcygnQG1lZGlhJykgPyBuIDogYEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7bn0pYCldO1xuXG4gIGZvciAoY29uc3QgayBpbiBzdHlsZXMpIHtcbiAgICBjb25zdCBrZXkgPSBrO1xuICAgIGxldCB2YWx1ZSA9IHN0eWxlc1trZXldO1xuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZSh0aGVtZSB8fCB7fSk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBuZXh0W2tleV0gPSB2YWx1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUuc2xpY2UoMCwgbWVkaWFRdWVyaWVzLmxlbmd0aCkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG1lZGlhID0gbWVkaWFRdWVyaWVzW2ldO1xuXG4gICAgICBpZiAoIW1lZGlhKSB7XG4gICAgICAgIG5leHRba2V5XSA9IHZhbHVlW2ldO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbmV4dFttZWRpYV0gPSBuZXh0W21lZGlhXSB8fCB7fTtcbiAgICAgIGlmICh2YWx1ZVtpXSA9PSBudWxsKSBjb250aW51ZTtcbiAgICAgIG5leHRbbWVkaWFdW2tleV0gPSB2YWx1ZVtpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dDtcbn07XG5cbmNvbnN0IGNzcyA9IChhcmdzID0ge30pID0+IChwcm9wcyA9IHt9KSA9PiB7XG4gIGNvbnN0IHRoZW1lID0geyAuLi5kZWZhdWx0VGhlbWUsXG4gICAgLi4uKCd0aGVtZScgaW4gcHJvcHMgPyBwcm9wcy50aGVtZSA6IHByb3BzKVxuICB9OyAvLyBpbnNlcnQgdmFyaWFudCBwcm9wcyBiZWZvcmUgcmVzcG9uc2l2ZSBzdHlsZXMsIHNvIHRoZXkgY2FuIGJlIG1lcmdlZFxuICAvLyB3ZSBuZWVkIHRvIG1haW50YWluIG9yZGVyIG9mIHRoZSBzdHlsZSBwcm9wcywgc28gaWYgYSB2YXJpYW50IGlzIHBsYWNlIGluIHRoZSBtaWRkbGVcbiAgLy8gb2Ygb3RoZXIgcHJvcHMsIGl0IHdpbGwgZXh0ZW5kcyBpdHMgcHJvcHMgYXQgdGhhdCBzYW1lIGxvY2F0aW9uIG9yZGVyLlxuXG4gIGNvbnN0IG9iaiA9IGdldE9iamVjdFdpdGhWYXJpYW50cyh0eXBlb2YgYXJncyA9PT0gJ2Z1bmN0aW9uJyA/IGFyZ3ModGhlbWUpIDogYXJncywgdGhlbWUpO1xuICBjb25zdCBzdHlsZXMgPSByZXNwb25zaXZlKG9iaikodGhlbWUpO1xuICBsZXQgcmVzdWx0ID0ge307XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGVzKSB7XG4gICAgY29uc3QgeCA9IHN0eWxlc1trZXldO1xuICAgIGNvbnN0IHZhbCA9IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nID8geCh0aGVtZSkgOiB4O1xuXG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGhhc0RlZmF1bHQodmFsKSkge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbFtUSEVNRV9VSV9ERUZBVUxUX0tFWV07XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSAvLyBPbiB0eXBlIGxldmVsLCB2YWwgY2FuIGFsc28gYmUgYW4gYXJyYXkgaGVyZSxcbiAgICAgIC8vIGJ1dCB3ZSB0cmFuc2Zvcm0gYWxsIGFycmF5cyBpbiBgcmVzcG9uc2l2ZWAgZnVuY3Rpb24uXG5cblxuICAgICAgcmVzdWx0W2tleV0gPSBjc3ModmFsKSh0aGVtZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9wID0ga2V5IGluIGFsaWFzZXMgPyBhbGlhc2VzW2tleV0gOiBrZXk7XG4gICAgY29uc3Qgc2NhbGVOYW1lID0gcHJvcCBpbiBzY2FsZXMgPyBzY2FsZXNbcHJvcF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2NhbGUgPSBzY2FsZU5hbWUgPyB0aGVtZSA9PSBudWxsID8gdm9pZCAwIDogdGhlbWVbc2NhbGVOYW1lXSA6IGdldCh0aGVtZSwgcHJvcCwge30pO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGdldCh0cmFuc2Zvcm1zLCBwcm9wLCBnZXQpO1xuICAgIGNvbnN0IHZhbHVlID0gdHJhbnNmb3JtKHNjYWxlLCB2YWwsIHZhbCk7XG5cbiAgICBpZiAocHJvcCBpbiBtdWx0aXBsZXMpIHtcbiAgICAgIGNvbnN0IGRpcnMgPSBtdWx0aXBsZXNbcHJvcF07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRbZGlyc1tpXV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCB7IFRIRU1FX1VJX0RFRkFVTFRfS0VZLCBjc3MsIGRlZmF1bHRCcmVha3BvaW50cywgZ2V0LCBnZXRPYmplY3RXaXRoVmFyaWFudHMsIG11bHRpcGxlcywgc2NhbGVzIH07XG4iLCJpbXBvcnQgeyBqc3ggfSBmcm9tICdAdGhlbWUtdWkvY29yZSc7XG5pbXBvcnQgeyBjc3MsIGdldCB9IGZyb20gJ0B0aGVtZS11aS9jc3MnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCBjcmVhdGVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgdXNlTURYQ29tcG9uZW50cywgTURYUHJvdmlkZXIgYXMgTURYUHJvdmlkZXIkMSB9IGZyb20gJ0BtZHgtanMvcmVhY3QnO1xuXG4vLyBtZHggY29tcG9uZW50c1xuY29uc3QgdGFncyA9IFsncCcsICdiJywgJ2knLCAnYScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdpbWcnLCAncHJlJywgJ2NvZGUnLCAnb2wnLCAndWwnLCAnbGknLCAnYmxvY2txdW90ZScsICdocicsICdlbScsICd0YWJsZScsICd0cicsICd0aCcsICd0ZCcsICdlbScsICdzdHJvbmcnLCAnZGVsJywgLy8gbWR4XG4naW5saW5lQ29kZScsICd0aGVtYXRpY0JyZWFrJywgLy8gb3RoZXJcbidkaXYnLCAvLyB0aGVtZS11aVxuJ3Jvb3QnXTtcbmNvbnN0IGFsaWFzZXMgPSB7XG4gIGlubGluZUNvZGU6ICdjb2RlJyxcbiAgdGhlbWF0aWNCcmVhazogJ2hyJyxcbiAgcm9vdDogJ2Rpdidcbn07XG5cbmNvbnN0IGlzQWxpYXMgPSB4ID0+IHggaW4gYWxpYXNlcztcblxuY29uc3QgYWxpYXMgPSBuID0+IGlzQWxpYXMobikgPyBhbGlhc2VzW25dIDogbjtcblxuY29uc3QgcHJvcE92ZXJyaWRlcyA9IHtcbiAgdGg6IHtcbiAgICBhbGlnbjogJ3RleHRBbGlnbidcbiAgfSxcbiAgdGQ6IHtcbiAgICBhbGlnbjogJ3RleHRBbGlnbidcbiAgfVxufTtcbmNvbnN0IHRoZW1lZCA9IGtleSA9PiAoe1xuICB0aGVtZSxcbiAgLi4ucmVzdFxufSkgPT4ge1xuICBjb25zdCBwcm9wc1N0eWxlID0gcHJvcE92ZXJyaWRlc1trZXldO1xuICBjb25zdCBleHRyYVN0eWxlcyA9IHByb3BzU3R5bGUgPyBPYmplY3Qua2V5cyhyZXN0KS5maWx0ZXIocHJvcCA9PiBwcm9wc1N0eWxlW3Byb3BdICE9PSB1bmRlZmluZWQpLnJlZHVjZSgoYWNjLCBwcm9wKSA9PiAoeyAuLi5hY2MsXG4gICAgW3Byb3BzU3R5bGVbcHJvcF1dOiByZXN0W3Byb3BdXG4gIH0pLCB7fSkgOiB1bmRlZmluZWQ7XG4gIHJldHVybiBjc3MoeyAuLi5nZXQodGhlbWUsIGBzdHlsZXMuJHtrZXl9YCksXG4gICAgLi4uZXh0cmFTdHlsZXNcbiAgfSkodGhlbWUpO1xufTsgLy8gb3B0IG91dCBvZiB0eXBlY2hlY2tpbmcgd2hlbmV2ZXIgYGFzYCBwcm9wIGlzIHVzZWRcblxuY29uc3QgVGhlbWVkID0gc3R5bGVkKCdkaXYnKSh0aGVtZWQoJ2RpdicpKTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgMC42LjAuXG4gKlxuICogYFN0eWxlZGAgd2FzIHJlbmFtZWQgdG8gYFRoZW1lZGAgdG8gYXZvaWQgY29uZnVzaW9uIHdpdGggc3R5bGVkIGNvbXBvbmVudHMuXG4gKi9cblxuY29uc3QgU3R5bGVkID0gc3R5bGVkKCdkaXYnKSh0aGVtZWQoJ2RpdicpKTtcblxuY29uc3Qgd2FyblN0eWxlZCA9IHRhZyA9PiBwcm9wcyA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignW3RoZW1lLXVpXSBUaGUgU3R5bGVkIGNvbXBvbmVudCBmcm9tIFwiQHRoZW1lLXVpL21keFwiIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uLiBJdCBoYXMgYmVlbiByZW5hbWVkIHRvIFRoZW1lZCB3aXRoIHRoZSBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH0sIFtdKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9jcmVhdGVFbGVtZW50KGFsaWFzKHRhZyksIHByb3BzKTtcbn07XG5cbmNvbnN0IGNvbXBvbmVudHMgPSB7fTtcbnRhZ3MuZm9yRWFjaCh0YWcgPT4ge1xuICAvLyBmaXhtZT9cbiAgY29tcG9uZW50c1t0YWddID0gc3R5bGVkKGFsaWFzKHRhZykpKHRoZW1lZCh0YWcpKTtcbiAgVGhlbWVkW3RhZ10gPSBjb21wb25lbnRzW3RhZ107XG4gIFN0eWxlZFt0YWddID0gc3R5bGVkKHdhcm5TdHlsZWQodGFnKSkodGhlbWVkKHRhZykpO1xufSk7XG5cbmNvbnN0IGNyZWF0ZUNvbXBvbmVudHMgPSBjb21wcyA9PiB7XG4gIGNvbnN0IG5leHQgPSB7IC4uLmNvbXBvbmVudHNcbiAgfTtcbiAgY29uc3QgY29tcG9uZW50S2V5cyA9IE9iamVjdC5rZXlzKGNvbXBzKTtcbiAgY29tcG9uZW50S2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgbmV4dFtrZXldID0gc3R5bGVkKGNvbXBzW2tleV0pKHRoZW1lZChrZXkpKTtcbiAgfSk7XG4gIHJldHVybiBuZXh0O1xufTtcblxuY29uc3QgTURYUHJvdmlkZXIgPSAoe1xuICBjb21wb25lbnRzLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBvdXRlciA9IHVzZU1EWENvbXBvbmVudHMoKTtcbiAgcmV0dXJuIGpzeChNRFhQcm92aWRlciQxLCB7XG4gICAgY29tcG9uZW50czogY3JlYXRlQ29tcG9uZW50cyh7IC4uLm91dGVyLFxuICAgICAgLi4uY29tcG9uZW50c1xuICAgIH0pLFxuICAgIGNoaWxkcmVuXG4gIH0pO1xufTtcblxuZXhwb3J0IHsgTURYUHJvdmlkZXIsIFN0eWxlZCwgVGhlbWVkLCBjb21wb25lbnRzLCB0aGVtZWQgfTtcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ0B0aGVtZS11aS9jc3MnO1xuXG5jb25zdCBnZXRDU1MgPSBwcm9wcyA9PiB0aGVtZSA9PiB7XG4gIGNvbnN0IHN0eWxlcyA9IGNzcyhwcm9wcy5zeCkodGhlbWUpO1xuICBjb25zdCByYXcgPSB0eXBlb2YgcHJvcHMuY3NzID09PSAnZnVuY3Rpb24nID8gcHJvcHMuY3NzKHRoZW1lKSA6IHByb3BzLmNzcztcbiAgcmV0dXJuIFtzdHlsZXMsIHJhd107XG59O1xuXG5jb25zdCBwYXJzZVByb3BzID0gcHJvcHMgPT4ge1xuICBpZiAoIXByb3BzIHx8ICFwcm9wcy5zeCAmJiAhcHJvcHMuY3NzKSByZXR1cm4gcHJvcHM7XG4gIGNvbnN0IG5leHQgPSB7fTtcblxuICBmb3IgKGxldCBrZXkgaW4gcHJvcHMpIHtcbiAgICBpZiAoa2V5ID09PSAnc3gnKSBjb250aW51ZTtcbiAgICBuZXh0W2tleV0gPSBwcm9wc1trZXldO1xuICB9XG5cbiAgbmV4dC5jc3MgPSBnZXRDU1MocHJvcHMpO1xuICByZXR1cm4gbmV4dDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlUHJvcHM7XG4iLCJjb25zdCBoZWFkaW5nID0ge1xuICBjb2xvcjogJ3RleHQnLFxuICBmb250RmFtaWx5OiAnaGVhZGluZycsXG4gIGxpbmVIZWlnaHQ6ICdoZWFkaW5nJyxcbiAgZm9udFdlaWdodDogJ2hlYWRpbmcnXG59O1xuY29uc3QgYmFzZSA9IHtcbiAgc3BhY2U6IFswLCA0LCA4LCAxNiwgMzIsIDY0LCAxMjgsIDI1NiwgNTEyXSxcbiAgZm9udHM6IHtcbiAgICBib2R5OiAnc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWYnLFxuICAgIGhlYWRpbmc6ICdpbmhlcml0JyxcbiAgICBtb25vc3BhY2U6ICdNZW5sbywgbW9ub3NwYWNlJ1xuICB9LFxuICBmb250U2l6ZXM6IFsxMiwgMTQsIDE2LCAyMCwgMjQsIDMyLCA0OCwgNjQsIDk2XSxcbiAgZm9udFdlaWdodHM6IHtcbiAgICBib2R5OiA0MDAsXG4gICAgaGVhZGluZzogNzAwLFxuICAgIGJvbGQ6IDcwMFxuICB9LFxuICBsaW5lSGVpZ2h0czoge1xuICAgIGJvZHk6IDEuNSxcbiAgICBoZWFkaW5nOiAxLjEyNVxuICB9LFxuICBjb2xvcnM6IHtcbiAgICB0ZXh0OiAnIzAwMCcsXG4gICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgIHByaW1hcnk6ICcjMDdjJyxcbiAgICBzZWNvbmRhcnk6ICcjMzBjJyxcbiAgICBtdXRlZDogJyNmNmY2ZjYnXG4gIH0sXG4gIHN0eWxlczoge1xuICAgIHJvb3Q6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdib2R5JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICdib2R5JyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2R5J1xuICAgIH0sXG4gICAgaDE6IHsgLi4uaGVhZGluZyxcbiAgICAgIGZvbnRTaXplOiA1XG4gICAgfSxcbiAgICBoMjogeyAuLi5oZWFkaW5nLFxuICAgICAgZm9udFNpemU6IDRcbiAgICB9LFxuICAgIGgzOiB7IC4uLmhlYWRpbmcsXG4gICAgICBmb250U2l6ZTogM1xuICAgIH0sXG4gICAgaDQ6IHsgLi4uaGVhZGluZyxcbiAgICAgIGZvbnRTaXplOiAyXG4gICAgfSxcbiAgICBoNTogeyAuLi5oZWFkaW5nLFxuICAgICAgZm9udFNpemU6IDFcbiAgICB9LFxuICAgIGg2OiB7IC4uLmhlYWRpbmcsXG4gICAgICBmb250U2l6ZTogMFxuICAgIH0sXG4gICAgcDoge1xuICAgICAgY29sb3I6ICd0ZXh0JyxcbiAgICAgIGZvbnRGYW1pbHk6ICdib2R5JyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2R5JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICdib2R5J1xuICAgIH0sXG4gICAgYToge1xuICAgICAgY29sb3I6ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgcHJlOiB7XG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIG92ZXJmbG93WDogJ2F1dG8nLFxuICAgICAgY29kZToge1xuICAgICAgICBjb2xvcjogJ2luaGVyaXQnXG4gICAgICB9XG4gICAgfSxcbiAgICBjb2RlOiB7XG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCdcbiAgICB9LFxuICAgIHRhYmxlOiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgYm9yZGVyQ29sbGFwc2U6ICdzZXBhcmF0ZScsXG4gICAgICBib3JkZXJTcGFjaW5nOiAwXG4gICAgfSxcbiAgICB0aDoge1xuICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJ1xuICAgIH0sXG4gICAgdGQ6IHtcbiAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgYm9yZGVyQm90dG9tU3R5bGU6ICdzb2xpZCdcbiAgICB9LFxuICAgIGltZzoge1xuICAgICAgbWF4V2lkdGg6ICcxMDAlJ1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZTtcbmV4cG9ydCB7IGJhc2UgfTtcbiIsImNvbnN0IGJhc2VDb2xvcnMgPSB7XG4gIHdoaXRlOiAnI2ZmZicsXG4gIGJsYWNrOiAnIzAwMCcsXG4gIGdyYXk6IFsnI2ZmZicsIC8vIDAgaW5kZXhcbiAgJyNmOGY5ZmEnLCAnI2U5ZWNlZicsICcjZGVlMmU2JywgJyNjZWQ0ZGEnLCAnI2FkYjViZCcsICcjNmM3NTdkJywgJyM0OTUwNTcnLCAnIzM0M2E0MCcsICcjMjEyNTI5J10sXG4gIGJsdWU6ICcjMDA3YmZmJyxcbiAgaW5kaWdvOiAnIzY2MTBmMicsXG4gIHB1cnBsZTogJyM2ZjQyYzEnLFxuICBwaW5rOiAnI2U4M2U4YycsXG4gIHJlZDogJyNkYzM1NDUnLFxuICBvcmFuZ2U6ICcjZmQ3ZTE0JyxcbiAgeWVsbG93OiAnI2ZmYzEwNycsXG4gIGdyZWVuOiAnIzI4YTc0NScsXG4gIHRlYWw6ICcjMjBjOTk3JyxcbiAgY3lhbjogJyMxN2EyYjgnIC8vIGdyYXk6IGdyYXlbNl0sXG5cbn07XG5jb25zdCBjb2xvcnMgPSB7IC4uLmJhc2VDb2xvcnMsXG4gIGdyYXlEYXJrOiBiYXNlQ29sb3JzLmdyYXlbOF0sXG4gIHRleHQ6IGJhc2VDb2xvcnMuZ3JheVs5XSxcbiAgYmFja2dyb3VuZDogYmFzZUNvbG9ycy53aGl0ZSxcbiAgcHJpbWFyeTogYmFzZUNvbG9ycy5ibHVlLFxuICBzZWNvbmRhcnk6IGJhc2VDb2xvcnMuZ3JheVs2XSxcbiAgbXV0ZWQ6IGJhc2VDb2xvcnMuZ3JheVszXSxcbiAgc3VjY2VzczogYmFzZUNvbG9ycy5ncmVlbixcbiAgaW5mbzogYmFzZUNvbG9ycy5jeWFuLFxuICB3YXJuaW5nOiBiYXNlQ29sb3JzLnllbGxvdyxcbiAgZGFuZ2VyOiBiYXNlQ29sb3JzLnJlZCxcbiAgbGlnaHQ6IGJhc2VDb2xvcnMuZ3JheVsxXSxcbiAgZGFyazogYmFzZUNvbG9ycy5ncmF5WzhdLFxuICB0ZXh0TXV0ZWQ6IGJhc2VDb2xvcnMuZ3JheVs2XVxufTtcbmNvbnN0IHNwYWNlID0gWzAsIDAuMjUsIDAuNSwgMSwgMS41LCAzXS5tYXAobiA9PiBuICsgJ3JlbScpO1xuY29uc3QgYnJlYWtwb2ludHMgPSBbJzU3NnB4JywgJzc2OHB4JywgJzk5MnB4JywgJzEyMDBweCddO1xuY29uc3QgZm9udHMgPSB7XG4gIGJvZHk6ICctYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBcIk5vdG8gU2Fuc1wiLCBzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIiwgXCJOb3RvIENvbG9yIEVtb2ppXCInLFxuICBoZWFkaW5nOiAnaW5oZXJpdCcsXG4gIG1vbm9zcGFjZTogJ1NGTW9uby1SZWd1bGFyLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgXCJMaWJlcmF0aW9uIE1vbm9cIiwgXCJDb3VyaWVyIE5ld1wiLCBtb25vc3BhY2UnLFxuICAvLyBOT1RFKEBteHN0YnIpOiBUeXBlU2NyaXB0IGRvZXMgbm90IGxldCB1cyBkbyB0aGUgc2VsZi1yZWZlcmVuY2VzIGJlbG93IGlmIHdlIGRvbid0IHByb3ZpZGUgXCJkZWZhdWx0XCIgdmFsdWVzXG4gIHNhbnM6ICcnXG59O1xuZm9udHMuc2FucyA9IGZvbnRzLmJvZHk7XG5jb25zdCBmb250V2VpZ2h0cyA9IHtcbiAgYm9keTogNDAwLFxuICBoZWFkaW5nOiA1MDAsXG4gIGJvbGQ6IDcwMCxcbiAgbGlnaHQ6IDMwMCxcbiAgLy8gTk9URShAbXhzdGJyKTogVHlwZVNjcmlwdCBkb2VzIG5vdCBsZXQgdXMgZG8gdGhlIHNlbGYtcmVmZXJlbmNlcyBiZWxvdyBpZiB3ZSBkb24ndCBwcm92aWRlIFwiZGVmYXVsdFwiIHZhbHVlc1xuICBub3JtYWw6IDAsXG4gIGRpc3BsYXk6IDBcbn07XG5mb250V2VpZ2h0cy5ub3JtYWwgPSBmb250V2VpZ2h0cy5ib2R5O1xuZm9udFdlaWdodHMuZGlzcGxheSA9IGZvbnRXZWlnaHRzLmxpZ2h0O1xuY29uc3QgZm9udFNpemVzID0gWycwLjc1cmVtJywgLy8gJzgwJScsXG4nMC44NzVyZW0nLCAnMXJlbScsICcxLjI1cmVtJywgJzEuNXJlbScsICcxLjc1cmVtJywgJzJyZW0nLCAnMi41cmVtJywgJzMuNXJlbScsICc0LjVyZW0nLCAnNS41cmVtJywgJzZyZW0nXTtcbmZvbnRTaXplcy5sZWFkID0gZm9udFNpemVzWzNdO1xuY29uc3QgbGluZUhlaWdodHMgPSB7XG4gIGJvZHk6IDEuNSxcbiAgaGVhZGluZzogMS4yXG59O1xuY29uc3Qgc2l6ZXMgPSB7XG4gIC8vIGNvbnRhaW5lciB3aWR0aHNcbiAgc206IDU0MCxcbiAgbWQ6IDcyMCxcbiAgbGc6IDk2MCxcbiAgeGw6IDExNDBcbn07XG5jb25zdCByYWRpaSA9IHtcbiAgZGVmYXVsdDogJzAuMjVyZW0nLFxuICBzbTogJzAuMnJlbScsXG4gIGxnOiAnMC4zcmVtJyxcbiAgcGlsbDogJzUwcmVtJ1xufTtcbmNvbnN0IHNoYWRvd3MgPSB7XG4gIGRlZmF1bHQ6ICcwIC41cmVtIDFyZW0gcmdiYSgwLCAwLCAwLCAuMTUpJyxcbiAgc206ICcwIC4xMjVyZW0gLjI1cmVtIHJnYmEoMCwgMCwgMCwgLjA3NSknLFxuICBsZzogJzAgMXJlbSAzcmVtIHJnYmEoMCwgMCwgMCwgLjE3NSknXG59O1xuY29uc3QgaGVhZGluZyA9IHtcbiAgZm9udEZhbWlseTogJ2hlYWRpbmcnLFxuICBmb250V2VpZ2h0OiAnaGVhZGluZycsXG4gIGxpbmVIZWlnaHQ6ICdoZWFkaW5nJyxcbiAgbXQ6IDAsXG4gIG1iOiAyXG59O1xuY29uc3QgZGlzcGxheSA9IHtcbiAgZm9udFdlaWdodDogJ2Rpc3BsYXknLFxuICBsaW5lSGVpZ2h0OiAnaGVhZGluZydcbn07IC8vIHZhcmlhbnRzXG5cbmNvbnN0IHR5cGVTdHlsZXMgPSB7XG4gIGhlYWRpbmcsXG4gIGRpc3BsYXlcbn07XG5jb25zdCBzdHlsZXMgPSB7XG4gIHJvb3Q6IHtcbiAgICBmb250RmFtaWx5OiAnYm9keScsXG4gICAgbGluZUhlaWdodDogJ2JvZHknLFxuICAgIGZvbnRXZWlnaHQ6ICdib2R5J1xuICB9LFxuICBhOiB7XG4gICAgY29sb3I6ICdwcmltYXJ5JyxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICc6aG92ZXInOiB7XG4gICAgICB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSdcbiAgICB9XG4gIH0sXG4gIHA6IHtcbiAgICBtYjogMyxcbiAgICBsaW5lSGVpZ2h0OiAnYm9keSdcbiAgfSxcbiAgaDE6IHsgLi4uaGVhZGluZyxcbiAgICBmb250U2l6ZTogN1xuICB9LFxuICBoMjogeyAuLi5oZWFkaW5nLFxuICAgIGZvbnRTaXplOiA2XG4gIH0sXG4gIGgzOiB7IC4uLmhlYWRpbmcsXG4gICAgZm9udFNpemU6IDVcbiAgfSxcbiAgaDQ6IHsgLi4uaGVhZGluZyxcbiAgICBmb250U2l6ZTogNFxuICB9LFxuICBoNTogeyAuLi5oZWFkaW5nLFxuICAgIGZvbnRTaXplOiAzXG4gIH0sXG4gIGg2OiB7IC4uLmhlYWRpbmcsXG4gICAgZm9udFNpemU6IDJcbiAgfSxcbiAgYmxvY2txdW90ZToge1xuICAgIGZvbnRTaXplOiAzLFxuICAgIG1iOiAzXG4gIH0sXG4gIHRhYmxlOiB7XG4gICAgLy8gdG9kb1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAzLFxuICAgIGNvbG9yOiAnZ3JheS45JyxcbiAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJ1xuICB9LFxuICB0aDoge1xuICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxuICAgIGJvcmRlclRvcFdpZHRoOiAyLFxuICAgIGJvcmRlclRvcFN0eWxlOiAnc29saWQnLFxuICAgIGJvcmRlclRvcENvbG9yOiAnZ3JheS4zJyxcbiAgICBib3JkZXJCb3R0b21XaWR0aDogMixcbiAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJyxcbiAgICBib3JkZXJCb3R0b21Db2xvcjogJ2dyYXkuMycsXG4gICAgcGFkZGluZzogJy43NXJlbScsXG4gICAgdGV4dEFsaWduOiAnaW5oZXJpdCdcbiAgfSxcbiAgdGQ6IHtcbiAgICBib3JkZXJCb3R0b21XaWR0aDogMixcbiAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJyxcbiAgICBib3JkZXJCb3R0b21Db2xvcjogJ2dyYXkuMycsXG4gICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgcGFkZGluZzogJy43NXJlbSdcbiAgfSxcbiAgaW5saW5lQ29kZToge1xuICAgIGNvbG9yOiAncGluaydcbiAgfSxcbiAgaW1nOiB7XG4gICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICdhdXRvJ1xuICB9XG59O1xuY29uc3QgYm9vdHN0cmFwID0ge1xuICBicmVha3BvaW50cyxcbiAgY29sb3JzLFxuICBzcGFjZSxcbiAgZm9udHMsXG4gIGZvbnRTaXplcyxcbiAgZm9udFdlaWdodHMsXG4gIGxpbmVIZWlnaHRzLFxuICBzaXplcyxcbiAgc2hhZG93cyxcbiAgcmFkaWksXG4gIHR5cGVTdHlsZXMsXG4gIHN0eWxlc1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYm9vdHN0cmFwO1xuZXhwb3J0IHsgYmFzZUNvbG9ycywgYm9vdHN0cmFwLCBicmVha3BvaW50cywgY29sb3JzLCBmb250U2l6ZXMsIGZvbnRXZWlnaHRzLCBmb250cywgbGluZUhlaWdodHMsIHJhZGlpLCBzaGFkb3dzLCBzaXplcywgc3BhY2UsIHN0eWxlcyB9O1xuIiwiLy8gQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2pndGhtcy9idWxtYS9ibG9iL21hc3Rlci9zYXNzL3V0aWxpdGllcy9pbml0aWFsLXZhcmlhYmxlcy5zYXNzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vamd0aG1zL2J1bG1hL2Jsb2IvbWFzdGVyL3Nhc3MvYmFzZS9taW5pcmVzZXQuc2Fzc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pndGhtcy9idWxtYS9ibG9iL21hc3Rlci9zYXNzL2Jhc2UvZ2VuZXJpYy5zYXNzXG5jb25zdCBiYXNlQ29sb3JzID0ge1xuICBibGFjazogJ2hzbCgwLCAwJSwgNCUpJyxcbiAgYmxhY2tCaXM6ICdoc2woMCwgMCUsIDclKScsXG4gIGJsYWNrVGVyOiAnaHNsKDAsIDAlLCAxNCUpJyxcbiAgLy8gKHNpYylcbiAgZ3JleURhcmtlcjogJ2hzbCgwLCAwJSwgMjElKScsXG4gIGdyZXlEYXJrOiAnaHNsKDAsIDAlLCAyOSUpJyxcbiAgZ3JleTogJ2hzbCgwLCAwJSwgNDglKScsXG4gIGdyZXlMaWdodDogJ2hzbCgwLCAwJSwgNzElKScsXG4gIGdyZXlMaWdodGVyOiAnaHNsKDAsIDAlLCA4NiUpJyxcbiAgd2hpdGVUZXI6ICdoc2woMCwgMCUsIDk2JSknLFxuICB3aGl0ZUJpczogJ2hzbCgwLCAwJSwgOTglKScsXG4gIHdoaXRlOiAnaHNsKDAsIDAlLCAxMDAlKScsXG4gIG9yYW5nZTogJ2hzbCgxNCwgIDEwMCUsIDUzJSknLFxuICB5ZWxsb3c6ICdoc2woNDgsICAxMDAlLCA2NyUpJyxcbiAgZ3JlZW46ICdoc2woMTQxLCA3MSUsICA0OCUpJyxcbiAgdHVycXVvaXNlOiAnaHNsKDE3MSwgMTAwJSwgNDElKScsXG4gIGN5YW46ICdoc2woMjA0LCA4NiUsICA1MyUpJyxcbiAgYmx1ZTogJ2hzbCgyMTcsIDcxJSwgIDUzJSknLFxuICBwdXJwbGU6ICdoc2woMjcxLCAxMDAlLCA3MSUpJyxcbiAgcmVkOiAnaHNsKDM0OCwgMTAwJSwgNjElKSdcbn07XG5jb25zdCBjb2xvcnMgPSB7IC4uLmJhc2VDb2xvcnMsXG4gIHRleHQ6IGJhc2VDb2xvcnMuZ3JleURhcmssXG4gIGJhY2tncm91bmQ6IGJhc2VDb2xvcnMud2hpdGUsXG4gIHByaW1hcnk6IGJhc2VDb2xvcnMuYmx1ZSxcbiAgbXV0ZWQ6IGJhc2VDb2xvcnMud2hpdGVUZXIsXG4gIC8vIGJ1bG1hLXNwZWNpZmljXG4gIGluZm86IGJhc2VDb2xvcnMuY3lhbixcbiAgc3VjY2VzczogYmFzZUNvbG9ycy5ncmVlbixcbiAgd2FybmluZzogYmFzZUNvbG9ycy55ZWxsb3csXG4gIGRhbmdlcjogYmFzZUNvbG9ycy5yZWQsXG4gIGxpZ2h0OiBiYXNlQ29sb3JzLndoaXRlVGVyLFxuICBkYXJrOiBiYXNlQ29sb3JzLmdyZXlEYXJrZXIsXG4gIG1vZGVzOiB7XG4gICAgaW52ZXJ0OiB7fVxuICB9XG59O1xuY29uc3QgZm9udHMgPSB7XG4gIGJvZHk6ICdCbGlua01hY1N5c3RlbUZvbnQsIC1hcHBsZS1zeXN0ZW0sIFwiU2Vnb2UgVUlcIiwgXCJSb2JvdG9cIiwgXCJPeHlnZW5cIiwgXCJVYnVudHVcIiwgXCJDYW50YXJlbGxcIiwgXCJGaXJhIFNhbnNcIiwgXCJEcm9pZCBTYW5zXCIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBzYW5zLXNlcmlmJyxcbiAgaGVhZGluZzogJ2luaGVyaXQnLFxuICBtb25vc3BhY2U6ICdtb25vc3BhY2UnXG59O1xuY29uc3QgZm9udFNpemVzID0gWycwLjc1cmVtJywgJzAuODc1cmVtJywgLy8gdHdlZW5lclxuJzFyZW0nLCAnMS4yNXJlbScsICcxLjVyZW0nLCAnMS43NXJlbScsICcycmVtJywgJzIuNXJlbScsICczcmVtJ107XG5jb25zdCBmb250V2VpZ2h0cyA9IHtcbiAgYm9keTogNDAwLFxuICBoZWFkaW5nOiA3MDAsXG4gIGJvbGQ6IDcwMCxcbiAgbGlnaHQ6IDMwMCxcbiAgbWVkaXVtOiA1MDAsXG4gIHNlbWlib2xkOiA1MDBcbn07XG5jb25zdCBsaW5lSGVpZ2h0cyA9IHtcbiAgYm9keTogMS41LFxuICBoZWFkaW5nOiAxLjEyNVxufTsgLy8gZ3Vlc3N0aW1hdGVcblxuY29uc3Qgc3BhY2UgPSBbMCwgMC41LCAxLCAxLjUsIDIsIDIuNSwgM10ubWFwKG4gPT4gbiArICdyZW0nKTtcbmNvbnN0IGhlYWRpbmcgPSB7XG4gIGZvbnRGYW1pbHk6ICdoZWFkaW5nJyxcbiAgZm9udFdlaWdodDogJ2hlYWRpbmcnLFxuICBsaW5lSGVpZ2h0OiAnaGVhZGluZycsXG4gIG06IDAsXG4gIG1iOiAxXG59OyAvLyBuZWVkcyB3b3Jrc1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHJvb3Q6IHtcbiAgICBmb250RmFtaWx5OiAnYm9keScsXG4gICAgbGluZUhlaWdodDogJ2JvZHknLFxuICAgIGZvbnRXZWlnaHQ6ICdib2R5J1xuICB9LFxuICBhOiB7XG4gICAgY29sb3I6ICdwcmltYXJ5JyxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICc6aG92ZXInOiB7XG4gICAgICB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSdcbiAgICB9XG4gIH0sXG4gIGgxOiB7IC4uLmhlYWRpbmcsXG4gICAgZm9udFNpemU6IDYsXG4gICAgbXQ6IDJcbiAgfSxcbiAgaDI6IHsgLi4uaGVhZGluZyxcbiAgICBmb250U2l6ZTogNSxcbiAgICBtdDogMlxuICB9LFxuICBoMzogeyAuLi5oZWFkaW5nLFxuICAgIGZvbnRTaXplOiA0LFxuICAgIG10OiAzXG4gIH0sXG4gIGg0OiB7IC4uLmhlYWRpbmcsXG4gICAgZm9udFNpemU6IDNcbiAgfSxcbiAgaDU6IHsgLi4uaGVhZGluZyxcbiAgICBmb250U2l6ZTogMlxuICB9LFxuICBoNjogeyAuLi5oZWFkaW5nLFxuICAgIGZvbnRTaXplOiAxLFxuICAgIG1iOiAyXG4gIH0sXG4gIGNvZGU6IHt9LFxuICBwcmU6IHt9LFxuICBocjoge1xuICAgIGJnOiAnbXV0ZWQnLFxuICAgIGJvcmRlcjogMCxcbiAgICBoZWlnaHQ6ICcxcHgnLFxuICAgIG06IDNcbiAgfVxufTtcbmNvbnN0IGJ1bG1hID0ge1xuICBjb2xvcnMsXG4gIGZvbnRzLFxuICBmb250U2l6ZXMsXG4gIGZvbnRXZWlnaHRzLFxuICBzcGFjZSxcbiAgc3R5bGVzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWxtYTtcbmV4cG9ydCB7IGJhc2VDb2xvcnMsIGJ1bG1hLCBjb2xvcnMsIGZvbnRTaXplcywgZm9udFdlaWdodHMsIGZvbnRzLCBsaW5lSGVpZ2h0cywgc3BhY2UsIHN0eWxlcyB9O1xuIiwiY29uc3QgaGVhZGluZyA9IHtcbiAgZm9udEZhbWlseTogJ2hlYWRpbmcnLFxuICBmb250V2VpZ2h0OiAnaGVhZGluZycsXG4gIGxpbmVIZWlnaHQ6ICdoZWFkaW5nJ1xufTtcbmNvbnN0IGRhcmsgPSB7XG4gIGNvbG9yczoge1xuICAgIHRleHQ6ICcjZmZmJyxcbiAgICBiYWNrZ3JvdW5kOiAnIzA2MDYwNicsXG4gICAgcHJpbWFyeTogJyMzY2YnLFxuICAgIHNlY29uZGFyeTogJyNlMGYnLFxuICAgIG11dGVkOiAnIzE5MTkxOScsXG4gICAgaGlnaGxpZ2h0OiAnIzI5MTEyYycsXG4gICAgZ3JheTogJyM5OTknLFxuICAgIHB1cnBsZTogJyNjMGYnXG4gIH0sXG4gIGZvbnRzOiB7XG4gICAgYm9keTogJ3N5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmJyxcbiAgICBoZWFkaW5nOiAnaW5oZXJpdCcsXG4gICAgbW9ub3NwYWNlOiAnTWVubG8sIG1vbm9zcGFjZSdcbiAgfSxcbiAgZm9udFNpemVzOiBbMTIsIDE0LCAxNiwgMjAsIDI0LCAzMiwgNDgsIDY0LCA3Ml0sXG4gIGZvbnRXZWlnaHRzOiB7XG4gICAgYm9keTogNDAwLFxuICAgIGhlYWRpbmc6IDcwMCxcbiAgICBkaXNwbGF5OiA5MDBcbiAgfSxcbiAgbGluZUhlaWdodHM6IHtcbiAgICBib2R5OiAxLjUsXG4gICAgaGVhZGluZzogMS4yNVxuICB9LFxuICB0ZXh0U3R5bGVzOiB7XG4gICAgaGVhZGluZyxcbiAgICBkaXNwbGF5OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiBbNSwgNl0sXG4gICAgICBmb250V2VpZ2h0OiAnZGlzcGxheScsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICBtdDogM1xuICAgIH1cbiAgfSxcbiAgc3R5bGVzOiB7XG4gICAgQ29udGFpbmVyOiB7XG4gICAgICBwOiAzLFxuICAgICAgbWF4V2lkdGg6IDEwMjRcbiAgICB9LFxuICAgIHJvb3Q6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdib2R5JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICdib2R5JyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2R5J1xuICAgIH0sXG4gICAgaDE6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmRpc3BsYXknXG4gICAgfSxcbiAgICBoMjoge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogNVxuICAgIH0sXG4gICAgaDM6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDRcbiAgICB9LFxuICAgIGg0OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiAzXG4gICAgfSxcbiAgICBoNToge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogMlxuICAgIH0sXG4gICAgaDY6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDFcbiAgICB9LFxuICAgIGE6IHtcbiAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgICAnJjpob3Zlcic6IHtcbiAgICAgICAgY29sb3I6ICdzZWNvbmRhcnknXG4gICAgICB9XG4gICAgfSxcbiAgICBwcmU6IHtcbiAgICAgIHZhcmlhbnQ6ICdwcmlzbScsXG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIGZvbnRTaXplOiAxLFxuICAgICAgcDogMyxcbiAgICAgIGNvbG9yOiAndGV4dCcsXG4gICAgICBiZzogJ211dGVkJyxcbiAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICBjb2RlOiB7XG4gICAgICAgIGNvbG9yOiAnaW5oZXJpdCdcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvZGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgY29sb3I6ICdzZWNvbmRhcnknLFxuICAgICAgZm9udFNpemU6IDFcbiAgICB9LFxuICAgIGlubGluZUNvZGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgY29sb3I6ICdzZWNvbmRhcnknLFxuICAgICAgYmc6ICdtdXRlZCdcbiAgICB9LFxuICAgIHRhYmxlOiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgbXk6IDQsXG4gICAgICBib3JkZXJDb2xsYXBzZTogJ3NlcGFyYXRlJyxcbiAgICAgIGJvcmRlclNwYWNpbmc6IDAsXG4gICAgICAndGgsdGQnOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgICBweTogJzRweCcsXG4gICAgICAgIHByOiAnNHB4JyxcbiAgICAgICAgcGw6IDAsXG4gICAgICAgIGJvcmRlckNvbG9yOiAnbXV0ZWQnLFxuICAgICAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJ1xuICAgICAgfVxuICAgIH0sXG4gICAgdGg6IHtcbiAgICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxuICAgICAgYm9yZGVyQm90dG9tV2lkdGg6ICcycHgnXG4gICAgfSxcbiAgICB0ZDoge1xuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICBib3JkZXJCb3R0b21XaWR0aDogJzFweCdcbiAgICB9LFxuICAgIGhyOiB7XG4gICAgICBib3JkZXI6IDAsXG4gICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQnLFxuICAgICAgYm9yZGVyQ29sb3I6ICdtdXRlZCdcbiAgICB9LFxuICAgIGltZzoge1xuICAgICAgbWF4V2lkdGg6ICcxMDAlJ1xuICAgIH1cbiAgfSxcbiAgcHJpc206IHtcbiAgICAnLmNvbW1lbnQsLnByb2xvZywuZG9jdHlwZSwuY2RhdGEsLnB1bmN0dWF0aW9uLC5vcGVyYXRvciwuZW50aXR5LC51cmwnOiB7XG4gICAgICBjb2xvcjogJ2dyYXknXG4gICAgfSxcbiAgICAnLmNvbW1lbnQnOiB7XG4gICAgICBmb250U3R5bGU6ICdpdGFsaWMnXG4gICAgfSxcbiAgICAnLnByb3BlcnR5LC50YWcsLmJvb2xlYW4sLm51bWJlciwuY29uc3RhbnQsLnN5bWJvbCwuZGVsZXRlZCwuZnVuY3Rpb24sLmNsYXNzLW5hbWUsLnJlZ2V4LC5pbXBvcnRhbnQsLnZhcmlhYmxlJzoge1xuICAgICAgY29sb3I6ICdwdXJwbGUnXG4gICAgfSxcbiAgICAnLmF0cnVsZSwuYXR0ci12YWx1ZSwua2V5d29yZCc6IHtcbiAgICAgIGNvbG9yOiAncHJpbWFyeSdcbiAgICB9LFxuICAgICcuc2VsZWN0b3IsLmF0dHItbmFtZSwuc3RyaW5nLC5jaGFyLC5idWlsdGluLC5pbnNlcnRlZCc6IHtcbiAgICAgIGNvbG9yOiAnc2Vjb25kYXJ5J1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGFyaztcbmV4cG9ydCB7IGRhcmsgfTtcbiIsImNvbnN0IGhlYWRpbmcgPSB7XG4gIGZvbnRGYW1pbHk6ICdoZWFkaW5nJyxcbiAgZm9udFdlaWdodDogJ2hlYWRpbmcnLFxuICBsaW5lSGVpZ2h0OiAnaGVhZGluZydcbn07XG5jb25zdCBkZWVwID0ge1xuICBjb2xvcnM6IHtcbiAgICB0ZXh0OiAnaHNsKDIxMCwgNTAlLCA5NiUpJyxcbiAgICBiYWNrZ3JvdW5kOiAnaHNsKDIzMCwgMjUlLCAxOCUpJyxcbiAgICBwcmltYXJ5OiAnaHNsKDI2MCwgMTAwJSwgODAlKScsXG4gICAgc2Vjb25kYXJ5OiAnaHNsKDI5MCwgMTAwJSwgODAlKScsXG4gICAgaGlnaGxpZ2h0OiAnaHNsKDI2MCwgMjAlLCA0MCUpJyxcbiAgICBwdXJwbGU6ICdoc2woMjkwLCAxMDAlLCA4MCUpJyxcbiAgICBtdXRlZDogJ2hzbGEoMjMwLCAyMCUsIDAlLCAyMCUpJyxcbiAgICBncmF5OiAnaHNsKDIxMCwgNTAlLCA2MCUpJ1xuICB9LFxuICBmb250czoge1xuICAgIGJvZHk6ICdzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZicsXG4gICAgaGVhZGluZzogJ2luaGVyaXQnLFxuICAgIG1vbm9zcGFjZTogJ01lbmxvLCBtb25vc3BhY2UnXG4gIH0sXG4gIGZvbnRTaXplczogWzEyLCAxNCwgMTYsIDIwLCAyNCwgMzIsIDQ4LCA2NCwgNzJdLFxuICBmb250V2VpZ2h0czoge1xuICAgIGJvZHk6IDQwMCxcbiAgICBoZWFkaW5nOiA3MDAsXG4gICAgZGlzcGxheTogOTAwXG4gIH0sXG4gIGxpbmVIZWlnaHRzOiB7XG4gICAgYm9keTogMS41LFxuICAgIGhlYWRpbmc6IDEuMjVcbiAgfSxcbiAgdGV4dFN0eWxlczoge1xuICAgIGhlYWRpbmcsXG4gICAgZGlzcGxheToge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogWzUsIDZdLFxuICAgICAgZm9udFdlaWdodDogJ2Rpc3BsYXknLFxuICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAzZW0nLFxuICAgICAgbXQ6IDNcbiAgICB9XG4gIH0sXG4gIHN0eWxlczoge1xuICAgIENvbnRhaW5lcjoge1xuICAgICAgcDogMyxcbiAgICAgIG1heFdpZHRoOiAxMDI0XG4gICAgfSxcbiAgICByb290OiB7XG4gICAgICBmb250RmFtaWx5OiAnYm9keScsXG4gICAgICBsaW5lSGVpZ2h0OiAnYm9keScsXG4gICAgICBmb250V2VpZ2h0OiAnYm9keSdcbiAgICB9LFxuICAgIGgxOiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5kaXNwbGF5J1xuICAgIH0sXG4gICAgaDI6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDVcbiAgICB9LFxuICAgIGgzOiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiA0XG4gICAgfSxcbiAgICBoNDoge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogM1xuICAgIH0sXG4gICAgaDU6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDJcbiAgICB9LFxuICAgIGg2OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiAxXG4gICAgfSxcbiAgICBhOiB7XG4gICAgICBjb2xvcjogJ3ByaW1hcnknLFxuICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgIGNvbG9yOiAnc2Vjb25kYXJ5J1xuICAgICAgfVxuICAgIH0sXG4gICAgcHJlOiB7XG4gICAgICB2YXJpYW50OiAncHJpc20nLFxuICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsXG4gICAgICBmb250U2l6ZTogMSxcbiAgICAgIHA6IDMsXG4gICAgICBjb2xvcjogJ3RleHQnLFxuICAgICAgYmc6ICdtdXRlZCcsXG4gICAgICBvdmVyZmxvdzogJ2F1dG8nLFxuICAgICAgY29kZToge1xuICAgICAgICBjb2xvcjogJ2luaGVyaXQnXG4gICAgICB9XG4gICAgfSxcbiAgICBjb2RlOiB7XG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIGNvbG9yOiAnc2Vjb25kYXJ5JyxcbiAgICAgIGZvbnRTaXplOiAxXG4gICAgfSxcbiAgICBpbmxpbmVDb2RlOiB7XG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIGNvbG9yOiAnc2Vjb25kYXJ5JyxcbiAgICAgIGJnOiAnbXV0ZWQnXG4gICAgfSxcbiAgICB0YWJsZToge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIG15OiA0LFxuICAgICAgYm9yZGVyQ29sbGFwc2U6ICdzZXBhcmF0ZScsXG4gICAgICBib3JkZXJTcGFjaW5nOiAwLFxuICAgICAgJ3RoLHRkJzoge1xuICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgcHk6ICc0cHgnLFxuICAgICAgICBwcjogJzRweCcsXG4gICAgICAgIHBsOiAwLFxuICAgICAgICBib3JkZXJDb2xvcjogJ211dGVkJyxcbiAgICAgICAgYm9yZGVyQm90dG9tU3R5bGU6ICdzb2xpZCdcbiAgICAgIH1cbiAgICB9LFxuICAgIHRoOiB7XG4gICAgICB2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJyxcbiAgICAgIGJvcmRlckJvdHRvbVdpZHRoOiAnMnB4J1xuICAgIH0sXG4gICAgdGQ6IHtcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgYm9yZGVyQm90dG9tV2lkdGg6ICcxcHgnXG4gICAgfSxcbiAgICBocjoge1xuICAgICAgYm9yZGVyOiAwLFxuICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkJyxcbiAgICAgIGJvcmRlckNvbG9yOiAnbXV0ZWQnXG4gICAgfSxcbiAgICBpbWc6IHtcbiAgICAgIG1heFdpZHRoOiAnMTAwJSdcbiAgICB9XG4gIH0sXG4gIHByaXNtOiB7XG4gICAgJy5jb21tZW50LC5wcm9sb2csLmRvY3R5cGUsLmNkYXRhLC5wdW5jdHVhdGlvbiwub3BlcmF0b3IsLmVudGl0eSwudXJsJzoge1xuICAgICAgY29sb3I6ICdncmF5J1xuICAgIH0sXG4gICAgJy5jb21tZW50Jzoge1xuICAgICAgZm9udFN0eWxlOiAnaXRhbGljJ1xuICAgIH0sXG4gICAgJy5wcm9wZXJ0eSwudGFnLC5ib29sZWFuLC5udW1iZXIsLmNvbnN0YW50LC5zeW1ib2wsLmRlbGV0ZWQsLmZ1bmN0aW9uLC5jbGFzcy1uYW1lLC5yZWdleCwuaW1wb3J0YW50LC52YXJpYWJsZSc6IHtcbiAgICAgIGNvbG9yOiAncHVycGxlJ1xuICAgIH0sXG4gICAgJy5hdHJ1bGUsLmF0dHItdmFsdWUsLmtleXdvcmQnOiB7XG4gICAgICBjb2xvcjogJ3ByaW1hcnknXG4gICAgfSxcbiAgICAnLnNlbGVjdG9yLC5hdHRyLW5hbWUsLnN0cmluZywuY2hhciwuYnVpbHRpbiwuaW5zZXJ0ZWQnOiB7XG4gICAgICBjb2xvcjogJ3NlY29uZGFyeSdcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZXA7XG5leHBvcnQgeyBkZWVwIH07XG4iLCJpbXBvcnQgYmFzZSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0LWJhc2UnO1xuXG5jb25zdCBmdW5rID0geyAuLi5iYXNlLFxuICBmb250czoge1xuICAgIGJvZHk6ICdQb3BwaW5zLCBzYW5zLXNlcmlmJyxcbiAgICBoZWFkaW5nOiAnUG9wcGlucywgc2Fucy1zZXJpZicsXG4gICAgbW9ub3NwYWNlOiAnTWVubG8sIG1vbm9zcGFjZSdcbiAgfSxcbiAgbGluZUhlaWdodHM6IHtcbiAgICBib2R5OiAxLjYyNSxcbiAgICBoZWFkaW5nOiAxLjI1XG4gIH0sXG4gIGZvbnRXZWlnaHRzOiB7XG4gICAgYm9keTogNDAwLFxuICAgIGhlYWRpbmc6IDkwMCxcbiAgICBib2xkOiA3MDBcbiAgfSxcbiAgY29sb3JzOiB7IC4uLmJhc2UuY29sb3JzLFxuICAgIHByaW1hcnk6ICcjNjA5JyxcbiAgICBzZWNvbmRhcnk6ICcjMzA2J1xuICB9LFxuICBzdHlsZXM6IHsgLi4uYmFzZS5zdHlsZXNcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuaztcbmV4cG9ydCB7IGZ1bmsgfTtcbiIsImltcG9ydCBiYXNlIGZyb20gJ0B0aGVtZS11aS9wcmVzZXQtYmFzZSc7XG5cbmNvbnN0IGZ1dHVyZSA9IHsgLi4uYmFzZSxcbiAgY29sb3JzOiB7XG4gICAgdGV4dDogJyMwMDAnLFxuICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICBwcmltYXJ5OiAnIzExZScsXG4gICAgc2Vjb25kYXJ5OiAnI2MwYycsXG4gICAgaGlnaGxpZ2h0OiAnI2UwZScsXG4gICAgbXV0ZWQ6ICcjZjZmNmZmJyxcbiAgICBtb2Rlczoge1xuICAgICAgZGFyazoge1xuICAgICAgICB0ZXh0OiAnI2ZmZicsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjMDAwJyxcbiAgICAgICAgcHJpbWFyeTogJyMwZmMnLFxuICAgICAgICBzZWNvbmRhcnk6ICcjMGNmJyxcbiAgICAgICAgaGlnaGxpZ2h0OiAnI2YwYycsXG4gICAgICAgIG11dGVkOiAnIzAxMSdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGZvbnRzOiB7XG4gICAgYm9keTogJ1wiQXZlbmlyIE5leHRcIiwgc3lzdGVtLXVpLCBzYW5zLXNlcmlmJyxcbiAgICBoZWFkaW5nOiAnaW5oZXJpdCcsXG4gICAgbW9ub3NwYWNlOiAnTWVubG8sIG1vbm9zcGFjZSdcbiAgfSxcbiAgZm9udFdlaWdodHM6IHtcbiAgICBib2R5OiA0MDAsXG4gICAgaGVhZGluZzogNjAwLFxuICAgIGJvbGQ6IDcwMFxuICB9LFxuICBsaW5lSGVpZ2h0czoge1xuICAgIGJvZHk6IDEuNzUsXG4gICAgaGVhZGluZzogMS4yNVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdXR1cmU7XG5leHBvcnQgeyBmdXR1cmUgfTtcbiIsImltcG9ydCBiYXNlIGZyb20gJ0B0aGVtZS11aS9wcmVzZXQtYmFzZSc7XG5cbmNvbnN0IHRleHQgPSAnc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWYnO1xuY29uc3QgcG9sYXJpcyA9IHsgLi4uYmFzZSxcbiAgY29sb3JzOiB7XG4gICAgdGV4dDogJyM0NTRmNWInLFxuICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICBwcmltYXJ5OiAnIzVjNmFjNCcsXG4gICAgc2Vjb25kYXJ5OiAnIzAwNmZiYicsXG4gICAgaGlnaGxpZ2h0OiAnIzQ3YzFiZicsXG4gICAgbXV0ZWQ6ICcjZTZlNmU2JyxcbiAgICBncmF5OiAnI2RmZTNlOCcsXG4gICAgYWNjZW50OiAnI2Y0OTM0MicsXG4gICAgZGFya2VuOiAnIzAwMDQ0YycsXG4gICAgbW9kZXM6IHtcbiAgICAgIGRhcms6IHtcbiAgICAgICAgdGV4dDogJyMzZTQxNTUnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzAwMDYzOScsXG4gICAgICAgIHByaW1hcnk6ICcjOWM2YWRlJyxcbiAgICAgICAgc2Vjb25kYXJ5OiAnI2I0ZTFmYScsXG4gICAgICAgIGhpZ2hsaWdodDogJyNiN2VjZWMnLFxuICAgICAgICBtdXRlZDogJyNlNmU2ZTYnXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBmb250czoge1xuICAgIGJvZHk6IHRleHQsXG4gICAgaGVhZGluZzogdGV4dCxcbiAgICBtb25vc3BhY2U6ICdNZW5sbywgbW9ub3NwYWNlJ1xuICB9LFxuICBmb250V2VpZ2h0czoge1xuICAgIGJvZHk6IDQwMCxcbiAgICBoZWFkaW5nOiA2MDAsXG4gICAgYm9sZDogNzAwXG4gIH0sXG4gIGxpbmVIZWlnaHRzOiB7XG4gICAgYm9keTogMS43NSxcbiAgICBoZWFkaW5nOiAxLjI1XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBvbGFyaXM7XG5leHBvcnQgeyBwb2xhcmlzIH07XG4iLCJpbXBvcnQgYmFzZSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0LWJhc2UnO1xuXG5jb25zdCByb2JvdG8gPSB7IC4uLmJhc2UsXG4gIGNvbG9yczoge1xuICAgIHRleHQ6ICcjMjAyMTI0JyxcbiAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgcHJpbWFyeTogJyMxYTczZTgnLFxuICAgIHNlY29uZGFyeTogJyM5YzI3YjAnLFxuICAgIG11dGVkOiAnI2YxZjNmNCdcbiAgfSxcbiAgZm9udHM6IHtcbiAgICBib2R5OiAnUm9ib3RvLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWYnLFxuICAgIGhlYWRpbmc6ICdSb2JvdG8sIHN5c3RlbS11aSwgc2Fucy1zZXJpZicsXG4gICAgbW9ub3NwYWNlOiAnXCJSb2JvdG8gTW9ub1wiLCBtb25vc3BhY2UnXG4gIH0sXG4gIGZvbnRXZWlnaHRzOiB7XG4gICAgYm9keTogNDAwLFxuICAgIGhlYWRpbmc6IDYwMCxcbiAgICBib2xkOiA2MDBcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcm9ib3RvO1xuZXhwb3J0IHsgcm9ib3RvIH07XG4iLCJjb25zdCBkZWZhdWx0Qm9yZGVyU3R5bGVzID0ge1xuICBib3JkZXI6ICd0aGljaycsXG4gIGNvbG9yOiAndGV4dCcsXG4gIGJvcmRlclJhZGl1czogJ3NrZXRjaHkwJ1xufTtcbmNvbnN0IGJ1dHRvblN0eWxlcyA9IHsgLi4uZGVmYXVsdEJvcmRlclN0eWxlcyxcbiAgdHJhbnNpdGlvbjogJ2FsbCAyNTBtcyBlYXNlJyxcbiAgYmc6ICdtdXRlZCcsXG4gIGJveFNoYWRvdzogJ2RlZmF1bHQnLFxuICBmb250RmFtaWx5OiAnaW5oZXJpdCcsXG4gICcmOmhvdmVyJzoge1xuICAgIGJveFNoYWRvdzogJ2hvdmVyJ1xuICB9XG59O1xuY29uc3QgZm9ybVN0eWxlcyA9IHtcbiAgYm9yZGVyUmFkaXVzOiAnc2tldGNoeTMnLFxuICBib3JkZXJDb2xvcjogJ3RleHQnLFxuICBmb250RmFtaWx5OiAnaW5oZXJpdCcsXG4gICcmOmZvY3VzJzoge1xuICAgIGJveFNoYWRvdzogJ291dGxpbmUnLFxuICAgIG91dGxpbmU6ICdub25lJ1xuICB9XG59O1xuY29uc3QgdGhlbWUgPSB7XG4gIGNvbG9yczoge1xuICAgIHRleHQ6ICcjMDAwMjAwJyxcbiAgICBiYWNrZ3JvdW5kOiAnI0ZBRkFGOScsXG4gICAgbXV0ZWQ6ICdyZ2JhKDAsMCwwLC4xKScsXG4gICAgcHJpbWFyeTogJyNGMjVGNUMnLFxuICAgIHByaW1hcnlEYXJrOiAnI0I1MTkxNicsXG4gICAgcHJpbWFyeUxpZ2h0OiAnI0ZDQkFCMScsXG4gICAgYmx1ZTogJyNCNkRFRTInLFxuICAgIGJsdWVEYXJrOiAnIzI0N0JBMCcsXG4gICAgZ3JlZW5EYXJrOiAnIzJENTk0OCcsXG4gICAgZ3JlZW46ICcjQjJFNERDJyxcbiAgICB5ZWxsb3dEYXJrOiAnI0ZGREEzQScsXG4gICAgeWVsbG93OiAnI0ZDRjVDNydcbiAgfSxcbiAgZm9udHM6IHtcbiAgICBib2R5OiAnXCJBcmNoaXRlY3RzIERhdWdodGVyXCIsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmJyxcbiAgICBoZWFkaW5nOiAnaW5oZXJpdCcsXG4gICAgbW9ub3NwYWNlOiAnTWVubG8sIG1vbm9zcGFjZSdcbiAgfSxcbiAgZm9udFNpemVzOiBbMTIsIDE0LCAxNiwgMjAsIDI0LCAzMiwgNDgsIDY0LCA3Ml0sXG4gIHNpemVzOiB7XG4gICAgY29udGFpbmVyOiA4MDBcbiAgfSxcbiAgbGluZUhlaWdodHM6IHtcbiAgICBib2R5OiAxLjUsXG4gICAgaGVhZGluZzogMS4yNVxuICB9LFxuICByYWRpaToge1xuICAgIHNrZXRjaHkwOiAnMjI1cHggMjVweCAyMjVweCAvIDI1cHggMjI1cHgnLFxuICAgIHNrZXRjaHkxOiAnMTVweCAyNTVweCAxNXB4IC8gMjI1cHggMTVweCcsXG4gICAgc2tldGNoeTI6ICcxMHB4IDEyNXB4IDIwcHggLyAyMDVweCAyNXB4JyxcbiAgICBza2V0Y2h5MzogJzIyNXB4IDE1cHggMTVweCAvIDE1cHggMjI1cHgnLFxuICAgIHNrZXRjaHk0OiAnODBweCAxNXB4IDEwNXB4IC8gMjVweCAyNTBweCcsXG4gICAgY2lyY2xlOiAnMjAwcHggMTg1cHggMTYwcHggLyAxOTVweCAxNjBweCdcbiAgfSxcbiAgYm9yZGVyczoge1xuICAgIHRoaWNrOiAnMnB4IHNvbGlkIHZhcigtLXRoZW1lLXVpLWNvbG9ycy10ZXh0LCBibGFjayknLFxuICAgIHRoaW46ICcxcHggc29saWQgdmFyKC0tdGhlbWUtdWktY29sb3JzLXRleHQsIGJsYWNrKSdcbiAgfSxcbiAgc2hhZG93czoge1xuICAgIG91dGxpbmU6ICcwIDAgMHB4IDFweCBibGFjayByZ2JhKDAsMCwwLC40KScsXG4gICAgZGVmYXVsdDogJzE1cHggMjRweCAyNXB4IC0xOHB4IHJnYmEoMCwwLDAsLjQpJyxcbiAgICBob3ZlcjogJzJweCA4cHggMTBweCAtNnB4IHJnYmEoMCwwLDAsLjQpJ1xuICB9LFxuICBzdHlsZXM6IHtcbiAgICByb290OiB7XG4gICAgICBmb250RmFtaWx5OiAnYm9keScsXG4gICAgICBsaW5lSGVpZ2h0OiAnYm9keSdcbiAgICB9LFxuICAgIGE6IHtcbiAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgICAnJjpob3Zlcic6IHtcbiAgICAgICAgY29sb3I6ICdwcmltYXJ5RGFyaydcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZToge1xuICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsXG4gICAgICBmb250U2l6ZTogMSxcbiAgICAgIHA6IDMsXG4gICAgICBjb2xvcjogJ3RleHQnLFxuICAgICAgYmc6ICdtdXRlZCcsXG4gICAgICBvdmVyZmxvdzogJ2F1dG8nXG4gICAgfSxcbiAgICBjb2RlOiB7XG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIGZvbnRTaXplOiAxXG4gICAgfSxcbiAgICBpbmxpbmVDb2RlOiB7XG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIGNvbG9yOiAnYmx1ZURhcmsnXG4gICAgfSxcbiAgICB0YWJsZToge1xuICAgICAgYm9yZGVyQ29sbGFwc2U6ICdzZXBhcmF0ZScsXG4gICAgICBib3JkZXJTcGFjaW5nOiAwXG4gICAgfSxcbiAgICB0aDoge1xuICAgICAgYm9yZGVyOiAndGhpY2snLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnc2tldGNoeTMnLFxuICAgICAgYm9yZGVyQm90dG9tV2lkdGg6ICcxcHgnLFxuICAgICAgcDogMlxuICAgIH0sXG4gICAgdGQ6IHtcbiAgICAgIGJvcmRlcjogJ3RoaWNrJyxcbiAgICAgIGJvcmRlclJhZGl1czogJ3NrZXRjaHkxJyxcbiAgICAgIHA6IDJcbiAgICB9LFxuICAgIGhyOiB7XG4gICAgICBib3JkZXI6IDAsXG4gICAgICBib3JkZXJCb3R0b206ICd0aGluJ1xuICAgIH0sXG4gICAgaW1nOiB7XG4gICAgICBtYXhXaWR0aDogJzEwMCUnXG4gICAgfVxuICB9LFxuICBidXR0b25zOiB7XG4gICAgcHJpbWFyeTogYnV0dG9uU3R5bGVzLFxuICAgIGRhbmdlcjogeyAuLi5idXR0b25TdHlsZXMsXG4gICAgICBib3JkZXJDb2xvcjogJ3ByaW1hcnknLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncHJpbWFyeUxpZ2h0J1xuICAgIH0sXG4gICAgaW5mbzogeyAuLi5idXR0b25TdHlsZXMsXG4gICAgICBib3JkZXJDb2xvcjogJ2JsdWVEYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsdWUnXG4gICAgfSxcbiAgICB3YXJuaW5nOiB7IC4uLmJ1dHRvblN0eWxlcyxcbiAgICAgIGJvcmRlckNvbG9yOiAneWVsbG93RGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd5ZWxsb3cnXG4gICAgfSxcbiAgICBzdWNjZXNzOiB7IC4uLmJ1dHRvblN0eWxlcyxcbiAgICAgIGJvcmRlckNvbG9yOiAnZ3JlZW5EYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2dyZWVuJ1xuICAgIH1cbiAgfSxcbiAgY2FyZHM6IHtcbiAgICBwcmltYXJ5OiB7XG4gICAgICBjb2xvcjogJ3RleHQnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnc2tldGNoeTEnLFxuICAgICAgYm94U2hhZG93OiAnZGVmYXVsdCcsXG4gICAgICBib3JkZXI6ICd0aGljaycsXG4gICAgICBmb250RmFtaWx5OiAnaW5oZXJpdCdcbiAgICB9XG4gIH0sXG4gIGZvcm1zOiB7XG4gICAgaW5wdXQ6IGZvcm1TdHlsZXMsXG4gICAgc2VsZWN0OiBmb3JtU3R5bGVzLFxuICAgIHRleHRhcmVhOiBmb3JtU3R5bGVzLFxuICAgIHNsaWRlcjoge1xuICAgICAgYmc6ICdtdXRlZCdcbiAgICB9LFxuICAgIHJhZGlvOiB7XG4gICAgICBiZzogJ3RyYW5zcGFyZW50JyxcbiAgICAgIGJvcmRlcjogJ3RoaW4nLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnY2lyY2xlJyxcbiAgICAgIC4uLntcbiAgICAgICAgJ2lucHV0OmZvY3VzIH4gJic6IHtcbiAgICAgICAgICBiZzogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICBib3JkZXI6ICd0aGljaydcbiAgICAgICAgfSxcbiAgICAgICAgJz4gcGF0aCc6IHtcbiAgICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgICAgZDogJydcbiAgICAgICAgfSxcbiAgICAgICAgJ2lucHV0OmNoZWNrZWQgfiAmJzoge1xuICAgICAgICAgICc+IHBhdGgnOiB7XG4gICAgICAgICAgICBmaWxsOiAndGV4dCcsXG4gICAgICAgICAgICBkOiAncGF0aChcIk0gMTAuNjUyMjM3NjIzMDQ4ODQ0IDcuNTc4NjExMzY2ODM4MjAxIEMgMTEuNjExNTIyNzgwMDgyMyA3LjIyOTgxMTgwNjI2Mzg4LCAxMy44ODk1NDA3MTcxMjQwMTkgNi42MjEyNTI1MTQ5Njk2MzUsIDE1LjAwNjA2ODk4MzcyNDcxMyA3LjAyNjk2MDM5ODQ4OTYyNSBDIDE2LjEyMjU5NzI1MDMyNTQwNiA3LjQzMjY2ODI4MjAwOTYxNSwgMTcuMjQ1MTU1ODA1MjIzODkgOC44NzIwODk2ODU0Mjk3MDgsIDE3LjM1MTQwNzIyMjY1MzAxIDEwLjAxMjg1ODY2Nzk1ODE0IEMgMTcuNDU3NjU4NjQwMDgyMTI2IDExLjE1MzYyNzY1MDQ4NjU3MSwgMTYuMDM5MTIzMTY0MTY1NjYgMTIuNzY0ODg1NTMxNzczNzUsIDE1LjY0MzU3NzQ4ODI5OTQyMSAxMy44NzE1NzQyOTM2NjAyMTIgQyAxNS4yNDgwMzE4MTI0MzMxODUgMTQuOTc4MjYzMDU1NTQ2NjczLCAxNS43MDQwNDY3MzcxMDI4NCAxNS45ODkzMzcwNjIyNjI5NjksIDE0Ljk3ODEzMzE2NzQ1NTU4OSAxNi42NTI5OTEyMzkyNzY5MSBDIDE0LjI1MjIxOTU5NzgwODMzOCAxNy4zMTY2NDU0MTYyOTA4NTQsIDEyLjYxMDE1MzE5NTY3NzcwNyAxNy45NDk0OTk2MDc4MjIxMiwgMTEuMjg4MDk2MDcwNDE1OTIxIDE3Ljg1MzQ5OTM1NTc0Mzg2IEMgOS45NjYwMzg5NDUxNTQxMzYgMTcuNzU3NDk5MTAzNjY1NiwgNy43ODE2OTc4NDM4Njg4NDUgMTcuMjc0MjA2MDM2NDUxMzQzLCA3LjA0NTc5MDQxNTg4NDg2OSAxNi4wNzY5ODk3MjY4MDczNSBDIDYuMzA5ODgyOTg3OTAwODkzIDE0Ljg3OTc3MzQxNzE2MzM1OCwgNi42NjcxNjcwMDY5MDA4OTUgMTEuODcwMzg5MzkzMTQyNDkyLCA2Ljg3MjY1MTUwMjUxMjA2MjUgMTAuNjcwMjAxNDk3ODc5OTAzIEMgNy4wNzgxMzU5OTgxMjMyMyA5LjQ3MDAxMzYwMjYxNzMxNCwgNy41MDkzNTQzNTEyODUxNzUgOS42MjM5MzIxMjY1OTQyNDgsIDguMjc4Njk3Mzg5NTUxODc2IDguODc1ODYyMzU1MjMxODIgQyA5LjA0ODA0MDQyNzgxODU3NyA4LjEyNzc5MjU4Mzg2OTM5MywgMTAuODAwMzk3MzQ3OTkyODc2IDYuNTExMTQ5NzM2NDE3OTE3LCAxMS40ODg3MDk3MzIxMTIyNjYgNi4xODE3ODI4Njk3MDUzMzQgQyAxMi4xNzcwMjIxMTYyMzE2NTYgNS44NTI0MTYwMDI5OTI3NSwgMTIuMzYyOTQ4OTQxOTAwMjY3IDYuODAwNTYwMTA0NzQ2MzY3LCAxMi40MDg1NzE2OTQyNjgyMTggNi44OTk2NjExNTQ5NTYzMTkgTSAxMy4wODYzMjY1NDk3MDM0NjggNi4zMzQzNzIxNTk1NjI2MzQgQyAxNC4wNDU3MjY5NDkxODEwMTggNi41ODU1NzY1ODc3MDU4NjEsIDE0LjAyODE1NzcyNjA3MzUyIDguMTMwOTM3MzE1MjQwMTM0LCAxNC43OTM5MTMxNzA5MjUyNjggOC45MjYwMzU5OTYxOTQ0ODIgQyAxNS41NTk2Njg2MTU3NzcwMTcgOS43MjExMzQ2NzcxNDg4MywgMTcuNDY2MjI4NTk0MjY4NTggOS45NDE1MDcyMzg0Mjg0MywgMTcuNjgwODU5MjE4ODEzOTY0IDExLjEwNDk2NDI0NTI4ODcyNyBDIDE3Ljg5NTQ4OTg0MzM1OTM1IDEyLjI2ODQyMTI1MjE0OTAyMywgMTYuNzYyNjI0NjI5NDI4NjA0IDE0Ljc4MzE0NjU3Mzk1MjkyLCAxNi4wODE2OTY5MTgxOTc1NzIgMTUuOTA2Nzc4MDM3MzU2MjYxIEMgMTUuNDAwNzY5MjA2OTY2NTQyIDE3LjAzMDQwOTUwMDc1OTYwMywgMTQuNDk2MDM3OTg4Mzc2MTc5IDE3LjkwNTIxMDMxNDg5OTgwOCwgMTMuNTk1MjkyOTUxNDI3NzggMTcuODQ2NzUzMDI1NzA4NzgyIEMgMTIuNjk0NTQ3OTE0NDc5MzgxIDE3Ljc4ODI5NTczNjUxNzc1NywgMTEuODMwOTIyNTM3MzU5ODc3IDE1Ljk2MTQwNzk2MTI2MTM2NSwgMTAuNjc3MjI2Njk2NTA3MTg0IDE1LjU1NjAzNDMwMjIxMDExNyBDIDkuNTIzNTMwODU1NjU0NDkgMTUuMTUwNjYwNjQzMTU4ODY5LCA3LjQ2ODU0MjI1MzM1OTk2IDE2LjQ1MjkzMDI1NDI3MzAyNCwgNi42NzMxMTc5MDYzMTE2MTkgMTUuNDE0NTExMDcxNDAxMjkzIEMgNS44Nzc2OTM1NTkyNjMyNzggMTQuMzc2MDkxODg4NTI5NTYyLCA1LjUxMDY2NTM1NzE0NjU0MSAxMC44NTEzMzc2MDcwNzI5NzYsIDUuOTA0NjgwNjE0MjE3MTM2IDkuMzI1NTE5MjA0OTc5NzM0IEMgNi4yOTg2OTU4NzEyODc3MyA3Ljc5OTcwMDgwMjg4NjQ5MiwgOC4wMDUzOTQ1MTMyNzMzODQgNi42MjMzMjA2MTI5NDk2MzY1LCA5LjAzNzIwOTQ0ODczNTE4NSA2LjI1OTYwMDY1ODg0MTg0MDUgQyAxMC4wNjkwMjQzODQxOTY5ODYgNS44OTU4ODA3MDQ3MzQwNDQ1LCAxMS42NjAyNTgwNjkwMzg3MyA3LjMwMzQyMjM4MTk0ODYzNSwgMTIuMDk1NTcwMjI2OTg3OTQyIDcuMTQzMTk5NDgwMzMyOTU5IEMgMTIuNTMwODgyMzg0OTM3MTU0IDYuOTgyOTc2NTc4NzE3Mjg0LCAxMS44MDE1NTE2MzQzMzY5ODMgNS4xMjczMTQxMjEzNTAwNDcsIDExLjY0OTA4MjM5NjQzMDQ1OCA1LjI5ODI2MzI0OTE0Nzc4N1wiKSdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNoZWNrYm94OiB7XG4gICAgICBjb2xvcjogJ3RleHQnLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnc2tldGNoeTEnLFxuICAgICAgYm9yZGVyOiAndGhpbicsXG4gICAgICAuLi57XG4gICAgICAgICc+IHBhdGgnOiB7XG4gICAgICAgICAgZDogXCJwYXRoKCcnKVwiXG4gICAgICAgIH0sXG4gICAgICAgICdpbnB1dDpjaGVja2VkIH4gJic6IHtcbiAgICAgICAgICAnPiBwYXRoJzoge1xuICAgICAgICAgICAgZmlsbDogJ3RleHQnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgICAgICBkOiAncGF0aChcIk0gNC45MTk5MDggOS45NDYwMDkgQyA2Ljc4Njg3IDEyLjM1Mzk2LCAxMS4yNjc5NTQgMTkuMTY3ODkyLCAxMS4yNDQ0NjY2ODE0OTQ0NTYgMTcuNjI3NDg2IE0gNC43NjkwNDIgOS43Nzk1MTggQyA4Ljc5ODA3NjMwMzQzNDYzNCAxMS43Mzg2ODYyODQxNzQ0NCwgMTAuOTkxNDY2Mjc5NTQ4NDYgMTcuNDI1MTA1LCAxMC42NzU2OTggMjAuODYzMTkyIE0gOS4yNjgzMDkgMjAuNTIzNzUyIEMgMjAuMTQxOTAzIDIuOTA5ODA0LCAzNC4wNTE3NTUgLTEuMTIyNjY2LCAzMC4zNjAyMyAtMy43NzAzOTggTSA5LjgwNTgzOCAxNy41MjE3NTYgQyAyMC45NDkyNzIgOS44NDQzMTYsIDIyLjg3MDIyMiAwLjM0NzgxLCAyOS42NjIwOSAtNC42OTQyODVcIiknXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnaW5wdXQ6Zm9jdXMgfiAmJzoge1xuICAgICAgICAgIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgYm9yZGVyOiAndGhpY2snLFxuICAgICAgICAgICc+IHBhdGgnOiB7XG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbGlua3M6IHtcbiAgICBuYXY6IHtcbiAgICAgIGJvcmRlclJhZGl1czogJ3NrZXRjaHkxJyxcbiAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgICBweDogMixcbiAgICAgIHB5OiAxLFxuICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiAnMC4yZW0nLFxuICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgIGJnOiAncHJpbWFyeUxpZ2h0J1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFkZ2VzOiB7XG4gICAgcHJpbWFyeToge1xuICAgICAgYm9yZGVyUmFkaXVzOiAnc2tldGNoeTEnLFxuICAgICAgY29sb3I6ICdiYWNrZ3JvdW5kJyxcbiAgICAgIGJnOiAncHJpbWFyeSdcbiAgICB9LFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGJvcmRlclJhZGl1czogJ3NrZXRjaHkxJyxcbiAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgICBiZzogJ3RyYW5zcGFyZW50JyxcbiAgICAgIGJveFNoYWRvdzogJ2luc2V0IDAgMCAwIDFweCdcbiAgICB9XG4gIH0sXG4gIGFsZXJ0czoge1xuICAgIGRhbmdlcjogeyAuLi5kZWZhdWx0Qm9yZGVyU3R5bGVzLFxuICAgICAgYm9yZGVyQ29sb3I6ICdwcmltYXJ5JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ByaW1hcnlMaWdodCdcbiAgICB9LFxuICAgIGluZm86IHsgLi4uZGVmYXVsdEJvcmRlclN0eWxlcyxcbiAgICAgIGJvcmRlckNvbG9yOiAnYmx1ZURhcmsnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmx1ZSdcbiAgICB9LFxuICAgIHdhcm5pbmc6IHsgLi4uZGVmYXVsdEJvcmRlclN0eWxlcyxcbiAgICAgIGJvcmRlckNvbG9yOiAneWVsbG93RGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd5ZWxsb3cnXG4gICAgfSxcbiAgICBzdWNjZXNzOiB7IC4uLmRlZmF1bHRCb3JkZXJTdHlsZXMsXG4gICAgICBib3JkZXJDb2xvcjogJ2dyZWVuRGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdncmVlbidcbiAgICB9XG4gIH0sXG4gIG1lc3NhZ2VzOiB7XG4gICAgZGFuZ2VyOiB7IC4uLmRlZmF1bHRCb3JkZXJTdHlsZXMsXG4gICAgICBib3JkZXJDb2xvcjogJ3ByaW1hcnknLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncHJpbWFyeUxpZ2h0J1xuICAgIH0sXG4gICAgaW5mbzogeyAuLi5kZWZhdWx0Qm9yZGVyU3R5bGVzLFxuICAgICAgYm9yZGVyQ29sb3I6ICdibHVlRGFyaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibHVlJ1xuICAgIH0sXG4gICAgd2FybmluZzogeyAuLi5kZWZhdWx0Qm9yZGVyU3R5bGVzLFxuICAgICAgYm9yZGVyQ29sb3I6ICd5ZWxsb3dEYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3llbGxvdydcbiAgICB9LFxuICAgIHN1Y2Nlc3M6IHsgLi4uZGVmYXVsdEJvcmRlclN0eWxlcyxcbiAgICAgIGJvcmRlckNvbG9yOiAnZ3JlZW5EYXJrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2dyZWVuJ1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGhlbWU7XG4iLCJjb25zdCBoZWFkaW5nID0ge1xuICBmb250RmFtaWx5OiAnaGVhZGluZycsXG4gIGZvbnRXZWlnaHQ6ICdoZWFkaW5nJyxcbiAgbGluZUhlaWdodDogJ2hlYWRpbmcnXG59O1xuY29uc3Qgc3dpc3MgPSB7XG4gIGNvbG9yczoge1xuICAgIHRleHQ6ICdoc2woMTAsIDIwJSwgMjAlKScsXG4gICAgYmFja2dyb3VuZDogJ2hzbCgxMCwgMTAlLCA5OCUpJyxcbiAgICBwcmltYXJ5OiAnaHNsKDEwLCA4MCUsIDUwJSknLFxuICAgIHNlY29uZGFyeTogJ2hzbCgxMCwgNjAlLCA1MCUpJyxcbiAgICBoaWdobGlnaHQ6ICdoc2woMTAsIDQwJSwgOTAlKScsXG4gICAgcHVycGxlOiAnaHNsKDI1MCwgNjAlLCAzMCUpJyxcbiAgICBtdXRlZDogJ2hzbCgxMCwgMjAlLCA5NCUpJyxcbiAgICBncmF5OiAnaHNsKDEwLCAyMCUsIDUwJSknXG4gIH0sXG4gIGZvbnRzOiB7XG4gICAgYm9keTogJ3N5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmJyxcbiAgICBoZWFkaW5nOiAnaW5oZXJpdCcsXG4gICAgbW9ub3NwYWNlOiAnTWVubG8sIG1vbm9zcGFjZSdcbiAgfSxcbiAgZm9udFNpemVzOiBbMTIsIDE0LCAxNiwgMjAsIDI0LCAzMiwgNDgsIDY0LCA3Ml0sXG4gIGZvbnRXZWlnaHRzOiB7XG4gICAgYm9keTogNDAwLFxuICAgIGhlYWRpbmc6IDcwMCxcbiAgICBkaXNwbGF5OiA5MDBcbiAgfSxcbiAgbGluZUhlaWdodHM6IHtcbiAgICBib2R5OiAxLjUsXG4gICAgaGVhZGluZzogMS4yNVxuICB9LFxuICB0ZXh0U3R5bGVzOiB7XG4gICAgaGVhZGluZyxcbiAgICBkaXNwbGF5OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiBbNSwgNl0sXG4gICAgICBmb250V2VpZ2h0OiAnZGlzcGxheScsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICBtdDogM1xuICAgIH1cbiAgfSxcbiAgc3R5bGVzOiB7XG4gICAgQ29udGFpbmVyOiB7XG4gICAgICBwOiAzLFxuICAgICAgbWF4V2lkdGg6IDEwMjRcbiAgICB9LFxuICAgIHJvb3Q6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdib2R5JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICdib2R5JyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2R5J1xuICAgIH0sXG4gICAgaDE6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmRpc3BsYXknXG4gICAgfSxcbiAgICBoMjoge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogNVxuICAgIH0sXG4gICAgaDM6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDRcbiAgICB9LFxuICAgIGg0OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiAzXG4gICAgfSxcbiAgICBoNToge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogMlxuICAgIH0sXG4gICAgaDY6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDFcbiAgICB9LFxuICAgIGE6IHtcbiAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgICAnJjpob3Zlcic6IHtcbiAgICAgICAgY29sb3I6ICdzZWNvbmRhcnknXG4gICAgICB9XG4gICAgfSxcbiAgICBwcmU6IHtcbiAgICAgIHZhcmlhbnQ6ICdwcmlzbScsXG4gICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgIGZvbnRTaXplOiAxLFxuICAgICAgcDogMyxcbiAgICAgIGNvbG9yOiAndGV4dCcsXG4gICAgICBiZzogJ211dGVkJyxcbiAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICBjb2RlOiB7XG4gICAgICAgIGNvbG9yOiAnaW5oZXJpdCdcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvZGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgY29sb3I6ICdzZWNvbmRhcnknLFxuICAgICAgZm9udFNpemU6IDFcbiAgICB9LFxuICAgIGlubGluZUNvZGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgY29sb3I6ICdzZWNvbmRhcnknLFxuICAgICAgYmc6ICdtdXRlZCdcbiAgICB9LFxuICAgIHRhYmxlOiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgbXk6IDQsXG4gICAgICBib3JkZXJDb2xsYXBzZTogJ3NlcGFyYXRlJyxcbiAgICAgIGJvcmRlclNwYWNpbmc6IDAsXG4gICAgICAndGgsdGQnOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgICBweTogJzRweCcsXG4gICAgICAgIHByOiAnNHB4JyxcbiAgICAgICAgcGw6IDAsXG4gICAgICAgIGJvcmRlckNvbG9yOiAnbXV0ZWQnLFxuICAgICAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJ1xuICAgICAgfVxuICAgIH0sXG4gICAgdGg6IHtcbiAgICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxuICAgICAgYm9yZGVyQm90dG9tV2lkdGg6ICcycHgnXG4gICAgfSxcbiAgICB0ZDoge1xuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICBib3JkZXJCb3R0b21XaWR0aDogJzFweCdcbiAgICB9LFxuICAgIGhyOiB7XG4gICAgICBib3JkZXI6IDAsXG4gICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQnLFxuICAgICAgYm9yZGVyQ29sb3I6ICdtdXRlZCdcbiAgICB9LFxuICAgIGltZzoge1xuICAgICAgbWF4V2lkdGg6ICcxMDAlJ1xuICAgIH1cbiAgfSxcbiAgcHJpc206IHtcbiAgICAnLmNvbW1lbnQsLnByb2xvZywuZG9jdHlwZSwuY2RhdGEsLnB1bmN0dWF0aW9uLC5vcGVyYXRvciwuZW50aXR5LC51cmwnOiB7XG4gICAgICBjb2xvcjogJ2dyYXknXG4gICAgfSxcbiAgICAnLmNvbW1lbnQnOiB7XG4gICAgICBmb250U3R5bGU6ICdpdGFsaWMnXG4gICAgfSxcbiAgICAnLnByb3BlcnR5LC50YWcsLmJvb2xlYW4sLm51bWJlciwuY29uc3RhbnQsLnN5bWJvbCwuZGVsZXRlZCwuZnVuY3Rpb24sLmNsYXNzLW5hbWUsLnJlZ2V4LC5pbXBvcnRhbnQsLnZhcmlhYmxlJzoge1xuICAgICAgY29sb3I6ICdwdXJwbGUnXG4gICAgfSxcbiAgICAnLmF0cnVsZSwuYXR0ci12YWx1ZSwua2V5d29yZCc6IHtcbiAgICAgIGNvbG9yOiAncHJpbWFyeSdcbiAgICB9LFxuICAgICcuc2VsZWN0b3IsLmF0dHItbmFtZSwuc3RyaW5nLC5jaGFyLC5idWlsdGluLC5pbnNlcnRlZCc6IHtcbiAgICAgIGNvbG9yOiAnc2Vjb25kYXJ5J1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3dpc3M7XG5leHBvcnQgeyBzd2lzcyB9O1xuIiwiY29uc3QgaGVhZGluZyA9IHtcbiAgZm9udEZhbWlseTogJ2hlYWRpbmcnLFxuICBmb250V2VpZ2h0OiAnaGVhZGluZycsXG4gIGxpbmVIZWlnaHQ6ICdoZWFkaW5nJ1xufTtcbmNvbnN0IHN5c3RlbSA9IHtcbiAgY29uZmlnOiB7XG4gICAgdXNlQ3VzdG9tUHJvcGVydGllczogdHJ1ZSxcbiAgICBpbml0aWFsQ29sb3JNb2RlOiAnc3lzdGVtJ1xuICB9LFxuICBjb2xvcnM6IHtcbiAgICB0ZXh0OiAnIzAwMCcsXG4gICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgIHByaW1hcnk6ICcjMzNlJyxcbiAgICBzZWNvbmRhcnk6ICcjMTE5JyxcbiAgICBtdXRlZDogJyNmNmY2ZjYnLFxuICAgIGhpZ2hsaWdodDogJyNlZmVmZmUnLFxuICAgIC8vICcjZmZmZmNjJyxcbiAgICBncmF5OiAnIzc3NycsXG4gICAgYWNjZW50OiAnIzYwOScsXG4gICAgbW9kZXM6IHtcbiAgICAgIGRhcms6IHtcbiAgICAgICAgdGV4dDogJyNmZmYnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzA2MDYwNicsXG4gICAgICAgIHByaW1hcnk6ICcjM2NmJyxcbiAgICAgICAgc2Vjb25kYXJ5OiAnI2UwZicsXG4gICAgICAgIG11dGVkOiAnIzE5MTkxOScsXG4gICAgICAgIGhpZ2hsaWdodDogJyMyOTExMmMnLFxuICAgICAgICBncmF5OiAnIzk5OScsXG4gICAgICAgIGFjY2VudDogJyNjMGYnXG4gICAgICB9LFxuICAgICAgZGVlcDoge1xuICAgICAgICB0ZXh0OiAnaHNsKDIxMCwgNTAlLCA5NiUpJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ2hzbCgyMzAsIDI1JSwgMTglKScsXG4gICAgICAgIHByaW1hcnk6ICdoc2woMjYwLCAxMDAlLCA4MCUpJyxcbiAgICAgICAgc2Vjb25kYXJ5OiAnaHNsKDI5MCwgMTAwJSwgODAlKScsXG4gICAgICAgIGhpZ2hsaWdodDogJ2hzbCgyNjAsIDIwJSwgNDAlKScsXG4gICAgICAgIGFjY2VudDogJ2hzbCgyOTAsIDEwMCUsIDgwJSknLFxuICAgICAgICBtdXRlZDogJ2hzbGEoMjMwLCAyMCUsIDAlLCAyMCUpJyxcbiAgICAgICAgZ3JheTogJ2hzbCgyMTAsIDUwJSwgNjAlKSdcbiAgICAgIH0sXG4gICAgICBzd2lzczoge1xuICAgICAgICB0ZXh0OiAnaHNsKDEwLCAyMCUsIDIwJSknLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnaHNsKDEwLCAxMCUsIDk4JSknLFxuICAgICAgICBwcmltYXJ5OiAnaHNsKDEwLCA4MCUsIDUwJSknLFxuICAgICAgICBzZWNvbmRhcnk6ICdoc2woMTAsIDYwJSwgNTAlKScsXG4gICAgICAgIGhpZ2hsaWdodDogJ2hzbCgxMCwgNDAlLCA5MCUpJyxcbiAgICAgICAgYWNjZW50OiAnaHNsKDI1MCwgNjAlLCAzMCUpJyxcbiAgICAgICAgbXV0ZWQ6ICdoc2woMTAsIDIwJSwgOTQlKScsXG4gICAgICAgIGdyYXk6ICdoc2woMTAsIDIwJSwgNTAlKSdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGZvbnRzOiB7XG4gICAgYm9keTogJ3N5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmJyxcbiAgICBoZWFkaW5nOiAnaW5oZXJpdCcsXG4gICAgbW9ub3NwYWNlOiAnTWVubG8sIG1vbm9zcGFjZSdcbiAgfSxcbiAgZm9udFNpemVzOiBbMTIsIDE0LCAxNiwgMjAsIDI0LCAzMiwgNDgsIDY0LCA3Ml0sXG4gIGZvbnRXZWlnaHRzOiB7XG4gICAgYm9keTogNDAwLFxuICAgIGhlYWRpbmc6IDcwMCxcbiAgICBkaXNwbGF5OiA5MDBcbiAgfSxcbiAgbGluZUhlaWdodHM6IHtcbiAgICBib2R5OiAxLjUsXG4gICAgaGVhZGluZzogMS4yNVxuICB9LFxuICB0ZXh0U3R5bGVzOiB7XG4gICAgaGVhZGluZyxcbiAgICBkaXNwbGF5OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiBbNSwgNl0sXG4gICAgICBmb250V2VpZ2h0OiAnZGlzcGxheScsXG4gICAgICBsZXR0ZXJTcGFjaW5nOiAnLTAuMDNlbScsXG4gICAgICBtdDogM1xuICAgIH1cbiAgfSxcbiAgc3R5bGVzOiB7XG4gICAgQ29udGFpbmVyOiB7XG4gICAgICBwOiAzLFxuICAgICAgbWF4V2lkdGg6IDEwMjRcbiAgICB9LFxuICAgIHJvb3Q6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdib2R5JyxcbiAgICAgIGxpbmVIZWlnaHQ6ICdib2R5JyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2R5J1xuICAgIH0sXG4gICAgaDE6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmRpc3BsYXknXG4gICAgfSxcbiAgICBoMjoge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogNVxuICAgIH0sXG4gICAgaDM6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDRcbiAgICB9LFxuICAgIGg0OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiAzXG4gICAgfSxcbiAgICBoNToge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogMlxuICAgIH0sXG4gICAgaDY6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDFcbiAgICB9LFxuICAgIGE6IHtcbiAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgICAnJjpob3Zlcic6IHtcbiAgICAgICAgY29sb3I6ICdzZWNvbmRhcnknXG4gICAgICB9XG4gICAgfSxcbiAgICBwcmU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgZm9udFNpemU6IDEsXG4gICAgICBwOiAzLFxuICAgICAgY29sb3I6ICd0ZXh0JyxcbiAgICAgIGJnOiAnbXV0ZWQnLFxuICAgICAgb3ZlcmZsb3c6ICdhdXRvJyxcbiAgICAgIGNvZGU6IHtcbiAgICAgICAgY29sb3I6ICdpbmhlcml0J1xuICAgICAgfVxuICAgIH0sXG4gICAgY29kZToge1xuICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsXG4gICAgICBmb250U2l6ZTogMVxuICAgIH0sXG4gICAgaW5saW5lQ29kZToge1xuICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsXG4gICAgICBjb2xvcjogJ3NlY29uZGFyeScsXG4gICAgICBiZzogJ211dGVkJ1xuICAgIH0sXG4gICAgdGFibGU6IHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBteTogNCxcbiAgICAgIGJvcmRlckNvbGxhcHNlOiAnc2VwYXJhdGUnLFxuICAgICAgYm9yZGVyU3BhY2luZzogMCxcbiAgICAgICd0aCx0ZCc6IHtcbiAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICAgIHB5OiAnNHB4JyxcbiAgICAgICAgcHI6ICc0cHgnLFxuICAgICAgICBwbDogMCxcbiAgICAgICAgYm9yZGVyQ29sb3I6ICdtdXRlZCcsXG4gICAgICAgIGJvcmRlckJvdHRvbVN0eWxlOiAnc29saWQnXG4gICAgICB9XG4gICAgfSxcbiAgICB0aDoge1xuICAgICAgdmVydGljYWxBbGlnbjogJ2JvdHRvbScsXG4gICAgICBib3JkZXJCb3R0b21XaWR0aDogJzJweCdcbiAgICB9LFxuICAgIHRkOiB7XG4gICAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJyxcbiAgICAgIGJvcmRlckJvdHRvbVdpZHRoOiAnMXB4J1xuICAgIH0sXG4gICAgaHI6IHtcbiAgICAgIGJvcmRlcjogMCxcbiAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCcsXG4gICAgICBib3JkZXJDb2xvcjogJ211dGVkJ1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3lzdGVtO1xuZXhwb3J0IHsgc3lzdGVtIH07XG4iLCIvLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdGFpbHdpbmRjc3MvdGFpbHdpbmRjc3MvYmxvYi9tYXN0ZXIvc3R1YnMvZGVmYXVsdENvbmZpZy5zdHViLmpzXG4vLyBhbmQgaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vY29tcG9uZW50c1xuY29uc3QgYm9yZGVyV2lkdGhzID0ge1xuICBweDogJzFweCcsXG4gICcwJzogJzAnLFxuICAnMic6ICcycHgnLFxuICAnNCc6ICc0cHgnLFxuICAnOCc6ICc4cHgnXG59O1xuY29uc3QgYnJlYWtwb2ludHMgPSBbJzY0MHB4JywgJzc2OHB4JywgJzEwMjRweCcsICcxMjgwcHgnXTtcbmNvbnN0IGJhc2VDb2xvcnMgPSB7XG4gIHRyYW5zcGFyZW50OiAndHJhbnNwYXJlbnQnLFxuICBibGFjazogJyMwMDAnLFxuICB3aGl0ZTogJyNmZmYnLFxuICBncmF5OiBbbnVsbCwgJyNmN2ZhZmMnLCAnI2VkZjJmNycsICcjZTJlOGYwJywgJyNjYmQ1ZTAnLCAnI2EwYWVjMCcsICcjNzE4MDk2JywgJyM0YTU1NjgnLCAnIzJkMzc0OCcsICcjMWEyMDJjJ10sXG4gIHJlZDogW251bGwsICcjZmZmNWY1JywgJyNmZWQ3ZDcnLCAnI2ZlYjJiMicsICcjZmM4MTgxJywgJyNmNTY1NjUnLCAnI2U1M2UzZScsICcjYzUzMDMwJywgJyM5YjJjMmMnLCAnIzc0MmEyYSddLFxuICBvcmFuZ2U6IFtudWxsLCAnI2ZmZmFmMCcsICcjZmVlYmM4JywgJyNmYmQzOGQnLCAnI2Y2YWQ1NScsICcjZWQ4OTM2JywgJyNkZDZiMjAnLCAnI2MwNTYyMScsICcjOWM0MjIxJywgJyM3YjM0MWUnXSxcbiAgeWVsbG93OiBbbnVsbCwgJyNmZmZmZjAnLCAnI2ZlZmNiZicsICcjZmFmMDg5JywgJyNmNmUwNWUnLCAnI2VjYzk0YicsICcjZDY5ZTJlJywgJyNiNzc5MWYnLCAnIzk3NWExNicsICcjNzQ0MjEwJ10sXG4gIGdyZWVuOiBbbnVsbCwgJyNmMGZmZjQnLCAnI2M2ZjZkNScsICcjOWFlNmI0JywgJyM2OGQzOTEnLCAnIzQ4YmI3OCcsICcjMzhhMTY5JywgJyMyZjg1NWEnLCAnIzI3Njc0OScsICcjMjI1NDNkJ10sXG4gIHRlYWw6IFtudWxsLCAnI2U2ZmZmYScsICcjYjJmNWVhJywgJyM4MWU2ZDknLCAnIzRmZDFjNScsICcjMzhiMmFjJywgJyMzMTk3OTUnLCAnIzJjN2E3YicsICcjMjg1ZTYxJywgJyMyMzRlNTInXSxcbiAgYmx1ZTogW251bGwsICcjZWJmOGZmJywgJyNiZWUzZjgnLCAnIzkwY2RmNCcsICcjNjNiM2VkJywgJyM0Mjk5ZTEnLCAnIzMxODJjZScsICcjMmI2Y2IwJywgJyMyYzUyODInLCAnIzJhNDM2NSddLFxuICBpbmRpZ286IFtudWxsLCAnI2ViZjRmZicsICcjYzNkYWZlJywgJyNhM2JmZmEnLCAnIzdmOWNmNScsICcjNjY3ZWVhJywgJyM1YTY3ZDgnLCAnIzRjNTFiZicsICcjNDM0MTkwJywgJyMzYzM2NmInXSxcbiAgcHVycGxlOiBbbnVsbCwgJyNmYWY1ZmYnLCAnI2U5ZDhmZCcsICcjZDZiY2ZhJywgJyNiNzk0ZjQnLCAnIzlmN2FlYScsICcjODA1YWQ1JywgJyM2YjQ2YzEnLCAnIzU1M2M5YScsICcjNDQzMzdhJ10sXG4gIHBpbms6IFtudWxsLCAnI2ZmZjVmNycsICcjZmVkN2UyJywgJyNmYmI2Y2UnLCAnI2Y2ODdiMycsICcjZWQ2NGE2JywgJyNkNTNmOGMnLCAnI2I4MzI4MCcsICcjOTcyNjZkJywgJyM3MDI0NTknXVxufTtcbmNvbnN0IGNvbW1vbkJ1dHRvblN0eWxlcyA9IHtcbiAgcHk6IDIsXG4gIHB4OiAzLFxuICBjdXJzb3I6IGBwb2ludGVyYCxcbiAgZm9udFNpemU6IGAxMDAlYCxcbiAgbGluZUhlaWdodDogYGluaGVyaXRgXG59O1xuY29uc3QgYnV0dG9ucyA9IHtcbiAgc2ltcGxlOiB7IC4uLmNvbW1vbkJ1dHRvblN0eWxlcyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGBwcmltYXJ5YCxcbiAgICBib3JkZXI6IGBub25lYCxcbiAgICBjb2xvcjogYHdoaXRlYCxcbiAgICBmb250V2VpZ2h0OiBgYm9sZGAsXG4gICAgYm9yZGVyUmFkaXVzOiBgZGVmYXVsdGAsXG4gICAgJyY6aG92ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGBwcmltYXJ5SG92ZXJgXG4gICAgfVxuICB9LFxuICBwaWxsOiB7IC4uLmNvbW1vbkJ1dHRvblN0eWxlcyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGBwcmltYXJ5YCxcbiAgICBib3JkZXI6IGBub25lYCxcbiAgICBjb2xvcjogYHdoaXRlYCxcbiAgICBmb250V2VpZ2h0OiBgYm9sZGAsXG4gICAgYm9yZGVyUmFkaXVzOiBgZnVsbGAsXG4gICAgJyY6aG92ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGBwcmltYXJ5SG92ZXJgXG4gICAgfVxuICB9LFxuICBvdXRsaW5lOiB7IC4uLmNvbW1vbkJ1dHRvblN0eWxlcyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGB0cmFuc3BhcmVudGAsXG4gICAgYm9yZGVyV2lkdGg6IGAxcHhgLFxuICAgIGJvcmRlclN0eWxlOiBgc29saWRgLFxuICAgIGJvcmRlckNvbG9yOiBgcHJpbWFyeWAsXG4gICAgY29sb3I6IGBwcmltYXJ5YCxcbiAgICBmb250V2VpZ2h0OiBgc2VtaWJvbGRgLFxuICAgIGJvcmRlclJhZGl1czogYGRlZmF1bHRgLFxuICAgICcmOmhvdmVyJzoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBgcHJpbWFyeWAsXG4gICAgICBjb2xvcjogYHdoaXRlYCxcbiAgICAgIGJvcmRlckNvbG9yOiBgdHJhbnNwYXJlbnRgXG4gICAgfVxuICB9LFxuICBib3JkZXJlZDogeyAuLi5jb21tb25CdXR0b25TdHlsZXMsXG4gICAgYmFja2dyb3VuZENvbG9yOiBgcHJpbWFyeWAsXG4gICAgYm9yZGVyV2lkdGg6IGAxcHhgLFxuICAgIGJvcmRlclN0eWxlOiBgc29saWRgLFxuICAgIGJvcmRlckNvbG9yOiBgcHJpbWFyeUhvdmVyYCxcbiAgICBjb2xvcjogYHdoaXRlYCxcbiAgICBmb250V2VpZ2h0OiBgYm9sZGAsXG4gICAgYm9yZGVyUmFkaXVzOiBgZGVmYXVsdGAsXG4gICAgJyY6aG92ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGBwcmltYXJ5SG92ZXJgXG4gICAgfVxuICB9LFxuICBkaXNhYmxlZDogeyAuLi5jb21tb25CdXR0b25TdHlsZXMsXG4gICAgYmFja2dyb3VuZENvbG9yOiBgcHJpbWFyeWAsXG4gICAgYm9yZGVyOiBgbm9uZWAsXG4gICAgb3BhY2l0eTogMC41LFxuICAgIGN1cnNvcjogYG5vdC1hbGxvd2VkYCxcbiAgICBjb2xvcjogYHdoaXRlYCxcbiAgICBmb250V2VpZ2h0OiBgYm9sZGAsXG4gICAgYm9yZGVyUmFkaXVzOiBgZGVmYXVsdGBcbiAgfSxcbiAgJzNEJzogeyAuLi5jb21tb25CdXR0b25TdHlsZXMsXG4gICAgYmFja2dyb3VuZENvbG9yOiBgcHJpbWFyeWAsXG4gICAgYm9yZGVyOiBgbm9uZWAsXG4gICAgYm9yZGVyQm90dG9tV2lkdGg6IGA0cHhgLFxuICAgIGJvcmRlckJvdHRvbVN0eWxlOiBgc29saWRgLFxuICAgIGJvcmRlckJvdHRvbUNvbG9yOiBgcHJpbWFyeUhvdmVyYCxcbiAgICBjb2xvcjogYHdoaXRlYCxcbiAgICBmb250V2VpZ2h0OiBgYm9sZGAsXG4gICAgYm9yZGVyUmFkaXVzOiBgZGVmYXVsdGAsXG4gICAgdHJhbnNpdGlvbjogYHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0YCxcbiAgICAnJjpob3Zlcic6IHtcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoLTFweClgXG4gICAgfVxuICB9LFxuICBlbGV2YXRlZDogeyAuLi5jb21tb25CdXR0b25TdHlsZXMsXG4gICAgYmFja2dyb3VuZENvbG9yOiBgd2hpdGVgLFxuICAgIGJvcmRlcldpZHRoOiBgMXB4YCxcbiAgICBib3JkZXJTdHlsZTogYHNvbGlkYCxcbiAgICBib3JkZXJDb2xvcjogYGdyYXkuNGAsXG4gICAgY29sb3I6IGB0ZXh0YCxcbiAgICBmb250V2VpZ2h0OiBgYm9sZGAsXG4gICAgYm9yZGVyUmFkaXVzOiBgZGVmYXVsdGAsXG4gICAgYm94U2hhZG93OiBgZGVmYXVsdGAsXG4gICAgJyY6aG92ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGBncmF5LjFgXG4gICAgfVxuICB9XG59O1xuY29uc3QgY29sb3JzID0geyAuLi5iYXNlQ29sb3JzLFxuICBncmF5RGFyazogYmFzZUNvbG9ycy5ncmF5WzhdLFxuICB0ZXh0OiBiYXNlQ29sb3JzLmdyYXlbOF0sXG4gIGJhY2tncm91bmQ6IGJhc2VDb2xvcnMud2hpdGUsXG4gIHByaW1hcnk6IGJhc2VDb2xvcnMuYmx1ZVs3XSxcbiAgcHJpbWFyeUhvdmVyOiBiYXNlQ29sb3JzLmJsdWVbOF0sXG4gIHNlY29uZGFyeTogYmFzZUNvbG9ycy5ncmF5WzZdLFxuICBtdXRlZDogYmFzZUNvbG9ycy5ncmF5WzNdLFxuICBzdWNjZXNzOiBiYXNlQ29sb3JzLmdyZWVuWzNdLFxuICBpbmZvOiBiYXNlQ29sb3JzLmJsdWVbNF0sXG4gIHdhcm5pbmc6IGJhc2VDb2xvcnMueWVsbG93WzNdLFxuICBkYW5nZXI6IGJhc2VDb2xvcnMucmVkWzNdLFxuICBsaWdodDogYmFzZUNvbG9ycy5ncmF5WzFdLFxuICBkYXJrOiBiYXNlQ29sb3JzLmdyYXlbOF0sXG4gIHRleHRNdXRlZDogYmFzZUNvbG9ycy5ncmF5WzZdXG59O1xuY29uc3QgYmFzZUZvbnRzID0ge1xuICBzYW5zOiAnc3lzdGVtLXVpLC1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLEFyaWFsLFwiTm90byBTYW5zXCIsc2Fucy1zZXJpZixcIkFwcGxlIENvbG9yIEVtb2ppXCIsXCJTZWdvZSBVSSBFbW9qaVwiLFwiU2Vnb2UgVUkgU3ltYm9sXCIsXCJOb3RvIENvbG9yIEVtb2ppXCInLFxuICBzZXJpZjogJ0dlb3JnaWEsQ2FtYnJpYSxcIlRpbWVzIE5ldyBSb21hblwiLFRpbWVzLHNlcmlmJyxcbiAgbW9ubzogJ01lbmxvLE1vbmFjbyxDb25zb2xhcyxcIkxpYmVyYXRpb24gTW9ub1wiLFwiQ291cmllciBOZXdcIixtb25vc3BhY2UnXG59O1xuY29uc3QgZm9udHMgPSB7IC4uLmJhc2VGb250cyxcbiAgYm9keTogYmFzZUZvbnRzLnNhbnMsXG4gIGhlYWRpbmc6ICdpbmhlcml0JyxcbiAgbW9ub3NwYWNlOiBiYXNlRm9udHMubW9ub1xufTtcbmNvbnN0IGZvbnRTaXplcyA9IFsnMC44NzVyZW0nLCAnMXJlbScsICcxLjI1cmVtJywgJzEuNXJlbScsICcxLjg3NXJlbScsICcyLjI1cmVtJywgJzNyZW0nLCAnNHJlbScsICc0LjVyZW0nXTtcbmNvbnN0IGJhc2VGb250V2VpZ2h0cyA9IHtcbiAgaGFpcmxpbmU6ICcxMDAnLFxuICB0aGluOiAnMjAwJyxcbiAgbGlnaHQ6ICczMDAnLFxuICBub3JtYWw6ICc0MDAnLFxuICBtZWRpdW06ICc1MDAnLFxuICBzZW1pYm9sZDogJzYwMCcsXG4gIGJvbGQ6ICc3MDAnLFxuICBleHRyYWJvbGQ6ICc4MDAnLFxuICBibGFjazogJzkwMCdcbn07XG5jb25zdCBmb250V2VpZ2h0cyA9IHsgLi4uYmFzZUZvbnRXZWlnaHRzLFxuICBib2R5OiBiYXNlRm9udFdlaWdodHMubm9ybWFsLFxuICBoZWFkaW5nOiBiYXNlRm9udFdlaWdodHMuYm9sZFxufTtcbmNvbnN0IGNvbW1vbklucHV0U3R5bGVzID0ge1xuICBweTogMixcbiAgcHg6IDMsXG4gIGZvbnRTaXplOiBgMTAwJWAsXG4gIGJvcmRlclJhZGl1czogYGRlZmF1bHRgLFxuICBhcHBlYXJhbmNlOiBgbm9uZWAsXG4gIGxpbmVIZWlnaHQ6IGB0aWdodGBcbn07XG5jb25zdCBpbnB1dHMgPSB7XG4gIHNoYWRvdzogeyAuLi5jb21tb25JbnB1dFN0eWxlcyxcbiAgICBib3JkZXI6IGBub25lYCxcbiAgICBjb2xvcjogYGdyYXkuN2AsXG4gICAgYm94U2hhZG93OiBgZGVmYXVsdGAsXG4gICAgJyY6Zm9jdXMnOiB7XG4gICAgICBvdXRsaW5lOiBgbm9uZWAsXG4gICAgICBib3hTaGFkb3c6IGBvdXRsaW5lYFxuICAgIH1cbiAgfSxcbiAgaW5saW5lOiB7IC4uLmNvbW1vbklucHV0U3R5bGVzLFxuICAgIGJhY2tncm91bmRDb2xvcjogYGdyYXkuMmAsXG4gICAgYm9yZGVyV2lkdGg6IGAycHhgLFxuICAgIGJvcmRlclN0eWxlOiBgc29saWRgLFxuICAgIGJvcmRlckNvbG9yOiBgZ3JheS4yYCxcbiAgICBjb2xvcjogYGdyYXkuN2AsXG4gICAgJyY6Zm9jdXMnOiB7XG4gICAgICBvdXRsaW5lOiBgbm9uZWAsXG4gICAgICBib3JkZXJDb2xvcjogYHByaW1hcnlgLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBgd2hpdGVgXG4gICAgfVxuICB9LFxuICB1bmRlcmxpbmU6IHsgLi4uY29tbW9uSW5wdXRTdHlsZXMsXG4gICAgYmFja2dyb3VuZENvbG9yOiBgdHJhbnNwYXJlbnRgLFxuICAgIGJvcmRlcjogYG5vbmVgLFxuICAgIGJvcmRlckJvdHRvbVdpZHRoOiBgMnB4YCxcbiAgICBib3JkZXJCb3R0b21TdHlsZTogYHNvbGlkYCxcbiAgICBib3JkZXJCb3R0b21Db2xvcjogYHByaW1hcnlgLFxuICAgIGJvcmRlclJhZGl1czogYDBweGAsXG4gICAgY29sb3I6IGBncmF5LjdgLFxuICAgICcmOmZvY3VzJzoge1xuICAgICAgb3V0bGluZTogYG5vbmVgLFxuICAgICAgYm9yZGVyQ29sb3I6IGBwcmltYXJ5YCxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYHdoaXRlYFxuICAgIH1cbiAgfVxufTtcbmNvbnN0IGxldHRlclNwYWNpbmdzID0ge1xuICB0aWdodGVyOiAnLTAuMDVlbScsXG4gIHRpZ2h0OiAnLTAuMDI1ZW0nLFxuICBub3JtYWw6ICcwJyxcbiAgd2lkZTogJzAuMDI1ZW0nLFxuICB3aWRlcjogJzAuMDVlbScsXG4gIHdpZGVzdDogJzAuMWVtJ1xufTtcbmNvbnN0IGJhc2VMaW5lSGVpZ2h0cyA9IHtcbiAgbm9uZTogJzEnLFxuICB0aWdodDogJzEuMjUnLFxuICBzbnVnOiAnMS4zNzUnLFxuICBub3JtYWw6ICcxLjUnLFxuICByZWxheGVkOiAnMS42MjUnLFxuICBsb29zZTogJzInXG59O1xuY29uc3QgbGluZUhlaWdodHMgPSB7IC4uLmJhc2VMaW5lSGVpZ2h0cyxcbiAgYm9keTogYmFzZUxpbmVIZWlnaHRzLnJlbGF4ZWQsXG4gIGhlYWRpbmc6IGJhc2VMaW5lSGVpZ2h0cy50aWdodFxufTtcbmNvbnN0IHJhZGlpID0ge1xuICBub25lOiAnMCcsXG4gIHNtOiAnMC4xMjVyZW0nLFxuICBkZWZhdWx0OiAnMC4yNXJlbScsXG4gIG1kOiAnMC4zNzVyZW0nLFxuICBsZzogJzAuNXJlbScsXG4gIGZ1bGw6ICc5OTk5cHgnXG59O1xuY29uc3QgdGFpbHdpbmRTcGFjaW5nID0ge1xuICBweDogJzFweCcsXG4gICcwJzogJzAnLFxuICAnMSc6ICcwLjI1cmVtJyxcbiAgJzInOiAnMC41cmVtJyxcbiAgJzMnOiAnMC43NXJlbScsXG4gICc0JzogJzFyZW0nLFxuICAnNSc6ICcxLjI1cmVtJyxcbiAgJzYnOiAnMS41cmVtJyxcbiAgJzgnOiAnMnJlbScsXG4gICcxMCc6ICcyLjVyZW0nLFxuICAnMTInOiAnM3JlbScsXG4gICcxNic6ICc0cmVtJyxcbiAgJzIwJzogJzVyZW0nLFxuICAnMjQnOiAnNnJlbScsXG4gICczMic6ICc4cmVtJyxcbiAgJzQwJzogJzEwcmVtJyxcbiAgJzQ4JzogJzEycmVtJyxcbiAgJzU2JzogJzE0cmVtJyxcbiAgJzY0JzogJzE2cmVtJ1xufTtcbmNvbnN0IHRhaWx3aW5kTWF4V2lkdGggPSB7XG4gIHhzOiAnMjByZW0nLFxuICBzbTogJzI0cmVtJyxcbiAgbWQ6ICcyOHJlbScsXG4gIGxnOiAnMzJyZW0nLFxuICB4bDogJzM2cmVtJyxcbiAgJzJ4bCc6ICc0MnJlbScsXG4gICczeGwnOiAnNDhyZW0nLFxuICAnNHhsJzogJzU2cmVtJyxcbiAgJzV4bCc6ICc2NHJlbScsXG4gICc2eGwnOiAnNzJyZW0nXG59O1xuY29uc3QgdGFpbHdpbmRXaWR0aCA9IHtcbiAgJzEvMic6ICc1MCUnLFxuICAnMS8zJzogJzMzLjMzMzMzMyUnLFxuICAnMi8zJzogJzY2LjY2NjY2NyUnLFxuICAnMS80JzogJzI1JScsXG4gICcyLzQnOiAnNTAlJyxcbiAgJzMvNCc6ICc3NSUnLFxuICAnMS81JzogJzIwJScsXG4gICcyLzUnOiAnNDAlJyxcbiAgJzMvNSc6ICc2MCUnLFxuICAnNC81JzogJzgwJScsXG4gICcxLzYnOiAnMTYuNjY2NjY3JScsXG4gICcyLzYnOiAnMzMuMzMzMzMzJScsXG4gICczLzYnOiAnNTAlJyxcbiAgJzQvNic6ICc2Ni42NjY2NjclJyxcbiAgJzUvNic6ICc4My4zMzMzMzMlJyxcbiAgJzEvMTInOiAnOC4zMzMzMzMlJyxcbiAgJzIvMTInOiAnMTYuNjY2NjY3JScsXG4gICczLzEyJzogJzI1JScsXG4gICc0LzEyJzogJzMzLjMzMzMzMyUnLFxuICAnNS8xMic6ICc0MS42NjY2NjclJyxcbiAgJzYvMTInOiAnNTAlJyxcbiAgJzcvMTInOiAnNTguMzMzMzMzJScsXG4gICc4LzEyJzogJzY2LjY2NjY2NyUnLFxuICAnOS8xMic6ICc3NSUnLFxuICAnMTAvMTInOiAnODMuMzMzMzMzJScsXG4gICcxMS8xMic6ICc5MS42NjY2NjclJ1xufTtcbmNvbnN0IHNpemVzID0geyAuLi50YWlsd2luZFNwYWNpbmcsXG4gIC4uLnRhaWx3aW5kTWF4V2lkdGgsXG4gIC4uLnRhaWx3aW5kV2lkdGgsXG4gIGZ1bGw6ICcxMDAlJyxcbiAgc2NyZWVuSGVpZ2h0OiAnMTAwdmgnLFxuICBzY3JlZW5XaWR0aDogJzEwMHZ3J1xufTtcbmNvbnN0IHNoYWRvd3MgPSB7XG4gIHhzOiAnMCAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4wNSknLFxuICBzbTogJzAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4wNSknLFxuICBkZWZhdWx0OiAnMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMDYpJyxcbiAgbWQ6ICcwIDRweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4wNiknLFxuICBsZzogJzAgMTBweCAxNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDRweCA2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMDUpJyxcbiAgeGw6ICcwIDIwcHggMjVweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxMHB4IDEwcHggLTVweCByZ2JhKDAsIDAsIDAsIDAuMDQpJyxcbiAgJzJ4bCc6ICcwIDI1cHggNTBweCAtMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpJyxcbiAgaW5uZXI6ICdpbnNldCAwIDJweCA0cHggMCByZ2JhKDAsIDAsIDAsIDAuMDYpJyxcbiAgb3V0bGluZTogJzAgMCAwIDNweCByZ2JhKDY2LCAxNTMsIDIyNSwgMC41KScsXG4gIG5vbmU6ICdub25lJ1xufTtcbmNvbnN0IHNwYWNlID0gW1wiMFwiLCAnMC4yNXJlbScsICcwLjVyZW0nLCAnMXJlbScsICcycmVtJywgJzRyZW0nLCAnOHJlbScsICcxNnJlbScsICczMnJlbSddO1xuY29uc3QgekluZGljZXMgPSB7XG4gIGF1dG86ICdhdXRvJyxcbiAgJzAnOiAnMCcsXG4gICcxMCc6ICcxMCcsXG4gICcyMCc6ICcyMCcsXG4gICczMCc6ICczMCcsXG4gICc0MCc6ICc0MCcsXG4gICc1MCc6ICc1MCdcbn07XG5jb25zdCBoZWFkaW5nID0ge1xuICBmb250RmFtaWx5OiAnaGVhZGluZycsXG4gIGZvbnRXZWlnaHQ6ICdoZWFkaW5nJyxcbiAgbGluZUhlaWdodDogJ2hlYWRpbmcnLFxuICBtOiAwLFxuICBtYjogMVxufTtcbmNvbnN0IHN0eWxlcyA9IHtcbiAgcm9vdDoge1xuICAgIGZvbnRGYW1pbHk6ICdib2R5JyxcbiAgICBsaW5lSGVpZ2h0OiAnYm9keScsXG4gICAgZm9udFdlaWdodDogJ2JvZHknXG4gIH0sXG4gIGE6IHtcbiAgICBjb2xvcjogJ3ByaW1hcnknLFxuICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgJzpob3Zlcic6IHtcbiAgICAgIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJ1xuICAgIH1cbiAgfSxcbiAgaDE6IHsgLi4uaGVhZGluZyxcbiAgICBmb250U2l6ZTogNixcbiAgICBtdDogMlxuICB9LFxuICBoMjogeyAuLi5oZWFkaW5nLFxuICAgIGZvbnRTaXplOiA1LFxuICAgIG10OiAyXG4gIH0sXG4gIGgzOiB7IC4uLmhlYWRpbmcsXG4gICAgZm9udFNpemU6IDQsXG4gICAgbXQ6IDNcbiAgfSxcbiAgaDQ6IHsgLi4uaGVhZGluZyxcbiAgICBmb250U2l6ZTogM1xuICB9LFxuICBoNTogeyAuLi5oZWFkaW5nLFxuICAgIGZvbnRTaXplOiAyXG4gIH0sXG4gIGg2OiB7IC4uLmhlYWRpbmcsXG4gICAgZm9udFNpemU6IDEsXG4gICAgbWI6IDJcbiAgfSxcbiAgY29kZToge30sXG4gIHByZToge30sXG4gIGhyOiB7XG4gICAgYmc6ICdtdXRlZCcsXG4gICAgYm9yZGVyOiAwLFxuICAgIGhlaWdodDogJzFweCcsXG4gICAgbTogM1xuICB9XG59O1xuY29uc3QgdHJhbnNmb3JtcyA9IHtcbiAgdHJhbnNmb3JtT3JpZ2luOiB7XG4gICAgY2VudGVyOiAnY2VudGVyJyxcbiAgICB0b3A6ICd0b3AnLFxuICAgICd0b3AtcmlnaHQnOiAndG9wIHJpZ2h0JyxcbiAgICByaWdodDogJ3JpZ2h0JyxcbiAgICAnYm90dG9tLXJpZ2h0JzogJ2JvdHRvbSByaWdodCcsXG4gICAgYm90dG9tOiAnYm90dG9tJyxcbiAgICAnYm90dG9tLWxlZnQnOiAnYm90dG9tIGxlZnQnLFxuICAgIGxlZnQ6ICdsZWZ0JyxcbiAgICAndG9wLWxlZnQnOiAndG9wIGxlZnQnXG4gIH0sXG4gIHRyYW5zbGF0ZTogeyAuLi50YWlsd2luZFNwYWNpbmcsXG4gICAgJy1mdWxsJzogJy0xMDAlJyxcbiAgICAnLTEvMic6ICctNTAlJyxcbiAgICAnMS8yJzogJzUwJScsXG4gICAgZnVsbDogJzEwMCUnXG4gIH0sXG4gIHNjYWxlOiB7XG4gICAgJzAnOiAnMCcsXG4gICAgJzUwJzogJy41JyxcbiAgICAnNzUnOiAnLjc1JyxcbiAgICAnOTAnOiAnLjknLFxuICAgICc5NSc6ICcuOTUnLFxuICAgICcxMDAnOiAnMScsXG4gICAgJzEwNSc6ICcxLjA1JyxcbiAgICAnMTEwJzogJzEuMScsXG4gICAgJzEyNSc6ICcxLjI1JyxcbiAgICAnMTUwJzogJzEuNSdcbiAgfSxcbiAgcm90YXRlOiB7XG4gICAgJy0xODAnOiAnLTE4MGRlZycsXG4gICAgJy05MCc6ICctOTBkZWcnLFxuICAgICctNDUnOiAnLTQ1ZGVnJyxcbiAgICAnMCc6ICcwJyxcbiAgICAnNDUnOiAnNDVkZWcnLFxuICAgICc5MCc6ICc5MGRlZycsXG4gICAgJzE4MCc6ICcxODBkZWcnXG4gIH0sXG4gIHNrZXc6IHtcbiAgICAnLTEyJzogJy0xMmRlZycsXG4gICAgJy02JzogJy02ZGVnJyxcbiAgICAnLTMnOiAnLTNkZWcnLFxuICAgICcwJzogJzAnLFxuICAgICczJzogJzNkZWcnLFxuICAgICc2JzogJzZkZWcnLFxuICAgICcxMic6ICcxMmRlZydcbiAgfVxufTtcbmNvbnN0IHRyYW5zaXRpb25zID0ge1xuICBwcm9wZXJ0eToge1xuICAgIG5vbmU6ICdub25lJyxcbiAgICBhbGw6ICdhbGwnLFxuICAgIGRlZmF1bHQ6ICdiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3IsIGNvbG9yLCBmaWxsLCBzdHJva2UsIG9wYWNpdHksIGJveC1zaGFkb3csIHRyYW5zZm9ybScsXG4gICAgY29sb3JzOiAnYmFja2dyb3VuZC1jb2xvciwgYm9yZGVyLWNvbG9yLCBjb2xvciwgZmlsbCwgc3Ryb2tlJyxcbiAgICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gICAgc2hhZG93OiAnYm94LXNoYWRvdycsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNmb3JtJ1xuICB9LFxuICB0aW1pbmdGdW5jdGlvbjoge1xuICAgIGxpbmVhcjogJ2xpbmVhcicsXG4gICAgaW46ICdjdWJpYy1iZXppZXIoMC40LCAwLCAxLCAxKScsXG4gICAgb3V0OiAnY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknLFxuICAgICdpbi1vdXQnOiAnY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSdcbiAgfSxcbiAgZHVyYXRpb246IHtcbiAgICAnNzUnOiAnNzVtcycsXG4gICAgJzEwMCc6ICcxMDBtcycsXG4gICAgJzE1MCc6ICcxNTBtcycsXG4gICAgJzIwMCc6ICcyMDBtcycsXG4gICAgJzMwMCc6ICczMDBtcycsXG4gICAgJzUwMCc6ICc1MDBtcycsXG4gICAgJzcwMCc6ICc3MDBtcycsXG4gICAgJzEwMDAnOiAnMTAwMG1zJ1xuICB9XG59O1xuY29uc3QgdGFpbHdpbmQgPSB7XG4gIGJvcmRlcldpZHRocyxcbiAgYnJlYWtwb2ludHMsXG4gIGNvbG9ycyxcbiAgZm9udHMsXG4gIGZvbnRTaXplcyxcbiAgZm9udFdlaWdodHMsXG4gIGxldHRlclNwYWNpbmdzLFxuICBsaW5lSGVpZ2h0cyxcbiAgc2l6ZXMsXG4gIHNoYWRvd3MsXG4gIHNwYWNlLFxuICByYWRpaSxcbiAgekluZGljZXMsXG4gIHN0eWxlcyxcbiAgYnV0dG9ucyxcbiAgaW5wdXRzLFxuICB0cmFuc2Zvcm1zLFxuICB0cmFuc2l0aW9uc1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGFpbHdpbmQ7XG5leHBvcnQgeyBiYXNlQ29sb3JzLCBiYXNlRm9udFdlaWdodHMsIGJhc2VGb250cywgYmFzZUxpbmVIZWlnaHRzLCBib3JkZXJXaWR0aHMsIGJyZWFrcG9pbnRzLCBidXR0b25zLCBjb2xvcnMsIGZvbnRTaXplcywgZm9udFdlaWdodHMsIGZvbnRzLCBpbnB1dHMsIGxldHRlclNwYWNpbmdzLCBsaW5lSGVpZ2h0cywgcmFkaWksIHNoYWRvd3MsIHNpemVzLCBzcGFjZSwgc3R5bGVzLCB0YWlsd2luZCwgdHJhbnNmb3JtcywgdHJhbnNpdGlvbnMsIHpJbmRpY2VzIH07XG4iLCJjb25zdCBoZWFkaW5nID0ge1xuICBmb250RmFtaWx5OiAnaGVhZGluZycsXG4gIGZvbnRXZWlnaHQ6ICdoZWFkaW5nJyxcbiAgbGluZUhlaWdodDogJ2hlYWRpbmcnXG59O1xuY29uc3QgdG9zaCA9IHtcbiAgY29uZmlnOiB7XG4gICAgdXNlQ3VzdG9tUHJvcGVydGllczogdHJ1ZSxcbiAgICBpbml0aWFsQ29sb3JNb2RlOiAnbGlnaHQnXG4gIH0sXG4gIGNvbG9yczoge1xuICAgIHRleHQ6ICcjMDAwJyxcbiAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgcHJpbWFyeTogJyMwMDAnLFxuICAgIHNlY29uZGFyeTogJyMzZjNmM2YnLFxuICAgIG11dGVkOiAnI2UwZTBlMCcsXG4gICAgaGlnaGxpZ2h0OiAnIzlmOWY5ZicsXG4gICAgZ3JheTogJyM2YzZjNmMnLFxuICAgIGFjY2VudDogJyMzZjNmM2YnLFxuICAgIG1vZGVzOiB7XG4gICAgICBkYXJrOiB7XG4gICAgICAgIHRleHQ6ICcjZmZmJyxcbiAgICAgICAgYmFja2dyb3VuZDogJyMwNjA2MDYnLFxuICAgICAgICBwcmltYXJ5OiAnI2QyZDJkMicsXG4gICAgICAgIHNlY29uZGFyeTogJyNiMmIyYjInLFxuICAgICAgICBtdXRlZDogJyMxOTE5MTknLFxuICAgICAgICBoaWdobGlnaHQ6ICcjM2MzYzNjJyxcbiAgICAgICAgZ3JheTogJyM5OTknLFxuICAgICAgICBhY2NlbnQ6ICcjZTBlMGUwJ1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZm9udHM6IHtcbiAgICBib2R5OiAnU2lsb20sIG1vbm9zcGFjZScsXG4gICAgaGVhZGluZzogJ1NpbG9tLCBtb25vc3BhY2UnLFxuICAgIG1vbm9zcGFjZTogJ1NpbG9tLCBtb25vc3BhY2UnXG4gIH0sXG4gIGZvbnRTaXplczogWzEyLCAxNCwgMTYsIDIwLCAyNCwgMzIsIDQ4LCA2NCwgNzJdLFxuICBmb250V2VpZ2h0czoge1xuICAgIGJvZHk6IDQwMCxcbiAgICBoZWFkaW5nOiA3MDAsXG4gICAgZGlzcGxheTogOTAwXG4gIH0sXG4gIGxpbmVIZWlnaHRzOiB7XG4gICAgYm9keTogMS41LFxuICAgIGhlYWRpbmc6IDEuMjVcbiAgfSxcbiAgdGV4dFN0eWxlczoge1xuICAgIGhlYWRpbmcsXG4gICAgZGlzcGxheToge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogWzUsIDZdLFxuICAgICAgZm9udFdlaWdodDogJ2Rpc3BsYXknLFxuICAgICAgbGV0dGVyU3BhY2luZzogJy0wLjAzZW0nLFxuICAgICAgbXQ6IDNcbiAgICB9XG4gIH0sXG4gIHN0eWxlczoge1xuICAgIENvbnRhaW5lcjoge1xuICAgICAgcDogMyxcbiAgICAgIG1heFdpZHRoOiAxMDI0XG4gICAgfSxcbiAgICByb290OiB7XG4gICAgICBmb250RmFtaWx5OiAnYm9keScsXG4gICAgICBsaW5lSGVpZ2h0OiAnYm9keScsXG4gICAgICBmb250V2VpZ2h0OiAnYm9keSdcbiAgICB9LFxuICAgIGgxOiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5kaXNwbGF5J1xuICAgIH0sXG4gICAgaDI6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDVcbiAgICB9LFxuICAgIGgzOiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiA0XG4gICAgfSxcbiAgICBoNDoge1xuICAgICAgdmFyaWFudDogJ3RleHRTdHlsZXMuaGVhZGluZycsXG4gICAgICBmb250U2l6ZTogM1xuICAgIH0sXG4gICAgaDU6IHtcbiAgICAgIHZhcmlhbnQ6ICd0ZXh0U3R5bGVzLmhlYWRpbmcnLFxuICAgICAgZm9udFNpemU6IDJcbiAgICB9LFxuICAgIGg2OiB7XG4gICAgICB2YXJpYW50OiAndGV4dFN0eWxlcy5oZWFkaW5nJyxcbiAgICAgIGZvbnRTaXplOiAxXG4gICAgfSxcbiAgICBwOiB7XG4gICAgICBmb250U2l6ZTogMlxuICAgIH0sXG4gICAgYToge1xuICAgICAgY29sb3I6ICdwcmltYXJ5JyxcbiAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICBjb2xvcjogJ3NlY29uZGFyeSdcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZToge1xuICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsXG4gICAgICBmb250U2l6ZTogMSxcbiAgICAgIHA6IDMsXG4gICAgICBjb2xvcjogJ3RleHQnLFxuICAgICAgYmc6ICdtdXRlZCcsXG4gICAgICBib3JkZXJDb2xvcjogJ3RleHQnLFxuICAgICAgYm9yZGVyU3R5bGU6ICdzb2xpZCcsXG4gICAgICBib3JkZXJUb3BXaWR0aDogMCxcbiAgICAgIGJvcmRlckxlZnRXaWR0aDogMCxcbiAgICAgIGJvcmRlclJpZ2h0V2lkdGg6IDgsXG4gICAgICBib3JkZXJCb3R0b21XaWR0aDogOCxcbiAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICBjb2RlOiB7XG4gICAgICAgIGNvbG9yOiAnaW5oZXJpdCdcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvZGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgZm9udFNpemU6IDFcbiAgICB9LFxuICAgIGlubGluZUNvZGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgY29sb3I6ICdzZWNvbmRhcnknLFxuICAgICAgYmc6ICdtdXRlZCcsXG4gICAgICBweDogMlxuICAgIH0sXG4gICAgdWw6IHtcbiAgICAgIGxpc3RTdHlsZVR5cGU6ICdzcXVhcmUnXG4gICAgfSxcbiAgICB0YWJsZToge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIG15OiA0LFxuICAgICAgYm9yZGVyQ29sbGFwc2U6ICdzZXBhcmF0ZScsXG4gICAgICBib3JkZXJTcGFjaW5nOiAwLFxuICAgICAgJ3RoLHRkJzoge1xuICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgcHk6ICc0cHgnLFxuICAgICAgICBwcjogJzRweCcsXG4gICAgICAgIHBsOiAwLFxuICAgICAgICBib3JkZXJDb2xvcjogJ3RleHQnLFxuICAgICAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJ1xuICAgICAgfVxuICAgIH0sXG4gICAgdGg6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ211dGVkJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxuICAgICAgYm9yZGVyQm90dG9tV2lkdGg6IDhcbiAgICB9LFxuICAgIHRkOiB7XG4gICAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJyxcbiAgICAgIGJvcmRlckJvdHRvbVdpZHRoOiA0XG4gICAgfSxcbiAgICBocjoge1xuICAgICAgYm9yZGVyOiAwLFxuICAgICAgYm9yZGVyQm90dG9tOiAnOHB4IHNvbGlkJyxcbiAgICAgIGJvcmRlckNvbG9yOiAndGV4dCdcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvc2g7XG5leHBvcnQgeyB0b3NoIH07XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIGJhc2UgfSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0LWJhc2UnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBkYXJrIH0gZnJvbSAnQHRoZW1lLXVpL3ByZXNldC1kYXJrJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZGVlcCB9IGZyb20gJ0B0aGVtZS11aS9wcmVzZXQtZGVlcCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGZ1bmsgfSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0LWZ1bmsnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBmdXR1cmUgfSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0LWZ1dHVyZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHJvYm90byB9IGZyb20gJ0B0aGVtZS11aS9wcmVzZXQtcm9ib3RvJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3dpc3MgfSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0LXN3aXNzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3lzdGVtIH0gZnJvbSAnQHRoZW1lLXVpL3ByZXNldC1zeXN0ZW0nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0b3NoIH0gZnJvbSAnQHRoZW1lLXVpL3ByZXNldC10b3NoJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYm9vdHN0cmFwIH0gZnJvbSAnQHRoZW1lLXVpL3ByZXNldC1ib290c3RyYXAnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBidWxtYSB9IGZyb20gJ0B0aGVtZS11aS9wcmVzZXQtYnVsbWEnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwb2xhcmlzIH0gZnJvbSAnQHRoZW1lLXVpL3ByZXNldC1wb2xhcmlzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdGFpbHdpbmQgfSBmcm9tICdAdGhlbWUtdWkvcHJlc2V0LXRhaWx3aW5kJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc2tldGNoeSB9IGZyb20gJ0B0aGVtZS11aS9wcmVzZXQtc2tldGNoeSc7XG4iLCJpbXBvcnQgeyB1c2VUaGVtZVVJLCBqc3gsIFRoZW1lUHJvdmlkZXIgYXMgVGhlbWVQcm92aWRlciQxIH0gZnJvbSAnQHRoZW1lLXVpL2NvcmUnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQHRoZW1lLXVpL2Nzcyc7XG5pbXBvcnQgeyBDb2xvck1vZGVQcm92aWRlciB9IGZyb20gJ0B0aGVtZS11aS9jb2xvci1tb2Rlcyc7XG5pbXBvcnQgeyBNRFhQcm92aWRlciB9IGZyb20gJ0B0aGVtZS11aS9tZHgnO1xuaW1wb3J0IHsgR2xvYmFsIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5jb25zdCBSb290U3R5bGVzID0gKCkgPT4ganN4KEdsb2JhbCwge1xuICBzdHlsZXM6IGVtb3Rpb25UaGVtZSA9PiB7XG4gICAgdmFyIF90aGVtZSRjb25maWc7XG5cbiAgICBjb25zdCB0aGVtZSA9IGVtb3Rpb25UaGVtZTtcbiAgICBjb25zdCB7XG4gICAgICB1c2VSb290U3R5bGVzXG4gICAgfSA9IHRoZW1lLmNvbmZpZyB8fCB0aGVtZTtcblxuICAgIGlmICh1c2VSb290U3R5bGVzID09PSBmYWxzZSB8fCB0aGVtZS5zdHlsZXMgJiYgIXRoZW1lLnN0eWxlcy5yb290KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBib3hTaXppbmcgPSAoKF90aGVtZSRjb25maWcgPSB0aGVtZS5jb25maWcpID09IG51bGwgPyB2b2lkIDAgOiBfdGhlbWUkY29uZmlnLnVzZUJvcmRlckJveCkgPT09IGZhbHNlID8gdW5kZWZpbmVkIDogJ2JvcmRlci1ib3gnO1xuICAgIHJldHVybiBjc3Moe1xuICAgICAgJyonOiB7XG4gICAgICAgIGJveFNpemluZ1xuICAgICAgfSxcbiAgICAgIGh0bWw6IHtcbiAgICAgICAgdmFyaWFudDogJ3N0eWxlcy5yb290J1xuICAgICAgfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgbWFyZ2luOiAwXG4gICAgICB9XG4gICAgfSkodGhlbWUpO1xuICB9XG59KTtcblxuY29uc3QgVGhlbWVQcm92aWRlciA9ICh7XG4gIHRoZW1lLFxuICBjb21wb25lbnRzLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBvdXRlciA9IHVzZVRoZW1lVUkoKTtcblxuICBpZiAodHlwZW9mIG91dGVyLnNldENvbG9yTW9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBqc3goVGhlbWVQcm92aWRlciQxLCB7XG4gICAgICB0aGVtZVxuICAgIH0sIGpzeChNRFhQcm92aWRlciwge1xuICAgICAgY29tcG9uZW50cyxcbiAgICAgIGNoaWxkcmVuXG4gICAgfSkpO1xuICB9XG5cbiAgcmV0dXJuIGpzeChUaGVtZVByb3ZpZGVyJDEsIHtcbiAgICB0aGVtZVxuICB9LCBqc3goQ29sb3JNb2RlUHJvdmlkZXIsIG51bGwsIGpzeChSb290U3R5bGVzKSwganN4KE1EWFByb3ZpZGVyLCB7XG4gICAgY29tcG9uZW50cyxcbiAgICBjaGlsZHJlblxuICB9KSkpO1xufTtcblxuZXhwb3J0IHsgVGhlbWVQcm92aWRlciB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNNZXJnZWFibGVPYmplY3QgPSBmdW5jdGlvbiBpc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gaXNOb25OdWxsT2JqZWN0KHZhbHVlKVxuXHRcdCYmICFpc1NwZWNpYWwodmFsdWUpXG59O1xuXG5mdW5jdGlvbiBpc05vbk51bGxPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc1NwZWNpYWwodmFsdWUpIHtcblx0dmFyIHN0cmluZ1ZhbHVlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuXHRyZXR1cm4gc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG5cdFx0fHwgc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IERhdGVdJ1xuXHRcdHx8IGlzUmVhY3RFbGVtZW50KHZhbHVlKVxufVxuXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYjVhYzk2M2ZiNzkxZDEyOThlN2YzOTYyMzYzODNiYzk1NWY5MTZjMS9zcmMvaXNvbW9ycGhpYy9jbGFzc2ljL2VsZW1lbnQvUmVhY3RFbGVtZW50LmpzI0wyMS1MMjVcbnZhciBjYW5Vc2VTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gY2FuVXNlU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xuXG5mdW5jdGlvbiBpc1JlYWN0RWxlbWVudCh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRVxufVxuXG5mdW5jdGlvbiBlbXB0eVRhcmdldCh2YWwpIHtcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IFtdIDoge31cbn1cblxuZnVuY3Rpb24gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodmFsdWUsIG9wdGlvbnMpIHtcblx0cmV0dXJuIChvcHRpb25zLmNsb25lICE9PSBmYWxzZSAmJiBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSlcblx0XHQ/IGRlZXBtZXJnZShlbXB0eVRhcmdldCh2YWx1ZSksIHZhbHVlLCBvcHRpb25zKVxuXHRcdDogdmFsdWVcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0cmV0dXJuIHRhcmdldC5jb25jYXQoc291cmNlKS5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChlbGVtZW50LCBvcHRpb25zKVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykge1xuXHRpZiAoIW9wdGlvbnMuY3VzdG9tTWVyZ2UpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlXG5cdH1cblx0dmFyIGN1c3RvbU1lcmdlID0gb3B0aW9ucy5jdXN0b21NZXJnZShrZXkpO1xuXHRyZXR1cm4gdHlwZW9mIGN1c3RvbU1lcmdlID09PSAnZnVuY3Rpb24nID8gY3VzdG9tTWVyZ2UgOiBkZWVwbWVyZ2Vcbn1cblxuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNcblx0XHQ/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KS5maWx0ZXIoZnVuY3Rpb24oc3ltYm9sKSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0LnByb3BlcnR5SXNFbnVtZXJhYmxlKHN5bWJvbClcblx0XHR9KVxuXHRcdDogW11cbn1cblxuZnVuY3Rpb24gZ2V0S2V5cyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKHRhcmdldCkuY29uY2F0KGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSlcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlJc09uT2JqZWN0KG9iamVjdCwgcHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gcHJvcGVydHkgaW4gb2JqZWN0XG5cdH0gY2F0Y2goXykge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG5cbi8vIFByb3RlY3RzIGZyb20gcHJvdG90eXBlIHBvaXNvbmluZyBhbmQgdW5leHBlY3RlZCBtZXJnaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG5mdW5jdGlvbiBwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSB7XG5cdHJldHVybiBwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpIC8vIFByb3BlcnRpZXMgYXJlIHNhZmUgdG8gbWVyZ2UgaWYgdGhleSBkb24ndCBleGlzdCBpbiB0aGUgdGFyZ2V0IHlldCxcblx0XHQmJiAhKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSAvLyB1bnNhZmUgaWYgdGhleSBleGlzdCB1cCB0aGUgcHJvdG90eXBlIGNoYWluLFxuXHRcdFx0JiYgT2JqZWN0LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGFyZ2V0LCBrZXkpKSAvLyBhbmQgYWxzbyB1bnNhZmUgaWYgdGhleSdyZSBub25lbnVtZXJhYmxlLlxufVxuXG5mdW5jdGlvbiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHR2YXIgZGVzdGluYXRpb24gPSB7fTtcblx0aWYgKG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodGFyZ2V0KSkge1xuXHRcdGdldEtleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHRhcmdldFtrZXldLCBvcHRpb25zKTtcblx0XHR9KTtcblx0fVxuXHRnZXRLZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRpZiAocHJvcGVydHlJc1Vuc2FmZSh0YXJnZXQsIGtleSkpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdGlmIChwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3Qoc291cmNlW2tleV0pKSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGRlc3RpbmF0aW9uXG59XG5cbmZ1bmN0aW9uIGRlZXBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0b3B0aW9ucy5hcnJheU1lcmdlID0gb3B0aW9ucy5hcnJheU1lcmdlIHx8IGRlZmF1bHRBcnJheU1lcmdlO1xuXHRvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0ID0gb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCB8fCBpc01lcmdlYWJsZU9iamVjdDtcblx0Ly8gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgaXMgYWRkZWQgdG8gYG9wdGlvbnNgIHNvIHRoYXQgY3VzdG9tIGFycmF5TWVyZ2UoKVxuXHQvLyBpbXBsZW1lbnRhdGlvbnMgY2FuIHVzZSBpdC4gVGhlIGNhbGxlciBtYXkgbm90IHJlcGxhY2UgaXQuXG5cdG9wdGlvbnMuY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZDtcblxuXHR2YXIgc291cmNlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoc291cmNlKTtcblx0dmFyIHRhcmdldElzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRhcmdldCk7XG5cdHZhciBzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoID0gc291cmNlSXNBcnJheSA9PT0gdGFyZ2V0SXNBcnJheTtcblxuXHRpZiAoIXNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2gpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2UgaWYgKHNvdXJjZUlzQXJyYXkpIHtcblx0XHRyZXR1cm4gb3B0aW9ucy5hcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucylcblx0fVxufVxuXG5kZWVwbWVyZ2UuYWxsID0gZnVuY3Rpb24gZGVlcG1lcmdlQWxsKGFycmF5LCBvcHRpb25zKSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ZpcnN0IGFyZ3VtZW50IHNob3VsZCBiZSBhbiBhcnJheScpXG5cdH1cblxuXHRyZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKHByZXYsIG5leHQpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlKHByZXYsIG5leHQsIG9wdGlvbnMpXG5cdH0sIHt9KVxufTtcblxudmFyIGRlZXBtZXJnZV8xID0gZGVlcG1lcmdlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZXBtZXJnZV8xO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTUsIFlhaG9vISBJbmMuXG4gKiBDb3B5cmlnaHRzIGxpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIExpY2Vuc2UuIFNlZSB0aGUgYWNjb21wYW55aW5nIExJQ0VOU0UgZmlsZSBmb3IgdGVybXMuXG4gKi9cbnZhciBSRUFDVF9TVEFUSUNTID0ge1xuICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgY29udGV4dFR5cGU6IHRydWUsXG4gIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3I6IHRydWUsXG4gIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wczogdHJ1ZSxcbiAgbWl4aW5zOiB0cnVlLFxuICBwcm9wVHlwZXM6IHRydWUsXG4gIHR5cGU6IHRydWVcbn07XG52YXIgS05PV05fU1RBVElDUyA9IHtcbiAgbmFtZTogdHJ1ZSxcbiAgbGVuZ3RoOiB0cnVlLFxuICBwcm90b3R5cGU6IHRydWUsXG4gIGNhbGxlcjogdHJ1ZSxcbiAgY2FsbGVlOiB0cnVlLFxuICBhcmd1bWVudHM6IHRydWUsXG4gIGFyaXR5OiB0cnVlXG59O1xudmFyIEZPUldBUkRfUkVGX1NUQVRJQ1MgPSB7XG4gICckJHR5cGVvZic6IHRydWUsXG4gIHJlbmRlcjogdHJ1ZSxcbiAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgcHJvcFR5cGVzOiB0cnVlXG59O1xudmFyIE1FTU9fU1RBVElDUyA9IHtcbiAgJyQkdHlwZW9mJzogdHJ1ZSxcbiAgY29tcGFyZTogdHJ1ZSxcbiAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgcHJvcFR5cGVzOiB0cnVlLFxuICB0eXBlOiB0cnVlXG59O1xudmFyIFRZUEVfU1RBVElDUyA9IHt9O1xuVFlQRV9TVEFUSUNTW3JlYWN0SXMuRm9yd2FyZFJlZl0gPSBGT1JXQVJEX1JFRl9TVEFUSUNTO1xuVFlQRV9TVEFUSUNTW3JlYWN0SXMuTWVtb10gPSBNRU1PX1NUQVRJQ1M7XG5cbmZ1bmN0aW9uIGdldFN0YXRpY3MoY29tcG9uZW50KSB7XG4gIC8vIFJlYWN0IHYxNi4xMSBhbmQgYmVsb3dcbiAgaWYgKHJlYWN0SXMuaXNNZW1vKGNvbXBvbmVudCkpIHtcbiAgICByZXR1cm4gTUVNT19TVEFUSUNTO1xuICB9IC8vIFJlYWN0IHYxNi4xMiBhbmQgYWJvdmVcblxuXG4gIHJldHVybiBUWVBFX1NUQVRJQ1NbY29tcG9uZW50WyckJHR5cGVvZiddXSB8fCBSRUFDVF9TVEFUSUNTO1xufVxuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuZnVuY3Rpb24gaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBzb3VyY2VDb21wb25lbnQsIGJsYWNrbGlzdCkge1xuICBpZiAodHlwZW9mIHNvdXJjZUNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgIHZhciBpbmhlcml0ZWRDb21wb25lbnQgPSBnZXRQcm90b3R5cGVPZihzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgICBpZiAoaW5oZXJpdGVkQ29tcG9uZW50ICYmIGluaGVyaXRlZENvbXBvbmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgaWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0U3RhdGljcyA9IGdldFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50KTtcbiAgICB2YXIgc291cmNlU3RhdGljcyA9IGdldFN0YXRpY3Moc291cmNlQ29tcG9uZW50KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgIGlmICghS05PV05fU1RBVElDU1trZXldICYmICEoYmxhY2tsaXN0ICYmIGJsYWNrbGlzdFtrZXldKSAmJiAhKHNvdXJjZVN0YXRpY3MgJiYgc291cmNlU3RhdGljc1trZXldKSAmJiAhKHRhcmdldFN0YXRpY3MgJiYgdGFyZ2V0U3RhdGljc1trZXldKSkge1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2VDb21wb25lbnQsIGtleSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBBdm9pZCBmYWlsdXJlcyBmcm9tIHJlYWQtb25seSBwcm9wZXJ0aWVzXG4gICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9pc3ROb25SZWFjdFN0YXRpY3M7XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjEzLjFcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTsgLy8gVE9ETzogV2UgZG9uJ3QgdXNlIEFzeW5jTW9kZSBvciBDb25jdXJyZW50TW9kZSBhbnltb3JlLiBUaGV5IHdlcmUgdGVtcG9yYXJ5XG4vLyAodW5zdGFibGUpIEFQSXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZC4gQ2FuIHdlIHJlbW92ZSB0aGUgc3ltYm9scz9cblxudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0JMT0NLX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5ibG9jaycpIDogMHhlYWQ5O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1JFU1BPTkRFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucmVzcG9uZGVyJykgOiAweGVhZDY7XG52YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1JFU1BPTkRFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1NDT1BFX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQkxPQ0tfVFlQRSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcblxuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSAvLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG5cbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlOyAvLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcblxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7IC8vIFVzaW5nIGNvbnNvbGVbJ3dhcm4nXSB0byBldmFkZSBCYWJlbCBhbmQgRVNMaW50XG5cbiAgICAgIGNvbnNvbGVbJ3dhcm4nXSgnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiXG4gICAgKHdpbmRvdy5fX05FWFRfUCA9IHdpbmRvdy5fX05FWFRfUCB8fCBbXSkucHVzaChbXG4gICAgICBcIi9fYXBwXCIsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19hcHAuanN4XCIpO1xuICAgICAgfVxuICAgIF0pO1xuICAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvbGluaycpXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlU3R5bGVGdW5jdGlvbiwgY3JlYXRlUGFyc2VyIH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29yZSc7IC8vIHY0IGFwaSBzaGltc1xuXG5pbXBvcnQgbGF5b3V0IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2xheW91dCc7XG5pbXBvcnQgY29sb3IgZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29sb3InO1xuaW1wb3J0IHR5cG9ncmFwaHkgZnJvbSAnQHN0eWxlZC1zeXN0ZW0vdHlwb2dyYXBoeSc7XG5pbXBvcnQgZmxleGJveCBmcm9tICdAc3R5bGVkLXN5c3RlbS9mbGV4Ym94JztcbmltcG9ydCBncmlkIGZyb20gJ0BzdHlsZWQtc3lzdGVtL2dyaWQnO1xuaW1wb3J0IGJvcmRlciBmcm9tICdAc3R5bGVkLXN5c3RlbS9ib3JkZXInO1xuaW1wb3J0IGJhY2tncm91bmQgZnJvbSAnQHN0eWxlZC1zeXN0ZW0vYmFja2dyb3VuZCc7XG5pbXBvcnQgcG9zaXRpb24gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vcG9zaXRpb24nO1xuZXhwb3J0IHsgZ2V0LCBjcmVhdGVQYXJzZXIsIGNyZWF0ZVN0eWxlRnVuY3Rpb24sIGNvbXBvc2UsIHN5c3RlbSB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2NvcmUnO1xuZXhwb3J0IHsgbWFyZ2luLCBwYWRkaW5nLCBzcGFjZSB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL3NwYWNlJztcbmV4cG9ydCB7IGNvbG9yIH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vY29sb3InO1xuZXhwb3J0IHsgbGF5b3V0IH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vbGF5b3V0JztcbmV4cG9ydCB7IHR5cG9ncmFwaHkgfSBmcm9tICdAc3R5bGVkLXN5c3RlbS90eXBvZ3JhcGh5JztcbmV4cG9ydCB7IGZsZXhib3ggfSBmcm9tICdAc3R5bGVkLXN5c3RlbS9mbGV4Ym94JztcbmV4cG9ydCB7IGJvcmRlciB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2JvcmRlcic7XG5leHBvcnQgeyBiYWNrZ3JvdW5kIH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vYmFja2dyb3VuZCc7XG5leHBvcnQgeyBwb3NpdGlvbiB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL3Bvc2l0aW9uJztcbmV4cG9ydCB7IGdyaWQgfSBmcm9tICdAc3R5bGVkLXN5c3RlbS9ncmlkJztcbmV4cG9ydCB7IHNoYWRvdyB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL3NoYWRvdyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGJveFNoYWRvdywgZGVmYXVsdCBhcyB0ZXh0U2hhZG93IH0gZnJvbSAnQHN0eWxlZC1zeXN0ZW0vc2hhZG93JztcbmV4cG9ydCB7IHZhcmlhbnQsIGJ1dHRvblN0eWxlLCB0ZXh0U3R5bGUsIGNvbG9yU3R5bGUgfSBmcm9tICdAc3R5bGVkLXN5c3RlbS92YXJpYW50JztcbnZhciB3aWR0aCA9IGxheW91dC53aWR0aCxcbiAgICBoZWlnaHQgPSBsYXlvdXQuaGVpZ2h0LFxuICAgIG1pbldpZHRoID0gbGF5b3V0Lm1pbldpZHRoLFxuICAgIG1pbkhlaWdodCA9IGxheW91dC5taW5IZWlnaHQsXG4gICAgbWF4V2lkdGggPSBsYXlvdXQubWF4V2lkdGgsXG4gICAgbWF4SGVpZ2h0ID0gbGF5b3V0Lm1heEhlaWdodCxcbiAgICBzaXplID0gbGF5b3V0LnNpemUsXG4gICAgdmVydGljYWxBbGlnbiA9IGxheW91dC52ZXJ0aWNhbEFsaWduLFxuICAgIGRpc3BsYXkgPSBsYXlvdXQuZGlzcGxheSxcbiAgICBvdmVyZmxvdyA9IGxheW91dC5vdmVyZmxvdyxcbiAgICBvdmVyZmxvd1ggPSBsYXlvdXQub3ZlcmZsb3dYLFxuICAgIG92ZXJmbG93WSA9IGxheW91dC5vdmVyZmxvd1k7XG52YXIgb3BhY2l0eSA9IGNvbG9yLm9wYWNpdHk7XG52YXIgZm9udFNpemUgPSB0eXBvZ3JhcGh5LmZvbnRTaXplLFxuICAgIGZvbnRGYW1pbHkgPSB0eXBvZ3JhcGh5LmZvbnRGYW1pbHksXG4gICAgZm9udFdlaWdodCA9IHR5cG9ncmFwaHkuZm9udFdlaWdodCxcbiAgICBsaW5lSGVpZ2h0ID0gdHlwb2dyYXBoeS5saW5lSGVpZ2h0LFxuICAgIHRleHRBbGlnbiA9IHR5cG9ncmFwaHkudGV4dEFsaWduLFxuICAgIGZvbnRTdHlsZSA9IHR5cG9ncmFwaHkuZm9udFN0eWxlLFxuICAgIGxldHRlclNwYWNpbmcgPSB0eXBvZ3JhcGh5LmxldHRlclNwYWNpbmc7XG52YXIgYWxpZ25JdGVtcyA9IGZsZXhib3guYWxpZ25JdGVtcyxcbiAgICBhbGlnbkNvbnRlbnQgPSBmbGV4Ym94LmFsaWduQ29udGVudCxcbiAgICBqdXN0aWZ5SXRlbXMgPSBmbGV4Ym94Lmp1c3RpZnlJdGVtcyxcbiAgICBqdXN0aWZ5Q29udGVudCA9IGZsZXhib3guanVzdGlmeUNvbnRlbnQsXG4gICAgZmxleFdyYXAgPSBmbGV4Ym94LmZsZXhXcmFwLFxuICAgIGZsZXhEaXJlY3Rpb24gPSBmbGV4Ym94LmZsZXhEaXJlY3Rpb24sXG4gICAgZmxleCA9IGZsZXhib3guZmxleCxcbiAgICBmbGV4R3JvdyA9IGZsZXhib3guZmxleEdyb3csXG4gICAgZmxleFNocmluayA9IGZsZXhib3guZmxleFNocmluayxcbiAgICBmbGV4QmFzaXMgPSBmbGV4Ym94LmZsZXhCYXNpcyxcbiAgICBqdXN0aWZ5U2VsZiA9IGZsZXhib3guanVzdGlmeVNlbGYsXG4gICAgYWxpZ25TZWxmID0gZmxleGJveC5hbGlnblNlbGYsXG4gICAgb3JkZXIgPSBmbGV4Ym94Lm9yZGVyO1xudmFyIGdyaWRHYXAgPSBncmlkLmdyaWRHYXAsXG4gICAgZ3JpZENvbHVtbkdhcCA9IGdyaWQuZ3JpZENvbHVtbkdhcCxcbiAgICBncmlkUm93R2FwID0gZ3JpZC5ncmlkUm93R2FwLFxuICAgIGdyaWRDb2x1bW4gPSBncmlkLmdyaWRDb2x1bW4sXG4gICAgZ3JpZFJvdyA9IGdyaWQuZ3JpZFJvdyxcbiAgICBncmlkQXV0b0Zsb3cgPSBncmlkLmdyaWRBdXRvRmxvdyxcbiAgICBncmlkQXV0b0NvbHVtbnMgPSBncmlkLmdyaWRBdXRvQ29sdW1ucyxcbiAgICBncmlkQXV0b1Jvd3MgPSBncmlkLmdyaWRBdXRvUm93cyxcbiAgICBncmlkVGVtcGxhdGVDb2x1bW5zID0gZ3JpZC5ncmlkVGVtcGxhdGVDb2x1bW5zLFxuICAgIGdyaWRUZW1wbGF0ZVJvd3MgPSBncmlkLmdyaWRUZW1wbGF0ZVJvd3MsXG4gICAgZ3JpZFRlbXBsYXRlQXJlYXMgPSBncmlkLmdyaWRUZW1wbGF0ZUFyZWFzLFxuICAgIGdyaWRBcmVhID0gZ3JpZC5ncmlkQXJlYTtcbnZhciBib3JkZXJXaWR0aCA9IGJvcmRlci5ib3JkZXJXaWR0aCxcbiAgICBib3JkZXJTdHlsZSA9IGJvcmRlci5ib3JkZXJTdHlsZSxcbiAgICBib3JkZXJDb2xvciA9IGJvcmRlci5ib3JkZXJDb2xvcixcbiAgICBib3JkZXJUb3AgPSBib3JkZXIuYm9yZGVyVG9wLFxuICAgIGJvcmRlclJpZ2h0ID0gYm9yZGVyLmJvcmRlclJpZ2h0LFxuICAgIGJvcmRlckJvdHRvbSA9IGJvcmRlci5ib3JkZXJCb3R0b20sXG4gICAgYm9yZGVyTGVmdCA9IGJvcmRlci5ib3JkZXJMZWZ0LFxuICAgIGJvcmRlclJhZGl1cyA9IGJvcmRlci5ib3JkZXJSYWRpdXM7XG52YXIgYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZC5iYWNrZ3JvdW5kSW1hZ2UsXG4gICAgYmFja2dyb3VuZFNpemUgPSBiYWNrZ3JvdW5kLmJhY2tncm91bmRTaXplLFxuICAgIGJhY2tncm91bmRQb3NpdGlvbiA9IGJhY2tncm91bmQuYmFja2dyb3VuZFBvc2l0aW9uLFxuICAgIGJhY2tncm91bmRSZXBlYXQgPSBiYWNrZ3JvdW5kLmJhY2tncm91bmRSZXBlYXQ7XG52YXIgekluZGV4ID0gcG9zaXRpb24uekluZGV4LFxuICAgIHRvcCA9IHBvc2l0aW9uLnRvcCxcbiAgICByaWdodCA9IHBvc2l0aW9uLnJpZ2h0LFxuICAgIGJvdHRvbSA9IHBvc2l0aW9uLmJvdHRvbSxcbiAgICBsZWZ0ID0gcG9zaXRpb24ubGVmdDtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYm9yZGVycyB9IGZyb20gJ0BzdHlsZWQtc3lzdGVtL2JvcmRlcic7XG5leHBvcnQgeyB3aWR0aCwgaGVpZ2h0LCBtaW5XaWR0aCwgbWluSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0LCBzaXplLCB2ZXJ0aWNhbEFsaWduLCBkaXNwbGF5LCBvdmVyZmxvdywgb3ZlcmZsb3dYLCBvdmVyZmxvd1kgLy8gY29sb3Jcbiwgb3BhY2l0eSAvLyB0eXBvZ3JhcGh5XG4sIGZvbnRTaXplLCBmb250RmFtaWx5LCBmb250V2VpZ2h0LCBsaW5lSGVpZ2h0LCB0ZXh0QWxpZ24sIGZvbnRTdHlsZSwgbGV0dGVyU3BhY2luZyAvLyBmbGV4Ym94XG4sIGFsaWduSXRlbXMsIGFsaWduQ29udGVudCwganVzdGlmeUl0ZW1zLCBqdXN0aWZ5Q29udGVudCwgZmxleFdyYXAsIGZsZXhEaXJlY3Rpb24sIGZsZXgsIGZsZXhHcm93LCBmbGV4U2hyaW5rLCBmbGV4QmFzaXMsIGp1c3RpZnlTZWxmLCBhbGlnblNlbGYsIG9yZGVyIC8vIGdyaWRcbiwgZ3JpZEdhcCwgZ3JpZENvbHVtbkdhcCwgZ3JpZFJvd0dhcCwgZ3JpZENvbHVtbiwgZ3JpZFJvdywgZ3JpZEF1dG9GbG93LCBncmlkQXV0b0NvbHVtbnMsIGdyaWRBdXRvUm93cywgZ3JpZFRlbXBsYXRlQ29sdW1ucywgZ3JpZFRlbXBsYXRlUm93cywgZ3JpZFRlbXBsYXRlQXJlYXMsIGdyaWRBcmVhIC8vIGJvcmRlclxuLCBib3JkZXJXaWR0aCwgYm9yZGVyU3R5bGUsIGJvcmRlckNvbG9yLCBib3JkZXJUb3AsIGJvcmRlclJpZ2h0LCBib3JkZXJCb3R0b20sIGJvcmRlckxlZnQsIGJvcmRlclJhZGl1cyAvLyBiYWNrZ3JvdW5kXG4sIGJhY2tncm91bmRJbWFnZSwgYmFja2dyb3VuZFNpemUsIGJhY2tncm91bmRQb3NpdGlvbiwgYmFja2dyb3VuZFJlcGVhdCAvLyBwb3NpdGlvblxuLCB6SW5kZXgsIHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCB9OyAvLyB2NCBzdHlsZSBBUEkgc2hpbVxuXG5leHBvcnQgdmFyIHN0eWxlID0gZnVuY3Rpb24gc3R5bGUoX3JlZikge1xuICB2YXIgcHJvcCA9IF9yZWYucHJvcCxcbiAgICAgIGNzc1Byb3BlcnR5ID0gX3JlZi5jc3NQcm9wZXJ0eSxcbiAgICAgIGFsaWFzID0gX3JlZi5hbGlhcyxcbiAgICAgIGtleSA9IF9yZWYua2V5LFxuICAgICAgdHJhbnNmb3JtVmFsdWUgPSBfcmVmLnRyYW5zZm9ybVZhbHVlLFxuICAgICAgc2NhbGUgPSBfcmVmLnNjYWxlLFxuICAgICAgcHJvcGVydGllcyA9IF9yZWYucHJvcGVydGllcztcbiAgdmFyIGNvbmZpZyA9IHt9O1xuICBjb25maWdbcHJvcF0gPSBjcmVhdGVTdHlsZUZ1bmN0aW9uKHtcbiAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuICAgIHByb3BlcnR5OiBjc3NQcm9wZXJ0eSB8fCBwcm9wLFxuICAgIHNjYWxlOiBrZXksXG4gICAgZGVmYXVsdFNjYWxlOiBzY2FsZSxcbiAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybVZhbHVlXG4gIH0pO1xuICBpZiAoYWxpYXMpIGNvbmZpZ1thbGlhc10gPSBjb25maWdbcHJvcF07XG4gIHZhciBwYXJzZSA9IGNyZWF0ZVBhcnNlcihjb25maWcpO1xuICByZXR1cm4gcGFyc2U7XG59O1xuIiwiaW1wb3J0IHsganN4IGFzIGpzeCQxIH0gZnJvbSAnQHRoZW1lLXVpL2NvcmUnO1xuZXhwb3J0IHsgX19UaGVtZVVJQ29udGV4dCwgY3JlYXRlRWxlbWVudCwgbWVyZ2UsIHVzZVRoZW1lVUkgfSBmcm9tICdAdGhlbWUtdWkvY29yZSc7XG5leHBvcnQgeyBJbml0aWFsaXplQ29sb3JNb2RlLCB1c2VDb2xvck1vZGUgfSBmcm9tICdAdGhlbWUtdWkvY29sb3ItbW9kZXMnO1xuZXhwb3J0IHsgU3R5bGVkLCBUaGVtZWQsIGNvbXBvbmVudHMgfSBmcm9tICdAdGhlbWUtdWkvbWR4JztcbmV4cG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdAdGhlbWUtdWkvdGhlbWUtcHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnQHRoZW1lLXVpL2NvbXBvbmVudHMnO1xuZXhwb3J0IHsgY3NzLCBnZXQgfSBmcm9tICdAdGhlbWUtdWkvY3NzJztcblxuY29uc3QgQmFzZVN0eWxlcyA9IHByb3BzID0+IGpzeCgnZGl2JywgeyAuLi5wcm9wcyxcbiAgc3g6IHtcbiAgICBmb250RmFtaWx5OiAnYm9keScsXG4gICAgbGluZUhlaWdodDogJ2JvZHknLFxuICAgIGZvbnRXZWlnaHQ6ICdib2R5JyxcbiAgICB2YXJpYW50OiAnc3R5bGVzJ1xuICB9XG59KTtcbmNvbnN0IGpzeCA9IGpzeCQxO1xuXG5leHBvcnQgeyBCYXNlU3R5bGVzLCBqc3ggfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=