import { Validation } from "./validations.js";

export const validateLoginUser = (req, res, next) => {
  const { username, password } = req.body;
  Validation.username(username);
  Validation.password(password);
  next();
};
