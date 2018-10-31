// creat the array of objects for demonstration. 

var deliveryOrder =[{
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
}]; 


// //Display the orders made to Admin

var adminDeliveries = document.getElementById("adminDelivary");

for (let i =0; i<deliveryOrder.length;i++){
const table = document.createElement("table"); 
table.innerHTML = `<table>								
					<tr>
						<td>${deliveryOrder[i].from}</td>
						<td>${deliveryOrder[i].to}</td>		
						<td>${deliveryOrder[i].weight}</td>
						<td>${deliveryOrder[i].price}</td>
						<td>${deliveryOrder[i].owner}</td>
						<td><select name="status" id="status">
								<option value="Not delivered">Not delivered</option>
								<option value="In transit">In transit</option>
								<option value="Delivered">Delivered</option>
							</select> 
						</td>			
					</tr>
				</table>`;

adminDeliveries.appendChild(table);
}; 