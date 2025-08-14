"use client";
export default function Toolbar({ query, setQuery, onRun, onStream }:{
  query: string;
  setQuery: (v: string) => void;
  onRun: () => void;
  onStream: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
        className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 outline-none"
      />
      <button onClick={onRun} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Run</button>
      <button onClick={onStream} className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500">Stream</button>
    </div>
  );
}