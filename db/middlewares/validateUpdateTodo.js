import { AppError } from "../errors/AppError.js";
import { Validation } from "../validations/validations.js";

const ALLOWED_UPDATE_FIELDS = ["title", "completed", "priority"];
export const validateUpdateTodo = (req, res, next) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return next(new AppError("Nothing to update", 400));
  }
  for (const key of Object.keys(body)) {
    if (!ALLOWED_UPDATE_FIELDS.includes(key)) {
      return next(new AppError(`Field '${key}' cannot be updated`, 400));
    }
  }
  if (body.title !== undefined) {
    Validation.title(body.title, { required: false });
  }

  if (body.priority !== undefined) {
    Validation.priority(body.priority, { required: false });
  }

  if (body.completed !== undefined) {
    Validation.completed(body.completed, { required: false });
  }

  next();
};
