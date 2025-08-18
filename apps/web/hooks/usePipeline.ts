"use client";
import { useState } from "react";
import { Edge } from "reactflow";
import type { CustomNode } from "@/types";

type PipelineConfig = {
  api: string;
  nodes: CustomNode[];
  edges: Edge[];
  query: string;
};

export function usePipeline({ api, nodes, edges, query }: PipelineConfig) {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<{ type: string; [key: string]: unknown }[]>([]);
  const [statuses, setStatuses] = useState<Record<string, { status: string; meta?: string }>>({});
  const [metrics, setMetrics] = useState({ totalMs: 0, tokensIn: 0, tokensOut: 0 });
  const [cost, setCost] = useState({ totalUSD: 0, byStep: [] as { step: string; usd: number }[] });
  const [ctx, setCtx] = useState<string[]>([]);

  function clear() {
    setLogs([]);
    setStatuses({});
    setMetrics({ totalMs: 0, tokensIn: 0, tokensOut: 0 });
    setCost({ totalUSD: 0, byStep: [] });
    setCtx([]);
  }

  async function run() {
    clear(); setRunning(true);
    const t0 = Date.now();
    try {
      const res = await fetch(`${api}/pipeline/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, nodes, edges }),
      }).then(r => r.json());

      setLogs(l => [...l, { type: "done", ctx: res }]);

      // latency хотя бы по клиенту
      setMetrics(m => ({ ...m, totalMs: Date.now() - t0 }));

      if (Array.isArray(res?.contextKeys)) setCtx(res.contextKeys);
      if (res?.usage) setMetrics(m => ({ ...m, tokensIn: res.usage.prompt ?? 0, tokensOut: res.usage.completion ?? 0 }));
      if (res?.cost) setCost(res.cost);
    } finally {
      setRunning(false);
    }
  }

  function setNodeStatus(step: string, status: "running"|"ok"|"err", meta?: string) {
    setStatuses(s => ({ ...s, [step]: { status, meta } }));
  }

  function stream() {
    clear(); setRunning(true);
    const es = new EventSource(`${api}/pipeline/events?q=${encodeURIComponent(query)}`);
    const t0 = Date.now();
    const norm = (s: string) => (s || "").toLowerCase();

    es.onmessage = (e) => {
      const evt = JSON.parse(e.data);
      setLogs(l => [...l, evt]);

      if (evt.type === "step:start") setNodeStatus(norm(evt.step), "running");
      if (evt.type === "step:end") {
        setNodeStatus(norm(evt.step), "ok", `${evt.ms}ms`);
        if (Array.isArray(evt.contextKeys)) setCtx(evt.contextKeys);
        setMetrics(m => ({ ...m, totalMs: Date.now() - t0 }));
      }
      if (evt.type === "error") setNodeStatus(norm(evt.step ?? "llm"), "err");

      // опционально считаем токены, если летят
      if (evt.type === "stream:token") setMetrics(m => ({ ...m, tokensOut: m.tokensOut + 1 }));
      if (evt.type === "usage") setMetrics(m => ({
        ...m,
        tokensIn: evt.prompt ?? m.tokensIn,
        tokensOut: evt.completion ?? m.tokensOut
      }));
      if (evt.type === "cost:update") setCost({ totalUSD: evt.totalUSD ?? 0, byStep: evt.byStep ?? [] });
    };

    es.onerror = () => { es.close(); setRunning(false); };
  }

  function share(_: { nodes: CustomNode[]; edges: Edge[]; query: string }) { /* твоя encodeToURL, не трогаю */ }

  return { run, stream, share, logs, statuses, metrics, cost, ctx, running, clear };
}
