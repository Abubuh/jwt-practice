import { Validation } from "./validations.js";

export const validateLoginUser = (req, res, next) => {
  const { username, password } = req.body;
  Validation.username(username);
  if (password === undefined) throw new AppError("Password is required", 400);
  next();
};
