import {
  test,
} from "@playwright/test";

test("test2", async ({ page }) => {
  await page.goto("https://hot.opensauced.pizza/discussed");
  await page.locator("div:has-text(\"Find Open-Source Repositoriesto contribute today\")")
    .nth(3)
    .click();
  await page.locator(
    "body:has-text(\"OpenSaucedStar us on GitHubSign inFind Open-Source Repositoriesto contribute tod\")",
  )
    .press("Meta+k");
  await page.getByPlaceholder("Search repositories")
    .fill("test");
  const [page4] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole(
      "link",
      { name: "goldbergyoni/javascript-testing-best-practices goldbergyoni/javascript-testing-best-practices 📗🌐 🚢 Comprehensive and exhaustive JavaScript & Node.js testing best practices (December 2022) DouglasMV NoriSte Userbit js-kyle mel-mouk 49 19.9k" },
    )
      .click(),
  ]);

  await page4.getByText("hotFiltered by:goldbergyoni/javascript-testing-best-practices")
    .click();
  await page4.locator(
    "main:has-text(\"RepositoriesShowing 0 -0 of 0RepositoriesDate filter:7d30d3mShowing: RepositoryP\")",
  )
    .click();
  await page.getByPlaceholder("Search repositories")
    .click();
  await page.getByPlaceholder("Search repositories")
    .fill("");
  await page.getByPlaceholder("Search repositories")
    .press("Escape");
  await page.getByPlaceholder("Search repositories")
    .press("Escape");
  await page.getByRole("heading", { name: "Find Open-Source Repositories to contribute today" })
    .click();
  await page.locator(
    "body:has-text(\"OpenSaucedStar us on GitHubSign inFind Open-Source Repositoriesto contribute tod\")",
  )
    .press("Meta+k");
  await page.getByPlaceholder("Search repositories")
    .fill("test");
  await page.getByPlaceholder("Search repositories")
    .press("ArrowDown");
  await page.getByPlaceholder("Search repositories")
    .press("ArrowDown");
  await page.getByPlaceholder("Search repositories")
    .press("ArrowDown");
  const [page5] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole(
      "link",
      { name: "quii/learn-go-with-tests quii/learn-go-with-tests Learn Go with test-driven development leighstillard lotia AlexVPopov gypsydave5 ardinusawan 38 19.0k" },
    )
      .click(),
  ]);

  await page.locator("div:has-text(\"Find Open-Source Repositoriesto contribute today\")")
    .nth(3)
    .click();
  await page.locator(
    "body:has-text(\"OpenSaucedStar us on GitHubSign inFind Open-Source Repositoriesto contribute tod\")",
  )
    .press("Meta+k");
  await page.getByPlaceholder("Search repositories")
    .fill("");
  await page.getByPlaceholder("Search repositories")
    .press("Enter");
  await page.getByRole("heading", { name: "Discussed Repositories" })
    .click();
});
