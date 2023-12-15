"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var appRoot = require('app-root-path');
var router = _express["default"].Router();
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
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
// let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3)

var initWebRoute = function initWebRoute(app) {
  router.get('/upload', function (req, res) {
    res.render('uploadFile.ejs');
  });
  router.post('/upload-profile-pic', upload.single('profile_pic'), _userController["default"].handleUploadFile);
  return app.use('/', router);
};
var _default = initWebRoute;
exports["default"] = _default;