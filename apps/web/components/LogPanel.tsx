"use client";
export default function LogPanel({ logs }: { logs: { type: string; [key: string]: unknown }[] }) {
  return (
    <div className="font-mono text-[11px] space-y-2">
      {logs.map((log, i) => (
        <pre key={i} className="bg-[#0B0F14] border border-slate-800 rounded-lg p-2 whitespace-pre-wrap break-words">
          {JSON.stringify(log, null, 2)}
        </pre>
      ))}
    </div>
  );
}