
let modal = document.getElementById('parcel-modal');
let closebtn = document.getElementById('closebtn');

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

//Update the the order in the database 
let btnUpdate = document.querySelector('.btn-update');
btnUpdate.onclick = function(){
    let id =document.querySelector('.input-id').value;
    let error = document.querySelector('.update-error');
    let destination = document.querySelector('.input-destination').value;
    let data = {
        destination
    }   
    //Update the destination of the parcel in the database
    fetch(`/api/v1/parcels/${id}/destination`,{
        method:'PUT',   
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
                window.location = "/pages/user";
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
		});
}

//cancel a parcel delivery order
let btnCancel = document.querySelector('.btn-cancel');
btnCancel.onclick = function(){
    let id =document.querySelector('.input-id').value;
    let error = document.querySelector('.update-error');
    //Update the destination of the parcel in the database
    fetch(`/api/v1/parcels/${id}/cancel`,{
        method:'PUT',   
        headers : new Headers({
            "Content-Type":"application/json",
            'token': localStorage.getItem('token'),
        }),
    })
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
            if (myJson.error){                
                error.innerHTML = myJson.error;
            }else{                
                error.innerHTML = "";
                window.location = "/pages/user";
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
		});
};


