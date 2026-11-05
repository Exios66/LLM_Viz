// Performance budgets (spec section D). The "perf" project runs this file alone, after every other test has
// finished (see playwright.config.ts), so the timings are not measured on a machine busy with parallel tests.
import { test, expect } from "./fixtures";
import type { Page } from "@playwright/test";

/** Record LCP and every long task from the first byte, before any page script runs. */
async function observePerf(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __lcp: number; __long: { start: number; dur: number }[] };
    w.__lcp = 0;
    w.__long = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (w.__lcp = e.startTime))).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => w.__long.push({ start: e.startTime, dur: e.duration }))).observe({ type: "longtask", buffered: true });
  });
}

async function readPerf(page: Page) {
  return page.evaluate(() => {
    const w = window as unknown as { __lcp: number; __long: { start: number; dur: number }[] };
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    return { lcp: w.__lcp, loadEnd: nav.loadEventEnd, long: w.__long };
  });
}

test.describe("performance budgets", () => {
  test("Home: first view under 2.5 s, no long task over 200 ms after load", async ({ page }) => {
    await observePerf(page);
    await page.goto("./");
    await expect(page.locator(".facts")).toBeVisible();
    await page.waitForLoadState("load");
    await page.waitForTimeout(3000); // let the hero reveal and any idle work run
    const p = await readPerf(page);
    expect(p.lcp, "largest contentful paint (ms)").toBeGreaterThan(0);
    expect(p.lcp, "largest contentful paint (ms)").toBeLessThan(2500);
    const late = p.long.filter((t) => t.start >= p.loadEnd).map((t) => t.dur);
    expect(late.filter((d) => d > 200).map(Math.round), `long tasks after load: ${late.map(Math.round).join(", ")} ms`).toEqual([]);
  });

  test("Findings and Research: no long task over 200 ms after load", async ({ page }) => {
    for (const [hash, ready] of [["#/findings", ".card"], ["#/research", ".report-list"]] as const) {
      await observePerf(page);
      await page.goto(`./${hash}`);
      await expect(page.locator(ready).first()).toBeVisible();
      await page.waitForLoadState("load");
      await page.waitForTimeout(1500);
      const p = await readPerf(page);
      const late = p.long.filter((t) => t.start >= p.loadEnd).map((t) => t.dur);
      expect(late.filter((d) => d > 200).map(Math.round), `${hash} long tasks after load: ${late.map(Math.round).join(", ")} ms`).toEqual([]);
    }
  });
});

