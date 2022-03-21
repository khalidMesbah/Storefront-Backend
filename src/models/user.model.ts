import Client from '../databases/database'; // imports the database connection
import User from '../types/user.type';
import hash from '../utilities/hashPassword';
import queries from '../queries/users.queries';
import bcrypt from 'bcrypt';
import env from '../middlewares/config';
export default class UsersTable {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = queries.getUsers;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id_PK: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.getUser;
      const result = await conn.query(sql, [id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id_PK}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.addUser;
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        hash(u.password),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }

  async update(id_PK: string, u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.updateUser;
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        hash(u.password),
        id_PK,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${id_PK}. Error: ${err}`);
    }
  }

  async delete(id_PK: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.removeUser;
      const result = await conn.query(sql, [id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id_PK}. Error: ${err}`);
    }
  }

  // authenticate a user
  async authenticate(id_PK: string, _password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = queries.authenticate;
      const result = await conn.query(sql, [id_PK]);

      let user;
      if (result.rows.length)
        if (bcrypt.compareSync(_password + env.pepper, result.rows[0].password))
          user = result.rows[0];

      conn.release();
      return user || null;
    } catch (err) {
      throw new Error(`Could not authenticate user ${id_PK}. Error: ${err}`);
    }
  }

  async getAll(id_PK: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.getAll;
      const result = await conn.query(sql, [id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not getAll data from a user ${id_PK}. Error: ${err}`
      );
    }
  }
}
