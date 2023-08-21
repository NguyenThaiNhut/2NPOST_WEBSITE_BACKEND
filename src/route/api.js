import express from "express";
// import APIController from "../controller/APIController";
import userController from "../controller/userController"

let router = express.Router();

const initAPIRoute = (app) => {

    router.post('/create-new-user', userController.handleCreateNewUser)
    router.get('/get-all-users', userController.handleGetAllUsers)

    router.post('/login', userController.handleLogin)


    router.put('/edit-user', userController.handleEditUser)
    router.delete('/delete-user', userController.handleDeleteUser)

    return app.use('/api/', router)
}

export default initAPIRoute;