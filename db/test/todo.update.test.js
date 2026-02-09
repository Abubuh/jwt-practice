import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../index.js";

vi.mock("../middlewares/auth.middleware.js", () => ({
  authMiddleware: (req, res, next) => {
    req.user = { userId: "test-user-id" };
    next();
  },
}));

vi.mock("../services/todo.service.js", () => ({
  default: {
    updateTodo: vi.fn().mockResolvedValue({}),
  },
}));

describe("PATCH /api/user/todos/update/:id", () => {
  it("updates title only", async () => {
    const res = await request(app)
      .patch("/api/user/todos/update/123")
      .send({ title: "Nuevo título" });

    expect(res.status).toBe(200);
  });

  it("updates completed only", async () => {
    const res = await request(app)
      .patch("/api/user/todos/update/123")
      .send({ completed: true });

    expect(res.status).toBe(200);
  });

  it("fails when body is empty", async () => {
    const res = await request(app).patch("/api/user/todos/update/123").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Nothing to update");
  });

  it("fails when sending invalid field", async () => {
    const res = await request(app)
      .patch("/api/user/todos/update/123")
      .send({ hack: true });

    expect(res.status).toBe(400);
  });
});
