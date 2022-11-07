// @ts-check
import { test, expect } from "@playwright/test";

test("img tag with src", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const artImg = page.getByRole("img");
  await expect(artImg).toHaveAttribute(
    "src",
    "https://lh3.googleusercontent.com/oWONuEDeJ2NGYxIEM1gpSSoKDBtkOIsi8_-0d2PZ_znAmHzv5OFFLIRR18f9WGjUPvCRqu9rYcbyge4iIC_OS2p1s95_=s0"
  );
});
