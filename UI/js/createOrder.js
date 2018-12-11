let weight = document.querySelector('.input-weight');
let button = document.querySelector('#add');
let form = document.querySelector('#form-order');
weight.oninput = () => {
    let price = document.querySelector('.input-price');
    if ( Number(weight.value)){
        price.value = parseFloat(weight.value)*100;
    }else{
        price.value =0;
    }    
};

form.onsubmit = () => {
    let name = document.querySelector('.input-name').value;
    let origin = document.querySelector('.input-origin').value;
    let destination = document.querySelector('.input-destination').value;
    weight = document.querySelector('.input-weight').value;
    let data = {
        name,origin,destination,weight,
    }   
    //includes the codes for connecting to the server to consume API
    fetch('/api/v1/parcels',{
        method:'POST',   
        headers : new Headers({
            "Content-Type":"application/json",
            'token': localStorage.getItem('token'),
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
                window.location = "/pages/";
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
		});
}