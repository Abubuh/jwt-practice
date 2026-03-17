import { UserService } from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
  const { username, password } = req.body;
  const normalizedUsername = username.toLowerCase();
  try {
    const user = await UserService.create({
      username: normalizedUsername,
      password,
    });
    res.status(201).json({
      ok: true,
      message: "User created",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { username, password } = req.body;
  const normalizedUsername = username.toLowerCase();
  try {
    const { token, ...user } = await UserService.login({
      username: normalizedUsername,
      password,
    });
    res.status(200).json({
      ok: true,
      message: "Logged in",
      token,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
