// "On this page": the margin column of the long reading pages (Method, each report). It lists the section headings
// found under `scope`, scrolls to one on click, and marks the section being read. Hidden on narrow screens, where the
// reading column takes the full width. Buttons, not links: hash links are routes on this site.

import { useEffect, useState, type RefObject } from "react";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

export function Toc({ scope, selector, deps }: { scope: RefObject<HTMLElement | null>; selector: string; deps?: unknown }) {
  const [items, setItems] = useState<{ id: string; text: string; el: HTMLElement }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    // Ids this component wrote are marked, and rewritten from the current text every time: React reuses heading nodes
    // between reports, so a kept id would name the previous report's heading. Ids the markup set (refs-title) stay.
    const seen = new Set<string>();
    const found = [...root.querySelectorAll<HTMLElement>(selector)].map((el) => {
      const text = el.textContent ?? "";
      const own = !el.id || el.dataset.toc === "1";
      const base = own ? `s-${slug(text)}` : el.id;
      let id = base;
      for (let n = 2; seen.has(id); n++) id = `${base}-${n}`;
      seen.add(id);
      if (own) {
        el.id = id;
        el.dataset.toc = "1";
      }
      return { id, text, el };
    });
    const idOf = new Map(found.map((f) => [f.el as Element, f.id]));
    setItems(found);
    setActive(found[0]?.id ?? null);
    if (!found.length || typeof IntersectionObserver === "undefined") return;
    // a heading becomes current once it crosses the top fifth of the scrolling page
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(idOf.get(hit.target) ?? null);
      },
      { root: document.getElementById("main"), rootMargin: "0px 0px -78% 0px" },
    );
    found.forEach((f) => io.observe(f.el));
    return () => io.disconnect();
  }, [scope, selector, deps]);

  if (items.length < 3) return null;
  const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
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
