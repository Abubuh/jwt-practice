import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import TodoService from "../services/todo.service.js";
import { validateCreateTodo } from "../middlewares/validateCreateTodo.js";
import { validateUpdateTodo } from "../middlewares/validateUpdateTodo.js";
import {
  createTodoController,
  getTodosController,
  reorderController,
  updateTodoController,
} from "../controllers/todo.controller.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/auth/validate", authMiddleware, (req, res) => {
  res.json({ valid: true });
});

router.post("/create/todo", validateCreateTodo, createTodoController);

router.get("/user/todos", getTodosController);

router.patch(
  "/user/todos/update/:id",
  validateUpdateTodo,
  updateTodoController
);

router.delete("/user/todos/:id", async (req, res, next) => {
  console.log("BORRAO");
  try {
    const todoId = req.params.id;
    const userId = req.user.userId;
    await TodoService.deleteTodo(todoId, userId);
    res.json(200).json({
      ok: true,
      message: "Todo deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/user/todos/:id", async (req, res, next) => {
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

router.patch("/user/todos/reorder", authMiddleware, reorderController);

export default router;
