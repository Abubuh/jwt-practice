import { Validation } from "../validations/validations.js";

export const validateCreateTodo = (req, res, next) => {
  const { title, priority } = req.body;
  Validation.title(title, { required: true });
  Validation.priority(priority, { required: false });
  next();
};
