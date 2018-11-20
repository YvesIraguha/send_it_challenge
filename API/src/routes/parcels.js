import express from 'express';
import controllers from '../controlers/parcelControllers';

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
// cancel a delivery order with put method
parcelsRouter.put('/parcels/:id/cancel', controllers.cancelDeliveryOrder);

export default parcelsRouter;
