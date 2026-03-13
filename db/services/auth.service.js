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
    const normalizedUsername = username.trim().toLowerCase();
    const user = await UserRepository.findByUsername(normalizedUsername);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = this.generateToken({
      id: user.id,
      username: user.username,
    });
    return {
      id: user.id,
      username: user.username,
      token,
    };
  }

  static async create({ username, password }) {
    const normalizedUsername = username.trim().toLowerCase();
    const userExists = await UserRepository.findByUsername(normalizedUsername);
    if (userExists) {
      throw new AppError("User already exists", 409);
    }
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await UserRepository.createUser({
      id,
      username: normalizedUsername,
      passwordHash: hashedPassword,
    });
    const token = this.generateToken({
      id,
      username: normalizedUsername,
    });
    return {
      id,
      username: normalizedUsername,
      token,
    };
  }
}
