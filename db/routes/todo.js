import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import TodoService from "../services/todo.service.js";

const router = express.Router();

router.post("/todos", authMiddleware, async (req, res) => {
  try {
    const { title, priority } = req.body;
    const userId = req.user.userId;
    const todo = TodoService.createTodo({ title, priority, userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/todos/test", authMiddleware, (req, res) => {
  res.json({
    message: "Token valido",
    user: req.user,
  });
});

export default router;
