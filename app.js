const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const users = require('./users');
const parcels = require9('./parcels');

const app = express(); 

//declare middlewares to use for body parsing. 
app.use(bodyParser());
//set the router of users. 
app.use('/api/v1',users);
//set the router for parcels
app.use('/api/v1',parcels);

//Send the home page for user to sign up or create a delivery. 
app.get('/api/v1/',(req,res)=>{
	res.sendFile(path.join(__dirname,"/UI/index.html"));
})




//Setting the port for listening on.
let port = process.env.PORT || 3000; 
app.listen(port);
console.log(`App listening on port ${port}...`);
