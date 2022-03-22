import supertest from 'supertest';
import app from '../server';
import authenticateToken from '../middlewares/authenticateToken';
import Controller from '../handlers/users.handler';
import { response } from 'express';
// create a request object
const request = supertest(app);

describe('test the basic endpoint server', () => {
  let user_token: string;
  let user_uuid: string;

  it('test GET / endpoint : check the server', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('hello universe 🌍');
  });

  it('test POST /api/users endpoint : add a user ', async () => {
    const response = await request.post('/api/users/').send({
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: 'passme',
    });
    user_token = response.body;
    expect(response.status).toBe(200);
  });

  it('test GET /api/users endpoint : get all users ', async () => {
    const response = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + user_token);
    user_uuid = response.body[0].users_id_pk;
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      users_id_pk: response.body[0].users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
    });
  });

  it('test GET /api/users/:uuid : get a specific user', async () => {
    const response = await request
      .get(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(response.body).toEqual({
      users_id_pk: response.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
      theRecentPurchases: [],
    });
  });

  it('test PUT /api/users/:uuid using PUT : update a specific user', async () => {
    const response = await request
      .put(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        first_name: 'loda',
        last_name: 'sebaq',
        password: 'secret_password',
      });
    user_token = response.body.newtoken;
    expect(response.body).toEqual({
      users_id_pk: response.body.users_id_pk,
      first_name: 'loda',
      last_name: 'sebaq',
      password: response.body.password,
      newtoken: response.body.newtoken,
    });
  });

  it('test PATCH /api/users/:uuid using PATCH: update a specific user', async () => {
    const response = await request
      .patch(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        first_name: 'Khalid',
        last_name: 'Mesbah',
        password: 'new_secret_password',
      });
    user_token = response.body.newtoken;
    expect(response.body).toEqual({
      users_id_pk: response.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: response.body.password,
      newtoken: response.body.newtoken,
    });
  });

  it('test GET /api/users/:uuid using PATCH: authenticate a specific user', async () => {
    const response = await request.get(`/api/users/auth/${user_uuid}`).send({
      password: 'new_secret_password',
    });
    expect(response.body).toEqual({
      users_id_pk: response.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: response.body.password,
    });
  });

  it('test DELETE /api/users/:uuid : delete a specific user', async () => {
    const response = await request
      .delete(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(response.body).toEqual({
      users_id_pk: response.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
    });
  });

  it("test GET /api/users/:uuid : can't get a specific user because it has been deleted", async () => {
    const response = await request
      .get(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(response.body).toEqual("the user doesn't exist");
  });
});
