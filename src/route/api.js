import express from "express";
// import APIController from "../controller/APIController";
import userController from "../controller/userController";
import customerController from "../controller/customerController";
import TransporterController from '../controller/TransporterController';
import costController from '../controller/costController';
import allCodeController from '../controller/allCodeController';

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
    TransporterController.handleGetOrderStatusByKey)//lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
  router.post('/transporter-create-account',
    TransporterController.handleCreateAccountTransporter) //tạo tài khoản transporter
  router.get('/transporter-get-transporter-by-id-user',
    TransporterController.handleGetTransporterByIdUser) //lấy TT transporter dựa vào id.user
  router.get('/transporter-get-weight-by-vehicle',
    TransporterController.handleGetWeightByVehicle) //lấy weight by vehicle
  router.post('/transporter-create-vehicle',
    TransporterController.handleCreateVehicle) //tạo phương tiện
  router.get('/transporter-get-vehicle-by-idTransporter',
    TransporterController.handleGetVehicleByIdTransporter) //lấy phương tiện theo idTransporter
  router.delete("/transporter-delete-vehicle",
    TransporterController.handleDeleteVehicle); // xóa phương tiện theo id
  router.put("/transporter-edit-vehicle",
    TransporterController.handleEditVehicle); // chỉnh sửa thông tin phương tiện

  // cost 
  router.get('/get-cost-code', costController.handleGetCostCode)

  // allcode 
  router.get('/get-all-code', allCodeController.handleGetAllCode)// lấy thông tin AllCode theo 'type' 

  //upload image
  router.get('/upload', (req, res) => {
    res.render('uploadFile.ejs');
  });

  // delete image
  router.delete("/delete-file", userController.removeFile);

  router.post('/upload-profile-pic', upload.single('profile_pic'), userController.handleUploadFile);

  return app.use('/api/', router)
}

export default initAPIRoute;
