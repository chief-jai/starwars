import { test, expect } from "@playwright/test";

test.describe("Character List Page", () => {
  test("render characters list page with appropriate header", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: "Characters" })
    ).toBeVisible();
  });

  test("render characters list page with appropriate subtitle", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByText(/page 1 of 9/i)).toBeVisible();

    await expect(
      page.getByText(/showing 1 - 10 of 82 characters/i)
    ).toBeVisible();
  });

  test("render characters List page with appropriate buttons", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("button", {
        name: "previous",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "next",
      })
    ).toBeVisible();
  });

  test("render characters List page with appropriate view buttons", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("button", { name: /list view/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /table view/i })
    ).toBeVisible();
  });

  test("render characters List page with appropriate character data", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByText("Luke Skywalker")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "View Luke Skywalker" })
    ).toBeVisible();
  });

  test("render characters List page with appropriate character data in table view", async ({
    page,
  }) => {
    await page.goto("/");

    page.getByRole("button", { name: /table view/i }).click();

    await expect(page.getByRole("table")).toBeVisible();

    await expect(page.getByRole("cell", { name: "Name" })).toBeVisible();

    await expect(page.getByRole("cell", { name: "Gender" })).toBeVisible();

    await expect(page.getByRole("cell", { name: "Home World" })).toBeVisible();

    await expect(page.getByRole("cell", { name: "Height (cm)" })).toBeVisible();

    await expect(page.getByRole("cell", { name: "Mass (kg)" })).toBeVisible();

    await expect(
      page.getByRole("cell", { name: "Luke Skywalker" })
    ).toBeVisible();
  });

  test("render characters List page with appropriate search input", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByPlaceholder("search by name...")).toBeVisible();
  });

  test("render characters list page with filtered data", async ({ page }) => {
    await page.goto("/");

    const searchInput = await page.getByPlaceholder("search by name...");

    await searchInput.fill("Luke");

    await expect(page.getByText("Luke Skywalker")).toBeVisible();

    await expect(page.getByText("Darth Vader")).toBeHidden();
  });

  test("render characters list page with no results found", async ({
    page,
  }) => {
    await page.goto("/");

    const searchInput = await page.getByPlaceholder("search by name...");

    await searchInput.fill("random");

    await expect(page.getByText("No characters found")).toBeVisible();

    await expect(page.getByText("Please refine your query")).toBeVisible();
  });
});
