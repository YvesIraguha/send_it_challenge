"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parcel = _interopRequireDefault(require("../models/parcel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = {}; // declare the variable to store orders.

var orders = []; // fetch a parcel

var fetchParcelById = function fetchParcelById(req, res) {
  var parcelId = parseInt(req.params.id);
  var parcel = orders.find(function (order) {
    return order.id === parcelId;
  }); // send it.

  if (parcel) {
    res.status(200).send(parcel);
  } else {
    // send the error page
    res.send({
      message: 'Ooops! no order with that id'
    });
  }
}; // create parcel


var createParcel = function createParcel(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      origin = _req$body.origin,
      destination = _req$body.destination,
      weight = _req$body.weight,
      userId = _req$body.userId;
  var existingOrder = orders.find(function (order) {
    return order.name === name;
  });

  if (existingOrder === undefined) {
    var id = orders.length + 1;
    var fieldsValidation = /[a-zA-Z]+/;

    if (!origin) {
      res.send({
        message: 'The order should have the origin'
      });
    } else if (!name) {
      res.send({
        message: 'The order should have a name'
      });
    } else if (!destination) {
      res.send({
        message: 'The order should have the destination'
      });
    } else if (!userId) {
      res.send({
        message: 'The order should have the user id'
      });
    } else if (!weight) {
      res.send({
        message: 'The order should have the weight'
      });
    } else if (isNaN(weight)) {
      res.send({
        message: 'Invalid weight, the weight should be number'
      });
    } else if (!fieldsValidation.test(name)) {
      res.send({
        message: 'Invalid name, the name should start with a letter'
      });
    } else if (!fieldsValidation.test(origin)) {
      res.send({
        message: 'Invalid origin, the origin should be a place'
      });
    } else if (!fieldsValidation.test(destination)) {
      res.send({
        message: 'Invalid destination, the destination should be a place'
      });
    } else {
      var order = new _parcel.default(id, name, origin, destination, weight, userId);
      orders.push(order);
      res.status(201).send({
        message: 'The order was successfully created',
        order: order
      });
    }
  } else {
    res.send({
      message: 'Cannot create two orders with the same name'
    });
  }
}; // Fetch a delivery order by a user.


var deliveryOrdersByUser = function deliveryOrdersByUser(req, res) {
  var userId = parseInt(req.params.id); // find the order where the owner is equal to the email

  var specificOrders = orders.filter(function (item) {
    return item.userId === userId;
  });

  if (specificOrders) {
    res.send(specificOrders);
  } else {
    // Redirect to error page
    res.send({
      message: 'There is no order of the user you specified'
    });
  }
}; // fetch all delivery orders


var fetchAllDeliveryOrders = function fetchAllDeliveryOrders(req, res) {
  res.send(orders);
}; // cancel a delivery order


var cancelDeliveryOrder = function cancelDeliveryOrder(req, res) {
  var parcelId = parseInt(req.params.id);
  var parcel = orders.find(function (order) {
    return order.id === parcelId;
  });

  if (parcel) {
    orders.splice(orders.indexOf(parcel), 1);
    parcel.status = 'Canceled';
    orders.push(parcel);
    res.send({
      message: 'Order successfully canceled',
      parcel: parcel
    });
  } else {
    res.send({
      message: 'Invalid Id'
    });
  }
};

controllers.fetchParcelById = fetchParcelById;
controllers.fetchAllDeliveryOrders = fetchAllDeliveryOrders;
controllers.cancelDeliveryOrder = cancelDeliveryOrder;
controllers.createParcel = createParcel;
controllers.deliveryOrdersByUser = deliveryOrdersByUser;
var _default = controllers;
exports.default = _default;