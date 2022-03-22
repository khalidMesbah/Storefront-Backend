# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

> ## API Endpoints
> To try the endpoints install the REST Client Extentions and run the requests in the request.rest file.
### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***Users Routes***</div>

Index [token required] : get all the users
``` http
GET http://localhost:3000/api/users
Authorization: Bearer <theToken>
```

Show [token required] : get a specific user with uuid
``` http
GET http://localhost:3000/api/users/<uuid>
Authorization: Bearer <theToken>
```

Create [token required] : add a user
``` http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "first_name": "fn",
  "last_name": "ls",
  "password": "pass"
}
```

update using put : update a user using put http method, note that the token must be for the same user with the uuid provided as parameter
``` http
PUT http://localhost:3000/api/users/<uuid>
Authorization: Bearer <theToken>
Content-Type: application/json

{
  "first_name": "new_fn",
  "last_name": "new_ln",
  "password": "new_pass"
}
```

update using : update a user using patch http method, note that the token must be for the same user with the uuid provided as parameter
``` http
PATCH http://localhost:3000/api/users/<uuid>
Authorization: Bearer <theToken>
Content-Type: application/json

{
  "first_name": "new_fn",
  "last_name": "new_ln",
  "password": "new_pass"
}
```

delete : delete a user, note that the token must be for the same user with the uuid provided as a parameter
``` http
DELETE http://localhost:3000/api/users/<uuid>
Authorization: Bearer <theToken>
```

### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***Products Routes***</div>
Index
``` http
GET http://localhost:3000/api/products/
```

Show 
``` http
GET http://localhost:3000/api/products/<uuid>
```

Create [token required] :
``` http
POST http://localhost:3000/api/products
Authorization: Bearer <theToken>
Content-Type: application/json

{
  "name": "product_name",
  "price": 000
}
```

Delete [token required] :
``` http
DELETE http://localhost:3000/api/products/<uuid>
Authorization: Bearer <thetoken>
```

- [x] [OPTIONAL] Products by category (args: product category)

### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***Orders Routes***</div>

- [x] Current Order by user (args: user id)[token required]
``` http
GET http://localhost:3000/api/dashboard/getCurrentOrderByUser/{{user_uuid}}
Authorization: Bearer {{user_token}}
```
- [x] [OPTIONAL] Completed Orders by user (args: user id)[token required]
```http
GET http://localhost:3000/api/dashboard/getCompletedOrdersByUser/{{user_uuid}}
Authorization: Bearer {{user_token}}
```

- [x] [OPTIONAL] Top 5 most popular products 
### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***dashboard Routes***</div>

---
<br>

> ## Tables' structures - Data shapes - Database Schema
### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***users Schema***</div>
- [x] id_PK
- [x] first_name
- [x] last_name
- [x] password
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
```
``` html
store_dev=# select * from users ;
 id_pk | first_name | last_name | password 
-------+------------+-----------+----------
```

### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***products Schema***</div>
- [x] id_PK
- [x] name
- [x] price
- [x] [OPTIONAL] category
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products(
    id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL
);
```
``` html
store_dev=# select * from products ;
 id_pk | name | price 
-------+------+-------
```

### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***Orders Schema***</div>
- [x] id_PK
- [x] status of order (active or complete)
- [x] user_id_FK
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders(
    id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id_FK uuid REFERENCES users(id_PK)
);
```
``` html 
store_dev=# select * from orders ;
 id_pk | status | user_id_fk 
-------+--------+------------
```

### <div style="color: #cfc547;text-shadow: 3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8);">***order_products Schema***</div> 
The order_products junction table : for the many to many relationship between orders and products tables
- [x] id_PK
- [x] quantity of each product in the order
- [x] order_id_FK : the id of the order
- [x] product_id_FK : the id of each product in the order
``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
    id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity INTEGER ,
    order_id_FK uuid REFERENCES orders(id_PK),
    product_id_FK uuid REFERENCES products(id_PK)
)
```
``` html
store_dev=# select * from order_products ;
 id_pk | quantity | order_id_fk | product_id_fk 
-------+----------+-------------+---------------
```
