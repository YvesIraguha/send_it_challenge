//set the link of the order to be canceled. 

let cancel = document.getElementById("cancelOrder"); 
cancelOrder.onsubmit = function(){
	let id = document.getElementById('delete').value; 
	cancel.action = `http:\/\/localhost:3000/api/v1/parcels/${id}/cancel`; 
	
};