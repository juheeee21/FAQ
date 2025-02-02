/* eslint-disable no-undef */
const request = require("supertest");
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const app = require("../server");
const mongoose = require("mongoose");

describe("FAQ API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  it("should create a new FAQ", async () => {
    const res = await request(app)
      .post("/api/faqs")
      .send({ question: "What is Node.js?", answer: "Node.js is a runtime environment." });

    expect(res.status).toBe(201);
    expect(res.body.question).toBe("What is Node.js?");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
