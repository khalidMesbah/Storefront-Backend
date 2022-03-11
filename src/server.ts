import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// create an instance of the server
const app: Application = express();
const port = 3000;

// middleware to parse incoming requests
app.use(express.json());

// i don't know exactly what is this ?
app.use(bodyParser.json());

// http request logger middleware
app.use(morgan('common'));

// http security middleware
app.use(helmet());

// a middleware for limiting the number of requests
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'too many requests from this ip,try again after a year',
  })
);

// routing for /  path
app.get('/', function (req: Request, res: Response) {
  res.json({
    message: 'hello universe',
  });
});

app.post('/', function (req: Request, res: Response) {
  res.json({
    message: 'hello universe from post',
    data: req.body,
  });
});

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});

export default app;
