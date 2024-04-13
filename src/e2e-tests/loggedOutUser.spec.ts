import { test, expect } from "@playwright/test";

test("logged out user should see sign in button", async ({ page }) => {
  await page.goto("/");

  // the categories that should be visible and functional
  const login = page.locator("button", { hasText: "Sign in" });

  await expect(login).toBeVisible();
});
