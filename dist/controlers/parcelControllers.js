'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _sqlQueries = require('../db/sqlQueries');

var _sqlQueries2 = _interopRequireDefault(_sqlQueries);

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = {};

// fetch a parcel
var fetchParcelById = function fetchParcelById(req, res) {
  var parcelId = req.params.id;
  // const parcel = orders.find(order => order.id === parcelId);
  var parcel = (0, _connection2.default)(_sqlQueries2.default.getSpecificParcel, [parcelId]);
  parcel.then(function (response) {
    // send it.
    if (response.length >= 1) {
      res.status(200).send(response[0]);
    } else {
      // send the error page
      res.status(400).send({ message: 'Ooops! no order with that id' });
    }
  }).catch(function (error) {
    return console.log(error);
  });
};

// create parcel
var createParcel = function createParcel(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      origin = _req$body.origin,
      destination = _req$body.destination,
      weight = _req$body.weight,
      userId = _req$body.userId;

  //Got the regex from Dan's Tools, Regex Testing.

  var fieldsValidation = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/;
  if (!origin || !name || !destination || !weight) {
    res.status(400).send({ message: 'Please provide all the required fields' });
  } else if (!Number(weight)) {
    res.status(400).send({ message: 'Invalid weight, the weight should be number' });
  } else if (!fieldsValidation.test(name)) {
    res.status(400).send({ message: 'Invalid name, the name should start with a letter' });
  } else if (!fieldsValidation.test(origin)) {
    res.status(400).send({ message: 'Invalid origin, the origin should be a place' });
  } else if (!fieldsValidation.test(destination)) {
    res.status(400).send({ message: 'Invalid destination, the destination should be a place' });
  } else {
    var id = (0, _v2.default)();
    var order = new _parcel2.default(id, name, origin, destination, weight, userId);
    var promise = (0, _connection2.default)(_sqlQueries2.default.insertIntoDatabase, [order.id, order.name, order.origin, order.destination, order.weight, order.price, order.origin, order.userId]);
    promise.then(function (response) {
      if (response.length >= 1) {
        res.status(201).send({ message: 'The order was successfully created', response: response[0] });
      } else {
        res.send({ message: 'Duplicate key error' });
      }
    }).catch(function (error) {
      return res.send(error);
    });
  }
};

// Fetch a delivery order by a user.
var deliveryOrdersByUser = function deliveryOrdersByUser(req, res) {
  var userId = req.params.id;
  // find the order where the owner is equal to the email
  // const specificOrders = orders.filter(item => item.userId === userId);
  var specificOrders = (0, _connection2.default)(_sqlQueries2.default.ordersForUser, [userId]);
  specificOrders.then(function (response) {
    if (response.length >= 1) {
      res.status(200).send(response);
    } else {
      res.status(400).send({ message: 'There is no order of the user you specified' });
    }
  }).catch(function (error) {
    res.status(400).send(error);
  });
};

// fetch all delivery orders
var fetchAllDeliveryOrders = function fetchAllDeliveryOrders(req, res) {
  var orders = (0, _connection2.default)('SELECT * FROM parcels');
  orders.then(function (response) {
    res.status(200).send(response);
  }).catch(function (error) {
    return console.log(error);
  });
};

// cancel a delivery order
var cancelDeliveryOrder = function cancelDeliveryOrder(req, res) {
  var parcelId = req.params.id;
  var userId = req.body.userId;
  var parcel = (0, _connection2.default)(_sqlQueries2.default.cancelOrder, ['Cancelled', parcelId, userId]);
  parcel.then(function (response) {
    if (response.length >= 1) {
      res.status(200).send({ message: 'Order successfully cancelled', response: response[0] });
    } else {
      res.status(400).send({ message: 'There is no order with that id' });
    }
  }).catch(function (error) {
    res.status(400).send({ error: error });
  });
};
// delete all delivery orders
var deleteOrders = function deleteOrders(req, res) {
  var parcels = (0, _connection2.default)('DELETE FROM parcels ');
  // orders = [];
  parcels.then(function (response) {
    res.status(200).send({ message: 'Orders deleted successfully', response: response });
  }).catch(function (error) {
    res.status(400).send({ error: error });
  });
};

// change the status of a parcel delivery order
var updateStatus = function updateStatus(req, res) {
  var orderid = req.params.id;
  var status = req.body.status;
  // const parcel = orders.find(item => item.id === orderid);

  var parcel = (0, _connection2.default)(_sqlQueries2.default.statusUpdate, [status, orderid]);
  parcel.then(function (response) {
    if (response) {
      res.status(200).send({ message: 'The parcel was updated successfully', response: response[0] });
    } else {
      res.status(400).send({ message: 'There is no parcel with that id' });
    }
  }).catch(function (error) {
    return console.log(error);
  });
};

// change the destination delivery order
var changeDestination = function changeDestination(req, res) {
  var parcelId = req.params.id;
  var destination = req.body.destination;

  if (destination === undefined) {
    res.status(400).send({ message: "Please provide a new destination in order to update the destination" });
  } else {
    var parcel = (0, _connection2.default)(_sqlQueries2.default.destinationUpdate, [destination, parcelId]);
    parcel.then(function (response) {
      if (response) {
        res.status(200).send({ message: 'The parcel was updated successfully', response: response[0] });
      } else {
        res.status(400).send({ message: 'No order with that id' });
      }
    }).catch(function (error) {
      return console.log(error);
    });
  }
};

// change the present location of a parcel delivery order
var changePresentLocation = function changePresentLocation(req, res) {
  var id = req.params.id;
  var presentLocation = req.body.presentLocation;

  if (presentLocation === undefined) {
    res.status(200).send({ message: "Please provide present location or keep the current" });
  } else {
    var parcel = (0, _connection2.default)(_sqlQueries2.default.presentLocationUpdate, [presentLocation, id]);
    parcel.then(function (response) {
      if (response) {
        res.status(200).send({ message: 'The parcel was updated successfully', response: response[0] });
      } else {
        res.status(400).send({ message: 'No order with that id' });
      }
    }).catch(function (error) {
      return console.log(error);
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

exports.default = controllers;