const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const router = express.Router();

//set the middle ware to use for body parsing
router.use(bodyParser()); 
router.use(cookieParser());
router.use(session({secret:"@yvesiraguha"}));


//declare the variable to store users. 
let users =[];
//Send users the link for signin up
//The route to fetch all users temporaryly for signing up 
router.get('/users/signup',(req,res)=>{	
	res.render("signup");
});
//get a specific user by id, this is not necessary
router.get('/users/:id',(req,res)=>{	
	let userId = parseInt(req.params.id);
	let specificUser = users.find((item) => item.id === userId);
	if (specificUser){
		
		res.end(`<h1>I got him</h1><h2>${specificUser.id}, I am ${specificUser.name},my email is ${specificUser.email}`);
	}else{
		console.log(userId);
		res.end(`<h1>No user of that name</h1>`);
	};
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
router.post('/users/signup',(req,res)=>{
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
	}else{
			users.push(user1);
			req.session.user =user1; 
			console.log(users);
			res.redirect(301,'/api/v1/');
		}; 
});

//The the login page; 
router.get('/users/signin',(req,res)=>{
	res.render("signin")
});

//the login data 
router.post('/users/signin',(req,res)=>{
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

router.get("/signout",(req,res)=>{
	req.session.destroy(()=>{
			console.log('A user loged out');			
	});
	res.redirect('/users/signin')
});


module.exports.router = router; 
module.exports.users = users; 
