import Client from '../../databases/database';

export class Dashboard {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id_FK: string }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name,price,order_id_FK FROM products INNER JOIN order_products ON products.products_id_PK = order_products.product_id_FK;';
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
      const sql =
        'SELECT name,price FROM products GROUP BY name,price order By 2 DESC LIMIT ($1);';
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
      const sql =
        'SELECT * FROM users INNER JOIN orders ON users.users_id_PK = orders.user_id_FK;';
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
      const sql =
        'SELECT name ,count(*) FROM products INNER JOIN order_products ON products.products_id_PK = order_products.product_id_FK GROUP BY name order By 2 DESC LIMIT ($1)';
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
  async CurrentOrderByUser(
    uuid: string
  ): Promise<{ name: string; num: number }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id_FK = ($1) AND status = 'active';";
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
      const sql =
        "SELECT * FROM orders WHERE user_id_FK = ($1) AND status = 'complete';";
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
