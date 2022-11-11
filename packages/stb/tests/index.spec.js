// @ts-check
import { test, expect } from "@playwright/test";

test("img tag with src", async ({ page }) => {
  await page.goto("http://localhost:3113");
  page.reload();
  const artImg = page.getByRole("img");
  await expect(artImg).toHaveAttribute(
    "src",
    RegExp("https://lh*.ggpht|googleusercontent.com/.*")
  );
  page.reload();
});
