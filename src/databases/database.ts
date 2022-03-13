// import our environment variables
import env from '../middlewares/config';

// pool : a connection or set of connections to the database
// pool is just a connection to the database.
import { Pool } from 'pg'; // postgres libirary

// using pool to connect to a database
// the parameters we need to connect to the database
const Client = new Pool({
  host: env.host,
  port: parseInt(env.dbport as string, 10),
  database: env.db,
  user: env.user,
  password: env.pass,
  max: 100, // maximum number of requests
});

// add listener if(err)=>log(err)
Client.on('error', (error: Error) => {
  console.log('error', error.message);
});
Client.on('connect', () => {
  console.log('connect');
});
Client.on('remove', () => {
  console.log('remove');
});
Client.on('acquire', () => {
  console.log('acquire');
});

export default Client;
