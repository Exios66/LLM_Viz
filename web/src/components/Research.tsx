// Research reports and literature review (ADR-004). Rendered from research.json with a small, safe markdown subset:
// no HTML from the data ever reaches the DOM.

import { Fragment, useEffect, useMemo, useRef } from "react";
import { parseInline, type Block, type Reference, type Report, type ResearchData } from "../lib/research";
import { setState, useStore } from "../store";
import { ensureResearch } from "../App";
import { Toc } from "./Toc";

/** The research section: the report index, or one report when the route names it. */
export function ResearchPage() {
  const research = useStore((s) => s.research);
  const err = useStore((s) => s.researchError);
  const card = useStore((s) => s.card);
  useEffect(ensureResearch, []);
  useEffect(() => {
    document.getElementById("main")?.scrollTo?.({ top: 0 });
  }, [card]);

  if (!research) {
    return (
      <div className="page-wrap">
        <h2 className="page-title">Research</h2>
        {err && err !== "loading" ? (
          <p className="err" role="alert">The reports failed to load: {err}</p>
        ) : (
          <div role="status" aria-label="Loading reports">
            <div className="skeleton skel-line" />
            <div className="skeleton skel-line" />
            <div className="skeleton skel-line short" />
          </div>
        )}
      </div>
    );
  }
  const report = card ? research.reports.find((r) => r.slug === card) : null;
  if (card && !report) {
    return (
      <div className="page-wrap">
        <p className="notice inline" role="status">There is no report called “{card}”.</p>
        <ReportIndex data={research} />
      </div>
    );
  }
  // keyed by slug, so moving to another report mounts a fresh view instead of reusing the last one's nodes
  return report ? <ReportView key={report.slug} data={research} report={report} /> : <ReportIndex data={research} />;
}

/** Studies (numbered) and background reading, each with its one-line finding. */
function ReportIndex({ data }: { data: ResearchData }) {
  const studies = data.reports.filter((r) => r.kind === "study");
  const lit = data.reports.filter((r) => r.kind === "literature");
  return (
    <div className="page-wrap">
      <header className="page-head">
        <p className="eyebrow">Generated from the recorded data</p>
        <h2 className="page-title">Research</h2>
        <p className="lede">
          Each report is generated from the recorded data by <code>pipeline/reports.py</code>. The script fills in every number, so the reports cannot drift
          from the data. Regenerate them after any pipeline run.
        </p>
      </header>
      <section aria-labelledby="studies-title">
        <h3 id="studies-title" className="section-title">Studies</h3>
        <ol className="report-list">
          {studies.map((r) => (
            <li key={r.slug}>
              <a href={`#/research/${r.slug}`}>
                <strong>{r.title}</strong>
                <span>{r.summary}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
      {lit.length > 0 && (
        <section aria-labelledby="lit-title">
          <h3 id="lit-title" className="section-title">Background</h3>
          <ul className="report-list">
            {lit.map((r) => (
              <li key={r.slug}>
                <a href={`#/research/${r.slug}`}>
                  <strong>{r.title}</strong>
                  <span>{r.summary}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="note">Reports generated {data.generated.slice(0, 10)}. {data.references.length} references, each checked against its source.</p>
    </div>
  );
}

/** One report: its blocks, citations numbered in order of first use, the references, and an "On this page" column. */
function ReportView({ data, report }: { data: ResearchData; report: Report }) {
  const refs = useMemo(() => new Map(data.references.map((r) => [r.id, r])), [data]);
  // number citations in order of first use, so the reference list matches the text
  const order = useMemo(() => {
    const seen: string[] = [];
    const visit = (s: string) => {
      for (const x of parseInline(s)) if (x.k === "cite" && refs.has(x.id) && !seen.includes(x.id)) seen.push(x.id);
    };
    for (const b of report.blocks) {
      if ("items" in b) b.items.forEach(visit);
      else if (b.t === "table") b.rows.forEach((row) => row.forEach(visit));
      else if (b.t === "quote") {
        visit(b.text);
        if (b.cite) visit(b.cite);
      } else visit(b.text);
    }
    if (report.kind === "literature") for (const r of data.references) if (!seen.includes(r.id)) seen.push(r.id);
    return seen;
  }, [report, refs, data]);
  const num = (id: string) => order.indexOf(id) + 1;
  const i = data.reports.indexOf(report);
  const next = data.reports[i + 1];
  const body = useRef<HTMLDivElement>(null);

  return (
    <article className="page-wrap report doc">
      <div className="doc-main" ref={body}>
      <header className="page-head">
        <a className="back" href="#/research">
          All reports
        </a>
        <h2 className="page-title">{report.title}</h2>
        <p className="lede">{report.summary}</p>
      </header>
      <div className="report-body">
        {report.blocks.map((b, k) => (
          <BlockView key={k} b={b} num={num} refs={refs} />
        ))}
      </div>
      {order.length > 0 && (
        <section className="refs" aria-labelledby="refs-title">
          <h3 id="refs-title">References</h3>
          <ol>
            {order.map((id) => {
              const r = refs.get(id)!;
              return (
                <li key={id} id={`ref-${id}`}>
                  <RefEntry r={r} detail={report.kind === "literature"} />
                </li>
              );
            })}
          </ol>
        </section>
      )}
      {next && (
        <p className="next-report">
          Next: <a href={`#/research/${next.slug}`}>{next.title}</a>
        </p>
      )}
      </div>
      <Toc scope={body} selector=".report-body > h3, .refs > h3" deps={report.slug} />
    </article>
  );
}

function RefEntry({ r, detail }: { r: Reference; detail: boolean }) {
  return (
    <>
      {r.authors} ({r.year || "n.d."}). {r.url ? <a href={r.url}>{r.title}</a> : r.title}. <em>{r.venue}</em>.
      {detail && r.takeaway && <span className="ref-take"> {r.takeaway}</span>}
    </>
  );
}

function Inline({ s, num, refs }: { s: string; num: (id: string) => number; refs: Map<string, Reference> }) {
  return (
    <>
      {parseInline(s).map((x, i) => {
        switch (x.k) {
          case "b": return <strong key={i}>{x.v}</strong>;
          case "i": return <em key={i}>{x.v}</em>;
          case "code": return <code key={i}>{x.v}</code>;
          case "a": return <a key={i} href={x.href}>{x.v}</a>;
          case "cite": {
            const r = refs.get(x.id);
            if (!r) return <Fragment key={i}>[?]</Fragment>;
            return (
              <a key={i} className="cite" href={`#ref-${x.id}`} title={`${r.authors} (${r.year}). ${r.title}`} onClick={(e) => {
                e.preventDefault();
                document.getElementById(`ref-${x.id}`)?.scrollIntoView({ block: "center" });
              }}>
                [{num(x.id)}]
              </a>
            );
          }
          default: return <Fragment key={i}>{x.v}</Fragment>;
        }
      })}
    </>
  );
}

function BlockView({ b, num, refs }: { b: Block; num: (id: string) => number; refs: Map<string, Reference> }) {
  const I = (s: string) => <Inline s={s} num={num} refs={refs} />;
  switch (b.t) {
    case "h": return b.level === 2 ? <h3>{I(b.text)}</h3> : <h4>{I(b.text)}</h4>;
    case "p": return <p>{I(b.text)}</p>;
    case "note": return <p className="report-note" role="note">{I(b.text)}</p>;
    case "quote":
      return (
        <figure className="ref-quote">
          <blockquote>{I(b.text)}</blockquote>
          {b.cite && <figcaption>{I(b.cite)}</figcaption>}
        </figure>
      );
    case "ul": return <ul>{b.items.map((x, i) => <li key={i}>{I(x)}</li>)}</ul>;
    case "ol": return <ol>{b.items.map((x, i) => <li key={i}>{I(x)}</li>)}</ol>;
    case "table":
      return (
        <figure className="report-table">
          <div className="table-scroll" tabIndex={0} role="region" aria-label={b.caption ?? "Table"}>
            <table>
              <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{I(h)}</th>)}</tr></thead>
              <tbody>{b.rows.map((row, i) => <tr key={i}>{row.map((c, j) => <td key={j}>{I(c)}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {b.caption && <figcaption>{I(b.caption)}</figcaption>}
        </figure>
      );
  }
}

/** Used by the findings and home pages to point at the research section. */
export const openResearch = (slug?: string) => setState({ view: "research", card: slug ?? null, model: null, focus: null });
