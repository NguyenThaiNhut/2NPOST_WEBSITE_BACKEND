"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import APIController from "../controller/APIController";

var router = _express["default"].Router();
var initAPIRoute = function initAPIRoute(app) {
  router.post('/create-new-user', _userController["default"].handleCreateNewUser); //tạo mới người dùng
  router.get('/get-all-users', _userController["default"].handleGetAllUsers); //lấy tất cả người dùng / lấy người dùng theo id
  router.post('/login', _userController["default"].handleLogin); //đăng nhập
  router.put('/edit-user', _userController["default"].handleEditUser); // chỉnh sửa thông tin người dùng
  router["delete"]('/delete-user', _userController["default"].handleDeleteUser); // xóa người dùng theo id

  router.post('/test', function (req, res) {
    res.send('test api');
  });
  return app.use('/api/', router);
};
var _default = initAPIRoute;
exports["default"] = _default;