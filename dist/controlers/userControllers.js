'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _sqlQueries = require('../db/sqlQueries');

var _sqlQueries2 = _interopRequireDefault(_sqlQueries);

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _authentication = require('../helpers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _inputFieldsValidation = require('../helpers/inputFieldsValidation');

var _inputFieldsValidation2 = _interopRequireDefault(_inputFieldsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      firstname = _req$body.firstname,
      lastname = _req$body.lastname,
      phone = _req$body.phone,
      email = _req$body.email,
      password = _req$body.password,
      userType = _req$body.userType;

  var _joi$validate = _joi2.default.validate({
    firstname: firstname, lastname: lastname, email: email, password: password, userType: userType
  }, _inputFieldsValidation2.default.userSchema),
      error = _joi$validate.error,
      value = _joi$validate.value;

  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    // generate the id and pass it to a user
    var id = (0, _v2.default)();
    var user1 = new _user2.default(id, firstname, lastname, phone, email, password, userType);
    var token = _authentication2.default.encodeToken({
      firstname: firstname, lastname: lastname, phone: phone, email: email, password: password, userId: id, userType: user1.userType
    });
    var promise = (0, _connection2.default)(_sqlQueries2.default.registerUser, [user1.id, user1.firstname, user1.lastname, user1.phone, user1.email, user1.password, user1.userType]);
    promise.then(function (response) {
      var _response$ = response[0],
          firstname = _response$.firstname,
          lastname = _response$.lastname,
          email = _response$.email,
          userType = _response$.userType;

      res.status(200).send({
        message: 'user registered successfully',
        response: {
          id: id, firstname: firstname, lastname: lastname, email: email, userType: userType
        },
        token: token
      });
    }).catch(function (error) {
      res.status(400).send({ error: error });
    });
  }
};

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
    return res.status(400).send({ error: error });
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
            usertype = _response$2.usertype,
            id = _response$2.id;

        var token = _authentication2.default.encodeToken({
          name: name, email: email, password: _password, userId: id, usertype: usertype
        });
        res.status(200).send({
          message: 'Logged in successfully', token: token, id: id, name: name, usertype: usertype
        });
      } else {
        res.status(400).send({ error: 'Password not matching' });
      }
    } else {
      res.status(400).send({ error: 'No user with that email' });
    }
  }).catch(function (error) {
    res.status(400).send({ error: error });
  });
};

// Delete all users from users table.
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
userControllers.deleteUsers = deleteUsers;

exports.default = userControllers;