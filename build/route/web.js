"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controller/homeController"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var appRoot = require('app-root-path');
var router = _express["default"].Router();
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    // console.log('>>> check app root: ', appRoot);
    cb(null, appRoot + '/src/public/image/');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname));
  }
});
var imageFilter = function imageFilter(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: imageFilter
});
var upload1 = (0, _multer["default"])({
  storage: storage,
  fileFilter: imageFilter
}).array('multiple_images', 3);
var initWebRoute = function initWebRoute(app) {
  router.get('/', _homeController["default"].getHomePage);
  // router.get('/detail/user/:userId', homeController.getDetailPage);
  // router.post('/create-new-user', homeController.createNewUser);
  // router.post('/delete-user', homeController.deleteUser);
  // router.get('/edit-user/:userId', homeController.getEditPage);
  // router.post('/update-user', homeController.postUpdateUser);

  // router.get('/upload', homeController.getUploadFilePage);
  // router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile);
  // router.post('/upload-multiple-images', (req, res, next) => {
  //     upload1(req, res, (err) => {
  //         if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
  //             // handle multer file limit error here
  //             res.send('LIMIT_UNEXPECTED_FILE')
  //         } else if (err) {
  //             res.send(err)
  //         }

  //         else {
  //             // make sure to call next() if all was well
  //             next();
  //         }
  //     })
  // }, homeController.handleUploadMultipleFiles)
  // router.get('/crud', _homeController["default"].getCRUD);
  // router.post('/post-crud', _homeController["default"].postCRUD);
  // router.get('/display-get-crud', _homeController["default"].displayGetCRUD);
  // router.get('/edit-crud', _homeController["default"].getEditCRUD);
  // router.post('/put-crud', _homeController["default"].putCRUD);
  // router.get('/delete-crud', _homeController["default"].deleteCRUD);
  return app.use('/', router);
};
var _default = initWebRoute;
exports["default"] = _default;