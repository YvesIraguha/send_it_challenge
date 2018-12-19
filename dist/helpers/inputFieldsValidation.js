'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = _joi2.default.object().keys({
  firstname: _joi2.default.string().alphanum().min(3).max(70).required(),
  lastname: _joi2.default.string().alphanum().min(3).max(70).required(),
  password: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  email: _joi2.default.string().email({ minDomainAtomas: 2 }).required(),
  userType: _joi2.default.string()
});

var parcelSchema = _joi2.default.object().keys({
  name: _joi2.default.string().alphanum().min(3).max(30).required(),
  origin: _joi2.default.string().alphanum().min(3).max(30).required(),
  destination: _joi2.default.string().alphanum().min(3).max(30).required(),
  weight: _joi2.default.number().integer().required(),
  userId: _joi2.default.string()
});

exports.default = { userSchema: userSchema, parcelSchema: parcelSchema };