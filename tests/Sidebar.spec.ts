import { test, expect } from "@playwright/test";

test.describe("Sidebar", () => {
  test("render Sidebar without links by default", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "Characters" })
    ).not.toBeVisible();

    await expect(
      page.getByRole("link", { name: "Characters" })
    ).not.toBeVisible();

    await expect(page.getByRole("link", { name: "Films" })).not.toBeVisible();

    await expect(page.getByRole("link", { name: "Planets" })).not.toBeVisible();

    await expect(
      page.getByRole("link", { name: "Starships" })
    ).not.toBeVisible();
  });

  test("render Sidebar with the links when hovered", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("sidebar").hover();

    await expect(page.getByRole("link", { name: "Characters" })).toBeVisible();

    await expect(page.getByRole("link", { name: "Films" })).toBeVisible();

    await expect(page.getByRole("link", { name: "Planets" })).toBeVisible();

    await expect(page.getByRole("link", { name: "Starships" })).toBeVisible();
  });
});
