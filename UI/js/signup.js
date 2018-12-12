//Insert the data into the database
let button = document.querySelector('.signup');      
button.onclick = function() {
    let firstname = document.querySelector('.input-firstname').value;
    let email = document.querySelector('.input-email').value;
    let password=document.querySelector('.input-password').value;   
    let error = document.querySelector('.error');
    let data = {
        name:firstname,
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
                window.location = "/pages/";
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
		});
};