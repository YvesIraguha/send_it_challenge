'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../helpers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _userControllers = require('../controlers/userControllers');

var _userControllers2 = _interopRequireDefault(_userControllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate users router
var usersRouter = _express2.default.Router();

// get the list of all users.
usersRouter.get('/', _userControllers2.default.fetchAllUsers);

// get a specific user by id
usersRouter.get('/:id', _userControllers2.default.getUser);

// accept the data from users signing up
usersRouter.post('/signup', _userControllers2.default.createUser);

// the login data
usersRouter.post('/signin', _userControllers2.default.login);

// delete users for testing
usersRouter.delete('/', _authentication2.default.adminTokenRequired, _userControllers2.default.deleteUsers);

exports.default = usersRouter;