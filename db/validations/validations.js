import { AppError } from "../errors/AppError.js";

export class Validation {
  static username(username) {
    if (typeof username !== "string")
      throw new AppError("Username must be a string", 400);
    if (username.length < 5)
      throw new AppError("Username must be at least 5 characters long", 400);
  }

  static password(password) {
    if (typeof password !== "string")
      throw new AppError("Password must be a string", 400);
    if (password.length < 6)
      throw new AppError("Password must be at least 6 characters long", 400);
  }

  static title(title, { required = true } = {}) {
    if (title === undefined) {
      if (required) {
        throw new AppError("Todo needs a title!", 400);
      }
      return;
    }
    if (typeof title !== "string") {
      throw new AppError("Title must be a string", 400);
    }

    if (title.trim().length === 0) {
      throw new AppError("Title cannot be empty", 400);
    }

    if (title.trim().length < 4) {
      throw new AppError("Title must be at least 3 characters long", 400);
    }
  }

  static completed(completed, { required = true } = {}) {
    if (completed === undefined) {
      if (required) {
        throw new AppError("Completed is required", 400);
      }
      return;
    }
    if (typeof completed !== "boolean")
      throw new AppError("Completed must be a boolean", 400);
  }

  static priority(priority, { required = true } = {}) {
    if (priority === undefined) {
      if (required) {
        throw new AppError("Todo needs a priority", 400);
      }
      return;
    }
    if (typeof priority !== "string")
      throw new AppError("Priority must be a string", 400);
    const priorities = ["low", "medium", "high"];
    if (!priorities.includes(priority.toString().toLowerCase()))
      throw new AppError("Priority must be at least Low, Medium or High", 400);
  }
}
