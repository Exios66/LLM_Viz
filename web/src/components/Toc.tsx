// "On this page": the margin column of the long reading pages (Method, each report). It lists the section headings
// found under `scope`, scrolls to one on click, and marks the section being read. Hidden on narrow screens, where the
// reading column takes the full width. Buttons, not links: hash links are routes on this site.

import { useEffect, useState, type RefObject } from "react";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

/** Where the reader is: the last heading whose top has passed this share of the scroller's height. */
const READ_LINE = 0.22;

/**
 * Lists the headings under `scope` that match `selector`, and keeps the one being read marked.
 * `deps` re-collects the headings when the content behind them changes (another report, late-loading data).
 */
export function Toc({ scope, selector, deps }: { scope: RefObject<HTMLElement | null>; selector: string; deps?: unknown }) {
  const [items, setItems] = useState<{ id: string; text: string; el: HTMLElement }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    // Ids this component wrote are marked, and rewritten from the current text every time: React reuses heading nodes
    // between reports, so a kept id would name the previous report's heading. Ids the markup set (refs-title) stay.
    // A generated id also steps around any id already used elsewhere in the document.
    const seen = new Set<string>();
    const found = [...root.querySelectorAll<HTMLElement>(selector)].map((el) => {
      const text = el.textContent ?? "";
      const own = !el.id || el.dataset.toc === "1";
      const base = own ? `s-${slug(text)}` : el.id;
      const taken = (id: string) => {
        if (seen.has(id)) return true;
        if (!own) return false;
        const other = document.getElementById(id);
        return !!other && other !== el;
      };
      let id = base;
      for (let n = 2; taken(id); n++) id = `${base}-${n}`;
      seen.add(id);
      if (own) {
        el.id = id;
        el.dataset.toc = "1";
      }
      return { id, text, el };
    });
    setItems(found);
    setActive(found[0]?.id ?? null);

    // Scroll-spy from the scroller's own geometry, once per frame. (An IntersectionObserver with a percentage
    // rootMargin cannot do this: percentages there resolve against the root's width, not its height.)
    const scroller = document.getElementById("main");
    if (!found.length || !scroller) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = scroller.getBoundingClientRect().top + scroller.clientHeight * READ_LINE;
      let cur = found[0];
      for (const f of found) if (f.el.getBoundingClientRect().top <= line) cur = f;
      // at the very bottom the last sections may never reach the line: mark the last one
      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) cur = found[found.length - 1];
      setActive(cur.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [scope, selector, deps]);

  if (items.length < 3) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc-title">On this page</p>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <button
              className={it.id === active ? "on" : ""}
              aria-current={it.id === active ? "location" : undefined}
              onClick={() => {
                // read the motion preference at the moment of the click, so it is always current
                const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
                it.el.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "auto" });
                setActive(it.id);
              }}
            >
              {it.text}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
