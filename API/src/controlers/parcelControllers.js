import Parcel from '../models/parcel';
const controllers = {};
//declare the variable to store orders. 
let orders = [];

//Dealing with parcels.
const fetchParcelById = (req,res)=>{
			let parcelId = parseInt(req.params.id); 
			let parcel = orders.find((order)=>order.id===parcelId);
			//send it.
			if (parcel) {
				res.send(parcel); 
			}else{
				//send the error page 
				res.send({message:"Ooops! no order with that id"});
			};
		};

//create parcel 
const createParcel = (req,res)=>{
		let { name,origin, destination, weight, userId } = req.body;	
		let id = orders.length +1;
		if (!origin || !destination || !userId || !weight || isNaN(weight)){
			res.send({message:"the order should have origin, destination, userId, and weight of type number fields"});
		}else{
			let order = new Parcel(id,name,origin, destination, weight, userId);		 
			orders.push(order);
			res.send(order);
		};		
		
}

//Fetch a delivery order by a user. 
const deliveryOrdersByUser =(req,res)=>{
	let userId = parseInt(req.params.id); 
	//find the order where the owner is equal to the email
	let specificOrders = orders.filter((item) => item.userId=== userId);
	if (specificOrders){
		res.send(specificOrders);
	}else{
		//Redirect to error page
		res.send({message:"There is no order of the user you specified"});
	};
};

//fetch all delivery orders
const fetchAllDeliveryOrders = (req,res)=>{
	if (orders.length>0){
		res.send(orders);
	}else{
		//send a user the error message; 
		res.send({message:"Ooops! there is no order at the moment "});
	};
};

//cancel a delivery order
const cancelDeliveryOrder = (req,res)=>{
	let parcelId = parseInt(req.params.id); 
	let parcel =orders.find((order)=>order.id===parcelId); 	
	if (parcel){
		orders.splice(orders.indexOf(parcel),1);
		res.send(parcel);
	}else{
		res.send({message:"There is no parcel with that Id"});
	};	
		
};

controllers.fetchParcelById = fetchParcelById; 
controllers.fetchAllDeliveryOrders=fetchAllDeliveryOrders; 
controllers.cancelDeliveryOrder = cancelDeliveryOrder;
controllers.createParcel = createParcel; 
controllers.deliveryOrdersByUser = deliveryOrdersByUser; 


export default controllers;