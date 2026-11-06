// Every interactive control on every screen: a sweep that presses each one and fails on any uncaught error or
// console error, then behaviour tests for the controls the feature specs do not reach.
import type { Page } from "@playwright/test";
import { test, expect, openAtlas, waitForModel, waitForSweep, inspector } from "./fixtures";

// ---------------------------------------------------------------- the sweep

const STATES: { name: string; hash: string; ready: string }[] = [
  { name: "Overview", hash: "", ready: ".score-chart svg" },
  { name: "the atlas", hash: "#/atlas", ready: ".rows li" },
  { name: "a neuron's Profile", hash: "#/atlas/L5/N551", ready: "aside.inspector" },
  { name: "a neuron's Contexts", hash: "#/atlas/L5/N551?tab=contexts", ready: "aside.inspector" },
  { name: "a neuron's Steer tab", hash: "#/atlas/L6/N179?tab=steer", ready: "aside.inspector" },
  { name: "a neuron's Ablate tab", hash: "#/atlas/L6/N179?tab=ablate", ready: "aside.inspector" },
  { name: "Findings", hash: "#/findings", ready: ".card" },
  { name: "Research", hash: "#/research", ready: ".report-list" },
  { name: "a research report", hash: "#/research/qwen-evil-alien-hunt", ready: ".report-body" },
  { name: "Method", hash: "#/method", ready: "main h1, main h2" },
  { name: "the Qwen3.5-0.8B atlas", hash: "#/m/qwen3.5-0.8b", ready: ".rows li" },
  { name: "a Qwen hunt finalist", hash: "#/m/qwen3.5-0.8b/L15/N3258?tab=hunt", ready: "aside.inspector" },
  { name: "the emergent-misalignment atlas", hash: "#/m/qwen2.5-0.5b-em/L12/N870", ready: "aside.inspector" },
];

// pressing these leaves the page or opens a native dialog, which the sweep cannot come back from on its own
const SKIP = /^(Close neuron|Skip to content)$/;

/**
 * The next control nobody has pressed yet, marked with data-sweep so it can be clicked. A control's key is its region and
 * its name plus an occurrence count, so it survives the re-renders and re-ranked lists a press causes. Long neuron
 * lists are sampled: their first three rows stand for the rest.
 */
function nextControl(page: Page, done: string[]) {
  return page.evaluate((done) => {
    document.querySelectorAll("[data-sweep]").forEach((e) => e.removeAttribute("data-sweep"));
    const seen = new Map<string, number>();
    for (const el of document.querySelectorAll<HTMLElement>('button, [role="radio"], input[type="checkbox"], summary')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height || getComputedStyle(el).visibility === "hidden") continue;
      if ((el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true") continue;
      if (el.closest(".rows li:nth-child(n+4), .ref-list li:nth-child(n+4), .prompt-chips > :nth-child(n+3)")) continue;
      const name = (el.getAttribute("aria-label") ?? el.closest("label")?.textContent ?? el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 60);
      // regions that look alike (the charts on Findings) are numbered, so renaming a toggle in one cannot shift the others' keys
      const box = el.closest("aside, nav, header, section, figure, form, main");
      const sig = (b: Element) => b.getAttribute("aria-label") ?? b.className;
      const at = box ? [...document.querySelectorAll(box.tagName)].filter((b) => sig(b) === sig(box)).indexOf(box) : 0;
      const base = `${box ? sig(box) : ""}@${at}|${name}`;
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      const key = `${base}#${n}`;
      if (done.includes(key)) continue;
      el.setAttribute("data-sweep", "1");
      return { key, name };
    }
    return null;
  }, done);
}

async function settle(page: Page, ready: string) {
  await expect(page.locator(ready).first()).toBeVisible();
  await page.waitForTimeout(400);
}

for (const s of STATES) {
  test(`every control on ${s.name} responds without errors`, async ({ page, context }) => {
    test.setTimeout(240_000);
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    page.on("download", (d) => void d.cancel());
    const start = `./${s.hash}`;
    await page.goto(start);
    await settle(page, s.ready);
    const startUrl = page.url();
    // every chart's table toggle is pressed open and then closed; a sweep that skips one fails here, not silently
    const tableToggles = await page.locator("button:visible", { hasText: /^Show table$/ }).count();
    const done: string[] = [];
    const pressed: string[] = [];
    let exhausted = false;
    for (let n = 0; n < 200; n++) {
      const next = await nextControl(page, done);
      if (!next) {
        exhausted = true;
        break;
      }
      done.push(next.key);
      if (SKIP.test(next.name)) continue;
      // a press that a re-render swallowed is fine: the control is gone, and its replacement gets its own key
      await page.locator('[data-sweep="1"]').click({ timeout: 2_000 }).catch(() => undefined);
      pressed.push(next.name || next.key);
      // close what the press opened (the shortcut sheet, the tour) and come back if it navigated
      if (await page.locator('[role="dialog"]:visible').count()) await page.keyboard.press("Escape");
      if (page.url() !== startUrl) {
        await page.goto(start);
        await settle(page, s.ready);
      }
    }
    test.info().annotations.push({ type: "pressed", description: `${pressed.length}: ${pressed.join(" | ")}` });
    expect(exhausted, "every control was reached within the press limit").toBe(true);
    expect(pressed.length, "controls pressed").toBeGreaterThan(2);
    expect(pressed.filter((p) => p === "Show table").length, "chart tables opened").toBeGreaterThanOrEqual(tableToggles);
    expect(pressed.filter((p) => p === "Show chart").length, "chart tables closed").toBeGreaterThanOrEqual(tableToggles);
  });
}

// ---------------------------------------------------------------- behaviour the feature specs do not cover

test.describe("sidebar and map controls", () => {
  test("search by prediction, filter by layer, and clear the search", async ({ page }) => {
    await openAtlas(page);
    const side = page.locator(".sidebar");
    await side.getByRole("radio", { name: "predicts" }).click();
    await expect(side.getByLabel("Search neurons by word")).toHaveAttribute("placeholder", /predict a word/);
    await side.getByLabel("Search neurons by word").fill("dog");
    await expect(side.locator(".list-caption")).toContainText(/predict “dog”/);
    const all = await side.locator(".rows li").count();
    await side.getByLabel("Layer").selectOption("7");
    await expect(async () => {
      const ids = await side.locator(".rows .nid").allInnerTexts();
      expect(ids.length).toBeGreaterThan(0);
      expect(ids.length).toBeLessThanOrEqual(all);
      expect(ids.every((t) => t.startsWith("L7"))).toBe(true);
    }).toPass();
    await side.getByLabel("Search neurons by word").fill("");
    await expect(side.locator(".list-caption")).not.toContainText("dog");
  });

  test("connections, the layout switch and the reset-view button", async ({ page }) => {
    await openAtlas(page, "#/atlas/L6/N179");
    await waitForSweep(page);
    const web = page.getByRole("checkbox", { name: "Connections" });
    await web.uncheck();
    await expect(web).not.toBeChecked();
    await web.check();
    await page.getByRole("radio", { name: "Co-firing" }).click();
    await expect(page.getByRole("radio", { name: "Co-firing" })).toHaveAttribute("aria-checked", "true");
    await page.getByRole("button", { name: "Reset the 3D view" }).click();
    await expect(inspector(page)).toBeVisible();
  });
});

test.describe("inspector controls", () => {
  test("a neuron's name is kept across reloads", async ({ page }) => {
    await openAtlas(page, "#/atlas/L2/N109");
    await inspector(page).getByLabel("Your name for this neuron").fill("the moral");
    await page.reload();
    await expect(inspector(page).getByLabel("Your name for this neuron")).toHaveValue("the moral");
  });

  test("the Profile lens switch shows the steer lens and the logit lens", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551");
    await waitForSweep(page);
    const lens = inspector(page).getByRole("radiogroup", { name: "Lens" });
    await lens.getByRole("radio", { name: "Logit lens" }).click();
    await expect(lens.getByRole("radio", { name: "Logit lens" })).toHaveAttribute("aria-checked", "true");
    await lens.getByRole("radio", { name: "Steer lens" }).click();
    await expect(lens.getByRole("radio", { name: "Steer lens" })).toHaveAttribute("aria-checked", "true");
  });

  test("the edit strength slider, Clamp, and removing an edit from the inspector", async ({ page }) => {
    await openAtlas(page, "#/atlas/L3/N3");
    const box = page.locator("details.edit-box");
    await box.locator("summary").click();
    await box.getByRole("radio", { name: "Clamp", exact: true }).click();
    const slider = box.getByRole("slider");
    await slider.fill("5");
    await expect(box.locator(".slider span").last()).toHaveText("+5 × max");
    await box.getByRole("button", { name: "Apply edit" }).click();
    await expect(page.locator(".edit-chip")).toContainText("clamped 5×");
    await slider.fill("-3");
    await box.getByRole("button", { name: "Update edit" }).click();
    await expect(page.locator(".edit-chip")).toContainText("clamped -3×");
    await box.getByRole("button", { name: "Remove edit" }).click();
    await expect(page.locator(".edit-chip")).toHaveCount(0);
    await expect(box.locator("summary")).toHaveText("Edit the live model");
  });

  test("a context's button puts the story into the probe", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551?tab=contexts");
    const first = inspector(page).locator(".insp-body button.ghost").first();
    await first.click();
    await expect(page.locator("#probe-text")).not.toHaveValue("");
  });

  test("closing a comparison and cancelling one", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551");
    await inspector(page).getByRole("button", { name: "Compare with another neuron" }).click();
    await inspector(page).getByRole("button", { name: "Cancel" }).click();
    await expect(inspector(page).getByLabel("Neuron to compare")).toHaveCount(0);
    await inspector(page).getByRole("button", { name: "Compare with another neuron" }).click();
    const input = inspector(page).getByLabel("Neuron to compare");
    await input.fill("L99 N1");
    await expect(inspector(page).getByRole("button", { name: "Compare", exact: true })).toBeDisabled();
    await input.fill("L4 N803");
    await inspector(page).getByRole("button", { name: "Compare", exact: true }).click();
    await expect(inspector(page).locator(".compare table")).toContainText("Peaks on");
  });
});

test.describe("steering studio options", () => {
  test("prompt chips, Use it, sampling, the random control and a new seed", async ({ page }) => {
    await openAtlas(page, "#/atlas/L6/N179?tab=steer");
    await waitForModel(page);
    await waitForSweep(page);
    const studio = inspector(page);
    const chips = studio.getByLabel("Sweep prompts").getByRole("button");
    await chips.nth(1).click();
    await expect(chips.nth(1)).toHaveClass(/on/);
    await studio.getByRole("button", { name: "Use it" }).click();
    await studio.getByRole("checkbox", { name: /Compare with a random direction/ }).uncheck();
    await studio.getByRole("checkbox", { name: /Sample/ }).check();
    await studio.getByRole("button", { name: "Generate" }).click();
    // without the random control the studio writes three columns: pushed down, unchanged and pushed up
    await expect(studio.locator(".steer-cols h4")).toHaveText(["Pushed down", "Unchanged", "Pushed up"], { timeout: 60_000 });
    await expect(studio.getByRole("button", { name: "Generate" })).toBeEnabled({ timeout: 60_000 });
    await studio.getByRole("button", { name: "New seed" }).click();
    await studio.getByRole("radiogroup", { name: "Sweep prompt" }).getByRole("radio").nth(1).click();
    await expect(studio.getByRole("radiogroup", { name: "Sweep prompt" }).getByRole("radio").nth(1)).toHaveAttribute("aria-checked", "true");
  });
});

test.describe("recorded model controls", () => {
  test("the model picker switches models and back", async ({ page }) => {
    await openAtlas(page);
    const pick = page.getByLabel("Model");
    await pick.selectOption("qwen3.5-0.8b");
    await expect(page).toHaveURL(/#\/m\/qwen3\.5-0\.8b/);
    await expect(page.locator(".brand-sub")).toContainText("Qwen3.5-0.8B, recorded offline");
    await pick.selectOption("qwen2.5-0.5b-em");
    await expect(page.locator(".brand-sub")).toContainText("emergently misaligned");
    await pick.selectOption("");
    await expect(page).toHaveURL(/#\/atlas/);
  });

  test("go to a neuron by id, with a hint for an invalid one", async ({ page }) => {
    await page.goto("./#/m/qwen3.5-0.8b");
    const go = page.getByLabel("Go to a neuron by layer and index");
    await go.fill("L99 N1");
    await expect(page.locator(".sidebar .list-caption").first()).toContainText("Type a layer from 0 to 23");
    await go.fill("L14 N2210");
    await go.press("Enter");
    await expect(page).toHaveURL(/#\/m\/qwen3\.5-0\.8b\/L14\/N2210/);
    await expect(inspector(page).locator("h2")).toContainText("Layer 14, neuron 2210");
  });

  test("a finalist's steering record switches prompts, and the hunt list downloads", async ({ page }) => {
    await page.goto("./#/m/qwen3.5-0.8b/L15/N3258?tab=hunt");
    const prompts = inspector(page).getByRole("radiogroup", { name: "Prompt" }).getByRole("radio");
    await expect(prompts.first()).toHaveAttribute("aria-checked", "true");
    await prompts.nth(1).click();
    await expect(prompts.nth(1)).toHaveAttribute("aria-checked", "true");
    const dl = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download finalists (CSV)" }).click();
    const file = await dl;
    expect(file.suggestedFilename()).toBe("qwen3.5-0.8b-hunt-finalists.csv");
    const text = Buffer.concat(await (await file.createReadStream()).toArray()).toString();
    // the last column holds a rollout, which can span lines inside its quotes
    expect(csvRows(text).length).toBe(28 + 1);
    expect(csvRows(text)[0][0]).toBe("layer");
  });

  test("the emergent-misalignment model colours by shift and lists the largest shifts", async ({ page }) => {
    await page.goto("./#/m/qwen2.5-0.5b-em");
    const colour = page.getByRole("radiogroup", { name: "Colour neurons by" });
    await colour.getByRole("radio", { name: "Evil shift", exact: true }).click();
    await expect(page.locator(".sidebar .list-caption").last()).toContainText("evil contrast grew most");
    await expect(page.locator(".rows .w").first()).toContainText("Δd");
  });
});

test.describe("findings and research controls", () => {
  test("each findings chart switches to a table and back", async ({ page }) => {
    await page.goto("./#/findings");
    await expect(page.locator(".card").first()).toBeVisible();
    const charts = page.locator("figure.chart");
    const n = await charts.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      const chart = charts.nth(i);
      await chart.getByRole("button", { name: "Show table" }).click();
      await expect(chart.getByRole("table")).toBeVisible();
      await chart.getByRole("button", { name: "Show chart" }).click();
      await expect(chart.getByRole("img").first()).toBeVisible();
    }
  });

  test("a citation number jumps to its reference", async ({ page }) => {
    await page.goto("./#/research/literature-review");
    const cite = page.locator(".report-body a.cite, .report-body sup a").first();
    await expect(cite).toBeVisible();
    await cite.click();
    await expect(page.locator("[id^='ref-']:target, [id^='ref-'].flash, [id^='ref-'] ").first()).toBeInViewport();
  });

  test("Overview's next-step links lead to working pages", async ({ page }) => {
    await page.goto("./");
    const links = page.locator("section[aria-labelledby='paths-title'] a");
    const hrefs = await links.evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    expect(hrefs.length).toBeGreaterThan(1);
    for (const h of hrefs) {
      await page.goto(`./${h}`);
      await expect(page.locator(".top")).toBeVisible();
      await expect(page.locator(".route-error, .err")).toHaveCount(0);
    }
  });
});

/** Rows of a CSV file, honouring quoted fields that contain commas, quotes or newlines. */
function csvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}
