import { pool } from "../db/db.js";
export class TodoRepository {
  static async getTodosByListId({ listId }) {
    const todos = await pool.query(
      `
      SELECT * FROM todos
      WHERE list_id = $1
      ORDER BY position ASC
      `,
      [listId]
    );
    return todos.rows;
  }

  static async create(data) {
    const result = await pool.query(
      `INSERT INTO todos 
      (title, priority, created_by, completed, created_at, updated_at, position, list_id, assigned_to, description)
     VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
      [
        data.title,
        data.priority,
        data.userId,
        data.completed,
        data.createdAt,
        data.updatedAt,
        data.position,
        data.listId,
        data.assigned_to,
        data.description,
      ]
    );
    return result.rows[0];
  }

  static async updateTodoById({ listId, todoId, userId, updateData }) {
    const result = await pool.query(
      `UPDATE todos
      SET
        title = COALESCE($1, title),
        completed = COALESCE($2, completed),
        priority = COALESCE($3, priority),
        description = COALESCE($4, description),
        assigned_to = COALESCE($5, assigned_to),
        updated_by = COALESCE($6, updated_by),
        updated_at = NOW()
      WHERE id = $7
        AND created_by = $8
        AND list_id = $9
      RETURNING *`,
      [
        updateData.title ?? null,
        updateData.completed ?? null,
        updateData.priority ?? null,
        updateData.description ?? null,
        updateData.assignedTo ?? null,
        updateData.updatedBy ?? null,
        todoId,
        userId,
        listId,
      ]
    );
    return result.rows[0] ?? null;
  }

  static async getTodoById({ todoId, listId }) {
    const result = await pool.query(
      `SELECT * FROM todos 
     WHERE id = $1
     AND list_id = $2`,
      [todoId, listId]
    );
    return result.rows[0] ?? null;
  }

  static async deleteTodoById(todoId) {
    const result = await pool.query(
      `
      DELETE FROM todos
      WHERE id = $1
      RETURNING *
      `,
      [todoId]
    );
    return result.rows[0] ?? null;
  }

  static async reorderTodos({ listId, reordered }) {
    const ids = reordered.map((t) => t.id);
    const positions = reordered.map((t) => t.position);

    const result = await pool.query(
      `UPDATE todos
       SET position = data.position
       FROM UNNEST($1::uuid[], $2::int[]) AS data(id, position)
       WHERE todos.id = data.id
         AND todos.list_id = $3
       RETURNING *`,
      [ids, positions, listId]
    );

    if (result.rows.length !== reordered.length) {
      throw new Error("Some todos don't belong to this list");
    }
    return result.rows;
  }
  static async countTodosByUser(userId) {
    return await TodoModel.countDocuments({ userId });
  }

  static async getMemberByUserId({ listId, userId }) {
    const result = await pool.query(
      `SELECT * FROM list_members
     WHERE list_id = $1 AND user_id = $2`,
      [listId, userId]
    );
    return result.rows[0] ?? null;
  }
}
