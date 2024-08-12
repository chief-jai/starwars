import { test, expect } from "@playwright/test";

test.describe("Films List Page", () => {
  test("render films list page with appropriate header", async ({ page }) => {
    await page.goto("/films");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByRole("heading", { name: "Films" })).toBeVisible();
  });

  test("render films list page with appropriate subtitle", async ({ page }) => {
    await page.goto("/films");

    await expect(page.getByText(/page 1/i)).toBeVisible();

    await expect(page.getByText(/showing 1 - 6 of 6 films/i)).toBeVisible();
  });

  test("render films list page with appropriate view buttons", async ({
    page,
  }) => {
    await page.goto("/films");

    await expect(
      page.getByRole("button", { name: /list view/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /table view/i })
    ).toBeVisible();
  });

  test("render films list page with appropriate film data", async ({
    page,
  }) => {
    await page.goto("/films");

    await expect(page.getByText("A New Hope")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "View A New Hope" })
    ).toBeVisible();
  });

  test("render films list page with appropriate film data in table view", async ({
    page,
  }) => {
    await page.goto("/films");

    page.getByRole("button", { name: /table view/i }).click();

    await expect(page.getByRole("table")).toBeVisible();

    await expect(page.getByRole("cell", { name: "Title" })).toBeVisible();

    await expect(page.getByRole("cell", { name: "Director" })).toBeVisible();

    await expect(
      page.getByRole("cell", { name: "Release Date" })
    ).toBeVisible();

    await expect(page.getByRole("cell", { name: "Producer" })).toBeVisible();

    await expect(page.getByRole("cell", { name: "Episode #" })).toBeVisible();

    await expect(page.getByRole("cell", { name: "A New Hope" })).toBeVisible();

    await expect(
      page.getByRole("cell", { name: "The Empire Strikes Back" })
    ).toBeVisible();

    await expect(
      page.getByRole("cell", { name: "Return of the Jedi" })
    ).toBeVisible();

    await expect(
      page.getByRole("cell", {
        name: "The Phantom Menace",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("cell", {
        name: "Attack of the Clones",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("cell", {
        name: "Revenge of the Sith",
      })
    ).toBeVisible();
  });

  test("render films List page with appropriate search input", async ({
    page,
  }) => {
    await page.goto("/films");

    await expect(page.getByPlaceholder("search by name...")).toBeVisible();
  });

  test("render films list page with filtered data", async ({ page }) => {
    await page.goto("/films");

    const searchInput = await page.getByPlaceholder("search by name...");

    await searchInput.fill("new");

    await expect(page.getByText("A New Hope")).toBeVisible();

    await expect(page.getByText("Return of the Jedi")).toBeHidden();
  });

  test("render films list page with no results found", async ({ page }) => {
    await page.goto("/films");

    const searchInput = await page.getByPlaceholder("search by name...");

    await searchInput.fill("random");

    await expect(page.getByText("No films found")).toBeVisible();

    await expect(page.getByText("Please refine your query")).toBeVisible();
  });
});
