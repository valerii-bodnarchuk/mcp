"use client";
import { templates } from "@/lib/templates";

type Props = {
  query: string;
  setQuery: (s: string) => void;
  onRun: () => void;
  onStream: () => void;
  onTemplate: (tpl: { nodes: any[]; edges: any[] }) => void;
  onShare: () => void;
  running: boolean;
};

export default function Toolbar({ query, setQuery, onRun, onStream, onTemplate, onShare, running }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        className="flex-1 px-4 py-3 rounded-xl bg-[#10161D] border border-slate-700 text-slate-100 outline-none"
        placeholder="What is the Multi-Component Pipeline (MCP)?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onRun(); }}
      />
      <button onClick={onRun} disabled={running} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50">Run</button>
      <button onClick={onStream} disabled={running} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">Stream</button>

      <div className="relative">
        <details className="group">
          <summary className="cursor-pointer px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700">Templates</summary>
          <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-700 bg-[#0B0F14] p-2 shadow-xl z-10">
            {templates.map((t) => (
              <button key={t.id} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800" onClick={() => onTemplate(t)}>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-slate-400">{t.desc}</div>
              </button>
            ))}
          </div>
        </details>
      </div>

      <button
        onClick={() => {
          // 1) обновляем URL (твой onShare уже сериализует состояние в ?p=...)
          onShare();
          // 2) открываем офсайт-шаринг LinkedIn с текущим URL
          const href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
          window.open(href, "_blank", "noopener,noreferrer,width=900,height=650");
        }}
        className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700"
      >
        Share
      </button>
    </div>
  );
}