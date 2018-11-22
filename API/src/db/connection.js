import { Pool } from 'pg';
//Use dotenv to configure thhe environment variables 
//You need to put all environment variables in the .env file like passwords, PGDatabase.
//

//instantiate the connection string 
//const connectionString 
const pool = new Pool({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
});

const connect = async () => {
    return pool.connect();
}; 

//use async for a function that will have to wait for another one to complete. 
const execute = (sql, data=[]) => {
    const connection = await connect();
    try {
        //wait for the query using await 
       const result = await connection.query(sql, data);
       return result;  
    } catch (error){
        //Error handling 
        console.log(error.message);
    } finally {
        //close the pool or the databasee
        connection.release();
    }
};

export default execute; 