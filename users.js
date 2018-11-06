const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();

//declare the variable to store users. 
let users =[];
//Send users the link for signin up
router.get('/users',(req,res)=>{	
	res.sendFile(path.join(__dirname,"/UI/signup.html"));
});

//acdcept the data from users
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


module.exports = router; 