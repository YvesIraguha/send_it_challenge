[![Build Status](https://travis-ci.com/YvesIraguha/send_it_challenge.svg?branch=develop)](https://travis-ci.com/YvesIraguha/send_it_challenge) [![Maintainability](https://api.codeclimate.com/v1/badges/73c17d419a88554c7278/maintainability)](https://codeclimate.com/github/YvesIraguha/send_it_challenge/maintainability) [![Coverage Status](https://coveralls.io/repos/github/YvesIraguha/send_it_challenge/badge.svg?branch=ch-setup-database-162110606)](https://coveralls.io/github/YvesIraguha/send_it_challenge?branch=ch-setup-database-162110606)
# send_it_challenge
SendIT is a courier service that helps users deliver parcels to different destinations. SendIt provides courier quotes on weight categories. 

# Hit over the links below to see the templates 

The template for admin to view all deliveries: [Deliveries](https://yvesiraguha.github.io/send_it_challenge/UI/html/delivery_orders_for_admin.html)


The template for deliveries made by each user: [Deliveries by a user](https://yvesiraguha.github.io/send_it_challenge/UI/html/delivery_order_for_user.html)

The template for creating a delivery: [Create parcel delivery order](https://yvesiraguha.github.io/send_it_challenge/UI/html/index.html) 

The template for sign up page: [Sign up](https://yvesiraguha.github.io/send_it_challenge/UI/html/signup.html)

The template for sign in page: [Sign in](https://yvesiraguha.github.io/send_it_challenge/UI/html/signin.html)

# API 
## Endpoints
`GET /parcels`:Fetch all parcel delivery orders.

`GET /parcels/<parcelID>`:Fetch a specific parcel delivery order. 

`GET /users/usrID/parcels`:Fetch all parcel delivery orders by a specific user.

`PUT /parcels/<parcelID>/cancel`:Cancel a specific parcel delivery order.

`POST /parcels`: Create a parcel delivery order.

`PUT /parcels/<parcelID>/destination`: Change the destination of the parcel delivery order.

`PUT /parcels/<parcelID>/status`: Change the status of the parcel delivery order.
 
`PUT /parcels/<parcelID>/presentLocation`:Change the presentLocation of a parcel delivery order. 

`POST /users/signup`: Register a user .

`POST /users/signin`: Log in.

`DELETE /parcels`: Delete all the parcels.

`DELETE /users`:  Delete all users. 

`GET /users/<userid>`: Fetch a user by user id. 

`GET /users`: Fetch all users. 

# POSTMAN documentation 
[API Documentation](https://documenter.getpostman.com/view/6026755/RzfdpVau)

