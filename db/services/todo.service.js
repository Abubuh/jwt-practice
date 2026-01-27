import crypto from "node:crypto";
import { Validation } from "../validations/validations.js";
import { TodoRepository } from "../repositories/todo-repository.js";
import { AppError } from "../errors/AppError.js";
const ALLOWED_UPDATE_FIELDS = ["title", "completed", "priority"];

export default class TodoService {
  static async createTodo({ title, priority, userId }) {
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
      await TodoRepository.create(todo);
    } catch (error) {
      throw new Error("Create Todo Failed", 500, "TODO_CREATE_FAILED", error);
    }
    return todo;
  }

  static async getAllTodos(userId) {
    const todos = await TodoRepository.getTodosByUserId(userId);
    return todos;
  }

  // static async getAllTodos(userId) {
  //   try {
  //     const Todos = await TodoRepository.getTodosByUserId(userId);
  //     return Todos;
  //   } catch (error) {
  //     throw new Error("Something unexpected occurred");
  //   }
  // }

  static async getTodo(todoId, userId) {
    try {
      const Todo = await TodoRepository.getTodoById(todoId);
      if (Todo.userId !== userId) throw new AppError("Todo not found", 400);
      return Todo;
    } catch (error) {
      throw new AppError("Todo not found", 400);
    }
  }

  static async updateTodo(todoId, userId, data) {
    const todo = await TodoRepository.getTodoById(todoId);
    if (!todo || todo.userId !== userId) {
      throw new AppError("Todo not found", 404);
    }

    const update = {};
    for (const key of ALLOWED_UPDATE_FIELDS) {
      if (data[key] !== undefined) {
        update[key] = data[key];
      }
    }
    if (Object.keys(update).length === 0) {
      throw new AppError("Nothing to update", 400);
    }
    return await TodoRepository.updateTodoById(todoId, update);
  }

  static async deleteTodo(todoId, userId) {
    const todo = await TodoService.getTodo(todoId, userId);
    if (!todo) throw new AppError("Todo not found", 404);
    if (todo.userId !== userId)
      throw new AppError("This is not your todo", 404);
    return await TodoRepository.deleteTodoById(todoId);
  }
}
