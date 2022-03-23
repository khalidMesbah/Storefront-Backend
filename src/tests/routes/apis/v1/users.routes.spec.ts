import supertest from 'supertest';
import app from '../../../../server';
const request = supertest(app);

describe('<=======test===***users***===routes=======>', () => {
  let user_token: string;
  let user_uuid: string;

  it('test POST /api/users endpoint : add a user ', async () => {
    const res = await request.post('/api/users').send({
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: 'passme',
    });
    expect(res.status).toBe(200);
    user_token = res.body;
  });

  it('test GET /api/users endpoint : get all users ', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    user_uuid = res.body[0].users_id_pk;
    expect(res.body[0]).toEqual({
      users_id_pk: res.body[0].users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
    });
  });

  it('test GET /api/users/:uuid : get a specific user', async () => {
    const res = await request
      .get(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      users_id_pk: res.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
      theRecentPurchases: [],
    });
  });

  it('test PUT /api/users/:uuid : update a specific user', async () => {
    const res = await request
      .put(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        first_name: 'loda',
        last_name: 'sebaq',
        password: 'secret_password',
      });
    expect(res.status).toBe(200);
    user_token = res.body.newtoken;
    expect(res.body).toEqual({
      users_id_pk: res.body.users_id_pk,
      first_name: 'loda',
      last_name: 'sebaq',
      password: res.body.password,
      newtoken: res.body.newtoken,
    });
  });

  it('test PATCH /api/users/:uuid : update a specific user', async () => {
    const res = await request
      .patch(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        first_name: 'Khalid',
        last_name: 'Mesbah',
        password: 'new_secret_password',
      });
    expect(res.status).toBe(200);
    user_token = res.body.newtoken;
    expect(res.body).toEqual({
      users_id_pk: res.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: res.body.password,
      newtoken: res.body.newtoken,
    });
  });

  it('test GET /api/users/:uuid using PATCH: authenticate a specific user', async () => {
    const res = await request.get(`/api/users/auth/${user_uuid}`).send({
      password: 'new_secret_password',
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      users_id_pk: res.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: res.body.password,
    });
  });

  it('test DELETE /api/users/:uuid : delete a specific user', async () => {
    const res = await request
      .delete(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      users_id_pk: res.body.users_id_pk,
      first_name: 'Khalid',
      last_name: 'Mesbah',
    });
  });

  it("test GET /api/users/:uuid : can't get a specific user because it has been deleted", async () => {
    const res = await request
      .get(`/api/users/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual("the user doesn't exist");
  });
});
