import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';

// create an instance of the server
const app: Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.json({
    message: 'hello universe',
  });
});

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});

export default app;
