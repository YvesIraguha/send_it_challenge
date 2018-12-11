'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcelControllers = require('../controlers/parcelControllers');

var _parcelControllers2 = _interopRequireDefault(_parcelControllers);

var _authentication = require('../helpers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parcelsRouter = _express2.default.Router();

// redirect to the apis when on heroku.
parcelsRouter.get('/', function (req, res) {
  res.redirect('/parcels');
});

// fetch a parcel by id
parcelsRouter.get('/parcels/:id', _parcelControllers2.default.fetchParcelById);

// Route for accepting data from the parcel creation.
parcelsRouter.post('/parcels', _authentication2.default.accessTokenRequired, _parcelControllers2.default.createParcel);

// fetch all delivery orders made by a specific user
parcelsRouter.get('/users/:id/parcels', _parcelControllers2.default.deliveryOrdersByUser);

// Fetch all orders made.
parcelsRouter.get('/parcels', _parcelControllers2.default.fetchAllDeliveryOrders);

// delete all delivey orders.
parcelsRouter.delete('/parcels', _parcelControllers2.default.deleteOrders);

// cancel a delivery order 
parcelsRouter.put('/parcels/:id/cancel', _authentication2.default.accessTokenRequired, _parcelControllers2.default.cancelDeliveryOrder);

// change the status of the parcel delivery order
parcelsRouter.put('/parcels/:id/status', _authentication2.default.adminTokenRequired, _parcelControllers2.default.updateStatus);

// change the destination of a parcel delivery order
parcelsRouter.put('/parcels/:id/destination', _authentication2.default.accessTokenRequired, _parcelControllers2.default.changeDestination);

// change the present location of the parcel
parcelsRouter.put('/parcels/:id/presentLocation', _authentication2.default.adminTokenRequired, _parcelControllers2.default.changePresentLocation);

exports.default = parcelsRouter;