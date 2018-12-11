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
}]; 

async function fetchParcels() {
	fetch('/api/v1/parcels')
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {			
				// //Display the orders made to Admin
				var adminDeliveries = document.getElementById("adminDelivary");
				for (let i =0; i<myJson.length;i++){
				const table = document.createElement("tr"); 
				table.innerHTML = `							
									<tr>
										<td>${myJson[i].userid}</td>
										<td>${myJson[i].origin}</td>
										<td>${myJson[i].destination}</td>		
										<td>${myJson[i].weight}</td>
										<td>${myJson[i].price}</td>
										<td>${myJson[i].presentlocation}</td>
										<td>${myJson[i].status}</td>									
									</tr>
								`;

				adminDeliveries.appendChild(table);
				}; 	
			return;
		})
		.catch(function(error){
			console.log(error);
			return;
		});
};





window.onload = fetchParcels();