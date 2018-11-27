"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Use dotenv to configure thhe environment variables
// You need to put all environment variables in the .env file like passwords, PGDatabase.
//
_dotenv.default.config(); // instantiate the connection string
// const connectionString


var pool = new _pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD
});

var connect =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", pool.connect());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}(); // use async for a function that will have to wait for another one to complete.


var execute =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(sql) {
    var data,
        connection,
        result,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
            _context2.next = 3;
            return connect();

          case 3:
            connection = _context2.sent;
            _context2.prev = 4;
            _context2.next = 7;
            return connection.query(sql, data);

          case 7:
            result = _context2.sent;
            return _context2.abrupt("return", result.rows);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](4);
            // Error handling
            console.log(_context2.t0.message);

          case 14:
            _context2.prev = 14;
            // close the pool or the databasee
            connection.release();
            return _context2.finish(14);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 11, 14, 17]]);
  }));

  return function execute(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = execute;
exports.default = _default;