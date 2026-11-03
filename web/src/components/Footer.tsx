import { useStore } from "../store";

declare const __BUILD_COMMIT__: string;
declare const __BUILD_DATE__: string;

const REPO = "https://github.com/Exios66/LLM_Viz";

export function Footer() {
  const sweep = useStore((s) => s.sweep);
  const research = useStore((s) => s.research);
  const models = useStore((s) => s.models);
  const commit = typeof __BUILD_COMMIT__ === "string" ? __BUILD_COMMIT__ : "dev";
  const date = typeof __BUILD_DATE__ === "string" ? __BUILD_DATE__ : "";
  return (
    <footer className="site-foot">
      <div className="foot-cols">
        <p>
          Built by Jack J Burleson. Models: TinyStories-8M (Eldan &amp; Li, 2023){models.length > 0 && `, ${models.map((m) => m.label).join(", ")}`}. Inspired by{" "}
          <a href="https://github.com/lyramakesmusic/neuron-explorer">neuron-explorer</a>.
        </p>
        <ul className="foot-links">
          <li><a href={REPO}>Source code</a></li>
          <li><a href={`${REPO}/issues/new`}>Report a problem</a></li>
          <li><a href="#/method">Responsible use</a></li>
        </ul>
      </div>
      <p className="foot-meta">
        Build{" "}
        {commit !== "unknown" && commit !== "dev" ? <a href={`${REPO}/commit/${commit}`}>{commit}</a> : commit}
        {date && ` of ${date}`}
        {sweep?.findings.generated && `. Steering data ${sweep.findings.generated.slice(0, 10)}`}
        {research?.generated && `. Reports ${research.generated.slice(0, 10)}`}. Browser tests run on Chromium only.
      </p>
    </footer>
  );
}
