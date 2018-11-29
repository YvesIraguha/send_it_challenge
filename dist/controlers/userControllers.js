'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _sqlQueries = require('../db/sqlQueries');

var _sqlQueries2 = _interopRequireDefault(_sqlQueries);

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

require('babel-polyfill');

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _authentication = require('../helpers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declare the variable to store users

var userControllers = {};

// fetch all users.
var fetchAllUsers = function fetchAllUsers(req, res) {
  var users = (0, _connection2.default)('SELECT * FROM users');
  users.then(function (response) {
    if (response) {
      res.send({ response: response });
    } else {
      res.send({ message: 'There is no user at the moment.' });
    }
  }).catch(function (error) {
    return console.log(error);
  });
};

// create a user
var createUser = function createUser(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      userType = _req$body.userType;
  //Got the regex from Dan's Tools, Regex Testing. 

  var emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
  var fieldsValidation = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,30}$/g;
  if (!name || !email || !password || !userType) {
    res.send({ message: 'Please complete the required fields' });
  } else {
    if (!fieldsValidation.test(name)) {
      res.status(400).send({ message: 'Invalid name, the name should start with letter' });
    } else if (!emailValidation.test(email)) {
      res.status(400).send({ message: 'Invalid email, the email should start with a letter' });
    } else {
      // generate the id and pass it to a user
      var id = (0, _v2.default)();
      var token = _authentication2.default.encodeToken({
        name: name, email: email, password: password, userId: id, userType: userType
      });
      var user1 = new _user2.default(id, name, email, password, userType);
      var promise = (0, _connection2.default)(_sqlQueries2.default.registerUser, [user1.id, user1.name, user1.email, user1.password, user1.userType]);
      promise.then(function (response) {
        var _response$ = response[0],
            name = _response$.name,
            email = _response$.email,
            userType = _response$.userType;

        res.status(200).send({ message: 'user registered successfully', response: { id: id, name: name, email: email, userType: userType }, token: token });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};

// send sign up page.
// const singUpPage = (req, res) => {
//   res.send('signup');
// };

// get a user
var getUser = function getUser(req, res) {
  var id = req.params.id;
  // const specificUser = users.find(item => item.id === id);
  var specificUser = (0, _connection2.default)('SELECT * FROM users WHERE id =$1', [id]);
  specificUser.then(function (response) {
    if (response) {
      res.status(200).send(response[0]);
    } else {
      res.send({ message: 'There is no user with that id' });
    }
  }).catch(function (error) {
    return console.log(error);
  });
};

// Login data processing
var login = function login(req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;


  var specificUser = (0, _connection2.default)(_sqlQueries2.default.checkUser, [email]);
  specificUser.then(function (response) {
    if (response.length > 0) {
      if (_passwordHash2.default.verify(password, response[0].password)) {
        var _response$2 = response[0],
            name = _response$2.name,
            _password = _response$2.password,
            userType = _response$2.userType,
            id = _response$2.id;

        var token = _authentication2.default.encodeToken({ name: name, email: email, password: _password, userId: id, userType: userType });
        res.status(200).send({ message: "Logged in successfully", token: token });
      } else {
        res.status(400).send({ message: "Password not matching" });
      };
    } else {
      res.status(400).send({ message: 'No user with that email' });
    };
  }).catch(function (error) {
    console.log(error);
  });
};

// sign out
var signOut = function signOut(req, res) {
  var specificUser = users.find(function (user) {
    return user.email === req.body.email && user.password === req.body.password;
  });
  if (specificUser) {
    req.session.user = specificUser;
    // redirect the user to the next page.
    res.redirect('/api/v1/');
  }
  res.end('Invalid login');
};

//Delete all users from users table.
var deleteUsers = function deleteUsers(req, res) {
  var parcels = (0, _connection2.default)('DELETE FROM users ');
  parcels.then(function (response) {
    res.status(200).send({ message: 'Users deleted successfully', response: response });
  }).catch(function (error) {
    res.status(400).send({ error: error });
  });
};

userControllers.fetchAllUsers = fetchAllUsers;
userControllers.getUser = getUser;
userControllers.createUser = createUser;
userControllers.login = login;
userControllers.signOut = signOut;
userControllers.deleteUsers = deleteUsers;

exports.default = userControllers;