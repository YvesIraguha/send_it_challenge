"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Use dotenv to configure thhe environment variables 
//You need to put all environment variables in the .env file like passwords, PGDatabase.
//
//instantiate the connection string 
//const connectionString 
var pool = new _pg.Pool({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
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
}(); //use async for a function that will have to wait for another one to complete. 


var execute = function execute(sql) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var connection = await connect();

  try {
    //wait for the query using await 
    var result = await connection.query(sql, data);
    return result;
  } catch (error) {
    //Error handling 
    console.log(error.message);
  } finally {
    //close the pool or the databasee
    connection.release();
  }
};

var _default = execute;
exports.default = _default;