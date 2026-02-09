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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.login({ username, password });
    res.send({ user });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await UserService.create({ username, password });
    res.send({ id });
  } catch (error) {
    //Checar video para mejorar mensajes de errores :d (como manejar errores como un senior)
    res.status(400).send(error.message);
  }
});

app.post("/logout", (req, res) => {});

app.get("/protected", (req, res) => {});

app.listen(PORT, () => {
  console.log("Hello from port", PORT);
});

export default app;
