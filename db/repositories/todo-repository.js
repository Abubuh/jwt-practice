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
    return await Todo.find({ userId });
  }

  static async create(todo) {
    return Todo.create(todo).save();
  }

  // static async updateTodoById(todoId) {
  //   return await Todo.find({ todoId });
  // }

  static async getTodoById(todoId) {
    console.log(todoId);
    return await Todo.findOne({ _id: todoId });
  }
}
