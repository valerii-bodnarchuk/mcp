import "../styles/globals.css";

export const metadata = {
  title: "MCP Playground — Visual AI Pipeline Builder",
  description: "Build, run, and share AI pipelines. Stream tokens, animated edges, per-node latency.",
  openGraph: {
    title: "MCP Playground — Visual AI Pipeline Builder",
    description: "Build, run, and share AI pipelines. Stream tokens, animated edges, per-node latency.",
    url: "https://<your-domain>",
    type: "website",
    images: [
      { url: "/og-mcp-playground-a.png", width: 1200, height: 630 },
      { url: "/og-mcp-playground-b.png", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-mcp-playground-a.png"],
  },
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