import supertest from 'supertest';
import app from '../../../../server';
import Client from '../../../../databases/database';

const request = supertest(app);

describe('<=======test===***orders***===routes=======>', () => {
  let user_token: string;
  let user_uuid: string;
  let order_uuid: string;
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

  it('test GET /api/users endpoint : get all users ', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    user_uuid = res.body[0].users_id_pk;
    expect(res.body[0]).toEqual({
      users_id_pk: user_uuid,
      first_name: 'Khalid',
      last_name: 'Mesbah',
    });
  });

  it('test POST /api/orders endpoint : add an order ', async () => {
    const res = await request
      .post('/api/orders')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        status: 'active',
        user_id_FK: user_uuid,
      });
    expect(res.status).toBe(200);
    order_uuid = res.body.orders_id_pk;
    expect(res.body).toEqual({
      orders_id_pk: order_uuid,
      status: 'active',
      user_id_fk: user_uuid,
    });
  });

  it('test GET /api/orders endpoint : get all orders ', async () => {
    const res = await request
      .get('/api/orders')
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      orders_id_pk: order_uuid,
      status: 'active',
      user_id_fk: user_uuid,
    });
  });

  it('test GET /api/orders/:uuid endpoint : get a specific order ', async () => {
    const res = await request
      .get(`/api/orders/${order_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      orders_id_pk: order_uuid,
      status: 'active',
      user_id_fk: user_uuid,
    });
  });

  it('test PATCH /api/orders/:uuid endpoint : update the status of a specific order as complete', async () => {
    const res = await request
      .patch(`/api/orders/${order_uuid}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        status: 'complete',
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      orders_id_pk: order_uuid,
      status: 'complete',
      user_id_fk: user_uuid,
    });
  });

  it('test PUT /api/orders/:uuid endpoint : update the status of a specific order as active', async () => {
    const res = await request
      .put(`/api/orders/${order_uuid}`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        status: 'active',
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      orders_id_pk: order_uuid,
      status: 'active',
      user_id_fk: user_uuid,
    });
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
    expect(res2.status).toBe(200);
    product_uuid_2 = res2.body.products_id_pk;
    expect(res2.body).toEqual({
      products_id_pk: product_uuid_2,
      name: 'apple',
      price: 231,
      category: 'fruits',
    });
  });

  it('test POST /api/orders/:uuid/products endpoint : add two product to a specific order', async () => {
    // add a product for the order
    const res = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 20,
        product_id_FK: product_uuid_1,
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      order_products_id_pk: res.body.order_products_id_pk,
      quantity: 20,
      order_id_fk: order_uuid,
      product_id_fk: product_uuid_1,
    });
    // add another product for the order
    const res2 = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 35,
        product_id_FK: product_uuid_2,
      });
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual({
      order_products_id_pk: res2.body.order_products_id_pk,
      quantity: 35,
      order_id_fk: order_uuid,
      product_id_fk: product_uuid_2,
    });
  });

  it('test GET /api/orders/:uuid : get all prodcuts for a specific order', async () => {
    const res = await request
      .get(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        products_id_pk: product_uuid_1,
        name: 'cucamber',
        price: 115,
        category: 'vegetables',
        quantity: 20,
        order_id_fk: order_uuid,
      },
      {
        products_id_pk: product_uuid_2,
        name: 'apple',
        price: 231,
        category: 'fruits',
        quantity: 35,
        order_id_fk: order_uuid,
      },
    ]);
  });

  it('test DELETE /api/orders/:uuid : to delete a specifc order', async () => {
    const conn = await Client.connect();
    await Client.query('DELETE FROM order_products;');
    conn.release();

    const res = await request
      .delete(`/api/orders/${order_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      orders_id_pk: order_uuid,
      status: res.body.status,
      user_id_fk: user_uuid,
    });
  });

  it('test GET /api/orders/:uuid endpoint : get a deleted order will throw error ', async () => {
    const res = await request
      .get(`/api/orders/${order_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res).toThrowError;
  });

  afterAll(async () => {
    const conn = await Client.connect();
    await Client.query(
      `DELETE FROM order_products;DELETE FROM orders;DELETE FROM products;DELETE FROM users;`
    );
    conn.release();
  });
});
