'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Define a class for creating a user
var User = function () {
  function User(id, firstname, lastname, phone, email, password) {
    var userType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'User';

    _classCallCheck(this, User);

    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.userType = userType;
    this.setPassword(password);
  }

  // define a function to hash the password.


  _createClass(User, [{
    key: 'setPassword',
    value: function setPassword(password) {
      var hashedPassword = _passwordHash2.default.generate(password);
      // hash the password
      return this.password = hashedPassword;
    }
  }]);

  return User;
}();

exports.default = User;