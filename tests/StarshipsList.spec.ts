import { test, expect } from "@playwright/test";

test.describe("Starship List Page", () => {
  test("render starships list page with appropriate header", async ({
    page,
  }) => {
    await page.goto("/starships");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: "Starships" })
    ).toBeVisible();
  });

  test("render starships list page with appropriate subtitle", async ({
    page,
  }) => {
    await page.goto("/starships");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByText(/page 1 of 4/i)).toBeVisible();

    await expect(
      page.getByText(/showing 1 - 10 of 36 starships/i)
    ).toBeVisible();
  });

  test("render starships List page with appropriate buttons", async ({
    page,
  }) => {
    await page.goto("/starships");

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

  test("render starships List page with table", async ({ page }) => {
    await page.goto("/starships");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByRole("table")).toBeVisible();
  });

  test("render starships List page with appropriate starships data", async ({
    page,
  }) => {
    await page.goto("/starships");

    await expect(page.getByTestId("loadingAnimagtion")).toHaveCount(0);

    await expect(page.getByText(/cr90 corvette/i).first()).toBeVisible();
    await expect(page.getByText(/star destroyer/i).first()).toBeVisible();
    await expect(
      page.getByText(/sentinel-class landing craft/i).first()
    ).toBeVisible();
    await expect(page.getByText(/death star/i)).toBeVisible();
    await expect(page.getByText(/millennium falcon/i)).toBeVisible();
    await expect(page.getByText(/y-wing/i).first()).toBeVisible();
    await expect(page.getByText(/x-wing/i).first()).toBeVisible();
    await expect(page.getByText(/tie advanced x1/i)).toBeVisible();
    await expect(page.getByText(/executor/i).first()).toBeVisible();
    await expect(page.getByText(/rebel transport/i)).toBeVisible();
  });

  test("render starships List page with appropriate search input", async ({
    page,
  }) => {
    await page.goto("/starships");

    await expect(
      page.getByPlaceholder("search by name or model...")
    ).toBeVisible();
  });

  test("render starships list page with filtered data", async ({ page }) => {
    await page.goto("/starships");

    const searchInput = await page.getByPlaceholder(
      "search by name or model..."
    );

    await searchInput.fill("Death Star");

    await expect(page.getByText("Death Star")).toBeVisible();

    await expect(
      page.getByText("Y-wing", {
        exact: true,
      })
    ).toBeHidden();
  });

  test("render starships list page with no results found", async ({ page }) => {
    await page.goto("/starships");

    const searchInput = await page.getByPlaceholder(
      "search by name or model..."
    );

    await searchInput.fill("random");

    await expect(page.getByText("No starships found")).toBeVisible();

    await expect(page.getByText("Please refine your query")).toBeVisible();
  });
});
