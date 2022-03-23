import supertest from 'supertest';
import app from '../../../../server';
import Client from '../../../../databases/database';

const request = supertest(app);

describe('<=======test===***orders***===routes=======>', () => {
  let user_token: string;
  let user_uuid: string;
  let order_uuid_1: string;
  let order_uuid_2: string;
  let product_uuid_1: string;
  let product_uuid_2: string;

  it('test POST /api/users endpoint : add a user ', async () => {
    const response = await request.post('/api/users').send({
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
      users_id_pk: user_uuid,
      first_name: 'Khalid',
      last_name: 'Mesbah',
    });
  });

  it('test POST /api/orders endpoint : add an order ', async () => {
    const response = await request
      .post('/api/orders')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        status: 'active',
        user_id_FK: user_uuid,
      });
    order_uuid_1 = response.body.orders_id_pk;
    expect(response.body).toEqual({
      orders_id_pk: order_uuid_1,
      status: 'active',
      user_id_fk: user_uuid,
    });
    expect(response.status).toBe(200);
  });

  it('test GET /api/orders endpoint : get all orders ', async () => {
    const response = await request
      .get('/api/orders')
      .set('Authorization', 'Bearer ' + user_token);
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      orders_id_pk: order_uuid_1,
      status: 'active',
      user_id_fk: user_uuid,
    });
  });

  it('test GET /api/orders/:uuid endpoint : get a specific order ', async () => {
    const response = await request
      .get(`/api/orders/${order_uuid_1}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      orders_id_pk: order_uuid_1,
      status: 'active',
      user_id_fk: user_uuid,
    });
  });

  it('test PATCH /api/orders/:uuid endpoint : update the status of a specific order as complete', async () => {
    const response = await request
      .patch(`/api/orders/${order_uuid_1}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        status: 'complete',
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      orders_id_pk: order_uuid_1,
      status: 'complete',
      user_id_fk: user_uuid,
    });
  });

  it('test PUT /api/orders/:uuid endpoint : update the status of a specific order as active', async () => {
    const response = await request
      .put(`/api/orders/${order_uuid_1}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        status: 'active',
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      orders_id_pk: order_uuid_1,
      status: 'active',
      user_id_fk: user_uuid,
    });
  });

  it('test POST /api/products endpoint : add two products ', async () => {
    // product 1
    const response = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'cucamber',
        price: 115,
        category: 'vegetables',
      });
    product_uuid_1 = response.body.products_id_pk;
    expect(response.body).toEqual({
      products_id_pk: product_uuid_1,
      name: 'cucamber',
      price: 115,
      category: 'vegetables',
    });
    expect(response.status).toBe(200);
    // product 2
    const response2 = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'apple',
        price: 231,
        category: 'fruits',
      });
    product_uuid_2 = response2.body.products_id_pk;
    expect(response2.body).toEqual({
      products_id_pk: product_uuid_2,
      name: 'apple',
      price: 231,
      category: 'fruits',
    });
    expect(response2.status).toBe(200);
  });

  it('test POST /api/orders/:uuid/products endpoint : add two product to a specific order', async () => {
    // add a product for the order
    const response = await request
      .post(`/api/orders/${order_uuid_1}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 20,
        product_id_FK: product_uuid_1,
      });
    expect(response.body).toEqual({
      order_products_id_pk: response.body.order_products_id_pk,
      quantity: 20,
      order_id_fk: order_uuid_1,
      product_id_fk: product_uuid_1,
    });
    expect(response.status).toBe(200);
    // add another product for the order
    const response2 = await request
      .post(`/api/orders/${order_uuid_1}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 35,
        product_id_FK: product_uuid_2,
      });
    expect(response2.body).toEqual({
      order_products_id_pk: response2.body.order_products_id_pk,
      quantity: 35,
      order_id_fk: order_uuid_1,
      product_id_fk: product_uuid_2,
    });
    expect(response2.status).toBe(200);
  });

  it('test GET /api/orders/:uuid : get all prodcuts for a specific order', async () => {
    const response = await request
      .get(`/api/orders/${order_uuid_1}/products`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(response.body).toEqual([
      {
        products_id_pk: product_uuid_1,
        name: 'cucamber',
        price: 115,
        category: 'vegetables',
        quantity: 20,
        order_id_fk: order_uuid_1,
      },
      {
        products_id_pk: product_uuid_2,
        name: 'apple',
        price: 231,
        category: 'fruits',
        quantity: 35,
        order_id_fk: order_uuid_1,
      },
    ]);
    expect(response.status).toBe(200);
  });

  it('test DELETE /api/orders/:uuid : to delete a specifc order', async () => {
    const conn = await Client.connect();
    await Client.query('DELETE FROM order_products;');
    conn.release();

    const response = await request
      .delete(`/api/orders/${order_uuid_1}`)
      .set('Authorization', 'Bearer ' + user_token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      orders_id_pk: order_uuid_1,
      status: response.body.status,
      user_id_fk: user_uuid,
    });
  });

  it('test GET /api/orders/:uuid endpoint : get a deleted order will throw error ', async () => {
    const response = await request
      .get(`/api/orders/${order_uuid_1}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(response).toThrowError;
  });

  afterAll(async () => {
    const conn = await Client.connect();
    await Client.query(
      `DELETE FROM order_products;DELETE FROM orders;DELETE FROM products;DELETE FROM users;`
    );
    conn.release();
  });
});
