import dbLocal from "db-local";
const { Schema } = new dbLocal({ path: "./db" });

const Todo = Schema("Todo", {
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export class TodoRepository {
  static async getTodosByUserId(userId) {
    return await Todo.find({ userId: userId });
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
}
