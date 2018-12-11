window.onload = () => {
    //includes the codes for connecting to the server to consume API
    let displayParcel = document.querySelector('.parcels-display');
    let table = displayParcel.firstElementChild.firstElementChild;
    fetch('/api/v1/parcels',{
        method:'GET',   
        headers : new Headers({
            "Content-Type":"application/json",
            'token': localStorage.getItem('token'),
        })     
        
    })
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
            if (myJson.error){                
                error.innerHTML = myJson.error;
            }else{      
                
				for (let i =0; i<5;i++){
				let row = document.createElement("tr"); 
				row.innerHTML = `			
                                    
                                    <td></td>
                                    <td>${myJson[i].name}</td>
                                    <td>${myJson[i].origin}</td>
                                    <td>${myJson[i].destination}</td>		
                                    <td>${myJson[i].weight}</td>
                                    <td>${myJson[i].price}</td>
                                    <td>${myJson[i].presentlocation}</td>
                                    <td>${myJson[i].status}</td>
                                    <td><button class="button">Edit</button></td>			
									
								`;
				table.appendChild(row);
				}; 	
			return;
            }
        })   	                
        .catch(function(error){
			console.log(error);
			return;
		});
};