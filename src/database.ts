import dotenv from 'dotenv';
// pool : a connection or set of connections to the database
// pool is just a connection to the database.
import { Pool } from 'pg'; // postgres libirary

/* The dotenv.config() line initializes the environment variables.
 You can't access the env vars unless this line exists in your code,
 it typically goes as close to the beginning of the program as possible. */
dotenv.config();

// the parameters we need to connect to the database
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;
/*  process.env is just a regular old Javascript object that can be destructured,
   and it cleans things up a little. */
// from the documentation => how to use Pool to connect to a database
const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
