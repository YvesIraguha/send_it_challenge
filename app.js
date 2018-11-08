const parcels = require('./parcels');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session")

//instanitiate the app; 
const app = express(); 


//set the middle ware to use for body parsing]
app.use(bodyParser()); 
app.use(cookieParser());
app.use(session({secret:"@yvesiraguha"}));
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public')); 

//declare the variable to store users and orders. 
let users =[];
let orders = [];

app.get('/',(req,res)=>{
	res.redirect("/api/v1/");
})
//Send the home page. 
app.get('/api/v1/',(req,res)=>{
	let signedInUser = req.session.user; 
	if (signedInUser){
		res.render("createOrder",{user:signedInUser.name});
	}else{
		res.render("createOrder",{user:"User"})
	};
	 
});


//Send users the link for sign up
app.get('/api/v1/users/signup',(req,res)=>{	
	res.render("signup");
});


//the function for checking if a user is looged in.
const loginRequired = (req,res,next)=>{
 						if (req.session.user){
 							next(); 
 						}else{
 							res.render("error",{message:"Not signed in, login or sign up"});
 						};
            };
	

//accept the data from users signing up
app.post('/api/v1/users/signup',(req,res)=>{
	let name = req.body.fullname;
	let email = req.body.email;
	let password = req.body.password[0];

	let user1 = {name,email,password};	
	let specificUser = users.find((user)=>user.email === email);
	if (specificUser){
		res.render("error",{message:"The email is in use. Choose another and sign up again "});
		return; 
	}else{
			users.push(user1);
			req.session.user =user1;
			res.redirect(301,'/api/v1/');
		}; 
});


//The login page; 
app.get('/api/v1/users/signin',(req,res)=>{
	res.render("signin")
});


//processing signing data  
app.post('/api/v1/users/signin',(req,res)=>{
	let specificUser = users.find((user)=>{
				if (user.email===req.body.email && user.password===req.body.password){
					return user; 
				};
			});

	if(specificUser){
		req.session.user = specificUser; 
		//redirect the user to sign up page  
		res.redirect("/api/v1/"); 



	}else{ 
	//XXXthe URL to error page
	res.render("error",{message:"Invalid login, check email or password. "}); 
}; 
});

//add the link for singing out on the create order page. 
app.get("/api/v1/signout",(req,res)=>{
	req.session.destroy();
	res.redirect('/api/v1/users/signin');
});


//Dealing with parcels.

//fetch a parcel by id
app.get('/api/v1/parcels/:id',(req,res)=>{
			let parcelId = parseInt(req.params.id); 
			let parcel = orders.filter((order)=>order.id===parcelId);
			//send it.
			if (parcel) {
				res.render("allDeliveryOrders",{owners:parcel}); 
			}else{
				//send the error page 
				res.render("error",{message:"No parcel with that id, click on Admin to see all orders made!"});
			};
			

		});



//Route for accepting data from the parcel creation. 
app.post('/api/v1/parcels',loginRequired,(req,res)=>{
		let origin = req.body.origin; 
		let destination = req.body.destination; 
		let weight = req.body.weight;
		let price = parseFloat(weight)*100;
		let ownerEmail = req.session.user.email; 
		let ownerName = req.session.user.name; 
		let id = orders.length +1; 
		let d= new Date(); 
		let day = d.getDate();
		let month = d.getMonth();
		let year = d.getFullYear();
		let date = `${year}-${month}-${day}`;
		let order = {id,date,ownerName,ownerEmail,origin,destination,weight,price:`${price}Rwf`};		 
		orders.push(order);
		//XXXredirect a user to the pages of orders he created
		let parcels = orders.filter((order)=>order.ownerEmail===ownerEmail);
		res.redirect(`/api/v1/users/${ownerEmail}/parcels`);
});

 
//fetch all delivery orders made by a specific user
app.get("/api/v1/users/:id/parcels",(req,res)=>{
	let userId = req.params.id.toString(); 
	//find the order where the owner is equal to the email
	let specificOrders = orders.filter((item) => item.ownerEmail=== userId);
	if (specificOrders){
		res.render("deliveryOrderByUser",{parcelsByUser:specificOrders})
	}else{
		//Redirect to error page
		res.render("error",{message:`parcel with that email! remember to remove <br> any extra space on email.`});
	};
});


//Fetch all orders made. 
app.get("/api/v1/parcels",(req,res)=>{
	if (users.length>0){
		res.render("allDeliveryOrders",{owners:orders})
	}else{
		//send a user to the error page
		res.render("error",{message:"Ooops! there is no order "});
	};
});

//the codes for canceling a delivery order with post method
app.post('/api/v1/parcels/:id/cancel',(req,res)=>{
	let parcelId = parseInt(req.params.id);	
	let parcel =orders.find((order)=>order.id===parcelId); 	
	orders.splice(orders.indexOf(parcel),1);
	res.render("allDeliveryOrders",{owners:orders});
		
});

//the codes for canceling a delivery order with put method
app.put('/api/v1/parcels/:id/cancel',(req,res)=>{
	let parcelId = parseInt(req.params.id);	
	let parcel =orders.find((order)=>order.id===parcelId); 	
	orders.splice(orders.indexOf(parcel),1);
	res.render("allDeliveryOrders",{owners:orders});
		
});

//Setting the port for listening on.
let port = process.env.PORT || 3000; 
app.listen(port);
