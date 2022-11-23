// @ts-check
import { test, expect } from "@playwright/test";

test("homepage", async ({ page }) => {
  await page.goto("http://localhost:3113");
  page.reload();
  const artImg = page.getByRole("img");
  await expect(artImg).toHaveAttribute("src", RegExp("http:/.*user/api/v1.*"));
});
