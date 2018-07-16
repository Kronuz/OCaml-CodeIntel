module.exports = function(e) {
 var t = {};
 function n(e) {
  return "" + ({
   0: "ocaml-language-server"
  }[e] || e) + ".js";
 }
 function r(t) {
  var r = n(t);
  var i = require(__dirname + "/" + r);
  var o = i.modules, s = i.ids;
  for (var a in o) {
   e[a] = o[a];
  }
 }
 var i = [ [ "MhKX" ] ];
 for (var o = 0; o < i.length; ++o) {
  var s = i[o];
  for (var a = 1; a < s.length; ++a) {
   var u = s[a];
   r(u);
  }
 }
 function c(n) {
  if (t[n]) {
   return t[n].exports;
  }
  var r = t[n] = {
   i: n,
   l: false,
   exports: {}
  };
  e[n].call(r.exports, r, r.exports, c);
  r.l = true;
  return r.exports;
 }
 c.m = e;
 c.c = t;
 c.d = function(e, t, n) {
  if (!c.o(e, t)) {
   Object.defineProperty(e, t, {
    enumerable: true,
    get: n
   });
  }
 };
 c.r = function(e) {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
   Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
   });
  }
  Object.defineProperty(e, "__esModule", {
   value: true
  });
 };
 c.t = function(e, t) {
  if (t & 1) e = c(e);
  if (t & 8) return e;
  if (t & 4 && typeof e === "object" && e && e.__esModule) return e;
  var n = Object.create(null);
  c.r(n);
  Object.defineProperty(n, "default", {
   enumerable: true,
   value: e
  });
  if (t & 2 && typeof e != "string") for (var r in e) c.d(n, r, function(t) {
   return e[t];
  }.bind(null, r));
  return n;
 };
 c.n = function(e) {
  var t = e && e.__esModule ? function t() {
   return e["default"];
  } : function t() {
   return e;
  };
  c.d(t, "a", t);
  return t;
 };
 c.o = function(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
 };
 c.p = "";
 return c(c.s = "MhKX");
}({
 "++YM": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var r;
  (function(e) {
   e.None = 0;
   e.First = 1;
   e.Last = 2;
  })(r = t.Touch || (t.Touch = {}));
  var i = function() {
   function e() {
    this._map = new Map();
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
   }
   e.prototype.clear = function() {
    this._map.clear();
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
   };
   e.prototype.isEmpty = function() {
    return !this._head && !this._tail;
   };
   Object.defineProperty(e.prototype, "size", {
    get: function() {
     return this._size;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.has = function(e) {
    return this._map.has(e);
   };
   e.prototype.get = function(e) {
    var t = this._map.get(e);
    if (!t) {
     return undefined;
    }
    return t.value;
   };
   e.prototype.set = function(e, t, n) {
    if (n === void 0) {
     n = r.None;
    }
    var i = this._map.get(e);
    if (i) {
     i.value = t;
     if (n !== r.None) {
      this.touch(i, n);
     }
    } else {
     i = {
      key: e,
      value: t,
      next: undefined,
      previous: undefined
     };
     switch (n) {
     case r.None:
      this.addItemLast(i);
      break;

     case r.First:
      this.addItemFirst(i);
      break;

     case r.Last:
      this.addItemLast(i);
      break;

     default:
      this.addItemLast(i);
      break;
     }
     this._map.set(e, i);
     this._size++;
    }
   };
   e.prototype.delete = function(e) {
    var t = this._map.get(e);
    if (!t) {
     return false;
    }
    this._map.delete(e);
    this.removeItem(t);
    this._size--;
    return true;
   };
   e.prototype.shift = function() {
    if (!this._head && !this._tail) {
     return undefined;
    }
    if (!this._head || !this._tail) {
     throw new Error("Invalid list");
    }
    var e = this._head;
    this._map.delete(e.key);
    this.removeItem(e);
    this._size--;
    return e.value;
   };
   e.prototype.forEach = function(e, t) {
    var n = this._head;
    while (n) {
     if (t) {
      e.bind(t)(n.value, n.key, this);
     } else {
      e(n.value, n.key, this);
     }
     n = n.next;
    }
   };
   e.prototype.forEachReverse = function(e, t) {
    var n = this._tail;
    while (n) {
     if (t) {
      e.bind(t)(n.value, n.key, this);
     } else {
      e(n.value, n.key, this);
     }
     n = n.previous;
    }
   };
   e.prototype.values = function() {
    var e = [];
    var t = this._head;
    while (t) {
     e.push(t.value);
     t = t.next;
    }
    return e;
   };
   e.prototype.keys = function() {
    var e = [];
    var t = this._head;
    while (t) {
     e.push(t.key);
     t = t.next;
    }
    return e;
   };
   e.prototype.addItemFirst = function(e) {
    if (!this._head && !this._tail) {
     this._tail = e;
    } else if (!this._head) {
     throw new Error("Invalid list");
    } else {
     e.next = this._head;
     this._head.previous = e;
    }
    this._head = e;
   };
   e.prototype.addItemLast = function(e) {
    if (!this._head && !this._tail) {
     this._head = e;
    } else if (!this._tail) {
     throw new Error("Invalid list");
    } else {
     e.previous = this._tail;
     this._tail.next = e;
    }
    this._tail = e;
   };
   e.prototype.removeItem = function(e) {
    if (e === this._head && e === this._tail) {
     this._head = undefined;
     this._tail = undefined;
    } else if (e === this._head) {
     this._head = e.next;
    } else if (e === this._tail) {
     this._tail = e.previous;
    } else {
     var t = e.next;
     var n = e.previous;
     if (!t || !n) {
      throw new Error("Invalid list");
     }
     t.previous = n;
     n.next = t;
    }
   };
   e.prototype.touch = function(e, t) {
    if (!this._head || !this._tail) {
     throw new Error("Invalid list");
    }
    if (t !== r.First && t !== r.Last) {
     return;
    }
    if (t === r.First) {
     if (e === this._head) {
      return;
     }
     var n = e.next;
     var i = e.previous;
     if (e === this._tail) {
      i.next = undefined;
      this._tail = i;
     } else {
      n.previous = i;
      i.next = n;
     }
     e.previous = undefined;
     e.next = this._head;
     this._head.previous = e;
     this._head = e;
    } else if (t === r.Last) {
     if (e === this._tail) {
      return;
     }
     var n = e.next;
     var i = e.previous;
     if (e === this._head) {
      n.previous = undefined;
      this._head = n;
     } else {
      n.previous = i;
      i.next = n;
     }
     e.next = undefined;
     e.previous = this._tail;
     this._tail.next = e;
     this._tail = e;
    }
   };
   return e;
  }();
  t.LinkedMap = i;
 },
 "/0p4": function(e, t) {
  e.exports = require("events");
 },
 "0K3V": function(e, t, n) {
  try {
   var r = n("jK02");
   if (typeof r.inherits !== "function") throw "";
   e.exports = r.inherits;
  } catch (t) {
   e.exports = n("P7XM");
  }
 },
 "0zK7": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = Object.prototype.toString;
  function i(e) {
   return typeof e !== "undefined";
  }
  t.defined = i;
  function o(e) {
   return typeof e === "undefined";
  }
  t.undefined = o;
  function s(e) {
   return e === null;
  }
  t.nil = s;
  function a(e) {
   return e === true || e === false;
  }
  t.boolean = a;
  function u(e) {
   return r.call(e) === "[object String]";
  }
  t.string = u;
  function c(e) {
   return r.call(e) === "[object Number]";
  }
  t.number = c;
  function f(e) {
   return r.call(e) === "[object Error]";
  }
  t.error = f;
  function l(e) {
   return r.call(e) === "[object Function]";
  }
  t.func = l;
  function h(e) {
   return Array.isArray(e);
  }
  t.array = h;
  function d(e) {
   return h(e) && e.every(e => u(e));
  }
  t.stringArray = d;
  function p(e, t) {
   return Array.isArray(e) && e.every(t);
  }
  t.typedArray = p;
  function v(e) {
   return e && l(e.then);
  }
  t.thenable = v;
 },
 "1jOq": function(e, t) {
  e.exports = n;
  function n(e, t) {
   if (e && t) return n(e)(t);
   if (typeof e !== "function") throw new TypeError("need wrapper function");
   Object.keys(e).forEach(function(t) {
    r[t] = e[t];
   });
   return r;
   function r() {
    var t = new Array(arguments.length);
    for (var n = 0; n < t.length; n++) {
     t[n] = arguments[n];
    }
    var r = e.apply(this, t);
    var i = t[t.length - 1];
    if (typeof r === "function" && r !== i) {
     Object.keys(i).forEach(function(e) {
      r[e] = i[e];
     });
    }
    return r;
   }
  }
 },
 "1jjw": function(e, t, n) {
  "use strict";
  n.r(t);
  function r(e) {
   return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  }
  function i(e) {
   return encodeURIComponent(e).replace(/[!'()*]/g, r);
  }
  function o(e) {
   return e.replace(/[#?]/, r);
  }
  var s = function() {
   function e() {
    this._scheme = e._empty;
    this._authority = e._empty;
    this._path = e._empty;
    this._query = e._empty;
    this._fragment = e._empty;
    this._formatted = null;
    this._fsPath = null;
   }
   e.isUri = function(t) {
    if (t instanceof e) {
     return true;
    }
    if (!t) {
     return false;
    }
    return typeof t.authority === "string" && typeof t.fragment === "string" && typeof t.path === "string" && typeof t.query === "string" && typeof t.scheme === "string";
   };
   Object.defineProperty(e.prototype, "scheme", {
    get: function() {
     return this._scheme;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "authority", {
    get: function() {
     return this._authority;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "path", {
    get: function() {
     return this._path;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "query", {
    get: function() {
     return this._query;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "fragment", {
    get: function() {
     return this._fragment;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "fsPath", {
    get: function() {
     if (!this._fsPath) {
      var t;
      if (this._authority && this._path && this.scheme === "file") {
       t = "//" + this._authority + this._path;
      } else if (e._driveLetterPath.test(this._path)) {
       t = this._path[1].toLowerCase() + this._path.substr(2);
      } else {
       t = this._path;
      }
      if (a) {
       t = t.replace(/\//g, "\\");
      }
      this._fsPath = t;
     }
     return this._fsPath;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.with = function(t) {
    if (!t) {
     return this;
    }
    var n = t.scheme, r = t.authority, i = t.path, o = t.query, s = t.fragment;
    if (n === void 0) {
     n = this.scheme;
    } else if (n === null) {
     n = "";
    }
    if (r === void 0) {
     r = this.authority;
    } else if (r === null) {
     r = "";
    }
    if (i === void 0) {
     i = this.path;
    } else if (i === null) {
     i = "";
    }
    if (o === void 0) {
     o = this.query;
    } else if (o === null) {
     o = "";
    }
    if (s === void 0) {
     s = this.fragment;
    } else if (s === null) {
     s = "";
    }
    if (n === this.scheme && r === this.authority && i === this.path && o === this.query && s === this.fragment) {
     return this;
    }
    var a = new e();
    a._scheme = n;
    a._authority = r;
    a._path = i;
    a._query = o;
    a._fragment = s;
    e._validate(a);
    return a;
   };
   e.parse = function(t) {
    var n = new e();
    var r = e._parseComponents(t);
    n._scheme = r.scheme;
    n._authority = decodeURIComponent(r.authority);
    n._path = decodeURIComponent(r.path);
    n._query = decodeURIComponent(r.query);
    n._fragment = decodeURIComponent(r.fragment);
    e._validate(n);
    return n;
   };
   e.file = function(t) {
    var n = new e();
    n._scheme = "file";
    if (a) {
     t = t.replace(/\\/g, e._slash);
    }
    if (t[0] === e._slash && t[0] === t[1]) {
     var r = t.indexOf(e._slash, 2);
     if (r === -1) {
      n._authority = t.substring(2);
     } else {
      n._authority = t.substring(2, r);
      n._path = t.substring(r);
     }
    } else {
     n._path = t;
    }
    if (n._path[0] !== e._slash) {
     n._path = e._slash + n._path;
    }
    e._validate(n);
    return n;
   };
   e._parseComponents = function(t) {
    var n = {
     scheme: e._empty,
     authority: e._empty,
     path: e._empty,
     query: e._empty,
     fragment: e._empty
    };
    var r = e._regexp.exec(t);
    if (r) {
     n.scheme = r[2] || n.scheme;
     n.authority = r[4] || n.authority;
     n.path = r[5] || n.path;
     n.query = r[7] || n.query;
     n.fragment = r[9] || n.fragment;
    }
    return n;
   };
   e.from = function(t) {
    return new e().with(t);
   };
   e._validate = function(t) {
    if (t.scheme && !e._schemePattern.test(t.scheme)) {
     throw new Error("[UriError]: Scheme contains illegal characters.");
    }
    if (t.path) {
     if (t.authority) {
      if (!e._singleSlashStart.test(t.path)) {
       throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
      }
     } else {
      if (e._doubleSlashStart.test(t.path)) {
       throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
     }
    }
   };
   e.prototype.toString = function(t) {
    if (t === void 0) {
     t = false;
    }
    if (!t) {
     if (!this._formatted) {
      this._formatted = e._asFormatted(this, false);
     }
     return this._formatted;
    } else {
     return e._asFormatted(this, true);
    }
   };
   e._asFormatted = function(t, n) {
    var r = !n ? i : o;
    var s = [];
    var a = t.scheme, u = t.authority, c = t.path, f = t.query, l = t.fragment;
    if (a) {
     s.push(a, ":");
    }
    if (u || a === "file") {
     s.push("//");
    }
    if (u) {
     u = u.toLowerCase();
     var h = u.indexOf(":");
     if (h === -1) {
      s.push(r(u));
     } else {
      s.push(r(u.substr(0, h)), u.substr(h));
     }
    }
    if (c) {
     var d = e._upperCaseDrive.exec(c);
     if (d) {
      if (d[1]) {
       c = "/" + d[2].toLowerCase() + c.substr(3);
      } else {
       c = d[2].toLowerCase() + c.substr(2);
      }
     }
     var p = 0;
     while (true) {
      var h = c.indexOf(e._slash, p);
      if (h === -1) {
       s.push(r(c.substring(p)));
       break;
      }
      s.push(r(c.substring(p, h)), e._slash);
      p = h + 1;
     }
    }
    if (f) {
     s.push("?", r(f));
    }
    if (l) {
     s.push("#", r(l));
    }
    return s.join(e._empty);
   };
   e.prototype.toJSON = function() {
    var e = {
     fsPath: this.fsPath,
     external: this.toString(),
     $mid: 1
    };
    if (this.path) {
     e.path = this.path;
    }
    if (this.scheme) {
     e.scheme = this.scheme;
    }
    if (this.authority) {
     e.authority = this.authority;
    }
    if (this.query) {
     e.query = this.query;
    }
    if (this.fragment) {
     e.fragment = this.fragment;
    }
    return e;
   };
   e.revive = function(t) {
    var n = new e();
    n._scheme = t.scheme || e._empty;
    n._authority = t.authority || e._empty;
    n._path = t.path || e._empty;
    n._query = t.query || e._empty;
    n._fragment = t.fragment || e._empty;
    n._fsPath = t.fsPath;
    n._formatted = t.external;
    e._validate(n);
    return n;
   };
   return e;
  }();
  t["default"] = s;
  s._empty = "";
  s._slash = "/";
  s._regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  s._driveLetterPath = /^\/[a-zA-z]:/;
  s._upperCaseDrive = /^(\/)?([A-Z]:)/;
  s._schemePattern = /^\w[\w\d+.-]*$/;
  s._singleSlashStart = /^\//;
  s._doubleSlashStart = /^\/\//;
  var a;
  if (typeof process === "object") {
   a = process.platform === "win32";
  } else if (typeof navigator === "object") {
   var u = navigator.userAgent;
   a = u.indexOf("Windows") >= 0;
  }
 },
 "2LKJ": function(e, t, n) {
  e.exports = y;
  y.Minimatch = g;
  var r = {
   sep: "/"
  };
  try {
   r = n("oyvS");
  } catch (e) {}
  var i = y.GLOBSTAR = g.GLOBSTAR = {};
  var o = n("TuBq");
  var s = {
   "!": {
    open: "(?:(?!(?:",
    close: "))[^/]*?)"
   },
   "?": {
    open: "(?:",
    close: ")?"
   },
   "+": {
    open: "(?:",
    close: ")+"
   },
   "*": {
    open: "(?:",
    close: ")*"
   },
   "@": {
    open: "(?:",
    close: ")"
   }
  };
  var a = "[^/]";
  var u = a + "*?";
  var c = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  var f = "(?:(?!(?:\\/|^)\\.).)*?";
  var l = h("().*{}+?[]^$\\!");
  function h(e) {
   return e.split("").reduce(function(e, t) {
    e[t] = true;
    return e;
   }, {});
  }
  var d = /\/+/;
  y.filter = p;
  function p(e, t) {
   t = t || {};
   return function(n, r, i) {
    return y(n, e, t);
   };
  }
  function v(e, t) {
   e = e || {};
   t = t || {};
   var n = {};
   Object.keys(t).forEach(function(e) {
    n[e] = t[e];
   });
   Object.keys(e).forEach(function(t) {
    n[t] = e[t];
   });
   return n;
  }
  y.defaults = function(e) {
   if (!e || !Object.keys(e).length) return y;
   var t = y;
   var n = function n(r, i, o) {
    return t.minimatch(r, i, v(e, o));
   };
   n.Minimatch = function n(r, i) {
    return new t.Minimatch(r, v(e, i));
   };
   return n;
  };
  g.defaults = function(e) {
   if (!e || !Object.keys(e).length) return g;
   return y.defaults(e).Minimatch;
  };
  function y(e, t, n) {
   if (typeof t !== "string") {
    throw new TypeError("glob pattern string required");
   }
   if (!n) n = {};
   if (!n.nocomment && t.charAt(0) === "#") {
    return false;
   }
   if (t.trim() === "") return e === "";
   return new g(t, n).match(e);
  }
  function g(e, t) {
   if (!(this instanceof g)) {
    return new g(e, t);
   }
   if (typeof e !== "string") {
    throw new TypeError("glob pattern string required");
   }
   if (!t) t = {};
   e = e.trim();
   if (r.sep !== "/") {
    e = e.split(r.sep).join("/");
   }
   this.options = t;
   this.set = [];
   this.pattern = e;
   this.regexp = null;
   this.negate = false;
   this.comment = false;
   this.empty = false;
   this.make();
  }
  g.prototype.debug = function() {};
  g.prototype.make = m;
  function m() {
   if (this._made) return;
   var e = this.pattern;
   var t = this.options;
   if (!t.nocomment && e.charAt(0) === "#") {
    this.comment = true;
    return;
   }
   if (!e) {
    this.empty = true;
    return;
   }
   this.parseNegate();
   var n = this.globSet = this.braceExpand();
   if (t.debug) this.debug = console.error;
   this.debug(this.pattern, n);
   n = this.globParts = n.map(function(e) {
    return e.split(d);
   });
   this.debug(this.pattern, n);
   n = n.map(function(e, t, n) {
    return e.map(this.parse, this);
   }, this);
   this.debug(this.pattern, n);
   n = n.filter(function(e) {
    return e.indexOf(false) === -1;
   });
   this.debug(this.pattern, n);
   this.set = n;
  }
  g.prototype.parseNegate = b;
  function b() {
   var e = this.pattern;
   var t = false;
   var n = this.options;
   var r = 0;
   if (n.nonegate) return;
   for (var i = 0, o = e.length; i < o && e.charAt(i) === "!"; i++) {
    t = !t;
    r++;
   }
   if (r) this.pattern = e.substr(r);
   this.negate = t;
  }
  y.braceExpand = function(e, t) {
   return w(e, t);
  };
  g.prototype.braceExpand = w;
  function w(e, t) {
   if (!t) {
    if (this instanceof g) {
     t = this.options;
    } else {
     t = {};
    }
   }
   e = typeof e === "undefined" ? this.pattern : e;
   if (typeof e === "undefined") {
    throw new TypeError("undefined pattern");
   }
   if (t.nobrace || !e.match(/\{.*\}/)) {
    return [ e ];
   }
   return o(e);
  }
  g.prototype.parse = x;
  var _ = {};
  function x(e, t) {
   if (e.length > 1024 * 64) {
    throw new TypeError("pattern is too long");
   }
   var n = this.options;
   if (!n.noglobstar && e === "**") return i;
   if (e === "") return "";
   var r = "";
   var o = !!n.nocase;
   var c = false;
   var f = [];
   var h = [];
   var d;
   var p = false;
   var v = -1;
   var y = -1;
   var g = e.charAt(0) === "." ? "" : n.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
   var m = this;
   function b() {
    if (d) {
     switch (d) {
     case "*":
      r += u;
      o = true;
      break;

     case "?":
      r += a;
      o = true;
      break;

     default:
      r += "\\" + d;
      break;
     }
     m.debug("clearStateChar %j %j", d, r);
     d = false;
    }
   }
   for (var w = 0, x = e.length, O; w < x && (O = e.charAt(w)); w++) {
    this.debug("%s\t%s %s %j", e, w, r, O);
    if (c && l[O]) {
     r += "\\" + O;
     c = false;
     continue;
    }
    switch (O) {
    case "/":
     return false;

    case "\\":
     b();
     c = true;
     continue;

    case "?":
    case "*":
    case "+":
    case "@":
    case "!":
     this.debug("%s\t%s %s %j <-- stateChar", e, w, r, O);
     if (p) {
      this.debug("  in class");
      if (O === "!" && w === y + 1) O = "^";
      r += O;
      continue;
     }
     m.debug("call clearStateChar %j", d);
     b();
     d = O;
     if (n.noext) b();
     continue;

    case "(":
     if (p) {
      r += "(";
      continue;
     }
     if (!d) {
      r += "\\(";
      continue;
     }
     f.push({
      type: d,
      start: w - 1,
      reStart: r.length,
      open: s[d].open,
      close: s[d].close
     });
     r += d === "!" ? "(?:(?!(?:" : "(?:";
     this.debug("plType %j %j", d, r);
     d = false;
     continue;

    case ")":
     if (p || !f.length) {
      r += "\\)";
      continue;
     }
     b();
     o = true;
     var S = f.pop();
     r += S.close;
     if (S.type === "!") {
      h.push(S);
     }
     S.reEnd = r.length;
     continue;

    case "|":
     if (p || !f.length || c) {
      r += "\\|";
      c = false;
      continue;
     }
     b();
     r += "|";
     continue;

    case "[":
     b();
     if (p) {
      r += "\\" + O;
      continue;
     }
     p = true;
     y = w;
     v = r.length;
     r += O;
     continue;

    case "]":
     if (w === y + 1 || !p) {
      r += "\\" + O;
      c = false;
      continue;
     }
     if (p) {
      var C = e.substring(y + 1, w);
      try {
       RegExp("[" + C + "]");
      } catch (e) {
       var D = this.parse(C, _);
       r = r.substr(0, v) + "\\[" + D[0] + "\\]";
       o = o || D[1];
       p = false;
       continue;
      }
     }
     o = true;
     p = false;
     r += O;
     continue;

    default:
     b();
     if (c) {
      c = false;
     } else if (l[O] && !(O === "^" && p)) {
      r += "\\";
     }
     r += O;
    }
   }
   if (p) {
    C = e.substr(y + 1);
    D = this.parse(C, _);
    r = r.substr(0, v) + "\\[" + D[0];
    o = o || D[1];
   }
   for (S = f.pop(); S; S = f.pop()) {
    var j = r.slice(S.reStart + S.open.length);
    this.debug("setting tail", r, S);
    j = j.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(e, t, n) {
     if (!n) {
      n = "\\";
     }
     return t + t + n + "|";
    });
    this.debug("tail=%j\n   %s", j, j, S, r);
    var E = S.type === "*" ? u : S.type === "?" ? a : "\\" + S.type;
    o = true;
    r = r.slice(0, S.reStart) + E + "\\(" + j;
   }
   b();
   if (c) {
    r += "\\\\";
   }
   var P = false;
   switch (r.charAt(0)) {
   case ".":
   case "[":
   case "(":
    P = true;
   }
   for (var R = h.length - 1; R > -1; R--) {
    var T = h[R];
    var A = r.slice(0, T.reStart);
    var I = r.slice(T.reStart, T.reEnd - 8);
    var M = r.slice(T.reEnd - 8, T.reEnd);
    var q = r.slice(T.reEnd);
    M += q;
    var N = A.split("(").length - 1;
    var L = q;
    for (w = 0; w < N; w++) {
     L = L.replace(/\)[+*?]?/, "");
    }
    q = L;
    var F = "";
    if (q === "" && t !== _) {
     F = "$";
    }
    var z = A + I + q + F + M;
    r = z;
   }
   if (r !== "" && o) {
    r = "(?=.)" + r;
   }
   if (P) {
    r = g + r;
   }
   if (t === _) {
    return [ r, o ];
   }
   if (!o) {
    return k(e);
   }
   var W = n.nocase ? "i" : "";
   try {
    var $ = new RegExp("^" + r + "$", W);
   } catch (e) {
    return new RegExp("$.");
   }
   $._glob = e;
   $._src = r;
   return $;
  }
  y.makeRe = function(e, t) {
   return new g(e, t || {}).makeRe();
  };
  g.prototype.makeRe = O;
  function O() {
   if (this.regexp || this.regexp === false) return this.regexp;
   var e = this.set;
   if (!e.length) {
    this.regexp = false;
    return this.regexp;
   }
   var t = this.options;
   var n = t.noglobstar ? u : t.dot ? c : f;
   var r = t.nocase ? "i" : "";
   var o = e.map(function(e) {
    return e.map(function(e) {
     return e === i ? n : typeof e === "string" ? C(e) : e._src;
    }).join("\\/");
   }).join("|");
   o = "^(?:" + o + ")$";
   if (this.negate) o = "^(?!" + o + ").*$";
   try {
    this.regexp = new RegExp(o, r);
   } catch (e) {
    this.regexp = false;
   }
   return this.regexp;
  }
  y.match = function(e, t, n) {
   n = n || {};
   var r = new g(t, n);
   e = e.filter(function(e) {
    return r.match(e);
   });
   if (r.options.nonull && !e.length) {
    e.push(t);
   }
   return e;
  };
  g.prototype.match = S;
  function S(e, t) {
   this.debug("match", e, this.pattern);
   if (this.comment) return false;
   if (this.empty) return e === "";
   if (e === "/" && t) return true;
   var n = this.options;
   if (r.sep !== "/") {
    e = e.split(r.sep).join("/");
   }
   e = e.split(d);
   this.debug(this.pattern, "split", e);
   var i = this.set;
   this.debug(this.pattern, "set", i);
   var o;
   var s;
   for (s = e.length - 1; s >= 0; s--) {
    o = e[s];
    if (o) break;
   }
   for (s = 0; s < i.length; s++) {
    var a = i[s];
    var u = e;
    if (n.matchBase && a.length === 1) {
     u = [ o ];
    }
    var c = this.matchOne(u, a, t);
    if (c) {
     if (n.flipNegate) return true;
     return !this.negate;
    }
   }
   if (n.flipNegate) return false;
   return this.negate;
  }
  g.prototype.matchOne = function(e, t, n) {
   var r = this.options;
   this.debug("matchOne", {
    this: this,
    file: e,
    pattern: t
   });
   this.debug("matchOne", e.length, t.length);
   for (var o = 0, s = 0, a = e.length, u = t.length; o < a && s < u; o++, s++) {
    this.debug("matchOne loop");
    var c = t[s];
    var f = e[o];
    this.debug(t, c, f);
    if (c === false) return false;
    if (c === i) {
     this.debug("GLOBSTAR", [ t, c, f ]);
     var l = o;
     var h = s + 1;
     if (h === u) {
      this.debug("** at the end");
      for (;o < a; o++) {
       if (e[o] === "." || e[o] === ".." || !r.dot && e[o].charAt(0) === ".") return false;
      }
      return true;
     }
     while (l < a) {
      var d = e[l];
      this.debug("\nglobstar while", e, l, t, h, d);
      if (this.matchOne(e.slice(l), t.slice(h), n)) {
       this.debug("globstar found match!", l, a, d);
       return true;
      } else {
       if (d === "." || d === ".." || !r.dot && d.charAt(0) === ".") {
        this.debug("dot detected!", e, l, t, h);
        break;
       }
       this.debug("globstar swallow a segment, and continue");
       l++;
      }
     }
     if (n) {
      this.debug("\n>>> no match, partial?", e, l, t, h);
      if (l === a) return true;
     }
     return false;
    }
    var p;
    if (typeof c === "string") {
     if (r.nocase) {
      p = f.toLowerCase() === c.toLowerCase();
     } else {
      p = f === c;
     }
     this.debug("string match", c, f, p);
    } else {
     p = f.match(c);
     this.debug("pattern match", c, f, p);
    }
    if (!p) return false;
   }
   if (o === a && s === u) {
    return true;
   } else if (o === a) {
    return n;
   } else if (s === u) {
    var v = o === a - 1 && e[o] === "";
    return v;
   }
   throw new Error("wtf?");
  };
  function k(e) {
   return e.replace(/\\(.)/g, "$1");
  }
  function C(e) {
   return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
 },
 "2SiB": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("WNwX");
  const i = n("j/kR");
  t.merlin = i;
  const o = n("a1Tp");
  t.remote = o;
  const s = n("jFrK");
  t.types = s;
  var a;
  (function(e) {
   e.defaults = {
    reason: {
     codelens: {
      enabled: true,
      unicode: true
     },
     debounce: {
      linter: 500
     },
     diagnostics: {
      merlinPerfLogging: false,
      tools: [ "merlin" ]
     },
     format: {
      width: null
     },
     path: {
      bsb: "./node_modules/bs-platform/lib/bsb.exe",
      env: "env",
      esy: "esy",
      ocamlfind: "ocamlfind",
      ocamlmerlin: "ocamlmerlin",
      ocpindent: "ocp-indent",
      opam: "opam",
      rebuild: "rebuild",
      refmt: "refmt",
      refmterr: "refmterr",
      rtop: "rtop"
     },
     server: {
      languages: [ "ocaml", "reason" ]
     }
    }
   };
   function t(t) {
    return r(e.defaults.reason, t || {}, {
     arrayMerge(e, t) {
      return t;
     }
    });
   }
   e.withDefaults = t;
  })(a = t.ISettings || (t.ISettings = {}));
 },
 "3/zD": function(e, t, n) {
  t.alphasort = c;
  t.alphasorti = u;
  t.setopts = h;
  t.ownProp = r;
  t.makeAbs = v;
  t.finish = d;
  t.mark = p;
  t.isIgnored = y;
  t.childrenIgnored = g;
  function r(e, t) {
   return Object.prototype.hasOwnProperty.call(e, t);
  }
  var i = n("oyvS");
  var o = n("2LKJ");
  var s = n("oaIa");
  var a = o.Minimatch;
  function u(e, t) {
   return e.toLowerCase().localeCompare(t.toLowerCase());
  }
  function c(e, t) {
   return e.localeCompare(t);
  }
  function f(e, t) {
   e.ignore = t.ignore || [];
   if (!Array.isArray(e.ignore)) e.ignore = [ e.ignore ];
   if (e.ignore.length) {
    e.ignore = e.ignore.map(l);
   }
  }
  function l(e) {
   var t = null;
   if (e.slice(-3) === "/**") {
    var n = e.replace(/(\/\*\*)+$/, "");
    t = new a(n, {
     dot: true
    });
   }
   return {
    matcher: new a(e, {
     dot: true
    }),
    gmatcher: t
   };
  }
  function h(e, t, n) {
   if (!n) n = {};
   if (n.matchBase && -1 === t.indexOf("/")) {
    if (n.noglobstar) {
     throw new Error("base matching requires globstar");
    }
    t = "**/" + t;
   }
   e.silent = !!n.silent;
   e.pattern = t;
   e.strict = n.strict !== false;
   e.realpath = !!n.realpath;
   e.realpathCache = n.realpathCache || Object.create(null);
   e.follow = !!n.follow;
   e.dot = !!n.dot;
   e.mark = !!n.mark;
   e.nodir = !!n.nodir;
   if (e.nodir) e.mark = true;
   e.sync = !!n.sync;
   e.nounique = !!n.nounique;
   e.nonull = !!n.nonull;
   e.nosort = !!n.nosort;
   e.nocase = !!n.nocase;
   e.stat = !!n.stat;
   e.noprocess = !!n.noprocess;
   e.absolute = !!n.absolute;
   e.maxLength = n.maxLength || Infinity;
   e.cache = n.cache || Object.create(null);
   e.statCache = n.statCache || Object.create(null);
   e.symlinks = n.symlinks || Object.create(null);
   f(e, n);
   e.changedCwd = false;
   var o = process.cwd();
   if (!r(n, "cwd")) e.cwd = o; else {
    e.cwd = i.resolve(n.cwd);
    e.changedCwd = e.cwd !== o;
   }
   e.root = n.root || i.resolve(e.cwd, "/");
   e.root = i.resolve(e.root);
   if (process.platform === "win32") e.root = e.root.replace(/\\/g, "/");
   e.cwdAbs = s(e.cwd) ? e.cwd : v(e, e.cwd);
   if (process.platform === "win32") e.cwdAbs = e.cwdAbs.replace(/\\/g, "/");
   e.nomount = !!n.nomount;
   n.nonegate = true;
   n.nocomment = true;
   e.minimatch = new a(t, n);
   e.options = e.minimatch.options;
  }
  function d(e) {
   var t = e.nounique;
   var n = t ? [] : Object.create(null);
   for (var r = 0, i = e.matches.length; r < i; r++) {
    var o = e.matches[r];
    if (!o || Object.keys(o).length === 0) {
     if (e.nonull) {
      var s = e.minimatch.globSet[r];
      if (t) n.push(s); else n[s] = true;
     }
    } else {
     var a = Object.keys(o);
     if (t) n.push.apply(n, a); else a.forEach(function(e) {
      n[e] = true;
     });
    }
   }
   if (!t) n = Object.keys(n);
   if (!e.nosort) n = n.sort(e.nocase ? u : c);
   if (e.mark) {
    for (var r = 0; r < n.length; r++) {
     n[r] = e._mark(n[r]);
    }
    if (e.nodir) {
     n = n.filter(function(t) {
      var n = !/\/$/.test(t);
      var r = e.cache[t] || e.cache[v(e, t)];
      if (n && r) n = r !== "DIR" && !Array.isArray(r);
      return n;
     });
    }
   }
   if (e.ignore.length) n = n.filter(function(t) {
    return !y(e, t);
   });
   e.found = n;
  }
  function p(e, t) {
   var n = v(e, t);
   var r = e.cache[n];
   var i = t;
   if (r) {
    var o = r === "DIR" || Array.isArray(r);
    var s = t.slice(-1) === "/";
    if (o && !s) i += "/"; else if (!o && s) i = i.slice(0, -1);
    if (i !== t) {
     var a = v(e, i);
     e.statCache[a] = e.statCache[n];
     e.cache[a] = e.cache[n];
    }
   }
   return i;
  }
  function v(e, t) {
   var n = t;
   if (t.charAt(0) === "/") {
    n = i.join(e.root, t);
   } else if (s(t) || t === "") {
    n = t;
   } else if (e.changedCwd) {
    n = i.resolve(e.cwd, t);
   } else {
    n = i.resolve(t);
   }
   if (process.platform === "win32") n = n.replace(/\\/g, "/");
   return n;
  }
  function y(e, t) {
   if (!e.ignore.length) return false;
   return e.ignore.some(function(e) {
    return e.matcher.match(t) || !!(e.gmatcher && e.gmatcher.match(t));
   });
  }
  function g(e, t) {
   if (!e.ignore.length) return false;
   return e.ignore.some(function(e) {
    return !!(e.gmatcher && e.gmatcher.match(t));
   });
  }
 },
 "3Cnh": function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("AHUE");
  function o(e, t) {
   return r(this, void 0, void 0, function*() {
    const t = new i.Ocamlfind(e).process;
    t.stdin.end();
    const n = yield new Promise((e, n) => {
     let r = "";
     t.stdout.on("error", e => n(e));
     t.stdout.on("data", e => r += e.toString());
     t.stdout.on("end", () => e(r));
    });
    t.unref();
    return /^\s*$/.test(n) ? [] : n.trim().split("\n");
   });
  }
  t.default = o;
 },
 "4Tfi": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("K9FK");
  t.getFormatted = r;
  const i = n("3Cnh");
  t.getAvailableLibraries = i.default;
  const o = n("B5MM");
  t.getDocumentation = o.default;
  const s = n("D2qR");
  t.getMerlinFiles = s.default;
  const a = n("mppW");
  t.getModules = a.default;
  const u = n("uC7Y");
  t.getOccurrences = u.default;
  const c = n("smAu");
  t.getPrefix = c.default;
  const f = n("LXtr");
  t.getProjectEnv = f.default;
  const l = n("n0R3");
  t.getText = l.default;
  const h = n("ce/F");
  t.getTextDocument = h.default;
  const d = n("xRFH");
  t.getType = d.default;
  const p = n("eWRo");
  t.getWordAtPosition = p.default;
  const v = n("TUh0");
  t.restartMerlin = v.default;
 },
 "4UAn": function(e, t, n) {
  e.exports = O;
  var r = n("mw/K");
  var i = n("aTK+");
  var o = n("2LKJ");
  var s = o.Minimatch;
  var a = n("0K3V");
  var u = n("/0p4").EventEmitter;
  var c = n("oyvS");
  var f = n("Qs3B");
  var l = n("oaIa");
  var h = n("LLgs");
  var d = n("3/zD");
  var p = d.alphasort;
  var v = d.alphasorti;
  var y = d.setopts;
  var g = d.ownProp;
  var m = n("RAbO");
  var b = n("jK02");
  var w = d.childrenIgnored;
  var _ = d.isIgnored;
  var x = n("VmuJ");
  function O(e, t, n) {
   if (typeof t === "function") n = t, t = {};
   if (!t) t = {};
   if (t.sync) {
    if (n) throw new TypeError("callback provided to sync glob");
    return h(e, t);
   }
   return new C(e, t, n);
  }
  O.sync = h;
  var S = O.GlobSync = h.GlobSync;
  O.glob = O;
  function k(e, t) {
   if (t === null || typeof t !== "object") {
    return e;
   }
   var n = Object.keys(t);
   var r = n.length;
   while (r--) {
    e[n[r]] = t[n[r]];
   }
   return e;
  }
  O.hasMagic = function(e, t) {
   var n = k({}, t);
   n.noprocess = true;
   var r = new C(e, n);
   var i = r.minimatch.set;
   if (!e) return false;
   if (i.length > 1) return true;
   for (var o = 0; o < i[0].length; o++) {
    if (typeof i[0][o] !== "string") return true;
   }
   return false;
  };
  O.Glob = C;
  a(C, u);
  function C(e, t, n) {
   if (typeof t === "function") {
    n = t;
    t = null;
   }
   if (t && t.sync) {
    if (n) throw new TypeError("callback provided to sync glob");
    return new S(e, t);
   }
   if (!(this instanceof C)) return new C(e, t, n);
   y(this, e, t);
   this._didRealPath = false;
   var r = this.minimatch.set.length;
   this.matches = new Array(r);
   if (typeof n === "function") {
    n = x(n);
    this.on("error", n);
    this.on("end", function(e) {
     n(null, e);
    });
   }
   var i = this;
   this._processing = 0;
   this._emitQueue = [];
   this._processQueue = [];
   this.paused = false;
   if (this.noprocess) return this;
   if (r === 0) return a();
   var o = true;
   for (var s = 0; s < r; s++) {
    this._process(this.minimatch.set[s], s, false, a);
   }
   o = false;
   function a() {
    --i._processing;
    if (i._processing <= 0) {
     if (o) {
      process.nextTick(function() {
       i._finish();
      });
     } else {
      i._finish();
     }
    }
   }
  }
  C.prototype._finish = function() {
   f(this instanceof C);
   if (this.aborted) return;
   if (this.realpath && !this._didRealpath) return this._realpath();
   d.finish(this);
   this.emit("end", this.found);
  };
  C.prototype._realpath = function() {
   if (this._didRealpath) return;
   this._didRealpath = true;
   var e = this.matches.length;
   if (e === 0) return this._finish();
   var t = this;
   for (var n = 0; n < this.matches.length; n++) this._realpathSet(n, r);
   function r() {
    if (--e === 0) t._finish();
   }
  };
  C.prototype._realpathSet = function(e, t) {
   var n = this.matches[e];
   if (!n) return t();
   var r = Object.keys(n);
   var o = this;
   var s = r.length;
   if (s === 0) return t();
   var a = this.matches[e] = Object.create(null);
   r.forEach(function(n, r) {
    n = o._makeAbs(n);
    i.realpath(n, o.realpathCache, function(r, i) {
     if (!r) a[i] = true; else if (r.syscall === "stat") a[n] = true; else o.emit("error", r);
     if (--s === 0) {
      o.matches[e] = a;
      t();
     }
    });
   });
  };
  C.prototype._mark = function(e) {
   return d.mark(this, e);
  };
  C.prototype._makeAbs = function(e) {
   return d.makeAbs(this, e);
  };
  C.prototype.abort = function() {
   this.aborted = true;
   this.emit("abort");
  };
  C.prototype.pause = function() {
   if (!this.paused) {
    this.paused = true;
    this.emit("pause");
   }
  };
  C.prototype.resume = function() {
   if (this.paused) {
    this.emit("resume");
    this.paused = false;
    if (this._emitQueue.length) {
     var e = this._emitQueue.slice(0);
     this._emitQueue.length = 0;
     for (var t = 0; t < e.length; t++) {
      var n = e[t];
      this._emitMatch(n[0], n[1]);
     }
    }
    if (this._processQueue.length) {
     var r = this._processQueue.slice(0);
     this._processQueue.length = 0;
     for (var t = 0; t < r.length; t++) {
      var i = r[t];
      this._processing--;
      this._process(i[0], i[1], i[2], i[3]);
     }
    }
   }
  };
  C.prototype._process = function(e, t, n, r) {
   f(this instanceof C);
   f(typeof r === "function");
   if (this.aborted) return;
   this._processing++;
   if (this.paused) {
    this._processQueue.push([ e, t, n, r ]);
    return;
   }
   var i = 0;
   while (typeof e[i] === "string") {
    i++;
   }
   var s;
   switch (i) {
   case e.length:
    this._processSimple(e.join("/"), t, r);
    return;

   case 0:
    s = null;
    break;

   default:
    s = e.slice(0, i).join("/");
    break;
   }
   var a = e.slice(i);
   var u;
   if (s === null) u = "."; else if (l(s) || l(e.join("/"))) {
    if (!s || !l(s)) s = "/" + s;
    u = s;
   } else u = s;
   var c = this._makeAbs(u);
   if (w(this, u)) return r();
   var h = a[0] === o.GLOBSTAR;
   if (h) this._processGlobStar(s, u, c, a, t, n, r); else this._processReaddir(s, u, c, a, t, n, r);
  };
  C.prototype._processReaddir = function(e, t, n, r, i, o, s) {
   var a = this;
   this._readdir(n, o, function(u, c) {
    return a._processReaddir2(e, t, n, r, i, o, c, s);
   });
  };
  C.prototype._processReaddir2 = function(e, t, n, r, i, o, s, a) {
   if (!s) return a();
   var u = r[0];
   var f = !!this.minimatch.negate;
   var l = u._glob;
   var h = this.dot || l.charAt(0) === ".";
   var d = [];
   for (var p = 0; p < s.length; p++) {
    var v = s[p];
    if (v.charAt(0) !== "." || h) {
     var y;
     if (f && !e) {
      y = !v.match(u);
     } else {
      y = v.match(u);
     }
     if (y) d.push(v);
    }
   }
   var g = d.length;
   if (g === 0) return a();
   if (r.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[i]) this.matches[i] = Object.create(null);
    for (var p = 0; p < g; p++) {
     var v = d[p];
     if (e) {
      if (e !== "/") v = e + "/" + v; else v = e + v;
     }
     if (v.charAt(0) === "/" && !this.nomount) {
      v = c.join(this.root, v);
     }
     this._emitMatch(i, v);
    }
    return a();
   }
   r.shift();
   for (var p = 0; p < g; p++) {
    var v = d[p];
    var m;
    if (e) {
     if (e !== "/") v = e + "/" + v; else v = e + v;
    }
    this._process([ v ].concat(r), i, o, a);
   }
   a();
  };
  C.prototype._emitMatch = function(e, t) {
   if (this.aborted) return;
   if (_(this, t)) return;
   if (this.paused) {
    this._emitQueue.push([ e, t ]);
    return;
   }
   var n = l(t) ? t : this._makeAbs(t);
   if (this.mark) t = this._mark(t);
   if (this.absolute) t = n;
   if (this.matches[e][t]) return;
   if (this.nodir) {
    var r = this.cache[n];
    if (r === "DIR" || Array.isArray(r)) return;
   }
   this.matches[e][t] = true;
   var i = this.statCache[n];
   if (i) this.emit("stat", t, i);
   this.emit("match", t);
  };
  C.prototype._readdirInGlobStar = function(e, t) {
   if (this.aborted) return;
   if (this.follow) return this._readdir(e, false, t);
   var n = "lstat\0" + e;
   var i = this;
   var o = m(n, s);
   if (o) r.lstat(e, o);
   function s(n, r) {
    if (n && n.code === "ENOENT") return t();
    var o = r && r.isSymbolicLink();
    i.symlinks[e] = o;
    if (!o && r && !r.isDirectory()) {
     i.cache[e] = "FILE";
     t();
    } else i._readdir(e, false, t);
   }
  };
  C.prototype._readdir = function(e, t, n) {
   if (this.aborted) return;
   n = m("readdir\0" + e + "\0" + t, n);
   if (!n) return;
   if (t && !g(this.symlinks, e)) return this._readdirInGlobStar(e, n);
   if (g(this.cache, e)) {
    var i = this.cache[e];
    if (!i || i === "FILE") return n();
    if (Array.isArray(i)) return n(null, i);
   }
   var o = this;
   r.readdir(e, D(this, e, n));
  };
  function D(e, t, n) {
   return function(r, i) {
    if (r) e._readdirError(t, r, n); else e._readdirEntries(t, i, n);
   };
  }
  C.prototype._readdirEntries = function(e, t, n) {
   if (this.aborted) return;
   if (!this.mark && !this.stat) {
    for (var r = 0; r < t.length; r++) {
     var i = t[r];
     if (e === "/") i = e + i; else i = e + "/" + i;
     this.cache[i] = true;
    }
   }
   this.cache[e] = t;
   return n(null, t);
  };
  C.prototype._readdirError = function(e, t, n) {
   if (this.aborted) return;
   switch (t.code) {
   case "ENOTSUP":
   case "ENOTDIR":
    var r = this._makeAbs(e);
    this.cache[r] = "FILE";
    if (r === this.cwdAbs) {
     var i = new Error(t.code + " invalid cwd " + this.cwd);
     i.path = this.cwd;
     i.code = t.code;
     this.emit("error", i);
     this.abort();
    }
    break;

   case "ENOENT":
   case "ELOOP":
   case "ENAMETOOLONG":
   case "UNKNOWN":
    this.cache[this._makeAbs(e)] = false;
    break;

   default:
    this.cache[this._makeAbs(e)] = false;
    if (this.strict) {
     this.emit("error", t);
     this.abort();
    }
    if (!this.silent) console.error("glob error", t);
    break;
   }
   return n();
  };
  C.prototype._processGlobStar = function(e, t, n, r, i, o, s) {
   var a = this;
   this._readdir(n, o, function(u, c) {
    a._processGlobStar2(e, t, n, r, i, o, c, s);
   });
  };
  C.prototype._processGlobStar2 = function(e, t, n, r, i, o, s, a) {
   if (!s) return a();
   var u = r.slice(1);
   var c = e ? [ e ] : [];
   var f = c.concat(u);
   this._process(f, i, false, a);
   var l = this.symlinks[n];
   var h = s.length;
   if (l && o) return a();
   for (var d = 0; d < h; d++) {
    var p = s[d];
    if (p.charAt(0) === "." && !this.dot) continue;
    var v = c.concat(s[d], u);
    this._process(v, i, true, a);
    var y = c.concat(s[d], r);
    this._process(y, i, true, a);
   }
   a();
  };
  C.prototype._processSimple = function(e, t, n) {
   var r = this;
   this._stat(e, function(i, o) {
    r._processSimple2(e, t, i, o, n);
   });
  };
  C.prototype._processSimple2 = function(e, t, n, r, i) {
   if (!this.matches[t]) this.matches[t] = Object.create(null);
   if (!r) return i();
   if (e && l(e) && !this.nomount) {
    var o = /[\/\\]$/.test(e);
    if (e.charAt(0) === "/") {
     e = c.join(this.root, e);
    } else {
     e = c.resolve(this.root, e);
     if (o) e += "/";
    }
   }
   if (process.platform === "win32") e = e.replace(/\\/g, "/");
   this._emitMatch(t, e);
   i();
  };
  C.prototype._stat = function(e, t) {
   var n = this._makeAbs(e);
   var i = e.slice(-1) === "/";
   if (e.length > this.maxLength) return t();
   if (!this.stat && g(this.cache, n)) {
    var o = this.cache[n];
    if (Array.isArray(o)) o = "DIR";
    if (!i || o === "DIR") return t(null, o);
    if (i && o === "FILE") return t();
   }
   var s;
   var a = this.statCache[n];
   if (a !== undefined) {
    if (a === false) return t(null, a); else {
     var u = a.isDirectory() ? "DIR" : "FILE";
     if (i && u === "FILE") return t(); else return t(null, u, a);
    }
   }
   var c = this;
   var f = m("stat\0" + n, l);
   if (f) r.lstat(n, f);
   function l(i, o) {
    if (o && o.isSymbolicLink()) {
     return r.stat(n, function(r, i) {
      if (r) c._stat2(e, n, null, o, t); else c._stat2(e, n, r, i, t);
     });
    } else {
     c._stat2(e, n, i, o, t);
    }
   }
  };
  C.prototype._stat2 = function(e, t, n, r, i) {
   if (n && (n.code === "ENOENT" || n.code === "ENOTDIR")) {
    this.statCache[t] = false;
    return i();
   }
   var o = e.slice(-1) === "/";
   this.statCache[t] = r;
   if (t.slice(-1) === "/" && r && !r.isDirectory()) return i(null, false, r);
   var s = true;
   if (r) s = r.isDirectory() ? "DIR" : "FILE";
   this.cache[t] = this.cache[t] || s;
   if (o && s === "FILE") return i();
   return i(null, s, r);
  };
 },
 "4nfs": function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("GeYi");
  var s;
  (function(e) {
   let t;
   (function(e) {
    function t(e) {
     switch (e) {
     case "#":
      return i.CompletionItemKind.Method;

     case "Class":
      return i.CompletionItemKind.Class;

     case "Constructor":
      return i.CompletionItemKind.Constructor;

     case "Exn":
      return i.CompletionItemKind.Constructor;

     case "Label":
      return i.CompletionItemKind.Field;

     case "Method":
      return i.CompletionItemKind.Function;

     case "Module":
      return i.CompletionItemKind.Module;

     case "Signature":
      return i.CompletionItemKind.Interface;

     case "Type":
      return i.CompletionItemKind.Class;

     case "Value":
      return i.CompletionItemKind.Value;

     case "Variant":
      return i.CompletionItemKind.Enum;
     }
    }
    e.intoCode = t;
   })(t = e.Kind || (e.Kind = {}));
   function n({name: e, kind: n, desc: r, info: i}) {
    return {
     data: {
      documentation: i
     },
     detail: r,
     kind: t.intoCode(n),
     label: e
    };
   }
   e.intoCode = n;
  })(s = t.Completion || (t.Completion = {}));
  var a;
  (function(e) {
   let t;
   (function(e) {
    function t(e) {
     switch (e) {
     case "env":
      return i.DiagnosticSeverity.Error;

     case "error":
      return i.DiagnosticSeverity.Error;

     case "parser":
      return i.DiagnosticSeverity.Error;

     case "type":
      return i.DiagnosticSeverity.Error;

     case "unknown":
      return i.DiagnosticSeverity.Error;

     case "warning":
      return i.DiagnosticSeverity.Warning;
     }
    }
    e.intoCode = t;
   })(t = e.Type || (e.Type = {}));
   function n(e, {uri: t}, n) {
    return r(this, void 0, void 0, function*() {
     if (n === "Invalid statement") {
      const n = e.synchronizer.getText(t);
      if (n && n.getText() === "=") {
       return "Functions must be defined with => instead of the = symbol.";
      }
     }
     if (n === "Statement has to end with a semicolon") {
      return "Statements must be terminated with a semicolon.";
     }
     return n;
    });
   }
   function s(e) {
    const t = /^Warning\s*(\d+)?:/.exec(e);
    return t && t.length > 1 ? t[1] : "";
   }
   function a(e, {uri: a}, {end: u, message: c, start: f, type: l}) {
    return r(this, void 0, void 0, function*() {
     const r = {
      end: o.Position.intoCode(u),
      start: o.Position.intoCode(f)
     };
     const h = {
      range: r,
      uri: a
     };
     const d = yield n(e, h, c);
     const p = s(c);
     const v = t.intoCode(l);
     const y = "merlin";
     return i.Diagnostic.create(r, d, v, p, y);
    });
   }
   e.intoCode = a;
  })(a = t.IErrorReport || (t.IErrorReport = {}));
  var u;
  (function(e) {
   let t;
   (function(e) {
    function t(e) {
     switch (e) {
     case "Class":
      return i.SymbolKind.Class;

     case "Constructor":
      return i.SymbolKind.Constructor;

     case "Exn":
      return i.SymbolKind.Constructor;

     case "Label":
      return i.SymbolKind.Field;

     case "Method":
      return i.SymbolKind.Method;

     case "Modtype":
      return i.SymbolKind.Interface;

     case "Module":
      return i.SymbolKind.Module;

     case "Signature":
      return i.SymbolKind.Interface;

     case "Type":
      return i.SymbolKind.Class;

     case "Value":
      return i.SymbolKind.Variable;
     }
    }
    e.intoCode = t;
   })(t = e.Kind || (e.Kind = {}));
   function n(e, n) {
    const r = [];
    function s(e, a) {
     for (const u of e) {
      if (u) {
       const e = t.intoCode(u.kind);
       const c = {
        end: o.Position.intoCode(u.end),
        start: o.Position.intoCode(u.start)
       };
       const f = a === "" ? undefined : a;
       const l = `${a}${a === "" ? "" : "."}${u.name}`;
       const h = i.SymbolInformation.create(u.name, e, c, n.uri, f);
       r.push(h);
       s(u.children, l);
      }
     }
    }
    s(e, "");
    return r;
   }
   e.intoCode = n;
  })(u = t.Outline || (t.Outline = {}));
  var c;
  (function(e) {
   function t(e) {
    const t = "reason.hover.info";
    const n = e => ({
     language: t,
     value: `position: ${e}`
    });
    switch (e) {
    case "call":
     return n("tail (call)");

    case "no":
     return n("normal");

    case "position":
     return n("tail");
    }
   }
   e.intoCode = t;
  })(c = t.TailPosition || (t.TailPosition = {}));
 },
 "6Wkr": function(e, t, n) {
  "use strict";
  function r(e) {
   for (var n in e) if (!t.hasOwnProperty(n)) t[n] = e[n];
  }
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  t.Event = i.Event;
  const o = n("rgLv");
  const s = n("IZfP");
  const a = n("0zK7");
  const u = n("dMAy");
  r(n("KxYO"));
  const c = n("6bGS");
  var f;
  (function(e) {
   e.uriToFilePath = c.uriToFilePath;
   e.resolveGlobalNodePath = c.resolveGlobalNodePath;
   e.resolveGlobalYarnPath = c.resolveGlobalYarnPath;
   e.resolve = c.resolve;
   e.resolveModule = c.resolveModule;
   e.resolveModule2 = c.resolveModule2;
   e.resolveModulePath = c.resolveModulePath;
  })(f = t.Files || (t.Files = {}));
  let l = false;
  let h = undefined;
  function d() {
   const e = "--clientProcessId";
   function t(e) {
    try {
     let t = parseInt(e);
     if (!isNaN(t)) {
      h = setInterval(() => {
       try {
        process.kill(t, 0);
       } catch (e) {
        process.exit(l ? 0 : 1);
       }
      }, 3e3);
     }
    } catch (e) {}
   }
   for (let n = 2; n < process.argv.length; n++) {
    let r = process.argv[n];
    if (r === e && n + 1 < process.argv.length) {
     t(process.argv[n + 1]);
     return;
    } else {
     let n = r.split("=");
     if (n[0] === e) {
      t(n[1]);
     }
    }
   }
  }
  d();
  function p(e) {
   if (e === null) {
    return void 0;
   }
   return e;
  }
  class v {
   constructor() {
    this._documents = Object.create(null);
    this._onDidChangeContent = new i.Emitter();
    this._onDidOpen = new i.Emitter();
    this._onDidClose = new i.Emitter();
    this._onDidSave = new i.Emitter();
    this._onWillSave = new i.Emitter();
   }
   get syncKind() {
    return i.TextDocumentSyncKind.Full;
   }
   get onDidChangeContent() {
    return this._onDidChangeContent.event;
   }
   get onDidOpen() {
    return this._onDidOpen.event;
   }
   get onWillSave() {
    return this._onWillSave.event;
   }
   onWillSaveWaitUntil(e) {
    this._willSaveWaitUntil = e;
   }
   get onDidSave() {
    return this._onDidSave.event;
   }
   get onDidClose() {
    return this._onDidClose.event;
   }
   get(e) {
    return this._documents[e];
   }
   all() {
    return Object.keys(this._documents).map(e => this._documents[e]);
   }
   keys() {
    return Object.keys(this._documents);
   }
   listen(e) {
    function t(e) {
     return a.func(e.update);
    }
    e.__textDocumentSync = i.TextDocumentSyncKind.Full;
    e.onDidOpenTextDocument(e => {
     let t = e.textDocument;
     let n = i.TextDocument.create(t.uri, t.languageId, t.version, t.text);
     this._documents[t.uri] = n;
     let r = Object.freeze({
      document: n
     });
     this._onDidOpen.fire(r);
     this._onDidChangeContent.fire(r);
    });
    e.onDidChangeTextDocument(e => {
     let n = e.textDocument;
     let r = e.contentChanges;
     let i = r.length > 0 ? r[r.length - 1] : undefined;
     if (i) {
      let e = this._documents[n.uri];
      if (e && t(e)) {
       e.update(i, n.version);
       this._onDidChangeContent.fire(Object.freeze({
        document: e
       }));
      }
     }
    });
    e.onDidCloseTextDocument(e => {
     let t = this._documents[e.textDocument.uri];
     if (t) {
      delete this._documents[e.textDocument.uri];
      this._onDidClose.fire(Object.freeze({
       document: t
      }));
     }
    });
    e.onWillSaveTextDocument(e => {
     let t = this._documents[e.textDocument.uri];
     if (t) {
      this._onWillSave.fire(Object.freeze({
       document: t,
       reason: e.reason
      }));
     }
    });
    e.onWillSaveTextDocumentWaitUntil((e, t) => {
     let n = this._documents[e.textDocument.uri];
     if (n && this._willSaveWaitUntil) {
      return this._willSaveWaitUntil(Object.freeze({
       document: n,
       reason: e.reason
      }), t);
     } else {
      return [];
     }
    });
    e.onDidSaveTextDocument(e => {
     let t = this._documents[e.textDocument.uri];
     if (t) {
      this._onDidSave.fire(Object.freeze({
       document: t
      }));
     }
    });
   }
  }
  t.TextDocuments = v;
  class y {
   constructor() {
    this._messages = Object.create(null);
   }
   add(e) {
    let t = this._messages[e];
    if (!t) {
     t = 0;
    }
    t++;
    this._messages[e] = t;
   }
   sendErrors(e) {
    Object.keys(this._messages).forEach(t => {
     e.window.showErrorMessage(t);
    });
   }
  }
  t.ErrorMessageTracker = y;
  var g;
  (function(e) {
   function t() {
    return new m();
   }
   e.create = t;
  })(g = t.BulkRegistration || (t.BulkRegistration = {}));
  class m {
   constructor() {
    this._registrations = [];
    this._registered = new Set();
   }
   add(e, t) {
    const n = a.string(e) ? e : e.method;
    if (this._registered.has(n)) {
     throw new Error(`${n} is already added to this registration`);
    }
    const r = u.generateUuid();
    this._registrations.push({
     id: r,
     method: n,
     registerOptions: t || {}
    });
    this._registered.add(n);
   }
   asRegistrationParams() {
    return {
     registrations: this._registrations
    };
   }
  }
  var b;
  (function(e) {
   function t() {
    return new w(undefined, []);
   }
   e.create = t;
  })(b = t.BulkUnregistration || (t.BulkUnregistration = {}));
  class w {
   constructor(e, t) {
    this._connection = e;
    this._unregistrations = new Map();
    t.forEach(e => {
     this._unregistrations.set(e.method, e);
    });
   }
   get isAttached() {
    return !!this._connection;
   }
   attach(e) {
    this._connection = e;
   }
   add(e) {
    this._unregistrations.set(e.method, e);
   }
   dispose() {
    let e = [];
    for (let t of this._unregistrations.values()) {
     e.push(t);
    }
    let t = {
     unregisterations: e
    };
    this._connection.sendRequest(i.UnregistrationRequest.type, t).then(undefined, e => {
     this._connection.console.info(`Bulk unregistration failed.`);
    });
   }
   disposeSingle(e) {
    const t = a.string(e) ? e : e.method;
    const n = this._unregistrations.get(t);
    if (!n) {
     return false;
    }
    let r = {
     unregisterations: [ n ]
    };
    this._connection.sendRequest(i.UnregistrationRequest.type, r).then(() => {
     this._unregistrations.delete(t);
    }, e => {
     this._connection.console.info(`Unregistering request handler for ${n.id} failed.`);
    });
    return true;
   }
  }
  class _ {
   constructor() {}
   rawAttach(e) {
    this._rawConnection = e;
   }
   attach(e) {
    this._connection = e;
   }
   get connection() {
    if (!this._connection) {
     throw new Error("Remote is not attached to a connection yet.");
    }
    return this._connection;
   }
   fillServerCapabilities(e) {}
   initialize(e) {}
   error(e) {
    this.send(i.MessageType.Error, e);
   }
   warn(e) {
    this.send(i.MessageType.Warning, e);
   }
   info(e) {
    this.send(i.MessageType.Info, e);
   }
   log(e) {
    this.send(i.MessageType.Log, e);
   }
   send(e, t) {
    if (this._rawConnection) {
     this._rawConnection.sendNotification(i.LogMessageNotification.type, {
      type: e,
      message: t
     });
    }
   }
  }
  class x {
   constructor() {}
   attach(e) {
    this._connection = e;
   }
   get connection() {
    if (!this._connection) {
     throw new Error("Remote is not attached to a connection yet.");
    }
    return this._connection;
   }
   initialize(e) {}
   fillServerCapabilities(e) {}
   showErrorMessage(e, ...t) {
    let n = {
     type: i.MessageType.Error,
     message: e,
     actions: t
    };
    return this._connection.sendRequest(i.ShowMessageRequest.type, n).then(p);
   }
   showWarningMessage(e, ...t) {
    let n = {
     type: i.MessageType.Warning,
     message: e,
     actions: t
    };
    return this._connection.sendRequest(i.ShowMessageRequest.type, n).then(p);
   }
   showInformationMessage(e, ...t) {
    let n = {
     type: i.MessageType.Info,
     message: e,
     actions: t
    };
    return this._connection.sendRequest(i.ShowMessageRequest.type, n).then(p);
   }
  }
  class O {
   attach(e) {
    this._connection = e;
   }
   get connection() {
    if (!this._connection) {
     throw new Error("Remote is not attached to a connection yet.");
    }
    return this._connection;
   }
   initialize(e) {}
   fillServerCapabilities(e) {}
   register(e, t, n) {
    if (e instanceof m) {
     return this.registerMany(e);
    } else if (e instanceof w) {
     return this.registerSingle1(e, t, n);
    } else {
     return this.registerSingle2(e, t);
    }
   }
   registerSingle1(e, t, n) {
    const r = a.string(t) ? t : t.method;
    const o = u.generateUuid();
    let s = {
     registrations: [ {
      id: o,
      method: r,
      registerOptions: n || {}
     } ]
    };
    if (!e.isAttached) {
     e.attach(this._connection);
    }
    return this._connection.sendRequest(i.RegistrationRequest.type, s).then(t => {
     e.add({
      id: o,
      method: r
     });
     return e;
    }, e => {
     this.connection.console.info(`Registering request handler for ${r} failed.`);
     return Promise.reject(e);
    });
   }
   registerSingle2(e, t) {
    const n = a.string(e) ? e : e.method;
    const r = u.generateUuid();
    let o = {
     registrations: [ {
      id: r,
      method: n,
      registerOptions: t || {}
     } ]
    };
    return this._connection.sendRequest(i.RegistrationRequest.type, o).then(e => {
     return i.Disposable.create(() => {
      this.unregisterSingle(r, n);
     });
    }, e => {
     this.connection.console.info(`Registering request handler for ${n} failed.`);
     return Promise.reject(e);
    });
   }
   unregisterSingle(e, t) {
    let n = {
     unregisterations: [ {
      id: e,
      method: t
     } ]
    };
    return this._connection.sendRequest(i.UnregistrationRequest.type, n).then(undefined, t => {
     this.connection.console.info(`Unregistering request handler for ${e} failed.`);
    });
   }
   registerMany(e) {
    let t = e.asRegistrationParams();
    return this._connection.sendRequest(i.RegistrationRequest.type, t).then(() => {
     return new w(this._connection, t.registrations.map(e => {
      return {
       id: e.id,
       method: e.method
      };
     }));
    }, e => {
     this.connection.console.info(`Bulk registeration failed.`);
     return Promise.reject(e);
    });
   }
  }
  class S {
   constructor() {}
   attach(e) {
    this._connection = e;
   }
   get connection() {
    if (!this._connection) {
     throw new Error("Remote is not attached to a connection yet.");
    }
    return this._connection;
   }
   initialize(e) {}
   fillServerCapabilities(e) {}
   applyEdit(e) {
    let t = {
     edit: e
    };
    return this._connection.sendRequest(i.ApplyWorkspaceEditRequest.type, t);
   }
  }
  const k = s.WorkspaceFoldersFeature(o.ConfigurationFeature(S));
  class C {
   constructor() {
    this._trace = i.Trace.Off;
   }
   attach(e) {
    this._connection = e;
   }
   get connection() {
    if (!this._connection) {
     throw new Error("Remote is not attached to a connection yet.");
    }
    return this._connection;
   }
   initialize(e) {}
   fillServerCapabilities(e) {}
   set trace(e) {
    this._trace = e;
   }
   log(e, t) {
    if (this._trace === i.Trace.Off) {
     return;
    }
    this._connection.sendNotification(i.LogTraceNotification.type, {
     message: e,
     verbose: this._trace === i.Trace.Verbose ? t : undefined
    });
   }
  }
  class D {
   constructor() {}
   attach(e) {
    this._connection = e;
   }
   get connection() {
    if (!this._connection) {
     throw new Error("Remote is not attached to a connection yet.");
    }
    return this._connection;
   }
   initialize(e) {}
   fillServerCapabilities(e) {}
   logEvent(e) {
    this._connection.sendNotification(i.TelemetryEventNotification.type, e);
   }
  }
  function j(e, t) {
   return function(n) {
    return t(e(n));
   };
  }
  t.combineConsoleFeatures = j;
  function E(e, t) {
   return function(n) {
    return t(e(n));
   };
  }
  t.combineTelemetryFeatures = E;
  function P(e, t) {
   return function(n) {
    return t(e(n));
   };
  }
  t.combineTracerFeatures = P;
  function R(e, t) {
   return function(n) {
    return t(e(n));
   };
  }
  t.combineClientFeatures = R;
  function T(e, t) {
   return function(n) {
    return t(e(n));
   };
  }
  t.combineWindowFeatures = T;
  function A(e, t) {
   return function(n) {
    return t(e(n));
   };
  }
  t.combineWorkspaceFeatures = A;
  function I(e, t) {
   function n(e, t, n) {
    if (e && t) {
     return n(e, t);
    } else if (e) {
     return e;
    } else {
     return t;
    }
   }
   let r = {
    __brand: "features",
    console: n(e.console, t.console, j),
    tracer: n(e.tracer, t.tracer, P),
    telemetry: n(e.telemetry, t.telemetry, E),
    client: n(e.client, t.client, R),
    window: n(e.window, t.window, T),
    workspace: n(e.workspace, t.workspace, A)
   };
   return r;
  }
  t.combineFeatures = I;
  function M(e, t, n, r) {
   let o;
   let s;
   let a;
   let u;
   if (e !== void 0 && e.__brand === "features") {
    o = e;
    e = t;
    t = n;
    n = r;
   }
   if (i.ConnectionStrategy.is(e)) {
    u = e;
   } else {
    s = e;
    a = t;
    u = n;
   }
   return q(s, a, u, o);
  }
  t.createConnection = M;
  function q(e, t, n, r) {
   if (!e && !t && process.argv.length > 2) {
    let n = void 0;
    let r = void 0;
    let s = process.argv.slice(2);
    for (let a = 0; a < s.length; a++) {
     let u = s[a];
     if (u === "--node-ipc") {
      e = new i.IPCMessageReader(process);
      t = new i.IPCMessageWriter(process);
      break;
     } else if (u === "--stdio") {
      e = process.stdin;
      t = process.stdout;
      break;
     } else if (u === "--socket") {
      n = parseInt(s[a + 1]);
      break;
     } else if (u === "--pipe") {
      r = s[a + 1];
      break;
     } else {
      var o = u.split("=");
      if (o[0] === "--socket") {
       n = parseInt(o[1]);
       break;
      } else if (o[0] === "--pipe") {
       r = o[1];
       break;
      }
     }
    }
    if (n) {
     let r = i.createServerSocketTransport(n);
     e = r[0];
     t = r[1];
    } else if (r) {
     let n = i.createServerPipeTransport(r);
     e = n[0];
     t = n[1];
    }
   }
   var s = "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
   if (!e) {
    throw new Error("Connection input stream is not set. " + s);
   }
   if (!t) {
    throw new Error("Connection output stream is not set. " + s);
   }
   if (a.func(e.read) && a.func(e.on)) {
    let t = e;
    t.on("end", () => {
     process.exit(l ? 0 : 1);
    });
    t.on("close", () => {
     process.exit(l ? 0 : 1);
    });
   }
   const u = r && r.console ? new (r.console(_))() : new _();
   const c = i.createProtocolConnection(e, t, u, n);
   u.rawAttach(c);
   const f = r && r.tracer ? new (r.tracer(C))() : new C();
   const d = r && r.telemetry ? new (r.telemetry(D))() : new D();
   const p = r && r.client ? new (r.client(O))() : new O();
   const v = r && r.window ? new (r.window(x))() : new x();
   const y = r && r.workspace ? new (r.workspace(k))() : new k();
   const g = [ u, f, d, p, v, y ];
   function m(e) {
    if (a.thenable(e)) {
     return e;
    } else {
     return Promise.resolve(e);
    }
   }
   let b = undefined;
   let w = undefined;
   let S = undefined;
   let j = {
    listen: () => c.listen(),
    sendRequest: (e, ...t) => c.sendRequest(a.string(e) ? e : e.method, ...t),
    onRequest: (e, t) => c.onRequest(e, t),
    sendNotification: (e, ...t) => c.sendNotification(a.string(e) ? e : e.method, ...t),
    onNotification: (e, t) => c.onNotification(e, t),
    onInitialize: e => w = e,
    onInitialized: e => c.onNotification(i.InitializedNotification.type, e),
    onShutdown: e => b = e,
    onExit: e => S = e,
    get console() {
     return u;
    },
    get telemetry() {
     return d;
    },
    get tracer() {
     return f;
    },
    get client() {
     return p;
    },
    get window() {
     return v;
    },
    get workspace() {
     return y;
    },
    onDidChangeConfiguration: e => c.onNotification(i.DidChangeConfigurationNotification.type, e),
    onDidChangeWatchedFiles: e => c.onNotification(i.DidChangeWatchedFilesNotification.type, e),
    __textDocumentSync: undefined,
    onDidOpenTextDocument: e => c.onNotification(i.DidOpenTextDocumentNotification.type, e),
    onDidChangeTextDocument: e => c.onNotification(i.DidChangeTextDocumentNotification.type, e),
    onDidCloseTextDocument: e => c.onNotification(i.DidCloseTextDocumentNotification.type, e),
    onWillSaveTextDocument: e => c.onNotification(i.WillSaveTextDocumentNotification.type, e),
    onWillSaveTextDocumentWaitUntil: e => c.onRequest(i.WillSaveTextDocumentWaitUntilRequest.type, e),
    onDidSaveTextDocument: e => c.onNotification(i.DidSaveTextDocumentNotification.type, e),
    sendDiagnostics: e => c.sendNotification(i.PublishDiagnosticsNotification.type, e),
    onHover: e => c.onRequest(i.HoverRequest.type, e),
    onCompletion: e => c.onRequest(i.CompletionRequest.type, e),
    onCompletionResolve: e => c.onRequest(i.CompletionResolveRequest.type, e),
    onSignatureHelp: e => c.onRequest(i.SignatureHelpRequest.type, e),
    onDefinition: e => c.onRequest(i.DefinitionRequest.type, e),
    onTypeDefinition: e => c.onRequest(i.TypeDefinitionRequest.type, e),
    onImplementation: e => c.onRequest(i.ImplementationRequest.type, e),
    onReferences: e => c.onRequest(i.ReferencesRequest.type, e),
    onDocumentHighlight: e => c.onRequest(i.DocumentHighlightRequest.type, e),
    onDocumentSymbol: e => c.onRequest(i.DocumentSymbolRequest.type, e),
    onWorkspaceSymbol: e => c.onRequest(i.WorkspaceSymbolRequest.type, e),
    onCodeAction: e => c.onRequest(i.CodeActionRequest.type, e),
    onCodeLens: e => c.onRequest(i.CodeLensRequest.type, e),
    onCodeLensResolve: e => c.onRequest(i.CodeLensResolveRequest.type, e),
    onDocumentFormatting: e => c.onRequest(i.DocumentFormattingRequest.type, e),
    onDocumentRangeFormatting: e => c.onRequest(i.DocumentRangeFormattingRequest.type, e),
    onDocumentOnTypeFormatting: e => c.onRequest(i.DocumentOnTypeFormattingRequest.type, e),
    onRenameRequest: e => c.onRequest(i.RenameRequest.type, e),
    onDocumentLinks: e => c.onRequest(i.DocumentLinkRequest.type, e),
    onDocumentLinkResolve: e => c.onRequest(i.DocumentLinkResolveRequest.type, e),
    onDocumentColor: e => c.onRequest(i.DocumentColorRequest.type, e),
    onColorPresentation: e => c.onRequest(i.ColorPresentationRequest.type, e),
    onExecuteCommand: e => c.onRequest(i.ExecuteCommandRequest.type, e),
    dispose: () => c.dispose()
   };
   for (let e of g) {
    e.attach(j);
   }
   c.onRequest(i.InitializeRequest.type, e => {
    if (a.number(e.processId) && h === void 0) {
     setInterval(() => {
      try {
       process.kill(e.processId, 0);
      } catch (e) {
       process.exit(l ? 0 : 1);
      }
     }, 3e3);
    }
    if (a.string(e.trace)) {
     f.trace = i.Trace.fromString(e.trace);
    }
    for (let t of g) {
     t.initialize(e.capabilities);
    }
    if (w) {
     let t = w(e, new i.CancellationTokenSource().token);
     return m(t).then(e => {
      if (e instanceof i.ResponseError) {
       return e;
      }
      let t = e;
      if (!t) {
       t = {
        capabilities: {}
       };
      }
      let n = t.capabilities;
      if (!n) {
       n = {};
       t.capabilities = n;
      }
      if (!n.textDocumentSync) {
       n.textDocumentSync = a.number(j.__textDocumentSync) ? j.__textDocumentSync : i.TextDocumentSyncKind.None;
      } else if (!a.number(n.textDocumentSync) && !a.number(n.textDocumentSync.change)) {
       n.textDocumentSync.change = a.number(j.__textDocumentSync) ? j.__textDocumentSync : i.TextDocumentSyncKind.None;
      }
      for (let e of g) {
       e.fillServerCapabilities(n);
      }
      return t;
     });
    } else {
     let e = {
      capabilities: {
       textDocumentSync: i.TextDocumentSyncKind.None
      }
     };
     for (let t of g) {
      t.fillServerCapabilities(e.capabilities);
     }
     return e;
    }
   });
   c.onRequest(i.ShutdownRequest.type, () => {
    l = true;
    if (b) {
     return b(new i.CancellationTokenSource().token);
    } else {
     return undefined;
    }
   });
   c.onNotification(i.ExitNotification.type, () => {
    try {
     if (S) {
      S();
     }
    } finally {
     if (l) {
      process.exit(0);
     } else {
      process.exit(1);
     }
    }
   });
   c.onNotification(i.SetTraceNotification.type, e => {
    f.trace = i.Trace.fromString(e.value);
   });
   return j;
  }
  var N;
  (function(e) {
   e.all = {
    __brand: "features"
   };
  })(N = t.ProposedFeatures || (t.ProposedFeatures = {}));
 },
 "6bGS": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("bzos");
  const i = n("oyvS");
  const o = n("mw/K");
  const s = n("QduZ");
  function a(e) {
   let t = r.parse(e);
   if (t.protocol !== "file:" || !t.path) {
    return undefined;
   }
   let n = t.path.split("/");
   for (var o = 0, s = n.length; o < s; o++) {
    n[o] = decodeURIComponent(n[o]);
   }
   if (process.platform === "win32" && n.length > 1) {
    let e = n[0];
    let t = n[1];
    if (e.length === 0 && t.length > 1 && t[1] === ":") {
     n.shift();
    }
   }
   return i.normalize(n.join("/"));
  }
  t.uriToFilePath = a;
  function u() {
   return process.platform === "win32";
  }
  function c(e, t) {
   let r = "NODE_PATH";
   return new Promise((o, a) => {
    let c = [];
    if (e) {
     c.push(i.join(e, "node_modules"));
    }
    s.exec("npm config get prefix", (e, f, l) => {
     if (!e) {
      let e = f.replace(/[\s\r\n]+$/, "");
      if (e.length > 0) {
       if (u()) {
        c.push(i.join(e, "node_modules"));
       } else {
        c.push(i.join(e, "lib", "node_modules"));
       }
      }
     }
     let h = u() ? ";" : ":";
     let d = process.env;
     let p = Object.create(null);
     Object.keys(d).forEach(e => p[e] = d[e]);
     if (p[r]) {
      p[r] = c.join(h) + h + p[r];
     } else {
      p[r] = c.join(h);
     }
     try {
      let r = s.fork(i.join(__dirname, "resolve.js"), [], {
       env: p,
       execArgv: []
      });
      r.on("message", e => {
       if (e.command === "resolve") {
        let i = t;
        if (e.success) {
         i = e.result;
        }
        r.send({
         command: "exit"
        });
        try {
         o(n("w1sI")(i));
        } catch (e) {
         a(e);
        }
       }
      });
      let u = {
       command: "resolve",
       args: t
      };
      r.send(u);
     } catch (e) {
      a(e);
     }
    });
   });
  }
  t.resolveModule = c;
  function f(e, t, n, r) {
   const o = "NODE_PATH";
   const a = [ "var p = process;", "p.on('message',function(m){", "if(m.c==='e'){", "p.exit(0);", "}", "else if(m.c==='rs'){", "try{", "var r=require.resolve(m.a);", "p.send({c:'r',s:true,r:r});", "}", "catch(err){", "p.send({c:'r',s:false});", "}", "}", "});" ].join("");
   return new Promise((u, c) => {
    let f = process.env;
    let l = Object.create(null);
    Object.keys(f).forEach(e => l[e] = f[e]);
    if (t) {
     if (l[o]) {
      l[o] = t + i.delimiter + l[o];
     } else {
      l[o] = t;
     }
     if (r) {
      r(`NODE_PATH value is: ${l[o]}`);
     }
    }
    l["ATOM_SHELL_INTERNAL_RUN_AS_NODE"] = "1";
    try {
     let t = s.fork("", [], {
      cwd: n,
      env: l,
      execArgv: [ "-e", a ]
     });
     t.on("error", e => {
      c(e);
     });
     t.on("message", n => {
      if (n.c === "r") {
       t.send({
        c: "e"
       });
       if (n.s) {
        u(n.r);
       } else {
        c(new Error(`Failed to resolve module: ${e}`));
       }
      }
     });
     let r = {
      c: "rs",
      a: e
     };
     t.send(r);
    } catch (e) {
     c(e);
    }
   });
  }
  t.resolve = f;
  function l(e) {
   let t = u() ? "npm.cmd" : "npm";
   let n = s.spawnSync(t, [ "config", "get", "prefix" ], {
    encoding: "utf8"
   }).stdout;
   if (!n) {
    if (e) {
     e(`'npm config get prefix' didn't return a value.`);
    }
    return undefined;
   }
   let r = n.trim();
   if (e) {
    e(`'npm config get prefix' value is: ${r}`);
   }
   if (r.length > 0) {
    if (u()) {
     return i.join(r, "node_modules");
    } else {
     return i.join(r, "lib", "node_modules");
    }
   }
   return undefined;
  }
  t.resolveGlobalNodePath = l;
  function h(e) {
   let t = u() ? "yarn.cmd" : "yarn";
   let n = s.spawnSync(t, [ "global", "dir", "--json" ], {
    encoding: "utf8"
   });
   let r = n.stdout;
   if (!r) {
    if (e) {
     e(`'yarn global dir' didn't return a value.`);
     if (n.stderr) {
      e(n.stderr);
     }
    }
    return undefined;
   }
   let o = r.trim().split(/\r?\n/);
   for (let e of o) {
    try {
     let t = JSON.parse(e);
     if (t.type === "log") {
      return i.join(t.data, "node_modules");
     }
    } catch (e) {}
   }
   return undefined;
  }
  t.resolveGlobalYarnPath = h;
  var d;
  (function(e) {
   let t = undefined;
   function n() {
    if (t !== void 0) {
     return t;
    }
    if (process.platform === "win32") {
     t = false;
    } else {
     t = !o.existsSync(__filename.toUpperCase()) || !o.existsSync(__filename.toLowerCase());
    }
    return t;
   }
   e.isCaseSensitive = n;
   function r(e, t) {
    if (n()) {
     return i.normalize(t).indexOf(i.normalize(e)) === 0;
    } else {
     return i.normalize(t).toLowerCase().indexOf(i.normalize(e).toLowerCase()) == 0;
    }
   }
   e.isParent = r;
  })(d = t.FileSystem || (t.FileSystem = {}));
  function p(e, t, n, r) {
   if (n) {
    if (!i.isAbsolute(n)) {
     n = i.join(e, n);
    }
    return f(t, n, n, r).then(e => {
     if (d.isParent(n, e)) {
      return e;
     } else {
      return Promise.reject(new Error(`Failed to load ${t} from node path location.`));
     }
    }).then(undefined, n => {
     return f(t, l(r), e, r);
    });
   } else {
    return f(t, l(r), e, r);
   }
  }
  t.resolveModulePath = p;
  function v(e, t, r, i) {
   return p(e, t, r, i).then(e => {
    if (i) {
     i(`Module ${t} got resolved to ${e}`);
    }
    return n("w1sI")(e);
   });
  }
  t.resolveModule2 = v;
 },
 "72xm": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  function r(e) {
   return () => {
    e.dispose();
   };
  }
  t.default = r;
 },
 "86+m": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("gcj8");
  const i = n("GeYi");
  t.giveCaseAnalysis = new r.RequestType("reason.server.giveCaseAnalysis");
  t.giveMerlinFiles = new r.RequestType("reason.server.giveMerlinFiles");
  t.giveAvailableLibraries = new r.RequestType("reason.server.giveAvailableLibraries");
  t.giveProjectEnv = new r.RequestType("reason.server.giveProjectEnv");
  void i;
 },
 "8Goc": function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  const o = n("pBAs");
  function s(e) {
   return o.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const r = i.merlin.Query.outline();
    const o = yield e.merlin.query(r, n, t.textDocument, Infinity);
    if ("return" !== o.class) return [];
    const s = o.value;
    return i.merlin.Outline.intoCode(s, t.textDocument);
   }));
  }
  t.default = s;
 },
 "9d5b": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  t.createDiagnostic = (e => (t, n, r, i, o, s) => {
   return {
    code: "",
    message: t,
    range: {
     end: {
      character: i,
      line: o
     },
     start: {
      character: n,
      line: r
     }
    },
    severity: s,
    source: e
   };
  });
 },
 AHUE: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("k7xx");
  t.BuckleScript = r.default;
  const i = n("MGgX");
  t.Env = i.default;
  const o = n("wbzG");
  t.Esy = o.default;
  const s = n("ZqT8");
  t.Merlin = s.default;
  const a = n("PnYj");
  t.Ocamlfind = a.default;
  const u = n("aiB0");
  t.OcpIndent = u.default;
  const c = n("FS6R");
  t.ReFMT = c.default;
 },
 B5MM: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  t.default = ((e, t, n, o = 0) => r(this, void 0, void 0, function*() {
   const r = i.merlin.Position.fromCode(n.position);
   const s = i.merlin.Query.document(null).at(r);
   const a = yield e.merlin.query(s, t, n.textDocument, o);
   if ("return" !== a.class) return null;
   return a.value;
  }));
 },
 BO9s: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("ppFO");
  t.codeAction = r.default;
  const i = n("K5tX");
  t.codeLens = i.default;
  const o = n("IAg7");
  t.codeLensResolve = o.default;
  const s = n("e3vP");
  t.completion = s.default;
  const a = n("NWhw");
  t.completionResolve = a.default;
  const u = n("iDKc");
  t.definition = u.default;
  const c = n("ScIO");
  t.didChangeConfiguration = c.default;
  const f = n("nOH4");
  t.didChangeWatchedFiles = f.default;
  const l = n("T4Ul");
  t.documentFormatting = l.default;
  const h = n("Lhb6");
  t.documentHighlight = h.default;
  const d = n("8Goc");
  t.documentSymbol = d.default;
  const p = n("qtV4");
  t.hover = p.default;
  const v = n("UmWi");
  t.references = v.default;
  const y = n("pP65");
  t.rename = y.default;
  const g = n("KcUE");
  t.workspaceSymbol = g.default;
 },
 CVGz: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
 },
 Cs6m: function(e, t, n) {
  "use strict";
  var r = this && this.__extends || function() {
   var e = Object.setPrototypeOf || {
    __proto__: []
   } instanceof Array && function(e, t) {
    e.__proto__ = t;
   } || function(e, t) {
    for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
   };
   return function(t, n) {
    e(t, n);
    function r() {
     this.constructor = t;
    }
    t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
   };
  }();
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var i = n("rCXO");
  var o = n("lq4E");
  var s = 8192;
  var a = new Buffer("\r", "ascii")[0];
  var u = new Buffer("\n", "ascii")[0];
  var c = "\r\n";
  var f = function() {
   function e(e) {
    if (e === void 0) {
     e = "utf8";
    }
    this.encoding = e;
    this.index = 0;
    this.buffer = new Buffer(s);
   }
   e.prototype.append = function(e) {
    var t = e;
    if (typeof e == "string") {
     var n = e;
     var r = Buffer.byteLength(n, this.encoding);
     t = new Buffer(r);
     t.write(n, 0, r, this.encoding);
    }
    if (this.buffer.length - this.index >= t.length) {
     t.copy(this.buffer, this.index, 0, t.length);
    } else {
     var i = (Math.ceil((this.index + t.length) / s) + 1) * s;
     if (this.index === 0) {
      this.buffer = new Buffer(i);
      t.copy(this.buffer, 0, 0, t.length);
     } else {
      this.buffer = Buffer.concat([ this.buffer.slice(0, this.index), t ], i);
     }
    }
    this.index += t.length;
   };
   e.prototype.tryReadHeaders = function() {
    var e = undefined;
    var t = 0;
    while (t + 3 < this.index && (this.buffer[t] !== a || this.buffer[t + 1] !== u || this.buffer[t + 2] !== a || this.buffer[t + 3] !== u)) {
     t++;
    }
    if (t + 3 >= this.index) {
     return e;
    }
    e = Object.create(null);
    var n = this.buffer.toString("ascii", 0, t).split(c);
    n.forEach(function(t) {
     var n = t.indexOf(":");
     if (n === -1) {
      throw new Error("Message header must separate key and value using :");
     }
     var r = t.substr(0, n);
     var i = t.substr(n + 1).trim();
     e[r] = i;
    });
    var r = t + 4;
    this.buffer = this.buffer.slice(r);
    this.index = this.index - r;
    return e;
   };
   e.prototype.tryReadContent = function(e) {
    if (this.index < e) {
     return null;
    }
    var t = this.buffer.toString(this.encoding, 0, e);
    var n = e;
    this.buffer.copy(this.buffer, 0, n);
    this.index = this.index - n;
    return t;
   };
   Object.defineProperty(e.prototype, "numberOfBytes", {
    get: function() {
     return this.index;
    },
    enumerable: true,
    configurable: true
   });
   return e;
  }();
  var l;
  (function(e) {
   function t(e) {
    var t = e;
    return t && o.func(t.listen) && o.func(t.dispose) && o.func(t.onError) && o.func(t.onClose) && o.func(t.onPartialMessage);
   }
   e.is = t;
  })(l = t.MessageReader || (t.MessageReader = {}));
  var h = function() {
   function e() {
    this.errorEmitter = new i.Emitter();
    this.closeEmitter = new i.Emitter();
    this.partialMessageEmitter = new i.Emitter();
   }
   e.prototype.dispose = function() {
    this.errorEmitter.dispose();
    this.closeEmitter.dispose();
   };
   Object.defineProperty(e.prototype, "onError", {
    get: function() {
     return this.errorEmitter.event;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.fireError = function(e) {
    this.errorEmitter.fire(this.asError(e));
   };
   Object.defineProperty(e.prototype, "onClose", {
    get: function() {
     return this.closeEmitter.event;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.fireClose = function() {
    this.closeEmitter.fire(undefined);
   };
   Object.defineProperty(e.prototype, "onPartialMessage", {
    get: function() {
     return this.partialMessageEmitter.event;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.firePartialMessage = function(e) {
    this.partialMessageEmitter.fire(e);
   };
   e.prototype.asError = function(e) {
    if (e instanceof Error) {
     return e;
    } else {
     return new Error("Reader recevied error. Reason: " + (o.string(e.message) ? e.message : "unknown"));
    }
   };
   return e;
  }();
  t.AbstractMessageReader = h;
  var d = function(e) {
   r(t, e);
   function t(t, n) {
    if (n === void 0) {
     n = "utf8";
    }
    var r = e.call(this) || this;
    r.readable = t;
    r.buffer = new f(n);
    r._partialMessageTimeout = 1e4;
    return r;
   }
   Object.defineProperty(t.prototype, "partialMessageTimeout", {
    get: function() {
     return this._partialMessageTimeout;
    },
    set: function(e) {
     this._partialMessageTimeout = e;
    },
    enumerable: true,
    configurable: true
   });
   t.prototype.listen = function(e) {
    var t = this;
    this.nextMessageLength = -1;
    this.messageToken = 0;
    this.partialMessageTimer = undefined;
    this.callback = e;
    this.readable.on("data", function(e) {
     t.onData(e);
    });
    this.readable.on("error", function(e) {
     return t.fireError(e);
    });
    this.readable.on("close", function() {
     return t.fireClose();
    });
   };
   t.prototype.onData = function(e) {
    this.buffer.append(e);
    while (true) {
     if (this.nextMessageLength === -1) {
      var t = this.buffer.tryReadHeaders();
      if (!t) {
       return;
      }
      var n = t["Content-Length"];
      if (!n) {
       throw new Error("Header must provide a Content-Length property.");
      }
      var r = parseInt(n);
      if (isNaN(r)) {
       throw new Error("Content-Length value must be a number.");
      }
      this.nextMessageLength = r;
     }
     var i = this.buffer.tryReadContent(this.nextMessageLength);
     if (i === null) {
      this.setPartialMessageTimer();
      return;
     }
     this.clearPartialMessageTimer();
     this.nextMessageLength = -1;
     this.messageToken++;
     var o = JSON.parse(i);
     this.callback(o);
    }
   };
   t.prototype.clearPartialMessageTimer = function() {
    if (this.partialMessageTimer) {
     clearTimeout(this.partialMessageTimer);
     this.partialMessageTimer = undefined;
    }
   };
   t.prototype.setPartialMessageTimer = function() {
    var e = this;
    this.clearPartialMessageTimer();
    if (this._partialMessageTimeout <= 0) {
     return;
    }
    this.partialMessageTimer = setTimeout(function(t, n) {
     e.partialMessageTimer = undefined;
     if (t === e.messageToken) {
      e.firePartialMessage({
       messageToken: t,
       waitingTime: n
      });
      e.setPartialMessageTimer();
     }
    }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
   };
   return t;
  }(h);
  t.StreamMessageReader = d;
  var p = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this) || this;
    n.process = t;
    var r = n.process;
    r.on("error", function(e) {
     return n.fireError(e);
    });
    r.on("close", function() {
     return n.fireClose();
    });
    return n;
   }
   t.prototype.listen = function(e) {
    this.process.on("message", e);
   };
   return t;
  }(h);
  t.IPCMessageReader = p;
  var v = function(e) {
   r(t, e);
   function t(t, n) {
    if (n === void 0) {
     n = "utf-8";
    }
    return e.call(this, t, n) || this;
   }
   return t;
  }(d);
  t.SocketMessageReader = v;
 },
 D11j: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  function o(e) {
   return (t, n) => r(this, void 0, void 0, function*() {
    const r = i.merlin.Position.fromCode(t.range.start);
    const o = i.merlin.Position.fromCode(t.range.end);
    const s = i.merlin.Query.kase.analysis.from(r).to(o);
    const a = yield e.merlin.query(s, n, t.textDocument);
    if (n.isCancellationRequested) return null;
    if ("return" !== a.class) throw a.value;
    return a.value;
   });
  }
  t.default = o;
 },
 D2qR: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  function o(e, t, n, o = 0) {
   return r(this, void 0, void 0, function*() {
    const r = i.merlin.Query.project.get();
    const s = yield e.merlin.query(r, t, n, o);
    if ("return" !== s.class) return [];
    return s.value.result;
   });
  }
  t.default = o;
 },
 EJ9c: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("FTuL");
  t.exit = r.default;
  const i = n("prP1");
  t.initialize = i.default;
  const o = n("72xm");
  t.shutdown = o.default;
 },
 FNMX: function(e, t, n) {
  "use strict";
  var r = this && this.__extends || function() {
   var e = Object.setPrototypeOf || {
    __proto__: []
   } instanceof Array && function(e, t) {
    e.__proto__ = t;
   } || function(e, t) {
    for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
   };
   return function(t, n) {
    e(t, n);
    function r() {
     this.constructor = t;
    }
    t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
   };
  }();
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var i = n("lq4E");
  var o;
  (function(e) {
   e.ParseError = -32700;
   e.InvalidRequest = -32600;
   e.MethodNotFound = -32601;
   e.InvalidParams = -32602;
   e.InternalError = -32603;
   e.serverErrorStart = -32099;
   e.serverErrorEnd = -32e3;
   e.ServerNotInitialized = -32002;
   e.UnknownErrorCode = -32001;
   e.RequestCancelled = -32800;
   e.MessageWriteError = 1;
   e.MessageReadError = 2;
  })(o = t.ErrorCodes || (t.ErrorCodes = {}));
  var s = function(e) {
   r(t, e);
   function t(n, r, s) {
    var a = e.call(this, r) || this;
    a.code = i.number(n) ? n : o.UnknownErrorCode;
    if (s !== void 0) {
     a.data = s;
    }
    Object.setPrototypeOf(a, t.prototype);
    return a;
   }
   t.prototype.toJson = function() {
    var e = {
     code: this.code,
     message: this.message
    };
    if (this.data !== void 0) {
     e.data = this.data;
    }
    return e;
   };
   return t;
  }(Error);
  t.ResponseError = s;
  var a = function() {
   function e(e, t) {
    this._method = e;
    this._numberOfParams = t;
   }
   Object.defineProperty(e.prototype, "method", {
    get: function() {
     return this._method;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "numberOfParams", {
    get: function() {
     return this._numberOfParams;
    },
    enumerable: true,
    configurable: true
   });
   return e;
  }();
  t.AbstractMessageType = a;
  var u = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 0) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType0 = u;
  var c = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 1) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType = c;
  var f = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 1) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType1 = f;
  var l = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 2) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType2 = l;
  var h = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 3) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType3 = h;
  var d = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 4) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType4 = d;
  var p = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 5) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType5 = p;
  var v = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 6) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType6 = v;
  var y = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 7) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType7 = y;
  var g = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 8) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType8 = g;
  var m = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 9) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.RequestType9 = m;
  var b = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 1) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType = b;
  var w = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 0) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType0 = w;
  var _ = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 1) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType1 = _;
  var x = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 2) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType2 = x;
  var O = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 3) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType3 = O;
  var S = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 4) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType4 = S;
  var k = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 5) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType5 = k;
  var C = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 6) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType6 = C;
  var D = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 7) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType7 = D;
  var j = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 8) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType8 = j;
  var E = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this, t, 9) || this;
    n._ = undefined;
    return n;
   }
   return t;
  }(a);
  t.NotificationType9 = E;
  function P(e) {
   var t = e;
   return t && i.string(t.method) && (i.string(t.id) || i.number(t.id));
  }
  t.isRequestMessage = P;
  function R(e) {
   var t = e;
   return t && i.string(t.method) && e.id === void 0;
  }
  t.isNotificationMessage = R;
  function T(e) {
   var t = e;
   return t && (t.result !== void 0 || !!t.error) && (i.string(t.id) || i.number(t.id) || t.id === null);
  }
  t.isResponseMessage = T;
 },
 FS6R: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e, t, n) {
    const r = t ? t.uri : ".re";
    const i = e.settings.reason.path.refmt;
    const o = e.settings.reason.format.width;
    const s = o === null ? [] : [ "--print-width", `${o}` ];
    const a = n || [ "--parse", "re", "--print", "re", "--interface", `${/\.rei$/.test(r)}` ].concat(s);
    this.process = e.environment.spawn(i, a);
   }
  }
  t.default = r;
 },
 FTuL: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  function r(e) {
   return () => {};
  }
  t.default = r;
 },
 "Fn/0": function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("gcj8");
  var i;
  (function(e) {
   e.type = new r.RequestType("textDocument/documentColor");
  })(i = t.DocumentColorRequest || (t.DocumentColorRequest = {}));
  var o;
  (function(e) {
   e.type = new r.RequestType("textDocument/colorPresentation");
  })(o = t.ColorPresentationRequest || (t.ColorPresentationRequest = {}));
 },
 GeYi: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var r;
  (function(e) {
   function t({character: e, line: t}) {
    return {
     col: e,
     line: t + 1
    };
   }
   e.fromCode = t;
   function n({col: e, line: t}) {
    return {
     character: e,
     line: t - 1
    };
   }
   e.intoCode = n;
  })(r = t.Position || (t.Position = {}));
  var i;
  (function(e) {
   function t(e) {
    const t = r.fromCode(e.start);
    const n = r.fromCode(e.end);
    return {
     start: t,
     end: n
    };
   }
   e.fromCode = t;
   function n(e) {
    const t = r.intoCode(e.start);
    const n = r.intoCode(e.end);
    return {
     start: t,
     end: n
    };
   }
   e.intoCode = n;
  })(i = t.Location || (t.Location = {}));
 },
 IAg7: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("4Tfi");
  const o = n("pBAs");
  function s(e) {
   return o.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const r = t.data;
    const o = yield i.getType(e, r.event, n, 1);
    if (null == o) return t;
    t.command = {
     command: "",
     title: o.type
    };
    if ("re" === r.fileKind) t.command.title = t.command.title.replace(/ : /g, ": ");
    if (!e.settings.reason.codelens.unicode) return t;
    if ("ml" === r.fileKind) t.command.title = t.command.title.replace(/->/g, "→");
    if ("ml" === r.fileKind) t.command.title = t.command.title.replace(/\*/g, "×");
    if ("re" === r.fileKind) t.command.title = t.command.title.replace(/=>/g, "⇒");
    return t;
   }));
  }
  t.default = s;
 },
 IZfP: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("KxYO");
  t.WorkspaceFoldersFeature = (e => {
   return class extends e {
    initialize(e) {
     let t = e.workspace;
     if (t && t.workspaceFolders) {
      this._onDidChangeWorkspaceFolders = new r.Emitter();
      this.connection.onNotification(r.DidChangeWorkspaceFoldersNotification.type, e => {
       this._onDidChangeWorkspaceFolders.fire(e.event);
      });
     }
    }
    getWorkspaceFolders() {
     return this.connection.sendRequest(r.WorkspaceFoldersRequest.type);
    }
    get onDidChangeWorkspaceFolders() {
     if (!this._onDidChangeWorkspaceFolders) {
      throw new Error("Client doesn't support sending workspace folder change events.");
     }
     if (!this._unregistration) {
      this._unregistration = this.connection.client.register(r.DidChangeWorkspaceFoldersNotification.type);
     }
     return this._onDidChangeWorkspaceFolders.event;
    }
   };
  });
 },
 JtuM: function(e, t, n) {
  (function(e) {
   var r;
   (function() {
    var i;
    var o = "4.17.5";
    var s = 200;
    var a = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", u = "Expected a function";
    var c = "__lodash_hash_undefined__";
    var f = 500;
    var l = "__lodash_placeholder__";
    var h = 1, d = 2, p = 4;
    var v = 1, y = 2;
    var g = 1, m = 2, b = 4, w = 8, _ = 16, x = 32, O = 64, S = 128, k = 256, C = 512;
    var D = 30, j = "...";
    var E = 800, P = 16;
    var R = 1, T = 2, A = 3;
    var I = 1 / 0, M = 9007199254740991, q = 1.7976931348623157e308, N = 0 / 0;
    var L = 4294967295, F = L - 1, z = L >>> 1;
    var W = [ [ "ary", S ], [ "bind", g ], [ "bindKey", m ], [ "curry", w ], [ "curryRight", _ ], [ "flip", C ], [ "partial", x ], [ "partialRight", O ], [ "rearg", k ] ];
    var $ = "[object Arguments]", B = "[object Array]", K = "[object AsyncFunction]", U = "[object Boolean]", H = "[object Date]", V = "[object DOMException]", J = "[object Error]", G = "[object Function]", Q = "[object GeneratorFunction]", Y = "[object Map]", Z = "[object Number]", X = "[object Null]", ee = "[object Object]", te = "[object Promise]", ne = "[object Proxy]", re = "[object RegExp]", ie = "[object Set]", oe = "[object String]", se = "[object Symbol]", ae = "[object Undefined]", ue = "[object WeakMap]", ce = "[object WeakSet]";
    var fe = "[object ArrayBuffer]", le = "[object DataView]", he = "[object Float32Array]", de = "[object Float64Array]", pe = "[object Int8Array]", ve = "[object Int16Array]", ye = "[object Int32Array]", ge = "[object Uint8Array]", me = "[object Uint8ClampedArray]", be = "[object Uint16Array]", we = "[object Uint32Array]";
    var _e = /\b__p \+= '';/g, xe = /\b(__p \+=) '' \+/g, Oe = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var Se = /&(?:amp|lt|gt|quot|#39);/g, ke = /[&<>"']/g, Ce = RegExp(Se.source), De = RegExp(ke.source);
    var je = /<%-([\s\S]+?)%>/g, Ee = /<%([\s\S]+?)%>/g, Pe = /<%=([\s\S]+?)%>/g;
    var Re = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Te = /^\w*$/, Ae = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var Ie = /[\\^$.*+?()[\]{}|]/g, Me = RegExp(Ie.source);
    var qe = /^\s+|\s+$/g, Ne = /^\s+/, Le = /\s+$/;
    var Fe = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ze = /\{\n\/\* \[wrapped with (.+)\] \*/, We = /,? & /;
    var $e = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var Be = /\\(\\)?/g;
    var Ke = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var Ue = /\w*$/;
    var He = /^[-+]0x[0-9a-f]+$/i;
    var Ve = /^0b[01]+$/i;
    var Je = /^\[object .+?Constructor\]$/;
    var Ge = /^0o[0-7]+$/i;
    var Qe = /^(?:0|[1-9]\d*)$/;
    var Ye = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var Ze = /($^)/;
    var Xe = /['\n\r\u2028\u2029\\]/g;
    var et = "\\ud800-\\udfff", tt = "\\u0300-\\u036f", nt = "\\ufe20-\\ufe2f", rt = "\\u20d0-\\u20ff", it = tt + nt + rt, ot = "\\u2700-\\u27bf", st = "a-z\\xdf-\\xf6\\xf8-\\xff", at = "\\xac\\xb1\\xd7\\xf7", ut = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ct = "\\u2000-\\u206f", ft = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", lt = "A-Z\\xc0-\\xd6\\xd8-\\xde", ht = "\\ufe0e\\ufe0f", dt = at + ut + ct + ft;
    var pt = "['’]", vt = "[" + et + "]", yt = "[" + dt + "]", gt = "[" + it + "]", mt = "\\d+", bt = "[" + ot + "]", wt = "[" + st + "]", _t = "[^" + et + dt + mt + ot + st + lt + "]", xt = "\\ud83c[\\udffb-\\udfff]", Ot = "(?:" + gt + "|" + xt + ")", St = "[^" + et + "]", kt = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ct = "[\\ud800-\\udbff][\\udc00-\\udfff]", Dt = "[" + lt + "]", jt = "\\u200d";
    var Et = "(?:" + wt + "|" + _t + ")", Pt = "(?:" + Dt + "|" + _t + ")", Rt = "(?:" + pt + "(?:d|ll|m|re|s|t|ve))?", Tt = "(?:" + pt + "(?:D|LL|M|RE|S|T|VE))?", At = Ot + "?", It = "[" + ht + "]?", Mt = "(?:" + jt + "(?:" + [ St, kt, Ct ].join("|") + ")" + It + At + ")*", qt = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Nt = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Lt = It + At + Mt, Ft = "(?:" + [ bt, kt, Ct ].join("|") + ")" + Lt, zt = "(?:" + [ St + gt + "?", gt, kt, Ct, vt ].join("|") + ")";
    var Wt = RegExp(pt, "g");
    var $t = RegExp(gt, "g");
    var Bt = RegExp(xt + "(?=" + xt + ")|" + zt + Lt, "g");
    var Kt = RegExp([ Dt + "?" + wt + "+" + Rt + "(?=" + [ yt, Dt, "$" ].join("|") + ")", Pt + "+" + Tt + "(?=" + [ yt, Dt + Et, "$" ].join("|") + ")", Dt + "?" + Et + "+" + Rt, Dt + "+" + Tt, Nt, qt, mt, Ft ].join("|"), "g");
    var Ut = RegExp("[" + jt + et + it + ht + "]");
    var Ht = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var Vt = [ "Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout" ];
    var Jt = -1;
    var Gt = {};
    Gt[he] = Gt[de] = Gt[pe] = Gt[ve] = Gt[ye] = Gt[ge] = Gt[me] = Gt[be] = Gt[we] = true;
    Gt[$] = Gt[B] = Gt[fe] = Gt[U] = Gt[le] = Gt[H] = Gt[J] = Gt[G] = Gt[Y] = Gt[Z] = Gt[ee] = Gt[re] = Gt[ie] = Gt[oe] = Gt[ue] = false;
    var Qt = {};
    Qt[$] = Qt[B] = Qt[fe] = Qt[le] = Qt[U] = Qt[H] = Qt[he] = Qt[de] = Qt[pe] = Qt[ve] = Qt[ye] = Qt[Y] = Qt[Z] = Qt[ee] = Qt[re] = Qt[ie] = Qt[oe] = Qt[se] = Qt[ge] = Qt[me] = Qt[be] = Qt[we] = true;
    Qt[J] = Qt[G] = Qt[ue] = false;
    var Yt = {
     "À": "A",
     "Á": "A",
     "Â": "A",
     "Ã": "A",
     "Ä": "A",
     "Å": "A",
     "à": "a",
     "á": "a",
     "â": "a",
     "ã": "a",
     "ä": "a",
     "å": "a",
     "Ç": "C",
     "ç": "c",
     "Ð": "D",
     "ð": "d",
     "È": "E",
     "É": "E",
     "Ê": "E",
     "Ë": "E",
     "è": "e",
     "é": "e",
     "ê": "e",
     "ë": "e",
     "Ì": "I",
     "Í": "I",
     "Î": "I",
     "Ï": "I",
     "ì": "i",
     "í": "i",
     "î": "i",
     "ï": "i",
     "Ñ": "N",
     "ñ": "n",
     "Ò": "O",
     "Ó": "O",
     "Ô": "O",
     "Õ": "O",
     "Ö": "O",
     "Ø": "O",
     "ò": "o",
     "ó": "o",
     "ô": "o",
     "õ": "o",
     "ö": "o",
     "ø": "o",
     "Ù": "U",
     "Ú": "U",
     "Û": "U",
     "Ü": "U",
     "ù": "u",
     "ú": "u",
     "û": "u",
     "ü": "u",
     "Ý": "Y",
     "ý": "y",
     "ÿ": "y",
     "Æ": "Ae",
     "æ": "ae",
     "Þ": "Th",
     "þ": "th",
     "ß": "ss",
     "Ā": "A",
     "Ă": "A",
     "Ą": "A",
     "ā": "a",
     "ă": "a",
     "ą": "a",
     "Ć": "C",
     "Ĉ": "C",
     "Ċ": "C",
     "Č": "C",
     "ć": "c",
     "ĉ": "c",
     "ċ": "c",
     "č": "c",
     "Ď": "D",
     "Đ": "D",
     "ď": "d",
     "đ": "d",
     "Ē": "E",
     "Ĕ": "E",
     "Ė": "E",
     "Ę": "E",
     "Ě": "E",
     "ē": "e",
     "ĕ": "e",
     "ė": "e",
     "ę": "e",
     "ě": "e",
     "Ĝ": "G",
     "Ğ": "G",
     "Ġ": "G",
     "Ģ": "G",
     "ĝ": "g",
     "ğ": "g",
     "ġ": "g",
     "ģ": "g",
     "Ĥ": "H",
     "Ħ": "H",
     "ĥ": "h",
     "ħ": "h",
     "Ĩ": "I",
     "Ī": "I",
     "Ĭ": "I",
     "Į": "I",
     "İ": "I",
     "ĩ": "i",
     "ī": "i",
     "ĭ": "i",
     "į": "i",
     "ı": "i",
     "Ĵ": "J",
     "ĵ": "j",
     "Ķ": "K",
     "ķ": "k",
     "ĸ": "k",
     "Ĺ": "L",
     "Ļ": "L",
     "Ľ": "L",
     "Ŀ": "L",
     "Ł": "L",
     "ĺ": "l",
     "ļ": "l",
     "ľ": "l",
     "ŀ": "l",
     "ł": "l",
     "Ń": "N",
     "Ņ": "N",
     "Ň": "N",
     "Ŋ": "N",
     "ń": "n",
     "ņ": "n",
     "ň": "n",
     "ŋ": "n",
     "Ō": "O",
     "Ŏ": "O",
     "Ő": "O",
     "ō": "o",
     "ŏ": "o",
     "ő": "o",
     "Ŕ": "R",
     "Ŗ": "R",
     "Ř": "R",
     "ŕ": "r",
     "ŗ": "r",
     "ř": "r",
     "Ś": "S",
     "Ŝ": "S",
     "Ş": "S",
     "Š": "S",
     "ś": "s",
     "ŝ": "s",
     "ş": "s",
     "š": "s",
     "Ţ": "T",
     "Ť": "T",
     "Ŧ": "T",
     "ţ": "t",
     "ť": "t",
     "ŧ": "t",
     "Ũ": "U",
     "Ū": "U",
     "Ŭ": "U",
     "Ů": "U",
     "Ű": "U",
     "Ų": "U",
     "ũ": "u",
     "ū": "u",
     "ŭ": "u",
     "ů": "u",
     "ű": "u",
     "ų": "u",
     "Ŵ": "W",
     "ŵ": "w",
     "Ŷ": "Y",
     "ŷ": "y",
     "Ÿ": "Y",
     "Ź": "Z",
     "Ż": "Z",
     "Ž": "Z",
     "ź": "z",
     "ż": "z",
     "ž": "z",
     "Ĳ": "IJ",
     "ĳ": "ij",
     "Œ": "Oe",
     "œ": "oe",
     "ŉ": "'n",
     "ſ": "s"
    };
    var Zt = {
     "&": "&amp;",
     "<": "&lt;",
     ">": "&gt;",
     '"': "&quot;",
     "'": "&#39;"
    };
    var Xt = {
     "&amp;": "&",
     "&lt;": "<",
     "&gt;": ">",
     "&quot;": '"',
     "&#39;": "'"
    };
    var en = {
     "\\": "\\",
     "'": "'",
     "\n": "n",
     "\r": "r",
     "\u2028": "u2028",
     "\u2029": "u2029"
    };
    var tn = parseFloat, nn = parseInt;
    var rn = typeof global == "object" && global && global.Object === Object && global;
    var on = typeof self == "object" && self && self.Object === Object && self;
    var sn = rn || on || Function("return this")();
    var an = typeof t == "object" && t && !t.nodeType && t;
    var un = an && typeof e == "object" && e && !e.nodeType && e;
    var cn = un && un.exports === an;
    var fn = cn && rn.process;
    var ln = function() {
     try {
      return fn && fn.binding && fn.binding("util");
     } catch (e) {}
    }();
    var hn = ln && ln.isArrayBuffer, dn = ln && ln.isDate, pn = ln && ln.isMap, vn = ln && ln.isRegExp, yn = ln && ln.isSet, gn = ln && ln.isTypedArray;
    function mn(e, t, n) {
     switch (n.length) {
     case 0:
      return e.call(t);

     case 1:
      return e.call(t, n[0]);

     case 2:
      return e.call(t, n[0], n[1]);

     case 3:
      return e.call(t, n[0], n[1], n[2]);
     }
     return e.apply(t, n);
    }
    function bn(e, t, n, r) {
     var i = -1, o = e == null ? 0 : e.length;
     while (++i < o) {
      var s = e[i];
      t(r, s, n(s), e);
     }
     return r;
    }
    function wn(e, t) {
     var n = -1, r = e == null ? 0 : e.length;
     while (++n < r) {
      if (t(e[n], n, e) === false) {
       break;
      }
     }
     return e;
    }
    function _n(e, t) {
     var n = e == null ? 0 : e.length;
     while (n--) {
      if (t(e[n], n, e) === false) {
       break;
      }
     }
     return e;
    }
    function xn(e, t) {
     var n = -1, r = e == null ? 0 : e.length;
     while (++n < r) {
      if (!t(e[n], n, e)) {
       return false;
      }
     }
     return true;
    }
    function On(e, t) {
     var n = -1, r = e == null ? 0 : e.length, i = 0, o = [];
     while (++n < r) {
      var s = e[n];
      if (t(s, n, e)) {
       o[i++] = s;
      }
     }
     return o;
    }
    function Sn(e, t) {
     var n = e == null ? 0 : e.length;
     return !!n && qn(e, t, 0) > -1;
    }
    function kn(e, t, n) {
     var r = -1, i = e == null ? 0 : e.length;
     while (++r < i) {
      if (n(t, e[r])) {
       return true;
      }
     }
     return false;
    }
    function Cn(e, t) {
     var n = -1, r = e == null ? 0 : e.length, i = Array(r);
     while (++n < r) {
      i[n] = t(e[n], n, e);
     }
     return i;
    }
    function Dn(e, t) {
     var n = -1, r = t.length, i = e.length;
     while (++n < r) {
      e[i + n] = t[n];
     }
     return e;
    }
    function jn(e, t, n, r) {
     var i = -1, o = e == null ? 0 : e.length;
     if (r && o) {
      n = e[++i];
     }
     while (++i < o) {
      n = t(n, e[i], i, e);
     }
     return n;
    }
    function En(e, t, n, r) {
     var i = e == null ? 0 : e.length;
     if (r && i) {
      n = e[--i];
     }
     while (i--) {
      n = t(n, e[i], i, e);
     }
     return n;
    }
    function Pn(e, t) {
     var n = -1, r = e == null ? 0 : e.length;
     while (++n < r) {
      if (t(e[n], n, e)) {
       return true;
      }
     }
     return false;
    }
    var Rn = zn("length");
    function Tn(e) {
     return e.split("");
    }
    function An(e) {
     return e.match($e) || [];
    }
    function In(e, t, n) {
     var r;
     n(e, function(e, n, i) {
      if (t(e, n, i)) {
       r = n;
       return false;
      }
     });
     return r;
    }
    function Mn(e, t, n, r) {
     var i = e.length, o = n + (r ? 1 : -1);
     while (r ? o-- : ++o < i) {
      if (t(e[o], o, e)) {
       return o;
      }
     }
     return -1;
    }
    function qn(e, t, n) {
     return t === t ? hr(e, t, n) : Mn(e, Ln, n);
    }
    function Nn(e, t, n, r) {
     var i = n - 1, o = e.length;
     while (++i < o) {
      if (r(e[i], t)) {
       return i;
      }
     }
     return -1;
    }
    function Ln(e) {
     return e !== e;
    }
    function Fn(e, t) {
     var n = e == null ? 0 : e.length;
     return n ? Kn(e, t) / n : N;
    }
    function zn(e) {
     return function(t) {
      return t == null ? i : t[e];
     };
    }
    function Wn(e) {
     return function(t) {
      return e == null ? i : e[t];
     };
    }
    function $n(e, t, n, r, i) {
     i(e, function(e, i, o) {
      n = r ? (r = false, e) : t(n, e, i, o);
     });
     return n;
    }
    function Bn(e, t) {
     var n = e.length;
     e.sort(t);
     while (n--) {
      e[n] = e[n].value;
     }
     return e;
    }
    function Kn(e, t) {
     var n, r = -1, o = e.length;
     while (++r < o) {
      var s = t(e[r]);
      if (s !== i) {
       n = n === i ? s : n + s;
      }
     }
     return n;
    }
    function Un(e, t) {
     var n = -1, r = Array(e);
     while (++n < e) {
      r[n] = t(n);
     }
     return r;
    }
    function Hn(e, t) {
     return Cn(t, function(t) {
      return [ t, e[t] ];
     });
    }
    function Vn(e) {
     return function(t) {
      return e(t);
     };
    }
    function Jn(e, t) {
     return Cn(t, function(t) {
      return e[t];
     });
    }
    function Gn(e, t) {
     return e.has(t);
    }
    function Qn(e, t) {
     var n = -1, r = e.length;
     while (++n < r && qn(t, e[n], 0) > -1) {}
     return n;
    }
    function Yn(e, t) {
     var n = e.length;
     while (n-- && qn(t, e[n], 0) > -1) {}
     return n;
    }
    function Zn(e, t) {
     var n = e.length, r = 0;
     while (n--) {
      if (e[n] === t) {
       ++r;
      }
     }
     return r;
    }
    var Xn = Wn(Yt);
    var er = Wn(Zt);
    function tr(e) {
     return "\\" + en[e];
    }
    function nr(e, t) {
     return e == null ? i : e[t];
    }
    function rr(e) {
     return Ut.test(e);
    }
    function ir(e) {
     return Ht.test(e);
    }
    function or(e) {
     var t, n = [];
     while (!(t = e.next()).done) {
      n.push(t.value);
     }
     return n;
    }
    function sr(e) {
     var t = -1, n = Array(e.size);
     e.forEach(function(e, r) {
      n[++t] = [ r, e ];
     });
     return n;
    }
    function ar(e, t) {
     return function(n) {
      return e(t(n));
     };
    }
    function ur(e, t) {
     var n = -1, r = e.length, i = 0, o = [];
     while (++n < r) {
      var s = e[n];
      if (s === t || s === l) {
       e[n] = l;
       o[i++] = n;
      }
     }
     return o;
    }
    function cr(e, t) {
     return t == "__proto__" ? i : e[t];
    }
    function fr(e) {
     var t = -1, n = Array(e.size);
     e.forEach(function(e) {
      n[++t] = e;
     });
     return n;
    }
    function lr(e) {
     var t = -1, n = Array(e.size);
     e.forEach(function(e) {
      n[++t] = [ e, e ];
     });
     return n;
    }
    function hr(e, t, n) {
     var r = n - 1, i = e.length;
     while (++r < i) {
      if (e[r] === t) {
       return r;
      }
     }
     return -1;
    }
    function dr(e, t, n) {
     var r = n + 1;
     while (r--) {
      if (e[r] === t) {
       return r;
      }
     }
     return r;
    }
    function pr(e) {
     return rr(e) ? gr(e) : Rn(e);
    }
    function vr(e) {
     return rr(e) ? mr(e) : Tn(e);
    }
    var yr = Wn(Xt);
    function gr(e) {
     var t = Bt.lastIndex = 0;
     while (Bt.test(e)) {
      ++t;
     }
     return t;
    }
    function mr(e) {
     return e.match(Bt) || [];
    }
    function br(e) {
     return e.match(Kt) || [];
    }
    var wr = function e(t) {
     t = t == null ? sn : _r.defaults(sn.Object(), t, _r.pick(sn, Vt));
     var n = t.Array, r = t.Date, $e = t.Error, et = t.Function, tt = t.Math, nt = t.Object, rt = t.RegExp, it = t.String, ot = t.TypeError;
     var st = n.prototype, at = et.prototype, ut = nt.prototype;
     var ct = t["__core-js_shared__"];
     var ft = at.toString;
     var lt = ut.hasOwnProperty;
     var ht = 0;
     var dt = function() {
      var e = /[^.]+$/.exec(ct && ct.keys && ct.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : "";
     }();
     var pt = ut.toString;
     var vt = ft.call(nt);
     var yt = sn._;
     var gt = rt("^" + ft.call(lt).replace(Ie, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
     var mt = cn ? t.Buffer : i, bt = t.Symbol, wt = t.Uint8Array, _t = mt ? mt.allocUnsafe : i, xt = ar(nt.getPrototypeOf, nt), Ot = nt.create, St = ut.propertyIsEnumerable, kt = st.splice, Ct = bt ? bt.isConcatSpreadable : i, Dt = bt ? bt.iterator : i, jt = bt ? bt.toStringTag : i;
     var Et = function() {
      try {
       var e = Hs(nt, "defineProperty");
       e({}, "", {});
       return e;
      } catch (e) {}
     }();
     var Pt = t.clearTimeout !== sn.clearTimeout && t.clearTimeout, Rt = r && r.now !== sn.Date.now && r.now, Tt = t.setTimeout !== sn.setTimeout && t.setTimeout;
     var At = tt.ceil, It = tt.floor, Mt = nt.getOwnPropertySymbols, qt = mt ? mt.isBuffer : i, Nt = t.isFinite, Lt = st.join, Ft = ar(nt.keys, nt), zt = tt.max, Bt = tt.min, Kt = r.now, Ut = t.parseInt, Ht = tt.random, Yt = st.reverse;
     var Zt = Hs(t, "DataView"), Xt = Hs(t, "Map"), en = Hs(t, "Promise"), rn = Hs(t, "Set"), on = Hs(t, "WeakMap"), an = Hs(nt, "create");
     var un = on && new on();
     var fn = {};
     var ln = Pa(Zt), Rn = Pa(Xt), Tn = Pa(en), Wn = Pa(rn), hr = Pa(on);
     var gr = bt ? bt.prototype : i, mr = gr ? gr.valueOf : i, wr = gr ? gr.toString : i;
     function xr(e) {
      if (Sf(e) && !af(e) && !(e instanceof Cr)) {
       if (e instanceof kr) {
        return e;
       }
       if (lt.call(e, "__wrapped__")) {
        return Ta(e);
       }
      }
      return new kr(e);
     }
     var Or = function() {
      function e() {}
      return function(t) {
       if (!Of(t)) {
        return {};
       }
       if (Ot) {
        return Ot(t);
       }
       e.prototype = t;
       var n = new e();
       e.prototype = i;
       return n;
      };
     }();
     function Sr() {}
     function kr(e, t) {
      this.__wrapped__ = e;
      this.__actions__ = [];
      this.__chain__ = !!t;
      this.__index__ = 0;
      this.__values__ = i;
     }
     xr.templateSettings = {
      escape: je,
      evaluate: Ee,
      interpolate: Pe,
      variable: "",
      imports: {
       _: xr
      }
     };
     xr.prototype = Sr.prototype;
     xr.prototype.constructor = xr;
     kr.prototype = Or(Sr.prototype);
     kr.prototype.constructor = kr;
     function Cr(e) {
      this.__wrapped__ = e;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = L;
      this.__views__ = [];
     }
     function Dr() {
      var e = new Cr(this.__wrapped__);
      e.__actions__ = rs(this.__actions__);
      e.__dir__ = this.__dir__;
      e.__filtered__ = this.__filtered__;
      e.__iteratees__ = rs(this.__iteratees__);
      e.__takeCount__ = this.__takeCount__;
      e.__views__ = rs(this.__views__);
      return e;
     }
     function jr() {
      if (this.__filtered__) {
       var e = new Cr(this);
       e.__dir__ = -1;
       e.__filtered__ = true;
      } else {
       e = this.clone();
       e.__dir__ *= -1;
      }
      return e;
     }
     function Er() {
      var e = this.__wrapped__.value(), t = this.__dir__, n = af(e), r = t < 0, i = n ? e.length : 0, o = Ys(0, i, this.__views__), s = o.start, a = o.end, u = a - s, c = r ? a : s - 1, f = this.__iteratees__, l = f.length, h = 0, d = Bt(u, this.__takeCount__);
      if (!n || !r && i == u && d == u) {
       return Lo(e, this.__actions__);
      }
      var p = [];
      e: while (u-- && h < d) {
       c += t;
       var v = -1, y = e[c];
       while (++v < l) {
        var g = f[v], m = g.iteratee, b = g.type, w = m(y);
        if (b == T) {
         y = w;
        } else if (!w) {
         if (b == R) {
          continue e;
         } else {
          break e;
         }
        }
       }
       p[h++] = y;
      }
      return p;
     }
     Cr.prototype = Or(Sr.prototype);
     Cr.prototype.constructor = Cr;
     function Pr(e) {
      var t = -1, n = e == null ? 0 : e.length;
      this.clear();
      while (++t < n) {
       var r = e[t];
       this.set(r[0], r[1]);
      }
     }
     function Rr() {
      this.__data__ = an ? an(null) : {};
      this.size = 0;
     }
     function Tr(e) {
      var t = this.has(e) && delete this.__data__[e];
      this.size -= t ? 1 : 0;
      return t;
     }
     function Ar(e) {
      var t = this.__data__;
      if (an) {
       var n = t[e];
       return n === c ? i : n;
      }
      return lt.call(t, e) ? t[e] : i;
     }
     function Ir(e) {
      var t = this.__data__;
      return an ? t[e] !== i : lt.call(t, e);
     }
     function Mr(e, t) {
      var n = this.__data__;
      this.size += this.has(e) ? 0 : 1;
      n[e] = an && t === i ? c : t;
      return this;
     }
     Pr.prototype.clear = Rr;
     Pr.prototype["delete"] = Tr;
     Pr.prototype.get = Ar;
     Pr.prototype.has = Ir;
     Pr.prototype.set = Mr;
     function qr(e) {
      var t = -1, n = e == null ? 0 : e.length;
      this.clear();
      while (++t < n) {
       var r = e[t];
       this.set(r[0], r[1]);
      }
     }
     function Nr() {
      this.__data__ = [];
      this.size = 0;
     }
     function Lr(e) {
      var t = this.__data__, n = ci(t, e);
      if (n < 0) {
       return false;
      }
      var r = t.length - 1;
      if (n == r) {
       t.pop();
      } else {
       kt.call(t, n, 1);
      }
      --this.size;
      return true;
     }
     function Fr(e) {
      var t = this.__data__, n = ci(t, e);
      return n < 0 ? i : t[n][1];
     }
     function zr(e) {
      return ci(this.__data__, e) > -1;
     }
     function Wr(e, t) {
      var n = this.__data__, r = ci(n, e);
      if (r < 0) {
       ++this.size;
       n.push([ e, t ]);
      } else {
       n[r][1] = t;
      }
      return this;
     }
     qr.prototype.clear = Nr;
     qr.prototype["delete"] = Lr;
     qr.prototype.get = Fr;
     qr.prototype.has = zr;
     qr.prototype.set = Wr;
     function $r(e) {
      var t = -1, n = e == null ? 0 : e.length;
      this.clear();
      while (++t < n) {
       var r = e[t];
       this.set(r[0], r[1]);
      }
     }
     function Br() {
      this.size = 0;
      this.__data__ = {
       hash: new Pr(),
       map: new (Xt || qr)(),
       string: new Pr()
      };
     }
     function Kr(e) {
      var t = Ks(this, e)["delete"](e);
      this.size -= t ? 1 : 0;
      return t;
     }
     function Ur(e) {
      return Ks(this, e).get(e);
     }
     function Hr(e) {
      return Ks(this, e).has(e);
     }
     function Vr(e, t) {
      var n = Ks(this, e), r = n.size;
      n.set(e, t);
      this.size += n.size == r ? 0 : 1;
      return this;
     }
     $r.prototype.clear = Br;
     $r.prototype["delete"] = Kr;
     $r.prototype.get = Ur;
     $r.prototype.has = Hr;
     $r.prototype.set = Vr;
     function Jr(e) {
      var t = -1, n = e == null ? 0 : e.length;
      this.__data__ = new $r();
      while (++t < n) {
       this.add(e[t]);
      }
     }
     function Gr(e) {
      this.__data__.set(e, c);
      return this;
     }
     function Qr(e) {
      return this.__data__.has(e);
     }
     Jr.prototype.add = Jr.prototype.push = Gr;
     Jr.prototype.has = Qr;
     function Yr(e) {
      var t = this.__data__ = new qr(e);
      this.size = t.size;
     }
     function Zr() {
      this.__data__ = new qr();
      this.size = 0;
     }
     function Xr(e) {
      var t = this.__data__, n = t["delete"](e);
      this.size = t.size;
      return n;
     }
     function ei(e) {
      return this.__data__.get(e);
     }
     function ti(e) {
      return this.__data__.has(e);
     }
     function ni(e, t) {
      var n = this.__data__;
      if (n instanceof qr) {
       var r = n.__data__;
       if (!Xt || r.length < s - 1) {
        r.push([ e, t ]);
        this.size = ++n.size;
        return this;
       }
       n = this.__data__ = new $r(r);
      }
      n.set(e, t);
      this.size = n.size;
      return this;
     }
     Yr.prototype.clear = Zr;
     Yr.prototype["delete"] = Xr;
     Yr.prototype.get = ei;
     Yr.prototype.has = ti;
     Yr.prototype.set = ni;
     function ri(e, t) {
      var n = af(e), r = !n && sf(e), i = !n && !r && hf(e), o = !n && !r && !i && Ff(e), s = n || r || i || o, a = s ? Un(e.length, it) : [], u = a.length;
      for (var c in e) {
       if ((t || lt.call(e, c)) && !(s && (c == "length" || i && (c == "offset" || c == "parent") || o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || oa(c, u)))) {
        a.push(c);
       }
      }
      return a;
     }
     function ii(e) {
      var t = e.length;
      return t ? e[go(0, t - 1)] : i;
     }
     function oi(e, t) {
      return Da(rs(e), vi(t, 0, e.length));
     }
     function si(e) {
      return Da(rs(e));
     }
     function ai(e, t, n) {
      if (n !== i && !nf(e[t], n) || n === i && !(t in e)) {
       di(e, t, n);
      }
     }
     function ui(e, t, n) {
      var r = e[t];
      if (!(lt.call(e, t) && nf(r, n)) || n === i && !(t in e)) {
       di(e, t, n);
      }
     }
     function ci(e, t) {
      var n = e.length;
      while (n--) {
       if (nf(e[n][0], t)) {
        return n;
       }
      }
      return -1;
     }
     function fi(e, t, n, r) {
      _i(e, function(e, i, o) {
       t(r, e, n(e), o);
      });
      return r;
     }
     function li(e, t) {
      return e && is(t, _l(t), e);
     }
     function hi(e, t) {
      return e && is(t, xl(t), e);
     }
     function di(e, t, n) {
      if (t == "__proto__" && Et) {
       Et(e, t, {
        configurable: true,
        enumerable: true,
        value: n,
        writable: true
       });
      } else {
       e[t] = n;
      }
     }
     function pi(e, t) {
      var r = -1, o = t.length, s = n(o), a = e == null;
      while (++r < o) {
       s[r] = a ? i : vl(e, t[r]);
      }
      return s;
     }
     function vi(e, t, n) {
      if (e === e) {
       if (n !== i) {
        e = e <= n ? e : n;
       }
       if (t !== i) {
        e = e >= t ? e : t;
       }
      }
      return e;
     }
     function yi(e, t, n, r, o, s) {
      var a, u = t & h, c = t & d, f = t & p;
      if (n) {
       a = o ? n(e, r, o, s) : n(e);
      }
      if (a !== i) {
       return a;
      }
      if (!Of(e)) {
       return e;
      }
      var l = af(e);
      if (l) {
       a = ea(e);
       if (!u) {
        return rs(e, a);
       }
      } else {
       var v = Qs(e), y = v == G || v == Q;
       if (hf(e)) {
        return Vo(e, u);
       }
       if (v == ee || v == $ || y && !o) {
        a = c || y ? {} : ta(e);
        if (!u) {
         return c ? ss(e, hi(a, e)) : os(e, li(a, e));
        }
       } else {
        if (!Qt[v]) {
         return o ? e : {};
        }
        a = na(e, v, u);
       }
      }
      s || (s = new Yr());
      var g = s.get(e);
      if (g) {
       return g;
      }
      s.set(e, a);
      if (qf(e)) {
       e.forEach(function(r) {
        a.add(yi(r, t, n, r, e, s));
       });
       return a;
      }
      if (kf(e)) {
       e.forEach(function(r, i) {
        a.set(i, yi(r, t, n, i, e, s));
       });
       return a;
      }
      var m = f ? c ? Fs : Ls : c ? xl : _l;
      var b = l ? i : m(e);
      wn(b || e, function(r, i) {
       if (b) {
        i = r;
        r = e[i];
       }
       ui(a, i, yi(r, t, n, i, e, s));
      });
      return a;
     }
     function gi(e) {
      var t = _l(e);
      return function(n) {
       return mi(n, e, t);
      };
     }
     function mi(e, t, n) {
      var r = n.length;
      if (e == null) {
       return !r;
      }
      e = nt(e);
      while (r--) {
       var o = n[r], s = t[o], a = e[o];
       if (a === i && !(o in e) || !s(a)) {
        return false;
       }
      }
      return true;
     }
     function bi(e, t, n) {
      if (typeof e != "function") {
       throw new ot(u);
      }
      return Oa(function() {
       e.apply(i, n);
      }, t);
     }
     function wi(e, t, n, r) {
      var i = -1, o = Sn, a = true, u = e.length, c = [], f = t.length;
      if (!u) {
       return c;
      }
      if (n) {
       t = Cn(t, Vn(n));
      }
      if (r) {
       o = kn;
       a = false;
      } else if (t.length >= s) {
       o = Gn;
       a = false;
       t = new Jr(t);
      }
      e: while (++i < u) {
       var l = e[i], h = n == null ? l : n(l);
       l = r || l !== 0 ? l : 0;
       if (a && h === h) {
        var d = f;
        while (d--) {
         if (t[d] === h) {
          continue e;
         }
        }
        c.push(l);
       } else if (!o(t, h, r)) {
        c.push(l);
       }
      }
      return c;
     }
     var _i = cs(Pi);
     var xi = cs(Ri, true);
     function Oi(e, t) {
      var n = true;
      _i(e, function(e, r, i) {
       n = !!t(e, r, i);
       return n;
      });
      return n;
     }
     function Si(e, t, n) {
      var r = -1, o = e.length;
      while (++r < o) {
       var s = e[r], a = t(s);
       if (a != null && (u === i ? a === a && !Lf(a) : n(a, u))) {
        var u = a, c = s;
       }
      }
      return c;
     }
     function ki(e, t, n, r) {
      var o = e.length;
      n = Vf(n);
      if (n < 0) {
       n = -n > o ? 0 : o + n;
      }
      r = r === i || r > o ? o : Vf(r);
      if (r < 0) {
       r += o;
      }
      r = n > r ? 0 : Jf(r);
      while (n < r) {
       e[n++] = t;
      }
      return e;
     }
     function Ci(e, t) {
      var n = [];
      _i(e, function(e, r, i) {
       if (t(e, r, i)) {
        n.push(e);
       }
      });
      return n;
     }
     function Di(e, t, n, r, i) {
      var o = -1, s = e.length;
      n || (n = ia);
      i || (i = []);
      while (++o < s) {
       var a = e[o];
       if (t > 0 && n(a)) {
        if (t > 1) {
         Di(a, t - 1, n, r, i);
        } else {
         Dn(i, a);
        }
       } else if (!r) {
        i[i.length] = a;
       }
      }
      return i;
     }
     var ji = fs();
     var Ei = fs(true);
     function Pi(e, t) {
      return e && ji(e, t, _l);
     }
     function Ri(e, t) {
      return e && Ei(e, t, _l);
     }
     function Ti(e, t) {
      return On(t, function(t) {
       return wf(e[t]);
      });
     }
     function Ai(e, t) {
      t = Bo(t, e);
      var n = 0, r = t.length;
      while (e != null && n < r) {
       e = e[Ea(t[n++])];
      }
      return n && n == r ? e : i;
     }
     function Ii(e, t, n) {
      var r = t(e);
      return af(e) ? r : Dn(r, n(e));
     }
     function Mi(e) {
      if (e == null) {
       return e === i ? ae : X;
      }
      return jt && jt in nt(e) ? Vs(e) : ma(e);
     }
     function qi(e, t) {
      return e > t;
     }
     function Ni(e, t) {
      return e != null && lt.call(e, t);
     }
     function Li(e, t) {
      return e != null && t in nt(e);
     }
     function Fi(e, t, n) {
      return e >= Bt(t, n) && e < zt(t, n);
     }
     function zi(e, t, r) {
      var o = r ? kn : Sn, s = e[0].length, a = e.length, u = a, c = n(a), f = Infinity, l = [];
      while (u--) {
       var h = e[u];
       if (u && t) {
        h = Cn(h, Vn(t));
       }
       f = Bt(h.length, f);
       c[u] = !r && (t || s >= 120 && h.length >= 120) ? new Jr(u && h) : i;
      }
      h = e[0];
      var d = -1, p = c[0];
      e: while (++d < s && l.length < f) {
       var v = h[d], y = t ? t(v) : v;
       v = r || v !== 0 ? v : 0;
       if (!(p ? Gn(p, y) : o(l, y, r))) {
        u = a;
        while (--u) {
         var g = c[u];
         if (!(g ? Gn(g, y) : o(e[u], y, r))) {
          continue e;
         }
        }
        if (p) {
         p.push(y);
        }
        l.push(v);
       }
      }
      return l;
     }
     function Wi(e, t, n, r) {
      Pi(e, function(e, i, o) {
       t(r, n(e), i, o);
      });
      return r;
     }
     function $i(e, t, n) {
      t = Bo(t, e);
      e = wa(e, t);
      var r = e == null ? e : e[Ea(ru(t))];
      return r == null ? i : mn(r, e, n);
     }
     function Bi(e) {
      return Sf(e) && Mi(e) == $;
     }
     function Ki(e) {
      return Sf(e) && Mi(e) == fe;
     }
     function Ui(e) {
      return Sf(e) && Mi(e) == H;
     }
     function Hi(e, t, n, r, i) {
      if (e === t) {
       return true;
      }
      if (e == null || t == null || !Sf(e) && !Sf(t)) {
       return e !== e && t !== t;
      }
      return Vi(e, t, n, r, Hi, i);
     }
     function Vi(e, t, n, r, i, o) {
      var s = af(e), a = af(t), u = s ? B : Qs(e), c = a ? B : Qs(t);
      u = u == $ ? ee : u;
      c = c == $ ? ee : c;
      var f = u == ee, l = c == ee, h = u == c;
      if (h && hf(e)) {
       if (!hf(t)) {
        return false;
       }
       s = true;
       f = false;
      }
      if (h && !f) {
       o || (o = new Yr());
       return s || Ff(e) ? Is(e, t, n, r, i, o) : Ms(e, t, u, n, r, i, o);
      }
      if (!(n & v)) {
       var d = f && lt.call(e, "__wrapped__"), p = l && lt.call(t, "__wrapped__");
       if (d || p) {
        var y = d ? e.value() : e, g = p ? t.value() : t;
        o || (o = new Yr());
        return i(y, g, n, r, o);
       }
      }
      if (!h) {
       return false;
      }
      o || (o = new Yr());
      return qs(e, t, n, r, i, o);
     }
     function Ji(e) {
      return Sf(e) && Qs(e) == Y;
     }
     function Gi(e, t, n, r) {
      var o = n.length, s = o, a = !r;
      if (e == null) {
       return !s;
      }
      e = nt(e);
      while (o--) {
       var u = n[o];
       if (a && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) {
        return false;
       }
      }
      while (++o < s) {
       u = n[o];
       var c = u[0], f = e[c], l = u[1];
       if (a && u[2]) {
        if (f === i && !(c in e)) {
         return false;
        }
       } else {
        var h = new Yr();
        if (r) {
         var d = r(f, l, c, e, t, h);
        }
        if (!(d === i ? Hi(l, f, v | y, r, h) : d)) {
         return false;
        }
       }
      }
      return true;
     }
     function Qi(e) {
      if (!Of(e) || fa(e)) {
       return false;
      }
      var t = wf(e) ? gt : Je;
      return t.test(Pa(e));
     }
     function Yi(e) {
      return Sf(e) && Mi(e) == re;
     }
     function Zi(e) {
      return Sf(e) && Qs(e) == ie;
     }
     function Xi(e) {
      return Sf(e) && xf(e.length) && !!Gt[Mi(e)];
     }
     function eo(e) {
      if (typeof e == "function") {
       return e;
      }
      if (e == null) {
       return Eh;
      }
      if (typeof e == "object") {
       return af(e) ? so(e[0], e[1]) : oo(e);
      }
      return $h(e);
     }
     function to(e) {
      if (!ha(e)) {
       return Ft(e);
      }
      var t = [];
      for (var n in nt(e)) {
       if (lt.call(e, n) && n != "constructor") {
        t.push(n);
       }
      }
      return t;
     }
     function no(e) {
      if (!Of(e)) {
       return ga(e);
      }
      var t = ha(e), n = [];
      for (var r in e) {
       if (!(r == "constructor" && (t || !lt.call(e, r)))) {
        n.push(r);
       }
      }
      return n;
     }
     function ro(e, t) {
      return e < t;
     }
     function io(e, t) {
      var r = -1, i = cf(e) ? n(e.length) : [];
      _i(e, function(e, n, o) {
       i[++r] = t(e, n, o);
      });
      return i;
     }
     function oo(e) {
      var t = Us(e);
      if (t.length == 1 && t[0][2]) {
       return pa(t[0][0], t[0][1]);
      }
      return function(n) {
       return n === e || Gi(n, e, t);
      };
     }
     function so(e, t) {
      if (aa(e) && da(t)) {
       return pa(Ea(e), t);
      }
      return function(n) {
       var r = vl(n, e);
       return r === i && r === t ? gl(n, e) : Hi(t, r, v | y);
      };
     }
     function ao(e, t, n, r, o) {
      if (e === t) {
       return;
      }
      ji(t, function(s, a) {
       if (Of(s)) {
        o || (o = new Yr());
        uo(e, t, a, n, ao, r, o);
       } else {
        var u = r ? r(cr(e, a), s, a + "", e, t, o) : i;
        if (u === i) {
         u = s;
        }
        ai(e, a, u);
       }
      }, xl);
     }
     function uo(e, t, n, r, o, s, a) {
      var u = cr(e, n), c = cr(t, n), f = a.get(c);
      if (f) {
       ai(e, n, f);
       return;
      }
      var l = s ? s(u, c, n + "", e, t, a) : i;
      var h = l === i;
      if (h) {
       var d = af(c), p = !d && hf(c), v = !d && !p && Ff(c);
       l = c;
       if (d || p || v) {
        if (af(u)) {
         l = u;
        } else if (ff(u)) {
         l = rs(u);
        } else if (p) {
         h = false;
         l = Vo(c, true);
        } else if (v) {
         h = false;
         l = Zo(c, true);
        } else {
         l = [];
        }
       } else if (Af(c) || sf(c)) {
        l = u;
        if (sf(u)) {
         l = Qf(u);
        } else if (!Of(u) || r && wf(u)) {
         l = ta(c);
        }
       } else {
        h = false;
       }
      }
      if (h) {
       a.set(c, l);
       o(l, c, r, s, a);
       a["delete"](c);
      }
      ai(e, n, l);
     }
     function co(e, t) {
      var n = e.length;
      if (!n) {
       return;
      }
      t += t < 0 ? n : 0;
      return oa(t, n) ? e[t] : i;
     }
     function fo(e, t, n) {
      var r = -1;
      t = Cn(t.length ? t : [ Eh ], Vn(Bs()));
      var i = io(e, function(e, n, i) {
       var o = Cn(t, function(t) {
        return t(e);
       });
       return {
        criteria: o,
        index: ++r,
        value: e
       };
      });
      return Bn(i, function(e, t) {
       return es(e, t, n);
      });
     }
     function lo(e, t) {
      return ho(e, t, function(t, n) {
       return gl(e, n);
      });
     }
     function ho(e, t, n) {
      var r = -1, i = t.length, o = {};
      while (++r < i) {
       var s = t[r], a = Ai(e, s);
       if (n(a, s)) {
        Oo(o, Bo(s, e), a);
       }
      }
      return o;
     }
     function po(e) {
      return function(t) {
       return Ai(t, e);
      };
     }
     function vo(e, t, n, r) {
      var i = r ? Nn : qn, o = -1, s = t.length, a = e;
      if (e === t) {
       t = rs(t);
      }
      if (n) {
       a = Cn(e, Vn(n));
      }
      while (++o < s) {
       var u = 0, c = t[o], f = n ? n(c) : c;
       while ((u = i(a, f, u, r)) > -1) {
        if (a !== e) {
         kt.call(a, u, 1);
        }
        kt.call(e, u, 1);
       }
      }
      return e;
     }
     function yo(e, t) {
      var n = e ? t.length : 0, r = n - 1;
      while (n--) {
       var i = t[n];
       if (n == r || i !== o) {
        var o = i;
        if (oa(i)) {
         kt.call(e, i, 1);
        } else {
         Mo(e, i);
        }
       }
      }
      return e;
     }
     function go(e, t) {
      return e + It(Ht() * (t - e + 1));
     }
     function mo(e, t, r, i) {
      var o = -1, s = zt(At((t - e) / (r || 1)), 0), a = n(s);
      while (s--) {
       a[i ? s : ++o] = e;
       e += r;
      }
      return a;
     }
     function bo(e, t) {
      var n = "";
      if (!e || t < 1 || t > M) {
       return n;
      }
      do {
       if (t % 2) {
        n += e;
       }
       t = It(t / 2);
       if (t) {
        e += e;
       }
      } while (t);
      return n;
     }
     function wo(e, t) {
      return Sa(ba(e, t, Eh), e + "");
     }
     function _o(e) {
      return ii(zl(e));
     }
     function xo(e, t) {
      var n = zl(e);
      return Da(n, vi(t, 0, n.length));
     }
     function Oo(e, t, n, r) {
      if (!Of(e)) {
       return e;
      }
      t = Bo(t, e);
      var o = -1, s = t.length, a = s - 1, u = e;
      while (u != null && ++o < s) {
       var c = Ea(t[o]), f = n;
       if (o != a) {
        var l = u[c];
        f = r ? r(l, c, u) : i;
        if (f === i) {
         f = Of(l) ? l : oa(t[o + 1]) ? [] : {};
        }
       }
       ui(u, c, f);
       u = u[c];
      }
      return e;
     }
     var So = !un ? Eh : function(e, t) {
      un.set(e, t);
      return e;
     };
     var ko = !Et ? Eh : function(e, t) {
      return Et(e, "toString", {
       configurable: true,
       enumerable: false,
       value: kh(t),
       writable: true
      });
     };
     function Co(e) {
      return Da(zl(e));
     }
     function Do(e, t, r) {
      var i = -1, o = e.length;
      if (t < 0) {
       t = -t > o ? 0 : o + t;
      }
      r = r > o ? o : r;
      if (r < 0) {
       r += o;
      }
      o = t > r ? 0 : r - t >>> 0;
      t >>>= 0;
      var s = n(o);
      while (++i < o) {
       s[i] = e[i + t];
      }
      return s;
     }
     function jo(e, t) {
      var n;
      _i(e, function(e, r, i) {
       n = t(e, r, i);
       return !n;
      });
      return !!n;
     }
     function Eo(e, t, n) {
      var r = 0, i = e == null ? r : e.length;
      if (typeof t == "number" && t === t && i <= z) {
       while (r < i) {
        var o = r + i >>> 1, s = e[o];
        if (s !== null && !Lf(s) && (n ? s <= t : s < t)) {
         r = o + 1;
        } else {
         i = o;
        }
       }
       return i;
      }
      return Po(e, t, Eh, n);
     }
     function Po(e, t, n, r) {
      t = n(t);
      var o = 0, s = e == null ? 0 : e.length, a = t !== t, u = t === null, c = Lf(t), f = t === i;
      while (o < s) {
       var l = It((o + s) / 2), h = n(e[l]), d = h !== i, p = h === null, v = h === h, y = Lf(h);
       if (a) {
        var g = r || v;
       } else if (f) {
        g = v && (r || d);
       } else if (u) {
        g = v && d && (r || !p);
       } else if (c) {
        g = v && d && !p && (r || !y);
       } else if (p || y) {
        g = false;
       } else {
        g = r ? h <= t : h < t;
       }
       if (g) {
        o = l + 1;
       } else {
        s = l;
       }
      }
      return Bt(s, F);
     }
     function Ro(e, t) {
      var n = -1, r = e.length, i = 0, o = [];
      while (++n < r) {
       var s = e[n], a = t ? t(s) : s;
       if (!n || !nf(a, u)) {
        var u = a;
        o[i++] = s === 0 ? 0 : s;
       }
      }
      return o;
     }
     function To(e) {
      if (typeof e == "number") {
       return e;
      }
      if (Lf(e)) {
       return N;
      }
      return +e;
     }
     function Ao(e) {
      if (typeof e == "string") {
       return e;
      }
      if (af(e)) {
       return Cn(e, Ao) + "";
      }
      if (Lf(e)) {
       return wr ? wr.call(e) : "";
      }
      var t = e + "";
      return t == "0" && 1 / e == -I ? "-0" : t;
     }
     function Io(e, t, n) {
      var r = -1, i = Sn, o = e.length, a = true, u = [], c = u;
      if (n) {
       a = false;
       i = kn;
      } else if (o >= s) {
       var f = t ? null : js(e);
       if (f) {
        return fr(f);
       }
       a = false;
       i = Gn;
       c = new Jr();
      } else {
       c = t ? [] : u;
      }
      e: while (++r < o) {
       var l = e[r], h = t ? t(l) : l;
       l = n || l !== 0 ? l : 0;
       if (a && h === h) {
        var d = c.length;
        while (d--) {
         if (c[d] === h) {
          continue e;
         }
        }
        if (t) {
         c.push(h);
        }
        u.push(l);
       } else if (!i(c, h, n)) {
        if (c !== u) {
         c.push(h);
        }
        u.push(l);
       }
      }
      return u;
     }
     function Mo(e, t) {
      t = Bo(t, e);
      e = wa(e, t);
      return e == null || delete e[Ea(ru(t))];
     }
     function qo(e, t, n, r) {
      return Oo(e, t, n(Ai(e, t)), r);
     }
     function No(e, t, n, r) {
      var i = e.length, o = r ? i : -1;
      while ((r ? o-- : ++o < i) && t(e[o], o, e)) {}
      return n ? Do(e, r ? 0 : o, r ? o + 1 : i) : Do(e, r ? o + 1 : 0, r ? i : o);
     }
     function Lo(e, t) {
      var n = e;
      if (n instanceof Cr) {
       n = n.value();
      }
      return jn(t, function(e, t) {
       return t.func.apply(t.thisArg, Dn([ e ], t.args));
      }, n);
     }
     function Fo(e, t, r) {
      var i = e.length;
      if (i < 2) {
       return i ? Io(e[0]) : [];
      }
      var o = -1, s = n(i);
      while (++o < i) {
       var a = e[o], u = -1;
       while (++u < i) {
        if (u != o) {
         s[o] = wi(s[o] || a, e[u], t, r);
        }
       }
      }
      return Io(Di(s, 1), t, r);
     }
     function zo(e, t, n) {
      var r = -1, o = e.length, s = t.length, a = {};
      while (++r < o) {
       var u = r < s ? t[r] : i;
       n(a, e[r], u);
      }
      return a;
     }
     function Wo(e) {
      return ff(e) ? e : [];
     }
     function $o(e) {
      return typeof e == "function" ? e : Eh;
     }
     function Bo(e, t) {
      if (af(e)) {
       return e;
      }
      return aa(e, t) ? [ e ] : ja(Zf(e));
     }
     var Ko = wo;
     function Uo(e, t, n) {
      var r = e.length;
      n = n === i ? r : n;
      return !t && n >= r ? e : Do(e, t, n);
     }
     var Ho = Pt || function(e) {
      return sn.clearTimeout(e);
     };
     function Vo(e, t) {
      if (t) {
       return e.slice();
      }
      var n = e.length, r = _t ? _t(n) : new e.constructor(n);
      e.copy(r);
      return r;
     }
     function Jo(e) {
      var t = new e.constructor(e.byteLength);
      new wt(t).set(new wt(e));
      return t;
     }
     function Go(e, t) {
      var n = t ? Jo(e.buffer) : e.buffer;
      return new e.constructor(n, e.byteOffset, e.byteLength);
     }
     function Qo(e) {
      var t = new e.constructor(e.source, Ue.exec(e));
      t.lastIndex = e.lastIndex;
      return t;
     }
     function Yo(e) {
      return mr ? nt(mr.call(e)) : {};
     }
     function Zo(e, t) {
      var n = t ? Jo(e.buffer) : e.buffer;
      return new e.constructor(n, e.byteOffset, e.length);
     }
     function Xo(e, t) {
      if (e !== t) {
       var n = e !== i, r = e === null, o = e === e, s = Lf(e);
       var a = t !== i, u = t === null, c = t === t, f = Lf(t);
       if (!u && !f && !s && e > t || s && a && c && !u && !f || r && a && c || !n && c || !o) {
        return 1;
       }
       if (!r && !s && !f && e < t || f && n && o && !r && !s || u && n && o || !a && o || !c) {
        return -1;
       }
      }
      return 0;
     }
     function es(e, t, n) {
      var r = -1, i = e.criteria, o = t.criteria, s = i.length, a = n.length;
      while (++r < s) {
       var u = Xo(i[r], o[r]);
       if (u) {
        if (r >= a) {
         return u;
        }
        var c = n[r];
        return u * (c == "desc" ? -1 : 1);
       }
      }
      return e.index - t.index;
     }
     function ts(e, t, r, i) {
      var o = -1, s = e.length, a = r.length, u = -1, c = t.length, f = zt(s - a, 0), l = n(c + f), h = !i;
      while (++u < c) {
       l[u] = t[u];
      }
      while (++o < a) {
       if (h || o < s) {
        l[r[o]] = e[o];
       }
      }
      while (f--) {
       l[u++] = e[o++];
      }
      return l;
     }
     function ns(e, t, r, i) {
      var o = -1, s = e.length, a = -1, u = r.length, c = -1, f = t.length, l = zt(s - u, 0), h = n(l + f), d = !i;
      while (++o < l) {
       h[o] = e[o];
      }
      var p = o;
      while (++c < f) {
       h[p + c] = t[c];
      }
      while (++a < u) {
       if (d || o < s) {
        h[p + r[a]] = e[o++];
       }
      }
      return h;
     }
     function rs(e, t) {
      var r = -1, i = e.length;
      t || (t = n(i));
      while (++r < i) {
       t[r] = e[r];
      }
      return t;
     }
     function is(e, t, n, r) {
      var o = !n;
      n || (n = {});
      var s = -1, a = t.length;
      while (++s < a) {
       var u = t[s];
       var c = r ? r(n[u], e[u], u, n, e) : i;
       if (c === i) {
        c = e[u];
       }
       if (o) {
        di(n, u, c);
       } else {
        ui(n, u, c);
       }
      }
      return n;
     }
     function os(e, t) {
      return is(e, Js(e), t);
     }
     function ss(e, t) {
      return is(e, Gs(e), t);
     }
     function as(e, t) {
      return function(n, r) {
       var i = af(n) ? bn : fi, o = t ? t() : {};
       return i(n, e, Bs(r, 2), o);
      };
     }
     function us(e) {
      return wo(function(t, n) {
       var r = -1, o = n.length, s = o > 1 ? n[o - 1] : i, a = o > 2 ? n[2] : i;
       s = e.length > 3 && typeof s == "function" ? (o--, s) : i;
       if (a && sa(n[0], n[1], a)) {
        s = o < 3 ? i : s;
        o = 1;
       }
       t = nt(t);
       while (++r < o) {
        var u = n[r];
        if (u) {
         e(t, u, r, s);
        }
       }
       return t;
      });
     }
     function cs(e, t) {
      return function(n, r) {
       if (n == null) {
        return n;
       }
       if (!cf(n)) {
        return e(n, r);
       }
       var i = n.length, o = t ? i : -1, s = nt(n);
       while (t ? o-- : ++o < i) {
        if (r(s[o], o, s) === false) {
         break;
        }
       }
       return n;
      };
     }
     function fs(e) {
      return function(t, n, r) {
       var i = -1, o = nt(t), s = r(t), a = s.length;
       while (a--) {
        var u = s[e ? a : ++i];
        if (n(o[u], u, o) === false) {
         break;
        }
       }
       return t;
      };
     }
     function ls(e, t, n) {
      var r = t & g, i = ps(e);
      function o() {
       var t = this && this !== sn && this instanceof o ? i : e;
       return t.apply(r ? n : this, arguments);
      }
      return o;
     }
     function hs(e) {
      return function(t) {
       t = Zf(t);
       var n = rr(t) ? vr(t) : i;
       var r = n ? n[0] : t.charAt(0);
       var o = n ? Uo(n, 1).join("") : t.slice(1);
       return r[e]() + o;
      };
     }
     function ds(e) {
      return function(t) {
       return jn(wh(Vl(t).replace(Wt, "")), e, "");
      };
     }
     function ps(e) {
      return function() {
       var t = arguments;
       switch (t.length) {
       case 0:
        return new e();

       case 1:
        return new e(t[0]);

       case 2:
        return new e(t[0], t[1]);

       case 3:
        return new e(t[0], t[1], t[2]);

       case 4:
        return new e(t[0], t[1], t[2], t[3]);

       case 5:
        return new e(t[0], t[1], t[2], t[3], t[4]);

       case 6:
        return new e(t[0], t[1], t[2], t[3], t[4], t[5]);

       case 7:
        return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
       }
       var n = Or(e.prototype), r = e.apply(n, t);
       return Of(r) ? r : n;
      };
     }
     function vs(e, t, r) {
      var o = ps(e);
      function s() {
       var a = arguments.length, u = n(a), c = a, f = $s(s);
       while (c--) {
        u[c] = arguments[c];
       }
       var l = a < 3 && u[0] !== f && u[a - 1] !== f ? [] : ur(u, f);
       a -= l.length;
       if (a < r) {
        return Cs(e, t, ms, s.placeholder, i, u, l, i, i, r - a);
       }
       var h = this && this !== sn && this instanceof s ? o : e;
       return mn(h, this, u);
      }
      return s;
     }
     function ys(e) {
      return function(t, n, r) {
       var o = nt(t);
       if (!cf(t)) {
        var s = Bs(n, 3);
        t = _l(t);
        n = function(e) {
         return s(o[e], e, o);
        };
       }
       var a = e(t, n, r);
       return a > -1 ? o[s ? t[a] : a] : i;
      };
     }
     function gs(e) {
      return Ns(function(t) {
       var n = t.length, r = n, o = kr.prototype.thru;
       if (e) {
        t.reverse();
       }
       while (r--) {
        var s = t[r];
        if (typeof s != "function") {
         throw new ot(u);
        }
        if (o && !a && Ws(s) == "wrapper") {
         var a = new kr([], true);
        }
       }
       r = a ? r : n;
       while (++r < n) {
        s = t[r];
        var c = Ws(s), f = c == "wrapper" ? zs(s) : i;
        if (f && ca(f[0]) && f[1] == (S | w | x | k) && !f[4].length && f[9] == 1) {
         a = a[Ws(f[0])].apply(a, f[3]);
        } else {
         a = s.length == 1 && ca(s) ? a[c]() : a.thru(s);
        }
       }
       return function() {
        var e = arguments, r = e[0];
        if (a && e.length == 1 && af(r)) {
         return a.plant(r).value();
        }
        var i = 0, o = n ? t[i].apply(this, e) : r;
        while (++i < n) {
         o = t[i].call(this, o);
        }
        return o;
       };
      });
     }
     function ms(e, t, r, o, s, a, u, c, f, l) {
      var h = t & S, d = t & g, p = t & m, v = t & (w | _), y = t & C, b = p ? i : ps(e);
      function x() {
       var i = arguments.length, g = n(i), m = i;
       while (m--) {
        g[m] = arguments[m];
       }
       if (v) {
        var w = $s(x), _ = Zn(g, w);
       }
       if (o) {
        g = ts(g, o, s, v);
       }
       if (a) {
        g = ns(g, a, u, v);
       }
       i -= _;
       if (v && i < l) {
        var O = ur(g, w);
        return Cs(e, t, ms, x.placeholder, r, g, O, c, f, l - i);
       }
       var S = d ? r : this, k = p ? S[e] : e;
       i = g.length;
       if (c) {
        g = _a(g, c);
       } else if (y && i > 1) {
        g.reverse();
       }
       if (h && f < i) {
        g.length = f;
       }
       if (this && this !== sn && this instanceof x) {
        k = b || ps(k);
       }
       return k.apply(S, g);
      }
      return x;
     }
     function bs(e, t) {
      return function(n, r) {
       return Wi(n, e, t(r), {});
      };
     }
     function ws(e, t) {
      return function(n, r) {
       var o;
       if (n === i && r === i) {
        return t;
       }
       if (n !== i) {
        o = n;
       }
       if (r !== i) {
        if (o === i) {
         return r;
        }
        if (typeof n == "string" || typeof r == "string") {
         n = Ao(n);
         r = Ao(r);
        } else {
         n = To(n);
         r = To(r);
        }
        o = e(n, r);
       }
       return o;
      };
     }
     function _s(e) {
      return Ns(function(t) {
       t = Cn(t, Vn(Bs()));
       return wo(function(n) {
        var r = this;
        return e(t, function(e) {
         return mn(e, r, n);
        });
       });
      });
     }
     function xs(e, t) {
      t = t === i ? " " : Ao(t);
      var n = t.length;
      if (n < 2) {
       return n ? bo(t, e) : t;
      }
      var r = bo(t, At(e / pr(t)));
      return rr(t) ? Uo(vr(r), 0, e).join("") : r.slice(0, e);
     }
     function Os(e, t, r, i) {
      var o = t & g, s = ps(e);
      function a() {
       var t = -1, u = arguments.length, c = -1, f = i.length, l = n(f + u), h = this && this !== sn && this instanceof a ? s : e;
       while (++c < f) {
        l[c] = i[c];
       }
       while (u--) {
        l[c++] = arguments[++t];
       }
       return mn(h, o ? r : this, l);
      }
      return a;
     }
     function Ss(e) {
      return function(t, n, r) {
       if (r && typeof r != "number" && sa(t, n, r)) {
        n = r = i;
       }
       t = Hf(t);
       if (n === i) {
        n = t;
        t = 0;
       } else {
        n = Hf(n);
       }
       r = r === i ? t < n ? 1 : -1 : Hf(r);
       return mo(t, n, r, e);
      };
     }
     function ks(e) {
      return function(t, n) {
       if (!(typeof t == "string" && typeof n == "string")) {
        t = Gf(t);
        n = Gf(n);
       }
       return e(t, n);
      };
     }
     function Cs(e, t, n, r, o, s, a, u, c, f) {
      var l = t & w, h = l ? a : i, d = l ? i : a, p = l ? s : i, v = l ? i : s;
      t |= l ? x : O;
      t &= ~(l ? O : x);
      if (!(t & b)) {
       t &= ~(g | m);
      }
      var y = [ e, t, o, p, h, v, d, u, c, f ];
      var _ = n.apply(i, y);
      if (ca(e)) {
       xa(_, y);
      }
      _.placeholder = r;
      return ka(_, e, t);
     }
     function Ds(e) {
      var t = tt[e];
      return function(e, n) {
       e = Gf(e);
       n = n == null ? 0 : Bt(Vf(n), 292);
       if (n) {
        var r = (Zf(e) + "e").split("e"), i = t(r[0] + "e" + (+r[1] + n));
        r = (Zf(i) + "e").split("e");
        return +(r[0] + "e" + (+r[1] - n));
       }
       return t(e);
      };
     }
     var js = !(rn && 1 / fr(new rn([ , -0 ]))[1] == I) ? Nh : function(e) {
      return new rn(e);
     };
     function Es(e) {
      return function(t) {
       var n = Qs(t);
       if (n == Y) {
        return sr(t);
       }
       if (n == ie) {
        return lr(t);
       }
       return Hn(t, e(t));
      };
     }
     function Ps(e, t, n, r, o, s, a, c) {
      var f = t & m;
      if (!f && typeof e != "function") {
       throw new ot(u);
      }
      var l = r ? r.length : 0;
      if (!l) {
       t &= ~(x | O);
       r = o = i;
      }
      a = a === i ? a : zt(Vf(a), 0);
      c = c === i ? c : Vf(c);
      l -= o ? o.length : 0;
      if (t & O) {
       var h = r, d = o;
       r = o = i;
      }
      var p = f ? i : zs(e);
      var v = [ e, t, n, r, o, h, d, s, a, c ];
      if (p) {
       ya(v, p);
      }
      e = v[0];
      t = v[1];
      n = v[2];
      r = v[3];
      o = v[4];
      c = v[9] = v[9] === i ? f ? 0 : e.length : zt(v[9] - l, 0);
      if (!c && t & (w | _)) {
       t &= ~(w | _);
      }
      if (!t || t == g) {
       var y = ls(e, t, n);
      } else if (t == w || t == _) {
       y = vs(e, t, c);
      } else if ((t == x || t == (g | x)) && !o.length) {
       y = Os(e, t, n, r);
      } else {
       y = ms.apply(i, v);
      }
      var b = p ? So : xa;
      return ka(b(y, v), e, t);
     }
     function Rs(e, t, n, r) {
      if (e === i || nf(e, ut[n]) && !lt.call(r, n)) {
       return t;
      }
      return e;
     }
     function Ts(e, t, n, r, o, s) {
      if (Of(e) && Of(t)) {
       s.set(t, e);
       ao(e, t, i, Ts, s);
       s["delete"](t);
      }
      return e;
     }
     function As(e) {
      return Af(e) ? i : e;
     }
     function Is(e, t, n, r, o, s) {
      var a = n & v, u = e.length, c = t.length;
      if (u != c && !(a && c > u)) {
       return false;
      }
      var f = s.get(e);
      if (f && s.get(t)) {
       return f == t;
      }
      var l = -1, h = true, d = n & y ? new Jr() : i;
      s.set(e, t);
      s.set(t, e);
      while (++l < u) {
       var p = e[l], g = t[l];
       if (r) {
        var m = a ? r(g, p, l, t, e, s) : r(p, g, l, e, t, s);
       }
       if (m !== i) {
        if (m) {
         continue;
        }
        h = false;
        break;
       }
       if (d) {
        if (!Pn(t, function(e, t) {
         if (!Gn(d, t) && (p === e || o(p, e, n, r, s))) {
          return d.push(t);
         }
        })) {
         h = false;
         break;
        }
       } else if (!(p === g || o(p, g, n, r, s))) {
        h = false;
        break;
       }
      }
      s["delete"](e);
      s["delete"](t);
      return h;
     }
     function Ms(e, t, n, r, i, o, s) {
      switch (n) {
      case le:
       if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) {
        return false;
       }
       e = e.buffer;
       t = t.buffer;

      case fe:
       if (e.byteLength != t.byteLength || !o(new wt(e), new wt(t))) {
        return false;
       }
       return true;

      case U:
      case H:
      case Z:
       return nf(+e, +t);

      case J:
       return e.name == t.name && e.message == t.message;

      case re:
      case oe:
       return e == t + "";

      case Y:
       var a = sr;

      case ie:
       var u = r & v;
       a || (a = fr);
       if (e.size != t.size && !u) {
        return false;
       }
       var c = s.get(e);
       if (c) {
        return c == t;
       }
       r |= y;
       s.set(e, t);
       var f = Is(a(e), a(t), r, i, o, s);
       s["delete"](e);
       return f;

      case se:
       if (mr) {
        return mr.call(e) == mr.call(t);
       }
      }
      return false;
     }
     function qs(e, t, n, r, o, s) {
      var a = n & v, u = Ls(e), c = u.length, f = Ls(t), l = f.length;
      if (c != l && !a) {
       return false;
      }
      var h = c;
      while (h--) {
       var d = u[h];
       if (!(a ? d in t : lt.call(t, d))) {
        return false;
       }
      }
      var p = s.get(e);
      if (p && s.get(t)) {
       return p == t;
      }
      var y = true;
      s.set(e, t);
      s.set(t, e);
      var g = a;
      while (++h < c) {
       d = u[h];
       var m = e[d], b = t[d];
       if (r) {
        var w = a ? r(b, m, d, t, e, s) : r(m, b, d, e, t, s);
       }
       if (!(w === i ? m === b || o(m, b, n, r, s) : w)) {
        y = false;
        break;
       }
       g || (g = d == "constructor");
      }
      if (y && !g) {
       var _ = e.constructor, x = t.constructor;
       if (_ != x && ("constructor" in e && "constructor" in t) && !(typeof _ == "function" && _ instanceof _ && typeof x == "function" && x instanceof x)) {
        y = false;
       }
      }
      s["delete"](e);
      s["delete"](t);
      return y;
     }
     function Ns(e) {
      return Sa(ba(e, i, Ha), e + "");
     }
     function Ls(e) {
      return Ii(e, _l, Js);
     }
     function Fs(e) {
      return Ii(e, xl, Gs);
     }
     var zs = !un ? Nh : function(e) {
      return un.get(e);
     };
     function Ws(e) {
      var t = e.name + "", n = fn[t], r = lt.call(fn, t) ? n.length : 0;
      while (r--) {
       var i = n[r], o = i.func;
       if (o == null || o == e) {
        return i.name;
       }
      }
      return t;
     }
     function $s(e) {
      var t = lt.call(xr, "placeholder") ? xr : e;
      return t.placeholder;
     }
     function Bs() {
      var e = xr.iteratee || Ph;
      e = e === Ph ? eo : e;
      return arguments.length ? e(arguments[0], arguments[1]) : e;
     }
     function Ks(e, t) {
      var n = e.__data__;
      return ua(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
     }
     function Us(e) {
      var t = _l(e), n = t.length;
      while (n--) {
       var r = t[n], i = e[r];
       t[n] = [ r, i, da(i) ];
      }
      return t;
     }
     function Hs(e, t) {
      var n = nr(e, t);
      return Qi(n) ? n : i;
     }
     function Vs(e) {
      var t = lt.call(e, jt), n = e[jt];
      try {
       e[jt] = i;
       var r = true;
      } catch (e) {}
      var o = pt.call(e);
      if (r) {
       if (t) {
        e[jt] = n;
       } else {
        delete e[jt];
       }
      }
      return o;
     }
     var Js = !Mt ? Hh : function(e) {
      if (e == null) {
       return [];
      }
      e = nt(e);
      return On(Mt(e), function(t) {
       return St.call(e, t);
      });
     };
     var Gs = !Mt ? Hh : function(e) {
      var t = [];
      while (e) {
       Dn(t, Js(e));
       e = xt(e);
      }
      return t;
     };
     var Qs = Mi;
     if (Zt && Qs(new Zt(new ArrayBuffer(1))) != le || Xt && Qs(new Xt()) != Y || en && Qs(en.resolve()) != te || rn && Qs(new rn()) != ie || on && Qs(new on()) != ue) {
      Qs = function(e) {
       var t = Mi(e), n = t == ee ? e.constructor : i, r = n ? Pa(n) : "";
       if (r) {
        switch (r) {
        case ln:
         return le;

        case Rn:
         return Y;

        case Tn:
         return te;

        case Wn:
         return ie;

        case hr:
         return ue;
        }
       }
       return t;
      };
     }
     function Ys(e, t, n) {
      var r = -1, i = n.length;
      while (++r < i) {
       var o = n[r], s = o.size;
       switch (o.type) {
       case "drop":
        e += s;
        break;

       case "dropRight":
        t -= s;
        break;

       case "take":
        t = Bt(t, e + s);
        break;

       case "takeRight":
        e = zt(e, t - s);
        break;
       }
      }
      return {
       start: e,
       end: t
      };
     }
     function Zs(e) {
      var t = e.match(ze);
      return t ? t[1].split(We) : [];
     }
     function Xs(e, t, n) {
      t = Bo(t, e);
      var r = -1, i = t.length, o = false;
      while (++r < i) {
       var s = Ea(t[r]);
       if (!(o = e != null && n(e, s))) {
        break;
       }
       e = e[s];
      }
      if (o || ++r != i) {
       return o;
      }
      i = e == null ? 0 : e.length;
      return !!i && xf(i) && oa(s, i) && (af(e) || sf(e));
     }
     function ea(e) {
      var t = e.length, n = new e.constructor(t);
      if (t && typeof e[0] == "string" && lt.call(e, "index")) {
       n.index = e.index;
       n.input = e.input;
      }
      return n;
     }
     function ta(e) {
      return typeof e.constructor == "function" && !ha(e) ? Or(xt(e)) : {};
     }
     function na(e, t, n) {
      var r = e.constructor;
      switch (t) {
      case fe:
       return Jo(e);

      case U:
      case H:
       return new r(+e);

      case le:
       return Go(e, n);

      case he:
      case de:
      case pe:
      case ve:
      case ye:
      case ge:
      case me:
      case be:
      case we:
       return Zo(e, n);

      case Y:
       return new r();

      case Z:
      case oe:
       return new r(e);

      case re:
       return Qo(e);

      case ie:
       return new r();

      case se:
       return Yo(e);
      }
     }
     function ra(e, t) {
      var n = t.length;
      if (!n) {
       return e;
      }
      var r = n - 1;
      t[r] = (n > 1 ? "& " : "") + t[r];
      t = t.join(n > 2 ? ", " : " ");
      return e.replace(Fe, "{\n/* [wrapped with " + t + "] */\n");
     }
     function ia(e) {
      return af(e) || sf(e) || !!(Ct && e && e[Ct]);
     }
     function oa(e, t) {
      var n = typeof e;
      t = t == null ? M : t;
      return !!t && (n == "number" || n != "symbol" && Qe.test(e)) && (e > -1 && e % 1 == 0 && e < t);
     }
     function sa(e, t, n) {
      if (!Of(n)) {
       return false;
      }
      var r = typeof t;
      if (r == "number" ? cf(n) && oa(t, n.length) : r == "string" && t in n) {
       return nf(n[t], e);
      }
      return false;
     }
     function aa(e, t) {
      if (af(e)) {
       return false;
      }
      var n = typeof e;
      if (n == "number" || n == "symbol" || n == "boolean" || e == null || Lf(e)) {
       return true;
      }
      return Te.test(e) || !Re.test(e) || t != null && e in nt(t);
     }
     function ua(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
     }
     function ca(e) {
      var t = Ws(e), n = xr[t];
      if (typeof n != "function" || !(t in Cr.prototype)) {
       return false;
      }
      if (e === n) {
       return true;
      }
      var r = zs(n);
      return !!r && e === r[0];
     }
     function fa(e) {
      return !!dt && dt in e;
     }
     var la = ct ? wf : Vh;
     function ha(e) {
      var t = e && e.constructor, n = typeof t == "function" && t.prototype || ut;
      return e === n;
     }
     function da(e) {
      return e === e && !Of(e);
     }
     function pa(e, t) {
      return function(n) {
       if (n == null) {
        return false;
       }
       return n[e] === t && (t !== i || e in nt(n));
      };
     }
     function va(e) {
      var t = Lc(e, function(e) {
       if (n.size === f) {
        n.clear();
       }
       return e;
      });
      var n = t.cache;
      return t;
     }
     function ya(e, t) {
      var n = e[1], r = t[1], i = n | r, o = i < (g | m | S);
      var s = r == S && n == w || r == S && n == k && e[7].length <= t[8] || r == (S | k) && t[7].length <= t[8] && n == w;
      if (!(o || s)) {
       return e;
      }
      if (r & g) {
       e[2] = t[2];
       i |= n & g ? 0 : b;
      }
      var a = t[3];
      if (a) {
       var u = e[3];
       e[3] = u ? ts(u, a, t[4]) : a;
       e[4] = u ? ur(e[3], l) : t[4];
      }
      a = t[5];
      if (a) {
       u = e[5];
       e[5] = u ? ns(u, a, t[6]) : a;
       e[6] = u ? ur(e[5], l) : t[6];
      }
      a = t[7];
      if (a) {
       e[7] = a;
      }
      if (r & S) {
       e[8] = e[8] == null ? t[8] : Bt(e[8], t[8]);
      }
      if (e[9] == null) {
       e[9] = t[9];
      }
      e[0] = t[0];
      e[1] = i;
      return e;
     }
     function ga(e) {
      var t = [];
      if (e != null) {
       for (var n in nt(e)) {
        t.push(n);
       }
      }
      return t;
     }
     function ma(e) {
      return pt.call(e);
     }
     function ba(e, t, r) {
      t = zt(t === i ? e.length - 1 : t, 0);
      return function() {
       var i = arguments, o = -1, s = zt(i.length - t, 0), a = n(s);
       while (++o < s) {
        a[o] = i[t + o];
       }
       o = -1;
       var u = n(t + 1);
       while (++o < t) {
        u[o] = i[o];
       }
       u[t] = r(a);
       return mn(e, this, u);
      };
     }
     function wa(e, t) {
      return t.length < 2 ? e : Ai(e, Do(t, 0, -1));
     }
     function _a(e, t) {
      var n = e.length, r = Bt(t.length, n), o = rs(e);
      while (r--) {
       var s = t[r];
       e[r] = oa(s, n) ? o[s] : i;
      }
      return e;
     }
     var xa = Ca(So);
     var Oa = Tt || function(e, t) {
      return sn.setTimeout(e, t);
     };
     var Sa = Ca(ko);
     function ka(e, t, n) {
      var r = t + "";
      return Sa(e, ra(r, Ra(Zs(r), n)));
     }
     function Ca(e) {
      var t = 0, n = 0;
      return function() {
       var r = Kt(), o = P - (r - n);
       n = r;
       if (o > 0) {
        if (++t >= E) {
         return arguments[0];
        }
       } else {
        t = 0;
       }
       return e.apply(i, arguments);
      };
     }
     function Da(e, t) {
      var n = -1, r = e.length, o = r - 1;
      t = t === i ? r : t;
      while (++n < t) {
       var s = go(n, o), a = e[s];
       e[s] = e[n];
       e[n] = a;
      }
      e.length = t;
      return e;
     }
     var ja = va(function(e) {
      var t = [];
      if (e.charCodeAt(0) === 46) {
       t.push("");
      }
      e.replace(Ae, function(e, n, r, i) {
       t.push(r ? i.replace(Be, "$1") : n || e);
      });
      return t;
     });
     function Ea(e) {
      if (typeof e == "string" || Lf(e)) {
       return e;
      }
      var t = e + "";
      return t == "0" && 1 / e == -I ? "-0" : t;
     }
     function Pa(e) {
      if (e != null) {
       try {
        return ft.call(e);
       } catch (e) {}
       try {
        return e + "";
       } catch (e) {}
      }
      return "";
     }
     function Ra(e, t) {
      wn(W, function(n) {
       var r = "_." + n[0];
       if (t & n[1] && !Sn(e, r)) {
        e.push(r);
       }
      });
      return e.sort();
     }
     function Ta(e) {
      if (e instanceof Cr) {
       return e.clone();
      }
      var t = new kr(e.__wrapped__, e.__chain__);
      t.__actions__ = rs(e.__actions__);
      t.__index__ = e.__index__;
      t.__values__ = e.__values__;
      return t;
     }
     function Aa(e, t, r) {
      if (r ? sa(e, t, r) : t === i) {
       t = 1;
      } else {
       t = zt(Vf(t), 0);
      }
      var o = e == null ? 0 : e.length;
      if (!o || t < 1) {
       return [];
      }
      var s = 0, a = 0, u = n(At(o / t));
      while (s < o) {
       u[a++] = Do(e, s, s += t);
      }
      return u;
     }
     function Ia(e) {
      var t = -1, n = e == null ? 0 : e.length, r = 0, i = [];
      while (++t < n) {
       var o = e[t];
       if (o) {
        i[r++] = o;
       }
      }
      return i;
     }
     function Ma() {
      var e = arguments.length;
      if (!e) {
       return [];
      }
      var t = n(e - 1), r = arguments[0], i = e;
      while (i--) {
       t[i - 1] = arguments[i];
      }
      return Dn(af(r) ? rs(r) : [ r ], Di(t, 1));
     }
     var qa = wo(function(e, t) {
      return ff(e) ? wi(e, Di(t, 1, ff, true)) : [];
     });
     var Na = wo(function(e, t) {
      var n = ru(t);
      if (ff(n)) {
       n = i;
      }
      return ff(e) ? wi(e, Di(t, 1, ff, true), Bs(n, 2)) : [];
     });
     var La = wo(function(e, t) {
      var n = ru(t);
      if (ff(n)) {
       n = i;
      }
      return ff(e) ? wi(e, Di(t, 1, ff, true), i, n) : [];
     });
     function Fa(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return [];
      }
      t = n || t === i ? 1 : Vf(t);
      return Do(e, t < 0 ? 0 : t, r);
     }
     function za(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return [];
      }
      t = n || t === i ? 1 : Vf(t);
      t = r - t;
      return Do(e, 0, t < 0 ? 0 : t);
     }
     function Wa(e, t) {
      return e && e.length ? No(e, Bs(t, 3), true, true) : [];
     }
     function $a(e, t) {
      return e && e.length ? No(e, Bs(t, 3), true) : [];
     }
     function Ba(e, t, n, r) {
      var i = e == null ? 0 : e.length;
      if (!i) {
       return [];
      }
      if (n && typeof n != "number" && sa(e, t, n)) {
       n = 0;
       r = i;
      }
      return ki(e, t, n, r);
     }
     function Ka(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return -1;
      }
      var i = n == null ? 0 : Vf(n);
      if (i < 0) {
       i = zt(r + i, 0);
      }
      return Mn(e, Bs(t, 3), i);
     }
     function Ua(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return -1;
      }
      var o = r - 1;
      if (n !== i) {
       o = Vf(n);
       o = n < 0 ? zt(r + o, 0) : Bt(o, r - 1);
      }
      return Mn(e, Bs(t, 3), o, true);
     }
     function Ha(e) {
      var t = e == null ? 0 : e.length;
      return t ? Di(e, 1) : [];
     }
     function Va(e) {
      var t = e == null ? 0 : e.length;
      return t ? Di(e, I) : [];
     }
     function Ja(e, t) {
      var n = e == null ? 0 : e.length;
      if (!n) {
       return [];
      }
      t = t === i ? 1 : Vf(t);
      return Di(e, t);
     }
     function Ga(e) {
      var t = -1, n = e == null ? 0 : e.length, r = {};
      while (++t < n) {
       var i = e[t];
       r[i[0]] = i[1];
      }
      return r;
     }
     function Qa(e) {
      return e && e.length ? e[0] : i;
     }
     function Ya(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return -1;
      }
      var i = n == null ? 0 : Vf(n);
      if (i < 0) {
       i = zt(r + i, 0);
      }
      return qn(e, t, i);
     }
     function Za(e) {
      var t = e == null ? 0 : e.length;
      return t ? Do(e, 0, -1) : [];
     }
     var Xa = wo(function(e) {
      var t = Cn(e, Wo);
      return t.length && t[0] === e[0] ? zi(t) : [];
     });
     var eu = wo(function(e) {
      var t = ru(e), n = Cn(e, Wo);
      if (t === ru(n)) {
       t = i;
      } else {
       n.pop();
      }
      return n.length && n[0] === e[0] ? zi(n, Bs(t, 2)) : [];
     });
     var tu = wo(function(e) {
      var t = ru(e), n = Cn(e, Wo);
      t = typeof t == "function" ? t : i;
      if (t) {
       n.pop();
      }
      return n.length && n[0] === e[0] ? zi(n, i, t) : [];
     });
     function nu(e, t) {
      return e == null ? "" : Lt.call(e, t);
     }
     function ru(e) {
      var t = e == null ? 0 : e.length;
      return t ? e[t - 1] : i;
     }
     function iu(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return -1;
      }
      var o = r;
      if (n !== i) {
       o = Vf(n);
       o = o < 0 ? zt(r + o, 0) : Bt(o, r - 1);
      }
      return t === t ? dr(e, t, o) : Mn(e, Ln, o, true);
     }
     function ou(e, t) {
      return e && e.length ? co(e, Vf(t)) : i;
     }
     var su = wo(au);
     function au(e, t) {
      return e && e.length && t && t.length ? vo(e, t) : e;
     }
     function uu(e, t, n) {
      return e && e.length && t && t.length ? vo(e, t, Bs(n, 2)) : e;
     }
     function cu(e, t, n) {
      return e && e.length && t && t.length ? vo(e, t, i, n) : e;
     }
     var fu = Ns(function(e, t) {
      var n = e == null ? 0 : e.length, r = pi(e, t);
      yo(e, Cn(t, function(e) {
       return oa(e, n) ? +e : e;
      }).sort(Xo));
      return r;
     });
     function lu(e, t) {
      var n = [];
      if (!(e && e.length)) {
       return n;
      }
      var r = -1, i = [], o = e.length;
      t = Bs(t, 3);
      while (++r < o) {
       var s = e[r];
       if (t(s, r, e)) {
        n.push(s);
        i.push(r);
       }
      }
      yo(e, i);
      return n;
     }
     function hu(e) {
      return e == null ? e : Yt.call(e);
     }
     function du(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return [];
      }
      if (n && typeof n != "number" && sa(e, t, n)) {
       t = 0;
       n = r;
      } else {
       t = t == null ? 0 : Vf(t);
       n = n === i ? r : Vf(n);
      }
      return Do(e, t, n);
     }
     function pu(e, t) {
      return Eo(e, t);
     }
     function vu(e, t, n) {
      return Po(e, t, Bs(n, 2));
     }
     function yu(e, t) {
      var n = e == null ? 0 : e.length;
      if (n) {
       var r = Eo(e, t);
       if (r < n && nf(e[r], t)) {
        return r;
       }
      }
      return -1;
     }
     function gu(e, t) {
      return Eo(e, t, true);
     }
     function mu(e, t, n) {
      return Po(e, t, Bs(n, 2), true);
     }
     function bu(e, t) {
      var n = e == null ? 0 : e.length;
      if (n) {
       var r = Eo(e, t, true) - 1;
       if (nf(e[r], t)) {
        return r;
       }
      }
      return -1;
     }
     function wu(e) {
      return e && e.length ? Ro(e) : [];
     }
     function _u(e, t) {
      return e && e.length ? Ro(e, Bs(t, 2)) : [];
     }
     function xu(e) {
      var t = e == null ? 0 : e.length;
      return t ? Do(e, 1, t) : [];
     }
     function Ou(e, t, n) {
      if (!(e && e.length)) {
       return [];
      }
      t = n || t === i ? 1 : Vf(t);
      return Do(e, 0, t < 0 ? 0 : t);
     }
     function Su(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) {
       return [];
      }
      t = n || t === i ? 1 : Vf(t);
      t = r - t;
      return Do(e, t < 0 ? 0 : t, r);
     }
     function ku(e, t) {
      return e && e.length ? No(e, Bs(t, 3), false, true) : [];
     }
     function Cu(e, t) {
      return e && e.length ? No(e, Bs(t, 3)) : [];
     }
     var Du = wo(function(e) {
      return Io(Di(e, 1, ff, true));
     });
     var ju = wo(function(e) {
      var t = ru(e);
      if (ff(t)) {
       t = i;
      }
      return Io(Di(e, 1, ff, true), Bs(t, 2));
     });
     var Eu = wo(function(e) {
      var t = ru(e);
      t = typeof t == "function" ? t : i;
      return Io(Di(e, 1, ff, true), i, t);
     });
     function Pu(e) {
      return e && e.length ? Io(e) : [];
     }
     function Ru(e, t) {
      return e && e.length ? Io(e, Bs(t, 2)) : [];
     }
     function Tu(e, t) {
      t = typeof t == "function" ? t : i;
      return e && e.length ? Io(e, i, t) : [];
     }
     function Au(e) {
      if (!(e && e.length)) {
       return [];
      }
      var t = 0;
      e = On(e, function(e) {
       if (ff(e)) {
        t = zt(e.length, t);
        return true;
       }
      });
      return Un(t, function(t) {
       return Cn(e, zn(t));
      });
     }
     function Iu(e, t) {
      if (!(e && e.length)) {
       return [];
      }
      var n = Au(e);
      if (t == null) {
       return n;
      }
      return Cn(n, function(e) {
       return mn(t, i, e);
      });
     }
     var Mu = wo(function(e, t) {
      return ff(e) ? wi(e, t) : [];
     });
     var qu = wo(function(e) {
      return Fo(On(e, ff));
     });
     var Nu = wo(function(e) {
      var t = ru(e);
      if (ff(t)) {
       t = i;
      }
      return Fo(On(e, ff), Bs(t, 2));
     });
     var Lu = wo(function(e) {
      var t = ru(e);
      t = typeof t == "function" ? t : i;
      return Fo(On(e, ff), i, t);
     });
     var Fu = wo(Au);
     function zu(e, t) {
      return zo(e || [], t || [], ui);
     }
     function Wu(e, t) {
      return zo(e || [], t || [], Oo);
     }
     var $u = wo(function(e) {
      var t = e.length, n = t > 1 ? e[t - 1] : i;
      n = typeof n == "function" ? (e.pop(), n) : i;
      return Iu(e, n);
     });
     function Bu(e) {
      var t = xr(e);
      t.__chain__ = true;
      return t;
     }
     function Ku(e, t) {
      t(e);
      return e;
     }
     function Uu(e, t) {
      return t(e);
     }
     var Hu = Ns(function(e) {
      var t = e.length, n = t ? e[0] : 0, r = this.__wrapped__, o = function(t) {
       return pi(t, e);
      };
      if (t > 1 || this.__actions__.length || !(r instanceof Cr) || !oa(n)) {
       return this.thru(o);
      }
      r = r.slice(n, +n + (t ? 1 : 0));
      r.__actions__.push({
       func: Uu,
       args: [ o ],
       thisArg: i
      });
      return new kr(r, this.__chain__).thru(function(e) {
       if (t && !e.length) {
        e.push(i);
       }
       return e;
      });
     });
     function Vu() {
      return Bu(this);
     }
     function Ju() {
      return new kr(this.value(), this.__chain__);
     }
     function Gu() {
      if (this.__values__ === i) {
       this.__values__ = Uf(this.value());
      }
      var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
      return {
       done: e,
       value: t
      };
     }
     function Qu() {
      return this;
     }
     function Yu(e) {
      var t, n = this;
      while (n instanceof Sr) {
       var r = Ta(n);
       r.__index__ = 0;
       r.__values__ = i;
       if (t) {
        o.__wrapped__ = r;
       } else {
        t = r;
       }
       var o = r;
       n = n.__wrapped__;
      }
      o.__wrapped__ = e;
      return t;
     }
     function Zu() {
      var e = this.__wrapped__;
      if (e instanceof Cr) {
       var t = e;
       if (this.__actions__.length) {
        t = new Cr(this);
       }
       t = t.reverse();
       t.__actions__.push({
        func: Uu,
        args: [ hu ],
        thisArg: i
       });
       return new kr(t, this.__chain__);
      }
      return this.thru(hu);
     }
     function Xu() {
      return Lo(this.__wrapped__, this.__actions__);
     }
     var ec = as(function(e, t, n) {
      if (lt.call(e, n)) {
       ++e[n];
      } else {
       di(e, n, 1);
      }
     });
     function tc(e, t, n) {
      var r = af(e) ? xn : Oi;
      if (n && sa(e, t, n)) {
       t = i;
      }
      return r(e, Bs(t, 3));
     }
     function nc(e, t) {
      var n = af(e) ? On : Ci;
      return n(e, Bs(t, 3));
     }
     var rc = ys(Ka);
     var ic = ys(Ua);
     function oc(e, t) {
      return Di(pc(e, t), 1);
     }
     function sc(e, t) {
      return Di(pc(e, t), I);
     }
     function ac(e, t, n) {
      n = n === i ? 1 : Vf(n);
      return Di(pc(e, t), n);
     }
     function uc(e, t) {
      var n = af(e) ? wn : _i;
      return n(e, Bs(t, 3));
     }
     function cc(e, t) {
      var n = af(e) ? _n : xi;
      return n(e, Bs(t, 3));
     }
     var fc = as(function(e, t, n) {
      if (lt.call(e, n)) {
       e[n].push(t);
      } else {
       di(e, n, [ t ]);
      }
     });
     function lc(e, t, n, r) {
      e = cf(e) ? e : zl(e);
      n = n && !r ? Vf(n) : 0;
      var i = e.length;
      if (n < 0) {
       n = zt(i + n, 0);
      }
      return Nf(e) ? n <= i && e.indexOf(t, n) > -1 : !!i && qn(e, t, n) > -1;
     }
     var hc = wo(function(e, t, r) {
      var i = -1, o = typeof t == "function", s = cf(e) ? n(e.length) : [];
      _i(e, function(e) {
       s[++i] = o ? mn(t, e, r) : $i(e, t, r);
      });
      return s;
     });
     var dc = as(function(e, t, n) {
      di(e, n, t);
     });
     function pc(e, t) {
      var n = af(e) ? Cn : io;
      return n(e, Bs(t, 3));
     }
     function vc(e, t, n, r) {
      if (e == null) {
       return [];
      }
      if (!af(t)) {
       t = t == null ? [] : [ t ];
      }
      n = r ? i : n;
      if (!af(n)) {
       n = n == null ? [] : [ n ];
      }
      return fo(e, t, n);
     }
     var yc = as(function(e, t, n) {
      e[n ? 0 : 1].push(t);
     }, function() {
      return [ [], [] ];
     });
     function gc(e, t, n) {
      var r = af(e) ? jn : $n, i = arguments.length < 3;
      return r(e, Bs(t, 4), n, i, _i);
     }
     function mc(e, t, n) {
      var r = af(e) ? En : $n, i = arguments.length < 3;
      return r(e, Bs(t, 4), n, i, xi);
     }
     function bc(e, t) {
      var n = af(e) ? On : Ci;
      return n(e, Fc(Bs(t, 3)));
     }
     function wc(e) {
      var t = af(e) ? ii : _o;
      return t(e);
     }
     function _c(e, t, n) {
      if (n ? sa(e, t, n) : t === i) {
       t = 1;
      } else {
       t = Vf(t);
      }
      var r = af(e) ? oi : xo;
      return r(e, t);
     }
     function xc(e) {
      var t = af(e) ? si : Co;
      return t(e);
     }
     function Oc(e) {
      if (e == null) {
       return 0;
      }
      if (cf(e)) {
       return Nf(e) ? pr(e) : e.length;
      }
      var t = Qs(e);
      if (t == Y || t == ie) {
       return e.size;
      }
      return to(e).length;
     }
     function Sc(e, t, n) {
      var r = af(e) ? Pn : jo;
      if (n && sa(e, t, n)) {
       t = i;
      }
      return r(e, Bs(t, 3));
     }
     var kc = wo(function(e, t) {
      if (e == null) {
       return [];
      }
      var n = t.length;
      if (n > 1 && sa(e, t[0], t[1])) {
       t = [];
      } else if (n > 2 && sa(t[0], t[1], t[2])) {
       t = [ t[0] ];
      }
      return fo(e, Di(t, 1), []);
     });
     var Cc = Rt || function() {
      return sn.Date.now();
     };
     function Dc(e, t) {
      if (typeof t != "function") {
       throw new ot(u);
      }
      e = Vf(e);
      return function() {
       if (--e < 1) {
        return t.apply(this, arguments);
       }
      };
     }
     function jc(e, t, n) {
      t = n ? i : t;
      t = e && t == null ? e.length : t;
      return Ps(e, S, i, i, i, i, t);
     }
     function Ec(e, t) {
      var n;
      if (typeof t != "function") {
       throw new ot(u);
      }
      e = Vf(e);
      return function() {
       if (--e > 0) {
        n = t.apply(this, arguments);
       }
       if (e <= 1) {
        t = i;
       }
       return n;
      };
     }
     var Pc = wo(function(e, t, n) {
      var r = g;
      if (n.length) {
       var i = ur(n, $s(Pc));
       r |= x;
      }
      return Ps(e, r, t, n, i);
     });
     var Rc = wo(function(e, t, n) {
      var r = g | m;
      if (n.length) {
       var i = ur(n, $s(Rc));
       r |= x;
      }
      return Ps(t, r, e, n, i);
     });
     function Tc(e, t, n) {
      t = n ? i : t;
      var r = Ps(e, w, i, i, i, i, i, t);
      r.placeholder = Tc.placeholder;
      return r;
     }
     function Ac(e, t, n) {
      t = n ? i : t;
      var r = Ps(e, _, i, i, i, i, i, t);
      r.placeholder = Ac.placeholder;
      return r;
     }
     function Ic(e, t, n) {
      var r, o, s, a, c, f, l = 0, h = false, d = false, p = true;
      if (typeof e != "function") {
       throw new ot(u);
      }
      t = Gf(t) || 0;
      if (Of(n)) {
       h = !!n.leading;
       d = "maxWait" in n;
       s = d ? zt(Gf(n.maxWait) || 0, t) : s;
       p = "trailing" in n ? !!n.trailing : p;
      }
      function v(t) {
       var n = r, s = o;
       r = o = i;
       l = t;
       a = e.apply(s, n);
       return a;
      }
      function y(e) {
       l = e;
       c = Oa(b, t);
       return h ? v(e) : a;
      }
      function g(e) {
       var n = e - f, r = e - l, i = t - n;
       return d ? Bt(i, s - r) : i;
      }
      function m(e) {
       var n = e - f, r = e - l;
       return f === i || n >= t || n < 0 || d && r >= s;
      }
      function b() {
       var e = Cc();
       if (m(e)) {
        return w(e);
       }
       c = Oa(b, g(e));
      }
      function w(e) {
       c = i;
       if (p && r) {
        return v(e);
       }
       r = o = i;
       return a;
      }
      function _() {
       if (c !== i) {
        Ho(c);
       }
       l = 0;
       r = f = o = c = i;
      }
      function x() {
       return c === i ? a : w(Cc());
      }
      function O() {
       var e = Cc(), n = m(e);
       r = arguments;
       o = this;
       f = e;
       if (n) {
        if (c === i) {
         return y(f);
        }
        if (d) {
         c = Oa(b, t);
         return v(f);
        }
       }
       if (c === i) {
        c = Oa(b, t);
       }
       return a;
      }
      O.cancel = _;
      O.flush = x;
      return O;
     }
     var Mc = wo(function(e, t) {
      return bi(e, 1, t);
     });
     var qc = wo(function(e, t, n) {
      return bi(e, Gf(t) || 0, n);
     });
     function Nc(e) {
      return Ps(e, C);
     }
     function Lc(e, t) {
      if (typeof e != "function" || t != null && typeof t != "function") {
       throw new ot(u);
      }
      var n = function() {
       var r = arguments, i = t ? t.apply(this, r) : r[0], o = n.cache;
       if (o.has(i)) {
        return o.get(i);
       }
       var s = e.apply(this, r);
       n.cache = o.set(i, s) || o;
       return s;
      };
      n.cache = new (Lc.Cache || $r)();
      return n;
     }
     Lc.Cache = $r;
     function Fc(e) {
      if (typeof e != "function") {
       throw new ot(u);
      }
      return function() {
       var t = arguments;
       switch (t.length) {
       case 0:
        return !e.call(this);

       case 1:
        return !e.call(this, t[0]);

       case 2:
        return !e.call(this, t[0], t[1]);

       case 3:
        return !e.call(this, t[0], t[1], t[2]);
       }
       return !e.apply(this, t);
      };
     }
     function zc(e) {
      return Ec(2, e);
     }
     var Wc = Ko(function(e, t) {
      t = t.length == 1 && af(t[0]) ? Cn(t[0], Vn(Bs())) : Cn(Di(t, 1), Vn(Bs()));
      var n = t.length;
      return wo(function(r) {
       var i = -1, o = Bt(r.length, n);
       while (++i < o) {
        r[i] = t[i].call(this, r[i]);
       }
       return mn(e, this, r);
      });
     });
     var $c = wo(function(e, t) {
      var n = ur(t, $s($c));
      return Ps(e, x, i, t, n);
     });
     var Bc = wo(function(e, t) {
      var n = ur(t, $s(Bc));
      return Ps(e, O, i, t, n);
     });
     var Kc = Ns(function(e, t) {
      return Ps(e, k, i, i, i, t);
     });
     function Uc(e, t) {
      if (typeof e != "function") {
       throw new ot(u);
      }
      t = t === i ? t : Vf(t);
      return wo(e, t);
     }
     function Hc(e, t) {
      if (typeof e != "function") {
       throw new ot(u);
      }
      t = t == null ? 0 : zt(Vf(t), 0);
      return wo(function(n) {
       var r = n[t], i = Uo(n, 0, t);
       if (r) {
        Dn(i, r);
       }
       return mn(e, this, i);
      });
     }
     function Vc(e, t, n) {
      var r = true, i = true;
      if (typeof e != "function") {
       throw new ot(u);
      }
      if (Of(n)) {
       r = "leading" in n ? !!n.leading : r;
       i = "trailing" in n ? !!n.trailing : i;
      }
      return Ic(e, t, {
       leading: r,
       maxWait: t,
       trailing: i
      });
     }
     function Jc(e) {
      return jc(e, 1);
     }
     function Gc(e, t) {
      return $c($o(t), e);
     }
     function Qc() {
      if (!arguments.length) {
       return [];
      }
      var e = arguments[0];
      return af(e) ? e : [ e ];
     }
     function Yc(e) {
      return yi(e, p);
     }
     function Zc(e, t) {
      t = typeof t == "function" ? t : i;
      return yi(e, p, t);
     }
     function Xc(e) {
      return yi(e, h | p);
     }
     function ef(e, t) {
      t = typeof t == "function" ? t : i;
      return yi(e, h | p, t);
     }
     function tf(e, t) {
      return t == null || mi(e, t, _l(t));
     }
     function nf(e, t) {
      return e === t || e !== e && t !== t;
     }
     var rf = ks(qi);
     var of = ks(function(e, t) {
      return e >= t;
     });
     var sf = Bi(function() {
      return arguments;
     }()) ? Bi : function(e) {
      return Sf(e) && lt.call(e, "callee") && !St.call(e, "callee");
     };
     var af = n.isArray;
     var uf = hn ? Vn(hn) : Ki;
     function cf(e) {
      return e != null && xf(e.length) && !wf(e);
     }
     function ff(e) {
      return Sf(e) && cf(e);
     }
     function lf(e) {
      return e === true || e === false || Sf(e) && Mi(e) == U;
     }
     var hf = qt || Vh;
     var df = dn ? Vn(dn) : Ui;
     function pf(e) {
      return Sf(e) && e.nodeType === 1 && !Af(e);
     }
     function vf(e) {
      if (e == null) {
       return true;
      }
      if (cf(e) && (af(e) || typeof e == "string" || typeof e.splice == "function" || hf(e) || Ff(e) || sf(e))) {
       return !e.length;
      }
      var t = Qs(e);
      if (t == Y || t == ie) {
       return !e.size;
      }
      if (ha(e)) {
       return !to(e).length;
      }
      for (var n in e) {
       if (lt.call(e, n)) {
        return false;
       }
      }
      return true;
     }
     function yf(e, t) {
      return Hi(e, t);
     }
     function gf(e, t, n) {
      n = typeof n == "function" ? n : i;
      var r = n ? n(e, t) : i;
      return r === i ? Hi(e, t, i, n) : !!r;
     }
     function mf(e) {
      if (!Sf(e)) {
       return false;
      }
      var t = Mi(e);
      return t == J || t == V || typeof e.message == "string" && typeof e.name == "string" && !Af(e);
     }
     function bf(e) {
      return typeof e == "number" && Nt(e);
     }
     function wf(e) {
      if (!Of(e)) {
       return false;
      }
      var t = Mi(e);
      return t == G || t == Q || t == K || t == ne;
     }
     function _f(e) {
      return typeof e == "number" && e == Vf(e);
     }
     function xf(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= M;
     }
     function Of(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
     }
     function Sf(e) {
      return e != null && typeof e == "object";
     }
     var kf = pn ? Vn(pn) : Ji;
     function Cf(e, t) {
      return e === t || Gi(e, t, Us(t));
     }
     function Df(e, t, n) {
      n = typeof n == "function" ? n : i;
      return Gi(e, t, Us(t), n);
     }
     function jf(e) {
      return Tf(e) && e != +e;
     }
     function Ef(e) {
      if (la(e)) {
       throw new $e(a);
      }
      return Qi(e);
     }
     function Pf(e) {
      return e === null;
     }
     function Rf(e) {
      return e == null;
     }
     function Tf(e) {
      return typeof e == "number" || Sf(e) && Mi(e) == Z;
     }
     function Af(e) {
      if (!Sf(e) || Mi(e) != ee) {
       return false;
      }
      var t = xt(e);
      if (t === null) {
       return true;
      }
      var n = lt.call(t, "constructor") && t.constructor;
      return typeof n == "function" && n instanceof n && ft.call(n) == vt;
     }
     var If = vn ? Vn(vn) : Yi;
     function Mf(e) {
      return _f(e) && e >= -M && e <= M;
     }
     var qf = yn ? Vn(yn) : Zi;
     function Nf(e) {
      return typeof e == "string" || !af(e) && Sf(e) && Mi(e) == oe;
     }
     function Lf(e) {
      return typeof e == "symbol" || Sf(e) && Mi(e) == se;
     }
     var Ff = gn ? Vn(gn) : Xi;
     function zf(e) {
      return e === i;
     }
     function Wf(e) {
      return Sf(e) && Qs(e) == ue;
     }
     function $f(e) {
      return Sf(e) && Mi(e) == ce;
     }
     var Bf = ks(ro);
     var Kf = ks(function(e, t) {
      return e <= t;
     });
     function Uf(e) {
      if (!e) {
       return [];
      }
      if (cf(e)) {
       return Nf(e) ? vr(e) : rs(e);
      }
      if (Dt && e[Dt]) {
       return or(e[Dt]());
      }
      var t = Qs(e), n = t == Y ? sr : t == ie ? fr : zl;
      return n(e);
     }
     function Hf(e) {
      if (!e) {
       return e === 0 ? e : 0;
      }
      e = Gf(e);
      if (e === I || e === -I) {
       var t = e < 0 ? -1 : 1;
       return t * q;
      }
      return e === e ? e : 0;
     }
     function Vf(e) {
      var t = Hf(e), n = t % 1;
      return t === t ? n ? t - n : t : 0;
     }
     function Jf(e) {
      return e ? vi(Vf(e), 0, L) : 0;
     }
     function Gf(e) {
      if (typeof e == "number") {
       return e;
      }
      if (Lf(e)) {
       return N;
      }
      if (Of(e)) {
       var t = typeof e.valueOf == "function" ? e.valueOf() : e;
       e = Of(t) ? t + "" : t;
      }
      if (typeof e != "string") {
       return e === 0 ? e : +e;
      }
      e = e.replace(qe, "");
      var n = Ve.test(e);
      return n || Ge.test(e) ? nn(e.slice(2), n ? 2 : 8) : He.test(e) ? N : +e;
     }
     function Qf(e) {
      return is(e, xl(e));
     }
     function Yf(e) {
      return e ? vi(Vf(e), -M, M) : e === 0 ? e : 0;
     }
     function Zf(e) {
      return e == null ? "" : Ao(e);
     }
     var Xf = us(function(e, t) {
      if (ha(t) || cf(t)) {
       is(t, _l(t), e);
       return;
      }
      for (var n in t) {
       if (lt.call(t, n)) {
        ui(e, n, t[n]);
       }
      }
     });
     var el = us(function(e, t) {
      is(t, xl(t), e);
     });
     var tl = us(function(e, t, n, r) {
      is(t, xl(t), e, r);
     });
     var nl = us(function(e, t, n, r) {
      is(t, _l(t), e, r);
     });
     var rl = Ns(pi);
     function il(e, t) {
      var n = Or(e);
      return t == null ? n : li(n, t);
     }
     var ol = wo(function(e, t) {
      e = nt(e);
      var n = -1;
      var r = t.length;
      var o = r > 2 ? t[2] : i;
      if (o && sa(t[0], t[1], o)) {
       r = 1;
      }
      while (++n < r) {
       var s = t[n];
       var a = xl(s);
       var u = -1;
       var c = a.length;
       while (++u < c) {
        var f = a[u];
        var l = e[f];
        if (l === i || nf(l, ut[f]) && !lt.call(e, f)) {
         e[f] = s[f];
        }
       }
      }
      return e;
     });
     var sl = wo(function(e) {
      e.push(i, Ts);
      return mn(Cl, i, e);
     });
     function al(e, t) {
      return In(e, Bs(t, 3), Pi);
     }
     function ul(e, t) {
      return In(e, Bs(t, 3), Ri);
     }
     function cl(e, t) {
      return e == null ? e : ji(e, Bs(t, 3), xl);
     }
     function fl(e, t) {
      return e == null ? e : Ei(e, Bs(t, 3), xl);
     }
     function ll(e, t) {
      return e && Pi(e, Bs(t, 3));
     }
     function hl(e, t) {
      return e && Ri(e, Bs(t, 3));
     }
     function dl(e) {
      return e == null ? [] : Ti(e, _l(e));
     }
     function pl(e) {
      return e == null ? [] : Ti(e, xl(e));
     }
     function vl(e, t, n) {
      var r = e == null ? i : Ai(e, t);
      return r === i ? n : r;
     }
     function yl(e, t) {
      return e != null && Xs(e, t, Ni);
     }
     function gl(e, t) {
      return e != null && Xs(e, t, Li);
     }
     var ml = bs(function(e, t, n) {
      if (t != null && typeof t.toString != "function") {
       t = pt.call(t);
      }
      e[t] = n;
     }, kh(Eh));
     var bl = bs(function(e, t, n) {
      if (t != null && typeof t.toString != "function") {
       t = pt.call(t);
      }
      if (lt.call(e, t)) {
       e[t].push(n);
      } else {
       e[t] = [ n ];
      }
     }, Bs);
     var wl = wo($i);
     function _l(e) {
      return cf(e) ? ri(e) : to(e);
     }
     function xl(e) {
      return cf(e) ? ri(e, true) : no(e);
     }
     function Ol(e, t) {
      var n = {};
      t = Bs(t, 3);
      Pi(e, function(e, r, i) {
       di(n, t(e, r, i), e);
      });
      return n;
     }
     function Sl(e, t) {
      var n = {};
      t = Bs(t, 3);
      Pi(e, function(e, r, i) {
       di(n, r, t(e, r, i));
      });
      return n;
     }
     var kl = us(function(e, t, n) {
      ao(e, t, n);
     });
     var Cl = us(function(e, t, n, r) {
      ao(e, t, n, r);
     });
     var Dl = Ns(function(e, t) {
      var n = {};
      if (e == null) {
       return n;
      }
      var r = false;
      t = Cn(t, function(t) {
       t = Bo(t, e);
       r || (r = t.length > 1);
       return t;
      });
      is(e, Fs(e), n);
      if (r) {
       n = yi(n, h | d | p, As);
      }
      var i = t.length;
      while (i--) {
       Mo(n, t[i]);
      }
      return n;
     });
     function jl(e, t) {
      return Pl(e, Fc(Bs(t)));
     }
     var El = Ns(function(e, t) {
      return e == null ? {} : lo(e, t);
     });
     function Pl(e, t) {
      if (e == null) {
       return {};
      }
      var n = Cn(Fs(e), function(e) {
       return [ e ];
      });
      t = Bs(t);
      return ho(e, n, function(e, n) {
       return t(e, n[0]);
      });
     }
     function Rl(e, t, n) {
      t = Bo(t, e);
      var r = -1, o = t.length;
      if (!o) {
       o = 1;
       e = i;
      }
      while (++r < o) {
       var s = e == null ? i : e[Ea(t[r])];
       if (s === i) {
        r = o;
        s = n;
       }
       e = wf(s) ? s.call(e) : s;
      }
      return e;
     }
     function Tl(e, t, n) {
      return e == null ? e : Oo(e, t, n);
     }
     function Al(e, t, n, r) {
      r = typeof r == "function" ? r : i;
      return e == null ? e : Oo(e, t, n, r);
     }
     var Il = Es(_l);
     var Ml = Es(xl);
     function ql(e, t, n) {
      var r = af(e), i = r || hf(e) || Ff(e);
      t = Bs(t, 4);
      if (n == null) {
       var o = e && e.constructor;
       if (i) {
        n = r ? new o() : [];
       } else if (Of(e)) {
        n = wf(o) ? Or(xt(e)) : {};
       } else {
        n = {};
       }
      }
      (i ? wn : Pi)(e, function(e, r, i) {
       return t(n, e, r, i);
      });
      return n;
     }
     function Nl(e, t) {
      return e == null ? true : Mo(e, t);
     }
     function Ll(e, t, n) {
      return e == null ? e : qo(e, t, $o(n));
     }
     function Fl(e, t, n, r) {
      r = typeof r == "function" ? r : i;
      return e == null ? e : qo(e, t, $o(n), r);
     }
     function zl(e) {
      return e == null ? [] : Jn(e, _l(e));
     }
     function Wl(e) {
      return e == null ? [] : Jn(e, xl(e));
     }
     function $l(e, t, n) {
      if (n === i) {
       n = t;
       t = i;
      }
      if (n !== i) {
       n = Gf(n);
       n = n === n ? n : 0;
      }
      if (t !== i) {
       t = Gf(t);
       t = t === t ? t : 0;
      }
      return vi(Gf(e), t, n);
     }
     function Bl(e, t, n) {
      t = Hf(t);
      if (n === i) {
       n = t;
       t = 0;
      } else {
       n = Hf(n);
      }
      e = Gf(e);
      return Fi(e, t, n);
     }
     function Kl(e, t, n) {
      if (n && typeof n != "boolean" && sa(e, t, n)) {
       t = n = i;
      }
      if (n === i) {
       if (typeof t == "boolean") {
        n = t;
        t = i;
       } else if (typeof e == "boolean") {
        n = e;
        e = i;
       }
      }
      if (e === i && t === i) {
       e = 0;
       t = 1;
      } else {
       e = Hf(e);
       if (t === i) {
        t = e;
        e = 0;
       } else {
        t = Hf(t);
       }
      }
      if (e > t) {
       var r = e;
       e = t;
       t = r;
      }
      if (n || e % 1 || t % 1) {
       var o = Ht();
       return Bt(e + o * (t - e + tn("1e-" + ((o + "").length - 1))), t);
      }
      return go(e, t);
     }
     var Ul = ds(function(e, t, n) {
      t = t.toLowerCase();
      return e + (n ? Hl(t) : t);
     });
     function Hl(e) {
      return bh(Zf(e).toLowerCase());
     }
     function Vl(e) {
      e = Zf(e);
      return e && e.replace(Ye, Xn).replace($t, "");
     }
     function Jl(e, t, n) {
      e = Zf(e);
      t = Ao(t);
      var r = e.length;
      n = n === i ? r : vi(Vf(n), 0, r);
      var o = n;
      n -= t.length;
      return n >= 0 && e.slice(n, o) == t;
     }
     function Gl(e) {
      e = Zf(e);
      return e && De.test(e) ? e.replace(ke, er) : e;
     }
     function Ql(e) {
      e = Zf(e);
      return e && Me.test(e) ? e.replace(Ie, "\\$&") : e;
     }
     var Yl = ds(function(e, t, n) {
      return e + (n ? "-" : "") + t.toLowerCase();
     });
     var Zl = ds(function(e, t, n) {
      return e + (n ? " " : "") + t.toLowerCase();
     });
     var Xl = hs("toLowerCase");
     function eh(e, t, n) {
      e = Zf(e);
      t = Vf(t);
      var r = t ? pr(e) : 0;
      if (!t || r >= t) {
       return e;
      }
      var i = (t - r) / 2;
      return xs(It(i), n) + e + xs(At(i), n);
     }
     function th(e, t, n) {
      e = Zf(e);
      t = Vf(t);
      var r = t ? pr(e) : 0;
      return t && r < t ? e + xs(t - r, n) : e;
     }
     function nh(e, t, n) {
      e = Zf(e);
      t = Vf(t);
      var r = t ? pr(e) : 0;
      return t && r < t ? xs(t - r, n) + e : e;
     }
     function rh(e, t, n) {
      if (n || t == null) {
       t = 0;
      } else if (t) {
       t = +t;
      }
      return Ut(Zf(e).replace(Ne, ""), t || 0);
     }
     function ih(e, t, n) {
      if (n ? sa(e, t, n) : t === i) {
       t = 1;
      } else {
       t = Vf(t);
      }
      return bo(Zf(e), t);
     }
     function oh() {
      var e = arguments, t = Zf(e[0]);
      return e.length < 3 ? t : t.replace(e[1], e[2]);
     }
     var sh = ds(function(e, t, n) {
      return e + (n ? "_" : "") + t.toLowerCase();
     });
     function ah(e, t, n) {
      if (n && typeof n != "number" && sa(e, t, n)) {
       t = n = i;
      }
      n = n === i ? L : n >>> 0;
      if (!n) {
       return [];
      }
      e = Zf(e);
      if (e && (typeof t == "string" || t != null && !If(t))) {
       t = Ao(t);
       if (!t && rr(e)) {
        return Uo(vr(e), 0, n);
       }
      }
      return e.split(t, n);
     }
     var uh = ds(function(e, t, n) {
      return e + (n ? " " : "") + bh(t);
     });
     function ch(e, t, n) {
      e = Zf(e);
      n = n == null ? 0 : vi(Vf(n), 0, e.length);
      t = Ao(t);
      return e.slice(n, n + t.length) == t;
     }
     function fh(e, t, n) {
      var r = xr.templateSettings;
      if (n && sa(e, t, n)) {
       t = i;
      }
      e = Zf(e);
      t = tl({}, t, r, Rs);
      var o = tl({}, t.imports, r.imports, Rs), s = _l(o), a = Jn(o, s);
      var u, c, f = 0, l = t.interpolate || Ze, h = "__p += '";
      var d = rt((t.escape || Ze).source + "|" + l.source + "|" + (l === Pe ? Ke : Ze).source + "|" + (t.evaluate || Ze).source + "|$", "g");
      var p = "//# sourceURL=" + ("sourceURL" in t ? t.sourceURL : "lodash.templateSources[" + ++Jt + "]") + "\n";
      e.replace(d, function(t, n, r, i, o, s) {
       r || (r = i);
       h += e.slice(f, s).replace(Xe, tr);
       if (n) {
        u = true;
        h += "' +\n__e(" + n + ") +\n'";
       }
       if (o) {
        c = true;
        h += "';\n" + o + ";\n__p += '";
       }
       if (r) {
        h += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'";
       }
       f = s + t.length;
       return t;
      });
      h += "';\n";
      var v = t.variable;
      if (!v) {
       h = "with (obj) {\n" + h + "\n}\n";
      }
      h = (c ? h.replace(_e, "") : h).replace(xe, "$1").replace(Oe, "$1;");
      h = "function(" + (v || "obj") + ") {\n" + (v ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (u ? ", __e = _.escape" : "") + (c ? ", __j = Array.prototype.join;\n" + "function print() { __p += __j.call(arguments, '') }\n" : ";\n") + h + "return __p\n}";
      var y = _h(function() {
       return et(s, p + "return " + h).apply(i, a);
      });
      y.source = h;
      if (mf(y)) {
       throw y;
      }
      return y;
     }
     function lh(e) {
      return Zf(e).toLowerCase();
     }
     function hh(e) {
      return Zf(e).toUpperCase();
     }
     function dh(e, t, n) {
      e = Zf(e);
      if (e && (n || t === i)) {
       return e.replace(qe, "");
      }
      if (!e || !(t = Ao(t))) {
       return e;
      }
      var r = vr(e), o = vr(t), s = Qn(r, o), a = Yn(r, o) + 1;
      return Uo(r, s, a).join("");
     }
     function ph(e, t, n) {
      e = Zf(e);
      if (e && (n || t === i)) {
       return e.replace(Le, "");
      }
      if (!e || !(t = Ao(t))) {
       return e;
      }
      var r = vr(e), o = Yn(r, vr(t)) + 1;
      return Uo(r, 0, o).join("");
     }
     function vh(e, t, n) {
      e = Zf(e);
      if (e && (n || t === i)) {
       return e.replace(Ne, "");
      }
      if (!e || !(t = Ao(t))) {
       return e;
      }
      var r = vr(e), o = Qn(r, vr(t));
      return Uo(r, o).join("");
     }
     function yh(e, t) {
      var n = D, r = j;
      if (Of(t)) {
       var o = "separator" in t ? t.separator : o;
       n = "length" in t ? Vf(t.length) : n;
       r = "omission" in t ? Ao(t.omission) : r;
      }
      e = Zf(e);
      var s = e.length;
      if (rr(e)) {
       var a = vr(e);
       s = a.length;
      }
      if (n >= s) {
       return e;
      }
      var u = n - pr(r);
      if (u < 1) {
       return r;
      }
      var c = a ? Uo(a, 0, u).join("") : e.slice(0, u);
      if (o === i) {
       return c + r;
      }
      if (a) {
       u += c.length - u;
      }
      if (If(o)) {
       if (e.slice(u).search(o)) {
        var f, l = c;
        if (!o.global) {
         o = rt(o.source, Zf(Ue.exec(o)) + "g");
        }
        o.lastIndex = 0;
        while (f = o.exec(l)) {
         var h = f.index;
        }
        c = c.slice(0, h === i ? u : h);
       }
      } else if (e.indexOf(Ao(o), u) != u) {
       var d = c.lastIndexOf(o);
       if (d > -1) {
        c = c.slice(0, d);
       }
      }
      return c + r;
     }
     function gh(e) {
      e = Zf(e);
      return e && Ce.test(e) ? e.replace(Se, yr) : e;
     }
     var mh = ds(function(e, t, n) {
      return e + (n ? " " : "") + t.toUpperCase();
     });
     var bh = hs("toUpperCase");
     function wh(e, t, n) {
      e = Zf(e);
      t = n ? i : t;
      if (t === i) {
       return ir(e) ? br(e) : An(e);
      }
      return e.match(t) || [];
     }
     var _h = wo(function(e, t) {
      try {
       return mn(e, i, t);
      } catch (e) {
       return mf(e) ? e : new $e(e);
      }
     });
     var xh = Ns(function(e, t) {
      wn(t, function(t) {
       t = Ea(t);
       di(e, t, Pc(e[t], e));
      });
      return e;
     });
     function Oh(e) {
      var t = e == null ? 0 : e.length, n = Bs();
      e = !t ? [] : Cn(e, function(e) {
       if (typeof e[1] != "function") {
        throw new ot(u);
       }
       return [ n(e[0]), e[1] ];
      });
      return wo(function(n) {
       var r = -1;
       while (++r < t) {
        var i = e[r];
        if (mn(i[0], this, n)) {
         return mn(i[1], this, n);
        }
       }
      });
     }
     function Sh(e) {
      return gi(yi(e, h));
     }
     function kh(e) {
      return function() {
       return e;
      };
     }
     function Ch(e, t) {
      return e == null || e !== e ? t : e;
     }
     var Dh = gs();
     var jh = gs(true);
     function Eh(e) {
      return e;
     }
     function Ph(e) {
      return eo(typeof e == "function" ? e : yi(e, h));
     }
     function Rh(e) {
      return oo(yi(e, h));
     }
     function Th(e, t) {
      return so(e, yi(t, h));
     }
     var Ah = wo(function(e, t) {
      return function(n) {
       return $i(n, e, t);
      };
     });
     var Ih = wo(function(e, t) {
      return function(n) {
       return $i(e, n, t);
      };
     });
     function Mh(e, t, n) {
      var r = _l(t), i = Ti(t, r);
      if (n == null && !(Of(t) && (i.length || !r.length))) {
       n = t;
       t = e;
       e = this;
       i = Ti(t, _l(t));
      }
      var o = !(Of(n) && "chain" in n) || !!n.chain, s = wf(e);
      wn(i, function(n) {
       var r = t[n];
       e[n] = r;
       if (s) {
        e.prototype[n] = function() {
         var t = this.__chain__;
         if (o || t) {
          var n = e(this.__wrapped__), i = n.__actions__ = rs(this.__actions__);
          i.push({
           func: r,
           args: arguments,
           thisArg: e
          });
          n.__chain__ = t;
          return n;
         }
         return r.apply(e, Dn([ this.value() ], arguments));
        };
       }
      });
      return e;
     }
     function qh() {
      if (sn._ === this) {
       sn._ = yt;
      }
      return this;
     }
     function Nh() {}
     function Lh(e) {
      e = Vf(e);
      return wo(function(t) {
       return co(t, e);
      });
     }
     var Fh = _s(Cn);
     var zh = _s(xn);
     var Wh = _s(Pn);
     function $h(e) {
      return aa(e) ? zn(Ea(e)) : po(e);
     }
     function Bh(e) {
      return function(t) {
       return e == null ? i : Ai(e, t);
      };
     }
     var Kh = Ss();
     var Uh = Ss(true);
     function Hh() {
      return [];
     }
     function Vh() {
      return false;
     }
     function Jh() {
      return {};
     }
     function Gh() {
      return "";
     }
     function Qh() {
      return true;
     }
     function Yh(e, t) {
      e = Vf(e);
      if (e < 1 || e > M) {
       return [];
      }
      var n = L, r = Bt(e, L);
      t = Bs(t);
      e -= L;
      var i = Un(r, t);
      while (++n < e) {
       t(n);
      }
      return i;
     }
     function Zh(e) {
      if (af(e)) {
       return Cn(e, Ea);
      }
      return Lf(e) ? [ e ] : rs(ja(Zf(e)));
     }
     function Xh(e) {
      var t = ++ht;
      return Zf(e) + t;
     }
     var ed = ws(function(e, t) {
      return e + t;
     }, 0);
     var td = Ds("ceil");
     var nd = ws(function(e, t) {
      return e / t;
     }, 1);
     var rd = Ds("floor");
     function id(e) {
      return e && e.length ? Si(e, Eh, qi) : i;
     }
     function od(e, t) {
      return e && e.length ? Si(e, Bs(t, 2), qi) : i;
     }
     function sd(e) {
      return Fn(e, Eh);
     }
     function ad(e, t) {
      return Fn(e, Bs(t, 2));
     }
     function ud(e) {
      return e && e.length ? Si(e, Eh, ro) : i;
     }
     function cd(e, t) {
      return e && e.length ? Si(e, Bs(t, 2), ro) : i;
     }
     var fd = ws(function(e, t) {
      return e * t;
     }, 1);
     var ld = Ds("round");
     var hd = ws(function(e, t) {
      return e - t;
     }, 0);
     function dd(e) {
      return e && e.length ? Kn(e, Eh) : 0;
     }
     function pd(e, t) {
      return e && e.length ? Kn(e, Bs(t, 2)) : 0;
     }
     xr.after = Dc;
     xr.ary = jc;
     xr.assign = Xf;
     xr.assignIn = el;
     xr.assignInWith = tl;
     xr.assignWith = nl;
     xr.at = rl;
     xr.before = Ec;
     xr.bind = Pc;
     xr.bindAll = xh;
     xr.bindKey = Rc;
     xr.castArray = Qc;
     xr.chain = Bu;
     xr.chunk = Aa;
     xr.compact = Ia;
     xr.concat = Ma;
     xr.cond = Oh;
     xr.conforms = Sh;
     xr.constant = kh;
     xr.countBy = ec;
     xr.create = il;
     xr.curry = Tc;
     xr.curryRight = Ac;
     xr.debounce = Ic;
     xr.defaults = ol;
     xr.defaultsDeep = sl;
     xr.defer = Mc;
     xr.delay = qc;
     xr.difference = qa;
     xr.differenceBy = Na;
     xr.differenceWith = La;
     xr.drop = Fa;
     xr.dropRight = za;
     xr.dropRightWhile = Wa;
     xr.dropWhile = $a;
     xr.fill = Ba;
     xr.filter = nc;
     xr.flatMap = oc;
     xr.flatMapDeep = sc;
     xr.flatMapDepth = ac;
     xr.flatten = Ha;
     xr.flattenDeep = Va;
     xr.flattenDepth = Ja;
     xr.flip = Nc;
     xr.flow = Dh;
     xr.flowRight = jh;
     xr.fromPairs = Ga;
     xr.functions = dl;
     xr.functionsIn = pl;
     xr.groupBy = fc;
     xr.initial = Za;
     xr.intersection = Xa;
     xr.intersectionBy = eu;
     xr.intersectionWith = tu;
     xr.invert = ml;
     xr.invertBy = bl;
     xr.invokeMap = hc;
     xr.iteratee = Ph;
     xr.keyBy = dc;
     xr.keys = _l;
     xr.keysIn = xl;
     xr.map = pc;
     xr.mapKeys = Ol;
     xr.mapValues = Sl;
     xr.matches = Rh;
     xr.matchesProperty = Th;
     xr.memoize = Lc;
     xr.merge = kl;
     xr.mergeWith = Cl;
     xr.method = Ah;
     xr.methodOf = Ih;
     xr.mixin = Mh;
     xr.negate = Fc;
     xr.nthArg = Lh;
     xr.omit = Dl;
     xr.omitBy = jl;
     xr.once = zc;
     xr.orderBy = vc;
     xr.over = Fh;
     xr.overArgs = Wc;
     xr.overEvery = zh;
     xr.overSome = Wh;
     xr.partial = $c;
     xr.partialRight = Bc;
     xr.partition = yc;
     xr.pick = El;
     xr.pickBy = Pl;
     xr.property = $h;
     xr.propertyOf = Bh;
     xr.pull = su;
     xr.pullAll = au;
     xr.pullAllBy = uu;
     xr.pullAllWith = cu;
     xr.pullAt = fu;
     xr.range = Kh;
     xr.rangeRight = Uh;
     xr.rearg = Kc;
     xr.reject = bc;
     xr.remove = lu;
     xr.rest = Uc;
     xr.reverse = hu;
     xr.sampleSize = _c;
     xr.set = Tl;
     xr.setWith = Al;
     xr.shuffle = xc;
     xr.slice = du;
     xr.sortBy = kc;
     xr.sortedUniq = wu;
     xr.sortedUniqBy = _u;
     xr.split = ah;
     xr.spread = Hc;
     xr.tail = xu;
     xr.take = Ou;
     xr.takeRight = Su;
     xr.takeRightWhile = ku;
     xr.takeWhile = Cu;
     xr.tap = Ku;
     xr.throttle = Vc;
     xr.thru = Uu;
     xr.toArray = Uf;
     xr.toPairs = Il;
     xr.toPairsIn = Ml;
     xr.toPath = Zh;
     xr.toPlainObject = Qf;
     xr.transform = ql;
     xr.unary = Jc;
     xr.union = Du;
     xr.unionBy = ju;
     xr.unionWith = Eu;
     xr.uniq = Pu;
     xr.uniqBy = Ru;
     xr.uniqWith = Tu;
     xr.unset = Nl;
     xr.unzip = Au;
     xr.unzipWith = Iu;
     xr.update = Ll;
     xr.updateWith = Fl;
     xr.values = zl;
     xr.valuesIn = Wl;
     xr.without = Mu;
     xr.words = wh;
     xr.wrap = Gc;
     xr.xor = qu;
     xr.xorBy = Nu;
     xr.xorWith = Lu;
     xr.zip = Fu;
     xr.zipObject = zu;
     xr.zipObjectDeep = Wu;
     xr.zipWith = $u;
     xr.entries = Il;
     xr.entriesIn = Ml;
     xr.extend = el;
     xr.extendWith = tl;
     Mh(xr, xr);
     xr.add = ed;
     xr.attempt = _h;
     xr.camelCase = Ul;
     xr.capitalize = Hl;
     xr.ceil = td;
     xr.clamp = $l;
     xr.clone = Yc;
     xr.cloneDeep = Xc;
     xr.cloneDeepWith = ef;
     xr.cloneWith = Zc;
     xr.conformsTo = tf;
     xr.deburr = Vl;
     xr.defaultTo = Ch;
     xr.divide = nd;
     xr.endsWith = Jl;
     xr.eq = nf;
     xr.escape = Gl;
     xr.escapeRegExp = Ql;
     xr.every = tc;
     xr.find = rc;
     xr.findIndex = Ka;
     xr.findKey = al;
     xr.findLast = ic;
     xr.findLastIndex = Ua;
     xr.findLastKey = ul;
     xr.floor = rd;
     xr.forEach = uc;
     xr.forEachRight = cc;
     xr.forIn = cl;
     xr.forInRight = fl;
     xr.forOwn = ll;
     xr.forOwnRight = hl;
     xr.get = vl;
     xr.gt = rf;
     xr.gte = of;
     xr.has = yl;
     xr.hasIn = gl;
     xr.head = Qa;
     xr.identity = Eh;
     xr.includes = lc;
     xr.indexOf = Ya;
     xr.inRange = Bl;
     xr.invoke = wl;
     xr.isArguments = sf;
     xr.isArray = af;
     xr.isArrayBuffer = uf;
     xr.isArrayLike = cf;
     xr.isArrayLikeObject = ff;
     xr.isBoolean = lf;
     xr.isBuffer = hf;
     xr.isDate = df;
     xr.isElement = pf;
     xr.isEmpty = vf;
     xr.isEqual = yf;
     xr.isEqualWith = gf;
     xr.isError = mf;
     xr.isFinite = bf;
     xr.isFunction = wf;
     xr.isInteger = _f;
     xr.isLength = xf;
     xr.isMap = kf;
     xr.isMatch = Cf;
     xr.isMatchWith = Df;
     xr.isNaN = jf;
     xr.isNative = Ef;
     xr.isNil = Rf;
     xr.isNull = Pf;
     xr.isNumber = Tf;
     xr.isObject = Of;
     xr.isObjectLike = Sf;
     xr.isPlainObject = Af;
     xr.isRegExp = If;
     xr.isSafeInteger = Mf;
     xr.isSet = qf;
     xr.isString = Nf;
     xr.isSymbol = Lf;
     xr.isTypedArray = Ff;
     xr.isUndefined = zf;
     xr.isWeakMap = Wf;
     xr.isWeakSet = $f;
     xr.join = nu;
     xr.kebabCase = Yl;
     xr.last = ru;
     xr.lastIndexOf = iu;
     xr.lowerCase = Zl;
     xr.lowerFirst = Xl;
     xr.lt = Bf;
     xr.lte = Kf;
     xr.max = id;
     xr.maxBy = od;
     xr.mean = sd;
     xr.meanBy = ad;
     xr.min = ud;
     xr.minBy = cd;
     xr.stubArray = Hh;
     xr.stubFalse = Vh;
     xr.stubObject = Jh;
     xr.stubString = Gh;
     xr.stubTrue = Qh;
     xr.multiply = fd;
     xr.nth = ou;
     xr.noConflict = qh;
     xr.noop = Nh;
     xr.now = Cc;
     xr.pad = eh;
     xr.padEnd = th;
     xr.padStart = nh;
     xr.parseInt = rh;
     xr.random = Kl;
     xr.reduce = gc;
     xr.reduceRight = mc;
     xr.repeat = ih;
     xr.replace = oh;
     xr.result = Rl;
     xr.round = ld;
     xr.runInContext = e;
     xr.sample = wc;
     xr.size = Oc;
     xr.snakeCase = sh;
     xr.some = Sc;
     xr.sortedIndex = pu;
     xr.sortedIndexBy = vu;
     xr.sortedIndexOf = yu;
     xr.sortedLastIndex = gu;
     xr.sortedLastIndexBy = mu;
     xr.sortedLastIndexOf = bu;
     xr.startCase = uh;
     xr.startsWith = ch;
     xr.subtract = hd;
     xr.sum = dd;
     xr.sumBy = pd;
     xr.template = fh;
     xr.times = Yh;
     xr.toFinite = Hf;
     xr.toInteger = Vf;
     xr.toLength = Jf;
     xr.toLower = lh;
     xr.toNumber = Gf;
     xr.toSafeInteger = Yf;
     xr.toString = Zf;
     xr.toUpper = hh;
     xr.trim = dh;
     xr.trimEnd = ph;
     xr.trimStart = vh;
     xr.truncate = yh;
     xr.unescape = gh;
     xr.uniqueId = Xh;
     xr.upperCase = mh;
     xr.upperFirst = bh;
     xr.each = uc;
     xr.eachRight = cc;
     xr.first = Qa;
     Mh(xr, function() {
      var e = {};
      Pi(xr, function(t, n) {
       if (!lt.call(xr.prototype, n)) {
        e[n] = t;
       }
      });
      return e;
     }(), {
      chain: false
     });
     xr.VERSION = o;
     wn([ "bind", "bindKey", "curry", "curryRight", "partial", "partialRight" ], function(e) {
      xr[e].placeholder = xr;
     });
     wn([ "drop", "take" ], function(e, t) {
      Cr.prototype[e] = function(n) {
       n = n === i ? 1 : zt(Vf(n), 0);
       var r = this.__filtered__ && !t ? new Cr(this) : this.clone();
       if (r.__filtered__) {
        r.__takeCount__ = Bt(n, r.__takeCount__);
       } else {
        r.__views__.push({
         size: Bt(n, L),
         type: e + (r.__dir__ < 0 ? "Right" : "")
        });
       }
       return r;
      };
      Cr.prototype[e + "Right"] = function(t) {
       return this.reverse()[e](t).reverse();
      };
     });
     wn([ "filter", "map", "takeWhile" ], function(e, t) {
      var n = t + 1, r = n == R || n == A;
      Cr.prototype[e] = function(e) {
       var t = this.clone();
       t.__iteratees__.push({
        iteratee: Bs(e, 3),
        type: n
       });
       t.__filtered__ = t.__filtered__ || r;
       return t;
      };
     });
     wn([ "head", "last" ], function(e, t) {
      var n = "take" + (t ? "Right" : "");
      Cr.prototype[e] = function() {
       return this[n](1).value()[0];
      };
     });
     wn([ "initial", "tail" ], function(e, t) {
      var n = "drop" + (t ? "" : "Right");
      Cr.prototype[e] = function() {
       return this.__filtered__ ? new Cr(this) : this[n](1);
      };
     });
     Cr.prototype.compact = function() {
      return this.filter(Eh);
     };
     Cr.prototype.find = function(e) {
      return this.filter(e).head();
     };
     Cr.prototype.findLast = function(e) {
      return this.reverse().find(e);
     };
     Cr.prototype.invokeMap = wo(function(e, t) {
      if (typeof e == "function") {
       return new Cr(this);
      }
      return this.map(function(n) {
       return $i(n, e, t);
      });
     });
     Cr.prototype.reject = function(e) {
      return this.filter(Fc(Bs(e)));
     };
     Cr.prototype.slice = function(e, t) {
      e = Vf(e);
      var n = this;
      if (n.__filtered__ && (e > 0 || t < 0)) {
       return new Cr(n);
      }
      if (e < 0) {
       n = n.takeRight(-e);
      } else if (e) {
       n = n.drop(e);
      }
      if (t !== i) {
       t = Vf(t);
       n = t < 0 ? n.dropRight(-t) : n.take(t - e);
      }
      return n;
     };
     Cr.prototype.takeRightWhile = function(e) {
      return this.reverse().takeWhile(e).reverse();
     };
     Cr.prototype.toArray = function() {
      return this.take(L);
     };
     Pi(Cr.prototype, function(e, t) {
      var n = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), o = xr[r ? "take" + (t == "last" ? "Right" : "") : t], s = r || /^find/.test(t);
      if (!o) {
       return;
      }
      xr.prototype[t] = function() {
       var t = this.__wrapped__, a = r ? [ 1 ] : arguments, u = t instanceof Cr, c = a[0], f = u || af(t);
       var l = function(e) {
        var t = o.apply(xr, Dn([ e ], a));
        return r && h ? t[0] : t;
       };
       if (f && n && typeof c == "function" && c.length != 1) {
        u = f = false;
       }
       var h = this.__chain__, d = !!this.__actions__.length, p = s && !h, v = u && !d;
       if (!s && f) {
        t = v ? t : new Cr(this);
        var y = e.apply(t, a);
        y.__actions__.push({
         func: Uu,
         args: [ l ],
         thisArg: i
        });
        return new kr(y, h);
       }
       if (p && v) {
        return e.apply(this, a);
       }
       y = this.thru(l);
       return p ? r ? y.value()[0] : y.value() : y;
      };
     });
     wn([ "pop", "push", "shift", "sort", "splice", "unshift" ], function(e) {
      var t = st[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(e);
      xr.prototype[e] = function() {
       var e = arguments;
       if (r && !this.__chain__) {
        var i = this.value();
        return t.apply(af(i) ? i : [], e);
       }
       return this[n](function(n) {
        return t.apply(af(n) ? n : [], e);
       });
      };
     });
     Pi(Cr.prototype, function(e, t) {
      var n = xr[t];
      if (n) {
       var r = n.name + "", i = fn[r] || (fn[r] = []);
       i.push({
        name: t,
        func: n
       });
      }
     });
     fn[ms(i, m).name] = [ {
      name: "wrapper",
      func: i
     } ];
     Cr.prototype.clone = Dr;
     Cr.prototype.reverse = jr;
     Cr.prototype.value = Er;
     xr.prototype.at = Hu;
     xr.prototype.chain = Vu;
     xr.prototype.commit = Ju;
     xr.prototype.next = Gu;
     xr.prototype.plant = Yu;
     xr.prototype.reverse = Zu;
     xr.prototype.toJSON = xr.prototype.valueOf = xr.prototype.value = Xu;
     xr.prototype.first = xr.prototype.head;
     if (Dt) {
      xr.prototype[Dt] = Qu;
     }
     return xr;
    };
    var _r = wr();
    if (true) {
     sn._ = _r;
     !(r = function() {
      return _r;
     }.call(t, n, t, e), r !== i && (e.exports = r));
    } else {}
   }).call(this);
  }).call(this, n("YuTi")(e));
 },
 K5tX: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("2SiB");
  const s = n("4Tfi");
  const a = n("pBAs");
  const u = new Set([ i.SymbolKind.Variable ]);
  function c(e) {
   return a.cancellableHandler(e, ({textDocument: t}, n) => r(this, void 0, void 0, function*() {
    if (!e.settings.reason.codelens.enabled) {
     return [];
    }
    const r = new Set(e.settings.reason.server.languages);
    if (r.size < 1) return [];
    const a = [];
    if (r.has("ocaml")) a.push("ml");
    if (r.has("reason")) a.push("re");
    const c = t.uri.match(new RegExp(`.(${a.join("|")})$`));
    if (null == c) return [];
    const f = c[1];
    const l = o.merlin.Query.outline();
    const h = yield e.merlin.query(l, n, t, 1);
    if ("return" !== h.class) return [];
    const d = h.value;
    const p = yield s.getTextDocument(e, t);
    if (null == p) return [];
    const v = o.merlin.Outline.intoCode(d, t);
    const y = [];
    let g = null;
    let m = null;
    for (const {containerName: e, kind: n, location: r, name: o} of v) {
     if (u.has(n)) {
      const {range: s} = r;
      const {start: a} = s;
      const u = i.Position.create(a.line + 1, 0);
      const {character: c, line: l} = a;
      const h = i.Position.create(l, c);
      const d = {
       position: h,
       textDocument: t
      };
      if (null != (m = p.getText().substring(p.offsetAt(a), p.offsetAt(u))) && null != (g = m.match(/^\s*\b(and|let)\b(\s*)(\brec\b)?(\s*)(?:(?:\(?(?:[^\)]*)\)?(?:\s*::\s*(?:(?:\b\w+\b)|\((?:\b\w+\b):.*?\)=(?:\b\w+\b)))?|\((?:\b\w+\b)(?::.*?)?\))\s*)(?:(?:(?:(?:\b\w+\b)(?:\s*::\s*(?:(?:\b\w+\b)|\((?:\b\w+\b):.*?\)=(?:\b\w+\b)))?|\((?:\b\w+\b)(?::.*?)?\))\s*)|(?::(?=[^:])(?:.*?=>)*)?(?:.*?=)\s*[^\s=;]+?\s*.*?;?$)/m))) {
       d.position.character += g[1].length;
       d.position.character += g[2].length;
       d.position.character += g[3] ? g[3].length : 0;
       d.position.character += g[4].length;
      }
      if (null != g) {
       y.push({
        data: {
         containerName: e,
         event: d,
         fileKind: f,
         kind: n,
         location: r,
         name: o
        },
        range: s
       });
      }
     }
    }
    return y;
   }));
  }
  t.default = c;
 },
 K9FK: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("j1I1");
  const o = n("AHUE");
  function s(e, t) {
   return r(this, void 0, void 0, function*() {
    const n = t.getText();
    const r = new o.OcpIndent(e, []).process;
    r.stdin.write(n);
    r.stdin.end();
    const i = yield new Promise(t => {
     let n = "";
     r.stdout.on("error", n => {
      e.error(`Error formatting file: ${n}`);
      t(null);
     });
     r.stdout.on("data", e => n += e.toString());
     r.stdout.on("end", () => t(n));
    });
    r.unref();
    return i;
   });
  }
  t.ocpIndent = s;
  function a(e, t, n) {
   return r(this, void 0, void 0, function*() {
    const r = t.getText();
    const i = [ "--indent-empty", `--lines=${n.start.line}-${n.end.line}`, "--numeric" ];
    const s = new o.OcpIndent(e, i).process;
    s.stdin.write(r);
    s.stdin.end();
    const a = yield new Promise((e, t) => {
     let n = "";
     s.stdout.on("error", e => t(e));
     s.stdout.on("data", e => n += e.toString());
     s.stdout.on("end", () => e(n));
    });
    s.unref();
    const u = [];
    const c = /\d+/g;
    let f = null;
    while (null != (f = c.exec(a))) {
     const e = f.shift();
     const t = parseInt(e, 10);
     u.push(t);
    }
    return u;
   });
  }
  t.ocpIndentRange = a;
  let u = [];
  function c(e, t, n) {
   return r(this, void 0, void 0, function*() {
    if (null != n) {
     e.connection.console.warn("Selection formatting not support for Reason");
     return null;
    }
    const r = t.getText();
    if (/^\s*$/.test(r)) return r;
    const s = new o.ReFMT(e, t).process;
    s.stdin.write(r);
    s.stdin.end();
    const a = yield new Promise((n, r) => {
     let o = "";
     let a = "";
     s.stdout.on("error", e => r(e));
     s.stdout.on("data", e => o += e.toString());
     s.stdout.on("end", () => n(o));
     s.stderr.on("data", e => a += e.toString());
     s.stderr.on("end", () => {
      const n = i.refmt.parseErrors(a);
      if (n.length !== 0 || n.length !== u.length) {
       e.connection.sendDiagnostics({
        diagnostics: n,
        uri: t.uri
       });
      }
      u = n;
     });
    });
    s.unref();
    return /^\s*$/.test(a) ? null : a.trim();
   });
  }
  t.refmt = c;
 },
 KQMe: function(e, t) {
  e.exports = require("readline");
 },
 KcUE: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("pBAs");
  function o(e) {
   return i.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    return e.indexer.findSymbols({
     name: {
      $regex: t.query
     }
    });
   }));
  }
  t.default = o;
 },
 KdWM: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("4Tfi");
  function i(e) {
   return t => r.getProjectEnv(e, t);
  }
  t.default = i;
 },
 KxYO: function(e, t, n) {
  "use strict";
  function r(e) {
   for (var n in e) if (!t.hasOwnProperty(n)) t[n] = e[n];
  }
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("gcj8");
  t.ErrorCodes = i.ErrorCodes;
  t.ResponseError = i.ResponseError;
  t.CancellationToken = i.CancellationToken;
  t.CancellationTokenSource = i.CancellationTokenSource;
  t.Disposable = i.Disposable;
  t.Event = i.Event;
  t.Emitter = i.Emitter;
  t.Trace = i.Trace;
  t.SetTraceNotification = i.SetTraceNotification;
  t.LogTraceNotification = i.LogTraceNotification;
  t.RequestType = i.RequestType;
  t.RequestType0 = i.RequestType0;
  t.NotificationType = i.NotificationType;
  t.NotificationType0 = i.NotificationType0;
  t.MessageReader = i.MessageReader;
  t.MessageWriter = i.MessageWriter;
  t.ConnectionStrategy = i.ConnectionStrategy;
  t.StreamMessageReader = i.StreamMessageReader;
  t.StreamMessageWriter = i.StreamMessageWriter;
  t.IPCMessageReader = i.IPCMessageReader;
  t.IPCMessageWriter = i.IPCMessageWriter;
  t.createClientPipeTransport = i.createClientPipeTransport;
  t.createServerPipeTransport = i.createServerPipeTransport;
  t.generateRandomPipeName = i.generateRandomPipeName;
  t.createClientSocketTransport = i.createClientSocketTransport;
  t.createServerSocketTransport = i.createServerSocketTransport;
  r(n("kmEW"));
  r(n("X6WG"));
  function o(e, t, n, r) {
   return i.createMessageConnection(e, t, n, r);
  }
  t.createProtocolConnection = o;
 },
 LLgs: function(e, t, n) {
  e.exports = b;
  b.GlobSync = w;
  var r = n("mw/K");
  var i = n("aTK+");
  var o = n("2LKJ");
  var s = o.Minimatch;
  var a = n("4UAn").Glob;
  var u = n("jK02");
  var c = n("oyvS");
  var f = n("Qs3B");
  var l = n("oaIa");
  var h = n("3/zD");
  var d = h.alphasort;
  var p = h.alphasorti;
  var v = h.setopts;
  var y = h.ownProp;
  var g = h.childrenIgnored;
  var m = h.isIgnored;
  function b(e, t) {
   if (typeof t === "function" || arguments.length === 3) throw new TypeError("callback provided to sync glob\n" + "See: https://github.com/isaacs/node-glob/issues/167");
   return new w(e, t).found;
  }
  function w(e, t) {
   if (!e) throw new Error("must provide pattern");
   if (typeof t === "function" || arguments.length === 3) throw new TypeError("callback provided to sync glob\n" + "See: https://github.com/isaacs/node-glob/issues/167");
   if (!(this instanceof w)) return new w(e, t);
   v(this, e, t);
   if (this.noprocess) return this;
   var n = this.minimatch.set.length;
   this.matches = new Array(n);
   for (var r = 0; r < n; r++) {
    this._process(this.minimatch.set[r], r, false);
   }
   this._finish();
  }
  w.prototype._finish = function() {
   f(this instanceof w);
   if (this.realpath) {
    var e = this;
    this.matches.forEach(function(t, n) {
     var r = e.matches[n] = Object.create(null);
     for (var o in t) {
      try {
       o = e._makeAbs(o);
       var s = i.realpathSync(o, e.realpathCache);
       r[s] = true;
      } catch (t) {
       if (t.syscall === "stat") r[e._makeAbs(o)] = true; else throw t;
      }
     }
    });
   }
   h.finish(this);
  };
  w.prototype._process = function(e, t, n) {
   f(this instanceof w);
   var r = 0;
   while (typeof e[r] === "string") {
    r++;
   }
   var i;
   switch (r) {
   case e.length:
    this._processSimple(e.join("/"), t);
    return;

   case 0:
    i = null;
    break;

   default:
    i = e.slice(0, r).join("/");
    break;
   }
   var s = e.slice(r);
   var a;
   if (i === null) a = "."; else if (l(i) || l(e.join("/"))) {
    if (!i || !l(i)) i = "/" + i;
    a = i;
   } else a = i;
   var u = this._makeAbs(a);
   if (g(this, a)) return;
   var c = s[0] === o.GLOBSTAR;
   if (c) this._processGlobStar(i, a, u, s, t, n); else this._processReaddir(i, a, u, s, t, n);
  };
  w.prototype._processReaddir = function(e, t, n, r, i, o) {
   var s = this._readdir(n, o);
   if (!s) return;
   var a = r[0];
   var u = !!this.minimatch.negate;
   var f = a._glob;
   var l = this.dot || f.charAt(0) === ".";
   var h = [];
   for (var d = 0; d < s.length; d++) {
    var p = s[d];
    if (p.charAt(0) !== "." || l) {
     var v;
     if (u && !e) {
      v = !p.match(a);
     } else {
      v = p.match(a);
     }
     if (v) h.push(p);
    }
   }
   var y = h.length;
   if (y === 0) return;
   if (r.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[i]) this.matches[i] = Object.create(null);
    for (var d = 0; d < y; d++) {
     var p = h[d];
     if (e) {
      if (e.slice(-1) !== "/") p = e + "/" + p; else p = e + p;
     }
     if (p.charAt(0) === "/" && !this.nomount) {
      p = c.join(this.root, p);
     }
     this._emitMatch(i, p);
    }
    return;
   }
   r.shift();
   for (var d = 0; d < y; d++) {
    var p = h[d];
    var g;
    if (e) g = [ e, p ]; else g = [ p ];
    this._process(g.concat(r), i, o);
   }
  };
  w.prototype._emitMatch = function(e, t) {
   if (m(this, t)) return;
   var n = this._makeAbs(t);
   if (this.mark) t = this._mark(t);
   if (this.absolute) {
    t = n;
   }
   if (this.matches[e][t]) return;
   if (this.nodir) {
    var r = this.cache[n];
    if (r === "DIR" || Array.isArray(r)) return;
   }
   this.matches[e][t] = true;
   if (this.stat) this._stat(t);
  };
  w.prototype._readdirInGlobStar = function(e) {
   if (this.follow) return this._readdir(e, false);
   var t;
   var n;
   var i;
   try {
    n = r.lstatSync(e);
   } catch (e) {
    if (e.code === "ENOENT") {
     return null;
    }
   }
   var o = n && n.isSymbolicLink();
   this.symlinks[e] = o;
   if (!o && n && !n.isDirectory()) this.cache[e] = "FILE"; else t = this._readdir(e, false);
   return t;
  };
  w.prototype._readdir = function(e, t) {
   var n;
   if (t && !y(this.symlinks, e)) return this._readdirInGlobStar(e);
   if (y(this.cache, e)) {
    var i = this.cache[e];
    if (!i || i === "FILE") return null;
    if (Array.isArray(i)) return i;
   }
   try {
    return this._readdirEntries(e, r.readdirSync(e));
   } catch (t) {
    this._readdirError(e, t);
    return null;
   }
  };
  w.prototype._readdirEntries = function(e, t) {
   if (!this.mark && !this.stat) {
    for (var n = 0; n < t.length; n++) {
     var r = t[n];
     if (e === "/") r = e + r; else r = e + "/" + r;
     this.cache[r] = true;
    }
   }
   this.cache[e] = t;
   return t;
  };
  w.prototype._readdirError = function(e, t) {
   switch (t.code) {
   case "ENOTSUP":
   case "ENOTDIR":
    var n = this._makeAbs(e);
    this.cache[n] = "FILE";
    if (n === this.cwdAbs) {
     var r = new Error(t.code + " invalid cwd " + this.cwd);
     r.path = this.cwd;
     r.code = t.code;
     throw r;
    }
    break;

   case "ENOENT":
   case "ELOOP":
   case "ENAMETOOLONG":
   case "UNKNOWN":
    this.cache[this._makeAbs(e)] = false;
    break;

   default:
    this.cache[this._makeAbs(e)] = false;
    if (this.strict) throw t;
    if (!this.silent) console.error("glob error", t);
    break;
   }
  };
  w.prototype._processGlobStar = function(e, t, n, r, i, o) {
   var s = this._readdir(n, o);
   if (!s) return;
   var a = r.slice(1);
   var u = e ? [ e ] : [];
   var c = u.concat(a);
   this._process(c, i, false);
   var f = s.length;
   var l = this.symlinks[n];
   if (l && o) return;
   for (var h = 0; h < f; h++) {
    var d = s[h];
    if (d.charAt(0) === "." && !this.dot) continue;
    var p = u.concat(s[h], a);
    this._process(p, i, true);
    var v = u.concat(s[h], r);
    this._process(v, i, true);
   }
  };
  w.prototype._processSimple = function(e, t) {
   var n = this._stat(e);
   if (!this.matches[t]) this.matches[t] = Object.create(null);
   if (!n) return;
   if (e && l(e) && !this.nomount) {
    var r = /[\/\\]$/.test(e);
    if (e.charAt(0) === "/") {
     e = c.join(this.root, e);
    } else {
     e = c.resolve(this.root, e);
     if (r) e += "/";
    }
   }
   if (process.platform === "win32") e = e.replace(/\\/g, "/");
   this._emitMatch(t, e);
  };
  w.prototype._stat = function(e) {
   var t = this._makeAbs(e);
   var n = e.slice(-1) === "/";
   if (e.length > this.maxLength) return false;
   if (!this.stat && y(this.cache, t)) {
    var i = this.cache[t];
    if (Array.isArray(i)) i = "DIR";
    if (!n || i === "DIR") return i;
    if (n && i === "FILE") return false;
   }
   var o;
   var s = this.statCache[t];
   if (!s) {
    var a;
    try {
     a = r.lstatSync(t);
    } catch (e) {
     if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) {
      this.statCache[t] = false;
      return false;
     }
    }
    if (a && a.isSymbolicLink()) {
     try {
      s = r.statSync(t);
     } catch (e) {
      s = a;
     }
    } else {
     s = a;
    }
   }
   this.statCache[t] = s;
   var i = true;
   if (s) i = s.isDirectory() ? "DIR" : "FILE";
   this.cache[t] = this.cache[t] || i;
   if (n && i === "FILE") return false;
   return i;
  };
  w.prototype._mark = function(e) {
   return h.mark(this, e);
  };
  w.prototype._makeAbs = function(e) {
   return h.makeAbs(this, e);
  };
 },
 LXtr: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("AHUE");
  function o(e, t) {
   return r(this, void 0, void 0, function*() {
    const t = new i.Env(e).process;
    t.stdin.end();
    const n = yield new Promise((e, n) => {
     let r = "";
     t.stdout.on("error", e => n(e));
     t.stdout.on("data", e => r += e.toString());
     t.stdout.on("end", () => e(r));
    });
    t.unref();
    return /^\s*$/.test(n) ? [] : n.trim().split("\n");
   });
  }
  t.default = o;
 },
 Lhb6: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("2SiB");
  const s = n("4Tfi");
  const a = n("pBAs");
  function u(e) {
   return a.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const r = yield s.getOccurrences(e, t, n);
    if (null == r) return [];
    const a = r.map(e => {
     const t = o.merlin.Location.intoCode(e);
     const n = i.DocumentHighlightKind.Write;
     return i.DocumentHighlight.create(t, n);
    });
    return a;
   }));
  }
  t.default = u;
 },
 MGgX: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e) {
    const t = e.settings.reason.path.env;
    this.process = e.environment.spawn(t, []);
   }
  }
  t.default = r;
 },
 Mc3e: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e) {
    this.sync = e;
   }
  }
  t.Sync = r;
  (function(e) {
   let t;
   (function(t) {
    let n;
    (function(t) {
     t.get = (() => new e([ "protocol", "version" ]));
     t.set = (t => new e([ "protocol", "version", t ]));
    })(n = t.version || (t.version = {}));
   })(t = e.protocol || (e.protocol = {}));
   e.tell = ((t, n, r) => new e([ "tell", t, n, r ]));
  })(r = t.Sync || (t.Sync = {}));
 },
 MdGR: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var r = n("Qs2e");
  var i = n("Cs6m");
  var o = n("hDOz");
  function s(e, t) {
   if (t === void 0) {
    t = "utf-8";
   }
   var n;
   var s = new Promise(function(e, t) {
    n = e;
   });
   return new Promise(function(a, u) {
    var c = r.createServer(function(e) {
     c.close();
     n([ new i.SocketMessageReader(e, t), new o.SocketMessageWriter(e, t) ]);
    });
    c.on("error", u);
    c.listen(e, "127.0.0.1", function() {
     c.removeListener("error", u);
     a({
      onConnected: function() {
       return s;
      }
     });
    });
   });
  }
  t.createClientSocketTransport = s;
  function a(e, t) {
   if (t === void 0) {
    t = "utf-8";
   }
   var n = r.createConnection(e, "127.0.0.1");
   return [ new i.SocketMessageReader(n, t), new o.SocketMessageWriter(n, t) ];
  }
  t.createServerSocketTransport = a;
 },
 MhKX: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("2SiB");
  const i = n("BO9s");
  const o = n("EJ9c");
  const s = n("gnb0");
  const a = n("kcoj");
  const u = new a.default();
  u.connection.onExit(o.exit(u));
  u.connection.onInitialize(o.initialize(u));
  u.connection.onShutdown(o.shutdown(u));
  u.connection.onCodeAction(i.codeAction(u));
  u.connection.onDidChangeConfiguration(i.didChangeConfiguration(u));
  u.connection.onDocumentHighlight(i.documentHighlight(u));
  u.connection.onCodeLens(i.codeLens(u));
  u.connection.onCodeLensResolve(i.codeLensResolve(u));
  u.connection.onCompletion(i.completion(u));
  u.connection.onCompletionResolve(i.completionResolve(u));
  u.connection.onDefinition(i.definition(u));
  u.connection.onDidChangeWatchedFiles(i.didChangeWatchedFiles(u));
  u.connection.onDocumentFormatting(i.documentFormatting(u));
  u.connection.onDocumentSymbol(i.documentSymbol(u));
  u.connection.onHover(i.hover(u));
  u.connection.onReferences(i.references(u));
  u.connection.onRenameRequest(i.rename(u));
  u.connection.onWorkspaceSymbol(i.workspaceSymbol(u));
  u.connection.onRequest(r.remote.server.giveCaseAnalysis, s.giveCaseAnalysis(u));
  u.connection.onRequest(r.remote.server.giveMerlinFiles, s.giveMerlinFiles(u));
  u.connection.onRequest(r.remote.server.giveAvailableLibraries, s.giveAvailableLibraries(u));
  u.connection.onRequest(r.remote.server.giveProjectEnv, s.giveProjectEnv(u));
  u.listen();
 },
 Ml04: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var r = n("rCXO");
  var i = n("lq4E");
  var o;
  (function(e) {
   e.None = Object.freeze({
    isCancellationRequested: false,
    onCancellationRequested: r.Event.None
   });
   e.Cancelled = Object.freeze({
    isCancellationRequested: true,
    onCancellationRequested: r.Event.None
   });
   function t(t) {
    var n = t;
    return n && (n === e.None || n === e.Cancelled || i.boolean(n.isCancellationRequested) && !!n.onCancellationRequested);
   }
   e.is = t;
  })(o = t.CancellationToken || (t.CancellationToken = {}));
  var s = Object.freeze(function(e, t) {
   var n = setTimeout(e.bind(t), 0);
   return {
    dispose: function() {
     clearTimeout(n);
    }
   };
  });
  var a = function() {
   function e() {
    this._isCancelled = false;
   }
   e.prototype.cancel = function() {
    if (!this._isCancelled) {
     this._isCancelled = true;
     if (this._emitter) {
      this._emitter.fire(undefined);
      this._emitter = undefined;
     }
    }
   };
   Object.defineProperty(e.prototype, "isCancellationRequested", {
    get: function() {
     return this._isCancelled;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "onCancellationRequested", {
    get: function() {
     if (this._isCancelled) {
      return s;
     }
     if (!this._emitter) {
      this._emitter = new r.Emitter();
     }
     return this._emitter.event;
    },
    enumerable: true,
    configurable: true
   });
   return e;
  }();
  var u = function() {
   function e() {}
   Object.defineProperty(e.prototype, "token", {
    get: function() {
     if (!this._token) {
      this._token = new a();
     }
     return this._token;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.cancel = function() {
    if (!this._token) {
     this._token = o.Cancelled;
    } else {
     this._token.cancel();
    }
   };
   e.prototype.dispose = function() {
    this.cancel();
   };
   return e;
  }();
  t.CancellationTokenSource = u;
 },
 NWhw: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("j1I1");
  const o = n("pBAs");
  function s(e) {
   return o.cancellableHandler(e, (e, t) => r(this, void 0, void 0, function*() {
    const t = e.data.documentation.replace(/\{\{:.*?\}(.*?)\}/g, "$1").replace(/\{!(.*?)\}/g, "$1");
    const n = i.ocamldoc.intoMarkdown(t).replace(/`(.*?)`/g, "$1").replace(/\s+/g, " ").replace(/\n/g, "");
    e.documentation = n;
    return e;
   }));
  }
  t.default = s;
 },
 P7XM: function(e, t) {
  if (typeof Object.create === "function") {
   e.exports = function e(t, n) {
    t.super_ = n;
    t.prototype = Object.create(n.prototype, {
     constructor: {
      value: t,
      enumerable: false,
      writable: true,
      configurable: true
     }
    });
   };
  } else {
   e.exports = function e(t, n) {
    t.super_ = n;
    var r = function() {};
    r.prototype = n.prototype;
    t.prototype = new r();
    t.prototype.constructor = t;
   };
  }
 },
 PJMN: function(e, t) {
  e.exports = require("crypto");
 },
 PnYj: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e, t) {
    const n = e.settings.reason.path.ocamlfind;
    const r = t || [ "list" ];
    this.process = e.environment.spawn(n, r);
   }
  }
  t.default = r;
 },
 QduZ: function(e, t) {
  e.exports = require("child_process");
 },
 Qs2e: function(e, t) {
  e.exports = require("net");
 },
 Qs3B: function(e, t) {
  e.exports = require("assert");
 },
 RAbO: function(e, t, n) {
  var r = n("1jOq");
  var i = Object.create(null);
  var o = n("VmuJ");
  e.exports = r(s);
  function s(e, t) {
   if (i[e]) {
    i[e].push(t);
    return null;
   } else {
    i[e] = [ t ];
    return a(e);
   }
  }
  function a(e) {
   return o(function t() {
    var n = i[e];
    var r = n.length;
    var o = u(arguments);
    try {
     for (var s = 0; s < r; s++) {
      n[s].apply(null, o);
     }
    } finally {
     if (n.length > r) {
      n.splice(0, r);
      process.nextTick(function() {
       t.apply(null, o);
      });
     } else {
      delete i[e];
     }
    }
   });
  }
  function u(e) {
   var t = e.length;
   var n = [];
   for (var r = 0; r < t; r++) n[r] = e[r];
   return n;
  }
 },
 RDN1: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e) {
    this.query = e;
   }
  }
  t.Query = r;
  (function(e) {
   let t;
   (function(t) {
    t.analysis = {
     from: t => ({
      to: n => new e([ "case", "analysis", "from", t, "to", n ])
     })
    };
   })(t = e.kase || (e.kase = {}));
   let n;
   (function(t) {
    t.prefix = (t => ({
     at: n => ({
      with: {
       doc: () => new e([ "complete", "prefix", t, "at", n, "with", "doc" ])
      }
     })
    }));
   })(n = e.complete || (e.complete = {}));
   e.document = (t => ({
    at: n => new e([ "document", t, "at", n ])
   }));
   let r;
   (function(t) {
    let n;
    (function(t) {
     t.at = (t => new e([ "dump", "env", "at", t ]));
    })(n = t.env || (t.env = {}));
   })(r = e.dump || (e.dump = {}));
   e.enclosing = (t => new e([ "enclosing", t ]));
   e.errors = (() => new e([ "errors" ]));
   e.locate = ((t, n) => ({
    at: r => new e([ "locate", t, n, "at", r ])
   }));
   let i;
   (function(t) {
    let n;
    (function(t) {
     t.at = (t => new e([ "occurrences", "ident", "at", t ]));
    })(n = t.ident || (t.ident = {}));
   })(i = e.occurrences || (e.occurrences = {}));
   e.outline = (() => new e([ "outline" ]));
   let o;
   (function(t) {
    let n;
    (function(t) {
     t.source = (() => new e([ "path", "list", "source" ]));
    })(n = t.list || (t.list = {}));
   })(o = e.path || (e.path = {}));
   let s;
   (function(t) {
    t.get = (() => new e([ "project", "get" ]));
   })(s = e.project || (e.project = {}));
   let a;
   (function(t) {
    t.expression = (t => ({
     at: n => new e([ "type", "expression", t, "at", n ])
    }));
    let n;
    (function(t) {
     t.at = (t => new e([ "type", "enclosing", "at", t ]));
    })(n = t.enclosing || (t.enclosing = {}));
   })(a = e.type || (e.type = {}));
  })(r = t.Query || (t.Query = {}));
 },
 S7vn: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = Object.prototype.toString;
  function i(e) {
   return e === true || e === false;
  }
  t.boolean = i;
  function o(e) {
   return r.call(e) === "[object String]";
  }
  t.string = o;
  function s(e) {
   return r.call(e) === "[object Number]";
  }
  t.number = s;
  function a(e) {
   return r.call(e) === "[object Error]";
  }
  t.error = a;
  function u(e) {
   return r.call(e) === "[object Function]";
  }
  t.func = u;
  function c(e) {
   return Array.isArray(e);
  }
  t.array = c;
  function f(e) {
   return c(e) && e.every(e => o(e));
  }
  t.stringArray = f;
  function l(e, t) {
   return Array.isArray(e) && e.every(t);
  }
  t.typedArray = l;
  function h(e) {
   return e && u(e.then);
  }
  t.thenable = h;
 },
 ScIO: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  function r(e) {
   return e.onDidChangeConfiguration.bind(e);
  }
  t.default = r;
 },
 T4Ul: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("4Tfi");
  const s = n("pBAs");
  function a(e) {
   return s.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const n = yield o.getTextDocument(e, t.textDocument);
    if (null == n) return [];
    const r = i.TextDocument.create(t.textDocument.uri, n.languageId, n.version, n.getText());
    let s = null;
    if (r.languageId === "ocaml") s = yield o.getFormatted.ocpIndent(e, r);
    if (r.languageId === "reason") s = yield o.getFormatted.refmt(e, r);
    if (null == s || "" === s) return [];
    const a = [];
    a.push(i.TextEdit.replace(i.Range.create(r.positionAt(0), r.positionAt(n.getText().length)), s));
    return a;
   }));
  }
  t.default = a;
 },
 T8wH: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("gcj8");
  var i;
  (function(e) {
   e.type = new r.RequestType("textDocument/typeDefinition");
  })(i = t.TypeDefinitionRequest || (t.TypeDefinitionRequest = {}));
 },
 TKQy: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("XS3J");
  const o = n("KxYO");
  const s = n("2SiB");
  const a = n("4Tfi");
  class u {
   constructor(e) {
    this.session = e;
    this.populated = false;
    this.db = new i(".vscode.reasonml.loki");
    this.symbols = this.db.addCollection("symbols", {
     indices: [ "name" ]
    });
   }
   dispose() {
    return;
   }
   findSymbols(e) {
    let t = [];
    try {
     t = this.symbols.chain().find(e).simplesort("name").data();
    } catch (e) {}
    return t;
   }
   indexSymbols(e) {
    return r(this, void 0, void 0, function*() {
     const t = s.merlin.Query.outline();
     const n = yield this.session.merlin.query(t, null, e);
     if ("return" !== n.class) return new o.ResponseError(-1, "indexSymbols: failed", undefined);
     for (const t of s.merlin.Outline.intoCode(n.value, e)) {
      const n = t.containerName ? `${t.containerName}.` : "";
      t.name = `${n}${t.name}`;
      t.containerName = this.session.environment.relativize(e);
      this.symbols.insert(t);
     }
    });
   }
   initialize() {
    return r(this, void 0, void 0, function*() {
     return;
    });
   }
   populate(e) {
    return r(this, void 0, void 0, function*() {
     if (!this.populated) {
      this.populated = true;
      const t = yield a.getModules(this.session, null, e);
      for (const e of t) {
       if (/\.(ml|re)i$/.test(e.uri)) continue;
       const t = yield a.getTextDocument(this.session, e);
       if (null != t) {
        yield this.session.merlin.sync(s.merlin.Sync.tell("start", "end", t.getText()), e);
        yield this.refreshSymbols(e);
       }
      }
     }
    });
   }
   refreshSymbols(e) {
    this.removeSymbols(e);
    return this.indexSymbols(e);
   }
   removeSymbols({uri: e}) {
    this.symbols.chain().where(t => t.location.uri === e).remove();
   }
  }
  t.default = u;
 },
 TUh0: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("JtuM");
  const o = n("2SiB");
  function s(e) {
   return r(this, void 0, void 0, function*() {
    yield e.merlin.restart();
    for (const t of e.synchronizer.documents.values()) {
     const n = t.getText();
     const r = o.merlin.Sync.tell("start", "end", n);
     yield e.merlin.sync(r, t);
     const i = new Set(e.settings.reason.diagnostics.tools);
     if (!i.has("bsb")) {
      yield e.analyzer.refreshImmediate(t);
     }
     e.indexer.populated = false;
     yield e.indexer.populate(t);
    }
   });
  }
  const a = i.debounce(s, 3e3, {
   trailing: true
  });
  t.default = a;
 },
 Tqjb: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("QduZ");
  const o = n("mw/K");
  const s = n("oyvS");
  const a = n("bzos");
  const u = "file://".length - 1;
  class c {
   constructor(e) {
    this.session = e;
    this.projectCommandWrapper = null;
   }
   static pathToUri(e) {
    const t = a.format(a.parse(`file://${e}`));
    return {
     uri: t
    };
   }
   static uriToPath({uri: e}) {
    return e.substr(u);
   }
   initialize() {
    return r(this, void 0, void 0, function*() {
     yield this.determineCommandWrapper();
    });
   }
   dispose() {
    return;
   }
   relativize(e) {
    const t = this.workspaceRoot();
    if (null == t) return;
    return s.relative(t, c.uriToPath(e));
   }
   spawn(e, t = [], n = {}) {
    n.shell = process.platform === "win32" ? true : n.shell;
    if (null != this.projectCommandWrapper) {
     return i.spawn(this.projectCommandWrapper, [ e ].concat(t), n);
    } else {
     return i.spawn(e, t, n);
    }
   }
   workspaceRoot() {
    return this.session.initConf.rootPath;
   }
   projectCommandWrapperPath(e) {
    return e === null || e === undefined ? null : s.join(e, "node_modules", ".cache", "_esy", "build", "bin", process.platform === "win32" ? "command-exec.bat" : "command-exec");
   }
   determineCommandWrapper() {
    return r(this, void 0, void 0, function*() {
     const e = this.workspaceRoot();
     try {
      const t = this.projectCommandWrapperPath(e);
      if (null != t) {
       const e = yield o.existsSync(t);
       this.projectCommandWrapper = e ? t : null;
      }
     } catch (t) {
      this.session.error(`Error determining if command wrapper exists at: ${e}`);
     }
    });
   }
  }
  t.default = c;
 },
 TuBq: function(e, t, n) {
  var r = n("icBU");
  var i = n("kbA8");
  e.exports = p;
  var o = "\0SLASH" + Math.random() + "\0";
  var s = "\0OPEN" + Math.random() + "\0";
  var a = "\0CLOSE" + Math.random() + "\0";
  var u = "\0COMMA" + Math.random() + "\0";
  var c = "\0PERIOD" + Math.random() + "\0";
  function f(e) {
   return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
  }
  function l(e) {
   return e.split("\\\\").join(o).split("\\{").join(s).split("\\}").join(a).split("\\,").join(u).split("\\.").join(c);
  }
  function h(e) {
   return e.split(o).join("\\").split(s).join("{").split(a).join("}").split(u).join(",").split(c).join(".");
  }
  function d(e) {
   if (!e) return [ "" ];
   var t = [];
   var n = i("{", "}", e);
   if (!n) return e.split(",");
   var r = n.pre;
   var o = n.body;
   var s = n.post;
   var a = r.split(",");
   a[a.length - 1] += "{" + o + "}";
   var u = d(s);
   if (s.length) {
    a[a.length - 1] += u.shift();
    a.push.apply(a, u);
   }
   t.push.apply(t, a);
   return t;
  }
  function p(e) {
   if (!e) return [];
   if (e.substr(0, 2) === "{}") {
    e = "\\{\\}" + e.substr(2);
   }
   return w(l(e), true).map(h);
  }
  function v(e) {
   return e;
  }
  function y(e) {
   return "{" + e + "}";
  }
  function g(e) {
   return /^-?0\d/.test(e);
  }
  function m(e, t) {
   return e <= t;
  }
  function b(e, t) {
   return e >= t;
  }
  function w(e, t) {
   var n = [];
   var o = i("{", "}", e);
   if (!o || /\$$/.test(o.pre)) return [ e ];
   var s = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o.body);
   var u = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o.body);
   var c = s || u;
   var l = o.body.indexOf(",") >= 0;
   if (!c && !l) {
    if (o.post.match(/,.*\}/)) {
     e = o.pre + "{" + o.body + a + o.post;
     return w(e);
    }
    return [ e ];
   }
   var h;
   if (c) {
    h = o.body.split(/\.\./);
   } else {
    h = d(o.body);
    if (h.length === 1) {
     h = w(h[0], false).map(y);
     if (h.length === 1) {
      var p = o.post.length ? w(o.post, false) : [ "" ];
      return p.map(function(e) {
       return o.pre + h[0] + e;
      });
     }
    }
   }
   var v = o.pre;
   var p = o.post.length ? w(o.post, false) : [ "" ];
   var _;
   if (c) {
    var x = f(h[0]);
    var O = f(h[1]);
    var S = Math.max(h[0].length, h[1].length);
    var k = h.length == 3 ? Math.abs(f(h[2])) : 1;
    var C = m;
    var D = O < x;
    if (D) {
     k *= -1;
     C = b;
    }
    var j = h.some(g);
    _ = [];
    for (var E = x; C(E, O); E += k) {
     var P;
     if (u) {
      P = String.fromCharCode(E);
      if (P === "\\") P = "";
     } else {
      P = String(E);
      if (j) {
       var R = S - P.length;
       if (R > 0) {
        var T = new Array(R + 1).join("0");
        if (E < 0) P = "-" + T + P.slice(1); else P = T + P;
       }
      }
     }
     _.push(P);
    }
   } else {
    _ = r(h, function(e) {
     return w(e, false);
    });
   }
   for (var A = 0; A < _.length; A++) {
    for (var I = 0; I < p.length; I++) {
     var M = v + _[A] + p[I];
     if (!t || c || M) n.push(M);
    }
   }
   return n;
  }
 },
 UTJM: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("4Tfi");
  function i(e) {
   return t => r.getAvailableLibraries(e, t);
  }
  t.default = i;
 },
 UmWi: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("2SiB");
  const s = n("4Tfi");
  const a = n("pBAs");
  function u(e) {
   return a.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const r = yield s.getOccurrences(e, t, n);
    if (null == r) return [];
    const a = r.map(e => {
     const n = t.textDocument.uri;
     const r = o.merlin.Location.intoCode(e);
     return i.Location.create(n, r);
    });
    return a;
   }));
  }
  t.default = u;
 },
 VmuJ: function(e, t, n) {
  var r = n("1jOq");
  e.exports = r(i);
  e.exports.strict = r(o);
  i.proto = i(function() {
   Object.defineProperty(Function.prototype, "once", {
    value: function() {
     return i(this);
    },
    configurable: true
   });
   Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
     return o(this);
    },
    configurable: true
   });
  });
  function i(e) {
   var t = function() {
    if (t.called) return t.value;
    t.called = true;
    return t.value = e.apply(this, arguments);
   };
   t.called = false;
   return t;
  }
  function o(e) {
   var t = function() {
    if (t.called) throw new Error(t.onceError);
    t.called = true;
    return t.value = e.apply(this, arguments);
   };
   var n = e.name || "Function wrapped with `once`";
   t.onceError = n + " shouldn't be called more than once";
   t.called = false;
   return t;
  }
 },
 WHP5: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("u4/7");
  t.ignore = new RegExp([ /^Needed cmti file of module/, /^No documentation available/, /^Not a valid identifier/, /^Not in environment '.*'/, /^The initially opened module\.$/, /^didn't manage to find/ ].map(e => e.source).join("|"));
  function i(e) {
   let t = e;
   try {
    t = r.parse(e);
   } catch (e) {}
   return t;
  }
  t.intoMarkdown = i;
 },
 WNwX: function(e, t, n) {
  "use strict";
  n.r(t);
  var r = function e(t) {
   return i(t) && !o(t);
  };
  function i(e) {
   return !!e && typeof e === "object";
  }
  function o(e) {
   var t = Object.prototype.toString.call(e);
   return t === "[object RegExp]" || t === "[object Date]" || u(e);
  }
  var s = typeof Symbol === "function" && Symbol.for;
  var a = s ? Symbol.for("react.element") : 60103;
  function u(e) {
   return e.$$typeof === a;
  }
  function c(e) {
   return Array.isArray(e) ? [] : {};
  }
  function f(e, t) {
   return t.clone !== false && t.isMergeableObject(e) ? d(c(e), e, t) : e;
  }
  function l(e, t, n) {
   return e.concat(t).map(function(e) {
    return f(e, n);
   });
  }
  function h(e, t, n) {
   var r = {};
   if (n.isMergeableObject(e)) {
    Object.keys(e).forEach(function(t) {
     r[t] = f(e[t], n);
    });
   }
   Object.keys(t).forEach(function(i) {
    if (!n.isMergeableObject(t[i]) || !e[i]) {
     r[i] = f(t[i], n);
    } else {
     r[i] = d(e[i], t[i], n);
    }
   });
   return r;
  }
  function d(e, t, n) {
   n = n || {};
   n.arrayMerge = n.arrayMerge || l;
   n.isMergeableObject = n.isMergeableObject || r;
   var i = Array.isArray(t);
   var o = Array.isArray(e);
   var s = i === o;
   if (!s) {
    return f(t, n);
   } else if (i) {
    return n.arrayMerge(e, t, n);
   } else {
    return h(e, t, n);
   }
  }
  d.all = function e(t, n) {
   if (!Array.isArray(t)) {
    throw new Error("first argument should be an array");
   }
   return t.reduce(function(e, t) {
    return d(e, t, n);
   }, {});
  };
  var p = d;
  t["default"] = p;
 },
 WqDQ: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("KxYO");
  const i = n("9d5b");
  const o = i.createDiagnostic("refmt");
  function s(e) {
   const t = [];
   const n = new RegExp([ /File "(.*)", line (\d*), characters (\d*)-(\d*):[\s\S]*?(?:Error|Warning \d+): ([\s\S]*)/ ].map(e => e.source).join(""), "g");
   let i;
   while (i = n.exec(e)) {
    const e = Number(i[2]) - 1;
    const n = Number(i[2]) - 1;
    const s = Number(i[3]);
    const a = Number(i[4]);
    const u = i[5].trim();
    const c = /^Warning number \d+/.exec(i[0]) ? r.DiagnosticSeverity.Warning : r.DiagnosticSeverity.Error;
    const f = o(u, s, e, a, n, c);
    t.push(f);
   }
   return t;
  }
  t.parseErrors = s;
 },
 X6WG: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("S7vn");
  const i = n("gcj8");
  const o = n("xIlt");
  t.ImplementationRequest = o.ImplementationRequest;
  const s = n("T8wH");
  t.TypeDefinitionRequest = s.TypeDefinitionRequest;
  const a = n("m7V9");
  t.WorkspaceFoldersRequest = a.WorkspaceFoldersRequest;
  t.DidChangeWorkspaceFoldersNotification = a.DidChangeWorkspaceFoldersNotification;
  const u = n("hxPP");
  t.ConfigurationRequest = u.ConfigurationRequest;
  const c = n("Fn/0");
  t.DocumentColorRequest = c.DocumentColorRequest;
  t.ColorPresentationRequest = c.ColorPresentationRequest;
  var f;
  (function(e) {
   function t(e) {
    let t = e;
    return r.string(t.language) || r.string(t.scheme) || r.string(t.pattern);
   }
   e.is = t;
  })(f = t.DocumentFilter || (t.DocumentFilter = {}));
  var l;
  (function(e) {
   e.type = new i.RequestType("client/registerCapability");
  })(l = t.RegistrationRequest || (t.RegistrationRequest = {}));
  var h;
  (function(e) {
   e.type = new i.RequestType("client/unregisterCapability");
  })(h = t.UnregistrationRequest || (t.UnregistrationRequest = {}));
  var d;
  (function(e) {
   e.None = 0;
   e.Full = 1;
   e.Incremental = 2;
  })(d = t.TextDocumentSyncKind || (t.TextDocumentSyncKind = {}));
  var p;
  (function(e) {
   e.type = new i.RequestType("initialize");
  })(p = t.InitializeRequest || (t.InitializeRequest = {}));
  var v;
  (function(e) {
   e.unknownProtocolVersion = 1;
  })(v = t.InitializeError || (t.InitializeError = {}));
  var y;
  (function(e) {
   e.type = new i.NotificationType("initialized");
  })(y = t.InitializedNotification || (t.InitializedNotification = {}));
  var g;
  (function(e) {
   e.type = new i.RequestType0("shutdown");
  })(g = t.ShutdownRequest || (t.ShutdownRequest = {}));
  var m;
  (function(e) {
   e.type = new i.NotificationType0("exit");
  })(m = t.ExitNotification || (t.ExitNotification = {}));
  var b;
  (function(e) {
   e.type = new i.NotificationType("workspace/didChangeConfiguration");
  })(b = t.DidChangeConfigurationNotification || (t.DidChangeConfigurationNotification = {}));
  var w;
  (function(e) {
   e.Error = 1;
   e.Warning = 2;
   e.Info = 3;
   e.Log = 4;
  })(w = t.MessageType || (t.MessageType = {}));
  var _;
  (function(e) {
   e.type = new i.NotificationType("window/showMessage");
  })(_ = t.ShowMessageNotification || (t.ShowMessageNotification = {}));
  var x;
  (function(e) {
   e.type = new i.RequestType("window/showMessageRequest");
  })(x = t.ShowMessageRequest || (t.ShowMessageRequest = {}));
  var O;
  (function(e) {
   e.type = new i.NotificationType("window/logMessage");
  })(O = t.LogMessageNotification || (t.LogMessageNotification = {}));
  var S;
  (function(e) {
   e.type = new i.NotificationType("telemetry/event");
  })(S = t.TelemetryEventNotification || (t.TelemetryEventNotification = {}));
  var k;
  (function(e) {
   e.type = new i.NotificationType("textDocument/didOpen");
  })(k = t.DidOpenTextDocumentNotification || (t.DidOpenTextDocumentNotification = {}));
  var C;
  (function(e) {
   e.type = new i.NotificationType("textDocument/didChange");
  })(C = t.DidChangeTextDocumentNotification || (t.DidChangeTextDocumentNotification = {}));
  var D;
  (function(e) {
   e.type = new i.NotificationType("textDocument/didClose");
  })(D = t.DidCloseTextDocumentNotification || (t.DidCloseTextDocumentNotification = {}));
  var j;
  (function(e) {
   e.type = new i.NotificationType("textDocument/didSave");
  })(j = t.DidSaveTextDocumentNotification || (t.DidSaveTextDocumentNotification = {}));
  var E;
  (function(e) {
   e.type = new i.NotificationType("textDocument/willSave");
  })(E = t.WillSaveTextDocumentNotification || (t.WillSaveTextDocumentNotification = {}));
  var P;
  (function(e) {
   e.type = new i.RequestType("textDocument/willSaveWaitUntil");
  })(P = t.WillSaveTextDocumentWaitUntilRequest || (t.WillSaveTextDocumentWaitUntilRequest = {}));
  var R;
  (function(e) {
   e.type = new i.NotificationType("workspace/didChangeWatchedFiles");
  })(R = t.DidChangeWatchedFilesNotification || (t.DidChangeWatchedFilesNotification = {}));
  var T;
  (function(e) {
   e.Created = 1;
   e.Changed = 2;
   e.Deleted = 3;
  })(T = t.FileChangeType || (t.FileChangeType = {}));
  var A;
  (function(e) {
   e.Create = 1;
   e.Change = 2;
   e.Delete = 4;
  })(A = t.WatchKind || (t.WatchKind = {}));
  var I;
  (function(e) {
   e.type = new i.NotificationType("textDocument/publishDiagnostics");
  })(I = t.PublishDiagnosticsNotification || (t.PublishDiagnosticsNotification = {}));
  var M;
  (function(e) {
   e.Invoked = 1;
   e.TriggerCharacter = 2;
   e.TriggerForIncompleteCompletions = 3;
  })(M = t.CompletionTriggerKind || (t.CompletionTriggerKind = {}));
  var q;
  (function(e) {
   e.type = new i.RequestType("textDocument/completion");
  })(q = t.CompletionRequest || (t.CompletionRequest = {}));
  var N;
  (function(e) {
   e.type = new i.RequestType("completionItem/resolve");
  })(N = t.CompletionResolveRequest || (t.CompletionResolveRequest = {}));
  var L;
  (function(e) {
   e.type = new i.RequestType("textDocument/hover");
  })(L = t.HoverRequest || (t.HoverRequest = {}));
  var F;
  (function(e) {
   e.type = new i.RequestType("textDocument/signatureHelp");
  })(F = t.SignatureHelpRequest || (t.SignatureHelpRequest = {}));
  var z;
  (function(e) {
   e.type = new i.RequestType("textDocument/definition");
  })(z = t.DefinitionRequest || (t.DefinitionRequest = {}));
  var W;
  (function(e) {
   e.type = new i.RequestType("textDocument/references");
  })(W = t.ReferencesRequest || (t.ReferencesRequest = {}));
  var $;
  (function(e) {
   e.type = new i.RequestType("textDocument/documentHighlight");
  })($ = t.DocumentHighlightRequest || (t.DocumentHighlightRequest = {}));
  var B;
  (function(e) {
   e.type = new i.RequestType("textDocument/documentSymbol");
  })(B = t.DocumentSymbolRequest || (t.DocumentSymbolRequest = {}));
  var K;
  (function(e) {
   e.type = new i.RequestType("workspace/symbol");
  })(K = t.WorkspaceSymbolRequest || (t.WorkspaceSymbolRequest = {}));
  var U;
  (function(e) {
   e.type = new i.RequestType("textDocument/codeAction");
  })(U = t.CodeActionRequest || (t.CodeActionRequest = {}));
  var H;
  (function(e) {
   e.type = new i.RequestType("textDocument/codeLens");
  })(H = t.CodeLensRequest || (t.CodeLensRequest = {}));
  var V;
  (function(e) {
   e.type = new i.RequestType("codeLens/resolve");
  })(V = t.CodeLensResolveRequest || (t.CodeLensResolveRequest = {}));
  var J;
  (function(e) {
   e.type = new i.RequestType("textDocument/formatting");
  })(J = t.DocumentFormattingRequest || (t.DocumentFormattingRequest = {}));
  var G;
  (function(e) {
   e.type = new i.RequestType("textDocument/rangeFormatting");
  })(G = t.DocumentRangeFormattingRequest || (t.DocumentRangeFormattingRequest = {}));
  var Q;
  (function(e) {
   e.type = new i.RequestType("textDocument/onTypeFormatting");
  })(Q = t.DocumentOnTypeFormattingRequest || (t.DocumentOnTypeFormattingRequest = {}));
  var Y;
  (function(e) {
   e.type = new i.RequestType("textDocument/rename");
  })(Y = t.RenameRequest || (t.RenameRequest = {}));
  var Z;
  (function(e) {
   e.type = new i.RequestType("textDocument/documentLink");
  })(Z = t.DocumentLinkRequest || (t.DocumentLinkRequest = {}));
  var X;
  (function(e) {
   e.type = new i.RequestType("documentLink/resolve");
  })(X = t.DocumentLinkResolveRequest || (t.DocumentLinkResolveRequest = {}));
  var ee;
  (function(e) {
   e.type = new i.RequestType("workspace/executeCommand");
  })(ee = t.ExecuteCommandRequest || (t.ExecuteCommandRequest = {}));
  var te;
  (function(e) {
   e.type = new i.RequestType("workspace/applyEdit");
  })(te = t.ApplyWorkspaceEditRequest || (t.ApplyWorkspaceEditRequest = {}));
 },
 XS3J: function(e, t, n) {
  var r, i, o;
  (function(n, s) {
   if (true) {
    !(i = [], r = s, o = typeof r === "function" ? r.apply(t, i) : r, o !== undefined && (e.exports = o));
   } else {}
  })(this, function() {
   return function() {
    "use strict";
    var e = Object.prototype.hasOwnProperty;
    var t = {
     copyProperties: function(e, t) {
      var n;
      for (n in e) {
       t[n] = e[n];
      }
     },
     resolveTransformObject: function(e, n, r) {
      var i, o;
      if (typeof r !== "number") {
       r = 0;
      }
      if (++r >= 10) return e;
      for (i in e) {
       if (typeof e[i] === "string" && e[i].indexOf("[%lktxp]") === 0) {
        o = e[i].substring(8);
        if (n.hasOwnProperty(o)) {
         e[i] = n[o];
        }
       } else if (typeof e[i] === "object") {
        e[i] = t.resolveTransformObject(e[i], n, r);
       }
      }
      return e;
     },
     resolveTransformParams: function(e, n) {
      var r, i, o = [];
      if (typeof n === "undefined") return e;
      for (r = 0; r < e.length; r++) {
       i = d(e[r], "shallow-recurse-objects");
       o.push(t.resolveTransformObject(i, n));
      }
      return o;
     }
    };
    function r(e, t) {
     var n, r, i, o;
     if (e === t) return true;
     if (!e || !t || e === true || t === true || e !== e || t !== t) {
      switch (e) {
      case undefined:
       i = 1;
       break;

      case null:
       i = 1;
       break;

      case false:
       i = 3;
       break;

      case true:
       i = 4;
       break;

      case "":
       i = 5;
       break;

      default:
       i = e === e ? 9 : 0;
       break;
      }
      switch (t) {
      case undefined:
       o = 1;
       break;

      case null:
       o = 1;
       break;

      case false:
       o = 3;
       break;

      case true:
       o = 4;
       break;

      case "":
       o = 5;
       break;

      default:
       o = t === t ? 9 : 0;
       break;
      }
      if (i !== 9 || o !== 9) {
       return i === o;
      }
     }
     n = Number(e);
     r = Number(t);
     if (n === n || r === r) {
      return n === r;
     }
     n = e.toString();
     r = t.toString();
     return n == r;
    }
    function i(e, t, n) {
     var r, i, o, s;
     if (!e || !t || e === true || t === true || e !== e || t !== t) {
      switch (e) {
      case undefined:
       o = 1;
       break;

      case null:
       o = 1;
       break;

      case false:
       o = 3;
       break;

      case true:
       o = 4;
       break;

      case "":
       o = 5;
       break;

      default:
       o = e === e ? 9 : 0;
       break;
      }
      switch (t) {
      case undefined:
       s = 1;
       break;

      case null:
       s = 1;
       break;

      case false:
       s = 3;
       break;

      case true:
       s = 4;
       break;

      case "":
       s = 5;
       break;

      default:
       s = t === t ? 9 : 0;
       break;
      }
      if (o !== 9 || s !== 9) {
       return o === s ? n : o < s;
      }
     }
     r = Number(e);
     i = Number(t);
     if (r === r && i === i) {
      if (r < i) return true;
      if (r > i) return false;
      return n;
     }
     if (r === r && i !== i) {
      return true;
     }
     if (i === i && r !== r) {
      return false;
     }
     if (e < t) return true;
     if (e > t) return false;
     if (e == t) return n;
     r = e.toString();
     i = t.toString();
     if (r < i) {
      return true;
     }
     if (r == i) {
      return n;
     }
     return false;
    }
    function o(e, t, n) {
     var r, i, o, s;
     if (!e || !t || e === true || t === true || e !== e || t !== t) {
      switch (e) {
      case undefined:
       o = 1;
       break;

      case null:
       o = 1;
       break;

      case false:
       o = 3;
       break;

      case true:
       o = 4;
       break;

      case "":
       o = 5;
       break;

      default:
       o = e === e ? 9 : 0;
       break;
      }
      switch (t) {
      case undefined:
       s = 1;
       break;

      case null:
       s = 1;
       break;

      case false:
       s = 3;
       break;

      case true:
       s = 4;
       break;

      case "":
       s = 5;
       break;

      default:
       s = t === t ? 9 : 0;
       break;
      }
      if (o !== 9 || s !== 9) {
       return o === s ? n : o > s;
      }
     }
     r = Number(e);
     i = Number(t);
     if (r === r && i === i) {
      if (r > i) return true;
      if (r < i) return false;
      return n;
     }
     if (r === r && i !== i) {
      return false;
     }
     if (i === i && r !== r) {
      return true;
     }
     if (e > t) return true;
     if (e < t) return false;
     if (e == t) return n;
     r = e.toString();
     i = t.toString();
     if (r > i) {
      return true;
     }
     if (r == i) {
      return n;
     }
     return false;
    }
    function s(e, t, n) {
     if (r(e, t)) return 0;
     if (i(e, t, false)) {
      return n ? 1 : -1;
     }
     if (o(e, t, false)) {
      return n ? -1 : 1;
     }
     return 0;
    }
    function a(e, t, n) {
     var r = 0;
     var i, o, a, u, c;
     for (var f = 0, l = e.length; f < l; f++) {
      i = e[f];
      o = i[0];
      if (~o.indexOf(".")) {
       c = o.split(".");
       a = c.reduce(function(e, t) {
        return e && e[t] || undefined;
       }, t);
       u = c.reduce(function(e, t) {
        return e && e[t] || undefined;
       }, n);
      } else {
       a = t[o];
       u = n[o];
      }
      r = s(a, u, i[1]);
      if (r !== 0) {
       return r;
      }
     }
     return 0;
    }
    function u(t, n, r, i, o) {
     var s = o || 0;
     var a = n[s];
     if (t === undefined || t === null || !e.call(t, a)) {
      return false;
     }
     var c = false;
     var f = t[a];
     if (s + 1 >= n.length) {
      c = r(f, i);
     } else if (Array.isArray(f)) {
      for (var l = 0, h = f.length; l < h; l += 1) {
       c = u(f[l], n, r, i, s + 1);
       if (c === true) {
        break;
       }
      }
     } else {
      c = u(f, n, r, i, s + 1);
     }
     return c;
    }
    function c(t) {
     if (typeof t === "string" || Array.isArray(t)) {
      return function(e) {
       return t.indexOf(e) !== -1;
      };
     } else if (typeof t === "object" && t !== null) {
      return function(n) {
       return e.call(t, n);
      };
     }
     return null;
    }
    function f(t, n) {
     for (var r in n) {
      if (e.call(n, r)) {
       return l[r](t, n[r]);
      }
     }
     return false;
    }
    var l = {
     $eq: function(e, t) {
      return e === t;
     },
     $aeq: function(e, t) {
      return e == t;
     },
     $ne: function(e, t) {
      if (t !== t) {
       return e === e;
      }
      return e !== t;
     },
     $dteq: function(e, t) {
      return r(e, t);
     },
     $gt: function(e, t) {
      return o(e, t, false);
     },
     $gte: function(e, t) {
      return o(e, t, true);
     },
     $lt: function(e, t) {
      return i(e, t, false);
     },
     $lte: function(e, t) {
      return i(e, t, true);
     },
     $jgt: function(e, t) {
      return e > t;
     },
     $jgte: function(e, t) {
      return e >= t;
     },
     $jlt: function(e, t) {
      return e < t;
     },
     $jlte: function(e, t) {
      return e <= t;
     },
     $between: function(e, t) {
      if (e === undefined || e === null) return false;
      return o(e, t[0], true) && i(e, t[1], true);
     },
     $jbetween: function(e, t) {
      if (e === undefined || e === null) return false;
      return e >= t[0] && e <= t[1];
     },
     $in: function(e, t) {
      return t.indexOf(e) !== -1;
     },
     $nin: function(e, t) {
      return t.indexOf(e) === -1;
     },
     $keyin: function(e, t) {
      return e in t;
     },
     $nkeyin: function(e, t) {
      return !(e in t);
     },
     $definedin: function(e, t) {
      return t[e] !== undefined;
     },
     $undefinedin: function(e, t) {
      return t[e] === undefined;
     },
     $regex: function(e, t) {
      return t.test(e);
     },
     $containsString: function(e, t) {
      return typeof e === "string" && e.indexOf(t) !== -1;
     },
     $containsNone: function(e, t) {
      return !l.$containsAny(e, t);
     },
     $containsAny: function(e, t) {
      var n = c(e);
      if (n !== null) {
       return Array.isArray(t) ? t.some(n) : n(t);
      }
      return false;
     },
     $contains: function(e, t) {
      var n = c(e);
      if (n !== null) {
       return Array.isArray(t) ? t.every(n) : n(t);
      }
      return false;
     },
     $type: function(e, t) {
      var n = typeof e;
      if (n === "object") {
       if (Array.isArray(e)) {
        n = "array";
       } else if (e instanceof Date) {
        n = "date";
       }
      }
      return typeof t !== "object" ? n === t : f(n, t);
     },
     $finite: function(e, t) {
      return t === isFinite(e);
     },
     $size: function(e, t) {
      if (Array.isArray(e)) {
       return typeof t !== "object" ? e.length === t : f(e.length, t);
      }
      return false;
     },
     $len: function(e, t) {
      if (typeof e === "string") {
       return typeof t !== "object" ? e.length === t : f(e.length, t);
      }
      return false;
     },
     $where: function(e, t) {
      return t(e) === true;
     },
     $not: function(e, t) {
      return !f(e, t);
     },
     $and: function(e, t) {
      for (var n = 0, r = t.length; n < r; n += 1) {
       if (!f(e, t[n])) {
        return false;
       }
      }
      return true;
     },
     $or: function(e, t) {
      for (var n = 0, r = t.length; n < r; n += 1) {
       if (f(e, t[n])) {
        return true;
       }
      }
      return false;
     }
    };
    var h = {
     $eq: l.$eq,
     $aeq: true,
     $dteq: true,
     $gt: true,
     $gte: true,
     $lt: true,
     $lte: true,
     $in: true,
     $between: true
    };
    function d(e, t) {
     if (e === null || e === undefined) {
      return null;
     }
     var n = t || "parse-stringify", r;
     switch (n) {
     case "parse-stringify":
      r = JSON.parse(JSON.stringify(e));
      break;

     case "jquery-extend-deep":
      r = jQuery.extend(true, {}, e);
      break;

     case "shallow":
      r = Object.create(e.constructor.prototype);
      Object.keys(e).map(function(t) {
       r[t] = e[t];
      });
      break;

     case "shallow-assign":
      r = Object.create(e.constructor.prototype);
      Object.assign(r, e);
      break;

     case "shallow-recurse-objects":
      r = d(e, "shallow");
      var i = Object.keys(e);
      i.forEach(function(t) {
       if (typeof e[t] === "object" && e[t].constructor.name === "Object") {
        r[t] = d(e[t], "shallow-recurse-objects");
       }
      });
      break;

     default:
      break;
     }
     return r;
    }
    function p(e, t) {
     var n, r = [];
     if (t == "parse-stringify") {
      return d(e, t);
     }
     n = e.length - 1;
     for (;n <= 0; n--) {
      r.push(d(e[n], t));
     }
     return r;
    }
    function v() {
     try {
      return window && window.localStorage !== undefined && window.localStorage !== null;
     } catch (e) {
      return false;
     }
    }
    function y() {}
    y.prototype.events = {};
    y.prototype.asyncListeners = false;
    y.prototype.on = function(e, t) {
     var n;
     var r = this;
     if (Array.isArray(e)) {
      e.forEach(function(e) {
       r.on(e, t);
      });
      return t;
     }
     n = this.events[e];
     if (!n) {
      n = this.events[e] = [];
     }
     n.push(t);
     return t;
    };
    y.prototype.emit = function(e) {
     var t = this;
     var n = Array.prototype.slice.call(arguments, 1);
     if (e && this.events[e]) {
      this.events[e].forEach(function(e) {
       if (t.asyncListeners) {
        setTimeout(function() {
         e.apply(t, n);
        }, 1);
       } else {
        e.apply(t, n);
       }
      });
     } else {
      throw new Error("No event " + e + " defined");
     }
    };
    y.prototype.addListener = y.prototype.on;
    y.prototype.removeListener = function(e, t) {
     var n = this;
     if (Array.isArray(e)) {
      e.forEach(function(e) {
       n.removeListener(e, t);
      });
      return;
     }
     if (this.events[e]) {
      var r = this.events[e];
      r.splice(r.indexOf(t), 1);
     }
    };
    function g(e, t) {
     this.filename = e || "loki.db";
     this.collections = [];
     this.databaseVersion = 1.5;
     this.engineVersion = 1.5;
     this.autosave = false;
     this.autosaveInterval = 5e3;
     this.autosaveHandle = null;
     this.throttledSaves = true;
     this.options = {};
     this.persistenceMethod = null;
     this.persistenceAdapter = null;
     this.throttledSavePending = false;
     this.throttledCallbacks = [];
     this.verbose = t && t.hasOwnProperty("verbose") ? t.verbose : false;
     this.events = {
      init: [],
      loaded: [],
      flushChanges: [],
      close: [],
      changes: [],
      warning: []
     };
     var n = function() {
      if (typeof global !== "undefined" && (global.android || global.NSObject)) {
       return "NATIVESCRIPT";
      }
      if (typeof window === "undefined") {
       return "NODEJS";
      }
      if (typeof global !== "undefined" && global.window) {
       return "NODEJS";
      }
      if (typeof document !== "undefined") {
       if (document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1) {
        return "CORDOVA";
       }
       return "BROWSER";
      }
      return "CORDOVA";
     };
     if (t && t.hasOwnProperty("env")) {
      this.ENV = t.env;
     } else {
      this.ENV = n();
     }
     if (this.ENV === "undefined") {
      this.ENV = "NODEJS";
     }
     this.configureOptions(t, true);
     this.on("init", this.clearChanges);
    }
    g.prototype = new y();
    g.prototype.constructor = g;
    g.prototype.getIndexedAdapter = function() {
     var e;
     if (true) {
      e = n("pnzC");
     }
     return e;
    };
    g.prototype.configureOptions = function(e, t) {
     var n = {
      NODEJS: "fs",
      BROWSER: "localStorage",
      CORDOVA: "localStorage",
      MEMORY: "memory"
     }, r = {
      fs: w,
      localStorage: _,
      memory: m
     };
     this.options = {};
     this.persistenceMethod = null;
     this.persistenceAdapter = null;
     if (typeof e !== "undefined") {
      this.options = e;
      if (this.options.hasOwnProperty("persistenceMethod")) {
       if (typeof r[e.persistenceMethod] == "function") {
        this.persistenceMethod = e.persistenceMethod;
        this.persistenceAdapter = new r[e.persistenceMethod]();
       }
      }
      if (this.options.hasOwnProperty("adapter")) {
       this.persistenceMethod = "adapter";
       this.persistenceAdapter = e.adapter;
       this.options.adapter = null;
      }
      if (e.autoload && t) {
       var i = this;
       setTimeout(function() {
        i.loadDatabase(e, e.autoloadCallback);
       }, 1);
      }
      if (this.options.hasOwnProperty("autosaveInterval")) {
       this.autosaveDisable();
       this.autosaveInterval = parseInt(this.options.autosaveInterval, 10);
      }
      if (this.options.hasOwnProperty("autosave") && this.options.autosave) {
       this.autosaveDisable();
       this.autosave = true;
       if (this.options.hasOwnProperty("autosaveCallback")) {
        this.autosaveEnable(e, e.autosaveCallback);
       } else {
        this.autosaveEnable();
       }
      }
      if (this.options.hasOwnProperty("throttledSaves")) {
       this.throttledSaves = this.options.throttledSaves;
      }
     }
     if (!this.options.hasOwnProperty("serializationMethod")) {
      this.options.serializationMethod = "normal";
     }
     if (!this.options.hasOwnProperty("destructureDelimiter")) {
      this.options.destructureDelimiter = "$<\n";
     }
     if (this.persistenceAdapter === null) {
      this.persistenceMethod = n[this.ENV];
      if (this.persistenceMethod) {
       this.persistenceAdapter = new r[this.persistenceMethod]();
      }
     }
    };
    g.prototype.copy = function(e) {
     var t = new g(this.filename, {
      env: "NA"
     });
     var n, r;
     e = e || {};
     t.loadJSONObject(this, {
      retainDirtyFlags: true
     });
     if (e.hasOwnProperty("removeNonSerializable") && e.removeNonSerializable === true) {
      t.autosaveHandle = null;
      t.persistenceAdapter = null;
      n = t.collections.length;
      for (r = 0; r < n; r++) {
       t.collections[r].constraints = null;
       t.collections[r].ttl = null;
      }
     }
     return t;
    };
    g.prototype.addCollection = function(e, t) {
     var n, r = this.collections.length;
     if (t && t.disableMeta === true) {
      if (t.disableChangesApi === false) {
       throw new Error("disableMeta option cannot be passed as true when disableChangesApi is passed as false");
      }
      if (t.disableDeltaChangesApi === false) {
       throw new Error("disableMeta option cannot be passed as true when disableDeltaChangesApi is passed as false");
      }
      if (typeof t.ttl === "number" && t.ttl > 0) {
       throw new Error("disableMeta option cannot be passed as true when ttl is enabled");
      }
     }
     for (n = 0; n < r; n += 1) {
      if (this.collections[n].name === e) {
       return this.collections[n];
      }
     }
     var i = new S(e, t);
     this.collections.push(i);
     if (this.verbose) i.console = console;
     return i;
    };
    g.prototype.loadCollection = function(e) {
     if (!e.name) {
      throw new Error("Collection must have a name property to be loaded");
     }
     this.collections.push(e);
    };
    g.prototype.getCollection = function(e) {
     var t, n = this.collections.length;
     for (t = 0; t < n; t += 1) {
      if (this.collections[t].name === e) {
       return this.collections[t];
      }
     }
     this.emit("warning", "collection " + e + " not found");
     return null;
    };
    g.prototype.renameCollection = function(e, t) {
     var n = this.getCollection(e);
     if (n) {
      n.name = t;
     }
     return n;
    };
    g.prototype.listCollections = function() {
     var e = this.collections.length, t = [];
     while (e--) {
      t.push({
       name: this.collections[e].name,
       type: this.collections[e].objType,
       count: this.collections[e].data.length
      });
     }
     return t;
    };
    g.prototype.removeCollection = function(e) {
     var t, n = this.collections.length;
     for (t = 0; t < n; t += 1) {
      if (this.collections[t].name === e) {
       var r = new S(e, {});
       var i = this.collections[t];
       for (var o in i) {
        if (i.hasOwnProperty(o) && r.hasOwnProperty(o)) {
         i[o] = r[o];
        }
       }
       this.collections.splice(t, 1);
       return;
      }
     }
    };
    g.prototype.getName = function() {
     return this.name;
    };
    g.prototype.serializeReplacer = function(e, t) {
     switch (e) {
     case "autosaveHandle":
     case "persistenceAdapter":
     case "constraints":
     case "ttl":
      return null;

     case "throttledSavePending":
     case "throttledCallbacks":
      return undefined;

     default:
      return t;
     }
    };
    g.prototype.serialize = function(e) {
     e = e || {};
     if (!e.hasOwnProperty("serializationMethod")) {
      e.serializationMethod = this.options.serializationMethod;
     }
     switch (e.serializationMethod) {
     case "normal":
      return JSON.stringify(this, this.serializeReplacer);

     case "pretty":
      return JSON.stringify(this, this.serializeReplacer, 2);

     case "destructured":
      return this.serializeDestructured();

     default:
      return JSON.stringify(this, this.serializeReplacer);
     }
    };
    g.prototype.toJson = g.prototype.serialize;
    g.prototype.serializeDestructured = function(e) {
     var t, n, r, i;
     var o = [];
     var s;
     e = e || {};
     if (!e.hasOwnProperty("partitioned")) {
      e.partitioned = false;
     }
     if (!e.hasOwnProperty("delimited")) {
      e.delimited = true;
     }
     if (!e.hasOwnProperty("delimiter")) {
      e.delimiter = this.options.destructureDelimiter;
     }
     if (e.partitioned === true && e.hasOwnProperty("partition") && e.partition >= 0) {
      return this.serializeCollection({
       delimited: e.delimited,
       delimiter: e.delimiter,
       collectionIndex: e.partition
      });
     }
     s = new g(this.filename);
     s.loadJSONObject(this);
     for (t = 0; t < s.collections.length; t++) {
      s.collections[t].data = [];
     }
     if (e.partitioned === true && e.partition === -1) {
      return s.serialize({
       serializationMethod: "normal"
      });
     }
     o.push(s.serialize({
      serializationMethod: "normal"
     }));
     s = null;
     for (t = 0; t < this.collections.length; t++) {
      r = this.serializeCollection({
       delimited: e.delimited,
       delimiter: e.delimiter,
       collectionIndex: t
      });
      if (e.partitioned === false && e.delimited === false) {
       if (!Array.isArray(r)) {
        throw new Error("a nondelimited, non partitioned collection serialization did not return an expected array");
       }
       i = r.length;
       for (n = 0; n < i; n++) {
        o.push(r[n]);
        r[n] = null;
       }
       o.push("");
      } else {
       o.push(r);
      }
     }
     if (e.partitioned) {
      if (e.delimited) {
       return o;
      } else {
       return o;
      }
     } else {
      if (e.delimited) {
       o.push("");
       return o.join(e.delimiter);
      } else {
       o.push("");
       return o;
      }
     }
     o.push("");
     return o.join(delim);
    };
    g.prototype.serializeCollection = function(e) {
     var t, n, r = [];
     e = e || {};
     if (!e.hasOwnProperty("delimited")) {
      e.delimited = true;
     }
     if (!e.hasOwnProperty("collectionIndex")) {
      throw new Error("serializeCollection called without 'collectionIndex' option");
     }
     t = this.collections[e.collectionIndex].data.length;
     r = [];
     for (n = 0; n < t; n++) {
      r.push(JSON.stringify(this.collections[e.collectionIndex].data[n]));
     }
     if (e.delimited) {
      r.push("");
      return r.join(e.delimiter);
     } else {
      return r;
     }
    };
    g.prototype.deserializeDestructured = function(e, t) {
     var n = [];
     var r, i;
     var o, s = 0, a, u = 1, c = false;
     var f, l;
     t = t || {};
     if (!t.hasOwnProperty("partitioned")) {
      t.partitioned = false;
     }
     if (!t.hasOwnProperty("delimited")) {
      t.delimited = true;
     }
     if (!t.hasOwnProperty("delimiter")) {
      t.delimiter = this.options.destructureDelimiter;
     }
     if (t.partitioned) {
      if (t.hasOwnProperty("partition")) {
       if (t.partition === -1) {
        i = JSON.parse(e[0]);
        return i;
       }
       return this.deserializeCollection(e[t.partition + 1], t);
      }
      i = JSON.parse(e[0]);
      a = i.collections.length;
      for (s = 0; s < a; s++) {
       i.collections[s].data = this.deserializeCollection(e[s + 1], t);
      }
      return i;
     }
     if (t.delimited) {
      n = e.split(t.delimiter);
      e = null;
      r = n.length;
      if (r === 0) {
       return null;
      }
     } else {
      n = e;
     }
     i = JSON.parse(n[0]);
     a = i.collections.length;
     n[0] = null;
     while (!c) {
      f = n[u];
      if (n[u] === "") {
       if (++s > a) {
        c = true;
       }
      } else {
       l = JSON.parse(n[u]);
       i.collections[s].data.push(l);
      }
      n[u++] = null;
     }
     return i;
    };
    g.prototype.deserializeCollection = function(e, t) {
     var n = [];
     var r, i;
     t = t || {};
     if (!t.hasOwnProperty("partitioned")) {
      t.partitioned = false;
     }
     if (!t.hasOwnProperty("delimited")) {
      t.delimited = true;
     }
     if (!t.hasOwnProperty("delimiter")) {
      t.delimiter = this.options.destructureDelimiter;
     }
     if (t.delimited) {
      n = e.split(t.delimiter);
      n.pop();
     } else {
      n = e;
     }
     i = n.length;
     for (r = 0; r < i; r++) {
      n[r] = JSON.parse(n[r]);
     }
     return n;
    };
    g.prototype.loadJSON = function(e, t) {
     var n;
     if (e.length === 0) {
      n = {};
     } else {
      switch (this.options.serializationMethod) {
      case "normal":
      case "pretty":
       n = JSON.parse(e);
       break;

      case "destructured":
       n = this.deserializeDestructured(e);
       break;

      default:
       n = JSON.parse(e);
       break;
      }
     }
     this.loadJSONObject(n, t);
    };
    g.prototype.loadJSONObject = function(e, n) {
     var r = 0, i = e.collections ? e.collections.length : 0, o, s, a, u, c, f;
     this.name = e.name;
     if (e.hasOwnProperty("throttledSaves") && n && !n.hasOwnProperty("throttledSaves")) {
      this.throttledSaves = e.throttledSaves;
     }
     this.collections = [];
     function l(e) {
      var r = n[e.name];
      var i;
      if (r.proto) {
       i = r.inflate || t.copyProperties;
       return function(e) {
        var t = new r.proto();
        i(e, t);
        return t;
       };
      }
      return r.inflate;
     }
     for (r; r < i; r += 1) {
      o = e.collections[r];
      s = this.addCollection(o.name, {
       disableChangesApi: o.disableChangesApi,
       disableDeltaChangesApi: o.disableDeltaChangesApi,
       disableMeta: o.disableMeta
      });
      s.adaptiveBinaryIndices = o.hasOwnProperty("adaptiveBinaryIndices") ? o.adaptiveBinaryIndices === true : false;
      s.transactional = o.transactional;
      s.asyncListeners = o.asyncListeners;
      s.cloneObjects = o.cloneObjects;
      s.cloneMethod = o.cloneMethod || "parse-stringify";
      s.autoupdate = o.autoupdate;
      s.changes = o.changes;
      if (n && n.retainDirtyFlags === true) {
       s.dirty = o.dirty;
      } else {
       s.dirty = false;
      }
      a = o.data.length;
      u = 0;
      if (n && n.hasOwnProperty(o.name)) {
       c = l(o);
       for (u; u < a; u++) {
        f = c(o.data[u]);
        s.data[u] = f;
        s.addAutoUpdateObserver(f);
       }
      } else {
       for (u; u < a; u++) {
        s.data[u] = o.data[u];
        s.addAutoUpdateObserver(s.data[u]);
       }
      }
      s.maxId = typeof o.maxId === "undefined" ? 0 : o.maxId;
      s.idIndex = o.idIndex;
      if (typeof o.binaryIndices !== "undefined") {
       s.binaryIndices = o.binaryIndices;
      }
      if (typeof o.transforms !== "undefined") {
       s.transforms = o.transforms;
      }
      s.ensureId();
      s.uniqueNames = [];
      if (o.hasOwnProperty("uniqueNames")) {
       s.uniqueNames = o.uniqueNames;
       for (u = 0; u < s.uniqueNames.length; u++) {
        s.ensureUniqueIndex(s.uniqueNames[u]);
       }
      }
      if (typeof o.DynamicViews === "undefined") continue;
      for (var h = 0; h < o.DynamicViews.length; h++) {
       var d = o.DynamicViews[h];
       var p = s.addDynamicView(d.name, d.options);
       p.resultdata = d.resultdata;
       p.resultsdirty = d.resultsdirty;
       p.filterPipeline = d.filterPipeline;
       p.sortCriteria = d.sortCriteria;
       p.sortFunction = null;
       p.sortDirty = d.sortDirty;
       p.resultset.filteredrows = d.resultset.filteredrows;
       p.resultset.filterInitialized = d.resultset.filterInitialized;
       p.rematerialize({
        removeWhereFilters: true
       });
      }
      if (e.databaseVersion < 1.5) {
       s.ensureAllIndexes(true);
       s.dirty = true;
      }
     }
    };
    g.prototype.close = function(e) {
     if (this.autosave) {
      this.autosaveDisable();
      if (this.autosaveDirty()) {
       this.saveDatabase(e);
       e = undefined;
      }
     }
     if (e) {
      this.on("close", e);
     }
     this.emit("close");
    };
    g.prototype.generateChangesNotification = function(e) {
     function t(e) {
      return e.name;
     }
     var n = [], r = e || this.collections.map(t);
     this.collections.forEach(function(e) {
      if (r.indexOf(t(e)) !== -1) {
       n = n.concat(e.getChanges());
      }
     });
     return n;
    };
    g.prototype.serializeChanges = function(e) {
     return JSON.stringify(this.generateChangesNotification(e));
    };
    g.prototype.clearChanges = function() {
     this.collections.forEach(function(e) {
      if (e.flushChanges) {
       e.flushChanges();
      }
     });
    };
    function m(e) {
     this.hashStore = {};
     this.options = e || {};
     if (!this.options.hasOwnProperty("asyncResponses")) {
      this.options.asyncResponses = false;
     }
     if (!this.options.hasOwnProperty("asyncTimeout")) {
      this.options.asyncTimeout = 50;
     }
    }
    m.prototype.loadDatabase = function(e, t) {
     var n = this;
     if (this.options.asyncResponses) {
      setTimeout(function() {
       if (n.hashStore.hasOwnProperty(e)) {
        t(n.hashStore[e].value);
       } else {
        t(null);
       }
      }, this.options.asyncTimeout);
     } else {
      if (this.hashStore.hasOwnProperty(e)) {
       t(this.hashStore[e].value);
      } else {
       t(null);
      }
     }
    };
    m.prototype.saveDatabase = function(e, t, n) {
     var r = this;
     var i;
     if (this.options.asyncResponses) {
      setTimeout(function() {
       i = r.hashStore.hasOwnProperty(e) ? r.hashStore[e].savecount : 0;
       r.hashStore[e] = {
        savecount: i + 1,
        lastsave: new Date(),
        value: t
       };
       n();
      }, this.options.asyncTimeout);
     } else {
      i = this.hashStore.hasOwnProperty(e) ? this.hashStore[e].savecount : 0;
      this.hashStore[e] = {
       savecount: i + 1,
       lastsave: new Date(),
       value: t
      };
      n();
     }
    };
    m.prototype.deleteDatabase = function(e, t) {
     if (this.hashStore.hasOwnProperty(e)) {
      delete this.hashStore[e];
     }
     if (typeof t === "function") {
      t();
     }
    };
    function b(e, t) {
     this.mode = "reference";
     this.adapter = null;
     this.options = t || {};
     this.dbref = null;
     this.dbname = "";
     this.pageIterator = {};
     if (e) {
      if (e.mode === "reference") {
       throw new Error("LokiPartitioningAdapter cannot be instantiated with a reference mode adapter");
      } else {
       this.adapter = e;
      }
     } else {
      throw new Error("LokiPartitioningAdapter requires a (non-reference mode) adapter on construction");
     }
     if (!this.options.hasOwnProperty("paging")) {
      this.options.paging = false;
     }
     if (!this.options.hasOwnProperty("pageSize")) {
      this.options.pageSize = 25 * 1024 * 1024;
     }
     if (!this.options.hasOwnProperty("delimiter")) {
      this.options.delimiter = "$<\n";
     }
    }
    b.prototype.loadDatabase = function(e, t) {
     var n = this;
     this.dbname = e;
     this.dbref = new g(e);
     this.adapter.loadDatabase(e, function(e) {
      if (!e) {
       t(e);
       return;
      }
      if (typeof e !== "string") {
       t(new Error("LokiPartitioningAdapter received an unexpected response from inner adapter loadDatabase()"));
      }
      var r = JSON.parse(e);
      n.dbref.loadJSONObject(r);
      r = null;
      var i = n.dbref.collections.length;
      if (n.dbref.collections.length === 0) {
       t(n.dbref);
       return;
      }
      n.pageIterator = {
       collection: 0,
       pageIndex: 0
      };
      n.loadNextPartition(0, function() {
       t(n.dbref);
      });
     });
    };
    b.prototype.loadNextPartition = function(e, t) {
     var n = this.dbname + "." + e;
     var r = this;
     if (this.options.paging === true) {
      this.pageIterator.pageIndex = 0;
      this.loadNextPage(t);
      return;
     }
     this.adapter.loadDatabase(n, function(n) {
      var i = r.dbref.deserializeCollection(n, {
       delimited: true,
       collectionIndex: e
      });
      r.dbref.collections[e].data = i;
      if (++e < r.dbref.collections.length) {
       r.loadNextPartition(e, t);
      } else {
       t();
      }
     });
    };
    b.prototype.loadNextPage = function(e) {
     var t = this.dbname + "." + this.pageIterator.collection + "." + this.pageIterator.pageIndex;
     var n = this;
     this.adapter.loadDatabase(t, function(t) {
      var r = t.split(n.options.delimiter);
      t = "";
      var i = r.length;
      var o;
      var s = r[i - 1] === "";
      if (s) {
       r.pop();
       i = r.length;
       if (r[i - 1] === "" && i === 1) {
        r.pop();
        i = r.length;
       }
      }
      for (o = 0; o < i; o++) {
       n.dbref.collections[n.pageIterator.collection].data.push(JSON.parse(r[o]));
       r[o] = null;
      }
      r = [];
      if (s) {
       if (++n.pageIterator.collection < n.dbref.collections.length) {
        n.loadNextPartition(n.pageIterator.collection, e);
       } else {
        e();
       }
      } else {
       n.pageIterator.pageIndex++;
       n.loadNextPage(e);
      }
     });
    };
    b.prototype.exportDatabase = function(e, t, n) {
     var r = this;
     var i, o = t.collections.length;
     this.dbref = t;
     this.dbname = e;
     this.dirtyPartitions = [ -1 ];
     for (i = 0; i < o; i++) {
      if (t.collections[i].dirty) {
       this.dirtyPartitions.push(i);
      }
     }
     this.saveNextPartition(function(e) {
      n(e);
     });
    };
    b.prototype.saveNextPartition = function(e) {
     var t = this;
     var n = this.dirtyPartitions.shift();
     var r = this.dbname + (n === -1 ? "" : "." + n);
     if (this.options.paging && n !== -1) {
      this.pageIterator = {
       collection: n,
       docIndex: 0,
       pageIndex: 0
      };
      this.saveNextPage(function(n) {
       if (t.dirtyPartitions.length === 0) {
        e(n);
       } else {
        t.saveNextPartition(e);
       }
      });
      return;
     }
     var i = this.dbref.serializeDestructured({
      partitioned: true,
      delimited: true,
      partition: n
     });
     this.adapter.saveDatabase(r, i, function(n) {
      if (n) {
       e(n);
       return;
      }
      if (t.dirtyPartitions.length === 0) {
       e(null);
      } else {
       t.saveNextPartition(e);
      }
     });
    };
    b.prototype.saveNextPage = function(e) {
     var t = this;
     var n = this.dbref.collections[this.pageIterator.collection];
     var r = this.dbname + "." + this.pageIterator.collection + "." + this.pageIterator.pageIndex;
     var i = 0, o = n.data.length, s = this.options.delimiter.length;
     var a = "", u = "";
     var c = false, f = false;
     var l = function(n) {
      u = "";
      if (n) {
       e(n);
      }
      if (c) {
       e(null);
      } else {
       t.pageIterator.pageIndex++;
       t.saveNextPage(e);
      }
     };
     if (n.data.length === 0) {
      c = true;
     }
     while (true) {
      if (!c) {
       a = JSON.stringify(n.data[this.pageIterator.docIndex]);
       u += a;
       i += a.length;
       if (++this.pageIterator.docIndex >= o) c = true;
      }
      if (i >= this.options.pageSize) f = true;
      if (!f || c) {
       u += this.options.delimiter;
       i += s;
      }
      if (c || f) {
       this.adapter.saveDatabase(r, u, l);
       return;
      }
     }
    };
    function w() {
     this.fs = n("mw/K");
    }
    w.prototype.loadDatabase = function e(t, n) {
     var r = this;
     this.fs.stat(t, function(e, i) {
      if (!e && i.isFile()) {
       r.fs.readFile(t, {
        encoding: "utf8"
       }, function e(t, r) {
        if (t) {
         n(new Error(t));
        } else {
         n(r);
        }
       });
      } else {
       n(null);
      }
     });
    };
    w.prototype.saveDatabase = function e(t, n, r) {
     var i = this;
     var o = t + "~";
     this.fs.writeFile(o, n, function e(n) {
      if (n) {
       r(new Error(n));
      } else {
       i.fs.rename(o, t, r);
      }
     });
    };
    w.prototype.deleteDatabase = function e(t, n) {
     this.fs.unlink(t, function e(t) {
      if (t) {
       n(new Error(t));
      } else {
       n();
      }
     });
    };
    function _() {}
    _.prototype.loadDatabase = function e(t, n) {
     if (v()) {
      n(localStorage.getItem(t));
     } else {
      n(new Error("localStorage is not available"));
     }
    };
    _.prototype.saveDatabase = function e(t, n, r) {
     if (v()) {
      localStorage.setItem(t, n);
      r(null);
     } else {
      r(new Error("localStorage is not available"));
     }
    };
    _.prototype.deleteDatabase = function e(t, n) {
     if (v()) {
      localStorage.removeItem(t);
      n(null);
     } else {
      n(new Error("localStorage is not available"));
     }
    };
    g.prototype.throttledSaveDrain = function(e, t) {
     var n = this;
     var r = new Date().getTime();
     if (!this.throttledSaves) {
      e(true);
     }
     t = t || {};
     if (!t.hasOwnProperty("recursiveWait")) {
      t.recursiveWait = true;
     }
     if (!t.hasOwnProperty("recursiveWaitLimit")) {
      t.recursiveWaitLimit = false;
     }
     if (!t.hasOwnProperty("recursiveWaitLimitDuration")) {
      t.recursiveWaitLimitDuration = 2e3;
     }
     if (!t.hasOwnProperty("started")) {
      t.started = new Date().getTime();
     }
     if (this.throttledSaves && this.throttledSavePending) {
      if (t.recursiveWait) {
       this.throttledCallbacks.push(function() {
        if (n.throttledSavePending) {
         if (t.recursiveWaitLimit && r - t.started > t.recursiveWaitLimitDuration) {
          e(false);
          return;
         }
         n.throttledSaveDrain(e, t);
         return;
        } else {
         e(true);
         return;
        }
       });
      } else {
       this.throttledCallbacks.push(e);
       return;
      }
     } else {
      e(true);
     }
    };
    g.prototype.loadDatabaseInternal = function(e, t) {
     var n = t || function(e, t) {
      if (e) {
       throw e;
      }
     }, r = this;
     if (this.persistenceAdapter !== null) {
      this.persistenceAdapter.loadDatabase(this.filename, function t(i) {
       if (typeof i === "string") {
        var o = false;
        try {
         r.loadJSON(i, e || {});
         o = true;
        } catch (e) {
         n(e);
        }
        if (o) {
         n(null);
         r.emit("loaded", "database " + r.filename + " loaded");
        }
       } else {
        if (!i) {
         n(null);
         r.emit("loaded", "empty database " + r.filename + " loaded");
         return;
        }
        if (i instanceof Error) {
         n(i);
         return;
        }
        if (typeof i === "object") {
         r.loadJSONObject(i, e || {});
         n(null);
         r.emit("loaded", "database " + r.filename + " loaded");
         return;
        }
        n("unexpected adapter response : " + i);
       }
      });
     } else {
      n(new Error("persistenceAdapter not configured"));
     }
    };
    g.prototype.loadDatabase = function(e, t) {
     var n = this;
     if (!this.throttledSaves) {
      this.loadDatabaseInternal(e, t);
      return;
     }
     this.throttledSaveDrain(function(r) {
      if (r) {
       n.throttledSavePending = true;
       n.loadDatabaseInternal(e, function(e) {
        if (n.throttledCallbacks.length === 0) {
         n.throttledSavePending = false;
        } else {
         n.saveDatabase();
        }
        if (typeof t === "function") {
         t(e);
        }
       });
       return;
      } else {
       if (typeof t === "function") {
        t(new Error("Unable to pause save throttling long enough to read database"));
       }
      }
     }, e);
    };
    g.prototype.saveDatabaseInternal = function(e) {
     var t = e || function(e) {
      if (e) {
       throw e;
      }
      return;
     }, n = this;
     if (this.persistenceAdapter !== null) {
      if (this.persistenceAdapter.mode === "reference" && typeof this.persistenceAdapter.exportDatabase === "function") {
       this.persistenceAdapter.exportDatabase(this.filename, this.copy({
        removeNonSerializable: true
       }), function e(r) {
        n.autosaveClearFlags();
        t(r);
       });
      } else {
       n.autosaveClearFlags();
       this.persistenceAdapter.saveDatabase(this.filename, n.serialize(), function e(n) {
        t(n);
       });
      }
     } else {
      t(new Error("persistenceAdapter not configured"));
     }
    };
    g.prototype.saveDatabase = function(e) {
     if (!this.throttledSaves) {
      this.saveDatabaseInternal(e);
      return;
     }
     if (this.throttledSavePending) {
      this.throttledCallbacks.push(e);
      return;
     }
     var t = this.throttledCallbacks;
     this.throttledCallbacks = [];
     t.unshift(e);
     this.throttledSavePending = true;
     var n = this;
     this.saveDatabaseInternal(function(e) {
      n.throttledSavePending = false;
      t.forEach(function(t) {
       if (typeof t === "function") {
        setTimeout(function() {
         t(e);
        }, 1);
       }
      });
      if (n.throttledCallbacks.length > 0) {
       n.saveDatabase();
      }
     });
    };
    g.prototype.save = g.prototype.saveDatabase;
    g.prototype.deleteDatabase = function(e, t) {
     var n = t || function(e, t) {
      if (e) {
       throw e;
      }
     };
     if (typeof e === "function" && !t) {
      n = e;
     }
     if (this.persistenceAdapter !== null) {
      this.persistenceAdapter.deleteDatabase(this.filename, function e(t) {
       n(t);
      });
     } else {
      n(new Error("persistenceAdapter not configured"));
     }
    };
    g.prototype.autosaveDirty = function() {
     for (var e = 0; e < this.collections.length; e++) {
      if (this.collections[e].dirty) {
       return true;
      }
     }
     return false;
    };
    g.prototype.autosaveClearFlags = function() {
     for (var e = 0; e < this.collections.length; e++) {
      this.collections[e].dirty = false;
     }
    };
    g.prototype.autosaveEnable = function(e, t) {
     this.autosave = true;
     var n = 5e3, r = this;
     if (typeof this.autosaveInterval !== "undefined" && this.autosaveInterval !== null) {
      n = this.autosaveInterval;
     }
     this.autosaveHandle = setInterval(function e() {
      if (r.autosaveDirty()) {
       r.saveDatabase(t);
      }
     }, n);
    };
    g.prototype.autosaveDisable = function() {
     if (typeof this.autosaveHandle !== "undefined" && this.autosaveHandle !== null) {
      clearInterval(this.autosaveHandle);
      this.autosaveHandle = null;
     }
    };
    function x(e, t) {
     t = t || {};
     this.collection = e;
     this.filteredrows = [];
     this.filterInitialized = false;
     return this;
    }
    x.prototype.reset = function() {
     if (this.filteredrows.length > 0) {
      this.filteredrows = [];
     }
     this.filterInitialized = false;
     return this;
    };
    x.prototype.toJSON = function() {
     var e = this.copy();
     e.collection = null;
     return e;
    };
    x.prototype.limit = function(e) {
     if (!this.filterInitialized && this.filteredrows.length === 0) {
      this.filteredrows = this.collection.prepareFullDocIndex();
     }
     var t = new x(this.collection);
     t.filteredrows = this.filteredrows.slice(0, e);
     t.filterInitialized = true;
     return t;
    };
    x.prototype.offset = function(e) {
     if (!this.filterInitialized && this.filteredrows.length === 0) {
      this.filteredrows = this.collection.prepareFullDocIndex();
     }
     var t = new x(this.collection);
     t.filteredrows = this.filteredrows.slice(e);
     t.filterInitialized = true;
     return t;
    };
    x.prototype.copy = function() {
     var e = new x(this.collection);
     if (this.filteredrows.length > 0) {
      e.filteredrows = this.filteredrows.slice();
     }
     e.filterInitialized = this.filterInitialized;
     return e;
    };
    x.prototype.branch = x.prototype.copy;
    x.prototype.transform = function(e, n) {
     var r, i, o = this;
     if (typeof e === "string") {
      if (this.collection.transforms.hasOwnProperty(e)) {
       e = this.collection.transforms[e];
      }
     }
     if (typeof e !== "object" || !Array.isArray(e)) {
      throw new Error("Invalid transform");
     }
     if (typeof n !== "undefined") {
      e = t.resolveTransformParams(e, n);
     }
     for (r = 0; r < e.length; r++) {
      i = e[r];
      switch (i.type) {
      case "find":
       o.find(i.value);
       break;

      case "where":
       o.where(i.value);
       break;

      case "simplesort":
       o.simplesort(i.property, i.desc || i.options);
       break;

      case "compoundsort":
       o.compoundsort(i.value);
       break;

      case "sort":
       o.sort(i.value);
       break;

      case "limit":
       o = o.limit(i.value);
       break;

      case "offset":
       o = o.offset(i.value);
       break;

      case "map":
       o = o.map(i.value, i.dataOptions);
       break;

      case "eqJoin":
       o = o.eqJoin(i.joinData, i.leftJoinKey, i.rightJoinKey, i.mapFun, i.dataOptions);
       break;

      case "mapReduce":
       o = o.mapReduce(i.mapFunction, i.reduceFunction);
       break;

      case "update":
       o.update(i.value);
       break;

      case "remove":
       o.remove();
       break;

      default:
       break;
      }
     }
     return o;
    };
    x.prototype.sort = function(e) {
     if (!this.filterInitialized && this.filteredrows.length === 0) {
      this.filteredrows = this.collection.prepareFullDocIndex();
     }
     var t = function(e, t) {
      return function(n, r) {
       return e(t[n], t[r]);
      };
     }(e, this.collection.data);
     this.filteredrows.sort(t);
     return this;
    };
    x.prototype.simplesort = function(e, t) {
     var n, r = this.collection.data.length, i = this.filteredrows.length, o = this.collection.binaryIndices.hasOwnProperty(e);
     if (typeof t === "undefined" || t === false) {
      t = {
       desc: false
      };
     }
     if (t === true) {
      t = {
       desc: true
      };
     }
     if (i === 0) {
      if (this.filterInitialized) {
       return this;
      }
      if (this.collection.binaryIndices.hasOwnProperty(e)) {
       this.collection.ensureIndex(e);
       this.filteredrows = this.collection.binaryIndices[e].values.slice(0);
       if (t.desc) {
        this.filteredrows.reverse();
       }
       return this;
      } else {
       this.filteredrows = this.collection.prepareFullDocIndex();
      }
     } else {
      if (!t.disableIndexIntersect && o) {
       n = r / i;
       if (n <= 10 || t.forceIndexIntersect) {
        var a, u = this.filteredrows;
        var c = {};
        for (a = 0; a < i; a++) {
         c[u[a]] = true;
        }
        var f = this.collection.binaryIndices[e].values;
        this.filteredrows = f.filter(function(e) {
         return c[e];
        });
        if (t.desc) {
         this.filteredrows.reverse();
        }
        return this;
       }
      }
     }
     if (t.useJavascriptSorting) {
      return this.sort(function(t, n) {
       if (t[e] === n[e]) return 0;
       if (t[e] > n[e]) return 1;
       if (t[e] < n[e]) return -1;
      });
     }
     var l = function(e, t, n) {
      var r, i, o;
      return function(a, u) {
       if (~e.indexOf(".")) {
        o = e.split(".");
        r = o.reduce(function(e, t) {
         return e && e[t] || undefined;
        }, n[a]);
        i = o.reduce(function(e, t) {
         return e && e[t] || undefined;
        }, n[u]);
       } else {
        r = n[a][e];
        i = n[u][e];
       }
       return s(r, i, t);
      };
     }(e, t.desc, this.collection.data);
     this.filteredrows.sort(l);
     return this;
    };
    x.prototype.compoundsort = function(e) {
     if (e.length === 0) {
      throw new Error("Invalid call to compoundsort, need at least one property");
     }
     var t;
     if (e.length === 1) {
      t = e[0];
      if (Array.isArray(t)) {
       return this.simplesort(t[0], t[1]);
      }
      return this.simplesort(t, false);
     }
     for (var n = 0, r = e.length; n < r; n += 1) {
      t = e[n];
      if (!Array.isArray(t)) {
       e[n] = [ t, false ];
      }
     }
     if (!this.filterInitialized && this.filteredrows.length === 0) {
      this.filteredrows = this.collection.prepareFullDocIndex();
     }
     var i = function(e, t) {
      return function(n, r) {
       return a(e, t[n], t[r]);
      };
     }(e, this.collection.data);
     this.filteredrows.sort(i);
     return this;
    };
    x.prototype.findOr = function(e) {
     var t = null, n = 0, r = 0, i = [], o = [], s = 0, a = this.count();
     for (var u = 0, c = e.length; u < c; u++) {
      t = this.branch().find(e[u]).filteredrows;
      r = t.length;
      if (r === a) {
       return this;
      }
      for (n = 0; n < r; n++) {
       s = t[n];
       if (o[s] === undefined) {
        o[s] = true;
        i.push(s);
       }
      }
     }
     this.filteredrows = i;
     this.filterInitialized = true;
     return this;
    };
    x.prototype.$or = x.prototype.findOr;
    x.prototype.findAnd = function(e) {
     for (var t = 0, n = e.length; t < n; t++) {
      if (this.count() === 0) {
       return this;
      }
      this.find(e[t]);
     }
     return this;
    };
    x.prototype.$and = x.prototype.findAnd;
    x.prototype.find = function(t, n) {
     if (this.collection.data.length === 0) {
      this.filteredrows = [];
      this.filterInitialized = true;
      return this;
     }
     var r = t || "getAll", i, o, s, a, c, f, d, p = false, v = [], y = [], g = null;
     n = n || false;
     if (typeof r === "object") {
      for (i in r) {
       a = {};
       a[i] = r[i];
       y.push(a);
       if (e.call(r, i)) {
        o = i;
        s = r[i];
       }
      }
      if (y.length > 1) {
       return this.find({
        $and: y
       }, n);
      }
     }
     if (!o || r === "getAll") {
      if (n) {
       this.filteredrows = this.collection.data.length > 0 ? [ 0 ] : [];
       this.filterInitialized = true;
      }
      return this;
     }
     if (o === "$and" || o === "$or") {
      this[o](s);
      if (n && this.filteredrows.length > 1) {
       this.filteredrows = this.filteredrows.slice(0, 1);
      }
      return this;
     }
     if (s === null || (typeof s !== "object" || s instanceof Date)) {
      c = "$eq";
      f = s;
     } else if (typeof s === "object") {
      for (d in s) {
       if (e.call(s, d)) {
        c = d;
        f = s[d];
        break;
       }
      }
     } else {
      throw new Error("Do not know what you want to do.");
     }
     if (c === "$regex") {
      if (Array.isArray(f)) {
       f = new RegExp(f[0], f[1]);
      } else if (!(f instanceof RegExp)) {
       f = new RegExp(f);
      }
     }
     var m = o.indexOf(".") !== -1;
     var b = !m && !this.filterInitialized;
     if (b && this.collection.binaryIndices[o] && h[c]) {
      if (this.collection.adaptiveBinaryIndices !== true) {
       this.collection.ensureIndex(o);
      }
      p = true;
      g = this.collection.binaryIndices[o];
     }
     var w = l[c];
     var _ = this.collection.data;
     var x = 0, O = 0;
     var S, k = 0;
     if (this.filterInitialized) {
      S = this.filteredrows;
      O = S.length;
      if (m) {
       o = o.split(".");
       for (x = 0; x < O; x++) {
        k = S[x];
        if (u(_[k], o, w, f)) {
         v.push(k);
        }
       }
      } else {
       for (x = 0; x < O; x++) {
        k = S[x];
        if (w(_[k][o], f)) {
         v.push(k);
        }
       }
      }
     } else {
      if (!p) {
       O = _.length;
       if (m) {
        o = o.split(".");
        for (x = 0; x < O; x++) {
         if (u(_[x], o, w, f)) {
          v.push(x);
          if (n) {
           this.filteredrows = v;
           this.filterInitialized = true;
           return this;
          }
         }
        }
       } else {
        for (x = 0; x < O; x++) {
         if (w(_[x][o], f)) {
          v.push(x);
          if (n) {
           this.filteredrows = v;
           this.filterInitialized = true;
           return this;
          }
         }
        }
       }
      } else {
       var C = this.collection.calculateRange(c, o, f);
       if (c !== "$in") {
        for (x = C[0]; x <= C[1]; x++) {
         if (h[c] !== true) {
          if (h[c](_[g.values[x]][o], f)) {
           v.push(g.values[x]);
           if (n) {
            this.filteredrows = v;
            this.filterInitialized = true;
            return this;
           }
          }
         } else {
          v.push(g.values[x]);
          if (n) {
           this.filteredrows = v;
           this.filterInitialized = true;
           return this;
          }
         }
        }
       } else {
        for (x = 0, O = C.length; x < O; x++) {
         v.push(g.values[C[x]]);
         if (n) {
          this.filteredrows = v;
          this.filterInitialized = true;
          return this;
         }
        }
       }
      }
     }
     this.filteredrows = v;
     this.filterInitialized = true;
     return this;
    };
    x.prototype.where = function(e) {
     var t, n = [];
     if ("function" === typeof e) {
      t = e;
     } else {
      throw new TypeError("Argument is not a stored view or a function");
     }
     try {
      if (this.filterInitialized) {
       var r = this.filteredrows.length;
       while (r--) {
        if (t(this.collection.data[this.filteredrows[r]]) === true) {
         n.push(this.filteredrows[r]);
        }
       }
       this.filteredrows = n;
       return this;
      } else {
       var i = this.collection.data.length;
       while (i--) {
        if (t(this.collection.data[i]) === true) {
         n.push(i);
        }
       }
       this.filteredrows = n;
       this.filterInitialized = true;
       return this;
      }
     } catch (e) {
      throw e;
     }
    };
    x.prototype.count = function() {
     if (this.filterInitialized) {
      return this.filteredrows.length;
     }
     return this.collection.count();
    };
    x.prototype.data = function(e) {
     var t = [], n = this.collection.data, r, i, o, s;
     e = e || {};
     if (e.removeMeta && !e.forceClones) {
      e.forceClones = true;
      e.forceCloneMethod = e.forceCloneMethod || "shallow";
     }
     if (!this.collection.disableDeltaChangesApi) {
      e.forceClones = true;
      e.forceCloneMethod = "parse-stringify";
     }
     if (!this.filterInitialized) {
      if (this.filteredrows.length === 0) {
       if (this.collection.cloneObjects || e.forceClones) {
        i = n.length;
        s = e.forceCloneMethod || this.collection.cloneMethod;
        for (o = 0; o < i; o++) {
         r = d(n[o], s);
         if (e.removeMeta) {
          delete r.$loki;
          delete r.meta;
         }
         t.push(r);
        }
        return t;
       } else {
        return n.slice();
       }
      } else {
       this.filterInitialized = true;
      }
     }
     var a = this.filteredrows;
     i = a.length;
     if (this.collection.cloneObjects || e.forceClones) {
      s = e.forceCloneMethod || this.collection.cloneMethod;
      for (o = 0; o < i; o++) {
       r = d(n[a[o]], s);
       if (e.removeMeta) {
        delete r.$loki;
        delete r.meta;
       }
       t.push(r);
      }
     } else {
      for (o = 0; o < i; o++) {
       t.push(n[a[o]]);
      }
     }
     return t;
    };
    x.prototype.update = function(e) {
     if (typeof e !== "function") {
      throw new TypeError("Argument is not a function");
     }
     if (!this.filterInitialized && this.filteredrows.length === 0) {
      this.filteredrows = this.collection.prepareFullDocIndex();
     }
     var t = this.filteredrows.length, n = this.collection.data;
     for (var r = 0; r < t; r++) {
      e(n[this.filteredrows[r]]);
      this.collection.update(n[this.filteredrows[r]]);
     }
     return this;
    };
    x.prototype.remove = function() {
     if (!this.filterInitialized && this.filteredrows.length === 0) {
      this.filteredrows = this.collection.prepareFullDocIndex();
     }
     this.collection.remove(this.data());
     this.filteredrows = [];
     return this;
    };
    x.prototype.mapReduce = function(e, t) {
     try {
      return t(this.data().map(e));
     } catch (e) {
      throw e;
     }
    };
    x.prototype.eqJoin = function(e, t, n, r, i) {
     var o = [], s, a = [], u, c, f = [], l = typeof t === "function", h = typeof n === "function", d = {};
     o = this.data(i);
     s = o.length;
     if (e instanceof S) {
      a = e.chain().data(i);
     } else if (e instanceof x) {
      a = e.data(i);
     } else if (Array.isArray(e)) {
      a = e;
     } else {
      throw new TypeError("joinData needs to be an array or result set");
     }
     u = a.length;
     for (var p = 0; p < u; p++) {
      c = h ? n(a[p]) : a[p][n];
      d[c] = a[p];
     }
     if (!r) {
      r = function(e, t) {
       return {
        left: e,
        right: t
       };
      };
     }
     for (var v = 0; v < s; v++) {
      c = l ? t(o[v]) : o[v][t];
      f.push(r(o[v], d[c] || {}));
     }
     this.collection = new S("joinData");
     this.collection.insert(f);
     this.filteredrows = [];
     this.filterInitialized = false;
     return this;
    };
    x.prototype.map = function(e, t) {
     var n = this.data(t).map(e);
     this.collection = new S("mappedData");
     this.collection.insert(n);
     this.filteredrows = [];
     this.filterInitialized = false;
     return this;
    };
    function O(e, t, n) {
     this.collection = e;
     this.name = t;
     this.rebuildPending = false;
     this.options = n || {};
     if (!this.options.hasOwnProperty("persistent")) {
      this.options.persistent = false;
     }
     if (!this.options.hasOwnProperty("sortPriority")) {
      this.options.sortPriority = "passive";
     }
     if (!this.options.hasOwnProperty("minRebuildInterval")) {
      this.options.minRebuildInterval = 1;
     }
     this.resultset = new x(e);
     this.resultdata = [];
     this.resultsdirty = false;
     this.cachedresultset = null;
     this.filterPipeline = [];
     this.sortFunction = null;
     this.sortCriteria = null;
     this.sortDirty = false;
     this.events = {
      rebuild: []
     };
    }
    O.prototype = new y();
    O.prototype.rematerialize = function(e) {
     var t, n, r;
     e = e || {};
     this.resultdata = [];
     this.resultsdirty = true;
     this.resultset = new x(this.collection);
     if (this.sortFunction || this.sortCriteria) {
      this.sortDirty = true;
     }
     if (e.hasOwnProperty("removeWhereFilters")) {
      t = this.filterPipeline.length;
      n = t;
      while (n--) {
       if (this.filterPipeline[n].type === "where") {
        if (n !== this.filterPipeline.length - 1) {
         this.filterPipeline[n] = this.filterPipeline[this.filterPipeline.length - 1];
        }
        this.filterPipeline.length--;
       }
      }
     }
     var i = this.filterPipeline;
     this.filterPipeline = [];
     t = i.length;
     for (r = 0; r < t; r++) {
      this.applyFind(i[r].val);
     }
     this.data();
     this.emit("rebuild", this);
     return this;
    };
    O.prototype.branchResultset = function(e, t) {
     var n = this.resultset.branch();
     if (typeof e === "undefined") {
      return n;
     }
     return n.transform(e, t);
    };
    O.prototype.toJSON = function() {
     var e = new O(this.collection, this.name, this.options);
     e.resultset = this.resultset;
     e.resultdata = [];
     e.resultsdirty = true;
     e.filterPipeline = this.filterPipeline;
     e.sortFunction = this.sortFunction;
     e.sortCriteria = this.sortCriteria;
     e.sortDirty = this.sortDirty;
     e.collection = null;
     return e;
    };
    O.prototype.removeFilters = function(e) {
     e = e || {};
     this.rebuildPending = false;
     this.resultset.reset();
     this.resultdata = [];
     this.resultsdirty = true;
     this.cachedresultset = null;
     this.filterPipeline = [];
     this.sortFunction = null;
     this.sortCriteria = null;
     this.sortDirty = false;
     if (e.queueSortPhase === true) {
      this.queueSortPhase();
     }
    };
    O.prototype.applySort = function(e) {
     this.sortFunction = e;
     this.sortCriteria = null;
     this.queueSortPhase();
     return this;
    };
    O.prototype.applySimpleSort = function(e, t) {
     this.sortCriteria = [ [ e, t || false ] ];
     this.sortFunction = null;
     this.queueSortPhase();
     return this;
    };
    O.prototype.applySortCriteria = function(e) {
     this.sortCriteria = e;
     this.sortFunction = null;
     this.queueSortPhase();
     return this;
    };
    O.prototype.startTransaction = function() {
     this.cachedresultset = this.resultset.copy();
     return this;
    };
    O.prototype.commit = function() {
     this.cachedresultset = null;
     return this;
    };
    O.prototype.rollback = function() {
     this.resultset = this.cachedresultset;
     if (this.options.persistent) {
      this.resultdata = this.resultset.data();
      this.emit("rebuild", this);
     }
     return this;
    };
    O.prototype._indexOfFilterWithId = function(e) {
     if (typeof e === "string" || typeof e === "number") {
      for (var t = 0, n = this.filterPipeline.length; t < n; t += 1) {
       if (e === this.filterPipeline[t].uid) {
        return t;
       }
      }
     }
     return -1;
    };
    O.prototype._addFilter = function(e) {
     this.filterPipeline.push(e);
     this.resultset[e.type](e.val);
    };
    O.prototype.reapplyFilters = function() {
     this.resultset.reset();
     this.cachedresultset = null;
     if (this.options.persistent) {
      this.resultdata = [];
      this.resultsdirty = true;
     }
     var e = this.filterPipeline;
     this.filterPipeline = [];
     for (var t = 0, n = e.length; t < n; t += 1) {
      this._addFilter(e[t]);
     }
     if (this.sortFunction || this.sortCriteria) {
      this.queueSortPhase();
     } else {
      this.queueRebuildEvent();
     }
     return this;
    };
    O.prototype.applyFilter = function(e) {
     var t = this._indexOfFilterWithId(e.uid);
     if (t >= 0) {
      this.filterPipeline[t] = e;
      return this.reapplyFilters();
     }
     this.cachedresultset = null;
     if (this.options.persistent) {
      this.resultdata = [];
      this.resultsdirty = true;
     }
     this._addFilter(e);
     if (this.sortFunction || this.sortCriteria) {
      this.queueSortPhase();
     } else {
      this.queueRebuildEvent();
     }
     return this;
    };
    O.prototype.applyFind = function(e, t) {
     this.applyFilter({
      type: "find",
      val: e,
      uid: t
     });
     return this;
    };
    O.prototype.applyWhere = function(e, t) {
     this.applyFilter({
      type: "where",
      val: e,
      uid: t
     });
     return this;
    };
    O.prototype.removeFilter = function(e) {
     var t = this._indexOfFilterWithId(e);
     if (t < 0) {
      throw new Error("Dynamic view does not contain a filter with ID: " + e);
     }
     this.filterPipeline.splice(t, 1);
     this.reapplyFilters();
     return this;
    };
    O.prototype.count = function() {
     if (this.resultsdirty) {
      this.resultdata = this.resultset.data();
     }
     return this.resultset.count();
    };
    O.prototype.data = function(e) {
     if (this.sortDirty || this.resultsdirty) {
      this.performSortPhase({
       suppressRebuildEvent: true
      });
     }
     return this.options.persistent ? this.resultdata : this.resultset.data(e);
    };
    O.prototype.queueRebuildEvent = function() {
     if (this.rebuildPending) {
      return;
     }
     this.rebuildPending = true;
     var e = this;
     setTimeout(function() {
      if (e.rebuildPending) {
       e.rebuildPending = false;
       e.emit("rebuild", e);
      }
     }, this.options.minRebuildInterval);
    };
    O.prototype.queueSortPhase = function() {
     if (this.sortDirty) {
      return;
     }
     this.sortDirty = true;
     var e = this;
     if (this.options.sortPriority === "active") {
      setTimeout(function() {
       e.performSortPhase();
      }, this.options.minRebuildInterval);
     } else {
      this.queueRebuildEvent();
     }
    };
    O.prototype.performSortPhase = function(e) {
     if (!this.sortDirty && !this.resultsdirty) {
      return;
     }
     e = e || {};
     if (this.sortDirty) {
      if (this.sortFunction) {
       this.resultset.sort(this.sortFunction);
      } else if (this.sortCriteria) {
       this.resultset.compoundsort(this.sortCriteria);
      }
      this.sortDirty = false;
     }
     if (this.options.persistent) {
      this.resultdata = this.resultset.data();
      this.resultsdirty = false;
     }
     if (!e.suppressRebuildEvent) {
      this.emit("rebuild", this);
     }
    };
    O.prototype.evaluateDocument = function(e, t) {
     if (!this.resultset.filterInitialized) {
      if (this.options.persistent) {
       this.resultdata = this.resultset.data();
      }
      if (this.sortFunction || this.sortCriteria) {
       this.queueSortPhase();
      } else {
       this.queueRebuildEvent();
      }
      return;
     }
     var n = this.resultset.filteredrows;
     var r = t ? -1 : n.indexOf(+e);
     var i = n.length;
     var o = new x(this.collection);
     o.filteredrows = [ e ];
     o.filterInitialized = true;
     var s;
     for (var a = 0, u = this.filterPipeline.length; a < u; a++) {
      s = this.filterPipeline[a];
      o[s.type](s.val);
     }
     var c = o.filteredrows.length === 0 ? -1 : 0;
     if (r === -1 && c === -1) return;
     if (r === -1 && c !== -1) {
      n.push(e);
      if (this.options.persistent) {
       this.resultdata.push(this.collection.data[e]);
      }
      if (this.sortFunction || this.sortCriteria) {
       this.queueSortPhase();
      } else {
       this.queueRebuildEvent();
      }
      return;
     }
     if (r !== -1 && c === -1) {
      if (r < i - 1) {
       n.splice(r, 1);
       if (this.options.persistent) {
        this.resultdata.splice(r, 1);
       }
      } else {
       n.length = i - 1;
       if (this.options.persistent) {
        this.resultdata.length = i - 1;
       }
      }
      if (this.sortFunction || this.sortCriteria) {
       this.queueSortPhase();
      } else {
       this.queueRebuildEvent();
      }
      return;
     }
     if (r !== -1 && c !== -1) {
      if (this.options.persistent) {
       this.resultdata[r] = this.collection.data[e];
      }
      if (this.sortFunction || this.sortCriteria) {
       this.queueSortPhase();
      } else {
       this.queueRebuildEvent();
      }
      return;
     }
    };
    O.prototype.removeDocument = function(e) {
     if (!this.resultset.filterInitialized) {
      if (this.options.persistent) {
       this.resultdata = this.resultset.data();
      }
      if (this.sortFunction || this.sortCriteria) {
       this.queueSortPhase();
      } else {
       this.queueRebuildEvent();
      }
      return;
     }
     var t = this.resultset.filteredrows;
     var n = t.indexOf(+e);
     var r = t.length;
     var i;
     if (n !== -1) {
      if (n < r - 1) {
       t[n] = t[r - 1];
       t.length = r - 1;
       if (this.options.persistent) {
        this.resultdata[n] = this.resultdata[r - 1];
        this.resultdata.length = r - 1;
       }
      } else {
       t.length = r - 1;
       if (this.options.persistent) {
        this.resultdata.length = r - 1;
       }
      }
      if (this.sortFunction || this.sortCriteria) {
       this.queueSortPhase();
      } else {
       this.queueRebuildEvent();
      }
     }
     r = t.length;
     for (i = 0; i < r; i++) {
      if (t[i] > e) {
       t[i]--;
      }
     }
    };
    O.prototype.mapReduce = function(e, t) {
     try {
      return t(this.data().map(e));
     } catch (e) {
      throw e;
     }
    };
    function S(t, n) {
     this.name = t;
     this.data = [];
     this.idIndex = [];
     this.binaryIndices = {};
     this.constraints = {
      unique: {},
      exact: {}
     };
     this.uniqueNames = [];
     this.transforms = {};
     this.objType = t;
     this.dirty = true;
     this.cachedIndex = null;
     this.cachedBinaryIndex = null;
     this.cachedData = null;
     var r = this;
     n = n || {};
     if (n.hasOwnProperty("unique")) {
      if (!Array.isArray(n.unique)) {
       n.unique = [ n.unique ];
      }
      n.unique.forEach(function(e) {
       r.uniqueNames.push(e);
       r.constraints.unique[e] = new N(e);
      });
     }
     if (n.hasOwnProperty("exact")) {
      n.exact.forEach(function(e) {
       r.constraints.exact[e] = new L(e);
      });
     }
     this.adaptiveBinaryIndices = n.hasOwnProperty("adaptiveBinaryIndices") ? n.adaptiveBinaryIndices : true;
     this.transactional = n.hasOwnProperty("transactional") ? n.transactional : false;
     this.cloneObjects = n.hasOwnProperty("clone") ? n.clone : false;
     this.cloneMethod = n.hasOwnProperty("cloneMethod") ? n.cloneMethod : "parse-stringify";
     this.asyncListeners = n.hasOwnProperty("asyncListeners") ? n.asyncListeners : false;
     this.disableMeta = n.hasOwnProperty("disableMeta") ? n.disableMeta : false;
     this.disableChangesApi = n.hasOwnProperty("disableChangesApi") ? n.disableChangesApi : true;
     this.disableDeltaChangesApi = n.hasOwnProperty("disableDeltaChangesApi") ? n.disableDeltaChangesApi : true;
     if (this.disableChangesApi) {
      this.disableDeltaChangesApi = true;
     }
     this.autoupdate = n.hasOwnProperty("autoupdate") ? n.autoupdate : false;
     this.serializableIndices = n.hasOwnProperty("serializableIndices") ? n.serializableIndices : true;
     this.ttl = {
      age: null,
      ttlInterval: null,
      daemon: null
     };
     this.setTTL(n.ttl || -1, n.ttlInterval);
     this.maxId = 0;
     this.DynamicViews = [];
     this.events = {
      insert: [],
      update: [],
      "pre-insert": [],
      "pre-update": [],
      close: [],
      flushbuffer: [],
      error: [],
      delete: [],
      warning: []
     };
     this.changes = [];
     this.ensureId();
     var i = [];
     if (n && n.indices) {
      if (Object.prototype.toString.call(n.indices) === "[object Array]") {
       i = n.indices;
      } else if (typeof n.indices === "string") {
       i = [ n.indices ];
      } else {
       throw new TypeError("Indices needs to be a string or an array of strings");
      }
     }
     for (var o = 0; o < i.length; o++) {
      this.ensureIndex(i[o]);
     }
     function s(t) {
      var n = typeof Set === "function" ? new Set() : [];
      if (!n.add) n.add = function(e) {
       if (this.indexOf(e) === -1) this.push(e);
       return this;
      };
      t.forEach(function(e) {
       n.add(e.object);
      });
      n.forEach(function(t) {
       if (!e.call(t, "$loki")) return r.removeAutoUpdateObserver(t);
       try {
        r.update(t);
       } catch (e) {}
      });
     }
     this.observerCallback = s;
     function a(e, t, n, i) {
      r.changes.push({
       name: e,
       operation: t,
       obj: t == "U" && !r.disableDeltaChangesApi ? u(n, i) : JSON.parse(JSON.stringify(n))
      });
     }
     function u(e, t) {
      if (t) {
       return c(t, e);
      } else {
       return JSON.parse(JSON.stringify(e));
      }
     }
     this.getChangeDelta = u;
     function c(e, t) {
      var n = t !== null && typeof t === "object" ? Object.keys(t) : null;
      if (n && n.length && [ "string", "boolean", "number" ].indexOf(typeof t) < 0) {
       var i = {};
       for (var o = 0; o < n.length; o++) {
        var s = n[o];
        if (t.hasOwnProperty(s)) {
         if (!e.hasOwnProperty(s) || r.uniqueNames.indexOf(s) >= 0 || s == "$loki" || s == "meta") {
          i[s] = t[s];
         } else {
          var a = c(e[s], t[s]);
          if (typeof a !== "undefined" && a != {}) {
           i[s] = a;
          }
         }
        }
       }
       return Object.keys(i).length === 0 ? undefined : i;
      } else {
       return e === t ? undefined : t;
      }
     }
     this.getObjectDelta = c;
     function f() {
      r.changes = [];
     }
     this.getChanges = function() {
      return r.changes;
     };
     this.flushChanges = f;
     function l(e) {
      var t, n;
      if (r.disableMeta || !e) {
       return;
      }
      if (Array.isArray(e)) {
       t = e.length;
       for (n = 0; n < t; n++) {
        if (!e[n].hasOwnProperty("meta")) {
         e[n].meta = {};
        }
        e[n].meta.created = new Date().getTime();
        e[n].meta.revision = 0;
       }
       return;
      }
      if (!e.meta) {
       e.meta = {};
      }
      e.meta.created = new Date().getTime();
      e.meta.revision = 0;
     }
     function h(e) {
      if (r.disableMeta || !e) {
       return;
      }
      e.meta.updated = new Date().getTime();
      e.meta.revision += 1;
     }
     function d(e) {
      a(r.name, "I", e);
     }
     function p(e, t) {
      a(r.name, "U", e, t);
     }
     function v(e) {
      l(e);
      d(e);
     }
     function y(e, t) {
      h(e);
      p(e, t);
     }
     var g, m;
     function b() {
      g = r.disableChangesApi ? l : v;
      m = r.disableChangesApi ? h : y;
     }
     b();
     this.setChangesApi = function(e) {
      r.disableChangesApi = !e;
      if (!e) {
       r.disableDeltaChangesApi = false;
      }
      b();
     };
     this.on("insert", function e(t) {
      g(t);
     });
     this.on("update", function e(t, n) {
      m(t, n);
     });
     this.on("delete", function e(t) {
      if (!r.disableChangesApi) {
       a(r.name, "R", t);
      }
     });
     this.on("warning", function(e) {
      r.console.warn(e);
     });
     f();
    }
    S.prototype = new y();
    S.prototype.console = {
     log: function() {},
     warn: function() {},
     error: function() {}
    };
    S.prototype.addAutoUpdateObserver = function(e) {
     if (!this.autoupdate || typeof Object.observe !== "function") return;
     Object.observe(e, this.observerCallback, [ "add", "update", "delete", "reconfigure", "setPrototype" ]);
    };
    S.prototype.removeAutoUpdateObserver = function(e) {
     if (!this.autoupdate || typeof Object.observe !== "function") return;
     Object.unobserve(e, this.observerCallback);
    };
    S.prototype.addTransform = function(e, t) {
     if (this.transforms.hasOwnProperty(e)) {
      throw new Error("a transform by that name already exists");
     }
     this.transforms[e] = t;
    };
    S.prototype.getTransform = function(e) {
     return this.transforms[e];
    };
    S.prototype.setTransform = function(e, t) {
     this.transforms[e] = t;
    };
    S.prototype.removeTransform = function(e) {
     delete this.transforms[e];
    };
    S.prototype.byExample = function(e) {
     var t, n, r;
     r = [];
     for (t in e) {
      if (!e.hasOwnProperty(t)) continue;
      r.push((n = {}, n[t] = e[t], n));
     }
     return {
      $and: r
     };
    };
    S.prototype.findObject = function(e) {
     return this.findOne(this.byExample(e));
    };
    S.prototype.findObjects = function(e) {
     return this.find(this.byExample(e));
    };
    S.prototype.ttlDaemonFuncGen = function() {
     var e = this;
     var t = this.ttl.age;
     return function n() {
      var r = Date.now();
      var i = e.chain().where(function e(n) {
       var i = n.meta.updated || n.meta.created;
       var o = r - i;
       return t < o;
      });
      i.remove();
     };
    };
    S.prototype.setTTL = function(e, t) {
     if (e < 0) {
      clearInterval(this.ttl.daemon);
     } else {
      this.ttl.age = e;
      this.ttl.ttlInterval = t;
      this.ttl.daemon = setInterval(this.ttlDaemonFuncGen(), t);
     }
    };
    S.prototype.prepareFullDocIndex = function() {
     var e = this.data.length;
     var t = new Array(e);
     for (var n = 0; n < e; n += 1) {
      t[n] = n;
     }
     return t;
    };
    S.prototype.configureOptions = function(e) {
     e = e || {};
     if (e.hasOwnProperty("adaptiveBinaryIndices")) {
      this.adaptiveBinaryIndices = e.adaptiveBinaryIndices;
      if (this.adaptiveBinaryIndices) {
       this.ensureAllIndexes();
      }
     }
    };
    S.prototype.ensureIndex = function(e, t) {
     if (typeof t === "undefined") {
      t = false;
     }
     if (e === null || e === undefined) {
      throw new Error("Attempting to set index without an associated property");
     }
     if (this.binaryIndices[e] && !t) {
      if (!this.binaryIndices[e].dirty) return;
     }
     if (this.adaptiveBinaryIndices === true && this.binaryIndices.hasOwnProperty(e) && !t) {
      return;
     }
     var n = {
      name: e,
      dirty: true,
      values: this.prepareFullDocIndex()
     };
     this.binaryIndices[e] = n;
     var r = function(e, t) {
      var n, r, s;
      return function(a, u) {
       if (~e.indexOf(".")) {
        s = e.split(".");
        n = s.reduce(function(e, t) {
         return e && e[t] || undefined;
        }, t[a]);
        r = s.reduce(function(e, t) {
         return e && e[t] || undefined;
        }, t[u]);
       } else {
        n = t[a][e];
        r = t[u][e];
       }
       if (n !== r) {
        if (i(n, r, false)) return -1;
        if (o(n, r, false)) return 1;
       }
       return 0;
      };
     }(e, this.data);
     n.values.sort(r);
     n.dirty = false;
     this.dirty = true;
    };
    S.prototype.checkAllIndexes = function(t) {
     var n, r = this.binaryIndices;
     var i = [], o;
     for (n in r) {
      if (e.call(r, n)) {
       o = this.checkIndex(n, t);
       if (!o) {
        i.push(n);
       }
      }
     }
     return i;
    };
    S.prototype.checkIndex = function(e, t) {
     t = t || {};
     if (t.randomSamplingFactor && t.randomSampling !== false) {
      t.randomSampling = true;
     }
     t.randomSamplingFactor = t.randomSamplingFactor || .1;
     if (t.randomSamplingFactor < 0 || t.randomSamplingFactor > 1) {
      t.randomSamplingFactor = .1;
     }
     var n = true, r, i, o, s, a;
     if (!this.binaryIndices.hasOwnProperty(e)) {
      throw new Error("called checkIndex on property without an index: " + e);
     }
     if (!this.adaptiveBinaryIndices) {
      this.ensureIndex(e);
     }
     a = this.binaryIndices[e].values;
     s = a.length;
     if (s !== this.data.length) {
      if (t.repair) {
       this.ensureIndex(e, true);
      }
      return false;
     }
     if (s === 0) {
      return true;
     }
     if (s === 1) {
      n = a[0] === 0;
     }
     if (t.randomSampling) {
      if (!l.$lte(this.data[a[0]][e], this.data[a[1]][e])) {
       n = false;
      }
      if (!l.$lte(this.data[a[s - 2]][e], this.data[a[s - 1]][e])) {
       n = false;
      }
      if (n) {
       i = Math.floor((s - 1) * t.randomSamplingFactor);
       for (r = 0; r < s - 1; r++) {
        o = Math.floor(Math.random() * (s - 1));
        if (!l.$lte(this.data[a[o]][e], this.data[a[o + 1]][e])) {
         n = false;
         break;
        }
       }
      }
     } else {
      for (r = 0; r < s - 1; r++) {
       if (!l.$lte(this.data[a[r]][e], this.data[a[r + 1]][e])) {
        n = false;
        break;
       }
      }
     }
     if (!n && t.repair) {
      this.ensureIndex(e, true);
     }
     return n;
    };
    S.prototype.getBinaryIndexValues = function(e) {
     var t, n = this.binaryIndices[e].values;
     var r = [];
     for (t = 0; t < n.length; t++) {
      r.push(this.data[n[t]][e]);
     }
     return r;
    };
    S.prototype.ensureUniqueIndex = function(e) {
     var t = this.constraints.unique[e];
     if (!t) {
      if (this.uniqueNames.indexOf(e) == -1) {
       this.uniqueNames.push(e);
      }
     }
     this.constraints.unique[e] = t = new N(e);
     this.data.forEach(function(e) {
      t.set(e);
     });
     return t;
    };
    S.prototype.ensureAllIndexes = function(t) {
     var n, r = this.binaryIndices;
     for (n in r) {
      if (e.call(r, n)) {
       this.ensureIndex(n, t);
      }
     }
    };
    S.prototype.flagBinaryIndexesDirty = function() {
     var t, n = this.binaryIndices;
     for (t in n) {
      if (e.call(n, t)) {
       n[t].dirty = true;
      }
     }
    };
    S.prototype.flagBinaryIndexDirty = function(e) {
     if (this.binaryIndices[e]) this.binaryIndices[e].dirty = true;
    };
    S.prototype.count = function(e) {
     if (!e) {
      return this.data.length;
     }
     return this.chain().find(e).filteredrows.length;
    };
    S.prototype.ensureId = function() {
     var e = this.data.length, t = 0;
     this.idIndex = [];
     for (t; t < e; t += 1) {
      this.idIndex.push(this.data[t].$loki);
     }
    };
    S.prototype.ensureIdAsync = function(e) {
     this.async(function() {
      this.ensureId();
     }, e);
    };
    S.prototype.addDynamicView = function(e, t) {
     var n = new O(this, e, t);
     this.DynamicViews.push(n);
     return n;
    };
    S.prototype.removeDynamicView = function(e) {
     for (var t = 0; t < this.DynamicViews.length; t++) {
      if (this.DynamicViews[t].name === e) {
       this.DynamicViews.splice(t, 1);
      }
     }
    };
    S.prototype.getDynamicView = function(e) {
     for (var t = 0; t < this.DynamicViews.length; t++) {
      if (this.DynamicViews[t].name === e) {
       return this.DynamicViews[t];
      }
     }
     return null;
    };
    S.prototype.findAndUpdate = function(e, t) {
     if (typeof e === "function") {
      this.updateWhere(e, t);
     } else {
      this.chain().find(e).update(t);
     }
    };
    S.prototype.findAndRemove = function(e) {
     this.chain().find(e).remove();
    };
    S.prototype.insert = function(e) {
     if (!Array.isArray(e)) {
      return this.insertOne(e);
     }
     var t;
     var n = [];
     this.emit("pre-insert", e);
     for (var r = 0, i = e.length; r < i; r++) {
      t = this.insertOne(e[r], true);
      if (!t) {
       return undefined;
      }
      n.push(t);
     }
     this.emit("insert", n);
     n = this.cloneObjects ? d(n, this.cloneMethod) : n;
     return n.length === 1 ? n[0] : n;
    };
    S.prototype.insertOne = function(e, t) {
     var n = null;
     var r;
     if (typeof e !== "object") {
      n = new TypeError("Document needs to be an object");
     } else if (e === null) {
      n = new TypeError("Object cannot be null");
     }
     if (n !== null) {
      this.emit("error", n);
      throw n;
     }
     var i = this.cloneObjects ? d(e, this.cloneMethod) : e;
     if (!this.disableMeta && typeof i.meta === "undefined") {
      i.meta = {
       revision: 0,
       created: 0
      };
     }
     if (!t) {
      this.emit("pre-insert", i);
     }
     if (!this.add(i)) {
      return undefined;
     }
     r = i;
     if (!t) {
      this.emit("insert", i);
      r = this.cloneObjects ? d(i, this.cloneMethod) : i;
     }
     this.addAutoUpdateObserver(r);
     return r;
    };
    S.prototype.clear = function(e) {
     var t = this;
     e = e || {};
     this.data = [];
     this.idIndex = [];
     this.cachedIndex = null;
     this.cachedBinaryIndex = null;
     this.cachedData = null;
     this.maxId = 0;
     this.DynamicViews = [];
     this.dirty = true;
     if (e.removeIndices === true) {
      this.binaryIndices = {};
      this.constraints = {
       unique: {},
       exact: {}
      };
      this.uniqueNames = [];
     } else {
      var n = Object.keys(this.binaryIndices);
      n.forEach(function(e) {
       t.binaryIndices[e].dirty = false;
       t.binaryIndices[e].values = [];
      });
      this.constraints = {
       unique: {},
       exact: {}
      };
      this.uniqueNames.forEach(function(e) {
       t.ensureUniqueIndex(e);
      });
     }
    };
    S.prototype.update = function(t) {
     if (Array.isArray(t)) {
      var n = 0, r = t.length;
      var i = !this.cloneObjects && this.adaptiveBinaryIndices && Object.keys(this.binaryIndices).length > 0;
      if (i) {
       this.adaptiveBinaryIndices = false;
      }
      for (n; n < r; n += 1) {
       this.update(t[n]);
      }
      if (i) {
       this.ensureAllIndexes();
       this.adaptiveBinaryIndices = true;
      }
      return;
     }
     if (!e.call(t, "$loki")) {
      throw new Error("Trying to update unsynced document. Please save the document first by using insert() or addMany()");
     }
     try {
      this.startTransaction();
      var o = this.get(t.$loki, true), s, a, u, c = this;
      if (!o) {
       throw new Error("Trying to update a document not in collection.");
      }
      s = o[0];
      u = o[1];
      a = this.cloneObjects || !this.disableDeltaChangesApi ? d(t, this.cloneMethod) : t;
      this.emit("pre-update", t);
      Object.keys(this.constraints.unique).forEach(function(e) {
       c.constraints.unique[e].update(s, a);
      });
      this.data[u] = a;
      if (a !== t) {
       this.addAutoUpdateObserver(t);
      }
      for (var f = 0; f < this.DynamicViews.length; f++) {
       this.DynamicViews[f].evaluateDocument(u, false);
      }
      var l;
      if (this.adaptiveBinaryIndices) {
       var h = this.binaryIndices;
       for (l in h) {
        this.adaptiveBinaryIndexUpdate(u, l);
       }
      } else {
       this.flagBinaryIndexesDirty();
      }
      this.idIndex[u] = a.$loki;
      this.commit();
      this.dirty = true;
      this.emit("update", t, this.cloneObjects || !this.disableDeltaChangesApi ? d(s, this.cloneMethod) : null);
      return t;
     } catch (e) {
      this.rollback();
      this.console.error(e.message);
      this.emit("error", e);
      throw e;
     }
    };
    S.prototype.add = function(t) {
     if ("object" !== typeof t) {
      throw new TypeError("Object being added needs to be an object");
     }
     if (typeof t.$loki !== "undefined") {
      throw new Error("Document is already in collection, please use update()");
     }
     try {
      this.startTransaction();
      this.maxId++;
      if (isNaN(this.maxId)) {
       this.maxId = this.data[this.data.length - 1].$loki + 1;
      }
      t.$loki = this.maxId;
      if (!this.disableMeta) {
       t.meta.version = 0;
      }
      var n, r = this.constraints.unique;
      for (n in r) {
       if (e.call(r, n)) {
        r[n].set(t);
       }
      }
      this.idIndex.push(t.$loki);
      this.data.push(t);
      var i = this.data.length - 1;
      var o = this.DynamicViews.length;
      for (var s = 0; s < o; s++) {
       this.DynamicViews[s].evaluateDocument(i, true);
      }
      if (this.adaptiveBinaryIndices) {
       var a = this.binaryIndices;
       for (n in a) {
        this.adaptiveBinaryIndexInsert(i, n);
       }
      } else {
       this.flagBinaryIndexesDirty();
      }
      this.commit();
      this.dirty = true;
      return this.cloneObjects ? d(t, this.cloneMethod) : t;
     } catch (e) {
      this.rollback();
      this.console.error(e.message);
      this.emit("error", e);
      throw e;
     }
    };
    S.prototype.updateWhere = function(e, t) {
     var n = this.where(e), r = 0, i;
     try {
      for (r; r < n.length; r++) {
       i = t(n[r]);
       this.update(i);
      }
     } catch (e) {
      this.rollback();
      this.console.error(e.message);
     }
    };
    S.prototype.removeWhere = function(e) {
     var t;
     if (typeof e === "function") {
      t = this.data.filter(e);
      this.remove(t);
     } else {
      this.chain().find(e).remove();
     }
    };
    S.prototype.removeDataOnly = function() {
     this.remove(this.data.slice());
    };
    S.prototype.remove = function(t) {
     if (typeof t === "number") {
      t = this.get(t);
     }
     if ("object" !== typeof t) {
      throw new Error("Parameter is not an object");
     }
     if (Array.isArray(t)) {
      var n = 0, r = t.length;
      for (n; n < r; n += 1) {
       this.remove(t[n]);
      }
      return;
     }
     if (!e.call(t, "$loki")) {
      throw new Error("Object is not a document stored in the collection");
     }
     try {
      this.startTransaction();
      var i = this.get(t.$loki, true), o = i[1];
      var s = this;
      Object.keys(this.constraints.unique).forEach(function(e) {
       if (t[e] !== null && typeof t[e] !== "undefined") {
        s.constraints.unique[e].remove(t[e]);
       }
      });
      for (var a = 0; a < this.DynamicViews.length; a++) {
       this.DynamicViews[a].removeDocument(o);
      }
      if (this.adaptiveBinaryIndices) {
       var u, c = this.binaryIndices;
       for (u in c) {
        this.adaptiveBinaryIndexRemove(o, u);
       }
      } else {
       this.flagBinaryIndexesDirty();
      }
      this.data.splice(o, 1);
      this.removeAutoUpdateObserver(t);
      this.idIndex.splice(o, 1);
      this.commit();
      this.dirty = true;
      this.emit("delete", i[0]);
      delete t.$loki;
      delete t.meta;
      return t;
     } catch (e) {
      this.rollback();
      this.console.error(e.message);
      this.emit("error", e);
      return null;
     }
    };
    S.prototype.get = function(e, t) {
     var n = t || false, r = this.idIndex, i = r.length - 1, o = 0, s = o + i >> 1;
     e = typeof e === "number" ? e : parseInt(e, 10);
     if (isNaN(e)) {
      throw new TypeError("Passed id is not an integer");
     }
     while (r[o] < r[i]) {
      s = o + i >> 1;
      if (r[s] < e) {
       o = s + 1;
      } else {
       i = s;
      }
     }
     if (i === o && r[o] === e) {
      if (n) {
       return [ this.data[o], o ];
      }
      return this.data[o];
     }
     return null;
    };
    S.prototype.getBinaryIndexPosition = function(e, t) {
     var n = this.data[e][t];
     var r = this.binaryIndices[t].values;
     var i = this.calculateRange("$eq", t, n);
     if (i[0] === 0 && i[1] === -1) {
      return null;
     }
     var o = i[0];
     var s = i[1];
     for (var a = o; a <= s; a++) {
      if (r[a] === e) return a;
     }
     return null;
    };
    S.prototype.adaptiveBinaryIndexInsert = function(e, t) {
     var n = this.binaryIndices[t].values;
     var r = this.data[e][t];
     if (this.serializableIndices === true && r instanceof Date) {
      this.data[e][t] = r.getTime();
      r = this.data[e][t];
     }
     var i = n.length === 0 ? 0 : this.calculateRangeStart(t, r, true);
     this.binaryIndices[t].values.splice(i, 0, e);
    };
    S.prototype.adaptiveBinaryIndexUpdate = function(e, t) {
     var n, r = this.binaryIndices[t].values, i = r.length;
     for (n = 0; n < i; n++) {
      if (r[n] === e) break;
     }
     this.binaryIndices[t].values.splice(n, 1);
     this.adaptiveBinaryIndexInsert(e, t);
    };
    S.prototype.adaptiveBinaryIndexRemove = function(e, t, n) {
     var r = this.getBinaryIndexPosition(e, t);
     var i = this.binaryIndices[t].values;
     var o, s;
     if (r === null) {
      return null;
     }
     this.binaryIndices[t].values.splice(r, 1);
     if (n === true) {
      return;
     }
     o = i.length;
     for (s = 0; s < o; s++) {
      if (i[s] > e) {
       i[s]--;
      }
     }
    };
    S.prototype.calculateRangeStart = function(e, t, n) {
     var o = this.data;
     var s = this.binaryIndices[e].values;
     var a = 0;
     var u = s.length - 1;
     var c = 0;
     if (s.length === 0) {
      return -1;
     }
     var f = o[s[a]][e];
     var l = o[s[u]][e];
     while (a < u) {
      c = a + u >> 1;
      if (i(o[s[c]][e], t, false)) {
       a = c + 1;
      } else {
       u = c;
      }
     }
     var h = a;
     if (r(t, o[s[h]][e])) {
      return h;
     }
     if (i(t, o[s[h]][e], false)) {
      return n ? h : h - 1;
     }
     return n ? h + 1 : h;
    };
    S.prototype.calculateRangeEnd = function(e, t) {
     var n = this.data;
     var s = this.binaryIndices[e].values;
     var a = 0;
     var u = s.length - 1;
     var c = 0;
     if (s.length === 0) {
      return -1;
     }
     var f = n[s[a]][e];
     var l = n[s[u]][e];
     while (a < u) {
      c = a + u >> 1;
      if (i(t, n[s[c]][e], false)) {
       u = c;
      } else {
       a = c + 1;
      }
     }
     var h = u;
     if (r(t, n[s[h]][e])) {
      return h;
     }
     if (o(t, n[s[h]][e], false)) {
      return h + 1;
     }
     if (r(t, n[s[h - 1]][e])) {
      return h - 1;
     }
     return h;
    };
    S.prototype.calculateRange = function(e, t, n) {
     var s = this.data;
     var a = this.binaryIndices[t].values;
     var u = 0;
     var c = a.length - 1;
     var f = 0;
     var l, h;
     var d, p;
     if (s.length === 0) {
      return [ 0, -1 ];
     }
     var v = s[a[u]][t];
     var y = s[a[c]][t];
     switch (e) {
     case "$eq":
     case "$aeq":
      if (i(n, v, false) || o(n, y, false)) {
       return [ 0, -1 ];
      }
      break;

     case "$dteq":
      if (i(n, v, false) || o(n, y, false)) {
       return [ 0, -1 ];
      }
      break;

     case "$gt":
      if (o(n, y, true)) {
       return [ 0, -1 ];
      }
      if (o(v, n, false)) {
       return [ u, c ];
      }
      break;

     case "$gte":
      if (o(n, y, false)) {
       return [ 0, -1 ];
      }
      if (o(v, n, true)) {
       return [ u, c ];
      }
      break;

     case "$lt":
      if (i(n, v, true)) {
       return [ 0, -1 ];
      }
      if (i(y, n, false)) {
       return [ u, c ];
      }
      break;

     case "$lte":
      if (i(n, v, false)) {
       return [ 0, -1 ];
      }
      if (i(y, n, true)) {
       return [ u, c ];
      }
      break;

     case "$between":
      if (o(n[0], y, false)) {
       return [ 0, -1 ];
      }
      if (i(n[1], v, false)) {
       return [ 0, -1 ];
      }
      l = this.calculateRangeStart(t, n[0]);
      d = this.calculateRangeEnd(t, n[1]);
      if (l < 0) l++;
      if (d > c) d--;
      if (!o(s[a[l]][t], n[0], true)) l++;
      if (!i(s[a[d]][t], n[1], true)) d--;
      if (d < l) return [ 0, -1 ];
      return [ l, d ];

     case "$in":
      var g = [], m = [];
      for (var b = 0, w = n.length; b < w; b++) {
       var _ = this.calculateRange("$eq", t, n[b]);
       for (var x = _[0]; x <= _[1]; x++) {
        if (g[x] === undefined) {
         g[x] = true;
         m.push(x);
        }
       }
      }
      return m;
     }
     switch (e) {
     case "$eq":
     case "$aeq":
     case "$dteq":
     case "$gte":
     case "$lt":
      l = this.calculateRangeStart(t, n);
      h = s[a[l]][t];
      break;

     default:
      break;
     }
     switch (e) {
     case "$eq":
     case "$aeq":
     case "$dteq":
     case "$lte":
     case "$gt":
      d = this.calculateRangeEnd(t, n);
      p = s[a[d]][t];
      break;

     default:
      break;
     }
     switch (e) {
     case "$eq":
     case "$aeq":
     case "$dteq":
      if (!r(h, n)) {
       return [ 0, -1 ];
      }
      return [ l, d ];

     case "$gt":
      if (!r(s[a[d]][t], n)) {
       return [ d, c ];
      }
      return [ d + 1, c ];

     case "$gte":
      if (!r(s[a[l]][t], n)) {
       return [ l + 1, c ];
      }
      return [ l, c ];

     case "$lt":
      if (!r(s[a[l]][t], n)) {
       return [ u, l ];
      }
      return [ u, l - 1 ];

     case "$lte":
      if (!r(s[a[d]][t], n)) {
       return [ u, d - 1 ];
      }
      return [ u, d ];

     default:
      return [ 0, s.length - 1 ];
     }
    };
    S.prototype.by = function(e, t) {
     var n;
     if (t === undefined) {
      n = this;
      return function(t) {
       return n.by(e, t);
      };
     }
     var r = this.constraints.unique[e].get(t);
     if (!this.cloneObjects) {
      return r;
     } else {
      return d(r, this.cloneMethod);
     }
    };
    S.prototype.findOne = function(e) {
     e = e || {};
     var t = this.chain().find(e, true).data();
     if (Array.isArray(t) && t.length === 0) {
      return null;
     } else {
      if (!this.cloneObjects) {
       return t[0];
      } else {
       return d(t[0], this.cloneMethod);
      }
     }
    };
    S.prototype.chain = function(e, t) {
     var n = new x(this);
     if (typeof e === "undefined") {
      return n;
     }
     return n.transform(e, t);
    };
    S.prototype.find = function(e) {
     return this.chain().find(e).data();
    };
    S.prototype.findOneUnindexed = function(e, t) {
     var n = this.data.length, r;
     while (n--) {
      if (this.data[n][e] === t) {
       r = this.data[n];
       return r;
      }
     }
     return null;
    };
    S.prototype.startTransaction = function() {
     if (this.transactional) {
      this.cachedData = d(this.data, this.cloneMethod);
      this.cachedIndex = this.idIndex;
      this.cachedBinaryIndex = this.binaryIndices;
      for (var e = 0; e < this.DynamicViews.length; e++) {
       this.DynamicViews[e].startTransaction();
      }
     }
    };
    S.prototype.commit = function() {
     if (this.transactional) {
      this.cachedData = null;
      this.cachedIndex = null;
      this.cachedBinaryIndex = null;
      for (var e = 0; e < this.DynamicViews.length; e++) {
       this.DynamicViews[e].commit();
      }
     }
    };
    S.prototype.rollback = function() {
     if (this.transactional) {
      if (this.cachedData !== null && this.cachedIndex !== null) {
       this.data = this.cachedData;
       this.idIndex = this.cachedIndex;
       this.binaryIndices = this.cachedBinaryIndex;
      }
      for (var e = 0; e < this.DynamicViews.length; e++) {
       this.DynamicViews[e].rollback();
      }
     }
    };
    S.prototype.async = function(e, t) {
     setTimeout(function() {
      if (typeof e === "function") {
       e();
       t();
      } else {
       throw new TypeError("Argument passed for async execution is not a function");
      }
     }, 0);
    };
    S.prototype.where = function(e) {
     return this.chain().where(e).data();
    };
    S.prototype.mapReduce = function(e, t) {
     try {
      return t(this.data.map(e));
     } catch (e) {
      throw e;
     }
    };
    S.prototype.eqJoin = function(e, t, n, r, i) {
     return new x(this).eqJoin(e, t, n, r, i);
    };
    S.prototype.stages = {};
    S.prototype.getStage = function(e) {
     if (!this.stages[e]) {
      this.stages[e] = {};
     }
     return this.stages[e];
    };
    S.prototype.commitLog = [];
    S.prototype.stage = function(e, t) {
     var n = JSON.parse(JSON.stringify(t));
     this.getStage(e)[t.$loki] = n;
     return n;
    };
    S.prototype.commitStage = function(e, t) {
     var n = this.getStage(e), r, i = new Date().getTime();
     for (r in n) {
      this.update(n[r]);
      this.commitLog.push({
       timestamp: i,
       message: t,
       data: JSON.parse(JSON.stringify(n[r]))
      });
     }
     this.stages[e] = {};
    };
    S.prototype.no_op = function() {
     return;
    };
    S.prototype.extract = function(e) {
     var t = 0, n = this.data.length, r = k(e), i = [];
     for (t; t < n; t += 1) {
      i.push(A(this.data[t], e, r));
     }
     return i;
    };
    S.prototype.max = function(e) {
     return Math.max.apply(null, this.extract(e));
    };
    S.prototype.min = function(e) {
     return Math.min.apply(null, this.extract(e));
    };
    S.prototype.maxRecord = function(e) {
     var t = 0, n = this.data.length, r = k(e), i = {
      index: 0,
      value: undefined
     }, o;
     for (t; t < n; t += 1) {
      if (o !== undefined) {
       if (o < A(this.data[t], e, r)) {
        o = A(this.data[t], e, r);
        i.index = this.data[t].$loki;
       }
      } else {
       o = A(this.data[t], e, r);
       i.index = this.data[t].$loki;
      }
     }
     i.value = o;
     return i;
    };
    S.prototype.minRecord = function(e) {
     var t = 0, n = this.data.length, r = k(e), i = {
      index: 0,
      value: undefined
     }, o;
     for (t; t < n; t += 1) {
      if (o !== undefined) {
       if (o > A(this.data[t], e, r)) {
        o = A(this.data[t], e, r);
        i.index = this.data[t].$loki;
       }
      } else {
       o = A(this.data[t], e, r);
       i.index = this.data[t].$loki;
      }
     }
     i.value = o;
     return i;
    };
    S.prototype.extractNumerical = function(e) {
     return this.extract(e).map(C).filter(Number).filter(function(e) {
      return !isNaN(e);
     });
    };
    S.prototype.avg = function(e) {
     return R(this.extractNumerical(e));
    };
    S.prototype.stdDev = function(e) {
     return T(this.extractNumerical(e));
    };
    S.prototype.mode = function(e) {
     var t = {}, n = this.extract(e);
     n.forEach(function(e) {
      if (t[e]) {
       t[e] += 1;
      } else {
       t[e] = 1;
      }
     });
     var r, i, o;
     for (i in t) {
      if (r) {
       if (r < t[i]) {
        o = i;
       }
      } else {
       o = i;
       r = t[i];
      }
     }
     return o;
    };
    S.prototype.median = function(e) {
     var t = this.extractNumerical(e);
     t.sort(E);
     var n = Math.floor(t.length / 2);
     if (t.length % 2) {
      return t[n];
     } else {
      return (t[n - 1] + t[n]) / 2;
     }
    };
    function k(e) {
     return e.indexOf(".") !== -1;
    }
    function C(e) {
     return parseFloat(e, 10);
    }
    function D(e) {
     return e !== undefined;
    }
    function j(e, t) {
     return e + t;
    }
    function E(e, t) {
     return e - t;
    }
    function P(e) {
     e.sort(E);
     var t = Math.floor(e.length / 2);
     return e.length % 2 ? e[t] : (e[t - 1] + e[t]) / 2;
    }
    function R(e) {
     return e.reduce(j, 0) / e.length;
    }
    function T(e) {
     var t = R(e);
     var n = e.map(function(e) {
      var n = e - t;
      var r = n * n;
      return r;
     });
     var r = R(n);
     var i = Math.sqrt(r);
     return i;
    }
    function A(e, t, n) {
     if (n === false) {
      return e[t];
     }
     var r = t.split("."), i = e;
     while (r.length > 0) {
      i = i[r.shift()];
     }
     return i;
    }
    function I(e, t, n) {
     var r = 0, i = e.length, o, s;
     while (r < i) {
      s = r + i >> 1;
      o = n.apply(null, [ t, e[s] ]);
      if (o === 0) {
       return {
        found: true,
        index: s
       };
      } else if (o < 0) {
       i = s;
      } else {
       r = s + 1;
      }
     }
     return {
      found: false,
      index: i
     };
    }
    function M(e) {
     return function(t, n) {
      return I(t, n, e);
     };
    }
    function q() {}
    q.prototype = {
     keys: [],
     values: [],
     sort: function(e, t) {
      return e < t ? -1 : e > t ? 1 : 0;
     },
     setSort: function(e) {
      this.bs = new M(e);
     },
     bs: function() {
      return new M(this.sort);
     },
     set: function(e, t) {
      var n = this.bs(this.keys, e);
      if (n.found) {
       this.values[n.index] = t;
      } else {
       this.keys.splice(n.index, 0, e);
       this.values.splice(n.index, 0, t);
      }
     },
     get: function(e) {
      return this.values[I(this.keys, e, this.sort).index];
     }
    };
    function N(e) {
     this.field = e;
     this.keyMap = {};
     this.lokiMap = {};
    }
    N.prototype.keyMap = {};
    N.prototype.lokiMap = {};
    N.prototype.set = function(e) {
     var t = e[this.field];
     if (t !== null && typeof t !== "undefined") {
      if (this.keyMap[t]) {
       throw new Error("Duplicate key for property " + this.field + ": " + t);
      } else {
       this.keyMap[t] = e;
       this.lokiMap[e.$loki] = t;
      }
     }
    };
    N.prototype.get = function(e) {
     return this.keyMap[e];
    };
    N.prototype.byId = function(e) {
     return this.keyMap[this.lokiMap[e]];
    };
    N.prototype.update = function(e, t) {
     if (this.lokiMap[e.$loki] !== t[this.field]) {
      var n = this.lokiMap[e.$loki];
      this.set(t);
      this.keyMap[n] = undefined;
     } else {
      this.keyMap[e[this.field]] = t;
     }
    };
    N.prototype.remove = function(e) {
     var t = this.keyMap[e];
     if (t !== null && typeof t !== "undefined") {
      this.keyMap[e] = undefined;
      this.lokiMap[t.$loki] = undefined;
     } else {
      throw new Error("Key is not in unique index: " + this.field);
     }
    };
    N.prototype.clear = function() {
     this.keyMap = {};
     this.lokiMap = {};
    };
    function L(e) {
     this.index = {};
     this.field = e;
    }
    L.prototype = {
     set: function e(t, n) {
      if (this.index[t]) {
       this.index[t].push(n);
      } else {
       this.index[t] = [ n ];
      }
     },
     remove: function e(t, n) {
      var r = this.index[t];
      for (var i in r) {
       if (r[i] == n) {
        r.splice(i, 1);
       }
      }
      if (r.length < 1) {
       this.index[t] = undefined;
      }
     },
     get: function e(t) {
      return this.index[t];
     },
     clear: function e(t) {
      this.index = {};
     }
    };
    function F(e) {
     this.field = e;
    }
    F.prototype = {
     keys: [],
     values: [],
     sort: function(e, t) {
      return e < t ? -1 : e > t ? 1 : 0;
     },
     bs: function() {
      return new M(this.sort);
     },
     setSort: function(e) {
      this.bs = new M(e);
     },
     set: function(e, t) {
      var n = I(this.keys, e, this.sort);
      if (n.found) {
       this.values[n.index].push(t);
      } else {
       this.keys.splice(n.index, 0, e);
       this.values.splice(n.index, 0, [ t ]);
      }
     },
     get: function(e) {
      var t = I(this.keys, e, this.sort);
      if (t.found) {
       return this.values[t.index];
      } else {
       return [];
      }
     },
     getLt: function(e) {
      var t = I(this.keys, e, this.sort);
      var n = t.index;
      if (t.found) n--;
      return this.getAll(e, 0, n);
     },
     getGt: function(e) {
      var t = I(this.keys, e, this.sort);
      var n = t.index;
      if (t.found) n++;
      return this.getAll(e, n, this.keys.length);
     },
     getAll: function(e, t, n) {
      var r = [];
      for (var i = t; i < n; i++) {
       r = r.concat(this.values[i]);
      }
      return r;
     },
     getPos: function(e) {
      return I(this.keys, e, this.sort);
     },
     remove: function(e, t) {
      var n = I(this.keys, e, this.sort).index;
      var r = this.values[n];
      for (var i in r) {
       if (r[i] == t) r.splice(i, 1);
      }
      if (r.length < 1) {
       this.keys.splice(n, 1);
       this.values.splice(n, 1);
      }
     },
     clear: function() {
      this.keys = [];
      this.values = [];
     }
    };
    g.LokiOps = l;
    g.Collection = S;
    g.KeyValueStore = q;
    g.LokiMemoryAdapter = m;
    g.LokiPartitioningAdapter = b;
    g.LokiLocalStorageAdapter = _;
    g.LokiFsAdapter = w;
    g.persistenceAdapters = {
     fs: w,
     localStorage: _
    };
    g.aeq = r;
    g.lt = i;
    g.gt = o;
    return g;
   }();
  });
 },
 YgwI: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("JtuM");
  const o = n("KxYO");
  const s = n("2SiB");
  const a = n("4Tfi");
  const u = n("j1I1");
  const c = n("AHUE");
  class f {
   constructor(e) {
    this.session = e;
    this.bsbDiagnostics = {};
   }
   clear({uri: e}) {
    if (this.bsbDiagnostics[e] == null || this.bsbDiagnostics[e][0] == null || this.bsbDiagnostics[e][0].source !== "bucklescript") {
     this.session.connection.sendDiagnostics({
      diagnostics: [],
      uri: e
     });
    }
   }
   dispose() {
    return;
   }
   initialize() {
    return r(this, void 0, void 0, function*() {
     this.onDidChangeConfiguration();
    });
   }
   onDidChangeConfiguration() {
    this.refreshImmediate = this.refreshWithKind(o.TextDocumentSyncKind.Full);
    this.refreshDebounced = i.debounce(this.refreshWithKind(o.TextDocumentSyncKind.Incremental), this.session.settings.reason.debounce.linter, {
     trailing: true
    });
   }
   refreshWithKind(e) {
    return t => r(this, void 0, void 0, function*() {
     const n = new Set(this.session.settings.reason.diagnostics.tools);
     if (n.size < 1) return;
     Object.keys(this.bsbDiagnostics).forEach(e => {
      this.bsbDiagnostics[e] = [];
     });
     this.bsbDiagnostics[t.uri] = [];
     if (n.has("bsb") && e === o.TextDocumentSyncKind.Full) {
      this.refreshDebounced.cancel();
      const e = new c.BuckleScript(this.session);
      const t = yield e.run();
      const n = u.bucklescript.parseErrors(t);
      Object.keys(n).forEach(e => {
       if (!this.bsbDiagnostics[e]) {
        this.bsbDiagnostics[e] = [];
       }
       this.bsbDiagnostics[e] = this.bsbDiagnostics[e].concat(n[e]);
      });
      Object.keys(this.bsbDiagnostics).forEach(e => {
       this.session.connection.sendDiagnostics({
        diagnostics: this.bsbDiagnostics[e],
        uri: e
       });
       if (this.bsbDiagnostics[e].length === 0) {
        delete this.bsbDiagnostics[e];
       }
      });
     } else if (n.has("merlin")) {
      if (e === o.TextDocumentSyncKind.Full) {
       const e = yield a.getTextDocument(this.session, t);
       if (null != e) {
        yield this.session.merlin.sync(s.merlin.Sync.tell("start", "end", e.getText()), t);
       }
      }
      this.session.cancelTokens("analyzer/refreshWithKind");
      const n = yield this.session.merlin.query(s.merlin.Query.errors(), this.session.cancellationSources["analyzer/refreshWithKind"].token, t);
      if ("return" !== n.class) return;
      const r = [];
      for (const e of n.value) r.push(yield s.merlin.IErrorReport.intoCode(this.session, t, e));
      this.session.connection.sendDiagnostics({
       diagnostics: r,
       uri: t.uri
      });
     }
    });
   }
  }
  t.default = f;
 },
 YuTi: function(e, t) {
  e.exports = function(e) {
   if (!e.webpackPolyfill) {
    e.deprecate = function() {};
    e.paths = [];
    if (!e.children) e.children = [];
    Object.defineProperty(e, "loaded", {
     enumerable: true,
     get: function() {
      return e.l;
     }
    });
    Object.defineProperty(e, "id", {
     enumerable: true,
     get: function() {
      return e.i;
     }
    });
    e.webpackPolyfill = 1;
   }
   return e;
  };
 },
 ZSFw: function(e, t, n) {
  "use strict";
  function r(e) {
   for (var n in e) if (!t.hasOwnProperty(n)) t[n] = e[n];
  }
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  r(n("RDN1"));
  r(n("Mc3e"));
  r(n("fewI"));
 },
 ZqT8: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("cfFl");
  const o = n("JtuM");
  const s = n("KQMe");
  const a = n("1jjw");
  const u = n("2SiB");
  class c {
   constructor(e) {
    this.session = e;
   }
   dispose() {
    this.readline.close();
   }
   initialize() {
    return r(this, void 0, void 0, function*() {
     const e = this.session.settings.reason.path.ocamlmerlin;
     const t = this.session.initConf.rootUri || this.session.initConf.rootPath;
     const n = t ? {
      cwd: a.default.parse(t).fsPath
     } : {};
     this.process = this.session.environment.spawn(e, [], n);
     this.process.on("error", t => {
      if ("ENOENT" === t.code) {
       this.session.connection.window.showWarningMessage(`Cannot find merlin binary at "${e}".`);
       this.session.connection.window.showWarningMessage(`Double check your path or try configuring "reason.path.ocamlmerlin" under "User Settings".`);
      }
      throw t;
     });
     this.process.stderr.on("data", e => {
      this.session.connection.window.showErrorMessage(`ocamlmerlin error: ${e}`);
     });
     this.readline = s.createInterface({
      input: this.process.stdout,
      output: this.process.stdin,
      terminal: false
     });
     const r = (e, t) => {
      const n = new Date();
      if (null != e.token && e.token.isCancellationRequested) {
       return t({
        class: "canceled",
        value: "Request has been canceled."
       });
      }
      this.readline.question(JSON.stringify(e.task), o.flow(JSON.parse, this.logMessage(n, e), e => {
       return t(e);
      }));
     };
     this.queue = i.priorityQueue(r, 1);
     yield this.establishProtocol();
    });
   }
   query({query: e}, t, n, r = 0) {
    const i = n ? [ "auto", a.default.parse(n.uri).fsPath ] : undefined;
    const o = i ? {
     context: i,
     query: e
    } : e;
    return new Promise(e => this.queue.push(new u.merlin.Task(o, t), r, e));
   }
   restart() {
    return r(this, void 0, void 0, function*() {
     if (null != this.queue) {
      this.queue.kill();
      this.queue = null;
     }
     if (null != this.readline) {
      this.readline.close();
      this.readline = null;
     }
     if (null != this.process) {
      this.process.kill();
      this.process = null;
     }
     yield this.initialize();
    });
   }
   sync({sync: e}, t) {
    const n = t ? [ "auto", a.default.parse(t.uri).fsPath ] : undefined;
    const r = n ? {
     context: n,
     query: e
    } : e;
    return new Promise(e => this.queue.push(new u.merlin.Task(r), 0, e));
   }
   establishProtocol() {
    return r(this, void 0, void 0, function*() {
     const e = u.merlin.Sync.protocol.version.set(3);
     const t = yield this.sync(e);
     if ("return" !== t.class || 3 !== t.value.selected) {
      throw new Error("onInitialize: failed to establish protocol v3");
     }
    });
   }
   logMessage(e, t) {
    return n => {
     if (null != this.session.settings.reason.diagnostics && this.session.settings.reason.diagnostics.merlinPerfLogging) {
      const n = e.getTime() - t.enqueuedAt.getTime();
      const r = new Date().getTime() - e.getTime();
      this.session.connection.telemetry.logEvent(`(${this.queue.length()}) Task ${JSON.stringify(t.task)} was in the queue for ${n} ms and took ${r} ms to process.`);
     }
     return n;
    };
   }
  }
  t.default = c;
 },
 a1Tp: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("CVGz");
  t.client = r;
  const i = n("86+m");
  t.server = i;
 },
 "aTK+": function(e, t, n) {
  e.exports = f;
  f.realpath = f;
  f.sync = l;
  f.realpathSync = l;
  f.monkeypatch = h;
  f.unmonkeypatch = d;
  var r = n("mw/K");
  var i = r.realpath;
  var o = r.realpathSync;
  var s = process.version;
  var a = /^v[0-5]\./.test(s);
  var u = n("cLPV");
  function c(e) {
   return e && e.syscall === "realpath" && (e.code === "ELOOP" || e.code === "ENOMEM" || e.code === "ENAMETOOLONG");
  }
  function f(e, t, n) {
   if (a) {
    return i(e, t, n);
   }
   if (typeof t === "function") {
    n = t;
    t = null;
   }
   i(e, t, function(r, i) {
    if (c(r)) {
     u.realpath(e, t, n);
    } else {
     n(r, i);
    }
   });
  }
  function l(e, t) {
   if (a) {
    return o(e, t);
   }
   try {
    return o(e, t);
   } catch (n) {
    if (c(n)) {
     return u.realpathSync(e, t);
    } else {
     throw n;
    }
   }
  }
  function h() {
   r.realpath = f;
   r.realpathSync = l;
  }
  function d() {
   r.realpath = i;
   r.realpathSync = o;
  }
 },
 aiB0: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e, t = []) {
    const n = e.settings.reason.path.ocpindent;
    this.process = e.environment.spawn(n, t);
    this.process.on("error", t => e.error(`Error formatting file: ${t}`));
   }
  }
  t.default = r;
 },
 bzos: function(e, t) {
  e.exports = require("url");
 },
 cLPV: function(e, t, n) {
  var r = n("oyvS");
  var i = process.platform === "win32";
  var o = n("mw/K");
  var s = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
  function a() {
   var e;
   if (s) {
    var t = new Error();
    e = n;
   } else e = r;
   return e;
   function n(e) {
    if (e) {
     t.message = e.message;
     e = t;
     r(e);
    }
   }
   function r(e) {
    if (e) {
     if (process.throwDeprecation) throw e; else if (!process.noDeprecation) {
      var t = "fs: missing callback " + (e.stack || e.message);
      if (process.traceDeprecation) console.trace(t); else console.error(t);
     }
    }
   }
  }
  function u(e) {
   return typeof e === "function" ? e : a();
  }
  var c = r.normalize;
  if (i) {
   var f = /(.*?)(?:[\/\\]+|$)/g;
  } else {
   var f = /(.*?)(?:[\/]+|$)/g;
  }
  if (i) {
   var l = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
   var l = /^[\/]*/;
  }
  t.realpathSync = function e(t, n) {
   t = r.resolve(t);
   if (n && Object.prototype.hasOwnProperty.call(n, t)) {
    return n[t];
   }
   var s = t, a = {}, u = {};
   var c;
   var h;
   var d;
   var p;
   v();
   function v() {
    var e = l.exec(t);
    c = e[0].length;
    h = e[0];
    d = e[0];
    p = "";
    if (i && !u[d]) {
     o.lstatSync(d);
     u[d] = true;
    }
   }
   while (c < t.length) {
    f.lastIndex = c;
    var y = f.exec(t);
    p = h;
    h += y[0];
    d = p + y[1];
    c = f.lastIndex;
    if (u[d] || n && n[d] === d) {
     continue;
    }
    var g;
    if (n && Object.prototype.hasOwnProperty.call(n, d)) {
     g = n[d];
    } else {
     var m = o.lstatSync(d);
     if (!m.isSymbolicLink()) {
      u[d] = true;
      if (n) n[d] = d;
      continue;
     }
     var b = null;
     if (!i) {
      var w = m.dev.toString(32) + ":" + m.ino.toString(32);
      if (a.hasOwnProperty(w)) {
       b = a[w];
      }
     }
     if (b === null) {
      o.statSync(d);
      b = o.readlinkSync(d);
     }
     g = r.resolve(p, b);
     if (n) n[d] = g;
     if (!i) a[w] = b;
    }
    t = r.resolve(g, t.slice(c));
    v();
   }
   if (n) n[s] = t;
   return t;
  };
  t.realpath = function e(t, n, s) {
   if (typeof s !== "function") {
    s = u(n);
    n = null;
   }
   t = r.resolve(t);
   if (n && Object.prototype.hasOwnProperty.call(n, t)) {
    return process.nextTick(s.bind(null, null, n[t]));
   }
   var a = t, c = {}, h = {};
   var d;
   var p;
   var v;
   var y;
   g();
   function g() {
    var e = l.exec(t);
    d = e[0].length;
    p = e[0];
    v = e[0];
    y = "";
    if (i && !h[v]) {
     o.lstat(v, function(e) {
      if (e) return s(e);
      h[v] = true;
      m();
     });
    } else {
     process.nextTick(m);
    }
   }
   function m() {
    if (d >= t.length) {
     if (n) n[a] = t;
     return s(null, t);
    }
    f.lastIndex = d;
    var e = f.exec(t);
    y = p;
    p += e[0];
    v = y + e[1];
    d = f.lastIndex;
    if (h[v] || n && n[v] === v) {
     return process.nextTick(m);
    }
    if (n && Object.prototype.hasOwnProperty.call(n, v)) {
     return _(n[v]);
    }
    return o.lstat(v, b);
   }
   function b(e, t) {
    if (e) return s(e);
    if (!t.isSymbolicLink()) {
     h[v] = true;
     if (n) n[v] = v;
     return process.nextTick(m);
    }
    if (!i) {
     var r = t.dev.toString(32) + ":" + t.ino.toString(32);
     if (c.hasOwnProperty(r)) {
      return w(null, c[r], v);
     }
    }
    o.stat(v, function(e) {
     if (e) return s(e);
     o.readlink(v, function(e, t) {
      if (!i) c[r] = t;
      w(e, t);
     });
    });
   }
   function w(e, t, i) {
    if (e) return s(e);
    var o = r.resolve(y, t);
    if (n) n[i] = o;
    _(o);
   }
   function _(e) {
    t = r.resolve(e, t.slice(d));
    g();
   }
  };
 },
 "ce/F": function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  function i(e, t) {
   return r(this, void 0, void 0, function*() {
    return e.synchronizer.getTextDocument(t.uri);
   });
  }
  t.default = i;
 },
 cfFl: function(e, t, n) {
  (function(e) {
   (function(e, n) {
    true ? n(t) : undefined;
   })(this, function(t) {
    "use strict";
    function n(e, t) {
     t = t | 0;
     var n = Math.max(e.length - t, 0);
     var r = Array(n);
     for (var i = 0; i < n; i++) {
      r[i] = e[t + i];
     }
     return r;
    }
    var r = function(e) {
     var t = n(arguments, 1);
     return function() {
      var r = n(arguments);
      return e.apply(null, t.concat(r));
     };
    };
    var i = function(e) {
     return function() {
      var t = n(arguments);
      var r = t.pop();
      e.call(this, t, r);
     };
    };
    function o(e) {
     var t = typeof e;
     return e != null && (t == "object" || t == "function");
    }
    var s = typeof setImmediate === "function" && setImmediate;
    var a = typeof process === "object" && typeof process.nextTick === "function";
    function u(e) {
     setTimeout(e, 0);
    }
    function c(e) {
     return function(t) {
      var r = n(arguments, 1);
      e(function() {
       t.apply(null, r);
      });
     };
    }
    var f;
    if (s) {
     f = setImmediate;
    } else if (a) {
     f = process.nextTick;
    } else {
     f = u;
    }
    var l = c(f);
    function h(e) {
     return i(function(t, n) {
      var r;
      try {
       r = e.apply(this, t);
      } catch (e) {
       return n(e);
      }
      if (o(r) && typeof r.then === "function") {
       r.then(function(e) {
        d(n, null, e);
       }, function(e) {
        d(n, e.message ? e : new Error(e));
       });
      } else {
       n(null, r);
      }
     });
    }
    function d(e, t, n) {
     try {
      e(t, n);
     } catch (e) {
      l(p, e);
     }
    }
    function p(e) {
     throw e;
    }
    var v = typeof Symbol === "function";
    function y(e) {
     return v && e[Symbol.toStringTag] === "AsyncFunction";
    }
    function g(e) {
     return y(e) ? h(e) : e;
    }
    function m(e) {
     return function(t) {
      var r = n(arguments, 1);
      var o = i(function(n, r) {
       var i = this;
       return e(t, function(e, t) {
        g(e).apply(i, n.concat(t));
       }, r);
      });
      if (r.length) {
       return o.apply(this, r);
      } else {
       return o;
      }
     };
    }
    var b = typeof global == "object" && global && global.Object === Object && global;
    var w = typeof self == "object" && self && self.Object === Object && self;
    var _ = b || w || Function("return this")();
    var x = _.Symbol;
    var O = Object.prototype;
    var S = O.hasOwnProperty;
    var k = O.toString;
    var C = x ? x.toStringTag : undefined;
    function D(e) {
     var t = S.call(e, C), n = e[C];
     try {
      e[C] = undefined;
      var r = true;
     } catch (e) {}
     var i = k.call(e);
     if (r) {
      if (t) {
       e[C] = n;
      } else {
       delete e[C];
      }
     }
     return i;
    }
    var j = Object.prototype;
    var E = j.toString;
    function P(e) {
     return E.call(e);
    }
    var R = "[object Null]";
    var T = "[object Undefined]";
    var A = x ? x.toStringTag : undefined;
    function I(e) {
     if (e == null) {
      return e === undefined ? T : R;
     }
     return A && A in Object(e) ? D(e) : P(e);
    }
    var M = "[object AsyncFunction]";
    var q = "[object Function]";
    var N = "[object GeneratorFunction]";
    var L = "[object Proxy]";
    function F(e) {
     if (!o(e)) {
      return false;
     }
     var t = I(e);
     return t == q || t == N || t == M || t == L;
    }
    var z = 9007199254740991;
    function W(e) {
     return typeof e == "number" && e > -1 && e % 1 == 0 && e <= z;
    }
    function $(e) {
     return e != null && W(e.length) && !F(e);
    }
    var B = {};
    function K() {}
    function U(e) {
     return function() {
      if (e === null) return;
      var t = e;
      e = null;
      t.apply(this, arguments);
     };
    }
    var H = typeof Symbol === "function" && Symbol.iterator;
    var V = function(e) {
     return H && e[H] && e[H]();
    };
    function J(e, t) {
     var n = -1, r = Array(e);
     while (++n < e) {
      r[n] = t(n);
     }
     return r;
    }
    function G(e) {
     return e != null && typeof e == "object";
    }
    var Q = "[object Arguments]";
    function Y(e) {
     return G(e) && I(e) == Q;
    }
    var Z = Object.prototype;
    var X = Z.hasOwnProperty;
    var ee = Z.propertyIsEnumerable;
    var te = Y(function() {
     return arguments;
    }()) ? Y : function(e) {
     return G(e) && X.call(e, "callee") && !ee.call(e, "callee");
    };
    var ne = Array.isArray;
    function re() {
     return false;
    }
    var ie = typeof t == "object" && t && !t.nodeType && t;
    var oe = ie && typeof e == "object" && e && !e.nodeType && e;
    var se = oe && oe.exports === ie;
    var ae = se ? _.Buffer : undefined;
    var ue = ae ? ae.isBuffer : undefined;
    var ce = ue || re;
    var fe = 9007199254740991;
    var le = /^(?:0|[1-9]\d*)$/;
    function he(e, t) {
     t = t == null ? fe : t;
     return !!t && (typeof e == "number" || le.test(e)) && (e > -1 && e % 1 == 0 && e < t);
    }
    var de = "[object Arguments]";
    var pe = "[object Array]";
    var ve = "[object Boolean]";
    var ye = "[object Date]";
    var ge = "[object Error]";
    var me = "[object Function]";
    var be = "[object Map]";
    var we = "[object Number]";
    var _e = "[object Object]";
    var xe = "[object RegExp]";
    var Oe = "[object Set]";
    var Se = "[object String]";
    var ke = "[object WeakMap]";
    var Ce = "[object ArrayBuffer]";
    var De = "[object DataView]";
    var je = "[object Float32Array]";
    var Ee = "[object Float64Array]";
    var Pe = "[object Int8Array]";
    var Re = "[object Int16Array]";
    var Te = "[object Int32Array]";
    var Ae = "[object Uint8Array]";
    var Ie = "[object Uint8ClampedArray]";
    var Me = "[object Uint16Array]";
    var qe = "[object Uint32Array]";
    var Ne = {};
    Ne[je] = Ne[Ee] = Ne[Pe] = Ne[Re] = Ne[Te] = Ne[Ae] = Ne[Ie] = Ne[Me] = Ne[qe] = true;
    Ne[de] = Ne[pe] = Ne[Ce] = Ne[ve] = Ne[De] = Ne[ye] = Ne[ge] = Ne[me] = Ne[be] = Ne[we] = Ne[_e] = Ne[xe] = Ne[Oe] = Ne[Se] = Ne[ke] = false;
    function Le(e) {
     return G(e) && W(e.length) && !!Ne[I(e)];
    }
    function Fe(e) {
     return function(t) {
      return e(t);
     };
    }
    var ze = typeof t == "object" && t && !t.nodeType && t;
    var We = ze && typeof e == "object" && e && !e.nodeType && e;
    var $e = We && We.exports === ze;
    var Be = $e && b.process;
    var Ke = function() {
     try {
      return Be && Be.binding && Be.binding("util");
     } catch (e) {}
    }();
    var Ue = Ke && Ke.isTypedArray;
    var He = Ue ? Fe(Ue) : Le;
    var Ve = Object.prototype;
    var Je = Ve.hasOwnProperty;
    function Ge(e, t) {
     var n = ne(e), r = !n && te(e), i = !n && !r && ce(e), o = !n && !r && !i && He(e), s = n || r || i || o, a = s ? J(e.length, String) : [], u = a.length;
     for (var c in e) {
      if ((t || Je.call(e, c)) && !(s && (c == "length" || i && (c == "offset" || c == "parent") || o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || he(c, u)))) {
       a.push(c);
      }
     }
     return a;
    }
    var Qe = Object.prototype;
    function Ye(e) {
     var t = e && e.constructor, n = typeof t == "function" && t.prototype || Qe;
     return e === n;
    }
    function Ze(e, t) {
     return function(n) {
      return e(t(n));
     };
    }
    var Xe = Ze(Object.keys, Object);
    var et = Object.prototype;
    var tt = et.hasOwnProperty;
    function nt(e) {
     if (!Ye(e)) {
      return Xe(e);
     }
     var t = [];
     for (var n in Object(e)) {
      if (tt.call(e, n) && n != "constructor") {
       t.push(n);
      }
     }
     return t;
    }
    function rt(e) {
     return $(e) ? Ge(e) : nt(e);
    }
    function it(e) {
     var t = -1;
     var n = e.length;
     return function r() {
      return ++t < n ? {
       value: e[t],
       key: t
      } : null;
     };
    }
    function ot(e) {
     var t = -1;
     return function n() {
      var r = e.next();
      if (r.done) return null;
      t++;
      return {
       value: r.value,
       key: t
      };
     };
    }
    function st(e) {
     var t = rt(e);
     var n = -1;
     var r = t.length;
     return function i() {
      var o = t[++n];
      return n < r ? {
       value: e[o],
       key: o
      } : null;
     };
    }
    function at(e) {
     if ($(e)) {
      return it(e);
     }
     var t = V(e);
     return t ? ot(t) : st(e);
    }
    function ut(e) {
     return function() {
      if (e === null) throw new Error("Callback was already called.");
      var t = e;
      e = null;
      t.apply(this, arguments);
     };
    }
    function ct(e) {
     return function(t, n, r) {
      r = U(r || K);
      if (e <= 0 || !t) {
       return r(null);
      }
      var i = at(t);
      var o = false;
      var s = 0;
      function a(e, t) {
       s -= 1;
       if (e) {
        o = true;
        r(e);
       } else if (t === B || o && s <= 0) {
        o = true;
        return r(null);
       } else {
        u();
       }
      }
      function u() {
       while (s < e && !o) {
        var t = i();
        if (t === null) {
         o = true;
         if (s <= 0) {
          r(null);
         }
         return;
        }
        s += 1;
        n(t.value, t.key, ut(a));
       }
      }
      u();
     };
    }
    function ft(e, t, n, r) {
     ct(t)(e, g(n), r);
    }
    function lt(e, t) {
     return function(n, r, i) {
      return e(n, t, r, i);
     };
    }
    function ht(e, t, n) {
     n = U(n || K);
     var r = 0, i = 0, o = e.length;
     if (o === 0) {
      n(null);
     }
     function s(e, t) {
      if (e) {
       n(e);
      } else if (++i === o || t === B) {
       n(null);
      }
     }
     for (;r < o; r++) {
      t(e[r], r, ut(s));
     }
    }
    var dt = lt(ft, Infinity);
    var pt = function(e, t, n) {
     var r = $(e) ? ht : dt;
     r(e, g(t), n);
    };
    function vt(e) {
     return function(t, n, r) {
      return e(pt, t, g(n), r);
     };
    }
    function yt(e, t, n, r) {
     r = r || K;
     t = t || [];
     var i = [];
     var o = 0;
     var s = g(n);
     e(t, function(e, t, n) {
      var r = o++;
      s(e, function(e, t) {
       i[r] = t;
       n(e);
      });
     }, function(e) {
      r(e, i);
     });
    }
    var gt = vt(yt);
    var mt = m(gt);
    function bt(e) {
     return function(t, n, r, i) {
      return e(ct(n), t, g(r), i);
     };
    }
    var wt = bt(yt);
    var _t = lt(wt, 1);
    var xt = m(_t);
    function Ot(e, t) {
     var n = -1, r = e == null ? 0 : e.length;
     while (++n < r) {
      if (t(e[n], n, e) === false) {
       break;
      }
     }
     return e;
    }
    function St(e) {
     return function(t, n, r) {
      var i = -1, o = Object(t), s = r(t), a = s.length;
      while (a--) {
       var u = s[e ? a : ++i];
       if (n(o[u], u, o) === false) {
        break;
       }
      }
      return t;
     };
    }
    var kt = St();
    function Ct(e, t) {
     return e && kt(e, t, rt);
    }
    function Dt(e, t, n, r) {
     var i = e.length, o = n + (r ? 1 : -1);
     while (r ? o-- : ++o < i) {
      if (t(e[o], o, e)) {
       return o;
      }
     }
     return -1;
    }
    function jt(e) {
     return e !== e;
    }
    function Et(e, t, n) {
     var r = n - 1, i = e.length;
     while (++r < i) {
      if (e[r] === t) {
       return r;
      }
     }
     return -1;
    }
    function Pt(e, t, n) {
     return t === t ? Et(e, t, n) : Dt(e, jt, n);
    }
    var Rt = function(e, t, r) {
     if (typeof t === "function") {
      r = t;
      t = null;
     }
     r = U(r || K);
     var i = rt(e);
     var o = i.length;
     if (!o) {
      return r(null);
     }
     if (!t) {
      t = o;
     }
     var s = {};
     var a = 0;
     var u = false;
     var c = Object.create(null);
     var f = [];
     var l = [];
     var h = {};
     Ct(e, function(t, n) {
      if (!ne(t)) {
       d(n, [ t ]);
       l.push(n);
       return;
      }
      var r = t.slice(0, t.length - 1);
      var i = r.length;
      if (i === 0) {
       d(n, t);
       l.push(n);
       return;
      }
      h[n] = i;
      Ot(r, function(o) {
       if (!e[o]) {
        throw new Error("async.auto task `" + n + "` has a non-existent dependency `" + o + "` in " + r.join(", "));
       }
       v(o, function() {
        i--;
        if (i === 0) {
         d(n, t);
        }
       });
      });
     });
     b();
     p();
     function d(e, t) {
      f.push(function() {
       m(e, t);
      });
     }
     function p() {
      if (f.length === 0 && a === 0) {
       return r(null, s);
      }
      while (f.length && a < t) {
       var e = f.shift();
       e();
      }
     }
     function v(e, t) {
      var n = c[e];
      if (!n) {
       n = c[e] = [];
      }
      n.push(t);
     }
     function y(e) {
      var t = c[e] || [];
      Ot(t, function(e) {
       e();
      });
      p();
     }
     function m(e, t) {
      if (u) return;
      var i = ut(function(t, i) {
       a--;
       if (arguments.length > 2) {
        i = n(arguments, 1);
       }
       if (t) {
        var o = {};
        Ct(s, function(e, t) {
         o[t] = e;
        });
        o[e] = i;
        u = true;
        c = Object.create(null);
        r(t, o);
       } else {
        s[e] = i;
        y(e);
       }
      });
      a++;
      var o = g(t[t.length - 1]);
      if (t.length > 1) {
       o(s, i);
      } else {
       o(i);
      }
     }
     function b() {
      var e;
      var t = 0;
      while (l.length) {
       e = l.pop();
       t++;
       Ot(w(e), function(e) {
        if (--h[e] === 0) {
         l.push(e);
        }
       });
      }
      if (t !== o) {
       throw new Error("async.auto cannot execute tasks due to a recursive dependency");
      }
     }
     function w(t) {
      var n = [];
      Ct(e, function(e, r) {
       if (ne(e) && Pt(e, t, 0) >= 0) {
        n.push(r);
       }
      });
      return n;
     }
    };
    function Tt(e, t) {
     var n = -1, r = e == null ? 0 : e.length, i = Array(r);
     while (++n < r) {
      i[n] = t(e[n], n, e);
     }
     return i;
    }
    var At = "[object Symbol]";
    function It(e) {
     return typeof e == "symbol" || G(e) && I(e) == At;
    }
    var Mt = 1 / 0;
    var qt = x ? x.prototype : undefined;
    var Nt = qt ? qt.toString : undefined;
    function Lt(e) {
     if (typeof e == "string") {
      return e;
     }
     if (ne(e)) {
      return Tt(e, Lt) + "";
     }
     if (It(e)) {
      return Nt ? Nt.call(e) : "";
     }
     var t = e + "";
     return t == "0" && 1 / e == -Mt ? "-0" : t;
    }
    function Ft(e, t, n) {
     var r = -1, i = e.length;
     if (t < 0) {
      t = -t > i ? 0 : i + t;
     }
     n = n > i ? i : n;
     if (n < 0) {
      n += i;
     }
     i = t > n ? 0 : n - t >>> 0;
     t >>>= 0;
     var o = Array(i);
     while (++r < i) {
      o[r] = e[r + t];
     }
     return o;
    }
    function zt(e, t, n) {
     var r = e.length;
     n = n === undefined ? r : n;
     return !t && n >= r ? e : Ft(e, t, n);
    }
    function Wt(e, t) {
     var n = e.length;
     while (n-- && Pt(t, e[n], 0) > -1) {}
     return n;
    }
    function $t(e, t) {
     var n = -1, r = e.length;
     while (++n < r && Pt(t, e[n], 0) > -1) {}
     return n;
    }
    function Bt(e) {
     return e.split("");
    }
    var Kt = "\\ud800-\\udfff";
    var Ut = "\\u0300-\\u036f";
    var Ht = "\\ufe20-\\ufe2f";
    var Vt = "\\u20d0-\\u20ff";
    var Jt = Ut + Ht + Vt;
    var Gt = "\\ufe0e\\ufe0f";
    var Qt = "\\u200d";
    var Yt = RegExp("[" + Qt + Kt + Jt + Gt + "]");
    function Zt(e) {
     return Yt.test(e);
    }
    var Xt = "\\ud800-\\udfff";
    var en = "\\u0300-\\u036f";
    var tn = "\\ufe20-\\ufe2f";
    var nn = "\\u20d0-\\u20ff";
    var rn = en + tn + nn;
    var on = "\\ufe0e\\ufe0f";
    var sn = "[" + Xt + "]";
    var an = "[" + rn + "]";
    var un = "\\ud83c[\\udffb-\\udfff]";
    var cn = "(?:" + an + "|" + un + ")";
    var fn = "[^" + Xt + "]";
    var ln = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var hn = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var dn = "\\u200d";
    var pn = cn + "?";
    var vn = "[" + on + "]?";
    var yn = "(?:" + dn + "(?:" + [ fn, ln, hn ].join("|") + ")" + vn + pn + ")*";
    var gn = vn + pn + yn;
    var mn = "(?:" + [ fn + an + "?", an, ln, hn, sn ].join("|") + ")";
    var bn = RegExp(un + "(?=" + un + ")|" + mn + gn, "g");
    function wn(e) {
     return e.match(bn) || [];
    }
    function _n(e) {
     return Zt(e) ? wn(e) : Bt(e);
    }
    function xn(e) {
     return e == null ? "" : Lt(e);
    }
    var On = /^\s+|\s+$/g;
    function Sn(e, t, n) {
     e = xn(e);
     if (e && (n || t === undefined)) {
      return e.replace(On, "");
     }
     if (!e || !(t = Lt(t))) {
      return e;
     }
     var r = _n(e), i = _n(t), o = $t(r, i), s = Wt(r, i) + 1;
     return zt(r, o, s).join("");
    }
    var kn = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
    var Cn = /,/;
    var Dn = /(=.+)?(\s*)$/;
    var jn = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    function En(e) {
     e = e.toString().replace(jn, "");
     e = e.match(kn)[2].replace(" ", "");
     e = e ? e.split(Cn) : [];
     e = e.map(function(e) {
      return Sn(e.replace(Dn, ""));
     });
     return e;
    }
    function Pn(e, t) {
     var n = {};
     Ct(e, function(e, t) {
      var r;
      var i = y(e);
      var o = !i && e.length === 1 || i && e.length === 0;
      if (ne(e)) {
       r = e.slice(0, -1);
       e = e[e.length - 1];
       n[t] = r.concat(r.length > 0 ? s : e);
      } else if (o) {
       n[t] = e;
      } else {
       r = En(e);
       if (e.length === 0 && !i && r.length === 0) {
        throw new Error("autoInject task functions require explicit parameters.");
       }
       if (!i) r.pop();
       n[t] = r.concat(s);
      }
      function s(t, n) {
       var i = Tt(r, function(e) {
        return t[e];
       });
       i.push(n);
       g(e).apply(null, i);
      }
     });
     Rt(n, t);
    }
    function Rn() {
     this.head = this.tail = null;
     this.length = 0;
    }
    function Tn(e, t) {
     e.length = 1;
     e.head = e.tail = t;
    }
    Rn.prototype.removeLink = function(e) {
     if (e.prev) e.prev.next = e.next; else this.head = e.next;
     if (e.next) e.next.prev = e.prev; else this.tail = e.prev;
     e.prev = e.next = null;
     this.length -= 1;
     return e;
    };
    Rn.prototype.empty = function() {
     while (this.head) this.shift();
     return this;
    };
    Rn.prototype.insertAfter = function(e, t) {
     t.prev = e;
     t.next = e.next;
     if (e.next) e.next.prev = t; else this.tail = t;
     e.next = t;
     this.length += 1;
    };
    Rn.prototype.insertBefore = function(e, t) {
     t.prev = e.prev;
     t.next = e;
     if (e.prev) e.prev.next = t; else this.head = t;
     e.prev = t;
     this.length += 1;
    };
    Rn.prototype.unshift = function(e) {
     if (this.head) this.insertBefore(this.head, e); else Tn(this, e);
    };
    Rn.prototype.push = function(e) {
     if (this.tail) this.insertAfter(this.tail, e); else Tn(this, e);
    };
    Rn.prototype.shift = function() {
     return this.head && this.removeLink(this.head);
    };
    Rn.prototype.pop = function() {
     return this.tail && this.removeLink(this.tail);
    };
    Rn.prototype.toArray = function() {
     var e = Array(this.length);
     var t = this.head;
     for (var n = 0; n < this.length; n++) {
      e[n] = t.data;
      t = t.next;
     }
     return e;
    };
    Rn.prototype.remove = function(e) {
     var t = this.head;
     while (!!t) {
      var n = t.next;
      if (e(t)) {
       this.removeLink(t);
      }
      t = n;
     }
     return this;
    };
    function An(e, t, n) {
     if (t == null) {
      t = 1;
     } else if (t === 0) {
      throw new Error("Concurrency must not be zero");
     }
     var r = g(e);
     var i = 0;
     var o = [];
     var s = false;
     function a(e, t, n) {
      if (n != null && typeof n !== "function") {
       throw new Error("task callback must be a function");
      }
      f.started = true;
      if (!ne(e)) {
       e = [ e ];
      }
      if (e.length === 0 && f.idle()) {
       return l(function() {
        f.drain();
       });
      }
      for (var r = 0, i = e.length; r < i; r++) {
       var o = {
        data: e[r],
        callback: n || K
       };
       if (t) {
        f._tasks.unshift(o);
       } else {
        f._tasks.push(o);
       }
      }
      if (!s) {
       s = true;
       l(function() {
        s = false;
        f.process();
       });
      }
     }
     function u(e) {
      return function(t) {
       i -= 1;
       for (var n = 0, r = e.length; n < r; n++) {
        var s = e[n];
        var a = Pt(o, s, 0);
        if (a === 0) {
         o.shift();
        } else if (a > 0) {
         o.splice(a, 1);
        }
        s.callback.apply(s, arguments);
        if (t != null) {
         f.error(t, s.data);
        }
       }
       if (i <= f.concurrency - f.buffer) {
        f.unsaturated();
       }
       if (f.idle()) {
        f.drain();
       }
       f.process();
      };
     }
     var c = false;
     var f = {
      _tasks: new Rn(),
      concurrency: t,
      payload: n,
      saturated: K,
      unsaturated: K,
      buffer: t / 4,
      empty: K,
      drain: K,
      error: K,
      started: false,
      paused: false,
      push: function(e, t) {
       a(e, false, t);
      },
      kill: function() {
       f.drain = K;
       f._tasks.empty();
      },
      unshift: function(e, t) {
       a(e, true, t);
      },
      remove: function(e) {
       f._tasks.remove(e);
      },
      process: function() {
       if (c) {
        return;
       }
       c = true;
       while (!f.paused && i < f.concurrency && f._tasks.length) {
        var e = [], t = [];
        var n = f._tasks.length;
        if (f.payload) n = Math.min(n, f.payload);
        for (var s = 0; s < n; s++) {
         var a = f._tasks.shift();
         e.push(a);
         o.push(a);
         t.push(a.data);
        }
        i += 1;
        if (f._tasks.length === 0) {
         f.empty();
        }
        if (i === f.concurrency) {
         f.saturated();
        }
        var l = ut(u(e));
        r(t, l);
       }
       c = false;
      },
      length: function() {
       return f._tasks.length;
      },
      running: function() {
       return i;
      },
      workersList: function() {
       return o;
      },
      idle: function() {
       return f._tasks.length + i === 0;
      },
      pause: function() {
       f.paused = true;
      },
      resume: function() {
       if (f.paused === false) {
        return;
       }
       f.paused = false;
       l(f.process);
      }
     };
     return f;
    }
    function In(e, t) {
     return An(e, 1, t);
    }
    var Mn = lt(ft, 1);
    function qn(e, t, n, r) {
     r = U(r || K);
     var i = g(n);
     Mn(e, function(e, n, r) {
      i(t, e, function(e, n) {
       t = n;
       r(e);
      });
     }, function(e) {
      r(e, t);
     });
    }
    function Nn() {
     var e = Tt(arguments, g);
     return function() {
      var t = n(arguments);
      var r = this;
      var i = t[t.length - 1];
      if (typeof i == "function") {
       t.pop();
      } else {
       i = K;
      }
      qn(e, t, function(e, t, i) {
       t.apply(r, e.concat(function(e) {
        var t = n(arguments, 1);
        i(e, t);
       }));
      }, function(e, t) {
       i.apply(r, [ e ].concat(t));
      });
     };
    }
    var Ln = function() {
     return Nn.apply(null, n(arguments).reverse());
    };
    var Fn = Array.prototype.concat;
    var zn = function(e, t, r, i) {
     i = i || K;
     var o = g(r);
     wt(e, t, function(e, t) {
      o(e, function(e) {
       if (e) return t(e);
       return t(null, n(arguments, 1));
      });
     }, function(e, t) {
      var n = [];
      for (var r = 0; r < t.length; r++) {
       if (t[r]) {
        n = Fn.apply(n, t[r]);
       }
      }
      return i(e, n);
     });
    };
    var Wn = lt(zn, Infinity);
    var $n = lt(zn, 1);
    var Bn = function() {
     var e = n(arguments);
     var t = [ null ].concat(e);
     return function() {
      var e = arguments[arguments.length - 1];
      return e.apply(this, t);
     };
    };
    function Kn(e) {
     return e;
    }
    function Un(e, t) {
     return function(n, r, i, o) {
      o = o || K;
      var s = false;
      var a;
      n(r, function(n, r, o) {
       i(n, function(r, i) {
        if (r) {
         o(r);
        } else if (e(i) && !a) {
         s = true;
         a = t(true, n);
         o(null, B);
        } else {
         o();
        }
       });
      }, function(e) {
       if (e) {
        o(e);
       } else {
        o(null, s ? a : t(false));
       }
      });
     };
    }
    function Hn(e, t) {
     return t;
    }
    var Vn = vt(Un(Kn, Hn));
    var Jn = bt(Un(Kn, Hn));
    var Gn = lt(Jn, 1);
    function Qn(e) {
     return function(t) {
      var r = n(arguments, 1);
      r.push(function(t) {
       var r = n(arguments, 1);
       if (typeof console === "object") {
        if (t) {
         if (console.error) {
          console.error(t);
         }
        } else if (console[e]) {
         Ot(r, function(t) {
          console[e](t);
         });
        }
       }
      });
      g(t).apply(null, r);
     };
    }
    var Yn = Qn("dir");
    function Zn(e, t, r) {
     r = ut(r || K);
     var i = g(e);
     var o = g(t);
     function s(e) {
      if (e) return r(e);
      var t = n(arguments, 1);
      t.push(a);
      o.apply(this, t);
     }
     function a(e, t) {
      if (e) return r(e);
      if (!t) return r(null);
      i(s);
     }
     a(null, true);
    }
    function Xn(e, t, r) {
     r = ut(r || K);
     var i = g(e);
     var o = function(e) {
      if (e) return r(e);
      var s = n(arguments, 1);
      if (t.apply(this, s)) return i(o);
      r.apply(null, [ null ].concat(s));
     };
     i(o);
    }
    function er(e, t, n) {
     Xn(e, function() {
      return !t.apply(this, arguments);
     }, n);
    }
    function tr(e, t, n) {
     n = ut(n || K);
     var r = g(t);
     var i = g(e);
     function o(e) {
      if (e) return n(e);
      i(s);
     }
     function s(e, t) {
      if (e) return n(e);
      if (!t) return n(null);
      r(o);
     }
     i(s);
    }
    function nr(e) {
     return function(t, n, r) {
      return e(t, r);
     };
    }
    function rr(e, t, n) {
     pt(e, nr(g(t)), n);
    }
    function ir(e, t, n, r) {
     ct(t)(e, nr(g(n)), r);
    }
    var or = lt(ir, 1);
    function sr(e) {
     if (y(e)) return e;
     return i(function(t, n) {
      var r = true;
      t.push(function() {
       var e = arguments;
       if (r) {
        l(function() {
         n.apply(null, e);
        });
       } else {
        n.apply(null, e);
       }
      });
      e.apply(this, t);
      r = false;
     });
    }
    function ar(e) {
     return !e;
    }
    var ur = vt(Un(ar, ar));
    var cr = bt(Un(ar, ar));
    var fr = lt(cr, 1);
    function lr(e) {
     return function(t) {
      return t == null ? undefined : t[e];
     };
    }
    function hr(e, t, n, r) {
     var i = new Array(t.length);
     e(t, function(e, t, r) {
      n(e, function(e, n) {
       i[t] = !!n;
       r(e);
      });
     }, function(e) {
      if (e) return r(e);
      var n = [];
      for (var o = 0; o < t.length; o++) {
       if (i[o]) n.push(t[o]);
      }
      r(null, n);
     });
    }
    function dr(e, t, n, r) {
     var i = [];
     e(t, function(e, t, r) {
      n(e, function(n, o) {
       if (n) {
        r(n);
       } else {
        if (o) {
         i.push({
          index: t,
          value: e
         });
        }
        r();
       }
      });
     }, function(e) {
      if (e) {
       r(e);
      } else {
       r(null, Tt(i.sort(function(e, t) {
        return e.index - t.index;
       }), lr("value")));
      }
     });
    }
    function pr(e, t, n, r) {
     var i = $(t) ? hr : dr;
     i(e, t, g(n), r || K);
    }
    var vr = vt(pr);
    var yr = bt(pr);
    var gr = lt(yr, 1);
    function mr(e, t) {
     var n = ut(t || K);
     var r = g(sr(e));
     function i(e) {
      if (e) return n(e);
      r(i);
     }
     i();
    }
    var br = function(e, t, n, r) {
     r = r || K;
     var i = g(n);
     wt(e, t, function(e, t) {
      i(e, function(n, r) {
       if (n) return t(n);
       return t(null, {
        key: r,
        val: e
       });
      });
     }, function(e, t) {
      var n = {};
      var i = Object.prototype.hasOwnProperty;
      for (var o = 0; o < t.length; o++) {
       if (t[o]) {
        var s = t[o].key;
        var a = t[o].val;
        if (i.call(n, s)) {
         n[s].push(a);
        } else {
         n[s] = [ a ];
        }
       }
      }
      return r(e, n);
     });
    };
    var wr = lt(br, Infinity);
    var _r = lt(br, 1);
    var xr = Qn("log");
    function Or(e, t, n, r) {
     r = U(r || K);
     var i = {};
     var o = g(n);
     ft(e, t, function(e, t, n) {
      o(e, t, function(e, r) {
       if (e) return n(e);
       i[t] = r;
       n();
      });
     }, function(e) {
      r(e, i);
     });
    }
    var Sr = lt(Or, Infinity);
    var kr = lt(Or, 1);
    function Cr(e, t) {
     return t in e;
    }
    function Dr(e, t) {
     var r = Object.create(null);
     var o = Object.create(null);
     t = t || Kn;
     var s = g(e);
     var a = i(function e(i, a) {
      var u = t.apply(null, i);
      if (Cr(r, u)) {
       l(function() {
        a.apply(null, r[u]);
       });
      } else if (Cr(o, u)) {
       o[u].push(a);
      } else {
       o[u] = [ a ];
       s.apply(null, i.concat(function() {
        var e = n(arguments);
        r[u] = e;
        var t = o[u];
        delete o[u];
        for (var i = 0, s = t.length; i < s; i++) {
         t[i].apply(null, e);
        }
       }));
      }
     });
     a.memo = r;
     a.unmemoized = e;
     return a;
    }
    var jr;
    if (a) {
     jr = process.nextTick;
    } else if (s) {
     jr = setImmediate;
    } else {
     jr = u;
    }
    var Er = c(jr);
    function Pr(e, t, r) {
     r = r || K;
     var i = $(t) ? [] : {};
     e(t, function(e, t, r) {
      g(e)(function(e, o) {
       if (arguments.length > 2) {
        o = n(arguments, 1);
       }
       i[t] = o;
       r(e);
      });
     }, function(e) {
      r(e, i);
     });
    }
    function Rr(e, t) {
     Pr(pt, e, t);
    }
    function Tr(e, t, n) {
     Pr(ct(t), e, n);
    }
    var Ar = function(e, t) {
     var n = g(e);
     return An(function(e, t) {
      n(e[0], t);
     }, t, 1);
    };
    var Ir = function(e, t) {
     var n = Ar(e, t);
     n.push = function(e, t, r) {
      if (r == null) r = K;
      if (typeof r !== "function") {
       throw new Error("task callback must be a function");
      }
      n.started = true;
      if (!ne(e)) {
       e = [ e ];
      }
      if (e.length === 0) {
       return l(function() {
        n.drain();
       });
      }
      t = t || 0;
      var i = n._tasks.head;
      while (i && t >= i.priority) {
       i = i.next;
      }
      for (var o = 0, s = e.length; o < s; o++) {
       var a = {
        data: e[o],
        priority: t,
        callback: r
       };
       if (i) {
        n._tasks.insertBefore(i, a);
       } else {
        n._tasks.push(a);
       }
      }
      l(n.process);
     };
     delete n.unshift;
     return n;
    };
    function Mr(e, t) {
     t = U(t || K);
     if (!ne(e)) return t(new TypeError("First argument to race must be an array of functions"));
     if (!e.length) return t();
     for (var n = 0, r = e.length; n < r; n++) {
      g(e[n])(t);
     }
    }
    function qr(e, t, r, i) {
     var o = n(e).reverse();
     qn(o, t, r, i);
    }
    function Nr(e) {
     var t = g(e);
     return i(function e(r, i) {
      r.push(function e(t, r) {
       if (t) {
        i(null, {
         error: t
        });
       } else {
        var o;
        if (arguments.length <= 2) {
         o = r;
        } else {
         o = n(arguments, 1);
        }
        i(null, {
         value: o
        });
       }
      });
      return t.apply(this, r);
     });
    }
    function Lr(e) {
     var t;
     if (ne(e)) {
      t = Tt(e, Nr);
     } else {
      t = {};
      Ct(e, function(e, n) {
       t[n] = Nr.call(this, e);
      });
     }
     return t;
    }
    function Fr(e, t, n, r) {
     pr(e, t, function(e, t) {
      n(e, function(e, n) {
       t(e, !n);
      });
     }, r);
    }
    var zr = vt(Fr);
    var Wr = bt(Fr);
    var $r = lt(Wr, 1);
    function Br(e) {
     return function() {
      return e;
     };
    }
    function Kr(e, t, n) {
     var r = 5;
     var i = 0;
     var o = {
      times: r,
      intervalFunc: Br(i)
     };
     function s(e, t) {
      if (typeof t === "object") {
       e.times = +t.times || r;
       e.intervalFunc = typeof t.interval === "function" ? t.interval : Br(+t.interval || i);
       e.errorFilter = t.errorFilter;
      } else if (typeof t === "number" || typeof t === "string") {
       e.times = +t || r;
      } else {
       throw new Error("Invalid arguments for async.retry");
      }
     }
     if (arguments.length < 3 && typeof e === "function") {
      n = t || K;
      t = e;
     } else {
      s(o, e);
      n = n || K;
     }
     if (typeof t !== "function") {
      throw new Error("Invalid arguments for async.retry");
     }
     var a = g(t);
     var u = 1;
     function c() {
      a(function(e) {
       if (e && u++ < o.times && (typeof o.errorFilter != "function" || o.errorFilter(e))) {
        setTimeout(c, o.intervalFunc(u));
       } else {
        n.apply(null, arguments);
       }
      });
     }
     c();
    }
    var Ur = function(e, t) {
     if (!t) {
      t = e;
      e = null;
     }
     var n = g(t);
     return i(function(t, r) {
      function i(e) {
       n.apply(null, t.concat(e));
      }
      if (e) Kr(e, i, r); else Kr(i, r);
     });
    };
    function Hr(e, t) {
     Pr(Mn, e, t);
    }
    var Vr = vt(Un(Boolean, Kn));
    var Jr = bt(Un(Boolean, Kn));
    var Gr = lt(Jr, 1);
    function Qr(e, t, n) {
     var r = g(t);
     gt(e, function(e, t) {
      r(e, function(n, r) {
       if (n) return t(n);
       t(null, {
        value: e,
        criteria: r
       });
      });
     }, function(e, t) {
      if (e) return n(e);
      n(null, Tt(t.sort(i), lr("value")));
     });
     function i(e, t) {
      var n = e.criteria, r = t.criteria;
      return n < r ? -1 : n > r ? 1 : 0;
     }
    }
    function Yr(e, t, n) {
     var r = g(e);
     return i(function(i, o) {
      var s = false;
      var a;
      function u() {
       var t = e.name || "anonymous";
       var r = new Error('Callback function "' + t + '" timed out.');
       r.code = "ETIMEDOUT";
       if (n) {
        r.info = n;
       }
       s = true;
       o(r);
      }
      i.push(function() {
       if (!s) {
        o.apply(null, arguments);
        clearTimeout(a);
       }
      });
      a = setTimeout(u, t);
      r.apply(null, i);
     });
    }
    var Zr = Math.ceil;
    var Xr = Math.max;
    function ei(e, t, n, r) {
     var i = -1, o = Xr(Zr((t - e) / (n || 1)), 0), s = Array(o);
     while (o--) {
      s[r ? o : ++i] = e;
      e += n;
     }
     return s;
    }
    function ti(e, t, n, r) {
     var i = g(n);
     wt(ei(0, e, 1), t, i, r);
    }
    var ni = lt(ti, Infinity);
    var ri = lt(ti, 1);
    function ii(e, t, n, r) {
     if (arguments.length <= 3) {
      r = n;
      n = t;
      t = ne(e) ? [] : {};
     }
     r = U(r || K);
     var i = g(n);
     pt(e, function(e, n, r) {
      i(t, e, n, r);
     }, function(e) {
      r(e, t);
     });
    }
    function oi(e, t) {
     var r = null;
     var i;
     t = t || K;
     or(e, function(e, t) {
      g(e)(function(e, o) {
       if (arguments.length > 2) {
        i = n(arguments, 1);
       } else {
        i = o;
       }
       r = e;
       t(!e);
      });
     }, function() {
      t(r, i);
     });
    }
    function si(e) {
     return function() {
      return (e.unmemoized || e).apply(null, arguments);
     };
    }
    function ai(e, t, r) {
     r = ut(r || K);
     var i = g(t);
     if (!e()) return r(null);
     var o = function(t) {
      if (t) return r(t);
      if (e()) return i(o);
      var s = n(arguments, 1);
      r.apply(null, [ null ].concat(s));
     };
     i(o);
    }
    function ui(e, t, n) {
     ai(function() {
      return !e.apply(this, arguments);
     }, t, n);
    }
    var ci = function(e, t) {
     t = U(t || K);
     if (!ne(e)) return t(new Error("First argument to waterfall must be an array of functions"));
     if (!e.length) return t();
     var r = 0;
     function i(t) {
      var n = g(e[r++]);
      t.push(ut(o));
      n.apply(null, t);
     }
     function o(o) {
      if (o || r === e.length) {
       return t.apply(null, arguments);
      }
      i(n(arguments, 1));
     }
     i([]);
    };
    var fi = {
     apply: r,
     applyEach: mt,
     applyEachSeries: xt,
     asyncify: h,
     auto: Rt,
     autoInject: Pn,
     cargo: In,
     compose: Ln,
     concat: Wn,
     concatLimit: zn,
     concatSeries: $n,
     constant: Bn,
     detect: Vn,
     detectLimit: Jn,
     detectSeries: Gn,
     dir: Yn,
     doDuring: Zn,
     doUntil: er,
     doWhilst: Xn,
     during: tr,
     each: rr,
     eachLimit: ir,
     eachOf: pt,
     eachOfLimit: ft,
     eachOfSeries: Mn,
     eachSeries: or,
     ensureAsync: sr,
     every: ur,
     everyLimit: cr,
     everySeries: fr,
     filter: vr,
     filterLimit: yr,
     filterSeries: gr,
     forever: mr,
     groupBy: wr,
     groupByLimit: br,
     groupBySeries: _r,
     log: xr,
     map: gt,
     mapLimit: wt,
     mapSeries: _t,
     mapValues: Sr,
     mapValuesLimit: Or,
     mapValuesSeries: kr,
     memoize: Dr,
     nextTick: Er,
     parallel: Rr,
     parallelLimit: Tr,
     priorityQueue: Ir,
     queue: Ar,
     race: Mr,
     reduce: qn,
     reduceRight: qr,
     reflect: Nr,
     reflectAll: Lr,
     reject: zr,
     rejectLimit: Wr,
     rejectSeries: $r,
     retry: Kr,
     retryable: Ur,
     seq: Nn,
     series: Hr,
     setImmediate: l,
     some: Vr,
     someLimit: Jr,
     someSeries: Gr,
     sortBy: Qr,
     timeout: Yr,
     times: ni,
     timesLimit: ti,
     timesSeries: ri,
     transform: ii,
     tryEach: oi,
     unmemoize: si,
     until: ui,
     waterfall: ci,
     whilst: ai,
     all: ur,
     allLimit: cr,
     allSeries: fr,
     any: Vr,
     anyLimit: Jr,
     anySeries: Gr,
     find: Vn,
     findLimit: Jn,
     findSeries: Gn,
     forEach: rr,
     forEachSeries: or,
     forEachLimit: ir,
     forEachOf: pt,
     forEachOfSeries: Mn,
     forEachOfLimit: ft,
     inject: qn,
     foldl: qn,
     foldr: qr,
     select: vr,
     selectLimit: yr,
     selectSeries: gr,
     wrapSync: h
    };
    t["default"] = fi;
    t.apply = r;
    t.applyEach = mt;
    t.applyEachSeries = xt;
    t.asyncify = h;
    t.auto = Rt;
    t.autoInject = Pn;
    t.cargo = In;
    t.compose = Ln;
    t.concat = Wn;
    t.concatLimit = zn;
    t.concatSeries = $n;
    t.constant = Bn;
    t.detect = Vn;
    t.detectLimit = Jn;
    t.detectSeries = Gn;
    t.dir = Yn;
    t.doDuring = Zn;
    t.doUntil = er;
    t.doWhilst = Xn;
    t.during = tr;
    t.each = rr;
    t.eachLimit = ir;
    t.eachOf = pt;
    t.eachOfLimit = ft;
    t.eachOfSeries = Mn;
    t.eachSeries = or;
    t.ensureAsync = sr;
    t.every = ur;
    t.everyLimit = cr;
    t.everySeries = fr;
    t.filter = vr;
    t.filterLimit = yr;
    t.filterSeries = gr;
    t.forever = mr;
    t.groupBy = wr;
    t.groupByLimit = br;
    t.groupBySeries = _r;
    t.log = xr;
    t.map = gt;
    t.mapLimit = wt;
    t.mapSeries = _t;
    t.mapValues = Sr;
    t.mapValuesLimit = Or;
    t.mapValuesSeries = kr;
    t.memoize = Dr;
    t.nextTick = Er;
    t.parallel = Rr;
    t.parallelLimit = Tr;
    t.priorityQueue = Ir;
    t.queue = Ar;
    t.race = Mr;
    t.reduce = qn;
    t.reduceRight = qr;
    t.reflect = Nr;
    t.reflectAll = Lr;
    t.reject = zr;
    t.rejectLimit = Wr;
    t.rejectSeries = $r;
    t.retry = Kr;
    t.retryable = Ur;
    t.seq = Nn;
    t.series = Hr;
    t.setImmediate = l;
    t.some = Vr;
    t.someLimit = Jr;
    t.someSeries = Gr;
    t.sortBy = Qr;
    t.timeout = Yr;
    t.times = ni;
    t.timesLimit = ti;
    t.timesSeries = ri;
    t.transform = ii;
    t.tryEach = oi;
    t.unmemoize = si;
    t.until = ui;
    t.waterfall = ci;
    t.whilst = ai;
    t.all = ur;
    t.allLimit = cr;
    t.allSeries = fr;
    t.any = Vr;
    t.anyLimit = Jr;
    t.anySeries = Gr;
    t.find = Vn;
    t.findLimit = Jn;
    t.findSeries = Gn;
    t.forEach = rr;
    t.forEachSeries = or;
    t.forEachLimit = ir;
    t.forEachOf = pt;
    t.forEachOfSeries = Mn;
    t.forEachOfLimit = ft;
    t.inject = qn;
    t.foldl = qn;
    t.foldr = qr;
    t.select = vr;
    t.selectLimit = yr;
    t.selectSeries = gr;
    t.wrapSync = h;
    Object.defineProperty(t, "__esModule", {
     value: true
    });
   });
  }).call(this, n("YuTi")(e));
 },
 dMAy: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e) {
    this._value = e;
   }
   asHex() {
    return this._value;
   }
   equals(e) {
    return this.asHex() === e.asHex();
   }
  }
  class i extends r {
   constructor() {
    super([ i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), "-", i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), "-", "4", i._randomHex(), i._randomHex(), i._randomHex(), "-", i._oneOf(i._timeHighBits), i._randomHex(), i._randomHex(), i._randomHex(), "-", i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex(), i._randomHex() ].join(""));
   }
   static _oneOf(e) {
    return e[Math.floor(e.length * Math.random())];
   }
   static _randomHex() {
    return i._oneOf(i._chars);
   }
  }
  i._chars = [ "0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
  i._timeHighBits = [ "8", "9", "a", "b" ];
  t.empty = new r("00000000-0000-0000-0000-000000000000");
  function o() {
   return new i();
  }
  t.v4 = o;
  const s = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function a(e) {
   return s.test(e);
  }
  t.isUUID = a;
  function u(e) {
   if (!a(e)) {
    throw new Error("invalid uuid");
   }
   return new r(e);
  }
  t.parse = u;
  function c() {
   return o().asHex();
  }
  t.generateUuid = c;
 },
 e3vP: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  const o = n("4Tfi");
  const s = n("pBAs");
  function a(e) {
   return s.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    let r = null;
    try {
     r = yield o.getPrefix(e, t);
    } catch (e) {}
    if (null == r) return [];
    const s = i.merlin.Position.fromCode(t.position);
    const a = i.merlin.Query.complete.prefix(r).at(s).with.doc();
    const u = yield e.merlin.query(a, n, t.textDocument, Infinity);
    if ("return" !== u.class) return [];
    const c = u.value.entries || [];
    return c.map(i.merlin.Completion.intoCode);
   }));
  }
  t.default = a;
 },
 eWRo: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  function i(e = "") {
   return e.trim() === e;
  }
  function o(e, t) {
   return r(this, void 0, void 0, function*() {
    const n = e.synchronizer.getTextDocument(t.textDocument.uri);
    if (null == n) return "";
    const r = n.getText();
    const o = n.offsetAt(t.position);
    let s = o;
    while (0 < s && !i(r[s])) s--;
    let a = o;
    while (a < r.length && !i(r[a])) a++;
    return r.substring(s, a);
   });
  }
  t.default = o;
 },
 fewI: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e, t = null, n = new Date()) {
    this.task = e;
    this.token = t;
    this.enqueuedAt = n;
   }
  }
  t.Task = r;
 },
 gcj8: function(e, t, n) {
  "use strict";
  var r = this && this.__extends || function() {
   var e = Object.setPrototypeOf || {
    __proto__: []
   } instanceof Array && function(e, t) {
    e.__proto__ = t;
   } || function(e, t) {
    for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
   };
   return function(t, n) {
    e(t, n);
    function r() {
     this.constructor = t;
    }
    t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
   };
  }();
  function i(e) {
   for (var n in e) if (!t.hasOwnProperty(n)) t[n] = e[n];
  }
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var o = n("lq4E");
  var s = n("FNMX");
  t.RequestType = s.RequestType;
  t.RequestType0 = s.RequestType0;
  t.RequestType1 = s.RequestType1;
  t.RequestType2 = s.RequestType2;
  t.RequestType3 = s.RequestType3;
  t.RequestType4 = s.RequestType4;
  t.RequestType5 = s.RequestType5;
  t.RequestType6 = s.RequestType6;
  t.RequestType7 = s.RequestType7;
  t.RequestType8 = s.RequestType8;
  t.RequestType9 = s.RequestType9;
  t.ResponseError = s.ResponseError;
  t.ErrorCodes = s.ErrorCodes;
  t.NotificationType = s.NotificationType;
  t.NotificationType0 = s.NotificationType0;
  t.NotificationType1 = s.NotificationType1;
  t.NotificationType2 = s.NotificationType2;
  t.NotificationType3 = s.NotificationType3;
  t.NotificationType4 = s.NotificationType4;
  t.NotificationType5 = s.NotificationType5;
  t.NotificationType6 = s.NotificationType6;
  t.NotificationType7 = s.NotificationType7;
  t.NotificationType8 = s.NotificationType8;
  t.NotificationType9 = s.NotificationType9;
  var a = n("Cs6m");
  t.MessageReader = a.MessageReader;
  t.StreamMessageReader = a.StreamMessageReader;
  t.IPCMessageReader = a.IPCMessageReader;
  t.SocketMessageReader = a.SocketMessageReader;
  var u = n("hDOz");
  t.MessageWriter = u.MessageWriter;
  t.StreamMessageWriter = u.StreamMessageWriter;
  t.IPCMessageWriter = u.IPCMessageWriter;
  t.SocketMessageWriter = u.SocketMessageWriter;
  var c = n("rCXO");
  t.Disposable = c.Disposable;
  t.Event = c.Event;
  t.Emitter = c.Emitter;
  var f = n("Ml04");
  t.CancellationTokenSource = f.CancellationTokenSource;
  t.CancellationToken = f.CancellationToken;
  var l = n("++YM");
  i(n("uLJd"));
  i(n("MdGR"));
  var h;
  (function(e) {
   e.type = new s.NotificationType("$/cancelRequest");
  })(h || (h = {}));
  t.NullLogger = Object.freeze({
   error: function() {},
   warn: function() {},
   info: function() {},
   log: function() {}
  });
  var d;
  (function(e) {
   e[e["Off"] = 0] = "Off";
   e[e["Messages"] = 1] = "Messages";
   e[e["Verbose"] = 2] = "Verbose";
  })(d = t.Trace || (t.Trace = {}));
  (function(e) {
   function t(t) {
    t = t.toLowerCase();
    switch (t) {
    case "off":
     return e.Off;

    case "messages":
     return e.Messages;

    case "verbose":
     return e.Verbose;

    default:
     return e.Off;
    }
   }
   e.fromString = t;
   function n(t) {
    switch (t) {
    case e.Off:
     return "off";

    case e.Messages:
     return "messages";

    case e.Verbose:
     return "verbose";

    default:
     return "off";
    }
   }
   e.toString = n;
  })(d = t.Trace || (t.Trace = {}));
  var p;
  (function(e) {
   e.type = new s.NotificationType("$/setTraceNotification");
  })(p = t.SetTraceNotification || (t.SetTraceNotification = {}));
  var v;
  (function(e) {
   e.type = new s.NotificationType("$/logTraceNotification");
  })(v = t.LogTraceNotification || (t.LogTraceNotification = {}));
  var y;
  (function(e) {
   e[e["Closed"] = 1] = "Closed";
   e[e["Disposed"] = 2] = "Disposed";
   e[e["AlreadyListening"] = 3] = "AlreadyListening";
  })(y = t.ConnectionErrors || (t.ConnectionErrors = {}));
  var g = function(e) {
   r(t, e);
   function t(n, r) {
    var i = e.call(this, r) || this;
    i.code = n;
    Object.setPrototypeOf(i, t.prototype);
    return i;
   }
   return t;
  }(Error);
  t.ConnectionError = g;
  var m;
  (function(e) {
   function t(e) {
    var t = e;
    return t && o.func(t.cancelUndispatched);
   }
   e.is = t;
  })(m = t.ConnectionStrategy || (t.ConnectionStrategy = {}));
  var b;
  (function(e) {
   e[e["New"] = 1] = "New";
   e[e["Listening"] = 2] = "Listening";
   e[e["Closed"] = 3] = "Closed";
   e[e["Disposed"] = 4] = "Disposed";
  })(b || (b = {}));
  function w(e, t, n, r) {
   var i = 0;
   var a = 0;
   var u = 0;
   var m = "2.0";
   var w = undefined;
   var _ = Object.create(null);
   var x = undefined;
   var O = Object.create(null);
   var S;
   var k = new l.LinkedMap();
   var C = Object.create(null);
   var D = Object.create(null);
   var j = d.Off;
   var E;
   var P = b.New;
   var R = new c.Emitter();
   var T = new c.Emitter();
   var A = new c.Emitter();
   var I = new c.Emitter();
   function M(e) {
    return "req-" + e.toString();
   }
   function q(e) {
    if (e === null) {
     return "res-unknown-" + (++u).toString();
    } else {
     return "res-" + e.toString();
    }
   }
   function N() {
    return "not-" + (++a).toString();
   }
   function L(e, t) {
    if (s.isRequestMessage(t)) {
     e.set(M(t.id), t);
    } else if (s.isResponseMessage(t)) {
     e.set(q(t.id), t);
    } else {
     e.set(N(), t);
    }
   }
   function F(e) {
    return undefined;
   }
   function z() {
    return P === b.Listening;
   }
   function W() {
    return P === b.Closed;
   }
   function $() {
    return P === b.Disposed;
   }
   function B() {
    if (P === b.New || P === b.Listening) {
     P = b.Closed;
     T.fire(undefined);
    }
   }
   function K(e) {
    R.fire([ e, undefined, undefined ]);
   }
   function U(e) {
    R.fire(e);
   }
   e.onClose(B);
   e.onError(K);
   t.onClose(B);
   t.onError(U);
   function H() {
    if (S || k.size === 0) {
     return;
    }
    S = setImmediate(function() {
     S = undefined;
     V();
    });
   }
   function V() {
    if (k.size === 0) {
     return;
    }
    var e = k.shift();
    try {
     if (s.isRequestMessage(e)) {
      G(e);
     } else if (s.isNotificationMessage(e)) {
      Y(e);
     } else if (s.isResponseMessage(e)) {
      Q(e);
     } else {
      Z(e);
     }
    } finally {
     H();
    }
   }
   var J = function(e) {
    try {
     if (s.isNotificationMessage(e) && e.method === h.type.method) {
      var n = M(e.params.id);
      var i = k.get(n);
      if (s.isRequestMessage(i)) {
       var o = r && r.cancelUndispatched ? r.cancelUndispatched(i, F) : F(i);
       if (o && (o.error !== void 0 || o.result !== void 0)) {
        k.delete(n);
        o.id = i.id;
        te(o, e.method, Date.now());
        t.write(o);
        return;
       }
      }
     }
     L(k, e);
    } finally {
     H();
    }
   };
   function G(e) {
    if ($()) {
     return;
    }
    function n(n, r, i) {
     var o = {
      jsonrpc: m,
      id: e.id
     };
     if (n instanceof s.ResponseError) {
      o.error = n.toJson();
     } else {
      o.result = n === void 0 ? null : n;
     }
     te(o, r, i);
     t.write(o);
    }
    function r(n, r, i) {
     var o = {
      jsonrpc: m,
      id: e.id,
      error: n.toJson()
     };
     te(o, r, i);
     t.write(o);
    }
    function i(n, r, i) {
     if (n === void 0) {
      n = null;
     }
     var o = {
      jsonrpc: m,
      id: e.id,
      result: n
     };
     te(o, r, i);
     t.write(o);
    }
    ne(e);
    var a = _[e.method];
    var u;
    var c;
    if (a) {
     u = a.type;
     c = a.handler;
    }
    var l = Date.now();
    if (c || w) {
     var h = new f.CancellationTokenSource();
     var d = String(e.id);
     D[d] = h;
     try {
      var p = void 0;
      if (e.params === void 0 || u !== void 0 && u.numberOfParams === 0) {
       p = c ? c(h.token) : w(e.method, h.token);
      } else if (o.array(e.params) && (u === void 0 || u.numberOfParams > 1)) {
       p = c ? c.apply(void 0, e.params.concat([ h.token ])) : w.apply(void 0, [ e.method ].concat(e.params, [ h.token ]));
      } else {
       p = c ? c(e.params, h.token) : w(e.method, e.params, h.token);
      }
      var v = p;
      if (!p) {
       delete D[d];
       i(p, e.method, l);
      } else if (v.then) {
       v.then(function(t) {
        delete D[d];
        n(t, e.method, l);
       }, function(t) {
        delete D[d];
        if (t instanceof s.ResponseError) {
         r(t, e.method, l);
        } else if (t && o.string(t.message)) {
         r(new s.ResponseError(s.ErrorCodes.InternalError, "Request " + e.method + " failed with message: " + t.message), e.method, l);
        } else {
         r(new s.ResponseError(s.ErrorCodes.InternalError, "Request " + e.method + " failed unexpectedly without providing any details."), e.method, l);
        }
       });
      } else {
       delete D[d];
       n(p, e.method, l);
      }
     } catch (t) {
      delete D[d];
      if (t instanceof s.ResponseError) {
       n(t, e.method, l);
      } else if (t && o.string(t.message)) {
       r(new s.ResponseError(s.ErrorCodes.InternalError, "Request " + e.method + " failed with message: " + t.message), e.method, l);
      } else {
       r(new s.ResponseError(s.ErrorCodes.InternalError, "Request " + e.method + " failed unexpectedly without providing any details."), e.method, l);
      }
     }
    } else {
     r(new s.ResponseError(s.ErrorCodes.MethodNotFound, "Unhandled method " + e.method), e.method, l);
    }
   }
   function Q(e) {
    if ($()) {
     return;
    }
    if (e.id === null) {
     if (e.error) {
      n.error("Received response message without id: Error is: \n" + JSON.stringify(e.error, undefined, 4));
     } else {
      n.error("Received response message without id. No further error information provided.");
     }
    } else {
     var t = String(e.id);
     var r = C[t];
     ie(e, r);
     if (r) {
      delete C[t];
      try {
       if (e.error) {
        var i = e.error;
        r.reject(new s.ResponseError(i.code, i.message, i.data));
       } else if (e.result !== void 0) {
        r.resolve(e.result);
       } else {
        throw new Error("Should never happen.");
       }
      } catch (i) {
       if (i.message) {
        n.error("Response handler '" + r.method + "' failed with message: " + i.message);
       } else {
        n.error("Response handler '" + r.method + "' failed unexpectedly.");
       }
      }
     }
    }
   }
   function Y(e) {
    if ($()) {
     return;
    }
    var t = undefined;
    var r;
    if (e.method === h.type.method) {
     r = function(e) {
      var t = e.id;
      var n = D[String(t)];
      if (n) {
       n.cancel();
      }
     };
    } else {
     var i = O[e.method];
     if (i) {
      r = i.handler;
      t = i.type;
     }
    }
    if (r || x) {
     try {
      re(e);
      if (e.params === void 0 || t !== void 0 && t.numberOfParams === 0) {
       r ? r() : x(e.method);
      } else if (o.array(e.params) && (t === void 0 || t.numberOfParams > 1)) {
       r ? r.apply(void 0, e.params) : x.apply(void 0, [ e.method ].concat(e.params));
      } else {
       r ? r(e.params) : x(e.method, e.params);
      }
     } catch (t) {
      if (t.message) {
       n.error("Notification handler '" + e.method + "' failed with message: " + t.message);
      } else {
       n.error("Notification handler '" + e.method + "' failed unexpectedly.");
      }
     }
    } else {
     A.fire(e);
    }
   }
   function Z(e) {
    if (!e) {
     n.error("Received empty message.");
     return;
    }
    n.error("Received message which is neither a response nor a notification message:\n" + JSON.stringify(e, null, 4));
    var t = e;
    if (o.string(t.id) || o.number(t.id)) {
     var r = String(t.id);
     var i = C[r];
     if (i) {
      i.reject(new Error("The received response has neither a result nor an error property."));
     }
    }
   }
   function X(e) {
    if (j === d.Off || !E) {
     return;
    }
    var t = undefined;
    if (j === d.Verbose && e.params) {
     t = "Params: " + JSON.stringify(e.params, null, 4) + "\n\n";
    }
    E.log("Sending request '" + e.method + " - (" + e.id + ")'.", t);
   }
   function ee(e) {
    if (j === d.Off || !E) {
     return;
    }
    var t = undefined;
    if (j === d.Verbose) {
     if (e.params) {
      t = "Params: " + JSON.stringify(e.params, null, 4) + "\n\n";
     } else {
      t = "No parameters provided.\n\n";
     }
    }
    E.log("Sending notification '" + e.method + "'.", t);
   }
   function te(e, t, n) {
    if (j === d.Off || !E) {
     return;
    }
    var r = undefined;
    if (j === d.Verbose) {
     if (e.error && e.error.data) {
      r = "Error data: " + JSON.stringify(e.error.data, null, 4) + "\n\n";
     } else {
      if (e.result) {
       r = "Result: " + JSON.stringify(e.result, null, 4) + "\n\n";
      } else if (e.error === void 0) {
       r = "No result returned.\n\n";
      }
     }
    }
    E.log("Sending response '" + t + " - (" + e.id + ")'. Processing request took " + (Date.now() - n) + "ms", r);
   }
   function ne(e) {
    if (j === d.Off || !E) {
     return;
    }
    var t = undefined;
    if (j === d.Verbose && e.params) {
     t = "Params: " + JSON.stringify(e.params, null, 4) + "\n\n";
    }
    E.log("Received request '" + e.method + " - (" + e.id + ")'.", t);
   }
   function re(e) {
    if (j === d.Off || !E || e.method === v.type.method) {
     return;
    }
    var t = undefined;
    if (j === d.Verbose) {
     if (e.params) {
      t = "Params: " + JSON.stringify(e.params, null, 4) + "\n\n";
     } else {
      t = "No parameters provided.\n\n";
     }
    }
    E.log("Received notification '" + e.method + "'.", t);
   }
   function ie(e, t) {
    if (j === d.Off || !E) {
     return;
    }
    var n = undefined;
    if (j === d.Verbose) {
     if (e.error && e.error.data) {
      n = "Error data: " + JSON.stringify(e.error.data, null, 4) + "\n\n";
     } else {
      if (e.result) {
       n = "Result: " + JSON.stringify(e.result, null, 4) + "\n\n";
      } else if (e.error === void 0) {
       n = "No result returned.\n\n";
      }
     }
    }
    if (t) {
     var r = e.error ? " Request failed: " + e.error.message + " (" + e.error.code + ")." : "";
     E.log("Received response '" + t.method + " - (" + e.id + ")' in " + (Date.now() - t.timerStart) + "ms." + r, n);
    } else {
     E.log("Received response " + e.id + " without active response promise.", n);
    }
   }
   function oe() {
    if (W()) {
     throw new g(y.Closed, "Connection is closed.");
    }
    if ($()) {
     throw new g(y.Disposed, "Connection is disposed.");
    }
   }
   function se() {
    if (z()) {
     throw new g(y.AlreadyListening, "Connection is already listening");
    }
   }
   function ae() {
    if (!z()) {
     throw new Error("Call listen() first.");
    }
   }
   function ue(e) {
    if (e === void 0) {
     return null;
    } else {
     return e;
    }
   }
   function ce(e, t) {
    var n;
    var r = e.numberOfParams;
    switch (r) {
    case 0:
     n = null;
     break;

    case 1:
     n = ue(t[0]);
     break;

    default:
     n = [];
     for (var i = 0; i < t.length && i < r; i++) {
      n.push(ue(t[i]));
     }
     if (t.length < r) {
      for (var i = t.length; i < r; i++) {
       n.push(null);
      }
     }
     break;
    }
    return n;
   }
   var fe = {
    sendNotification: function(e) {
     var n = [];
     for (var r = 1; r < arguments.length; r++) {
      n[r - 1] = arguments[r];
     }
     oe();
     var i;
     var s;
     if (o.string(e)) {
      i = e;
      switch (n.length) {
      case 0:
       s = null;
       break;

      case 1:
       s = n[0];
       break;

      default:
       s = n;
       break;
      }
     } else {
      i = e.method;
      s = ce(e, n);
     }
     var a = {
      jsonrpc: m,
      method: i,
      params: s
     };
     ee(a);
     t.write(a);
    },
    onNotification: function(e, t) {
     oe();
     if (o.func(e)) {
      x = e;
     } else if (t) {
      if (o.string(e)) {
       O[e] = {
        type: undefined,
        handler: t
       };
      } else {
       O[e.method] = {
        type: e,
        handler: t
       };
      }
     }
    },
    sendRequest: function(e) {
     var n = [];
     for (var r = 1; r < arguments.length; r++) {
      n[r - 1] = arguments[r];
     }
     oe();
     ae();
     var a;
     var u;
     var c = undefined;
     if (o.string(e)) {
      a = e;
      switch (n.length) {
      case 0:
       u = null;
       break;

      case 1:
       if (f.CancellationToken.is(n[0])) {
        u = null;
        c = n[0];
       } else {
        u = ue(n[0]);
       }
       break;

      default:
       var l = n.length - 1;
       if (f.CancellationToken.is(n[l])) {
        c = n[l];
        if (n.length === 2) {
         u = ue(n[0]);
        } else {
         u = n.slice(0, l).map(function(e) {
          return ue(e);
         });
        }
       } else {
        u = n.map(function(e) {
         return ue(e);
        });
       }
       break;
      }
     } else {
      a = e.method;
      u = ce(e, n);
      var d = e.numberOfParams;
      c = f.CancellationToken.is(n[d]) ? n[d] : undefined;
     }
     var p = i++;
     var v = new Promise(function(e, n) {
      var r = {
       jsonrpc: m,
       id: p,
       method: a,
       params: u
      };
      var i = {
       method: a,
       timerStart: Date.now(),
       resolve: e,
       reject: n
      };
      X(r);
      try {
       t.write(r);
      } catch (e) {
       i.reject(new s.ResponseError(s.ErrorCodes.MessageWriteError, e.message ? e.message : "Unknown reason"));
       i = null;
      }
      if (i) {
       C[String(p)] = i;
      }
     });
     if (c) {
      c.onCancellationRequested(function() {
       fe.sendNotification(h.type, {
        id: p
       });
      });
     }
     return v;
    },
    onRequest: function(e, t) {
     oe();
     if (o.func(e)) {
      w = e;
     } else if (t) {
      if (o.string(e)) {
       _[e] = {
        type: undefined,
        handler: t
       };
      } else {
       _[e.method] = {
        type: e,
        handler: t
       };
      }
     }
    },
    trace: function(e, t, n) {
     if (n === void 0) {
      n = false;
     }
     j = e;
     if (j === d.Off) {
      E = undefined;
     } else {
      E = t;
     }
     if (n && !W() && !$()) {
      fe.sendNotification(p.type, {
       value: d.toString(e)
      });
     }
    },
    onError: R.event,
    onClose: T.event,
    onUnhandledNotification: A.event,
    onDispose: I.event,
    dispose: function() {
     if ($()) {
      return;
     }
     P = b.Disposed;
     I.fire(undefined);
     var n = new Error("Connection got disposed.");
     Object.keys(C).forEach(function(e) {
      C[e].reject(n);
     });
     C = Object.create(null);
     D = Object.create(null);
     k = new l.LinkedMap();
     if (o.func(t.dispose)) {
      t.dispose();
     }
     if (o.func(e.dispose)) {
      e.dispose();
     }
    },
    listen: function() {
     oe();
     se();
     P = b.Listening;
     e.listen(J);
    },
    inspect: function() {
     console.log("inspect");
    }
   };
   fe.onNotification(v.type, function(e) {
    if (j === d.Off || !E) {
     return;
    }
    E.log(e.message, j === d.Verbose ? e.verbose : undefined);
   });
   return fe;
  }
  function _(e) {
   return e.listen !== void 0 && e.read === void 0;
  }
  function x(e) {
   return e.write !== void 0 && e.end === void 0;
  }
  function O(e, n, r, i) {
   if (!r) {
    r = t.NullLogger;
   }
   var o = _(e) ? e : new a.StreamMessageReader(e);
   var s = x(n) ? n : new u.StreamMessageWriter(n);
   return w(o, s, r, i);
  }
  t.createMessageConnection = O;
 },
 gnb0: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("UTJM");
  t.giveAvailableLibraries = r.default;
  const i = n("D11j");
  t.giveCaseAnalysis = i.default;
  const o = n("or0P");
  t.giveMerlinFiles = o.default;
  const s = n("KdWM");
  t.giveProjectEnv = s.default;
 },
 hDOz: function(e, t, n) {
  "use strict";
  var r = this && this.__extends || function() {
   var e = Object.setPrototypeOf || {
    __proto__: []
   } instanceof Array && function(e, t) {
    e.__proto__ = t;
   } || function(e, t) {
    for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
   };
   return function(t, n) {
    e(t, n);
    function r() {
     this.constructor = t;
    }
    t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
   };
  }();
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var i = n("rCXO");
  var o = n("lq4E");
  var s = "Content-Length: ";
  var a = "\r\n";
  var u;
  (function(e) {
   function t(e) {
    var t = e;
    return t && o.func(t.dispose) && o.func(t.onClose) && o.func(t.onError) && o.func(t.write);
   }
   e.is = t;
  })(u = t.MessageWriter || (t.MessageWriter = {}));
  var c = function() {
   function e() {
    this.errorEmitter = new i.Emitter();
    this.closeEmitter = new i.Emitter();
   }
   e.prototype.dispose = function() {
    this.errorEmitter.dispose();
    this.closeEmitter.dispose();
   };
   Object.defineProperty(e.prototype, "onError", {
    get: function() {
     return this.errorEmitter.event;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.fireError = function(e, t, n) {
    this.errorEmitter.fire([ this.asError(e), t, n ]);
   };
   Object.defineProperty(e.prototype, "onClose", {
    get: function() {
     return this.closeEmitter.event;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.fireClose = function() {
    this.closeEmitter.fire(undefined);
   };
   e.prototype.asError = function(e) {
    if (e instanceof Error) {
     return e;
    } else {
     return new Error("Writer recevied error. Reason: " + (o.string(e.message) ? e.message : "unknown"));
    }
   };
   return e;
  }();
  t.AbstractMessageWriter = c;
  var f = function(e) {
   r(t, e);
   function t(t, n) {
    if (n === void 0) {
     n = "utf8";
    }
    var r = e.call(this) || this;
    r.writable = t;
    r.encoding = n;
    r.errorCount = 0;
    r.writable.on("error", function(e) {
     return r.fireError(e);
    });
    r.writable.on("close", function() {
     return r.fireClose();
    });
    return r;
   }
   t.prototype.write = function(e) {
    var t = JSON.stringify(e);
    var n = Buffer.byteLength(t, this.encoding);
    var r = [ s, n.toString(), a, a ];
    try {
     this.writable.write(r.join(""), "ascii");
     this.writable.write(t, this.encoding);
     this.errorCount = 0;
    } catch (t) {
     this.errorCount++;
     this.fireError(t, e, this.errorCount);
    }
   };
   return t;
  }(c);
  t.StreamMessageWriter = f;
  var l = function(e) {
   r(t, e);
   function t(t) {
    var n = e.call(this) || this;
    n.process = t;
    n.errorCount = 0;
    n.queue = [];
    n.sending = false;
    var r = n.process;
    r.on("error", function(e) {
     return n.fireError(e);
    });
    r.on("close", function() {
     return n.fireClose;
    });
    return n;
   }
   t.prototype.write = function(e) {
    if (!this.sending && this.queue.length === 0) {
     this.doWriteMessage(e);
    } else {
     this.queue.push(e);
    }
   };
   t.prototype.doWriteMessage = function(e) {
    var t = this;
    try {
     if (this.process.send) {
      this.sending = true;
      this.process.send(e, undefined, undefined, function(n) {
       t.sending = false;
       if (n) {
        t.errorCount++;
        t.fireError(n, e, t.errorCount);
       } else {
        t.errorCount = 0;
       }
       if (t.queue.length > 0) {
        t.doWriteMessage(t.queue.shift());
       }
      });
     }
    } catch (t) {
     this.errorCount++;
     this.fireError(t, e, this.errorCount);
    }
   };
   return t;
  }(c);
  t.IPCMessageWriter = l;
  var h = function(e) {
   r(t, e);
   function t(t, n) {
    if (n === void 0) {
     n = "utf8";
    }
    var r = e.call(this) || this;
    r.socket = t;
    r.queue = [];
    r.sending = false;
    r.encoding = n;
    r.errorCount = 0;
    r.socket.on("error", function(e) {
     return r.fireError(e);
    });
    r.socket.on("close", function() {
     return r.fireClose();
    });
    return r;
   }
   t.prototype.write = function(e) {
    if (!this.sending && this.queue.length === 0) {
     this.doWriteMessage(e);
    } else {
     this.queue.push(e);
    }
   };
   t.prototype.doWriteMessage = function(e) {
    var t = this;
    var n = JSON.stringify(e);
    var r = Buffer.byteLength(n, this.encoding);
    var i = [ s, r.toString(), a, a ];
    try {
     this.sending = true;
     this.socket.write(i.join(""), "ascii", function(r) {
      if (r) {
       t.handleError(r, e);
      }
      try {
       t.socket.write(n, t.encoding, function(n) {
        t.sending = false;
        if (n) {
         t.handleError(n, e);
        } else {
         t.errorCount = 0;
        }
        if (t.queue.length > 0) {
         t.doWriteMessage(t.queue.shift());
        }
       });
      } catch (r) {
       t.handleError(r, e);
      }
     });
    } catch (t) {
     this.handleError(t, e);
    }
   };
   t.prototype.handleError = function(e, t) {
    this.errorCount++;
    this.fireError(e, t, this.errorCount);
   };
   return t;
  }(c);
  t.SocketMessageWriter = h;
 },
 hxPP: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("gcj8");
  var i;
  (function(e) {
   e.type = new r.RequestType("workspace/configuration");
  })(i = t.ConfigurationRequest || (t.ConfigurationRequest = {}));
 },
 iDKc: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("1jjw");
  const s = n("2SiB");
  const a = n("pBAs");
  function u(e) {
   return a.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const a = a => r(this, void 0, void 0, function*() {
     const r = s.merlin.Position.fromCode(t.position);
     const u = s.merlin.Query.locate(null, a).at(r);
     const c = yield e.merlin.query(u, n, t.textDocument);
     if ("return" !== c.class) return null;
     if (null == c.value.pos) return null;
     const f = c.value.file ? o.default.file(c.value.file).toString() : t.textDocument.uri;
     const l = s.merlin.Position.intoCode(c.value.pos);
     const h = i.Range.create(l, l);
     const d = i.Location.create(f, h);
     return d;
    });
    const u = yield a("ml");
    const c = [];
    if (null != u) c.push(u);
    return c;
   }));
  }
  t.default = u;
 },
 icBU: function(e, t) {
  e.exports = function(e, t) {
   var r = [];
   for (var i = 0; i < e.length; i++) {
    var o = t(e[i], i);
    if (n(o)) r.push.apply(r, o); else r.push(o);
   }
   return r;
  };
  var n = Array.isArray || function(e) {
   return Object.prototype.toString.call(e) === "[object Array]";
  };
 },
 "j/kR": function(e, t, n) {
  "use strict";
  function r(e) {
   for (var n in e) if (!t.hasOwnProperty(n)) t[n] = e[n];
  }
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  r(n("ZSFw"));
  r(n("4nfs"));
  r(n("GeYi"));
 },
 j1I1: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("nTOf");
  t.bucklescript = r;
  const i = n("WHP5");
  t.ocamldoc = i;
  const o = n("WqDQ");
  t.refmt = o;
 },
 jFrK: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
 },
 jK02: function(e, t) {
  e.exports = require("util");
 },
 "jle/": function(e, t) {
  e.exports = require("os");
 },
 k7xx: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e) {
    this.session = e;
   }
   run() {
    let e = "";
    return new Promise(t => {
     const n = this.session.settings.reason.path.bsb;
     const r = [ "-make-world" ];
     const i = this.session.environment.spawn(n, r);
     i.on("error", e => {
      if ("ENOENT" === e.code) {
       const e = `Cannot find bsb binary at "${n}".`;
       this.session.connection.window.showWarningMessage(e);
       this.session.connection.window.showWarningMessage(`Double check your path or try configuring "reason.path.bsb" under "User Settings". Alternatively, disable "bsb" in "reason.diagnostics.tools"`);
      }
      t("");
     });
     i.stdout.on("data", t => e += t.toString());
     i.stdout.on("end", () => t(e));
     i.on("uncaughtException", e => {
      this.session.connection.window.showWarningMessage(e.message);
     });
    });
   }
  }
  t.default = r;
 },
 kbA8: function(e, t, n) {
  "use strict";
  e.exports = r;
  function r(e, t, n) {
   if (e instanceof RegExp) e = i(e, n);
   if (t instanceof RegExp) t = i(t, n);
   var r = o(e, t, n);
   return r && {
    start: r[0],
    end: r[1],
    pre: n.slice(0, r[0]),
    body: n.slice(r[0] + e.length, r[1]),
    post: n.slice(r[1] + t.length)
   };
  }
  function i(e, t) {
   var n = t.match(e);
   return n ? n[0] : null;
  }
  r.range = o;
  function o(e, t, n) {
   var r, i, o, s, a;
   var u = n.indexOf(e);
   var c = n.indexOf(t, u + 1);
   var f = u;
   if (u >= 0 && c > 0) {
    r = [];
    o = n.length;
    while (f >= 0 && !a) {
     if (f == u) {
      r.push(f);
      u = n.indexOf(e, f + 1);
     } else if (r.length == 1) {
      a = [ r.pop(), c ];
     } else {
      i = r.pop();
      if (i < o) {
       o = i;
       s = c;
      }
      c = n.indexOf(t, f + 1);
     }
     f = u < c && u >= 0 ? u : c;
    }
    if (r.length) {
     a = [ o, s ];
    }
   }
   return a;
  }
 },
 kcoj: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("6Wkr");
  const o = n("KxYO");
  const s = n("AHUE");
  const a = n("YgwI");
  const u = n("Tqjb");
  t.Environment = u.default;
  const c = n("TKQy");
  const f = n("r56G");
  class l {
   constructor() {
    this.cancellationSources = {
     "analyzer/refreshWithKind": new o.CancellationTokenSource()
    };
    this.connection = i.createConnection();
    this.settings = {};
    this.analyzer = new a.default(this);
    this.environment = new u.default(this);
    this.indexer = new c.default(this);
    this.merlin = new s.Merlin(this);
    this.synchronizer = new f.default(this);
   }
   cancelTokens(e) {
    this.cancellationSources[e].cancel();
    this.cancellationSources[e] = new o.CancellationTokenSource();
    return;
   }
   dispose() {
    this.analyzer.dispose();
    this.environment.dispose();
    this.indexer.dispose();
    this.merlin.dispose();
    this.synchronizer.dispose();
   }
   error(e) {
    this.connection.console.error(JSON.stringify(e, null, 2));
   }
   initialize() {
    return r(this, void 0, void 0, function*() {
     yield this.environment.initialize();
     yield this.merlin.initialize();
     yield this.indexer.initialize();
     yield this.synchronizer.initialize();
     yield this.analyzer.initialize();
    });
   }
   listen() {
    this.synchronizer.listen();
    this.connection.listen();
   }
   log(e) {
    this.connection.console.log(JSON.stringify(e, null, 2));
   }
   onDidChangeConfiguration({settings: e}) {
    return r(this, void 0, void 0, function*() {
     const t = this.settings.reason.path.ocamlmerlin;
     this.settings = Object.assign({}, this.settings, e);
     if (this.settings.reason.path.ocamlmerlin !== t) {
      yield this.merlin.restart();
     }
     this.analyzer.onDidChangeConfiguration();
     this.synchronizer.onDidChangeConfiguration();
    });
   }
  }
  t.default = l;
 },
 kmEW: function(e, t, n) {
  "use strict";
  n.r(t);
  n.d(t, "Position", function() {
   return r;
  });
  n.d(t, "Range", function() {
   return i;
  });
  n.d(t, "Location", function() {
   return o;
  });
  n.d(t, "DiagnosticRelatedInformation", function() {
   return s;
  });
  n.d(t, "DiagnosticSeverity", function() {
   return a;
  });
  n.d(t, "Diagnostic", function() {
   return u;
  });
  n.d(t, "Command", function() {
   return c;
  });
  n.d(t, "TextEdit", function() {
   return f;
  });
  n.d(t, "TextDocumentEdit", function() {
   return l;
  });
  n.d(t, "WorkspaceEdit", function() {
   return h;
  });
  n.d(t, "WorkspaceChange", function() {
   return p;
  });
  n.d(t, "TextDocumentIdentifier", function() {
   return v;
  });
  n.d(t, "VersionedTextDocumentIdentifier", function() {
   return y;
  });
  n.d(t, "TextDocumentItem", function() {
   return g;
  });
  n.d(t, "MarkupKind", function() {
   return m;
  });
  n.d(t, "MarkupContent", function() {
   return b;
  });
  n.d(t, "CompletionItemKind", function() {
   return w;
  });
  n.d(t, "InsertTextFormat", function() {
   return _;
  });
  n.d(t, "CompletionItem", function() {
   return x;
  });
  n.d(t, "CompletionList", function() {
   return O;
  });
  n.d(t, "MarkedString", function() {
   return S;
  });
  n.d(t, "Hover", function() {
   return k;
  });
  n.d(t, "ParameterInformation", function() {
   return C;
  });
  n.d(t, "SignatureInformation", function() {
   return D;
  });
  n.d(t, "DocumentHighlightKind", function() {
   return j;
  });
  n.d(t, "DocumentHighlight", function() {
   return E;
  });
  n.d(t, "SymbolKind", function() {
   return P;
  });
  n.d(t, "SymbolInformation", function() {
   return R;
  });
  n.d(t, "CodeActionKind", function() {
   return T;
  });
  n.d(t, "CodeActionContext", function() {
   return A;
  });
  n.d(t, "CodeAction", function() {
   return I;
  });
  n.d(t, "CodeLens", function() {
   return M;
  });
  n.d(t, "FormattingOptions", function() {
   return q;
  });
  n.d(t, "DocumentLink", function() {
   return N;
  });
  n.d(t, "EOL", function() {
   return L;
  });
  n.d(t, "TextDocument", function() {
   return F;
  });
  n.d(t, "TextDocumentSaveReason", function() {
   return z;
  });
  var r;
  (function(e) {
   function t(e, t) {
    return {
     line: e,
     character: t
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.objectLiteral(t) && $.number(t.line) && $.number(t.character);
   }
   e.is = n;
  })(r || (r = {}));
  var i;
  (function(e) {
   function t(e, t, n, i) {
    if ($.number(e) && $.number(t) && $.number(n) && $.number(i)) {
     return {
      start: r.create(e, t),
      end: r.create(n, i)
     };
    } else if (r.is(e) && r.is(t)) {
     return {
      start: e,
      end: t
     };
    } else {
     throw new Error("Range#create called with invalid arguments[" + e + ", " + t + ", " + n + ", " + i + "]");
    }
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.objectLiteral(t) && r.is(t.start) && r.is(t.end);
   }
   e.is = n;
  })(i || (i = {}));
  var o;
  (function(e) {
   function t(e, t) {
    return {
     uri: e,
     range: t
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && i.is(t.range) && ($.string(t.uri) || $.undefined(t.uri));
   }
   e.is = n;
  })(o || (o = {}));
  var s;
  (function(e) {
   function t(e, t) {
    return {
     location: e,
     message: t
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && o.is(t.location) && $.string(t.message);
   }
   e.is = n;
  })(s || (s = {}));
  var a;
  (function(e) {
   e.Error = 1;
   e.Warning = 2;
   e.Information = 3;
   e.Hint = 4;
  })(a || (a = {}));
  var u;
  (function(e) {
   function t(e, t, n, r, i, o) {
    var s = {
     range: e,
     message: t
    };
    if ($.defined(n)) {
     s.severity = n;
    }
    if ($.defined(r)) {
     s.code = r;
    }
    if ($.defined(i)) {
     s.source = i;
    }
    if ($.defined(o)) {
     s.relatedInformation = o;
    }
    return s;
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && i.is(t.range) && $.string(t.message) && ($.number(t.severity) || $.undefined(t.severity)) && ($.number(t.code) || $.string(t.code) || $.undefined(t.code)) && ($.string(t.source) || $.undefined(t.source)) && ($.undefined(t.relatedInformation) || $.typedArray(t.relatedInformation, s.is));
   }
   e.is = n;
  })(u || (u = {}));
  var c;
  (function(e) {
   function t(e, t) {
    var n = [];
    for (var r = 2; r < arguments.length; r++) {
     n[r - 2] = arguments[r];
    }
    var i = {
     title: e,
     command: t
    };
    if ($.defined(n) && n.length > 0) {
     i.arguments = n;
    }
    return i;
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && $.string(t.title) && $.string(t.command);
   }
   e.is = n;
  })(c || (c = {}));
  var f;
  (function(e) {
   function t(e, t) {
    return {
     range: e,
     newText: t
    };
   }
   e.replace = t;
   function n(e, t) {
    return {
     range: {
      start: e,
      end: e
     },
     newText: t
    };
   }
   e.insert = n;
   function r(e) {
    return {
     range: e,
     newText: ""
    };
   }
   e.del = r;
  })(f || (f = {}));
  var l;
  (function(e) {
   function t(e, t) {
    return {
     textDocument: e,
     edits: t
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && y.is(t.textDocument) && Array.isArray(t.edits);
   }
   e.is = n;
  })(l || (l = {}));
  var h;
  (function(e) {
   function t(e) {
    var t = e;
    return t && (t.changes !== void 0 || t.documentChanges !== void 0) && (t.documentChanges === void 0 || $.typedArray(t.documentChanges, l.is));
   }
   e.is = t;
  })(h || (h = {}));
  var d = function() {
   function e(e) {
    this.edits = e;
   }
   e.prototype.insert = function(e, t) {
    this.edits.push(f.insert(e, t));
   };
   e.prototype.replace = function(e, t) {
    this.edits.push(f.replace(e, t));
   };
   e.prototype.delete = function(e) {
    this.edits.push(f.del(e));
   };
   e.prototype.add = function(e) {
    this.edits.push(e);
   };
   e.prototype.all = function() {
    return this.edits;
   };
   e.prototype.clear = function() {
    this.edits.splice(0, this.edits.length);
   };
   return e;
  }();
  var p = function() {
   function e(e) {
    var t = this;
    this._textEditChanges = Object.create(null);
    if (e) {
     this._workspaceEdit = e;
     if (e.documentChanges) {
      e.documentChanges.forEach(function(e) {
       var n = new d(e.edits);
       t._textEditChanges[e.textDocument.uri] = n;
      });
     } else if (e.changes) {
      Object.keys(e.changes).forEach(function(n) {
       var r = new d(e.changes[n]);
       t._textEditChanges[n] = r;
      });
     }
    }
   }
   Object.defineProperty(e.prototype, "edit", {
    get: function() {
     return this._workspaceEdit;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.getTextEditChange = function(e) {
    if (y.is(e)) {
     if (!this._workspaceEdit) {
      this._workspaceEdit = {
       documentChanges: []
      };
     }
     if (!this._workspaceEdit.documentChanges) {
      throw new Error("Workspace edit is not configured for versioned document changes.");
     }
     var t = e;
     var n = this._textEditChanges[t.uri];
     if (!n) {
      var r = [];
      var i = {
       textDocument: t,
       edits: r
      };
      this._workspaceEdit.documentChanges.push(i);
      n = new d(r);
      this._textEditChanges[t.uri] = n;
     }
     return n;
    } else {
     if (!this._workspaceEdit) {
      this._workspaceEdit = {
       changes: Object.create(null)
      };
     }
     if (!this._workspaceEdit.changes) {
      throw new Error("Workspace edit is not configured for normal text edit changes.");
     }
     var n = this._textEditChanges[e];
     if (!n) {
      var r = [];
      this._workspaceEdit.changes[e] = r;
      n = new d(r);
      this._textEditChanges[e] = n;
     }
     return n;
    }
   };
   return e;
  }();
  var v;
  (function(e) {
   function t(e) {
    return {
     uri: e
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && $.string(t.uri);
   }
   e.is = n;
  })(v || (v = {}));
  var y;
  (function(e) {
   function t(e, t) {
    return {
     uri: e,
     version: t
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && $.string(t.uri) && $.number(t.version);
   }
   e.is = n;
  })(y || (y = {}));
  var g;
  (function(e) {
   function t(e, t, n, r) {
    return {
     uri: e,
     languageId: t,
     version: n,
     text: r
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && $.string(t.uri) && $.string(t.languageId) && $.number(t.version) && $.string(t.text);
   }
   e.is = n;
  })(g || (g = {}));
  var m;
  (function(e) {
   e.PlainText = "plaintext";
   e.Markdown = "markdown";
  })(m || (m = {}));
  (function(e) {
   function t(t) {
    var n = t;
    return n === e.PlainText || n === e.Markdown;
   }
   e.is = t;
  })(m || (m = {}));
  var b;
  (function(e) {
   function t(e) {
    var t = e;
    return $.objectLiteral(e) && m.is(t.kind) && $.string(t.value);
   }
   e.is = t;
  })(b || (b = {}));
  var w;
  (function(e) {
   e.Text = 1;
   e.Method = 2;
   e.Function = 3;
   e.Constructor = 4;
   e.Field = 5;
   e.Variable = 6;
   e.Class = 7;
   e.Interface = 8;
   e.Module = 9;
   e.Property = 10;
   e.Unit = 11;
   e.Value = 12;
   e.Enum = 13;
   e.Keyword = 14;
   e.Snippet = 15;
   e.Color = 16;
   e.File = 17;
   e.Reference = 18;
   e.Folder = 19;
   e.EnumMember = 20;
   e.Constant = 21;
   e.Struct = 22;
   e.Event = 23;
   e.Operator = 24;
   e.TypeParameter = 25;
  })(w || (w = {}));
  var _;
  (function(e) {
   e.PlainText = 1;
   e.Snippet = 2;
  })(_ || (_ = {}));
  var x;
  (function(e) {
   function t(e) {
    return {
     label: e
    };
   }
   e.create = t;
  })(x || (x = {}));
  var O;
  (function(e) {
   function t(e, t) {
    return {
     items: e ? e : [],
     isIncomplete: !!t
    };
   }
   e.create = t;
  })(O || (O = {}));
  var S;
  (function(e) {
   function t(e) {
    return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
   }
   e.fromPlainText = t;
   function n(e) {
    var t = e;
    return $.string(t) || $.objectLiteral(t) && $.string(t.language) && $.string(t.value);
   }
   e.is = n;
  })(S || (S = {}));
  var k;
  (function(e) {
   function t(e) {
    var t = e;
    return $.objectLiteral(t) && (b.is(t.contents) || S.is(t.contents) || $.typedArray(t.contents, S.is)) && (e.range === void 0 || i.is(e.range));
   }
   e.is = t;
  })(k || (k = {}));
  var C;
  (function(e) {
   function t(e, t) {
    return t ? {
     label: e,
     documentation: t
    } : {
     label: e
    };
   }
   e.create = t;
  })(C || (C = {}));
  var D;
  (function(e) {
   function t(e, t) {
    var n = [];
    for (var r = 2; r < arguments.length; r++) {
     n[r - 2] = arguments[r];
    }
    var i = {
     label: e
    };
    if ($.defined(t)) {
     i.documentation = t;
    }
    if ($.defined(n)) {
     i.parameters = n;
    } else {
     i.parameters = [];
    }
    return i;
   }
   e.create = t;
  })(D || (D = {}));
  var j;
  (function(e) {
   e.Text = 1;
   e.Read = 2;
   e.Write = 3;
  })(j || (j = {}));
  var E;
  (function(e) {
   function t(e, t) {
    var n = {
     range: e
    };
    if ($.number(t)) {
     n.kind = t;
    }
    return n;
   }
   e.create = t;
  })(E || (E = {}));
  var P;
  (function(e) {
   e.File = 1;
   e.Module = 2;
   e.Namespace = 3;
   e.Package = 4;
   e.Class = 5;
   e.Method = 6;
   e.Property = 7;
   e.Field = 8;
   e.Constructor = 9;
   e.Enum = 10;
   e.Interface = 11;
   e.Function = 12;
   e.Variable = 13;
   e.Constant = 14;
   e.String = 15;
   e.Number = 16;
   e.Boolean = 17;
   e.Array = 18;
   e.Object = 19;
   e.Key = 20;
   e.Null = 21;
   e.EnumMember = 22;
   e.Struct = 23;
   e.Event = 24;
   e.Operator = 25;
   e.TypeParameter = 26;
  })(P || (P = {}));
  var R;
  (function(e) {
   function t(e, t, n, r, i) {
    var o = {
     name: e,
     kind: t,
     location: {
      uri: r,
      range: n
     }
    };
    if (i) {
     o.containerName = i;
    }
    return o;
   }
   e.create = t;
  })(R || (R = {}));
  var T;
  (function(e) {
   e.QuickFix = "quickfix";
   e.Refactor = "refactor";
   e.RefactorExtract = "refactor.extract";
   e.RefactorInline = "refactor.inline";
   e.RefactorRewrite = "refactor.rewrite";
   e.Source = "source";
   e.SourceOrganizeImports = "source.organizeImports";
  })(T || (T = {}));
  var A;
  (function(e) {
   function t(e, t) {
    var n = {
     diagnostics: e
    };
    if (t !== void 0 && t !== null) {
     n.only = t;
    }
    return n;
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && $.typedArray(t.diagnostics, u.is) && (t.only === void 0 || $.typedArray(t.only, $.string));
   }
   e.is = n;
  })(A || (A = {}));
  var I;
  (function(e) {
   function t(e, t, n) {
    var r = {
     title: e
    };
    if (c.is(t)) {
     r.command = t;
    } else {
     r.edit = t;
    }
    if (n !== void null) {
     r.kind = n;
    }
    return r;
   }
   e.create = t;
   function n(e) {
    var t = e;
    return t && $.string(t.title) && (t.diagnostics === void 0 || $.typedArray(t.diagnostics, u.is)) && (t.kind === void 0 || $.string(t.kind)) && (t.edit !== void 0 || t.command !== void 0) && (t.command === void 0 || c.is(t.command)) && (t.edit === void 0 || h.is(t.edit));
   }
   e.is = n;
  })(I || (I = {}));
  var M;
  (function(e) {
   function t(e, t) {
    var n = {
     range: e
    };
    if ($.defined(t)) n.data = t;
    return n;
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && i.is(t.range) && ($.undefined(t.command) || c.is(t.command));
   }
   e.is = n;
  })(M || (M = {}));
  var q;
  (function(e) {
   function t(e, t) {
    return {
     tabSize: e,
     insertSpaces: t
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && $.number(t.tabSize) && $.boolean(t.insertSpaces);
   }
   e.is = n;
  })(q || (q = {}));
  var N = function() {
   function e() {}
   return e;
  }();
  (function(e) {
   function t(e, t, n) {
    return {
     range: e,
     target: t,
     data: n
    };
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && i.is(t.range) && ($.undefined(t.target) || $.string(t.target));
   }
   e.is = n;
  })(N || (N = {}));
  var L = [ "\n", "\r\n", "\r" ];
  var F;
  (function(e) {
   function t(e, t, n, r) {
    return new W(e, t, n, r);
   }
   e.create = t;
   function n(e) {
    var t = e;
    return $.defined(t) && $.string(t.uri) && ($.undefined(t.languageId) || $.string(t.languageId)) && $.number(t.lineCount) && $.func(t.getText) && $.func(t.positionAt) && $.func(t.offsetAt) ? true : false;
   }
   e.is = n;
   function r(e, t) {
    var n = e.getText();
    var r = i(t, function(e, t) {
     var n = e.range.start.line - t.range.start.line;
     if (n === 0) {
      return e.range.start.character - t.range.start.character;
     }
     return n;
    });
    var o = n.length;
    for (var s = r.length - 1; s >= 0; s--) {
     var a = r[s];
     var u = e.offsetAt(a.range.start);
     var c = e.offsetAt(a.range.end);
     if (c <= o) {
      n = n.substring(0, u) + a.newText + n.substring(c, n.length);
     } else {
      throw new Error("Ovelapping edit");
     }
     o = u;
    }
    return n;
   }
   e.applyEdits = r;
   function i(e, t) {
    if (e.length <= 1) {
     return e;
    }
    var n = e.length / 2 | 0;
    var r = e.slice(0, n);
    var o = e.slice(n);
    i(r, t);
    i(o, t);
    var s = 0;
    var a = 0;
    var u = 0;
    while (s < r.length && a < o.length) {
     var c = t(r[s], o[a]);
     if (c <= 0) {
      e[u++] = r[s++];
     } else {
      e[u++] = o[a++];
     }
    }
    while (s < r.length) {
     e[u++] = r[s++];
    }
    while (a < o.length) {
     e[u++] = o[a++];
    }
    return e;
   }
  })(F || (F = {}));
  var z;
  (function(e) {
   e.Manual = 1;
   e.AfterDelay = 2;
   e.FocusOut = 3;
  })(z || (z = {}));
  var W = function() {
   function e(e, t, n, r) {
    this._uri = e;
    this._languageId = t;
    this._version = n;
    this._content = r;
    this._lineOffsets = null;
   }
   Object.defineProperty(e.prototype, "uri", {
    get: function() {
     return this._uri;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "languageId", {
    get: function() {
     return this._languageId;
    },
    enumerable: true,
    configurable: true
   });
   Object.defineProperty(e.prototype, "version", {
    get: function() {
     return this._version;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.getText = function(e) {
    if (e) {
     var t = this.offsetAt(e.start);
     var n = this.offsetAt(e.end);
     return this._content.substring(t, n);
    }
    return this._content;
   };
   e.prototype.update = function(e, t) {
    this._content = e.text;
    this._version = t;
    this._lineOffsets = null;
   };
   e.prototype.getLineOffsets = function() {
    if (this._lineOffsets === null) {
     var e = [];
     var t = this._content;
     var n = true;
     for (var r = 0; r < t.length; r++) {
      if (n) {
       e.push(r);
       n = false;
      }
      var i = t.charAt(r);
      n = i === "\r" || i === "\n";
      if (i === "\r" && r + 1 < t.length && t.charAt(r + 1) === "\n") {
       r++;
      }
     }
     if (n && t.length > 0) {
      e.push(t.length);
     }
     this._lineOffsets = e;
    }
    return this._lineOffsets;
   };
   e.prototype.positionAt = function(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    var t = this.getLineOffsets();
    var n = 0, i = t.length;
    if (i === 0) {
     return r.create(0, e);
    }
    while (n < i) {
     var o = Math.floor((n + i) / 2);
     if (t[o] > e) {
      i = o;
     } else {
      n = o + 1;
     }
    }
    var s = n - 1;
    return r.create(s, e - t[s]);
   };
   e.prototype.offsetAt = function(e) {
    var t = this.getLineOffsets();
    if (e.line >= t.length) {
     return this._content.length;
    } else if (e.line < 0) {
     return 0;
    }
    var n = t[e.line];
    var r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(n + e.character, r), n);
   };
   Object.defineProperty(e.prototype, "lineCount", {
    get: function() {
     return this.getLineOffsets().length;
    },
    enumerable: true,
    configurable: true
   });
   return e;
  }();
  var $;
  (function(e) {
   var t = Object.prototype.toString;
   function n(e) {
    return typeof e !== "undefined";
   }
   e.defined = n;
   function r(e) {
    return typeof e === "undefined";
   }
   e.undefined = r;
   function i(e) {
    return e === true || e === false;
   }
   e.boolean = i;
   function o(e) {
    return t.call(e) === "[object String]";
   }
   e.string = o;
   function s(e) {
    return t.call(e) === "[object Number]";
   }
   e.number = s;
   function a(e) {
    return t.call(e) === "[object Function]";
   }
   e.func = a;
   function u(e) {
    return e !== null && typeof e === "object";
   }
   e.objectLiteral = u;
   function c(e, t) {
    return Array.isArray(e) && e.every(t);
   }
   e.typedArray = c;
  })($ || ($ = {}));
 },
 lq4E: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var r = Object.prototype.toString;
  function i(e) {
   return e === true || e === false;
  }
  t.boolean = i;
  function o(e) {
   return r.call(e) === "[object String]";
  }
  t.string = o;
  function s(e) {
   return r.call(e) === "[object Number]";
  }
  t.number = s;
  function a(e) {
   return r.call(e) === "[object Error]";
  }
  t.error = a;
  function u(e) {
   return r.call(e) === "[object Function]";
  }
  t.func = u;
  function c(e) {
   return Array.isArray(e);
  }
  t.array = c;
  function f(e) {
   return c(e) && e.every(function(e) {
    return o(e);
   });
  }
  t.stringArray = f;
 },
 m7V9: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("gcj8");
  var i;
  (function(e) {
   e.type = new r.RequestType0("workspace/workspaceFolders");
  })(i = t.WorkspaceFoldersRequest || (t.WorkspaceFoldersRequest = {}));
  var o;
  (function(e) {
   e.type = new r.NotificationType("workspace/didChangeWorkspaceFolders");
  })(o = t.DidChangeWorkspaceFoldersNotification || (t.DidChangeWorkspaceFoldersNotification = {}));
 },
 mppW: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("4UAn");
  const o = n("2SiB");
  const s = n("kcoj");
  function a(e, t, n, a = 0) {
   return r(this, void 0, void 0, function*() {
    const r = o.merlin.Query.path.list.source();
    const u = yield e.merlin.query(r, t, n, a);
    if ("return" !== u.class) return [];
    const c = new Set();
    const f = [];
    for (const e of u.value) {
     if (!(/\.opam\b/.test(e) || c.has(e))) {
      c.add(e);
      const t = new i.Glob("*.@(ml|re)?(i)", {
       cwd: e,
       realpath: true,
       sync: true
      }).found;
      for (const e of t) f.push(s.Environment.pathToUri(e));
     }
    }
    return f;
   });
  }
  t.default = a;
 },
 "mw/K": function(e, t) {
  e.exports = require("fs");
 },
 n0R3: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  function i(e, t) {
   return r(this, void 0, void 0, function*() {
    const n = e.synchronizer.getTextDocument(t.uri);
    if (null == n) return null;
    return n.getText();
   });
  }
  t.default = i;
 },
 nOH4: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("oyvS");
  const o = n("1jjw");
  const s = n("4Tfi");
  function a(e) {
   return t => r(this, void 0, void 0, function*() {
    for (const n of t.changes) {
     const t = e.environment.workspaceRoot();
     const r = o.default.parse(n.uri).path;
     const a = i.parse(t ? i.relative(t, r) : r);
     switch (a.dir.split(i.sep)[0]) {
     case "_build":
      return s.restartMerlin(e);
     }
     if (".ml" === a.ext) {
      return e.indexer.refreshSymbols(n);
     }
     if (".re" === a.ext) {
      return e.indexer.refreshSymbols(n);
     }
     if (".merlin" === a.base) {
      return s.restartMerlin(e);
     }
     if ("command-exec" === a.name) {
      return s.restartMerlin(e);
     }
    }
   });
  }
  t.default = a;
 },
 nTOf: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("KxYO");
  const i = n("9d5b");
  const o = i.createDiagnostic("bucklescript");
  function s(e) {
   const t = {};
   const n = new RegExp([ /File "(.*)", line (\d*), characters (\d*)-(\d*):[\s\S]*?/, /(?:Error|Warning \d+): (?:([\s\S]*?)(?:We've found a bug for you!|File "|ninja: build stopped|\[\d\/\d] Building )|(.*?)\n\S)/ ].map(e => e.source).join(""), "g");
   let i;
   while (i = n.exec(e)) {
    const e = "file://" + i[1];
    const n = Number(i[2]) - 1;
    const s = Number(i[2]) - 1;
    const a = Number(i[3]);
    const u = Number(i[4]);
    const c = (i[5] || i[6]).trim();
    const f = /^Warning number \d+/.exec(i[0]) ? r.DiagnosticSeverity.Warning : r.DiagnosticSeverity.Error;
    const l = o(c, a, n, u, s, f);
    if (!t[e]) {
     t[e] = [];
    }
    t[e].push(l);
   }
   const s = new RegExp([ /(?:We've found a bug for you!|Warning number \d+)\n\s*/, /(.*) (\d+):(\d+)(?:-(\d+)(?::(\d+))?)?\n  \n/, /(?:.|\n)*?\n  \n/, /((?:.|\n)*?)/, /((?=We've found a bug for you!)|(?:\[\d+\/\d+\] (?:\x1b\[[0-9;]*?m)?Building)|(?:ninja: build stopped: subcommand failed)|(?=Warning number \d+)|$)/ ].map(e => e.source).join(""), "g");
   while (i = s.exec(e)) {
    const e = "file://" + i[1];
    const n = Number(i[2]) - 1;
    const s = Number(i[3]) - 1;
    let a = Number(i[4]) - 1;
    let u = Number(i[5]);
    const c = i[6].replace(/\n  /g, "\n");
    if (isNaN(a)) {
     u = s + 1;
     a = n;
    } else if (isNaN(u)) {
     u = a + 1;
     a = n;
    }
    const f = /^Warning number \d+/.exec(i[0]) ? r.DiagnosticSeverity.Warning : r.DiagnosticSeverity.Error;
    const l = o(c, s, n, u, a, f);
    if (!t[e]) {
     t[e] = [];
    }
    t[e].push(l);
   }
   const a = new RegExp([ /(?:We've found a bug for you!|Warning number \d+)\n\s*/, /(.*)/, /\n  \n  ((?:.|\n)*?)/, /((?=We've found a bug for you!)|(?:\[\d+\/\d+\] (?:\x1b\[[0-9;]*?m)?Building)|(?:ninja: build stopped: subcommand failed)|(?=Warning number \d+)|$)/ ].map(e => e.source).join(""), "g");
   if (Object.keys(t).length === 0) {
    while (i = a.exec(e)) {
     const e = "file://" + i[1];
     const n = 0;
     const s = 0;
     const a = 0;
     const u = 0;
     const c = i[2].replace(/\n  /g, "\n");
     const f = /^Warning number \d+/.exec(i[0]) ? r.DiagnosticSeverity.Warning : r.DiagnosticSeverity.Error;
     const l = o(c, s, n, u, a, f);
     if (!t[e]) {
      t[e] = [];
     }
     t[e].push(l);
    }
   }
   return t;
  }
  t.parseErrors = s;
 },
 oaIa: function(e, t, n) {
  "use strict";
  function r(e) {
   return e.charAt(0) === "/";
  }
  function i(e) {
   var t = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
   var n = t.exec(e);
   var r = n[1] || "";
   var i = Boolean(r && r.charAt(1) !== ":");
   return Boolean(n[2] || i);
  }
  e.exports = process.platform === "win32" ? i : r;
  e.exports.posix = r;
  e.exports.win32 = i;
 },
 or0P: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("4Tfi");
  function i(e) {
   return t => r.getMerlinFiles(e, null, t);
  }
  t.default = i;
 },
 oyvS: function(e, t) {
  e.exports = require("path");
 },
 pBAs: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("KxYO");
  function i(e, t) {
   return (e, n) => {
    const i = new Promise((e, t) => n.onCancellationRequested(() => {
     const e = new r.ResponseError(r.ErrorCodes.RequestCancelled, "cancellableHandler::reject");
     return t(e);
    }));
    return Promise.race([ i, t(e, n) ]);
   };
  }
  t.cancellableHandler = i;
 },
 pP65: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("2SiB");
  const s = n("4Tfi");
  const a = n("pBAs");
  function u(e) {
   return a.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const r = yield s.getOccurrences(e, t, n);
    if (null == r) return {
     changes: {}
    };
    const a = r.map(e => i.TextEdit.replace(o.merlin.Location.intoCode(e), t.newName));
    const u = [ i.TextDocumentEdit.create(i.VersionedTextDocumentIdentifier.create(t.textDocument.uri, 0), a) ];
    const c = {
     documentChanges: u
    };
    return c;
   }));
  }
  t.default = u;
 },
 pnzC: function(e, t, n) {
  var r, i, o;
  (function(n, s) {
   if (true) {
    !(i = [], r = s, o = typeof r === "function" ? r.apply(t, i) : r, o !== undefined && (e.exports = o));
   } else {}
  })(this, function() {
   return function() {
    function e(e) {
     this.app = "loki";
     if (typeof e !== "undefined") {
      this.app = e;
     }
     this.catalog = null;
     if (!this.checkAvailability()) {
      throw new Error("indexedDB does not seem to be supported for your environment");
     }
    }
    e.prototype.checkAvailability = function() {
     if (typeof indexedDB !== "undefined" && indexedDB) return true;
     return false;
    };
    e.prototype.loadDatabase = function(e, n) {
     var r = this.app;
     var i = this;
     if (this.catalog === null || this.catalog.db === null) {
      this.catalog = new t(function(t) {
       i.catalog = t;
       i.loadDatabase(e, n);
      });
      return;
     }
     this.catalog.getAppKey(r, e, function(e) {
      if (typeof n === "function") {
       if (e.id === 0) {
        n(null);
        return;
       }
       n(e.val);
      } else {
       console.log(e.val);
      }
     });
    };
    e.prototype.loadKey = e.prototype.loadDatabase;
    e.prototype.saveDatabase = function(e, n, r) {
     var i = this.app;
     var o = this;
     function s(e) {
      if (e && e.success === true) {
       r(null);
      } else {
       r(new Error("Error saving database"));
      }
     }
     if (this.catalog === null || this.catalog.db === null) {
      this.catalog = new t(function(t) {
       o.catalog = t;
       t.setAppKey(i, e, n, s);
      });
      return;
     }
     this.catalog.setAppKey(i, e, n, s);
    };
    e.prototype.saveKey = e.prototype.saveDatabase;
    e.prototype.deleteDatabase = function(e, n) {
     var r = this.app;
     var i = this;
     if (this.catalog === null || this.catalog.db === null) {
      this.catalog = new t(function(t) {
       i.catalog = t;
       i.deleteDatabase(e, n);
      });
      return;
     }
     this.catalog.getAppKey(r, e, function(e) {
      var t = e.id;
      if (t !== 0) {
       i.catalog.deleteAppKey(t, n);
      } else if (typeof n === "function") {
       n({
        success: true
       });
      }
     });
    };
    e.prototype.deleteKey = e.prototype.deleteDatabase;
    e.prototype.deleteDatabasePartitions = function(e) {
     var t = this;
     this.getDatabaseList(function(n) {
      n.forEach(function(n) {
       if (n.startsWith(e)) {
        t.deleteDatabase(n);
       }
      });
     });
    };
    e.prototype.getDatabaseList = function(e) {
     var n = this.app;
     var r = this;
     if (this.catalog === null || this.catalog.db === null) {
      this.catalog = new t(function(t) {
       r.catalog = t;
       r.getDatabaseList(e);
      });
      return;
     }
     this.catalog.getAppKeys(n, function(t) {
      var n = [];
      for (var r = 0; r < t.length; r++) {
       n.push(t[r].key);
      }
      if (typeof e === "function") {
       e(n);
      } else {
       n.forEach(function(e) {
        console.log(e);
       });
      }
     });
    };
    e.prototype.getKeyList = e.prototype.getDatabaseList;
    e.prototype.getCatalogSummary = function(e) {
     var n = this.app;
     var r = this;
     if (this.catalog === null || this.catalog.db === null) {
      this.catalog = new t(function(t) {
       r.catalog = t;
       r.getCatalogSummary(e);
      });
      return;
     }
     this.catalog.getAllKeys(function(t) {
      var n = [];
      var r, i, o, s, a;
      for (var u = 0; u < t.length; u++) {
       r = t[u];
       o = r.app || "";
       s = r.key || "";
       a = r.val || "";
       i = o.length * 2 + s.length * 2 + a.length + 1;
       n.push({
        app: r.app,
        key: r.key,
        size: i
       });
      }
      if (typeof e === "function") {
       e(n);
      } else {
       n.forEach(function(e) {
        console.log(e);
       });
      }
     });
    };
    function t(e) {
     this.db = null;
     this.initializeLokiCatalog(e);
    }
    t.prototype.initializeLokiCatalog = function(e) {
     var t = indexedDB.open("LokiCatalog", 1);
     var n = this;
     t.onupgradeneeded = function(e) {
      var t = e.target.result;
      if (t.objectStoreNames.contains("LokiAKV")) {
       t.deleteObjectStore("LokiAKV");
      }
      if (!t.objectStoreNames.contains("LokiAKV")) {
       var n = t.createObjectStore("LokiAKV", {
        keyPath: "id",
        autoIncrement: true
       });
       n.createIndex("app", "app", {
        unique: false
       });
       n.createIndex("key", "key", {
        unique: false
       });
       n.createIndex("appkey", "appkey", {
        unique: true
       });
      }
     };
     t.onsuccess = function(t) {
      n.db = t.target.result;
      if (typeof e === "function") e(n);
     };
     t.onerror = function(e) {
      throw e;
     };
    };
    t.prototype.getAppKey = function(e, t, n) {
     var r = this.db.transaction([ "LokiAKV" ], "readonly");
     var i = r.objectStore("LokiAKV");
     var o = i.index("appkey");
     var s = e + "," + t;
     var a = o.get(s);
     a.onsuccess = function(e) {
      return function(t) {
       var n = t.target.result;
       if (n === null || typeof n === "undefined") {
        n = {
         id: 0,
         success: false
        };
       }
       if (typeof e === "function") {
        e(n);
       } else {
        console.log(n);
       }
      };
     }(n);
     a.onerror = function(e) {
      return function(t) {
       if (typeof e === "function") {
        e({
         id: 0,
         success: false
        });
       } else {
        throw t;
       }
      };
     }(n);
    };
    t.prototype.getAppKeyById = function(e, t, n) {
     var r = this.db.transaction([ "LokiAKV" ], "readonly");
     var i = r.objectStore("LokiAKV");
     var o = i.get(e);
     o.onsuccess = function(e, t) {
      return function(n) {
       if (typeof t === "function") {
        t(n.target.result, e);
       } else {
        console.log(n.target.result);
       }
      };
     }(n, t);
    };
    t.prototype.setAppKey = function(e, t, n, r) {
     var i = this.db.transaction([ "LokiAKV" ], "readwrite");
     var o = i.objectStore("LokiAKV");
     var s = o.index("appkey");
     var a = e + "," + t;
     var u = s.get(a);
     u.onsuccess = function(i) {
      var s = i.target.result;
      if (s === null || s === undefined) {
       s = {
        app: e,
        key: t,
        appkey: e + "," + t,
        val: n
       };
      } else {
       s.val = n;
      }
      var a = o.put(s);
      a.onerror = function(e) {
       return function(t) {
        if (typeof e === "function") {
         e({
          success: false
         });
        } else {
         console.error("LokiCatalog.setAppKey (set) onerror");
         console.error(u.error);
        }
       };
      }(r);
      a.onsuccess = function(e) {
       return function(t) {
        if (typeof e === "function") {
         e({
          success: true
         });
        }
       };
      }(r);
     };
     u.onerror = function(e) {
      return function(t) {
       if (typeof e === "function") {
        e({
         success: false
        });
       } else {
        console.error("LokiCatalog.setAppKey (get) onerror");
        console.error(u.error);
       }
      };
     }(r);
    };
    t.prototype.deleteAppKey = function(e, t) {
     var n = this.db.transaction([ "LokiAKV" ], "readwrite");
     var r = n.objectStore("LokiAKV");
     var i = r.delete(e);
     i.onsuccess = function(e) {
      return function(t) {
       if (typeof e === "function") e({
        success: true
       });
      };
     }(t);
     i.onerror = function(e) {
      return function(t) {
       if (typeof e === "function") {
        e({
         success: false
        });
       } else {
        console.error("LokiCatalog.deleteAppKey raised onerror");
        console.error(i.error);
       }
      };
     }(t);
    };
    t.prototype.getAppKeys = function(e, t) {
     var n = this.db.transaction([ "LokiAKV" ], "readonly");
     var r = n.objectStore("LokiAKV");
     var i = r.index("app");
     var o = IDBKeyRange.only(e);
     var s = i.openCursor(o);
     var a = [];
     s.onsuccess = function(e, t) {
      return function(n) {
       var r = n.target.result;
       if (r) {
        var i = r.value;
        e.push(i);
        r.continue();
       } else {
        if (typeof t === "function") {
         t(e);
        } else {
         console.log(e);
        }
       }
      };
     }(a, t);
     s.onerror = function(e) {
      return function(t) {
       if (typeof e === "function") {
        e(null);
       } else {
        console.error("LokiCatalog.getAppKeys raised onerror");
        console.error(t);
       }
      };
     }(t);
    };
    t.prototype.getAllKeys = function(e) {
     var t = this.db.transaction([ "LokiAKV" ], "readonly");
     var n = t.objectStore("LokiAKV");
     var r = n.openCursor();
     var i = [];
     r.onsuccess = function(e, t) {
      return function(n) {
       var r = n.target.result;
       if (r) {
        var i = r.value;
        e.push(i);
        r.continue();
       } else {
        if (typeof t === "function") {
         t(e);
        } else {
         console.log(e);
        }
       }
      };
     }(i, e);
     r.onerror = function(e) {
      return function(t) {
       if (typeof e === "function") e(null);
      };
     }(e);
    };
    return e;
   }();
  });
 },
 ppFO: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("pBAs");
  function s(e) {
   return o.cancellableHandler(e, (e, t) => r(this, void 0, void 0, function*() {
    const t = [];
    let n = null;
    for (const {message: r, range: o} of e.context.diagnostics) {
     if (r === "Functions must be defined with => instead of the = symbol.") {
      const n = "change = to =>";
      const r = "reason.codeAction.fixEqualsShouldBeArrow";
      const s = i.Location.create(e.textDocument.uri, o);
      const a = [ s ];
      const u = i.Command.create(n, r, a);
      t.push(u);
      continue;
     }
     if (r === "Statements must be terminated with a semicolon.") {
      const n = "insert missing semicolon";
      const r = "reason.codeAction.fixMissingSemicolon";
      const s = i.Location.create(e.textDocument.uri, o);
      const a = [ s ];
      const u = i.Command.create(n, r, a);
      t.push(u);
      continue;
     }
     if (null != (n = r.match(/Warning (?:26|27): unused variable\s+\b(\w+)\b/))) {
      const r = "ignore unused variable";
      const s = "reason.codeAction.fixUnusedVariable";
      const a = i.Location.create(e.textDocument.uri, o);
      const u = [ a, n[1] ];
      const c = i.Command.create(r, s, u);
      t.push(c);
      continue;
     }
    }
    return t;
   }));
  }
  t.default = s;
 },
 prP1: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  const o = n("xy5X");
  function s(e) {
   return t => r(this, void 0, void 0, function*() {
    const n = t.initializationOptions;
    e.initConf = t;
    e.settings.reason = i.ISettings.withDefaults(n);
    yield e.initialize();
    return {
     capabilities: o.default
    };
   });
  }
  t.default = s;
 },
 qtV4: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("4Tfi");
  const o = n("j1I1");
  const s = n("pBAs");
  function a(e) {
   return s.cancellableHandler(e, (t, n) => r(this, void 0, void 0, function*() {
    const r = yield i.getWordAtPosition(e, t);
    const s = [];
    const a = yield i.getType(e, t, n);
    if (null == a) return {
     contents: []
    };
    const u = yield i.getDocumentation(e, n, t);
    const {type: c} = a;
    let f = "plaintext";
    if (/\.mli?/.test(t.textDocument.uri)) {
     f = "ocaml.hover.type";
    }
    if (/\.rei?/.test(t.textDocument.uri)) {
     f = /^[A-Z]/.test(r) ? "reason.hover.signature" : "reason.hover.type";
    }
    s.push({
     language: f,
     value: c
    });
    if (null != u && !o.ocamldoc.ignore.test(u)) {
     s.push(o.ocamldoc.intoMarkdown(u));
    }
    return {
     contents: s
    };
   }));
  }
  t.default = a;
 },
 r56G: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("KxYO");
  const o = n("2SiB");
  class s {
   constructor(e) {
    this.session = e;
    this.documents = new Map();
   }
   dispose() {
    return;
   }
   initialize() {
    return r(this, void 0, void 0, function*() {
     return;
    });
   }
   listen() {
    this.session.connection.onDidCloseTextDocument(this.onDidCloseTextDocument.bind(this));
    this.session.connection.onDidOpenTextDocument(this.onDidOpenTextDocument.bind(this));
    this.session.connection.onDidChangeTextDocument(this.onDidChangeTextDocument.bind(this));
    this.session.connection.onDidSaveTextDocument(this.onDidSaveTextDocument.bind(this));
   }
   onDidChangeConfiguration() {
    return;
   }
   getTextDocument(e) {
    const t = this.documents.get(e);
    return t ? t : null;
   }
   applyChangesToTextDocumentContent(e, t) {
    if (null == t.range) return null;
    const n = e.offsetAt(t.range.start);
    const r = e.offsetAt(t.range.end);
    const i = e.getText().substr(0, n);
    const o = e.getText().substr(r);
    return `${i}${t.text}${o}`;
   }
   doFullSync(e, t, n) {
    return r(this, void 0, void 0, function*() {
     this.documents.set(e.uri, i.TextDocument.create(e.uri, t, e.version, n));
     const r = o.merlin.Sync.tell("start", "end", n);
     yield this.session.merlin.sync(r, e);
    });
   }
   doIncrementalSync(e, t, n) {
    return r(this, void 0, void 0, function*() {
     if (null == n || null == n.range) return;
     const r = this.applyChangesToTextDocumentContent(e, n);
     if (null != r) {
      this.documents.set(t.uri, i.TextDocument.create(e.uri, e.languageId, t.version, r));
     }
     const s = o.merlin.Position.fromCode(n.range.start);
     const a = o.merlin.Position.fromCode(n.range.end);
     const u = o.merlin.Sync.tell(s, a, n.text);
     yield this.session.merlin.sync(u, t);
    });
   }
   onDidChangeTextDocument(e) {
    return r(this, void 0, void 0, function*() {
     for (const t of e.contentChanges) {
      if (null == t) continue;
      const n = this.documents.get(e.textDocument.uri);
      if (null == n) continue;
      if (null == t.range) {
       yield this.doFullSync(e.textDocument, n.languageId, t.text);
      } else {
       yield this.doIncrementalSync(n, e.textDocument, t);
      }
      yield this.session.analyzer.refreshDebounced(e.textDocument);
     }
    });
   }
   onDidOpenTextDocument(e) {
    return r(this, void 0, void 0, function*() {
     yield this.doFullSync(e.textDocument, e.textDocument.languageId, e.textDocument.text);
     yield this.session.analyzer.refreshImmediate(e.textDocument);
     yield this.session.indexer.refreshSymbols(e.textDocument);
    });
   }
   onDidCloseTextDocument(e) {
    this.documents.delete(e.textDocument.uri);
    this.session.analyzer.clear(e.textDocument);
   }
   onDidSaveTextDocument(e) {
    return r(this, void 0, void 0, function*() {
     yield this.session.analyzer.refreshImmediate(e.textDocument);
    });
   }
  }
  t.default = s;
 },
 rCXO: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var r;
  (function(e) {
   function t(e) {
    return {
     dispose: e
    };
   }
   e.create = t;
  })(r = t.Disposable || (t.Disposable = {}));
  var i;
  (function(e) {
   var t = {
    dispose: function() {}
   };
   e.None = function() {
    return t;
   };
  })(i = t.Event || (t.Event = {}));
  var o = function() {
   function e() {}
   e.prototype.add = function(e, t, n) {
    var r = this;
    if (t === void 0) {
     t = null;
    }
    if (!this._callbacks) {
     this._callbacks = [];
     this._contexts = [];
    }
    this._callbacks.push(e);
    this._contexts.push(t);
    if (Array.isArray(n)) {
     n.push({
      dispose: function() {
       return r.remove(e, t);
      }
     });
    }
   };
   e.prototype.remove = function(e, t) {
    if (t === void 0) {
     t = null;
    }
    if (!this._callbacks) {
     return;
    }
    var n = false;
    for (var r = 0, i = this._callbacks.length; r < i; r++) {
     if (this._callbacks[r] === e) {
      if (this._contexts[r] === t) {
       this._callbacks.splice(r, 1);
       this._contexts.splice(r, 1);
       return;
      } else {
       n = true;
      }
     }
    }
    if (n) {
     throw new Error("When adding a listener with a context, you should remove it with the same context");
    }
   };
   e.prototype.invoke = function() {
    var e = [];
    for (var t = 0; t < arguments.length; t++) {
     e[t] = arguments[t];
    }
    if (!this._callbacks) {
     return [];
    }
    var n = [], r = this._callbacks.slice(0), i = this._contexts.slice(0);
    for (var o = 0, s = r.length; o < s; o++) {
     try {
      n.push(r[o].apply(i[o], e));
     } catch (e) {
      console.error(e);
     }
    }
    return n;
   };
   e.prototype.isEmpty = function() {
    return !this._callbacks || this._callbacks.length === 0;
   };
   e.prototype.dispose = function() {
    this._callbacks = undefined;
    this._contexts = undefined;
   };
   return e;
  }();
  var s = function() {
   function e(e) {
    this._options = e;
   }
   Object.defineProperty(e.prototype, "event", {
    get: function() {
     var t = this;
     if (!this._event) {
      this._event = function(n, r, i) {
       if (!t._callbacks) {
        t._callbacks = new o();
       }
       if (t._options && t._options.onFirstListenerAdd && t._callbacks.isEmpty()) {
        t._options.onFirstListenerAdd(t);
       }
       t._callbacks.add(n, r);
       var s;
       s = {
        dispose: function() {
         t._callbacks.remove(n, r);
         s.dispose = e._noop;
         if (t._options && t._options.onLastListenerRemove && t._callbacks.isEmpty()) {
          t._options.onLastListenerRemove(t);
         }
        }
       };
       if (Array.isArray(i)) {
        i.push(s);
       }
       return s;
      };
     }
     return this._event;
    },
    enumerable: true,
    configurable: true
   });
   e.prototype.fire = function(e) {
    if (this._callbacks) {
     this._callbacks.invoke.call(this._callbacks, e);
    }
   };
   e.prototype.dispose = function() {
    if (this._callbacks) {
     this._callbacks.dispose();
     this._callbacks = undefined;
    }
   };
   e._noop = function() {};
   return e;
  }();
  t.Emitter = s;
 },
 rgLv: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("KxYO");
  const i = n("0zK7");
  t.ConfigurationFeature = (e => {
   return class extends e {
    getConfiguration(e) {
     if (!e) {
      return this._getConfiguration({});
     } else if (i.string(e)) {
      return this._getConfiguration({
       section: e
      });
     } else {
      return this._getConfiguration(e);
     }
    }
    _getConfiguration(e) {
     let t = {
      items: Array.isArray(e) ? e : [ e ]
     };
     return this.connection.sendRequest(r.ConfigurationRequest.type, t).then(t => {
      return Array.isArray(e) ? t : t[0];
     });
    }
   };
  });
 },
 smAu: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  function i(e, t) {
   return r(this, void 0, void 0, function*() {
    const n = e.synchronizer.getTextDocument(t.textDocument.uri);
    if (null == n) return null;
    const r = {
     character: 0,
     line: t.position.line
    };
    const i = t.position;
    const o = n.offsetAt(r);
    const s = n.offsetAt(i);
    const a = n.getText().substring(o, s);
    const u = /[A-Za-z_][A-Za-z_'0-9]*(?:\.[A-Za-z_][A-Za-z_'0-9]*)*\.?$/;
    const c = u.exec(a);
    return c ? c[0] : null;
   });
  }
  t.default = i;
 },
 "u4/7": function(e, t, n) {
  "use strict";
  function r(e, t) {
   function n() {
    this.constructor = e;
   }
   n.prototype = t.prototype;
   e.prototype = new n();
  }
  function i(e, t, n, r) {
   this.message = e;
   this.expected = t;
   this.found = n;
   this.location = r;
   this.name = "SyntaxError";
   if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, i);
   }
  }
  r(i, Error);
  i.buildMessage = function(e, t) {
   var n = {
    literal: function(e) {
     return '"' + i(e.text) + '"';
    },
    class: function(e) {
     var t = "", n;
     for (n = 0; n < e.parts.length; n++) {
      t += e.parts[n] instanceof Array ? o(e.parts[n][0]) + "-" + o(e.parts[n][1]) : o(e.parts[n]);
     }
     return "[" + (e.inverted ? "^" : "") + t + "]";
    },
    any: function(e) {
     return "any character";
    },
    end: function(e) {
     return "end of input";
    },
    other: function(e) {
     return e.description;
    }
   };
   function r(e) {
    return e.charCodeAt(0).toString(16).toUpperCase();
   }
   function i(e) {
    return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(e) {
     return "\\x0" + r(e);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(e) {
     return "\\x" + r(e);
    });
   }
   function o(e) {
    return e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(e) {
     return "\\x0" + r(e);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(e) {
     return "\\x" + r(e);
    });
   }
   function s(e) {
    return n[e.type](e);
   }
   function a(e) {
    var t = new Array(e.length), n, r;
    for (n = 0; n < e.length; n++) {
     t[n] = s(e[n]);
    }
    t.sort();
    if (t.length > 0) {
     for (n = 1, r = 1; n < t.length; n++) {
      if (t[n - 1] !== t[n]) {
       t[r] = t[n];
       r++;
      }
     }
     t.length = r;
    }
    switch (t.length) {
    case 1:
     return t[0];

    case 2:
     return t[0] + " or " + t[1];

    default:
     return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
    }
   }
   function u(e) {
    return e ? '"' + i(e) + '"' : "end of input";
   }
   return "Expected " + a(e) + " but " + u(t) + " found.";
  };
  function o(e, t) {
   t = t !== void 0 ? t : {};
   var n = {}, r = {
    sentence: ze
   }, o = ze, s = function(e) {
    let t = "";
    for (let n = 0; n < e.length; n++) {
     t += e[n][0];
     t += e[n][1];
    }
    return t;
   }, a = "[", u = Pe("[", false), c = "]", f = Pe("]", false), l = function(e) {
    let t = "";
    t += "[";
    for (let n = 0; n < e.length; n++) t += e[n];
    t += "]";
    return t;
   }, h = /^[^[\]]/, d = Re([ "[", "]" ], true, false), p = function(e) {
    let t = "";
    for (let n = 0; n < e.length; n++) t += e[n];
    return t;
   }, v = "{-", y = Pe("{-", false), g = "}", m = Pe("}", false), b = function(e) {
    return e;
   }, w = "{{:", _ = Pe("{{:", false), x = function(e, t) {
    let n = "";
    n += "[";
    n += t;
    n += "]";
    n += "(";
    n += e;
    n += ")";
    return n;
   }, O = "{^", S = Pe("{^", false), k = function(e, t, n) {
    let r = "";
    r += "{^";
    r += e;
    r += t;
    r += n;
    r += "}";
    return r;
   }, C = "{_", D = Pe("{_", false), j = function(e, t, n) {
    let r = "";
    r += "{_";
    r += e;
    r += t;
    r += n;
    r += "}";
    return r;
   }, E = "{", P = Pe("{", false), R = /^[0-9]/, T = Re([ [ "0", "9" ] ], false, false), A = function(e, t) {
    let n = "";
    let r = Number.parseInt(e);
    while (0 < r) {
     n += "#";
     r--;
    }
    n += t;
    return n;
   }, I = "{!", M = Pe("{!", false), q = function(e) {
    let t = "";
    t += "[";
    t += e;
    t += "]";
    t += "(";
    t += "http://caml.inria.fr/pub/docs/manual-ocaml/libref/index.html";
    t += ")";
    return t;
   }, N = "{b", L = Pe("{b", false), F = function(e) {
    let t = "";
    t += "**";
    t += e;
    t += "**";
    return t;
   }, z = "{e", W = Pe("{e", false), $ = function(e) {
    let t = "";
    t += "*";
    t += e;
    t += "*";
    return t;
   }, B = "{i", K = Pe("{i", false), U = "{li", H = Pe("{li", false), V = function(e) {
    let t = "";
    for (let n = 0; n < e.length; n++) {
     t += "\n";
     t += n;
     t += ". ";
     t += e[n][0];
    }
    return t;
   }, J = "{ul", G = Pe("{ul", false), Q = function(e) {
    let t = "";
    for (let n = 0; n < e.length; n++) {
     t += "\n- ";
     t += e[n][0];
    }
    return t;
   }, Y = "{v", Z = Pe("{v", false), X = /^[^}]/, ee = Re([ "}" ], true, false), te = function(e, t) {
    let n = "";
    n += e;
    for (let e = 0; e < t.length; e++) n += t[e];
    return n;
   }, ne = "{[", re = Pe("{[", false), ie = "]}", oe = Pe("]}", false), se = function(e, t) {
    let n = "";
    n += "\n```ocaml";
    n += e;
    for (let e = 0; e < t.length; e++) n += t[e];
    n += "```\n";
    return n;
   }, ae = function(e) {
    let t = "";
    t += "`";
    for (let n = 0; n < e.length; n++) t += e[n];
    t += "`";
    return t;
   }, ue = /^[\-+]/, ce = Re([ "-", "+" ], false, false), fe = ".", le = Pe(".", false), he = function(e, t, n, r) {
    let i = "";
    i += "`";
    i += e || "";
    for (let e = 0; e < t.length; e++) i += t[e];
    i += n || "";
    for (let e = 0; e < r.length; e++) i += r[e];
    i += "`";
    return i;
   }, de = /^[^ \f\n\r\t\x0B{}[\]0-9]/, pe = Re([ " ", "\f", "\n", "\r", "\t", "\v", "{", "}", "[", "]", [ "0", "9" ] ], true, false), ve = Ie("whitespace"), ye = /^[ \f\n\r\t\x0B]/, ge = Re([ " ", "\f", "\n", "\r", "\t", "\v" ], false, false), me = function(e) {
    let t = "";
    for (let n = 0; n < e.length; n++) t += e[n];
    return t;
   }, be = 0, we = 0, _e = [ {
    line: 1,
    column: 1
   } ], xe = 0, Oe = [], Se = 0, ke;
   if ("startRule" in t) {
    if (!(t.startRule in r)) {
     throw new Error("Can't start parsing from rule \"" + t.startRule + '".');
    }
    o = r[t.startRule];
   }
   function Ce() {
    return e.substring(we, be);
   }
   function De() {
    return qe(we, be);
   }
   function je(t, n) {
    n = n !== void 0 ? n : qe(we, be);
    throw Fe([ Ie(t) ], e.substring(we, be), n);
   }
   function Ee(e, t) {
    t = t !== void 0 ? t : qe(we, be);
    throw Le(e, t);
   }
   function Pe(e, t) {
    return {
     type: "literal",
     text: e,
     ignoreCase: t
    };
   }
   function Re(e, t, n) {
    return {
     type: "class",
     parts: e,
     inverted: t,
     ignoreCase: n
    };
   }
   function Te() {
    return {
     type: "any"
    };
   }
   function Ae() {
    return {
     type: "end"
    };
   }
   function Ie(e) {
    return {
     type: "other",
     description: e
    };
   }
   function Me(t) {
    var n = _e[t], r;
    if (n) {
     return n;
    } else {
     r = t - 1;
     while (!_e[r]) {
      r--;
     }
     n = _e[r];
     n = {
      line: n.line,
      column: n.column
     };
     while (r < t) {
      if (e.charCodeAt(r) === 10) {
       n.line++;
       n.column = 1;
      } else {
       n.column++;
      }
      r++;
     }
     _e[t] = n;
     return n;
    }
   }
   function qe(e, t) {
    var n = Me(e), r = Me(t);
    return {
     start: {
      offset: e,
      line: n.line,
      column: n.column
     },
     end: {
      offset: t,
      line: r.line,
      column: r.column
     }
    };
   }
   function Ne(e) {
    if (be < xe) {
     return;
    }
    if (be > xe) {
     xe = be;
     Oe = [];
    }
    Oe.push(e);
   }
   function Le(e, t) {
    return new i(e, null, null, t);
   }
   function Fe(e, t, n) {
    return new i(i.buildMessage(e, t), e, t, n);
   }
   function ze() {
    var e, t, r, i, o;
    e = be;
    t = [];
    r = be;
    i = Ke();
    if (i !== n) {
     o = Be();
     if (o !== n) {
      i = [ i, o ];
      r = i;
     } else {
      be = r;
      r = n;
     }
    } else {
     be = r;
     r = n;
    }
    while (r !== n) {
     t.push(r);
     r = be;
     i = Ke();
     if (i !== n) {
      o = Be();
      if (o !== n) {
       i = [ i, o ];
       r = i;
      } else {
       be = r;
       r = n;
      }
     } else {
      be = r;
      r = n;
     }
    }
    if (t !== n) {
     r = Ke();
     if (r !== n) {
      we = e;
      t = s(t);
      e = t;
     } else {
      be = e;
      e = n;
     }
    } else {
     be = e;
     e = n;
    }
    return e;
   }
   function We() {
    var t, r, i, o;
    t = be;
    if (e.charCodeAt(be) === 91) {
     r = a;
     be++;
    } else {
     r = n;
     if (Se === 0) {
      Ne(u);
     }
    }
    if (r !== n) {
     i = [];
     o = We();
     while (o !== n) {
      i.push(o);
      o = We();
     }
     if (i !== n) {
      if (e.charCodeAt(be) === 93) {
       o = c;
       be++;
      } else {
       o = n;
       if (Se === 0) {
        Ne(f);
       }
      }
      if (o !== n) {
       we = t;
       r = l(i);
       t = r;
      } else {
       be = t;
       t = n;
      }
     } else {
      be = t;
      t = n;
     }
    } else {
     be = t;
     t = n;
    }
    if (t === n) {
     t = be;
     r = [];
     if (h.test(e.charAt(be))) {
      i = e.charAt(be);
      be++;
     } else {
      i = n;
      if (Se === 0) {
       Ne(d);
      }
     }
     if (i !== n) {
      while (i !== n) {
       r.push(i);
       if (h.test(e.charAt(be))) {
        i = e.charAt(be);
        be++;
       } else {
        i = n;
        if (Se === 0) {
         Ne(d);
        }
       }
      }
     } else {
      r = n;
     }
     if (r !== n) {
      we = t;
      r = p(r);
     }
     t = r;
    }
    return t;
   }
   function $e() {
    var t, r, i, o, s, a;
    t = be;
    if (e.substr(be, 2) === v) {
     r = v;
     be += 2;
    } else {
     r = n;
     if (Se === 0) {
      Ne(y);
     }
    }
    if (r !== n) {
     i = Ke();
     if (i !== n) {
      o = ze();
      if (o !== n) {
       s = Ke();
       if (s !== n) {
        if (e.charCodeAt(be) === 125) {
         a = g;
         be++;
        } else {
         a = n;
         if (Se === 0) {
          Ne(m);
         }
        }
        if (a !== n) {
         we = t;
         r = b(o);
         t = r;
        } else {
         be = t;
         t = n;
        }
       } else {
        be = t;
        t = n;
       }
      } else {
       be = t;
       t = n;
      }
     } else {
      be = t;
      t = n;
     }
    } else {
     be = t;
     t = n;
    }
    return t;
   }
   function Be() {
    var t, r, i, o, s, l, h, d, v, y;
    t = be;
    if (e.substr(be, 3) === w) {
     r = w;
     be += 3;
    } else {
     r = n;
     if (Se === 0) {
      Ne(_);
     }
    }
    if (r !== n) {
     i = Ke();
     if (i !== n) {
      o = ze();
      if (o !== n) {
       s = Ke();
       if (s !== n) {
        if (e.charCodeAt(be) === 125) {
         l = g;
         be++;
        } else {
         l = n;
         if (Se === 0) {
          Ne(m);
         }
        }
        if (l !== n) {
         h = Ke();
         if (h !== n) {
          d = ze();
          if (d !== n) {
           v = Ke();
           if (v !== n) {
            if (e.charCodeAt(be) === 125) {
             y = g;
             be++;
            } else {
             y = n;
             if (Se === 0) {
              Ne(m);
             }
            }
            if (y !== n) {
             we = t;
             r = x(o, d);
             t = r;
            } else {
             be = t;
             t = n;
            }
           } else {
            be = t;
            t = n;
           }
          } else {
           be = t;
           t = n;
          }
         } else {
          be = t;
          t = n;
         }
        } else {
         be = t;
         t = n;
        }
       } else {
        be = t;
        t = n;
       }
      } else {
       be = t;
       t = n;
      }
     } else {
      be = t;
      t = n;
     }
    } else {
     be = t;
     t = n;
    }
    if (t === n) {
     t = be;
     if (e.substr(be, 2) === O) {
      r = O;
      be += 2;
     } else {
      r = n;
      if (Se === 0) {
       Ne(S);
      }
     }
     if (r !== n) {
      i = Ke();
      if (i !== n) {
       o = ze();
       if (o !== n) {
        s = Ke();
        if (s !== n) {
         if (e.charCodeAt(be) === 125) {
          l = g;
          be++;
         } else {
          l = n;
          if (Se === 0) {
           Ne(m);
          }
         }
         if (l !== n) {
          we = t;
          r = k(i, o, s);
          t = r;
         } else {
          be = t;
          t = n;
         }
        } else {
         be = t;
         t = n;
        }
       } else {
        be = t;
        t = n;
       }
      } else {
       be = t;
       t = n;
      }
     } else {
      be = t;
      t = n;
     }
     if (t === n) {
      t = be;
      if (e.substr(be, 2) === C) {
       r = C;
       be += 2;
      } else {
       r = n;
       if (Se === 0) {
        Ne(D);
       }
      }
      if (r !== n) {
       i = Ue();
       if (i !== n) {
        o = ze();
        if (o !== n) {
         s = Ke();
         if (s !== n) {
          if (e.charCodeAt(be) === 125) {
           l = g;
           be++;
          } else {
           l = n;
           if (Se === 0) {
            Ne(m);
           }
          }
          if (l !== n) {
           we = t;
           r = j(i, o, s);
           t = r;
          } else {
           be = t;
           t = n;
          }
         } else {
          be = t;
          t = n;
         }
        } else {
         be = t;
         t = n;
        }
       } else {
        be = t;
        t = n;
       }
      } else {
       be = t;
       t = n;
      }
      if (t === n) {
       t = be;
       if (e.charCodeAt(be) === 123) {
        r = E;
        be++;
       } else {
        r = n;
        if (Se === 0) {
         Ne(P);
        }
       }
       if (r !== n) {
        if (R.test(e.charAt(be))) {
         i = e.charAt(be);
         be++;
        } else {
         i = n;
         if (Se === 0) {
          Ne(T);
         }
        }
        if (i !== n) {
         o = Ue();
         if (o !== n) {
          s = ze();
          if (s !== n) {
           l = Ke();
           if (l !== n) {
            if (e.charCodeAt(be) === 125) {
             h = g;
             be++;
            } else {
             h = n;
             if (Se === 0) {
              Ne(m);
             }
            }
            if (h !== n) {
             we = t;
             r = A(i, s);
             t = r;
            } else {
             be = t;
             t = n;
            }
           } else {
            be = t;
            t = n;
           }
          } else {
           be = t;
           t = n;
          }
         } else {
          be = t;
          t = n;
         }
        } else {
         be = t;
         t = n;
        }
       } else {
        be = t;
        t = n;
       }
       if (t === n) {
        t = be;
        if (e.substr(be, 2) === I) {
         r = I;
         be += 2;
        } else {
         r = n;
         if (Se === 0) {
          Ne(M);
         }
        }
        if (r !== n) {
         i = Ke();
         if (i !== n) {
          o = ze();
          if (o !== n) {
           s = Ke();
           if (s !== n) {
            if (e.charCodeAt(be) === 125) {
             l = g;
             be++;
            } else {
             l = n;
             if (Se === 0) {
              Ne(m);
             }
            }
            if (l !== n) {
             we = t;
             r = q(o);
             t = r;
            } else {
             be = t;
             t = n;
            }
           } else {
            be = t;
            t = n;
           }
          } else {
           be = t;
           t = n;
          }
         } else {
          be = t;
          t = n;
         }
        } else {
         be = t;
         t = n;
        }
        if (t === n) {
         t = be;
         if (e.substr(be, 2) === N) {
          r = N;
          be += 2;
         } else {
          r = n;
          if (Se === 0) {
           Ne(L);
          }
         }
         if (r !== n) {
          i = Ue();
          if (i !== n) {
           o = ze();
           if (o !== n) {
            s = Ke();
            if (s !== n) {
             if (e.charCodeAt(be) === 125) {
              l = g;
              be++;
             } else {
              l = n;
              if (Se === 0) {
               Ne(m);
              }
             }
             if (l !== n) {
              we = t;
              r = F(o);
              t = r;
             } else {
              be = t;
              t = n;
             }
            } else {
             be = t;
             t = n;
            }
           } else {
            be = t;
            t = n;
           }
          } else {
           be = t;
           t = n;
          }
         } else {
          be = t;
          t = n;
         }
         if (t === n) {
          t = be;
          if (e.substr(be, 2) === z) {
           r = z;
           be += 2;
          } else {
           r = n;
           if (Se === 0) {
            Ne(W);
           }
          }
          if (r !== n) {
           i = Ue();
           if (i !== n) {
            o = ze();
            if (o !== n) {
             s = Ke();
             if (s !== n) {
              if (e.charCodeAt(be) === 125) {
               l = g;
               be++;
              } else {
               l = n;
               if (Se === 0) {
                Ne(m);
               }
              }
              if (l !== n) {
               we = t;
               r = $(o);
               t = r;
              } else {
               be = t;
               t = n;
              }
             } else {
              be = t;
              t = n;
             }
            } else {
             be = t;
             t = n;
            }
           } else {
            be = t;
            t = n;
           }
          } else {
           be = t;
           t = n;
          }
          if (t === n) {
           t = be;
           if (e.substr(be, 2) === B) {
            r = B;
            be += 2;
           } else {
            r = n;
            if (Se === 0) {
             Ne(K);
            }
           }
           if (r !== n) {
            i = Ue();
            if (i !== n) {
             o = ze();
             if (o !== n) {
              s = Ke();
              if (s !== n) {
               if (e.charCodeAt(be) === 125) {
                l = g;
                be++;
               } else {
                l = n;
                if (Se === 0) {
                 Ne(m);
                }
               }
               if (l !== n) {
                we = t;
                r = $(o);
                t = r;
               } else {
                be = t;
                t = n;
               }
              } else {
               be = t;
               t = n;
              }
             } else {
              be = t;
              t = n;
             }
            } else {
             be = t;
             t = n;
            }
           } else {
            be = t;
            t = n;
           }
           if (t === n) {
            t = be;
            if (e.substr(be, 3) === U) {
             r = U;
             be += 3;
            } else {
             r = n;
             if (Se === 0) {
              Ne(H);
             }
            }
            if (r !== n) {
             i = Ue();
             if (i !== n) {
              o = [];
              s = be;
              l = $e();
              if (l !== n) {
               h = Ke();
               if (h !== n) {
                l = [ l, h ];
                s = l;
               } else {
                be = s;
                s = n;
               }
              } else {
               be = s;
               s = n;
              }
              while (s !== n) {
               o.push(s);
               s = be;
               l = $e();
               if (l !== n) {
                h = Ke();
                if (h !== n) {
                 l = [ l, h ];
                 s = l;
                } else {
                 be = s;
                 s = n;
                }
               } else {
                be = s;
                s = n;
               }
              }
              if (o !== n) {
               if (e.charCodeAt(be) === 125) {
                s = g;
                be++;
               } else {
                s = n;
                if (Se === 0) {
                 Ne(m);
                }
               }
               if (s !== n) {
                we = t;
                r = V(o);
                t = r;
               } else {
                be = t;
                t = n;
               }
              } else {
               be = t;
               t = n;
              }
             } else {
              be = t;
              t = n;
             }
            } else {
             be = t;
             t = n;
            }
            if (t === n) {
             t = be;
             if (e.substr(be, 3) === J) {
              r = J;
              be += 3;
             } else {
              r = n;
              if (Se === 0) {
               Ne(G);
              }
             }
             if (r !== n) {
              i = Ue();
              if (i !== n) {
               o = [];
               s = be;
               l = $e();
               if (l !== n) {
                h = Ke();
                if (h !== n) {
                 l = [ l, h ];
                 s = l;
                } else {
                 be = s;
                 s = n;
                }
               } else {
                be = s;
                s = n;
               }
               while (s !== n) {
                o.push(s);
                s = be;
                l = $e();
                if (l !== n) {
                 h = Ke();
                 if (h !== n) {
                  l = [ l, h ];
                  s = l;
                 } else {
                  be = s;
                  s = n;
                 }
                } else {
                 be = s;
                 s = n;
                }
               }
               if (o !== n) {
                if (e.charCodeAt(be) === 125) {
                 s = g;
                 be++;
                } else {
                 s = n;
                 if (Se === 0) {
                  Ne(m);
                 }
                }
                if (s !== n) {
                 we = t;
                 r = Q(o);
                 t = r;
                } else {
                 be = t;
                 t = n;
                }
               } else {
                be = t;
                t = n;
               }
              } else {
               be = t;
               t = n;
              }
             } else {
              be = t;
              t = n;
             }
             if (t === n) {
              t = be;
              if (e.substr(be, 2) === Y) {
               r = Y;
               be += 2;
              } else {
               r = n;
               if (Se === 0) {
                Ne(Z);
               }
              }
              if (r !== n) {
               i = Ue();
               if (i !== n) {
                o = [];
                if (X.test(e.charAt(be))) {
                 s = e.charAt(be);
                 be++;
                } else {
                 s = n;
                 if (Se === 0) {
                  Ne(ee);
                 }
                }
                while (s !== n) {
                 o.push(s);
                 if (X.test(e.charAt(be))) {
                  s = e.charAt(be);
                  be++;
                 } else {
                  s = n;
                  if (Se === 0) {
                   Ne(ee);
                  }
                 }
                }
                if (o !== n) {
                 if (e.charCodeAt(be) === 125) {
                  s = g;
                  be++;
                 } else {
                  s = n;
                  if (Se === 0) {
                   Ne(m);
                  }
                 }
                 if (s !== n) {
                  we = t;
                  r = te(i, o);
                  t = r;
                 } else {
                  be = t;
                  t = n;
                 }
                } else {
                 be = t;
                 t = n;
                }
               } else {
                be = t;
                t = n;
               }
              } else {
               be = t;
               t = n;
              }
              if (t === n) {
               t = be;
               if (e.substr(be, 2) === ne) {
                r = ne;
                be += 2;
               } else {
                r = n;
                if (Se === 0) {
                 Ne(re);
                }
               }
               if (r !== n) {
                i = Ke();
                if (i !== n) {
                 o = [];
                 s = We();
                 while (s !== n) {
                  o.push(s);
                  s = We();
                 }
                 if (o !== n) {
                  s = Ke();
                  if (s !== n) {
                   if (e.substr(be, 2) === ie) {
                    l = ie;
                    be += 2;
                   } else {
                    l = n;
                    if (Se === 0) {
                     Ne(oe);
                    }
                   }
                   if (l !== n) {
                    we = t;
                    r = se(i, o);
                    t = r;
                   } else {
                    be = t;
                    t = n;
                   }
                  } else {
                   be = t;
                   t = n;
                  }
                 } else {
                  be = t;
                  t = n;
                 }
                } else {
                 be = t;
                 t = n;
                }
               } else {
                be = t;
                t = n;
               }
               if (t === n) {
                t = be;
                if (e.charCodeAt(be) === 91) {
                 r = a;
                 be++;
                } else {
                 r = n;
                 if (Se === 0) {
                  Ne(u);
                 }
                }
                if (r !== n) {
                 i = Ke();
                 if (i !== n) {
                  o = [];
                  s = We();
                  while (s !== n) {
                   o.push(s);
                   s = We();
                  }
                  if (o !== n) {
                   s = Ke();
                   if (s !== n) {
                    if (e.charCodeAt(be) === 93) {
                     l = c;
                     be++;
                    } else {
                     l = n;
                     if (Se === 0) {
                      Ne(f);
                     }
                    }
                    if (l !== n) {
                     we = t;
                     r = ae(o);
                     t = r;
                    } else {
                     be = t;
                     t = n;
                    }
                   } else {
                    be = t;
                    t = n;
                   }
                  } else {
                   be = t;
                   t = n;
                  }
                 } else {
                  be = t;
                  t = n;
                 }
                } else {
                 be = t;
                 t = n;
                }
                if (t === n) {
                 t = be;
                 if (ue.test(e.charAt(be))) {
                  r = e.charAt(be);
                  be++;
                 } else {
                  r = n;
                  if (Se === 0) {
                   Ne(ce);
                  }
                 }
                 if (r === n) {
                  r = null;
                 }
                 if (r !== n) {
                  i = [];
                  if (R.test(e.charAt(be))) {
                   o = e.charAt(be);
                   be++;
                  } else {
                   o = n;
                   if (Se === 0) {
                    Ne(T);
                   }
                  }
                  if (o !== n) {
                   while (o !== n) {
                    i.push(o);
                    if (R.test(e.charAt(be))) {
                     o = e.charAt(be);
                     be++;
                    } else {
                     o = n;
                     if (Se === 0) {
                      Ne(T);
                     }
                    }
                   }
                  } else {
                   i = n;
                  }
                  if (i !== n) {
                   if (e.charCodeAt(be) === 46) {
                    o = fe;
                    be++;
                   } else {
                    o = n;
                    if (Se === 0) {
                     Ne(le);
                    }
                   }
                   if (o === n) {
                    o = null;
                   }
                   if (o !== n) {
                    s = [];
                    if (R.test(e.charAt(be))) {
                     l = e.charAt(be);
                     be++;
                    } else {
                     l = n;
                     if (Se === 0) {
                      Ne(T);
                     }
                    }
                    while (l !== n) {
                     s.push(l);
                     if (R.test(e.charAt(be))) {
                      l = e.charAt(be);
                      be++;
                     } else {
                      l = n;
                      if (Se === 0) {
                       Ne(T);
                      }
                     }
                    }
                    if (s !== n) {
                     we = t;
                     r = he(r, i, o, s);
                     t = r;
                    } else {
                     be = t;
                     t = n;
                    }
                   } else {
                    be = t;
                    t = n;
                   }
                  } else {
                   be = t;
                   t = n;
                  }
                 } else {
                  be = t;
                  t = n;
                 }
                 if (t === n) {
                  t = be;
                  r = [];
                  if (de.test(e.charAt(be))) {
                   i = e.charAt(be);
                   be++;
                  } else {
                   i = n;
                   if (Se === 0) {
                    Ne(pe);
                   }
                  }
                  if (i !== n) {
                   while (i !== n) {
                    r.push(i);
                    if (de.test(e.charAt(be))) {
                     i = e.charAt(be);
                     be++;
                    } else {
                     i = n;
                     if (Se === 0) {
                      Ne(pe);
                     }
                    }
                   }
                  } else {
                   r = n;
                  }
                  if (r !== n) {
                   we = t;
                   r = p(r);
                  }
                  t = r;
                 }
                }
               }
              }
             }
            }
           }
          }
         }
        }
       }
      }
     }
    }
    return t;
   }
   function Ke() {
    var t, r, i;
    Se++;
    t = be;
    r = [];
    if (ye.test(e.charAt(be))) {
     i = e.charAt(be);
     be++;
    } else {
     i = n;
     if (Se === 0) {
      Ne(ge);
     }
    }
    while (i !== n) {
     r.push(i);
     if (ye.test(e.charAt(be))) {
      i = e.charAt(be);
      be++;
     } else {
      i = n;
      if (Se === 0) {
       Ne(ge);
      }
     }
    }
    if (r !== n) {
     we = t;
     r = p(r);
    }
    t = r;
    Se--;
    if (t === n) {
     r = n;
     if (Se === 0) {
      Ne(ve);
     }
    }
    return t;
   }
   function Ue() {
    var t, r, i;
    Se++;
    t = be;
    r = [];
    if (ye.test(e.charAt(be))) {
     i = e.charAt(be);
     be++;
    } else {
     i = n;
     if (Se === 0) {
      Ne(ge);
     }
    }
    if (i !== n) {
     while (i !== n) {
      r.push(i);
      if (ye.test(e.charAt(be))) {
       i = e.charAt(be);
       be++;
      } else {
       i = n;
       if (Se === 0) {
        Ne(ge);
       }
      }
     }
    } else {
     r = n;
    }
    if (r !== n) {
     we = t;
     r = me(r);
    }
    t = r;
    Se--;
    if (t === n) {
     r = n;
     if (Se === 0) {
      Ne(ve);
     }
    }
    return t;
   }
   ke = o();
   if (ke !== n && be === e.length) {
    return ke;
   } else {
    if (ke !== n && be < e.length) {
     Ne(Ae());
    }
    throw Fe(Oe, xe < e.length ? e.charAt(xe) : null, xe < e.length ? qe(xe, xe + 1) : qe(xe, xe));
   }
  }
  e.exports = {
   SyntaxError: i,
   parse: o
  };
 },
 uC7Y: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  t.default = ((e, t, n, o = 0) => r(this, void 0, void 0, function*() {
   const r = i.merlin.Position.fromCode(t.position);
   const s = i.merlin.Query.occurrences.ident.at(r);
   const a = yield e.merlin.query(s, n, t.textDocument, o);
   if ("return" !== a.class) return null;
   return a.value;
  }));
 },
 uLJd: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  var r = n("oyvS");
  var i = n("jle/");
  var o = n("PJMN");
  var s = n("Qs2e");
  var a = n("Cs6m");
  var u = n("hDOz");
  function c() {
   var e = o.randomBytes(21).toString("hex");
   if (process.platform === "win32") {
    return "\\\\.\\pipe\\vscode-jsonrpc-" + e + "-sock";
   } else {
    return r.join(i.tmpdir(), "vscode-" + e + ".sock");
   }
  }
  t.generateRandomPipeName = c;
  function f(e, t) {
   if (t === void 0) {
    t = "utf-8";
   }
   var n;
   var r = new Promise(function(e, t) {
    n = e;
   });
   return new Promise(function(i, o) {
    var c = s.createServer(function(e) {
     c.close();
     n([ new a.SocketMessageReader(e, t), new u.SocketMessageWriter(e, t) ]);
    });
    c.on("error", o);
    c.listen(e, function() {
     c.removeListener("error", o);
     i({
      onConnected: function() {
       return r;
      }
     });
    });
   });
  }
  t.createClientPipeTransport = f;
  function l(e, t) {
   if (t === void 0) {
    t = "utf-8";
   }
   var n = s.createConnection(e);
   return [ new a.SocketMessageReader(n, t), new u.SocketMessageWriter(n, t) ];
  }
  t.createServerPipeTransport = l;
 },
 w1sI: function(e, t) {
  function n(e) {
   return require(e);
  }
  n.keys = function() {
   return [];
  };
  n.resolve = require.resolve;
  e.exports = n;
  n.id = "w1sI";
 },
 wbzG: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  class r {
   constructor(e) {
    this.session = e;
   }
   run() {
    let e = "";
    return new Promise(t => {
     const n = this.session.settings.reason.path.esy;
     const r = [ "build" ];
     const i = this.session.environment.spawn(n, r);
     i.on("error", e => {
      if ("ENOENT" === e.code) {
       const e = `Perhapse we cannot find esy binary at "${n}".`;
       this.session.connection.window.showWarningMessage(e);
       this.session.connection.window.showWarningMessage(`Double check your path or try configuring "reason.path.esy" under "User Settings". Do you need to "npm install -g esy"? Alternatively, disable "esy" in "reason.diagnostics.tools"`);
      }
      t("");
     });
     i.stdout.on("data", t => e += t.toString());
     i.stdout.on("end", () => t(e));
    });
   }
  }
  t.default = r;
 },
 xIlt: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("gcj8");
  var i;
  (function(e) {
   e.type = new r.RequestType("textDocument/implementation");
  })(i = t.ImplementationRequest || (t.ImplementationRequest = {}));
 },
 xRFH: function(e, t, n) {
  "use strict";
  var r = this && this.__awaiter || function(e, t, n, r) {
   return new (n || (n = Promise))(function(i, o) {
    function s(e) {
     try {
      u(r.next(e));
     } catch (e) {
      o(e);
     }
    }
    function a(e) {
     try {
      u(r["throw"](e));
     } catch (e) {
      o(e);
     }
    }
    function u(e) {
     e.done ? i(e.value) : new n(function(t) {
      t(e.value);
     }).then(s, a);
    }
    u((r = r.apply(e, t || [])).next());
   });
  };
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const i = n("2SiB");
  t.default = ((e, t, n, o = 0) => r(this, void 0, void 0, function*() {
   const r = i.merlin.Position.fromCode(t.position);
   const s = i.merlin.Query.type.enclosing.at(r);
   const a = yield e.merlin.query(s, n, t.textDocument, o);
   if ("return" !== a.class) return null;
   return a.value.length > 0 ? a.value[0] : null;
  }));
 },
 xy5X: function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
   value: true
  });
  const r = n("KxYO");
  const i = {
   codeActionProvider: true,
   codeLensProvider: {
    resolveProvider: true
   },
   completionProvider: {
    resolveProvider: true,
    triggerCharacters: [ "." ]
   },
   definitionProvider: true,
   documentFormattingProvider: true,
   documentHighlightProvider: true,
   documentSymbolProvider: true,
   hoverProvider: true,
   referencesProvider: true,
   renameProvider: true,
   textDocumentSync: r.TextDocumentSyncKind.Incremental,
   workspaceSymbolProvider: true
  };
  t.default = i;
 }
});