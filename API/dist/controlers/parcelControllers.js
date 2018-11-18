"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parcel = _interopRequireDefault(require("../models/parcel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = {}; //declare the variable to store orders. 

var orders = []; //fetch a parcel 

var fetchParcelById = function fetchParcelById(req, res) {
  var parcelId = parseInt(req.params.id);
  var parcel = orders.find(function (order) {
    return order.id === parcelId;
  }); //send it.

  if (parcel) {
    res.status(200).send(parcel);
  } else {
    //send the error page 
    res.send({
      message: "Ooops! no order with that id"
    });
  }

  ;
}; //create parcel 


var createParcel = function createParcel(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      origin = _req$body.origin,
      destination = _req$body.destination,
      weight = _req$body.weight,
      userId = _req$body.userId;
  var id = orders.length + 1;

  if (!origin || !destination || !userId || !weight || isNaN(weight)) {
    res.send({
      message: "the order should have origin, destination, userId, and weight of type number fields"
    });
  } else {
    var order = new _parcel.default(id, name, origin, destination, weight, userId);
    orders.push(order);
    res.send(order);
  }

  ;
}; //Fetch a delivery order by a user. 


var deliveryOrdersByUser = function deliveryOrdersByUser(req, res) {
  var userId = parseInt(req.params.id); //find the order where the owner is equal to the email

  var specificOrders = orders.filter(function (item) {
    return item.userId === userId;
  });

  if (specificOrders) {
    res.send(specificOrders);
  } else {
    //Redirect to error page
    res.send({
      message: "There is no order of the user you specified"
    });
  }

  ;
}; //fetch all delivery orders


var fetchAllDeliveryOrders = function fetchAllDeliveryOrders(req, res) {
  if (orders.length > 0) {
    res.send(orders);
  } else {
    //send a user the error message; 
    res.send({
      message: "Ooops! there is no order at the moment "
    });
  }

  ;
}; //cancel a delivery order


var cancelDeliveryOrder = function cancelDeliveryOrder(req, res) {
  var parcelId = parseInt(req.params.id);
  var parcel = orders.find(function (order) {
    return order.id === parcelId;
  });

  if (parcel) {
    orders.splice(orders.indexOf(parcel), 1);
    res.send(parcel);
  } else {
    res.send({
      message: "There is no parcel with that Id"
    });
  }

  ;
};

controllers.fetchParcelById = fetchParcelById;
controllers.fetchAllDeliveryOrders = fetchAllDeliveryOrders;
controllers.cancelDeliveryOrder = cancelDeliveryOrder;
controllers.createParcel = createParcel;
controllers.deliveryOrdersByUser = deliveryOrdersByUser;
var _default = controllers;
exports.default = _default;