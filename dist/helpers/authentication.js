"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Access token required for a user
var accessTokenRequired = function accessTokenRequired(req, res, next) {
  var token = req.body.token;

  if (token) {
    next();
  } else {
    res.status(400).send({
      message: 'Not authorized to this page'
    });
  }
};

var _default = accessTokenRequired;
exports.default = _default;