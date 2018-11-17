import express from 'express';
const parcelsRouter = express.Router(); 


//declare the variable to store users and orders. 
let users =[];
let orders = [];

//redirect to the apis when on heroku. 
parcelsRouter.get('/',(req,res)=>{
	res.redirect("/v1/parcels");
})



//get the list of all users. 
parcelsRouter.get('/v1/users', (req,res)=>{
	if (users.length>0){
		res.send(users);
	}else{
		res.send({message:"There is no user at the moment."});
	}
});
	

//create a user 
parcelsRouter.post('/v1/users',(req,res)=>{
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
parcelsRouter.get('/v1/parcels/:id',(req,res)=>{
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
parcelsRouter.post('/v1/parcels',(req,res)=>{
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
parcelsRouter.get("/v1/users/:id/parcels",(req,res)=>{
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
parcelsRouter.get("/v1/parcels",(req,res)=>{
	if (orders.length>0){
		res.send(orders);
	}else{
		//send a user the error message; 
		res.send({message:"Ooops! there is no order at the moment "});
	};
});


//the codes for canceling a delivery order with put method
parcelsRouter.put('/v1/parcels/:id/cancel',(req,res)=>{
	let parcelId = parseInt(req.params.id); 
	let parcel =orders.find((order)=>order.id===parcelId); 	
	if (parcel){
		orders.splice(orders.indexOf(parcel),1);
		res.send(parcel);
	}else{
		res.send({message:"There is no parcel with that Id"});
	};	
		
});

export default parcelsRouter;