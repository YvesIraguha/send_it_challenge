const parcels = require('./parcels');
const express = require("express");
const bodyParser = require("body-parser");


//instantiate the app; 
const app = express(); 

//set the middle ware to use for body parsing]
app.use(bodyParser.json()); 

//declare the variable to store users and orders. 
let users =[];
let orders = [];

//redirect to the apis when on heroku. 
app.get('/',(req,res)=>{
	res.redirect("/api/v1/");
})



//get the list of all users. 
app.get('/api/v1/users', (req,res)=>{
	if (users.length>0){
		res.send(users);
	}else{
		res.send({message:"There is no user at the moment."});
	}
});
	

//create a user 
app.post('/api/v1/users',(req,res)=>{
	let name = req.body.name;
	let email = req.body.email;
	let userId = users.length+1; 

	let user1 = {name,email,userId};	
	if (!name || !email){
			res.send({message:"A user should have name and email"})
	}else{
			users.push(user1);
			res.send(user1);
			}; 
});


//Dealing with parcels.

//fetch a parcel by id
app.get('/api/v1/parcels/:id',(req,res)=>{
			let parcelId = parseInt(req.params.id); 
			let parcel = orders.find((order)=>order.id===parcelId);
			//send it.
			if (parcel) {
				res.send(parcel); 
			}else{
				//send the error page 
				res.send({message:"Ooops! no order with that id"});
			};
			

		});



//Route for accepting data from the parcel creation. 
app.post('/api/v1/parcels',(req,res)=>{
		let origin = req.body.origin; 
		let destination = req.body.destination; 
		let weight = req.body.weight;
		let userId=req.body.userId; 
		let price = parseFloat(weight)*100;		
		let id = orders.length +1;
		if (!origin || !destination || !userId || !weight || isNaN(weight)){
			res.send({message:"the order should have origin, destination, userId, and weight of type number fields"});
		}else{
			let order = {id,userId,origin,destination,weight,price:`${price}Rwf`};		 
			orders.push(order);
			res.send(order);
		};		
		
});

 
//fetch all delivery orders made by a specific user
app.get("/api/v1/users/:id/parcels",(req,res)=>{
	let userId = parseInt(req.params.id); 
	//find the order where the owner is equal to the email
	let specificOrders = orders.filter((item) => item.userId=== userId);
	if (specificOrders){
		res.send(specificOrders);
	}else{
		//Redirect to error page
		res.send({message:"There is no order of the user you specified"});
	};
});


//Fetch all orders made. 
app.get("/api/v1/parcels",(req,res)=>{
	if (orders.length>0){
		res.send(orders);
	}else{
		//send a user the error message; 
		res.send({message:"Ooops! there is no order at the moment "});
	};
});


//the codes for canceling a delivery order with put method
app.put('/api/v1/parcels/:id/cancel',(req,res)=>{
	let parcelId = parseInt(req.params.id);	
	let parcel =orders.find((order)=>order.id===parcelId); 	
	orders.splice(orders.indexOf(parcel),1);
	res.send(parcel);
		
});

//Setting the port for listening on.
let port = process.env.PORT || 3000; 
app.listen(port);

//export the app for testing
module.exports = app 