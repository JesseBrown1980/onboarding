const globals = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { makeToken } = require("./utils");

const { describe, it, expect } = globals;

// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

describe("GET /api/onboarding", () => {
  it("should allow get onboarding form request from thomas.", async () => {
    const token = makeToken(1);
    const res = await request(app)
      .get("/api/onboarding")
      .set("x-access-token", token);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      steps: [
        [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
          },
          {
            name: "bio",
            label: "Bio",
            type: "multiline-text",
          },
        ],
        [
          {
            name: "country",
            label: "Country",
            type: "text",
            required: true,
          },
          {
            name: "receiveNotifications",
            label:
              "I would like to receive email notifications for new messages when I'm logged out",
            type: "yes-no",
            required: true,
          },
          {
            name: "receiveUpdates",
            label:
              "I would like to receive updates about the product via email",
            type: "yes-no",
            required: true,
          },
        ],
      ],
    });
  });
});

describe("POST /api/onboarding", () => {
  it("should allow onboarding form request from thomas.", async () => {
    const token = makeToken(1);
    const res = await request(app)
      .post("/api/onboarding")
      .set("x-access-token", token)
      .send({
        steps: [
          [
            {
              name: "firstName",
              value: "Thomas",
            },
            {
              name: "lastName",
              value: "Smith",
            },
            {
              name: "bio",
              value: "This is my bio.",
            },
          ],
          [
            {
              name: "country",
              value: "Canada",
            },
            {
              name: "receiveNotifications",
              value: false,
            },
            {
              name: "receiveUpdates",
              value: true,
            },
          ],
        ],
      });

    expect(res.status).toEqual(200);
    expect(res.body.firstName).toEqual("Thomas");
    expect(res.body.lastName).toEqual("Smith");
    expect(res.body.country).toEqual("Canada");
    expect(res.body.bio).toEqual("This is my bio.");
    expect(res.body.receiveNotifications).toEqual(false);
    expect(res.body.receiveUpdates).toEqual(true);
  });
});
