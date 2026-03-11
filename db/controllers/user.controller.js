import { UserService } from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
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
};

export const loginController = async (req, res, next) => {
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
};
