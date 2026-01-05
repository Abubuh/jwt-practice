export class Validation {
  static username(username) {
    if (typeof username !== "string")
      throw new Error("username must be a string");
    if (username.length < 5)
      throw new Error("username must be at least 5 characters long");
  }

  static password(password) {
    if (typeof password !== "string")
      throw new Error("password must be a string");
    if (password.length < 6)
      throw new Error("password must be at least 6 characters long");
  }

  static title(title) {
    if (typeof title !== "string") throw new Error("Title must be a string");
    if (title.length < 3)
      throw new Error("Title must be at least 3 characters long");
  }

  static completed(completed) {
    if (typeof completed !== "boolean")
      throw new Error("Completed must be a boolean");
    if (completed !== "true" || "false")
      throw new Error("Completed must be true or false");
  }

  static priority(priority) {
    if (typeof priority !== "string")
      throw new Error("Priority must be a string");
    const priorities = ["low", "medium", "high"];
    if (!priorities.includes(priority.toString().toLowerCase()))
      throw new Error("Priority must be at least Low, Medium or High");
  }
}
