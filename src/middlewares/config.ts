import dotenv from 'dotenv';

dotenv.config(); // initialize the environment variables.
/*
You can't access the env vars unless this line exists in your code,
 it typically goes as close to the beginning of the program as possible. */

export default {
  port: process.env.PORT,
  host: process.env.POSTGRES_HOST,
  db:
    process.env.NODE_ENV === 'dev'
      ? process.env.POSTGRES_DB
      : process.env.POSTGRES_DB_TEST,
  dbport: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  pass: process.env.POSTGRES_PASSWORD,
  pepper: process.env.BCRYPT_PASSWORD,
  salt: process.env.SLART_ROUNDS,
  tokenSecret: process.env.TOKEN_SECRET,
};
