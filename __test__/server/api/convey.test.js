const convey = require('../../../src/server/api/Convey')

describe("Convey api", () => {
  it("should get", () => {
    expect(convey.roomDao.getRooms().length).toBe(0)
  })
})