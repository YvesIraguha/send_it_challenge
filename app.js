const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const users = require('./users');
const parcels = require('./parcels');

const app = express(); 

const userRoute = users.router; 


//set the router of users. 
app.use('/api/v1',userRoute);
//set the router for parcels
app.use('/api/v1',parcels);

//Send the home page. 
app.get('/api/v1/',(req,res)=>{
	res.sendFile(path.join(__dirname,"/UI/index.html"));
})


//XXXXdefine the route for admin to change the parcel and later confirm the current location of each order. 

//Setting the port for listening on.
let port = process.env.PORT || 3000; 
app.listen(port);
console.log(`App listening on port ${port}...`);
