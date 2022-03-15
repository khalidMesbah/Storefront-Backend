// a model file with methods
// the model file is defining what a book is for our application.
// The model is represented as a class, each book row in the database will be an instance of the book model.
/* 
“Maintains the relationship between Object and Database and handles validation, association, transactions” */
import Client from '../databases/database';
/*  Did you notice or wonder why its the books (plural) table in the database, but the book (singular) file for the model? That's because the database table will hold many books, but the model file is defining what a book is for our application. */
import { Book } from '../types/book.type';
// models are a class in our code that can be used as a template to create items that are stored as rows in the table.
/* 
The model is represented as a class, each book row in the database will be an instance of the book model.
 */

import queries from '../queries/books.queries';

export default class BookStore {
  async index(): Promise<Book[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getBooks;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = queries.getBook;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }

  async create(b: Book): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = queries.addBook;
      const result = await conn.query(sql, [
        b.title,
        b.author,
        b.total_pages,
        b.summary,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
    }
  }

  async update(id: string, data: Book): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = queries.updateBook;
      const result = await conn.query(sql, [
        data.title,
        data.author,
        data.total_pages,
        data.summary,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update book ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = queries.removeBook;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }

  // authenticate a book
}
