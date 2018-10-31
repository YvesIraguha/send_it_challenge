//Display the delivery orders made by a user to a user. 

const deliveryOrder = [{
	from:"kigali",
	to:"Gisenyi",	
	status:"Not delivered",
	weight:10,
	price:300,
	owner:"Janvier"
},
{
	from:"kigali",
	to:"Rwanda",	
	status:"Not delivered",
	weight:30,
	price:1000,
	owner:"Bruno"
},{
	from:"Burundi",
	to:"Nigeria",	
	status:"In transit",
	weight:50,
	price:800,
	owner:"Uwineza"
},{
	from:"Uganda",
	to:"Europe",	
	status:"delivered",
	weight:10,
	price:300,
	owner:"Allelua"
},{
	from:"kigali",
	to:"Rwanda",	
	status:"Not delivered",
	weight:30,
	price:1000,
	owner:"Bruno"
},{
	from:"Burundi",
	to:"Nigeria",	
	status:"In transit",
	weight:50,
	price:800,
	owner:"Uwineza"
}]; 

// Declare variables for storing different orders according to their status.

var inTransit = 0;
var notDelivered =0;
var delivered =0; 


const deliveries = document.getElementById("delivary");
for (let i =0; i<deliveryOrder.length;i++){
const table = document.createElement("tr"); 
table.innerHTML =`							
					<tr>
						<td>${deliveryOrder[i].from}</td>
						<td>${deliveryOrder[i].to}</td>		
						<td>${deliveryOrder[i].weight}</td>
						<td>${deliveryOrder[i].price}</td>
						<td>${deliveryOrder[i].owner}</td>
						<td>${deliveryOrder[i].status}</td>
						<td><button class="cancel">Cancel</button></td>
					</tr>
				`;
	deliveries.appendChild(table);

	if (deliveryOrder[i].status === "In transit"){
		inTransit ++; 
	}else if(deliveryOrder[i].status ==="Not delivered"){
		notDelivered++; 
	}else{
		delivered++; 
	};
}; 


//Display the informations about orders made in userProfile div. 

var userProfile = document.getElementById("userProfile");
userProfile.innerHTML = `<table>
							<tr>
								<td>Total orders made</td>
								<td>${inTransit + delivered + notDelivered}</td>
							</tr>
							<tr>
								<td>Orders in Transit</td>
								<td>${inTransit}</td>
							</tr>
							<tr>
								<td>Orders not delivered</td>
								<td>${notDelivered}</td>
							</tr>
							<tr>
								<td>Orders delivered</td>
								<td>${delivered}</td>
							</tr>
						</table>`;


//canel the delivery order if it is not delivered
var buttons =document.querySelectorAll('.cancel');

for (let i=0;i<buttons.length;i++){
	buttons[i].onclick = function(){
		var parent = buttons[i].parentNode.parentNode;
		var status = parent.children[5].innerHTML;		
		var grandParent = parent.parentNode; 
		if (status ==="Not delivered"){
			grandParent.removeChild(parent); 
		}else{
			alert("you can not cancel an order in processing"); 
		};
			
		
		
	};
};
// button.onclick = function(){
// 	if (deliveryOrder.status === "Not delivered"){
// const div = document.getElementById("delivery");
//  div.innerHTML="";
// }
// };