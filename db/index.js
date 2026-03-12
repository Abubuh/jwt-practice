import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import routerTodos from "./routes/todo.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { pool } from "./db/db.js";
import {
  loginController,
  registerController,
} from "./controllers/user.controller.js";
import routerLists from "./routes/list.js";
const result = await pool.query("SELECT * FROM users");
console.log(result.rows);

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.render("example", { name: "Abubuh" });
});

app.use("/api", routerTodos);
app.use("/api", routerLists);
app.use(errorHandler);

app.post("/login", loginController);

app.post("/register", registerController);

//-^-Done-^-//

app.post("/logout", (req, res) => {});

app.get("/protected", (req, res) => {});

app.listen(PORT, () => {
  console.log("Hello from port", PORT);
});

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
export default app;
