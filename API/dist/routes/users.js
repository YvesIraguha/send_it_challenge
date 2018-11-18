"use strict";

var express = require("express");

var path = require("path");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var session = require("express-session");

var router = express.Router(); //set the middle ware to use for body parsing

router.use(bodyParser());
router.use(cookieParser());
router.use(session({
  secret: "@yvesiraguha"
})); //declare the variable to store users. 

var users = []; //Send users the link for signin up
//The route to fetch all users temporaryly for signing up 

router.get('/users/signup', function (req, res) {
  res.render("signup");
}); //get a specific user by id, this is not necessary

router.get('/users/:id', function (req, res) {
  var userId = parseInt(req.params.id);
  var specificUser = users.find(function (item) {
    return item.id === userId;
  });

  if (specificUser) {
    res.end("<h1>I got him</h1><h2>".concat(specificUser.id, ", I am ").concat(specificUser.name, ",my email is ").concat(specificUser.email));
  } else {
    console.log(userId);
    res.end("<h1>No user of that name</h1>");
  }

  ;
}); //the function for checking if a user is looged in. 

var loginRequired = function loginRequired(req, res) {
  if (req.session.user) {
    next();
  } else {
    res.end("Not looged in");
  }

  ;
}; //accept the data from users signing up


router.post('/users/signup', function (req, res) {
  var name = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var user1 = {
    id: users.length + 1,
    name: name,
    email: email,
    password: password,
    orders: []
  };
  var specificUser = users.find(function (user) {
    return user.email === email;
  });

  if (specificUser) {
    //XXX include the link to sign in with a message;
    res.end("account already taken");
  } else {
    users.push(user1);
    req.session.user = user1;
    console.log(users);
    res.redirect(301, '/api/v1/');
  }

  ;
}); //The the login page; 

router.get('/users/signin', function (req, res) {
  res.render("signin");
}); //the login data 

router.post('/users/signin', function (req, res) {
  var specificUser = users.find(function (user) {
    if (user.email === req.body.email && user.password === req.body.email) {
      return user;
    }

    ;
  });

  if (specificUser) {
    req.session.user = specificUser; //redirect the user to the next page. 

    res.redirect("/api/v1/");
  }

  ;
  res.end("Invalid login");
});
router.get("/signout", function (req, res) {
  req.session.destroy(function () {
    console.log('A user loged out');
  });
  res.redirect('/users/signin');
});
module.exports.router = router;
module.exports.users = users;