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

console.log(`🚀🔥👉 ⚡ env.db`, env.db);

// add listener if(err)=>log(err)
Client.on('error', (error: Error) => {
  console.log('error in the database => ', error.message);
})
  .on('connect', () => {
    console.log('the database has been => connected');
  })
  .on('remove', () => {
    console.log('the database has been => disconnected');
  })
  .on('acquire', () => {
    console.log('the database has been => acquired');
  });

export default Client;
