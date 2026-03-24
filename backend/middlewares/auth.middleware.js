import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function authMiddleware(req, res, next) {
  //leer el header auth
  const authHeader = req.headers.authorization;

  //Si no hay header -> No esta autenticado
  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  //Formato esperado: Bearer token
  const token = authHeader.split(" ")[1];

  //Verificar token, usando jwt verify pasandole token y el secret
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //Guardar info confiable en el request
    req.user = decoded;

    //Continuar la ruta
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
