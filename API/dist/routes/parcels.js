"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _parcelControllers = _interopRequireDefault(require("../controlers/parcelControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parcelsRouter = _express.default.Router(); // redirect to the apis when on heroku.


parcelsRouter.get('/', function (req, res) {
  res.redirect('/parcels');
}); // fetch a parcel by id

parcelsRouter.get('/parcels/:id', _parcelControllers.default.fetchParcelById); // Route for accepting data from the parcel creation.

parcelsRouter.post('/parcels', _parcelControllers.default.createParcel); // fetch all delivery orders made by a specific user

parcelsRouter.get('/users/:id/parcels', _parcelControllers.default.deliveryOrdersByUser); // Fetch all orders made.

parcelsRouter.get('/parcels', _parcelControllers.default.fetchAllDeliveryOrders); // cancel a delivery order with put method

parcelsRouter.put('/parcels/:id/cancel', _parcelControllers.default.cancelDeliveryOrder);
var _default = parcelsRouter;
exports.default = _default;