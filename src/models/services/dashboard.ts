import Client from '../../databases/database';
import queries from '../../queries/services/dashboard.queries';

export class Dashboard {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id_FK: string }[]
  > {
    try {
      const conn = await Client.connect();
      const sql = queries.productsInOrders;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `unable get all products that have been included in orders: ${err}`
      );
    }
  }

  // get the <number> most expensive products
  async mostExpProducts(
    limit: number
  ): Promise<{ name: string; price: number }[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.mostExpProducts;
      const result = await conn.query(sql, [limit]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `unable gets the ${limit} most expensive products: ${err}`
      );
    }
  }

  // Get all users that have made orders
  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.usersWithOrders;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get all users that have made orders: ${err}`);
    }
  }

  // top <number> most pupular products
  async mostPopProducts(
    limit: number
  ): Promise<{ name: string; num: number }[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.mostPopProducts;
      const result = await conn.query(sql, [limit]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `unable get the top ${limit} most pupular products: ${err}`
      );
    }
  }

  // the current acitve ordere
  async currentOrderByUser(
    uuid: string
  ): Promise<{ name: string; num: number }[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.CurrentOrderByUser;
      const result = await conn.query(sql, [uuid]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `unable get the top ${uuid} most pupular products: ${err}`
      );
    }
  }

  // all the completed orders
  async completedOrdersByUser(
    uuid: string
  ): Promise<{ name: string; num: number }[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.completedOrdersByUser;
      const result = await conn.query(sql, [uuid]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `unable get the top ${uuid} most pupular products: ${err}`
      );
    }
  }
}

export default Dashboard;
