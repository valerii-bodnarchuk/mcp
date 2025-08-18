"use client";
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  NodeTypes, 
  EdgeTypes, 
  NodeChange, 
  EdgeChange,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNodeComponent from "./nodes/CustomNode";
import AnimatedEdge from "./edges/AnimatedEdge";
import type { CustomNode } from "@/types";

const nodeTypes: NodeTypes = { custom: CustomNodeComponent };
const edgeTypes: EdgeTypes = { animated: AnimatedEdge };

type StatusData = { status: string; meta?: string };

type Props = {
  nodes: CustomNode[];
  edges: Edge[];
  setNodes: (changes: NodeChange[]) => void;
  setEdges: (changes: EdgeChange[]) => void;
  statuses: Record<string, StatusData>;
};

export default function Canvas({ nodes, edges, setNodes, setEdges, statuses }: Props) {
  // inject status/meta into nodes
  const withStatus = nodes.map((n) => ({
    ...n,
    data: {
      ...n.data,
      status: statuses[n.id]?.status,
      meta: statuses[n.id]?.meta,
    },
    type: "custom",
  }));
  const withType = edges.map((e) => ({ ...e, type: "animated" as const }));

  return (
    <div className="h-[72vh] rounded-2xl border border-slate-800 bg-[#0B0F14]">
      <ReactFlow
        nodes={withStatus}
        edges={withType}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      >
        <Background gap={18} size={1} color="#1f2937" />
        <MiniMap className="!bg-[#0B0F14]" />
        <Controls />
      </ReactFlow>
    </div>
  );
}