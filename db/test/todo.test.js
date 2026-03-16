import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";
import { getToken } from "./helpers/getToken.js";

describe("POST /api/lists/:listId/todos", () => {
  it("should create a todo", async () => {
    const token = await getToken();

    // Primero creamos una lista
    const list = await request(app)
      .post("/api/lists")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test list" });

    const listId = list.body.data.id;

    // Luego creamos un todo
    const res = await request(app)
      .post(`/api/lists/${listId}/todos`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test todo", priority: "low" });

    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it("should return 400 if title is missing", async () => {
    const token = await getToken();

    const list = await request(app)
      .post("/api/lists")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test list" });

    const listId = list.body.data.id;

    const res = await request(app)
      .post(`/api/lists/${listId}/todos`)
      .set("Authorization", `Bearer ${token}`)
      .send({ priority: "low" });

    expect(res.status).toBe(400);
  });
});
