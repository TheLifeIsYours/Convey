const session = require('supertest-session')
const app = require("../../src/server/app")

let testSession = null

beforeEach(() => {
  testSession = session(app)
})

describe("convey web api", () => {
  const userData = {
    email: "email@eail.com",
    given_name: "John",
    family_name: "Doe",
    password: "1234"
  }

  it("can sign up user", async () => {
    await testSession.post("/auth/signup").send(userData).expect(200);
  });

  it("can't sign up same user twice", async () => {
    await testSession.post("/auth/signup").send(userData).expect(403);
  })

  it("should signout", async () => {
    await testSession.get("/auth/signout").expect(200);
  })

  it("should sign in", async () => {
    await testSession.post("/auth/signin").send({email: userData.email, password: userData.password}).expect(200)
  })

  it("should not get profile when not logged in", async () => {
    await testSession.get("/api/profile").expect(401);
  })

  
  it("should get profile when logged in", async () => {
    await testSession
      .post("/auth/signin")
      .send({
        email: userData.email,
        password: userData.password
      }).expect(200);
      
      await testSession.get("/api/profile").expect(200);
  })
});