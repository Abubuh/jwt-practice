import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTodoController,
  deleteController,
  getTodoById,
  getTodosByListIdController,
  reorderController,
  updateTodoController,
} from "../controllers/todo.controller.js";
import { validateCreateTodo } from "../validations/validateCreateTodo.js";
import { validatePatchTodo } from "../validations/validatePatchTodo.js";

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
routerTodos.post(
  "/lists/:listId/todos",
  authMiddleware,
  validateCreateTodo,
  createTodoController
);

routerTodos.patch(
  "/lists/:listId/todos/:todoId",
  authMiddleware,
  validatePatchTodo,
  updateTodoController
);

routerTodos.delete(
  "/lists/:listId/todos/:todoId",
  authMiddleware,
  deleteController
);

routerTodos.get("/lists/:listId/todos/:todoId", authMiddleware, getTodoById);

//-^-Done-^-//

routerTodos.patch(
  "/lists/:listId/todos/reorder",
  authMiddleware,
  reorderController
);

export default routerTodos;
