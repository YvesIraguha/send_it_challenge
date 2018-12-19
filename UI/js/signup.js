//Insert the data into the database
let button = document.querySelector('#form-signup');      
button.onsubmit = function() {
    let firstname = document.querySelector('.input-firstname').value;
    let lastname = document.querySelector('.input-lastname').value;
    let email = document.querySelector('.input-email').value;
    let phone=document.querySelector('.input-phone').value; 
    let password=document.querySelector('.input-password').value;  
    let error = document.querySelector('.error');    
    if (verify(firstname,lastname,phone,email,password)){
        return;
    }else{
    
    let data = {
        firstname,
        lastname,
        phone,
        email,
        password
    };

    fetch('/api/v1/users/signup',{
        method:'POST',   
        headers : new Headers({
            "Content-Type":"application/json",
        }),     
        body:JSON.stringify(data),
    })
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
            if (myJson.error){                
                error.innerHTML = myJson.error;
            }else{                
                error.innerHTML = "";
                localStorage.setItem("token",myJson.token);
                localStorage.setItem("userid",myJson.response.id);
                localStorage.setItem("username",myJson.response.name);
                window.location = "/pages/user";
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
        });
    };
};


function verify(firstname,lastname,phone,email,password){
    let error = document.querySelector('.error');
    let nameFormat = /^[a-z ,.'-]+$/i;
    let emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    let phoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    if (!nameFormat.test(firstname) || !nameFormat.test(lastname)){
        error.innerHTML = "Name should be similar to the example provided";
        return false;
    }else if(firstname.length <3 || lastname.length < 3){
        error.innerHTML = "Name should be at least 3 characters long";
        return false;
    }
    if (!phoneNumber.test(phone)){
        error.innerHTML = "Phone number should have the format (+250)712233420";
        return false;
    }
    if (password.length < 3){
        error.innerHTML = "Please create strong password, at least 3 characters long";
        return false;
    }
    if (!emailFormat.test(email)){
        error.innerHTML = "Email shoulld look like test@gmail.com";
        return false;
    }
}