import db from "../models/index";
import pool from "../config/connectDB";
import mysql from "mysql2/promise";
import multer from "multer";
import CRUDService from '../service/CRUDService'
// mysql2
// let getHomePage = async (req, res) => {
//     let [rows, fields] = await pool.execute('SELECT * FROM `users`');

//     return res.render('index.ejs', {
//         dataUser: rows,
//     });
// };

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('index.ejs', {
            dataUser: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error)
    }
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    return res.send('hello post crud')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataUser: data,
    })
}

let getEditCRUD = async (req, res) => {
    let idUser = req.query.id;
    if (idUser) {
        let userData = await CRUDService.getUserInfoById(idUser);

        return res.render('editCRUD.ejs', {
            dataUser: userData,
        })
    }
    return res.send('not found user')
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataUser: allUsers,
    })
}

let deleteCRUD = async (req, res) => {
    let idUserDelete = req.query.id
    let allUsers = await CRUDService.deleteUserData(idUserDelete)
    return res.render('displayCRUD.ejs', {
        dataUser: allUsers,
    })
}

// let getDetailPage = async (req, res) => {
//     let userId = req.params.userId;
//     console.log(">>> check userID: ", userId);
//     let [rows] = await pool.execute('SELECT * FROM `users` where `id` = ?', [userId]);
//     return res.send(JSON.stringify(rows));
// };

// let createNewUser = async (req, res) => {
//     let { firstName, lastName, email } = req.body;
//     await pool.execute('insert into `users`(firstName, lastName, email) values(?, ?, ?)', [firstName, lastName, email]);
//     return res.redirect('/');
// };

// let deleteUser = async (req, res) => {
//     let userId = req.body.userId;
//     await pool.execute('delete from users where id= ?', [userId]);
//     return res.redirect('/');
// };

// let getEditPage = async (req, res) => {
//     let userId = req.params.userId;
//     let [user] = await pool.execute('select * from users where id= ?', [userId]);
//     return res.render('update.ejs', { dataUser: user[0], });
// };

// let postUpdateUser = async (req, res) => {
//     let { firstName, lastName, email, userId } = req.body;
//     await pool.execute('update users set firstName= ?, lastName= ?, email= ? where id= ?',
//         [firstName, lastName, email, userId]);
//     return res.redirect('/');
// };

// let getUploadFilePage = async (req, res) => {
//     return res.render('uploadFile.ejs');
// };

// let handleUploadFile = async (req, res) => {

//     upload(req, res, function (err) {
//         console.log(req.file);
//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return res.send('Please select an image to upload');
//         }
//         else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }
//         else if (err) {
//             return res.send(err);
//         }

//         res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
//     });
// }

// let handleUploadMultipleFiles = async (req, res) => {

//     if (req.fileValidationError) {
//         return res.send(req.fileValidationError);
//     }
//     else if (!req.files) {
//         return res.send('Please select an image to upload');
//     }

//     let result = "You have uploaded these images: <hr />";
//     const files = req.files;
//     let index, len;

//     console.log(files);
//     for (index = 0, len = files.length; index < len; ++index) {
//         result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
//     }
//     result += '<hr/><a href="/upload">Upload more images</a>';
//     res.send(result);
// };

module.exports = {
    getHomePage,
    // getDetailPage,
    // createNewUser,
    // deleteUser,
    // getEditPage,
    // postUpdateUser,
    // getUploadFilePage,
    // handleUploadFile,
    // handleUploadMultipleFiles,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
};
