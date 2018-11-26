import dotenv from 'dotenv';
import { Pool } from 'pg';
import 'babel-polyfill';
// Use dotenv to configure thhe environment variables
// You need to put all environment variables in the .env file like passwords, PGDatabase.
//
let connectionString = 'postgres://mebsqfrejkelax:9c31ca2a2e151cb9484b1657e90dc3f3164e87a81523345b7449845a9bc28fcf@ec2-54-163-230-178.compute-1.amazonaws.com:5432/d2ch697rh862r8';

dotenv.config();
// instantiate the connection string
// const connectionString
const pool = new Pool({connectionString});

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
