const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();

//set the middle ware to use for body parsing
router.use(bodyParser()); 


//declare the variable to store users. 
let users =[];
//Send users the link for signin up
//The route to fetch all users temporaryly for sining
router.get('/users',(req,res)=>{	
	res.sendFile(path.join(__dirname,"/UI/signup.html"));
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
	
	
//accept the data from users signing up
router.post('/users',(req,res)=>{
	let name = req.body.fullname;
	let email = req.body.email;
	let password = req.body.password;

	let user1 = {id:users.length +1,
		name,
		email,
		password,
		orders:[]
	};	
	users.push(user1);
	console.log(users);
	res.redirect(301,'/api/v1/');
});

//The function to validate login. 


module.exports.router = router; 
module.exports.users = users; 
