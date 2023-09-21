import express from "express";
// import APIController from "../controller/APIController";
import userController from "../controller/userController";
import customerController from "../controller/customerController";
import TransporterController from '../controller/TransporterController';

let router = express.Router();

const initAPIRoute = (app) => {

    //user
    router.post('/create-new-user', userController.handleCreateNewUser) //tạo mới người dùng
    router.get('/get-all-users', userController.handleGetAllUsers) //lấy tất cả người dùng / lấy người dùng theo id
    router.post('/login', userController.handleLogin) //đăng nhập
    router.put('/edit-user', userController.handleEditUser) // chỉnh sửa thông tin người dùng
    router.delete('/delete-user', userController.handleDeleteUser) // xóa người dùng theo id

    //customer
    router.post('/customer-create-order',
        customerController.handleCreateNewOrderByCustomer)  // tạo đơn hàng

    // transporter
    router.get('/transporter-get-order-by-status',
        TransporterController.handleGetOrdersByService) // lấy đơn hàng theo trạng thái
    router.get('/transporter-get-order-status-by-key',
        TransporterController.handleGetOrderStatusByKey)//lấy trạng thái đơn hàng theo Key

    // return app.use('/api/',
    //     router)
}

export default initAPIRoute;