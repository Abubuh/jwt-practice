import { pool } from "../db/db.js";

export class ListMemberRepository {
  static async getMemberByUserId({ listId, userId }) {
    const result = await pool.query(
      `SELECT * FROM list_members
     WHERE list_id = $1 AND user_id = $2`,
      [listId, userId]
    );
    return result.rows[0] ?? null;
  }

  static async getMemberById({ memberId }) {
    const result = await pool.query(
      `SELECT * FROM list_members WHERE user_id = $1`,
      [memberId]
    );
    return result.rows[0] ?? null;
  }

  static async addMemberRepository({ listId, userId, role }) {
    const result = await pool.query(
      `INSERT INTO list_members (id, list_id, user_id, role)
     VALUES (gen_random_uuid(), $1, $2, $3)
     RETURNING *`,
      [listId, userId, role]
    );
    return result.rows[0];
  }

  static async getListMembers({ listId, userId }) {
    const result = await pool.query(
      `
      SELECT 
        list_members.id,
        list_members.list_id,
        list_members.role,
        list_members.joined_at,
        users.id AS user_id,
        users.username
      FROM list_members
      JOIN users ON list_members.user_id = users.id
      WHERE list_members.list_id = $1
      `,
      [listId]
    );
    return result.rows;
  }

  static async deleteUserFromList({ userToRemoveId }) {
    const result = await pool.query(
      `
        DELETE FROM list_members
        WHERE id = $1
        RETURNING *
        `,
      [userToRemoveId]
    );
    return result.rows[0] ?? null;
  }

  static async patchMember({ memberId, role }) {
    console.log(memberId, role);
    const result = await pool.query(
      `UPDATE list_members
     SET role = $1
     WHERE user_id = $2
     RETURNING *`,
      [role, memberId]
    );
    return result.rows[0] ?? null;
  }
}
