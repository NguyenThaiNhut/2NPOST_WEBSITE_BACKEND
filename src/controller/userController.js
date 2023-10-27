import multer from "multer";
import userService from '../service/userSevice'

//tạo mới người dùng 
let handleCreateNewUser = async (req, res) => {
    let userInput = req.body;

    let message = await userService.createNewUser(userInput);
    return res.status(200).json(message)
}

// đăng nhập
let handleLogin = async (req, res) => {
    let phone = req.body.phone;
    let password = req.body.password;
    let keyRole = req.body.keyRole;
    console.log(req.body);

    // check email hoac pass rong?
    if (!phone || !password || !keyRole) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }

    // check email ton tai? // check pass hop le?
    let message = await userService.handleUserLogin(phone, password, keyRole);

    return res.status(200).json(message)
}

// lấy tất cả người dùng
let handleGetAllUsers = async (req, res) => {
    let idUser = req.query.id; //all , id
    let users = await userService.getAllUsers(idUser);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users: users
    })
}

// chỉnh sửa thông tin người dùng
let handleEditUser = async (req, res) => {
    let user = req.body;

    let message = await userService.updateUser(user);

    return res.status(200).json(message)
}

// xóa người dùng theo id
let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }

    let message = await userService.deleteUser(id);

    return res.status(200).json(message)
}

let upload = multer().single('profile_pic');

// lưu ảnh vào thư mục public/image
let handleUploadFile = async (req, res) => {
    upload(req, res, function (err) {
        let maxSize = 3000000; // 3 MB
        console.log(req.file);
        if (req.fileValidationError) {
            return res.status(200).json({
                errCode: 1,
                message: `${req.fileValidationError}!!!`,
            })
        }
        else if (!req.file) {
            return res.status(200).json({
                errCode: 2,
                message: `Vui lòng chọn ảnh để upload!!!`,
            })
        }
        else if (err instanceof multer.MulterError) {
            return res.status(200).json({
                errCode: 3,
                message: `${err}!!!`,
            })
        }
        else if (req.file.size > maxSize) {
            return res.status(200).json({
                errCode: 4,
                message: `Ảnh không quá 3MB!!!!!!`,
            })
        }
        else if (err) {
            return res.status(200).json({
                errCode: 5,
                message: `${err}`,
            })
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Upload ảnh thành công!',
            urlImage: `/image/${req.file.filename}`,
        })

        // res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/api/upload">Upload another image</a>`);
    });
}

// xóa file
const removeFile = async (req, res) => {
    const fileName = req.query.name;
    if (!fileName) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }

    let message = await userService.removeFileService(fileName);

    return res.status(200).json(message)
}
module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    handleUploadFile,
    removeFile
}