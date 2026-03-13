import crypto from "node:crypto";
import { TodoRepository } from "../repositories/todo-repository.js";
import { AppError } from "../errors/AppError.js";

export default class TodoService {
  static async createTodo({
    title,
    priority,
    userId,
    listId,
    description = null,
  }) {
    const normalizedDescription = description?.trim().replace(/\s+/g, " ");
    const normalizedTitle = title?.trim().replace(/\s+/g, " ");
    console.log(description, title);
    const now = new Date().toISOString();
    const todos = await TodoRepository.getTodosByListId({ listId, userId });
    const totalTodos = todos.length;
    const todo = {
      id: crypto.randomUUID(),
      listId: listId,
      description: normalizedDescription,
      title: normalizedTitle,
      priority: priority ?? "low",
      userId: userId,
      completed: false,
      created_by: userId,
      assigned_to: null,
      createdAt: now,
      updatedAt: now,
      position: totalTodos + 1,
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

  static async getAllTodos({ listId, userId }) {
    const todos = await TodoRepository.getTodosByListId({ listId, userId });
    return todos;
  }

  static async getTodoByIds({ todoId, userId, listId }) {
    const todo = await TodoRepository.getTodoById({ todoId, listId, userId });
    if (!todo) throw new AppError("Todo not found", 404);
    return todo;
  }

  static async updateTodo(listId, todoId, userId, updateData) {
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new AppError("Nothing to update", 400);
    }
    const updatedTodo = await TodoRepository.updateTodoById({
      todoId,
      userId,
      listId,
      updateData,
    });
    if (!updatedTodo) throw new AppError("Todo not found", 404);
    return updatedTodo;
  }

  static async deleteTodo(todoId, userId, listId) {
    const todo = await TodoService.getTodoByIds({ todoId, userId, listId });
    if (!todo || todo.created_by !== userId)
      throw new AppError("Todo not found", 404);
    return await TodoRepository.deleteTodoById(todoId);
  }

  static async reorderTodos({ listId, userId, todos }) {
    // Asegurarse que todos pertenezcan al usuario
    console.log({ listId, userId, todos });
    if (!todos || todos.length === 0) {
      throw new AppError("Nothing to reorder", 400);
    }

    const ids = todos.map((t) => t._id);
    // Reasignar order limpio
    const reordered = await TodoRepository.reorderTodos({
      listId,
      userId,
      todos: ids.map((id, index) => ({
        id,
        position: todos.find((t) => t.id === id).position,
      })),
    });
    if (!reordered) throw new AppError("Reorder failed", 400);
    return reordered;
  }
}
