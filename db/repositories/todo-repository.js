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
  static async create(todo) {
    return Todo.create(todo).save();
  }
}
