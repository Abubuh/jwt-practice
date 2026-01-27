import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import TodoService from "../services/todo.service.js";

const router = express.Router();

router.post("/create/todo", authMiddleware, async (req, res, next) => {
  try {
    const { title, priority } = req.body;
    console.log(title, priority);
    const userId = req.user.userId;
    const todo = await TodoService.createTodo({ title, priority, userId });
    return res.status(201).json({
      ok: true,
      message: "Todo created",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/user/todos", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const todos = await TodoService.getAllTodos(userId);
    res.status(200).json({
      ok: true,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/user/todos/update/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, completed, priority } = req.body;
    await TodoService.updateTodo(id, userId, {
      title,
      completed,
      priority,
    });
    res.status(200).json({
      ok: true,
      message: "Todo updated",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/user/todo/:id", authMiddleware, async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.userId;
    console.log(todoId, userId);
    await TodoService.deleteTodo(todoId, userId);
    res.json(200).json({
      ok: true,
      message: "Todo deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/user/todos/:id", authMiddleware, async (req, res, next) => {
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
export default router;
