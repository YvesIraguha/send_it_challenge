"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passwordHash = _interopRequireDefault(require("password-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Define a class for creating a user
var User =
/*#__PURE__*/
function () {
  function User(id, name, email, password) {
    _classCallCheck(this, User);

    this.id = id;
    this.name = name;
    this.email = email;
    this.setPassword(password);
  } // define a function to hash the password.


  _createClass(User, [{
    key: "setPassword",
    value: function setPassword(password) {
      var hashedPassword = _passwordHash.default.generate(password); // hash the password


      return this.password = hashedPassword;
    }
  }]);

  return User;
}();

var _default = User;
exports.default = _default;