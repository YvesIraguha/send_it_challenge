"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("babel-polyfill");

var sqlQueries = {}; // Create table for parcels

var createParcelsTable = "CREATE TABLE parcels (id SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  origin VARCHAR(20) NOT NULL,  destination VARCHAR(20) NOT NULL,  weight INT NOT NULL,  price INT NOT NULL, presentLocation VARCHAR(20) NOT NULL, status VARCHAR(20))"; // Create users table

var createusersTable = "CREATE TABLE users(id  SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  email VARCHAR(20) NOT NULL,  password VARCHAR(20) NOT NULL \n    )"; // insert parcel into the database

var insertIntoDatabase = 'INSERT INTO parcels (id, name, origin, destination, weight, price, presentLocation) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * '; // Pull out a prcel from a database

var getSpecificParcel = 'SELECT * FROM parcels WHERE id =$1 '; // Update status of a parcel

var statusUpdate = 'UPDATE parcels SET status = $1 WHERE id = $2 RETURNING * '; // update destination of a parcel

var destinationUpdate = "UPDATE parcels SET destination = $1 WHERE id = $2 RETURNING *\n"; // update present location

var presentLocationUpdate = 'UPDATE parcels SET presentLocation = $1 WHERE id =$2 RETURNING * '; // register user

var registerUser = ' INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *'; // Check if a user is logged in

var checkUSer = 'SELECT * FROM users WHERE id = $id'; // SELECT orders that belongs to a particular user

var ordersForUser = 'SELECT * FROM parcels JOIN users on players.userid = users.id WHERE players.usid =$1';
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