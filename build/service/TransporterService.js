"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireWildcard(require("../models/index"));
var _sequelize = require("sequelize");
var _userSevice = require("./userSevice");
var _orderService = require("./orderService");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// lấy tất cả đơn hàng theo trạng thái(order-status) của NVC(idTransporter);
var getOrdersByService = function getOrdersByService(orderStatus, idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var orders, ordersByIdTransporter, _iterator, _step, or, order, _ordersByIdTransporter, _iterator2, _step2, _or, _order;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            orders = [];
            if (!(orderStatus === 'All')) {
              _context.next = 29;
              break;
            }
            _context.next = 5;
            return _index["default"].Order.findAll({
              where: {
                idTransporter: idTransporter
              },
              raw: false
            });
          case 5:
            ordersByIdTransporter = _context.sent;
            console.log('17', ordersByIdTransporter);
            if (!ordersByIdTransporter) {
              _context.next = 27;
              break;
            }
            _iterator = _createForOfIteratorHelper(ordersByIdTransporter);
            _context.prev = 9;
            _iterator.s();
          case 11:
            if ((_step = _iterator.n()).done) {
              _context.next = 19;
              break;
            }
            or = _step.value;
            _context.next = 15;
            return (0, _orderService.getAllOrderInfoByIdOrder)(or.id);
          case 15:
            order = _context.sent;
            if (order) {
              orders.push(order.data);
            }
          case 17:
            _context.next = 11;
            break;
          case 19:
            _context.next = 24;
            break;
          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](9);
            _iterator.e(_context.t0);
          case 24:
            _context.prev = 24;
            _iterator.f();
            return _context.finish(24);
          case 27:
            _context.next = 52;
            break;
          case 29:
            _context.next = 31;
            return _index["default"].Order.findAll({
              where: {
                idTransporter: idTransporter,
                keyOrderStatus: orderStatus
              },
              raw: false
            });
          case 31:
            _ordersByIdTransporter = _context.sent;
            if (!_ordersByIdTransporter) {
              _context.next = 52;
              break;
            }
            _iterator2 = _createForOfIteratorHelper(_ordersByIdTransporter);
            _context.prev = 34;
            _iterator2.s();
          case 36:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 44;
              break;
            }
            _or = _step2.value;
            _context.next = 40;
            return (0, _orderService.getAllOrderInfoByIdOrder)(_or.id);
          case 40:
            _order = _context.sent;
            if (_order) {
              orders.push(_order.data);
            }
          case 42:
            _context.next = 36;
            break;
          case 44:
            _context.next = 49;
            break;
          case 46:
            _context.prev = 46;
            _context.t1 = _context["catch"](34);
            _iterator2.e(_context.t1);
          case 49:
            _context.prev = 49;
            _iterator2.f();
            return _context.finish(49);
          case 52:
            resolve({
              error: 0,
              message: 'Ok',
              data: orders
            });
            _context.next = 58;
            break;
          case 55:
            _context.prev = 55;
            _context.t2 = _context["catch"](0);
            reject(_context.t2);
          case 58:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 55], [9, 21, 24, 27], [34, 46, 49, 52]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

// lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
var getOrderStatusByKey = function getOrderStatusByKey(key) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var orders;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            orders = [];
            if (!(key === 'All')) {
              _context2.next = 8;
              break;
            }
            _context2.next = 5;
            return _index["default"].AllCode.findAll({
              where: {
                type: ['ORDER_STATUS', 'TRANSPORT_STATUS']
              },
              raw: true
            });
          case 5:
            orders = _context2.sent;
            _context2.next = 11;
            break;
          case 8:
            _context2.next = 10;
            return _index["default"].AllCode.findOne({
              where: {
                key: key
              },
              raw: true
            });
          case 10:
            orders = _context2.sent;
          case 11:
            resolve(orders);
            _context2.next = 17;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 14]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

// Tạo transporter
var CreateAccountTransporter = function CreateAccountTransporter(transporterInput, userInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var check, transporterNew, hashPasswordFromBcrypt, user, transporter;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _userSevice.checkUserPhoneBykeyRole)(userInput.phone, userInput.keyRole);
          case 3:
            check = _context3.sent;
            if (!check) {
              _context3.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              message: 'Số điện thoại đã tồn tại, vui lòng nhập số điện thoại khác!!!'
            });
            _context3.next = 26;
            break;
          case 8:
            _context3.next = 10;
            return _index["default"].Transporter.create({
              transporterName: transporterInput.transporterName,
              foundingDate: transporterInput.foundingDate,
              status: 0 // tài khoản vừa tạo có trạng thái bằng 0
            });
          case 10:
            transporterNew = _context3.sent;
            if (!transporterNew) {
              _context3.next = 26;
              break;
            }
            _context3.next = 14;
            return (0, _userSevice.hashUserPassword)(userInput.password);
          case 14:
            hashPasswordFromBcrypt = _context3.sent;
            _context3.next = 17;
            return _index["default"].User.create({
              userName: userInput.userName,
              birthday: userInput.birthday,
              keyGender: userInput.keyGender,
              address: userInput.address,
              idDefaultLocation: userInput.idDefaultLocation,
              // image
              email: userInput.email,
              password: hashPasswordFromBcrypt,
              phone: userInput.phone,
              status: userInput.status,
              keyRole: userInput.keyRole,
              idTransporter: transporterNew.id
            });
          case 17:
            _context3.next = 19;
            return _index["default"].User.findOne({
              where: {
                phone: userInput.phone,
                idTransporter: transporterNew.id // Điều kiện để lọc các phần tử của bảng A
              },

              raw: true
            });
          case 19:
            user = _context3.sent;
            delete user.password;
            _context3.next = 23;
            return _index["default"].Transporter.findOne({
              where: {
                id: transporterNew.id // Điều kiện để lọc các phần tử của bảng A
              },

              raw: true
            });
          case 23:
            transporter = _context3.sent;
            delete transporter.id;
            resolve({
              errCode: 0,
              message: 'OK',
              data: {
                user: user,
                transporter: transporter
              }
            });
          case 26:
            _context3.next = 31;
            break;
          case 28:
            _context3.prev = 28;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 31:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 28]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

//lấy TT transporter dựa vào id.user
var GetTransporterByIdUser = function GetTransporterByIdUser(idUser) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var user, transporter;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _index["default"].User.findOne({
              where: {
                id: idUser
              },
              raw: true
            });
          case 3:
            user = _context4.sent;
            delete user.password;
            _context4.next = 7;
            return _index["default"].Transporter.findOne({
              where: {
                id: user.idTransporter
              },
              raw: true
            });
          case 7:
            transporter = _context4.sent;
            delete transporter.id;
            resolve({
              errCode: 0,
              message: 'OK',
              data: {
                user: user,
                transporter: transporter
              }
            });
            _context4.next = 15;
            break;
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 15:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 12]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};

//lấy weight by vehicle
var GetWeightByVehicle = function GetWeightByVehicle(keyTypeOfVehicle) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var WeightOfVehicle, data;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            WeightOfVehicle = '';
            if (keyTypeOfVehicle === 'TOV1') {
              WeightOfVehicle = 'WEIGHT_MOTO';
            } else if (keyTypeOfVehicle === 'TOV2') {
              WeightOfVehicle = 'WEIGHT_PT';
            } else if (keyTypeOfVehicle === 'TOV3') {
              WeightOfVehicle = 'WEIGHT_T';
            } else {
              resolve({
                errCode: 1,
                message: 'Không tìm thấy phương tiện',
                data: null
              });
            }
            _context5.next = 5;
            return _index["default"].AllCode.findAll({
              where: {
                type: WeightOfVehicle
              }
            });
          case 5:
            data = _context5.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              data: data
            });
            _context5.next = 12;
            break;
          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 12:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 9]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};

// Tạo phương tiện
var CreateVehicle = function CreateVehicle(vehicleInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var checkLicensePlates, vehicleNew, vehicle;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _index["default"].Vehicle.findOne({
              where: {
                licensePlates: vehicleInput.licensePlates
              }
            });
          case 3:
            checkLicensePlates = _context6.sent;
            if (!checkLicensePlates) {
              _context6.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              message: 'Phương tiện với biển số xe này đã tồn tại!'
            });
            _context6.next = 16;
            break;
          case 8:
            _context6.next = 10;
            return _index["default"].Vehicle.create({
              image: vehicleInput.image,
              type: vehicleInput.type,
              weight: vehicleInput.weight,
              licensePlates: vehicleInput.licensePlates,
              description: vehicleInput.description,
              status: vehicleInput.status,
              idTransporter: vehicleInput.idTransporter
            });
          case 10:
            vehicleNew = _context6.sent;
            if (!vehicleNew) {
              _context6.next = 16;
              break;
            }
            _context6.next = 14;
            return _index["default"].Vehicle.findOne({
              where: {
                licensePlates: vehicleNew.licensePlates
              }
            });
          case 14:
            vehicle = _context6.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              data: vehicle
            });
          case 16:
            _context6.next = 21;
            break;
          case 18:
            _context6.prev = 18;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 21:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 18]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};

//lấy phương tiện theo idTransporter
var GetVehicleByIdTransporter = function GetVehicleByIdTransporter(idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var vehicles;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _index["default"].Vehicle.findAll({
              where: {
                idTransporter: idTransporter
              }
            });
          case 3:
            vehicles = _context7.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              data: vehicles
            });
            _context7.next = 10;
            break;
          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 10:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 7]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};

// xóa phương tiện theo id
var deleteVehicle = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(idVehicleDel) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
              var foundVehicle, imageVehicle;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.prev = 0;
                    _context8.next = 3;
                    return _index["default"].Vehicle.findOne({
                      where: {
                        id: idVehicleDel
                      }
                    });
                  case 3:
                    foundVehicle = _context8.sent;
                    if (!foundVehicle) {
                      _context8.next = 13;
                      break;
                    }
                    imageVehicle = foundVehicle.image;
                    _context8.next = 8;
                    return (0, _userSevice.removeFileService)(imageVehicle);
                  case 8:
                    _context8.next = 10;
                    return _index["default"].Vehicle.destroy({
                      where: {
                        id: idVehicleDel
                      }
                    });
                  case 10:
                    resolve({
                      errCode: 0,
                      message: 'Phương tiện đã được xóa!'
                    });
                    _context8.next = 14;
                    break;
                  case 13:
                    resolve({
                      errCode: 2,
                      message: "Ph\u01B0\u01A1ng ti\u1EC7n kh\xF4ng t\u1ED3n t\u1EA1i!!!"
                    });
                  case 14:
                    _context8.next = 19;
                    break;
                  case 16:
                    _context8.prev = 16;
                    _context8.t0 = _context8["catch"](0);
                    reject(_context8.t0);
                  case 19:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8, null, [[0, 16]]);
            }));
            return function (_x16, _x17) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function deleteVehicle(_x15) {
    return _ref8.apply(this, arguments);
  };
}();

//chỉnh sửa thông tin phương tiện vận chuyển
var editVehicle = function editVehicle(vehicleEdit) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var vehicle, licensePlatesVehicle;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            if (!vehicleEdit.id) {
              _context10.next = 27;
              break;
            }
            _context10.next = 4;
            return _index["default"].Vehicle.findOne({
              where: {
                id: vehicleEdit.id
              },
              raw: false
            });
          case 4:
            vehicle = _context10.sent;
            if (!vehicle) {
              _context10.next = 24;
              break;
            }
            _context10.next = 8;
            return _index["default"].Vehicle.findOne({
              where: {
                licensePlates: vehicleEdit.licensePlates,
                id: _defineProperty({}, _sequelize.Op.ne, vehicleEdit.id)
              }
            });
          case 8:
            licensePlatesVehicle = _context10.sent;
            if (licensePlatesVehicle) {
              _context10.next = 21;
              break;
            }
            vehicle.image = vehicleEdit.image;
            vehicle.type = vehicleEdit.type;
            vehicle.weight = vehicleEdit.weight;
            vehicle.description = vehicleEdit.description;
            vehicle.status = vehicleEdit.status;
            vehicle.licensePlates = vehicleEdit.licensePlates;
            _context10.next = 18;
            return vehicle.save();
          case 18:
            resolve({
              errCode: 0,
              message: 'Sửa phương tiện thành công',
              data: vehicle
            });
            _context10.next = 22;
            break;
          case 21:
            resolve({
              errCode: 3,
              message: 'Biển số xe đã tồn tại'
            });
          case 22:
            _context10.next = 25;
            break;
          case 24:
            resolve({
              errCode: 2,
              message: 'Không tìm thấy phương tiện'
            });
          case 25:
            _context10.next = 28;
            break;
          case 27:
            resolve({
              errCode: 1,
              message: 'Vui lòng nhập thông tin'
            });
          case 28:
            _context10.next = 33;
            break;
          case 30:
            _context10.prev = 30;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 33:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 30]]);
    }));
    return function (_x18, _x19) {
      return _ref10.apply(this, arguments);
    };
  }());
};

//lấy dịch vụ theo idTransporter
var GetServiceOfTransporter = function GetServiceOfTransporter(idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var serviceofTrans;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _index["default"].ServiceOfTransporter.findAll({
              include: [{
                model: _index["default"].AllCode,
                as: 'AllCode' // Đặt tên cho mối quan hệ
              }],

              where: {
                idTransporter: idTransporter
              },
              raw: false
            });
          case 3:
            serviceofTrans = _context11.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              data: serviceofTrans
            });
            _context11.next = 11;
            break;
          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            reject(_context11.t0);
          case 11:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 7]]);
    }));
    return function (_x20, _x21) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var CreateServiceOfTransporter = function CreateServiceOfTransporter(serviceArr, idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var _iterator3, _step3, service, serviceofTransporterNew;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _iterator3 = _createForOfIteratorHelper(serviceArr);
            _context12.prev = 2;
            _iterator3.s();
          case 4:
            if ((_step3 = _iterator3.n()).done) {
              _context12.next = 12;
              break;
            }
            service = _step3.value;
            _context12.next = 8;
            return _index["default"].ServiceOfTransporter.create({
              idTransporter: idTransporter,
              keyService: service
            });
          case 8:
            serviceofTransporterNew = _context12.sent;
            if (serviceofTransporterNew) {
              resolve({
                errCode: 0,
                message: 'Tạo thành công',
                data: serviceofTransporterNew
              });
            } else {
              resolve({
                errCode: 2,
                message: 'Lỗi khi tạo dịch vụ cho người dùng'
              });
            }
          case 10:
            _context12.next = 4;
            break;
          case 12:
            _context12.next = 17;
            break;
          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12["catch"](2);
            _iterator3.e(_context12.t0);
          case 17:
            _context12.prev = 17;
            _iterator3.f();
            return _context12.finish(17);
          case 20:
            ;
            _context12.next = 26;
            break;
          case 23:
            _context12.prev = 23;
            _context12.t1 = _context12["catch"](0);
            reject(_context12.t1);
          case 26:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 23], [2, 14, 17, 20]]);
    }));
    return function (_x22, _x23) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var DeleteServiceOfTransporter = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(serviceArr, idTransporter) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(resolve, reject) {
              var _iterator4, _step4, service, foundServiceOfTrans;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.prev = 0;
                    _iterator4 = _createForOfIteratorHelper(serviceArr);
                    _context13.prev = 2;
                    _iterator4.s();
                  case 4:
                    if ((_step4 = _iterator4.n()).done) {
                      _context13.next = 18;
                      break;
                    }
                    service = _step4.value;
                    _context13.next = 8;
                    return _index["default"].ServiceOfTransporter.findOne({
                      where: {
                        idTransporter: idTransporter,
                        keyService: service
                      }
                    });
                  case 8:
                    foundServiceOfTrans = _context13.sent;
                    if (!foundServiceOfTrans) {
                      _context13.next = 15;
                      break;
                    }
                    _context13.next = 12;
                    return _index["default"].ServiceOfTransporter.destroy({
                      where: {
                        idTransporter: idTransporter,
                        keyService: service
                      }
                    });
                  case 12:
                    resolve({
                      errCode: 0,
                      message: 'Dịch vụ của nhà vận chuyển này đã được xóa!'
                    });
                    _context13.next = 16;
                    break;
                  case 15:
                    resolve({
                      errCode: 2,
                      message: "D\u1ECBch v\u1EE5 c\u1EE7a nh\xE0 v\u1EADn chuy\u1EC3n kh\xF4ng t\u1ED3n t\u1EA1i!!!"
                    });
                  case 16:
                    _context13.next = 4;
                    break;
                  case 18:
                    _context13.next = 23;
                    break;
                  case 20:
                    _context13.prev = 20;
                    _context13.t0 = _context13["catch"](2);
                    _iterator4.e(_context13.t0);
                  case 23:
                    _context13.prev = 23;
                    _iterator4.f();
                    return _context13.finish(23);
                  case 26:
                    ;
                    _context13.next = 32;
                    break;
                  case 29:
                    _context13.prev = 29;
                    _context13.t1 = _context13["catch"](0);
                    reject(_context13.t1);
                  case 32:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13, null, [[0, 29], [2, 20, 23, 26]]);
            }));
            return function (_x26, _x27) {
              return _ref14.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function DeleteServiceOfTransporter(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();

//lấy phạm vi theo idTransporter
var GetScopeOfTransporter = function GetScopeOfTransporter(idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(resolve, reject) {
      var scopeOfTrans;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _index["default"].ScopeOfTransporter.findAll({
              include: [{
                model: _index["default"].AllCode,
                as: 'AllCodeScope' // Đặt tên cho mối quan hệ
              }],

              where: {
                idTransporter: idTransporter
              },
              raw: false
            });
          case 3:
            scopeOfTrans = _context15.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              data: scopeOfTrans
            });
            _context15.next = 11;
            break;
          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](0);
            console.log(_context15.t0);
            reject(_context15.t0);
          case 11:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 7]]);
    }));
    return function (_x28, _x29) {
      return _ref15.apply(this, arguments);
    };
  }());
};

//chỉnh sửa thông tin nhà vận chuyển
var editInfoTrans = function editInfoTrans(transporterEdit) {
  return new Promise( /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(resolve, reject) {
      var user, transporter, userNew, transporterNew;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            console.log(transporterEdit);
            // thêm userLocation, nếu đã tồn tại thì xóa
            if (!transporterEdit.id) {
              _context16.next = 37;
              break;
            }
            _context16.next = 5;
            return _index["default"].User.findOne({
              where: {
                id: transporterEdit.id
              },
              raw: false
            });
          case 5:
            user = _context16.sent;
            if (!user) {
              _context16.next = 34;
              break;
            }
            user.image = transporterEdit.image;
            user.email = transporterEdit.email;
            user.address = transporterEdit.address;
            user.idDefaultLocation = transporterEdit.idDefaultLocation;
            _context16.next = 13;
            return user.save();
          case 13:
            _context16.next = 15;
            return _index["default"].Transporter.findOne({
              where: {
                id: transporterEdit.idTransporter
              },
              raw: false
            });
          case 15:
            transporter = _context16.sent;
            if (!transporter) {
              _context16.next = 32;
              break;
            }
            transporter.transporterName = transporterEdit.transporterName;
            transporter.description = transporterEdit.description;
            transporter.foundingDate = transporterEdit.foundingDate;
            transporter.status = 1;
            _context16.next = 23;
            return transporter.save();
          case 23:
            _context16.next = 25;
            return _index["default"].User.findOne({
              where: {
                id: transporterEdit.id,
                idTransporter: transporterEdit.idTransporter // Điều kiện để lọc các phần tử của bảng A
              },

              raw: true
            });
          case 25:
            userNew = _context16.sent;
            delete userNew.password;
            _context16.next = 29;
            return _index["default"].Transporter.findOne({
              where: {
                id: transporterEdit.idTransporter // Điều kiện để lọc các phần tử của bảng A
              },

              raw: true
            });
          case 29:
            transporterNew = _context16.sent;
            delete transporterNew.id;
            resolve({
              errCode: 0,
              message: 'Chỉnh sửa thành công',
              data: {
                userNew: userNew,
                transporterNew: transporterNew
              }
            });
          case 32:
            _context16.next = 35;
            break;
          case 34:
            resolve({
              errCode: 1,
              message: "Ng\u01B0\u1EDDi d\xF9ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 35:
            _context16.next = 38;
            break;
          case 37:
            resolve({
              errCode: 2,
              message: 'Vui lòng nhập thông tin!!!'
            });
          case 38:
            _context16.next = 43;
            break;
          case 40:
            _context16.prev = 40;
            _context16.t0 = _context16["catch"](0);
            reject(_context16.t0);
          case 43:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 40]]);
    }));
    return function (_x30, _x31) {
      return _ref16.apply(this, arguments);
    };
  }());
};
var CreateScopeOfTransporter = function CreateScopeOfTransporter(scopeArr, idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(resolve, reject) {
      var _iterator5, _step5, scope, scopeofTransporterNew;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _iterator5 = _createForOfIteratorHelper(scopeArr);
            _context17.prev = 2;
            _iterator5.s();
          case 4:
            if ((_step5 = _iterator5.n()).done) {
              _context17.next = 12;
              break;
            }
            scope = _step5.value;
            _context17.next = 8;
            return _index["default"].ScopeOfTransporter.create({
              idTransporter: idTransporter,
              keyScope: scope
            });
          case 8:
            scopeofTransporterNew = _context17.sent;
            if (scopeofTransporterNew) {
              resolve({
                errCode: 0,
                message: 'Tạo thành công',
                data: scopeofTransporterNew
              });
            } else {
              resolve({
                errCode: 2,
                message: 'Lỗi khi tạo phạm vi hoạt động cho người dùng'
              });
            }
          case 10:
            _context17.next = 4;
            break;
          case 12:
            _context17.next = 17;
            break;
          case 14:
            _context17.prev = 14;
            _context17.t0 = _context17["catch"](2);
            _iterator5.e(_context17.t0);
          case 17:
            _context17.prev = 17;
            _iterator5.f();
            return _context17.finish(17);
          case 20:
            ;
            _context17.next = 26;
            break;
          case 23:
            _context17.prev = 23;
            _context17.t1 = _context17["catch"](0);
            reject(_context17.t1);
          case 26:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 23], [2, 14, 17, 20]]);
    }));
    return function (_x32, _x33) {
      return _ref17.apply(this, arguments);
    };
  }());
};
var DeleteScopeOfTransporter = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(scopeArr, idTransporter) {
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          return _context19.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(resolve, reject) {
              var _iterator6, _step6, scope, foundScopeOfTrans;
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.prev = 0;
                    _iterator6 = _createForOfIteratorHelper(scopeArr);
                    _context18.prev = 2;
                    _iterator6.s();
                  case 4:
                    if ((_step6 = _iterator6.n()).done) {
                      _context18.next = 18;
                      break;
                    }
                    scope = _step6.value;
                    _context18.next = 8;
                    return _index["default"].ScopeOfTransporter.findOne({
                      where: {
                        idTransporter: idTransporter,
                        keyScope: scope
                      }
                    });
                  case 8:
                    foundScopeOfTrans = _context18.sent;
                    if (!foundScopeOfTrans) {
                      _context18.next = 15;
                      break;
                    }
                    _context18.next = 12;
                    return _index["default"].ScopeOfTransporter.destroy({
                      where: {
                        idTransporter: idTransporter,
                        keyScope: scope
                      }
                    });
                  case 12:
                    resolve({
                      errCode: 0,
                      message: 'Phạm vi hoạt động của nhà vận chuyển này đã được xóa!'
                    });
                    _context18.next = 16;
                    break;
                  case 15:
                    resolve({
                      errCode: 2,
                      message: "Ph\u1EA1m vi ho\u1EA1t \u0111\u1ED9ng c\u1EE7a nh\xE0 v\u1EADn chuy\u1EC3n kh\xF4ng t\u1ED3n t\u1EA1i!!!"
                    });
                  case 16:
                    _context18.next = 4;
                    break;
                  case 18:
                    _context18.next = 23;
                    break;
                  case 20:
                    _context18.prev = 20;
                    _context18.t0 = _context18["catch"](2);
                    _iterator6.e(_context18.t0);
                  case 23:
                    _context18.prev = 23;
                    _iterator6.f();
                    return _context18.finish(23);
                  case 26:
                    ;
                    _context18.next = 32;
                    break;
                  case 29:
                    _context18.prev = 29;
                    _context18.t1 = _context18["catch"](0);
                    reject(_context18.t1);
                  case 32:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18, null, [[0, 29], [2, 20, 23, 26]]);
            }));
            return function (_x36, _x37) {
              return _ref19.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function DeleteScopeOfTransporter(_x34, _x35) {
    return _ref18.apply(this, arguments);
  };
}();
var CreateCostOfTransporter = function CreateCostOfTransporter(keyService, costArr, idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(resolve, reject) {
      var costOfTransporterNewArr, i, _iterator7, _step7, cost, costOfTransporterNew;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            console.log("hi");
            costOfTransporterNewArr = [];
            i = 0;
            console.log('keyService, costArr, idTransporter', keyService, costArr, idTransporter);
            _iterator7 = _createForOfIteratorHelper(costArr);
            _context20.prev = 6;
            _iterator7.s();
          case 8:
            if ((_step7 = _iterator7.n()).done) {
              _context20.next = 17;
              break;
            }
            cost = _step7.value;
            _context20.next = 12;
            return _index["default"].Cost.create({
              keyService: keyService,
              keyCost: 'C' + i,
              cost: cost,
              idTransporter: idTransporter
            });
          case 12:
            costOfTransporterNew = _context20.sent;
            i++;
            costOfTransporterNewArr.push(costOfTransporterNew);
          case 15:
            _context20.next = 8;
            break;
          case 17:
            _context20.next = 22;
            break;
          case 19:
            _context20.prev = 19;
            _context20.t0 = _context20["catch"](6);
            _iterator7.e(_context20.t0);
          case 22:
            _context20.prev = 22;
            _iterator7.f();
            return _context20.finish(22);
          case 25:
            ;
            if (costOfTransporterNewArr) {
              resolve({
                errCode: 0,
                message: 'Tạo thành công',
                data: costOfTransporterNewArr
              });
            } else {
              resolve({
                errCode: 2,
                message: 'Lỗi khi tạo chi phí cho nhà vận chuyển'
              });
            }
            _context20.next = 32;
            break;
          case 29:
            _context20.prev = 29;
            _context20.t1 = _context20["catch"](0);
            reject({
              errCode: 3,
              message: _context20.t1
            });
          case 32:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 29], [6, 19, 22, 25]]);
    }));
    return function (_x38, _x39) {
      return _ref20.apply(this, arguments);
    };
  }());
};
var GetCostOfTransporterByService = function GetCostOfTransporterByService(keyService, idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(resolve, reject) {
      var costofTrans;
      return _regeneratorRuntime().wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _context21.next = 3;
            return _index["default"].Cost.findAll({
              where: {
                idTransporter: idTransporter,
                keyService: keyService
              },
              raw: false
            });
          case 3:
            costofTrans = _context21.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              data: costofTrans
            });
            _context21.next = 11;
            break;
          case 7:
            _context21.prev = 7;
            _context21.t0 = _context21["catch"](0);
            console.log(_context21.t0);
            reject(_context21.t0);
          case 11:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 7]]);
    }));
    return function (_x40, _x41) {
      return _ref21.apply(this, arguments);
    };
  }());
};
var UpdateCostOfTransporterByService = function UpdateCostOfTransporterByService(keyService, costArr, idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(resolve, reject) {
      var costOfTransporterNewArr, i, costOfTransporter, _iterator8, _step8, price, createCostTransporter;
      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            costOfTransporterNewArr = [];
            i = 0;
            _context22.next = 5;
            return _index["default"].Cost.findAll({
              where: {
                keyService: keyService,
                idTransporter: idTransporter
              },
              raw: false
            });
          case 5:
            costOfTransporter = _context22.sent;
            if (!(costOfTransporter.length > 0)) {
              _context22.next = 30;
              break;
            }
            _iterator8 = _createForOfIteratorHelper(costOfTransporter);
            _context22.prev = 8;
            _iterator8.s();
          case 10:
            if ((_step8 = _iterator8.n()).done) {
              _context22.next = 19;
              break;
            }
            price = _step8.value;
            price.cost = costArr[i];
            _context22.next = 15;
            return price.save();
          case 15:
            i++;
            costOfTransporterNewArr.push(price);
          case 17:
            _context22.next = 10;
            break;
          case 19:
            _context22.next = 24;
            break;
          case 21:
            _context22.prev = 21;
            _context22.t0 = _context22["catch"](8);
            _iterator8.e(_context22.t0);
          case 24:
            _context22.prev = 24;
            _iterator8.f();
            return _context22.finish(24);
          case 27:
            resolve({
              errCode: 0,
              message: 'Cập nhật thành công',
              data: costOfTransporterNewArr
            });
            _context22.next = 34;
            break;
          case 30:
            _context22.next = 32;
            return CreateCostOfTransporter(keyService, costArr, idTransporter);
          case 32:
            createCostTransporter = _context22.sent;
            if (createCostTransporter && createCostTransporter.data.length > 0) {
              resolve({
                errCode: 0,
                message: 'Tạo thành công',
                data: createCostTransporter.data
              });
            } else {
              resolve({
                errCode: 2,
                message: 'Lỗi khi cập nhật chi phí nhà vận chuyển'
              });
            }
          case 34:
            _context22.next = 40;
            break;
          case 36:
            _context22.prev = 36;
            _context22.t1 = _context22["catch"](0);
            console.log(_context22.t1);
            reject(_context22.t1);
          case 40:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[0, 36], [8, 21, 24, 27]]);
    }));
    return function (_x42, _x43) {
      return _ref22.apply(this, arguments);
    };
  }());
};

//quản lý tài xế theo nhà vận chuyển
var GetAllDriverOfTransporter = function GetAllDriverOfTransporter(idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(resolve, reject) {
      var allDrivers;
      return _regeneratorRuntime().wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _context23.next = 3;
            return _index["default"].User.findAll({
              where: {
                idTransporter: idTransporter,
                keyRole: 'R3'
              },
              raw: false
            });
          case 3:
            allDrivers = _context23.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              data: allDrivers
            });
            _context23.next = 11;
            break;
          case 7:
            _context23.prev = 7;
            _context23.t0 = _context23["catch"](0);
            console.log(_context23.t0);
            reject(_context23.t0);
          case 11:
          case "end":
            return _context23.stop();
        }
      }, _callee23, null, [[0, 7]]);
    }));
    return function (_x44, _x45) {
      return _ref23.apply(this, arguments);
    };
  }());
};
var GetDriverById = function GetDriverById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(resolve, reject) {
      var driver;
      return _regeneratorRuntime().wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            _context24.next = 3;
            return _index["default"].User.findOne({
              where: {
                id: id,
                keyRole: 'R3'
              },
              raw: false
            });
          case 3:
            driver = _context24.sent;
            if (driver) {
              resolve({
                errCode: 0,
                message: 'OK',
                data: driver
              });
            } else {
              resolve({
                errCode: 1,
                message: 'Không tìm thấy người dùng'
              });
            }
            _context24.next = 11;
            break;
          case 7:
            _context24.prev = 7;
            _context24.t0 = _context24["catch"](0);
            console.log(_context24.t0);
            reject(_context24.t0);
          case 11:
          case "end":
            return _context24.stop();
        }
      }, _callee24, null, [[0, 7]]);
    }));
    return function (_x46, _x47) {
      return _ref24.apply(this, arguments);
    };
  }());
};
var deleteDriver = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(idDriverDel) {
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          return _context26.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(resolve, reject) {
              var foundDriver, imageDriver;
              return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                while (1) switch (_context25.prev = _context25.next) {
                  case 0:
                    _context25.prev = 0;
                    _context25.next = 3;
                    return _index["default"].User.findOne({
                      where: {
                        id: idDriverDel
                      }
                    });
                  case 3:
                    foundDriver = _context25.sent;
                    if (!foundDriver) {
                      _context25.next = 14;
                      break;
                    }
                    imageDriver = foundDriver.image;
                    if (!imageDriver) {
                      _context25.next = 9;
                      break;
                    }
                    _context25.next = 9;
                    return (0, _userSevice.removeFileService)(imageDriver);
                  case 9:
                    _context25.next = 11;
                    return _index["default"].User.destroy({
                      where: {
                        id: idDriverDel
                      }
                    });
                  case 11:
                    resolve({
                      errCode: 0,
                      message: 'Tài xế đã được xóa!'
                    });
                    _context25.next = 15;
                    break;
                  case 14:
                    resolve({
                      errCode: 2,
                      message: "T\xE0i x\u1EBF kh\xF4ng t\u1ED3n t\u1EA1i!!!"
                    });
                  case 15:
                    _context25.next = 20;
                    break;
                  case 17:
                    _context25.prev = 17;
                    _context25.t0 = _context25["catch"](0);
                    reject(_context25.t0);
                  case 20:
                  case "end":
                    return _context25.stop();
                }
              }, _callee25, null, [[0, 17]]);
            }));
            return function (_x49, _x50) {
              return _ref26.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context26.stop();
      }
    }, _callee26);
  }));
  return function deleteDriver(_x48) {
    return _ref25.apply(this, arguments);
  };
}();
var editDriver = function editDriver(driverEdit) {
  return new Promise( /*#__PURE__*/function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(resolve, reject) {
      var driver, phone;
      return _regeneratorRuntime().wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            if (!driverEdit.id) {
              _context27.next = 30;
              break;
            }
            _context27.next = 4;
            return _index["default"].User.findOne({
              where: {
                id: driverEdit.id
              },
              raw: false
            });
          case 4:
            driver = _context27.sent;
            if (!driver) {
              _context27.next = 27;
              break;
            }
            _context27.next = 8;
            return _index["default"].User.findOne({
              where: {
                phone: driverEdit.phone,
                id: _defineProperty({}, _sequelize.Op.ne, driverEdit.id),
                keyRole: 'R3'
              }
            });
          case 8:
            phone = _context27.sent;
            console.log(phone);
            if (phone) {
              _context27.next = 24;
              break;
            }
            driver.image = driverEdit.image;
            driver.userName = driverEdit.userName;
            driver.phone = driverEdit.phone;
            driver.address = driverEdit.address;
            driver.email = driverEdit.email;
            driver.birthday = driverEdit.birthday;
            driver.keyGender = driverEdit.keyGender;
            driver.status = driverEdit.status;
            _context27.next = 21;
            return driver.save();
          case 21:
            resolve({
              errCode: 0,
              message: 'Sửa tài xế thành công',
              data: driver
            });
            _context27.next = 25;
            break;
          case 24:
            resolve({
              errCode: 3,
              message: 'Số điện thoại của tài xế đã tồn tại'
            });
          case 25:
            _context27.next = 28;
            break;
          case 27:
            resolve({
              errCode: 2,
              message: 'Không tìm thấy phương tiện'
            });
          case 28:
            _context27.next = 31;
            break;
          case 30:
            resolve({
              errCode: 1,
              message: 'Vui lòng nhập thông tin'
            });
          case 31:
            _context27.next = 36;
            break;
          case 33:
            _context27.prev = 33;
            _context27.t0 = _context27["catch"](0);
            reject(_context27.t0);
          case 36:
          case "end":
            return _context27.stop();
        }
      }, _callee27, null, [[0, 33]]);
    }));
    return function (_x51, _x52) {
      return _ref27.apply(this, arguments);
    };
  }());
};

// lấy tất cả nhà vận chuyển theo id nhà vận chuyển
var getAllTransporterByIdTransporter = function getAllTransporterByIdTransporter(status) {
  return new Promise( /*#__PURE__*/function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(resolve, reject) {
      var transporterList, transporterLocationList;
      return _regeneratorRuntime().wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
            if (!status) {
              _context29.next = 16;
              break;
            }
            _context29.next = 4;
            return _index["default"].Transporter.findAll({
              where: {
                status: status
              },
              include: [{
                model: _index["default"].User,
                // thông tin khách hàng
                as: 'UserTransporter',
                // Đặt tên cho mối quan hệ
                where: {
                  keyRole: 'R2'
                },
                attributes: {
                  exclude: ['userName', 'birthday', 'keyGender', 'idTransporter', 'status', 'password']
                }
              }, {
                model: _index["default"].ServiceOfTransporter,
                // dịch vụ của đơn hàng
                as: 'ServiceOfTransporter',
                // Đặt tên cho mối quan hệ
                attributes: {
                  exclude: ['idTransporter', 'createdAt', 'updatedAt']
                }
              }, {
                model: _index["default"].Cost,
                // dịch vụ của đơn hàng
                as: 'CostOfTransporter',
                // Đặt tên cho mối quan hệ
                attributes: {
                  exclude: ['idTransporter', 'createdAt', 'updatedAt']
                }
              }],
              raw: false
            });
          case 4:
            transporterList = _context29.sent;
            if (!(transporterList && transporterList.length > 0)) {
              _context29.next = 13;
              break;
            }
            _context29.next = 8;
            return Promise.all(transporterList.map( /*#__PURE__*/function () {
              var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(item, index) {
                var transporterLocation;
                return _regeneratorRuntime().wrap(function _callee28$(_context28) {
                  while (1) switch (_context28.prev = _context28.next) {
                    case 0:
                      if (!(item.UserTransporter && item.UserTransporter.idDefaultLocation)) {
                        _context28.next = 8;
                        break;
                      }
                      _context28.next = 3;
                      return _index["default"].UserLocation.findOne({
                        where: {
                          id: item.UserTransporter.idDefaultLocation
                        }
                      });
                    case 3:
                      transporterLocation = _context28.sent;
                      if (!transporterLocation) {
                        _context28.next = 6;
                        break;
                      }
                      return _context28.abrupt("return", transporterLocation);
                    case 6:
                      _context28.next = 9;
                      break;
                    case 8:
                      return _context28.abrupt("return", {});
                    case 9:
                    case "end":
                      return _context28.stop();
                  }
                }, _callee28);
              }));
              return function (_x55, _x56) {
                return _ref29.apply(this, arguments);
              };
            }()));
          case 8:
            transporterLocationList = _context29.sent;
            if (transporterLocationList && transporterLocationList.length > 0) {
              transporterList.map(function (item, index) {
                item.setDataValue('TransporterLocation', transporterLocationList[index]);
              });
            }
            resolve({
              errCode: 0,
              message: 'Lấy danh sách nhà vận chuyển thành công!!!',
              data: transporterList
            });
            _context29.next = 14;
            break;
          case 13:
            resolve({
              errCode: 2,
              message: 'Danh sách nhà vận chuyển không tồn tại!!!',
              data: []
            });
          case 14:
            _context29.next = 17;
            break;
          case 16:
            resolve({
              errCode: 1,
              message: "Vui l\xF2ng nh\u1EADp tr\u1EA1ng th\xE1i ho\u1EA1t \u0111\u1ED9ng c\u1EE7a nh\xE0 v\u1EADn chuy\u1EC3n!!!"
            });
          case 17:
            _context29.next = 22;
            break;
          case 19:
            _context29.prev = 19;
            _context29.t0 = _context29["catch"](0);
            reject(_context29.t0);
          case 22:
          case "end":
            return _context29.stop();
        }
      }, _callee29, null, [[0, 19]]);
    }));
    return function (_x53, _x54) {
      return _ref28.apply(this, arguments);
    };
  }());
};

// lấy thông tin nhà vận chuyển theo id nhà vận chuyển
var getTransporterInfoByIdTransporter = function getTransporterInfoByIdTransporter(idTransporter) {
  return new Promise( /*#__PURE__*/function () {
    var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(resolve, reject) {
      var transporterInfo, transporterLocation;
      return _regeneratorRuntime().wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            _context30.prev = 0;
            if (!idTransporter) {
              _context30.next = 17;
              break;
            }
            _context30.next = 4;
            return _index["default"].Transporter.findOne({
              where: {
                id: idTransporter
              },
              include: [{
                model: _index["default"].User,
                // thông tin khách hàng
                as: 'UserTransporter',
                // Đặt tên cho mối quan hệ
                where: {
                  keyRole: 'R2'
                },
                attributes: {
                  exclude: ['userName', 'birthday', 'keyGender', 'idTransporter', 'status', 'password']
                }
              }, {
                model: _index["default"].ServiceOfTransporter,
                // dịch vụ của đơn hàng
                as: 'ServiceOfTransporter',
                // Đặt tên cho mối quan hệ
                attributes: {
                  exclude: ['idTransporter', 'createdAt', 'updatedAt']
                }
              }
              // {
              //     model: db.Cost, // dịch vụ của đơn hàng
              //     as: 'CostOfTransporter', // Đặt tên cho mối quan hệ
              //     attributes: { 
              //         exclude: [
              //             'idTransporter', 
              //             'createdAt',
              //             'updatedAt',
              //         ] ,
              //     },
              // },
              ],

              raw: false
            });
          case 4:
            transporterInfo = _context30.sent;
            if (!transporterInfo) {
              _context30.next = 14;
              break;
            }
            if (!(transporterInfo && transporterInfo.UserTransporter && transporterInfo.UserTransporter.idDefaultLocation)) {
              _context30.next = 11;
              break;
            }
            _context30.next = 9;
            return _index["default"].UserLocation.findOne({
              where: {
                id: transporterInfo.UserTransporter.idDefaultLocation
              }
            });
          case 9:
            transporterLocation = _context30.sent;
            if (transporterLocation) {
              transporterInfo.setDataValue('TransporterLocation', transporterLocation);
            }
          case 11:
            resolve({
              errCode: 0,
              message: 'Lấy thông tin nhà vận chuyển thành công!!!',
              data: transporterInfo
            });
            _context30.next = 15;
            break;
          case 14:
            resolve({
              errCode: 2,
              message: 'Nhà vận chuyển không tồn tại!!!',
              data: {}
            });
          case 15:
            _context30.next = 18;
            break;
          case 17:
            resolve({
              errCode: 1,
              message: "Vui l\xF2ng nh\u1EADp id c\u1EE7a nh\xE0 v\u1EADn chuy\u1EC3n!!!"
            });
          case 18:
            _context30.next = 23;
            break;
          case 20:
            _context30.prev = 20;
            _context30.t0 = _context30["catch"](0);
            reject(_context30.t0);
          case 23:
          case "end":
            return _context30.stop();
        }
      }, _callee30, null, [[0, 20]]);
    }));
    return function (_x57, _x58) {
      return _ref30.apply(this, arguments);
    };
  }());
};

//tìm kiếm nhà vận chuyển theo từ khóa (tên)
var searchTransporterByName = function searchTransporterByName(keyword) {
  return new Promise( /*#__PURE__*/function () {
    var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(resolve, reject) {
      var allTransporter, keywordFormatted, allTransporterFilter;
      return _regeneratorRuntime().wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
          case 0:
            _context31.prev = 0;
            _context31.next = 3;
            return _index["default"].Transporter.findAll({
              where: {
                // transporterName: { [Op.like]: `%${keywordFormatted}%` },
                status: 1
              }
            });
          case 3:
            allTransporter = _context31.sent;
            keywordFormatted = removeAccents(keyword.toLowerCase());
            if (allTransporter) {
              allTransporterFilter = allTransporter.filter(function (transporter) {
                return removeAccents(transporter.transporterName.toLowerCase()).includes(keywordFormatted);
              });
              resolve({
                errCode: 0,
                message: 'OK',
                data: allTransporterFilter
              });
            } else {
              resolve({
                errCode: 1,
                message: 'Không tìm thấy nhà vận chuyển nào!!!',
                data: []
              });
            }
            _context31.next = 12;
            break;
          case 8:
            _context31.prev = 8;
            _context31.t0 = _context31["catch"](0);
            console.log(_context31.t0);
            reject(_context31.t0);
          case 12:
          case "end":
            return _context31.stop();
        }
      }, _callee31, null, [[0, 8]]);
    }));
    return function (_x59, _x60) {
      return _ref31.apply(this, arguments);
    };
  }());
};

// xóa dấu tiếng việt =>  dùng cho hàm tìm kiếm tên tài xế
var removeAccents = function removeAccents(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
};
module.exports = {
  getOrdersByService: getOrdersByService,
  getOrderStatusByKey: getOrderStatusByKey,
  CreateAccountTransporter: CreateAccountTransporter,
  GetTransporterByIdUser: GetTransporterByIdUser,
  GetWeightByVehicle: GetWeightByVehicle,
  CreateVehicle: CreateVehicle,
  GetVehicleByIdTransporter: GetVehicleByIdTransporter,
  deleteVehicle: deleteVehicle,
  editVehicle: editVehicle,
  GetServiceOfTransporter: GetServiceOfTransporter,
  GetScopeOfTransporter: GetScopeOfTransporter,
  editInfoTrans: editInfoTrans,
  CreateServiceOfTransporter: CreateServiceOfTransporter,
  DeleteServiceOfTransporter: DeleteServiceOfTransporter,
  CreateScopeOfTransporter: CreateScopeOfTransporter,
  DeleteScopeOfTransporter: DeleteScopeOfTransporter,
  CreateCostOfTransporter: CreateCostOfTransporter,
  GetCostOfTransporterByService: GetCostOfTransporterByService,
  UpdateCostOfTransporterByService: UpdateCostOfTransporterByService,
  GetAllDriverOfTransporter: GetAllDriverOfTransporter,
  deleteDriver: deleteDriver,
  editDriver: editDriver,
  getAllTransporterByIdTransporter: getAllTransporterByIdTransporter,
  GetDriverById: GetDriverById,
  getTransporterInfoByIdTransporter: getTransporterInfoByIdTransporter,
  searchTransporterByName: searchTransporterByName
};