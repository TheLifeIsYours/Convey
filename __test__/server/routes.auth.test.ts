import request from "supertest"
import app from "../../src/server/app"

describe("books api", () => {
  const userData = {
    email: "email@eail.com",
    given_name: "John",
    family_name: "Doe",
    password: "1234"
  }

  it("can sign up user", async () => {
    await request(app).post("/auth/signup").send(userData).expect(200);
  });

  it("can't sign up same user twice", async () => {
    await request(app).post("/auth/signup").send(userData).expect(401);
  })
});