import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import TodoService from "../services/todo.service.js";
import {
  createTodoController,
  deleteController,
  getTodoById,
  getTodosByListIdController,
  reorderController,
  updateTodoController,
} from "../controllers/todo.controller.js";

const routerTodos = express.Router();
routerTodos.use(authMiddleware);

routerTodos.get("/auth/validate", authMiddleware, (req, res) => {
  res.json({ valid: true });
});

routerTodos.get(
  "/lists/:listId/todos",
  authMiddleware,
  getTodosByListIdController
);
routerTodos.post("/lists/:listId/todos", authMiddleware, createTodoController);

routerTodos.patch("/lists/:listId/todos/:todoId", updateTodoController);

routerTodos.delete("/lists/:listId/todos/:todoId", deleteController);

routerTodos.get("/lists/:listId/todos/:todoId", authMiddleware, getTodoById);
//-^-Done-^-//

routerTodos.patch(
  "/lists/:listId/todos/reorder",
  authMiddleware,
  reorderController
);

export default routerTodos;
