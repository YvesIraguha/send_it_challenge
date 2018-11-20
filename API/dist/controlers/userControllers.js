"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var users = [];
var userControllers = {}; // fetch all users.

var fetchAllUsers = function fetchAllUsers(req, res) {
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
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password;
  var specificUser = users.find(function (user) {
    return user.email === email;
  });

  if (specificUser) {
    // XXX include the link to sign in with a message;
    res.end('account already taken');
  } else {
    users.push(user1);
    req.session.user = user1;
    res.redirect(301, '/api/v1/');
  }
}; // send sign up page.


var singUpPage = function singUpPage(req, res) {
  res.render('signup');
}; // get a user


var getUser = function getUser(req, res) {
  var userId = parseInt(req.params.id);
  var specificUser = users.find(function (item) {
    return item.id === userId;
  });

  if (specificUser) {
    res.end("<h1>I got him</h1><h2>".concat(specificUser.id, ", I am ").concat(specificUser.name, ",my email is ").concat(specificUser.email));
  } else {
    console.log(userId);
    res.end('<h1>No user of that name</h1>');
  }
}; // Login data processing


var login = function login(req, res) {
  var specificUser = users.find(function (user) {
    if (user.email === req.body.email && user.password === req.body.email) {
      return user;
    }
  });

  if (specificUser) {
    req.session.user = specificUser; // redirect the user to the next page.

    res.redirect('/api/v1/');
  }

  res.end('Invalid login');
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
    if (user.email === req.body.email && user.password === req.body.email) {
      return user;
    }
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
userControllers.signUpPage = signUpPage;
var _default = {
  userControllers: userControllers
};
exports.default = _default;