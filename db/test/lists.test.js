import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";
import { getToken } from "./helpers/getToken.js";

describe("GET /api/lists", () => {
  it("should return lists for authenticated user", async () => {
    const token = await getToken();

    const res = await request(app)
      .get("/api/lists")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it("should return 401 if no token", async () => {
    const res = await request(app).get("/api/lists");

    expect(res.status).toBe(401);
  });
});

describe("POST /api/lists", () => {
  it("should create a list", async () => {
    const token = await getToken();

    const res = await request(app)
      .post("/api/lists")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test list" });

    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it("should return 400 if title is missing", async () => {
    const token = await getToken();

    const res = await request(app)
      .post("/api/lists")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/lists/:listId", () => {
  it("should update a list", async () => {
    const token = await getToken();

    // Primero creamos una lista
    const created = await request(app)
      .post("/api/lists")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "List to update" });

    const listId = created.body.data.id;

    // Luego la actualizamos
    const res = await request(app)
      .patch(`/api/lists/${listId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated title" });

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("Updated title");
  });
});
