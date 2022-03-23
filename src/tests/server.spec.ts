import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('<=======test*the*basic*endpoint*server=======>', () => {
  it('test GET / endpoint : check the server', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('hello universe 🌍');
  });
});
