"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = _interopRequireDefault(require("../controlers/userControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersRouter = _express.default.Router(); // declare the variable to store users.


var users = []; // get the list of all users.

usersRouter.get('/v1/users'); // create a user

usersRouter.post('/v1/users'); // The route to fetch all users temporaryly for signing up

usersRouter.get('/users/signup'); // get a specific user by id

usersRouter.get('/users/:id'); // the function for checking if a user is looged in.
// accept the data from users signing up

usersRouter.post('/users/signup'); // The the login page;

usersRouter.get('/users/signin', function (req, res) {
  res.render('signin');
}); // the login data

usersRouter.post('/users/signin'); // sign out.

usersRouter.get('/signout', function (req, res) {
  req.session.destroy(function () {
    console.log('A user loged out');
  });
  res.redirect('/users/signin');
});
var _default = usersRouter;
exports.default = _default;