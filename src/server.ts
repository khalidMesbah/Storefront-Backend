import express, { Request, Response, Application } from 'express';
// import bodyParser from 'body-parser';
// import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middleware';
// import db from './databases/database';
import routes from './routes';
import cors from 'cors';
import env from './middlewares/config';

const app: Application = express();
const PORT = env.port || 3000;

app.use(cors()); // to make our api puclic to the universe

app.use(express.json()); // to parse incoming json

// app.use(morgan('dev')); // http request logger middleware

app.use(helmet()); // http security middleware

app.use(errorMiddleware); // to handle errors inside the valid pathes

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'too many requests from this ip,try again after a 10 minutes',
  })
); // a middleware for limiting the number of requests

// testing the database
/* db.connect().then(async client => {
  try {
    const res = await client.query('SELECT NOW()');
    client.release();
    console.log(res.rows);
    return res;
  } catch (err) {
    throw new Error('opsy error from the error middleware');
  }
});
 */
// routing
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'hello universe 🌍',
  });
});

app.use('/api', routes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'wrong path, focus please!!',
  });
}); // for handling the errors due to wrong pathes  => it it at the end of your file

app.listen(PORT, () => {
  console.log(`the server is running on => http://localhost:${PORT}`);
});

export default app;
