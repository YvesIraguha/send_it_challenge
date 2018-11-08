//define a function to check order before submitting. 

console.log('hello');

const addOrder =document.getElementById('addOrder');
addOrder.onsubmit = function(){
	
	var weight= document.querySelector('.weight');
	//check if there is a field which is not completed in the order. 
		if (weight.value==="" || isNaN(weight.value)){	
              let error = document.querySelector(".error");
               error.innerHTML =`<p>Please correctly complete orders above</p>`;
               setTimeout(function(){
                    error.innerHTML =null;
               },2500);  
               return false; 
               } else {
                    return true; 
               };
		};


let userOrders = document.getElementById("userOrders"); 

userOrders.onsubmit = function(){
     let email = document.getElementById("userEmail").value;
     userOrders.action = `/api/v1/users/${email}/parcels`;
};
