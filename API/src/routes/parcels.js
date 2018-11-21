import express from 'express';
import controllers from '../controlers/parcelControllers';
import authentication from '../helpers/authentication';

const parcelsRouter = express.Router();

// redirect to the apis when on heroku.
parcelsRouter.get('/', (req, res) => {
  res.redirect('/parcels');
});

// fetch a parcel by id
parcelsRouter.get('/parcels/:id', controllers.fetchParcelById);

// Route for accepting data from the parcel creation.
parcelsRouter.post('/parcels', controllers.createParcel);

// fetch all delivery orders made by a specific user
parcelsRouter.get('/users/:id/parcels', controllers.deliveryOrdersByUser);

// Fetch all orders made.
parcelsRouter.get('/parcels', controllers.fetchAllDeliveryOrders);

//delete all delivey orders.
parcelsRouter.delete('/parcels', controllers.deleteOrders)

// cancel a delivery order with put method
parcelsRouter.put('/parcels/:id/cancel', authentication,controllers.cancelDeliveryOrder);

//change the status of the parcel delivery order
parcelsRouter.put('/parcels/:id/status', authentication, controllers.updateStatus); 

//change the destination of a parcel delivery order
parcelsRouter.put('/parcels/:id/destination', authentication,  controllers.changeDestination);

//change the present location of the parcel 
parcelsRouter.put('/parcels/:id/presentLocation', authentication, controllers.changePresentLocation);

export default parcelsRouter;
