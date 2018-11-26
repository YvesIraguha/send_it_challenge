
import 'babel-polyfill';
import execute from './connection';

const sqlQueries = {};
// Create table for parcels
const createParcelsTable = 'CREATE TABLE IF NOT EXISTS parcels (id SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  origin VARCHAR(20) NOT NULL,  destination VARCHAR(20) NOT NULL,  weight INT NOT NULL,  price INT NOT NULL, presentLocation VARCHAR(20) NOT NULL, status VARCHAR(20), userId INT NOT NULL )';

// Create users table
const createusersTable = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,  name VARCHAR(20) NOT NULL,  email VARCHAR(20) NOT NULL,  password VARCHAR(20) NOT NULL 
)`;

if (require.main === module) {
  execute(createParcelsTable);
  execute(createusersTable);
}

// insert parcel into the database
const insertIntoDatabase = 'INSERT INTO parcels (id, name, origin, destination, weight, price, presentLocation,userId) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ';

// Pull out a prcel from a database
const getSpecificParcel = 'SELECT * FROM parcels WHERE id =$1 ';

// Update status of a parcel
const statusUpdate = 'UPDATE parcels SET status = $1 WHERE id = $2 RETURNING * ';

// update destination of a parcel
const destinationUpdate = `UPDATE parcels SET destination = $1 WHERE id = $2 RETURNING *
`;

// update present location
const presentLocationUpdate = 'UPDATE parcels SET presentLocation = $1 WHERE id =$2 RETURNING * ';


// register user
const registerUser = ' INSERT INTO users (id,name, email, password) VALUES ($1,$2,$3,$4) RETURNING *';
// Check if a user is logged in
const checkUSer = 'SELECT * FROM users WHERE id = $id';

// SELECT orders that belongs to a particular user
const ordersForUser = 'SELECT * FROM parcels WHERE userid=$1';

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
