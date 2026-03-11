import dbLocal from "db-local";
const { db, Schema } = new dbLocal({ path: "./db" });

const Todo = Schema("Todo", {
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  order: { type: Number, null: false },
});

export class TodoRepository {
  static async getTodosByListId(userId) {
    const todos = Todo.find({ userId: userId });
    return todos.sort((a, b) => a.order - b.order);
  }

  static async create(todo) {
    return Todo.create(todo).save();
  }

  static async updateTodoById(todoId, data) {
    const todo = await Todo.findOne({ _id: todoId });
    if (!todo) return null;

    Object.assign(todo, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return await todo.save();
  }

  static async getTodoById(todoId) {
    return await Todo.findOne({ _id: todoId });
  }

  static async deleteTodoById(todoId) {
    return await Todo.remove({ _id: todoId });
  }

  static async getTodosByUserPaginated(userId, skip, limit) {
    return await TodoModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  static async updateOrder(userId, reordered) {
    for (const updated of reordered) {
      const todo = await Todo.findOne({
        _id: updated.id,
        userId: userId,
      });
      console.log("buscando:", updated.id);
      console.log("ENCONTRADO:", todo);
      if (todo) {
        todo.order = updated.order;
        await todo.save();
      }
    }
  }
  static async countTodosByUser(userId) {
    return await TodoModel.countDocuments({ userId });
  }
}
