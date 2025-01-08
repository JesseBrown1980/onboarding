const globals = require("@jest/globals");
const Sequelize = require("sequelize");

globals.jest.doMock("../db/db", () => {
  const fakeDb = new Sequelize("sqlite::memory:", { logging: false });
  return fakeDb;
});

globals.beforeEach(async () => {
  const seed = require("../db/seed");
  await seed();
});

globals.afterAll(async () => {
  const db = require("../db/db");
  db.close();
});
