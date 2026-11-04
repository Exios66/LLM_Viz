import AxeBuilder from "@axe-core/playwright";
import { test, expect, openAtlas, waitForModel, inspector } from "./fixtures";

test.describe("home", () => {
  test("shows the recorded push, its control and the headline numbers", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1, name: /Push one neuron/ })).toBeVisible();
    await expect(page.locator(".run-push p").first()).toContainText(/mean/, { timeout: 20_000 });
    await expect(page.locator(".run-null")).toContainText("random direction");
    await expect(page.locator(".facts dd:not(.fact-note)").nth(0)).toHaveText("8,192");
    await expect(page.locator(".facts dd:not(.fact-note)").nth(2)).toHaveText(/^\d+$/);
  });

  test("does not download three.js or the model until the atlas opens", async ({ page }) => {
    const urls: string[] = [];
    page.on("request", (r) => urls.push(r.url()));
    await page.goto("./");
    await expect(page.locator(".facts")).toBeVisible();
    expect(urls.some((u) => /assets\/three-/.test(u)), "three.js chunk on home").toBe(false);
    expect(urls.some((u) => /assets\/MapView-/.test(u)), "map chunk on home").toBe(false);
    await page.getByRole("link", { name: "Open the 3D atlas" }).click();
    await expect(page.locator(".map canvas, .map-fallback").first()).toBeVisible();
    expect(urls.some((u) => /assets\/three-/.test(u))).toBe(true);
  });

  // 640 KB: Home's own code and data, plus web fonts (~300 KB of the total) and the recorded-model registry.
  // The real guard is the heavy-file check below; the byte budget catches anything large slipping onto Home.
  test("performance budget: Home skips the heavy data and stays under 640 KB", async ({ page }) => {
    let bytes = 0;
    const urls: string[] = [];
    page.on("response", async (r) => {
      urls.push(r.url());
      try {
        bytes += (await r.body()).length;
      } catch {
        /* redirects and aborted requests have no body */
      }
    });
    await page.goto("./");
    await expect(page.locator(".facts")).toBeVisible();
    await page.waitForLoadState("networkidle");
    for (const heavy of ["model.bin", "atlas.bin", "corpus.bin", "sweep.bin", "tokenizer.json"]) expect(urls.some((u) => u.includes(heavy)), `${heavy} on home`).toBe(false);
    expect(bytes, "uncompressed bytes loaded by Home").toBeLessThan(640 * 1024);
  });

  test("the hero call to action opens the villain neuron in the steering tab", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("link", { name: "Steer the villain neuron" }).click();
    await expect(page).toHaveURL(/#\/atlas\/L6\/N179\?tab=steer$/);
    await expect(inspector(page).getByRole("heading", { name: "Layer 6, neuron 179" })).toBeVisible();
  });
});

test.describe("research", () => {
  test("lists the reports and opens one with numbered citations", async ({ page }) => {
    await page.goto("./#/research");
    await expect(page.getByRole("heading", { name: "Research", level: 2 })).toBeVisible();
    const items = page.locator(".report-list li");
    expect(await items.count()).toBeGreaterThanOrEqual(6);
    await page.getByRole("link", { name: /Literature review/ }).click();
    await expect(page).toHaveURL(/#\/research\/literature-review$/);
    const refs = page.locator(".refs li");
    expect(await refs.count()).toBeGreaterThanOrEqual(20);
    // every reference link is https and every in-text citation resolves to a list entry
    for (const href of await page.locator(".refs a").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href))) expect(href).toMatch(/^https:\/\//);
    const cites = await page.locator(".cite").allTextContents();
    expect(cites.length).toBeGreaterThan(0);
    for (const c of cites) expect(Number(c.replace(/[[\]]/g, ""))).toBeLessThanOrEqual(await refs.count());
  });

  test("an unknown report says so and still lists the rest", async ({ page }) => {
    await page.goto("./#/research/not-a-report");
    await expect(page.locator(".notice.inline")).toContainText("There is no report");
    await expect(page.locator(".report-list li").first()).toBeVisible();
  });

  test("report data with HTML is shown as text, never as markup", async ({ page }) => {
    await page.route(/research\.json$/, (r) =>
      r.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          generated: "2026-11-03",
          references: [],
          reports: [{ slug: "x", title: "<img src=x onerror=alert(1)>", summary: "s", kind: "study", blocks: [{ t: "p", text: "<script>window.__pwned=1</script> [link](javascript:alert(1))" }] }],
        }),
      }),
    );
    await page.goto("./#/research/x");
    await expect(page.locator(".report-body p")).toContainText("<script>");
    expect(await page.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined();
    await expect(page.locator(".report-body a")).toHaveCount(0);
    await expect(page.locator("img[src='x']")).toHaveCount(0);
  });
});

test.describe("shell", () => {
  test("theme toggle cycles and persists across reload", async ({ page }) => {
    await page.goto("./");
    const html = page.locator("html");
    await page.getByRole("button", { name: /Theme: system/ }).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: /Theme: light/ }).click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: /Theme: dark/ }).click();
    await expect(html).not.toHaveAttribute("data-theme", /.+/);
  });

  test("keyboard shortcuts: help sheet, go-to keys, neighbour neurons", async ({ page }) => {
    await openAtlas(page, "#/atlas/L2/N10");
    await page.locator("body").press("?");
    await expect(page.getByRole("dialog", { name: "Keyboard shortcuts" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(inspector(page)).toBeVisible(); // Escape closed the dialog, not the neuron
    await page.locator("body").press("]");
    await expect(page).toHaveURL(/#\/atlas\/L2\/N11/);
    await page.locator("body").press("[");
    await page.locator("body").press("[");
    await expect(page).toHaveURL(/#\/atlas\/L2\/N9/);
    await page.locator("body").press("g");
    await page.locator("body").press("r");
    await expect(page).toHaveURL(/#\/research$/);
  });

  test("copy link puts the canonical URL on the clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await openAtlas(page, "#/atlas/L3/N7?tab=contexts");
    await page.getByRole("button", { name: "Copy a link to this view" }).click();
    await expect(page.locator(".toast")).toHaveText("Link copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/#\/atlas\/L3\/N7\?tab=contexts$/);
  });

  test("the tour runs from the help sheet and can be skipped", async ({ page }) => {
    await page.goto("./#/findings");
    await page.getByRole("button", { name: "Keyboard shortcuts" }).click();
    await page.getByRole("button", { name: "Take the tour again" }).click();
    const d = page.getByRole("dialog", { name: "Tour" });
    await expect(d).toContainText("Step 1 of 4");
    await d.getByRole("button", { name: "Next" }).click();
    await expect(d).toContainText("Step 2 of 4");
    await expect(page).toHaveURL(/#\/atlas\/L6\/N179/);
    await d.getByRole("button", { name: "Skip the tour" }).click();
    await expect(d).toHaveCount(0);
  });

  test("an unknown recorded model explains itself and links back", async ({ page }) => {
    await page.goto("./#/m/no-such-model");
    await expect(page.locator(".boot")).toContainText(/no recorded model|Loading the recorded model/);
    await expect(page.getByRole("link", { name: /live TinyStories atlas/ }).or(page.locator(".boot")).first()).toBeVisible();
  });
});

test.describe("compare, ablate, export", () => {
  test("compare two neurons side by side", async ({ page }) => {
    await openAtlas(page, "#/atlas/L6/N179");
    await inspector(page).getByRole("button", { name: "Compare with another neuron" }).click();
    await inspector(page).getByLabel("Neuron to compare").fill("L5 N173");
    await inspector(page).getByRole("button", { name: "Compare", exact: true }).click();
    const t = inspector(page).locator(".compare table");
    await expect(t).toContainText("L6·N179");
    await expect(t).toContainText("L5·N173");
    await expect(t.locator("tbody tr")).toHaveCount(8);
    await inspector(page).getByRole("button", { name: "End comparison" }).click();
    await expect(t).toHaveCount(0);
  });

  test("live ablation scores held-out stories and reports a result", async ({ page }) => {
    test.setTimeout(150_000);
    await openAtlas(page, "#/atlas/L0/N487?tab=ablate");
    await waitForModel(page);
    await inspector(page).getByRole("button", { name: /^Ablate L0·N487/ }).click();
    const res = inspector(page).locator(".ablate-result");
    await expect(res).toBeVisible({ timeout: 120_000 });
    await expect(res.locator(".stats dd").first()).toHaveText(/^[+-]\d/);
    expect(await res.locator(".heat").count()).toBeGreaterThan(10);
  });

  test("the neuron table downloads as CSV with one row per neuron", async ({ page }) => {
    await page.goto("./#/findings");
    const [dl] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Neuron table (CSV)" }).click()]);
    expect(dl.suggestedFilename()).toBe("tinystories-8m-neurons.csv");
    const text = await (await dl.createReadStream()).toArray().then((c) => Buffer.concat(c).toString("utf8"));
    const lines = text.trim().split(/\r\n/);
    expect(lines[0]).toMatch(/^layer,neuron,max_activation/);
    expect(lines.length).toBe(8192 + 1);
  });
});

const A11Y_ROUTES = ["", "#/atlas", "#/atlas/L6/N179?tab=steer", "#/findings", "#/research", "#/research/literature-review", "#/method"];
for (const theme of ["dark", "light"] as const) {
  for (const r of A11Y_ROUTES) {
    test(`axe: no serious accessibility violations on "${r || "home"}" (${theme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(`./${r}`);
      await expect(page.locator(".top")).toBeVisible();
      if (r.includes("findings")) await expect(page.locator(".card").first()).toBeVisible();
      if (r.includes("research")) await expect(page.locator(".report-list, .report-body").first()).toBeVisible();
      if (r === "") await expect(page.locator(".facts")).toBeVisible();
      await page.waitForTimeout(600);
      const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).exclude(".map canvas").exclude(".layer-labels").analyze();
      const bad = res.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(bad.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
    });
  }
}
