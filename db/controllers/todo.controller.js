import TodoService from "../services/todo.service.js";
export const updateTodoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const updateData = {};
    if (req.body.title !== undefined)
      updateData.title = req.body.title.trim().replace(/\s+/g, " ");
    if (req.body.completed !== undefined)
      updateData.completed = req.body.completed;
    if (req.body.priority !== undefined)
      updateData.priority = req.body.priority;

    const updatedTodo = await TodoService.updateTodo(id, userId, updateData);

    res.status(200).json({
      ok: true,
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const createTodoController = async (req, res, next) => {
  try {
    const { title, priority } = req.body;
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
};

export const getTodosController = async (req, res, next) => {
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
};
export const reorderController = async (req, res, next) => {
  try {
    const { todos } = req.body;
    const userId = req.user.userId;
    const reorderedTodos = await TodoService.reorderTodos(userId, todos);
    res.status(200).json({
      ok: true,
      data: reorderedTodos,
    });
  } catch (error) {
    next(error);
  }
};
