// a model file with methods
// the model file is defining what a book is for our application.
// The model is represented as a class, each book row in the database will be an instance of the book model.
/* 
“Maintains the relationship between Object and Database and handles validation, association, transactions” */
import Client from '../databases/database';
/*  Did you notice or wonder why its the books (plural) table in the database, but the book (singular) file for the model? That's because the database table will hold many books, but the model file is defining what a book is for our application. */
import { Product } from '../types/product.type';
import queries from '../queries/products.queries';

export default class UserStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getProducts;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products.queries. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = queries.getProduct;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = queries.addProduct;
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new Product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = queries.removeProduct;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
