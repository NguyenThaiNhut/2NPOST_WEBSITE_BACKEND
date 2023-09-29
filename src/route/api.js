import express from "express";
// import APIController from "../controller/APIController";
import userController from "../controller/userController";
import customerController from "../controller/customerController";
import TransporterController from '../controller/TransporterController';
import costController from '../controller/costController';
import allCodeController from '../controller/allCodeController';

let router = express.Router();

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

  // cost 
  router.get('/get-cost-code', costController.handleGetCostCode)

  // allcode 
  router.post('/get-all-code', allCodeController.handleGetAllCode)// lấy thông tin AllCode theo 'type' 

  return app.use('/api/', router)
}

export default initAPIRoute;
