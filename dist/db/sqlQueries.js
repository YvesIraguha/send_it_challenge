"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("babel-polyfill");

var _connection = _interopRequireDefault(require("./connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqlQueries = {}; // Create table for parcels

var createParcelsTable = 'CREATE TABLE IF NOT EXISTS parcels (id SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  origin VARCHAR(20) NOT NULL,  destination VARCHAR(20) NOT NULL,  weight INT NOT NULL,  price INT NOT NULL, presentLocation VARCHAR(20) NOT NULL, status VARCHAR(20), userId INT NOT NULL )'; // Create users table

var createusersTable = "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  email VARCHAR(20) NOT NULL,  password VARCHAR(20) NOT NULL \n)";

if (require.main === module) {
  (0, _connection.default)(createParcelsTable);
  (0, _connection.default)(createusersTable);
} // insert parcel into the database


var insertIntoDatabase = 'INSERT INTO parcels (id, name, origin, destination, weight, price, presentLocation,userId) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * '; // Pull out a prcel from a database

var getSpecificParcel = 'SELECT * FROM parcels WHERE id =$1 '; // Update status of a parcel

var statusUpdate = 'UPDATE parcels SET status = $1 WHERE id = $2 RETURNING * '; // update destination of a parcel

var destinationUpdate = "UPDATE parcels SET destination = $1 WHERE id = $2 RETURNING *\n"; // update present location

var presentLocationUpdate = 'UPDATE parcels SET presentLocation = $1 WHERE id =$2 RETURNING * '; // register user

var registerUser = ' INSERT INTO users (id,name, email, password) VALUES ($1,$2,$3,$4) RETURNING *'; // Check if a user is logged in

var checkUSer = 'SELECT * FROM users WHERE id = $id'; // SELECT orders that belongs to a particular user

var ordersForUser = 'SELECT * FROM parcels WHERE userid=$1';
sqlQueries.checkUSer = checkUSer;
sqlQueries.createParcelsTable = createParcelsTable;
sqlQueries.createusersTable = createusersTable;
sqlQueries.destinationUpdate = destinationUpdate;
sqlQueries.getSpecificParcel = getSpecificParcel;
sqlQueries.insertIntoDatabase = insertIntoDatabase;
sqlQueries.registerUser = registerUser;
sqlQueries.ordersForUser = ordersForUser;
sqlQueries.presentLocationUpdate = presentLocationUpdate;
sqlQueries.statusUpdate = statusUpdate;
var _default = sqlQueries;
exports.default = _default;