# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

> ## API Endpoints
> To try the endpoints install the REST Client Extentions and run the requests in the [request.rest](request.rest) file.
### ***Users Routes***

`Index` [token required] : get all the users.
``` http
GET http://localhost:3000/api/users
Authorization: Bearer {{user_token}}
```

`Show` [token required] : get a specific user with uuid.
``` http
GET http://localhost:3000/api/users/{{user_uuid}}
Authorization: Bearer {{user_token}}
```

`Create` [token required] : add a user => returns a token.
``` http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "first_name": "Khalid",
  "last_name": "Mesbah",
  "password": "my_secret_password"
}
```

`Update` [token required] : update a user using put http method, note that the token must be for the same user with the uuid provided as parameter => returns a new token for the user.
``` http
PUT http://localhost:3000/api/users/{{user_uuid}}
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "first_name": "Loda",
  "last_name": "Sebaq",
  "password": "secret_password"
}
```

`Update` [token required] : update a user using patch http method, note that the token must be for the same user with the uuid provided as parameter => returns a new token for the user.
``` http
PATCH http://localhost:3000/api/users/{{user_uuid}}
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "first_name": "Khalid",
  "last_name": "Mesbah",
  "password": "password"
}
```

`Authenticate` : authenticate a user => if the password is correct => return all the user's info ;else => return null.
``` http
GET http://localhost:3000/api/users/auth/{{user_uuid}}
Content-Type: application/json

{
  "password": "password"
}
```

`Delete` [token required] : delete a user, note that the token must be for the same user with the uuid provided as a parameter.
``` http
DELETE http://localhost:3000/api/users/{{user_uuid}}
Authorization: Bearer {{user_token}}
```

### ***Products Routes***
`Index` [token required] : get all the products.
``` http
GET http://localhost:3000/api/products
Authorization: Bearer {{user_token}}
```

`Show` [token required] : get a specific product with uuid.
``` http
GET http://localhost:3000/api/products/{{product_uuid}}
Authorization: Bearer {{user_token}}
```

`IndexByCategory/{{category}}` [token required] : get all the products by category.
``` http
GET http://localhost:3000/api/products/indexByCategory/vegetables
Authorization: Bearer {{user_token}}
```

`Create` [token required] : create a new product.
``` http
POST http://localhost:3000/api/products
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "name": "apples",
  "price":115,
  "category":"fruits"
}
```

`Update` [token required] : update a product using put http method.
``` http
PUT http://localhost:3000/api/products/{{product_uuid}}
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "name": "cucamber",
  "price":1152,
  "category":"vegetables"
}
```

`Update` [token required] : update a product using patch http method.
``` http
PATCH http://localhost:3000/api/products/{{product_uuid}}
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "name": "cucamber",
  "price":115,
  "category":"fruits"
}
```

`Delete` [token required] : to delete a specific order.
``` http
DELETE http://localhost:3000/api/products/{{product_uuid}}
Authorization: Bearer {{user_token}}
```

### ***Orders Routes***
`Index` [token required] : to get all of the orders.
```http
GET http://localhost:3000/api/orders
Authorization: Bearer {{user_token}}
```

`Show` [token required] : get a specific order.
```http
GET http://localhost:3000/api/orders/{{order_uuid}}
Authorization: Bearer {{user_token}}
```

`Create` [token required] : create a new order.
```http
POST http://localhost:3000/api/orders
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "status": "active",
  "user_id_FK": "{{user_uuid}}"
}
```

`Update` [token required] : update an order using put http method => update order's status to be active.
``` http
PUT  http://localhost:3000/api/orders/{{order_uuid}}
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "status":"active"
}
```

`Update` [token required] : update an order using patch http method => update order's status to be complete.
``` http
PATCH  http://localhost:3000/api/orders/{{order_uuid}}
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "status":"complete"
}
```

`AddProductToOrder` [token required] : add a product to a specific order.
```http
POST http://localhost:3000/api/orders/{{order_uuid}}/products
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "quantity": 2222,
  "product_id_FK": "{{product_uuid}}"
}
```

`GetProductsOfOrders` [token required] : get all prodcuts of a specific order.
```http
GET http://localhost:3000/api/orders/{{order_uuid}}/products
Authorization: Bearer {{user_token}}
```

`Delete` [token required] : delete a specific order.
```http
DELETE http://localhost:3000/api/orders/{{order_uuid}}
Authorization: Bearer {{user_token}}
```

### ***dashboard Routes***
`getAllProductsInOrders` [token required] : to get all products that have been included in orders.
``` http
GET http://localhost:3000/api/dashboard/getAllProductsInOrders
Authorization: Bearer {{user_token}}
```

`getUsersWithOrders` [token required] : to get all users that have made orders.
```http
GET http://localhost:3000/api/dashboard/getUsersWithOrders
Authorization: Bearer {{user_token}}
```

`getMostExpProducts` [token required] : to get the {{number}} most expensive products.
```http
GET http://localhost:3000/api/dashboard/getMostExpProducts
Authorization: Bearer {{user_token}}
Content-Type: application/json

{
  "limit":5
}
```

`getmostPopProducts` [token required] : to get the most popular products.
```http
GET http://localhost:3000/api/dashboard/getmostPopProducts
Authorization: Bearer {{user_token}}
```

`getCurrentOrderByUser` [token required] : get the current order for a user => the first order whose status is marked as active.
```http
GET http://localhost:3000/api/dashboard/getCurrentOrderByUser/{{user_uuid}}
Authorization: Bearer {{user_token}}
```
`getCompletedOrdersByUser` [token required] : get the completed orders by user.
```http
GET http://localhost:3000/api/dashboard/getCompletedOrdersByUser/{{user_uuid}}
Authorization: Bearer {{user_token}}
```

---
<br>

> ## Tables' structures - Data shapes - Database Schema
### ***users Schema***
- [x] users_id_PK
- [x] first_name
- [x] last_name
- [x] password
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    users_id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
```
``` html
store_dev=# SELECT * FROM users;
 users_id_pk | first_name | last_name | password 
-------------+------------+-----------+----------
```

### ***products Schema***
- [x] products_id_PK
- [x] name
- [x] price
- [x] category
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products(
    products_id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR NOT NULL
);
```
``` html
store_dev=# SELECT * FROM products;
 products_id_pk | name | price | category 
----------------+------+-------+----------
```

### ***Orders Schema***
- [x] orders_id_PK
- [x] status => of order (active or complete)
- [x] user_id_FK
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders(
    orders_id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id_FK uuid REFERENCES users(users_id_PK)
);
```
``` html 
store_dev=# SELECT * FROM orders;
 orders_id_pk | status | user_id_fk 
--------------+--------+------------
```

### ***order_products Schema*** 
The order_products junction table : for the one  to many relationship between orders and products tables
- [x] order_products_id_PK
- [x] quantity : the quantity of each product in the order
- [x] order_id_FK : the uuid of the order
- [x] product_id_FK : the uuid of each product in the order
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
    order_products_id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity INTEGER ,
    order_id_FK uuid REFERENCES orders(orders_id_PK),
    product_id_FK uuid REFERENCES products(products_id_PK)
);
```
``` html
store_dev=# SELECT * FROM order_products;
 order_products_id_pk | quantity | order_id_fk | product_id_fk 
----------------------+----------+-------------+---------------
```
