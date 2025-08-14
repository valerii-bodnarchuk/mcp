"use client";
import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  { id: "1", position: { x: 50, y: 30 }, data: { label: "Input" }, type: "input" },
  { id: "2", position: { x: 200, y: 30 }, data: { label: "Validate" } },
  { id: "3", position: { x: 370, y: 30 }, data: { label: "Embed" } },
  { id: "4", position: { x: 520, y: 30 }, data: { label: "Search" } },
  { id: "5", position: { x: 670, y: 30 }, data: { label: "Context" } },
  { id: "6", position: { x: 820, y: 30 }, data: { label: "LLM" } },
  { id: "7", position: { x: 990, y: 30 }, data: { label: "Post" }, type: "output" }
];
const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e6-7", source: "6", target: "7" }
];

export default function Canvas() {
  return (
    <div className="h-[520px] rounded-2xl border border-zinc-800 overflow-hidden">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}