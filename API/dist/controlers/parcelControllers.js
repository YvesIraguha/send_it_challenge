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
  var parcelId = parseInt(req.params.id); //const parcel = orders.find(order => order.id === parcelId);

  var parcel = (0, _connection.default)(_sqlQueries.default.getSpecificParcel, [parcelId]);
  parcel.then(function (response) {
    // send it.
    if (response) {
      res.status(200).send(response);
    } else {
      // send the error page
      res.status(400).send({
        message: 'Ooops! no order with that id'
      });
    }
  }).catch(function (error) {
    return console.log(error);
  });
}; // create parcel


var createParcel = function createParcel(req, res) {
  var _req$body = req.body,
      id = _req$body.id,
      name = _req$body.name,
      origin = _req$body.origin,
      destination = _req$body.destination,
      weight = _req$body.weight,
      userId = _req$body.userId;
  var existingOrder = orders.find(function (order) {
    return order.name === name;
  });

  if (existingOrder === undefined) {
    // const id = orders.length + 1;
    var fieldsValidation = /[a-zA-Z]+/;

    if (!origin || !name || !destination || !userId || !weight) {
      res.status(400).send({
        message: 'Please provide all the required fields'
      });
    } else if (!Number(weight)) {
      res.status(400).send({
        message: 'Invalid weight, the weight should be number'
      });
    } else if (!fieldsValidation.test(name)) {
      res.status(400).send({
        message: 'Invalid name, the name should start with a letter'
      });
    } else if (!fieldsValidation.test(origin)) {
      res.status(400).send({
        message: 'Invalid origin, the origin should be a place'
      });
    } else if (!fieldsValidation.test(destination)) {
      res.status(400).send({
        message: 'Invalid destination, the destination should be a place'
      });
    } else {
      var order = new _parcel.default(id, name, origin, destination, weight, userId);
      var promise = (0, _connection.default)(_sqlQueries.default.insertIntoDatabase, [order.id, order.name, order.origin, order.destination, order.weight, order.price, order.origin]);
      promise.then(function (response) {
        if (response) {
          res.status(201).send({
            message: 'The order was successfully created',
            order: order,
            response: response
          });
        } else {
          res.send({
            message: "Duplicate key error"
          });
        }
      }).catch(function (error) {
        return res.send(error);
      }); // orders.push(order);
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
  }); // const specificOrders = execute(queries.ordersForUser,[userId])

  if (specificOrders) {
    res.status(200).send(specificOrders);
  } else {
    // Redirect to error page
    res.status(400).send({
      message: 'There is no order of the user you specified'
    });
  }
}; // fetch all delivery orders


var fetchAllDeliveryOrders = function fetchAllDeliveryOrders(req, res) {
  var orders = (0, _connection.default)("SELECT * FROM parcels");
  orders.then(function (response) {
    res.status(200).send(response);
  }).catch(function (error) {
    return console.log(error);
  });
}; // cancel a delivery order


var cancelDeliveryOrder = function cancelDeliveryOrder(req, res) {
  var parcelId = parseInt(req.params.id); //let parcel = orders.find(order => order.id === parcelId);

  var parcel = (0, _connection.default)(_sqlQueries.default.statusUpdate, ['Cancelled', parcelId]);
  parcel.then(function (response) {
    res.status(200).send({
      message: 'Order successfully cancelled',
      response: response
    });
  }).catch(function (error) {
    res.status(400).send({
      error: error
    });
  }); // if (parcel) {
  //   orders.splice(orders.indexOf(parcel), 1);
  //   parcel.status = 'Cancelled';
  //   orders.push(parcel);
  //   res.status(200).send({ message: 'Order successfully cancelled', parcel });
  // } else {
  //   res.status(400).send({ message: 'Invalid id' });
  // }
}; // delete all delivery orders


var deleteOrders = function deleteOrders(req, res) {
  var parcels = (0, _connection.default)("DROP TABLE parcels"); //orders = [];

  parcels.then(function (response) {
    res.status(200).send({
      message: 'Orders deleted successfully'
    });
  }).catch(function (error) {
    res.status(400).send({
      error: error
    });
  });
}; // change the status of a parcel delivery order


var updateStatus = function updateStatus(req, res) {
  var orderid = parseInt(req.params.id);
  var status = req.body.status; //const parcel = orders.find(item => item.id === orderid);

  var parcel = (0, _connection.default)(_sqlQueries.default.statusUpdate, [status, orderid]);
  parcel.then(function (response) {
    res.status(200).send({
      message: "The parcel was updated successfully",
      response: response
    });
  }).catch(function (error) {
    return console.log(error);
  }); // if (parcel !== undefined) {
  //   orders.splice(orders.indexOf(parcel), 1);
  //   parcel.status = status;
  //   orders.push(parcel);
  //   res.status(200).send({ message: 'The parcel was updated successfully', parcel });
  // } else {
  //   res.status(400).send({ message: 'No order with that id' });
  // }
}; // change the location of a destination delivery order


var changeDestination = function changeDestination(req, res) {
  var parcelId = parseInt(req.params.id);
  var destination = req.body.destination; //const parcel = orders.find(item => item.id === parcelId);

  var parcel = (0, _connection.default)(_sqlQueries.default.destinationUpdate, [destination, parcelId]);
  parcel.then(function (response) {
    if (response) {
      res.status(200).send({
        message: "The parcel was updated successfully",
        response: response
      });
    } else {
      res.status(400).send({
        message: 'No order with that id'
      });
    }

    ;
  }).catch(function (error) {
    return console.log(error);
  }); // if (parcel !== undefined) {
  //   orders.splice(orders.indexOf(parcel), 1);
  //   parcel.destination = destination;
  //   orders.push(parcel);
  //   res.status(200).send({ message: 'The parcel was updated successfully', parcel });
  // } else {
  //   res.status(400).send({ message: 'No order with that id' });
  // }
}; // change the present location of a parcel delivery order


var changePresentLocation = function changePresentLocation(req, res) {
  var id = parseInt(req.params.id);
  var presentLocation = req.body.presentLocation; //let parcel = orders.find(item => item.id === id);

  var parcel = (0, _connection.default)(_sqlQueries.default.presentLocationUpdate, [presentLocation, id]);
  parcel.then(function (response) {
    if (response) {
      //orders.splice(orders.indexOf(parcel), 1);
      // parcel.presentLocation = presentLocation;
      // orders.push(parcel);
      res.status(200).send({
        message: 'The parcel was updated successfully',
        response: response
      });
    } else {
      res.status(400).send({
        message: 'No order with that id'
      });
    }
  }).catch(function (error) {
    return console.log(error);
  });
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