import Client from '../databases/database'; // imports the database connection
import Order from '../types/order.type';
// import hash from '../utilities/hashPassword';
import queries from '../queries/orders.queries';
// import bcrypt from 'bcrypt';
// import env from '../middlewares/config';

export default class OrderTable {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getOrders;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async indexProducts(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getOrderProducts;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order_products. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.addProduct;
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      console.log(`🚀🔥👉 ⚡ OrderTable ⚡ result`, result.rows[0]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product. Error: ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.getOrder;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(status: string, user_id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.addOrder;
      const result = await conn.query(sql, [status, user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new order for user ${user_id}. Error: ${err}`
      );
    }
  }
  /* 


  async update(id: string, o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.updateOrder;
      const result = await conn.query(sql, [
        o.first_name,
        o.last_name,
        hash(o.password),
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.removeOrder;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  // authenticate a order
  async authenticate(id: string, _password: string): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const sql = queries.authenticate;
      const result = await conn.query(sql, [id]);

      let order;
      if (result.rows.length)
        if (bcrypt.compareSync(_password + env.pepper, result.rows[0].password))
          order = result.rows[0];

      conn.release();
      return order || null;
    } catch (err) {
      throw new Error(`Could not authenticate order ${id}. Error: ${err}`);
    }
  }

  async getAll(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.getAll;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not getAll data from a order ${id}. Error: ${err}`
      );
    }
  } */
}
