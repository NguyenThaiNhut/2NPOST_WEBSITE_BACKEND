import express from "express";
// import APIController from "../controller/APIController";
import userController from "../controller/userController";
import customerController from "../controller/customerController";
import TransporterController from '../controller/TransporterController';
import costController from '../controller/costController';
import allCodeController from '../controller/allCodeController';
import locationController from '../controller/locationController';
import orderController from '../controller/orderController';
import goodsController from '../controller/goodsController';
import typeOfGoodsController from '../controller/typeOfGoodsController';
import payment from "./payment";

import multer from "multer";
import path from "path";
var appRoot = require('app-root-path');

let router = express.Router();

// middleware multer -  xử lý upload ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + '/src/public/image/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter })

const initAPIRoute = (app) => {
  //user
  router.post("/create-new-user", userController.handleCreateNewUser); //tạo mới người dùng
  router.get("/get-all-users", userController.handleGetAllUsers); //lấy tất cả người dùng / lấy người dùng theo id
  router.post("/login", userController.handleLogin); //đăng nhập
  router.put("/edit-user", userController.handleEditUser); // chỉnh sửa thông tin người dùng
  router.delete("/delete-user", userController.handleDeleteUser); // xóa người dùng theo id

  //customer
  router.post("/customer-create-order",
    customerController.handleCreateNewOrderByCustomer
  );

  // transporter
  router.get("/transporter-get-order-by-status",
    TransporterController.handleGetOrdersByService); // lấy đơn hàng theo trạng thái
  router.get('/transporter-get-order-status-by-key',
    TransporterController.handleGetOrderStatusByKey);//lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
  router.post('/transporter-create-account',
    TransporterController.handleCreateAccountTransporter); //tạo tài khoản transporter
  router.get('/transporter-get-transporter-by-id-user',
    TransporterController.handleGetTransporterByIdUser); //lấy TT transporter dựa vào id.user
  router.get('/transporter-get-weight-by-vehicle',
    TransporterController.handleGetWeightByVehicle); //lấy weight by vehicle

  router.post('/transporter-create-vehicle',
    TransporterController.handleCreateVehicle); //tạo phương tiện
  router.get('/transporter-get-vehicle-by-idTransporter',
    TransporterController.handleGetVehicleByIdTransporter); //lấy phương tiện theo idTransporter
  router.delete("/transporter-delete-vehicle",
    TransporterController.handleDeleteVehicle); // xóa phương tiện theo id
  router.put("/transporter-edit-vehicle",
    TransporterController.handleEditVehicle); // chỉnh sửa thông tin phương tiện

  router.get("/transporter-get-service-of-transporter",
    TransporterController.handleGetServiceOfTransporter); // lấy dịch vụ của nhà vận chuyển
  router.post("/transporter-create-service-of-transporter",
    TransporterController.handleCreateServiceOfTransporter); // tạo dịch vụ cho nhà vận chuyển
  router.delete("/transporter-delete-service-of-transporter",
    TransporterController.handleDeleteServiceOfTransporter); // xóa dịch vụ của nhà vận chuyển

  router.get("/transporter-get-scope-of-transporter",
    TransporterController.handleGetScopeOfTransporter); // lấy phạm vi của nhà vận chuyển
  router.post("/transporter-create-scope-of-transporter",
    TransporterController.handleCreateScopeOfTransporter); // tạo phạm vi cho nhà vận chuyển
  router.delete("/transporter-delete-scope-of-transporter",
    TransporterController.handleDeleteScopeOfTransporter); // xóa phạm vi của nhà vận chuyển

  router.put("/transporter-edit-info-transporter",
    TransporterController.handleEditInfoTrans); // chỉnh sửa thông tin nvc

  router.post('/create-cost-of-transporter',
    TransporterController.handleCreateCostOfTransporter); //tạo chi phí cho nhà vận chuyển
  router.get('/get-cost-of-transporter-by-service',
    TransporterController.handleGetCostOfTransporterByService); //lấy chi phí của nhà vận chuyển theo keyService
  router.put('/update-cost-of-transporter-by-service',
    TransporterController.handleUpdateCostOfTransporterByService); //lấy chi phí của nhà vận chuyển theo keyService
  router.get("/get-all-transporter-by-id-transporter",
    TransporterController.handleGetAllTransporterByIdTransporter); // lấy tất cả nhà vận chuyển theo trạng thái hoạt động của nhà vận chuyển
  router.get("/get-transporter-info-by-id-transporter",
    TransporterController.handleGetTransporterInfoByIdTransporter); // lấy thông tin nhà vận chuyển theo id nhà vận chuyển

  router.get('/get-all-driver-of-transporter',
    TransporterController.handleGetAllDriverOfTransporter); //Lấy tất cả tài xế theo idTransporter
  router.get('/get-driver-by-id',
    TransporterController.handleGetDriverById); //Lấy chi tiết tài xế theo id
  router.delete("/transporter-delete-driver",
    TransporterController.handleDeleteDriver); // xóa tài xế theo id
  router.put("/transporter-edit-driver",
    TransporterController.handleEditDriver); // chỉnh sửa thông tin tài xế
  router.get('/search-transporter-by-name',
    TransporterController.handleSearchTransporterByName); //tìm kiếm nhà vận chuyển theo từ khóa (tên)


  // cost 
  router.get('/get-cost-code', costController.handleGetCostCode);

  // allcode 
  router.get('/get-all-code', allCodeController.handleGetAllCode);// lấy thông tin AllCode theo 'type'
  router.get('/get-all-code-by-key', allCodeController.handleGetAllCodeByKey);// lấy thông tin AllCode theo 'key'

  //upload image
  router.get('/upload', (req, res) => {
    res.render('uploadFile.ejs');
  });

  // delete image
  router.delete("/delete-file", userController.removeFile);

  router.post('/upload-profile-pic', upload.single('profile_pic'), userController.handleUploadFile);

  //thêm tọa độ người dùng vào bảng LocationUser
  router.post("/create-new-location", locationController.handleCreateNewLocation); //tạo mới người dùng
  router.get("/get-all-user-location", locationController.handleGetAllUserLocation); //lấy tất cả tọa độ theo người dùng trong data 
  router.delete("/delete-user-location", locationController.handleDeleteUserLocation); // xóa tọa độ người dùng theo id

  // order
  router.post("/create-new-order", orderController.handleCreateNewOrder); // tạo mới đơn hàng người dùng 
  router.get("/get-all-order-info", orderController.handleGetAllOrderInfo); //lấy tất cả thông tin đơn hàng theo id đơn hàng
  router.get("/get-all-order-by-id-customer", orderController.handleGetAllOrderByIdCustomer); //lấy tất cả đơn hàng theo id của khách hàng
  router.put("/update-key-order-status", orderController.handleUpdateKeyOrderStatus); // cập nhật trạng thái đơn hàng theo id đơn hàng
  router.put("/update-order-payment-status", orderController.handleUpdateOrderPaymentStatus); // cập nhật trạng thái thanh toán của đơn hàng
  router.post("/create-driver-for-order", orderController.handleCreateDriverForOrder); // Thêm tài xế cho đơn hàng
  router.post("/create-vehicle-for-order", orderController.handleCreateVehicleForOrder); // Thêm phương tiện cho đơn hàng
  router.post("/create-transportation-order", orderController.handleCreateTransportationOrder); // Tạo transportation cho đơn hàng theo id


  // goods
  router.post("/create-new-goods", goodsController.handleCreateNewGoods); // tạo mới sản phẩm trong đơn hàng

  // typeOfGoods
  router.post("/create-new-type-of-goods", typeOfGoodsController.handleCreateNewTypeOfGoods); // tạo mới tính chất hàng hóa trong đơn hàng


  // chức năng thanh toán
  router.post('/create-payment', payment.handleCreateNewPayment);
  router.get('/vnpay_return', payment.handleGetReturn);
  return app.use('/api/', router);
}

export default initAPIRoute;
