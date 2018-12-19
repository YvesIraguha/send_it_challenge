'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _parcels = require('./routes/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _staticFilesRoutes = require('./routes/staticFilesRoutes');

var _staticFilesRoutes2 = _interopRequireDefault(_staticFilesRoutes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// instantiate the app;
var app = (0, _express2.default)();
// set the middle ware to use for body parsing

//Set the static directory to use 
app.use(_express2.default.static(_path2.default.join(__dirname, "../UI")));

//set the middlewares 
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
// set the router to use.
app.use('/api/v1', _parcels2.default);
app.use('/api/v1/users', _users2.default);
app.use('/pages', _staticFilesRoutes2.default);
app.get('/', function (req, res) {
  res.redirect('https://documenter.getpostman.com/view/6026755/RzfdpVau');
});
app.get('*', function (req, res) {
  res.status(404).send({ message: "Page requested not found" });
});
// Set the port for listening on.
var port = process.env.PORT || 3000;
app.listen(port);

// export the app for testing
exports.default = app;