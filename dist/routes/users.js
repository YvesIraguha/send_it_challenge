"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = _interopRequireDefault(require("../controlers/userControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate users router
var usersRouter = _express.default.Router(); // get the list of all users.


usersRouter.get('/', _userControllers.default.fetchAllUsers); // The route for signing up link
// usersRouter.get('/signup', userControllers.signUpPage);
// get a specific user by id

usersRouter.get('/:id', _userControllers.default.getUser); // accept the data from users signing up

usersRouter.post('/signup', _userControllers.default.createUser); // The login page;
// usersRouter.get('/signin', userControllers.loginPage);
// the login data

usersRouter.post('/signin', _userControllers.default.login); // sign out.

usersRouter.get('/signout', _userControllers.default.signOut);
var _default = usersRouter;
exports.default = _default;