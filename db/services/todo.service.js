import crypto from "node:crypto";
import { TodoRepository } from "../repositories/todo-repository.js";
import { AppError } from "../errors/AppError.js";
import { ListMemberRepository } from "../repositories/list-member-repository.js";

export default class TodoService {
  static async checkMembership({ listId, userId }) {
    const member = await ListMemberRepository.getMemberByUserId({
      listId,
      userId,
    });
    if (!member) {
      throw new AppError("Not authorized", 403);
    }
    return member;
  }

  static async ensureTodoRole({ listId, userId, allowedRoles }) {
    const member = await this.checkMembership({ listId, userId });
    if (!allowedRoles.includes(member.role)) {
      throw new AppError("Not authorized", 403);
    }
    return member;
  }

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
    await this.ensureTodoRole({
      listId,
      userId,
      allowedRoles: ["owner", "admin", "editor"],
    });
    const now = new Date().toISOString();
    const todos = await TodoRepository.getTodosByListId({ listId });
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
    await this.checkMembership({ listId, userId });
    const todos = await TodoRepository.getTodosByListId({ listId });
    return todos;
  }

  static async getTodoByIds({ todoId, userId, listId }) {
    await this.checkMembership({ listId, userId });
    const todo = await TodoRepository.getTodoById({ todoId, listId });
    if (!todo) throw new AppError("Todo not found", 404);
    return todo;
  }

  static async updateTodo(listId, todoId, userId, updateData) {
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new AppError("Nothing to update", 400);
    }
    await this.ensureTodoRole({
      listId,
      userId,
      allowedRoles: ["owner", "admin", "editor"],
    });
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
    await this.ensureTodoRole({
      listId,
      userId,
      allowedRoles: ["owner", "admin"],
    });
    const todo = await TodoRepository.getTodoById({ todoId, listId });
    if (!todo) throw new AppError("Todo not found", 404);
    return await TodoRepository.deleteTodoById(todoId);
  }

  static async reorderTodos({ listId, userId, todos }) {
    await this.ensureTodoRole({
      listId,
      userId,
      allowedRoles: ["owner", "admin", "editor"],
    });
    if (!todos || todos.length === 0) {
      throw new AppError("Nothing to reorder", 400);
    }

    const reordered = await TodoRepository.reorderTodos({
      listId,
      reordered: todos,
    });
    if (!reordered) throw new AppError("Reorder failed", 400);
    return reordered;
  }
}
