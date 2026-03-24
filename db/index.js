import express from "express";
import cors from "cors";
import routerTodos from "./routes/todo.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {
  loginController,
  registerController,
  searchUsersController,
} from "./controllers/user.controller.js";
import routerLists from "./routes/list.js";
import { validateCreateUser } from "./validations/ValidateCreateUser.js";
import { validateLoginUser } from "./validations/validateLoginUser.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.render("example", { name: "Abubuh" });
});

app.use("/api", routerTodos);
app.use("/api", routerLists);
app.use(errorHandler);

app.post("/login", validateLoginUser, loginController);

app.post("/register", validateCreateUser, registerController);

//-^-Done-^-//

app.post("/logout", (req, res) => {});

app.get("/protected", (req, res) => {});

app.use((err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
});

app.get("/users/search", authMiddleware, searchUsersController);
export default app;
