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
app.use(express.static('public'))
//set the route of users. 
//app.use('/api/v1',userRoute);
//set the route for parcels
//app.use('/api/v1',parcels);

//Send the home page. 
app.get('/api/v1/',(req,res)=>{
	res.render("createOrder"); 
});

//declare the variable to store users. 
let users =[];
//Send users the link for signin up
//The route to fetch all users temporaryly for signing up 
app.get('/api/v1/users/signup',(req,res)=>{	
	res.render("signup");
});


//the function for checking if a user is looged in. 

const loginRequired = (req,res,next)=>{
 						if (req.session.user){
 							next(); 
 						}else{
 							res.end("Not looged in");
 						};
            };
	

//accept the data from users signing up
app.post('/api/v1/users/signup',(req,res)=>{
	let name = req.body.fullname;
	let email = req.body.email;
	let password = req.body.password[0];

	let user1 = {id:users.length +1,
		name,
		email,
		password,
		orders:[]
	};	
	let specificUser = users.find((user)=>user.email === email);
	if (specificUser){
		//XXX include the link to sign in with a message;
		res.end("account already taken")
		return; 
	}else{
			users.push(user1);
			req.session.user =user1; 
			console.log(users);
			res.redirect(301,'/api/v1/');
		}; 
});


//The login page; 
app.get('/api/v1/users/signin',(req,res)=>{
	res.render("signin")
});


//the login data 
app.post('/api/v1/users/signin',(req,res)=>{
	let specificUser = users.find((user)=>{
				if (user.email===req.body.email && user.password===req.body.email){
					return user; 
				};
			});

	if(specificUser){
		req.session.user = specificUser; 
		//redirect the user to the next page. 
		res.redirect("/api/v1/"); 


	}; 

	res.end("Invalid login"); 

});

//add the link for singing out on the create order page. 
app.get("/api/v1/signout",(req,res)=>{
	req.session.destroy(()=>{
			console.log('A user loged out');			
	});
	res.redirect('/api/v1/users/signin')
});


//Dealing with parcels. 

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
app.get('/api/v1/parcels/:id',(req,res)=>{
			let parcelId = req.params.id; 
			let parcel = specificParcel(parcelId);
			
			res.end(parcel); 

		});



//Route for accepting data from the parcel creation. 
app.post('/api/v1/',loginRequired,(req,res)=>{
		let origin = req.body.origin; 
		let destination = req.body.destination; 
		let weight = req.body.weight;
		let price = parseFloat(weight)*100;
		let order = {
			date:1,
			origin,destination,weight,price:`${price}Rwf`
		};
		let user = users[0]; 
		user.orders.push(order); 
		console.log(order);
		console.log(users);
		//XXXredirect a user to the pages of orders he created
		res.render("deliveryOrderByUser",{owner:user});
});

 
//fetch all delivery orders made by a specific user 

app.get("/api/v1/users/:id/parcels",(req,res)=>{
	let userId = parseInt(req.params.id);
	let specificUser = users.find((item) => item.id === userId);
	//XXXthese codes should be in the template
	if (specificUser){
		for (let parcel of specificUser.orders){

		};
	};
});


//Fetch all orders made. 
app.get("/api/v1/parcels",(req,res)=>{
	if (users.length>0){
		res.render("allDeliveryOrders",{owners:users})
	}else{
		res.end("there is no order currently")
	};
});

//the codes for canceling a delivery order. 

app.put('/api/v1/parcels/:id/cancel',(req,res)=>{
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



//XXXXdefine the route for admin to change the parcel and later confirm the current location of each order. 

//Setting the port for listening on.
let port = process.env.PORT || 3000; 
app.listen(port);
console.log(`App listening on port ${port}...`);
