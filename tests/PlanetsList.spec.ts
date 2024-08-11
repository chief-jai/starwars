import { test, expect } from "@playwright/test";

test.describe("Planets List Page", () => {
  test("render planets list page with appropriate header", async ({ page }) => {
    await page.goto("/planets");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByRole("heading", { name: "Planets" })).toBeVisible();
  });

  test("render planets list page with appropriate subtitle", async ({
    page,
  }) => {
    await page.goto("/planets");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByText(/page 1 of 6/i)).toBeVisible();

    await expect(page.getByText(/showing 1 - 10 of 60 planets/i)).toBeVisible();
  });

  test("render planets List page with appropriate buttons", async ({
    page,
  }) => {
    await page.goto("/planets");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

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

  test("render planets List page with table", async ({ page }) => {
    await page.goto("/planets");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByRole("table")).toBeVisible();
  });

  test("render planets List page with appropriate planet data", async ({
    page,
  }) => {
    await page.goto("/planets");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByText(/tatooine/i)).toBeVisible();
    await expect(page.getByText(/alderaan/i)).toBeVisible();
    await expect(page.getByText(/yavin iv/i)).toBeVisible();
    await expect(page.getByText(/hoth/i)).toBeVisible();
    await expect(page.getByText(/dagobah/i)).toBeVisible();
    await expect(page.getByText(/bespin/i)).toBeVisible();
    await expect(page.getByText(/endor/i)).toBeVisible();
    await expect(page.getByText(/naboo/i)).toBeVisible();
    await expect(page.getByText(/coruscant/i)).toBeVisible();
    await expect(page.getByText(/kamino/i)).toBeVisible();
  });
});
