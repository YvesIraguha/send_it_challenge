"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parcelsRouter = _express.default.Router(); //declare the variable to store users and orders. 


var users = [];
var orders = []; //redirect to the apis when on heroku. 

parcelsRouter.get('/', function (req, res) {
  res.redirect("/v1/parcels");
}); //get the list of all users. 

parcelsRouter.get('/v1/users', function (req, res) {
  if (users.length > 0) {
    res.send(users);
  } else {
    res.send({
      message: "There is no user at the moment."
    });
  }
}); //create a user 

parcelsRouter.post('/v1/users', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var userId = users.length + 1;
  var user1 = {
    name: name,
    email: email,
    userId: userId
  };

  if (!name || !email) {
    res.send({
      message: "A user should have name and email"
    });
  } else {
    users.push(user1);
    res.send(user1);
  }

  ;
}); //Dealing with parcels.

var fetchParcelById = function fetchParcelById(req, res) {
  var parcelId = parseInt(req.params.id);
  var parcel = orders.find(function (order) {
    return order.id === parcelId;
  }); //send it.

  if (parcel) {
    res.send(parcel);
  } else {
    //send the error page 
    res.send({
      message: "Ooops! no order with that id"
    });
  }

  ;
};

var createParcel = function createParcel(req, res) {
  var origin = req.body.origin;
  var destination = req.body.destination;
  var weight = req.body.weight;
  var userId = req.body.userId;
  var price = parseFloat(weight) * 100;
  var id = orders.length + 1;

  if (!origin || !destination || !userId || !weight || isNaN(weight)) {
    res.send({
      message: "the order should have origin, destination, userId, and weight of type number fields"
    });
  } else {
    var order = {
      id: id,
      userId: userId,
      origin: origin,
      destination: destination,
      weight: weight,
      price: "".concat(price, "Rwf")
    };
    orders.push(order);
    res.send(order);
  }

  ;
};

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
};

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
};

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
}; //fetch a parcel by id


parcelsRouter.get('/v1/parcels/:id', fetchParcelById); //Route for accepting data from the parcel creation. 

parcelsRouter.post('/v1/parcels', createParcel); //fetch all delivery orders made by a specific user

parcelsRouter.get("/v1/users/:id/parcels", deliveryOrdersByUser); //Fetch all orders made. 

parcelsRouter.get("/v1/parcels", fetchAllDeliveryOrders); //the codes for canceling a delivery order with put method

parcelsRouter.put('/v1/parcels/:id/cancel', cancelDeliveryOrder);
var _default = parcelsRouter;
exports.default = _default;