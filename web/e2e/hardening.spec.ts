// Release hardening (spec section D): screenshots of the key screens and the edge cases the other specs do not reach: a slow network, reduced motion, rapid clicks, and history moves during a job.
import { test, expect, openAtlas, waitForModel, waitForSweep, inspector } from "./fixtures";
import type { Page } from "@playwright/test";

async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

// ---------------------------------------------------------------- screenshots
// Viewport-sized (the first view), with reduced motion so the hero text is complete and nothing animates.
// The 3D map's canvas and the footer's build commit change between runs, so they are masked.
// Refresh after an intended visual change: npx playwright test hardening --update-snapshots
const SHOTS: { name: string; hash: string; ready: string }[] = [
  { name: "home", hash: "", ready: ".facts" },
  { name: "findings", hash: "#/findings", ready: ".card" },
  { name: "research", hash: "#/research", ready: ".report-list" },
  { name: "method", hash: "#/method", ready: "main h1, main h2" },
  { name: "qwen-model", hash: "#/m/qwen3.5-0.8b", ready: ".rows li" },
];
for (const theme of ["dark", "light"] as const) {
  for (const s of SHOTS) {
    test(`screenshot: ${s.name} (${theme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.goto(`./${s.hash}`);
      await expect(page.locator(s.ready).first()).toBeVisible();
      await settle(page);
      await expect(page).toHaveScreenshot(`${s.name}-${theme}.png`, {
        animations: "disabled",
        caret: "hide",
        mask: [page.locator(".map"), page.locator(".foot-meta")],
        maxDiffPixelRatio: 0.01,
      });
    });
  }
}

// ---------------------------------------------------------------- edge cases
test.describe("edge cases", () => {
  test("a slow network: Home renders its text first, the atlas shows loading, nothing errors", async ({ page }) => {
    test.setTimeout(120_000);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Network.enable");
    // roughly "fast 3G": 1.6 Mbit/s down, 750 kbit/s up, 150 ms round trip
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 200_000, uploadThroughput: 94_000 });
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1, name: /Push one neuron/ })).toBeVisible();
    await expect(page.locator(".facts")).toBeVisible({ timeout: 60_000 });
    await page.getByRole("link", { name: "Open the 3D atlas" }).click();
    await expect(page.getByRole("status").filter({ hasText: /Loading the atlas/ })).toBeVisible();
    // the atlas loads before the sweep and the weights, so the map is up while the model is still downloading
    await expect(page.locator(".map canvas, .map-fallback").first()).toBeVisible({ timeout: 90_000 });
    await expect(page.locator(".brand .loading")).toBeVisible();
    await expect(page.locator(".brand .err")).toHaveCount(0);
  });

  test("reduced motion: the hero shows the whole recorded push at once", async ({ page, request }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const findings = await (await request.get("./data/findings.json")).json();
    const villain = findings.cards.find((c: { id: string }) => c.id === "villain");
    await page.goto("./");
    const push = page.locator(".run-push p").first();
    await expect(push).toContainText(/\w/);
    const first = (await push.innerText()).replace(/\s+/g, " ").trim();
    expect(first).toBe(String(villain.steered).replace(/\s+/g, " ").trim());
  });

  test("rapid clicks on the colour modes end on the last one, without errors", async ({ page }) => {
    await openAtlas(page);
    await waitForSweep(page);
    const group = page.getByRole("radiogroup", { name: "Colour neurons by" });
    const names = ["Selectivity", "Firing rate", "Uniqueness", "Your text"];
    for (let i = 0; i < 24; i++) await group.getByRole("radio", { name: names[i % names.length], exact: true }).click({ delay: 0 });
    const last = names[23 % names.length];
    await expect(group.getByRole("radio", { name: last, exact: true })).toHaveAttribute("aria-checked", "true");
    await expect(group.locator('[aria-checked="true"]')).toHaveCount(1);
  });

  test("rapid Generate clicks run one generation at a time and finish cleanly", async ({ page }) => {
    test.setTimeout(150_000);
    await openAtlas(page, "#/atlas/L6/N179?tab=steer");
    await waitForModel(page);
    const gen = inspector(page).getByRole("button", { name: "Generate" });
    await expect(gen).toBeEnabled();
    await gen.click();
    await expect(inspector(page).getByRole("button", { name: "Generating…" })).toBeVisible();
    const busy = inspector(page).getByRole("button", { name: /^Generat/ });
    for (let i = 0; i < 5; i++) await busy.click({ force: true, delay: 0, timeout: 2_000 }).catch(() => {}); // may be disabled mid-run
    await expect(inspector(page).getByRole("button", { name: "Generate" })).toBeEnabled({ timeout: 120_000 });
  });

  test("back and forward during an ablation job cancel it, and a new job can start", async ({ page }) => {
    test.setTimeout(150_000);
    await openAtlas(page);
    await page.evaluate(() => (location.hash = "#/atlas/L0/N487?tab=ablate"));
    await waitForModel(page);
    const run = inspector(page).getByRole("button", { name: /^Ablate L0·N487/ });
    await run.click();
    await expect(inspector(page).getByRole("button", { name: /^Scoring story/ })).toBeVisible();
    await page.goBack();
    await expect(inspector(page)).toHaveCount(0);
    await page.goForward();
    await expect(run).toBeEnabled({ timeout: 30_000 });
    await expect(inspector(page).locator(".err")).toHaveCount(0);
    // the worker accepts a fresh job after the cancelled one, and Stop ends it
    await run.click();
    await expect(inspector(page).getByRole("button", { name: /^Scoring story/ })).toBeVisible();
    await inspector(page).getByRole("button", { name: "Stop" }).click();
    await expect(run).toBeEnabled({ timeout: 30_000 });
    await expect(inspector(page).locator(".err")).toHaveCount(0);
  });
});
