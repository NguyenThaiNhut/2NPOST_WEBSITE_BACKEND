"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _TransporterService = _interopRequireDefault(require("../service/TransporterService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// lấy tất cả đơn hàng theo trạng thái(order-status) của NVC(idTransporter);
var handleGetOrdersByService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var orderStatus, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          orderStatus = req.query.keyOrderStatus;
          idTransporter = req.query.idTransporter;
          _context.prev = 2;
          _context.next = 5;
          return _TransporterService["default"].getOrdersByService(orderStatus, idTransporter);
        case 5:
          message = _context.sent;
          return _context.abrupt("return", res.status(200).json(message));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 9]]);
  }));
  return function handleGetOrdersByService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
var handleGetOrderStatusByKey = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var key, message;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          key = req.query.key;
          _context2.prev = 1;
          _context2.next = 4;
          return _TransporterService["default"].getOrderStatusByKey(key);
        case 4:
          message = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(message));
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function handleGetOrderStatusByKey(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Tạo transporter
var handleCreateAccountTransporter = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var transporterInput, userInput, message;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          transporterInput = req.body.transporter;
          userInput = req.body.user;
          _context3.prev = 2;
          _context3.next = 5;
          return _TransporterService["default"].CreateAccountTransporter(transporterInput, userInput);
        case 5:
          message = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(message));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          return _context3.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 9]]);
  }));
  return function handleCreateAccountTransporter(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//lấy TT transporter dựa vào id.user
var handleGetTransporterByIdUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var idUser, message;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          idUser = req.query.id;
          console.log('check id transporter: ', idUser);
          _context4.prev = 2;
          _context4.next = 5;
          return _TransporterService["default"].GetTransporterByIdUser(idUser);
        case 5:
          message = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(message));
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](2);
          return _context4.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return function handleGetTransporterByIdUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//lấy weight by vehicle
var handleGetWeightByVehicle = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var keyTypeOfVehicle, message;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          keyTypeOfVehicle = req.query.key;
          _context5.prev = 1;
          _context5.next = 4;
          return _TransporterService["default"].GetWeightByVehicle(keyTypeOfVehicle);
        case 4:
          message = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(message));
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function handleGetWeightByVehicle(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Tạo phương tiện
var handleCreateVehicle = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var vehicleInput, message;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          vehicleInput = req.body.vehicleInput;
          _context6.prev = 1;
          _context6.next = 4;
          return _TransporterService["default"].CreateVehicle(vehicleInput);
        case 4:
          message = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(message));
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return function handleCreateVehicle(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//lấy phương tiện theo idTransporter
var handleGetVehicleByIdTransporter = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          idTransporter = req.query.idTransporter;
          _context7.prev = 1;
          _context7.next = 4;
          return _TransporterService["default"].GetVehicleByIdTransporter(idTransporter);
        case 4:
          message = _context7.sent;
          return _context7.abrupt("return", res.status(200).json(message));
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return function handleGetVehicleByIdTransporter(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// xóa phương tiện theo id
var handleDeleteVehicle = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, message;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.body.id;
          if (id) {
            _context8.next = 3;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 3:
          _context8.next = 5;
          return _TransporterService["default"].deleteVehicle(id);
        case 5:
          message = _context8.sent;
          return _context8.abrupt("return", res.status(200).json(message));
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function handleDeleteVehicle(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

//chỉnh sửa phương tiện vận chuyển
var handleEditVehicle = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var vehicleEdit, message;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          vehicleEdit = req.body.vehicleEdit;
          _context9.next = 3;
          return _TransporterService["default"].editVehicle(vehicleEdit);
        case 3:
          message = _context9.sent;
          return _context9.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function handleEditVehicle(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

// lấy dịch vụ của transporter
var handleGetServiceOfTransporter = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          idTransporter = req.query.idTransporter;
          _context10.prev = 1;
          _context10.next = 4;
          return _TransporterService["default"].GetServiceOfTransporter(idTransporter);
        case 4:
          message = _context10.sent;
          return _context10.abrupt("return", res.status(200).json(message));
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](1);
          return _context10.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 8]]);
  }));
  return function handleGetServiceOfTransporter(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var handleCreateServiceOfTransporter = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var serviceArr, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          //[keyService], idTransporter
          serviceArr = req.body.serviceArr;
          idTransporter = req.body.idTransporter;
          _context11.next = 4;
          return _TransporterService["default"].CreateServiceOfTransporter(serviceArr, idTransporter);
        case 4:
          message = _context11.sent;
          return _context11.abrupt("return", res.status(200).json(message));
        case 6:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function handleCreateServiceOfTransporter(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var handleDeleteServiceOfTransporter = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var serviceArr, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          serviceArr = req.body.serviceArr;
          idTransporter = req.body.idTransporter;
          if (!(!idTransporter && !serviceArr)) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 4:
          _context12.next = 6;
          return _TransporterService["default"].DeleteServiceOfTransporter(serviceArr, idTransporter);
        case 6:
          message = _context12.sent;
          return _context12.abrupt("return", res.status(200).json(message));
        case 8:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function handleDeleteServiceOfTransporter(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

// lấy phạm vi của transporter
var handleGetScopeOfTransporter = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          idTransporter = req.query.idTransporter;
          _context13.prev = 1;
          _context13.next = 4;
          return _TransporterService["default"].GetScopeOfTransporter(idTransporter);
        case 4:
          message = _context13.sent;
          return _context13.abrupt("return", res.status(200).json(message));
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](1);
          return _context13.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[1, 8]]);
  }));
  return function handleGetScopeOfTransporter(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
// chỉnh sửa thông tin nhà vận chuyển
var handleEditInfoTrans = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var transporterEdit, message;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          transporterEdit = req.body.transporterEdit;
          _context14.next = 3;
          return _TransporterService["default"].editInfoTrans(transporterEdit);
        case 3:
          message = _context14.sent;
          return _context14.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function handleEditInfoTrans(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var handleCreateScopeOfTransporter = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var scopeArr, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          //[keyScope], idTransporter
          scopeArr = req.body.scopeArr;
          idTransporter = req.body.idTransporter;
          _context15.next = 4;
          return _TransporterService["default"].CreateScopeOfTransporter(scopeArr, idTransporter);
        case 4:
          message = _context15.sent;
          return _context15.abrupt("return", res.status(200).json(message));
        case 6:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function handleCreateScopeOfTransporter(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
var handleDeleteScopeOfTransporter = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var scopeArr, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          scopeArr = req.body.scopeArr;
          idTransporter = req.body.idTransporter;
          if (!(!idTransporter && !scopeArr)) {
            _context16.next = 4;
            break;
          }
          return _context16.abrupt("return", res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 4:
          _context16.next = 6;
          return _TransporterService["default"].DeleteScopeOfTransporter(scopeArr, idTransporter);
        case 6:
          message = _context16.sent;
          return _context16.abrupt("return", res.status(200).json(message));
        case 8:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function handleDeleteScopeOfTransporter(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

//chi phí nhà vận chuyển
var handleCreateCostOfTransporter = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var keyService, costArr, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          keyService = req.body.keyService;
          costArr = req.body.costArr;
          idTransporter = req.body.idTransporter;
          console.log(keyService, costArr, idTransporter);
          _context17.next = 6;
          return _TransporterService["default"].CreateCostOfTransporter(keyService, costArr, idTransporter);
        case 6:
          message = _context17.sent;
          return _context17.abrupt("return", res.status(200).json(message));
        case 8:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function handleCreateCostOfTransporter(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
var handleGetCostOfTransporterByService = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var keyService, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          keyService = req.query.keyService;
          idTransporter = req.query.idTransporter;
          _context18.prev = 2;
          _context18.next = 5;
          return _TransporterService["default"].GetCostOfTransporterByService(keyService, idTransporter);
        case 5:
          message = _context18.sent;
          return _context18.abrupt("return", res.status(200).json(message));
        case 9:
          _context18.prev = 9;
          _context18.t0 = _context18["catch"](2);
          return _context18.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 12:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[2, 9]]);
  }));
  return function handleGetCostOfTransporterByService(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var handleUpdateCostOfTransporterByService = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var keyService, costArr, idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          keyService = req.body.keyService;
          costArr = req.body.costArr;
          idTransporter = req.body.idTransporter;
          _context19.prev = 3;
          _context19.next = 6;
          return _TransporterService["default"].UpdateCostOfTransporterByService(keyService, costArr, idTransporter);
        case 6:
          message = _context19.sent;
          return _context19.abrupt("return", res.status(200).json(message));
        case 10:
          _context19.prev = 10;
          _context19.t0 = _context19["catch"](3);
          return _context19.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[3, 10]]);
  }));
  return function handleUpdateCostOfTransporterByService(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();

//quản lý tài xế theo nhà vận chuyển
var handleGetAllDriverOfTransporter = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          idTransporter = req.query.idTransporter;
          _context20.prev = 1;
          _context20.next = 4;
          return _TransporterService["default"].GetAllDriverOfTransporter(idTransporter);
        case 4:
          message = _context20.sent;
          return _context20.abrupt("return", res.status(200).json(message));
        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](1);
          return _context20.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[1, 8]]);
  }));
  return function handleGetAllDriverOfTransporter(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();
var handleGetDriverById = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var id, message;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          id = req.query.id;
          _context21.prev = 1;
          _context21.next = 4;
          return _TransporterService["default"].GetDriverById(id);
        case 4:
          message = _context21.sent;
          return _context21.abrupt("return", res.status(200).json(message));
        case 8:
          _context21.prev = 8;
          _context21.t0 = _context21["catch"](1);
          return _context21.abrupt("return", res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 11:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[1, 8]]);
  }));
  return function handleGetDriverById(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
var handleDeleteDriver = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var id, message;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          id = req.body.id;
          if (id) {
            _context22.next = 3;
            break;
          }
          return _context22.abrupt("return", res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
          }));
        case 3:
          _context22.next = 5;
          return _TransporterService["default"].deleteDriver(id);
        case 5:
          message = _context22.sent;
          return _context22.abrupt("return", res.status(200).json(message));
        case 7:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function handleDeleteDriver(_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}();
var handleEditDriver = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var driverEdit, message;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          driverEdit = req.body.driverEdit;
          _context23.next = 3;
          return _TransporterService["default"].editDriver(driverEdit);
        case 3:
          message = _context23.sent;
          return _context23.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context23.stop();
      }
    }, _callee23);
  }));
  return function handleEditDriver(_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}();

//trung gian - lấy tất cả nhà vận chuyển theo trạng thái hoạt động của nhà vận chuyển 
var handleGetAllTransporterByIdTransporter = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var status, message;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          status = req.query.status;
          _context24.next = 3;
          return _TransporterService["default"].getAllTransporterByIdTransporter(status);
        case 3:
          message = _context24.sent;
          return _context24.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return function handleGetAllTransporterByIdTransporter(_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}();

//trung gian - // lấy thông tin nhà vận chuyển theo id nhà vận chuyển 
var handleGetTransporterInfoByIdTransporter = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
    var idTransporter, message;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          idTransporter = req.query.id;
          _context25.next = 3;
          return _TransporterService["default"].getTransporterInfoByIdTransporter(idTransporter);
        case 3:
          message = _context25.sent;
          return _context25.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context25.stop();
      }
    }, _callee25);
  }));
  return function handleGetTransporterInfoByIdTransporter(_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}();

//trung gian - //tìm kiếm nhà vận chuyển theo từ khóa (tên) 
var handleSearchTransporterByName = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res) {
    var keyword, message;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          keyword = req.query.keyword;
          _context26.next = 3;
          return _TransporterService["default"].searchTransporterByName(keyword);
        case 3:
          message = _context26.sent;
          return _context26.abrupt("return", res.status(200).json(message));
        case 5:
        case "end":
          return _context26.stop();
      }
    }, _callee26);
  }));
  return function handleSearchTransporterByName(_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}();
module.exports = {
  handleGetOrdersByService: handleGetOrdersByService,
  handleGetOrderStatusByKey: handleGetOrderStatusByKey,
  handleCreateAccountTransporter: handleCreateAccountTransporter,
  handleGetTransporterByIdUser: handleGetTransporterByIdUser,
  handleGetWeightByVehicle: handleGetWeightByVehicle,
  handleCreateVehicle: handleCreateVehicle,
  handleGetVehicleByIdTransporter: handleGetVehicleByIdTransporter,
  handleDeleteVehicle: handleDeleteVehicle,
  handleEditVehicle: handleEditVehicle,
  handleGetServiceOfTransporter: handleGetServiceOfTransporter,
  handleGetScopeOfTransporter: handleGetScopeOfTransporter,
  handleEditInfoTrans: handleEditInfoTrans,
  handleCreateServiceOfTransporter: handleCreateServiceOfTransporter,
  handleDeleteServiceOfTransporter: handleDeleteServiceOfTransporter,
  handleCreateScopeOfTransporter: handleCreateScopeOfTransporter,
  handleDeleteScopeOfTransporter: handleDeleteScopeOfTransporter,
  handleCreateCostOfTransporter: handleCreateCostOfTransporter,
  handleGetCostOfTransporterByService: handleGetCostOfTransporterByService,
  handleUpdateCostOfTransporterByService: handleUpdateCostOfTransporterByService,
  handleGetAllDriverOfTransporter: handleGetAllDriverOfTransporter,
  handleDeleteDriver: handleDeleteDriver,
  handleEditDriver: handleEditDriver,
  handleGetAllTransporterByIdTransporter: handleGetAllTransporterByIdTransporter,
  handleGetDriverById: handleGetDriverById,
  handleGetTransporterInfoByIdTransporter: handleGetTransporterInfoByIdTransporter,
  handleSearchTransporterByName: handleSearchTransporterByName
};