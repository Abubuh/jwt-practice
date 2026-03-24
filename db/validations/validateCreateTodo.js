import { Validation } from "./validations.js";

export const validateCreateTodo = (req, res, next) => {
  const { title, priority, description } = req.body;
  Validation.todoTitle(title, { required: true });
  Validation.description(description, { required: false });
  Validation.priority(priority, { required: false });
  next();
};
