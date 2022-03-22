import Client from '../databases/database'; // imports the database connection
import Order from '../types/order.type';
import queries from '../queries/orders.queries';

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

  async indexProducts(uuid: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getOrderProducts;
      const result = await conn.query(sql, [uuid]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order_products. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id_FK: string,
    product_id_FK: string
  ): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.addProduct;
      const result = await conn.query(sql, [
        quantity,
        order_id_FK,
        product_id_FK,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add a new product for order ${order_id_FK}. Error: ${err}`
      );
    }
  }

  async show(id_PK: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.getOrder;
      const result = await conn.query(sql, [id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id_PK}. Error: ${err}`);
    }
  }

  async create(status: string, user_id_FK: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.addOrder;
      const result = await conn.query(sql, [status, user_id_FK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new order for user ${user_id_FK}. Error: ${err}`
      );
    }
  }

  async update(status: string, id_PK: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.updateOrder;
      const result = await conn.query(sql, [status, id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${id_PK}. Error: ${err}`);
    }
  }

  async delete(id_PK: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = queries.removeOrder;
      const result = await conn.query(sql, [id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id_PK}. Error: ${err}`);
    }
  }
}
