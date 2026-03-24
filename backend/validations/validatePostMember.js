import { Validation } from "./validations.js";

export const validatePostMember = (req, res, next) => {
  const { role } = req.body;
  Validation.role(role);
  next();
};
