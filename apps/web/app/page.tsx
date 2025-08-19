"use client";
import { useCallback, useEffect, useState } from "react";
import { 
  Edge, 
  NodeChange, 
  applyNodeChanges, 
  EdgeChange, 
  applyEdgeChanges,
} from "reactflow";
import type { CustomNode } from "@/types";
import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import RightPanel from "@/components/RightPanel";
import { usePipeline } from "@/hooks/usePipeline";
import { initialNodes, initialEdges } from "@/lib/templates";
import { decodeFromURL } from "@/lib/share";

export default function Page() {
  const [query, setQuery] = useState("What is the Multi-Component Pipeline (MCP) in this app?");
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  type SharePayload = { nodes?: CustomNode[]; edges?: Edge[]; query?: string };

  function isSharePayload(x: unknown): x is SharePayload {
    if (!x || typeof x !== "object") return false;
    const o = x as Record<string, unknown>;
    const nodesOk = !("nodes" in o) || Array.isArray(o.nodes);
    const edgesOk = !("edges" in o) || Array.isArray(o.edges);
    const queryOk = !("query" in o) || typeof o.query === "string";
    return nodesOk && edgesOk && queryOk;
  }

  useEffect(() => {
    const raw = decodeFromURL();
    if (isSharePayload(raw)) {
      setNodes(raw.nodes ?? initialNodes);
      setEdges(raw.edges ?? initialEdges);
      if (raw.query) setQuery(raw.query);
    }
  }, []);

  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const pipeline = usePipeline({ 
    api, 
    nodes, 
    edges, 
    query 
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => 
      setNodes((nds: CustomNode[]) => 
        applyNodeChanges(changes, nds) as CustomNode[]
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const left = (
    <div className="col-span-9 space-y-4">
      <Toolbar
        query={query}
        setQuery={setQuery}
        onRun={pipeline.run}
        onStream={pipeline.stream}
        onTemplate={(tpl) => {
          setNodes(tpl.nodes);
          setEdges(tpl.edges);
        }}
        onShare={() => pipeline.share({ 
          nodes,
          edges,
          query 
        })}
        running={pipeline.running}
      />
      <Canvas
        nodes={nodes}
        edges={edges}
        setNodes={onNodesChange}
        setEdges={onEdgesChange}
        statuses={pipeline.statuses}
      />
    </div>
  );

  return (
    <main className="grid grid-cols-12 gap-4">
      {left}
      <RightPanel
        logs={pipeline.logs}
        metrics={pipeline.metrics}
        ctx={pipeline.ctx}
        cost={pipeline.cost}
        running={pipeline.running}
        onClear={pipeline.clear}
      />
    </main>
  );
}