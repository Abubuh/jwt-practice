import { AppError } from "../errors/AppError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Public error:", err.message);

  if (err.originalError) {
    console.error("Original error:", err.originalError);
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      ok: false,
      message: err.message,
      code: err.code,
    });
  }

  return res.status(500).json({
    ok: false,
    message: "Unexpected error occurred",
    code: "UNEXPECTED_ERROR",
  });
};
