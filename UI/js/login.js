let modal = document.getElementById('login-modal');
let btn = document.getElementById('open-login');
let closebtn = document.getElementById('closebtn');

//display the modal onclick 
btn.onclick = function(){   
    modal.style.display="block";
}

// When a user clicks on closebtn, close the modal 
closebtn.onclick = function(){
    modal.style.display = "none";
}

//When a user clicks anywhere outside of the modal, close it. 

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display ="none";
    }
}

//consume the api for log in the database
let btnlogin = document.querySelector('.btn-login');      
btnlogin.onclick = function() {
    let email = document.querySelector('.input-email-login').value;
    let password=document.querySelector('.input-password-login').value;   
    let error = document.querySelector('.login-error');
    let data = {        
        email,
        password,
    };    

    fetch('/api/v1/users/signin',{
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
                return;                
            }else{                
                error.innerHTML = "";
                localStorage.setItem("token",myJson.token);
                localStorage.setItem('userid',myJson.id);
                localStorage.setItem('username',myJson.firstname);
                window.location = "/pages/user";
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
		});
};