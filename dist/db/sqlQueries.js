'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqlQueries = {};
// Create table for parcels
var createParcelsTable = 'CREATE TABLE IF NOT EXISTS parcels (id VARCHAR(200) PRIMARY KEY,  name VARCHAR(20) NOT NULL,  origin VARCHAR(20) NOT NULL,  destination VARCHAR(200) NOT NULL,  weight INT NOT NULL,  price INT NOT NULL, presentLocation VARCHAR(200) NOT NULL, status VARCHAR(200), userId VARCHAR(200) NOT NULL )';

// Create users table
var createusersTable = 'CREATE TABLE IF NOT EXISTS users(id VARCHAR(200) PRIMARY KEY,  name VARCHAR(20) NOT NULL,  email VARCHAR(40) NOT NULL,  password VARCHAR(200) NOT NULL, userType VARCHAR(200) NOT NULL\n)';

if (require.main === module) {
  (0, _connection2.default)(createParcelsTable);
  (0, _connection2.default)(createusersTable);
}

// insert parcel into the database
var insertIntoDatabase = 'INSERT INTO parcels (id, name, origin, destination, weight, price, presentLocation,userId) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ';

// Pull out a parcel from a database
var getSpecificParcel = 'SELECT * FROM parcels WHERE id =$1 ';

// Update status of a parcel
var statusUpdate = 'UPDATE parcels SET status = $1 WHERE id = $2 RETURNING * ';

//cancel order 
var cancelOrder = 'UPDATE parcels SET status = $1 WHERE id = $2 AND userId = $3 RETURNING * ';

// update destination of a parcel
var destinationUpdate = 'UPDATE parcels SET destination = $1 WHERE id = $2 RETURNING *\n';

// update present location
var presentLocationUpdate = 'UPDATE parcels SET presentLocation = $1 WHERE id =$2 RETURNING * ';

// register user
var registerUser = ' INSERT INTO users (id,name, email, password,userType) VALUES ($1,$2,$3,$4,$5) RETURNING *';
// Check if a user is logged in
var checkUser = 'SELECT * FROM users WHERE email = $1';

// SELECT orders that belongs to a particular user
var ordersForUser = 'SELECT * FROM parcels WHERE userId=$1';

sqlQueries.checkUser = checkUser;
sqlQueries.createParcelsTable = createParcelsTable;
sqlQueries.createusersTable = createusersTable;
sqlQueries.destinationUpdate = destinationUpdate;
sqlQueries.getSpecificParcel = getSpecificParcel;
sqlQueries.insertIntoDatabase = insertIntoDatabase;
sqlQueries.registerUser = registerUser;
sqlQueries.ordersForUser = ordersForUser;
sqlQueries.presentLocationUpdate = presentLocationUpdate;
sqlQueries.statusUpdate = statusUpdate;
sqlQueries.cancelOrder = cancelOrder;

exports.default = sqlQueries;