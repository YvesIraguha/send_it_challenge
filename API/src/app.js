import parcelsRouter from './routes/parcels'; 
import express from "express";
const bodyParser = require("body-parser");


//instantiate the app; 
const app = express(); 


//set the middle ware to use for body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set the router to use. 
app.use('/api',parcelsRouter); 


//Set the port for listening on.
let port = process.env.PORT || 3000; 
app.listen(port);

//export the app for testing
export default  app;