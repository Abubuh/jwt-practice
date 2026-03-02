import { UserRepository } from "../repositories/user-repository.js";
import { Validation } from "../validations/validations.js";
import bcrypt from "bcrypt";
import { JWT_SECRET, SALT_ROUNDS } from "../config.js";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { AppError } from "../errors/AppError.js";

//Se encarga de:
//Cuando crear, si se puede crear algo, si algo es valido, que datos finales se usan.
export class UserService {
  static generateToken({ id, username }) {
    return jwt.sign({ userId: id, username }, JWT_SECRET, { expiresIn: "1h" });
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);
    const normalizedUsername = username.toLowerCase();
    console.log(normalizedUsername);
    const user = await UserRepository.findByUsername(normalizedUsername);
    if (!user) throw new AppError("Invalid credentials", 400);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError("Invalid credentials", 400);

    //const { password: _, ...publicUser } = user; - no usaremos publicUser

    //Creamos token(usamos jwt del paquete, .sign para iniciarlo, le pasamos el id y username en el primer objeto, en el segundo pasamos el secret y en cuanto tiempo expira)
    const token = this.generateToken({
      id: user._id,
      username: user.username,
    });

    // return publicUser, token; - Simplificado, mas rapido (No recomendada)

    return {
      //mejor control de informacion
      username: user.username,
      id: user._id,
      token,
    };
  }

  static async create({ username, password }) {
    Validation.username(username);
    Validation.password(password);
    const normalizedUsername = username.toLowerCase();
    const userExists = await UserRepository.findByUsername(username);
    if (userExists) {
      throw new AppError("User already exists", 409);
    } else {
      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await UserRepository.createUser({ id, username, hashedPassword });
      const token = this.generateToken({
        id,
        username: normalizedUsername,
      });
      return {
        id: id,
        username,
        token,
      };
    }
  }
}
