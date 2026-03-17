import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";

describe("POST /register", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({ username: `testuser_${Date.now()}`, password: "test123" });
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
  });

  it("should throw if username is missing", async () => {
    const res = await request(app)
      .post("/register")
      .send({ password: "test123" });

    expect(res.status).toBe(400);
  });

  it("should throw if password is missing", async () => {
    const res = await request(app)
      .post("/register")
      .send({ username: "testuser" });

    expect(res.status).toBe(400);
  });
});

describe("POST /login", () => {
  it("should login successfully", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "test123" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined(); // 👈 verifica que regrese un token
  });

  it("should throw if credentials are wrong", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "wrongpassword" });

    expect(res.status).toBe(401);
  });
});
