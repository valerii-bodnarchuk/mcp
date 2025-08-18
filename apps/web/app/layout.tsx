import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Playground",
  description: "Visual AI Pipeline Builder (ChupaChups Edition)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0B0F14] text-slate-100">
      <body className="min-h-screen antialiased selection:bg-indigo-500/20 selection:text-indigo-200">
        <div className="max-w-[1600px] mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}