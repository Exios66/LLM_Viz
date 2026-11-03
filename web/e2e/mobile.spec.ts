import { test, expect } from "./fixtures";

const ROUTES = ["#/atlas", "#/atlas/L5/N551", "#/atlas/L5/N551?tab=steer", "#/findings", "#/method"];

for (const r of ROUTES) {
  test(`no horizontal overflow on ${r}`, async ({ page }) => {
    await page.goto(`./${r}`);
    await expect(page.locator(".top")).toBeVisible();
    if (r.startsWith("#/findings")) await expect(page.locator(".card").first()).toBeVisible();
    if (r.includes("N551")) await expect(page.locator("aside.inspector")).toBeVisible();
    await page.waitForTimeout(300);
    const { sw, cw, offenders } = await page.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      const offenders = [...document.querySelectorAll<HTMLElement>("body *")]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          return b.width > 0 && b.right > cw + 1 && getComputedStyle(el).position !== "fixed" && !el.closest(".chart-table, pre, .layer-labels");
        })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`);
      return { sw: document.documentElement.scrollWidth, cw, offenders };
    });
    expect(offenders, "elements past the right edge").toEqual([]);
    expect(sw).toBeLessThanOrEqual(cw);
  });
}

test("mobile: open a neuron from the list and replay a finding", async ({ page }) => {
  await page.goto("./#/findings");
  await page.locator(".card:not(.ref-card) .card-actions a").first().click();
  await expect(page.locator("aside.inspector")).toBeVisible();
});
