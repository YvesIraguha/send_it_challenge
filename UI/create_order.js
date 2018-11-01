
//function for adding a template to create an order. if the created template was completed.
addOrder.onclick = function(){
	const error = document.getElementById("error"); 
	const div =document.getElementById('order');
	var weights = document.querySelectorAll('.weight');
	//check if there is a field which is not completed in the order. 
	for (let weight of weights){
		if (weight.value===""){	
		error.innerHTML =`<p>Please complete the first order</p>`
		console.log("you cannot continue"); 
		return false; 
		};
	};

		error.innerHTML="";
		const table = document.createElement("table"); 
		table.innerHTML = `<tr>
			              <td>
			                From 
			              </td>
			              <td>
			                <select name="origin" class="origin">
			                  <option value="Rwanda">Rwanda</option>
			                  <option value="Burundi">Burundi</option>
			                  <option value="Uganda">Uganda</option>
			                  <option value="DRC">DRC</option>
			                  <option value="South Africa">South African</option>
			                  <option value="Nigeria">Negeria</option>
			                </select>
			              </td>
			              <td>
			                To
			              </td>
			              <td>
			                <select name="destination" class="destination">
			                  <option value="Rwanda">Rwanda</option>
			                  <option value="Burundi">Burundi</option>
			                  <option value="Uganda">Uganda</option>
			                  <option value="DRC">DRC</option>
			                  <option value="South Africa">South African</option>
			                  <option value="Nigeria">Negeria</option>
			                </select>
			              </td>
			              <td>
			                Weight (kgs)
			              </td>
			              <td>
			                <input type="text" placeholder="kgs" class="weight"> 	             
			           </tr>`
				
	const orders = document.getElementById("order"); 

	const addOrder = document.getElementById("addOrder");
		orders.appendChild(table); 
	
		};

//calculate the quotes to pay depending on the weight of parcel 
var quotes= document.getElementById('quotes');
quotes.onclick = function(){
	var totalQuotes = document.getElementById("totalQuotes");
	var weights = document.querySelectorAll('.weight');
	var totalWeight =0; 
	for (let weight of weights){
			if (weight.value==="" || isNaN(weight.value)){
				totalQuotes.innerHTML = `<p><strong>Please type the correct weight</strong></p>`;
				return false; 
			}else{
				totalWeight += parseFloat(weight.value);
				};
			};
	
	    totalQuotes.innerHTML = `<p><strong>You will have to pay ${totalWeight*100}Rwf</strong></p>`	
	};
