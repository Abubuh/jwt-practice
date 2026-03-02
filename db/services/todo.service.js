import crypto from "node:crypto";
import { TodoRepository } from "../repositories/todo-repository.js";
import { AppError } from "../errors/AppError.js";

export default class TodoService {
  static async createTodo({ title, priority, userId }) {
    const now = new Date().toISOString();
    const todos = await TodoRepository.getTodosByUserId(userId);
    const totalTodos = todos.length;
    const todo = {
      _id: crypto.randomUUID(),
      title: title.trim().replace(/\s+/g, " "),
      priority: priority ?? "low",
      userId: userId,
      completed: false,
      createdAt: now,
      updatedAt: now,
      order: totalTodos + 1,
    };
    try {
      await TodoRepository.create(todo);
    } catch (error) {
      throw new AppError(
        "Create Todo Failed",
        500,
        "TODO_CREATE_FAILED",
        error
      );
    }
    return todo;
  }

  static async getAllTodos(userId) {
    const todos = await TodoRepository.getTodosByUserId(userId);
    return todos;
  }

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
    if (!data || Object.keys(data).length === 0) {
      throw new AppError("Nothing to update", 400);
    }
    const todo = await TodoRepository.getTodoById(todoId);
    if (!todo || todo.userId !== userId) {
      throw new AppError("Todo not found", 404);
    }
    console.log(data);
    return await TodoRepository.updateTodoById(todoId, data);
  }

  static async deleteTodo(todoId, userId) {
    const todo = await TodoService.getTodo(todoId, userId);
    if (!todo || todo.userId !== userId)
      throw new AppError("Todo not found", 404);
    return await TodoRepository.deleteTodoById(todoId);
  }
}
