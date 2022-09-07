import request from "supertest";
import { telpServer } from "../index.js";

describe("Routes", () => {
  test("root", async () => {
    const response = await request(telpServer).get("/");
    expect(response.statusCode).toBe(200);
  });
});
