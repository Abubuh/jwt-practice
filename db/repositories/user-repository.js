import { pool } from "../db/db.js";

//UserRepository- Se encarga de CRUD
export class UserRepository {
  static async findByUsername(username) {
    const result = await pool.query(
      `SELECT id, username, password_hash
     FROM users
     WHERE username = $1`,
      [username]
    );

    return result.rows[0];
  }

  static async createUser({ id, username, passwordHash }) {
    const result = await pool.query(
      `INSERT INTO users (id, username, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username`,
      [id, username, passwordHash]
    );

    return result.rows[0];
  }

  static async getUserById(userId) {
    const result = await pool.query(
      `SELECT id, username
     FROM users
     WHERE id = $1`,
      [userId]
    );

    return result.rows[0];
  }
}
