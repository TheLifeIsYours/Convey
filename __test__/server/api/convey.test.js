import convey from "../../../src/server/api/Convey"

describe("ClientDao tests", () => {
  it("should make clients from client dao", () => {
    expect(convey.createClient({
      "sub":"$2b$15$/GlW07aN3003uxuD5GLlteU5SquJzkQatT9T42mSf5MNVoxx4or8q",
      "name":"Mats Larsen",
      "given_name":"Mats",
      "family_name":"Larsen",
      "picture":"some_image.png",
      "email":"mdl@gmail.com",
      "email_verified":false,
      "locale":"en"
      })).toMatchObject({
        "sub":"$2b$15$/GlW07aN3003uxuD5GLlteU5SquJzkQatT9T42mSf5MNVoxx4or8q",
        "name":"Mats Larsen",
        "given_name":"Mats",
        "family_name":"Larsen",
        "picture":"",
        "email":"mdl@gmail.com",
        "email_verified":false,
        "locale":"en",
        "messages": []
        })
  })
})

describe("get providers", () => {
  it("should be easier", () => {
    expect(2+2).toEqual(4)
  })
})