import { describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import app from "../index.js";
import { getToken } from "./helpers/getToken.js";

const cleanupLists = async () => {
  const token = await getToken();
  const listRes = await request(app)
    .get("/api/lists")
    .set("Authorization", `Bearer ${token}`);

  if (listRes.body?.data?.length) {
    await Promise.all(
      listRes.body.data.map((item) =>
        request(app)
          .delete(`/api/lists/${item.id}`)
          .set("Authorization", `Bearer ${token}`)
      )
    );
  }
};

afterEach(async () => {
  await cleanupLists();
});

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

  it("should return only authenticated user's lists", async () => {
    const unique = Date.now();
    const userA = `user-a-${unique}`;
    const userB = `user-b-${unique}`;
    const password = "pass123";

    await request(app).post("/register").send({ username: userA, password });
    await request(app).post("/register").send({ username: userB, password });

    const loginA = await request(app)
      .post("/login")
      .send({ username: userA, password });
    const loginB = await request(app)
      .post("/login")
      .send({ username: userB, password });

    const tokenA = loginA.body.token;
    const tokenB = loginB.body.token;

    await request(app)
      .post("/api/lists")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ title: "List A" });

    await request(app)
      .post("/api/lists")
      .set("Authorization", `Bearer ${tokenB}`)
      .send({ title: "List B" });

    const resA = await request(app)
      .get("/api/lists")
      .set("Authorization", `Bearer ${tokenA}`);

    expect(resA.status).toBe(200);
    expect(resA.body.ok).toBe(true);
    expect(resA.body.data.some((list) => list.title === "List A")).toBe(true);
    expect(resA.body.data.some((list) => list.title === "List B")).toBe(false);

    const resB = await request(app)
      .get("/api/lists")
      .set("Authorization", `Bearer ${tokenB}`);

    expect(resB.status).toBe(200);
    expect(resB.body.ok).toBe(true);
    expect(resB.body.data.some((list) => list.title === "List B")).toBe(true);
    expect(resB.body.data.some((list) => list.title === "List A")).toBe(false);
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
