import express from "express";
// import APIController from "../controller/APIController";
import userController from "../controller/userController"

let router = express.Router();

const initAPIRoute = (app) => {
    // router.get('/users', APIController.getAllUsers); //method GET => READ data
    // router.post('/create-user', APIController.createNewUser); //method POST => CREATE data
    // router.put('/update-user', APIController.updateUser); //method PUT => UPDATE data
    // router.delete('/delete-user/:userId', APIController.deleteUser); //method DEKETE => DELETE data

    router.post('/login', userController.handleLogin)
    router.get('/get-all-users', userController.handleGetAllUsers)
    router.post('/create-new-user', userController.handleCreateNewUser)
    router.put('/edit-user', userController.handleEditUser)
    router.delete('/delete-user', userController.handleDeleteUser)

    return app.use('/api/', router)
}

export default initAPIRoute;