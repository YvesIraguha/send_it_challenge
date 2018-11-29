"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jwtSimple = _interopRequireDefault(require("jwt-simple"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeToken = function encodeToken(payload) {
  var token = _jwtSimple.default.encode(payload, "secret");

  return token;
};

var decodedToken = function decodedToken(token) {
  var decoded = _jwtSimple.default.decode(token, "secret");

  return decoded;
}; // Access token required for a user


var accessTokenRequired = function accessTokenRequired(req, res, next) {
  var token = req.headers.token;

  if (token) {
    req.body.userId = decodedToken(token).userId;
    next();
  } else {
    res.status(400).send({
      message: 'Not authorized to this page'
    });
  }
};

var _default = {
  accessTokenRequired: accessTokenRequired,
  encodeToken: encodeToken
};
exports.default = _default;