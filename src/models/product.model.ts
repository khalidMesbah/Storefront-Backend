import Client from '../databases/database';
import Product from '../types/product.type';
import queries from '../queries/products.queries';

export default class ProductsTable {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getProducts;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products Error: ${err}`);
    }
  }

  async indexByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getProductsByCategory;
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products by category Error: ${err}`);
    }
  }

  async show(uuid: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = queries.getProduct;
      const result = await conn.query(sql, [uuid]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${uuid}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = queries.addProduct;
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new Product ${p.name}. Error: ${err}`);
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = queries.updateProduct;
      const result = await conn.query(sql, [
        p.name,
        p.price,
        p.category,
        p.uuid,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${p.uuid}. Error: ${err}`);
    }
  }

  async delete(uuid: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = queries.removeProduct;
      const result = await conn.query(sql, [uuid]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${uuid}. Error: ${err}`);
    }
  }
}
