import dotenv from 'dotenv';
import { Pool } from 'pg';
import 'babel-polyfill';
// Use dotenv to configure thhe environment variables
// You need to put all environment variables in the .env file like passwords, PGDatabase.
//

dotenv.config();
// instantiate the connection string
// const connectionString
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sendit',
  port: 5432,
  password: 'airaguha',
});

const connect = async () => pool.connect();

// use async for a function that will have to wait for another one to complete.
const execute = async (sql, data = []) => {
  const connection = await connect();
  try {
    // wait for the query using await
    const result = await connection.query(sql, data);
    return result.rows;
  } catch (error) {
    // Error handling
    console.log(error.message);
  } finally {
    // close the pool or the databasee
    connection.release();
  }
};

export default execute;
