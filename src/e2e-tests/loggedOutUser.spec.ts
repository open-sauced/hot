import { test, expect } from "@playwright/test";

test("logged out user should see all categories", async ({ page }) => {
  await page.goto("/");

  // the categories that should be visible and functional
  const recent = page.locator("a", { hasText: "Recent" });

  await expect(recent).toHaveAttribute("href", "/recent");
  await expect(recent).toBeVisible();

  const discussed = page.locator("a", { hasText: "Discussed" });

  await expect(discussed).toHaveAttribute("href", "/discussed");
  await expect(discussed).toBeVisible();

  const popular = page.locator("a", { hasText: "Popular" });

  await expect(popular).toHaveAttribute("href", "/popular");
  await expect(popular).toBeVisible();

});
