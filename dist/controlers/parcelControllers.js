'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _sqlQueries = require('../db/sqlQueries');

var _sqlQueries2 = _interopRequireDefault(_sqlQueries);

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _inputFieldsValidation = require('../helpers/inputFieldsValidation');

var _inputFieldsValidation2 = _interopRequireDefault(_inputFieldsValidation);

var _sendingEmail = require('../helpers/sendingEmail');

var _sendingEmail2 = _interopRequireDefault(_sendingEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var controllers = {};

var getEmailOfOwner = function getEmailOfOwner(parcelId, message) {
  var userEmail = (0, _connection2.default)(_sqlQueries2.default.getUserForSpecificParcel, [parcelId]);
  userEmail.then(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(response.length >= 1)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return (0, _sendingEmail2.default)(response[0].email, message);

            case 3:
              _context.next = 6;
              break;

            case 5:
              console.log('could not find the email');

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()).catch(function (error) {
    return console.log(error);
  });
};

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

  var _joi$validate = _joi2.default.validate({
    name: name,
    origin: origin,
    destination: destination,
    weight: weight,
    userId: userId
  }, _inputFieldsValidation2.default.parcelSchema),
      error = _joi$validate.error,
      value = _joi$validate.value;

  if (error !== null) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    var id = (0, _v2.default)();
    var order = new _parcel2.default(id, name, origin, destination, weight, userId);
    var promise = (0, _connection2.default)(_sqlQueries2.default.insertIntoDatabase, [order.id, order.name, order.origin, order.destination, order.weight, order.price, order.origin, order.userId, order.created_at]);
    promise.then(function (response) {
      if (response.length >= 1) {
        res.status(201).send({
          message: 'The order was successfully created',
          response: response[0]
        });
      } else {
        res.send({ error: 'Duplicate key error' });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};

// Fetch a delivery order by a user.
var deliveryOrdersByUser = function deliveryOrdersByUser(req, res) {
  var userId = req.params.id;
  var status = req.query.status;

  var specificOrders = void 0;
  var specificStatus = void 0;
  var query = void 0;
  if (status) {
    if (status === 'intransit') {
      specificStatus = 'Intransit';
    } else if (status === 'delivered') {
      specificStatus = 'Delivered';
    } else {
      specificStatus = 'Not delivered';
    }
    query = _sqlQueries2.default.ordersFilteredParcels;
    specificOrders = (0, _connection2.default)(query, [userId, specificStatus]);
  } else {
    query = _sqlQueries2.default.ordersForUser;
    specificOrders = (0, _connection2.default)(query, [userId]);
  }
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
  var status = req.query.status;

  var query = void 0;
  if (status === 'intransit') {
    query = "SELECT * FROM parcels WHERE status = 'Intransit' ORDER BY created_at DESC";
  } else if (status === 'delivered') {
    query = "SELECT * FROM parcels WHERE status = 'Delivered' ORDER BY created_at DESC";
  } else if (status === 'notdelivered') {
    query = "SELECT * FROM parcels WHERE status = 'Not delivered' or status = 'Cancelled' ORDER BY created_at DESC";
  } else {
    query = 'SELECT * FROM parcels ORDER BY created_at DESC';
  }
  var orders = (0, _connection2.default)(query);
  orders.then(function (response) {
    res.status(200).send(response);
  }).catch(function (error) {
    return res.status(400).send({ error: error });
  });
};

// cancel a delivery order
var cancelDeliveryOrder = function cancelDeliveryOrder(req, res) {
  var parcelId = req.params.id;
  var userId = req.body.userId;

  var parcel = (0, _connection2.default)(_sqlQueries2.default.cancelOrder, ['Cancelled', parcelId, userId]);
  parcel.then(function (response) {
    if (response.length >= 1) {
      var message = 'Order successfully cancelled';
      getEmailOfOwner(parcelId, message);
      // sendEmailNotification(getEmailOfOwner(parcelId), message);
      res.status(200).send({ message: message, response: response[0] });
    } else {
      res.status(400).send({ error: 'There is no order with that id' });
    }
  }).catch(function (error) {
    res.status(400).send({ error: error });
  });
};

// delete all delivery orders
var deleteOrders = function deleteOrders(req, res) {
  var parcels = (0, _connection2.default)('DELETE FROM parcels ');
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

  var statusSchema = _joi2.default.object().keys({
    status: _joi2.default.string().alphanum().min(3).required()
  });

  var _joi$validate2 = _joi2.default.validate({ status: status }, statusSchema),
      error = _joi$validate2.error,
      value = _joi$validate2.value;

  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    var parcel = (0, _connection2.default)(_sqlQueries2.default.statusUpdate, [status, orderid]);
    parcel.then(function (response) {
      if (response.length >= 1) {
        getEmailOfOwner(orderid, 'The parcel was updated successfully');
        res.status(200).send({
          message: 'The parcel was updated successfully',
          response: response[0]
        });
      } else {
        res.status(400).send({ error: 'There is no parcel with that id' });
      }
    }).catch(function (error) {
      return res.status(400).send({ error: error });
    });
  }
};

// change the destination of delivery order
var changeDestination = function changeDestination(req, res) {
  var parcelId = req.params.id;
  var destination = req.body.destination;

  var destinationSchema = _joi2.default.object().keys({
    destination: _joi2.default.string().alphanum().min(3).required()
  });

  var _joi$validate3 = _joi2.default.validate({ destination: destination }, destinationSchema),
      error = _joi$validate3.error,
      value = _joi$validate3.value;

  if (error) {
    res.status(400).send({ error: error.detials[0].message });
  } else {
    var parcel = (0, _connection2.default)(_sqlQueries2.default.destinationUpdate, [destination, parcelId]);
    parcel.then(function (response) {
      if (response) {
        var message = 'The parcel was updated successfully';
        getEmailOfOwner(parcelId, message);
        res.status(200).send({ message: message, response: response[0] });
      } else {
        res.status(400).send({ message: 'No order with that id' });
      }
    }).catch(function (error) {
      return res.status(400).send({ error: error });
    });
  }
};

// change the present location of a parcel delivery order
var changePresentLocation = function changePresentLocation(req, res) {
  var id = req.params.id;
  var presentLocation = req.body.presentLocation;

  var presentLocationSchema = _joi2.default.object().keys({
    presentLocation: _joi2.default.string().alphanum().min(3).required()
  });

  var _joi$validate4 = _joi2.default.validate({ presentLocation: presentLocation }, presentLocationSchema),
      error = _joi$validate4.error,
      value = _joi$validate4.value;

  if (error) {
    res.status(200).send({ error: error.details[0].message });
  } else {
    var parcel = (0, _connection2.default)(_sqlQueries2.default.presentLocationUpdate, [presentLocation, id]);
    parcel.then(function (response) {
      if (response) {
        var message = 'The parcel was updated successfully';
        getEmailOfOwner(id, message);
        res.status(200).send({ message: message, response: response[0] });
      } else {
        res.status(400).send({ error: 'No order with that id' });
      }
    }).catch(function (err) {
      return res.status(400).send({ err: err });
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