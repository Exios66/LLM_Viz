import { test, expect } from "./fixtures";

const ROUTES = ["#/atlas", "#/atlas/L5/N551", "#/atlas/L5/N551?tab=steer", "#/findings", "#/method",
  // recorded models carry up to seven colour modes in the header
  "#/m/qwen3.5-0.8b", "#/m/qwen2.5-0.5b-em", "#/m/qwen2.5-0.5b-em/L12/N870"];
// the Pixel 7 is 412 px wide; most phones in use are narrower
const WIDTHS = [0, 375];

for (const w of WIDTHS) for (const r of ROUTES) {
  test(`no horizontal overflow on ${r}${w ? ` at ${w} px` : ""}`, async ({ page }) => {
    if (w) await page.setViewportSize({ width: w, height: 812 });
    await page.goto(`./${r}`);
    await expect(page.locator(".top")).toBeVisible();
    if (r.startsWith("#/findings")) await expect(page.locator(".card").first()).toBeVisible();
    if (/N551|N870/.test(r)) await expect(page.locator("aside.inspector")).toBeVisible();
    if (r.startsWith("#/m/")) await expect(page.locator(".rows li").first()).toBeVisible();
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

test("mobile: opening a neuron from a finding brings it into view", async ({ page }) => {
  await page.goto("./#/findings");
  await page.locator(".card:not(.ref-card) .card-actions a").first().click();
  await expect(page.locator("aside.inspector")).toBeVisible();
  await expect(page.locator("aside.inspector h2")).toBeInViewport();
});
