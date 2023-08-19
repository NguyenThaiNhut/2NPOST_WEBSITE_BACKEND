import userService from '../service/userSevice'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // check email hoac pass rong?
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }

    // check email ton tai? // check pass hop le?
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    })
}

let handleGetAllUsers = async (req, res) => {
    let idUser = req.query.id; //all , id
    let users = await userService.getAllUsers(idUser);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users: users
    })
}

let handleCreateNewUser = async (req, res) => {
    let userInput = req.body;
    let message = await userService.createNewUser(userInput);

    return res.status(200).json(message)
}

// code sau //
let handleEditUser = async (req, res) => {
    let user = req.body;
    let message = await userService.updateUser(user);

    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    console.log(id)
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter!'
        })
    }

    let message = await userService.deleteUser(id);

    return res.status(200).json(message)
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
}