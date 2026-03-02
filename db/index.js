import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import router from "./routes/todo.js";
import { UserService } from "./services/auth.service.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.render("example", { name: "Abubuh" });
});

app.use("/api", router);
app.use(errorHandler);

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const normalizedUsername = username.toLowerCase();
  try {
    const user = await UserService.login({
      username: normalizedUsername,
      password,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const normalizedUsername = username.toLowerCase();
  try {
    const user = await UserService.create({
      username: normalizedUsername,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

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
