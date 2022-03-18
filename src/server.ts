import express, { Request, Response, Application } from 'express';
// import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middleware';
import db from './databases/database';
import routes from './routes';
import cors from 'cors';
import env from './middlewares/config';

const app: Application = express();
const PORT = env.port || 3000;
// add cors to make our api available for public
const corsOptions = {
  origin: 'http://weirdDomain.com',
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// middleware to parse incoming requests
app.use(express.json());

// use our routes
app.use('/api', routes);

// import authenticateToken from './middlewares/authenticateToken';
import jwt from 'jsonwebtoken';

// const posts = [
//   { id: 1, username: 'khaled' },
//   { id: 2, username: 'sara' },
// ];
app.get('/auth', (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization');
    const data = jwt.verify(token as string, env.tokenSecret as string);
    res.json(data);
  } catch (error) {
    res.json({ user: false });
  }
});

app.post('/log', (req: Request, res: Response) => {
  const theToken = jwt.sign(req.body, env.tokenSecret as string, {
    expiresIn: '1h',
  });
  res.json(theToken);
});
// http request logger middleware
app.use(morgan('dev'));

// http security middleware
app.use(helmet());

// testing the database
db.connect().then(async client => {
  try {
    const res = await client.query('SELECT NOW()');
    client.release();
    console.log(res.rows);
    return res;
  } catch (err) {
    console.error(err);
  }
});

// a middleware for limiting the number of requests
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'too many requests from this ip,try again after a year',
  })
);

// testing cors
app.get('/cors', cors(corsOptions), (_req: Request, res: Response) => {
  res.json({
    message:
      'this message is availabe to the public thanks to the cors middleware',
  });
});

// routing for /  path
// if you will not use a parameter write it like that _req
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'hello universe',
  });
});

app.get('/err', () => {
  throw new Error('opsy error from the error middleware');
});

// to handle errors inside the valid pathes
app.use(errorMiddleware);

// for handling the errors due to wrong pathes
// but it at the end of your file
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'wrong path',
  });
});

app.listen(PORT, () => {
  console.log(`starting app on: ${PORT}`);
});
