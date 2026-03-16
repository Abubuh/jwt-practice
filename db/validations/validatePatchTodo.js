import { Validation } from "./validations.js";

export const validatePatchTodo = (req, res, next) => {
  const { title, priority, description } = req.body;
  Validation.todoTitle(title, { required: false });
  Validation.description(description, { required: false });
  Validation.priority(priority, { required: false });
  next();
};
