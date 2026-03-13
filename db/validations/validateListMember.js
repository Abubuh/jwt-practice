import { Validation } from "./validations.js";

export const validateListMember = (req, res, next) => {
  const { role } = req.body;
  Validation.role(role);
  next();
};
