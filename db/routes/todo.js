import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import TodoService from "../services/todo.service.js";

const router = express.Router();

router.post("/create/todo", authMiddleware, async (req, res) => {
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
    const Todos = await TodoService.getAllTodos(userId);
    return res.status(200).json(Todos);
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occurred" });
  }
});

router.put("/user/todos/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, completed } = req.body;
    const Todo = await TodoService.updateTodo(id, userId, {
      title,
      completed,
    });
    res.status(200).json(Todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/user/todo/:id", authMiddleware, async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user.userId;
  console.log("from route", todoId, userId);
  try {
    await TodoService.deleteTodo(todoId, userId);
    res.json(200).json("Deleted successfully");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/todos/test", authMiddleware, (req, res) => {
  res.json({
    message: "Token valido",
    user: req.user,
  });
});

export default router;
