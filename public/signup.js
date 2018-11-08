//check if the order made is valid.

const signUp = document.getElementById("signupvalid");

signUp.onsubmit =function(){
     let email = document.getElementById("email").value;
     let passwords = document.querySelectorAll(".password");
     let emailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/gi; 
     let error = document.getElementById("signuperror");
     if (!emailFormat.test(email)){
          error.innerHTML =`<p>Invalid email </p>`;
          setTimeout(function(){
          error.innerHTML =null;
          },2500);           
          return false;
     }else if(passwords[0].value !== passwords[1].value) {
          
          error.innerHTML ="<p> The password does not match should match</p>";
          setTimeout(function(){
          error.innerHTML =null;
          },2500); 
          return false;
          } else if(passwords[0].value.length<5){
          error.innerHTML =`<p>The password should have more than 5 characters</p>`
          setTimeout(function(){
          error.innerHTML =null;
          },2500); 
          return false; 
     }else{
          return true; 
     };                                              
     
     };
     

