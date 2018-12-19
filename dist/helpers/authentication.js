'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeToken = function encodeToken(user) {
  var payload = {
    expiration: (0, _moment2.default)().add(10, 'weeks').unix(),
    iat: (0, _moment2.default)().unix(),
    sub: user
  };
  var token = _jwtSimple2.default.encode(payload, "secret");
  return token;
};

var decodeToken = function decodeToken(token) {
  var decoded = _jwtSimple2.default.decode(token, "secret");
  return decoded;
};
// Access token required for a user
var accessTokenRequired = function accessTokenRequired(req, res, next) {
  var token = req.headers.token;

  if (token === undefined || token === null) {
    res.status(400).send({ error: 'Not authorized to this page' });
  } else {
    var now = (0, _moment2.default)().unix();
    var decodedToken = decodeToken(token);
    if (now > decodedToken.expiration) {
      res.status(400).send({ error: "Token expired" });
    } else {
      req.body.userId = decodedToken.sub.userId;
      req.body.userType = decodedToken.sub.userType;
      next();
    }
  }
};

var adminTokenRequired = function adminTokenRequired(req, res, next) {
  var token = req.headers.token;
  if (token != undefined) {
    var now = (0, _moment2.default)().unix();
    var decodedToken = decodeToken(token);
    if (now > decodedToken.expiration) {
      res.status(400).send({ error: "Token expired" });
    } else {
      req.body.userId = decodedToken.sub.userId;
      req.body.userType = decodedToken.sub.userType;
      if (req.body.userType === 'Admin') {
        next();
      } else {
        res.status(403).send({ error: 'Not authorized to this page' });
      };
    }
  } else {
    res.status(400).send({ error: 'Not authorized to this page' });
  }
};
exports.default = { accessTokenRequired: accessTokenRequired, encodeToken: encodeToken, adminTokenRequired: adminTokenRequired };