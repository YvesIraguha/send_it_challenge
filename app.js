const parcels = require('./parcels');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session")

//instanitiate the app; 
const app = express(); 
//set the middle ware to use for body parsing
app.use(bodyParser()); 
app.use(cookieParser());
app.use(session({secret:"@yvesiraguha"}));
app.set('view engine', 'pug');
app.set('views','./views');
//set the route of users. 
//app.use('/api/v1',userRoute);
//set the route for parcels
app.use('/api/v1',parcels);

//Send the home page. 
app.get('/api/v1/',(req,res)=>{
	res.sendFile(path.join(__dirname,"/UI/index.html"));
});

//declare the variable to store users. 
let users =[];
//Send users the link for signin up
//The route to fetch all users temporaryly for signing up 
app.get('/api/v1/users/signup',(req,res)=>{	
	res.render("signup");
});


//the function for checking if a user is looged in. 

const loginRequired = (req,res)=>{
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
	let password = req.body.password;

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


//The the login page; 
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

app.get("/api/v1/signout",(req,res)=>{
	req.session.destroy(()=>{
			console.log('A user loged out');			
	});
	res.redirect('/api/v1/users/signin')
});






//XXXXdefine the route for admin to change the parcel and later confirm the current location of each order. 

//Setting the port for listening on.
let port = process.env.PORT || 3000; 
app.listen(port);
console.log(`App listening on port ${port}...`);
