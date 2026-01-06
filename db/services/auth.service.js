import { UserRepository } from "../repositories/user-repository.js";
import { Validation } from "../validations/validations.js";
import bcrypt from "bcrypt";
import { JWT_SECRET, SALT_ROUNDS } from "../config.js";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

//Se encarga de:
//Cuando crear, si se puede crear algo, si algo es valido, que datos finales se usan.
export class UserService {
  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = await UserRepository.findByUsername({ username: username });
    if (!user) throw new Error("User not found");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("password is invalid");

    //const { password: _, ...publicUser } = user; - no usaremos publicUser

    //Creamos token(usamos jwt del paquete, .sign para iniciarlo, le pasamos el id y username en el primer objeto, en el segundo pasamos el secret y en cuanto tiempo expira)
    const token = jwt.sign(
      {
        userId: user._id, //<-- Cuidado con los nombres/typos
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // return publicUser, token; - Simplificado, mas rapido (No recomendada)

    return {
      //mejor control de informacion
      username: user.username,
      id: user._id,
      token,
    };
  }

  static async create({ username, password }) {
    //Validaciones
    Validation.username(username);
    Validation.password(password);
    //Que sean unicos
    const userExists = await UserRepository.findByUsername(username);
    if (!userExists) {
      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await UserRepository.createUser({ id, username, hashedPassword });
      return {
        id: id,
        username,
        hashedPassword,
      };
    }
  }
}
