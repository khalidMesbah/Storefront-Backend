import supertest from 'supertest';
import app from '../../../../server';
import Client from '../../../../databases/database';

const request = supertest(app);

describe('<=======test===***dashboard***===routes=======>', () => {
  let user_token: string;
  let user_uuid: string;
  let order_uuid: string;
  let product_uuid_1: string;
  let product_uuid_2: string;
  let product_uuid_2c: string;
  let product_uuid_3: string;
  let product_uuid_3c: string;
  let product_uuid_3cc: string;
  let product_uuid_4: string;
  let product_uuid_4c: string;
  let product_uuid_4cc: string;
  let product_uuid_4ccc: string;
  let product_uuid_5: string;
  let product_uuid_6: string;

  //   add a user and get the token of the user
  it('test POST /api/users endpoint : add a user ', async () => {
    const res = await request.post('/api/users').send({
      first_name: 'Khalid',
      last_name: 'Mesbah',
      password: 'passme',
    });
    expect(res.status).toBe(200);
    user_token = res.body;
  });
  // get the uuid for the added user
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
  //   add an order and get the uuid of the order
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
  // add six products for following tests
  it('test POST /api/products endpoint : add six products ', async () => {
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
    // product 2
    const response2 = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'apples',
        price: 231,
        category: 'fruits',
      });
    expect(response2.status).toBe(200);
    product_uuid_2 = response2.body.products_id_pk;
    // product 2
    const response2c = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'apples',
        price: 231,
        category: 'fruits',
      });
    expect(response2c.status).toBe(200);
    product_uuid_2c = response2c.body.products_id_pk;
    // product 3
    const response3 = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'bananas',
        price: 257,
        category: 'fruits',
      });
    expect(response3.status).toBe(200);
    product_uuid_3 = response3.body.products_id_pk;
    // product 3
    const response3c = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'bananas',
        price: 257,
        category: 'fruits',
      });
    expect(response3c.status).toBe(200);
    product_uuid_3c = response3c.body.products_id_pk;
    // product 3
    const response3cc = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'bananas',
        price: 257,
        category: 'fruits',
      });
    expect(response3cc.status).toBe(200);
    product_uuid_3cc = response3cc.body.products_id_pk;
    // product 4
    const response4 = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'tomatos',
        price: 111,
        category: 'vegetables',
      });
    expect(response4.status).toBe(200);
    product_uuid_4 = response4.body.products_id_pk;
    // product 4
    const response4c = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'tomatos',
        price: 111,
        category: 'vegetables',
      });
    expect(response4c.status).toBe(200);
    product_uuid_4c = response4c.body.products_id_pk;
    // product 4
    const response4cc = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'tomatos',
        price: 111,
        category: 'vegetables',
      });
    expect(response4cc.status).toBe(200);
    product_uuid_4cc = response4cc.body.products_id_pk;
    // product 4
    const response4ccc = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'tomatos',
        price: 111,
        category: 'vegetables',
      });
    expect(response4ccc.status).toBe(200);
    product_uuid_4ccc = response4ccc.body.products_id_pk;
    // product 5
    const response5 = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'watermelon',
        price: 731,
        category: 'fruits',
      });
    expect(response5.status).toBe(200);
    product_uuid_5 = response5.body.products_id_pk;
    // product 6
    const response6 = await request
      .post('/api/products')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        name: 'lemon',
        price: 101,
        category: 'vegetables',
      });
    expect(response6.status).toBe(200);
    product_uuid_6 = response6.body.products_id_pk;
  });
  // add the products to the order
  it('test POST /api/orders/:uuid/products endpoint: add six product to a specific order', async () => {
    // add product 1 to the order
    const res = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 1,
        product_id_FK: product_uuid_1,
      });
    expect(res.status).toBe(200);
    // add product 2 to the order
    const response2 = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 2,
        product_id_FK: product_uuid_2,
      });
    expect(response2.status).toBe(200);
    // add product 2c to the order
    const response2c = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 2,
        product_id_FK: product_uuid_2c,
      });
    expect(response2c.status).toBe(200);
    // add product 3 to the order
    const response3 = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 3,
        product_id_FK: product_uuid_3,
      });
    expect(response3.status).toBe(200);
    // add product 3c to the order
    const response3c = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 3,
        product_id_FK: product_uuid_3c,
      });
    expect(response3c.status).toBe(200);
    // add product 3cc to the order
    const response3cc = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 3,
        product_id_FK: product_uuid_3cc,
      });
    expect(response3cc.status).toBe(200);
    // add product 4 to the order
    const response4 = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 4,
        product_id_FK: product_uuid_4,
      });
    expect(response4.status).toBe(200);
    // add product 4c to the order
    const response4c = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 4,
        product_id_FK: product_uuid_4c,
      });
    expect(response4c.status).toBe(200);
    // add product 4cc to the order
    const response4cc = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 4,
        product_id_FK: product_uuid_4cc,
      });
    expect(response4cc.status).toBe(200);
    // add product 4ccc to the order
    const response4ccc = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 4,
        product_id_FK: product_uuid_4ccc,
      });
    expect(response4ccc.status).toBe(200);
    // add product 5 to the order
    const response5 = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 5,
        product_id_FK: product_uuid_5,
      });
    expect(response5.status).toBe(200);
    // add product 6 to the order
    const response6 = await request
      .post(`/api/orders/${order_uuid}/products`)
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        quantity: 6,
        product_id_FK: product_uuid_6,
      });
    expect(response6.status).toBe(200);
  });

  it('test GET /api/dashboard/getAllProductsInOrders: to get all the products that have been included in orders', async () => {
    const res = await request
      .get('/api/dashboard/getAllProductsInOrders')
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(12);
    expect(res.body).toEqual([
      {
        name: 'cucamber',
        price: 115,
        order_id_fk: order_uuid,
      },
      {
        name: 'apples',
        price: 231,
        order_id_fk: order_uuid,
      },
      {
        name: 'apples',
        price: 231,
        order_id_fk: order_uuid,
      },
      {
        name: 'bananas',
        price: 257,
        order_id_fk: order_uuid,
      },
      {
        name: 'bananas',
        price: 257,
        order_id_fk: order_uuid,
      },
      {
        name: 'bananas',
        price: 257,
        order_id_fk: order_uuid,
      },
      {
        name: 'tomatos',
        price: 111,
        order_id_fk: order_uuid,
      },
      {
        name: 'tomatos',
        price: 111,
        order_id_fk: order_uuid,
      },
      {
        name: 'tomatos',
        price: 111,
        order_id_fk: order_uuid,
      },
      {
        name: 'tomatos',
        price: 111,
        order_id_fk: order_uuid,
      },
      {
        name: 'watermelon',
        price: 731,
        order_id_fk: order_uuid,
      },
      {
        name: 'lemon',
        price: 101,
        order_id_fk: order_uuid,
      },
    ]);
  });

  it('test GET /api/dashboard/getAllProductsInOrders: to get all the users that have made orders', async () => {
    const res = await request
      .get('/api/dashboard/getUsersWithOrders')
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].users_id_pk).toEqual(user_uuid);
  });

  it('test GET /api/dashboard/getMostExpProducts: to get the <number> most expensive products ', async () => {
    const res = await request
      .get('/api/dashboard/getMostExpProducts')
      .set('Authorization', 'Bearer ' + user_token)
      .send({
        limit: 6,
      });
    expect(res.status).toBe(200);
    expect(res.body.length).toBeLessThanOrEqual(6);
    expect(res.body).toEqual([
      { name: 'watermelon', price: 731 },
      { name: 'bananas', price: 257 },
      { name: 'apples', price: 231 },
      { name: 'cucamber', price: 115 },
      { name: 'tomatos', price: 111 },
      { name: 'lemon', price: 101 },
    ]);
  });

  it('test GET api/dashboard/getmostPopProducts', async () => {
    const res = await request
      .get('/api/dashboard/getmostPopProducts')
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { name: 'tomatos', count: '4' },
      { name: 'bananas', count: '3' },
      { name: 'apples', count: '2' },
      { name: 'cucamber', count: '1' },
      { name: 'lemon', count: '1' },
      { name: 'watermelon', count: '1' },
    ]);
  });

  it('test GET /api/dashboard/getCurrentOrderByUser/:uuid: get the current order by user', async () => {
    const res = await request
      .get(`/api/dashboard/getCurrentOrderByUser/${user_uuid}`)
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

  it('test GET /api/dashboard/getCompletedOrdersByUser/:uuid: get the completed orders by user ', async () => {
    const res = await request
      .get(`/api/dashboard/getCompletedOrdersByUser/${user_uuid}`)
      .set('Authorization', 'Bearer ' + user_token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        orders_id_pk: order_uuid,
        status: 'complete',
        user_id_fk: user_uuid,
      },
    ]);
  });

  afterAll(async () => {
    const conn = await Client.connect();
    await Client.query(
      `DELETE FROM order_products;DELETE FROM orders;DELETE FROM products;DELETE FROM users;`
    );
    conn.release();
  });
});
