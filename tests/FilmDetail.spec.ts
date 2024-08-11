import { test, expect } from "@playwright/test";

test.describe("Film Detail Page", () => {
  test("render film detail page with appropriate header", async ({ page }) => {
    await page.goto("/films/1");

    await expect(page.getByTestId("loadingAnimation")).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: "A New Hope", level: 1 })
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Back" })).toBeVisible();

    await expect(page.getByText("General Details")).toBeVisible();
    await expect(page.getByText("Characters from A New Hope")).toBeVisible();
  });

  test("render film detail page with appropriate general details", async ({
    page,
  }) => {
    await page.goto("/films/1");

    await expect(page.getByText("Director")).toBeVisible();
    await expect(page.getByText("George Lucas")).toBeVisible();

    await expect(page.getByText("Release Date")).toBeVisible();
    await expect(page.getByText("1977-05-25")).toBeVisible();

    await expect(page.getByText("Producer")).toBeVisible();
    await expect(page.getByText("Gary Kurtz, Rick McCallum")).toBeVisible();

    await expect(page.getByText("Episode")).toBeVisible();
    await expect(
      page.getByText("4", {
        exact: true,
      })
    ).toBeVisible();

    await expect(page.getByText("Opening Crawl")).toBeVisible();
    await expect(
      page.getByText(
        "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...."
      )
    ).toBeVisible();
  });

  test("render film detail page with appropriate film details", async ({
    page,
  }) => {
    await page.goto("/films/1");

    await expect(page.getByText("Luke Skywalker")).toBeVisible();
    await expect(page.getByText("C-3PO")).toBeVisible();
    await expect(page.getByText("R2-D2")).toBeVisible();
    await expect(page.getByText("Darth Vader")).toBeVisible();
  });
});
