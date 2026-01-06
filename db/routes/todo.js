import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import TodoService from "../services/todo.service.js";

const router = express.Router();

router.post("/todos", authMiddleware, async (req, res) => {
  try {
    const { title, priority } = req.body;
    const userId = req.user.userId;
    const ToDo = TodoService.createTodo({ title, priority, userId });
    return res.status(201).json(ToDo);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/user/todos", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const ToDos = await TodoService.getAllTodos({ userId });
    return res.status(200).json(ToDos);
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred" });
  }
});

router.patch("/user/todos/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const Todo = await TodoService.updateTodo(id, {
      title,
      completed,
    });
    res.status(200).json(Todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/todos/test", authMiddleware, (req, res) => {
  res.json({
    message: "Token valido",
    user: req.user,
  });
});

export default router;
