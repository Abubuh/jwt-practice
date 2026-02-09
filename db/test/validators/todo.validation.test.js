import { describe, it, expect } from "vitest";
import Validation from "../../validations/validations.js";
import AppError from "../../errors/AppError.js";

describe("Todo validators", () => {
  it("Throws if title is empty", () => {
    expect(() => {
      Validation.title("  ");
    }).toThrow(AppError);
  });

  it("throws if completed is not boolean", () => {
    expect(() => {
      Validation.completed("true");
    }).toThrow(AppError);
  });

  it("Throws if priority is invalid", () => {
    expect(() => {
      Validation.priority("ultra");
    }).toThrow(AppError);
  });
});
