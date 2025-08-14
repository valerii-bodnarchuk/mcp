import "../styles/globals.css";

export const metadata = { title: "MCPX", description: "Multi-Component Pipeline UI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
