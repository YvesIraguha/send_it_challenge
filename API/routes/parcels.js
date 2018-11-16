//function for fetching parcel by id. 
const fetchParcelById = (req,res,orders)=>{
			let parcelId = parseInt(req.params.id); 
			let parcel = orders.filter((order)=>order.id===parcelId);
			//send it.
			if (parcel) {
				res.send(parcel); 
			}else{
				//send the error page 
				res.send({message:"Ooops! no order with that id"});
			};
			

		};


module.exports = { fetchParcelById }