"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parcel = _interopRequireDefault(require("../models/parcel"));

var _sqlQueries = _interopRequireDefault(require("../db/sqlQueries"));

var _connection = _interopRequireDefault(require("../db/connection"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = {}; // declare the variable to store orders.

var orders = []; // fetch a parcel

var fetchParcelById = function fetchParcelById(req, res) {
  var parcelId = parseInt(req.params.id);
  var parcel = orders.find(function (order) {
    return order.id === parcelId;
  }); //const parcel = execute(queries.getSpecificParcel,[parcelId]);
  // send it.

  if (parcel) {
    res.status(200).send(parcel);
  } else {
    // send the error page
    res.status(400).send({
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

    if (!origin || !name || !destination || !userId || !weight) {
      res.send({
        message: 'Please provide all the required fields'
      });
    } else if (!Number(weight)) {
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
      var order = new _parcel.default(id, name, origin, destination, weight, userId); //execute(queries.insertIntoDatabase,[order.id,order.name,order.origin,order.destination,order.weight,order.userId,order.price]); 

      orders.push(order);
      res.status(200).send({
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
  }); //const specificOrders = execute(queries.ordersForUser,[userId])

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
  //let orders = execute(`SELECT * FROM parcels`);
  res.send(orders);
}; // cancel a delivery order


var cancelDeliveryOrder = function cancelDeliveryOrder(req, res) {
  var parcelId = parseInt(req.params.id);
  var parcel = orders.find(function (order) {
    return order.id === parcelId;
  }); //const parcel = execute(queries.statusUpdate,[parcelId,'Cancelled']);

  if (parcel) {
    orders.splice(orders.indexOf(parcel), 1);
    parcel.status = 'Cancelled';
    orders.push(parcel);
    res.status(200).send({
      message: 'Order successfully cancelled',
      parcel: parcel
    });
  } else {
    res.status(400).send({
      message: 'Invalid Id'
    });
  }
}; // delete all delivery orders


var deleteOrders = function deleteOrders(req, res) {
  //execute(`DROP TABLE parcels`);
  orders = [];
  res.status(200).send({
    message: 'Orders deleted successfully'
  });
}; // change the status of a parcel delivery order


var updateStatus = function updateStatus(req, res) {
  var orderid = parseInt(req.params.id);
  var status = req.body.status;
  var parcel = orders.find(function (item) {
    return item.id === orderid;
  }); //const parcel = execute(queries.statusUpdate,[orderid,status]);

  if (parcel !== undefined) {
    orders.splice(orders.indexOf(parcel), 1);
    parcel.status = status;
    orders.push(parcel);
    res.status(200).send({
      message: 'The parcel was updated successfully',
      parcel: parcel
    });
  } else {
    res.status(200).send({
      message: 'No order with that id'
    });
  }
}; // change the location of a destination delivery order


var changeDestination = function changeDestination(req, res) {
  var _parseInt = parseInt(req.params.id),
      id = _parseInt.id;

  var destination = req.body.destination;
  var parcel = orders.find(function (item) {
    return item.id === id;
  }); //const parcel = execute(queries.destinationUpdate,[id, destination])

  if (parcel !== undefined) {
    orders.splice(orders.indexOf(parcel), 1);
    parcel.destination = destination;
    orders.push(parcel);
    res.status(200).send({
      message: 'The parcel was updated successfully',
      parcel: parcel
    });
  } else {
    res.status(200).send({
      message: 'No order with that id'
    });
  }
}; // change the present location of a parcel delivery order


var changePresentLocation = function changePresentLocation(req, res) {
  var _parseInt2 = parseInt(req.params.id),
      id = _parseInt2.id;

  var presentLocation = req.body.presentLocation;
  var parcel = orders.find(function (item) {
    return item.id === id;
  }); //let parcel = execute(queries.presentLocationUpdate,[id,presentLocation])

  if (parcel) {
    orders.splice(orders.indexOf(parcel), 1);
    orders.push(parcel);
    res.status(200).send({
      message: 'The parcel was updated successfully',
      parcel: parcel
    });
  } else {
    res.status(200).send({
      message: 'No order with that id'
    });
  }
};

controllers.fetchParcelById = fetchParcelById;
controllers.fetchAllDeliveryOrders = fetchAllDeliveryOrders;
controllers.cancelDeliveryOrder = cancelDeliveryOrder;
controllers.createParcel = createParcel;
controllers.deliveryOrdersByUser = deliveryOrdersByUser;
controllers.deleteOrders = deleteOrders;
controllers.changeDestination = changeDestination;
controllers.changePresentLocation = changePresentLocation;
controllers.updateStatus = updateStatus;
var _default = controllers;
exports.default = _default;