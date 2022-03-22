import supertest from 'supertest';
import app from '../server';

// create a request object
const request = supertest(app);

describe('test the basic endpoint server', () => {
  it('get the / endpoint ', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('hello universe 🌍');
  });
});
