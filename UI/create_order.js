addOrder.onclick = function(){
	const table = document.createElement("table"); 
table.innerHTML = `<tr>
		              <td>
		                From 
		              </td>
		              <td>
		                <select name="origin" id="origin">
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
		                <select name="destination" id="origin">
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
		                <input type="text" placeholder="kgs">      
		             
		           </tr>`
			
const orders = document.getElementById("order"); 

const addOrder = document.getElementById("addOrder");
	orders.appendChild(table); 
};