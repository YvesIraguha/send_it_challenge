const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
//import the user object
const creator = require("./users"); 
const users = creator.users;

//declare middlewares to use for body parsing. 
router.use(bodyParser()); 


//define a function to look for a specific parcel 
const specificParcel = (parcelId)=>{
			//check for a specific order for a given order
			//where 0 is the index of a specific user
			for (let user of users){
				for (let order of user.orders){			 
					let parcel = order.find((order)=>order.id===parcelId);
					//send the parcel to the template.
					if (parcel){
						return;
					};
				};
			};
		};


//fetch a parcel by id
router.get('/parcels/:id',(req,res)=>{
			let parcelId = req.params.id; 
			let parcel = specificParcel(parcelId);
			
			res.end(parcel); 

		});



//Fetch all orders made. 
router.get("/parcels/",(req,res)=>{
	//XXXloop through the users' orders and display them to admin, those should be in template. 
	for (let user of users){
		for (let order of user.orders){

		};
	};
	
	res.end(`<h1>${users[0].orders[0].origin},${users[0].orders[0].destination},${users[0].orders[0].price}</h1>`); 
});
//fetch all delivery orders made by a specific user 

router.get("/users/:id/parcels",(req,res)=>{
	let userId = parseInt(req.params.id);
	let specificUser = users.find((item) => item.id === userId);
	//XXXthese codes should be in the template
	if (specificUser){
		for (let parcel of specificUser.orders){

		};
	};
});


//Route for accepting data from the parcel creation. 
router.post('/',(req,res)=>{
		let origin = req.body.origin; 
		let destination = req.body.destination; 
		let weight = req.body.weight;
		let price = parseFloat(weight)*100;
		let order = {
			date:1,
			origin,destination,weight,price:`${price}Rwf`
		};

		users[0].orders.push(order); 
		console.log("this is the post method.");
		res.redirect(301,'/api/v1/parcels');
});

 
//the codes for canceling a delivery order. 

router.put('/parcels/:id/cancel',(req,res)=>{
	let parcelId = req.params.id; 	
	for (let user of users){
		for (let order of user.orders){			 
			let parcel = order.find((order)=>order.id===parcelId);
			//send the parcel to the template.
			if (parcel){
				//remove the parcel from list of parcels made by someone. 
				//XXXsend the user to the list of remaining parcels. 
				order.splice(order.indexOf(parcel),1);
				return;
			};
		};
};
});


module.exports = router; 

