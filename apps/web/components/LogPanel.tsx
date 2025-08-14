"use client";
export default function LogPanel({ logs }:{ logs: any[] }) {
  return (
    <div className="h-[520px] rounded-2xl border border-zinc-800 p-3 overflow-auto text-sm">
      {logs.map((l, i) => (
        <pre key={i} className="mb-2 whitespace-pre-wrap">{JSON.stringify(l, null, 2)}</pre>
      ))}
    </div>
  );
}