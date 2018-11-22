
import 'babel-polyfill';

let sqlQueries = {};
//Create table for parcels 
let createParcelsTable = `CREATE TABLE parcels (id SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  origin VARCHAR(20) NOT NULL,  destination VARCHAR(20) NOT NULL,  weight INT NOT NULL,  price INT NOT NULL 
    )`;

//Create users table 
let createusersTable = `CREATE TABLE users(id  SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  email VARCHAR(20) NOT NULL,  password VARCHAR(20) NOT NULL 
    )`;


//insert parcel into the database 
let insertIntoDatabase = `INSERT INTO parcels (id, name, origin, destination, weight, price) VALUES($1,$2,$3,$4,$5,$6)`;

//Pull out a prcel from a database 
let getSpecificParcel = `SELECT * FROM parcels WHERE id =$1 `;

//Update status of a parcel 
let statusUpdate = `UPDATE parcels SET status = $1 WHERE id = $2`;

//update destination of a parcel 
let destinationUpdate = `UPDATE parcels SET destination = $1 WHERE id = $2
`;

//update present location 
let presentLocationUpdate = `UPDATE parcels SET presentLocation = $1 WHERE id =$2`;


//register user 
let registerUser = ` INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`;
//Check if a user is logged 
let checkUSer = `SELECT * FROM users WHERE id = $id`;

//SELECT orders that belongs to a particular user
let ordersForUser = `SELECT * FROM parcels JOIN users on players.userid = users.id WHERE players.usid =$1`;

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

export default sqlQueries; 