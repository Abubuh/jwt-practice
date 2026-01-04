import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware"; //→ es el filtro de seguridad que valida el JWT

const router = Router(); //→ crea un mini-router de Express
//authMiddleware implica que no cualquiera puede crear posts
router.post("/posts", authMiddleware, (req, res) => {
  const userId = req.user.userId;

  res.json({
    message: "Post creado",
    userId,
  });
});

export default router;
