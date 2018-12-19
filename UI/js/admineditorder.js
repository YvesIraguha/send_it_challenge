
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
//Admin updating the present location of parcel delivery order 

let adminUpdateOrder = document.querySelector('.admin-btn-update');
adminUpdateOrder.onclick = function(){
    console.log("clicked");
    let origin = document.querySelector('.input-origin').value;
    let destination = document.querySelector('.input-destination').value;  
    let presentLocation = document.querySelector('.input-present-location').value;  
    let error = document.querySelector('.update-error');
    let id = document.querySelector('.input-id').value;
    console.log(id);
    let status; 
    if (origin === presentLocation){
        status = 'Notdelivered';
    }else if(destination === presentLocation){
        status = 'Delivered';
    }else{
        status = 'Intransit';
    }
    
    //Update the destination of the parcel in the database
    fetch(`/api/v1/parcels/${id}/presentlocation`,{
        method:'PUT',   
        headers : new Headers({
            "Content-Type":"application/json",
            'token': localStorage.getItem('token'),
        }),
        body:JSON.stringify({presentLocation}),
    })
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
            if (myJson.error){                
                error.innerHTML = myJson.error;
            }else{                
                error.innerHTML = "";
                console.log("done updating presentlocation");
            }	                
		})
		.catch(function(error){
			console.log(error);
			return;
        });

        fetch(`/api/v1/parcels/${id}/status`,{
            method:'PUT',   
            headers : new Headers({
                "Content-Type":"application/json",
                'token': localStorage.getItem('token'),
            }),
            body:JSON.stringify({status}),
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                if (myJson.error){                
                    error.innerHTML = myJson.error;
                }else{                
                    error.innerHTML = "";
                    console.log("Done updating status");
                    window.location = "/pages/admin";
                }	                
            })
            .catch(function(error){
                console.log(error);
                return;
            });

};