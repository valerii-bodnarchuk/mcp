"use client";
import { BaseEdge, getBezierPath } from "reactflow";

export default function AnimatedEdge({ id, sourceX, sourceY, targetX, targetY }: { id: string; sourceX: number; sourceY: number; targetX: number; targetY: number }) {
  const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });
  return (
    <g>
      <BaseEdge id={id} path={path} />
      <path d={path} className="stroke-indigo-500/70" strokeWidth={1.5} strokeDasharray="6 6" fill="none" />
      <circle r="3" className="fill-indigo-400">
        <animateMotion dur="1.8s" repeatCount="indefinite" path={path} />
      </circle>
    </g>
  );
}