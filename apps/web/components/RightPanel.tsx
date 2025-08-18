"use client";
import LogPanel from "./LogPanel";

type Props = {
  logs: { type: string; [key: string]: unknown }[];
  metrics: { totalMs: number; tokensIn: number; tokensOut: number };
  ctx: string[];
  cost: { totalUSD: number; byStep: { step: string; usd: number }[] };
  running: boolean;
  onClear: () => void;
};

export default function RightPanel({ logs, metrics, ctx, cost, running, onClear }: Props) {
  return (
    <div className="col-span-3 space-y-3">
      <div className="rounded-2xl border border-slate-800 bg-[#10161D] p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Metrics</div>
          <button onClick={onClear} className="text-xs text-slate-400 hover:text-slate-200">Clear</button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <Metric label="Latency" value={`${metrics.totalMs} ms`} />
          {/* <Metric label="Tokens In" value={String(metrics.tokensIn)} /> */}
          {/* <Metric label="Tokens Out" value={String(metrics.tokensOut)} /> */}
        </div>
        {cost.totalUSD > 0 && <div className="mt-3 text-sm flex items-center justify-between">
          <div className="text-slate-400">Cost</div>
          <div className="font-medium">${cost.totalUSD}</div>
        </div>}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#10161D] p-3 h-[58vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Event Log</div>
          {running && <div className="text-xs text-indigo-300">streaming…</div>}
        </div>
        <LogPanel logs={logs} />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#10161D] p-3 text-xs">
        <div className="font-semibold mb-2">Context Keys</div>
        <pre className="whitespace-pre-wrap break-words text-slate-300">
          {JSON.stringify(ctx, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0B0F14] p-2">
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className="text-sm font-medium mt-1">{value}</div>
    </div>
  );
}