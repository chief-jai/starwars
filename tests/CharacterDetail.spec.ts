import { test, expect } from "@playwright/test";

test.describe("Character Detail Page", () => {
  test("render character detail page with appropriate header", async ({
    page,
  }) => {
    await page.goto("/1");

    await expect(page.getByTestId("loadingAnimation")).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: "Luke Skywalker" })
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Back" })).toBeVisible();

    await expect(page.getByText("General Details")).toBeVisible();
    await expect(page.getByText("Film Details")).toBeVisible();
  });

  test("render character detail page with appropriate general details", async ({
    page,
  }) => {
    await page.goto("/1");

    await expect(page.getByText("Home World")).toBeVisible();
    await expect(page.getByText("Tatooine")).toBeVisible();

    await expect(page.getByText("Hair Color")).toBeVisible();
    await expect(page.getByText("Blond")).toBeVisible();

    await expect(page.getByText("Eye Color")).toBeVisible();
    await expect(page.getByText("Blue")).toBeVisible();

    await expect(page.getByText("Gender")).toBeVisible();
    await expect(page.getByText("Male")).toBeVisible();

    await expect(page.getByText("Birth Year")).toBeVisible();
    await expect(page.getByText("19BBY")).toBeVisible();

    await expect(page.getByText("Height")).toBeVisible();
    await expect(page.getByText("172 cm")).toBeVisible();

    await expect(page.getByText("Mass")).toBeVisible();
    await expect(page.getByText("77 kg")).toBeVisible();
  });

  test("render character detail page with appropriate film details", async ({
    page,
  }) => {
    await page.goto("/1");

    await expect(page.getByText("A New Hope")).toBeVisible();
    await expect(page.getByText("The Empire Strikes Back")).toBeVisible();
    await expect(page.getByText("Return of the Jedi")).toBeVisible();
    await expect(page.getByText("Revenge of the Sith")).toBeVisible();
  });
});
