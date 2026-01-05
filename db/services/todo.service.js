import crypto from "node:crypto";
import { Validation } from "../validations/validations.js";
import { TodoRepository } from "../repositories/todo-repository.js";

export default class TodoService {
  static createTodo({ title, priority, userId }) {
    Validation.title(title);
    Validation.priority(priority);
    const now = new Date().toISOString();

    const todo = {
      _id: crypto.randomUUID(),
      title: title,
      priority: priority,
      userId: userId,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    try {
      TodoRepository.create(todo);
    } catch (error) {
      throw new Error(error.message);
    }
    return todo;
  }

  static async getAllTodos({ userId }) {
    try {
      const Todos = await TodoRepository.getTodosByUserId({ userId: userId });
      return Todos;
    } catch (error) {
      throw new Error("Something unexpected occurred");
    }
  }

  static async getTodo(todoId) {
    try {
      const Todo = await TodoRepository.getTodoById(todoId);
      return Todo;
    } catch (error) {
      throw new Error("Todo not found");
    }
  }

  static async updateTodo(todoId, data) {
    if (!data.title && data.completed === undefined) {
      throw new Error("Nothing to update");
    }
    return await TodoRepository.updateTodoById(todoId, data);
  }
}
