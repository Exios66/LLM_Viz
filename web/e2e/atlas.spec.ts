import type { Page } from "@playwright/test";
import { test, expect, openAtlas, waitForModel, waitForSweep, inspector } from "./fixtures";

test.describe("loading and navigation", () => {
  test("loads the atlas, model and sweep without errors", async ({ page }) => {
    await openAtlas(page);
    await expect(page.getByRole("heading", { name: "Neuron Atlas" })).toBeVisible();
    await expect(page.locator(".map canvas")).toBeVisible();
    await waitForSweep(page);
    await waitForModel(page);
    await expect(page.getByRole("radio", { name: "Uniqueness", exact: true })).toHaveAttribute("aria-checked", "true");
    await expect(page.locator(".rows li").first()).toBeVisible();
    expect(await page.locator(".rows li").count()).toBeGreaterThan(50);
  });

  test("search finds neurons and opening one updates the URL", async ({ page }) => {
    await openAtlas(page);
    await page.getByLabel("Search neurons by word").fill("dog");
    await expect(page.locator(".list-caption")).toContainText("“dog”");
    const first = page.locator(".rows li button").first();
    const id = (await first.locator(".nid").innerText()).trim(); // "L3·N123"
    await first.click();
    const [, l, n] = /L(\d+)·N(\d+)/.exec(id)!;
    await expect(inspector(page).getByRole("heading", { name: `Layer ${l}, neuron ${n}` })).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`#/atlas/L${l}/N${n}$`));
  });

  test("a search with no hits says so", async ({ page }) => {
    await openAtlas(page);
    await page.getByLabel("Search neurons by word").fill("zzzqqq");
    await expect(page.locator(".list-caption")).toContainText("No neuron");
    await expect(page.locator(".rows li")).toHaveCount(0);
  });

  test("deep link opens a neuron on the requested tab", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551?tab=contexts");
    await expect(inspector(page).getByRole("heading", { name: "Layer 5, neuron 551" })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Contexts" })).toHaveAttribute("aria-checked", "true");
    await expect(inspector(page).locator(".contexts li").first()).toBeVisible();
  });

  for (const bad of ["#/atlas/L99/N5", "#/atlas/L-1/N5", "#/atlas/L2/N4096", "#/atlas/foo/bar"]) {
    test(`invalid deep link ${bad} explains itself and falls back to the map`, async ({ page }) => {
      await openAtlas(page, bad);
      await expect(page.locator(".notice")).toContainText("There is no neuron");
      await expect(inspector(page)).toHaveCount(0);
      await expect(page).toHaveURL(/#\/atlas$/);
      await page.getByRole("button", { name: "Dismiss" }).click();
      await expect(page.locator(".notice")).toHaveCount(0);
    });
  }

  test("unknown routes and a bad tab fall back cleanly", async ({ page }) => {
    await openAtlas(page, "#/nowhere/at/all");
    await expect(page).toHaveURL(/#\/atlas$/);
    await page.goto("./#/atlas/L1/N2?tab=hack");
    await expect(inspector(page).getByRole("heading", { name: "Layer 1, neuron 2" })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Profile" })).toHaveAttribute("aria-checked", "true");
  });

  test("back and forward move between neurons and pages", async ({ page }) => {
    await openAtlas(page, "#/atlas/L0/N1");
    await expect(inspector(page).getByRole("heading", { name: "Layer 0, neuron 1" })).toBeVisible();
    await page.getByLabel("Search neurons by word").fill("cat");
    await page.locator(".rows li button").first().click();
    await expect(inspector(page).getByRole("heading", { name: "Layer 0, neuron 1" })).toHaveCount(0);
    await page.getByRole("link", { name: "Findings" }).click();
    await expect(page.getByRole("heading", { name: "What pushing every neuron did" })).toBeVisible();
    await page.goBack();
    await expect(inspector(page)).toBeVisible();
    await page.goBack();
    await expect(inspector(page).getByRole("heading", { name: "Layer 0, neuron 1" })).toBeVisible();
    await page.goForward();
    await expect(inspector(page).getByRole("heading", { name: "Layer 0, neuron 1" })).toHaveCount(0);
  });

  test("switching tabs does not add history entries", async ({ page }) => {
    await openAtlas(page, "#/atlas/L2/N3");
    const len = await page.evaluate(() => history.length);
    await page.getByRole("radio", { name: "Contexts" }).click();
    await page.getByRole("radiogroup", { name: "Neuron view" }).getByRole("radio", { name: "Steer", exact: true }).click();
    await expect(page).toHaveURL(/tab=steer/);
    expect(await page.evaluate(() => history.length)).toBe(len);
  });

  test("Escape and the close button close the inspector", async ({ page }) => {
    await openAtlas(page, "#/atlas/L3/N3");
    await expect(inspector(page)).toBeVisible();
    await page.locator("body").press("Escape");
    await expect(inspector(page)).toHaveCount(0);
    await page.goto("./#/atlas/L3/N4");
    await page.getByRole("button", { name: "Close neuron" }).click();
    await expect(inspector(page)).toHaveCount(0);
    await expect(page).toHaveURL(/#\/atlas$/);
  });
});

test.describe("map", () => {
  test("colour modes and the co-firing layout switch without errors", async ({ page }) => {
    await openAtlas(page);
    await waitForSweep(page);
    for (const name of ["Selectivity", "Firing rate", "Your text", "Uniqueness"]) {
      const radio = page.getByRole("radiogroup", { name: "Colour neurons by" }).getByRole("radio", { name, exact: true });
      await radio.click();
      await expect(radio).toHaveAttribute("aria-checked", "true");
    }
    await page.getByRole("radio", { name: "Co-firing" }).click();
    await page.waitForTimeout(1100);
    await page.getByRole("radio", { name: "Writes" }).click();
    await page.getByRole("button", { name: "layer 3" }).click();
    await expect(page.getByRole("button", { name: "layer 3" })).toHaveClass(/on/);
  });

  test("clicking a point on the map opens a neuron", async ({ page }) => {
    await openAtlas(page);
    const canvas = page.locator(".map canvas");
    const box = (await canvas.boundingBox())!;
    // sweep a grid until a point is under the cursor
    let opened = false;
    for (let gy = 0.3; gy <= 0.7 && !opened; gy += 0.05) {
      for (let gx = 0.3; gx <= 0.7 && !opened; gx += 0.04) {
        await page.mouse.move(box.x + box.width * gx, box.y + box.height * gy);
        if (await page.locator(".hover-card").count()) {
          await page.mouse.down();
          await page.mouse.up();
          opened = true;
        }
      }
    }
    expect(opened).toBe(true);
    await expect(inspector(page)).toBeVisible();
  });

  test("losing the WebGL context shows a fallback and the map can come back", async ({ page }) => {
    await openAtlas(page);
    await page.evaluate(() => {
      const c = document.querySelector(".map canvas") as HTMLCanvasElement;
      const gl = (c.getContext("webgl2") ?? c.getContext("webgl")) as WebGLRenderingContext;
      gl.getExtension("WEBGL_lose_context")!.loseContext();
    });
    await expect(page.getByRole("heading", { name: "The 3D map is unavailable" })).toBeVisible();
    await expect(page.locator(".map-fallback")).toContainText("context was lost");
    // the rest of the app still works
    await page.getByLabel("Search neurons by word").fill("happy");
    await page.locator(".rows li button").first().click();
    await expect(inspector(page)).toBeVisible();
    await page.getByRole("button", { name: "Try the map again" }).click();
    await expect(page.locator(".map canvas")).toBeVisible();
  });

  test("without WebGL the app still works", async ({ page, allowErrors }) => {
    allowErrors(/WebGL|THREE/i);
    await page.addInitScript(() => {
      const orig = HTMLCanvasElement.prototype.getContext;
      // @ts-expect-error test override
      HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
        if (/webgl/.test(type)) return null;
        return orig.call(this, type, ...rest);
      };
    });
    await page.goto("./#/atlas");
    await expect(page.getByRole("heading", { name: "The 3D map is unavailable" })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Co-firing" })).toHaveCount(0);
    await page.locator(".rows li button").first().click();
    await expect(inspector(page)).toBeVisible();
  });
});

/** The live-model edit controls sit in a closed disclosure until a neuron has an edit. */
async function chooseEdit(page: Page, mode: "Zero" | "Scale" | "Push" | "Clamp") {
  const box = page.locator("details.edit-box");
  await expect(box).not.toHaveAttribute("open");
  await box.locator("summary").click();
  await box.getByRole("radiogroup", { name: "Edit type" }).getByRole("radio", { name: mode, exact: true }).click();
}

test.describe("edits", () => {
  test("ablate, persist across reload, toggle and remove", async ({ page }) => {
    await openAtlas(page, "#/atlas/L4/N10");
    await chooseEdit(page, "Zero");
    await page.getByRole("button", { name: "Apply edit" }).click();
    const chip = page.locator(".edit-chip");
    await expect(chip).toHaveCount(1);
    await expect(chip).toContainText("L4·N10");
    await expect(chip).toContainText("zeroed");
    await page.reload();
    await expect(page.locator(".edit-chip")).toHaveCount(1);
    // after a reload the neuron already has an edit, so its section opens by itself and says so
    await expect(page.locator("details.edit-box")).toHaveAttribute("open", "");
    await expect(page.locator(".edit-box summary")).toHaveText("Edited in the live model");
    await page.getByLabel("Enable edit on L4 N10").uncheck();
    await expect(page.locator(".edit-chip")).toHaveClass(/off/);
    await page.reload();
    await expect(page.getByLabel("Enable edit on L4 N10")).not.toBeChecked();
    await page.getByLabel("Remove edit on L4 N10").click();
    await expect(page.locator(".edit-chip")).toHaveCount(0);
    await page.reload();
    await expect(page.locator(".edits .note")).toContainText("No edits yet");
  });

  test("a steer edit in residual units and Clear all", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551");
    await waitForSweep(page);
    await chooseEdit(page, "Push");
    await page.getByRole("button", { name: "Apply edit" }).click();
    await expect(page.locator(".edit-chip")).toContainText("× resid");
    await page.goto("./#/atlas/L1/N1");
    await chooseEdit(page, "Scale");
    await page.getByRole("button", { name: "Apply edit" }).click();
    await expect(page.locator(".edit-chip")).toHaveCount(2);
    await page.getByRole("button", { name: "Clear all" }).click();
    await expect(page.locator(".edit-chip")).toHaveCount(0);
  });

  test("corrupted local storage is ignored", async ({ page }) => {
    await page.addInitScript(() => {
      if (sessionStorage.getItem("seeded")) return;
      sessionStorage.setItem("seeded", "1");
      localStorage.setItem("neuron-atlas:edits:v2", "{not json");
      localStorage.setItem("neuron-atlas:names", JSON.stringify({ "L0·N0": 5, "<script>": "x", "L1·N1": "fine" }));
    });
    await openAtlas(page);
    await expect(page.locator(".edits .note")).toContainText("No edits yet");
    await page.evaluate(() =>
      localStorage.setItem(
        "neuron-atlas:edits:v2",
        JSON.stringify([
          { layer: 99, neuron: 1, mode: "set", value: 0, maxAct: 1 },
          { layer: 1, neuron: 2, mode: "evil", value: 0, maxAct: 1 },
          { layer: 1, neuron: 3, mode: "add", value: Number.MAX_VALUE, maxAct: 1 },
          { layer: 1, neuron: 4, mode: "add", value: 1, maxAct: -1 },
          "nonsense",
          null,
          { layer: 2, neuron: 5, mode: "scale", value: 2, maxAct: 3 },
        ]),
      ),
    );
    await page.reload();
    await expect(page.locator(".edit-chip")).toHaveCount(1);
    await expect(page.locator(".edit-chip")).toContainText("L2·N5");
    await page.goto("./#/atlas/L1/N1");
    await expect(page.getByLabel("Your name for this neuron")).toHaveValue("fine");
  });

  test("blocked storage does not break the app", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new DOMException("blocked", "SecurityError");
        },
      });
    });
    await openAtlas(page, "#/atlas/L0/N5");
    await chooseEdit(page, "Zero");
    await page.getByRole("button", { name: "Apply edit" }).click();
    await expect(page.locator(".edit-chip")).toHaveCount(1);
  });
});

test.describe("probe", () => {
  test("probes text, selects a token with the keyboard, and handles edge input", async ({ page }) => {
    await openAtlas(page);
    await waitForModel(page);
    const box = page.locator("#probe-text");
    await box.fill("The dog ran to the park.");
    await expect(page.locator(".probe-status")).toContainText("tokens");
    const tok = page.locator(".probe-tokens .tok").nth(1);
    await tok.focus();
    await page.keyboard.press("Enter");
    await expect(tok).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("radio", { name: "Your text" })).toHaveAttribute("aria-checked", "true");

    await box.fill("");
    await expect(page.locator(".probe-status")).toContainText("Type something");
    await expect(page.locator(".probe-tokens .tok")).toHaveCount(0);

    await box.fill("🐶🦄 naïve café — “quotes” \u0000 \t\n end 日本語");
    await expect(page.locator(".probe-status")).toContainText("tokens");

    await box.fill("Once upon a time there was a dog. ".repeat(80));
    await expect(page.locator(".probe-status")).toContainText("only the first 160");
    await expect(page.locator(".probe-tokens .tok")).toHaveCount(160);
  });

  test("an edit changes the probe's predictions", async ({ page }) => {
    await openAtlas(page, "#/atlas/L5/N551");
    await waitForModel(page);
    await page.locator("#probe-text").fill("Once upon a time, there was a");
    await expect(page.locator(".probe-status")).toContainText("tokens");
    await chooseEdit(page, "Push");
    await page.getByRole("button", { name: "Apply edit" }).click();
    await expect(page.locator(".probe")).toContainText(/KL|edited|with your edits/i);
  });
});

test.describe("one control for colour and list", () => {
  test("the TinyStories list re-ranks with the map colours and keeps its order for other colour modes", async ({ page }) => {
    await openAtlas(page, "#/atlas");
    await waitForSweep(page);
    const colour = page.getByRole("radiogroup", { name: "Colour neurons by" });
    const caption = page.locator(".sidebar .list-caption");
    await expect(caption).toContainText("least like a random push");
    await colour.getByRole("radio", { name: "Selectivity", exact: true }).click();
    await expect(caption).toHaveText("Most selective neurons first");
    await colour.getByRole("radio", { name: "Firing rate", exact: true }).click();
    await expect(caption).toHaveText("Most selective neurons first");
    await colour.getByRole("radio", { name: "Uniqueness", exact: true }).click();
    await expect(caption).toContainText("least like a random push");
    await expect(page.getByRole("radiogroup", { name: "Rank neurons by" })).toHaveCount(0);
  });

  test("a recorded model's list follows the map colours", async ({ page }) => {
    await page.goto("./#/m/qwen3.5-0.8b");
    const colour = page.getByRole("radiogroup", { name: "Colour neurons by" });
    const caption = page.locator(".sidebar .list-caption").last();
    await expect(caption).toContainText("confirmed at full precision");
    await colour.getByRole("radio", { name: "Evil contrast", exact: true }).click();
    await expect(caption).toContainText("fire more on evil sentences");
    await colour.getByRole("radio", { name: "Selectivity", exact: true }).click();
    await expect(caption).toContainText("fire more on evil sentences");
    await expect(page.getByRole("radiogroup", { name: "List" })).toHaveCount(0);
  });
});
