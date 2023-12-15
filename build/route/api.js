"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _customerController = _interopRequireDefault(require("../controller/customerController"));
var _TransporterController = _interopRequireDefault(require("../controller/TransporterController"));
var _costController = _interopRequireDefault(require("../controller/costController"));
var _allCodeController = _interopRequireDefault(require("../controller/allCodeController"));
var _locationController = _interopRequireDefault(require("../controller/locationController"));
var _orderController = _interopRequireDefault(require("../controller/orderController"));
var _goodsController = _interopRequireDefault(require("../controller/goodsController"));
var _typeOfGoodsController = _interopRequireDefault(require("../controller/typeOfGoodsController"));
var _payment = _interopRequireDefault(require("./payment"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import APIController from "../controller/APIController";

var appRoot = require('app-root-path');
var router = _express["default"].Router();

// middleware multer -  xử lý upload ảnh
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, appRoot + '/src/public/image/');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname));
  }
});
var imageFilter = function imageFilter(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: imageFilter
});
var initAPIRoute = function initAPIRoute(app) {
  //user
  router.post("/create-new-user", _userController["default"].handleCreateNewUser); //tạo mới người dùng
  router.get("/get-all-users", _userController["default"].handleGetAllUsers); //lấy tất cả người dùng / lấy người dùng theo id
  router.post("/login", _userController["default"].handleLogin); //đăng nhập
  router.put("/edit-user", _userController["default"].handleEditUser); // chỉnh sửa thông tin người dùng
  router["delete"]("/delete-user", _userController["default"].handleDeleteUser); // xóa người dùng theo id

  //customer
  router.post("/customer-create-order", _customerController["default"].handleCreateNewOrderByCustomer);

  // transporter
  router.get("/transporter-get-order-by-status", _TransporterController["default"].handleGetOrdersByService); // lấy đơn hàng theo trạng thái
  router.get('/transporter-get-order-status-by-key', _TransporterController["default"].handleGetOrderStatusByKey); //lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
  router.post('/transporter-create-account', _TransporterController["default"].handleCreateAccountTransporter); //tạo tài khoản transporter
  router.get('/transporter-get-transporter-by-id-user', _TransporterController["default"].handleGetTransporterByIdUser); //lấy TT transporter dựa vào id.user
  router.get('/transporter-get-weight-by-vehicle', _TransporterController["default"].handleGetWeightByVehicle); //lấy weight by vehicle

  router.post('/transporter-create-vehicle', _TransporterController["default"].handleCreateVehicle); //tạo phương tiện
  router.get('/transporter-get-vehicle-by-idTransporter', _TransporterController["default"].handleGetVehicleByIdTransporter); //lấy phương tiện theo idTransporter
  router["delete"]("/transporter-delete-vehicle", _TransporterController["default"].handleDeleteVehicle); // xóa phương tiện theo id
  router.put("/transporter-edit-vehicle", _TransporterController["default"].handleEditVehicle); // chỉnh sửa thông tin phương tiện

  router.get("/transporter-get-service-of-transporter", _TransporterController["default"].handleGetServiceOfTransporter); // lấy dịch vụ của nhà vận chuyển
  router.post("/transporter-create-service-of-transporter", _TransporterController["default"].handleCreateServiceOfTransporter); // tạo dịch vụ cho nhà vận chuyển
  router["delete"]("/transporter-delete-service-of-transporter", _TransporterController["default"].handleDeleteServiceOfTransporter); // xóa dịch vụ của nhà vận chuyển

  router.get("/transporter-get-scope-of-transporter", _TransporterController["default"].handleGetScopeOfTransporter); // lấy phạm vi của nhà vận chuyển
  router.post("/transporter-create-scope-of-transporter", _TransporterController["default"].handleCreateScopeOfTransporter); // tạo phạm vi cho nhà vận chuyển
  router["delete"]("/transporter-delete-scope-of-transporter", _TransporterController["default"].handleDeleteScopeOfTransporter); // xóa phạm vi của nhà vận chuyển

  router.put("/transporter-edit-info-transporter", _TransporterController["default"].handleEditInfoTrans); // chỉnh sửa thông tin nvc

  router.post('/create-cost-of-transporter', _TransporterController["default"].handleCreateCostOfTransporter); //tạo chi phí cho nhà vận chuyển
  router.get('/get-cost-of-transporter-by-service', _TransporterController["default"].handleGetCostOfTransporterByService); //lấy chi phí của nhà vận chuyển theo keyService
  router.put('/update-cost-of-transporter-by-service', _TransporterController["default"].handleUpdateCostOfTransporterByService); //lấy chi phí của nhà vận chuyển theo keyService
  router.get("/get-all-transporter-by-id-transporter", _TransporterController["default"].handleGetAllTransporterByIdTransporter); // lấy tất cả nhà vận chuyển theo trạng thái hoạt động của nhà vận chuyển
  router.get("/get-transporter-info-by-id-transporter", _TransporterController["default"].handleGetTransporterInfoByIdTransporter); // lấy thông tin nhà vận chuyển theo id nhà vận chuyển

  router.get('/get-all-driver-of-transporter', _TransporterController["default"].handleGetAllDriverOfTransporter); //Lấy tất cả tài xế theo idTransporter
  router.get('/get-driver-by-id', _TransporterController["default"].handleGetDriverById); //Lấy chi tiết tài xế theo id
  router["delete"]("/transporter-delete-driver", _TransporterController["default"].handleDeleteDriver); // xóa tài xế theo id
  router.put("/transporter-edit-driver", _TransporterController["default"].handleEditDriver); // chỉnh sửa thông tin tài xế
  router.get('/search-transporter-by-name', _TransporterController["default"].handleSearchTransporterByName); //tìm kiếm nhà vận chuyển theo từ khóa (tên)

  // cost 
  router.get('/get-cost-code', _costController["default"].handleGetCostCode);

  // allcode 
  router.get('/get-all-code', _allCodeController["default"].handleGetAllCode); // lấy thông tin AllCode theo 'type'
  router.get('/get-all-code-by-key', _allCodeController["default"].handleGetAllCodeByKey); // lấy thông tin AllCode theo 'key'

  //upload image
  router.get('/upload', function (req, res) {
    res.render('uploadFile.ejs');
  });

  // delete image
  router["delete"]("/delete-file", _userController["default"].removeFile);
  router.post('/upload-profile-pic', upload.single('profile_pic'), _userController["default"].handleUploadFile);

  //thêm tọa độ người dùng vào bảng LocationUser
  router.post("/create-new-location", _locationController["default"].handleCreateNewLocation); //tạo mới người dùng
  router.get("/get-all-user-location", _locationController["default"].handleGetAllUserLocation); //lấy tất cả tọa độ theo người dùng trong data 
  router["delete"]("/delete-user-location", _locationController["default"].handleDeleteUserLocation); // xóa tọa độ người dùng theo id

  // order
  router.post("/create-new-order", _orderController["default"].handleCreateNewOrder); // tạo mới đơn hàng người dùng 
  router.get("/get-all-order-info", _orderController["default"].handleGetAllOrderInfo); //lấy tất cả thông tin đơn hàng theo id đơn hàng
  router.get("/get-all-order-by-id-customer", _orderController["default"].handleGetAllOrderByIdCustomer); //lấy tất cả đơn hàng theo id của khách hàng
  router.put("/update-key-order-status", _orderController["default"].handleUpdateKeyOrderStatus); // cập nhật trạng thái đơn hàng theo id đơn hàng
  router.put("/update-order-payment-status", _orderController["default"].handleUpdateOrderPaymentStatus); // cập nhật trạng thái thanh toán của đơn hàng
  router.post("/create-driver-for-order", _orderController["default"].handleCreateDriverForOrder); // Thêm tài xế cho đơn hàng
  router.post("/create-vehicle-for-order", _orderController["default"].handleCreateVehicleForOrder); // Thêm phương tiện cho đơn hàng
  router.post("/create-transportation-order", _orderController["default"].handleCreateTransportationOrder); // Tạo transportation cho đơn hàng theo id

  // goods
  router.post("/create-new-goods", _goodsController["default"].handleCreateNewGoods); // tạo mới sản phẩm trong đơn hàng

  // typeOfGoods
  router.post("/create-new-type-of-goods", _typeOfGoodsController["default"].handleCreateNewTypeOfGoods); // tạo mới tính chất hàng hóa trong đơn hàng

  // chức năng thanh toán
  router.post('/create-payment', _payment["default"].handleCreateNewPayment);
  router.get('/vnpay_return', _payment["default"].handleGetReturn);

  //test api
  router.get('/get-payment-result', function (req, res) {
    res.render('payment_result.ejs');
  });
  return app.use('/api/', router);
};
var _default = initAPIRoute;
exports["default"] = _default;