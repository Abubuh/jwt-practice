import { Validation } from "./validations.js";

export const validatePostList = (req, res, next) => {
  const { title } = req.body;
  Validation.listTitle(title);
  next();
};
