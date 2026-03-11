import { pool } from "../db/db.js";

export class ListRepository {
  static async createList({ id, title, userId }) {
    const result = await pool.query(
      `
    INSERT INTO lists (id, title, created_by, position)
    VALUES (
      $1,
      $2,
      $3,
      (
        SELECT COALESCE(MAX(position), 0) + 1
        FROM lists
        WHERE created_by = $3
      )
    )
    RETURNING *;
    `,
      [id, title, userId]
    );

    return result.rows[0];
  }

  static async getLists(userId) {
    const result = await pool.query(
      `
      SELECT
        id,
        title,
        created_by,
        position,
        created_at
      FROM lists
      WHERE created_by = $1
      ORDER BY position ASC
      `,
      [userId]
    );
    return result.rows;
  }

  static async patchList({ userId, listId, title }) {
    const result = await pool.query(
      `
        UPDATE lists
        SET title = $1,
        updated_by = $2
        WHERE id = $3
        RETURNING *
        `,
      [title, userId, listId]
    );
    return result.rows[0];
  }

  static async deleteList({ listId, userId }) {
    const result = await pool.query(
      `
      DELETE FROM lists 
      WHERE id = $1
      AND created_by = $2
      RETURNING *
      `,
      [listId, userId]
    );
    return result.rows[0];
  }

  static async getList({ listId, userId }) {
    const result = await pool.query(
      `
      SELECT * FROM lists
      WHERE id = $1
      AND created_by = $2
      `,
      [listId, userId]
    );
    return result.rows[0];
  }
}
