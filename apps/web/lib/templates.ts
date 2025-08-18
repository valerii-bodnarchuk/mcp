import type { Edge } from "reactflow";
import type { CustomNode } from "@/types";

const mk = (id: string, x: number): CustomNode => ({
  id,
  position: { x, y: 150 },
  data: {
    title: id === "llm" ? "LLM" : id[0].toUpperCase() + id.slice(1),
    label: id,
    status: "idle",
  },
  type: "custom",
});

const e = (a: string, b: string): Edge => ({
  id: `${a}-${b}`,
  source: a,
  target: b,
  type: "animated"
});

export const initialNodes: CustomNode[] = [
  mk("input", 50),
  mk("validate", 200),
  mk("embed", 350),
  mk("search", 500),
  mk("context", 650),
  mk("llm", 800),
  mk("post", 950)
];

export const initialEdges: Edge[] = [
  e("input", "validate"),
  e("validate", "embed"),
  e("embed", "search"),
  e("search", "context"),
  e("context", "llm"),
  e("llm", "post")
];

export const templates = [
  { id: "llm-only", name: "LLM Only", desc: "Input → LLM → Post", nodes: [mk("input", 80), mk("llm", 260), mk("post", 440)], edges: [e("input","llm"), e("llm","post")] },
  { id: "rag-basic", name: "RAG Basic", desc: "Input → Embed → Search → Context → LLM → Post", nodes: initialNodes, edges: initialEdges },
];