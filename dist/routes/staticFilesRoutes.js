'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var staticPages = _express2.default.Router();

staticPages.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../UI/html/index.html'));
        return;
});
staticPages.get('/signin', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../UI/html/signin.html'));
        return;
});
staticPages.get('/create', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../UI/html/createOrder.html'));
        return;
});

staticPages.get('/signup', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../UI/html/signup.html'));
        return;
});

staticPages.get('/user', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../UI/html/userProfile.html'));
        return;
});
staticPages.get('/summary', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../UI/html/summaryOrders.html'));
        return;
});
staticPages.get('/admin', function (req, res) {
        res.sendFile(path.join(__dirname, '/../../UI/html/adminProfile.html'));
        return;
});

exports.default = staticPages;