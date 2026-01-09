import crypto from "node:crypto";
import { Validation } from "../validations/validations.js";
import { TodoRepository } from "../repositories/todo-repository.js";
const ALLOWED_UPDATE_FIELDS = ["title", "completed", "priority"];

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
    const todo = await TodoRepository.getTodoById(todoId);
    if (!todo) {
      throw new Error("This todo doenst exist.");
    }
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    if (Object.keys(cleanData).length === 0) {
      throw new Error("Nothing to update");
    }
    try {
      return await TodoRepository.updateTodoById(todoId, cleanData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteTodo(todoId, userId) {
    const todo = await TodoService.getTodo(todoId);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== userId) throw new Error("You cant delete this todo.");
    try {
      return await TodoRepository.deleteTodoById(todoId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
