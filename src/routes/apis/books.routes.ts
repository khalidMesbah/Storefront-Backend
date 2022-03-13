import { Request, Response } from 'express';
import { Router } from 'express';

// import * as controllers from '../../controllers/books.controllers';
// import Book from '../../models/types/book.type';
const routes = Router();
// routes.get('/', controllers.create);

routes.get('/', (_req: Request, res: Response) => {
  try {
    res.send('this is the INDEX route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.get('//:id', (_req: Request, res: Response) => {
  try {
    res.send('this is the SHOW route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.post('/', (req: Request, res: Response) => {
  /*  const book: Book = {
    summary: req.body.summary,
    title: req.body.title,
  }; */
  try {
    res.send('this is the CREATE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.put('//:id', (req: Request, res: Response) => {
  /*   const book: Book = {
    summary: req.body.summary,
    title: req.body.title,
  }; */
  try {
    res.send('this is the EDIT route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

routes.delete('//:id', (_req: Request, res: Response) => {
  try {
    res.send('this is the DELETE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default routes;
