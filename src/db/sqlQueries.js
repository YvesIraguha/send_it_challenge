import execute from './connection';

const sqlQueries = {};
// Create table for parcels
const createParcelsTable = "CREATE TABLE IF NOT EXISTS parcels (id VARCHAR(200) PRIMARY KEY,  name VARCHAR(70) NOT NULL,  origin VARCHAR(70) NOT NULL,  destination VARCHAR(70) NOT NULL,  weight DECIMAL NOT NULL,  price DECIMAL NOT NULL, presentLocation VARCHAR(200) NOT NULL, status VARCHAR(200) DEFAULT 'Not delivered', userId VARCHAR(200) NOT NULL, created_at TIMESTAMP NOT NULL)";

// Create users table
const createusersTable = `CREATE TABLE IF NOT EXISTS users(id VARCHAR(200) PRIMARY KEY,  firstname VARCHAR(70) NOT NULL, lastname VARCHAR(70) NOT NULL, phone VARCHAR(50) NOT NULL, email VARCHAR(40) NOT NULL UNIQUE,  password VARCHAR(200) NOT NULL, userType VARCHAR(200) NOT NULL
)`;

if (require.main === module) {
  execute(createParcelsTable);
  execute(createusersTable);
}

// insert parcel into the database
const insertIntoDatabase = 'INSERT INTO parcels (id, name, origin, destination, weight, price, presentLocation,userId,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ';

// Pull out a parcel from a database
const getSpecificParcel = 'SELECT * FROM parcels WHERE id =$1 ';

// Select a user for a specific parcel
const getUserForSpecificParcel = 'SELECT parcels.id,users.email FROM parcels INNER JOIN users on parcels.userId = users.id WHERE parcels.id = $1';

// Update status of a parcel
const statusUpdate = 'UPDATE parcels SET status = $1 WHERE id = $2 RETURNING * ';

// cancel order
const cancelOrder = 'UPDATE parcels SET status = $1 WHERE id = $2 AND userId = $3 RETURNING * ';

// update destination of a parcel
const destinationUpdate = `UPDATE parcels SET destination = $1 WHERE id = $2 RETURNING *
`;

// update present location
const presentLocationUpdate = 'UPDATE parcels SET presentLocation = $1 WHERE id =$2 RETURNING * ';

// register user
const registerUser = ' INSERT INTO users (id,firstname, lastname, phone, email, password,userType) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
// Check if a user is logged in
const checkUser = 'SELECT * FROM users WHERE email = $1';

// SELECT orders that belongs to a particular user
const ordersForUser = 'SELECT * FROM parcels WHERE userId=$1';

// SELECT filtered orders that belongs to a particular user based on their status
const ordersFilteredParcels = 'SELECT * FROM parcels WHERE userId=$1 AND status=$2';

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
sqlQueries.getUserForSpecificParcel = getUserForSpecificParcel;
sqlQueries.ordersFilteredParcels = ordersFilteredParcels;

export default sqlQueries;
