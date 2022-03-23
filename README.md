# Storefront Backend API
Advanced Full-Stack Web Development Nanodegree Program - Building an API with Postgres and Express! 
> ## About The Project
- A RESTful JSON Node API backed by Postgres database for a shopping website.

- The API offers several endpoints to access and manipulate data in a Postgres database through both CRUD and custom actions.

- PostgreSQL 

- A detailed list of the endpoints and actions available can be found in the REQUIREMENTS.md file.

> ## More
- Connected to a Postgres database.
- RESTful API that supports CRUD for all entities in the database.
- Created Express functions for incoming requests.
- Organized Express routes into handlers.
- Mapped RESTful routes to model methods.
- Added endpoint tests.
- Available to public using CORS.
- Secure.
- Password are stored hashed using bcrypt package.
- Allow products to be created and stored in a database.
- Allow users to sign up and sign in.
- Allow usrs to login and register.
- Require users to be signed in to perform certain actions.
- Allow users to create orders and add products to orders.
- Added a cart.
- Every user can only update the data of himself.
- list the most common products/orders and limit the number of responses.
> ## Functionalities - Features
- users
  - add a user
  - get all the users
  - get a specific user with uuid
  - update a user
  - authenticate a user
  - delete a user
- products
  - add a product
  - get all the products
  - get a specific product with uuid
  - get all products by category
  - update a product
  - delete a product
- orders
  - add an order
  - get all of the orders
  - get a specific order
  - update a specific order
  - add a product to a specific order
  - get all prodcuts of a specific order
  - delete a specific order
- dashboard
  - get all products that have been included in orders
  - get all users that have made orders
  - get the <number> most expensive products
  - get the most popular products
  - get the current order for a user
  - get the completed orders for a user

> ## How to setup and connect to the database - Databases Configurations
> > We are using PostgreSQL as our object-relational database management system to deal with and manipulate databases.

Open the psql command-line tool:-
``` bash
sudo su - postgres --> Switch to the postgres user 
psql postgres --> Start psql 
```
We need to make two databases:-
- store_dev : for development
- store_test : for testing

Run the following Queries:-
``` sql
CREATE USER user_name WITH PASSWORD 'user_password'; 
CREATE DATABASE store_dev;
\c store_dev
GRANT ALL PRIVILEGES ON DATABASE store_dev TO user_name;
CREATE DATABASE store_test;
\c store_test
GRANT ALL PRIVILEGES ON DATABASE store_test TO user_name;
```

Create a .env file according to the .env.example file to set up the environment variables.

Create a database.json file like the following :-
``` json
{
    "defaultEnv": {"ENV": "NODE_ENV"},
    "dev": {
        "driver": "pg",
        "host": {"ENV": "POSTGRES_HOST"},
        "port": {"ENV": "POSTGRES_PORT"},
        "database": {"ENV": "POSTGRES_DB"},
        "user": {"ENV": "POSTGRES_USER"},
        "password": {"ENV": "POSTGRES_PASSWORD"}
    },
    "test": {
        "driver": "pg",
        "host": {"ENV": "POSTGRES_HOST"},
        "port": {"ENV": "POSTGRES_PORT"},
        "database": {"ENV": "POSTGRES_DB_TEST"},
        "user": {"ENV": "POSTGRES_USER"},
        "password": {"ENV": "POSTGRES_PASSWORD"}
    }
}
```
- Install the project's dependencies `npm i`.
- Run the `migrate:up` script :  To set up all the needed tables and their relationships
- Run the `start` script : To run the server
- Done 👐

> ## what ports the backend and database are running on
They are running on the ports provided by the user in the .env file.

Usually i run them on the following ports:-
- The database is running on the port 5432
- The backend is running on the port 3000

> ## Scripts

``` bash
    npm i # To install all the dependencies needed for the project.
```
``` bash
    npm run migrate:up # To Call the up migrations.
```
``` bash
    npm run migrate:down # To call the down migrations.
```
``` bash
    npm run migrate:reset # To reset all migrations.
```
``` bash
    npm run build # To compile typescript.
```
``` bash
    npm run start # To run the server.
```
``` bash
    npm run watch # To run the watcher.
```
``` bash
    npm run start:prod # To compile typescript and run the server .
```
``` bash
    npm run prettier # To format the code.
```
``` bash
    npm run lint # To accelerate development and reduce errors.
```
``` bash
    npm run test # To test the Project.
```

> ## Technologies / Stack
- PostgreSQL.
- Node.js.
- Express.
- TypeScript.
- Jasmine.
- ejs - incoming.

> ## Middlewares
- authenticateToken
- error.middleware
- verifyAuthToken
- logger
- cors
- morgan
- helmet
- rateLimit
> ## Dependencies and Dev-Dependencies
- Prettier : for code formating.
- Eslint : for improving style and structure.
- dotenv : for managing environment variables.
- db-migrate : for migrations.
- pg : for connecting to a database.
- jsonwebtoken : for working with JWTs.
- jasmine : for test driven development.
- morgan : for logging incoming requests to the server.
- helment : for securing the server.
- express : for CORS and route handling.
- express.json : for parsing incoming requests.
- express-rate-limit : for limiting the number of requests to the server.
- bcrypt : for encrypting the passwords .
- jwt : for authorization.
- TypeScript : for reducing type errors.
- Supertest : ...
- ....

> ## Tasks
- [ ] Create a test suite for each model in Jasmine.
- [ ] Create a test suite that covers each endpoint with Jasmine.
- [ ] Model and Endpoint Tests
- [ ] EXTRA: Add logic to ensure that products cannot be added to orders
that are closed.
- [ ] Testing the models and the handlers.

> # Suggestions to Make Your Project Stand Out!
- [x] In addition to the endpoints required in the project, add any missing CRUD endpoints with authentication if needed for that data
- [x] Add a users 5 most recent purchases to the data being sent back from the user show endpoint (/users/id)
- [x] Add a popular products endpoint that sends back the 5 most commonly ordered items