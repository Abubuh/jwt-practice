import request from "supertest";
import app from "../../index.js";

export const getToken = async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: "111111", password: "111111a" });

  return res.body.token;
};
