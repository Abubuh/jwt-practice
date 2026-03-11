import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import TodoService from "../services/todo.service.js";
import { validateCreateTodo } from "../middlewares/validateCreateTodo.js";
import { validateUpdateTodo } from "../middlewares/validateUpdateTodo.js";
import {
  createTodoController,
  deleteController,
  getTodosController,
  reorderController,
  updateTodoController,
} from "../controllers/todo.controller.js";

const routerTodos = express.Router();
routerTodos.use(authMiddleware);

routerTodos.get("/auth/validate", authMiddleware, (req, res) => {
  res.json({ valid: true });
});

routerTodos.patch("/todos/:id", validateUpdateTodo, updateTodoController);

routerTodos.delete("/todos/:id", deleteController);

routerTodos.get("/todos/:id", async (req, res, next) => {
  const userId = req.user.userId;
  const todoId = req.params.id;
  try {
    const todo = await TodoService.getTodo(todoId, userId);
    res.status(200).json({
      ok: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
});

routerTodos.patch("/todos/reorder", authMiddleware, reorderController);

export default routerTodos;
