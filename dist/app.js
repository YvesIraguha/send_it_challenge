"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _parcels = _interopRequireDefault(require("./routes/parcels"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // instantiate the app;


var app = (0, _express.default)(); // set the middle ware to use for body parsing

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
})); // set the router to use.

app.use('/api/v1', _parcels.default);
app.use('/api/v1/auth', _users.default);
app.get('/', function (req, res) {
  res.redirect('/api/v1/parcels');
}); // Set the port for listening on.

var port = process.env.PORT;
app.listen(port); // export the app for testing

var _default = app;
exports.default = _default;