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
  const [query, setQuery] = useState("What is MCP?");
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes as unknown as CustomNode[]);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Shareable URL → preload
  useEffect(() => {
    const cfg = decodeFromURL();
    if (cfg) {
      setNodes(cfg.nodes ?? initialNodes);
      setEdges(cfg.edges ?? initialEdges);
      if (cfg.query) setQuery(cfg.query);
    }
  }, []);

  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const pipeline = usePipeline({ 
    api, 
    nodes: nodes as unknown as Node[], 
    edges, 
    query 
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds) as CustomNode[]),
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