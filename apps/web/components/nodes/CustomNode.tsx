"use client";
import { Handle, Position } from "reactflow";
import { Spark, Check, X } from "../icons";

type Status = "idle" | "running" | "ok" | "err";
export type NodeData = { title: string; icon?: React.ReactNode; meta?: string; status?: Status };

export default function CustomNode({ data }: { data: NodeData }) {
  const { title, meta, status = "idle", icon } = data;
  const ring =
    status === "running" ? "ring-2 ring-indigo-500 animate-pulse" :
    status === "ok" ? "ring-1 ring-emerald-500" :
    status === "err" ? "ring-1 ring-rose-500" : "ring-1 ring-slate-800";
  return (
    <div className={`rounded-2xl bg-[#10161D] text-slate-100 px-4 py-3 border border-slate-800 shadow-lg ${ring}`}>
      <div className="flex items-center gap-2">
        <div className="opacity-80">{icon ?? <Spark className="fill-indigo-400"/>}</div>
        <div className="font-medium tracking-tight">{title}</div>
        <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
          {meta && <span>{meta}</span>}
          {status === "running" && <Spark className="fill-indigo-400" />}
          {status === "ok" && <Check />}
          {status === "err" && <X />}
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-slate-500" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-slate-500" />
    </div>
  );
}