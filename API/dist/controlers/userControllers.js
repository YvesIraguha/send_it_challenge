"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _sqlQueries = _interopRequireDefault(require("../db/sqlQueries"));

var _connection = _interopRequireDefault(require("../db/connection"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declare the variable to store users.
var users = [];
var userControllers = {}; // fetch all users.

var fetchAllUsers = function fetchAllUsers(req, res) {
  //let users = execute(`SELECT * FROM users`);
  if (users.length > 0) {
    res.send(users);
  } else {
    res.send({
      message: 'There is no user at the moment.'
    });
  }
}; // create a user.


var createUser = function createUser(req, res) {
  var _req$body = req.body,
      id = _req$body.id,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password;
  var specificUser = users.find(function (user) {
    return user.email === email;
  }); //let specificUser = execute(queries.checkuser,[id])

  if (specificUser) {
    // XXX include the link to sign in with a message;
    res.send({
      message: 'The email is already in use'
    });
  } else if (!name || !email || !password) {
    res.send({
      message: 'Please complete the required fields'
    });
  } else {
    var fieldsValidation = /^[a-zA-Z]+/;

    if (!fieldsValidation.test(name)) {
      res.status(400).send({
        message: "Invalid name, the name should start with letter"
      });
    } else if (!fieldsValidation.test(email)) {
      res.status(400).send({
        message: 'Invalid email, the email should start with letter'
      });
    } else {
      // generate the id and pass to a user
      var user1 = new _user.default(id, name, email, password); //execute(queries.registerUser,[user1.id,user1.name,user1.email,user1.password]);

      users.push(user1);
      res.send({
        message: 'user registered successfully',
        user1: user1
      });
    }
  }
}; // send sign up page.
// const singUpPage = (req, res) => {
//   res.send('signup');
// };
// get a user


var getUser = function getUser(req, res) {
  var id = parseInt(req.params.id);
  var specificUser = users.find(function (item) {
    return item.id === id;
  }); //let specificUser = execute(queries.checkUser,[id]);

  if (specificUser) {
    res.status(200).send(specificUser);
  } else {
    res.send({
      message: 'There is no user with that id'
    });
  }
}; // Login data processing


var login = function login(req, res) {
  var specificUser = users.find(function (user) {
    //let specificUser = execute(queries.checkUser,[id])
    // replace the password given with the hashed password
    if (user.email === req.body.email && user.password === req.body) {
      return user;
    }
  });

  if (specificUser) {
    req.session.user = specificUser; // redirect the user to the next page.

    res.status(200).send({
      message: 'User logged in successfully'
    });
  }

  res.send('Invalid login');
}; // login verification;


var loginRequired = function loginRequired(req, res) {
  if (req.session.user) {
    next();
  } else {
    res.end('Not looged in');
  }
}; // sign out


var signOut = function signOut(req, res) {
  var specificUser = users.find(function (user) {
    return user.email === req.body.email && user.password === req.body.password;
  });

  if (specificUser) {
    req.session.user = specificUser; // redirect the user to the next page.

    res.redirect('/api/v1/');
  }

  res.end('Invalid login');
};

userControllers.fetchAllUsers = fetchAllUsers;
userControllers.getUser = getUser;
userControllers.createUser = createUser;
userControllers.loginRequired = loginRequired;
userControllers.login = login;
userControllers.signOut = signOut;
var _default = userControllers;
exports.default = _default;