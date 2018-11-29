"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeToken = function encodeToken(payload) {
  var token = _jwtSimple2.default.encode(payload, "secret");
  return token;
};

var decodedToken = function decodedToken(token) {
  var decoded = _jwtSimple2.default.decode(token, "secret");
  return decoded;
};
// Access token required for a user
var accessTokenRequired = function accessTokenRequired(req, res, next) {
  var token = req.headers.token;

  if (token) {
    req.body.userId = decodedToken(token).userId;
    req.body.userType = decodedToken(token).userType;
    next();
  } else {
    res.status(400).send({ message: 'Not authorized to this page' });
  }
};

var adminTokenRequired = function adminTokenRequired(req, res, next) {
  var token = req.headers.token;

  req.body.userId = decodedToken(token).userId;
  req.body.userType = decodedToken(token).userType;

  if (req.body.userType === 'Admin') {
    next();
  } else {
    res.status(403).send({ message: 'Not authorized to this page' });
  }
};
exports.default = { accessTokenRequired: accessTokenRequired, encodeToken: encodeToken, adminTokenRequired: adminTokenRequired };