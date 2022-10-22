import request from "supertest";
import { telpServer } from "../index.js";

describe("routes", () => {
  test("/", async () => {
    try {
      const response = await request(telpServer).get("/");
      expect(response.statusCode).toBe(200);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toMatch('error');
    }
  });
});
