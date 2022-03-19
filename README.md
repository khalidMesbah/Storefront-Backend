# Storefront Backend API
Advanced Full-Stack Web Development Nanodegree Program

> ## About The Project
- A RESTFUL API for a shopping application.

- The API offers several endpoints to access and manipulate data in the database through both CRUD and custom actions.

- A detailed list of the endpoints and actions available can be found in the REQUIREMENTS.md file.



> ## Functionalities
- Connect to a postgres database.
- Make crud operations to the database using a node.js API.
- Hashing passwords using bcrypt package.


> ## How to setup and connect to the database - Databases Configurations
We are using postgresql as our object-relational database management system to deal with the databases.

We need to make two databases:-
- store_dev : for development
- store_test : for testing

``` sql
    CREATE DATABASE store_dev;
    CREATE DATABASE store_test;
```

- Create a .env file according to the .env.example file to set up the environment variables.
- Create a database.json file like the following :-
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

- Run the `migrate:up` script :  To set up all the needed tables and their relationships
- Run the `start` script : To run the server
- Done

> ## what ports the backend and database are running on
They are running on the ports provided by the user in the .env file.

Usually i run them on the following ports:-
- The database is running on the port 5432
- The backend is running on the port 3000

> ## Scripts

### `i` : To install all the dependencies needed for the project.
``` bash
    npm i
```

### `migrate:up` : To Call the up migrations.
``` bash
    npm run migrate:up
```

### `migrate:down` : To call the down migrations.
``` bash
    npm run migrate:down
```

### `migrate:reset` : To reset all migrations.
``` bash
    npm run migrate:reset
```

### `build` : To compile typescript.

``` bash
    npm run build
```

### `start` : To run the server.

``` bash
    npm run start
```

### `start:prod` : To compile typescript and run the server .

``` bash
    npm run start:prod
```

### `prettify` : To format the code.

``` bash
    npm run prettier
```

### `lint` : To accelerate development and reduce errors.

``` bash
    npm run lint
```

### `test` : To test the Project.      

``` bash
    npm run test
```

### `watch` : To run the server       

``` bash
    npm run watch
``` 

> ## Technologies / Stack
- Postgres
- Node.js
- Express
- TypeScript
- ejs - incoming

> ## Middlewares
- dotenv : for managing environment variables
- db-migrate : for migrations
- pg : for connecting to a database
- jsonwebtoken : for working with JWTs
- jasmine : for testing
- morgan : for logging incoming requests to the server
- helment : for securing the server
- express.json : for parsing incoming requests
- express-rate-limit : for limiting the number of requests to the server
- bcrypt : for encrypting the passwords 
- jwt : for authorization

> ## 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

> ## 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

> ## 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

> ## 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

> ## 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

> ## 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

> ## Tasks
- [ ] complete the PROJECT SPECIFICATION in the rub
- [ ] Draft a database schema that covers all the data requirements.
- [ ] Draft a map of endpoints to expose for the frontend.
- [ ] Create a connection to a Postgres database from the provided Node application.
- [ ] Add tables and columns according to the database schema doc.
- [ ] Create models that facilitate CRUD operations on the database tables.
- [ ] Create a test suite for each model in Jasmine.
- [ ] Create handler files for each model.
- [ ] In each handler file, create RESTful endpoints for each model method.
- [ ] Create a test suite that covers each endpoint with Jasmine.
- [ ] You need to install the docker using the docker-compose.yml file provided in the repo. Note that you may need to update this file to fit your computer in order to use it locally.
- [ ] Filled out README.md
- [ ] Updated REQUIREMENTS.md
- [ ] package.json
- [ ] database.json
- [ ] Model Folder
- [ ] Handler Folder
- [ ] Migrations Folder
- [ ] Model and Endpoint Tests
- [ ] Relevant Supporting Files
