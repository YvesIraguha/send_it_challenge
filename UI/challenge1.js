// var from, to, date, status,owner ;

var deliveryOrder ={
	from:"kigali",
	to:"Gisenyi",	
	status:"Not delivered",
	weight:10,
	price:300,
	owner:"yves"
}; 

// //the function for changing the status of the order 
// const ChangeStatus = function(status){
// 	deliveryOrder.status = status; 
// };

// //the function for canceling the order.
// const cancelOrder = function(){
// 	if (deliveryOrder.status==="Not delivered"){
// 		deliveryOrder = null; 
// 	}
	
// };

// //change the destination of the order
// const changeDestination = function(newDestination){
// 	if (deliveryOrder.status==="Not delivered"){
// 		deliveryOrder.to =newDestination; 
// 	}
// };



// //Display the orders made to Admin

var adminDeliveries = document.getElementById("adminDelivary");
adminDeliveries.innerHTML = `<table>
								<tr>
									<td>From</td>
									<td>To</td>
									<td>Weight</td>
									<td>Price</td>
									<td>Name</td>
									<td>Status</td>
								</tr>
								<tr><td>${deliveryOrder.from}</td>
									<td>${deliveryOrder.to}</td>		
									<td>${deliveryOrder.weight}</td>
									<td>${deliveryOrder.price}</td>
									<td>${deliveryOrder.owner}</td>
									<td><select name="status" id="status">
											<option value="Not delivered">Not delivered</option>
											<option value="In transit">In transit</option>
											<option value="Delivered">Delivered</option>
										</select> 
									</td>			
								</tr>
							</table>`;


