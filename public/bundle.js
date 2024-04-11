// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js"}],"../node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"../node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/modules/_core.js","./_global":"../node_modules/core-js/modules/_global.js","./_library":"../node_modules/core-js/modules/_library.js"}],"../node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"../node_modules/core-js/modules/_shared.js"}],"../node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_has":"../node_modules/core-js/modules/_has.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_function-to-string":"../node_modules/core-js/modules/_function-to-string.js","./_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_ctx":"../node_modules/core-js/modules/_ctx.js"}],"../node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js","./_hide":"../node_modules/core-js/modules/_hide.js"}],"../node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-copy-within":"../node_modules/core-js/modules/_array-copy-within.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_array-fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_is-array":"../node_modules/core-js/modules/_is-array.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"../node_modules/core-js/modules/_array-species-constructor.js"}],"../node_modules/core-js/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_array-species-create":"../node_modules/core-js/modules/_array-species-create.js"}],"../node_modules/core-js/modules/_strict-method.js":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.array.filter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"../node_modules/core-js/modules/_is-array.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_flatten-into-array":"../node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_array-species-create":"../node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../node_modules/core-js/modules/_iterators.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js"}],"../node_modules/core-js/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../node_modules/core-js/modules/_classof.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_iter-call":"../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_create-property":"../node_modules/core-js/modules/_create-property.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js"}],"../node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/modules/_iobject.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js"}],"../node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js"}],"../node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js"}],"../node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js"}],"../node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-dps":"../node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_html":"../node_modules/core-js/modules/_html.js"}],"../node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_has":"../node_modules/core-js/modules/_has.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/modules/_object-create.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/modules/_library.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_iter-create":"../node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/modules/_iter-step.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js"}],"../node_modules/core-js/modules/es6.array.map.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_strict-method":"../node_modules/core-js/modules/_strict-method.js"}],"../node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_create-property":"../node_modules/core-js/modules/_create-property.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.array.slice.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_html":"../node_modules/core-js/modules/_html.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/_date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js"}],"../node_modules/core-js/modules/es6.date.to-primitive.js":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"../node_modules/core-js/modules/_wks.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_date-to-primitive":"../node_modules/core-js/modules/_date-to-primitive.js"}],"../node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js"}],"../node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../node_modules/core-js/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_iter-call":"../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js"}],"../node_modules/core-js/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"../node_modules/core-js/modules/_uid.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_has":"../node_modules/core-js/modules/_has.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js","./_iter-step":"../node_modules/core-js/modules/_iter-step.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js"}],"../node_modules/core-js/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"../node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_has":"../node_modules/core-js/modules/_has.js","./_ie8-dom-define":"../node_modules/core-js/modules/_ie8-dom-define.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_set-proto.js":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js"}],"../node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js"}],"../node_modules/core-js/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"../node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-log1p":"../node_modules/core-js/modules/_math-log1p.js"}],"../node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_math-sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"../node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"../node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js"}],"../node_modules/core-js/modules/_math-fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-fround":"../node_modules/core-js/modules/_math-fround.js"}],"../node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-log1p":"../node_modules/core-js/modules/_math-log1p.js"}],"../node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-sign":"../node_modules/core-js/modules/_math-sign.js"}],"../node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_math-expm1":"../node_modules/core-js/modules/_math-expm1.js"}],"../node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js"}],"../node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../node_modules/core-js/modules/_export.js","./_defined":"../node_modules/core-js/modules/_defined.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"../node_modules/core-js/modules/_global.js","./_has":"../node_modules/core-js/modules/_has.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_is-integer":"../node_modules/core-js/modules/_is-integer.js"}],"../node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_is-integer":"../node_modules/core-js/modules/_is-integer.js"}],"../node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-float":"../node_modules/core-js/modules/_parse-float.js"}],"../node_modules/core-js/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_string-trim":"../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/modules/_string-ws.js"}],"../node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_parse-int":"../node_modules/core-js/modules/_parse-int.js"}],"../node_modules/core-js/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_iobject":"../node_modules/core-js/modules/_iobject.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-assign":"../node_modules/core-js/modules/_object-assign.js"}],"../node_modules/core-js/modules/_object-forced-pam.js":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"../node_modules/core-js/modules/_library.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es7.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es7.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports) {
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js"}],"../node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-to-array":"../node_modules/core-js/modules/_object-to-array.js"}],"../node_modules/core-js/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"../node_modules/core-js/modules/_export.js","./_core":"../node_modules/core-js/modules/_core.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_own-keys":"../node_modules/core-js/modules/_own-keys.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_create-property":"../node_modules/core-js/modules/_create-property.js"}],"../node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js"}],"../node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"../node_modules/core-js/modules/_object-sap.js","./_object-gopn-ext":"../node_modules/core-js/modules/_object-gopn-ext.js"}],"../node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../node_modules/core-js/modules/_object-forced-pam.js"}],"../node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.to-string.js":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"../node_modules/core-js/modules/_classof.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine":"../node_modules/core-js/modules/_redefine.js"}],"../node_modules/core-js/modules/_same-value.js":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"../node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_same-value":"../node_modules/core-js/modules/_same-value.js"}],"../node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/modules/_to-object.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-sap":"../node_modules/core-js/modules/_object-sap.js"}],"../node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-to-array":"../node_modules/core-js/modules/_object-to-array.js"}],"../node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_invoke":"../node_modules/core-js/modules/_invoke.js","./_html":"../node_modules/core-js/modules/_html.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_global":"../node_modules/core-js/modules/_global.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_task":"../node_modules/core-js/modules/_task.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"../node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"../node_modules/core-js/modules/_new-promise-capability.js"}],"../node_modules/core-js/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"../node_modules/core-js/modules/_library.js","./_global":"../node_modules/core-js/modules/_global.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_classof":"../node_modules/core-js/modules/_classof.js","./_export":"../node_modules/core-js/modules/_export.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_task":"../node_modules/core-js/modules/_task.js","./_microtask":"../node_modules/core-js/modules/_microtask.js","./_new-promise-capability":"../node_modules/core-js/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/modules/_perform.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js","./_promise-resolve":"../node_modules/core-js/modules/_promise-resolve.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_core":"../node_modules/core-js/modules/_core.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js"}],"../node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_core":"../node_modules/core-js/modules/_core.js","./_global":"../node_modules/core-js/modules/_global.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"../node_modules/core-js/modules/_promise-resolve.js"}],"../node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_global":"../node_modules/core-js/modules/_global.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_invoke":"../node_modules/core-js/modules/_invoke.js"}],"../node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_a-function":"../node_modules/core-js/modules/_a-function.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_bind":"../node_modules/core-js/modules/_bind.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_has":"../node_modules/core-js/modules/_has.js","./_export":"../node_modules/core-js/modules/_export.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"../node_modules/core-js/modules/_export.js","./_own-keys":"../node_modules/core-js/modules/_own-keys.js"}],"../node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_has":"../node_modules/core-js/modules/_has.js","./_export":"../node_modules/core-js/modules/_export.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_set-proto":"../node_modules/core-js/modules/_set-proto.js"}],"../node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_cof":"../node_modules/core-js/modules/_cof.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_flags.js":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js"}],"../node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"../node_modules/core-js/modules/_global.js","./_inherit-if-required":"../node_modules/core-js/modules/_inherit-if-required.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_flags":"../node_modules/core-js/modules/_flags.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_flags":"../node_modules/core-js/modules/_flags.js"}],"../node_modules/core-js/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_advance-string-index.js":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"../node_modules/core-js/modules/_string-at.js"}],"../node_modules/core-js/modules/_regexp-exec-abstract.js":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"../node_modules/core-js/modules/_classof.js"}],"../node_modules/core-js/modules/_regexp-exec.js":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"../node_modules/core-js/modules/_flags.js"}],"../node_modules/core-js/modules/es6.regexp.exec.js":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js","./_export":"../node_modules/core-js/modules/_export.js"}],"../node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"../node_modules/core-js/modules/es6.regexp.exec.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_defined":"../node_modules/core-js/modules/_defined.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js"}],"../node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_advance-string-index":"../node_modules/core-js/modules/_advance-string-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_regexp-exec":"../node_modules/core-js/modules/_regexp-exec.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_same-value":"../node_modules/core-js/modules/_same-value.js","./_regexp-exec-abstract":"../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../node_modules/core-js/modules/_fix-re-wks.js"}],"../node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"../node_modules/core-js/modules/es6.regexp.flags.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_flags":"../node_modules/core-js/modules/_flags.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/es6.set.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_library":"../node_modules/core-js/modules/_library.js","./_wks-ext":"../node_modules/core-js/modules/_wks-ext.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js"}],"../node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js"}],"../node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"../node_modules/core-js/modules/_global.js","./_has":"../node_modules/core-js/modules/_has.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_shared":"../node_modules/core-js/modules/_shared.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_wks-ext":"../node_modules/core-js/modules/_wks-ext.js","./_wks-define":"../node_modules/core-js/modules/_wks-define.js","./_enum-keys":"../node_modules/core-js/modules/_enum-keys.js","./_is-array":"../node_modules/core-js/modules/_is-array.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_object-gopn-ext":"../node_modules/core-js/modules/_object-gopn-ext.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js","./_object-gops":"../node_modules/core-js/modules/_object-gops.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-pie":"../node_modules/core-js/modules/_object-pie.js","./_library":"../node_modules/core-js/modules/_library.js","./_hide":"../node_modules/core-js/modules/_hide.js"}],"../node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"../node_modules/core-js/modules/_wks-define.js"}],"../node_modules/core-js/modules/_string-html.js":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"../node_modules/core-js/modules/_export.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-at":"../node_modules/core-js/modules/_string-at.js"}],"../node_modules/core-js/modules/_string-context.js":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"../node_modules/core-js/modules/_is-regexp.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js"}],"../node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"../node_modules/core-js/modules/_string-at.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js"}],"../node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-repeat":"../node_modules/core-js/modules/_string-repeat.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-pad":"../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-pad":"../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_string-repeat":"../node_modules/core-js/modules/_string-repeat.js"}],"../node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_string-context":"../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../node_modules/core-js/modules/_fails-is-regexp.js"}],"../node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"../node_modules/core-js/modules/_string-html.js"}],"../node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"../node_modules/core-js/modules/_string-trim.js"}],"../node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"../node_modules/core-js/modules/_string-trim.js"}],"../node_modules/core-js/modules/_typed.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_uid":"../node_modules/core-js/modules/_uid.js"}],"../node_modules/core-js/modules/_to-index.js":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js"}],"../node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_library":"../node_modules/core-js/modules/_library.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-index":"../node_modules/core-js/modules/_to-index.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js"}],"../node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"../node_modules/core-js/modules/_export.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../node_modules/core-js/modules/_typed-buffer.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_global":"../node_modules/core-js/modules/_global.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_set-species":"../node_modules/core-js/modules/_set-species.js"}],"../node_modules/core-js/modules/_typed-array.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_library":"../node_modules/core-js/modules/_library.js","./_global":"../node_modules/core-js/modules/_global.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_export":"../node_modules/core-js/modules/_export.js","./_typed":"../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../node_modules/core-js/modules/_typed-buffer.js","./_ctx":"../node_modules/core-js/modules/_ctx.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_to-integer":"../node_modules/core-js/modules/_to-integer.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-index":"../node_modules/core-js/modules/_to-index.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_has":"../node_modules/core-js/modules/_has.js","./_classof":"../node_modules/core-js/modules/_classof.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_is-array-iter":"../node_modules/core-js/modules/_is-array-iter.js","./_object-create":"../node_modules/core-js/modules/_object-create.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_object-gopn":"../node_modules/core-js/modules/_object-gopn.js","./core.get-iterator-method":"../node_modules/core-js/modules/core.get-iterator-method.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_wks":"../node_modules/core-js/modules/_wks.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_species-constructor":"../node_modules/core-js/modules/_species-constructor.js","./es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_iter-detect":"../node_modules/core-js/modules/_iter-detect.js","./_set-species":"../node_modules/core-js/modules/_set-species.js","./_array-fill":"../node_modules/core-js/modules/_array-fill.js","./_array-copy-within":"../node_modules/core-js/modules/_array-copy-within.js","./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../node_modules/core-js/modules/_object-gopd.js"}],"../node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../node_modules/core-js/modules/_typed-array.js"}],"../node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"../node_modules/core-js/modules/_redefine-all.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_an-instance":"../node_modules/core-js/modules/_an-instance.js","./_for-of":"../node_modules/core-js/modules/_for-of.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_has":"../node_modules/core-js/modules/_has.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js"}],"../node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"../node_modules/core-js/modules/_global.js","./_array-methods":"../node_modules/core-js/modules/_array-methods.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_meta":"../node_modules/core-js/modules/_meta.js","./_object-assign":"../node_modules/core-js/modules/_object-assign.js","./_collection-weak":"../node_modules/core-js/modules/_collection-weak.js","./_is-object":"../node_modules/core-js/modules/_is-object.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"../node_modules/core-js/modules/_collection-weak.js","./_validate-collection":"../node_modules/core-js/modules/_validate-collection.js","./_collection":"../node_modules/core-js/modules/_collection.js"}],"../node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_export":"../node_modules/core-js/modules/_export.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_task":"../node_modules/core-js/modules/_task.js"}],"../node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

    return generator;
  }
  exports.wrap = wrap;

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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

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
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
  defineProperty(
    GeneratorFunctionPrototype,
    "constructor",
    { value: GeneratorFunction, configurable: true }
  );
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
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
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
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
        return new PromiseImpl(function(resolve, reject) {
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
    defineProperty(this, "_invoke", { value: enqueue });
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
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
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next mehtod, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
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
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a '" + methodName + "' method");
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

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

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

  exports.keys = function(val) {
    var object = Object(val);
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
  exports.values = values;

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

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"../node_modules/fancy-canvas/size.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equalSizes = equalSizes;
exports.size = size;
function size(_a) {
  var width = _a.width,
    height = _a.height;
  if (width < 0) {
    throw new Error('Negative width is not allowed for Size');
  }
  if (height < 0) {
    throw new Error('Negative height is not allowed for Size');
  }
  return {
    width: width,
    height: height
  };
}
function equalSizes(first, second) {
  return first.width === second.width && first.height === second.height;
}
},{}],"../node_modules/fancy-canvas/device-pixel-ratio.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createObservable = createObservable;
var Observable = /** @class */function () {
  function Observable(win) {
    var _this = this;
    this._resolutionListener = function () {
      return _this._onResolutionChanged();
    };
    this._resolutionMediaQueryList = null;
    this._observers = [];
    this._window = win;
    this._installResolutionListener();
  }
  Observable.prototype.dispose = function () {
    this._uninstallResolutionListener();
    this._window = null;
  };
  Object.defineProperty(Observable.prototype, "value", {
    get: function () {
      return this._window.devicePixelRatio;
    },
    enumerable: false,
    configurable: true
  });
  Observable.prototype.subscribe = function (next) {
    var _this = this;
    var observer = {
      next: next
    };
    this._observers.push(observer);
    return {
      unsubscribe: function () {
        _this._observers = _this._observers.filter(function (o) {
          return o !== observer;
        });
      }
    };
  };
  Observable.prototype._installResolutionListener = function () {
    if (this._resolutionMediaQueryList !== null) {
      throw new Error('Resolution listener is already installed');
    }
    var dppx = this._window.devicePixelRatio;
    this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(dppx, "dppx)"));
    // IE and some versions of Edge do not support addEventListener/removeEventListener, and we are going to use the deprecated addListener/removeListener
    this._resolutionMediaQueryList.addListener(this._resolutionListener);
  };
  Observable.prototype._uninstallResolutionListener = function () {
    if (this._resolutionMediaQueryList !== null) {
      // IE and some versions of Edge do not support addEventListener/removeEventListener, and we are going to use the deprecated addListener/removeListener
      this._resolutionMediaQueryList.removeListener(this._resolutionListener);
      this._resolutionMediaQueryList = null;
    }
  };
  Observable.prototype._reinstallResolutionListener = function () {
    this._uninstallResolutionListener();
    this._installResolutionListener();
  };
  Observable.prototype._onResolutionChanged = function () {
    var _this = this;
    this._observers.forEach(function (observer) {
      return observer.next(_this._window.devicePixelRatio);
    });
    this._reinstallResolutionListener();
  };
  return Observable;
}();
function createObservable(win) {
  return new Observable(win);
}
},{}],"../node_modules/fancy-canvas/canvas-element-bitmap-size.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindTo = bindTo;
var _size = require("./size.mjs");
var _devicePixelRatio = require("./device-pixel-ratio.mjs");
var DevicePixelContentBoxBinding = /** @class */function () {
  function DevicePixelContentBoxBinding(canvasElement, transformBitmapSize, options) {
    var _a;
    this._canvasElement = null;
    this._bitmapSizeChangedListeners = [];
    this._suggestedBitmapSize = null;
    this._suggestedBitmapSizeChangedListeners = [];
    // devicePixelRatio approach
    this._devicePixelRatioObservable = null;
    // ResizeObserver approach
    this._canvasElementResizeObserver = null;
    this._canvasElement = canvasElement;
    this._canvasElementClientSize = (0, _size.size)({
      width: this._canvasElement.clientWidth,
      height: this._canvasElement.clientHeight
    });
    this._transformBitmapSize = transformBitmapSize !== null && transformBitmapSize !== void 0 ? transformBitmapSize : function (size) {
      return size;
    };
    this._allowResizeObserver = (_a = options === null || options === void 0 ? void 0 : options.allowResizeObserver) !== null && _a !== void 0 ? _a : true;
    this._chooseAndInitObserver();
    // we MAY leave the constuctor without any bitmap size observation mechanics initialized
  }
  DevicePixelContentBoxBinding.prototype.dispose = function () {
    var _a, _b;
    if (this._canvasElement === null) {
      throw new Error('Object is disposed');
    }
    (_a = this._canvasElementResizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    this._canvasElementResizeObserver = null;
    (_b = this._devicePixelRatioObservable) === null || _b === void 0 ? void 0 : _b.dispose();
    this._devicePixelRatioObservable = null;
    this._suggestedBitmapSizeChangedListeners.length = 0;
    this._bitmapSizeChangedListeners.length = 0;
    this._canvasElement = null;
  };
  Object.defineProperty(DevicePixelContentBoxBinding.prototype, "canvasElement", {
    get: function () {
      if (this._canvasElement === null) {
        throw new Error('Object is disposed');
      }
      return this._canvasElement;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DevicePixelContentBoxBinding.prototype, "canvasElementClientSize", {
    get: function () {
      return this._canvasElementClientSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DevicePixelContentBoxBinding.prototype, "bitmapSize", {
    get: function () {
      return (0, _size.size)({
        width: this.canvasElement.width,
        height: this.canvasElement.height
      });
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Use this function to change canvas element client size until binding is disposed
   * @param clientSize New client size for bound HTMLCanvasElement
   */
  DevicePixelContentBoxBinding.prototype.resizeCanvasElement = function (clientSize) {
    this._canvasElementClientSize = (0, _size.size)(clientSize);
    this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px");
    this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px");
    this._invalidateBitmapSize();
  };
  DevicePixelContentBoxBinding.prototype.subscribeBitmapSizeChanged = function (listener) {
    this._bitmapSizeChangedListeners.push(listener);
  };
  DevicePixelContentBoxBinding.prototype.unsubscribeBitmapSizeChanged = function (listener) {
    this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function (l) {
      return l !== listener;
    });
  };
  Object.defineProperty(DevicePixelContentBoxBinding.prototype, "suggestedBitmapSize", {
    get: function () {
      return this._suggestedBitmapSize;
    },
    enumerable: false,
    configurable: true
  });
  DevicePixelContentBoxBinding.prototype.subscribeSuggestedBitmapSizeChanged = function (listener) {
    this._suggestedBitmapSizeChangedListeners.push(listener);
  };
  DevicePixelContentBoxBinding.prototype.unsubscribeSuggestedBitmapSizeChanged = function (listener) {
    this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function (l) {
      return l !== listener;
    });
  };
  DevicePixelContentBoxBinding.prototype.applySuggestedBitmapSize = function () {
    if (this._suggestedBitmapSize === null) {
      // nothing to apply
      return;
    }
    var oldSuggestedSize = this._suggestedBitmapSize;
    this._suggestedBitmapSize = null;
    this._resizeBitmap(oldSuggestedSize);
    this._emitSuggestedBitmapSizeChanged(oldSuggestedSize, this._suggestedBitmapSize);
  };
  DevicePixelContentBoxBinding.prototype._resizeBitmap = function (newSize) {
    var oldSize = this.bitmapSize;
    if ((0, _size.equalSizes)(oldSize, newSize)) {
      return;
    }
    this.canvasElement.width = newSize.width;
    this.canvasElement.height = newSize.height;
    this._emitBitmapSizeChanged(oldSize, newSize);
  };
  DevicePixelContentBoxBinding.prototype._emitBitmapSizeChanged = function (oldSize, newSize) {
    var _this = this;
    this._bitmapSizeChangedListeners.forEach(function (listener) {
      return listener.call(_this, oldSize, newSize);
    });
  };
  DevicePixelContentBoxBinding.prototype._suggestNewBitmapSize = function (newSize) {
    var oldSuggestedSize = this._suggestedBitmapSize;
    var finalNewSize = (0, _size.size)(this._transformBitmapSize(newSize, this._canvasElementClientSize));
    var newSuggestedSize = (0, _size.equalSizes)(this.bitmapSize, finalNewSize) ? null : finalNewSize;
    if (oldSuggestedSize === null && newSuggestedSize === null) {
      return;
    }
    if (oldSuggestedSize !== null && newSuggestedSize !== null && (0, _size.equalSizes)(oldSuggestedSize, newSuggestedSize)) {
      return;
    }
    this._suggestedBitmapSize = newSuggestedSize;
    this._emitSuggestedBitmapSizeChanged(oldSuggestedSize, newSuggestedSize);
  };
  DevicePixelContentBoxBinding.prototype._emitSuggestedBitmapSizeChanged = function (oldSize, newSize) {
    var _this = this;
    this._suggestedBitmapSizeChangedListeners.forEach(function (listener) {
      return listener.call(_this, oldSize, newSize);
    });
  };
  DevicePixelContentBoxBinding.prototype._chooseAndInitObserver = function () {
    var _this = this;
    if (!this._allowResizeObserver) {
      this._initDevicePixelRatioObservable();
      return;
    }
    isDevicePixelContentBoxSupported().then(function (isSupported) {
      return isSupported ? _this._initResizeObserver() : _this._initDevicePixelRatioObservable();
    });
  };
  // devicePixelRatio approach
  DevicePixelContentBoxBinding.prototype._initDevicePixelRatioObservable = function () {
    var _this = this;
    if (this._canvasElement === null) {
      // it looks like we are already dead
      return;
    }
    var win = canvasElementWindow(this._canvasElement);
    if (win === null) {
      throw new Error('No window is associated with the canvas');
    }
    this._devicePixelRatioObservable = (0, _devicePixelRatio.createObservable)(win);
    this._devicePixelRatioObservable.subscribe(function () {
      return _this._invalidateBitmapSize();
    });
    this._invalidateBitmapSize();
  };
  DevicePixelContentBoxBinding.prototype._invalidateBitmapSize = function () {
    var _a, _b;
    if (this._canvasElement === null) {
      // it looks like we are already dead
      return;
    }
    var win = canvasElementWindow(this._canvasElement);
    if (win === null) {
      return;
    }
    var ratio = (_b = (_a = this._devicePixelRatioObservable) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : win.devicePixelRatio;
    var canvasRects = this._canvasElement.getClientRects();
    var newSize =
    // eslint-disable-next-line no-negated-condition
    canvasRects[0] !== undefined ? predictedBitmapSize(canvasRects[0], ratio) : (0, _size.size)({
      width: this._canvasElementClientSize.width * ratio,
      height: this._canvasElementClientSize.height * ratio
    });
    this._suggestNewBitmapSize(newSize);
  };
  // ResizeObserver approach
  DevicePixelContentBoxBinding.prototype._initResizeObserver = function () {
    var _this = this;
    if (this._canvasElement === null) {
      // it looks like we are already dead
      return;
    }
    this._canvasElementResizeObserver = new ResizeObserver(function (entries) {
      var entry = entries.find(function (entry) {
        return entry.target === _this._canvasElement;
      });
      if (!entry || !entry.devicePixelContentBoxSize || !entry.devicePixelContentBoxSize[0]) {
        return;
      }
      var entrySize = entry.devicePixelContentBoxSize[0];
      var newSize = (0, _size.size)({
        width: entrySize.inlineSize,
        height: entrySize.blockSize
      });
      _this._suggestNewBitmapSize(newSize);
    });
    this._canvasElementResizeObserver.observe(this._canvasElement, {
      box: 'device-pixel-content-box'
    });
  };
  return DevicePixelContentBoxBinding;
}();
function bindTo(canvasElement, target) {
  if (target.type === 'device-pixel-content-box') {
    return new DevicePixelContentBoxBinding(canvasElement, target.transform, target.options);
  }
  throw new Error('Unsupported binding target');
}
function canvasElementWindow(canvasElement) {
  // According to DOM Level 2 Core specification, ownerDocument should never be null for HTMLCanvasElement
  // see https://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#node-ownerDoc
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return canvasElement.ownerDocument.defaultView;
}
function isDevicePixelContentBoxSupported() {
  return new Promise(function (resolve) {
    var ro = new ResizeObserver(function (entries) {
      resolve(entries.every(function (entry) {
        return 'devicePixelContentBoxSize' in entry;
      }));
      ro.disconnect();
    });
    ro.observe(document.body, {
      box: 'device-pixel-content-box'
    });
  }).catch(function () {
    return false;
  });
}
function predictedBitmapSize(canvasRect, ratio) {
  return (0, _size.size)({
    width: Math.round(canvasRect.left * ratio + canvasRect.width * ratio) - Math.round(canvasRect.left * ratio),
    height: Math.round(canvasRect.top * ratio + canvasRect.height * ratio) - Math.round(canvasRect.top * ratio)
  });
}
},{"./size.mjs":"../node_modules/fancy-canvas/size.mjs","./device-pixel-ratio.mjs":"../node_modules/fancy-canvas/device-pixel-ratio.mjs"}],"../node_modules/fancy-canvas/canvas-rendering-target.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasRenderingTarget2D = void 0;
exports.createCanvasRenderingTarget2D = createCanvasRenderingTarget2D;
exports.tryCreateCanvasRenderingTarget2D = tryCreateCanvasRenderingTarget2D;
/**
 * @experimental
 */
var CanvasRenderingTarget2D = exports.CanvasRenderingTarget2D = /** @class */function () {
  function CanvasRenderingTarget2D(context, mediaSize, bitmapSize) {
    if (mediaSize.width === 0 || mediaSize.height === 0) {
      throw new TypeError('Rendering target could only be created on a media with positive width and height');
    }
    this._mediaSize = mediaSize;
    // !Number.isInteger(bitmapSize.width) || !Number.isInteger(bitmapSize.height)
    if (bitmapSize.width === 0 || bitmapSize.height === 0) {
      throw new TypeError('Rendering target could only be created using a bitmap with positive integer width and height');
    }
    this._bitmapSize = bitmapSize;
    this._context = context;
  }
  CanvasRenderingTarget2D.prototype.useMediaCoordinateSpace = function (f) {
    try {
      this._context.save();
      // do not use resetTransform to support old versions of Edge
      this._context.setTransform(1, 0, 0, 1, 0, 0);
      this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio);
      return f({
        context: this._context,
        mediaSize: this._mediaSize
      });
    } finally {
      this._context.restore();
    }
  };
  CanvasRenderingTarget2D.prototype.useBitmapCoordinateSpace = function (f) {
    try {
      this._context.save();
      // do not use resetTransform to support old versions of Edge
      this._context.setTransform(1, 0, 0, 1, 0, 0);
      return f({
        context: this._context,
        mediaSize: this._mediaSize,
        bitmapSize: this._bitmapSize,
        horizontalPixelRatio: this._horizontalPixelRatio,
        verticalPixelRatio: this._verticalPixelRatio
      });
    } finally {
      this._context.restore();
    }
  };
  Object.defineProperty(CanvasRenderingTarget2D.prototype, "_horizontalPixelRatio", {
    get: function () {
      return this._bitmapSize.width / this._mediaSize.width;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CanvasRenderingTarget2D.prototype, "_verticalPixelRatio", {
    get: function () {
      return this._bitmapSize.height / this._mediaSize.height;
    },
    enumerable: false,
    configurable: true
  });
  return CanvasRenderingTarget2D;
}();
/**
 * @experimental
 */
function createCanvasRenderingTarget2D(binding, contextOptions) {
  var mediaSize = binding.canvasElementClientSize;
  var bitmapSize = binding.bitmapSize;
  var context = binding.canvasElement.getContext('2d', contextOptions);
  if (context === null) {
    throw new Error('Could not get 2d drawing context from bound canvas element. Has the canvas already been set to a different context mode?');
  }
  return new CanvasRenderingTarget2D(context, mediaSize, bitmapSize);
}
/**
 * @experimental
 */
function tryCreateCanvasRenderingTarget2D(binding, contextOptions) {
  var mediaSize = binding.canvasElementClientSize;
  if (mediaSize.width === 0 || mediaSize.height === 0) {
    return null;
  }
  var bitmapSize = binding.bitmapSize;
  if (bitmapSize.width === 0 || bitmapSize.height === 0) {
    return null;
  }
  var context = binding.canvasElement.getContext('2d', contextOptions);
  if (context === null) {
    return null;
  }
  return new CanvasRenderingTarget2D(context, mediaSize, bitmapSize);
}
},{}],"../node_modules/fancy-canvas/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CanvasRenderingTarget2D", {
  enumerable: true,
  get: function () {
    return _canvasRenderingTarget.CanvasRenderingTarget2D;
  }
});
Object.defineProperty(exports, "bindCanvasElementBitmapSizeTo", {
  enumerable: true,
  get: function () {
    return _canvasElementBitmapSize.bindTo;
  }
});
Object.defineProperty(exports, "createCanvasRenderingTarget2D", {
  enumerable: true,
  get: function () {
    return _canvasRenderingTarget.createCanvasRenderingTarget2D;
  }
});
Object.defineProperty(exports, "equalSizes", {
  enumerable: true,
  get: function () {
    return _size.equalSizes;
  }
});
Object.defineProperty(exports, "size", {
  enumerable: true,
  get: function () {
    return _size.size;
  }
});
Object.defineProperty(exports, "tryCreateCanvasRenderingTarget2D", {
  enumerable: true,
  get: function () {
    return _canvasRenderingTarget.tryCreateCanvasRenderingTarget2D;
  }
});
var _size = require("./size.mjs");
var _canvasElementBitmapSize = require("./canvas-element-bitmap-size.mjs");
var _canvasRenderingTarget = require("./canvas-rendering-target.mjs");
},{"./size.mjs":"../node_modules/fancy-canvas/size.mjs","./canvas-element-bitmap-size.mjs":"../node_modules/fancy-canvas/canvas-element-bitmap-size.mjs","./canvas-rendering-target.mjs":"../node_modules/fancy-canvas/canvas-rendering-target.mjs"}],"../node_modules/lightweight-charts/dist/lightweight-charts.production.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackingModeExitMode = exports.TickMarkType = exports.PriceScaleMode = exports.PriceLineSource = exports.MismatchDirection = exports.LineType = exports.LineStyle = exports.LastPriceAnimationMode = exports.CrosshairMode = exports.ColorType = void 0;
exports.createChart = Te;
exports.createChartEx = Ce;
exports.customSeriesDefaultOptions = void 0;
exports.isBusinessDay = Ln;
exports.isUTCTimestamp = En;
exports.version = Re;
var _fancyCanvas = require("fancy-canvas");
/*!
 * @license
 * TradingView Lightweight Charts™ v4.1.3
 * Copyright (c) 2024 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
const e = {
    upColor: "#26a69a",
    downColor: "#ef5350",
    wickVisible: !0,
    borderVisible: !0,
    borderColor: "#378658",
    borderUpColor: "#26a69a",
    borderDownColor: "#ef5350",
    wickColor: "#737375",
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350"
  },
  r = {
    upColor: "#26a69a",
    downColor: "#ef5350",
    openVisible: !0,
    thinBars: !0
  },
  h = {
    color: "#2196f3",
    lineStyle: 0,
    lineWidth: 3,
    lineType: 0,
    lineVisible: !0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: "",
    crosshairMarkerBorderWidth: 2,
    crosshairMarkerBackgroundColor: "",
    lastPriceAnimation: 0,
    pointMarkersVisible: !1
  },
  l = {
    topColor: "rgba( 46, 220, 135, 0.4)",
    bottomColor: "rgba( 40, 221, 100, 0)",
    invertFilledArea: !1,
    lineColor: "#33D778",
    lineStyle: 0,
    lineWidth: 3,
    lineType: 0,
    lineVisible: !0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: "",
    crosshairMarkerBorderWidth: 2,
    crosshairMarkerBackgroundColor: "",
    lastPriceAnimation: 0,
    pointMarkersVisible: !1
  },
  a = {
    baseValue: {
      type: "price",
      price: 0
    },
    topFillColor1: "rgba(38, 166, 154, 0.28)",
    topFillColor2: "rgba(38, 166, 154, 0.05)",
    topLineColor: "rgba(38, 166, 154, 1)",
    bottomFillColor1: "rgba(239, 83, 80, 0.05)",
    bottomFillColor2: "rgba(239, 83, 80, 0.28)",
    bottomLineColor: "rgba(239, 83, 80, 1)",
    lineWidth: 3,
    lineStyle: 0,
    lineType: 0,
    lineVisible: !0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: "",
    crosshairMarkerBorderWidth: 2,
    crosshairMarkerBackgroundColor: "",
    lastPriceAnimation: 0,
    pointMarkersVisible: !1
  },
  o = {
    color: "#26a69a",
    base: 0
  },
  _ = {
    color: "#2196f3"
  },
  u = {
    title: "",
    visible: !0,
    lastValueVisible: !0,
    priceLineVisible: !0,
    priceLineSource: 0,
    priceLineWidth: 1,
    priceLineColor: "",
    priceLineStyle: 2,
    baseLineVisible: !0,
    baseLineWidth: 1,
    baseLineColor: "#B2B5BE",
    baseLineStyle: 0,
    priceFormat: {
      type: "price",
      precision: 2,
      minMove: .01
    }
  };
var c, d;
function f(t, i) {
  const n = {
    0: [],
    1: [t.lineWidth, t.lineWidth],
    2: [2 * t.lineWidth, 2 * t.lineWidth],
    3: [6 * t.lineWidth, 6 * t.lineWidth],
    4: [t.lineWidth, 4 * t.lineWidth]
  }[i];
  t.setLineDash(n);
}
function v(t, i, n, s) {
  t.beginPath();
  const e = t.lineWidth % 2 ? .5 : 0;
  t.moveTo(n, i + e), t.lineTo(s, i + e), t.stroke();
}
function p(t, i) {
  if (!t) throw new Error("Assertion failed" + (i ? ": " + i : ""));
}
function m(t) {
  if (void 0 === t) throw new Error("Value is undefined");
  return t;
}
function b(t) {
  if (null === t) throw new Error("Value is null");
  return t;
}
function w(t) {
  return b(m(t));
}
!function (t) {
  t[t.Simple = 0] = "Simple", t[t.WithSteps = 1] = "WithSteps", t[t.Curved = 2] = "Curved";
}(c || (exports.LineType = c = {})), function (t) {
  t[t.Solid = 0] = "Solid", t[t.Dotted = 1] = "Dotted", t[t.Dashed = 2] = "Dashed", t[t.LargeDashed = 3] = "LargeDashed", t[t.SparseDotted = 4] = "SparseDotted";
}(d || (exports.LineStyle = d = {}));
const g = {
  khaki: "#f0e68c",
  azure: "#f0ffff",
  aliceblue: "#f0f8ff",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gainsboro: "#dcdcdc",
  gray: "#808080",
  green: "#008000",
  honeydew: "#f0fff0",
  floralwhite: "#fffaf0",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lemonchiffon: "#fffacd",
  hotpink: "#ff69b4",
  lightyellow: "#ffffe0",
  greenyellow: "#adff2f",
  lightgoldenrodyellow: "#fafad2",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  lightcyan: "#e0ffff",
  magenta: "#f0f",
  maroon: "#800000",
  olive: "#808000",
  orange: "#ffa500",
  oldlace: "#fdf5e6",
  mediumblue: "#0000cd",
  transparent: "#0000",
  lime: "#0f0",
  lightpink: "#ffb6c1",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  midnightblue: "#191970",
  orchid: "#da70d6",
  mediumorchid: "#ba55d3",
  mediumturquoise: "#48d1cc",
  orangered: "#ff4500",
  royalblue: "#4169e1",
  powderblue: "#b0e0e6",
  red: "#f00",
  coral: "#ff7f50",
  turquoise: "#40e0d0",
  white: "#fff",
  whitesmoke: "#f5f5f5",
  wheat: "#f5deb3",
  teal: "#008080",
  steelblue: "#4682b4",
  bisque: "#ffe4c4",
  aquamarine: "#7fffd4",
  aqua: "#0ff",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  springgreen: "#00ff7f",
  antiquewhite: "#faebd7",
  burlywood: "#deb887",
  brown: "#a52a2a",
  beige: "#f5f5dc",
  chocolate: "#d2691e",
  chartreuse: "#7fff00",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cadetblue: "#5f9ea0",
  tomato: "#ff6347",
  fuchsia: "#f0f",
  blue: "#00f",
  salmon: "#fa8072",
  blanchedalmond: "#ffebcd",
  slateblue: "#6a5acd",
  slategray: "#708090",
  thistle: "#d8bfd8",
  tan: "#d2b48c",
  cyan: "#0ff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  blueviolet: "#8a2be2",
  black: "#000",
  darkmagenta: "#8b008b",
  darkslateblue: "#483d8b",
  darkkhaki: "#bdb76b",
  darkorchid: "#9932cc",
  darkorange: "#ff8c00",
  darkgreen: "#006400",
  darkred: "#8b0000",
  dodgerblue: "#1e90ff",
  darkslategray: "#2f4f4f",
  dimgray: "#696969",
  deepskyblue: "#00bfff",
  firebrick: "#b22222",
  forestgreen: "#228b22",
  indigo: "#4b0082",
  ivory: "#fffff0",
  lavenderblush: "#fff0f5",
  feldspar: "#d19275",
  indianred: "#cd5c5c",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightskyblue: "#87cefa",
  lightslategray: "#789",
  lightslateblue: "#8470ff",
  snow: "#fffafa",
  lightseagreen: "#20b2aa",
  lightsalmon: "#ffa07a",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  mediumpurple: "#9370d8",
  mediumaquamarine: "#66cdaa",
  skyblue: "#87ceeb",
  lavender: "#e6e6fa",
  lightsteelblue: "#b0c4de",
  mediumvioletred: "#c71585",
  mintcream: "#f5fffa",
  navajowhite: "#ffdead",
  navy: "#000080",
  olivedrab: "#6b8e23",
  palevioletred: "#d87093",
  violetred: "#d02090",
  yellow: "#ff0",
  yellowgreen: "#9acd32",
  lawngreen: "#7cfc00",
  pink: "#ffc0cb",
  paleturquoise: "#afeeee",
  palegoldenrod: "#eee8aa",
  darkolivegreen: "#556b2f",
  darkseagreen: "#8fbc8f",
  darkturquoise: "#00ced1",
  peachpuff: "#ffdab9",
  deeppink: "#ff1493",
  violet: "#ee82ee",
  palegreen: "#98fb98",
  mediumseagreen: "#3cb371",
  peru: "#cd853f",
  saddlebrown: "#8b4513",
  sandybrown: "#f4a460",
  rosybrown: "#bc8f8f",
  purple: "#800080",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  papayawhip: "#ffefd5",
  mediumslateblue: "#7b68ee",
  plum: "#dda0dd",
  mediumspringgreen: "#00fa9a"
};
function M(t) {
  return t < 0 ? 0 : t > 255 ? 255 : Math.round(t) || 0;
}
function x(t) {
  return t <= 0 || t > 0 ? t < 0 ? 0 : t > 1 ? 1 : Math.round(1e4 * t) / 1e4 : 0;
}
const S = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,
  k = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,
  y = /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/,
  C = /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/;
function T(t) {
  (t = t.toLowerCase()) in g && (t = g[t]);
  {
    const i = C.exec(t) || y.exec(t);
    if (i) return [M(parseInt(i[1], 10)), M(parseInt(i[2], 10)), M(parseInt(i[3], 10)), x(i.length < 5 ? 1 : parseFloat(i[4]))];
  }
  {
    const i = k.exec(t);
    if (i) return [M(parseInt(i[1], 16)), M(parseInt(i[2], 16)), M(parseInt(i[3], 16)), 1];
  }
  {
    const i = S.exec(t);
    if (i) return [M(17 * parseInt(i[1], 16)), M(17 * parseInt(i[2], 16)), M(17 * parseInt(i[3], 16)), 1];
  }
  throw new Error(`Cannot parse color: ${t}`);
}
function P(t) {
  const i = T(t);
  return {
    t: `rgb(${i[0]}, ${i[1]}, ${i[2]})`,
    i: (n = i, .199 * n[0] + .687 * n[1] + .114 * n[2] > 160 ? "black" : "white")
  };
  var n;
}
class R {
  constructor() {
    this.h = [];
  }
  l(t, i, n) {
    const s = {
      o: t,
      _: i,
      u: !0 === n
    };
    this.h.push(s);
  }
  v(t) {
    const i = this.h.findIndex(i => t === i.o);
    i > -1 && this.h.splice(i, 1);
  }
  p(t) {
    this.h = this.h.filter(i => i._ !== t);
  }
  m(t, i, n) {
    const s = [...this.h];
    this.h = this.h.filter(t => !t.u), s.forEach(s => s.o(t, i, n));
  }
  M() {
    return this.h.length > 0;
  }
  S() {
    this.h = [];
  }
}
function D(t, ...i) {
  for (const n of i) for (const i in n) void 0 !== n[i] && ("object" != typeof n[i] || void 0 === t[i] || Array.isArray(n[i]) ? t[i] = n[i] : D(t[i], n[i]));
  return t;
}
function O(t) {
  return "number" == typeof t && isFinite(t);
}
function A(t) {
  return "number" == typeof t && t % 1 == 0;
}
function V(t) {
  return "string" == typeof t;
}
function B(t) {
  return "boolean" == typeof t;
}
function I(t) {
  const i = t;
  if (!i || "object" != typeof i) return i;
  let n, s, e;
  for (s in n = Array.isArray(i) ? [] : {}, i) i.hasOwnProperty(s) && (e = i[s], n[s] = e && "object" == typeof e ? I(e) : e);
  return n;
}
function z(t) {
  return null !== t;
}
function L(t) {
  return null === t ? void 0 : t;
}
const E = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function N(t, i, n) {
  return void 0 === i && (i = E), `${n = void 0 !== n ? `${n} ` : ""}${t}px ${i}`;
}
class F {
  constructor(t) {
    this.k = {
      C: 1,
      T: 5,
      P: NaN,
      R: "",
      D: "",
      O: "",
      A: "",
      V: 0,
      B: 0,
      I: 0,
      L: 0,
      N: 0
    }, this.F = t;
  }
  W() {
    const t = this.k,
      i = this.j(),
      n = this.H();
    return t.P === i && t.D === n || (t.P = i, t.D = n, t.R = N(i, n), t.L = 2.5 / 12 * i, t.V = t.L, t.B = i / 12 * t.T, t.I = i / 12 * t.T, t.N = 0), t.O = this.$(), t.A = this.U(), this.k;
  }
  $() {
    return this.F.W().layout.textColor;
  }
  U() {
    return this.F.q();
  }
  j() {
    return this.F.W().layout.fontSize;
  }
  H() {
    return this.F.W().layout.fontFamily;
  }
}
class W {
  constructor() {
    this.Y = [];
  }
  X(t) {
    this.Y = t;
  }
  K(t, i, n) {
    this.Y.forEach(s => {
      s.K(t, i, n);
    });
  }
}
class j {
  K(t, i, n) {
    t.useBitmapCoordinateSpace(t => this.Z(t, i, n));
  }
}
class H extends j {
  constructor() {
    super(...arguments), this.G = null;
  }
  J(t) {
    this.G = t;
  }
  Z({
    context: t,
    horizontalPixelRatio: i,
    verticalPixelRatio: n
  }) {
    if (null === this.G || null === this.G.tt) return;
    const s = this.G.tt,
      e = this.G,
      r = Math.max(1, Math.floor(i)) % 2 / 2,
      h = h => {
        t.beginPath();
        for (let l = s.to - 1; l >= s.from; --l) {
          const s = e.it[l],
            a = Math.round(s.nt * i) + r,
            o = s.st * n,
            _ = h * n + r;
          t.moveTo(a, o), t.arc(a, o, _, 0, 2 * Math.PI);
        }
        t.fill();
      };
    e.et > 0 && (t.fillStyle = e.rt, h(e.ht + e.et)), t.fillStyle = e.lt, h(e.ht);
  }
}
function $() {
  return {
    it: [{
      nt: 0,
      st: 0,
      ot: 0,
      _t: 0
    }],
    lt: "",
    rt: "",
    ht: 0,
    et: 0,
    tt: null
  };
}
const U = {
  from: 0,
  to: 1
};
class q {
  constructor(t, i) {
    this.ut = new W(), this.ct = [], this.dt = [], this.ft = !0, this.F = t, this.vt = i, this.ut.X(this.ct);
  }
  bt(t) {
    const i = this.F.wt();
    i.length !== this.ct.length && (this.dt = i.map($), this.ct = this.dt.map(t => {
      const i = new H();
      return i.J(t), i;
    }), this.ut.X(this.ct)), this.ft = !0;
  }
  gt() {
    return this.ft && (this.Mt(), this.ft = !1), this.ut;
  }
  Mt() {
    const t = 2 === this.vt.W().mode,
      i = this.F.wt(),
      n = this.vt.xt(),
      s = this.F.St();
    i.forEach((i, e) => {
      var r;
      const h = this.dt[e],
        l = i.kt(n);
      if (t || null === l || !i.yt()) return void (h.tt = null);
      const a = b(i.Ct());
      h.lt = l.Tt, h.ht = l.ht, h.et = l.Pt, h.it[0]._t = l._t, h.it[0].st = i.Dt().Rt(l._t, a.Ot), h.rt = null !== (r = l.At) && void 0 !== r ? r : this.F.Vt(h.it[0].st / i.Dt().Bt()), h.it[0].ot = n, h.it[0].nt = s.It(n), h.tt = U;
    });
  }
}
class Y extends j {
  constructor(t) {
    super(), this.zt = t;
  }
  Z({
    context: t,
    bitmapSize: i,
    horizontalPixelRatio: n,
    verticalPixelRatio: s
  }) {
    if (null === this.zt) return;
    const e = this.zt.Lt.yt,
      r = this.zt.Et.yt;
    if (!e && !r) return;
    const h = Math.round(this.zt.nt * n),
      l = Math.round(this.zt.st * s);
    t.lineCap = "butt", e && h >= 0 && (t.lineWidth = Math.floor(this.zt.Lt.et * n), t.strokeStyle = this.zt.Lt.O, t.fillStyle = this.zt.Lt.O, f(t, this.zt.Lt.Nt), function (t, i, n, s) {
      t.beginPath();
      const e = t.lineWidth % 2 ? .5 : 0;
      t.moveTo(i + e, n), t.lineTo(i + e, s), t.stroke();
    }(t, h, 0, i.height)), r && l >= 0 && (t.lineWidth = Math.floor(this.zt.Et.et * s), t.strokeStyle = this.zt.Et.O, t.fillStyle = this.zt.Et.O, f(t, this.zt.Et.Nt), v(t, l, 0, i.width));
  }
}
class X {
  constructor(t) {
    this.ft = !0, this.Ft = {
      Lt: {
        et: 1,
        Nt: 0,
        O: "",
        yt: !1
      },
      Et: {
        et: 1,
        Nt: 0,
        O: "",
        yt: !1
      },
      nt: 0,
      st: 0
    }, this.Wt = new Y(this.Ft), this.jt = t;
  }
  bt() {
    this.ft = !0;
  }
  gt() {
    return this.ft && (this.Mt(), this.ft = !1), this.Wt;
  }
  Mt() {
    const t = this.jt.yt(),
      i = b(this.jt.Ht()),
      n = i.$t().W().crosshair,
      s = this.Ft;
    if (2 === n.mode) return s.Et.yt = !1, void (s.Lt.yt = !1);
    s.Et.yt = t && this.jt.Ut(i), s.Lt.yt = t && this.jt.qt(), s.Et.et = n.horzLine.width, s.Et.Nt = n.horzLine.style, s.Et.O = n.horzLine.color, s.Lt.et = n.vertLine.width, s.Lt.Nt = n.vertLine.style, s.Lt.O = n.vertLine.color, s.nt = this.jt.Yt(), s.st = this.jt.Xt();
  }
}
function K(t, i, n, s, e, r) {
  t.fillRect(i + r, n, s - 2 * r, r), t.fillRect(i + r, n + e - r, s - 2 * r, r), t.fillRect(i, n, r, e), t.fillRect(i + s - r, n, r, e);
}
function Z(t, i, n, s, e, r) {
  t.save(), t.globalCompositeOperation = "copy", t.fillStyle = r, t.fillRect(i, n, s, e), t.restore();
}
function G(t, i) {
  return t.map(t => 0 === t ? t : t + i);
}
function J(t, i, n, s, e, r) {
  t.beginPath(), t.lineTo(i + s - r[1], n), 0 !== r[1] && t.arcTo(i + s, n, i + s, n + r[1], r[1]), t.lineTo(i + s, n + e - r[2]), 0 !== r[2] && t.arcTo(i + s, n + e, i + s - r[2], n + e, r[2]), t.lineTo(i + r[3], n + e), 0 !== r[3] && t.arcTo(i, n + e, i, n + e - r[3], r[3]), t.lineTo(i, n + r[0]), 0 !== r[0] && t.arcTo(i, n, i + r[0], n, r[0]);
}
function Q(t, i, n, s, e, r, h = 0, l = [0, 0, 0, 0], a = "") {
  if (t.save(), !h || !a || a === r) return J(t, i, n, s, e, l), t.fillStyle = r, t.fill(), void t.restore();
  const o = h / 2;
  if ("transparent" !== r) {
    J(t, i + h, n + h, s - 2 * h, e - 2 * h, G(l, -h)), t.fillStyle = r, t.fill();
  }
  if ("transparent" !== a) {
    J(t, i + o, n + o, s - h, e - h, G(l, -o)), t.lineWidth = h, t.strokeStyle = a, t.closePath(), t.stroke();
  }
  t.restore();
}
function tt(t, i, n, s, e, r, h) {
  t.save(), t.globalCompositeOperation = "copy";
  const l = t.createLinearGradient(0, 0, 0, e);
  l.addColorStop(0, r), l.addColorStop(1, h), t.fillStyle = l, t.fillRect(i, n, s, e), t.restore();
}
class it {
  constructor(t, i) {
    this.J(t, i);
  }
  J(t, i) {
    this.zt = t, this.Kt = i;
  }
  Bt(t, i) {
    return this.zt.yt ? t.P + t.L + t.V : 0;
  }
  K(t, i, n, s) {
    if (!this.zt.yt || 0 === this.zt.Zt.length) return;
    const e = this.zt.O,
      r = this.Kt.t,
      h = t.useBitmapCoordinateSpace(t => {
        const h = t.context;
        h.font = i.R;
        const l = this.Gt(t, i, n, s),
          a = l.Jt,
          o = (t, i) => {
            l.Qt ? Q(h, a.ti, a.ii, a.ni, a.si, t, a.ei, [a.ht, 0, 0, a.ht], i) : Q(h, a.ri, a.ii, a.ni, a.si, t, a.ei, [0, a.ht, a.ht, 0], i);
          };
        return o(r, "transparent"), this.zt.hi && (h.fillStyle = e, h.fillRect(a.ri, a.li, a.ai - a.ri, a.oi)), o("transparent", r), this.zt._i && (h.fillStyle = i.A, h.fillRect(l.Qt ? a.ui - a.ei : 0, a.ii, a.ei, a.ci - a.ii)), l;
      });
    t.useMediaCoordinateSpace(({
      context: t
    }) => {
      const n = h.di;
      t.font = i.R, t.textAlign = h.Qt ? "right" : "left", t.textBaseline = "middle", t.fillStyle = e, t.fillText(this.zt.Zt, n.fi, (n.ii + n.ci) / 2 + n.vi);
    });
  }
  Gt(t, i, n, s) {
    var e;
    const {
        context: r,
        bitmapSize: h,
        mediaSize: l,
        horizontalPixelRatio: a,
        verticalPixelRatio: o
      } = t,
      _ = this.zt.hi || !this.zt.pi ? i.T : 0,
      u = this.zt.mi ? i.C : 0,
      c = i.L + this.Kt.bi,
      d = i.V + this.Kt.wi,
      f = i.B,
      v = i.I,
      p = this.zt.Zt,
      m = i.P,
      b = n.gi(r, p),
      w = Math.ceil(n.Mi(r, p)),
      g = m + c + d,
      M = i.C + f + v + w + _,
      x = Math.max(1, Math.floor(o));
    let S = Math.round(g * o);
    S % 2 != x % 2 && (S += 1);
    const k = u > 0 ? Math.max(1, Math.floor(u * a)) : 0,
      y = Math.round(M * a),
      C = Math.round(_ * a),
      T = null !== (e = this.Kt.xi) && void 0 !== e ? e : this.Kt.Si,
      P = Math.round(T * o) - Math.floor(.5 * o),
      R = Math.floor(P + x / 2 - S / 2),
      D = R + S,
      O = "right" === s,
      A = O ? l.width - u : u,
      V = O ? h.width - k : k;
    let B, I, z;
    return O ? (B = V - y, I = V - C, z = A - _ - f - u) : (B = V + y, I = V + C, z = A + _ + f), {
      Qt: O,
      Jt: {
        ii: R,
        li: P,
        ci: D,
        ni: y,
        si: S,
        ht: 2 * a,
        ei: k,
        ti: B,
        ri: V,
        ai: I,
        oi: x,
        ui: h.width
      },
      di: {
        ii: R / o,
        ci: D / o,
        fi: z,
        vi: b
      }
    };
  }
}
class nt {
  constructor(t) {
    this.ki = {
      Si: 0,
      t: "#000",
      wi: 0,
      bi: 0
    }, this.yi = {
      Zt: "",
      yt: !1,
      hi: !0,
      pi: !1,
      At: "",
      O: "#FFF",
      _i: !1,
      mi: !1
    }, this.Ci = {
      Zt: "",
      yt: !1,
      hi: !1,
      pi: !0,
      At: "",
      O: "#FFF",
      _i: !0,
      mi: !0
    }, this.ft = !0, this.Ti = new (t || it)(this.yi, this.ki), this.Pi = new (t || it)(this.Ci, this.ki);
  }
  Zt() {
    return this.Ri(), this.yi.Zt;
  }
  Si() {
    return this.Ri(), this.ki.Si;
  }
  bt() {
    this.ft = !0;
  }
  Bt(t, i = !1) {
    return Math.max(this.Ti.Bt(t, i), this.Pi.Bt(t, i));
  }
  Di() {
    return this.ki.xi || 0;
  }
  Oi(t) {
    this.ki.xi = t;
  }
  Ai() {
    return this.Ri(), this.yi.yt || this.Ci.yt;
  }
  Vi() {
    return this.Ri(), this.yi.yt;
  }
  gt(t) {
    return this.Ri(), this.yi.hi = this.yi.hi && t.W().ticksVisible, this.Ci.hi = this.Ci.hi && t.W().ticksVisible, this.Ti.J(this.yi, this.ki), this.Pi.J(this.Ci, this.ki), this.Ti;
  }
  Bi() {
    return this.Ri(), this.Ti.J(this.yi, this.ki), this.Pi.J(this.Ci, this.ki), this.Pi;
  }
  Ri() {
    this.ft && (this.yi.hi = !0, this.Ci.hi = !1, this.Ii(this.yi, this.Ci, this.ki));
  }
}
class st extends nt {
  constructor(t, i, n) {
    super(), this.jt = t, this.zi = i, this.Li = n;
  }
  Ii(t, i, n) {
    if (t.yt = !1, 2 === this.jt.W().mode) return;
    const s = this.jt.W().horzLine;
    if (!s.labelVisible) return;
    const e = this.zi.Ct();
    if (!this.jt.yt() || this.zi.Ei() || null === e) return;
    const r = P(s.labelBackgroundColor);
    n.t = r.t, t.O = r.i;
    const h = 2 / 12 * this.zi.P();
    n.bi = h, n.wi = h;
    const l = this.Li(this.zi);
    n.Si = l.Si, t.Zt = this.zi.Ni(l._t, e), t.yt = !0;
  }
}
const et = /[1-9]/g;
class rt {
  constructor() {
    this.zt = null;
  }
  J(t) {
    this.zt = t;
  }
  K(t, i) {
    if (null === this.zt || !1 === this.zt.yt || 0 === this.zt.Zt.length) return;
    const n = t.useMediaCoordinateSpace(({
      context: t
    }) => (t.font = i.R, Math.round(i.Fi.Mi(t, b(this.zt).Zt, et))));
    if (n <= 0) return;
    const s = i.Wi,
      e = n + 2 * s,
      r = e / 2,
      h = this.zt.ji;
    let l = this.zt.Si,
      a = Math.floor(l - r) + .5;
    a < 0 ? (l += Math.abs(0 - a), a = Math.floor(l - r) + .5) : a + e > h && (l -= Math.abs(h - (a + e)), a = Math.floor(l - r) + .5);
    const o = a + e,
      _ = Math.ceil(0 + i.C + i.T + i.L + i.P + i.V);
    t.useBitmapCoordinateSpace(({
      context: t,
      horizontalPixelRatio: n,
      verticalPixelRatio: s
    }) => {
      const e = b(this.zt);
      t.fillStyle = e.t;
      const r = Math.round(a * n),
        h = Math.round(0 * s),
        l = Math.round(o * n),
        u = Math.round(_ * s),
        c = Math.round(2 * n);
      if (t.beginPath(), t.moveTo(r, h), t.lineTo(r, u - c), t.arcTo(r, u, r + c, u, c), t.lineTo(l - c, u), t.arcTo(l, u, l, u - c, c), t.lineTo(l, h), t.fill(), e.hi) {
        const r = Math.round(e.Si * n),
          l = h,
          a = Math.round((l + i.T) * s);
        t.fillStyle = e.O;
        const o = Math.max(1, Math.floor(n)),
          _ = Math.floor(.5 * n);
        t.fillRect(r - _, l, o, a - l);
      }
    }), t.useMediaCoordinateSpace(({
      context: t
    }) => {
      const n = b(this.zt),
        e = 0 + i.C + i.T + i.L + i.P / 2;
      t.font = i.R, t.textAlign = "left", t.textBaseline = "middle", t.fillStyle = n.O;
      const r = i.Fi.gi(t, "Apr0");
      t.translate(a + s, e + r), t.fillText(n.Zt, 0, 0);
    });
  }
}
class ht {
  constructor(t, i, n) {
    this.ft = !0, this.Wt = new rt(), this.Ft = {
      yt: !1,
      t: "#4c525e",
      O: "white",
      Zt: "",
      ji: 0,
      Si: NaN,
      hi: !0
    }, this.vt = t, this.Hi = i, this.Li = n;
  }
  bt() {
    this.ft = !0;
  }
  gt() {
    return this.ft && (this.Mt(), this.ft = !1), this.Wt.J(this.Ft), this.Wt;
  }
  Mt() {
    const t = this.Ft;
    if (t.yt = !1, 2 === this.vt.W().mode) return;
    const i = this.vt.W().vertLine;
    if (!i.labelVisible) return;
    const n = this.Hi.St();
    if (n.Ei()) return;
    t.ji = n.ji();
    const s = this.Li();
    if (null === s) return;
    t.Si = s.Si;
    const e = n.$i(this.vt.xt());
    t.Zt = n.Ui(b(e)), t.yt = !0;
    const r = P(i.labelBackgroundColor);
    t.t = r.t, t.O = r.i, t.hi = n.W().ticksVisible;
  }
}
class lt {
  constructor() {
    this.qi = null, this.Yi = 0;
  }
  Xi() {
    return this.Yi;
  }
  Ki(t) {
    this.Yi = t;
  }
  Dt() {
    return this.qi;
  }
  Zi(t) {
    this.qi = t;
  }
  Gi(t) {
    return [];
  }
  Ji() {
    return [];
  }
  yt() {
    return !0;
  }
}
var at;
!function (t) {
  t[t.Normal = 0] = "Normal", t[t.Magnet = 1] = "Magnet", t[t.Hidden = 2] = "Hidden";
}(at || (exports.CrosshairMode = at = {}));
class ot extends lt {
  constructor(t, i) {
    super(), this.Qi = null, this.tn = NaN, this.nn = 0, this.sn = !0, this.en = new Map(), this.rn = !1, this.hn = NaN, this.ln = NaN, this.an = NaN, this.on = NaN, this.Hi = t, this._n = i, this.un = new q(t, this);
    this.cn = ((t, i) => n => {
      const s = i(),
        e = t();
      if (n === b(this.Qi).dn()) return {
        _t: e,
        Si: s
      };
      {
        const t = b(n.Ct());
        return {
          _t: n.fn(s, t),
          Si: s
        };
      }
    })(() => this.tn, () => this.ln);
    const n = ((t, i) => () => {
      const n = this.Hi.St().vn(t()),
        s = i();
      return n && Number.isFinite(s) ? {
        ot: n,
        Si: s
      } : null;
    })(() => this.nn, () => this.Yt());
    this.pn = new ht(this, t, n), this.mn = new X(this);
  }
  W() {
    return this._n;
  }
  bn(t, i) {
    this.an = t, this.on = i;
  }
  wn() {
    this.an = NaN, this.on = NaN;
  }
  gn() {
    return this.an;
  }
  Mn() {
    return this.on;
  }
  xn(t, i, n) {
    this.rn || (this.rn = !0), this.sn = !0, this.Sn(t, i, n);
  }
  xt() {
    return this.nn;
  }
  Yt() {
    return this.hn;
  }
  Xt() {
    return this.ln;
  }
  yt() {
    return this.sn;
  }
  kn() {
    this.sn = !1, this.yn(), this.tn = NaN, this.hn = NaN, this.ln = NaN, this.Qi = null, this.wn();
  }
  Cn(t) {
    return null !== this.Qi ? [this.mn, this.un] : [];
  }
  Ut(t) {
    return t === this.Qi && this._n.horzLine.visible;
  }
  qt() {
    return this._n.vertLine.visible;
  }
  Tn(t, i) {
    this.sn && this.Qi === t || this.en.clear();
    const n = [];
    return this.Qi === t && n.push(this.Pn(this.en, i, this.cn)), n;
  }
  Ji() {
    return this.sn ? [this.pn] : [];
  }
  Ht() {
    return this.Qi;
  }
  Rn() {
    this.mn.bt(), this.en.forEach(t => t.bt()), this.pn.bt(), this.un.bt();
  }
  Dn(t) {
    return t && !t.dn().Ei() ? t.dn() : null;
  }
  Sn(t, i, n) {
    this.On(t, i, n) && this.Rn();
  }
  On(t, i, n) {
    const s = this.hn,
      e = this.ln,
      r = this.tn,
      h = this.nn,
      l = this.Qi,
      a = this.Dn(n);
    this.nn = t, this.hn = isNaN(t) ? NaN : this.Hi.St().It(t), this.Qi = n;
    const o = null !== a ? a.Ct() : null;
    return null !== a && null !== o ? (this.tn = i, this.ln = a.Rt(i, o)) : (this.tn = NaN, this.ln = NaN), s !== this.hn || e !== this.ln || h !== this.nn || r !== this.tn || l !== this.Qi;
  }
  yn() {
    const t = this.Hi.wt().map(t => t.Vn().An()).filter(z),
      i = 0 === t.length ? null : Math.max(...t);
    this.nn = null !== i ? i : NaN;
  }
  Pn(t, i, n) {
    let s = t.get(i);
    return void 0 === s && (s = new st(this, i, n), t.set(i, s)), s;
  }
}
function _t(t) {
  return "left" === t || "right" === t;
}
class ut {
  constructor(t) {
    this.Bn = new Map(), this.In = [], this.zn = t;
  }
  Ln(t, i) {
    const n = function (t, i) {
      return void 0 === t ? i : {
        En: Math.max(t.En, i.En),
        Nn: t.Nn || i.Nn
      };
    }(this.Bn.get(t), i);
    this.Bn.set(t, n);
  }
  Fn() {
    return this.zn;
  }
  Wn(t) {
    const i = this.Bn.get(t);
    return void 0 === i ? {
      En: this.zn
    } : {
      En: Math.max(this.zn, i.En),
      Nn: i.Nn
    };
  }
  jn() {
    this.Hn(), this.In = [{
      $n: 0
    }];
  }
  Un(t) {
    this.Hn(), this.In = [{
      $n: 1,
      Ot: t
    }];
  }
  qn(t) {
    this.Yn(), this.In.push({
      $n: 5,
      Ot: t
    });
  }
  Hn() {
    this.Yn(), this.In.push({
      $n: 6
    });
  }
  Xn() {
    this.Hn(), this.In = [{
      $n: 4
    }];
  }
  Kn(t) {
    this.Hn(), this.In.push({
      $n: 2,
      Ot: t
    });
  }
  Zn(t) {
    this.Hn(), this.In.push({
      $n: 3,
      Ot: t
    });
  }
  Gn() {
    return this.In;
  }
  Jn(t) {
    for (const i of t.In) this.Qn(i);
    this.zn = Math.max(this.zn, t.zn), t.Bn.forEach((t, i) => {
      this.Ln(i, t);
    });
  }
  static ts() {
    return new ut(2);
  }
  static ns() {
    return new ut(3);
  }
  Qn(t) {
    switch (t.$n) {
      case 0:
        this.jn();
        break;
      case 1:
        this.Un(t.Ot);
        break;
      case 2:
        this.Kn(t.Ot);
        break;
      case 3:
        this.Zn(t.Ot);
        break;
      case 4:
        this.Xn();
        break;
      case 5:
        this.qn(t.Ot);
        break;
      case 6:
        this.Yn();
    }
  }
  Yn() {
    const t = this.In.findIndex(t => 5 === t.$n);
    -1 !== t && this.In.splice(t, 1);
  }
}
const ct = ".";
function dt(t, i) {
  if (!O(t)) return "n/a";
  if (!A(i)) throw new TypeError("invalid length");
  if (i < 0 || i > 16) throw new TypeError("invalid length");
  if (0 === i) return t.toString();
  return ("0000000000000000" + t.toString()).slice(-i);
}
class ft {
  constructor(t, i) {
    if (i || (i = 1), O(t) && A(t) || (t = 100), t < 0) throw new TypeError("invalid base");
    this.zi = t, this.ss = i, this.es();
  }
  format(t) {
    const i = t < 0 ? "−" : "";
    return t = Math.abs(t), i + this.rs(t);
  }
  es() {
    if (this.hs = 0, this.zi > 0 && this.ss > 0) {
      let t = this.zi;
      for (; t > 1;) t /= 10, this.hs++;
    }
  }
  rs(t) {
    const i = this.zi / this.ss;
    let n = Math.floor(t),
      s = "";
    const e = void 0 !== this.hs ? this.hs : NaN;
    if (i > 1) {
      let r = +(Math.round(t * i) - n * i).toFixed(this.hs);
      r >= i && (r -= i, n += 1), s = ct + dt(+r.toFixed(this.hs) * this.ss, e);
    } else n = Math.round(n * i) / i, e > 0 && (s = ct + dt(0, e));
    return n.toFixed(0) + s;
  }
}
class vt extends ft {
  constructor(t = 100) {
    super(t);
  }
  format(t) {
    return `${super.format(t)}%`;
  }
}
class pt {
  constructor(t) {
    this.ls = t;
  }
  format(t) {
    let i = "";
    return t < 0 && (i = "-", t = -t), t < 995 ? i + this.os(t) : t < 999995 ? i + this.os(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3), i + this.os(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6), i + this.os(t / 1e9) + "B");
  }
  os(t) {
    let i;
    const n = Math.pow(10, this.ls);
    return i = (t = Math.round(t * n) / n) >= 1e-15 && t < 1 ? t.toFixed(this.ls).replace(/\.?0+$/, "") : String(t), i.replace(/(\.[1-9]*)0+$/, (t, i) => i);
  }
}
function mt(t, i, n, s, e, r, h) {
  if (0 === i.length || s.from >= i.length || s.to <= 0) return;
  const {
      context: l,
      horizontalPixelRatio: a,
      verticalPixelRatio: o
    } = t,
    _ = i[s.from];
  let u = r(t, _),
    c = _;
  if (s.to - s.from < 2) {
    const i = e / 2;
    l.beginPath();
    const n = {
        nt: _.nt - i,
        st: _.st
      },
      s = {
        nt: _.nt + i,
        st: _.st
      };
    l.moveTo(n.nt * a, n.st * o), l.lineTo(s.nt * a, s.st * o), h(t, u, n, s);
  } else {
    const e = (i, n) => {
      h(t, u, c, n), l.beginPath(), u = i, c = n;
    };
    let d = c;
    l.beginPath(), l.moveTo(_.nt * a, _.st * o);
    for (let h = s.from + 1; h < s.to; ++h) {
      d = i[h];
      const s = r(t, d);
      switch (n) {
        case 0:
          l.lineTo(d.nt * a, d.st * o);
          break;
        case 1:
          l.lineTo(d.nt * a, i[h - 1].st * o), s !== u && (e(s, d), l.lineTo(d.nt * a, i[h - 1].st * o)), l.lineTo(d.nt * a, d.st * o);
          break;
        case 2:
          {
            const [t, n] = Mt(i, h - 1, h);
            l.bezierCurveTo(t.nt * a, t.st * o, n.nt * a, n.st * o, d.nt * a, d.st * o);
            break;
          }
      }
      1 !== n && s !== u && (e(s, d), l.moveTo(d.nt * a, d.st * o));
    }
    (c !== d || c === d && 1 === n) && h(t, u, c, d);
  }
}
const bt = 6;
function wt(t, i) {
  return {
    nt: t.nt - i.nt,
    st: t.st - i.st
  };
}
function gt(t, i) {
  return {
    nt: t.nt / i,
    st: t.st / i
  };
}
function Mt(t, i, n) {
  const s = Math.max(0, i - 1),
    e = Math.min(t.length - 1, n + 1);
  var r, h;
  return [(r = t[i], h = gt(wt(t[n], t[s]), bt), {
    nt: r.nt + h.nt,
    st: r.st + h.st
  }), wt(t[n], gt(wt(t[e], t[i]), bt))];
}
function xt(t, i, n, s, e) {
  const {
    context: r,
    horizontalPixelRatio: h,
    verticalPixelRatio: l
  } = i;
  r.lineTo(e.nt * h, t * l), r.lineTo(s.nt * h, t * l), r.closePath(), r.fillStyle = n, r.fill();
}
class St extends j {
  constructor() {
    super(...arguments), this.G = null;
  }
  J(t) {
    this.G = t;
  }
  Z(t) {
    var i;
    if (null === this.G) return;
    const {
        it: n,
        tt: s,
        _s: e,
        et: r,
        Nt: h,
        us: l
      } = this.G,
      a = null !== (i = this.G.cs) && void 0 !== i ? i : this.G.ds ? 0 : t.mediaSize.height;
    if (null === s) return;
    const o = t.context;
    o.lineCap = "butt", o.lineJoin = "round", o.lineWidth = r, f(o, h), o.lineWidth = 1, mt(t, n, l, s, e, this.fs.bind(this), xt.bind(null, a));
  }
}
function kt(t, i, n) {
  return Math.min(Math.max(t, i), n);
}
function yt(t, i, n) {
  return i - t <= n;
}
function Ct(t) {
  const i = Math.ceil(t);
  return i % 2 == 0 ? i - 1 : i;
}
class Tt {
  vs(t, i) {
    const n = this.ps,
      {
        bs: s,
        ws: e,
        gs: r,
        Ms: h,
        xs: l,
        cs: a
      } = i;
    if (void 0 === this.Ss || void 0 === n || n.bs !== s || n.ws !== e || n.gs !== r || n.Ms !== h || n.cs !== a || n.xs !== l) {
      const n = t.context.createLinearGradient(0, 0, 0, l);
      if (n.addColorStop(0, s), null != a) {
        const i = kt(a * t.verticalPixelRatio / l, 0, 1);
        n.addColorStop(i, e), n.addColorStop(i, r);
      }
      n.addColorStop(1, h), this.Ss = n, this.ps = i;
    }
    return this.Ss;
  }
}
class Pt extends St {
  constructor() {
    super(...arguments), this.ks = new Tt();
  }
  fs(t, i) {
    return this.ks.vs(t, {
      bs: i.ys,
      ws: "",
      gs: "",
      Ms: i.Cs,
      xs: t.bitmapSize.height
    });
  }
}
function Rt(t, i) {
  const n = t.context;
  n.strokeStyle = i, n.stroke();
}
class Dt extends j {
  constructor() {
    super(...arguments), this.G = null;
  }
  J(t) {
    this.G = t;
  }
  Z(t) {
    if (null === this.G) return;
    const {
      it: i,
      tt: n,
      _s: s,
      us: e,
      et: r,
      Nt: h,
      Ts: l
    } = this.G;
    if (null === n) return;
    const a = t.context;
    a.lineCap = "butt", a.lineWidth = r * t.verticalPixelRatio, f(a, h), a.lineJoin = "round";
    const o = this.Ps.bind(this);
    void 0 !== e && mt(t, i, e, n, s, o, Rt), l && function (t, i, n, s, e) {
      const {
        horizontalPixelRatio: r,
        verticalPixelRatio: h,
        context: l
      } = t;
      let a = null;
      const o = Math.max(1, Math.floor(r)) % 2 / 2,
        _ = n * h + o;
      for (let n = s.to - 1; n >= s.from; --n) {
        const s = i[n];
        if (s) {
          const i = e(t, s);
          i !== a && (l.beginPath(), null !== a && l.fill(), l.fillStyle = i, a = i);
          const n = Math.round(s.nt * r) + o,
            u = s.st * h;
          l.moveTo(n, u), l.arc(n, u, _, 0, 2 * Math.PI);
        }
      }
      l.fill();
    }(t, i, l, n, o);
  }
}
class Ot extends Dt {
  Ps(t, i) {
    return i.lt;
  }
}
function At(t, i, n, s, e = 0, r = i.length) {
  let h = r - e;
  for (; 0 < h;) {
    const r = h >> 1,
      l = e + r;
    s(i[l], n) === t ? (e = l + 1, h -= r + 1) : h = r;
  }
  return e;
}
const Vt = At.bind(null, !0),
  Bt = At.bind(null, !1);
function It(t, i) {
  return t.ot < i;
}
function zt(t, i) {
  return i < t.ot;
}
function Lt(t, i, n) {
  const s = i.Rs(),
    e = i.ui(),
    r = Vt(t, s, It),
    h = Bt(t, e, zt);
  if (!n) return {
    from: r,
    to: h
  };
  let l = r,
    a = h;
  return r > 0 && r < t.length && t[r].ot >= s && (l = r - 1), h > 0 && h < t.length && t[h - 1].ot <= e && (a = h + 1), {
    from: l,
    to: a
  };
}
class Et {
  constructor(t, i, n) {
    this.Ds = !0, this.Os = !0, this.As = !0, this.Vs = [], this.Bs = null, this.Is = t, this.zs = i, this.Ls = n;
  }
  bt(t) {
    this.Ds = !0, "data" === t && (this.Os = !0), "options" === t && (this.As = !0);
  }
  gt() {
    return this.Is.yt() ? (this.Es(), null === this.Bs ? null : this.Ns) : null;
  }
  Fs() {
    this.Vs = this.Vs.map(t => Object.assign(Object.assign({}, t), this.Is.js().Ws(t.ot)));
  }
  Hs() {
    this.Bs = null;
  }
  Es() {
    this.Os && (this.$s(), this.Os = !1), this.As && (this.Fs(), this.As = !1), this.Ds && (this.Us(), this.Ds = !1);
  }
  Us() {
    const t = this.Is.Dt(),
      i = this.zs.St();
    if (this.Hs(), i.Ei() || t.Ei()) return;
    const n = i.qs();
    if (null === n) return;
    if (0 === this.Is.Vn().Ys()) return;
    const s = this.Is.Ct();
    null !== s && (this.Bs = Lt(this.Vs, n, this.Ls), this.Xs(t, i, s.Ot), this.Ks());
  }
}
class Nt extends Et {
  constructor(t, i) {
    super(t, i, !0);
  }
  Xs(t, i, n) {
    i.Zs(this.Vs, L(this.Bs)), t.Gs(this.Vs, n, L(this.Bs));
  }
  Js(t, i) {
    return {
      ot: t,
      _t: i,
      nt: NaN,
      st: NaN
    };
  }
  $s() {
    const t = this.Is.js();
    this.Vs = this.Is.Vn().Qs().map(i => {
      const n = i.Ot[3];
      return this.te(i.ie, n, t);
    });
  }
}
class Ft extends Nt {
  constructor(t, i) {
    super(t, i), this.Ns = new W(), this.ne = new Pt(), this.se = new Ot(), this.Ns.X([this.ne, this.se]);
  }
  te(t, i, n) {
    return Object.assign(Object.assign({}, this.Js(t, i)), n.Ws(t));
  }
  Ks() {
    const t = this.Is.W();
    this.ne.J({
      us: t.lineType,
      it: this.Vs,
      Nt: t.lineStyle,
      et: t.lineWidth,
      cs: null,
      ds: t.invertFilledArea,
      tt: this.Bs,
      _s: this.zs.St().ee()
    }), this.se.J({
      us: t.lineVisible ? t.lineType : void 0,
      it: this.Vs,
      Nt: t.lineStyle,
      et: t.lineWidth,
      tt: this.Bs,
      _s: this.zs.St().ee(),
      Ts: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0
    });
  }
}
class Wt extends j {
  constructor() {
    super(...arguments), this.zt = null, this.re = 0, this.he = 0;
  }
  J(t) {
    this.zt = t;
  }
  Z({
    context: t,
    horizontalPixelRatio: i,
    verticalPixelRatio: n
  }) {
    if (null === this.zt || 0 === this.zt.Vn.length || null === this.zt.tt) return;
    if (this.re = this.le(i), this.re >= 2) {
      Math.max(1, Math.floor(i)) % 2 != this.re % 2 && this.re--;
    }
    this.he = this.zt.ae ? Math.min(this.re, Math.floor(i)) : this.re;
    let s = null;
    const e = this.he <= this.re && this.zt.ee >= Math.floor(1.5 * i);
    for (let r = this.zt.tt.from; r < this.zt.tt.to; ++r) {
      const h = this.zt.Vn[r];
      s !== h.oe && (t.fillStyle = h.oe, s = h.oe);
      const l = Math.floor(.5 * this.he),
        a = Math.round(h.nt * i),
        o = a - l,
        _ = this.he,
        u = o + _ - 1,
        c = Math.min(h._e, h.ue),
        d = Math.max(h._e, h.ue),
        f = Math.round(c * n) - l,
        v = Math.round(d * n) + l,
        p = Math.max(v - f, this.he);
      t.fillRect(o, f, _, p);
      const m = Math.ceil(1.5 * this.re);
      if (e) {
        if (this.zt.ce) {
          const i = a - m;
          let s = Math.max(f, Math.round(h.de * n) - l),
            e = s + _ - 1;
          e > f + p - 1 && (e = f + p - 1, s = e - _ + 1), t.fillRect(i, s, o - i, e - s + 1);
        }
        const i = a + m;
        let s = Math.max(f, Math.round(h.fe * n) - l),
          e = s + _ - 1;
        e > f + p - 1 && (e = f + p - 1, s = e - _ + 1), t.fillRect(u + 1, s, i - u, e - s + 1);
      }
    }
  }
  le(t) {
    const i = Math.floor(t);
    return Math.max(i, Math.floor(function (t, i) {
      return Math.floor(.3 * t * i);
    }(b(this.zt).ee, t)));
  }
}
class jt extends Et {
  constructor(t, i) {
    super(t, i, !1);
  }
  Xs(t, i, n) {
    i.Zs(this.Vs, L(this.Bs)), t.ve(this.Vs, n, L(this.Bs));
  }
  pe(t, i, n) {
    return {
      ot: t,
      me: i.Ot[0],
      be: i.Ot[1],
      we: i.Ot[2],
      ge: i.Ot[3],
      nt: NaN,
      de: NaN,
      _e: NaN,
      ue: NaN,
      fe: NaN
    };
  }
  $s() {
    const t = this.Is.js();
    this.Vs = this.Is.Vn().Qs().map(i => this.te(i.ie, i, t));
  }
}
class Ht extends jt {
  constructor() {
    super(...arguments), this.Ns = new Wt();
  }
  te(t, i, n) {
    return Object.assign(Object.assign({}, this.pe(t, i, n)), n.Ws(t));
  }
  Ks() {
    const t = this.Is.W();
    this.Ns.J({
      Vn: this.Vs,
      ee: this.zs.St().ee(),
      ce: t.openVisible,
      ae: t.thinBars,
      tt: this.Bs
    });
  }
}
class $t extends St {
  constructor() {
    super(...arguments), this.ks = new Tt();
  }
  fs(t, i) {
    const n = this.G;
    return this.ks.vs(t, {
      bs: i.Me,
      ws: i.xe,
      gs: i.Se,
      Ms: i.ke,
      xs: t.bitmapSize.height,
      cs: n.cs
    });
  }
}
class Ut extends Dt {
  constructor() {
    super(...arguments), this.ye = new Tt();
  }
  Ps(t, i) {
    const n = this.G;
    return this.ye.vs(t, {
      bs: i.Ce,
      ws: i.Ce,
      gs: i.Te,
      Ms: i.Te,
      xs: t.bitmapSize.height,
      cs: n.cs
    });
  }
}
class qt extends Nt {
  constructor(t, i) {
    super(t, i), this.Ns = new W(), this.Pe = new $t(), this.Re = new Ut(), this.Ns.X([this.Pe, this.Re]);
  }
  te(t, i, n) {
    return Object.assign(Object.assign({}, this.Js(t, i)), n.Ws(t));
  }
  Ks() {
    const t = this.Is.Ct();
    if (null === t) return;
    const i = this.Is.W(),
      n = this.Is.Dt().Rt(i.baseValue.price, t.Ot),
      s = this.zs.St().ee();
    this.Pe.J({
      it: this.Vs,
      et: i.lineWidth,
      Nt: i.lineStyle,
      us: i.lineType,
      cs: n,
      ds: !1,
      tt: this.Bs,
      _s: s
    }), this.Re.J({
      it: this.Vs,
      et: i.lineWidth,
      Nt: i.lineStyle,
      us: i.lineVisible ? i.lineType : void 0,
      Ts: i.pointMarkersVisible ? i.pointMarkersRadius || i.lineWidth / 2 + 2 : void 0,
      cs: n,
      tt: this.Bs,
      _s: s
    });
  }
}
class Yt extends j {
  constructor() {
    super(...arguments), this.zt = null, this.re = 0;
  }
  J(t) {
    this.zt = t;
  }
  Z(t) {
    if (null === this.zt || 0 === this.zt.Vn.length || null === this.zt.tt) return;
    const {
      horizontalPixelRatio: i
    } = t;
    if (this.re = function (t, i) {
      if (t >= 2.5 && t <= 4) return Math.floor(3 * i);
      const n = 1 - .2 * Math.atan(Math.max(4, t) - 4) / (.5 * Math.PI),
        s = Math.floor(t * n * i),
        e = Math.floor(t * i),
        r = Math.min(s, e);
      return Math.max(Math.floor(i), r);
    }(this.zt.ee, i), this.re >= 2) {
      Math.floor(i) % 2 != this.re % 2 && this.re--;
    }
    const n = this.zt.Vn;
    this.zt.De && this.Oe(t, n, this.zt.tt), this.zt._i && this.Ae(t, n, this.zt.tt);
    const s = this.Ve(i);
    (!this.zt._i || this.re > 2 * s) && this.Be(t, n, this.zt.tt);
  }
  Oe(t, i, n) {
    if (null === this.zt) return;
    const {
      context: s,
      horizontalPixelRatio: e,
      verticalPixelRatio: r
    } = t;
    let h = "",
      l = Math.min(Math.floor(e), Math.floor(this.zt.ee * e));
    l = Math.max(Math.floor(e), Math.min(l, this.re));
    const a = Math.floor(.5 * l);
    let o = null;
    for (let t = n.from; t < n.to; t++) {
      const n = i[t];
      n.Ie !== h && (s.fillStyle = n.Ie, h = n.Ie);
      const _ = Math.round(Math.min(n.de, n.fe) * r),
        u = Math.round(Math.max(n.de, n.fe) * r),
        c = Math.round(n._e * r),
        d = Math.round(n.ue * r);
      let f = Math.round(e * n.nt) - a;
      const v = f + l - 1;
      null !== o && (f = Math.max(o + 1, f), f = Math.min(f, v));
      const p = v - f + 1;
      s.fillRect(f, c, p, _ - c), s.fillRect(f, u + 1, p, d - u), o = v;
    }
  }
  Ve(t) {
    let i = Math.floor(1 * t);
    this.re <= 2 * i && (i = Math.floor(.5 * (this.re - 1)));
    const n = Math.max(Math.floor(t), i);
    return this.re <= 2 * n ? Math.max(Math.floor(t), Math.floor(1 * t)) : n;
  }
  Ae(t, i, n) {
    if (null === this.zt) return;
    const {
      context: s,
      horizontalPixelRatio: e,
      verticalPixelRatio: r
    } = t;
    let h = "";
    const l = this.Ve(e);
    let a = null;
    for (let t = n.from; t < n.to; t++) {
      const n = i[t];
      n.ze !== h && (s.fillStyle = n.ze, h = n.ze);
      let o = Math.round(n.nt * e) - Math.floor(.5 * this.re);
      const _ = o + this.re - 1,
        u = Math.round(Math.min(n.de, n.fe) * r),
        c = Math.round(Math.max(n.de, n.fe) * r);
      if (null !== a && (o = Math.max(a + 1, o), o = Math.min(o, _)), this.zt.ee * e > 2 * l) K(s, o, u, _ - o + 1, c - u + 1, l);else {
        const t = _ - o + 1;
        s.fillRect(o, u, t, c - u + 1);
      }
      a = _;
    }
  }
  Be(t, i, n) {
    if (null === this.zt) return;
    const {
      context: s,
      horizontalPixelRatio: e,
      verticalPixelRatio: r
    } = t;
    let h = "";
    const l = this.Ve(e);
    for (let t = n.from; t < n.to; t++) {
      const n = i[t];
      let a = Math.round(Math.min(n.de, n.fe) * r),
        o = Math.round(Math.max(n.de, n.fe) * r),
        _ = Math.round(n.nt * e) - Math.floor(.5 * this.re),
        u = _ + this.re - 1;
      if (n.oe !== h) {
        const t = n.oe;
        s.fillStyle = t, h = t;
      }
      this.zt._i && (_ += l, a += l, u -= l, o -= l), a > o || s.fillRect(_, a, u - _ + 1, o - a + 1);
    }
  }
}
class Xt extends jt {
  constructor() {
    super(...arguments), this.Ns = new Yt();
  }
  te(t, i, n) {
    return Object.assign(Object.assign({}, this.pe(t, i, n)), n.Ws(t));
  }
  Ks() {
    const t = this.Is.W();
    this.Ns.J({
      Vn: this.Vs,
      ee: this.zs.St().ee(),
      De: t.wickVisible,
      _i: t.borderVisible,
      tt: this.Bs
    });
  }
}
class Kt {
  constructor(t, i) {
    this.Le = t, this.zi = i;
  }
  K(t, i, n) {
    this.Le.draw(t, this.zi, i, n);
  }
}
class Zt extends Et {
  constructor(t, i, n) {
    super(t, i, !1), this.mn = n, this.Ns = new Kt(this.mn.renderer(), i => {
      const n = t.Ct();
      return null === n ? null : t.Dt().Rt(i, n.Ot);
    });
  }
  Ee(t) {
    return this.mn.priceValueBuilder(t);
  }
  Ne(t) {
    return this.mn.isWhitespace(t);
  }
  $s() {
    const t = this.Is.js();
    this.Vs = this.Is.Vn().Qs().map(i => Object.assign(Object.assign({
      ot: i.ie,
      nt: NaN
    }, t.Ws(i.ie)), {
      Fe: i.We
    }));
  }
  Xs(t, i) {
    i.Zs(this.Vs, L(this.Bs));
  }
  Ks() {
    this.mn.update({
      bars: this.Vs.map(Gt),
      barSpacing: this.zs.St().ee(),
      visibleRange: this.Bs
    }, this.Is.W());
  }
}
function Gt(t) {
  return {
    x: t.nt,
    time: t.ot,
    originalData: t.Fe,
    barColor: t.oe
  };
}
class Jt extends j {
  constructor() {
    super(...arguments), this.zt = null, this.je = [];
  }
  J(t) {
    this.zt = t, this.je = [];
  }
  Z({
    context: t,
    horizontalPixelRatio: i,
    verticalPixelRatio: n
  }) {
    if (null === this.zt || 0 === this.zt.it.length || null === this.zt.tt) return;
    this.je.length || this.He(i);
    const s = Math.max(1, Math.floor(n)),
      e = Math.round(this.zt.$e * n) - Math.floor(s / 2),
      r = e + s;
    for (let i = this.zt.tt.from; i < this.zt.tt.to; i++) {
      const h = this.zt.it[i],
        l = this.je[i - this.zt.tt.from],
        a = Math.round(h.st * n);
      let o, _;
      t.fillStyle = h.oe, a <= e ? (o = a, _ = r) : (o = e, _ = a - Math.floor(s / 2) + s), t.fillRect(l.Rs, o, l.ui - l.Rs + 1, _ - o);
    }
  }
  He(t) {
    if (null === this.zt || 0 === this.zt.it.length || null === this.zt.tt) return void (this.je = []);
    const i = Math.ceil(this.zt.ee * t) <= 1 ? 0 : Math.max(1, Math.floor(t)),
      n = Math.round(this.zt.ee * t) - i;
    this.je = new Array(this.zt.tt.to - this.zt.tt.from);
    for (let i = this.zt.tt.from; i < this.zt.tt.to; i++) {
      const s = this.zt.it[i],
        e = Math.round(s.nt * t);
      let r, h;
      if (n % 2) {
        const t = (n - 1) / 2;
        r = e - t, h = e + t;
      } else {
        const t = n / 2;
        r = e - t, h = e + t - 1;
      }
      this.je[i - this.zt.tt.from] = {
        Rs: r,
        ui: h,
        Ue: e,
        qe: s.nt * t,
        ot: s.ot
      };
    }
    for (let t = this.zt.tt.from + 1; t < this.zt.tt.to; t++) {
      const n = this.je[t - this.zt.tt.from],
        s = this.je[t - this.zt.tt.from - 1];
      n.ot === s.ot + 1 && n.Rs - s.ui !== i + 1 && (s.Ue > s.qe ? s.ui = n.Rs - i - 1 : n.Rs = s.ui + i + 1);
    }
    let s = Math.ceil(this.zt.ee * t);
    for (let t = this.zt.tt.from; t < this.zt.tt.to; t++) {
      const i = this.je[t - this.zt.tt.from];
      i.ui < i.Rs && (i.ui = i.Rs);
      const n = i.ui - i.Rs + 1;
      s = Math.min(n, s);
    }
    if (i > 0 && s < 4) for (let t = this.zt.tt.from; t < this.zt.tt.to; t++) {
      const i = this.je[t - this.zt.tt.from];
      i.ui - i.Rs + 1 > s && (i.Ue > i.qe ? i.ui -= 1 : i.Rs += 1);
    }
  }
}
class Qt extends Nt {
  constructor() {
    super(...arguments), this.Ns = new Jt();
  }
  te(t, i, n) {
    return Object.assign(Object.assign({}, this.Js(t, i)), n.Ws(t));
  }
  Ks() {
    const t = {
      it: this.Vs,
      ee: this.zs.St().ee(),
      tt: this.Bs,
      $e: this.Is.Dt().Rt(this.Is.W().base, b(this.Is.Ct()).Ot)
    };
    this.Ns.J(t);
  }
}
class ti extends Nt {
  constructor() {
    super(...arguments), this.Ns = new Ot();
  }
  te(t, i, n) {
    return Object.assign(Object.assign({}, this.Js(t, i)), n.Ws(t));
  }
  Ks() {
    const t = this.Is.W(),
      i = {
        it: this.Vs,
        Nt: t.lineStyle,
        us: t.lineVisible ? t.lineType : void 0,
        et: t.lineWidth,
        Ts: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0,
        tt: this.Bs,
        _s: this.zs.St().ee()
      };
    this.Ns.J(i);
  }
}
const ii = /[2-9]/g;
class ni {
  constructor(t = 50) {
    this.Ye = 0, this.Xe = 1, this.Ke = 1, this.Ze = {}, this.Ge = new Map(), this.Je = t;
  }
  Qe() {
    this.Ye = 0, this.Ge.clear(), this.Xe = 1, this.Ke = 1, this.Ze = {};
  }
  Mi(t, i, n) {
    return this.tr(t, i, n).width;
  }
  gi(t, i, n) {
    const s = this.tr(t, i, n);
    return ((s.actualBoundingBoxAscent || 0) - (s.actualBoundingBoxDescent || 0)) / 2;
  }
  tr(t, i, n) {
    const s = n || ii,
      e = String(i).replace(s, "0");
    if (this.Ge.has(e)) return m(this.Ge.get(e)).ir;
    if (this.Ye === this.Je) {
      const t = this.Ze[this.Ke];
      delete this.Ze[this.Ke], this.Ge.delete(t), this.Ke++, this.Ye--;
    }
    t.save(), t.textBaseline = "middle";
    const r = t.measureText(e);
    return t.restore(), 0 === r.width && i.length || (this.Ge.set(e, {
      ir: r,
      nr: this.Xe
    }), this.Ze[this.Xe] = e, this.Ye++, this.Xe++), r;
  }
}
class si {
  constructor(t) {
    this.sr = null, this.k = null, this.er = "right", this.rr = t;
  }
  hr(t, i, n) {
    this.sr = t, this.k = i, this.er = n;
  }
  K(t) {
    null !== this.k && null !== this.sr && this.sr.K(t, this.k, this.rr, this.er);
  }
}
class ei {
  constructor(t, i, n) {
    this.lr = t, this.rr = new ni(50), this.ar = i, this.F = n, this.j = -1, this.Wt = new si(this.rr);
  }
  gt() {
    const t = this.F._r(this.ar);
    if (null === t) return null;
    const i = t.ur(this.ar) ? t.cr() : this.ar.Dt();
    if (null === i) return null;
    const n = t.dr(i);
    if ("overlay" === n) return null;
    const s = this.F.vr();
    return s.P !== this.j && (this.j = s.P, this.rr.Qe()), this.Wt.hr(this.lr.Bi(), s, n), this.Wt;
  }
}
class ri extends j {
  constructor() {
    super(...arguments), this.zt = null;
  }
  J(t) {
    this.zt = t;
  }
  pr(t, i) {
    var n;
    if (!(null === (n = this.zt) || void 0 === n ? void 0 : n.yt)) return null;
    const {
      st: s,
      et: e,
      mr: r
    } = this.zt;
    return i >= s - e - 7 && i <= s + e + 7 ? {
      br: this.zt,
      mr: r
    } : null;
  }
  Z({
    context: t,
    bitmapSize: i,
    horizontalPixelRatio: n,
    verticalPixelRatio: s
  }) {
    if (null === this.zt) return;
    if (!1 === this.zt.yt) return;
    const e = Math.round(this.zt.st * s);
    e < 0 || e > i.height || (t.lineCap = "butt", t.strokeStyle = this.zt.O, t.lineWidth = Math.floor(this.zt.et * n), f(t, this.zt.Nt), v(t, e, 0, i.width));
  }
}
class hi {
  constructor(t) {
    this.wr = {
      st: 0,
      O: "rgba(0, 0, 0, 0)",
      et: 1,
      Nt: 0,
      yt: !1
    }, this.gr = new ri(), this.ft = !0, this.Is = t, this.zs = t.$t(), this.gr.J(this.wr);
  }
  bt() {
    this.ft = !0;
  }
  gt() {
    return this.Is.yt() ? (this.ft && (this.Mr(), this.ft = !1), this.gr) : null;
  }
}
class li extends hi {
  constructor(t) {
    super(t);
  }
  Mr() {
    this.wr.yt = !1;
    const t = this.Is.Dt(),
      i = t.Sr().Sr;
    if (2 !== i && 3 !== i) return;
    const n = this.Is.W();
    if (!n.baseLineVisible || !this.Is.yt()) return;
    const s = this.Is.Ct();
    null !== s && (this.wr.yt = !0, this.wr.st = t.Rt(s.Ot, s.Ot), this.wr.O = n.baseLineColor, this.wr.et = n.baseLineWidth, this.wr.Nt = n.baseLineStyle);
  }
}
class ai extends j {
  constructor() {
    super(...arguments), this.zt = null;
  }
  J(t) {
    this.zt = t;
  }
  We() {
    return this.zt;
  }
  Z({
    context: t,
    horizontalPixelRatio: i,
    verticalPixelRatio: n
  }) {
    const s = this.zt;
    if (null === s) return;
    const e = Math.max(1, Math.floor(i)),
      r = e % 2 / 2,
      h = Math.round(s.qe.x * i) + r,
      l = s.qe.y * n;
    t.fillStyle = s.kr, t.beginPath();
    const a = Math.max(2, 1.5 * s.yr) * i;
    t.arc(h, l, a, 0, 2 * Math.PI, !1), t.fill(), t.fillStyle = s.Cr, t.beginPath(), t.arc(h, l, s.ht * i, 0, 2 * Math.PI, !1), t.fill(), t.lineWidth = e, t.strokeStyle = s.Tr, t.beginPath(), t.arc(h, l, s.ht * i + e / 2, 0, 2 * Math.PI, !1), t.stroke();
  }
}
const oi = [{
  Pr: 0,
  Rr: .25,
  Dr: 4,
  Or: 10,
  Ar: .25,
  Vr: 0,
  Br: .4,
  Ir: .8
}, {
  Pr: .25,
  Rr: .525,
  Dr: 10,
  Or: 14,
  Ar: 0,
  Vr: 0,
  Br: .8,
  Ir: 0
}, {
  Pr: .525,
  Rr: 1,
  Dr: 14,
  Or: 14,
  Ar: 0,
  Vr: 0,
  Br: 0,
  Ir: 0
}];
function _i(t, i, n, s) {
  return function (t, i) {
    if ("transparent" === t) return t;
    const n = T(t),
      s = n[3];
    return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i * s})`;
  }(t, n + (s - n) * i);
}
function ui(t, i) {
  const n = t % 2600 / 2600;
  let s;
  for (const t of oi) if (n >= t.Pr && n <= t.Rr) {
    s = t;
    break;
  }
  p(void 0 !== s, "Last price animation internal logic error");
  const e = (n - s.Pr) / (s.Rr - s.Pr);
  return {
    Cr: _i(i, e, s.Ar, s.Vr),
    Tr: _i(i, e, s.Br, s.Ir),
    ht: (r = e, h = s.Dr, l = s.Or, h + (l - h) * r)
  };
  var r, h, l;
}
class ci {
  constructor(t) {
    this.Wt = new ai(), this.ft = !0, this.zr = !0, this.Lr = performance.now(), this.Er = this.Lr - 1, this.Nr = t;
  }
  Fr() {
    this.Er = this.Lr - 1, this.bt();
  }
  Wr() {
    if (this.bt(), 2 === this.Nr.W().lastPriceAnimation) {
      const t = performance.now(),
        i = this.Er - t;
      if (i > 0) return void (i < 650 && (this.Er += 2600));
      this.Lr = t, this.Er = t + 2600;
    }
  }
  bt() {
    this.ft = !0;
  }
  jr() {
    this.zr = !0;
  }
  yt() {
    return 0 !== this.Nr.W().lastPriceAnimation;
  }
  Hr() {
    switch (this.Nr.W().lastPriceAnimation) {
      case 0:
        return !1;
      case 1:
        return !0;
      case 2:
        return performance.now() <= this.Er;
    }
  }
  gt() {
    return this.ft ? (this.Mt(), this.ft = !1, this.zr = !1) : this.zr && (this.$r(), this.zr = !1), this.Wt;
  }
  Mt() {
    this.Wt.J(null);
    const t = this.Nr.$t().St(),
      i = t.qs(),
      n = this.Nr.Ct();
    if (null === i || null === n) return;
    const s = this.Nr.Ur(!0);
    if (s.qr || !i.Yr(s.ie)) return;
    const e = {
        x: t.It(s.ie),
        y: this.Nr.Dt().Rt(s._t, n.Ot)
      },
      r = s.O,
      h = this.Nr.W().lineWidth,
      l = ui(this.Xr(), r);
    this.Wt.J({
      kr: r,
      yr: h,
      Cr: l.Cr,
      Tr: l.Tr,
      ht: l.ht,
      qe: e
    });
  }
  $r() {
    const t = this.Wt.We();
    if (null !== t) {
      const i = ui(this.Xr(), t.kr);
      t.Cr = i.Cr, t.Tr = i.Tr, t.ht = i.ht;
    }
  }
  Xr() {
    return this.Hr() ? performance.now() - this.Lr : 2599;
  }
}
function di(t, i) {
  return Ct(Math.min(Math.max(t, 12), 30) * i);
}
function fi(t, i) {
  switch (t) {
    case "arrowDown":
    case "arrowUp":
      return di(i, 1);
    case "circle":
      return di(i, .8);
    case "square":
      return di(i, .7);
  }
}
function vi(t) {
  return function (t) {
    const i = Math.ceil(t);
    return i % 2 != 0 ? i - 1 : i;
  }(di(t, 1));
}
function pi(t) {
  return Math.max(di(t, .1), 3);
}
function mi(t, i, n, s, e) {
  const r = fi("square", n),
    h = (r - 1) / 2,
    l = t - h,
    a = i - h;
  return s >= l && s <= l + r && e >= a && e <= a + r;
}
function bi(t, i, n, s) {
  const e = (fi("arrowUp", s) - 1) / 2 * n.Kr,
    r = (Ct(s / 2) - 1) / 2 * n.Kr;
  i.beginPath(), t ? (i.moveTo(n.nt - e, n.st), i.lineTo(n.nt, n.st - e), i.lineTo(n.nt + e, n.st), i.lineTo(n.nt + r, n.st), i.lineTo(n.nt + r, n.st + e), i.lineTo(n.nt - r, n.st + e), i.lineTo(n.nt - r, n.st)) : (i.moveTo(n.nt - e, n.st), i.lineTo(n.nt, n.st + e), i.lineTo(n.nt + e, n.st), i.lineTo(n.nt + r, n.st), i.lineTo(n.nt + r, n.st - e), i.lineTo(n.nt - r, n.st - e), i.lineTo(n.nt - r, n.st)), i.fill();
}
function wi(t, i, n, s, e, r) {
  return mi(i, n, s, e, r);
}
class gi extends j {
  constructor() {
    super(...arguments), this.zt = null, this.rr = new ni(), this.j = -1, this.H = "", this.Zr = "";
  }
  J(t) {
    this.zt = t;
  }
  hr(t, i) {
    this.j === t && this.H === i || (this.j = t, this.H = i, this.Zr = N(t, i), this.rr.Qe());
  }
  pr(t, i) {
    if (null === this.zt || null === this.zt.tt) return null;
    for (let n = this.zt.tt.from; n < this.zt.tt.to; n++) {
      const s = this.zt.it[n];
      if (xi(s, t, i)) return {
        br: s.Gr,
        mr: s.mr
      };
    }
    return null;
  }
  Z({
    context: t,
    horizontalPixelRatio: i,
    verticalPixelRatio: n
  }, s, e) {
    if (null !== this.zt && null !== this.zt.tt) {
      t.textBaseline = "middle", t.font = this.Zr;
      for (let s = this.zt.tt.from; s < this.zt.tt.to; s++) {
        const e = this.zt.it[s];
        void 0 !== e.Zt && (e.Zt.ji = this.rr.Mi(t, e.Zt.Jr), e.Zt.Bt = this.j, e.Zt.nt = e.nt - e.Zt.ji / 2), Mi(e, t, i, n);
      }
    }
  }
}
function Mi(t, i, n, s) {
  i.fillStyle = t.O, void 0 !== t.Zt && function (t, i, n, s, e, r) {
    t.save(), t.scale(e, r), t.fillText(i, n, s), t.restore();
  }(i, t.Zt.Jr, t.Zt.nt, t.Zt.st, n, s), function (t, i, n) {
    if (0 === t.Ys) return;
    switch (t.Qr) {
      case "arrowDown":
        return void bi(!1, i, n, t.Ys);
      case "arrowUp":
        return void bi(!0, i, n, t.Ys);
      case "circle":
        return void function (t, i, n) {
          const s = (fi("circle", n) - 1) / 2;
          t.beginPath(), t.arc(i.nt, i.st, s * i.Kr, 0, 2 * Math.PI, !1), t.fill();
        }(i, n, t.Ys);
      case "square":
        return void function (t, i, n) {
          const s = fi("square", n),
            e = (s - 1) * i.Kr / 2,
            r = i.nt - e,
            h = i.st - e;
          t.fillRect(r, h, s * i.Kr, s * i.Kr);
        }(i, n, t.Ys);
    }
    t.Qr;
  }(t, i, function (t, i, n) {
    const s = Math.max(1, Math.floor(i)) % 2 / 2;
    return {
      nt: Math.round(t.nt * i) + s,
      st: t.st * n,
      Kr: i
    };
  }(t, n, s));
}
function xi(t, i, n) {
  return !(void 0 === t.Zt || !function (t, i, n, s, e, r) {
    const h = s / 2;
    return e >= t && e <= t + n && r >= i - h && r <= i + h;
  }(t.Zt.nt, t.Zt.st, t.Zt.ji, t.Zt.Bt, i, n)) || function (t, i, n) {
    if (0 === t.Ys) return !1;
    switch (t.Qr) {
      case "arrowDown":
      case "arrowUp":
        return wi(0, t.nt, t.st, t.Ys, i, n);
      case "circle":
        return function (t, i, n, s, e) {
          const r = 2 + fi("circle", n) / 2,
            h = t - s,
            l = i - e;
          return Math.sqrt(h * h + l * l) <= r;
        }(t.nt, t.st, t.Ys, i, n);
      case "square":
        return mi(t.nt, t.st, t.Ys, i, n);
    }
  }(t, i, n);
}
function Si(t, i, n, s, e, r, h, l, a) {
  const o = O(n) ? n : n.ge,
    _ = O(n) ? n : n.be,
    u = O(n) ? n : n.we,
    c = O(i.size) ? Math.max(i.size, 0) : 1,
    d = vi(l.ee()) * c,
    f = d / 2;
  switch (t.Ys = d, i.position) {
    case "inBar":
      return t.st = h.Rt(o, a), void (void 0 !== t.Zt && (t.Zt.st = t.st + f + r + .6 * e));
    case "aboveBar":
      return t.st = h.Rt(_, a) - f - s.th, void 0 !== t.Zt && (t.Zt.st = t.st - f - .6 * e, s.th += 1.2 * e), void (s.th += d + r);
    case "belowBar":
      return t.st = h.Rt(u, a) + f + s.ih, void 0 !== t.Zt && (t.Zt.st = t.st + f + r + .6 * e, s.ih += 1.2 * e), void (s.ih += d + r);
  }
  i.position;
}
class ki {
  constructor(t, i) {
    this.ft = !0, this.nh = !0, this.sh = !0, this.eh = null, this.Wt = new gi(), this.Nr = t, this.Hi = i, this.zt = {
      it: [],
      tt: null
    };
  }
  bt(t) {
    this.ft = !0, this.sh = !0, "data" === t && (this.nh = !0);
  }
  gt(t) {
    if (!this.Nr.yt()) return null;
    this.ft && this.rh();
    const i = this.Hi.W().layout;
    return this.Wt.hr(i.fontSize, i.fontFamily), this.Wt.J(this.zt), this.Wt;
  }
  hh() {
    if (this.sh) {
      if (this.Nr.lh().length > 0) {
        const t = this.Hi.St().ee(),
          i = pi(t),
          n = 1.5 * vi(t) + 2 * i;
        this.eh = {
          above: n,
          below: n
        };
      } else this.eh = null;
      this.sh = !1;
    }
    return this.eh;
  }
  rh() {
    const t = this.Nr.Dt(),
      i = this.Hi.St(),
      n = this.Nr.lh();
    this.nh && (this.zt.it = n.map(t => ({
      ot: t.time,
      nt: 0,
      st: 0,
      Ys: 0,
      Qr: t.shape,
      O: t.color,
      Gr: t.Gr,
      mr: t.id,
      Zt: void 0
    })), this.nh = !1);
    const s = this.Hi.W().layout;
    this.zt.tt = null;
    const e = i.qs();
    if (null === e) return;
    const r = this.Nr.Ct();
    if (null === r) return;
    if (0 === this.zt.it.length) return;
    let h = NaN;
    const l = pi(i.ee()),
      a = {
        th: l,
        ih: l
      };
    this.zt.tt = Lt(this.zt.it, e, !0);
    for (let e = this.zt.tt.from; e < this.zt.tt.to; e++) {
      const o = n[e];
      o.time !== h && (a.th = l, a.ih = l, h = o.time);
      const _ = this.zt.it[e];
      _.nt = i.It(o.time), void 0 !== o.text && o.text.length > 0 && (_.Zt = {
        Jr: o.text,
        nt: 0,
        st: 0,
        ji: 0,
        Bt: 0
      });
      const u = this.Nr.ah(o.time);
      null !== u && Si(_, o, u, a, s.fontSize, l, t, i, r.Ot);
    }
    this.ft = !1;
  }
}
class yi extends hi {
  constructor(t) {
    super(t);
  }
  Mr() {
    const t = this.wr;
    t.yt = !1;
    const i = this.Is.W();
    if (!i.priceLineVisible || !this.Is.yt()) return;
    const n = this.Is.Ur(0 === i.priceLineSource);
    n.qr || (t.yt = !0, t.st = n.Si, t.O = this.Is.oh(n.O), t.et = i.priceLineWidth, t.Nt = i.priceLineStyle);
  }
}
class Ci extends nt {
  constructor(t) {
    super(), this.jt = t;
  }
  Ii(t, i, n) {
    t.yt = !1, i.yt = !1;
    const s = this.jt;
    if (!s.yt()) return;
    const e = s.W(),
      r = e.lastValueVisible,
      h = "" !== s._h(),
      l = 0 === e.seriesLastValueMode,
      a = s.Ur(!1);
    if (a.qr) return;
    r && (t.Zt = this.uh(a, r, l), t.yt = 0 !== t.Zt.length), (h || l) && (i.Zt = this.dh(a, r, h, l), i.yt = i.Zt.length > 0);
    const o = s.oh(a.O),
      _ = P(o);
    n.t = _.t, n.Si = a.Si, i.At = s.$t().Vt(a.Si / s.Dt().Bt()), t.At = o, t.O = _.i, i.O = _.i;
  }
  dh(t, i, n, s) {
    let e = "";
    const r = this.jt._h();
    return n && 0 !== r.length && (e += `${r} `), i && s && (e += this.jt.Dt().fh() ? t.ph : t.mh), e.trim();
  }
  uh(t, i, n) {
    return i ? n ? this.jt.Dt().fh() ? t.mh : t.ph : t.Zt : "";
  }
}
function Ti(t, i, n, s) {
  const e = Number.isFinite(i),
    r = Number.isFinite(n);
  return e && r ? t(i, n) : e || r ? e ? i : n : s;
}
class Pi {
  constructor(t, i) {
    this.bh = t, this.wh = i;
  }
  gh(t) {
    return null !== t && this.bh === t.bh && this.wh === t.wh;
  }
  Mh() {
    return new Pi(this.bh, this.wh);
  }
  xh() {
    return this.bh;
  }
  Sh() {
    return this.wh;
  }
  kh() {
    return this.wh - this.bh;
  }
  Ei() {
    return this.wh === this.bh || Number.isNaN(this.wh) || Number.isNaN(this.bh);
  }
  Jn(t) {
    return null === t ? this : new Pi(Ti(Math.min, this.xh(), t.xh(), -1 / 0), Ti(Math.max, this.Sh(), t.Sh(), 1 / 0));
  }
  yh(t) {
    if (!O(t)) return;
    if (0 === this.wh - this.bh) return;
    const i = .5 * (this.wh + this.bh);
    let n = this.wh - i,
      s = this.bh - i;
    n *= t, s *= t, this.wh = i + n, this.bh = i + s;
  }
  Ch(t) {
    O(t) && (this.wh += t, this.bh += t);
  }
  Th() {
    return {
      minValue: this.bh,
      maxValue: this.wh
    };
  }
  static Ph(t) {
    return null === t ? null : new Pi(t.minValue, t.maxValue);
  }
}
class Ri {
  constructor(t, i) {
    this.Rh = t, this.Dh = i || null;
  }
  Oh() {
    return this.Rh;
  }
  Ah() {
    return this.Dh;
  }
  Th() {
    return null === this.Rh ? null : {
      priceRange: this.Rh.Th(),
      margins: this.Dh || void 0
    };
  }
  static Ph(t) {
    return null === t ? null : new Ri(Pi.Ph(t.priceRange), t.margins);
  }
}
class Di extends hi {
  constructor(t, i) {
    super(t), this.Vh = i;
  }
  Mr() {
    const t = this.wr;
    t.yt = !1;
    const i = this.Vh.W();
    if (!this.Is.yt() || !i.lineVisible) return;
    const n = this.Vh.Bh();
    null !== n && (t.yt = !0, t.st = n, t.O = i.color, t.et = i.lineWidth, t.Nt = i.lineStyle, t.mr = this.Vh.W().id);
  }
}
class Oi extends nt {
  constructor(t, i) {
    super(), this.Nr = t, this.Vh = i;
  }
  Ii(t, i, n) {
    t.yt = !1, i.yt = !1;
    const s = this.Vh.W(),
      e = s.axisLabelVisible,
      r = "" !== s.title,
      h = this.Nr;
    if (!e || !h.yt()) return;
    const l = this.Vh.Bh();
    if (null === l) return;
    r && (i.Zt = s.title, i.yt = !0), i.At = h.$t().Vt(l / h.Dt().Bt()), t.Zt = this.Ih(s.price), t.yt = !0;
    const a = P(s.axisLabelColor || s.color);
    n.t = a.t;
    const o = s.axisLabelTextColor || a.i;
    t.O = o, i.O = o, n.Si = l;
  }
  Ih(t) {
    const i = this.Nr.Ct();
    return null === i ? "" : this.Nr.Dt().Ni(t, i.Ot);
  }
}
class Ai {
  constructor(t, i) {
    this.Nr = t, this._n = i, this.zh = new Di(t, this), this.lr = new Oi(t, this), this.Lh = new ei(this.lr, t, t.$t());
  }
  Eh(t) {
    D(this._n, t), this.bt(), this.Nr.$t().Nh();
  }
  W() {
    return this._n;
  }
  Fh() {
    return this.zh;
  }
  Wh() {
    return this.Lh;
  }
  jh() {
    return this.lr;
  }
  bt() {
    this.zh.bt(), this.lr.bt();
  }
  Bh() {
    const t = this.Nr,
      i = t.Dt();
    if (t.$t().St().Ei() || i.Ei()) return null;
    const n = t.Ct();
    return null === n ? null : i.Rt(this._n.price, n.Ot);
  }
}
class Vi extends lt {
  constructor(t) {
    super(), this.Hi = t;
  }
  $t() {
    return this.Hi;
  }
}
const Bi = {
  Bar: (t, i, n, s) => {
    var e;
    const r = i.upColor,
      h = i.downColor,
      l = b(t(n, s)),
      a = w(l.Ot[0]) <= w(l.Ot[3]);
    return {
      oe: null !== (e = l.O) && void 0 !== e ? e : a ? r : h
    };
  },
  Candlestick: (t, i, n, s) => {
    var e, r, h;
    const l = i.upColor,
      a = i.downColor,
      o = i.borderUpColor,
      _ = i.borderDownColor,
      u = i.wickUpColor,
      c = i.wickDownColor,
      d = b(t(n, s)),
      f = w(d.Ot[0]) <= w(d.Ot[3]);
    return {
      oe: null !== (e = d.O) && void 0 !== e ? e : f ? l : a,
      ze: null !== (r = d.At) && void 0 !== r ? r : f ? o : _,
      Ie: null !== (h = d.Hh) && void 0 !== h ? h : f ? u : c
    };
  },
  Custom: (t, i, n, s) => {
    var e;
    return {
      oe: null !== (e = b(t(n, s)).O) && void 0 !== e ? e : i.color
    };
  },
  Area: (t, i, n, s) => {
    var e, r, h, l;
    const a = b(t(n, s));
    return {
      oe: null !== (e = a.lt) && void 0 !== e ? e : i.lineColor,
      lt: null !== (r = a.lt) && void 0 !== r ? r : i.lineColor,
      ys: null !== (h = a.ys) && void 0 !== h ? h : i.topColor,
      Cs: null !== (l = a.Cs) && void 0 !== l ? l : i.bottomColor
    };
  },
  Baseline: (t, i, n, s) => {
    var e, r, h, l, a, o;
    const _ = b(t(n, s));
    return {
      oe: _.Ot[3] >= i.baseValue.price ? i.topLineColor : i.bottomLineColor,
      Ce: null !== (e = _.Ce) && void 0 !== e ? e : i.topLineColor,
      Te: null !== (r = _.Te) && void 0 !== r ? r : i.bottomLineColor,
      Me: null !== (h = _.Me) && void 0 !== h ? h : i.topFillColor1,
      xe: null !== (l = _.xe) && void 0 !== l ? l : i.topFillColor2,
      Se: null !== (a = _.Se) && void 0 !== a ? a : i.bottomFillColor1,
      ke: null !== (o = _.ke) && void 0 !== o ? o : i.bottomFillColor2
    };
  },
  Line: (t, i, n, s) => {
    var e, r;
    const h = b(t(n, s));
    return {
      oe: null !== (e = h.O) && void 0 !== e ? e : i.color,
      lt: null !== (r = h.O) && void 0 !== r ? r : i.color
    };
  },
  Histogram: (t, i, n, s) => {
    var e;
    return {
      oe: null !== (e = b(t(n, s)).O) && void 0 !== e ? e : i.color
    };
  }
};
class Ii {
  constructor(t) {
    this.$h = (t, i) => void 0 !== i ? i.Ot : this.Nr.Vn().Uh(t), this.Nr = t, this.qh = Bi[t.Yh()];
  }
  Ws(t, i) {
    return this.qh(this.$h, this.Nr.W(), t, i);
  }
}
var zi;
!function (t) {
  t[t.NearestLeft = -1] = "NearestLeft", t[t.None = 0] = "None", t[t.NearestRight = 1] = "NearestRight";
}(zi || (exports.MismatchDirection = zi = {}));
const Li = 30;
class Ei {
  constructor() {
    this.Xh = [], this.Kh = new Map(), this.Zh = new Map();
  }
  Gh() {
    return this.Ys() > 0 ? this.Xh[this.Xh.length - 1] : null;
  }
  Jh() {
    return this.Ys() > 0 ? this.Qh(0) : null;
  }
  An() {
    return this.Ys() > 0 ? this.Qh(this.Xh.length - 1) : null;
  }
  Ys() {
    return this.Xh.length;
  }
  Ei() {
    return 0 === this.Ys();
  }
  Yr(t) {
    return null !== this.tl(t, 0);
  }
  Uh(t) {
    return this.il(t);
  }
  il(t, i = 0) {
    const n = this.tl(t, i);
    return null === n ? null : Object.assign(Object.assign({}, this.nl(n)), {
      ie: this.Qh(n)
    });
  }
  Qs() {
    return this.Xh;
  }
  sl(t, i, n) {
    if (this.Ei()) return null;
    let s = null;
    for (const e of n) {
      s = Ni(s, this.el(t, i, e));
    }
    return s;
  }
  J(t) {
    this.Zh.clear(), this.Kh.clear(), this.Xh = t;
  }
  Qh(t) {
    return this.Xh[t].ie;
  }
  nl(t) {
    return this.Xh[t];
  }
  tl(t, i) {
    const n = this.rl(t);
    if (null === n && 0 !== i) switch (i) {
      case -1:
        return this.hl(t);
      case 1:
        return this.ll(t);
      default:
        throw new TypeError("Unknown search mode");
    }
    return n;
  }
  hl(t) {
    let i = this.al(t);
    return i > 0 && (i -= 1), i !== this.Xh.length && this.Qh(i) < t ? i : null;
  }
  ll(t) {
    const i = this.ol(t);
    return i !== this.Xh.length && t < this.Qh(i) ? i : null;
  }
  rl(t) {
    const i = this.al(t);
    return i === this.Xh.length || t < this.Xh[i].ie ? null : i;
  }
  al(t) {
    return Vt(this.Xh, t, (t, i) => t.ie < i);
  }
  ol(t) {
    return Bt(this.Xh, t, (t, i) => t.ie > i);
  }
  _l(t, i, n) {
    let s = null;
    for (let e = t; e < i; e++) {
      const t = this.Xh[e].Ot[n];
      Number.isNaN(t) || (null === s ? s = {
        ul: t,
        cl: t
      } : (t < s.ul && (s.ul = t), t > s.cl && (s.cl = t)));
    }
    return s;
  }
  el(t, i, n) {
    if (this.Ei()) return null;
    let s = null;
    const e = b(this.Jh()),
      r = b(this.An()),
      h = Math.max(t, e),
      l = Math.min(i, r),
      a = Math.ceil(h / Li) * Li,
      o = Math.max(a, Math.floor(l / Li) * Li);
    {
      const t = this.al(h),
        e = this.ol(Math.min(l, a, i));
      s = Ni(s, this._l(t, e, n));
    }
    let _ = this.Kh.get(n);
    void 0 === _ && (_ = new Map(), this.Kh.set(n, _));
    for (let t = Math.max(a + 1, h); t < o; t += Li) {
      const i = Math.floor(t / Li);
      let e = _.get(i);
      if (void 0 === e) {
        const t = this.al(i * Li),
          s = this.ol((i + 1) * Li - 1);
        e = this._l(t, s, n), _.set(i, e);
      }
      s = Ni(s, e);
    }
    {
      const t = this.al(o),
        i = this.ol(l);
      s = Ni(s, this._l(t, i, n));
    }
    return s;
  }
}
function Ni(t, i) {
  if (null === t) return i;
  if (null === i) return t;
  return {
    ul: Math.min(t.ul, i.ul),
    cl: Math.max(t.cl, i.cl)
  };
}
class Fi {
  constructor(t) {
    this.dl = t;
  }
  K(t, i, n) {
    this.dl.draw(t);
  }
  fl(t, i, n) {
    var s, e;
    null === (e = (s = this.dl).drawBackground) || void 0 === e || e.call(s, t);
  }
}
class Wi {
  constructor(t) {
    this.Ge = null, this.mn = t;
  }
  gt() {
    var t;
    const i = this.mn.renderer();
    if (null === i) return null;
    if ((null === (t = this.Ge) || void 0 === t ? void 0 : t.vl) === i) return this.Ge.pl;
    const n = new Fi(i);
    return this.Ge = {
      vl: i,
      pl: n
    }, n;
  }
  ml() {
    var t, i, n;
    return null !== (n = null === (i = (t = this.mn).zOrder) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : "normal";
  }
}
function ji(t) {
  var i, n, s, e, r;
  return {
    Zt: t.text(),
    Si: t.coordinate(),
    xi: null === (i = t.fixedCoordinate) || void 0 === i ? void 0 : i.call(t),
    O: t.textColor(),
    t: t.backColor(),
    yt: null === (s = null === (n = t.visible) || void 0 === n ? void 0 : n.call(t)) || void 0 === s || s,
    hi: null === (r = null === (e = t.tickVisible) || void 0 === e ? void 0 : e.call(t)) || void 0 === r || r
  };
}
class Hi {
  constructor(t, i) {
    this.Wt = new rt(), this.bl = t, this.wl = i;
  }
  gt() {
    return this.Wt.J(Object.assign({
      ji: this.wl.ji()
    }, ji(this.bl))), this.Wt;
  }
}
class $i extends nt {
  constructor(t, i) {
    super(), this.bl = t, this.zi = i;
  }
  Ii(t, i, n) {
    const s = ji(this.bl);
    n.t = s.t, t.O = s.O;
    const e = 2 / 12 * this.zi.P();
    n.bi = e, n.wi = e, n.Si = s.Si, n.xi = s.xi, t.Zt = s.Zt, t.yt = s.yt, t.hi = s.hi;
  }
}
class Ui {
  constructor(t, i) {
    this.gl = null, this.Ml = null, this.xl = null, this.Sl = null, this.kl = null, this.yl = t, this.Nr = i;
  }
  Cl() {
    return this.yl;
  }
  Rn() {
    var t, i;
    null === (i = (t = this.yl).updateAllViews) || void 0 === i || i.call(t);
  }
  Cn() {
    var t, i, n, s;
    const e = null !== (n = null === (i = (t = this.yl).paneViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
    if ((null === (s = this.gl) || void 0 === s ? void 0 : s.vl) === e) return this.gl.pl;
    const r = e.map(t => new Wi(t));
    return this.gl = {
      vl: e,
      pl: r
    }, r;
  }
  Ji() {
    var t, i, n, s;
    const e = null !== (n = null === (i = (t = this.yl).timeAxisViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
    if ((null === (s = this.Ml) || void 0 === s ? void 0 : s.vl) === e) return this.Ml.pl;
    const r = this.Nr.$t().St(),
      h = e.map(t => new Hi(t, r));
    return this.Ml = {
      vl: e,
      pl: h
    }, h;
  }
  Tn() {
    var t, i, n, s;
    const e = null !== (n = null === (i = (t = this.yl).priceAxisViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
    if ((null === (s = this.xl) || void 0 === s ? void 0 : s.vl) === e) return this.xl.pl;
    const r = this.Nr.Dt(),
      h = e.map(t => new $i(t, r));
    return this.xl = {
      vl: e,
      pl: h
    }, h;
  }
  Tl() {
    var t, i, n, s;
    const e = null !== (n = null === (i = (t = this.yl).priceAxisPaneViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
    if ((null === (s = this.Sl) || void 0 === s ? void 0 : s.vl) === e) return this.Sl.pl;
    const r = e.map(t => new Wi(t));
    return this.Sl = {
      vl: e,
      pl: r
    }, r;
  }
  Pl() {
    var t, i, n, s;
    const e = null !== (n = null === (i = (t = this.yl).timeAxisPaneViews) || void 0 === i ? void 0 : i.call(t)) && void 0 !== n ? n : [];
    if ((null === (s = this.kl) || void 0 === s ? void 0 : s.vl) === e) return this.kl.pl;
    const r = e.map(t => new Wi(t));
    return this.kl = {
      vl: e,
      pl: r
    }, r;
  }
  Rl(t, i) {
    var n, s, e;
    return null !== (e = null === (s = (n = this.yl).autoscaleInfo) || void 0 === s ? void 0 : s.call(n, t, i)) && void 0 !== e ? e : null;
  }
  pr(t, i) {
    var n, s, e;
    return null !== (e = null === (s = (n = this.yl).hitTest) || void 0 === s ? void 0 : s.call(n, t, i)) && void 0 !== e ? e : null;
  }
}
function qi(t, i, n, s) {
  t.forEach(t => {
    i(t).forEach(t => {
      t.ml() === n && s.push(t);
    });
  });
}
function Yi(t) {
  return t.Cn();
}
function Xi(t) {
  return t.Tl();
}
function Ki(t) {
  return t.Pl();
}
class Zi extends Vi {
  constructor(t, i, n, s, e) {
    super(t), this.zt = new Ei(), this.zh = new yi(this), this.Dl = [], this.Ol = new li(this), this.Al = null, this.Vl = null, this.Bl = [], this.Il = [], this.zl = null, this.Ll = [], this._n = i, this.El = n;
    const r = new Ci(this);
    this.en = [r], this.Lh = new ei(r, this, t), "Area" !== n && "Line" !== n && "Baseline" !== n || (this.Al = new ci(this)), this.Nl(), this.Fl(e);
  }
  S() {
    null !== this.zl && clearTimeout(this.zl);
  }
  oh(t) {
    return this._n.priceLineColor || t;
  }
  Ur(t) {
    const i = {
        qr: !0
      },
      n = this.Dt();
    if (this.$t().St().Ei() || n.Ei() || this.zt.Ei()) return i;
    const s = this.$t().St().qs(),
      e = this.Ct();
    if (null === s || null === e) return i;
    let r, h;
    if (t) {
      const t = this.zt.Gh();
      if (null === t) return i;
      r = t, h = t.ie;
    } else {
      const t = this.zt.il(s.ui(), -1);
      if (null === t) return i;
      if (r = this.zt.Uh(t.ie), null === r) return i;
      h = t.ie;
    }
    const l = r.Ot[3],
      a = this.js().Ws(h, {
        Ot: r
      }),
      o = n.Rt(l, e.Ot);
    return {
      qr: !1,
      _t: l,
      Zt: n.Ni(l, e.Ot),
      ph: n.Wl(l),
      mh: n.jl(l, e.Ot),
      O: a.oe,
      Si: o,
      ie: h
    };
  }
  js() {
    return null !== this.Vl || (this.Vl = new Ii(this)), this.Vl;
  }
  W() {
    return this._n;
  }
  Eh(t) {
    const i = t.priceScaleId;
    void 0 !== i && i !== this._n.priceScaleId && this.$t().Hl(this, i), D(this._n, t), void 0 !== t.priceFormat && (this.Nl(), this.$t().$l()), this.$t().Ul(this), this.$t().ql(), this.mn.bt("options");
  }
  J(t, i) {
    this.zt.J(t), this.Yl(), this.mn.bt("data"), this.un.bt("data"), null !== this.Al && (i && i.Xl ? this.Al.Wr() : 0 === t.length && this.Al.Fr());
    const n = this.$t()._r(this);
    this.$t().Kl(n), this.$t().Ul(this), this.$t().ql(), this.$t().Nh();
  }
  Zl(t) {
    this.Bl = t, this.Yl();
    const i = this.$t()._r(this);
    this.un.bt("data"), this.$t().Kl(i), this.$t().Ul(this), this.$t().ql(), this.$t().Nh();
  }
  Gl() {
    return this.Bl;
  }
  lh() {
    return this.Il;
  }
  Jl(t) {
    const i = new Ai(this, t);
    return this.Dl.push(i), this.$t().Ul(this), i;
  }
  Ql(t) {
    const i = this.Dl.indexOf(t);
    -1 !== i && this.Dl.splice(i, 1), this.$t().Ul(this);
  }
  Yh() {
    return this.El;
  }
  Ct() {
    const t = this.ta();
    return null === t ? null : {
      Ot: t.Ot[3],
      ia: t.ot
    };
  }
  ta() {
    const t = this.$t().St().qs();
    if (null === t) return null;
    const i = t.Rs();
    return this.zt.il(i, 1);
  }
  Vn() {
    return this.zt;
  }
  ah(t) {
    const i = this.zt.Uh(t);
    return null === i ? null : "Bar" === this.El || "Candlestick" === this.El || "Custom" === this.El ? {
      me: i.Ot[0],
      be: i.Ot[1],
      we: i.Ot[2],
      ge: i.Ot[3]
    } : i.Ot[3];
  }
  na(t) {
    const i = [];
    qi(this.Ll, Yi, "top", i);
    const n = this.Al;
    return null !== n && n.yt() ? (null === this.zl && n.Hr() && (this.zl = setTimeout(() => {
      this.zl = null, this.$t().sa();
    }, 0)), n.jr(), i.push(n), i) : i;
  }
  Cn() {
    const t = [];
    this.ea() || t.push(this.Ol), t.push(this.mn, this.zh, this.un);
    const i = this.Dl.map(t => t.Fh());
    return t.push(...i), qi(this.Ll, Yi, "normal", t), t;
  }
  ra() {
    return this.ha(Yi, "bottom");
  }
  la(t) {
    return this.ha(Xi, t);
  }
  aa(t) {
    return this.ha(Ki, t);
  }
  oa(t, i) {
    return this.Ll.map(n => n.pr(t, i)).filter(t => null !== t);
  }
  Gi(t) {
    return [this.Lh, ...this.Dl.map(t => t.Wh())];
  }
  Tn(t, i) {
    if (i !== this.qi && !this.ea()) return [];
    const n = [...this.en];
    for (const t of this.Dl) n.push(t.jh());
    return this.Ll.forEach(t => {
      n.push(...t.Tn());
    }), n;
  }
  Ji() {
    const t = [];
    return this.Ll.forEach(i => {
      t.push(...i.Ji());
    }), t;
  }
  Rl(t, i) {
    if (void 0 !== this._n.autoscaleInfoProvider) {
      const n = this._n.autoscaleInfoProvider(() => {
        const n = this._a(t, i);
        return null === n ? null : n.Th();
      });
      return Ri.Ph(n);
    }
    return this._a(t, i);
  }
  ua() {
    return this._n.priceFormat.minMove;
  }
  ca() {
    return this.da;
  }
  Rn() {
    var t;
    this.mn.bt(), this.un.bt();
    for (const t of this.en) t.bt();
    for (const t of this.Dl) t.bt();
    this.zh.bt(), this.Ol.bt(), null === (t = this.Al) || void 0 === t || t.bt(), this.Ll.forEach(t => t.Rn());
  }
  Dt() {
    return b(super.Dt());
  }
  kt(t) {
    if (!(("Line" === this.El || "Area" === this.El || "Baseline" === this.El) && this._n.crosshairMarkerVisible)) return null;
    const i = this.zt.Uh(t);
    if (null === i) return null;
    return {
      _t: i.Ot[3],
      ht: this.fa(),
      At: this.va(),
      Pt: this.pa(),
      Tt: this.ma(t)
    };
  }
  _h() {
    return this._n.title;
  }
  yt() {
    return this._n.visible;
  }
  ba(t) {
    this.Ll.push(new Ui(t, this));
  }
  wa(t) {
    this.Ll = this.Ll.filter(i => i.Cl() !== t);
  }
  ga() {
    if (this.mn instanceof Zt != !1) return t => this.mn.Ee(t);
  }
  Ma() {
    if (this.mn instanceof Zt != !1) return t => this.mn.Ne(t);
  }
  ea() {
    return !_t(this.Dt().xa());
  }
  _a(t, i) {
    if (!A(t) || !A(i) || this.zt.Ei()) return null;
    const n = "Line" === this.El || "Area" === this.El || "Baseline" === this.El || "Histogram" === this.El ? [3] : [2, 1],
      s = this.zt.sl(t, i, n);
    let e = null !== s ? new Pi(s.ul, s.cl) : null;
    if ("Histogram" === this.Yh()) {
      const t = this._n.base,
        i = new Pi(t, t);
      e = null !== e ? e.Jn(i) : i;
    }
    let r = this.un.hh();
    return this.Ll.forEach(n => {
      const s = n.Rl(t, i);
      if (null == s ? void 0 : s.priceRange) {
        const t = new Pi(s.priceRange.minValue, s.priceRange.maxValue);
        e = null !== e ? e.Jn(t) : t;
      }
      var h, l, a, o;
      (null == s ? void 0 : s.margins) && (h = r, l = s.margins, r = {
        above: Math.max(null !== (a = null == h ? void 0 : h.above) && void 0 !== a ? a : 0, l.above),
        below: Math.max(null !== (o = null == h ? void 0 : h.below) && void 0 !== o ? o : 0, l.below)
      });
    }), new Ri(e, r);
  }
  fa() {
    switch (this.El) {
      case "Line":
      case "Area":
      case "Baseline":
        return this._n.crosshairMarkerRadius;
    }
    return 0;
  }
  va() {
    switch (this.El) {
      case "Line":
      case "Area":
      case "Baseline":
        {
          const t = this._n.crosshairMarkerBorderColor;
          if (0 !== t.length) return t;
        }
    }
    return null;
  }
  pa() {
    switch (this.El) {
      case "Line":
      case "Area":
      case "Baseline":
        return this._n.crosshairMarkerBorderWidth;
    }
    return 0;
  }
  ma(t) {
    switch (this.El) {
      case "Line":
      case "Area":
      case "Baseline":
        {
          const t = this._n.crosshairMarkerBackgroundColor;
          if (0 !== t.length) return t;
        }
    }
    return this.js().Ws(t).oe;
  }
  Nl() {
    switch (this._n.priceFormat.type) {
      case "custom":
        this.da = {
          format: this._n.priceFormat.formatter
        };
        break;
      case "volume":
        this.da = new pt(this._n.priceFormat.precision);
        break;
      case "percent":
        this.da = new vt(this._n.priceFormat.precision);
        break;
      default:
        {
          const t = Math.pow(10, this._n.priceFormat.precision);
          this.da = new ft(t, this._n.priceFormat.minMove * t);
        }
    }
    null !== this.qi && this.qi.Sa();
  }
  Yl() {
    const t = this.$t().St();
    if (!t.ka() || this.zt.Ei()) return void (this.Il = []);
    const i = b(this.zt.Jh());
    this.Il = this.Bl.map((n, s) => {
      const e = b(t.ya(n.time, !0)),
        r = e < i ? 1 : -1;
      return {
        time: b(this.zt.il(e, r)).ie,
        position: n.position,
        shape: n.shape,
        color: n.color,
        id: n.id,
        Gr: s,
        text: n.text,
        size: n.size,
        originalTime: n.originalTime
      };
    });
  }
  Fl(t) {
    switch (this.un = new ki(this, this.$t()), this.El) {
      case "Bar":
        this.mn = new Ht(this, this.$t());
        break;
      case "Candlestick":
        this.mn = new Xt(this, this.$t());
        break;
      case "Line":
        this.mn = new ti(this, this.$t());
        break;
      case "Custom":
        this.mn = new Zt(this, this.$t(), m(t));
        break;
      case "Area":
        this.mn = new Ft(this, this.$t());
        break;
      case "Baseline":
        this.mn = new qt(this, this.$t());
        break;
      case "Histogram":
        this.mn = new Qt(this, this.$t());
        break;
      default:
        throw Error("Unknown chart style assigned: " + this.El);
    }
  }
  ha(t, i) {
    const n = [];
    return qi(this.Ll, t, i, n), n;
  }
}
class Gi {
  constructor(t) {
    this._n = t;
  }
  Ca(t, i, n) {
    let s = t;
    if (0 === this._n.mode) return s;
    const e = n.dn(),
      r = e.Ct();
    if (null === r) return s;
    const h = e.Rt(t, r),
      l = n.Ta().filter(t => t instanceof Zi).reduce((t, s) => {
        if (n.ur(s) || !s.yt()) return t;
        const e = s.Dt(),
          r = s.Vn();
        if (e.Ei() || !r.Yr(i)) return t;
        const h = r.Uh(i);
        if (null === h) return t;
        const l = w(s.Ct());
        return t.concat([e.Rt(h.Ot[3], l.Ot)]);
      }, []);
    if (0 === l.length) return s;
    l.sort((t, i) => Math.abs(t - h) - Math.abs(i - h));
    const a = l[0];
    return s = e.fn(a, r), s;
  }
}
class Ji extends j {
  constructor() {
    super(...arguments), this.zt = null;
  }
  J(t) {
    this.zt = t;
  }
  Z({
    context: t,
    bitmapSize: i,
    horizontalPixelRatio: n,
    verticalPixelRatio: s
  }) {
    if (null === this.zt) return;
    const e = Math.max(1, Math.floor(n));
    t.lineWidth = e, function (t, i) {
      t.save(), t.lineWidth % 2 && t.translate(.5, .5), i(), t.restore();
    }(t, () => {
      const r = b(this.zt);
      if (r.Pa) {
        t.strokeStyle = r.Ra, f(t, r.Da), t.beginPath();
        for (const s of r.Oa) {
          const r = Math.round(s.Aa * n);
          t.moveTo(r, -e), t.lineTo(r, i.height + e);
        }
        t.stroke();
      }
      if (r.Va) {
        t.strokeStyle = r.Ba, f(t, r.Ia), t.beginPath();
        for (const n of r.za) {
          const r = Math.round(n.Aa * s);
          t.moveTo(-e, r), t.lineTo(i.width + e, r);
        }
        t.stroke();
      }
    });
  }
}
class Qi {
  constructor(t) {
    this.Wt = new Ji(), this.ft = !0, this.Qi = t;
  }
  bt() {
    this.ft = !0;
  }
  gt() {
    if (this.ft) {
      const t = this.Qi.$t().W().grid,
        i = {
          Va: t.horzLines.visible,
          Pa: t.vertLines.visible,
          Ba: t.horzLines.color,
          Ra: t.vertLines.color,
          Ia: t.horzLines.style,
          Da: t.vertLines.style,
          za: this.Qi.dn().La(),
          Oa: (this.Qi.$t().St().La() || []).map(t => ({
            Aa: t.coord
          }))
        };
      this.Wt.J(i), this.ft = !1;
    }
    return this.Wt;
  }
}
class tn {
  constructor(t) {
    this.mn = new Qi(t);
  }
  Fh() {
    return this.mn;
  }
}
const nn = {
  Ea: 4,
  Na: 1e-4
};
function sn(t, i) {
  const n = 100 * (t - i) / i;
  return i < 0 ? -n : n;
}
function en(t, i) {
  const n = sn(t.xh(), i),
    s = sn(t.Sh(), i);
  return new Pi(n, s);
}
function rn(t, i) {
  const n = 100 * (t - i) / i + 100;
  return i < 0 ? -n : n;
}
function hn(t, i) {
  const n = rn(t.xh(), i),
    s = rn(t.Sh(), i);
  return new Pi(n, s);
}
function ln(t, i) {
  const n = Math.abs(t);
  if (n < 1e-15) return 0;
  const s = Math.log10(n + i.Na) + i.Ea;
  return t < 0 ? -s : s;
}
function an(t, i) {
  const n = Math.abs(t);
  if (n < 1e-15) return 0;
  const s = Math.pow(10, n - i.Ea) - i.Na;
  return t < 0 ? -s : s;
}
function on(t, i) {
  if (null === t) return null;
  const n = ln(t.xh(), i),
    s = ln(t.Sh(), i);
  return new Pi(n, s);
}
function _n(t, i) {
  if (null === t) return null;
  const n = an(t.xh(), i),
    s = an(t.Sh(), i);
  return new Pi(n, s);
}
function un(t) {
  if (null === t) return nn;
  const i = Math.abs(t.Sh() - t.xh());
  if (i >= 1 || i < 1e-15) return nn;
  const n = Math.ceil(Math.abs(Math.log10(i))),
    s = nn.Ea + n;
  return {
    Ea: s,
    Na: 1 / Math.pow(10, s)
  };
}
class cn {
  constructor(t, i) {
    if (this.Fa = t, this.Wa = i, function (t) {
      if (t < 0) return !1;
      for (let i = t; i > 1; i /= 10) if (i % 10 != 0) return !1;
      return !0;
    }(this.Fa)) this.ja = [2, 2.5, 2];else {
      this.ja = [];
      for (let t = this.Fa; 1 !== t;) {
        if (t % 2 == 0) this.ja.push(2), t /= 2;else {
          if (t % 5 != 0) throw new Error("unexpected base");
          this.ja.push(2, 2.5), t /= 5;
        }
        if (this.ja.length > 100) throw new Error("something wrong with base");
      }
    }
  }
  Ha(t, i, n) {
    const s = 0 === this.Fa ? 0 : 1 / this.Fa;
    let e = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i)))),
      r = 0,
      h = this.Wa[0];
    for (;;) {
      const t = yt(e, s, 1e-14) && e > s + 1e-14,
        i = yt(e, n * h, 1e-14),
        l = yt(e, 1, 1e-14);
      if (!(t && i && l)) break;
      e /= h, h = this.Wa[++r % this.Wa.length];
    }
    if (e <= s + 1e-14 && (e = s), e = Math.max(1, e), this.ja.length > 0 && (l = e, a = 1, o = 1e-14, Math.abs(l - a) < o)) for (r = 0, h = this.ja[0]; yt(e, n * h, 1e-14) && e > s + 1e-14;) e /= h, h = this.ja[++r % this.ja.length];
    var l, a, o;
    return e;
  }
}
class dn {
  constructor(t, i, n, s) {
    this.$a = [], this.zi = t, this.Fa = i, this.Ua = n, this.qa = s;
  }
  Ha(t, i) {
    if (t < i) throw new Error("high < low");
    const n = this.zi.Bt(),
      s = (t - i) * this.Ya() / n,
      e = new cn(this.Fa, [2, 2.5, 2]),
      r = new cn(this.Fa, [2, 2, 2.5]),
      h = new cn(this.Fa, [2.5, 2, 2]),
      l = [];
    return l.push(e.Ha(t, i, s), r.Ha(t, i, s), h.Ha(t, i, s)), function (t) {
      if (t.length < 1) throw Error("array is empty");
      let i = t[0];
      for (let n = 1; n < t.length; ++n) t[n] < i && (i = t[n]);
      return i;
    }(l);
  }
  Xa() {
    const t = this.zi,
      i = t.Ct();
    if (null === i) return void (this.$a = []);
    const n = t.Bt(),
      s = this.Ua(n - 1, i),
      e = this.Ua(0, i),
      r = this.zi.W().entireTextOnly ? this.Ka() / 2 : 0,
      h = r,
      l = n - 1 - r,
      a = Math.max(s, e),
      o = Math.min(s, e);
    if (a === o) return void (this.$a = []);
    let _ = this.Ha(a, o),
      u = a % _;
    u += u < 0 ? _ : 0;
    const c = a >= o ? 1 : -1;
    let d = null,
      f = 0;
    for (let n = a - u; n > o; n -= _) {
      const s = this.qa(n, i, !0);
      null !== d && Math.abs(s - d) < this.Ya() || s < h || s > l || (f < this.$a.length ? (this.$a[f].Aa = s, this.$a[f].Za = t.Ga(n)) : this.$a.push({
        Aa: s,
        Za: t.Ga(n)
      }), f++, d = s, t.Ja() && (_ = this.Ha(n * c, o)));
    }
    this.$a.length = f;
  }
  La() {
    return this.$a;
  }
  Ka() {
    return this.zi.P();
  }
  Ya() {
    return Math.ceil(2.5 * this.Ka());
  }
}
function fn(t) {
  return t.slice().sort((t, i) => b(t.Xi()) - b(i.Xi()));
}
var vn;
!function (t) {
  t[t.Normal = 0] = "Normal", t[t.Logarithmic = 1] = "Logarithmic", t[t.Percentage = 2] = "Percentage", t[t.IndexedTo100 = 3] = "IndexedTo100";
}(vn || (exports.PriceScaleMode = vn = {}));
const pn = new vt(),
  mn = new ft(100, 1);
class bn {
  constructor(t, i, n, s) {
    this.Qa = 0, this.io = null, this.Rh = null, this.no = null, this.so = {
      eo: !1,
      ro: null
    }, this.ho = 0, this.lo = 0, this.ao = new R(), this.oo = new R(), this._o = [], this.uo = null, this.co = null, this.do = null, this.fo = null, this.da = mn, this.vo = un(null), this.po = t, this._n = i, this.mo = n, this.bo = s, this.wo = new dn(this, 100, this.Mo.bind(this), this.xo.bind(this));
  }
  xa() {
    return this.po;
  }
  W() {
    return this._n;
  }
  Eh(t) {
    if (D(this._n, t), this.Sa(), void 0 !== t.mode && this.So({
      Sr: t.mode
    }), void 0 !== t.scaleMargins) {
      const i = m(t.scaleMargins.top),
        n = m(t.scaleMargins.bottom);
      if (i < 0 || i > 1) throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);
      if (n < 0 || n > 1) throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${n}`);
      if (i + n > 1) throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i + n}`);
      this.ko(), this.co = null;
    }
  }
  yo() {
    return this._n.autoScale;
  }
  Ja() {
    return 1 === this._n.mode;
  }
  fh() {
    return 2 === this._n.mode;
  }
  Co() {
    return 3 === this._n.mode;
  }
  Sr() {
    return {
      Nn: this._n.autoScale,
      To: this._n.invertScale,
      Sr: this._n.mode
    };
  }
  So(t) {
    const i = this.Sr();
    let n = null;
    void 0 !== t.Nn && (this._n.autoScale = t.Nn), void 0 !== t.Sr && (this._n.mode = t.Sr, 2 !== t.Sr && 3 !== t.Sr || (this._n.autoScale = !0), this.so.eo = !1), 1 === i.Sr && t.Sr !== i.Sr && (!function (t, i) {
      if (null === t) return !1;
      const n = an(t.xh(), i),
        s = an(t.Sh(), i);
      return isFinite(n) && isFinite(s);
    }(this.Rh, this.vo) ? this._n.autoScale = !0 : (n = _n(this.Rh, this.vo), null !== n && this.Po(n))), 1 === t.Sr && t.Sr !== i.Sr && (n = on(this.Rh, this.vo), null !== n && this.Po(n));
    const s = i.Sr !== this._n.mode;
    s && (2 === i.Sr || this.fh()) && this.Sa(), s && (3 === i.Sr || this.Co()) && this.Sa(), void 0 !== t.To && i.To !== t.To && (this._n.invertScale = t.To, this.Ro()), this.oo.m(i, this.Sr());
  }
  Do() {
    return this.oo;
  }
  P() {
    return this.mo.fontSize;
  }
  Bt() {
    return this.Qa;
  }
  Oo(t) {
    this.Qa !== t && (this.Qa = t, this.ko(), this.co = null);
  }
  Ao() {
    if (this.io) return this.io;
    const t = this.Bt() - this.Vo() - this.Bo();
    return this.io = t, t;
  }
  Oh() {
    return this.Io(), this.Rh;
  }
  Po(t, i) {
    const n = this.Rh;
    (i || null === n && null !== t || null !== n && !n.gh(t)) && (this.co = null, this.Rh = t);
  }
  Ei() {
    return this.Io(), 0 === this.Qa || !this.Rh || this.Rh.Ei();
  }
  zo(t) {
    return this.To() ? t : this.Bt() - 1 - t;
  }
  Rt(t, i) {
    return this.fh() ? t = sn(t, i) : this.Co() && (t = rn(t, i)), this.xo(t, i);
  }
  Gs(t, i, n) {
    this.Io();
    const s = this.Bo(),
      e = b(this.Oh()),
      r = e.xh(),
      h = e.Sh(),
      l = this.Ao() - 1,
      a = this.To(),
      o = l / (h - r),
      _ = void 0 === n ? 0 : n.from,
      u = void 0 === n ? t.length : n.to,
      c = this.Lo();
    for (let n = _; n < u; n++) {
      const e = t[n],
        h = e._t;
      if (isNaN(h)) continue;
      let l = h;
      null !== c && (l = c(e._t, i));
      const _ = s + o * (l - r),
        u = a ? _ : this.Qa - 1 - _;
      e.st = u;
    }
  }
  ve(t, i, n) {
    this.Io();
    const s = this.Bo(),
      e = b(this.Oh()),
      r = e.xh(),
      h = e.Sh(),
      l = this.Ao() - 1,
      a = this.To(),
      o = l / (h - r),
      _ = void 0 === n ? 0 : n.from,
      u = void 0 === n ? t.length : n.to,
      c = this.Lo();
    for (let n = _; n < u; n++) {
      const e = t[n];
      let h = e.me,
        l = e.be,
        _ = e.we,
        u = e.ge;
      null !== c && (h = c(e.me, i), l = c(e.be, i), _ = c(e.we, i), u = c(e.ge, i));
      let d = s + o * (h - r),
        f = a ? d : this.Qa - 1 - d;
      e.de = f, d = s + o * (l - r), f = a ? d : this.Qa - 1 - d, e._e = f, d = s + o * (_ - r), f = a ? d : this.Qa - 1 - d, e.ue = f, d = s + o * (u - r), f = a ? d : this.Qa - 1 - d, e.fe = f;
    }
  }
  fn(t, i) {
    const n = this.Mo(t, i);
    return this.Eo(n, i);
  }
  Eo(t, i) {
    let n = t;
    return this.fh() ? n = function (t, i) {
      return i < 0 && (t = -t), t / 100 * i + i;
    }(n, i) : this.Co() && (n = function (t, i) {
      return t -= 100, i < 0 && (t = -t), t / 100 * i + i;
    }(n, i)), n;
  }
  Ta() {
    return this._o;
  }
  No() {
    if (this.uo) return this.uo;
    let t = [];
    for (let i = 0; i < this._o.length; i++) {
      const n = this._o[i];
      null === n.Xi() && n.Ki(i + 1), t.push(n);
    }
    return t = fn(t), this.uo = t, this.uo;
  }
  Fo(t) {
    -1 === this._o.indexOf(t) && (this._o.push(t), this.Sa(), this.Wo());
  }
  jo(t) {
    const i = this._o.indexOf(t);
    if (-1 === i) throw new Error("source is not attached to scale");
    this._o.splice(i, 1), 0 === this._o.length && (this.So({
      Nn: !0
    }), this.Po(null)), this.Sa(), this.Wo();
  }
  Ct() {
    let t = null;
    for (const i of this._o) {
      const n = i.Ct();
      null !== n && (null === t || n.ia < t.ia) && (t = n);
    }
    return null === t ? null : t.Ot;
  }
  To() {
    return this._n.invertScale;
  }
  La() {
    const t = null === this.Ct();
    if (null !== this.co && (t || this.co.Ho === t)) return this.co.La;
    this.wo.Xa();
    const i = this.wo.La();
    return this.co = {
      La: i,
      Ho: t
    }, this.ao.m(), i;
  }
  $o() {
    return this.ao;
  }
  Uo(t) {
    this.fh() || this.Co() || null === this.do && null === this.no && (this.Ei() || (this.do = this.Qa - t, this.no = b(this.Oh()).Mh()));
  }
  qo(t) {
    if (this.fh() || this.Co()) return;
    if (null === this.do) return;
    this.So({
      Nn: !1
    }), (t = this.Qa - t) < 0 && (t = 0);
    let i = (this.do + .2 * (this.Qa - 1)) / (t + .2 * (this.Qa - 1));
    const n = b(this.no).Mh();
    i = Math.max(i, .1), n.yh(i), this.Po(n);
  }
  Yo() {
    this.fh() || this.Co() || (this.do = null, this.no = null);
  }
  Xo(t) {
    this.yo() || null === this.fo && null === this.no && (this.Ei() || (this.fo = t, this.no = b(this.Oh()).Mh()));
  }
  Ko(t) {
    if (this.yo()) return;
    if (null === this.fo) return;
    const i = b(this.Oh()).kh() / (this.Ao() - 1);
    let n = t - this.fo;
    this.To() && (n *= -1);
    const s = n * i,
      e = b(this.no).Mh();
    e.Ch(s), this.Po(e, !0), this.co = null;
  }
  Zo() {
    this.yo() || null !== this.fo && (this.fo = null, this.no = null);
  }
  ca() {
    return this.da || this.Sa(), this.da;
  }
  Ni(t, i) {
    switch (this._n.mode) {
      case 2:
        return this.Go(sn(t, i));
      case 3:
        return this.ca().format(rn(t, i));
      default:
        return this.Ih(t);
    }
  }
  Ga(t) {
    switch (this._n.mode) {
      case 2:
        return this.Go(t);
      case 3:
        return this.ca().format(t);
      default:
        return this.Ih(t);
    }
  }
  Wl(t) {
    return this.Ih(t, b(this.Jo()).ca());
  }
  jl(t, i) {
    return t = sn(t, i), this.Go(t, pn);
  }
  Qo() {
    return this._o;
  }
  t_(t) {
    this.so = {
      ro: t,
      eo: !1
    };
  }
  Rn() {
    this._o.forEach(t => t.Rn());
  }
  Sa() {
    this.co = null;
    const t = this.Jo();
    let i = 100;
    null !== t && (i = Math.round(1 / t.ua())), this.da = mn, this.fh() ? (this.da = pn, i = 100) : this.Co() ? (this.da = new ft(100, 1), i = 100) : null !== t && (this.da = t.ca()), this.wo = new dn(this, i, this.Mo.bind(this), this.xo.bind(this)), this.wo.Xa();
  }
  Wo() {
    this.uo = null;
  }
  Jo() {
    return this._o[0] || null;
  }
  Vo() {
    return this.To() ? this._n.scaleMargins.bottom * this.Bt() + this.lo : this._n.scaleMargins.top * this.Bt() + this.ho;
  }
  Bo() {
    return this.To() ? this._n.scaleMargins.top * this.Bt() + this.ho : this._n.scaleMargins.bottom * this.Bt() + this.lo;
  }
  Io() {
    this.so.eo || (this.so.eo = !0, this.i_());
  }
  ko() {
    this.io = null;
  }
  xo(t, i) {
    if (this.Io(), this.Ei()) return 0;
    t = this.Ja() && t ? ln(t, this.vo) : t;
    const n = b(this.Oh()),
      s = this.Bo() + (this.Ao() - 1) * (t - n.xh()) / n.kh();
    return this.zo(s);
  }
  Mo(t, i) {
    if (this.Io(), this.Ei()) return 0;
    const n = this.zo(t),
      s = b(this.Oh()),
      e = s.xh() + s.kh() * ((n - this.Bo()) / (this.Ao() - 1));
    return this.Ja() ? an(e, this.vo) : e;
  }
  Ro() {
    this.co = null, this.wo.Xa();
  }
  i_() {
    const t = this.so.ro;
    if (null === t) return;
    let i = null;
    const n = this.Qo();
    let s = 0,
      e = 0;
    for (const r of n) {
      if (!r.yt()) continue;
      const n = r.Ct();
      if (null === n) continue;
      const h = r.Rl(t.Rs(), t.ui());
      let l = h && h.Oh();
      if (null !== l) {
        switch (this._n.mode) {
          case 1:
            l = on(l, this.vo);
            break;
          case 2:
            l = en(l, n.Ot);
            break;
          case 3:
            l = hn(l, n.Ot);
        }
        if (i = null === i ? l : i.Jn(b(l)), null !== h) {
          const t = h.Ah();
          null !== t && (s = Math.max(s, t.above), e = Math.max(s, t.below));
        }
      }
    }
    if (s === this.ho && e === this.lo || (this.ho = s, this.lo = e, this.co = null, this.ko()), null !== i) {
      if (i.xh() === i.Sh()) {
        const t = this.Jo(),
          n = 5 * (null === t || this.fh() || this.Co() ? 1 : t.ua());
        this.Ja() && (i = _n(i, this.vo)), i = new Pi(i.xh() - n, i.Sh() + n), this.Ja() && (i = on(i, this.vo));
      }
      if (this.Ja()) {
        const t = _n(i, this.vo),
          n = un(t);
        if (r = n, h = this.vo, r.Ea !== h.Ea || r.Na !== h.Na) {
          const s = null !== this.no ? _n(this.no, this.vo) : null;
          this.vo = n, i = on(t, n), null !== s && (this.no = on(s, n));
        }
      }
      this.Po(i);
    } else null === this.Rh && (this.Po(new Pi(-.5, .5)), this.vo = un(null));
    var r, h;
    this.so.eo = !0;
  }
  Lo() {
    return this.fh() ? sn : this.Co() ? rn : this.Ja() ? t => ln(t, this.vo) : null;
  }
  n_(t, i, n) {
    return void 0 === i ? (void 0 === n && (n = this.ca()), n.format(t)) : i(t);
  }
  Ih(t, i) {
    return this.n_(t, this.bo.priceFormatter, i);
  }
  Go(t, i) {
    return this.n_(t, this.bo.percentageFormatter, i);
  }
}
class wn {
  constructor(t, i) {
    this._o = [], this.s_ = new Map(), this.Qa = 0, this.e_ = 0, this.r_ = 1e3, this.uo = null, this.h_ = new R(), this.wl = t, this.Hi = i, this.l_ = new tn(this);
    const n = i.W();
    this.a_ = this.o_("left", n.leftPriceScale), this.__ = this.o_("right", n.rightPriceScale), this.a_.Do().l(this.u_.bind(this, this.a_), this), this.__.Do().l(this.u_.bind(this, this.__), this), this.c_(n);
  }
  c_(t) {
    if (t.leftPriceScale && this.a_.Eh(t.leftPriceScale), t.rightPriceScale && this.__.Eh(t.rightPriceScale), t.localization && (this.a_.Sa(), this.__.Sa()), t.overlayPriceScales) {
      const i = Array.from(this.s_.values());
      for (const n of i) {
        const i = b(n[0].Dt());
        i.Eh(t.overlayPriceScales), t.localization && i.Sa();
      }
    }
  }
  d_(t) {
    switch (t) {
      case "left":
        return this.a_;
      case "right":
        return this.__;
    }
    return this.s_.has(t) ? m(this.s_.get(t))[0].Dt() : null;
  }
  S() {
    this.$t().f_().p(this), this.a_.Do().p(this), this.__.Do().p(this), this._o.forEach(t => {
      t.S && t.S();
    }), this.h_.m();
  }
  v_() {
    return this.r_;
  }
  p_(t) {
    this.r_ = t;
  }
  $t() {
    return this.Hi;
  }
  ji() {
    return this.e_;
  }
  Bt() {
    return this.Qa;
  }
  m_(t) {
    this.e_ = t, this.b_();
  }
  Oo(t) {
    this.Qa = t, this.a_.Oo(t), this.__.Oo(t), this._o.forEach(i => {
      if (this.ur(i)) {
        const n = i.Dt();
        null !== n && n.Oo(t);
      }
    }), this.b_();
  }
  Ta() {
    return this._o;
  }
  ur(t) {
    const i = t.Dt();
    return null === i || this.a_ !== i && this.__ !== i;
  }
  Fo(t, i, n) {
    const s = void 0 !== n ? n : this.g_().w_ + 1;
    this.M_(t, i, s);
  }
  jo(t) {
    const i = this._o.indexOf(t);
    p(-1 !== i, "removeDataSource: invalid data source"), this._o.splice(i, 1);
    const n = b(t.Dt()).xa();
    if (this.s_.has(n)) {
      const i = m(this.s_.get(n)),
        s = i.indexOf(t);
      -1 !== s && (i.splice(s, 1), 0 === i.length && this.s_.delete(n));
    }
    const s = t.Dt();
    s && s.Ta().indexOf(t) >= 0 && s.jo(t), null !== s && (s.Wo(), this.x_(s)), this.uo = null;
  }
  dr(t) {
    return t === this.a_ ? "left" : t === this.__ ? "right" : "overlay";
  }
  S_() {
    return this.a_;
  }
  k_() {
    return this.__;
  }
  y_(t, i) {
    t.Uo(i);
  }
  C_(t, i) {
    t.qo(i), this.b_();
  }
  T_(t) {
    t.Yo();
  }
  P_(t, i) {
    t.Xo(i);
  }
  R_(t, i) {
    t.Ko(i), this.b_();
  }
  D_(t) {
    t.Zo();
  }
  b_() {
    this._o.forEach(t => {
      t.Rn();
    });
  }
  dn() {
    let t = null;
    return this.Hi.W().rightPriceScale.visible && 0 !== this.__.Ta().length ? t = this.__ : this.Hi.W().leftPriceScale.visible && 0 !== this.a_.Ta().length ? t = this.a_ : 0 !== this._o.length && (t = this._o[0].Dt()), null === t && (t = this.__), t;
  }
  cr() {
    let t = null;
    return this.Hi.W().rightPriceScale.visible ? t = this.__ : this.Hi.W().leftPriceScale.visible && (t = this.a_), t;
  }
  x_(t) {
    null !== t && t.yo() && this.O_(t);
  }
  A_(t) {
    const i = this.wl.qs();
    t.So({
      Nn: !0
    }), null !== i && t.t_(i), this.b_();
  }
  V_() {
    this.O_(this.a_), this.O_(this.__);
  }
  B_() {
    this.x_(this.a_), this.x_(this.__), this._o.forEach(t => {
      this.ur(t) && this.x_(t.Dt());
    }), this.b_(), this.Hi.Nh();
  }
  No() {
    return null === this.uo && (this.uo = fn(this._o)), this.uo;
  }
  I_() {
    return this.h_;
  }
  z_() {
    return this.l_;
  }
  O_(t) {
    const i = t.Qo();
    if (i && i.length > 0 && !this.wl.Ei()) {
      const i = this.wl.qs();
      null !== i && t.t_(i);
    }
    t.Rn();
  }
  g_() {
    const t = this.No();
    if (0 === t.length) return {
      L_: 0,
      w_: 0
    };
    let i = 0,
      n = 0;
    for (let s = 0; s < t.length; s++) {
      const e = t[s].Xi();
      null !== e && (e < i && (i = e), e > n && (n = e));
    }
    return {
      L_: i,
      w_: n
    };
  }
  M_(t, i, n) {
    let s = this.d_(i);
    if (null === s && (s = this.o_(i, this.Hi.W().overlayPriceScales)), this._o.push(t), !_t(i)) {
      const n = this.s_.get(i) || [];
      n.push(t), this.s_.set(i, n);
    }
    s.Fo(t), t.Zi(s), t.Ki(n), this.x_(s), this.uo = null;
  }
  u_(t, i, n) {
    i.Sr !== n.Sr && this.O_(t);
  }
  o_(t, i) {
    const n = Object.assign({
        visible: !0,
        autoScale: !0
      }, I(i)),
      s = new bn(t, n, this.Hi.W().layout, this.Hi.W().localization);
    return s.Oo(this.Bt()), s;
  }
}
class gn {
  constructor(t, i, n = 50) {
    this.Ye = 0, this.Xe = 1, this.Ke = 1, this.Ge = new Map(), this.Ze = new Map(), this.E_ = t, this.N_ = i, this.Je = n;
  }
  F_(t) {
    const i = t.time,
      n = this.N_.cacheKey(i),
      s = this.Ge.get(n);
    if (void 0 !== s) return s.W_;
    if (this.Ye === this.Je) {
      const t = this.Ze.get(this.Ke);
      this.Ze.delete(this.Ke), this.Ge.delete(m(t)), this.Ke++, this.Ye--;
    }
    const e = this.E_(t);
    return this.Ge.set(n, {
      W_: e,
      nr: this.Xe
    }), this.Ze.set(this.Xe, n), this.Ye++, this.Xe++, e;
  }
}
class Mn {
  constructor(t, i) {
    p(t <= i, "right should be >= left"), this.j_ = t, this.H_ = i;
  }
  Rs() {
    return this.j_;
  }
  ui() {
    return this.H_;
  }
  U_() {
    return this.H_ - this.j_ + 1;
  }
  Yr(t) {
    return this.j_ <= t && t <= this.H_;
  }
  gh(t) {
    return this.j_ === t.Rs() && this.H_ === t.ui();
  }
}
function xn(t, i) {
  return null === t || null === i ? t === i : t.gh(i);
}
class Sn {
  constructor() {
    this.q_ = new Map(), this.Ge = null, this.Y_ = !1;
  }
  X_(t) {
    this.Y_ = t, this.Ge = null;
  }
  K_(t, i) {
    this.Z_(i), this.Ge = null;
    for (let n = i; n < t.length; ++n) {
      const i = t[n];
      let s = this.q_.get(i.timeWeight);
      void 0 === s && (s = [], this.q_.set(i.timeWeight, s)), s.push({
        index: n,
        time: i.time,
        weight: i.timeWeight,
        originalTime: i.originalTime
      });
    }
  }
  G_(t, i) {
    const n = Math.ceil(i / t);
    return null !== this.Ge && this.Ge.J_ === n || (this.Ge = {
      La: this.Q_(n),
      J_: n
    }), this.Ge.La;
  }
  Z_(t) {
    if (0 === t) return void this.q_.clear();
    const i = [];
    this.q_.forEach((n, s) => {
      t <= n[0].index ? i.push(s) : n.splice(Vt(n, t, i => i.index < t), 1 / 0);
    });
    for (const t of i) this.q_.delete(t);
  }
  Q_(t) {
    let i = [];
    for (const n of Array.from(this.q_.keys()).sort((t, i) => i - t)) {
      if (!this.q_.get(n)) continue;
      const s = i;
      i = [];
      const e = s.length;
      let r = 0;
      const h = m(this.q_.get(n)),
        l = h.length;
      let a = 1 / 0,
        o = -1 / 0;
      for (let n = 0; n < l; n++) {
        const l = h[n],
          _ = l.index;
        for (; r < e;) {
          const t = s[r],
            n = t.index;
          if (!(n < _)) {
            a = n;
            break;
          }
          r++, i.push(t), o = n, a = 1 / 0;
        }
        if (a - _ >= t && _ - o >= t) i.push(l), o = _;else if (this.Y_) return s;
      }
      for (; r < e; r++) i.push(s[r]);
    }
    return i;
  }
}
class kn {
  constructor(t) {
    this.tu = t;
  }
  iu() {
    return null === this.tu ? null : new Mn(Math.floor(this.tu.Rs()), Math.ceil(this.tu.ui()));
  }
  nu() {
    return this.tu;
  }
  static su() {
    return new kn(null);
  }
}
function yn(t, i) {
  return t.weight > i.weight ? t : i;
}
class Cn {
  constructor(t, i, n, s) {
    this.e_ = 0, this.eu = null, this.ru = [], this.fo = null, this.do = null, this.hu = new Sn(), this.lu = new Map(), this.au = kn.su(), this.ou = !0, this._u = new R(), this.uu = new R(), this.cu = new R(), this.du = null, this.fu = null, this.vu = [], this._n = i, this.bo = n, this.pu = i.rightOffset, this.mu = i.barSpacing, this.Hi = t, this.N_ = s, this.bu(), this.hu.X_(i.uniformDistribution);
  }
  W() {
    return this._n;
  }
  wu(t) {
    D(this.bo, t), this.gu(), this.bu();
  }
  Eh(t, i) {
    var n;
    D(this._n, t), this._n.fixLeftEdge && this.Mu(), this._n.fixRightEdge && this.xu(), void 0 !== t.barSpacing && this.Hi.Kn(t.barSpacing), void 0 !== t.rightOffset && this.Hi.Zn(t.rightOffset), void 0 !== t.minBarSpacing && this.Hi.Kn(null !== (n = t.barSpacing) && void 0 !== n ? n : this.mu), this.gu(), this.bu(), this.cu.m();
  }
  vn(t) {
    var i, n;
    return null !== (n = null === (i = this.ru[t]) || void 0 === i ? void 0 : i.time) && void 0 !== n ? n : null;
  }
  $i(t) {
    var i;
    return null !== (i = this.ru[t]) && void 0 !== i ? i : null;
  }
  ya(t, i) {
    if (this.ru.length < 1) return null;
    if (this.N_.key(t) > this.N_.key(this.ru[this.ru.length - 1].time)) return i ? this.ru.length - 1 : null;
    const n = Vt(this.ru, this.N_.key(t), (t, i) => this.N_.key(t.time) < i);
    return this.N_.key(t) < this.N_.key(this.ru[n].time) ? i ? n : null : n;
  }
  Ei() {
    return 0 === this.e_ || 0 === this.ru.length || null === this.eu;
  }
  ka() {
    return this.ru.length > 0;
  }
  qs() {
    return this.Su(), this.au.iu();
  }
  ku() {
    return this.Su(), this.au.nu();
  }
  yu() {
    const t = this.qs();
    if (null === t) return null;
    const i = {
      from: t.Rs(),
      to: t.ui()
    };
    return this.Cu(i);
  }
  Cu(t) {
    const i = Math.round(t.from),
      n = Math.round(t.to),
      s = b(this.Tu()),
      e = b(this.Pu());
    return {
      from: b(this.$i(Math.max(s, i))),
      to: b(this.$i(Math.min(e, n)))
    };
  }
  Ru(t) {
    return {
      from: b(this.ya(t.from, !0)),
      to: b(this.ya(t.to, !0))
    };
  }
  ji() {
    return this.e_;
  }
  m_(t) {
    if (!isFinite(t) || t <= 0) return;
    if (this.e_ === t) return;
    const i = this.ku(),
      n = this.e_;
    if (this.e_ = t, this.ou = !0, this._n.lockVisibleTimeRangeOnResize && 0 !== n) {
      const i = this.mu * t / n;
      this.mu = i;
    }
    if (this._n.fixLeftEdge && null !== i && i.Rs() <= 0) {
      const i = n - t;
      this.pu -= Math.round(i / this.mu) + 1, this.ou = !0;
    }
    this.Du(), this.Ou();
  }
  It(t) {
    if (this.Ei() || !A(t)) return 0;
    const i = this.Au() + this.pu - t;
    return this.e_ - (i + .5) * this.mu - 1;
  }
  Zs(t, i) {
    const n = this.Au(),
      s = void 0 === i ? 0 : i.from,
      e = void 0 === i ? t.length : i.to;
    for (let i = s; i < e; i++) {
      const s = t[i].ot,
        e = n + this.pu - s,
        r = this.e_ - (e + .5) * this.mu - 1;
      t[i].nt = r;
    }
  }
  Vu(t) {
    return Math.ceil(this.Bu(t));
  }
  Zn(t) {
    this.ou = !0, this.pu = t, this.Ou(), this.Hi.Iu(), this.Hi.Nh();
  }
  ee() {
    return this.mu;
  }
  Kn(t) {
    this.zu(t), this.Ou(), this.Hi.Iu(), this.Hi.Nh();
  }
  Lu() {
    return this.pu;
  }
  La() {
    if (this.Ei()) return null;
    if (null !== this.fu) return this.fu;
    const t = this.mu,
      i = 5 * (this.Hi.W().layout.fontSize + 4) / 8 * (this._n.tickMarkMaxCharacterLength || 8),
      n = Math.round(i / t),
      s = b(this.qs()),
      e = Math.max(s.Rs(), s.Rs() - n),
      r = Math.max(s.ui(), s.ui() - n),
      h = this.hu.G_(t, i),
      l = this.Tu() + n,
      a = this.Pu() - n,
      o = this.Eu(),
      _ = this._n.fixLeftEdge || o,
      u = this._n.fixRightEdge || o;
    let c = 0;
    for (const t of h) {
      if (!(e <= t.index && t.index <= r)) continue;
      let n;
      c < this.vu.length ? (n = this.vu[c], n.coord = this.It(t.index), n.label = this.Nu(t), n.weight = t.weight) : (n = {
        needAlignCoordinate: !1,
        coord: this.It(t.index),
        label: this.Nu(t),
        weight: t.weight
      }, this.vu.push(n)), this.mu > i / 2 && !o ? n.needAlignCoordinate = !1 : n.needAlignCoordinate = _ && t.index <= l || u && t.index >= a, c++;
    }
    return this.vu.length = c, this.fu = this.vu, this.vu;
  }
  Fu() {
    this.ou = !0, this.Kn(this._n.barSpacing), this.Zn(this._n.rightOffset);
  }
  Wu(t) {
    this.ou = !0, this.eu = t, this.Ou(), this.Mu();
  }
  ju(t, i) {
    const n = this.Bu(t),
      s = this.ee(),
      e = s + i * (s / 10);
    this.Kn(e), this._n.rightBarStaysOnScroll || this.Zn(this.Lu() + (n - this.Bu(t)));
  }
  Uo(t) {
    this.fo && this.Zo(), null === this.do && null === this.du && (this.Ei() || (this.do = t, this.Hu()));
  }
  qo(t) {
    if (null === this.du) return;
    const i = kt(this.e_ - t, 0, this.e_),
      n = kt(this.e_ - b(this.do), 0, this.e_);
    0 !== i && 0 !== n && this.Kn(this.du.ee * i / n);
  }
  Yo() {
    null !== this.do && (this.do = null, this.$u());
  }
  Xo(t) {
    null === this.fo && null === this.du && (this.Ei() || (this.fo = t, this.Hu()));
  }
  Ko(t) {
    if (null === this.fo) return;
    const i = (this.fo - t) / this.ee();
    this.pu = b(this.du).Lu + i, this.ou = !0, this.Ou();
  }
  Zo() {
    null !== this.fo && (this.fo = null, this.$u());
  }
  Uu() {
    this.qu(this._n.rightOffset);
  }
  qu(t, i = 400) {
    if (!isFinite(t)) throw new RangeError("offset is required and must be finite number");
    if (!isFinite(i) || i <= 0) throw new RangeError("animationDuration (optional) must be finite positive number");
    const n = this.pu,
      s = performance.now();
    this.Hi.qn({
      Yu: t => (t - s) / i >= 1,
      Xu: e => {
        const r = (e - s) / i;
        return r >= 1 ? t : n + (t - n) * r;
      }
    });
  }
  bt(t, i) {
    this.ou = !0, this.ru = t, this.hu.K_(t, i), this.Ou();
  }
  Ku() {
    return this._u;
  }
  Zu() {
    return this.uu;
  }
  Gu() {
    return this.cu;
  }
  Au() {
    return this.eu || 0;
  }
  Ju(t) {
    const i = t.U_();
    this.zu(this.e_ / i), this.pu = t.ui() - this.Au(), this.Ou(), this.ou = !0, this.Hi.Iu(), this.Hi.Nh();
  }
  Qu() {
    const t = this.Tu(),
      i = this.Pu();
    null !== t && null !== i && this.Ju(new Mn(t, i + this._n.rightOffset));
  }
  tc(t) {
    const i = new Mn(t.from, t.to);
    this.Ju(i);
  }
  Ui(t) {
    return void 0 !== this.bo.timeFormatter ? this.bo.timeFormatter(t.originalTime) : this.N_.formatHorzItem(t.time);
  }
  Eu() {
    const {
      handleScroll: t,
      handleScale: i
    } = this.Hi.W();
    return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || i.axisDoubleClickReset.time || i.axisPressedMouseMove.time || i.mouseWheel || i.pinch);
  }
  Tu() {
    return 0 === this.ru.length ? null : 0;
  }
  Pu() {
    return 0 === this.ru.length ? null : this.ru.length - 1;
  }
  ic(t) {
    return (this.e_ - 1 - t) / this.mu;
  }
  Bu(t) {
    const i = this.ic(t),
      n = this.Au() + this.pu - i;
    return Math.round(1e6 * n) / 1e6;
  }
  zu(t) {
    const i = this.mu;
    this.mu = t, this.Du(), i !== this.mu && (this.ou = !0, this.nc());
  }
  Su() {
    if (!this.ou) return;
    if (this.ou = !1, this.Ei()) return void this.sc(kn.su());
    const t = this.Au(),
      i = this.e_ / this.mu,
      n = this.pu + t,
      s = new Mn(n - i + 1, n);
    this.sc(new kn(s));
  }
  Du() {
    const t = this.ec();
    if (this.mu < t && (this.mu = t, this.ou = !0), 0 !== this.e_) {
      const t = .5 * this.e_;
      this.mu > t && (this.mu = t, this.ou = !0);
    }
  }
  ec() {
    return this._n.fixLeftEdge && this._n.fixRightEdge && 0 !== this.ru.length ? this.e_ / this.ru.length : this._n.minBarSpacing;
  }
  Ou() {
    const t = this.rc();
    this.pu > t && (this.pu = t, this.ou = !0);
    const i = this.hc();
    null !== i && this.pu < i && (this.pu = i, this.ou = !0);
  }
  hc() {
    const t = this.Tu(),
      i = this.eu;
    if (null === t || null === i) return null;
    return t - i - 1 + (this._n.fixLeftEdge ? this.e_ / this.mu : Math.min(2, this.ru.length));
  }
  rc() {
    return this._n.fixRightEdge ? 0 : this.e_ / this.mu - Math.min(2, this.ru.length);
  }
  Hu() {
    this.du = {
      ee: this.ee(),
      Lu: this.Lu()
    };
  }
  $u() {
    this.du = null;
  }
  Nu(t) {
    let i = this.lu.get(t.weight);
    return void 0 === i && (i = new gn(t => this.lc(t), this.N_), this.lu.set(t.weight, i)), i.F_(t);
  }
  lc(t) {
    return this.N_.formatTickmark(t, this.bo);
  }
  sc(t) {
    const i = this.au;
    this.au = t, xn(i.iu(), this.au.iu()) || this._u.m(), xn(i.nu(), this.au.nu()) || this.uu.m(), this.nc();
  }
  nc() {
    this.fu = null;
  }
  gu() {
    this.nc(), this.lu.clear();
  }
  bu() {
    this.N_.updateFormatter(this.bo);
  }
  Mu() {
    if (!this._n.fixLeftEdge) return;
    const t = this.Tu();
    if (null === t) return;
    const i = this.qs();
    if (null === i) return;
    const n = i.Rs() - t;
    if (n < 0) {
      const t = this.pu - n - 1;
      this.Zn(t);
    }
    this.Du();
  }
  xu() {
    this.Ou(), this.Du();
  }
}
class Tn {
  K(t, i, n) {
    t.useMediaCoordinateSpace(t => this.Z(t, i, n));
  }
  fl(t, i, n) {
    t.useMediaCoordinateSpace(t => this.ac(t, i, n));
  }
  ac(t, i, n) {}
}
class Pn extends Tn {
  constructor(t) {
    super(), this.oc = new Map(), this.zt = t;
  }
  Z(t) {}
  ac(t) {
    if (!this.zt.yt) return;
    const {
      context: i,
      mediaSize: n
    } = t;
    let s = 0;
    for (const t of this.zt._c) {
      if (0 === t.Zt.length) continue;
      i.font = t.R;
      const e = this.uc(i, t.Zt);
      e > n.width ? t.ju = n.width / e : t.ju = 1, s += t.cc * t.ju;
    }
    let e = 0;
    switch (this.zt.dc) {
      case "top":
        e = 0;
        break;
      case "center":
        e = Math.max((n.height - s) / 2, 0);
        break;
      case "bottom":
        e = Math.max(n.height - s, 0);
    }
    i.fillStyle = this.zt.O;
    for (const t of this.zt._c) {
      i.save();
      let s = 0;
      switch (this.zt.fc) {
        case "left":
          i.textAlign = "left", s = t.cc / 2;
          break;
        case "center":
          i.textAlign = "center", s = n.width / 2;
          break;
        case "right":
          i.textAlign = "right", s = n.width - 1 - t.cc / 2;
      }
      i.translate(s, e), i.textBaseline = "top", i.font = t.R, i.scale(t.ju, t.ju), i.fillText(t.Zt, 0, t.vc), i.restore(), e += t.cc * t.ju;
    }
  }
  uc(t, i) {
    const n = this.mc(t.font);
    let s = n.get(i);
    return void 0 === s && (s = t.measureText(i).width, n.set(i, s)), s;
  }
  mc(t) {
    let i = this.oc.get(t);
    return void 0 === i && (i = new Map(), this.oc.set(t, i)), i;
  }
}
class Rn {
  constructor(t) {
    this.ft = !0, this.Ft = {
      yt: !1,
      O: "",
      _c: [],
      dc: "center",
      fc: "center"
    }, this.Wt = new Pn(this.Ft), this.jt = t;
  }
  bt() {
    this.ft = !0;
  }
  gt() {
    return this.ft && (this.Mt(), this.ft = !1), this.Wt;
  }
  Mt() {
    const t = this.jt.W(),
      i = this.Ft;
    i.yt = t.visible, i.yt && (i.O = t.color, i.fc = t.horzAlign, i.dc = t.vertAlign, i._c = [{
      Zt: t.text,
      R: N(t.fontSize, t.fontFamily, t.fontStyle),
      cc: 1.2 * t.fontSize,
      vc: 0,
      ju: 0
    }]);
  }
}
class Dn extends lt {
  constructor(t, i) {
    super(), this._n = i, this.mn = new Rn(this);
  }
  Tn() {
    return [];
  }
  Cn() {
    return [this.mn];
  }
  W() {
    return this._n;
  }
  Rn() {
    this.mn.bt();
  }
}
var On, An, Vn, Bn, In;
!function (t) {
  t[t.OnTouchEnd = 0] = "OnTouchEnd", t[t.OnNextTap = 1] = "OnNextTap";
}(On || (exports.TrackingModeExitMode = On = {}));
class zn {
  constructor(t, i, n) {
    this.bc = [], this.wc = [], this.e_ = 0, this.gc = null, this.Mc = new R(), this.xc = new R(), this.Sc = null, this.kc = t, this._n = i, this.N_ = n, this.yc = new F(this), this.wl = new Cn(this, i.timeScale, this._n.localization, n), this.vt = new ot(this, i.crosshair), this.Cc = new Gi(i.crosshair), this.Tc = new Dn(this, i.watermark), this.Pc(), this.bc[0].p_(2e3), this.Rc = this.Dc(0), this.Oc = this.Dc(1);
  }
  $l() {
    this.Ac(ut.ns());
  }
  Nh() {
    this.Ac(ut.ts());
  }
  sa() {
    this.Ac(new ut(1));
  }
  Ul(t) {
    const i = this.Vc(t);
    this.Ac(i);
  }
  Bc() {
    return this.gc;
  }
  Ic(t) {
    const i = this.gc;
    this.gc = t, null !== i && this.Ul(i.zc), null !== t && this.Ul(t.zc);
  }
  W() {
    return this._n;
  }
  Eh(t) {
    D(this._n, t), this.bc.forEach(i => i.c_(t)), void 0 !== t.timeScale && this.wl.Eh(t.timeScale), void 0 !== t.localization && this.wl.wu(t.localization), (t.leftPriceScale || t.rightPriceScale) && this.Mc.m(), this.Rc = this.Dc(0), this.Oc = this.Dc(1), this.$l();
  }
  Lc(t, i) {
    if ("left" === t) return void this.Eh({
      leftPriceScale: i
    });
    if ("right" === t) return void this.Eh({
      rightPriceScale: i
    });
    const n = this.Ec(t);
    null !== n && (n.Dt.Eh(i), this.Mc.m());
  }
  Ec(t) {
    for (const i of this.bc) {
      const n = i.d_(t);
      if (null !== n) return {
        Ht: i,
        Dt: n
      };
    }
    return null;
  }
  St() {
    return this.wl;
  }
  Nc() {
    return this.bc;
  }
  Fc() {
    return this.Tc;
  }
  Wc() {
    return this.vt;
  }
  jc() {
    return this.xc;
  }
  Hc(t, i) {
    t.Oo(i), this.Iu();
  }
  m_(t) {
    this.e_ = t, this.wl.m_(this.e_), this.bc.forEach(i => i.m_(t)), this.Iu();
  }
  Pc(t) {
    const i = new wn(this.wl, this);
    void 0 !== t ? this.bc.splice(t, 0, i) : this.bc.push(i);
    const n = void 0 === t ? this.bc.length - 1 : t,
      s = ut.ns();
    return s.Ln(n, {
      En: 0,
      Nn: !0
    }), this.Ac(s), i;
  }
  y_(t, i, n) {
    t.y_(i, n);
  }
  C_(t, i, n) {
    t.C_(i, n), this.ql(), this.Ac(this.$c(t, 2));
  }
  T_(t, i) {
    t.T_(i), this.Ac(this.$c(t, 2));
  }
  P_(t, i, n) {
    i.yo() || t.P_(i, n);
  }
  R_(t, i, n) {
    i.yo() || (t.R_(i, n), this.ql(), this.Ac(this.$c(t, 2)));
  }
  D_(t, i) {
    i.yo() || (t.D_(i), this.Ac(this.$c(t, 2)));
  }
  A_(t, i) {
    t.A_(i), this.Ac(this.$c(t, 2));
  }
  Uc(t) {
    this.wl.Uo(t);
  }
  qc(t, i) {
    const n = this.St();
    if (n.Ei() || 0 === i) return;
    const s = n.ji();
    t = Math.max(1, Math.min(t, s)), n.ju(t, i), this.Iu();
  }
  Yc(t) {
    this.Xc(0), this.Kc(t), this.Zc();
  }
  Gc(t) {
    this.wl.qo(t), this.Iu();
  }
  Jc() {
    this.wl.Yo(), this.Nh();
  }
  Xc(t) {
    this.wl.Xo(t);
  }
  Kc(t) {
    this.wl.Ko(t), this.Iu();
  }
  Zc() {
    this.wl.Zo(), this.Nh();
  }
  wt() {
    return this.wc;
  }
  Qc(t, i, n, s, e) {
    this.vt.bn(t, i);
    let r = NaN,
      h = this.wl.Vu(t);
    const l = this.wl.qs();
    null !== l && (h = Math.min(Math.max(l.Rs(), h), l.ui()));
    const a = s.dn(),
      o = a.Ct();
    null !== o && (r = a.fn(i, o)), r = this.Cc.Ca(r, h, s), this.vt.xn(h, r, s), this.sa(), e || this.xc.m(this.vt.xt(), {
      x: t,
      y: i
    }, n);
  }
  td(t, i, n) {
    const s = n.dn(),
      e = s.Ct(),
      r = s.Rt(t, b(e)),
      h = this.wl.ya(i, !0),
      l = this.wl.It(b(h));
    this.Qc(l, r, null, n, !0);
  }
  nd(t) {
    this.Wc().kn(), this.sa(), t || this.xc.m(null, null, null);
  }
  ql() {
    const t = this.vt.Ht();
    if (null !== t) {
      const i = this.vt.gn(),
        n = this.vt.Mn();
      this.Qc(i, n, null, t);
    }
    this.vt.Rn();
  }
  sd(t, i, n) {
    const s = this.wl.vn(0);
    void 0 !== i && void 0 !== n && this.wl.bt(i, n);
    const e = this.wl.vn(0),
      r = this.wl.Au(),
      h = this.wl.qs();
    if (null !== h && null !== s && null !== e) {
      const i = h.Yr(r),
        l = this.N_.key(s) > this.N_.key(e),
        a = null !== t && t > r && !l,
        o = this.wl.W().allowShiftVisibleRangeOnWhitespaceReplacement,
        _ = i && (!(void 0 === n) || o) && this.wl.W().shiftVisibleRangeOnNewBar;
      if (a && !_) {
        const i = t - r;
        this.wl.Zn(this.wl.Lu() - i);
      }
    }
    this.wl.Wu(t);
  }
  Kl(t) {
    null !== t && t.B_();
  }
  _r(t) {
    const i = this.bc.find(i => i.No().includes(t));
    return void 0 === i ? null : i;
  }
  Iu() {
    this.Tc.Rn(), this.bc.forEach(t => t.B_()), this.ql();
  }
  S() {
    this.bc.forEach(t => t.S()), this.bc.length = 0, this._n.localization.priceFormatter = void 0, this._n.localization.percentageFormatter = void 0, this._n.localization.timeFormatter = void 0;
  }
  ed() {
    return this.yc;
  }
  vr() {
    return this.yc.W();
  }
  f_() {
    return this.Mc;
  }
  rd(t, i, n) {
    const s = this.bc[0],
      e = this.hd(i, t, s, n);
    return this.wc.push(e), 1 === this.wc.length ? this.$l() : this.Nh(), e;
  }
  ld(t) {
    const i = this._r(t),
      n = this.wc.indexOf(t);
    p(-1 !== n, "Series not found"), this.wc.splice(n, 1), b(i).jo(t), t.S && t.S();
  }
  Hl(t, i) {
    const n = b(this._r(t));
    n.jo(t);
    const s = this.Ec(i);
    if (null === s) {
      const s = t.Xi();
      n.Fo(t, i, s);
    } else {
      const e = s.Ht === n ? t.Xi() : void 0;
      s.Ht.Fo(t, i, e);
    }
  }
  Qu() {
    const t = ut.ts();
    t.jn(), this.Ac(t);
  }
  ad(t) {
    const i = ut.ts();
    i.Un(t), this.Ac(i);
  }
  Xn() {
    const t = ut.ts();
    t.Xn(), this.Ac(t);
  }
  Kn(t) {
    const i = ut.ts();
    i.Kn(t), this.Ac(i);
  }
  Zn(t) {
    const i = ut.ts();
    i.Zn(t), this.Ac(i);
  }
  qn(t) {
    const i = ut.ts();
    i.qn(t), this.Ac(i);
  }
  Hn() {
    const t = ut.ts();
    t.Hn(), this.Ac(t);
  }
  od() {
    return this._n.rightPriceScale.visible ? "right" : "left";
  }
  _d() {
    return this.Oc;
  }
  q() {
    return this.Rc;
  }
  Vt(t) {
    const i = this.Oc,
      n = this.Rc;
    if (i === n) return i;
    if (t = Math.max(0, Math.min(100, Math.round(100 * t))), null === this.Sc || this.Sc.ys !== n || this.Sc.Cs !== i) this.Sc = {
      ys: n,
      Cs: i,
      ud: new Map()
    };else {
      const i = this.Sc.ud.get(t);
      if (void 0 !== i) return i;
    }
    const s = function (t, i, n) {
      const [s, e, r, h] = T(t),
        [l, a, o, _] = T(i),
        u = [M(s + n * (l - s)), M(e + n * (a - e)), M(r + n * (o - r)), x(h + n * (_ - h))];
      return `rgba(${u[0]}, ${u[1]}, ${u[2]}, ${u[3]})`;
    }(n, i, t / 100);
    return this.Sc.ud.set(t, s), s;
  }
  $c(t, i) {
    const n = new ut(i);
    if (null !== t) {
      const s = this.bc.indexOf(t);
      n.Ln(s, {
        En: i
      });
    }
    return n;
  }
  Vc(t, i) {
    return void 0 === i && (i = 2), this.$c(this._r(t), i);
  }
  Ac(t) {
    this.kc && this.kc(t), this.bc.forEach(t => t.z_().Fh().bt());
  }
  hd(t, i, n, s) {
    const e = new Zi(this, t, i, n, s),
      r = void 0 !== t.priceScaleId ? t.priceScaleId : this.od();
    return n.Fo(e, r), _t(r) || e.Eh(t), e;
  }
  Dc(t) {
    const i = this._n.layout;
    return "gradient" === i.background.type ? 0 === t ? i.background.topColor : i.background.bottomColor : i.background.color;
  }
}
function Ln(t) {
  return !O(t) && !V(t);
}
function En(t) {
  return O(t);
}
!function (t) {
  t[t.Disabled = 0] = "Disabled", t[t.Continuous = 1] = "Continuous", t[t.OnDataUpdate = 2] = "OnDataUpdate";
}(An || (exports.LastPriceAnimationMode = An = {})), function (t) {
  t[t.LastBar = 0] = "LastBar", t[t.LastVisible = 1] = "LastVisible";
}(Vn || (exports.PriceLineSource = Vn = {})), function (t) {
  t.Solid = "solid", t.VerticalGradient = "gradient";
}(Bn || (exports.ColorType = Bn = {})), function (t) {
  t[t.Year = 0] = "Year", t[t.Month = 1] = "Month", t[t.DayOfMonth = 2] = "DayOfMonth", t[t.Time = 3] = "Time", t[t.TimeWithSeconds = 4] = "TimeWithSeconds";
}(In || (exports.TickMarkType = In = {}));
const Nn = t => t.getUTCFullYear();
function Fn(t, i, n) {
  return i.replace(/yyyy/g, (t => dt(Nn(t), 4))(t)).replace(/yy/g, (t => dt(Nn(t) % 100, 2))(t)).replace(/MMMM/g, ((t, i) => new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(i, {
    month: "long"
  }))(t, n)).replace(/MMM/g, ((t, i) => new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(i, {
    month: "short"
  }))(t, n)).replace(/MM/g, (t => dt((t => t.getUTCMonth() + 1)(t), 2))(t)).replace(/dd/g, (t => dt((t => t.getUTCDate())(t), 2))(t));
}
class Wn {
  constructor(t = "yyyy-MM-dd", i = "default") {
    this.dd = t, this.fd = i;
  }
  F_(t) {
    return Fn(t, this.dd, this.fd);
  }
}
class jn {
  constructor(t) {
    this.vd = t || "%h:%m:%s";
  }
  F_(t) {
    return this.vd.replace("%h", dt(t.getUTCHours(), 2)).replace("%m", dt(t.getUTCMinutes(), 2)).replace("%s", dt(t.getUTCSeconds(), 2));
  }
}
const Hn = {
  pd: "yyyy-MM-dd",
  md: "%h:%m:%s",
  bd: " ",
  wd: "default"
};
class $n {
  constructor(t = {}) {
    const i = Object.assign(Object.assign({}, Hn), t);
    this.gd = new Wn(i.pd, i.wd), this.Md = new jn(i.md), this.xd = i.bd;
  }
  F_(t) {
    return `${this.gd.F_(t)}${this.xd}${this.Md.F_(t)}`;
  }
}
function Un(t) {
  return 60 * t * 60 * 1e3;
}
function qn(t) {
  return 60 * t * 1e3;
}
const Yn = [{
  Sd: (Xn = 1, 1e3 * Xn),
  kd: 10
}, {
  Sd: qn(1),
  kd: 20
}, {
  Sd: qn(5),
  kd: 21
}, {
  Sd: qn(30),
  kd: 22
}, {
  Sd: Un(1),
  kd: 30
}, {
  Sd: Un(3),
  kd: 31
}, {
  Sd: Un(6),
  kd: 32
}, {
  Sd: Un(12),
  kd: 33
}];
var Xn;
function Kn(t, i) {
  if (t.getUTCFullYear() !== i.getUTCFullYear()) return 70;
  if (t.getUTCMonth() !== i.getUTCMonth()) return 60;
  if (t.getUTCDate() !== i.getUTCDate()) return 50;
  for (let n = Yn.length - 1; n >= 0; --n) if (Math.floor(i.getTime() / Yn[n].Sd) !== Math.floor(t.getTime() / Yn[n].Sd)) return Yn[n].kd;
  return 0;
}
function Zn(t) {
  let i = t;
  if (V(t) && (i = Jn(t)), !Ln(i)) throw new Error("time must be of type BusinessDay");
  const n = new Date(Date.UTC(i.year, i.month - 1, i.day, 0, 0, 0, 0));
  return {
    yd: Math.round(n.getTime() / 1e3),
    Cd: i
  };
}
function Gn(t) {
  if (!En(t)) throw new Error("time must be of type isUTCTimestamp");
  return {
    yd: t
  };
}
function Jn(t) {
  const i = new Date(t);
  if (isNaN(i.getTime())) throw new Error(`Invalid date string=${t}, expected format=yyyy-mm-dd`);
  return {
    day: i.getUTCDate(),
    month: i.getUTCMonth() + 1,
    year: i.getUTCFullYear()
  };
}
function Qn(t) {
  V(t.time) && (t.time = Jn(t.time));
}
class ts {
  options() {
    return this._n;
  }
  setOptions(t) {
    this._n = t, this.updateFormatter(t.localization);
  }
  preprocessData(t) {
    Array.isArray(t) ? function (t) {
      t.forEach(Qn);
    }(t) : Qn(t);
  }
  createConverterToInternalObj(t) {
    return b(function (t) {
      return 0 === t.length ? null : Ln(t[0].time) || V(t[0].time) ? Zn : Gn;
    }(t));
  }
  key(t) {
    return "object" == typeof t && "yd" in t ? t.yd : this.key(this.convertHorzItemToInternal(t));
  }
  cacheKey(t) {
    const i = t;
    return void 0 === i.Cd ? new Date(1e3 * i.yd).getTime() : new Date(Date.UTC(i.Cd.year, i.Cd.month - 1, i.Cd.day)).getTime();
  }
  convertHorzItemToInternal(t) {
    return En(i = t) ? Gn(i) : Ln(i) ? Zn(i) : Zn(Jn(i));
    var i;
  }
  updateFormatter(t) {
    if (!this._n) return;
    const i = t.dateFormat;
    this._n.timeScale.timeVisible ? this.Td = new $n({
      pd: i,
      md: this._n.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m",
      bd: "   ",
      wd: t.locale
    }) : this.Td = new Wn(i, t.locale);
  }
  formatHorzItem(t) {
    const i = t;
    return this.Td.F_(new Date(1e3 * i.yd));
  }
  formatTickmark(t, i) {
    const n = function (t, i, n) {
        switch (t) {
          case 0:
          case 10:
            return i ? n ? 4 : 3 : 2;
          case 20:
          case 21:
          case 22:
          case 30:
          case 31:
          case 32:
          case 33:
            return i ? 3 : 2;
          case 50:
            return 2;
          case 60:
            return 1;
          case 70:
            return 0;
        }
      }(t.weight, this._n.timeScale.timeVisible, this._n.timeScale.secondsVisible),
      s = this._n.timeScale;
    if (void 0 !== s.tickMarkFormatter) {
      const e = s.tickMarkFormatter(t.originalTime, n, i.locale);
      if (null !== e) return e;
    }
    return function (t, i, n) {
      const s = {};
      switch (i) {
        case 0:
          s.year = "numeric";
          break;
        case 1:
          s.month = "short";
          break;
        case 2:
          s.day = "numeric";
          break;
        case 3:
          s.hour12 = !1, s.hour = "2-digit", s.minute = "2-digit";
          break;
        case 4:
          s.hour12 = !1, s.hour = "2-digit", s.minute = "2-digit", s.second = "2-digit";
      }
      const e = void 0 === t.Cd ? new Date(1e3 * t.yd) : new Date(Date.UTC(t.Cd.year, t.Cd.month - 1, t.Cd.day));
      return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()).toLocaleString(n, s);
    }(t.time, n, i.locale);
  }
  maxTickMarkWeight(t) {
    let i = t.reduce(yn, t[0]).weight;
    return i > 30 && i < 50 && (i = 30), i;
  }
  fillWeightsForPoints(t, i) {
    !function (t, i = 0) {
      if (0 === t.length) return;
      let n = 0 === i ? null : t[i - 1].time.yd,
        s = null !== n ? new Date(1e3 * n) : null,
        e = 0;
      for (let r = i; r < t.length; ++r) {
        const i = t[r],
          h = new Date(1e3 * i.time.yd);
        null !== s && (i.timeWeight = Kn(h, s)), e += i.time.yd - (n || i.time.yd), n = i.time.yd, s = h;
      }
      if (0 === i && t.length > 1) {
        const i = Math.ceil(e / (t.length - 1)),
          n = new Date(1e3 * (t[0].time.yd - i));
        t[0].timeWeight = Kn(new Date(1e3 * t[0].time.yd), n);
      }
    }(t, i);
  }
  static Pd(t) {
    return D({
      localization: {
        dateFormat: "dd MMM 'yy"
      }
    }, null != t ? t : {});
  }
}
const is = "undefined" != typeof window;
function ns() {
  return !!is && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
}
function ss() {
  return !!is && /iPhone|iPad|iPod/.test(window.navigator.platform);
}
function es(t) {
  return t + t % 2;
}
function rs(t, i) {
  return t.Rd - i.Rd;
}
function hs(t, i, n) {
  const s = (t.Rd - i.Rd) / (t.ot - i.ot);
  return Math.sign(s) * Math.min(Math.abs(s), n);
}
class ls {
  constructor(t, i, n, s) {
    this.Dd = null, this.Od = null, this.Ad = null, this.Vd = null, this.Bd = null, this.Id = 0, this.zd = 0, this.Ld = t, this.Ed = i, this.Nd = n, this.ss = s;
  }
  Fd(t, i) {
    if (null !== this.Dd) {
      if (this.Dd.ot === i) return void (this.Dd.Rd = t);
      if (Math.abs(this.Dd.Rd - t) < this.ss) return;
    }
    this.Vd = this.Ad, this.Ad = this.Od, this.Od = this.Dd, this.Dd = {
      ot: i,
      Rd: t
    };
  }
  Pr(t, i) {
    if (null === this.Dd || null === this.Od) return;
    if (i - this.Dd.ot > 50) return;
    let n = 0;
    const s = hs(this.Dd, this.Od, this.Ed),
      e = rs(this.Dd, this.Od),
      r = [s],
      h = [e];
    if (n += e, null !== this.Ad) {
      const t = hs(this.Od, this.Ad, this.Ed);
      if (Math.sign(t) === Math.sign(s)) {
        const i = rs(this.Od, this.Ad);
        if (r.push(t), h.push(i), n += i, null !== this.Vd) {
          const t = hs(this.Ad, this.Vd, this.Ed);
          if (Math.sign(t) === Math.sign(s)) {
            const i = rs(this.Ad, this.Vd);
            r.push(t), h.push(i), n += i;
          }
        }
      }
    }
    let l = 0;
    for (let t = 0; t < r.length; ++t) l += h[t] / n * r[t];
    Math.abs(l) < this.Ld || (this.Bd = {
      Rd: t,
      ot: i
    }, this.zd = l, this.Id = function (t, i) {
      const n = Math.log(i);
      return Math.log(1 * n / -t) / n;
    }(Math.abs(l), this.Nd));
  }
  Xu(t) {
    const i = b(this.Bd),
      n = t - i.ot;
    return i.Rd + this.zd * (Math.pow(this.Nd, n) - 1) / Math.log(this.Nd);
  }
  Yu(t) {
    return null === this.Bd || this.Wd(t) === this.Id;
  }
  Wd(t) {
    const i = t - b(this.Bd).ot;
    return Math.min(i, this.Id);
  }
}
function as(t, n) {
  const s = b(t.ownerDocument).createElement("canvas");
  t.appendChild(s);
  const e = (0, _fancyCanvas.bindCanvasElementBitmapSizeTo)(s, {
    type: "device-pixel-content-box",
    options: {
      allowResizeObserver: !1
    },
    transform: (t, i) => ({
      width: Math.max(t.width, i.width),
      height: Math.max(t.height, i.height)
    })
  });
  return e.resizeCanvasElement(n), e;
}
function os(t) {
  var i;
  t.width = 1, t.height = 1, null === (i = t.getContext("2d")) || void 0 === i || i.clearRect(0, 0, 1, 1);
}
function _s(t, i, n, s) {
  t.fl && t.fl(i, n, s);
}
function us(t, i, n, s) {
  t.K(i, n, s);
}
function cs(t, i, n, s) {
  const e = t(n, s);
  for (const t of e) {
    const n = t.gt();
    null !== n && i(n);
  }
}
function ds(t) {
  is && void 0 !== window.chrome && t.addEventListener("mousedown", t => {
    if (1 === t.button) return t.preventDefault(), !1;
  });
}
class fs {
  constructor(t, i, n) {
    this.jd = 0, this.Hd = null, this.$d = {
      nt: Number.NEGATIVE_INFINITY,
      st: Number.POSITIVE_INFINITY
    }, this.Ud = 0, this.qd = null, this.Yd = {
      nt: Number.NEGATIVE_INFINITY,
      st: Number.POSITIVE_INFINITY
    }, this.Xd = null, this.Kd = !1, this.Zd = null, this.Gd = null, this.Jd = !1, this.Qd = !1, this.tf = !1, this.if = null, this.nf = null, this.sf = null, this.ef = null, this.rf = null, this.hf = null, this.lf = null, this.af = 0, this._f = !1, this.uf = !1, this.cf = !1, this.df = 0, this.ff = null, this.vf = !ss(), this.pf = t => {
      this.mf(t);
    }, this.bf = t => {
      if (this.wf(t)) {
        const i = this.gf(t);
        if (++this.Ud, this.qd && this.Ud > 1) {
          const {
            Mf: n
          } = this.xf(ms(t), this.Yd);
          n < 30 && !this.tf && this.Sf(i, this.yf.kf), this.Cf();
        }
      } else {
        const i = this.gf(t);
        if (++this.jd, this.Hd && this.jd > 1) {
          const {
            Mf: n
          } = this.xf(ms(t), this.$d);
          n < 5 && !this.Qd && this.Tf(i, this.yf.Pf), this.Rf();
        }
      }
    }, this.Df = t, this.yf = i, this._n = n, this.Of();
  }
  S() {
    null !== this.if && (this.if(), this.if = null), null !== this.nf && (this.nf(), this.nf = null), null !== this.ef && (this.ef(), this.ef = null), null !== this.rf && (this.rf(), this.rf = null), null !== this.hf && (this.hf(), this.hf = null), null !== this.sf && (this.sf(), this.sf = null), this.Af(), this.Rf();
  }
  Vf(t) {
    this.ef && this.ef();
    const i = this.Bf.bind(this);
    if (this.ef = () => {
      this.Df.removeEventListener("mousemove", i);
    }, this.Df.addEventListener("mousemove", i), this.wf(t)) return;
    const n = this.gf(t);
    this.Tf(n, this.yf.If), this.vf = !0;
  }
  Rf() {
    null !== this.Hd && clearTimeout(this.Hd), this.jd = 0, this.Hd = null, this.$d = {
      nt: Number.NEGATIVE_INFINITY,
      st: Number.POSITIVE_INFINITY
    };
  }
  Cf() {
    null !== this.qd && clearTimeout(this.qd), this.Ud = 0, this.qd = null, this.Yd = {
      nt: Number.NEGATIVE_INFINITY,
      st: Number.POSITIVE_INFINITY
    };
  }
  Bf(t) {
    if (this.cf || null !== this.Gd) return;
    if (this.wf(t)) return;
    const i = this.gf(t);
    this.Tf(i, this.yf.zf), this.vf = !0;
  }
  Lf(t) {
    const i = ws(t.changedTouches, b(this.ff));
    if (null === i) return;
    if (this.df = bs(t), null !== this.lf) return;
    if (this.uf) return;
    this._f = !0;
    const n = this.xf(ms(i), b(this.Gd)),
      {
        Ef: s,
        Nf: e,
        Mf: r
      } = n;
    if (this.Jd || !(r < 5)) {
      if (!this.Jd) {
        const t = .5 * s,
          i = e >= t && !this._n.Ff(),
          n = t > e && !this._n.Wf();
        i || n || (this.uf = !0), this.Jd = !0, this.tf = !0, this.Af(), this.Cf();
      }
      if (!this.uf) {
        const n = this.gf(t, i);
        this.Sf(n, this.yf.jf), ps(t);
      }
    }
  }
  Hf(t) {
    if (0 !== t.button) return;
    const i = this.xf(ms(t), b(this.Zd)),
      {
        Mf: n
      } = i;
    if (n >= 5 && (this.Qd = !0, this.Rf()), this.Qd) {
      const i = this.gf(t);
      this.Tf(i, this.yf.$f);
    }
  }
  xf(t, i) {
    const n = Math.abs(i.nt - t.nt),
      s = Math.abs(i.st - t.st);
    return {
      Ef: n,
      Nf: s,
      Mf: n + s
    };
  }
  Uf(t) {
    let i = ws(t.changedTouches, b(this.ff));
    if (null === i && 0 === t.touches.length && (i = t.changedTouches[0]), null === i) return;
    this.ff = null, this.df = bs(t), this.Af(), this.Gd = null, this.hf && (this.hf(), this.hf = null);
    const n = this.gf(t, i);
    if (this.Sf(n, this.yf.qf), ++this.Ud, this.qd && this.Ud > 1) {
      const {
        Mf: t
      } = this.xf(ms(i), this.Yd);
      t < 30 && !this.tf && this.Sf(n, this.yf.kf), this.Cf();
    } else this.tf || (this.Sf(n, this.yf.Yf), this.yf.Yf && ps(t));
    0 === this.Ud && ps(t), 0 === t.touches.length && this.Kd && (this.Kd = !1, ps(t));
  }
  mf(t) {
    if (0 !== t.button) return;
    const i = this.gf(t);
    if (this.Zd = null, this.cf = !1, this.rf && (this.rf(), this.rf = null), ns()) {
      this.Df.ownerDocument.documentElement.removeEventListener("mouseleave", this.pf);
    }
    if (!this.wf(t)) if (this.Tf(i, this.yf.Xf), ++this.jd, this.Hd && this.jd > 1) {
      const {
        Mf: n
      } = this.xf(ms(t), this.$d);
      n < 5 && !this.Qd && this.Tf(i, this.yf.Pf), this.Rf();
    } else this.Qd || this.Tf(i, this.yf.Kf);
  }
  Af() {
    null !== this.Xd && (clearTimeout(this.Xd), this.Xd = null);
  }
  Zf(t) {
    if (null !== this.ff) return;
    const i = t.changedTouches[0];
    this.ff = i.identifier, this.df = bs(t);
    const n = this.Df.ownerDocument.documentElement;
    this.tf = !1, this.Jd = !1, this.uf = !1, this.Gd = ms(i), this.hf && (this.hf(), this.hf = null);
    {
      const i = this.Lf.bind(this),
        s = this.Uf.bind(this);
      this.hf = () => {
        n.removeEventListener("touchmove", i), n.removeEventListener("touchend", s);
      }, n.addEventListener("touchmove", i, {
        passive: !1
      }), n.addEventListener("touchend", s, {
        passive: !1
      }), this.Af(), this.Xd = setTimeout(this.Gf.bind(this, t), 240);
    }
    const s = this.gf(t, i);
    this.Sf(s, this.yf.Jf), this.qd || (this.Ud = 0, this.qd = setTimeout(this.Cf.bind(this), 500), this.Yd = ms(i));
  }
  Qf(t) {
    if (0 !== t.button) return;
    const i = this.Df.ownerDocument.documentElement;
    ns() && i.addEventListener("mouseleave", this.pf), this.Qd = !1, this.Zd = ms(t), this.rf && (this.rf(), this.rf = null);
    {
      const t = this.Hf.bind(this),
        n = this.mf.bind(this);
      this.rf = () => {
        i.removeEventListener("mousemove", t), i.removeEventListener("mouseup", n);
      }, i.addEventListener("mousemove", t), i.addEventListener("mouseup", n);
    }
    if (this.cf = !0, this.wf(t)) return;
    const n = this.gf(t);
    this.Tf(n, this.yf.tv), this.Hd || (this.jd = 0, this.Hd = setTimeout(this.Rf.bind(this), 500), this.$d = ms(t));
  }
  Of() {
    this.Df.addEventListener("mouseenter", this.Vf.bind(this)), this.Df.addEventListener("touchcancel", this.Af.bind(this));
    {
      const t = this.Df.ownerDocument,
        i = t => {
          this.yf.iv && (t.composed && this.Df.contains(t.composedPath()[0]) || t.target && this.Df.contains(t.target) || this.yf.iv());
        };
      this.nf = () => {
        t.removeEventListener("touchstart", i);
      }, this.if = () => {
        t.removeEventListener("mousedown", i);
      }, t.addEventListener("mousedown", i), t.addEventListener("touchstart", i, {
        passive: !0
      });
    }
    ss() && (this.sf = () => {
      this.Df.removeEventListener("dblclick", this.bf);
    }, this.Df.addEventListener("dblclick", this.bf)), this.Df.addEventListener("mouseleave", this.nv.bind(this)), this.Df.addEventListener("touchstart", this.Zf.bind(this), {
      passive: !0
    }), ds(this.Df), this.Df.addEventListener("mousedown", this.Qf.bind(this)), this.sv(), this.Df.addEventListener("touchmove", () => {}, {
      passive: !1
    });
  }
  sv() {
    void 0 === this.yf.ev && void 0 === this.yf.rv && void 0 === this.yf.hv || (this.Df.addEventListener("touchstart", t => this.lv(t.touches), {
      passive: !0
    }), this.Df.addEventListener("touchmove", t => {
      if (2 === t.touches.length && null !== this.lf && void 0 !== this.yf.rv) {
        const i = vs(t.touches[0], t.touches[1]) / this.af;
        this.yf.rv(this.lf, i), ps(t);
      }
    }, {
      passive: !1
    }), this.Df.addEventListener("touchend", t => {
      this.lv(t.touches);
    }));
  }
  lv(t) {
    1 === t.length && (this._f = !1), 2 !== t.length || this._f || this.Kd ? this.av() : this.ov(t);
  }
  ov(t) {
    const i = this.Df.getBoundingClientRect() || {
      left: 0,
      top: 0
    };
    this.lf = {
      nt: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
      st: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2
    }, this.af = vs(t[0], t[1]), void 0 !== this.yf.ev && this.yf.ev(), this.Af();
  }
  av() {
    null !== this.lf && (this.lf = null, void 0 !== this.yf.hv && this.yf.hv());
  }
  nv(t) {
    if (this.ef && this.ef(), this.wf(t)) return;
    if (!this.vf) return;
    const i = this.gf(t);
    this.Tf(i, this.yf._v), this.vf = !ss();
  }
  Gf(t) {
    const i = ws(t.touches, b(this.ff));
    if (null === i) return;
    const n = this.gf(t, i);
    this.Sf(n, this.yf.uv), this.tf = !0, this.Kd = !0;
  }
  wf(t) {
    return t.sourceCapabilities && void 0 !== t.sourceCapabilities.firesTouchEvents ? t.sourceCapabilities.firesTouchEvents : bs(t) < this.df + 500;
  }
  Sf(t, i) {
    i && i.call(this.yf, t);
  }
  Tf(t, i) {
    i && i.call(this.yf, t);
  }
  gf(t, i) {
    const n = i || t,
      s = this.Df.getBoundingClientRect() || {
        left: 0,
        top: 0
      };
    return {
      clientX: n.clientX,
      clientY: n.clientY,
      pageX: n.pageX,
      pageY: n.pageY,
      screenX: n.screenX,
      screenY: n.screenY,
      localX: n.clientX - s.left,
      localY: n.clientY - s.top,
      ctrlKey: t.ctrlKey,
      altKey: t.altKey,
      shiftKey: t.shiftKey,
      metaKey: t.metaKey,
      cv: !t.type.startsWith("mouse") && "contextmenu" !== t.type && "click" !== t.type,
      dv: t.type,
      fv: n.target,
      vv: t.view,
      pv: () => {
        "touchstart" !== t.type && ps(t);
      }
    };
  }
}
function vs(t, i) {
  const n = t.clientX - i.clientX,
    s = t.clientY - i.clientY;
  return Math.sqrt(n * n + s * s);
}
function ps(t) {
  t.cancelable && t.preventDefault();
}
function ms(t) {
  return {
    nt: t.pageX,
    st: t.pageY
  };
}
function bs(t) {
  return t.timeStamp || performance.now();
}
function ws(t, i) {
  for (let n = 0; n < t.length; ++n) if (t[n].identifier === i) return t[n];
  return null;
}
function gs(t) {
  return {
    zc: t.zc,
    mv: {
      mr: t.bv.externalId
    },
    wv: t.bv.cursorStyle
  };
}
function Ms(t, i, n) {
  for (const s of t) {
    const t = s.gt();
    if (null !== t && t.pr) {
      const e = t.pr(i, n);
      if (null !== e) return {
        vv: s,
        mv: e
      };
    }
  }
  return null;
}
function xs(t, i) {
  return n => {
    var s, e, r, h;
    return (null !== (e = null === (s = n.Dt()) || void 0 === s ? void 0 : s.xa()) && void 0 !== e ? e : "") !== i ? [] : null !== (h = null === (r = n.la) || void 0 === r ? void 0 : r.call(n, t)) && void 0 !== h ? h : [];
  };
}
class Ss {
  constructor(i, n, s, e) {
    this.zi = null, this.gv = null, this.Mv = !1, this.xv = new ni(200), this.Zr = null, this.Sv = 0, this.kv = !1, this.yv = () => {
      this.kv || this.Qi.Cv().$t().Nh();
    }, this.Tv = () => {
      this.kv || this.Qi.Cv().$t().Nh();
    }, this.Qi = i, this._n = n, this.mo = n.layout, this.yc = s, this.Pv = "left" === e, this.Rv = xs("normal", e), this.Dv = xs("top", e), this.Ov = xs("bottom", e), this.Av = document.createElement("div"), this.Av.style.height = "100%", this.Av.style.overflow = "hidden", this.Av.style.width = "25px", this.Av.style.left = "0", this.Av.style.position = "relative", this.Vv = as(this.Av, (0, _fancyCanvas.size)({
      width: 16,
      height: 16
    })), this.Vv.subscribeSuggestedBitmapSizeChanged(this.yv);
    const r = this.Vv.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "1", r.style.left = "0", r.style.top = "0", this.Bv = as(this.Av, (0, _fancyCanvas.size)({
      width: 16,
      height: 16
    })), this.Bv.subscribeSuggestedBitmapSizeChanged(this.Tv);
    const h = this.Bv.canvasElement;
    h.style.position = "absolute", h.style.zIndex = "2", h.style.left = "0", h.style.top = "0";
    const l = {
      tv: this.Iv.bind(this),
      Jf: this.Iv.bind(this),
      $f: this.zv.bind(this),
      jf: this.zv.bind(this),
      iv: this.Lv.bind(this),
      Xf: this.Ev.bind(this),
      qf: this.Ev.bind(this),
      Pf: this.Nv.bind(this),
      kf: this.Nv.bind(this),
      If: this.Fv.bind(this),
      _v: this.Wv.bind(this)
    };
    this.jv = new fs(this.Bv.canvasElement, l, {
      Ff: () => !this._n.handleScroll.vertTouchDrag,
      Wf: () => !0
    });
  }
  S() {
    this.jv.S(), this.Bv.unsubscribeSuggestedBitmapSizeChanged(this.Tv), os(this.Bv.canvasElement), this.Bv.dispose(), this.Vv.unsubscribeSuggestedBitmapSizeChanged(this.yv), os(this.Vv.canvasElement), this.Vv.dispose(), null !== this.zi && this.zi.$o().p(this), this.zi = null;
  }
  Hv() {
    return this.Av;
  }
  P() {
    return this.mo.fontSize;
  }
  $v() {
    const t = this.yc.W();
    return this.Zr !== t.R && (this.xv.Qe(), this.Zr = t.R), t;
  }
  Uv() {
    if (null === this.zi) return 0;
    let t = 0;
    const i = this.$v(),
      n = b(this.Vv.canvasElement.getContext("2d"));
    n.save();
    const s = this.zi.La();
    n.font = this.qv(), s.length > 0 && (t = Math.max(this.xv.Mi(n, s[0].Za), this.xv.Mi(n, s[s.length - 1].Za)));
    const e = this.Yv();
    for (let i = e.length; i--;) {
      const s = this.xv.Mi(n, e[i].Zt());
      s > t && (t = s);
    }
    const r = this.zi.Ct();
    if (null !== r && null !== this.gv) {
      const i = this.zi.fn(1, r),
        s = this.zi.fn(this.gv.height - 2, r);
      t = Math.max(t, this.xv.Mi(n, this.zi.Ni(Math.floor(Math.min(i, s)) + .11111111111111, r)), this.xv.Mi(n, this.zi.Ni(Math.ceil(Math.max(i, s)) - .11111111111111, r)));
    }
    n.restore();
    const h = t || 34;
    return es(Math.ceil(i.C + i.T + i.B + i.I + 5 + h));
  }
  Xv(t) {
    null !== this.gv && (0, _fancyCanvas.equalSizes)(this.gv, t) || (this.gv = t, this.kv = !0, this.Vv.resizeCanvasElement(t), this.Bv.resizeCanvasElement(t), this.kv = !1, this.Av.style.width = `${t.width}px`, this.Av.style.height = `${t.height}px`);
  }
  Kv() {
    return b(this.gv).width;
  }
  Zi(t) {
    this.zi !== t && (null !== this.zi && this.zi.$o().p(this), this.zi = t, t.$o().l(this.ao.bind(this), this));
  }
  Dt() {
    return this.zi;
  }
  Qe() {
    const t = this.Qi.Zv();
    this.Qi.Cv().$t().A_(t, b(this.Dt()));
  }
  Gv(t) {
    if (null === this.gv) return;
    if (1 !== t) {
      this.Jv(), this.Vv.applySuggestedBitmapSize();
      const t = (0, _fancyCanvas.tryCreateCanvasRenderingTarget2D)(this.Vv);
      null !== t && (t.useBitmapCoordinateSpace(t => {
        this.Qv(t), this.Ae(t);
      }), this.Qi.tp(t, this.Ov), this.ip(t), this.Qi.tp(t, this.Rv), this.np(t));
    }
    this.Bv.applySuggestedBitmapSize();
    const i = (0, _fancyCanvas.tryCreateCanvasRenderingTarget2D)(this.Bv);
    null !== i && (i.useBitmapCoordinateSpace(({
      context: t,
      bitmapSize: i
    }) => {
      t.clearRect(0, 0, i.width, i.height);
    }), this.sp(i), this.Qi.tp(i, this.Dv));
  }
  ep() {
    return this.Vv.bitmapSize;
  }
  rp(t, i, n) {
    const s = this.ep();
    s.width > 0 && s.height > 0 && t.drawImage(this.Vv.canvasElement, i, n);
  }
  bt() {
    var t;
    null === (t = this.zi) || void 0 === t || t.La();
  }
  Iv(t) {
    if (null === this.zi || this.zi.Ei() || !this._n.handleScale.axisPressedMouseMove.price) return;
    const i = this.Qi.Cv().$t(),
      n = this.Qi.Zv();
    this.Mv = !0, i.y_(n, this.zi, t.localY);
  }
  zv(t) {
    if (null === this.zi || !this._n.handleScale.axisPressedMouseMove.price) return;
    const i = this.Qi.Cv().$t(),
      n = this.Qi.Zv(),
      s = this.zi;
    i.C_(n, s, t.localY);
  }
  Lv() {
    if (null === this.zi || !this._n.handleScale.axisPressedMouseMove.price) return;
    const t = this.Qi.Cv().$t(),
      i = this.Qi.Zv(),
      n = this.zi;
    this.Mv && (this.Mv = !1, t.T_(i, n));
  }
  Ev(t) {
    if (null === this.zi || !this._n.handleScale.axisPressedMouseMove.price) return;
    const i = this.Qi.Cv().$t(),
      n = this.Qi.Zv();
    this.Mv = !1, i.T_(n, this.zi);
  }
  Nv(t) {
    this._n.handleScale.axisDoubleClickReset.price && this.Qe();
  }
  Fv(t) {
    if (null === this.zi) return;
    !this.Qi.Cv().$t().W().handleScale.axisPressedMouseMove.price || this.zi.fh() || this.zi.Co() || this.hp(1);
  }
  Wv(t) {
    this.hp(0);
  }
  Yv() {
    const t = [],
      i = null === this.zi ? void 0 : this.zi;
    return (n => {
      for (let s = 0; s < n.length; ++s) {
        const e = n[s].Tn(this.Qi.Zv(), i);
        for (let i = 0; i < e.length; i++) t.push(e[i]);
      }
    })(this.Qi.Zv().No()), t;
  }
  Qv({
    context: t,
    bitmapSize: i
  }) {
    const {
        width: n,
        height: s
      } = i,
      e = this.Qi.Zv().$t(),
      r = e.q(),
      h = e._d();
    r === h ? Z(t, 0, 0, n, s, r) : tt(t, 0, 0, n, s, r, h);
  }
  Ae({
    context: t,
    bitmapSize: i,
    horizontalPixelRatio: n
  }) {
    if (null === this.gv || null === this.zi || !this.zi.W().borderVisible) return;
    t.fillStyle = this.zi.W().borderColor;
    const s = Math.max(1, Math.floor(this.$v().C * n));
    let e;
    e = this.Pv ? i.width - s : 0, t.fillRect(e, 0, s, i.height);
  }
  ip(t) {
    if (null === this.gv || null === this.zi) return;
    const i = this.zi.La(),
      n = this.zi.W(),
      s = this.$v(),
      e = this.Pv ? this.gv.width - s.T : 0;
    n.borderVisible && n.ticksVisible && t.useBitmapCoordinateSpace(({
      context: t,
      horizontalPixelRatio: r,
      verticalPixelRatio: h
    }) => {
      t.fillStyle = n.borderColor;
      const l = Math.max(1, Math.floor(h)),
        a = Math.floor(.5 * h),
        o = Math.round(s.T * r);
      t.beginPath();
      for (const n of i) t.rect(Math.floor(e * r), Math.round(n.Aa * h) - a, o, l);
      t.fill();
    }), t.useMediaCoordinateSpace(({
      context: t
    }) => {
      var r;
      t.font = this.qv(), t.fillStyle = null !== (r = n.textColor) && void 0 !== r ? r : this.mo.textColor, t.textAlign = this.Pv ? "right" : "left", t.textBaseline = "middle";
      const h = this.Pv ? Math.round(e - s.B) : Math.round(e + s.T + s.B),
        l = i.map(i => this.xv.gi(t, i.Za));
      for (let n = i.length; n--;) {
        const s = i[n];
        t.fillText(s.Za, h, s.Aa + l[n]);
      }
    });
  }
  Jv() {
    if (null === this.gv || null === this.zi) return;
    let t = this.gv.height / 2;
    const i = [],
      n = this.zi.No().slice(),
      s = this.Qi.Zv(),
      e = this.$v();
    this.zi === s.cr() && this.Qi.Zv().No().forEach(t => {
      s.ur(t) && n.push(t);
    });
    const r = this.zi.Ta()[0],
      h = this.zi;
    n.forEach(n => {
      const e = n.Tn(s, h);
      e.forEach(t => {
        t.Oi(null), t.Ai() && i.push(t);
      }), r === n && e.length > 0 && (t = e[0].Si());
    }), i.forEach(t => t.Oi(t.Si()));
    this.zi.W().alignLabels && this.lp(i, e, t);
  }
  lp(t, i, n) {
    if (null === this.gv) return;
    const s = t.filter(t => t.Si() <= n),
      e = t.filter(t => t.Si() > n);
    s.sort((t, i) => i.Si() - t.Si()), s.length && e.length && e.push(s[0]), e.sort((t, i) => t.Si() - i.Si());
    for (const n of t) {
      const t = Math.floor(n.Bt(i) / 2),
        s = n.Si();
      s > -t && s < t && n.Oi(t), s > this.gv.height - t && s < this.gv.height + t && n.Oi(this.gv.height - t);
    }
    for (let t = 1; t < s.length; t++) {
      const n = s[t],
        e = s[t - 1],
        r = e.Bt(i, !1),
        h = n.Si(),
        l = e.Di();
      h > l - r && n.Oi(l - r);
    }
    for (let t = 1; t < e.length; t++) {
      const n = e[t],
        s = e[t - 1],
        r = s.Bt(i, !0),
        h = n.Si(),
        l = s.Di();
      h < l + r && n.Oi(l + r);
    }
  }
  np(t) {
    if (null === this.gv) return;
    const i = this.Yv(),
      n = this.$v(),
      s = this.Pv ? "right" : "left";
    i.forEach(i => {
      if (i.Vi()) {
        i.gt(b(this.zi)).K(t, n, this.xv, s);
      }
    });
  }
  sp(t) {
    if (null === this.gv || null === this.zi) return;
    const i = this.Qi.Cv().$t(),
      n = [],
      s = this.Qi.Zv(),
      e = i.Wc().Tn(s, this.zi);
    e.length && n.push(e);
    const r = this.$v(),
      h = this.Pv ? "right" : "left";
    n.forEach(i => {
      i.forEach(i => {
        i.gt(b(this.zi)).K(t, r, this.xv, h);
      });
    });
  }
  hp(t) {
    this.Av.style.cursor = 1 === t ? "ns-resize" : "default";
  }
  ao() {
    const t = this.Uv();
    this.Sv < t && this.Qi.Cv().$t().$l(), this.Sv = t;
  }
  qv() {
    return N(this.mo.fontSize, this.mo.fontFamily);
  }
}
function ks(t, i) {
  var n, s;
  return null !== (s = null === (n = t.ra) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : [];
}
function ys(t, i) {
  var n, s;
  return null !== (s = null === (n = t.Cn) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : [];
}
function Cs(t, i) {
  var n, s;
  return null !== (s = null === (n = t.Gi) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : [];
}
function Ts(t, i) {
  var n, s;
  return null !== (s = null === (n = t.na) || void 0 === n ? void 0 : n.call(t, i)) && void 0 !== s ? s : [];
}
class Ps {
  constructor(i, n) {
    this.gv = (0, _fancyCanvas.size)({
      width: 0,
      height: 0
    }), this.ap = null, this.op = null, this._p = null, this.up = !1, this.cp = new R(), this.dp = new R(), this.fp = 0, this.vp = !1, this.pp = null, this.mp = !1, this.bp = null, this.wp = null, this.kv = !1, this.yv = () => {
      this.kv || null === this.gp || this.Hi().Nh();
    }, this.Tv = () => {
      this.kv || null === this.gp || this.Hi().Nh();
    }, this.Mp = i, this.gp = n, this.gp.I_().l(this.xp.bind(this), this, !0), this.Sp = document.createElement("td"), this.Sp.style.padding = "0", this.Sp.style.position = "relative";
    const s = document.createElement("div");
    s.style.width = "100%", s.style.height = "100%", s.style.position = "relative", s.style.overflow = "hidden", this.kp = document.createElement("td"), this.kp.style.padding = "0", this.yp = document.createElement("td"), this.yp.style.padding = "0", this.Sp.appendChild(s), this.Vv = as(s, (0, _fancyCanvas.size)({
      width: 16,
      height: 16
    })), this.Vv.subscribeSuggestedBitmapSizeChanged(this.yv);
    const e = this.Vv.canvasElement;
    e.style.position = "absolute", e.style.zIndex = "1", e.style.left = "0", e.style.top = "0", this.Bv = as(s, (0, _fancyCanvas.size)({
      width: 16,
      height: 16
    })), this.Bv.subscribeSuggestedBitmapSizeChanged(this.Tv);
    const r = this.Bv.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "2", r.style.left = "0", r.style.top = "0", this.Cp = document.createElement("tr"), this.Cp.appendChild(this.kp), this.Cp.appendChild(this.Sp), this.Cp.appendChild(this.yp), this.Tp(), this.jv = new fs(this.Bv.canvasElement, this, {
      Ff: () => null === this.pp && !this.Mp.W().handleScroll.vertTouchDrag,
      Wf: () => null === this.pp && !this.Mp.W().handleScroll.horzTouchDrag
    });
  }
  S() {
    null !== this.ap && this.ap.S(), null !== this.op && this.op.S(), this.Bv.unsubscribeSuggestedBitmapSizeChanged(this.Tv), os(this.Bv.canvasElement), this.Bv.dispose(), this.Vv.unsubscribeSuggestedBitmapSizeChanged(this.yv), os(this.Vv.canvasElement), this.Vv.dispose(), null !== this.gp && this.gp.I_().p(this), this.jv.S();
  }
  Zv() {
    return b(this.gp);
  }
  Pp(t) {
    null !== this.gp && this.gp.I_().p(this), this.gp = t, null !== this.gp && this.gp.I_().l(Ps.prototype.xp.bind(this), this, !0), this.Tp();
  }
  Cv() {
    return this.Mp;
  }
  Hv() {
    return this.Cp;
  }
  Tp() {
    if (null !== this.gp && (this.Rp(), 0 !== this.Hi().wt().length)) {
      if (null !== this.ap) {
        const t = this.gp.S_();
        this.ap.Zi(b(t));
      }
      if (null !== this.op) {
        const t = this.gp.k_();
        this.op.Zi(b(t));
      }
    }
  }
  Dp() {
    null !== this.ap && this.ap.bt(), null !== this.op && this.op.bt();
  }
  v_() {
    return null !== this.gp ? this.gp.v_() : 0;
  }
  p_(t) {
    this.gp && this.gp.p_(t);
  }
  If(t) {
    if (!this.gp) return;
    this.Op();
    const i = t.localX,
      n = t.localY;
    this.Ap(i, n, t);
  }
  tv(t) {
    this.Op(), this.Vp(), this.Ap(t.localX, t.localY, t);
  }
  zf(t) {
    var i;
    if (!this.gp) return;
    this.Op();
    const n = t.localX,
      s = t.localY;
    this.Ap(n, s, t);
    const e = this.pr(n, s);
    this.Mp.Bp(null !== (i = null == e ? void 0 : e.wv) && void 0 !== i ? i : null), this.Hi().Ic(e && {
      zc: e.zc,
      mv: e.mv
    });
  }
  Kf(t) {
    null !== this.gp && (this.Op(), this.Ip(t));
  }
  Pf(t) {
    null !== this.gp && this.zp(this.dp, t);
  }
  kf(t) {
    this.Pf(t);
  }
  $f(t) {
    this.Op(), this.Lp(t), this.Ap(t.localX, t.localY, t);
  }
  Xf(t) {
    null !== this.gp && (this.Op(), this.vp = !1, this.Ep(t));
  }
  Yf(t) {
    null !== this.gp && this.Ip(t);
  }
  uv(t) {
    if (this.vp = !0, null === this.pp) {
      const i = {
        x: t.localX,
        y: t.localY
      };
      this.Np(i, i, t);
    }
  }
  _v(t) {
    null !== this.gp && (this.Op(), this.gp.$t().Ic(null), this.Fp());
  }
  Wp() {
    return this.cp;
  }
  jp() {
    return this.dp;
  }
  ev() {
    this.fp = 1, this.Hi().Hn();
  }
  rv(t, i) {
    if (!this.Mp.W().handleScale.pinch) return;
    const n = 5 * (i - this.fp);
    this.fp = i, this.Hi().qc(t.nt, n);
  }
  Jf(t) {
    this.vp = !1, this.mp = null !== this.pp, this.Vp();
    const i = this.Hi().Wc();
    null !== this.pp && i.yt() && (this.bp = {
      x: i.Yt(),
      y: i.Xt()
    }, this.pp = {
      x: t.localX,
      y: t.localY
    });
  }
  jf(t) {
    if (null === this.gp) return;
    const i = t.localX,
      n = t.localY;
    if (null === this.pp) this.Lp(t);else {
      this.mp = !1;
      const s = b(this.bp),
        e = s.x + (i - this.pp.x),
        r = s.y + (n - this.pp.y);
      this.Ap(e, r, t);
    }
  }
  qf(t) {
    0 === this.Cv().W().trackingMode.exitMode && (this.mp = !0), this.Hp(), this.Ep(t);
  }
  pr(t, i) {
    const n = this.gp;
    return null === n ? null : function (t, i, n) {
      const s = t.No(),
        e = function (t, i, n) {
          var s, e;
          let r, h;
          for (const o of t) {
            const t = null !== (e = null === (s = o.oa) || void 0 === s ? void 0 : s.call(o, i, n)) && void 0 !== e ? e : [];
            for (const i of t) l = i.zOrder, (!(a = null == r ? void 0 : r.zOrder) || "top" === l && "top" !== a || "normal" === l && "bottom" === a) && (r = i, h = o);
          }
          var l, a;
          return r && h ? {
            bv: r,
            zc: h
          } : null;
        }(s, i, n);
      if ("top" === (null == e ? void 0 : e.bv.zOrder)) return gs(e);
      for (const r of s) {
        if (e && e.zc === r && "bottom" !== e.bv.zOrder && !e.bv.isBackground) return gs(e);
        const s = Ms(r.Cn(t), i, n);
        if (null !== s) return {
          zc: r,
          vv: s.vv,
          mv: s.mv
        };
        if (e && e.zc === r && "bottom" !== e.bv.zOrder && e.bv.isBackground) return gs(e);
      }
      return (null == e ? void 0 : e.bv) ? gs(e) : null;
    }(n, t, i);
  }
  $p(i, n) {
    b("left" === n ? this.ap : this.op).Xv((0, _fancyCanvas.size)({
      width: i,
      height: this.gv.height
    }));
  }
  Up() {
    return this.gv;
  }
  Xv(t) {
    (0, _fancyCanvas.equalSizes)(this.gv, t) || (this.gv = t, this.kv = !0, this.Vv.resizeCanvasElement(t), this.Bv.resizeCanvasElement(t), this.kv = !1, this.Sp.style.width = t.width + "px", this.Sp.style.height = t.height + "px");
  }
  qp() {
    const t = b(this.gp);
    t.x_(t.S_()), t.x_(t.k_());
    for (const i of t.Ta()) if (t.ur(i)) {
      const n = i.Dt();
      null !== n && t.x_(n), i.Rn();
    }
  }
  ep() {
    return this.Vv.bitmapSize;
  }
  rp(t, i, n) {
    const s = this.ep();
    s.width > 0 && s.height > 0 && t.drawImage(this.Vv.canvasElement, i, n);
  }
  Gv(t) {
    if (0 === t) return;
    if (null === this.gp) return;
    if (t > 1 && this.qp(), null !== this.ap && this.ap.Gv(t), null !== this.op && this.op.Gv(t), 1 !== t) {
      this.Vv.applySuggestedBitmapSize();
      const t = (0, _fancyCanvas.tryCreateCanvasRenderingTarget2D)(this.Vv);
      null !== t && (t.useBitmapCoordinateSpace(t => {
        this.Qv(t);
      }), this.gp && (this.Yp(t, ks), this.Xp(t), this.Kp(t), this.Yp(t, ys), this.Yp(t, Cs)));
    }
    this.Bv.applySuggestedBitmapSize();
    const i = (0, _fancyCanvas.tryCreateCanvasRenderingTarget2D)(this.Bv);
    null !== i && (i.useBitmapCoordinateSpace(({
      context: t,
      bitmapSize: i
    }) => {
      t.clearRect(0, 0, i.width, i.height);
    }), this.Zp(i), this.Yp(i, Ts));
  }
  Gp() {
    return this.ap;
  }
  Jp() {
    return this.op;
  }
  tp(t, i) {
    this.Yp(t, i);
  }
  xp() {
    null !== this.gp && this.gp.I_().p(this), this.gp = null;
  }
  Ip(t) {
    this.zp(this.cp, t);
  }
  zp(t, i) {
    const n = i.localX,
      s = i.localY;
    t.M() && t.m(this.Hi().St().Vu(n), {
      x: n,
      y: s
    }, i);
  }
  Qv({
    context: t,
    bitmapSize: i
  }) {
    const {
        width: n,
        height: s
      } = i,
      e = this.Hi(),
      r = e.q(),
      h = e._d();
    r === h ? Z(t, 0, 0, n, s, h) : tt(t, 0, 0, n, s, r, h);
  }
  Xp(t) {
    const i = b(this.gp).z_().Fh().gt();
    null !== i && i.K(t, !1);
  }
  Kp(t) {
    const i = this.Hi().Fc();
    this.Qp(t, ys, _s, i), this.Qp(t, ys, us, i);
  }
  Zp(t) {
    this.Qp(t, ys, us, this.Hi().Wc());
  }
  Yp(t, i) {
    const n = b(this.gp).No();
    for (const s of n) this.Qp(t, i, _s, s);
    for (const s of n) this.Qp(t, i, us, s);
  }
  Qp(t, i, n, s) {
    const e = b(this.gp),
      r = e.$t().Bc(),
      h = null !== r && r.zc === s,
      l = null !== r && h && void 0 !== r.mv ? r.mv.br : void 0;
    cs(i, i => n(i, t, h, l), s, e);
  }
  Rp() {
    if (null === this.gp) return;
    const t = this.Mp,
      i = this.gp.S_().W().visible,
      n = this.gp.k_().W().visible;
    i || null === this.ap || (this.kp.removeChild(this.ap.Hv()), this.ap.S(), this.ap = null), n || null === this.op || (this.yp.removeChild(this.op.Hv()), this.op.S(), this.op = null);
    const s = t.$t().ed();
    i && null === this.ap && (this.ap = new Ss(this, t.W(), s, "left"), this.kp.appendChild(this.ap.Hv())), n && null === this.op && (this.op = new Ss(this, t.W(), s, "right"), this.yp.appendChild(this.op.Hv()));
  }
  tm(t) {
    return t.cv && this.vp || null !== this.pp;
  }
  im(t) {
    return Math.max(0, Math.min(t, this.gv.width - 1));
  }
  nm(t) {
    return Math.max(0, Math.min(t, this.gv.height - 1));
  }
  Ap(t, i, n) {
    this.Hi().Qc(this.im(t), this.nm(i), n, b(this.gp));
  }
  Fp() {
    this.Hi().nd();
  }
  Hp() {
    this.mp && (this.pp = null, this.Fp());
  }
  Np(t, i, n) {
    this.pp = t, this.mp = !1, this.Ap(i.x, i.y, n);
    const s = this.Hi().Wc();
    this.bp = {
      x: s.Yt(),
      y: s.Xt()
    };
  }
  Hi() {
    return this.Mp.$t();
  }
  Ep(t) {
    if (!this.up) return;
    const i = this.Hi(),
      n = this.Zv();
    if (i.D_(n, n.dn()), this._p = null, this.up = !1, i.Zc(), null !== this.wp) {
      const t = performance.now(),
        n = i.St();
      this.wp.Pr(n.Lu(), t), this.wp.Yu(t) || i.qn(this.wp);
    }
  }
  Op() {
    this.pp = null;
  }
  Vp() {
    if (!this.gp) return;
    if (this.Hi().Hn(), document.activeElement !== document.body && document.activeElement !== document.documentElement) b(document.activeElement).blur();else {
      const t = document.getSelection();
      null !== t && t.removeAllRanges();
    }
    !this.gp.dn().Ei() && this.Hi().St().Ei();
  }
  Lp(t) {
    if (null === this.gp) return;
    const i = this.Hi(),
      n = i.St();
    if (n.Ei()) return;
    const s = this.Mp.W(),
      e = s.handleScroll,
      r = s.kineticScroll;
    if ((!e.pressedMouseMove || t.cv) && (!e.horzTouchDrag && !e.vertTouchDrag || !t.cv)) return;
    const h = this.gp.dn(),
      l = performance.now();
    if (null !== this._p || this.tm(t) || (this._p = {
      x: t.clientX,
      y: t.clientY,
      yd: l,
      sm: t.localX,
      rm: t.localY
    }), null !== this._p && !this.up && (this._p.x !== t.clientX || this._p.y !== t.clientY)) {
      if (t.cv && r.touch || !t.cv && r.mouse) {
        const t = n.ee();
        this.wp = new ls(.2 / t, 7 / t, .997, 15 / t), this.wp.Fd(n.Lu(), this._p.yd);
      } else this.wp = null;
      h.Ei() || i.P_(this.gp, h, t.localY), i.Xc(t.localX), this.up = !0;
    }
    this.up && (h.Ei() || i.R_(this.gp, h, t.localY), i.Kc(t.localX), null !== this.wp && this.wp.Fd(n.Lu(), l));
  }
}
class Rs {
  constructor(i, n, s, e, r) {
    this.ft = !0, this.gv = (0, _fancyCanvas.size)({
      width: 0,
      height: 0
    }), this.yv = () => this.Gv(3), this.Pv = "left" === i, this.yc = s.ed, this._n = n, this.hm = e, this.lm = r, this.Av = document.createElement("div"), this.Av.style.width = "25px", this.Av.style.height = "100%", this.Av.style.overflow = "hidden", this.Vv = as(this.Av, (0, _fancyCanvas.size)({
      width: 16,
      height: 16
    })), this.Vv.subscribeSuggestedBitmapSizeChanged(this.yv);
  }
  S() {
    this.Vv.unsubscribeSuggestedBitmapSizeChanged(this.yv), os(this.Vv.canvasElement), this.Vv.dispose();
  }
  Hv() {
    return this.Av;
  }
  Up() {
    return this.gv;
  }
  Xv(t) {
    (0, _fancyCanvas.equalSizes)(this.gv, t) || (this.gv = t, this.Vv.resizeCanvasElement(t), this.Av.style.width = `${t.width}px`, this.Av.style.height = `${t.height}px`, this.ft = !0);
  }
  Gv(t) {
    if (t < 3 && !this.ft) return;
    if (0 === this.gv.width || 0 === this.gv.height) return;
    this.ft = !1, this.Vv.applySuggestedBitmapSize();
    const i = (0, _fancyCanvas.tryCreateCanvasRenderingTarget2D)(this.Vv);
    null !== i && i.useBitmapCoordinateSpace(t => {
      this.Qv(t), this.Ae(t);
    });
  }
  ep() {
    return this.Vv.bitmapSize;
  }
  rp(t, i, n) {
    const s = this.ep();
    s.width > 0 && s.height > 0 && t.drawImage(this.Vv.canvasElement, i, n);
  }
  Ae({
    context: t,
    bitmapSize: i,
    horizontalPixelRatio: n,
    verticalPixelRatio: s
  }) {
    if (!this.hm()) return;
    t.fillStyle = this._n.timeScale.borderColor;
    const e = Math.floor(this.yc.W().C * n),
      r = Math.floor(this.yc.W().C * s),
      h = this.Pv ? i.width - e : 0;
    t.fillRect(h, 0, e, r);
  }
  Qv({
    context: t,
    bitmapSize: i
  }) {
    Z(t, 0, 0, i.width, i.height, this.lm());
  }
}
function Ds(t) {
  return i => {
    var n, s;
    return null !== (s = null === (n = i.aa) || void 0 === n ? void 0 : n.call(i, t)) && void 0 !== s ? s : [];
  };
}
const Os = Ds("normal"),
  As = Ds("top"),
  Vs = Ds("bottom");
class Bs {
  constructor(i, n) {
    this.am = null, this.om = null, this.k = null, this._m = !1, this.gv = (0, _fancyCanvas.size)({
      width: 0,
      height: 0
    }), this.um = new R(), this.xv = new ni(5), this.kv = !1, this.yv = () => {
      this.kv || this.Mp.$t().Nh();
    }, this.Tv = () => {
      this.kv || this.Mp.$t().Nh();
    }, this.Mp = i, this.N_ = n, this._n = i.W().layout, this.dm = document.createElement("tr"), this.fm = document.createElement("td"), this.fm.style.padding = "0", this.vm = document.createElement("td"), this.vm.style.padding = "0", this.Av = document.createElement("td"), this.Av.style.height = "25px", this.Av.style.padding = "0", this.pm = document.createElement("div"), this.pm.style.width = "100%", this.pm.style.height = "100%", this.pm.style.position = "relative", this.pm.style.overflow = "hidden", this.Av.appendChild(this.pm), this.Vv = as(this.pm, (0, _fancyCanvas.size)({
      width: 16,
      height: 16
    })), this.Vv.subscribeSuggestedBitmapSizeChanged(this.yv);
    const s = this.Vv.canvasElement;
    s.style.position = "absolute", s.style.zIndex = "1", s.style.left = "0", s.style.top = "0", this.Bv = as(this.pm, (0, _fancyCanvas.size)({
      width: 16,
      height: 16
    })), this.Bv.subscribeSuggestedBitmapSizeChanged(this.Tv);
    const e = this.Bv.canvasElement;
    e.style.position = "absolute", e.style.zIndex = "2", e.style.left = "0", e.style.top = "0", this.dm.appendChild(this.fm), this.dm.appendChild(this.Av), this.dm.appendChild(this.vm), this.bm(), this.Mp.$t().f_().l(this.bm.bind(this), this), this.jv = new fs(this.Bv.canvasElement, this, {
      Ff: () => !0,
      Wf: () => !this.Mp.W().handleScroll.horzTouchDrag
    });
  }
  S() {
    this.jv.S(), null !== this.am && this.am.S(), null !== this.om && this.om.S(), this.Bv.unsubscribeSuggestedBitmapSizeChanged(this.Tv), os(this.Bv.canvasElement), this.Bv.dispose(), this.Vv.unsubscribeSuggestedBitmapSizeChanged(this.yv), os(this.Vv.canvasElement), this.Vv.dispose();
  }
  Hv() {
    return this.dm;
  }
  wm() {
    return this.am;
  }
  gm() {
    return this.om;
  }
  tv(t) {
    if (this._m) return;
    this._m = !0;
    const i = this.Mp.$t();
    !i.St().Ei() && this.Mp.W().handleScale.axisPressedMouseMove.time && i.Uc(t.localX);
  }
  Jf(t) {
    this.tv(t);
  }
  iv() {
    const t = this.Mp.$t();
    !t.St().Ei() && this._m && (this._m = !1, this.Mp.W().handleScale.axisPressedMouseMove.time && t.Jc());
  }
  $f(t) {
    const i = this.Mp.$t();
    !i.St().Ei() && this.Mp.W().handleScale.axisPressedMouseMove.time && i.Gc(t.localX);
  }
  jf(t) {
    this.$f(t);
  }
  Xf() {
    this._m = !1;
    const t = this.Mp.$t();
    t.St().Ei() && !this.Mp.W().handleScale.axisPressedMouseMove.time || t.Jc();
  }
  qf() {
    this.Xf();
  }
  Pf() {
    this.Mp.W().handleScale.axisDoubleClickReset.time && this.Mp.$t().Xn();
  }
  kf() {
    this.Pf();
  }
  If() {
    this.Mp.$t().W().handleScale.axisPressedMouseMove.time && this.hp(1);
  }
  _v() {
    this.hp(0);
  }
  Up() {
    return this.gv;
  }
  Mm() {
    return this.um;
  }
  xm(i, s, e) {
    (0, _fancyCanvas.equalSizes)(this.gv, i) || (this.gv = i, this.kv = !0, this.Vv.resizeCanvasElement(i), this.Bv.resizeCanvasElement(i), this.kv = !1, this.Av.style.width = `${i.width}px`, this.Av.style.height = `${i.height}px`, this.um.m(i)), null !== this.am && this.am.Xv((0, _fancyCanvas.size)({
      width: s,
      height: i.height
    })), null !== this.om && this.om.Xv((0, _fancyCanvas.size)({
      width: e,
      height: i.height
    }));
  }
  Sm() {
    const t = this.km();
    return Math.ceil(t.C + t.T + t.P + t.L + t.V + t.ym);
  }
  bt() {
    this.Mp.$t().St().La();
  }
  ep() {
    return this.Vv.bitmapSize;
  }
  rp(t, i, n) {
    const s = this.ep();
    s.width > 0 && s.height > 0 && t.drawImage(this.Vv.canvasElement, i, n);
  }
  Gv(t) {
    if (0 === t) return;
    if (1 !== t) {
      this.Vv.applySuggestedBitmapSize();
      const i = (0, _fancyCanvas.tryCreateCanvasRenderingTarget2D)(this.Vv);
      null !== i && (i.useBitmapCoordinateSpace(t => {
        this.Qv(t), this.Ae(t), this.Cm(i, Vs);
      }), this.ip(i), this.Cm(i, Os)), null !== this.am && this.am.Gv(t), null !== this.om && this.om.Gv(t);
    }
    this.Bv.applySuggestedBitmapSize();
    const i = (0, _fancyCanvas.tryCreateCanvasRenderingTarget2D)(this.Bv);
    null !== i && (i.useBitmapCoordinateSpace(({
      context: t,
      bitmapSize: i
    }) => {
      t.clearRect(0, 0, i.width, i.height);
    }), this.Tm([...this.Mp.$t().wt(), this.Mp.$t().Wc()], i), this.Cm(i, As));
  }
  Cm(t, i) {
    const n = this.Mp.$t().wt();
    for (const s of n) cs(i, i => _s(i, t, !1, void 0), s, void 0);
    for (const s of n) cs(i, i => us(i, t, !1, void 0), s, void 0);
  }
  Qv({
    context: t,
    bitmapSize: i
  }) {
    Z(t, 0, 0, i.width, i.height, this.Mp.$t()._d());
  }
  Ae({
    context: t,
    bitmapSize: i,
    verticalPixelRatio: n
  }) {
    if (this.Mp.W().timeScale.borderVisible) {
      t.fillStyle = this.Pm();
      const s = Math.max(1, Math.floor(this.km().C * n));
      t.fillRect(0, 0, i.width, s);
    }
  }
  ip(t) {
    const i = this.Mp.$t().St(),
      n = i.La();
    if (!n || 0 === n.length) return;
    const s = this.N_.maxTickMarkWeight(n),
      e = this.km(),
      r = i.W();
    r.borderVisible && r.ticksVisible && t.useBitmapCoordinateSpace(({
      context: t,
      horizontalPixelRatio: i,
      verticalPixelRatio: s
    }) => {
      t.strokeStyle = this.Pm(), t.fillStyle = this.Pm();
      const r = Math.max(1, Math.floor(i)),
        h = Math.floor(.5 * i);
      t.beginPath();
      const l = Math.round(e.T * s);
      for (let s = n.length; s--;) {
        const e = Math.round(n[s].coord * i);
        t.rect(e - h, 0, r, l);
      }
      t.fill();
    }), t.useMediaCoordinateSpace(({
      context: t
    }) => {
      const i = e.C + e.T + e.L + e.P / 2;
      t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = this.$(), t.font = this.qv();
      for (const e of n) if (e.weight < s) {
        const n = e.needAlignCoordinate ? this.Rm(t, e.coord, e.label) : e.coord;
        t.fillText(e.label, n, i);
      }
      this.Mp.W().timeScale.allowBoldLabels && (t.font = this.Dm());
      for (const e of n) if (e.weight >= s) {
        const n = e.needAlignCoordinate ? this.Rm(t, e.coord, e.label) : e.coord;
        t.fillText(e.label, n, i);
      }
    });
  }
  Rm(t, i, n) {
    const s = this.xv.Mi(t, n),
      e = s / 2,
      r = Math.floor(i - e) + .5;
    return r < 0 ? i += Math.abs(0 - r) : r + s > this.gv.width && (i -= Math.abs(this.gv.width - (r + s))), i;
  }
  Tm(t, i) {
    const n = this.km();
    for (const s of t) for (const t of s.Ji()) t.gt().K(i, n);
  }
  Pm() {
    return this.Mp.W().timeScale.borderColor;
  }
  $() {
    return this._n.textColor;
  }
  j() {
    return this._n.fontSize;
  }
  qv() {
    return N(this.j(), this._n.fontFamily);
  }
  Dm() {
    return N(this.j(), this._n.fontFamily, "bold");
  }
  km() {
    null === this.k && (this.k = {
      C: 1,
      N: NaN,
      L: NaN,
      V: NaN,
      Wi: NaN,
      T: 5,
      P: NaN,
      R: "",
      Fi: new ni(),
      ym: 0
    });
    const t = this.k,
      i = this.qv();
    if (t.R !== i) {
      const n = this.j();
      t.P = n, t.R = i, t.L = 3 * n / 12, t.V = 3 * n / 12, t.Wi = 9 * n / 12, t.N = 0, t.ym = 4 * n / 12, t.Fi.Qe();
    }
    return this.k;
  }
  hp(t) {
    this.Av.style.cursor = 1 === t ? "ew-resize" : "default";
  }
  bm() {
    const t = this.Mp.$t(),
      i = t.W();
    i.leftPriceScale.visible || null === this.am || (this.fm.removeChild(this.am.Hv()), this.am.S(), this.am = null), i.rightPriceScale.visible || null === this.om || (this.vm.removeChild(this.om.Hv()), this.om.S(), this.om = null);
    const n = {
        ed: this.Mp.$t().ed()
      },
      s = () => i.leftPriceScale.borderVisible && t.St().W().borderVisible,
      e = () => t._d();
    i.leftPriceScale.visible && null === this.am && (this.am = new Rs("left", i, n, s, e), this.fm.appendChild(this.am.Hv())), i.rightPriceScale.visible && null === this.om && (this.om = new Rs("right", i, n, s, e), this.vm.appendChild(this.om.Hv()));
  }
}
const Is = !!is && !!navigator.userAgentData && navigator.userAgentData.brands.some(t => t.brand.includes("Chromium")) && !!is && ((null === (zs = null === navigator || void 0 === navigator ? void 0 : navigator.userAgentData) || void 0 === zs ? void 0 : zs.platform) ? "Windows" === navigator.userAgentData.platform : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
var zs;
class Ls {
  constructor(t, i, n) {
    var s;
    this.Om = [], this.Am = 0, this.Qa = 0, this.e_ = 0, this.Vm = 0, this.Bm = 0, this.Im = null, this.zm = !1, this.cp = new R(), this.dp = new R(), this.xc = new R(), this.Lm = null, this.Em = null, this.Nm = t, this._n = i, this.N_ = n, this.dm = document.createElement("div"), this.dm.classList.add("tv-lightweight-charts"), this.dm.style.overflow = "hidden", this.dm.style.direction = "ltr", this.dm.style.width = "100%", this.dm.style.height = "100%", (s = this.dm).style.userSelect = "none", s.style.webkitUserSelect = "none", s.style.msUserSelect = "none", s.style.MozUserSelect = "none", s.style.webkitTapHighlightColor = "transparent", this.Fm = document.createElement("table"), this.Fm.setAttribute("cellspacing", "0"), this.dm.appendChild(this.Fm), this.Wm = this.jm.bind(this), Es(this._n) && this.Hm(!0), this.Hi = new zn(this.kc.bind(this), this._n, n), this.$t().jc().l(this.$m.bind(this), this), this.Um = new Bs(this, this.N_), this.Fm.appendChild(this.Um.Hv());
    const e = i.autoSize && this.qm();
    let r = this._n.width,
      h = this._n.height;
    if (e || 0 === r || 0 === h) {
      const i = t.getBoundingClientRect();
      r = r || i.width, h = h || i.height;
    }
    this.Ym(r, h), this.Xm(), t.appendChild(this.dm), this.Km(), this.Hi.St().Gu().l(this.Hi.$l.bind(this.Hi), this), this.Hi.f_().l(this.Hi.$l.bind(this.Hi), this);
  }
  $t() {
    return this.Hi;
  }
  W() {
    return this._n;
  }
  Zm() {
    return this.Om;
  }
  Gm() {
    return this.Um;
  }
  S() {
    this.Hm(!1), 0 !== this.Am && window.cancelAnimationFrame(this.Am), this.Hi.jc().p(this), this.Hi.St().Gu().p(this), this.Hi.f_().p(this), this.Hi.S();
    for (const t of this.Om) this.Fm.removeChild(t.Hv()), t.Wp().p(this), t.jp().p(this), t.S();
    this.Om = [], b(this.Um).S(), null !== this.dm.parentElement && this.dm.parentElement.removeChild(this.dm), this.xc.S(), this.cp.S(), this.dp.S(), this.Jm();
  }
  Ym(i, n, s = !1) {
    if (this.Qa === n && this.e_ === i) return;
    const e = function (i) {
      const n = Math.floor(i.width),
        s = Math.floor(i.height);
      return (0, _fancyCanvas.size)({
        width: n - n % 2,
        height: s - s % 2
      });
    }((0, _fancyCanvas.size)({
      width: i,
      height: n
    }));
    this.Qa = e.height, this.e_ = e.width;
    const r = this.Qa + "px",
      h = this.e_ + "px";
    b(this.dm).style.height = r, b(this.dm).style.width = h, this.Fm.style.height = r, this.Fm.style.width = h, s ? this.Qm(ut.ns(), performance.now()) : this.Hi.$l();
  }
  Gv(t) {
    void 0 === t && (t = ut.ns());
    for (let i = 0; i < this.Om.length; i++) this.Om[i].Gv(t.Wn(i).En);
    this._n.timeScale.visible && this.Um.Gv(t.Fn());
  }
  Eh(t) {
    const i = Es(this._n);
    this.Hi.Eh(t);
    const n = Es(this._n);
    n !== i && this.Hm(n), this.Km(), this.tb(t);
  }
  Wp() {
    return this.cp;
  }
  jp() {
    return this.dp;
  }
  jc() {
    return this.xc;
  }
  ib() {
    null !== this.Im && (this.Qm(this.Im, performance.now()), this.Im = null);
    const t = this.nb(null),
      i = document.createElement("canvas");
    i.width = t.width, i.height = t.height;
    const n = b(i.getContext("2d"));
    return this.nb(n), i;
  }
  sb(t) {
    if ("left" === t && !this.eb()) return 0;
    if ("right" === t && !this.rb()) return 0;
    if (0 === this.Om.length) return 0;
    return b("left" === t ? this.Om[0].Gp() : this.Om[0].Jp()).Kv();
  }
  hb() {
    return this._n.autoSize && null !== this.Lm;
  }
  lb() {
    return this.dm;
  }
  Bp(t) {
    this.Em = t, this.Em ? this.lb().style.setProperty("cursor", t) : this.lb().style.removeProperty("cursor");
  }
  ab() {
    return this.Em;
  }
  ob() {
    return m(this.Om[0]).Up();
  }
  tb(t) {
    (void 0 !== t.autoSize || !this.Lm || void 0 === t.width && void 0 === t.height) && (t.autoSize && !this.Lm && this.qm(), !1 === t.autoSize && null !== this.Lm && this.Jm(), t.autoSize || void 0 === t.width && void 0 === t.height || this.Ym(t.width || this.e_, t.height || this.Qa));
  }
  nb(i) {
    let n = 0,
      s = 0;
    const e = this.Om[0],
      r = (t, n) => {
        let s = 0;
        for (let e = 0; e < this.Om.length; e++) {
          const r = this.Om[e],
            h = b("left" === t ? r.Gp() : r.Jp()),
            l = h.ep();
          null !== i && h.rp(i, n, s), s += l.height;
        }
      };
    if (this.eb()) {
      r("left", 0);
      n += b(e.Gp()).ep().width;
    }
    for (let t = 0; t < this.Om.length; t++) {
      const e = this.Om[t],
        r = e.ep();
      null !== i && e.rp(i, n, s), s += r.height;
    }
    if (n += e.ep().width, this.rb()) {
      r("right", n);
      n += b(e.Jp()).ep().width;
    }
    const h = (t, n, s) => {
      b("left" === t ? this.Um.wm() : this.Um.gm()).rp(b(i), n, s);
    };
    if (this._n.timeScale.visible) {
      const t = this.Um.ep();
      if (null !== i) {
        let n = 0;
        this.eb() && (h("left", n, s), n = b(e.Gp()).ep().width), this.Um.rp(i, n, s), n += t.width, this.rb() && h("right", n, s);
      }
      s += t.height;
    }
    return (0, _fancyCanvas.size)({
      width: n,
      height: s
    });
  }
  _b() {
    let i = 0,
      n = 0,
      s = 0;
    for (const t of this.Om) this.eb() && (n = Math.max(n, b(t.Gp()).Uv(), this._n.leftPriceScale.minimumWidth)), this.rb() && (s = Math.max(s, b(t.Jp()).Uv(), this._n.rightPriceScale.minimumWidth)), i += t.v_();
    n = es(n), s = es(s);
    const e = this.e_,
      r = this.Qa,
      h = Math.max(e - n - s, 0),
      l = this._n.timeScale.visible;
    let a = l ? Math.max(this.Um.Sm(), this._n.timeScale.minimumHeight) : 0;
    var o;
    a = (o = a) + o % 2;
    const _ = 0 + a,
      u = r < _ ? 0 : r - _,
      c = u / i;
    let d = 0;
    for (let i = 0; i < this.Om.length; ++i) {
      const e = this.Om[i];
      e.Pp(this.Hi.Nc()[i]);
      let r = 0,
        l = 0;
      l = i === this.Om.length - 1 ? u - d : Math.round(e.v_() * c), r = Math.max(l, 2), d += r, e.Xv((0, _fancyCanvas.size)({
        width: h,
        height: r
      })), this.eb() && e.$p(n, "left"), this.rb() && e.$p(s, "right"), e.Zv() && this.Hi.Hc(e.Zv(), r);
    }
    this.Um.xm((0, _fancyCanvas.size)({
      width: l ? h : 0,
      height: a
    }), l ? n : 0, l ? s : 0), this.Hi.m_(h), this.Vm !== n && (this.Vm = n), this.Bm !== s && (this.Bm = s);
  }
  Hm(t) {
    t ? this.dm.addEventListener("wheel", this.Wm, {
      passive: !1
    }) : this.dm.removeEventListener("wheel", this.Wm);
  }
  ub(t) {
    switch (t.deltaMode) {
      case t.DOM_DELTA_PAGE:
        return 120;
      case t.DOM_DELTA_LINE:
        return 32;
    }
    return Is ? 1 / window.devicePixelRatio : 1;
  }
  jm(t) {
    if (!(0 !== t.deltaX && this._n.handleScroll.mouseWheel || 0 !== t.deltaY && this._n.handleScale.mouseWheel)) return;
    const i = this.ub(t),
      n = i * t.deltaX / 100,
      s = -i * t.deltaY / 100;
    if (t.cancelable && t.preventDefault(), 0 !== s && this._n.handleScale.mouseWheel) {
      const i = Math.sign(s) * Math.min(1, Math.abs(s)),
        n = t.clientX - this.dm.getBoundingClientRect().left;
      this.$t().qc(n, i);
    }
    0 !== n && this._n.handleScroll.mouseWheel && this.$t().Yc(-80 * n);
  }
  Qm(t, i) {
    var n;
    const s = t.Fn();
    3 === s && this.cb(), 3 !== s && 2 !== s || (this.fb(t), this.vb(t, i), this.Um.bt(), this.Om.forEach(t => {
      t.Dp();
    }), 3 === (null === (n = this.Im) || void 0 === n ? void 0 : n.Fn()) && (this.Im.Jn(t), this.cb(), this.fb(this.Im), this.vb(this.Im, i), t = this.Im, this.Im = null)), this.Gv(t);
  }
  vb(t, i) {
    for (const n of t.Gn()) this.Qn(n, i);
  }
  fb(t) {
    const i = this.Hi.Nc();
    for (let n = 0; n < i.length; n++) t.Wn(n).Nn && i[n].V_();
  }
  Qn(t, i) {
    const n = this.Hi.St();
    switch (t.$n) {
      case 0:
        n.Qu();
        break;
      case 1:
        n.tc(t.Ot);
        break;
      case 2:
        n.Kn(t.Ot);
        break;
      case 3:
        n.Zn(t.Ot);
        break;
      case 4:
        n.Fu();
        break;
      case 5:
        t.Ot.Yu(i) || n.Zn(t.Ot.Xu(i));
    }
  }
  kc(t) {
    null !== this.Im ? this.Im.Jn(t) : this.Im = t, this.zm || (this.zm = !0, this.Am = window.requestAnimationFrame(t => {
      if (this.zm = !1, this.Am = 0, null !== this.Im) {
        const i = this.Im;
        this.Im = null, this.Qm(i, t);
        for (const n of i.Gn()) if (5 === n.$n && !n.Ot.Yu(t)) {
          this.$t().qn(n.Ot);
          break;
        }
      }
    }));
  }
  cb() {
    this.Xm();
  }
  Xm() {
    const t = this.Hi.Nc(),
      i = t.length,
      n = this.Om.length;
    for (let t = i; t < n; t++) {
      const t = m(this.Om.pop());
      this.Fm.removeChild(t.Hv()), t.Wp().p(this), t.jp().p(this), t.S();
    }
    for (let s = n; s < i; s++) {
      const i = new Ps(this, t[s]);
      i.Wp().l(this.pb.bind(this), this), i.jp().l(this.mb.bind(this), this), this.Om.push(i), this.Fm.insertBefore(i.Hv(), this.Um.Hv());
    }
    for (let n = 0; n < i; n++) {
      const i = t[n],
        s = this.Om[n];
      s.Zv() !== i ? s.Pp(i) : s.Tp();
    }
    this.Km(), this._b();
  }
  bb(t, i, n) {
    var s;
    const e = new Map();
    if (null !== t) {
      this.Hi.wt().forEach(i => {
        const n = i.Vn().il(t);
        null !== n && e.set(i, n);
      });
    }
    let r;
    if (null !== t) {
      const i = null === (s = this.Hi.St().$i(t)) || void 0 === s ? void 0 : s.originalTime;
      void 0 !== i && (r = i);
    }
    const h = this.$t().Bc(),
      l = null !== h && h.zc instanceof Zi ? h.zc : void 0,
      a = null !== h && void 0 !== h.mv ? h.mv.mr : void 0;
    return {
      wb: r,
      ie: null != t ? t : void 0,
      gb: null != i ? i : void 0,
      Mb: l,
      xb: e,
      Sb: a,
      kb: null != n ? n : void 0
    };
  }
  pb(t, i, n) {
    this.cp.m(() => this.bb(t, i, n));
  }
  mb(t, i, n) {
    this.dp.m(() => this.bb(t, i, n));
  }
  $m(t, i, n) {
    this.xc.m(() => this.bb(t, i, n));
  }
  Km() {
    const t = this._n.timeScale.visible ? "" : "none";
    this.Um.Hv().style.display = t;
  }
  eb() {
    return this.Om[0].Zv().S_().W().visible;
  }
  rb() {
    return this.Om[0].Zv().k_().W().visible;
  }
  qm() {
    return "ResizeObserver" in window && (this.Lm = new ResizeObserver(t => {
      const i = t.find(t => t.target === this.Nm);
      i && this.Ym(i.contentRect.width, i.contentRect.height);
    }), this.Lm.observe(this.Nm, {
      box: "border-box"
    }), !0);
  }
  Jm() {
    null !== this.Lm && this.Lm.disconnect(), this.Lm = null;
  }
}
function Es(t) {
  return Boolean(t.handleScroll.mouseWheel || t.handleScale.mouseWheel);
}
function Ns(t, i) {
  var n = {};
  for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && i.indexOf(s) < 0 && (n[s] = t[s]);
  if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
    var e = 0;
    for (s = Object.getOwnPropertySymbols(t); e < s.length; e++) i.indexOf(s[e]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[e]) && (n[s[e]] = t[s[e]]);
  }
  return n;
}
function Fs(t, i, n, s) {
  const e = n.value,
    r = {
      ie: i,
      ot: t,
      Ot: [e, e, e, e],
      wb: s
    };
  return void 0 !== n.color && (r.O = n.color), r;
}
function Ws(t, i, n, s) {
  const e = n.value,
    r = {
      ie: i,
      ot: t,
      Ot: [e, e, e, e],
      wb: s
    };
  return void 0 !== n.lineColor && (r.lt = n.lineColor), void 0 !== n.topColor && (r.ys = n.topColor), void 0 !== n.bottomColor && (r.Cs = n.bottomColor), r;
}
function js(t, i, n, s) {
  const e = n.value,
    r = {
      ie: i,
      ot: t,
      Ot: [e, e, e, e],
      wb: s
    };
  return void 0 !== n.topLineColor && (r.Ce = n.topLineColor), void 0 !== n.bottomLineColor && (r.Te = n.bottomLineColor), void 0 !== n.topFillColor1 && (r.Me = n.topFillColor1), void 0 !== n.topFillColor2 && (r.xe = n.topFillColor2), void 0 !== n.bottomFillColor1 && (r.Se = n.bottomFillColor1), void 0 !== n.bottomFillColor2 && (r.ke = n.bottomFillColor2), r;
}
function Hs(t, i, n, s) {
  const e = {
    ie: i,
    ot: t,
    Ot: [n.open, n.high, n.low, n.close],
    wb: s
  };
  return void 0 !== n.color && (e.O = n.color), e;
}
function $s(t, i, n, s) {
  const e = {
    ie: i,
    ot: t,
    Ot: [n.open, n.high, n.low, n.close],
    wb: s
  };
  return void 0 !== n.color && (e.O = n.color), void 0 !== n.borderColor && (e.At = n.borderColor), void 0 !== n.wickColor && (e.Hh = n.wickColor), e;
}
function Us(t, i, n, s, e) {
  const r = m(e)(n),
    h = Math.max(...r),
    l = Math.min(...r),
    a = r[r.length - 1],
    o = [a, h, l, a],
    _ = n,
    {
      time: u,
      color: c
    } = _;
  return {
    ie: i,
    ot: t,
    Ot: o,
    wb: s,
    We: Ns(_, ["time", "color"]),
    O: c
  };
}
function qs(t) {
  return void 0 !== t.Ot;
}
function Ys(t, i) {
  return void 0 !== i.customValues && (t.yb = i.customValues), t;
}
function Xs(t) {
  return (i, n, s, e, r, h) => function (t, i) {
    return i ? i(t) : void 0 === (n = t).open && void 0 === n.value;
    var n;
  }(s, h) ? Ys({
    ot: i,
    ie: n,
    wb: e
  }, s) : Ys(t(i, n, s, e, r), s);
}
function Ks(t) {
  return {
    Candlestick: Xs($s),
    Bar: Xs(Hs),
    Area: Xs(Ws),
    Baseline: Xs(js),
    Histogram: Xs(Fs),
    Line: Xs(Fs),
    Custom: Xs(Us)
  }[t];
}
function Zs(t) {
  return {
    ie: 0,
    Cb: new Map(),
    ia: t
  };
}
function Gs(t, i) {
  if (void 0 !== t && 0 !== t.length) return {
    Tb: i.key(t[0].ot),
    Pb: i.key(t[t.length - 1].ot)
  };
}
function Js(t) {
  let i;
  return t.forEach(t => {
    void 0 === i && (i = t.wb);
  }), m(i);
}
class Qs {
  constructor(t) {
    this.Rb = new Map(), this.Db = new Map(), this.Ob = new Map(), this.Ab = [], this.N_ = t;
  }
  S() {
    this.Rb.clear(), this.Db.clear(), this.Ob.clear(), this.Ab = [];
  }
  Vb(t, i) {
    let n = 0 !== this.Rb.size,
      s = !1;
    const e = this.Db.get(t);
    if (void 0 !== e) if (1 === this.Db.size) n = !1, s = !0, this.Rb.clear();else for (const i of this.Ab) i.pointData.Cb.delete(t) && (s = !0);
    let r = [];
    if (0 !== i.length) {
      const n = i.map(t => t.time),
        e = this.N_.createConverterToInternalObj(i),
        h = Ks(t.Yh()),
        l = t.ga(),
        a = t.Ma();
      r = i.map((i, r) => {
        const o = e(i.time),
          _ = this.N_.key(o);
        let u = this.Rb.get(_);
        void 0 === u && (u = Zs(o), this.Rb.set(_, u), s = !0);
        const c = h(o, u.ie, i, n[r], l, a);
        return u.Cb.set(t, c), c;
      });
    }
    n && this.Bb(), this.Ib(t, r);
    let h = -1;
    if (s) {
      const t = [];
      this.Rb.forEach(i => {
        t.push({
          timeWeight: 0,
          time: i.ia,
          pointData: i,
          originalTime: Js(i.Cb)
        });
      }), t.sort((t, i) => this.N_.key(t.time) - this.N_.key(i.time)), h = this.zb(t);
    }
    return this.Lb(t, h, function (t, i, n) {
      const s = Gs(t, n),
        e = Gs(i, n);
      if (void 0 !== s && void 0 !== e) return {
        Xl: s.Pb >= e.Pb && s.Tb >= e.Tb
      };
    }(this.Db.get(t), e, this.N_));
  }
  ld(t) {
    return this.Vb(t, []);
  }
  Eb(t, i) {
    const n = i;
    !function (t) {
      void 0 === t.wb && (t.wb = t.time);
    }(n), this.N_.preprocessData(i);
    const s = this.N_.createConverterToInternalObj([i])(i.time),
      e = this.Ob.get(t);
    if (void 0 !== e && this.N_.key(s) < this.N_.key(e)) throw new Error(`Cannot update oldest data, last time=${e}, new time=${s}`);
    let r = this.Rb.get(this.N_.key(s));
    const h = void 0 === r;
    void 0 === r && (r = Zs(s), this.Rb.set(this.N_.key(s), r));
    const l = Ks(t.Yh()),
      a = t.ga(),
      o = t.Ma(),
      _ = l(s, r.ie, i, n.wb, a, o);
    r.Cb.set(t, _), this.Nb(t, _);
    const u = {
      Xl: qs(_)
    };
    if (!h) return this.Lb(t, -1, u);
    const c = {
        timeWeight: 0,
        time: r.ia,
        pointData: r,
        originalTime: Js(r.Cb)
      },
      d = Vt(this.Ab, this.N_.key(c.time), (t, i) => this.N_.key(t.time) < i);
    this.Ab.splice(d, 0, c);
    for (let t = d; t < this.Ab.length; ++t) te(this.Ab[t].pointData, t);
    return this.N_.fillWeightsForPoints(this.Ab, d), this.Lb(t, d, u);
  }
  Nb(t, i) {
    let n = this.Db.get(t);
    void 0 === n && (n = [], this.Db.set(t, n));
    const s = 0 !== n.length ? n[n.length - 1] : null;
    null === s || this.N_.key(i.ot) > this.N_.key(s.ot) ? qs(i) && n.push(i) : qs(i) ? n[n.length - 1] = i : n.splice(-1, 1), this.Ob.set(t, i.ot);
  }
  Ib(t, i) {
    0 !== i.length ? (this.Db.set(t, i.filter(qs)), this.Ob.set(t, i[i.length - 1].ot)) : (this.Db.delete(t), this.Ob.delete(t));
  }
  Bb() {
    for (const t of this.Ab) 0 === t.pointData.Cb.size && this.Rb.delete(this.N_.key(t.time));
  }
  zb(t) {
    let i = -1;
    for (let n = 0; n < this.Ab.length && n < t.length; ++n) {
      const s = this.Ab[n],
        e = t[n];
      if (this.N_.key(s.time) !== this.N_.key(e.time)) {
        i = n;
        break;
      }
      e.timeWeight = s.timeWeight, te(e.pointData, n);
    }
    if (-1 === i && this.Ab.length !== t.length && (i = Math.min(this.Ab.length, t.length)), -1 === i) return -1;
    for (let n = i; n < t.length; ++n) te(t[n].pointData, n);
    return this.N_.fillWeightsForPoints(t, i), this.Ab = t, i;
  }
  Fb() {
    if (0 === this.Db.size) return null;
    let t = 0;
    return this.Db.forEach(i => {
      0 !== i.length && (t = Math.max(t, i[i.length - 1].ie));
    }), t;
  }
  Lb(t, i, n) {
    const s = {
      Wb: new Map(),
      St: {
        Au: this.Fb()
      }
    };
    if (-1 !== i) this.Db.forEach((i, e) => {
      s.Wb.set(e, {
        We: i,
        jb: e === t ? n : void 0
      });
    }), this.Db.has(t) || s.Wb.set(t, {
      We: [],
      jb: n
    }), s.St.Hb = this.Ab, s.St.$b = i;else {
      const i = this.Db.get(t);
      s.Wb.set(t, {
        We: i || [],
        jb: n
      });
    }
    return s;
  }
}
function te(t, i) {
  t.ie = i, t.Cb.forEach(t => {
    t.ie = i;
  });
}
function ie(t) {
  const i = {
    value: t.Ot[3],
    time: t.wb
  };
  return void 0 !== t.yb && (i.customValues = t.yb), i;
}
function ne(t) {
  const i = ie(t);
  return void 0 !== t.O && (i.color = t.O), i;
}
function se(t) {
  const i = ie(t);
  return void 0 !== t.lt && (i.lineColor = t.lt), void 0 !== t.ys && (i.topColor = t.ys), void 0 !== t.Cs && (i.bottomColor = t.Cs), i;
}
function ee(t) {
  const i = ie(t);
  return void 0 !== t.Ce && (i.topLineColor = t.Ce), void 0 !== t.Te && (i.bottomLineColor = t.Te), void 0 !== t.Me && (i.topFillColor1 = t.Me), void 0 !== t.xe && (i.topFillColor2 = t.xe), void 0 !== t.Se && (i.bottomFillColor1 = t.Se), void 0 !== t.ke && (i.bottomFillColor2 = t.ke), i;
}
function re(t) {
  const i = {
    open: t.Ot[0],
    high: t.Ot[1],
    low: t.Ot[2],
    close: t.Ot[3],
    time: t.wb
  };
  return void 0 !== t.yb && (i.customValues = t.yb), i;
}
function he(t) {
  const i = re(t);
  return void 0 !== t.O && (i.color = t.O), i;
}
function le(t) {
  const i = re(t),
    {
      O: n,
      At: s,
      Hh: e
    } = t;
  return void 0 !== n && (i.color = n), void 0 !== s && (i.borderColor = s), void 0 !== e && (i.wickColor = e), i;
}
function ae(t) {
  return {
    Area: se,
    Line: ne,
    Baseline: ee,
    Histogram: ne,
    Bar: he,
    Candlestick: le,
    Custom: oe
  }[t];
}
function oe(t) {
  const i = t.wb;
  return Object.assign(Object.assign({}, t.We), {
    time: i
  });
}
const _e = {
    vertLine: {
      color: "#9598A1",
      width: 1,
      style: 3,
      visible: !0,
      labelVisible: !0,
      labelBackgroundColor: "#131722"
    },
    horzLine: {
      color: "#9598A1",
      width: 1,
      style: 3,
      visible: !0,
      labelVisible: !0,
      labelBackgroundColor: "#131722"
    },
    mode: 1
  },
  ue = {
    vertLines: {
      color: "#D6DCDE",
      style: 0,
      visible: !0
    },
    horzLines: {
      color: "#D6DCDE",
      style: 0,
      visible: !0
    }
  },
  ce = {
    background: {
      type: "solid",
      color: "#FFFFFF"
    },
    textColor: "#191919",
    fontSize: 12,
    fontFamily: E
  },
  de = {
    autoScale: !0,
    mode: 0,
    invertScale: !1,
    alignLabels: !0,
    borderVisible: !0,
    borderColor: "#2B2B43",
    entireTextOnly: !1,
    visible: !1,
    ticksVisible: !1,
    scaleMargins: {
      bottom: .1,
      top: .2
    },
    minimumWidth: 0
  },
  fe = {
    rightOffset: 0,
    barSpacing: 6,
    minBarSpacing: .5,
    fixLeftEdge: !1,
    fixRightEdge: !1,
    lockVisibleTimeRangeOnResize: !1,
    rightBarStaysOnScroll: !1,
    borderVisible: !0,
    borderColor: "#2B2B43",
    visible: !0,
    timeVisible: !1,
    secondsVisible: !0,
    shiftVisibleRangeOnNewBar: !0,
    allowShiftVisibleRangeOnWhitespaceReplacement: !1,
    ticksVisible: !1,
    uniformDistribution: !1,
    minimumHeight: 0,
    allowBoldLabels: !0
  },
  ve = {
    color: "rgba(0, 0, 0, 0)",
    visible: !1,
    fontSize: 48,
    fontFamily: E,
    fontStyle: "",
    text: "",
    horzAlign: "center",
    vertAlign: "center"
  };
function pe() {
  return {
    width: 0,
    height: 0,
    autoSize: !1,
    layout: ce,
    crosshair: _e,
    grid: ue,
    overlayPriceScales: Object.assign({}, de),
    leftPriceScale: Object.assign(Object.assign({}, de), {
      visible: !1
    }),
    rightPriceScale: Object.assign(Object.assign({}, de), {
      visible: !0
    }),
    timeScale: fe,
    watermark: ve,
    localization: {
      locale: is ? navigator.language : "",
      dateFormat: "dd MMM 'yy"
    },
    handleScroll: {
      mouseWheel: !0,
      pressedMouseMove: !0,
      horzTouchDrag: !0,
      vertTouchDrag: !0
    },
    handleScale: {
      axisPressedMouseMove: {
        time: !0,
        price: !0
      },
      axisDoubleClickReset: {
        time: !0,
        price: !0
      },
      mouseWheel: !0,
      pinch: !0
    },
    kineticScroll: {
      mouse: !1,
      touch: !0
    },
    trackingMode: {
      exitMode: 1
    }
  };
}
class me {
  constructor(t, i) {
    this.Ub = t, this.qb = i;
  }
  applyOptions(t) {
    this.Ub.$t().Lc(this.qb, t);
  }
  options() {
    return this.zi().W();
  }
  width() {
    return _t(this.qb) ? this.Ub.sb(this.qb) : 0;
  }
  zi() {
    return b(this.Ub.$t().Ec(this.qb)).Dt;
  }
}
function be(t, i, n) {
  const s = Ns(t, ["time", "originalTime"]),
    e = Object.assign({
      time: i
    }, s);
  return void 0 !== n && (e.originalTime = n), e;
}
const we = {
  color: "#FF0000",
  price: 0,
  lineStyle: 2,
  lineWidth: 1,
  lineVisible: !0,
  axisLabelVisible: !0,
  title: "",
  axisLabelColor: "",
  axisLabelTextColor: ""
};
class ge {
  constructor(t) {
    this.Vh = t;
  }
  applyOptions(t) {
    this.Vh.Eh(t);
  }
  options() {
    return this.Vh.W();
  }
  Yb() {
    return this.Vh;
  }
}
class Me {
  constructor(t, i, n, s, e) {
    this.Xb = new R(), this.Is = t, this.Kb = i, this.Zb = n, this.N_ = e, this.Gb = s;
  }
  S() {
    this.Xb.S();
  }
  priceFormatter() {
    return this.Is.ca();
  }
  priceToCoordinate(t) {
    const i = this.Is.Ct();
    return null === i ? null : this.Is.Dt().Rt(t, i.Ot);
  }
  coordinateToPrice(t) {
    const i = this.Is.Ct();
    return null === i ? null : this.Is.Dt().fn(t, i.Ot);
  }
  barsInLogicalRange(t) {
    if (null === t) return null;
    const i = new kn(new Mn(t.from, t.to)).iu(),
      n = this.Is.Vn();
    if (n.Ei()) return null;
    const s = n.il(i.Rs(), 1),
      e = n.il(i.ui(), -1),
      r = b(n.Jh()),
      h = b(n.An());
    if (null !== s && null !== e && s.ie > e.ie) return {
      barsBefore: t.from - r,
      barsAfter: h - t.to
    };
    const l = {
      barsBefore: null === s || s.ie === r ? t.from - r : s.ie - r,
      barsAfter: null === e || e.ie === h ? h - t.to : h - e.ie
    };
    return null !== s && null !== e && (l.from = s.wb, l.to = e.wb), l;
  }
  setData(t) {
    this.N_, this.Is.Yh(), this.Kb.Jb(this.Is, t), this.Qb("full");
  }
  update(t) {
    this.Is.Yh(), this.Kb.tw(this.Is, t), this.Qb("update");
  }
  dataByIndex(t, i) {
    const n = this.Is.Vn().il(t, i);
    if (null === n) return null;
    return ae(this.seriesType())(n);
  }
  data() {
    const t = ae(this.seriesType());
    return this.Is.Vn().Qs().map(i => t(i));
  }
  subscribeDataChanged(t) {
    this.Xb.l(t);
  }
  unsubscribeDataChanged(t) {
    this.Xb.v(t);
  }
  setMarkers(t) {
    this.N_;
    const i = t.map(t => be(t, this.N_.convertHorzItemToInternal(t.time), t.time));
    this.Is.Zl(i);
  }
  markers() {
    return this.Is.Gl().map(t => be(t, t.originalTime, void 0));
  }
  applyOptions(t) {
    this.Is.Eh(t);
  }
  options() {
    return I(this.Is.W());
  }
  priceScale() {
    return this.Zb.priceScale(this.Is.Dt().xa());
  }
  createPriceLine(t) {
    const i = D(I(we), t),
      n = this.Is.Jl(i);
    return new ge(n);
  }
  removePriceLine(t) {
    this.Is.Ql(t.Yb());
  }
  seriesType() {
    return this.Is.Yh();
  }
  attachPrimitive(t) {
    this.Is.ba(t), t.attached && t.attached({
      chart: this.Gb,
      series: this,
      requestUpdate: () => this.Is.$t().$l()
    });
  }
  detachPrimitive(t) {
    this.Is.wa(t), t.detached && t.detached();
  }
  Qb(t) {
    this.Xb.M() && this.Xb.m(t);
  }
}
class xe {
  constructor(t, i, n) {
    this.iw = new R(), this.uu = new R(), this.um = new R(), this.Hi = t, this.wl = t.St(), this.Um = i, this.wl.Ku().l(this.nw.bind(this)), this.wl.Zu().l(this.sw.bind(this)), this.Um.Mm().l(this.ew.bind(this)), this.N_ = n;
  }
  S() {
    this.wl.Ku().p(this), this.wl.Zu().p(this), this.Um.Mm().p(this), this.iw.S(), this.uu.S(), this.um.S();
  }
  scrollPosition() {
    return this.wl.Lu();
  }
  scrollToPosition(t, i) {
    i ? this.wl.qu(t, 1e3) : this.Hi.Zn(t);
  }
  scrollToRealTime() {
    this.wl.Uu();
  }
  getVisibleRange() {
    const t = this.wl.yu();
    return null === t ? null : {
      from: t.from.originalTime,
      to: t.to.originalTime
    };
  }
  setVisibleRange(t) {
    const i = {
        from: this.N_.convertHorzItemToInternal(t.from),
        to: this.N_.convertHorzItemToInternal(t.to)
      },
      n = this.wl.Ru(i);
    this.Hi.ad(n);
  }
  getVisibleLogicalRange() {
    const t = this.wl.ku();
    return null === t ? null : {
      from: t.Rs(),
      to: t.ui()
    };
  }
  setVisibleLogicalRange(t) {
    p(t.from <= t.to, "The from index cannot be after the to index."), this.Hi.ad(t);
  }
  resetTimeScale() {
    this.Hi.Xn();
  }
  fitContent() {
    this.Hi.Qu();
  }
  logicalToCoordinate(t) {
    const i = this.Hi.St();
    return i.Ei() ? null : i.It(t);
  }
  coordinateToLogical(t) {
    return this.wl.Ei() ? null : this.wl.Vu(t);
  }
  timeToCoordinate(t) {
    const i = this.N_.convertHorzItemToInternal(t),
      n = this.wl.ya(i, !1);
    return null === n ? null : this.wl.It(n);
  }
  coordinateToTime(t) {
    const i = this.Hi.St(),
      n = i.Vu(t),
      s = i.$i(n);
    return null === s ? null : s.originalTime;
  }
  width() {
    return this.Um.Up().width;
  }
  height() {
    return this.Um.Up().height;
  }
  subscribeVisibleTimeRangeChange(t) {
    this.iw.l(t);
  }
  unsubscribeVisibleTimeRangeChange(t) {
    this.iw.v(t);
  }
  subscribeVisibleLogicalRangeChange(t) {
    this.uu.l(t);
  }
  unsubscribeVisibleLogicalRangeChange(t) {
    this.uu.v(t);
  }
  subscribeSizeChange(t) {
    this.um.l(t);
  }
  unsubscribeSizeChange(t) {
    this.um.v(t);
  }
  applyOptions(t) {
    this.wl.Eh(t);
  }
  options() {
    return Object.assign(Object.assign({}, I(this.wl.W())), {
      barSpacing: this.wl.ee()
    });
  }
  nw() {
    this.iw.M() && this.iw.m(this.getVisibleRange());
  }
  sw() {
    this.uu.M() && this.uu.m(this.getVisibleLogicalRange());
  }
  ew(t) {
    this.um.m(t.width, t.height);
  }
}
function Se(t) {
  if (void 0 === t || "custom" === t.type) return;
  const i = t;
  void 0 !== i.minMove && void 0 === i.precision && (i.precision = function (t) {
    if (t >= 1) return 0;
    let i = 0;
    for (; i < 8; i++) {
      const n = Math.round(t);
      if (Math.abs(n - t) < 1e-8) return i;
      t *= 10;
    }
    return i;
  }(i.minMove));
}
function ke(t) {
  return function (t) {
    if (B(t.handleScale)) {
      const i = t.handleScale;
      t.handleScale = {
        axisDoubleClickReset: {
          time: i,
          price: i
        },
        axisPressedMouseMove: {
          time: i,
          price: i
        },
        mouseWheel: i,
        pinch: i
      };
    } else if (void 0 !== t.handleScale) {
      const {
        axisPressedMouseMove: i,
        axisDoubleClickReset: n
      } = t.handleScale;
      B(i) && (t.handleScale.axisPressedMouseMove = {
        time: i,
        price: i
      }), B(n) && (t.handleScale.axisDoubleClickReset = {
        time: n,
        price: n
      });
    }
    const i = t.handleScroll;
    B(i) && (t.handleScroll = {
      horzTouchDrag: i,
      vertTouchDrag: i,
      mouseWheel: i,
      pressedMouseMove: i
    });
  }(t), t;
}
class ye {
  constructor(t, i, n) {
    this.rw = new Map(), this.hw = new Map(), this.lw = new R(), this.aw = new R(), this.ow = new R(), this._w = new Qs(i);
    const s = void 0 === n ? I(pe()) : D(I(pe()), ke(n));
    this.N_ = i, this.Ub = new Ls(t, s, i), this.Ub.Wp().l(t => {
      this.lw.M() && this.lw.m(this.uw(t()));
    }, this), this.Ub.jp().l(t => {
      this.aw.M() && this.aw.m(this.uw(t()));
    }, this), this.Ub.jc().l(t => {
      this.ow.M() && this.ow.m(this.uw(t()));
    }, this);
    const e = this.Ub.$t();
    this.cw = new xe(e, this.Ub.Gm(), this.N_);
  }
  remove() {
    this.Ub.Wp().p(this), this.Ub.jp().p(this), this.Ub.jc().p(this), this.cw.S(), this.Ub.S(), this.rw.clear(), this.hw.clear(), this.lw.S(), this.aw.S(), this.ow.S(), this._w.S();
  }
  resize(t, i, n) {
    this.autoSizeActive() || this.Ub.Ym(t, i, n);
  }
  addCustomSeries(t, i) {
    const n = w(t),
      s = Object.assign(Object.assign({}, _), n.defaultOptions());
    return this.dw("Custom", s, i, n);
  }
  addAreaSeries(t) {
    return this.dw("Area", l, t);
  }
  addBaselineSeries(t) {
    return this.dw("Baseline", a, t);
  }
  addBarSeries(t) {
    return this.dw("Bar", r, t);
  }
  addCandlestickSeries(t = {}) {
    return function (t) {
      void 0 !== t.borderColor && (t.borderUpColor = t.borderColor, t.borderDownColor = t.borderColor), void 0 !== t.wickColor && (t.wickUpColor = t.wickColor, t.wickDownColor = t.wickColor);
    }(t), this.dw("Candlestick", e, t);
  }
  addHistogramSeries(t) {
    return this.dw("Histogram", o, t);
  }
  addLineSeries(t) {
    return this.dw("Line", h, t);
  }
  removeSeries(t) {
    const i = m(this.rw.get(t)),
      n = this._w.ld(i);
    this.Ub.$t().ld(i), this.fw(n), this.rw.delete(t), this.hw.delete(i);
  }
  Jb(t, i) {
    this.fw(this._w.Vb(t, i));
  }
  tw(t, i) {
    this.fw(this._w.Eb(t, i));
  }
  subscribeClick(t) {
    this.lw.l(t);
  }
  unsubscribeClick(t) {
    this.lw.v(t);
  }
  subscribeCrosshairMove(t) {
    this.ow.l(t);
  }
  unsubscribeCrosshairMove(t) {
    this.ow.v(t);
  }
  subscribeDblClick(t) {
    this.aw.l(t);
  }
  unsubscribeDblClick(t) {
    this.aw.v(t);
  }
  priceScale(t) {
    return new me(this.Ub, t);
  }
  timeScale() {
    return this.cw;
  }
  applyOptions(t) {
    this.Ub.Eh(ke(t));
  }
  options() {
    return this.Ub.W();
  }
  takeScreenshot() {
    return this.Ub.ib();
  }
  autoSizeActive() {
    return this.Ub.hb();
  }
  chartElement() {
    return this.Ub.lb();
  }
  paneSize() {
    const t = this.Ub.ob();
    return {
      height: t.height,
      width: t.width
    };
  }
  setCrosshairPosition(t, i, n) {
    const s = this.rw.get(n);
    if (void 0 === s) return;
    const e = this.Ub.$t()._r(s);
    null !== e && this.Ub.$t().td(t, i, e);
  }
  clearCrosshairPosition() {
    this.Ub.$t().nd(!0);
  }
  dw(t, i, n = {}, s) {
    Se(n.priceFormat);
    const e = D(I(u), I(i), n),
      r = this.Ub.$t().rd(t, e, s),
      h = new Me(r, this, this, this, this.N_);
    return this.rw.set(h, r), this.hw.set(r, h), h;
  }
  fw(t) {
    const i = this.Ub.$t();
    i.sd(t.St.Au, t.St.Hb, t.St.$b), t.Wb.forEach((t, i) => i.J(t.We, t.jb)), i.Iu();
  }
  pw(t) {
    return m(this.hw.get(t));
  }
  uw(t) {
    const i = new Map();
    t.xb.forEach((t, n) => {
      const s = n.Yh(),
        e = ae(s)(t);
      if ("Custom" !== s) p(function (t) {
        return void 0 !== t.open || void 0 !== t.value;
      }(e));else {
        const t = n.Ma();
        p(!t || !1 === t(e));
      }
      i.set(this.pw(n), e);
    });
    const n = void 0 === t.Mb ? void 0 : this.pw(t.Mb);
    return {
      time: t.wb,
      logical: t.ie,
      point: t.gb,
      hoveredSeries: n,
      hoveredObjectId: t.Sb,
      seriesData: i,
      sourceEvent: t.kb
    };
  }
}
function Ce(t, i, n) {
  let s;
  if (V(t)) {
    const i = document.getElementById(t);
    p(null !== i, `Cannot find element in DOM with id=${t}`), s = i;
  } else s = t;
  const e = new ye(s, i, n);
  return i.setOptions(e.options()), e;
}
function Te(t, i) {
  return Ce(t, new ts(), ts.Pd(i));
}
const Pe = exports.customSeriesDefaultOptions = Object.assign(Object.assign({}, u), _);
function Re() {
  return "4.1.3";
}
},{"fancy-canvas":"../node_modules/fancy-canvas/index.mjs"}],"../node_modules/engine.io-parser/build/esm/commons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PACKET_TYPES_REVERSE = exports.PACKET_TYPES = exports.ERROR_PACKET = void 0;
const PACKET_TYPES = exports.PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = exports.PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = exports.ERROR_PACKET = {
  type: "error",
  data: "parser error"
};
},{}],"../node_modules/engine.io-parser/build/esm/encodePacket.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodePacket = void 0;
exports.encodePacketToBinary = encodePacketToBinary;
var _commons = require("./commons.js");
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({
  type,
  data
}, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  // plain string
  return callback(_commons.PACKET_TYPES[type] + (data || ""));
};
exports.encodePacket = encodePacket;
const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const content = fileReader.result.split(",")[1];
    callback("b" + (content || ""));
  };
  return fileReader.readAsDataURL(data);
};
function toArray(data) {
  if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  } else {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
  if (withNativeBlob && packet.data instanceof Blob) {
    return packet.data.arrayBuffer().then(toArray).then(callback);
  } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
    return callback(toArray(packet.data));
  }
  encodePacket(packet, false, encoded => {
    if (!TEXT_ENCODER) {
      TEXT_ENCODER = new TextEncoder();
    }
    callback(TEXT_ENCODER.encode(encoded));
  });
}
},{"./commons.js":"../node_modules/engine.io-parser/build/esm/commons.js"}],"../node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.decode = void 0;
// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
const encode = arraybuffer => {
  let bytes = new Uint8Array(arraybuffer),
    i,
    len = bytes.length,
    base64 = '';
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }
  return base64;
};
exports.encode = encode;
const decode = base64 => {
  let bufferLength = base64.length * 0.75,
    len = base64.length,
    i,
    p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4;
  if (base64[base64.length - 1] === '=') {
    bufferLength--;
    if (base64[base64.length - 2] === '=') {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};
exports.decode = decode;
},{}],"../node_modules/engine.io-parser/build/esm/decodePacket.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodePacket = void 0;
var _commons = require("./commons.js");
var _base64Arraybuffer = require("./contrib/base64-arraybuffer.js");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = _commons.PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return _commons.ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: _commons.PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: _commons.PACKET_TYPES_REVERSE[type]
  };
};
exports.decodePacket = decodePacket;
const decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer) {
    const decoded = (0, _base64Arraybuffer.decode)(data);
    return mapBinary(decoded, binaryType);
  } else {
    return {
      base64: true,
      data
    }; // fallback for old browsers
  }
};
const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      if (data instanceof Blob) {
        // from WebSocket + binaryType "blob"
        return data;
      } else {
        // from HTTP long-polling or WebTransport
        return new Blob([data]);
      }
    case "arraybuffer":
    default:
      if (data instanceof ArrayBuffer) {
        // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
        return data;
      } else {
        // from WebTransport (Uint8Array)
        return data.buffer;
      }
  }
};
},{"./commons.js":"../node_modules/engine.io-parser/build/esm/commons.js","./contrib/base64-arraybuffer.js":"../node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js"}],"../node_modules/engine.io-parser/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPacketDecoderStream = createPacketDecoderStream;
exports.createPacketEncoderStream = createPacketEncoderStream;
Object.defineProperty(exports, "decodePacket", {
  enumerable: true,
  get: function () {
    return _decodePacket.decodePacket;
  }
});
exports.decodePayload = void 0;
Object.defineProperty(exports, "encodePacket", {
  enumerable: true,
  get: function () {
    return _encodePacket.encodePacket;
  }
});
exports.protocol = exports.encodePayload = void 0;
var _encodePacket = require("./encodePacket.js");
var _decodePacket = require("./decodePacket.js");
var _commons = require("./commons.js");
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;
  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    (0, _encodePacket.encodePacket)(packet, false, encodedPacket => {
      encodedPackets[i] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
exports.encodePayload = encodePayload;
const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = (0, _decodePacket.decodePacket)(encodedPackets[i], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
exports.decodePayload = decodePayload;
function createPacketEncoderStream() {
  // @ts-expect-error
  return new TransformStream({
    transform(packet, controller) {
      (0, _encodePacket.encodePacketToBinary)(packet, encodedPacket => {
        const payloadLength = encodedPacket.length;
        let header;
        // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
        if (payloadLength < 126) {
          header = new Uint8Array(1);
          new DataView(header.buffer).setUint8(0, payloadLength);
        } else if (payloadLength < 65536) {
          header = new Uint8Array(3);
          const view = new DataView(header.buffer);
          view.setUint8(0, 126);
          view.setUint16(1, payloadLength);
        } else {
          header = new Uint8Array(9);
          const view = new DataView(header.buffer);
          view.setUint8(0, 127);
          view.setBigUint64(1, BigInt(payloadLength));
        }
        // first bit indicates whether the payload is plain text (0) or binary (1)
        if (packet.data && typeof packet.data !== "string") {
          header[0] |= 0x80;
        }
        controller.enqueue(header);
        controller.enqueue(encodedPacket);
      });
    }
  });
}
let TEXT_DECODER;
function totalLength(chunks) {
  return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
  if (chunks[0].length === size) {
    return chunks.shift();
  }
  const buffer = new Uint8Array(size);
  let j = 0;
  for (let i = 0; i < size; i++) {
    buffer[i] = chunks[0][j++];
    if (j === chunks[0].length) {
      chunks.shift();
      j = 0;
    }
  }
  if (chunks.length && j < chunks[0].length) {
    chunks[0] = chunks[0].slice(j);
  }
  return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
  if (!TEXT_DECODER) {
    TEXT_DECODER = new TextDecoder();
  }
  const chunks = [];
  let state = 0 /* READ_HEADER */;
  let expectedLength = -1;
  let isBinary = false;
  // @ts-expect-error
  return new TransformStream({
    transform(chunk, controller) {
      chunks.push(chunk);
      while (true) {
        if (state === 0 /* READ_HEADER */) {
          if (totalLength(chunks) < 1) {
            break;
          }
          const header = concatChunks(chunks, 1);
          isBinary = (header[0] & 0x80) === 0x80;
          expectedLength = header[0] & 0x7f;
          if (expectedLength < 126) {
            state = 3 /* READ_PAYLOAD */;
          } else if (expectedLength === 126) {
            state = 1 /* READ_EXTENDED_LENGTH_16 */;
          } else {
            state = 2 /* READ_EXTENDED_LENGTH_64 */;
          }
        } else if (state === 1 /* READ_EXTENDED_LENGTH_16 */) {
          if (totalLength(chunks) < 2) {
            break;
          }
          const headerArray = concatChunks(chunks, 2);
          expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
          state = 3 /* READ_PAYLOAD */;
        } else if (state === 2 /* READ_EXTENDED_LENGTH_64 */) {
          if (totalLength(chunks) < 8) {
            break;
          }
          const headerArray = concatChunks(chunks, 8);
          const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
          const n = view.getUint32(0);
          if (n > Math.pow(2, 53 - 32) - 1) {
            // the maximum safe integer in JavaScript is 2^53 - 1
            controller.enqueue(_commons.ERROR_PACKET);
            break;
          }
          expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
          state = 3 /* READ_PAYLOAD */;
        } else {
          if (totalLength(chunks) < expectedLength) {
            break;
          }
          const data = concatChunks(chunks, expectedLength);
          controller.enqueue((0, _decodePacket.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
          state = 0 /* READ_HEADER */;
        }
        if (expectedLength === 0 || expectedLength > maxPayload) {
          controller.enqueue(_commons.ERROR_PACKET);
          break;
        }
      }
    }
  });
}
const protocol = exports.protocol = 4;
},{"./encodePacket.js":"../node_modules/engine.io-parser/build/esm/encodePacket.browser.js","./decodePacket.js":"../node_modules/engine.io-parser/build/esm/decodePacket.browser.js","./commons.js":"../node_modules/engine.io-parser/build/esm/commons.js"}],"../node_modules/@socket.io/component-emitter/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emitter = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }
  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1),
    callbacks = this._callbacks['$' + event];
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }
  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};
},{}],"../node_modules/engine.io-client/build/esm/globalThis.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalThisShim = void 0;
const globalThisShim = exports.globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();
},{}],"../node_modules/engine.io-client/build/esm/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byteLength = byteLength;
exports.installTimerFunctions = installTimerFunctions;
exports.pick = pick;
var _globalThis = require("./globalThis.js");
function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = _globalThis.globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = _globalThis.globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(_globalThis.globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(_globalThis.globalThisShim);
  } else {
    obj.setTimeoutFn = _globalThis.globalThisShim.setTimeout.bind(_globalThis.globalThisShim);
    obj.clearTimeoutFn = _globalThis.globalThisShim.clearTimeout.bind(_globalThis.globalThisShim);
  }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  // arraybuffer or blob
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c = 0,
    length = 0;
  for (let i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      length += 1;
    } else if (c < 0x800) {
      length += 2;
    } else if (c < 0xd800 || c >= 0xe000) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length;
}
},{"./globalThis.js":"../node_modules/engine.io-client/build/esm/globalThis.browser.js"}],"../node_modules/engine.io-client/build/esm/contrib/parseqs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;
exports.encode = encode;
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
  let str = '';
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }
  return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
  let qry = {};
  let pairs = qs.split('&');
  for (let i = 0, l = pairs.length; i < l; i++) {
    let pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}
},{}],"../node_modules/engine.io-client/build/esm/transport.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransportError = exports.Transport = void 0;
var _engine = require("engine.io-parser");
var _componentEmitter = require("@socket.io/component-emitter");
var _util = require("./util.js");
var _parseqs = require("./contrib/parseqs.js");
class TransportError extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
}
exports.TransportError = TransportError;
class Transport extends _componentEmitter.Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(opts) {
    super();
    this.writable = false;
    (0, _util.installTimerFunctions)(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  /**
   * Opens the transport.
   */
  open() {
    this.readyState = "opening";
    this.doOpen();
    return this;
  }
  /**
   * Closes the transport.
   */
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
    }
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(data) {
    const packet = (0, _engine.decodePacket)(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(onPause) {}
  createUri(schema, query = {}) {
    return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
  }
  _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }
  _port() {
    if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }
  _query(query) {
    const encodedQuery = (0, _parseqs.encode)(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }
}
exports.Transport = Transport;
},{"engine.io-parser":"../node_modules/engine.io-parser/build/esm/index.js","@socket.io/component-emitter":"../node_modules/@socket.io/component-emitter/index.mjs","./util.js":"../node_modules/engine.io-client/build/esm/util.js","./contrib/parseqs.js":"../node_modules/engine.io-client/build/esm/contrib/parseqs.js"}],"../node_modules/engine.io-client/build/esm/contrib/yeast.js":[function(require,module,exports) {
// imported from https://github.com/unshiftio/yeast
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;
exports.encode = encode;
exports.yeast = yeast;
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
  length = 64,
  map = {};
let seed = 0,
  i = 0,
  prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  let encoded = '';
  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);
  return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  let decoded = 0;
  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }
  return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  const now = encode(+new Date());
  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode(seed++);
}
//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;
},{}],"../node_modules/engine.io-client/build/esm/contrib/has-cors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasCORS = void 0;
// imported from https://github.com/component/has-cors
let value = false;
try {
  value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
}
const hasCORS = exports.hasCORS = value;
},{}],"../node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XHR = XHR;
exports.createCookieJar = createCookieJar;
var _hasCors = require("../contrib/has-cors.js");
var _globalThis = require("../globalThis.js");
// browser shim for xmlhttprequest module

function XHR(opts) {
  const xdomain = opts.xdomain;
  // XMLHttpRequest can be disabled on IE
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || _hasCors.hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}
  if (!xdomain) {
    try {
      return new _globalThis.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {}
  }
}
function createCookieJar() {}
},{"../contrib/has-cors.js":"../node_modules/engine.io-client/build/esm/contrib/has-cors.js","../globalThis.js":"../node_modules/engine.io-client/build/esm/globalThis.browser.js"}],"../node_modules/engine.io-client/build/esm/transports/polling.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = exports.Polling = void 0;
var _transport = require("../transport.js");
var _yeast = require("../contrib/yeast.js");
var _engine = require("engine.io-parser");
var _xmlhttprequest = require("./xmlhttprequest.js");
var _componentEmitter = require("@socket.io/component-emitter");
var _util = require("../util.js");
var _globalThis = require("../globalThis.js");
function empty() {}
const hasXHR2 = function () {
  const xhr = new _xmlhttprequest.XHR({
    xdomain: false
  });
  return null != xhr.responseType;
}();
class Polling extends _transport.Transport {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(opts) {
    super(opts);
    this.polling = false;
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
    }
    /**
     * XHR supports binary
     */
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
    if (this.opts.withCredentials) {
      this.cookieJar = (0, _xmlhttprequest.createCookieJar)();
    }
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this.poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function () {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function () {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  poll() {
    this.polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(data) {
    const callback = packet => {
      // if its the first message we consider the transport open
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      // if its a close packet, we close the ongoing requests
      if ("close" === packet.type) {
        this.onClose({
          description: "transport closed by the server"
        });
        return false;
      }
      // otherwise bypass onData and handle the message
      this.onPacket(packet);
    };
    // decode payload
    (0, _engine.decodePayload)(data, this.socket.binaryType).forEach(callback);
    // if an event did not trigger closing
    if ("closed" !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this.poll();
      } else {}
    }
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const close = () => {
      this.write([{
        type: "close"
      }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      this.once("open", close);
    }
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(packets) {
    this.writable = false;
    (0, _engine.encodePayload)(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "https" : "http";
    const query = this.query || {};
    // cache busting is forced
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = (0, _yeast.yeast)();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Creates a request.
   *
   * @param {String} method
   * @private
   */
  request(opts = {}) {
    Object.assign(opts, {
      xd: this.xd,
      cookieJar: this.cookieJar
    }, this.opts);
    return new Request(this.uri(), opts);
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data: data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
}
exports.Polling = Polling;
class Request extends _componentEmitter.Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(uri, opts) {
    super();
    (0, _util.installTimerFunctions)(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.data = undefined !== opts.data ? opts.data : null;
    this.create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  create() {
    var _a;
    const opts = (0, _util.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    const xhr = this.xhr = new _xmlhttprequest.XHR(opts);
    try {
      xhr.open(this.method, this.uri, true);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}
      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {}
      (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
      // ie6 check
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        var _a;
        if (xhr.readyState === 3) {
          (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(xhr);
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly from the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }
  /**
   * Called upon error.
   *
   * @private
   */
  onError(err) {
    this.emitReserved("error", err, this.xhr);
    this.cleanup(true);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    this.xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }
    this.xhr = null;
  }
  /**
   * Called upon load.
   *
   * @private
   */
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this.cleanup();
    }
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this.cleanup();
  }
}
exports.Request = Request;
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
  // @ts-ignore
  if (typeof attachEvent === "function") {
    // @ts-ignore
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in _globalThis.globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}
},{"../transport.js":"../node_modules/engine.io-client/build/esm/transport.js","../contrib/yeast.js":"../node_modules/engine.io-client/build/esm/contrib/yeast.js","engine.io-parser":"../node_modules/engine.io-parser/build/esm/index.js","./xmlhttprequest.js":"../node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js","@socket.io/component-emitter":"../node_modules/@socket.io/component-emitter/index.mjs","../util.js":"../node_modules/engine.io-client/build/esm/util.js","../globalThis.js":"../node_modules/engine.io-client/build/esm/globalThis.browser.js"}],"../node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usingBrowserWebSocket = exports.nextTick = exports.defaultBinaryType = exports.WebSocket = void 0;
var _globalThis = require("../globalThis.js");
const nextTick = exports.nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return cb => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
const WebSocket = exports.WebSocket = _globalThis.globalThisShim.WebSocket || _globalThis.globalThisShim.MozWebSocket;
const usingBrowserWebSocket = exports.usingBrowserWebSocket = true;
const defaultBinaryType = exports.defaultBinaryType = "arraybuffer";
},{"../globalThis.js":"../node_modules/engine.io-client/build/esm/globalThis.browser.js"}],"../node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../node_modules/ieee754/index.js":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../node_modules/base64-js/index.js","ieee754":"../node_modules/ieee754/index.js","isarray":"../node_modules/isarray/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/engine.io-client/build/esm/transports/websocket.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WS = void 0;
var _transport = require("../transport.js");
var _yeast = require("../contrib/yeast.js");
var _util = require("../util.js");
var _websocketConstructor = require("./websocket-constructor.js");
var _engine = require("engine.io-parser");
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class WS extends _transport.Transport {
  /**
   * WebSocket transport constructor.
   *
   * @param {Object} opts - connection options
   * @protected
   */
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    // React Native only supports the 'headers' option, and will print a warning if anything else is passed
    const opts = isReactNative ? {} : (0, _util.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = _websocketConstructor.usingBrowserWebSocket && !isReactNative ? protocols ? new _websocketConstructor.WebSocket(uri, protocols) : new _websocketConstructor.WebSocket(uri) : new _websocketConstructor.WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType;
    this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = closeEvent => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = ev => this.onData(ev.data);
    this.ws.onerror = e => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      (0, _engine.encodePacket)(packet, this.supportsBinary, data => {
        // always create a new object (GH-437)
        const opts = {};
        if (!_websocketConstructor.usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }
          if (this.opts.perMessageDeflate) {
            const len =
            // @ts-ignore
            "string" === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }
        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (_websocketConstructor.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {}
        if (lastPacket) {
          // fake drain
          // defer to next tick to allow Socket to clear writeBuffer
          (0, _websocketConstructor.nextTick)(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query = this.query || {};
    // append timestamp to URI
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = (0, _yeast.yeast)();
    }
    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @private
   */
  check() {
    return !!_websocketConstructor.WebSocket;
  }
}
exports.WS = WS;
},{"../transport.js":"../node_modules/engine.io-client/build/esm/transport.js","../contrib/yeast.js":"../node_modules/engine.io-client/build/esm/contrib/yeast.js","../util.js":"../node_modules/engine.io-client/build/esm/util.js","./websocket-constructor.js":"../node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js","engine.io-parser":"../node_modules/engine.io-parser/build/esm/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/engine.io-client/build/esm/transports/webtransport.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WT = void 0;
var _transport = require("../transport.js");
var _websocketConstructor = require("./websocket-constructor.js");
var _engine = require("engine.io-parser");
class WT extends _transport.Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    // @ts-ignore
    if (typeof WebTransport !== "function") {
      return;
    }
    // @ts-ignore
    this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    this.transport.closed.then(() => {
      this.onClose();
    }).catch(err => {
      this.onError("webtransport error", err);
    });
    // note: we could have used async/await, but that would require some additional polyfills
    this.transport.ready.then(() => {
      this.transport.createBidirectionalStream().then(stream => {
        const decoderStream = (0, _engine.createPacketDecoderStream)(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
        const reader = stream.readable.pipeThrough(decoderStream).getReader();
        const encoderStream = (0, _engine.createPacketEncoderStream)();
        encoderStream.readable.pipeTo(stream.writable);
        this.writer = encoderStream.writable.getWriter();
        const read = () => {
          reader.read().then(({
            done,
            value
          }) => {
            if (done) {
              return;
            }
            this.onPacket(value);
            read();
          }).catch(err => {});
        };
        read();
        const packet = {
          type: "open"
        };
        if (this.query.sid) {
          packet.data = `{"sid":"${this.query.sid}"}`;
        }
        this.writer.write(packet).then(() => this.onOpen());
      });
    });
  }
  write(packets) {
    this.writable = false;
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      this.writer.write(packet).then(() => {
        if (lastPacket) {
          (0, _websocketConstructor.nextTick)(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    var _a;
    (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
  }
}
exports.WT = WT;
},{"../transport.js":"../node_modules/engine.io-client/build/esm/transport.js","./websocket-constructor.js":"../node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js","engine.io-parser":"../node_modules/engine.io-parser/build/esm/index.js"}],"../node_modules/engine.io-client/build/esm/transports/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transports = void 0;
var _polling = require("./polling.js");
var _websocket = require("./websocket.js");
var _webtransport = require("./webtransport.js");
const transports = exports.transports = {
  websocket: _websocket.WS,
  webtransport: _webtransport.WT,
  polling: _polling.Polling
};
},{"./polling.js":"../node_modules/engine.io-client/build/esm/transports/polling.js","./websocket.js":"../node_modules/engine.io-client/build/esm/transports/websocket.js","./webtransport.js":"../node_modules/engine.io-client/build/esm/transports/webtransport.js"}],"../node_modules/engine.io-client/build/esm/contrib/parseuri.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
function parse(str) {
  if (str.length > 2000) {
    throw "URI too long";
  }
  const src = str,
    b = str.indexOf('['),
    e = str.indexOf(']');
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
  }
  let m = re.exec(str || ''),
    uri = {},
    i = 14;
  while (i--) {
    uri[parts[i]] = m[i] || '';
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri['path']);
  uri.queryKey = queryKey(uri, uri['query']);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g,
    names = path.replace(regx, "/").split("/");
  if (path.slice(0, 1) == '/' || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.slice(-1) == '/') {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}
},{}],"../node_modules/engine.io-client/build/esm/socket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Socket = void 0;
var _index = require("./transports/index.js");
var _util = require("./util.js");
var _parseqs = require("./contrib/parseqs.js");
var _parseuri = require("./contrib/parseuri.js");
var _componentEmitter = require("@socket.io/component-emitter");
var _engine = require("engine.io-parser");
var _websocketConstructor = require("./transports/websocket-constructor.js");
class Socket extends _componentEmitter.Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(uri, opts = {}) {
    super();
    this.binaryType = _websocketConstructor.defaultBinaryType;
    this.writeBuffer = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = (0, _parseuri.parse)(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = (0, _parseuri.parse)(opts.host).host;
    }
    (0, _util.installTimerFunctions)(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || ["polling", "websocket", "webtransport"];
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      addTrailingSlash: true,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: false
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
    if (typeof this.opts.query === "string") {
      this.opts.query = (0, _parseqs.decode)(this.opts.query);
    }
    // set on handshake
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    // set on heartbeat
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
        // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
        // closed/reloaded)
        this.beforeunloadEventListener = () => {
          if (this.transport) {
            // silently close the transport
            this.transport.removeAllListeners();
            this.transport.close();
          }
        };
        addEventListener("beforeunload", this.beforeunloadEventListener, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close", {
            description: "network connection lost"
          });
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    // append engine.io protocol identifier
    query.EIO = _engine.protocol;
    // transport name
    query.transport = name;
    // session id if we already have one
    if (this.id) query.sid = this.id;
    const opts = Object.assign({}, this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[name]);
    return new _index.transports[name](opts);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  open() {
    let transport;
    if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    // Retry with the next transport if the transport is disabled (jsonp: false)
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    // set up transport
    this.transport = transport;
    // set up transport listeners
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", reason => this.onClose("transport close", reason));
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    Socket.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed) return;
      transport.send([{
        type: "ping",
        data: "probe"
      }]);
      transport.once("packet", msg => {
        if (failed) return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed) return;
            if ("closed" === this.readyState) return;
            cleanup();
            this.setTransport(transport);
            transport.send([{
              type: "upgrade"
            }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          // @ts-ignore
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed) return;
      // Any callback called by transport should be ignored since now
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    // Handle any error that happens while probing
    const onerror = err => {
      const error = new Error("probe error: " + err);
      // @ts-ignore
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    // When the socket is closed while we're probing
    function onclose() {
      onerror("socket closed");
    }
    // When the socket is upgraded while we're probing
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    // Remove all listeners on the transport and on self
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    if (this.upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
      // favor WebTransport
      this.setTimeoutFn(() => {
        if (!failed) {
          transport.open();
        }
      }, 200);
    } else {
      transport.open();
    }
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
    // we check for `readyState` in case an `open`
    // listener already closed the socket
    if ("open" === this.readyState && this.opts.upgrade) {
      let i = 0;
      const l = this.upgrades.length;
      for (; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      // Socket is live - any packet counts
      this.emitReserved("heartbeat");
      this.resetPingTimeout();
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          // @ts-ignore
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {}
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.maxPayload = data.maxPayload;
    this.onOpen();
    // In case open handler closes socket
    if ("closed" === this.readyState) return;
    this.resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this.prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this.getWritablePackets();
      this.transport.send(packets);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this.prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  getWritablePackets() {
    const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1; // first packet type
    for (let i = 0; i < this.writeBuffer.length; i++) {
      const data = this.writeBuffer[i].data;
      if (data) {
        payloadSize += (0, _util.byteLength)(data);
      }
      if (i > 0 && payloadSize > this.maxPayload) {
        return this.writeBuffer.slice(0, i);
      }
      payloadSize += 2; // separator + packet type
    }
    return this.writeBuffer;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} callback function.
   * @return {Socket} for chaining.
   */
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = undefined;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type: type,
      data: data,
      options: options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  onError(err) {
    Socket.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      // clear timers
      this.clearTimeoutFn(this.pingTimeoutTimer);
      // stop event from firing again for transport
      this.transport.removeAllListeners("close");
      // ensure transport won't stay open
      this.transport.close();
      // ignore further transport communication
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("beforeunload", this.beforeunloadEventListener, false);
        removeEventListener("offline", this.offlineEventListener, false);
      }
      // set ready state
      this.readyState = "closed";
      // clear session id
      this.id = null;
      // emit close event
      this.emitReserved("close", reason, description);
      // clean buffers after, so users can still
      // grab the buffers on `close` event
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i = 0;
    const j = upgrades.length;
    for (; i < j; i++) {
      if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  }
}
exports.Socket = Socket;
Socket.protocol = _engine.protocol;
},{"./transports/index.js":"../node_modules/engine.io-client/build/esm/transports/index.js","./util.js":"../node_modules/engine.io-client/build/esm/util.js","./contrib/parseqs.js":"../node_modules/engine.io-client/build/esm/contrib/parseqs.js","./contrib/parseuri.js":"../node_modules/engine.io-client/build/esm/contrib/parseuri.js","@socket.io/component-emitter":"../node_modules/@socket.io/component-emitter/index.mjs","engine.io-parser":"../node_modules/engine.io-parser/build/esm/index.js","./transports/websocket-constructor.js":"../node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js"}],"../node_modules/engine.io-client/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Socket", {
  enumerable: true,
  get: function () {
    return _socket.Socket;
  }
});
Object.defineProperty(exports, "Transport", {
  enumerable: true,
  get: function () {
    return _transport.Transport;
  }
});
Object.defineProperty(exports, "TransportError", {
  enumerable: true,
  get: function () {
    return _transport.TransportError;
  }
});
Object.defineProperty(exports, "installTimerFunctions", {
  enumerable: true,
  get: function () {
    return _util.installTimerFunctions;
  }
});
Object.defineProperty(exports, "nextTick", {
  enumerable: true,
  get: function () {
    return _websocketConstructor.nextTick;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parseuri.parse;
  }
});
exports.protocol = void 0;
Object.defineProperty(exports, "transports", {
  enumerable: true,
  get: function () {
    return _index.transports;
  }
});
var _socket = require("./socket.js");
var _transport = require("./transport.js");
var _index = require("./transports/index.js");
var _util = require("./util.js");
var _parseuri = require("./contrib/parseuri.js");
var _websocketConstructor = require("./transports/websocket-constructor.js");
const protocol = exports.protocol = _socket.Socket.protocol;
},{"./socket.js":"../node_modules/engine.io-client/build/esm/socket.js","./transport.js":"../node_modules/engine.io-client/build/esm/transport.js","./transports/index.js":"../node_modules/engine.io-client/build/esm/transports/index.js","./util.js":"../node_modules/engine.io-client/build/esm/util.js","./contrib/parseuri.js":"../node_modules/engine.io-client/build/esm/contrib/parseuri.js","./transports/websocket-constructor.js":"../node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js"}],"../node_modules/socket.io-client/build/esm/url.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = url;
var _engine = require("engine.io-client");
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
  let obj = uri;
  // default to window.location
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri) uri = loc.protocol + "//" + loc.host;
  // relative path support
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    // parse
    obj = (0, _engine.parse)(uri);
  }
  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  // define unique id
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  // define href
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}
},{"engine.io-client":"../node_modules/engine.io-client/build/esm/index.js"}],"../node_modules/socket.io-parser/build/esm/is-binary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasBinary = hasBinary;
exports.isBinary = isBinary;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}
},{}],"../node_modules/socket.io-parser/build/esm/binary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deconstructPacket = deconstructPacket;
exports.reconstructPacket = reconstructPacket;
var _isBinary = require("./is-binary.js");
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {
    packet: pack,
    buffers: buffers
  };
}
function _deconstructPacket(data, buffers) {
  if (!data) return data;
  if ((0, _isBinary.isBinary)(data)) {
    const placeholder = {
      _placeholder: true,
      num: buffers.length
    };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  delete packet.attachments; // no longer useful
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data) return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}
},{"./is-binary.js":"../node_modules/socket.io-parser/build/esm/is-binary.js"}],"../node_modules/socket.io-parser/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protocol = exports.PacketType = exports.Encoder = exports.Decoder = void 0;
var _componentEmitter = require("@socket.io/component-emitter");
var _binary = require("./binary.js");
var _isBinary = require("./is-binary.js");
/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS = ["connect", "connect_error", "disconnect", "disconnecting", "newListener", "removeListener" // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = exports.protocol = 5;
var PacketType;
(function (PacketType) {
  PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
  PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType[PacketType["EVENT"] = 2] = "EVENT";
  PacketType[PacketType["ACK"] = 3] = "ACK";
  PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (exports.PacketType = PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(replacer) {
    this.replacer = replacer;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if ((0, _isBinary.hasBinary)(obj)) {
        return this.encodeAsBinary({
          type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
          nsp: obj.nsp,
          data: obj.data,
          id: obj.id
        });
      }
    }
    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(obj) {
    // first is type
    let str = "" + obj.type;
    // attachments if we have them
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    // if we have a namespace other than `/`
    // we append it followed by a comma `,`
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    // immediately followed by the id
    if (null != obj.id) {
      str += obj.id;
    }
    // json data
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(obj) {
    const deconstruction = (0, _binary.deconstructPacket)(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack); // add packet info to beginning of data list
    return buffers; // write all the buffers
  }
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
exports.Encoder = Encoder;
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends _componentEmitter.Emitter {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
      if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
        packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
        // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet);
        // no attachments, labeled binary but no binary data to follow
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        // non-binary full packet
        super.emitReserved("decoded", packet);
      }
    } else if ((0, _isBinary.isBinary)(obj) || obj.base64) {
      // raw binary data
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          // received final buffer
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(str) {
    let i = 0;
    // look up type
    const p = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p.type] === undefined) {
      throw new Error("unknown packet type " + p.type);
    }
    // look up attachments if type binary
    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i + 1;
      while (str.charAt(++i) !== "-" && i != str.length) {}
      const buf = str.substring(start, i);
      if (buf != Number(buf) || str.charAt(i) !== "-") {
        throw new Error("Illegal attachments");
      }
      p.attachments = Number(buf);
    }
    // look up namespace (if any)
    if ("/" === str.charAt(i + 1)) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if ("," === c) break;
        if (i === str.length) break;
      }
      p.nsp = str.substring(start, i);
    } else {
      p.nsp = "/";
    }
    // look up id
    const next = str.charAt(i + 1);
    if ("" !== next && Number(next) == next) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if (null == c || Number(c) != c) {
          --i;
          break;
        }
        if (i === str.length) break;
      }
      p.id = Number(str.substring(start, i + 1));
    }
    // look up json data
    if (str.charAt(++i)) {
      const payload = this.tryParse(str.substr(i));
      if (Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e) {
      return false;
    }
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return isObject(payload);
      case PacketType.DISCONNECT:
        return payload === undefined;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || isObject(payload);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
      this.reconstructor = null;
    }
  }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
exports.Decoder = Decoder;
class BinaryReconstructor {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      // done with buffer list
      const packet = (0, _binary.reconstructPacket)(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
}
},{"@socket.io/component-emitter":"../node_modules/@socket.io/component-emitter/index.mjs","./binary.js":"../node_modules/socket.io-parser/build/esm/binary.js","./is-binary.js":"../node_modules/socket.io-parser/build/esm/is-binary.js"}],"../node_modules/socket.io-client/build/esm/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}
},{}],"../node_modules/socket.io-client/build/esm/socket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Socket = void 0;
var _socket = require("socket.io-parser");
var _on = require("./on.js");
var _componentEmitter = require("@socket.io/component-emitter");
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends _componentEmitter.Emitter {
  /**
   * `Socket` constructor.
   */
  constructor(io, nsp, opts) {
    super();
    /**
     * Whether the socket is currently connected to the server.
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.connected); // true
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.connected); // false
     * });
     */
    this.connected = false;
    /**
     * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
     * be transmitted by the server.
     */
    this.recovered = false;
    /**
     * Buffer for packets received before the CONNECT packet
     */
    this.receiveBuffer = [];
    /**
     * Buffer for packets that will be sent once the socket is connected
     */
    this.sendBuffer = [];
    /**
     * The queue of packets to be sent with retry in case of failure.
     *
     * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
     * @private
     */
    this._queue = [];
    /**
     * A sequence to generate the ID of the {@link QueuedPacket}.
     * @private
     */
    this._queueSeq = 0;
    this.ids = 0;
    /**
     * A map containing acknowledgement handlers.
     *
     * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
     *
     * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
     * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
     * - `const value = await socket.emitWithAck("test")`
     *
     * From those that don't:
     *
     * - `socket.emit("test", (value) => { ... });`
     *
     * In the first case, the handlers will be called with an error when:
     *
     * - the timeout is reached
     * - the socket gets disconnected
     *
     * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
     * an acknowledgement from the server.
     *
     * @private
     */
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    this._opts = Object.assign({}, opts);
    if (this.io._autoConnect) this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs) return;
    const io = this.io;
    this.subs = [(0, _on.on)(io, "open", this.onopen.bind(this)), (0, _on.on)(io, "packet", this.onpacket.bind(this)), (0, _on.on)(io, "error", this.onerror.bind(this)), (0, _on.on)(io, "close", this.onclose.bind(this))];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    if (this.connected) return this;
    this.subEvents();
    if (!this.io["_reconnecting"]) this.io.open(); // ensure open
    if ("open" === this.io._readyState) this.onopen();
    return this;
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(ev, ...args) {
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
      this._addToQueue(args);
      return this;
    }
    const packet = {
      type: _socket.PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    // event ack callback
    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket) {} else if (this.connected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  /**
   * @private
   */
  _registerAckCallback(id, ack) {
    var _a;
    const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
    if (timeout === undefined) {
      this.acks[id] = ack;
      return;
    }
    // @ts-ignore
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i = 0; i < this.sendBuffer.length; i++) {
        if (this.sendBuffer[i].id === id) {
          this.sendBuffer.splice(i, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    const fn = (...args) => {
      // @ts-ignore
      this.io.clearTimeoutFn(timer);
      ack.apply(this, args);
    };
    fn.withError = true;
    this.acks[id] = fn;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(ev, ...args) {
    return new Promise((resolve, reject) => {
      const fn = (arg1, arg2) => {
        return arg1 ? reject(arg1) : resolve(arg2);
      };
      fn.withError = true;
      args.push(fn);
      this.emit(ev, ...args);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(args) {
    let ack;
    if (typeof args[args.length - 1] === "function") {
      ack = args.pop();
    }
    const packet = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: false,
      args,
      flags: Object.assign({
        fromQueue: true
      }, this.flags)
    };
    args.push((err, ...responseArgs) => {
      if (packet !== this._queue[0]) {
        // the packet has already been acknowledged
        return;
      }
      const hasError = err !== null;
      if (hasError) {
        if (packet.tryCount > this._opts.retries) {
          this._queue.shift();
          if (ack) {
            ack(err);
          }
        }
      } else {
        this._queue.shift();
        if (ack) {
          ack(null, ...responseArgs);
        }
      }
      packet.pending = false;
      return this._drainQueue();
    });
    this._queue.push(packet);
    this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(force = false) {
    if (!this.connected || this._queue.length === 0) {
      return;
    }
    const packet = this._queue[0];
    if (packet.pending && !force) {
      return;
    }
    packet.pending = true;
    packet.tryCount++;
    this.flags = packet.flags;
    this.emit.apply(this, packet.args);
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    if (typeof this.auth == "function") {
      this.auth(data => {
        this._sendConnectPacket(data);
      });
    } else {
      this._sendConnectPacket(this.auth);
    }
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(data) {
    this.packet({
      type: _socket.PacketType.CONNECT,
      data: this._pid ? Object.assign({
        pid: this._pid,
        offset: this._lastOffset
      }, data) : data
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
    this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach(id => {
      const isBuffered = this.sendBuffer.some(packet => String(packet.id) === id);
      if (!isBuffered) {
        // note: handlers that do not accept an error as first argument are ignored here
        const ack = this.acks[id];
        delete this.acks[id];
        if (ack.withError) {
          ack.call(this, new Error("socket has been disconnected"));
        }
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace) return;
    switch (packet.type) {
      case _socket.PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          this.onconnect(packet.data.sid, packet.data.pid);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case _socket.PacketType.EVENT:
      case _socket.PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case _socket.PacketType.ACK:
      case _socket.PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case _socket.PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case _socket.PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        // @ts-ignore
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
    if (this._pid && args.length && typeof args[args.length - 1] === "string") {
      this._lastOffset = args[args.length - 1];
    }
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(id) {
    const self = this;
    let sent = false;
    return function (...args) {
      // prevent double callbacks
      if (sent) return;
      sent = true;
      self.packet({
        type: _socket.PacketType.ACK,
        id: id,
        data: args
      });
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(packet) {
    const ack = this.acks[packet.id];
    if (typeof ack !== "function") {
      return;
    }
    delete this.acks[packet.id];
    // @ts-ignore FIXME ack is incorrectly inferred as 'never'
    if (ack.withError) {
      packet.data.unshift(null);
    }
    // @ts-ignore
    ack.apply(this, packet.data);
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(id, pid) {
    this.id = id;
    this.recovered = pid && this._pid === pid;
    this._pid = pid; // defined only if connection state recovery is enabled
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
    this._drainQueue(true);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach(args => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach(packet => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    if (this.subs) {
      // clean subscriptions to avoid reconnections
      this.subs.forEach(subDestroy => subDestroy());
      this.subs = undefined;
    }
    this.io["_destroy"](this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    if (this.connected) {
      this.packet({
        type: _socket.PacketType.DISCONNECT
      });
    }
    // remove socket from pool
    this.destroy();
    if (this.connected) {
      // fire events
      this.onclose("io client disconnect");
    }
    return this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
}
exports.Socket = Socket;
},{"socket.io-parser":"../node_modules/socket.io-parser/build/esm/index.js","./on.js":"../node_modules/socket.io-client/build/esm/on.js","@socket.io/component-emitter":"../node_modules/@socket.io/component-emitter/index.mjs"}],"../node_modules/socket.io-client/build/esm/contrib/backo2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Backoff = Backoff;
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
  this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
  this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};
},{}],"../node_modules/socket.io-client/build/esm/manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manager = void 0;
var _engine = require("engine.io-client");
var _socket = require("./socket.js");
var parser = _interopRequireWildcard(require("socket.io-parser"));
var _on = require("./on.js");
var _backo = require("./contrib/backo2.js");
var _componentEmitter = require("@socket.io/component-emitter");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class Manager extends _componentEmitter.Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = undefined;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    (0, _engine.installTimerFunctions)(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new _backo.Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 20000 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || parser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect) this.open();
  }
  reconnection(v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    return this;
  }
  reconnectionAttempts(v) {
    if (v === undefined) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === undefined) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === undefined) return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === undefined) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    // Only try to reconnect if it's the first time we're connecting
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      // keeps reconnection from firing twice for the same reconnection loop
      this.reconnect();
    }
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(fn) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new _engine.Socket(this.uri, this.opts);
    const socket = this.engine;
    const self = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    // emit `open`
    const openSubDestroy = (0, _on.on)(socket, "open", function () {
      self.onopen();
      fn && fn();
    });
    const onError = err => {
      this.cleanup();
      this._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        // Only do this if there is no fn to handle the error
        this.maybeReconnectOnOpen();
      }
    };
    // emit `error`
    const errorSub = (0, _on.on)(socket, "error", onError);
    if (false !== this._timeout) {
      const timeout = this._timeout;
      // set timer
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        onError(new Error("timeout"));
        socket.close();
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(fn) {
    return this.open(fn);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    // clear old subs
    this.cleanup();
    // mark as open
    this._readyState = "open";
    this.emitReserved("open");
    // add new subs
    const socket = this.engine;
    this.subs.push((0, _on.on)(socket, "ping", this.onping.bind(this)), (0, _on.on)(socket, "data", this.ondata.bind(this)), (0, _on.on)(socket, "error", this.onerror.bind(this)), (0, _on.on)(socket, "close", this.onclose.bind(this)), (0, _on.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error", e);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(packet) {
    // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
    (0, _engine.nextTick)(() => {
      this.emitReserved("packet", packet);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(err) {
    this.emitReserved("error", err);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new _socket.Socket(this, nsp, opts);
      this.nsps[nsp] = socket;
    } else if (this._autoConnect && !socket.active) {
      socket.connect();
    }
    return socket;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(socket) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket = this.nsps[nsp];
      if (socket.active) {
        return;
      }
    }
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i = 0; i < encodedPackets.length; i++) {
      this.engine.write(encodedPackets[i], packet.options);
    }
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach(subDestroy => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine) this.engine.close();
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called upon engine close.
   *
   * @private
   */
  onclose(reason, description) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const self = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self.skipReconnect) return;
        this.emitReserved("reconnect_attempt", self.backoff.attempts);
        // check again for the case socket closed in above events
        if (self.skipReconnect) return;
        self.open(err => {
          if (err) {
            self._reconnecting = false;
            self.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
}
exports.Manager = Manager;
},{"engine.io-client":"../node_modules/engine.io-client/build/esm/index.js","./socket.js":"../node_modules/socket.io-client/build/esm/socket.js","socket.io-parser":"../node_modules/socket.io-parser/build/esm/index.js","./on.js":"../node_modules/socket.io-client/build/esm/on.js","./contrib/backo2.js":"../node_modules/socket.io-client/build/esm/contrib/backo2.js","@socket.io/component-emitter":"../node_modules/@socket.io/component-emitter/index.mjs"}],"../node_modules/socket.io-client/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Manager", {
  enumerable: true,
  get: function () {
    return _manager.Manager;
  }
});
Object.defineProperty(exports, "Socket", {
  enumerable: true,
  get: function () {
    return _socket.Socket;
  }
});
exports.default = exports.connect = exports.io = lookup;
Object.defineProperty(exports, "protocol", {
  enumerable: true,
  get: function () {
    return _socket2.protocol;
  }
});
var _url = require("./url.js");
var _manager = require("./manager.js");
var _socket = require("./socket.js");
var _socket2 = require("socket.io-parser");
/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};
  const parsed = (0, _url.url)(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new _manager.Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new _manager.Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
  Manager: _manager.Manager,
  Socket: _socket.Socket,
  io: lookup,
  connect: lookup
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */
},{"./url.js":"../node_modules/socket.io-client/build/esm/url.js","./manager.js":"../node_modules/socket.io-client/build/esm/manager.js","./socket.js":"../node_modules/socket.io-client/build/esm/socket.js","socket.io-parser":"../node_modules/socket.io-parser/build/esm/index.js"}],"../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bind;
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
},{}],"../node_modules/axios/lib/utils.js":[function(require,module,exports) {
var global = arguments[3];
var define;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bind = _interopRequireDefault(require("./helpers/bind.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// utils is a library of generic helper functions non-specific to axios

const {
  toString
} = Object.prototype;
const {
  getPrototypeOf
} = Object;
const kindOf = (cache => thing => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
const kindOfTest = type => {
  type = type.toLowerCase();
  return thing => kindOf(thing) === type;
};
const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {
  isArray
} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = thing => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = val => {
  if (kindOf(val) !== 'object') {
    return false;
  }
  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = val => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = thing => {
  let kind;
  return thing && (typeof FormData === 'function' && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === 'formdata' ||
  // detect form-data instance
  kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]'));
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = str => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {
  allOwnKeys = false
} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== 'undefined' ? window : global;
})();
const isContextDefined = context => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge( /* obj1, obj2, obj3, ... */
) {
  const {
    caseless
  } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {
  allOwnKeys
} = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = (0, _bind.default)(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {
    allOwnKeys
  });
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = content => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = thing => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');
const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({
  hasOwnProperty
}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');
const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = obj => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = arr => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {};
const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};
const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const DIGIT = '0123456789';
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {
    length
  } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}
const toJSONObject = obj => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = undefined;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest('AsyncFunction');
const isThenable = thing => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var _default = exports.default = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};
},{"./helpers/bind.js":"../node_modules/axios/lib/helpers/bind.js"}],"../node_modules/axios/lib/core/AxiosError.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("../utils.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}
_utils.default.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _utils.default.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const prototype = AxiosError.prototype;
const descriptors = {};
['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED', 'ERR_NOT_SUPPORT', 'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {
    value: code
  };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {
  value: true
});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);
  _utils.default.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var _default = exports.default = AxiosError;
},{"../utils.js":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/null.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// eslint-disable-next-line strict
var _default = exports.default = null;
},{}],"../node_modules/axios/lib/helpers/toFormData.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("../utils.js"));
var _AxiosError = _interopRequireDefault(require("../core/AxiosError.js"));
var _FormData = _interopRequireDefault(require("../platform/node/classes/FormData.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils.default.isPlainObject(thing) || _utils.default.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils.default.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return _utils.default.isArray(arr) && !arr.some(isVisitable);
}
const predicates = _utils.default.toFlatObject(_utils.default, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!_utils.default.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_FormData.default || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = _utils.default.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !_utils.default.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && _utils.default.isSpecCompliantForm(formData);
  if (!_utils.default.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }
  function convertValue(value) {
    if (value === null) return '';
    if (_utils.default.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && _utils.default.isBlob(value)) {
      throw new _AxiosError.default('Blob is not supported. Use a Buffer instead.');
    }
    if (_utils.default.isArrayBuffer(value) || _utils.default.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === 'object') {
      if (_utils.default.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (_utils.default.isArray(value) && isFlatArray(value) || (_utils.default.isFileList(value) || _utils.default.endsWith(key, '[]')) && (arr = _utils.default.toArray(value))) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(_utils.default.isUndefined(el) || el === null) && formData.append(
          // eslint-disable-next-line no-nested-ternary
          indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (_utils.default.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }
    stack.push(value);
    _utils.default.forEach(value, function each(el, key) {
      const result = !(_utils.default.isUndefined(el) || el === null) && visitor.call(formData, el, _utils.default.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!_utils.default.isObject(obj)) {
    throw new TypeError('data must be an object');
  }
  build(obj);
  return formData;
}
var _default = exports.default = toFormData;
},{"../utils.js":"../node_modules/axios/lib/utils.js","../core/AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js","../platform/node/classes/FormData.js":"../node_modules/axios/lib/helpers/null.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/axios/lib/helpers/AxiosURLSearchParams.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toFormData = _interopRequireDefault(require("./toFormData.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && (0, _toFormData.default)(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
  const _encode = encoder ? function (value) {
    return encoder.call(this, value, encode);
  } : encode;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};
var _default = exports.default = AxiosURLSearchParams;
},{"./toFormData.js":"../node_modules/axios/lib/helpers/toFormData.js"}],"../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildURL;
var _utils = _interopRequireDefault(require("../utils.js"));
var _AxiosURLSearchParams = _interopRequireDefault(require("../helpers/AxiosURLSearchParams.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = _utils.default.isURLSearchParams(params) ? params.toString() : new _AxiosURLSearchParams.default(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}
},{"../utils.js":"../node_modules/axios/lib/utils.js","../helpers/AxiosURLSearchParams.js":"../node_modules/axios/lib/helpers/AxiosURLSearchParams.js"}],"../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("./../utils.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    _utils.default.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
var _default = exports.default = InterceptorManager;
},{"./../utils.js":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/defaults/transitional.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
},{}],"../node_modules/axios/lib/platform/browser/classes/URLSearchParams.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AxiosURLSearchParams = _interopRequireDefault(require("../../../helpers/AxiosURLSearchParams.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = typeof URLSearchParams !== 'undefined' ? URLSearchParams : _AxiosURLSearchParams.default;
},{"../../../helpers/AxiosURLSearchParams.js":"../node_modules/axios/lib/helpers/AxiosURLSearchParams.js"}],"../node_modules/axios/lib/platform/browser/classes/FormData.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = typeof FormData !== 'undefined' ? FormData : null;
},{}],"../node_modules/axios/lib/platform/browser/classes/Blob.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = typeof Blob !== 'undefined' ? Blob : null;
},{}],"../node_modules/axios/lib/platform/browser/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _URLSearchParams = _interopRequireDefault(require("./classes/URLSearchParams.js"));
var _FormData = _interopRequireDefault(require("./classes/FormData.js"));
var _Blob = _interopRequireDefault(require("./classes/Blob.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = {
  isBrowser: true,
  classes: {
    URLSearchParams: _URLSearchParams.default,
    FormData: _FormData.default,
    Blob: _Blob.default
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};
},{"./classes/URLSearchParams.js":"../node_modules/axios/lib/platform/browser/classes/URLSearchParams.js","./classes/FormData.js":"../node_modules/axios/lib/platform/browser/classes/FormData.js","./classes/Blob.js":"../node_modules/axios/lib/platform/browser/classes/Blob.js"}],"../node_modules/axios/lib/platform/common/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasStandardBrowserWebWorkerEnv = exports.hasStandardBrowserEnv = exports.hasBrowserEnv = void 0;
const hasBrowserEnv = exports.hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = exports.hasStandardBrowserEnv = (product => {
  return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0;
})(typeof navigator !== 'undefined' && navigator.product);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = exports.hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== 'undefined' &&
  // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
})();
},{}],"../node_modules/axios/lib/platform/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("./node/index.js"));
var utils = _interopRequireWildcard(require("./common/utils.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = {
  ...utils,
  ..._index.default
};
},{"./node/index.js":"../node_modules/axios/lib/platform/browser/index.js","./common/utils.js":"../node_modules/axios/lib/platform/common/utils.js"}],"../node_modules/axios/lib/helpers/toURLEncodedForm.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toURLEncodedForm;
var _utils = _interopRequireDefault(require("../utils.js"));
var _toFormData = _interopRequireDefault(require("./toFormData.js"));
var _index = _interopRequireDefault(require("../platform/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function toURLEncodedForm(data, options) {
  return (0, _toFormData.default)(data, new _index.default.classes.URLSearchParams(), Object.assign({
    visitor: function (value, key, path, helpers) {
      if (_index.default.isNode && _utils.default.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
},{"../utils.js":"../node_modules/axios/lib/utils.js","./toFormData.js":"../node_modules/axios/lib/helpers/toFormData.js","../platform/index.js":"../node_modules/axios/lib/platform/index.js"}],"../node_modules/axios/lib/helpers/formDataToJSON.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("../utils.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return _utils.default.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === '__proto__') return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && _utils.default.isArray(target) ? target.length : name;
    if (isLast) {
      if (_utils.default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !_utils.default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && _utils.default.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (_utils.default.isFormData(formData) && _utils.default.isFunction(formData.entries)) {
    const obj = {};
    _utils.default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
var _default = exports.default = formDataToJSON;
},{"../utils.js":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/defaults/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("../utils.js"));
var _AxiosError = _interopRequireDefault(require("../core/AxiosError.js"));
var _transitional = _interopRequireDefault(require("./transitional.js"));
var _toFormData = _interopRequireDefault(require("../helpers/toFormData.js"));
var _toURLEncodedForm = _interopRequireDefault(require("../helpers/toURLEncodedForm.js"));
var _index = _interopRequireDefault(require("../platform/index.js"));
var _formDataToJSON = _interopRequireDefault(require("../helpers/formDataToJSON.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (_utils.default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils.default.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: _transitional.default,
  adapter: ['xhr', 'http'],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = _utils.default.isObject(data);
    if (isObjectPayload && _utils.default.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData = _utils.default.isFormData(data);
    if (isFormData) {
      return hasJSONContentType ? JSON.stringify((0, _formDataToJSON.default)(data)) : data;
    }
    if (_utils.default.isArrayBuffer(data) || _utils.default.isBuffer(data) || _utils.default.isStream(data) || _utils.default.isFile(data) || _utils.default.isBlob(data)) {
      return data;
    }
    if (_utils.default.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (_utils.default.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }
    let isFileList;
    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return (0, _toURLEncodedForm.default)(data, this.formSerializer).toString();
      }
      if ((isFileList = _utils.default.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;
        return (0, _toFormData.default)(isFileList ? {
          'files[]': data
        } : data, _FormData && new _FormData(), this.formSerializer);
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';
    if (data && _utils.default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw _AxiosError.default.from(e, _AxiosError.default.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _index.default.classes.FormData,
    Blob: _index.default.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};
_utils.default.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], method => {
  defaults.headers[method] = {};
});
var _default = exports.default = defaults;
},{"../utils.js":"../node_modules/axios/lib/utils.js","../core/AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js","./transitional.js":"../node_modules/axios/lib/defaults/transitional.js","../helpers/toFormData.js":"../node_modules/axios/lib/helpers/toFormData.js","../helpers/toURLEncodedForm.js":"../node_modules/axios/lib/helpers/toURLEncodedForm.js","../platform/index.js":"../node_modules/axios/lib/platform/index.js","../helpers/formDataToJSON.js":"../node_modules/axios/lib/helpers/formDataToJSON.js"}],"../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("./../utils.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils.default.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var _default = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });
  return parsed;
};
exports.default = _default;
},{"./../utils.js":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/AxiosHeaders.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("../utils.js"));
var _parseHeaders = _interopRequireDefault(require("../helpers/parseHeaders.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const $internals = Symbol('internals');
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return _utils.default.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = str => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (_utils.default.isFunction(filter)) {
    return filter.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!_utils.default.isString(value)) return;
  if (_utils.default.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }
  if (_utils.default.isRegExp(filter)) {
    return filter.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = _utils.default.toCamelCase(' ' + header);
  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function (arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }
      const key = _utils.default.findKey(self, lHeader);
      if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
        self[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => _utils.default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (_utils.default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (_utils.default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0, _parseHeaders.default)(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = _utils.default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (_utils.default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (_utils.default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = _utils.default.findKey(this, header);
      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = _utils.default.findKey(self, _header);
        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];
          deleted = true;
        }
      }
    }
    if (_utils.default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self = this;
    const headers = {};
    _utils.default.forEach(this, (value, header) => {
      const key = _utils.default.findKey(headers, header);
      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self[header];
      }
      self[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = Object.create(null);
    _utils.default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && _utils.default.isArray(value) ? value.join(', ') : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach(target => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }
    _utils.default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
_utils.default.reduceDescriptors(AxiosHeaders.prototype, ({
  value
}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
_utils.default.freezeMethods(AxiosHeaders);
var _default = exports.default = AxiosHeaders;
},{"../utils.js":"../node_modules/axios/lib/utils.js","../helpers/parseHeaders.js":"../node_modules/axios/lib/helpers/parseHeaders.js"}],"../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformData;
var _utils = _interopRequireDefault(require("./../utils.js"));
var _index = _interopRequireDefault(require("../defaults/index.js"));
var _AxiosHeaders = _interopRequireDefault(require("../core/AxiosHeaders.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _index.default;
  const context = response || config;
  const headers = _AxiosHeaders.default.from(context.headers);
  let data = context.data;
  _utils.default.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });
  headers.normalize();
  return data;
}
},{"./../utils.js":"../node_modules/axios/lib/utils.js","../defaults/index.js":"../node_modules/axios/lib/defaults/index.js","../core/AxiosHeaders.js":"../node_modules/axios/lib/core/AxiosHeaders.js"}],"../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCancel;
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}
},{}],"../node_modules/axios/lib/cancel/CanceledError.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AxiosError = _interopRequireDefault(require("../core/AxiosError.js"));
var _utils = _interopRequireDefault(require("../utils.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  _AxiosError.default.call(this, message == null ? 'canceled' : message, _AxiosError.default.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}
_utils.default.inherits(CanceledError, _AxiosError.default, {
  __CANCEL__: true
});
var _default = exports.default = CanceledError;
},{"../core/AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js","../utils.js":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = settle;
var _AxiosError = _interopRequireDefault(require("./AxiosError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new _AxiosError.default('Request failed with status code ' + response.status, [_AxiosError.default.ERR_BAD_REQUEST, _AxiosError.default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
}
},{"./AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js"}],"../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("./../utils.js"));
var _index = _interopRequireDefault(require("../platform/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = _index.default.hasStandardBrowserEnv ?
// Standard browser envs support document.cookie
{
  write(name, value, expires, path, domain, secure) {
    const cookie = [name + '=' + encodeURIComponent(value)];
    _utils.default.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());
    _utils.default.isString(path) && cookie.push('path=' + path);
    _utils.default.isString(domain) && cookie.push('domain=' + domain);
    secure === true && cookie.push('secure');
    document.cookie = cookie.join('; ');
  },
  read(name) {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? decodeURIComponent(match[3]) : null;
  },
  remove(name) {
    this.write(name, '', Date.now() - 86400000);
  }
} :
// Non-standard browser env (web workers, react-native) lack needed support.
{
  write() {},
  read() {
    return null;
  },
  remove() {}
};
},{"./../utils.js":"../node_modules/axios/lib/utils.js","../platform/index.js":"../node_modules/axios/lib/platform/index.js"}],"../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
},{}],"../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}
},{}],"../node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFullPath;
var _isAbsoluteURL = _interopRequireDefault(require("../helpers/isAbsoluteURL.js"));
var _combineURLs = _interopRequireDefault(require("../helpers/combineURLs.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}
},{"../helpers/isAbsoluteURL.js":"../node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs.js":"../node_modules/axios/lib/helpers/combineURLs.js"}],"../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("./../utils.js"));
var _index = _interopRequireDefault(require("../platform/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = _index.default.hasStandardBrowserEnv ?
// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  const msie = /(msie|trident)/i.test(navigator.userAgent);
  const urlParsingNode = document.createElement('a');
  let originURL;

  /**
  * Parse a URL to discover its components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    let href = url;
    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    const parsed = _utils.default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :
// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();
},{"./../utils.js":"../node_modules/axios/lib/utils.js","../platform/index.js":"../node_modules/axios/lib/platform/index.js"}],"../node_modules/axios/lib/helpers/parseProtocol.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseProtocol;
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}
},{}],"../node_modules/axios/lib/helpers/speedometer.js":[function(require,module,exports) {
'use strict';

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== undefined ? min : 1000;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}
var _default = exports.default = speedometer;
},{}],"../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("./../utils.js"));
var _settle = _interopRequireDefault(require("./../core/settle.js"));
var _cookies = _interopRequireDefault(require("./../helpers/cookies.js"));
var _buildURL = _interopRequireDefault(require("./../helpers/buildURL.js"));
var _buildFullPath = _interopRequireDefault(require("../core/buildFullPath.js"));
var _isURLSameOrigin = _interopRequireDefault(require("./../helpers/isURLSameOrigin.js"));
var _transitional = _interopRequireDefault(require("../defaults/transitional.js"));
var _AxiosError = _interopRequireDefault(require("../core/AxiosError.js"));
var _CanceledError = _interopRequireDefault(require("../cancel/CanceledError.js"));
var _parseProtocol = _interopRequireDefault(require("../helpers/parseProtocol.js"));
var _index = _interopRequireDefault(require("../platform/index.js"));
var _AxiosHeaders = _interopRequireDefault(require("../core/AxiosHeaders.js"));
var _speedometer2 = _interopRequireDefault(require("../helpers/speedometer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = (0, _speedometer2.default)(50, 250);
  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };
    data[isDownloadStream ? 'download' : 'upload'] = true;
    listener(data);
  };
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
var _default = exports.default = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = _AxiosHeaders.default.from(config.headers).normalize();
    let {
      responseType,
      withXSRFToken
    } = config;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }
    let contentType;
    if (_utils.default.isFormData(requestData)) {
      if (_index.default.hasStandardBrowserEnv || _index.default.hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }
    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }
    const fullPath = (0, _buildFullPath.default)(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), (0, _buildURL.default)(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = _AxiosHeaders.default.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      (0, _settle.default)(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }
    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new _AxiosError.default('Request aborted', _AxiosError.default.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new _AxiosError.default('Network Error', _AxiosError.default.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || _transitional.default;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new _AxiosError.default(timeoutErrorMessage, transitional.clarifyTimeoutError ? _AxiosError.default.ETIMEDOUT : _AxiosError.default.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (_index.default.hasStandardBrowserEnv) {
      withXSRFToken && _utils.default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));
      if (withXSRFToken || withXSRFToken !== false && (0, _isURLSameOrigin.default)(fullPath)) {
        // Add xsrf header
        const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && _cookies.default.read(config.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      _utils.default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!_utils.default.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }
    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new _CanceledError.default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }
    const protocol = (0, _parseProtocol.default)(fullPath);
    if (protocol && _index.default.protocols.indexOf(protocol) === -1) {
      reject(new _AxiosError.default('Unsupported protocol ' + protocol + ':', _AxiosError.default.ERR_BAD_REQUEST, config));
      return;
    }

    // Send the request
    request.send(requestData || null);
  });
};
},{"./../utils.js":"../node_modules/axios/lib/utils.js","./../core/settle.js":"../node_modules/axios/lib/core/settle.js","./../helpers/cookies.js":"../node_modules/axios/lib/helpers/cookies.js","./../helpers/buildURL.js":"../node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath.js":"../node_modules/axios/lib/core/buildFullPath.js","./../helpers/isURLSameOrigin.js":"../node_modules/axios/lib/helpers/isURLSameOrigin.js","../defaults/transitional.js":"../node_modules/axios/lib/defaults/transitional.js","../core/AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js","../cancel/CanceledError.js":"../node_modules/axios/lib/cancel/CanceledError.js","../helpers/parseProtocol.js":"../node_modules/axios/lib/helpers/parseProtocol.js","../platform/index.js":"../node_modules/axios/lib/platform/index.js","../core/AxiosHeaders.js":"../node_modules/axios/lib/core/AxiosHeaders.js","../helpers/speedometer.js":"../node_modules/axios/lib/helpers/speedometer.js"}],"../node_modules/axios/lib/adapters/adapters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("../utils.js"));
var _http = _interopRequireDefault(require("./http.js"));
var _xhr = _interopRequireDefault(require("./xhr.js"));
var _AxiosError = _interopRequireDefault(require("../core/AxiosError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const knownAdapters = {
  http: _http.default,
  xhr: _xhr.default
};
_utils.default.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {
        value
      });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {
      value
    });
  }
});
const renderReason = reason => `- ${reason}`;
const isResolvedHandle = adapter => _utils.default.isFunction(adapter) || adapter === null || adapter === false;
var _default = exports.default = {
  getAdapter: adapters => {
    adapters = _utils.default.isArray(adapters) ? adapters : [adapters];
    const {
      length
    } = adapters;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === undefined) {
          throw new _AxiosError.default(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || '#' + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? 'is not supported by the environment' : 'is not available in the build'));
      let s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
      throw new _AxiosError.default(`There is no suitable adapter to dispatch the request ` + s, 'ERR_NOT_SUPPORT');
    }
    return adapter;
  },
  adapters: knownAdapters
};
},{"../utils.js":"../node_modules/axios/lib/utils.js","./http.js":"../node_modules/axios/lib/helpers/null.js","./xhr.js":"../node_modules/axios/lib/adapters/xhr.js","../core/AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js"}],"../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dispatchRequest;
var _transformData = _interopRequireDefault(require("./transformData.js"));
var _isCancel = _interopRequireDefault(require("../cancel/isCancel.js"));
var _index = _interopRequireDefault(require("../defaults/index.js"));
var _CanceledError = _interopRequireDefault(require("../cancel/CanceledError.js"));
var _AxiosHeaders = _interopRequireDefault(require("../core/AxiosHeaders.js"));
var _adapters = _interopRequireDefault(require("../adapters/adapters.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new _CanceledError.default(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = _AxiosHeaders.default.from(config.headers);

  // Transform request data
  config.data = _transformData.default.call(config, config.transformRequest);
  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }
  const adapter = _adapters.default.getAdapter(config.adapter || _index.default.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = _transformData.default.call(config, config.transformResponse, response);
    response.headers = _AxiosHeaders.default.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!(0, _isCancel.default)(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = _transformData.default.call(config, config.transformResponse, reason.response);
        reason.response.headers = _AxiosHeaders.default.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
},{"./transformData.js":"../node_modules/axios/lib/core/transformData.js","../cancel/isCancel.js":"../node_modules/axios/lib/cancel/isCancel.js","../defaults/index.js":"../node_modules/axios/lib/defaults/index.js","../cancel/CanceledError.js":"../node_modules/axios/lib/cancel/CanceledError.js","../core/AxiosHeaders.js":"../node_modules/axios/lib/core/AxiosHeaders.js","../adapters/adapters.js":"../node_modules/axios/lib/adapters/adapters.js"}],"../node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeConfig;
var _utils = _interopRequireDefault(require("../utils.js"));
var _AxiosHeaders = _interopRequireDefault(require("./AxiosHeaders.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const headersToObject = thing => thing instanceof _AxiosHeaders.default ? {
  ...thing
} : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (_utils.default.isPlainObject(target) && _utils.default.isPlainObject(source)) {
      return _utils.default.merge.call({
        caseless
      }, target, source);
    } else if (_utils.default.isPlainObject(source)) {
      return _utils.default.merge({}, source);
    } else if (_utils.default.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!_utils.default.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!_utils.default.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils.default.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils.default.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils.default.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };
  _utils.default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    _utils.default.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
},{"../utils.js":"../node_modules/axios/lib/utils.js","./AxiosHeaders.js":"../node_modules/axios/lib/core/AxiosHeaders.js"}],"../node_modules/axios/lib/env/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = void 0;
const VERSION = exports.VERSION = "1.6.8";
},{}],"../node_modules/axios/lib/helpers/validator.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _data = require("../env/data.js");
var _AxiosError = _interopRequireDefault(require("../core/AxiosError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});
const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + _data.VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _AxiosError.default(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), _AxiosError.default.ERR_DEPRECATED);
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
    }
    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new _AxiosError.default('options must be an object', _AxiosError.default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new _AxiosError.default('option ' + opt + ' must be ' + result, _AxiosError.default.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _AxiosError.default('Unknown option ' + opt, _AxiosError.default.ERR_BAD_OPTION);
    }
  }
}
var _default = exports.default = {
  assertOptions,
  validators
};
},{"../env/data.js":"../node_modules/axios/lib/env/data.js","../core/AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js"}],"../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("./../utils.js"));
var _buildURL = _interopRequireDefault(require("../helpers/buildURL.js"));
var _InterceptorManager = _interopRequireDefault(require("./InterceptorManager.js"));
var _dispatchRequest = _interopRequireDefault(require("./dispatchRequest.js"));
var _mergeConfig = _interopRequireDefault(require("./mergeConfig.js"));
var _buildFullPath = _interopRequireDefault(require("./buildFullPath.js"));
var _validator = _interopRequireDefault(require("../helpers/validator.js"));
var _AxiosHeaders = _interopRequireDefault(require("./AxiosHeaders.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validators = _validator.default.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;
        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
        if (!err.stack) {
          err.stack = stack;
          // match without the 2 top stack lines
        } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
          err.stack += '\n' + stack;
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = (0, _mergeConfig.default)(this.defaults, config);
    const {
      transitional,
      paramsSerializer,
      headers
    } = config;
    if (transitional !== undefined) {
      _validator.default.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (_utils.default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        _validator.default.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && _utils.default.merge(headers.common, headers[config.method]);
    headers && _utils.default.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], method => {
      delete headers[method];
    });
    config.headers = _AxiosHeaders.default.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [_dispatchRequest.default.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = _dispatchRequest.default.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = (0, _mergeConfig.default)(this.defaults, config);
    const fullPath = (0, _buildFullPath.default)(config.baseURL, config.url);
    return (0, _buildURL.default)(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils.default.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request((0, _mergeConfig.default)(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
_utils.default.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request((0, _mergeConfig.default)(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
var _default = exports.default = Axios;
},{"./../utils.js":"../node_modules/axios/lib/utils.js","../helpers/buildURL.js":"../node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager.js":"../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest.js":"../node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig.js":"../node_modules/axios/lib/core/mergeConfig.js","./buildFullPath.js":"../node_modules/axios/lib/core/buildFullPath.js","../helpers/validator.js":"../node_modules/axios/lib/helpers/validator.js","./AxiosHeaders.js":"../node_modules/axios/lib/core/AxiosHeaders.js"}],"../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CanceledError = _interopRequireDefault(require("./CanceledError.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }
      token.reason = new _CanceledError.default(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}
var _default = exports.default = CancelToken;
},{"./CanceledError.js":"../node_modules/axios/lib/cancel/CanceledError.js"}],"../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spread;
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
},{}],"../node_modules/axios/lib/helpers/isAxiosError.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAxiosError;
var _utils = _interopRequireDefault(require("./../utils.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils.default.isObject(payload) && payload.isAxiosError === true;
}
},{"./../utils.js":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/HttpStatusCode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
var _default = exports.default = HttpStatusCode;
},{}],"../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = _interopRequireDefault(require("./utils.js"));
var _bind = _interopRequireDefault(require("./helpers/bind.js"));
var _Axios = _interopRequireDefault(require("./core/Axios.js"));
var _mergeConfig = _interopRequireDefault(require("./core/mergeConfig.js"));
var _index = _interopRequireDefault(require("./defaults/index.js"));
var _formDataToJSON = _interopRequireDefault(require("./helpers/formDataToJSON.js"));
var _CanceledError = _interopRequireDefault(require("./cancel/CanceledError.js"));
var _CancelToken = _interopRequireDefault(require("./cancel/CancelToken.js"));
var _isCancel = _interopRequireDefault(require("./cancel/isCancel.js"));
var _data = require("./env/data.js");
var _toFormData = _interopRequireDefault(require("./helpers/toFormData.js"));
var _AxiosError = _interopRequireDefault(require("./core/AxiosError.js"));
var _spread = _interopRequireDefault(require("./helpers/spread.js"));
var _isAxiosError = _interopRequireDefault(require("./helpers/isAxiosError.js"));
var _AxiosHeaders = _interopRequireDefault(require("./core/AxiosHeaders.js"));
var _adapters = _interopRequireDefault(require("./adapters/adapters.js"));
var _HttpStatusCode = _interopRequireDefault(require("./helpers/HttpStatusCode.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _Axios.default(defaultConfig);
  const instance = (0, _bind.default)(_Axios.default.prototype.request, context);

  // Copy axios.prototype to instance
  _utils.default.extend(instance, _Axios.default.prototype, context, {
    allOwnKeys: true
  });

  // Copy context to instance
  _utils.default.extend(instance, context, null, {
    allOwnKeys: true
  });

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0, _mergeConfig.default)(defaultConfig, instanceConfig));
  };
  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_index.default);

// Expose Axios class to allow class inheritance
axios.Axios = _Axios.default;

// Expose Cancel & CancelToken
axios.CanceledError = _CanceledError.default;
axios.CancelToken = _CancelToken.default;
axios.isCancel = _isCancel.default;
axios.VERSION = _data.VERSION;
axios.toFormData = _toFormData.default;

// Expose AxiosError class
axios.AxiosError = _AxiosError.default;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = _spread.default;

// Expose isAxiosError
axios.isAxiosError = _isAxiosError.default;

// Expose mergeConfig
axios.mergeConfig = _mergeConfig.default;
axios.AxiosHeaders = _AxiosHeaders.default;
axios.formToJSON = thing => (0, _formDataToJSON.default)(_utils.default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = _adapters.default.getAdapter;
axios.HttpStatusCode = _HttpStatusCode.default;
axios.default = axios;

// this module should only have a default export
var _default = exports.default = axios;
},{"./utils.js":"../node_modules/axios/lib/utils.js","./helpers/bind.js":"../node_modules/axios/lib/helpers/bind.js","./core/Axios.js":"../node_modules/axios/lib/core/Axios.js","./core/mergeConfig.js":"../node_modules/axios/lib/core/mergeConfig.js","./defaults/index.js":"../node_modules/axios/lib/defaults/index.js","./helpers/formDataToJSON.js":"../node_modules/axios/lib/helpers/formDataToJSON.js","./cancel/CanceledError.js":"../node_modules/axios/lib/cancel/CanceledError.js","./cancel/CancelToken.js":"../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel.js":"../node_modules/axios/lib/cancel/isCancel.js","./env/data.js":"../node_modules/axios/lib/env/data.js","./helpers/toFormData.js":"../node_modules/axios/lib/helpers/toFormData.js","./core/AxiosError.js":"../node_modules/axios/lib/core/AxiosError.js","./helpers/spread.js":"../node_modules/axios/lib/helpers/spread.js","./helpers/isAxiosError.js":"../node_modules/axios/lib/helpers/isAxiosError.js","./core/AxiosHeaders.js":"../node_modules/axios/lib/core/AxiosHeaders.js","./adapters/adapters.js":"../node_modules/axios/lib/adapters/adapters.js","./helpers/HttpStatusCode.js":"../node_modules/axios/lib/helpers/HttpStatusCode.js"}],"../node_modules/axios/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.VERSION = exports.HttpStatusCode = exports.CanceledError = exports.CancelToken = exports.Cancel = exports.AxiosHeaders = exports.AxiosError = exports.Axios = void 0;
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _axios.default;
  }
});
exports.toFormData = exports.spread = exports.mergeConfig = exports.isCancel = exports.isAxiosError = exports.getAdapter = exports.formToJSON = void 0;
var _axios = _interopRequireDefault(require("./lib/axios.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const {
  Axios,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken,
  VERSION,
  all,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = _axios.default;
exports.mergeConfig = mergeConfig;
exports.getAdapter = getAdapter;
exports.formToJSON = formToJSON;
exports.HttpStatusCode = HttpStatusCode;
exports.AxiosHeaders = AxiosHeaders;
exports.toFormData = toFormData;
exports.spread = spread;
exports.isAxiosError = isAxiosError;
exports.Cancel = Cancel;
exports.all = all;
exports.VERSION = VERSION;
exports.CancelToken = CancelToken;
exports.isCancel = isCancel;
exports.CanceledError = CanceledError;
exports.AxiosError = AxiosError;
exports.Axios = Axios;
},{"./lib/axios.js":"../node_modules/axios/lib/axios.js"}],"charts.js":[function(require,module,exports) {
"use strict";

require("core-js/modules/es6.array.copy-within.js");
require("core-js/modules/es6.array.fill.js");
require("core-js/modules/es6.array.filter.js");
require("core-js/modules/es6.array.find.js");
require("core-js/modules/es6.array.find-index.js");
require("core-js/modules/es7.array.flat-map.js");
require("core-js/modules/es6.array.from.js");
require("core-js/modules/es7.array.includes.js");
require("core-js/modules/es6.array.iterator.js");
require("core-js/modules/es6.array.map.js");
require("core-js/modules/es6.array.of.js");
require("core-js/modules/es6.array.slice.js");
require("core-js/modules/es6.array.species.js");
require("core-js/modules/es6.date.to-primitive.js");
require("core-js/modules/es6.function.has-instance.js");
require("core-js/modules/es6.function.name.js");
require("core-js/modules/es6.map.js");
require("core-js/modules/es6.math.acosh.js");
require("core-js/modules/es6.math.asinh.js");
require("core-js/modules/es6.math.atanh.js");
require("core-js/modules/es6.math.cbrt.js");
require("core-js/modules/es6.math.clz32.js");
require("core-js/modules/es6.math.cosh.js");
require("core-js/modules/es6.math.expm1.js");
require("core-js/modules/es6.math.fround.js");
require("core-js/modules/es6.math.hypot.js");
require("core-js/modules/es6.math.imul.js");
require("core-js/modules/es6.math.log1p.js");
require("core-js/modules/es6.math.log10.js");
require("core-js/modules/es6.math.log2.js");
require("core-js/modules/es6.math.sign.js");
require("core-js/modules/es6.math.sinh.js");
require("core-js/modules/es6.math.tanh.js");
require("core-js/modules/es6.math.trunc.js");
require("core-js/modules/es6.number.constructor.js");
require("core-js/modules/es6.number.epsilon.js");
require("core-js/modules/es6.number.is-finite.js");
require("core-js/modules/es6.number.is-integer.js");
require("core-js/modules/es6.number.is-nan.js");
require("core-js/modules/es6.number.is-safe-integer.js");
require("core-js/modules/es6.number.max-safe-integer.js");
require("core-js/modules/es6.number.min-safe-integer.js");
require("core-js/modules/es6.number.parse-float.js");
require("core-js/modules/es6.number.parse-int.js");
require("core-js/modules/es6.object.assign.js");
require("core-js/modules/es7.object.define-getter.js");
require("core-js/modules/es7.object.define-setter.js");
require("core-js/modules/es7.object.entries.js");
require("core-js/modules/es6.object.freeze.js");
require("core-js/modules/es6.object.get-own-property-descriptor.js");
require("core-js/modules/es7.object.get-own-property-descriptors.js");
require("core-js/modules/es6.object.get-own-property-names.js");
require("core-js/modules/es6.object.get-prototype-of.js");
require("core-js/modules/es7.object.lookup-getter.js");
require("core-js/modules/es7.object.lookup-setter.js");
require("core-js/modules/es6.object.prevent-extensions.js");
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.object.is.js");
require("core-js/modules/es6.object.is-frozen.js");
require("core-js/modules/es6.object.is-sealed.js");
require("core-js/modules/es6.object.is-extensible.js");
require("core-js/modules/es6.object.keys.js");
require("core-js/modules/es6.object.seal.js");
require("core-js/modules/es7.object.values.js");
require("core-js/modules/es6.promise.js");
require("core-js/modules/es7.promise.finally.js");
require("core-js/modules/es6.reflect.apply.js");
require("core-js/modules/es6.reflect.construct.js");
require("core-js/modules/es6.reflect.define-property.js");
require("core-js/modules/es6.reflect.delete-property.js");
require("core-js/modules/es6.reflect.get.js");
require("core-js/modules/es6.reflect.get-own-property-descriptor.js");
require("core-js/modules/es6.reflect.get-prototype-of.js");
require("core-js/modules/es6.reflect.has.js");
require("core-js/modules/es6.reflect.is-extensible.js");
require("core-js/modules/es6.reflect.own-keys.js");
require("core-js/modules/es6.reflect.prevent-extensions.js");
require("core-js/modules/es6.reflect.set.js");
require("core-js/modules/es6.reflect.set-prototype-of.js");
require("core-js/modules/es6.regexp.constructor.js");
require("core-js/modules/es6.regexp.flags.js");
require("core-js/modules/es6.regexp.match.js");
require("core-js/modules/es6.regexp.replace.js");
require("core-js/modules/es6.regexp.split.js");
require("core-js/modules/es6.regexp.search.js");
require("core-js/modules/es6.regexp.to-string.js");
require("core-js/modules/es6.set.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es7.symbol.async-iterator.js");
require("core-js/modules/es6.string.anchor.js");
require("core-js/modules/es6.string.big.js");
require("core-js/modules/es6.string.blink.js");
require("core-js/modules/es6.string.bold.js");
require("core-js/modules/es6.string.code-point-at.js");
require("core-js/modules/es6.string.ends-with.js");
require("core-js/modules/es6.string.fixed.js");
require("core-js/modules/es6.string.fontcolor.js");
require("core-js/modules/es6.string.fontsize.js");
require("core-js/modules/es6.string.from-code-point.js");
require("core-js/modules/es6.string.includes.js");
require("core-js/modules/es6.string.italics.js");
require("core-js/modules/es6.string.iterator.js");
require("core-js/modules/es6.string.link.js");
require("core-js/modules/es7.string.pad-start.js");
require("core-js/modules/es7.string.pad-end.js");
require("core-js/modules/es6.string.raw.js");
require("core-js/modules/es6.string.repeat.js");
require("core-js/modules/es6.string.small.js");
require("core-js/modules/es6.string.starts-with.js");
require("core-js/modules/es6.string.strike.js");
require("core-js/modules/es6.string.sub.js");
require("core-js/modules/es6.string.sup.js");
require("core-js/modules/es7.string.trim-left.js");
require("core-js/modules/es7.string.trim-right.js");
require("core-js/modules/es6.typed.array-buffer.js");
require("core-js/modules/es6.typed.int8-array.js");
require("core-js/modules/es6.typed.uint8-array.js");
require("core-js/modules/es6.typed.uint8-clamped-array.js");
require("core-js/modules/es6.typed.int16-array.js");
require("core-js/modules/es6.typed.uint16-array.js");
require("core-js/modules/es6.typed.int32-array.js");
require("core-js/modules/es6.typed.uint32-array.js");
require("core-js/modules/es6.typed.float32-array.js");
require("core-js/modules/es6.typed.float64-array.js");
require("core-js/modules/es6.weak-map.js");
require("core-js/modules/es6.weak-set.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/web.immediate.js");
require("core-js/modules/web.dom.iterable.js");
require("regenerator-runtime/runtime.js");
var _lightweightCharts = require("lightweight-charts");
var _socket = _interopRequireDefault(require("socket.io-client"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function calculateSMA(data, windowSize) {
  var rAvg = [];
  for (var i = 0; i < data.length - windowSize + 1; i++) {
    var sum = 0;
    for (var j = 0; j < windowSize; j++) {
      sum += data[i + j].close;
    }
    rAvg.push({
      time: data[i + windowSize - 1].time,
      value: sum / windowSize
    });
  }
  return rAvg;
}
function calculateRSI(data, windowSize) {
  var diff = data.map(function (a, i, arr) {
    return i > 0 ? a.close - arr[i - 1].close : 0;
  });
  var gains = diff.map(function (a) {
    return a > 0 ? a : 0;
  });
  var losses = diff.map(function (a) {
    return a < 0 ? Math.abs(a) : 0;
  });
  var avgGain = [];
  var avgLoss = [];
  for (var i = 0; i < data.length; i++) {
    if (i < windowSize) {
      avgGain[i] = (i > 0 ? avgGain[i - 1] * (i - 1) : 0) + gains[i];
      avgLoss[i] = (i > 0 ? avgLoss[i - 1] * (i - 1) : 0) + losses[i];
      if (i === windowSize - 1) {
        avgGain[i] /= windowSize;
        avgLoss[i] /= windowSize;
      }
    } else {
      avgGain[i] = (avgGain[i - 1] * (windowSize - 1) + gains[i]) / windowSize;
      avgLoss[i] = (avgLoss[i - 1] * (windowSize - 1) + losses[i]) / windowSize;
    }
  }
  var rs = avgGain.map(function (a, i) {
    return avgLoss[i] !== 0 ? a / avgLoss[i] : 0;
  });
  var rsi = rs.map(function (a) {
    return 100 - 100 / (1 + a);
  });
  return rsi.map(function (a, i) {
    return {
      time: data[i].time,
      value: a
    };
  });
}
function calculateEMA(data, windowSize) {
  var multiplier = 2 / (windowSize + 1);
  var emaArray = [{
    time: data[0].time,
    value: data[0].close
  }];
  for (var i = 1; i < data.length; i++) {
    var ema = (data[i].close - emaArray[i - 1].value) * multiplier + emaArray[i - 1].value;
    emaArray.push({
      time: data[i].time,
      value: ema
    });
  }
  return emaArray;
}
function calculateMACD(data, shortPeriod, longPeriod, signalPeriod) {
  var shortEMA = calculateEMA(data, shortPeriod);
  var longEMA = calculateEMA(data, longPeriod);
  var MACDLine = shortEMA.map(function (ema, i) {
    return {
      time: ema.time,
      value: ema.value - (longEMA[i] ? longEMA[i].value : 0)
    };
  });
  var signalLine = calculateEMA(MACDLine, signalPeriod);
  return {
    MACDLine: MACDLine,
    signalLine: signalLine
  };
}
var socket = (0, _socket.default)();
var chart = (0, _lightweightCharts.createChart)(document.getElementById("chart"), {
  width: 800,
  height: 600,
  layout: {
    backgroundColor: "#253248",
    textColor: "rgba(255, 255, 255, 0.9)"
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.5)"
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.5)"
    }
  },
  crosshair: {
    mode: _lightweightCharts.CrosshairMode.Normal
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)"
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)"
  }
});
var candleSeries = chart.addCandlestickSeries({
  upColor: "rgba(0, 150, 136, 1)",
  downColor: "rgba(255, 82, 82, 1)",
  wickUpColor: "rgba(0, 150, 136, 1)",
  wickDownColor: "rgba(255, 82, 82, 1)"
});
var lineSeries = chart.addLineSeries();
var smaSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(4, 111, 232, 1)",
  lineWidth: 2
});
var emaSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(255, 165, 0, 1)",
  lineWidth: 2
});
var rsiSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(165, 42, 42, 1)",
  lineWidth: 2
});
var macdSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(255, 0, 0, 1)",
  lineWidth: 2
});
document.getElementById("sma-button").addEventListener("click", function () {
  smaSeries.applyOptions({
    visible: !smaSeries.options().visible
  });
});
document.getElementById("ema-button").addEventListener("click", function () {
  emaSeries.applyOptions({
    visible: !emaSeries.options().visible
  });
});
document.getElementById("rsi-button").addEventListener("click", function () {
  rsiSeries.applyOptions({
    visible: !rsiSeries.options().visible
  });
});
document.getElementById("macd-button").addEventListener("click", function () {
  macdSeries.applyOptions({
    visible: !macdSeries.options().visible
  });
});
var stockNum = document.getElementById("chartContainer").dataset.stocknum;
var oldData = document.getElementById("old").dataset.olddata;
var oldDataJson = JSON.parse(oldData);
var reqOldData = oldDataJson.map(function (stockData, i) {
  var timeInSecondsOld = Math.floor(Date.now() / 1000) + i * 10;
  return {
    time: timeInSecondsOld,
    open: stockData.OPEN,
    high: stockData.HIGH,
    low: stockData.LOW,
    close: stockData.CLOSE
  };
});
var smaData = calculateSMA(reqOldData, 14);
var emaData = calculateEMA(reqOldData, 14);
var rsiData = calculateRSI(reqOldData, 14);
var macdData = calculateMACD(reqOldData, 12, 26, 9);
candleSeries.setData(reqOldData);
lineSeries.setData(reqOldData);
macdSeries.setData(macdData.MACDLine);
rsiSeries.setData(rsiData);
smaSeries.setData(smaData);
emaSeries.setData(emaData);
socket.on("stockData", function (data) {
  if (stockNum == data.stockNum) {
    var newData = data.data.map(function (stockData, i) {
      var timeInSeconds = Math.floor(Date.now() / 1000) + i * 10;
      return {
        time: timeInSeconds,
        open: stockData.OPEN,
        high: stockData.HIGH,
        low: stockData.LOW,
        close: stockData.CLOSE
      };
    });
    var _smaData = calculateSMA(newData, 14);
    var _emaData = calculateEMA(newData, 14);
    var _rsiData = calculateRSI(newData, 14);
    var _macdData = calculateMACD(newData, 12, 26, 9);
    candleSeries.setData(newData);
    lineSeries.setData(newData);
    macdSeries.setData(_macdData.MACDLine);
    rsiSeries.setData(_rsiData);
    smaSeries.setData(_smaData);
    emaSeries.setData(_emaData);
    document.getElementById("price").innerText = newData[newData.length - 1].close;
  }
});
socket.on("message", function (data) {
  document.getElementById("message-content").innerText = data.data.message;
});
document.getElementById("buy-tip").addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return (0, _axios.default)({
          method: 'PATCH',
          url: "/stock/tips/"
        });
      case 2:
        document.getElementById("tips-button").style.display = "none";
        document.getElementById("tip-message").style.display = "block";
        setTimeout(function () {
          document.getElementById("tip-message").style.display = "none";
          document.getElementById("tips-button").style.display = "block";
        }, 10000);
      case 5:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
},{"core-js/modules/es6.array.copy-within.js":"../node_modules/core-js/modules/es6.array.copy-within.js","core-js/modules/es6.array.fill.js":"../node_modules/core-js/modules/es6.array.fill.js","core-js/modules/es6.array.filter.js":"../node_modules/core-js/modules/es6.array.filter.js","core-js/modules/es6.array.find.js":"../node_modules/core-js/modules/es6.array.find.js","core-js/modules/es6.array.find-index.js":"../node_modules/core-js/modules/es6.array.find-index.js","core-js/modules/es7.array.flat-map.js":"../node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/es6.array.from.js":"../node_modules/core-js/modules/es6.array.from.js","core-js/modules/es7.array.includes.js":"../node_modules/core-js/modules/es7.array.includes.js","core-js/modules/es6.array.iterator.js":"../node_modules/core-js/modules/es6.array.iterator.js","core-js/modules/es6.array.map.js":"../node_modules/core-js/modules/es6.array.map.js","core-js/modules/es6.array.of.js":"../node_modules/core-js/modules/es6.array.of.js","core-js/modules/es6.array.slice.js":"../node_modules/core-js/modules/es6.array.slice.js","core-js/modules/es6.array.species.js":"../node_modules/core-js/modules/es6.array.species.js","core-js/modules/es6.date.to-primitive.js":"../node_modules/core-js/modules/es6.date.to-primitive.js","core-js/modules/es6.function.has-instance.js":"../node_modules/core-js/modules/es6.function.has-instance.js","core-js/modules/es6.function.name.js":"../node_modules/core-js/modules/es6.function.name.js","core-js/modules/es6.map.js":"../node_modules/core-js/modules/es6.map.js","core-js/modules/es6.math.acosh.js":"../node_modules/core-js/modules/es6.math.acosh.js","core-js/modules/es6.math.asinh.js":"../node_modules/core-js/modules/es6.math.asinh.js","core-js/modules/es6.math.atanh.js":"../node_modules/core-js/modules/es6.math.atanh.js","core-js/modules/es6.math.cbrt.js":"../node_modules/core-js/modules/es6.math.cbrt.js","core-js/modules/es6.math.clz32.js":"../node_modules/core-js/modules/es6.math.clz32.js","core-js/modules/es6.math.cosh.js":"../node_modules/core-js/modules/es6.math.cosh.js","core-js/modules/es6.math.expm1.js":"../node_modules/core-js/modules/es6.math.expm1.js","core-js/modules/es6.math.fround.js":"../node_modules/core-js/modules/es6.math.fround.js","core-js/modules/es6.math.hypot.js":"../node_modules/core-js/modules/es6.math.hypot.js","core-js/modules/es6.math.imul.js":"../node_modules/core-js/modules/es6.math.imul.js","core-js/modules/es6.math.log1p.js":"../node_modules/core-js/modules/es6.math.log1p.js","core-js/modules/es6.math.log10.js":"../node_modules/core-js/modules/es6.math.log10.js","core-js/modules/es6.math.log2.js":"../node_modules/core-js/modules/es6.math.log2.js","core-js/modules/es6.math.sign.js":"../node_modules/core-js/modules/es6.math.sign.js","core-js/modules/es6.math.sinh.js":"../node_modules/core-js/modules/es6.math.sinh.js","core-js/modules/es6.math.tanh.js":"../node_modules/core-js/modules/es6.math.tanh.js","core-js/modules/es6.math.trunc.js":"../node_modules/core-js/modules/es6.math.trunc.js","core-js/modules/es6.number.constructor.js":"../node_modules/core-js/modules/es6.number.constructor.js","core-js/modules/es6.number.epsilon.js":"../node_modules/core-js/modules/es6.number.epsilon.js","core-js/modules/es6.number.is-finite.js":"../node_modules/core-js/modules/es6.number.is-finite.js","core-js/modules/es6.number.is-integer.js":"../node_modules/core-js/modules/es6.number.is-integer.js","core-js/modules/es6.number.is-nan.js":"../node_modules/core-js/modules/es6.number.is-nan.js","core-js/modules/es6.number.is-safe-integer.js":"../node_modules/core-js/modules/es6.number.is-safe-integer.js","core-js/modules/es6.number.max-safe-integer.js":"../node_modules/core-js/modules/es6.number.max-safe-integer.js","core-js/modules/es6.number.min-safe-integer.js":"../node_modules/core-js/modules/es6.number.min-safe-integer.js","core-js/modules/es6.number.parse-float.js":"../node_modules/core-js/modules/es6.number.parse-float.js","core-js/modules/es6.number.parse-int.js":"../node_modules/core-js/modules/es6.number.parse-int.js","core-js/modules/es6.object.assign.js":"../node_modules/core-js/modules/es6.object.assign.js","core-js/modules/es7.object.define-getter.js":"../node_modules/core-js/modules/es7.object.define-getter.js","core-js/modules/es7.object.define-setter.js":"../node_modules/core-js/modules/es7.object.define-setter.js","core-js/modules/es7.object.entries.js":"../node_modules/core-js/modules/es7.object.entries.js","core-js/modules/es6.object.freeze.js":"../node_modules/core-js/modules/es6.object.freeze.js","core-js/modules/es6.object.get-own-property-descriptor.js":"../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","core-js/modules/es7.object.get-own-property-descriptors.js":"../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","core-js/modules/es6.object.get-own-property-names.js":"../node_modules/core-js/modules/es6.object.get-own-property-names.js","core-js/modules/es6.object.get-prototype-of.js":"../node_modules/core-js/modules/es6.object.get-prototype-of.js","core-js/modules/es7.object.lookup-getter.js":"../node_modules/core-js/modules/es7.object.lookup-getter.js","core-js/modules/es7.object.lookup-setter.js":"../node_modules/core-js/modules/es7.object.lookup-setter.js","core-js/modules/es6.object.prevent-extensions.js":"../node_modules/core-js/modules/es6.object.prevent-extensions.js","core-js/modules/es6.object.to-string.js":"../node_modules/core-js/modules/es6.object.to-string.js","core-js/modules/es6.object.is.js":"../node_modules/core-js/modules/es6.object.is.js","core-js/modules/es6.object.is-frozen.js":"../node_modules/core-js/modules/es6.object.is-frozen.js","core-js/modules/es6.object.is-sealed.js":"../node_modules/core-js/modules/es6.object.is-sealed.js","core-js/modules/es6.object.is-extensible.js":"../node_modules/core-js/modules/es6.object.is-extensible.js","core-js/modules/es6.object.keys.js":"../node_modules/core-js/modules/es6.object.keys.js","core-js/modules/es6.object.seal.js":"../node_modules/core-js/modules/es6.object.seal.js","core-js/modules/es7.object.values.js":"../node_modules/core-js/modules/es7.object.values.js","core-js/modules/es6.promise.js":"../node_modules/core-js/modules/es6.promise.js","core-js/modules/es7.promise.finally.js":"../node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es6.reflect.apply.js":"../node_modules/core-js/modules/es6.reflect.apply.js","core-js/modules/es6.reflect.construct.js":"../node_modules/core-js/modules/es6.reflect.construct.js","core-js/modules/es6.reflect.define-property.js":"../node_modules/core-js/modules/es6.reflect.define-property.js","core-js/modules/es6.reflect.delete-property.js":"../node_modules/core-js/modules/es6.reflect.delete-property.js","core-js/modules/es6.reflect.get.js":"../node_modules/core-js/modules/es6.reflect.get.js","core-js/modules/es6.reflect.get-own-property-descriptor.js":"../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","core-js/modules/es6.reflect.get-prototype-of.js":"../node_modules/core-js/modules/es6.reflect.get-prototype-of.js","core-js/modules/es6.reflect.has.js":"../node_modules/core-js/modules/es6.reflect.has.js","core-js/modules/es6.reflect.is-extensible.js":"../node_modules/core-js/modules/es6.reflect.is-extensible.js","core-js/modules/es6.reflect.own-keys.js":"../node_modules/core-js/modules/es6.reflect.own-keys.js","core-js/modules/es6.reflect.prevent-extensions.js":"../node_modules/core-js/modules/es6.reflect.prevent-extensions.js","core-js/modules/es6.reflect.set.js":"../node_modules/core-js/modules/es6.reflect.set.js","core-js/modules/es6.reflect.set-prototype-of.js":"../node_modules/core-js/modules/es6.reflect.set-prototype-of.js","core-js/modules/es6.regexp.constructor.js":"../node_modules/core-js/modules/es6.regexp.constructor.js","core-js/modules/es6.regexp.flags.js":"../node_modules/core-js/modules/es6.regexp.flags.js","core-js/modules/es6.regexp.match.js":"../node_modules/core-js/modules/es6.regexp.match.js","core-js/modules/es6.regexp.replace.js":"../node_modules/core-js/modules/es6.regexp.replace.js","core-js/modules/es6.regexp.split.js":"../node_modules/core-js/modules/es6.regexp.split.js","core-js/modules/es6.regexp.search.js":"../node_modules/core-js/modules/es6.regexp.search.js","core-js/modules/es6.regexp.to-string.js":"../node_modules/core-js/modules/es6.regexp.to-string.js","core-js/modules/es6.set.js":"../node_modules/core-js/modules/es6.set.js","core-js/modules/es6.symbol.js":"../node_modules/core-js/modules/es6.symbol.js","core-js/modules/es7.symbol.async-iterator.js":"../node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es6.string.anchor.js":"../node_modules/core-js/modules/es6.string.anchor.js","core-js/modules/es6.string.big.js":"../node_modules/core-js/modules/es6.string.big.js","core-js/modules/es6.string.blink.js":"../node_modules/core-js/modules/es6.string.blink.js","core-js/modules/es6.string.bold.js":"../node_modules/core-js/modules/es6.string.bold.js","core-js/modules/es6.string.code-point-at.js":"../node_modules/core-js/modules/es6.string.code-point-at.js","core-js/modules/es6.string.ends-with.js":"../node_modules/core-js/modules/es6.string.ends-with.js","core-js/modules/es6.string.fixed.js":"../node_modules/core-js/modules/es6.string.fixed.js","core-js/modules/es6.string.fontcolor.js":"../node_modules/core-js/modules/es6.string.fontcolor.js","core-js/modules/es6.string.fontsize.js":"../node_modules/core-js/modules/es6.string.fontsize.js","core-js/modules/es6.string.from-code-point.js":"../node_modules/core-js/modules/es6.string.from-code-point.js","core-js/modules/es6.string.includes.js":"../node_modules/core-js/modules/es6.string.includes.js","core-js/modules/es6.string.italics.js":"../node_modules/core-js/modules/es6.string.italics.js","core-js/modules/es6.string.iterator.js":"../node_modules/core-js/modules/es6.string.iterator.js","core-js/modules/es6.string.link.js":"../node_modules/core-js/modules/es6.string.link.js","core-js/modules/es7.string.pad-start.js":"../node_modules/core-js/modules/es7.string.pad-start.js","core-js/modules/es7.string.pad-end.js":"../node_modules/core-js/modules/es7.string.pad-end.js","core-js/modules/es6.string.raw.js":"../node_modules/core-js/modules/es6.string.raw.js","core-js/modules/es6.string.repeat.js":"../node_modules/core-js/modules/es6.string.repeat.js","core-js/modules/es6.string.small.js":"../node_modules/core-js/modules/es6.string.small.js","core-js/modules/es6.string.starts-with.js":"../node_modules/core-js/modules/es6.string.starts-with.js","core-js/modules/es6.string.strike.js":"../node_modules/core-js/modules/es6.string.strike.js","core-js/modules/es6.string.sub.js":"../node_modules/core-js/modules/es6.string.sub.js","core-js/modules/es6.string.sup.js":"../node_modules/core-js/modules/es6.string.sup.js","core-js/modules/es7.string.trim-left.js":"../node_modules/core-js/modules/es7.string.trim-left.js","core-js/modules/es7.string.trim-right.js":"../node_modules/core-js/modules/es7.string.trim-right.js","core-js/modules/es6.typed.array-buffer.js":"../node_modules/core-js/modules/es6.typed.array-buffer.js","core-js/modules/es6.typed.int8-array.js":"../node_modules/core-js/modules/es6.typed.int8-array.js","core-js/modules/es6.typed.uint8-array.js":"../node_modules/core-js/modules/es6.typed.uint8-array.js","core-js/modules/es6.typed.uint8-clamped-array.js":"../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","core-js/modules/es6.typed.int16-array.js":"../node_modules/core-js/modules/es6.typed.int16-array.js","core-js/modules/es6.typed.uint16-array.js":"../node_modules/core-js/modules/es6.typed.uint16-array.js","core-js/modules/es6.typed.int32-array.js":"../node_modules/core-js/modules/es6.typed.int32-array.js","core-js/modules/es6.typed.uint32-array.js":"../node_modules/core-js/modules/es6.typed.uint32-array.js","core-js/modules/es6.typed.float32-array.js":"../node_modules/core-js/modules/es6.typed.float32-array.js","core-js/modules/es6.typed.float64-array.js":"../node_modules/core-js/modules/es6.typed.float64-array.js","core-js/modules/es6.weak-map.js":"../node_modules/core-js/modules/es6.weak-map.js","core-js/modules/es6.weak-set.js":"../node_modules/core-js/modules/es6.weak-set.js","core-js/modules/web.timers.js":"../node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate.js":"../node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable.js":"../node_modules/core-js/modules/web.dom.iterable.js","regenerator-runtime/runtime.js":"../node_modules/regenerator-runtime/runtime.js","lightweight-charts":"../node_modules/lightweight-charts/dist/lightweight-charts.production.mjs","socket.io-client":"../node_modules/socket.io-client/build/esm/index.js","axios":"../node_modules/axios/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57936" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","charts.js"], null)
//# sourceMappingURL=/bundle.js.map