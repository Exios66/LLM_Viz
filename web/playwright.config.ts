import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (npm run build), served the way GitHub Pages serves it:
// static files under a sub-path. `npm run test:e2e` builds first.
const PORT = 4173;
const BASE = "/llm_viz/";

export default defineConfig({
  testDir: "e2e",
  timeout: 90_000,
  expect: { timeout: 20_000 },
  fullyParallel: true,
  workers: 3,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}${BASE}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } }, testIgnore: /(mobile|perf)\.spec\.ts$/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, testMatch: /mobile\.spec\.ts$/ },
    // Firefox and WebKit run the tests tagged @xb: loading, search, deep links, history, edits, the probe, steering,
    // replay, the keyboard, Home's chart, the theme, shortcuts, Research, compare and ablation
    // headless Firefox on Linux has no WebGL without a GPU; scripts/pw.sh runs it headed under Xvfb instead
    { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 }, headless: process.env.PW_FIREFOX_HEADED !== "1" }, grep: /@xb/, testIgnore: /(mobile|perf)\.spec\.ts$/ },
    { name: "webkit", use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } }, grep: /@xb/, testIgnore: /(mobile|perf)\.spec\.ts$/ },
    // timing budgets run last and alone: parallel workers sharing the CPU would make long tasks look longer
    {
      name: "perf",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
      testMatch: /perf\.spec\.ts$/,
      dependencies: ["desktop", "mobile"],
      fullyParallel: false,
    },
  ],
  webServer: {
    command: `npx vite preview --port ${PORT} --strictPort --base ${BASE}`,
    url: `http://localhost:${PORT}${BASE}`,
    reuseExistingServer: !process.env.PW_FRESH_SERVER, // the deploy gate sets it so it tests this checkout's build
    timeout: 30_000,
  },
});
