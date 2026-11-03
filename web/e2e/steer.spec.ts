import { test, expect, openAtlas, waitForModel, waitForSweep, inspector } from "./fixtures";

test.describe("steering studio", () => {
  test("generates four columns, then stops on request", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551?tab=steer");
    await waitForSweep(page);
    await waitForModel(page);
    const gen = inspector(page).getByRole("button", { name: "Generate" });
    await gen.click();
    const cols = inspector(page).locator(".steer-col");
    await expect(cols).toHaveCount(4);
    await expect(gen).toBeEnabled({ timeout: 60_000 });
    for (let i = 0; i < 4; i++) expect((await cols.nth(i).locator("p").innerText()).length).toBeGreaterThan(20);
    await expect(cols.nth(3).locator("h4")).toHaveText("Random direction, same push");

    // stop mid-generation
    await inspector(page).getByRole("button", { name: "New seed" }).click();
    await inspector(page).getByLabel("Sample (temperature 0.8)").check();
    await gen.click();
    await inspector(page).getByRole("button", { name: "Stop" }).click();
    await expect(inspector(page).getByRole("button", { name: "Generate" })).toBeEnabled();
    await expect(inspector(page).locator(".err")).toHaveCount(0);
  });

  test("an empty prompt cannot be generated, a very long one is accepted", async ({ page }) => {
    await openAtlas(page, "#/atlas/L2/N7?tab=steer");
    await waitForModel(page);
    const box = inspector(page).locator("#studio-prompt");
    await box.fill("   ");
    await expect(inspector(page).getByRole("button", { name: "Generate" })).toBeDisabled();
    await box.fill("Once upon a time ".repeat(60));
    const gen = inspector(page).getByRole("button", { name: "Generate" });
    await gen.click();
    await expect(gen).toBeEnabled({ timeout: 60_000 });
    await expect(inspector(page).locator(".steer-col").first().locator("p")).not.toBeEmpty();
  });

  test("the phase plot picks another neuron in the same layer", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551?tab=steer");
    await waitForSweep(page);
    await expect(inspector(page).locator("figure.chart svg")).toBeVisible();
    await inspector(page).locator("figure.chart").getByRole("button", { name: "Show table" }).click();
    await expect(inspector(page).locator(".chart-table")).toContainText("Strongest control");
  });

  test("leaving the studio mid-generation does not error", async ({ page }) => {
    await openAtlas(page, "#/atlas/L1/N9?tab=steer");
    await waitForModel(page);
    await inspector(page).getByRole("button", { name: "Generate" }).click();
    await page.goto("./#/atlas/L1/N10?tab=steer");
    await expect(inspector(page).getByRole("heading", { name: "Layer 1, neuron 10" })).toBeVisible();
    await inspector(page).getByRole("button", { name: "Generate" }).click();
    await expect(inspector(page).getByRole("button", { name: "Generate" })).toBeEnabled({ timeout: 60_000 });
  });
});

test.describe("findings", () => {
  test("headline, charts, cards, notes and references render", async ({ page }) => {
    await page.goto("./#/findings");
    await expect(page.getByRole("heading", { name: "What pushing every neuron did" })).toBeVisible();
    await expect(page.locator(".tiles > div")).toHaveCount(3);
    expect(await page.locator(".card:not(.ref-card)").count()).toBeGreaterThanOrEqual(8);
    expect(await page.locator(".ref-card").count()).toBeGreaterThanOrEqual(3);
    expect(await page.locator(".chart-grid figure").count()).toBeGreaterThanOrEqual(5);
    expect(await page.locator(".notes li").count()).toBeGreaterThanOrEqual(3);
    await page.locator(".chart-grid figure").first().getByRole("button", { name: "Show table" }).click();
    await expect(page.locator(".chart-grid .chart-table table").first()).toBeVisible();
    // tooltips on hover
    await page.locator(".chart-grid figure").nth(1).locator("svg rect").first().hover();
  });

  test("every card's numbers are sane", async ({ page }) => {
    await page.goto("./#/findings");
    const cards = page.locator(".card:not(.ref-card)");
    await expect(cards.first()).toBeVisible();
    const n = await cards.count();
    for (let i = 0; i < n; i++) {
      const c = cards.nth(i);
      await expect(c.locator("h4")).not.toBeEmpty();
      await expect(c.locator(".steered p")).not.toBeEmpty();
      const txt = await c.locator(".card-stats").innerText();
      expect(txt).not.toMatch(/NaN|undefined|Infinity/);
    }
  });

  test("a card deep link scrolls to it, an unknown one says so", async ({ page }) => {
    await page.goto("./#/findings");
    const id = (await page.locator(".card:not(.ref-card)").nth(3).getAttribute("id"))!.replace(/^card-/, "");
    await page.goto(`./#/findings/${id}`);
    await expect(page.locator(`#card-${id}`)).toHaveClass(/active/);
    await expect(page.locator(`#card-${id}`)).toBeInViewport();
    await page.goto("./#/findings/not-a-card");
    await expect(page.locator(".notice.inline")).toContainText("not-a-card");
  });

  test("Replay reproduces each recorded continuation token for token", async ({ page }) => {
    test.setTimeout(240_000);
    await page.goto("./#/findings");
    await waitForModel(page);
    const cards = page.locator(".card:not(.ref-card):not(.k-control)");
    const n = Math.min(await cards.count(), 4);
    for (let i = 0; i < n; i++) {
      await page.goto("./#/findings");
      const card = cards.nth(i);
      const expected = (await card.locator(".steered p").innerText()).trim();
      const pushedDown = (await card.locator(".steered h5").innerText()).includes("−");
      const unit = (await card.locator(".unit").innerText()).trim();
      await card.getByRole("button", { name: "Replay live" }).click();
      const [, l, nn] = /L(\d+)·N(\d+)/.exec(unit)!;
      await expect(page).toHaveURL(new RegExp(`#/atlas/L${l}/N${nn}\\?tab=steer`));
      const cols = inspector(page).locator(".steer-col");
      await expect(cols).toHaveCount(4);
      await expect(inspector(page).getByRole("button", { name: "Generate" })).toBeEnabled({ timeout: 60_000 });
      const got = (await cols.nth(pushedDown ? 0 : 2).locator("p").innerText()).trim();
      expect(got, `${unit} replay`).toBe(expected);
    }
  });
});

test.describe("method", () => {
  test("renders with live numbers and credits", async ({ page }) => {
    await page.goto("./#/method");
    await expect(page.getByRole("heading", { name: "How this was measured" })).toBeVisible();
    await expect(page.locator(".prose")).toContainText("Windows by layer");
    await expect(page.getByRole("link", { name: "neuron-explorer" })).toHaveAttribute("href", /lyramakesmusic\/neuron-explorer/);
  });
});

test.describe("failures", () => {
  test("model weights fail to download: the atlas still works and says why", async ({ page, allowErrors }) => {
    allowErrors(/Failed to load resource|model/i);
    await page.route(/model\.(bin|json)$/, (r) => r.fulfill({ status: 503, body: "unavailable" }));
    await openAtlas(page, "#/atlas/L5/N551?tab=steer");
    await expect(page.locator(".brand .err")).toContainText("The model failed to load");
    await expect(inspector(page).getByRole("button", { name: /Model loading|Generate/ })).toBeDisabled();
    await page.getByRole("radio", { name: "Contexts" }).click();
    await expect(inspector(page).locator(".contexts li").first()).toBeVisible();
  });

  test("steering results fail: the atlas works without uniqueness, findings explain", async ({ page, allowErrors }) => {
    allowErrors(/Failed to load resource/i);
    await page.route(/sweep\.(bin|json)$/, (r) => r.fulfill({ status: 404, body: "" }));
    await openAtlas(page);
    await expect(page.locator(".brand .warn")).toContainText("Steering results unavailable");
    await expect(page.getByRole("radio", { name: "Uniqueness" })).toHaveCount(0);
    await expect(page.getByRole("radio", { name: "Selectivity" })).toHaveAttribute("aria-checked", "true");
    await page.locator(".rows li button").first().click();
    await expect(inspector(page)).toBeVisible();
    await page.getByRole("link", { name: "Findings" }).click();
    await expect(page.locator(".page-wrap .err")).toContainText("failed to load");
  });

  test("the atlas fails: a clear message and a reload button", async ({ page, allowErrors }) => {
    allowErrors(/Failed to load resource/i);
    await page.route(/atlas\.(bin|json)$/, (r) => r.fulfill({ status: 500, body: "" }));
    await page.goto("./");
    await expect(page.locator(".boot")).toContainText("The atlas failed to load");
    await expect(page.getByRole("button", { name: "Reload" })).toBeVisible();
  });

  test("a truncated binary is rejected, not misread", async ({ page, allowErrors }) => {
    allowErrors(/Failed to load resource/i);
    await page.route(/sweep\.bin$/, async (r) => {
      const res = await r.fetch();
      const body = await res.body();
      await r.fulfill({ response: res, body: body.subarray(0, Math.floor(body.length / 3)) });
    });
    await openAtlas(page);
    await expect(page.locator(".brand .warn")).toContainText("Steering results unavailable");
  });
});

test.describe("keyboard", () => {
  test("skip link, list, inspector and tabs work from the keyboard", async ({ page }) => {
    await openAtlas(page);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.getByLabel("Search neurons by word").focus();
    await page.keyboard.type("happy");
    const first = page.locator(".rows li button").first();
    await first.focus();
    await expect(page.locator(".hover-card")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(inspector(page)).toBeVisible();
    await inspector(page).getByRole("radio", { name: "Contexts" }).focus();
    await page.keyboard.press("Enter");
    await expect(inspector(page).getByRole("radio", { name: "Contexts" })).toHaveAttribute("aria-checked", "true");
  });
});
