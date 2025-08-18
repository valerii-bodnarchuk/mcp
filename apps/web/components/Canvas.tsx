"use client";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, NodeTypes, EdgeTypes, NodeChange, EdgeChange } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./nodes/CustomNode";
import AnimatedEdge from "./edges/AnimatedEdge";

const nodeTypes: NodeTypes = { custom: CustomNode };
const edgeTypes: EdgeTypes = { animated: AnimatedEdge };

type Props = {
  nodes: Node[]; 
  edges: Edge[];
  setNodes: (n: Node[] | ((nodes: Node[]) => Node[])) => void; 
  setEdges: (e: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  statuses: Record<string, { status: string; meta?: string }>;
};

export default function Canvas({ nodes, edges, setNodes, setEdges, statuses }: Props) {
  // inject status/meta into nodes
  const withStatus = nodes.map((n) => ({
    ...n,
    data: { ...n.data, ...(statuses[n.id] ?? {}) },
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
        onNodesChange={(changes) => {
          if (window.applyNodeChanges) {
            setNodes((nodes) => window.applyNodeChanges(changes, nodes));
          }
        }}
        onEdgesChange={(changes) => {
          if (window.applyEdgeChanges) {
            setEdges((edges) => window.applyEdgeChanges(changes, edges));
          }
        }}
      >
        <Background gap={18} size={1} color="#1f2937" />
        <MiniMap className="!bg-[#0B0F14]" />
        <Controls />
      </ReactFlow>
    </div>
  );
}