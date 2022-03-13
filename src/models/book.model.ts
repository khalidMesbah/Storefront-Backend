// a model file with methods
// the model file is defining what a book is for our application.
// The model is represented as a class, each book row in the database will be an instance of the book model.
import Client from '../databases/database';
/*  Did you notice or wonder why its the books (plural) table in the database, but the book (singular) file for the model? That's because the database table will hold many books, but the model file is defining what a book is for our application. */
import { Book } from './types/book.type';
// models are a class in our code that can be used as a template to create items that are stored as rows in the table.
/* 
The model is represented as a class, each book row in the database will be an instance of the book model.
 */
export default class BookStore {
  // describe the table
  // a method reading all the rows
  async index(): Promise<Book[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM books';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }
  // get a specific book
  // a method for reading a specific row
  async show(id: string): Promise<Book> {
    try {
      const sql = 'SELECT * FROM books WHERE id=($1)';
      // open a connection with the database
      const conn = await Client.connect();

      // run the query
      const result = await conn.query(sql, [id]);

      // close the connection to the database
      conn.release();

      //  return the created book
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }
  // create a new book
  // a method for creating a book
  async create(b: Book): Promise<Book> {
    try {
      const sql =
        'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        b.title,
        b.author,
        b.total_pages,
        b.summary,
      ]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
    }
  }
  // delete a book
  // a method for deleting a book
  async delete(id: string): Promise<Book> {
    try {
      const sql = 'DELETE FROM books WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }

  // update a book
  // authenticate a book
}
/* 
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    total_pages integer,
    author VARCHAR(255),
    type VARCHAR(100),
    summary text
); */
