
let modal = document.getElementById('parcel-modal');
// let btns = document.getElementsByClassName('btn-edit');
let closebtn = document.getElementById('closebtn');
// console.log(btns.length);
        
// for (let btn of btns ){
//     //display the modal onclick 
//     btn.onclick = function(){
//         let name = document.querySelector('.input-name');
//         let origin = document.querySelector('.input-origin');
//         let destination = document.querySelector('.input-destination');        
//         let weight = document.querySelector('.input-weight');    
//         let id =document.querySelector('.input-id');
//         id.value = btn.parentElement.parentNode.children[0].innerHTML;
//         name.value = btn.parentElement.parentNode.children[1].innerHTML;
//         origin.value = btn.parentElement.parentNode.children[2].innerHTML;
//         destination.value = btn.parentElement.parentNode.children[3].innerHTML;
//         weight.value = btn.parentElement.parentNode.children[4].innerHTML;
//         modal.style.display="block";
//     }
// }


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
    let destination = document.querySelector('.input-destination').value;
    weight = document.querySelector('.input-weight').value;
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
// };

// console.log(document.readyState);