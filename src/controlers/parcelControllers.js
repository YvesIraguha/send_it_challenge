import uuidv1 from 'uuid/v1';
import Parcel from '../models/parcel';
import queries from '../db/sqlQueries';
import execute from '../db/connection';
import 'babel-polyfill';

const controllers = {};

// fetch a parcel
const fetchParcelById = (req, res) => {
  const parcelId = req.params.id;
  // const parcel = orders.find(order => order.id === parcelId);
  const parcel = execute(queries.getSpecificParcel, [parcelId]);
  parcel.then((response) => {
    // send it.
    if (response.length >= 1) {
      res.status(200).send(response[0]);
    } else {
      // send the error page
      res.status(400).send({ message: 'Ooops! no order with that id' });
    }
  }).catch(error => console.log(error));
};

// create parcel
const createParcel = (req, res) => {
  const {
    name, origin, destination, weight,userId, 
  } = req.body;
  
  //Got the regex from Dan's Tools, Regex Testing.
 let fieldsValidation = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/;
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
    const id = uuidv1();
    const order = new Parcel(id, name, origin, destination, weight, userId);
    const promise = execute(queries.insertIntoDatabase, [order.id, order.name, order.origin, order.destination, order.weight, order.price, order.origin, order.userId]);
    promise.then((response) => {
      if (response.length >= 1) {
        res.status(201).send({ message: 'The order was successfully created', response: response[0] });
      } else {
        res.send({ message: 'Duplicate key error' });
      }
    }).catch(error => res.send(error)); 
  }
};

// Fetch a delivery order by a user.
const deliveryOrdersByUser = (req, res) => {
  const userId = req.params.id;
  // find the order where the owner is equal to the email
  // const specificOrders = orders.filter(item => item.userId === userId);
  const specificOrders = execute(queries.ordersForUser, [userId]);
  specificOrders.then((response) => {
    if (response.length >= 1) {
      res.status(200).send(response);
    } else {
      res.status(400).send({ message: 'There is no order of the user you specified' });
    }
  }).catch((error) => {
    res.status(400).send(error);
  });
};

// fetch all delivery orders
const fetchAllDeliveryOrders = (req, res) => {
  const orders = execute('SELECT * FROM parcels');
  orders.then((response) => {
    res.status(200).send(response);
  }).catch(error => console.log(error));
};

// cancel a delivery order
const cancelDeliveryOrder = (req, res) => {
  const parcelId = req.params.id;
  const userId = req.body.userId;
  const parcel = execute(queries.cancelOrder, ['Cancelled', parcelId, userId]);
  parcel.then((response) => {
    if (response.length >= 1) {
      res.status(200).send({ message: 'Order successfully cancelled', response: response[0] });
    } else {
      res.status(400).send({ message: 'There is no order with that id' });
    }
  }).catch((error) => {
    res.status(400).send({ error });
  });
};
// delete all delivery orders
const deleteOrders = (req, res) => {
  const parcels = execute('DELETE FROM parcels ');
  // orders = [];
  parcels.then((response) => {
    res.status(200).send({ message: 'Orders deleted successfully', response });
  }).catch((error) => {
    res.status(400).send({ error });
  });
};

// change the status of a parcel delivery order
const updateStatus = (req, res) => {
  const orderid = req.params.id;
  const { status } = req.body;
  // const parcel = orders.find(item => item.id === orderid);
  const parcel = execute(queries.statusUpdate, [status, orderid]);
  parcel.then((response) => {
    if (response) {
      res.status(200).send({ message: 'The parcel was updated successfully', response: response[0] });
    } else {
      res.status(400).send({ message: 'There is no parcel with that id' });
    }
  }).catch(error => console.log(error));
};

// change the destination delivery order
const changeDestination = (req, res) => {
  const parcelId = req.params.id;
  let { destination } = req.body;
  if ( destination === undefined){
    res.status(400).send({message:"Please provide a new destination in order to update the destination"})
  }else{
  const parcel = execute(queries.destinationUpdate, [destination, parcelId]);
  parcel.then((response) => {
    if (response) {
      res.status(200).send({ message: 'The parcel was updated successfully', response: response[0] });
    } else {
      res.status(400).send({ message: 'No order with that id' });
    }
  }).catch(error => console.log(error));
}
};

// change the present location of a parcel delivery order
const changePresentLocation = (req, res) => {
  let id = req.params.id;
  let { presentLocation } = req.body;
  if (presentLocation === undefined){
    res.status(200).send({message:"Please provide present location or keep the current"})
  }else {
  const parcel = execute(queries.presentLocationUpdate, [presentLocation, id]);
  parcel.then((response) => {
    if (response) {
      res.status(200).send({ message: 'The parcel was updated successfully', response: response[0] });
    } else {
      res.status(400).send({ message: 'No order with that id' });
    }
  }).catch(error => console.log(error));
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

export default controllers;
