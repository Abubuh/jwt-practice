import TodoService from "../services/todo.service.js";

export const getTodosByListIdController = async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const userId = req.user.userId;
    const todos = await TodoService.getAllTodos({ listId, userId });
    res.status(200).json({
      ok: true,
      message: "Todos Found",
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req, res, next) => {
  const userId = req.user.userId;
  const { todoId, listId } = req.params;
  try {
    const todo = await TodoService.getTodoByIds({ todoId, userId, listId });
    res.status(200).json({
      ok: true,
      message: "Todo found",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const createTodoController = async (req, res, next) => {
  try {
    const { title, priority, description } = req.body;
    const listId = req.params.listId;
    const userId = req.user.userId;
    const todo = await TodoService.createTodo({
      title,
      priority,
      userId,
      listId,
      description,
    });
    return res.status(201).json({
      ok: true,
      message: "Todo created",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodoController = async (req, res, next) => {
  try {
    const { listId, todoId } = req.params;
    const userId = req.user.userId;
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.completed !== undefined)
      updateData.completed = req.body.completed;
    if (req.body.priority !== undefined)
      updateData.priority = req.body.priority;
    if (req.body.description !== undefined)
      updateData.description = req.body.description;
    if (req.body.assignedTo !== undefined)
      updateData.assignedTo = req.body.assignedTo;
    if (req.body.updatedBy !== undefined)
      updateData.updatedBy = req.body.updatedBy;
    const updatedTodo = await TodoService.updateTodo(
      listId,
      todoId,
      userId,
      updateData
    );

    res.status(200).json({
      ok: true,
      message: "Todo updated",
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.user.userId;
    const listId = req.params.listId;
    await TodoService.deleteTodo(todoId, userId, listId);
    res.status(200).json({
      ok: true,
      message: "Todo deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const reorderController = async (req, res, next) => {
  try {
    const { todos } = req.body;
    const listId = req.params.listId;
    const userId = req.user.userId;
    const reorderedTodos = await TodoService.reorderTodos({
      listId,
      userId,
      todos,
    });
    res.status(200).json({
      ok: true,
      message: "Reordered",
      data: reorderedTodos,
    });
  } catch (error) {
    next(error);
  }
};
