import { AppError } from "../errors/AppError.js";

export class Validation {
  static username(username) {
    if (typeof username !== "string")
      throw new AppError("username must be a string", 400);
    if (username.length < 5)
      throw new AppError("username must be at least 5 characters long", 400);
  }

  static password(password) {
    if (typeof password !== "string")
      throw new AppError("password must be a string", 400);
    if (password.length < 6)
      throw new AppError("password must be at least 6 characters long", 400);
  }

  static title(title) {
    if (!title) throw new AppError("Todo needs a title!", 400);
    if (typeof title !== "string")
      throw new AppError("Title must be a string", 400);
    if (title.length < 3)
      throw new AppError("Title must be at least 3 characters long", 400);
  }

  static completed(completed) {
    if (typeof completed !== "boolean")
      throw new AppError("Completed must be a boolean", 400);
    if (completed !== "true" || "false")
      throw new AppError("Completed must be true or false", 400);
  }

  static priority(priority) {
    if (!priority) throw new AppError("Todo needs a priority", 400);
    if (typeof priority !== "string")
      throw new AppError("Priority must be a string", 400);
    const priorities = ["low", "medium", "high"];
    if (!priorities.includes(priority.toString().toLowerCase()))
      throw new AppError("Priority must be at least Low, Medium or High", 400);
  }
}
