import express from "express";
// import APIController from "../controller/APIController";
import userController from "../controller/userController"

let router = express.Router();

const initAPIRoute = (app) => {

    router.post('/create-new-user', userController.handleCreateNewUser) //tạo mới người dùng
    router.get('/get-all-users', userController.handleGetAllUsers) //lấy tất cả người dùng / lấy người dùng theo id
    router.post('/login', userController.handleLogin) //đăng nhập
    router.put('/edit-user', userController.handleEditUser) // chỉnh sửa thông tin người dùng
    router.delete('/delete-user', userController.handleDeleteUser) // xóa người dùng theo id

    router.post('/test', (req, res) => {
        res.send('test api');
    })

    return app.use('/api/', router)
}

export default initAPIRoute;