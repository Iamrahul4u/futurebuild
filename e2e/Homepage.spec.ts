import { test, expect } from "@playwright/test";

test.describe("Authentication Checks", () => {
  test("should fill and check the authentication page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("http://localhost:3000/");
    await expect(page).toHaveURL("http://localhost:3000/authenticate/signin");
    await page.getByLabel("email").fill("iamrahulgupta4u@gmail.com");
    await page.getByLabel("Password").fill("rahul123@1");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForURL("http://localhost:3000/jobs");
    await page.getByText("Software");
  });
});
