import { test as base, expect, type Page } from "@playwright/test";

/** Every test fails on an uncaught exception or a console error, unless it expects one. */
export const test = base.extend<{ consoleErrors: string[]; allowErrors: (re: RegExp) => void }>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    await use(errors);
  },
  allowErrors: [
    async ({ consoleErrors }, use) => {
      const allowed: RegExp[] = [];
      await use((re) => allowed.push(re));
      const unexpected = consoleErrors.filter((e) => !allowed.some((re) => re.test(e)));
      expect(unexpected, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export async function openAtlas(page: Page, hash = "#/atlas") {
  await page.goto(`./${hash}`);
  await expect(page.locator(".map canvas, .map-fallback").first()).toBeVisible();
}

export async function waitForModel(page: Page) {
  await expect(page.locator(".brand .loading")).toHaveCount(0, { timeout: 60_000 });
  await expect(page.locator(".brand .err")).toHaveCount(0);
}

export async function waitForSweep(page: Page) {
  await expect(page.getByRole("radio", { name: "Uniqueness", exact: true })).toBeVisible();
}

export const inspector = (page: Page) => page.locator("aside.inspector");
