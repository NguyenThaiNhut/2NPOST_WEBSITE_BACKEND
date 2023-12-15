"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./route/web"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _api = _interopRequireDefault(require("./route/api"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import connection from './config/connectDB'

require('dotenv').config();
var app = (0, _express["default"])();

// app.use(cors({ origin: true }));
app.use((0, _cors["default"])({
  credentials: true,
  origin: true
}));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
// console.log(port);

// app.use(morgan('combined'));

app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); // To parse the incoming requests with JSON payloads

(0, _viewEngine["default"])(app);

// initWebRoute(app);

//viet api
(0, _api["default"])(app);
(0, _connectDB["default"])();

// handle 404 not found
app.use(function (req, res) {
  return res.render('404.ejs');
});
var port = process.env.PORT || 6969;
app.listen(port, function () {
  console.log("Example app listening on port http://localhost:".concat(port));
});