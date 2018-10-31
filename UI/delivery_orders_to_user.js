//Display the delivery orders made by a user to a user. 
var deliveryOrder ={
	from:"kigali",
	to:"Gisenyi",	
	status:"Not delivered",
	weight:10,
	price:300,
	owner:"yves"
}; 
var deliveries = document.getElementById("delivery");
deliveries.innerHTML =`<table>
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
								<td>${deliveryOrder.status}</td>
								<td><button>Cancel</button></td>
							</tr>
						</table>`;
