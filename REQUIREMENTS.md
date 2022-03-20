# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

> ## API Endpoints
> To try the endpoints install the REST Client Extentions and run the requests in the request.rest file.
### Users
Index [token required] : get all the users
``` http
GET http://localhost:3000/api/users
Authorization: Bearer <theToken>
```
Show [token required] : get a specific user with uuid
``` http
GET http://localhost:3000/api/users/:uuid
Authorization: Bearer <theToken>
```
Create [token required] : add a user
``` http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "firstname": "fn",
  "lastname": "ls",
  "password": "pass"
}
```
update using put request : update a user using put request 
``` http
PUT http://localhost:3000/api/users/:uuid
Authorization: Bearer <theToken>
Content-Type: application/json

{
  "firstname": "new_fn",
  "lastname": "new_ln",
  "password": "new_pass"
}
```
update using patch request : update a user using patch request 
``` http
PATCH http://localhost:3000/api/users/:uuid
Authorization: Bearer <theToken>
Content-Type: application/json

{
  "firstname": "new_fn",
  "lastname": "new_ln",
  "password": "new_pass"
}
```
delete
``` http
DELETE http://localhost:3000/api/users/:uuid
Authorization: Bearer <theToken>
```
### Products
Index
``` http
GET http://localhost:3000/api/products/
```
Show 
``` http
GET http://localhost:3000/api/products/:uuid
```
Create [token required] :
``` http
POST http://localhost:3000/api/products
Authorization: Bearer <theToken>
{
    "name": "productName",
    "price": 0000
}
```
- [ ] [OPTIONAL] Top 5 most popular products 
- [ ] [OPTIONAL] Products by category (args: product category)

### Orders
Current Order by user (args: user id)[token required]
``` http
GET http://localhost:3000/api/orders/:uuid
Authorization: Bearer <theToken>
```
- [ ] [OPTIONAL] Completed Orders by user (args: user id)[token required]

### Order_products


> ## Data Shapes

### User
- [x] id
- [x] firstName
- [x] lastName
- [x] password
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
```
``` html
store_dev=# select * from users;
 id | firstname | lastname | password 
----+-----------+----------+----------
```
### Product
- [x] id
- [x] name
- [x] price
- [ ] [OPTIONAL] category
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL
);
```
``` html
store_dev=# select * from products;
 id | name | price 
----+------+-------
```
### Orders
- [x] id
- [x] user_id
- [x] status of order (active or complete)
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    user_id uuid REFERENCES users(id)
);
```
``` html 
store_dev=# select * from orders;
 id | status | user_id 
----+--------+---------
```

<mark>The order_products junction table : for the many to many relationship between orders and products tables</mark>
### order_products
- [x] id of each product in the order
- [x] quantity of each product in the order
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity INTEGER ,
    order_id uuid REFERENCES orders(id),
    product_id uuid REFERENCES products(id)
)
```
``` html
store_dev=# select * from order_products;
 id | quantity | order_id | product_id 
----+----------+----------+------------
```
