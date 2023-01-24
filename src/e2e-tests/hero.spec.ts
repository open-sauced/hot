import {
  test,
  expect,
} from "@playwright/test";

test("should test accessibility", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Open-Source Repositories")
    .click();
  await page.locator(
    "body:has-text(\"OpenSaucedStar us on GitHubSign inFind Open-Source Repositoriesto contribute tod\")",
  )
    .press("Meta+k");
  await page.getByPlaceholder("Search repositories")
    .fill("open-sauced");
  await page.getByPlaceholder("Search repositories")
    .press("ArrowDown");
  const [page1] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole(
      "link",
      { name: "open-sauced/hot open-sauced/hot 🍕The site that recommends the hottest projects on GitHub. Deadreyo ddsuhaimi NsdHSO hokagedemehin bdougie 45 207" },
    )
      .click(),
  ]);

  await page1.getByText("7d")
    .click();
  await page1.locator(".flex > section > div:nth-child(2)")
    .click();
  await page1.locator("span:has-text(\"Contributors\")")
    .click();
  await expect(page1)
    .toHaveURL("https://insights.opensauced.pizza/hot/contributors/filter/open-sauced/hot");
  await page.getByRole("heading", { name: "Find Open-Source Repositories to contribute today" })
    .click();
  await page.locator(
    "body:has-text(\"OpenSaucedStar us on GitHubSign inFind Open-Source Repositoriesto contribute tod\")",
  )
    .press("Meta+k");
  await page.getByPlaceholder("Search repositories")
    .press("Meta+a");
  await page.getByPlaceholder("Search repositories")
    .fill("open-sauced/hot");
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole(
      "link",
      { name: "open-sauced/hot open-sauced/hot 🍕The site that recommends the hottest projects on GitHub. Deadreyo ddsuhaimi NsdHSO hokagedemehin bdougie 45 207" },
    )
      .click(),
  ]);

  await page2.getByText("7d")
    .click();
  await page.locator("div:has-text(\"Find Open-Source Repositoriesto contribute today\")")
    .nth(3)
    .click();
});
