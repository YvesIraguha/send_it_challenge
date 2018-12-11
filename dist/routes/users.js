'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userControllers = require('../controlers/userControllers');

var _userControllers2 = _interopRequireDefault(_userControllers);

var _users = require('../../dist/routes/users');

var _users2 = _interopRequireDefault(_users);

var _user = require('../../dist/models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate users router
var usersRouter = _express2.default.Router();

// get the list of all users.
usersRouter.get('/', _userControllers2.default.fetchAllUsers);

// The route for signing up link
// usersRouter.get('/signup', userControllers.signUpPage);

// get a specific user by id
usersRouter.get('/:id', _userControllers2.default.getUser);

// accept the data from users signing up
usersRouter.post('/signup', _userControllers2.default.createUser);

// The login page;
// usersRouter.get('/signin', userControllers.loginPage);

// the login data
usersRouter.post('/signin', _userControllers2.default.login);

// sign out.
usersRouter.get('/signout', _userControllers2.default.signOut);

// delete users for testing
usersRouter.delete('/', _userControllers2.default.deleteUsers);

exports.default = usersRouter;