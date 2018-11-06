const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();


//Route for accepting data from the parcel creation. 
router.post("/parcels",(req,res)=>{
		let origin = req.body.origin; 
		let destination = req.body.destination; 
		let weight = req.body.weight;
		let price = parseFloat(weight)*100;
		let order = {
			date:1,
			origin,destination,weight,price:`${price}Rwf`
		};
		
		// users[0].orders.push(order);
		// res.send(JSON.stringify(users));
		//codes for redirecting a user to the orders he created. 
		//codes to update the admin deliveries. 

});

module.exports = router; 