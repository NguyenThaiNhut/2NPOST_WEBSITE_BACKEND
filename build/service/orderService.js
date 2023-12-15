"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireDefault(require("../models/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//kiểm tra đơn hàng (order) có tồn tại hay không, nếu tồn tại trả về true, ngược lại false
var checkOrderExists = function checkOrderExists(idOrder) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var order;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].Order.findOne({
              where: {
                id: idOrder
              }
            });
          case 3:
            order = _context.sent;
            if (order) {
              resolve(true);
            } else {
              resolve(false);
            }
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

//lấy loại hàng hóa theo id đơn hàng, (dễ vỡ, quá tải,...)
var getTypeOfGoodsByOrder = function getTypeOfGoodsByOrder(idOrder) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var checkOrder, typeOfGoods;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return checkOrderExists(idOrder);
          case 3:
            checkOrder = _context2.sent;
            if (!checkOrder) {
              _context2.next = 11;
              break;
            }
            _context2.next = 7;
            return _index["default"].TypeOfGoodsByOrder.findAll({
              where: {
                idOrder: idOrder
              },
              include: [{
                model: _index["default"].AllCode,
                // dịch vụ của đơn hàng
                as: 'keyTypeOfGoodsAllCode' // Đặt tên cho mối quan hệ
              }],

              raw: false
            });
          case 7:
            typeOfGoods = _context2.sent;
            if (typeOfGoods) {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 lo\u1EA1i h\xE0ng h\xF3a theo \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!!!",
                data: typeOfGoods
              });
            } else {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 lo\u1EA1i h\xE0ng h\xF3a theo \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!!!",
                data: []
              });
            }
            _context2.next = 12;
            break;
          case 11:
            resolve({
              errCode: 1,
              message: "\u0110\u01A1n h\xE0ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 12:
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

//lấy hàng hóa theo id đơn hàng, (laptop, điện thoại, bàn ghế, tủ lạnh,...)
var getGoodsByOrder = function getGoodsByOrder(idOrder) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var checkOrder, goods;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return checkOrderExists(idOrder);
          case 3:
            checkOrder = _context3.sent;
            if (!checkOrder) {
              _context3.next = 11;
              break;
            }
            _context3.next = 7;
            return _index["default"].Goods.findAll({
              where: {
                idOrder: idOrder
              }
              // include: [
              //     {
              //         model: db.AllCode, // dịch vụ của đơn hàng
              //         as: 'keyTypeOfGoodsAllCode', // Đặt tên cho mối quan hệ
              //     },
              // ],
              // raw: false
            });
          case 7:
            goods = _context3.sent;
            if (goods) {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 h\xE0ng h\xF3a theo \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!!!",
                data: goods
              });
            } else {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 h\xE0ng h\xF3a theo \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!!!",
                data: []
              });
            }
            _context3.next = 12;
            break;
          case 11:
            resolve({
              errCode: 1,
              message: "\u0110\u01A1n h\xE0ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 12:
            _context3.next = 17;
            break;
          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 14]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

// kiểm tra id người dùng có tồn tại trong database hay chưa,
var checkUserExists = function checkUserExists(idUser) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _index["default"].User.findOne({
              where: {
                id: idUser
              }
            });
          case 3:
            user = _context4.sent;
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
            _context4.next = 10;
            break;
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 10:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 7]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};

// kiểm tra key của 2 bảng trạng thái đơn hàng & trạng thái vận chuyển có tồn tại trong database hay chưa,
var checkKeyOrderStatusExists = function checkKeyOrderStatusExists(keyOrderStatus) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var orderStatus;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            console.log('checkkkk: ', keyOrderStatus);
            _context5.next = 4;
            return _index["default"].AllCode.findAll({
              where: {
                type: ["ORDER_STATUS", "TRANSPORT_STATUS"],
                key: keyOrderStatus
              }
            });
          case 4:
            orderStatus = _context5.sent;
            console.log('checkkkkkk: ', orderStatus);
            if (orderStatus) {
              resolve(true);
            } else {
              resolve(false);
            }
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

//lấy thông tin đơn hàng theo id đơn hàng
var getAllOrderInfoByIdOrder = function getAllOrderInfoByIdOrder(idOrder) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var order, typeOfGoods, goods;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _index["default"].Order.findOne({
              where: {
                id: idOrder
              },
              include: [{
                model: _index["default"].User,
                // thông tin khách hàng
                as: 'user',
                // Đặt tên cho mối quan hệ
                attributes: {
                  exclude: ['password']
                }
              }, {
                model: _index["default"].AllCode,
                // dịch vụ của đơn hàng
                as: 'keyServiceAllCode' // Đặt tên cho mối quan hệ
              }, {
                model: _index["default"].AllCode,
                // trạng thái của đơn hàng
                as: 'keyOrderStatusAllCode' // Đặt tên cho mối quan hệ
              }, {
                model: _index["default"].UserLocation,
                // tọa độ người gửi
                as: 'senderLocation' // Đặt tên cho mối quan hệ
              }, {
                model: _index["default"].Transportation,
                // thông tin transportation
                as: 'transportationOrder' // Đặt tên cho mối quan hệ
              }],

              raw: false
            });
          case 3:
            order = _context6.sent;
            if (!order) {
              _context6.next = 18;
              break;
            }
            _context6.next = 7;
            return getTypeOfGoodsByOrder(idOrder);
          case 7:
            typeOfGoods = _context6.sent;
            console.log('check: ', typeOfGoods);
            if (typeOfGoods.errCode == 0) {
              if (typeOfGoods.data.length > 0) {
                order.setDataValue('typeOfGoods', typeOfGoods.data);
              } else {
                order.setDataValue('typeOfGoods', []);
              }
            }
            _context6.next = 12;
            return getGoodsByOrder(idOrder);
          case 12:
            goods = _context6.sent;
            console.log('check: ', goods);
            if (goods.errCode == 0) {
              if (goods.data.length > 0) {
                order.setDataValue('goods', goods.data);
              } else {
                order.setDataValue('goods', []);
              }
            }
            resolve({
              errCode: 0,
              message: "L\u1EA5y th\xF4ng tin \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!!!",
              data: order
            });
            _context6.next = 19;
            break;
          case 18:
            resolve({
              errCode: 1,
              message: "\u0110\u01A1n h\xE0ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 19:
            _context6.next = 24;
            break;
          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 24:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 21]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};

//tạo mới đơn hàng người dùng vào database
var createNewOrder = function createNewOrder(orderInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var checkedUser, order;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return checkUserExists(orderInput.idCustomer);
          case 3:
            checkedUser = _context7.sent;
            if (!checkedUser) {
              _context7.next = 12;
              break;
            }
            _context7.next = 7;
            return _index["default"].Order.create({
              idCustomer: orderInput.idCustomer,
              image: orderInput.image,
              senderName: orderInput.senderName,
              senderPhone: orderInput.senderPhone,
              senderAddress: orderInput.senderAddress,
              recieverName: orderInput.recieverName,
              recieverPhone: orderInput.recieverPhone,
              recieverAddress: orderInput.recieverAddress,
              typeOrder: orderInput.typeOrder,
              // loại "0": hệ thống tự động gợi ý nhà vận chuyển , loại "1" tự lựa chọn nhà vận chuyển
              idTransporter: orderInput.idTransporter,
              keyService: orderInput.keyService,
              idSenderLocation: orderInput.idSenderLocation,
              recieverLngLocation: orderInput.recieverLngLocation,
              recieverLatLocation: orderInput.recieverLatLocation,
              keyOrderStatus: orderInput.keyOrderStatus,
              totalCost: orderInput.totalCost,
              note: orderInput.note
            });
          case 7:
            order = _context7.sent;
            console.log('thong tin don hang da duoc tao: ', order);
            resolve({
              errCode: 0,
              message: 'Tạo đơn hàng thành công',
              data: order
            });
            _context7.next = 13;
            break;
          case 12:
            resolve({
              errCode: 1,
              message: 'Người dùng không được tìm thấy!!!'
            });
          case 13:
            _context7.next = 18;
            break;
          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 18:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 15]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};

//lấy tất cả đơn hàng theo id của khách hàng và trạng thái đơn hàng (nếu có)
var getAllOrderByIdCustomer = function getAllOrderByIdCustomer(idUser, keyOrderStatus) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var checkUserExistsValue, orderList, orderListOfDriver, orderTransportationStatus, _orderListOfDriver, checkKeyOrderStatusExistsValue, _orderList;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return checkUserExists(idUser);
          case 3:
            checkUserExistsValue = _context8.sent;
            if (!checkUserExistsValue) {
              _context8.next = 55;
              break;
            }
            if (!(keyOrderStatus == 'ALL')) {
              _context8.next = 12;
              break;
            }
            _context8.next = 8;
            return _index["default"].Order.findAll({
              where: {
                idCustomer: idUser
              }
            });
          case 8:
            orderList = _context8.sent;
            if (orderList && orderList.length > 0) {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng theo ID kh\xE1ch h\xE0ng th\xE0nh c\xF4ng!!!",
                data: orderList
              });
            } else {
              resolve({
                errCode: 2,
                message: "Danh s\xE1ch \u0111\u01A1n h\xE0ng r\u1ED7ng!!!"
              });
            }
            _context8.next = 53;
            break;
          case 12:
            if (!(keyOrderStatus == 'DRIVER_ORDER')) {
              _context8.next = 20;
              break;
            }
            _context8.next = 15;
            return _index["default"].Transportation.findAll({
              where: {
                idDriver: idUser
                // keyTransportStatus: ["TS0", "TS1", "TS2", "TS3"],
              },

              include: [{
                model: _index["default"].Order,
                // dịch vụ của đơn hàng
                as: 'orderTransportation' // Đặt tên cho mối quan hệ
              }],

              raw: false
            });
          case 15:
            orderListOfDriver = _context8.sent;
            if (orderListOfDriver.length > 0) {
              orderTransportationStatus = ['TS0', 'TS1', 'TS2', 'TS3'];
              orderListOfDriver = orderListOfDriver.filter(function (item, index) {
                var key = item.orderTransportation.keyOrderStatus;
                console.log(key);
                return orderTransportationStatus.includes(key);
              });
            }
            if (orderListOfDriver && orderListOfDriver.length > 0) {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng theo ID t\xE0i x\u1EBF th\xE0nh c\xF4ng!!!",
                data: orderListOfDriver
              });
            } else {
              resolve({
                errCode: 2,
                message: "Danh s\xE1ch \u0111\u01A1n h\xE0ng r\u1ED7ng!!!"
              });
            }
            _context8.next = 53;
            break;
          case 20:
            if (!(keyOrderStatus == 'DRIVER_HISTORY')) {
              _context8.next = 28;
              break;
            }
            _context8.next = 23;
            return _index["default"].Transportation.findAll({
              where: {
                idDriver: idUser
                // keyTransportStatus: ["TS0", "TS1", "TS2", "TS3"],
              },

              include: [{
                model: _index["default"].Order,
                // dịch vụ của đơn hàng
                as: 'orderTransportation' // Đặt tên cho mối quan hệ
              }],

              raw: false
            });
          case 23:
            _orderListOfDriver = _context8.sent;
            if (_orderListOfDriver.length > 0) {
              orderTransportationStatus = ['TS4', 'TS5'];
              _orderListOfDriver = _orderListOfDriver.filter(function (item, index) {
                var key = item.orderTransportation.keyOrderStatus;
                console.log(key);
                return orderTransportationStatus.includes(key);
              });
            }
            if (_orderListOfDriver && _orderListOfDriver.length > 0) {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng theo ID t\xE0i x\u1EBF th\xE0nh c\xF4ng!!!",
                data: _orderListOfDriver
              });
            } else {
              resolve({
                errCode: 2,
                message: "Danh s\xE1ch \u0111\u01A1n h\xE0ng r\u1ED7ng!!!"
              });
            }
            _context8.next = 53;
            break;
          case 28:
            _context8.next = 30;
            return checkKeyOrderStatusExists(keyOrderStatus);
          case 30:
            checkKeyOrderStatusExistsValue = _context8.sent;
            console.log('check checkKeyOrderStatusExistsValue: ', checkKeyOrderStatusExistsValue);
            if (!checkKeyOrderStatusExistsValue) {
              _context8.next = 52;
              break;
            }
            _orderList = [];
            if (!(keyOrderStatus == 'OS1')) {
              _context8.next = 40;
              break;
            }
            _context8.next = 37;
            return _index["default"].Order.findAll({
              where: {
                idCustomer: idUser,
                keyOrderStatus: ["TS0", "TS1", "TS2", "TS3"]
              },
              include: [{
                model: _index["default"].Transportation,
                // dịch vụ của đơn hàng
                as: 'transportationOrder' // Đặt tên cho mối quan hệ
              }],

              raw: false
            });
          case 37:
            _orderList = _context8.sent;
            _context8.next = 49;
            break;
          case 40:
            if (!(keyOrderStatus == 'TS4')) {
              _context8.next = 46;
              break;
            }
            _context8.next = 43;
            return _index["default"].Order.findAll({
              where: {
                idCustomer: idUser,
                keyOrderStatus: ["TS4", "TS5"]
              }
            });
          case 43:
            _orderList = _context8.sent;
            _context8.next = 49;
            break;
          case 46:
            _context8.next = 48;
            return _index["default"].Order.findAll({
              where: {
                idCustomer: idUser,
                keyOrderStatus: keyOrderStatus
              }
            });
          case 48:
            _orderList = _context8.sent;
          case 49:
            if (_orderList && _orderList.length > 0) {
              resolve({
                errCode: 0,
                message: "L\u1EA5y t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng theo ID kh\xE1ch h\xE0ng v\xE0 tr\u1EA1ng th\xE1i \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!!!",
                data: _orderList
              });
            } else {
              resolve({
                errCode: 2,
                message: "Danh s\xE1ch \u0111\u01A1n h\xE0ng r\u1ED7ng!!!"
              });
            }
            _context8.next = 53;
            break;
          case 52:
            resolve({
              errCode: 3,
              message: "Kh\xF4ng t\xECm th\u1EA5y key c\u1EE7a tr\u1EA1ng th\xE1i \u0111\u01A1n h\xE0ng!!!"
            });
          case 53:
            _context8.next = 56;
            break;
          case 55:
            resolve({
              errCode: 1,
              message: "Ng\u01B0\u1EDDi d\xF9ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 56:
            _context8.next = 61;
            break;
          case 58:
            _context8.prev = 58;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 61:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 58]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
};

// cập nhật trạng thái đơn hàng ()
var updateKeyOrderStatus = function updateKeyOrderStatus(idOrder, keyStatus) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var checkOrderExistsValue, order;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return checkOrderExists(idOrder);
          case 3:
            checkOrderExistsValue = _context9.sent;
            if (!checkOrderExistsValue) {
              _context9.next = 22;
              break;
            }
            if (!keyStatus) {
              _context9.next = 19;
              break;
            }
            _context9.next = 8;
            return _index["default"].Order.findOne({
              where: {
                id: idOrder
              },
              raw: false
            });
          case 8:
            order = _context9.sent;
            if (!order) {
              _context9.next = 16;
              break;
            }
            order.keyOrderStatus = keyStatus;
            _context9.next = 13;
            return order.save();
          case 13:
            resolve({
              errCode: 0,
              message: 'Trạng thái đơn hàng đã được cập nhật!'
            });
            _context9.next = 17;
            break;
          case 16:
            resolve({
              errCode: 3,
              message: "\u0110\u01A1n h\xE0ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 17:
            _context9.next = 20;
            break;
          case 19:
            resolve({
              errCode: 2,
              message: "Vui l\xF2ng nh\u1EADp tr\u1EA1ng th\xE1i \u0111\u01A1n h\xE0ng!!!"
            });
          case 20:
            _context9.next = 23;
            break;
          case 22:
            resolve({
              errCode: 1,
              message: "Ng\u01B0\u1EDDi d\xF9ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 23:
            _context9.next = 28;
            break;
          case 25:
            _context9.prev = 25;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 28:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 25]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
};

// cập nhật trạng thái thanh toán cho đơn hàng
var updateOrderPaymentStatus = function updateOrderPaymentStatus(idOrder, payment, typePayment) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var checkOrderExistsValue, transportation;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return checkOrderExists(idOrder);
          case 3:
            checkOrderExistsValue = _context10.sent;
            if (!checkOrderExistsValue) {
              _context10.next = 19;
              break;
            }
            _context10.next = 7;
            return _index["default"].Transportation.findOne({
              where: {
                idOrder: idOrder
              },
              raw: false
            });
          case 7:
            transportation = _context10.sent;
            if (!transportation) {
              _context10.next = 16;
              break;
            }
            transportation.payment = payment;
            transportation.typePayment = typePayment; // tiền mặt 0, thanh toán 1
            _context10.next = 13;
            return transportation.save();
          case 13:
            resolve({
              errCode: 0,
              message: 'Trạng thái thanh toán của đơn hàng đã được cập nhật!'
            });
            _context10.next = 17;
            break;
          case 16:
            resolve({
              errCode: 3,
              message: "\u0110\u01A1n h\xE0ng v\u1EADn chuy\u1EC3n kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 17:
            _context10.next = 20;
            break;
          case 19:
            resolve({
              errCode: 1,
              message: "Ng\u01B0\u1EDDi d\xF9ng kh\xF4ng t\u1ED3n t\u1EA1i!!!"
            });
          case 20:
            _context10.next = 25;
            break;
          case 22:
            _context10.prev = 22;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 25:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 22]]);
    }));
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());
};

//thêm tài xế cho đơn hàng
var CreateDriverForOrder = function CreateDriverForOrder(idOrder, idDriver) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var order, transportation;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _index["default"].Transportation.findOne({
              where: {
                idOrder: idOrder
              },
              raw: false
            });
          case 3:
            order = _context11.sent;
            if (!order) {
              _context11.next = 11;
              break;
            }
            order.idDriver = idDriver;
            _context11.next = 8;
            return order.save();
          case 8:
            resolve({
              errCode: 0,
              message: 'Chỉnh sửa tài xế cho đơn hàng thành công'
            });
            _context11.next = 15;
            break;
          case 11:
            _context11.next = 13;
            return _index["default"].Transportation.create({
              idOrder: idOrder,
              idDriver: idDriver,
              payment: false,
              // thiết lập mặc định là false, chưa thanh toán
              keyTransportStatus: 'TS0' // thiết lập mặc định là chờ lấy hàng
            });
          case 13:
            transportation = _context11.sent;
            if (transportation) {
              resolve({
                errCode: 0,
                message: 'Thêm tài xế vào đơn hàng thành công',
                data: transportation
              });
            }
          case 15:
            _context11.next = 20;
            break;
          case 17:
            _context11.prev = 17;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);
          case 20:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 17]]);
    }));
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());
};

//thêm phương tiện cho đơn hàng
var CreateVehicleForOrder = function CreateVehicleForOrder(idOrder, idVehicle) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var order, transportation;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _index["default"].Transportation.findOne({
              where: {
                idOrder: idOrder
              },
              raw: false
            });
          case 3:
            order = _context12.sent;
            if (!order) {
              _context12.next = 11;
              break;
            }
            order.idVehicle = idVehicle;
            _context12.next = 8;
            return order.save();
          case 8:
            resolve({
              errCode: 0,
              message: 'Chỉnh sửa phương tiện cho đơn hàng thành công'
            });
            _context12.next = 15;
            break;
          case 11:
            _context12.next = 13;
            return _index["default"].Transportation.create({
              idOrder: idOrder,
              idVehicle: idVehicle,
              payment: false,
              // thiết lập mặc định là false, chưa thanh toán
              keyTransportStatus: 'TS0' // thiết lập mặc định là chờ lấy hàng
            });
          case 13:
            transportation = _context12.sent;
            if (transportation) {
              resolve({
                errCode: 0,
                message: 'Thêm phương tiện vào đơn hàng thành công',
                data: transportation
              });
            }
          case 15:
            _context12.next = 20;
            break;
          case 17:
            _context12.prev = 17;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);
          case 20:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 17]]);
    }));
    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());
};

//Thêm transportation cho đơn hàng
var CreateTransportationOrder = function CreateTransportationOrder(idOrder) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(resolve, reject) {
      var order, transportation;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _index["default"].Transportation.findOne({
              where: {
                idOrder: idOrder
              },
              raw: false
            });
          case 3:
            order = _context13.sent;
            if (!order) {
              _context13.next = 8;
              break;
            }
            resolve({
              errCode: 0,
              message: 'Đơn hàng đã tồn tại trong transportation'
            });
            _context13.next = 12;
            break;
          case 8:
            _context13.next = 10;
            return _index["default"].Transportation.create({
              idOrder: idOrder,
              payment: false,
              // thiết lập mặc định là false, chưa thanh toán
              keyTransportStatus: 'TS0' // thiết lập mặc định là chờ lấy hàng
            });
          case 10:
            transportation = _context13.sent;
            if (transportation) {
              resolve({
                errCode: 0,
                message: 'Đơn hàng đã được thêm thành công vào transportation',
                data: transportation
              });
            }
          case 12:
            _context13.next = 17;
            break;
          case 14:
            _context13.prev = 14;
            _context13.t0 = _context13["catch"](0);
            reject(_context13.t0);
          case 17:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 14]]);
    }));
    return function (_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }());
};
module.exports = {
  createNewOrder: createNewOrder,
  getAllOrderInfoByIdOrder: getAllOrderInfoByIdOrder,
  getAllOrderByIdCustomer: getAllOrderByIdCustomer,
  updateKeyOrderStatus: updateKeyOrderStatus,
  CreateDriverForOrder: CreateDriverForOrder,
  CreateVehicleForOrder: CreateVehicleForOrder,
  CreateTransportationOrder: CreateTransportationOrder,
  updateOrderPaymentStatus: updateOrderPaymentStatus
};