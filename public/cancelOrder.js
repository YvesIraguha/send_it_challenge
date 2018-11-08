//set the link of the order to be canceled. 

let cancel = document.getElementById("cancelOrder"); 
cancelOrder.onsubmit = function(){
	let id = document.getElementById('delete').value; 
	cancel.action = `/api/v1/parcels/${id}/cancel`; 
	
};