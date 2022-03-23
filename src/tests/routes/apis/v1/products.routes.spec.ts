import supertest from 'supertest';
import app from '../../../../server';
import Client from '../../../../databases/database';

const request = supertest(app);

describe('<=======test===***products***===routes=======>', () => {
  let user_token: string;
  let product_uuid_1: string;
  let product_uuid_2: string;

  it('test POST /api/users endpoint : add a user ', async () => {
    const res = await request.post('/api/users').send({
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: 'passme',
    });
    expect(res.status).toBe(200);
    user_token = res.body;
  });

  it('test POST /api/products endpoint : add two products ', async () => {
    // product 1
    const res = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'cucamber',
        price: 115,
        category: 'vegetables',
      });
    expect(res.status).toBe(200);
    product_uuid_1 = res.body.products_id_pk;
    expect(res.body).toEqual({
      products_id_pk: product_uuid_1,
      name: 'cucamber',
      price: 115,
      category: 'vegetables',
    });
    // product 2
    const res2 = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'apple',
        price: 231,
        category: 'fruits',
      });
    expect(res.status).toBe(200);
    product_uuid_2 = res2.body.products_id_pk;
    expect(res2.body).toEqual({
      products_id_pk: product_uuid_2,
      name: 'apple',
      price: 231,
      category: 'fruits',
    });
  });

  it('test GET /api/products endpoint : get all products ', async () => {
    const res = await request
      .get('/api/products')
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      products_id_pk: product_uuid_1,
      name: 'cucamber',
      price: 115,
      category: 'vegetables',
    });
  });

  it('test GET /api/products/:uuid endpoint : get a specific product ', async () => {
    const res = await request
      .get(`/api/products/${product_uuid_1}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      products_id_pk: product_uuid_1,
      name: 'cucamber',
      price: 115,
      category: 'vegetables',
    });
  });

  it('test GET /api/products/indexByCategory/:category endpoint : get all products by category ', async () => {
    const res = await request
      .get(`/api/products/indexByCategory/vegetables`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        products_id_pk: product_uuid_1,
        name: 'cucamber',
        price: 115,
        category: 'vegetables',
      },
    ]);
    const res2 = await request
      .get(`/api/products/indexByCategory/fruits`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual([
      {
        products_id_pk: product_uuid_2,
        name: 'apple',
        price: 231,
        category: 'fruits',
      },
    ]);
  });

  it('test PUT /api/products/:uuid : update a specific product', async () => {
    const res = await request
      .put(`/api/products/${product_uuid_1}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'tomatos',
        price: 123,
        category: 'vegetables',
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      products_id_pk: product_uuid_1,
      name: 'tomatos',
      price: 123,
      category: 'vegetables',
    });
  });

  it('test PATCH /api/products/:uuid : update a specific product', async () => {
    const res = await request
      .put(`/api/products/${product_uuid_2}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'bananas',
        price: 321,
        category: 'fruits',
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      products_id_pk: product_uuid_2,
      name: 'bananas',
      price: 321,
      category: 'fruits',
    });
  });

  it('test DELETE /api/products/:uuid : delete a specific product', async () => {
    const res = await request
      .delete(`/api/products/${product_uuid_2}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      products_id_pk: product_uuid_2,
      name: 'bananas',
      price: 321,
      category: 'fruits',
    });
  });

  it("test GET /api/products/:uuid : can't get a specific product because it has been deleted", async () => {
    const res = await request
      .get(`/api/products/${product_uuid_2}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual("The product doesn't exist");
  });

  afterAll(async () => {
    const conn = await Client.connect();
    await Client.query(`DELETE FROM users;`);
    conn.release();
  });
});
