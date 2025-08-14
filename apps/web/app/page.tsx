"use client";
import { useState } from "react";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import LogPanel from "../components/LogPanel";

export default function Page() {
  const [logs, setLogs] = useState<any[]>([]);
  const [query, setQuery] = useState("What is MCP?");

  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const run = async () => {
    setLogs([]);
    const res = await fetch(`${api}/pipeline/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }).then((r) => r.json());
    setLogs((l) => [...l, { type: "done", ctx: res }]);
  };

  const stream = () => {
    setLogs([]);
    const es = new EventSource(`${api}/pipeline/events?q=${encodeURIComponent(query)}`);
    es.onmessage = (e) => setLogs((l) => [...l, JSON.parse(e.data)]);
    es.onerror = () => es.close();
  };

  return (
    <main className="p-4 grid grid-cols-12 gap-4">
      <div className="col-span-9 space-y-4">
        <Toolbar query={query} setQuery={setQuery} onRun={run} onStream={stream} />
        <Canvas />
      </div>
      <div className="col-span-3">
        <LogPanel logs={logs} />
      </div>
    </main>
  );
}
