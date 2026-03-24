import { describe, it, expect } from "vitest";
import { Validation } from "../../validations/validations.js";

describe("Validation.username", () => {
  it("should throw if username has spaces", () => {
    expect(() => Validation.username("hola mundo")).toThrow(
      "Username cannot contain spaces"
    );
  });

  it("should throw if username is less than 5 characters", () => {
    expect(() => Validation.username("abc")).toThrow(
      "Username must be at least 5 characters long"
    );
  });

  it("should not throw with a valid username", () => {
    expect(() => Validation.username("abcde")).not.toThrow();
  });
});

describe("Validation.password", () => {
  it("should throw if password has spaces", () => {
    expect(() => Validation.password("abc 123")).toThrow(
      "Password cannot contain spaces"
    );
  });

  it("should throw if password has no letters", () => {
    expect(() => Validation.password("12345678")).toThrow(
      "Password must contain at least one letter"
    );
  });

  it("should throw if password has no numbers", () => {
    expect(() => Validation.password("abcdefgh")).toThrow(
      "Password must contain at least one number"
    );
  });

  it("should throw if password is less than 6 characters", () => {
    expect(() => Validation.password("ab1")).toThrow(
      "Password must be at least 6 characters long"
    );
  });

  it("should not throw with a valid password", () => {
    expect(() => Validation.password("abc123")).not.toThrow();
  });
});

describe("Validation.todoTitle", () => {
  it("should throw if title is undefined and required", () => {
    expect(() => Validation.todoTitle(undefined, { required: true })).toThrow(
      "Todo needs a title!"
    );
  });

  it("should not throw if title is undefined and not required", () => {
    expect(() =>
      Validation.todoTitle(undefined, { required: false })
    ).not.toThrow();
  });

  it("should throw if title is empty", () => {
    expect(() => Validation.todoTitle("")).toThrow("Title cannot be empty");
  });

  it("should throw if title is less than 4 characters", () => {
    expect(() => Validation.todoTitle("ab")).toThrow(
      "Title must be at least 3 characters long"
    );
  });

  it("should not throw with a valid title", () => {
    expect(() => Validation.todoTitle("Valid title")).not.toThrow();
  });
});

describe("Validation.priority", () => {
  it("should throw if priority is invalid", () => {
    expect(() => Validation.priority("urgent")).toThrow(
      "Priority must be at least Low, Medium or High"
    );
  });

  it("should not throw with valid priorities", () => {
    expect(() => Validation.priority("low")).not.toThrow();
    expect(() => Validation.priority("medium")).not.toThrow();
    expect(() => Validation.priority("high")).not.toThrow();
  });

  it("should accept uppercase priorities", () => {
    expect(() => Validation.priority("LOW")).not.toThrow();
    expect(() => Validation.priority("HIGH")).not.toThrow();
  });
});

describe("Validation.role", () => {
  it("should throw if role is undefined and required", () => {
    expect(() => Validation.role(undefined, { required: true })).toThrow(
      "Member needs a Role!"
    );
  });

  it("should throw if role is invalid", () => {
    expect(() => Validation.role("superadmin")).toThrow("Role is not valid");
  });

  it("should not throw with valid roles", () => {
    expect(() => Validation.role("owner")).not.toThrow();
    expect(() => Validation.role("admin")).not.toThrow();
    expect(() => Validation.role("editor")).not.toThrow();
    expect(() => Validation.role("viewer")).not.toThrow();
  });
});
