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
}
