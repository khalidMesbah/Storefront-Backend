// import our environment variables
import env from '../middlewares/config';

// pool : a connection or set of connections to the database
// pool is just a connection to the database.
import { Pool } from 'pg'; // postgres libirary

// using pool to connect to a database
// the parameters we need to connect to the database
const client = new Pool({
  host: env.host,
  port: parseInt(env.dbport as string, 10),
  database: env.db,
  user: env.user,
  password: env.pass,
  max: 4, // maximum number of requests
});

// add listener if(err)=>log(err)
client.on('error', (error: Error) => {
  console.error(error.message);
});
client.on('connect', () => {
  console.log('connected');
});
client.on('remove', () => {
  console.log('removed');
});
client.on('acquire', () => {
  console.log('acquired');
});

export default client;
