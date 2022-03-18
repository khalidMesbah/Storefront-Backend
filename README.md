# Storefront Backend API
Advanced Full-Stack Web Development Nanodegree Program

> ## About The Project
A RESTFUL API For an e-commerce backend based on three models: Products, Orders and Users.

A detailed list of the endpoints and actions available can be found in the REQUIREMENTS.md file.

> ## Databases Configurations
We are using postgresql as our object-relational database management system to deal with the databases.

we need to make two databases:-
- store_dev : for development
- store_test : for testing

``` sql
CREATE USER userName WITH PASSWORD 'userPassword';
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
\c store_dev;
GRANT ALL PRIVILEGES ON DATABASE store_dev TO userName;
\c store_test;
GRANT ALL PRIVILEGES ON DATABASE store_test TO userName;
```


> ## Scripts

### install all the dependencies
``` bash
    npm i
```

### npm migrate:up : To set up all needed tables and their relationships
``` bash
    npx db-migrate up
```

### build : to compile typescript

``` bash
    npm run build
```

### run : to run the server

``` bash
    npm run start
```

### build and run : to compile typescript and run the server 

``` bash
    npm run start:prod
```

### prettify : to format the code

``` bash
    npm run prettier
```

### lint : to accelerate development and reduce errors

``` bash
    npm run lint
```

### test : to test our code        

``` bash
    npm run test
```

> ## Functionalities
- connect to a postgres database
- make crud operations to the database using the api
- incrypting passwords using bcrypt package


> ## how to setup and connect to the database
- Create a .env according to the .env-example file to set you environment variables   
- run the `migrate:up` script 
- run the server 
- done


> ## what ports the backend and database are running on
the port is 3000

> ## Endpoints
1. `/` : the endpoint that is responsible for displaying the home page

   usage

   <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a> 

2. `/api/resize` : the endpoint that is responsible for resizing the image

   usage

   <a href="http://localhost:3000/api/resize?width=theWidth&height=theHeight&image=imageName" target="_blank">http://localhost:3000/api/resize?width=theWidth&height=theHeight&image=imageName</a>

   example

   <a href="http://localhost:3000/api/resize?width=1200&height=600&image=fjord.jpg" target="_blank">http://localhost:3000/api/resize?width=1200&height=600&image=fjord.jpg</a>

3. `api/images` : the endpoint that is responsible for displaying the available images

   <a href="http://localhost:3000/api/images" target="_blank">http://localhost:3000/api/images</a>

4. `api/image/:id` : the endpoint that is responsible for displaying a specific image

   <a href="http://localhost:3000/api/image/1" target="_blank">http://localhost:3000/api/image/1</a>

   <a href="http://localhost:3000/api/image/5" target="_blank">http://localhost:3000/api/image/5</a>

   <a href="http://localhost:3000/api/image/8" target="_blank">http://localhost:3000/api/image/8</a>

   <a href="http://localhost:3000/api/image/0" target="_blank">http://localhost:3000/api/image/0</a>

   <a href="http://localhost:3000/api/image" target="_blank">http://localhost:3000/api/image</a>


> ## Technologies / Stack
- Postgres
- Node.js
- Express
- TypeScript
- [ ] ejs - incoming
- [ ] 

## Middlewares
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

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Tasks