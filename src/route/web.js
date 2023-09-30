
import express from "express";
import userController from "../controller/userController";
import multer from "multer";
import path from "path";
var appRoot = require('app-root-path');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('>>> check app root: ', appRoot);
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
// let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3)

const initWebRoute = (app) => {

    router.get('/upload', (req, res) => {
        res.render('uploadFile.ejs');
    });

    router.post('/upload-profile-pic', upload.single('profile_pic'), userController.handleUploadFile);
    return app.use('/', router)
}

export default initWebRoute;