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

  async show(users_id_PK: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.getUser;
      const sql2 = queries.getRecentPurchases;
      const result = await conn.query(sql, [users_id_PK]);
      const recentPurchases = await conn.query(sql2, [users_id_PK]);
      conn.release();
      return { ...result.rows[0], theRecentPurchases: recentPurchases.rows };
    } catch (err) {
      throw new Error(`Could not find user ${users_id_PK}. Error: ${err}`);
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

  async update(users_id_PK: string, u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.updateUser;
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        hash(u.password),
        users_id_PK,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${users_id_PK}. Error: ${err}`);
    }
  }

  async delete(users_id_PK: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.removeUser;
      const result = await conn.query(sql, [users_id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${users_id_PK}. Error: ${err}`);
    }
  }

  // authenticate a user
  async authenticate(
    users_id_PK: string,
    _password: string
  ): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = queries.authenticate;
      const result = await conn.query(sql, [users_id_PK]);

      let user;
      if (result.rows.length)
        if (bcrypt.compareSync(_password + env.pepper, result.rows[0].password))
          user = result.rows[0];

      conn.release();
      return user || null;
    } catch (err) {
      throw new Error(
        `Could not authenticate user ${users_id_PK}. Error: ${err}`
      );
    }
  }

  async getAll(users_id_PK: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = queries.getAll;
      const result = await conn.query(sql, [users_id_PK]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not getAll data from a user ${users_id_PK}. Error: ${err}`
      );
    }
  }
}
