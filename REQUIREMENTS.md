# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

> ## API Endpoints
> To try the endpoints install the REST Client Extentions and run the requests in the request.rest file.
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
### Orders
Current Order by user (args: user id)[token required]
``` http
GET http://localhost:3000/api/orders/:uuid
Authorization: Bearer <theToken>
```
- [ ] [OPTIONAL] Completed Orders by user (args: user id)[token required]

> ## Data Shapes
### Product
- [x] id
- [x] name
- [x] price
- [ ] [OPTIONAL] category
``` sql
create table sfafd()
valur
```
``` html
store_test=# select * from products;
 id | name | price 
----+------+-------
```
### User
- [x] id
- [x] firstName
- [x] lastName
- [x] password
``` html
store_test=# select * from users;
 id | firstname | lastname | password 
----+-----------+----------+----------
```
### Orders
- [x] id
- [x] id of each product in the order
- [x] quantity of each product in the order
- [x] user_id
- [x] status of order (active or complete)
``` html 
store_test=# select * from orders;
 id | prod_id | quan_prod | user_id | status 
----+---------+-----------+---------+--------
```

``` sql
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id integer REFERENCES users(id)
);
```
  <!-- for the many to many relationship between orders and products table, I created the junction table: -->
``` sql
CREATE TABLE Order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products (id)
);
```