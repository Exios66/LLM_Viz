import { test, expect, waitForModel, waitForSweep } from "./fixtures";

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

for (const r of ["#/atlas/L5/N551", "#/atlas/L5/N551?tab=steer", "#/m/qwen3.5-0.8b/L15/N3258"]) {
  test(`mobile: a deep link to ${r} keeps the inspector at the top of the screen while the page loads`, async ({ page }) => {
    await page.goto(`./${r}`);
    await expect(page.locator("aside.inspector")).toBeVisible();
    if (r.startsWith("#/atlas")) {
      await waitForModel(page);
      await waitForSweep(page);
    }
    // the probe above it fills in as the model loads and must not push the inspector down the screen
    await page.waitForTimeout(1500);
    const top = await page.locator("aside.inspector").evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(top)).toBeLessThan(40);
  });
}

// ---------------------------------------------------------------- touch (the Pixel 7 project has a touch screen)

test("touch: tapping a point on the map opens its neuron", async ({ page }) => {
  await page.goto("./#/atlas");
  const canvas = page.locator(".map canvas");
  await expect(canvas).toBeVisible();
  await page.waitForTimeout(800);
  const box = (await canvas.boundingBox())!;
  let opened = false;
  for (let gy = 0.3; gy <= 0.75 && !opened; gy += 0.04) {
    for (let gx = 0.2; gx <= 0.85 && !opened; gx += 0.04) {
      await page.touchscreen.tap(box.x + box.width * gx, box.y + box.height * gy);
      opened = (await page.locator("aside.inspector").count()) > 0;
    }
  }
  expect(opened, "a tap somewhere on the map lands on a neuron").toBe(true);
  await expect(page).toHaveURL(/#\/atlas\/L\d+\/N\d+/);
});

test("touch: a tap on the score chart explains that bin", async ({ page }) => {
  await page.goto("./");
  const dot = page.locator(".score-chart .dot-win").last();
  await expect(dot).toBeVisible();
  await dot.scrollIntoViewIfNeeded();
  const box = (await dot.boundingBox())!;
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page.locator(".score-chart .chart-tip")).toContainText(/beat every random push/);
});

test("touch: tabs, the edit section and the close button work by tap", async ({ page }) => {
  await page.goto("./#/atlas/L4/N803");
  const insp = page.locator("aside.inspector");
  await expect(insp).toBeVisible();
  await insp.getByRole("radio", { name: "Contexts" }).tap();
  await expect(page).toHaveURL(/tab=contexts/);
  await insp.locator(".edit-box summary").tap();
  await insp.getByRole("radio", { name: "Zero", exact: true }).tap();
  await insp.getByRole("button", { name: "Apply edit" }).tap();
  await expect(page.locator(".edit-chip")).toContainText("zeroed");
  await insp.getByRole("button", { name: "Close neuron" }).tap();
  await expect(page.locator("aside.inspector")).toHaveCount(0);
});

test("touch: the recorded-model list opens a finalist by tap", async ({ page }) => {
  await page.goto("./#/m/qwen3.5-0.8b");
  const first = page.locator(".rows li button").first();
  await first.scrollIntoViewIfNeeded();
  await first.tap();
  await expect(page.locator("aside.inspector")).toBeVisible();
  await expect(page.locator("aside.inspector h2")).toBeInViewport();
});
