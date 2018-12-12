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
    let email = document.querySelector('.input-email').value;
    let password=document.querySelector('.input-password').value;   
    let error = document.querySelector('.error');
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
                localStorage.setItem('username',myJson.name);
                window.location = "/pages/";
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
		});
};