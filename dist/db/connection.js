'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Use dotenv to configure thhe environment variables
// You need to put all environment variables in the .env file like passwords, PGDatabase.
//

_dotenv2.default.config();
// instantiate the connection string
// const connectionString
var pool = new _pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD
});

var connect = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', pool.connect());

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

// use async for a function that will have to wait for another one to complete.
var execute = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sql) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var connection, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return connect();

          case 2:
            connection = _context2.sent;
            _context2.prev = 3;
            _context2.next = 6;
            return connection.query(sql, data);

          case 6:
            result = _context2.sent;
            return _context2.abrupt('return', result.rows);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](3);

            // Error handling
            console.log(_context2.t0.message);

          case 13:
            _context2.prev = 13;

            // close the pool or the databasee
            connection.release();
            return _context2.finish(13);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 10, 13, 16]]);
  }));

  return function execute(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = execute;