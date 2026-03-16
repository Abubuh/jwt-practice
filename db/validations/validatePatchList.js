import { Validation } from "./validations.js";

export const validatePatchList = (req, res, next) => {
  const { title } = req.body;
  Validation.todoTitle(title, { required: true });
  next();
};
