import TodoService from "../services/todo.service.js";
export const updateTodoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
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
