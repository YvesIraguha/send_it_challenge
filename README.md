[![Build Status](https://travis-ci.com/YvesIraguha/send_it_challenge.svg?branch=master)](https://travis-ci.com/YvesIraguha/send_it_challenge)
# send_it_challenge
SendIT is a courier service that helps users deliver parcels to different destinations. SendIt provides courier quotes on weight categories. 

# Hit over the links below to see the templates 

The template for admin to view all deliveries:
https://yvesiraguha.github.io/send_it_challenge/UI/delivery_orders_for_admin.html

The template for deliveries made by each user:
https://yvesiraguha.github.io/send_it_challenge/UI/delivery_order_for_user.html 

The template for creating a delivery:
https://yvesiraguha.github.io/send_it_challenge/UI/index.html 

The template for sign up page:
https://yvesiraguha.github.io/send_it_challenge/UI/signup.html

The template for sign in page: 
https://yvesiraguha.github.io/send_it_challenge/UI/signin.html

# API 
## Endpoints
`GET /parcels`:Fetch all parcel delivery orders

`GET /parcels/parcelID`:Fetch a specific parcel delivery order 

`GET /users/userID/parcels`:Fetch all parcel delivery orders by a specific user 

`PUT /parcels/parcelID/cancel`:Cancel a specific parcel delivery order

`POST /parcels`: Create a parcel delivery order
