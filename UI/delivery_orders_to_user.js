//Display the delivery orders made by a user to a user. 

let origin = document.getElementById("origin").value; 
let destination = document.getElementById("destination").value; 
let weight= document.getElementById("weight").value; 

const deliveryOrder ={
	from:"kigali",
	to:"Gisenyi",	
	status:"Delivered",
	weight:10,
	price:300,
	owner:"yves"
}; 
const deliveries = document.getElementById("delivary");
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
								<td><button id="cancel">Cancel</button></td>
							</tr>
						</table>`;



//canel the delivery order if it is not delivered
var button =document.querySelector('#cancel');
button.onclick = function(){
	if (deliveryOrder.status === "Not delivered"){
const div = document.getElementById("delivery");
 div.innerHTML="";
}
};