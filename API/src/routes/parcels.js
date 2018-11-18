import express from 'express'; 
import Parcel from '../models/parcel';
import controllers from "../controlers/parcelControllers";
const parcelsRouter = express.Router(); 


//declare the variable to store orders. 
let orders = [];

//redirect to the apis when on heroku. 
parcelsRouter.get('/',(req,res)=>{
	res.redirect("/v1/parcels");
});

//fetch a parcel by id
parcelsRouter.get('/v1/parcels/:id',controllers.fetchParcelById)
//Route for accepting data from the parcel creation. 
parcelsRouter.post('/v1/parcels',controllers.createParcel); 
//fetch all delivery orders made by a specific user
parcelsRouter.get("/v1/users/:id/parcels",controllers.deliveryOrdersByUser);
//Fetch all orders made. 
parcelsRouter.get("/v1/parcels",controllers.fetchAllDeliveryOrders);
//the codes for canceling a delivery order with put method
parcelsRouter.put('/v1/parcels/:id/cancel',controllers.cancelDeliveryOrder);

export default parcelsRouter;