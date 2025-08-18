export function encode(obj: object | string | number | boolean | null | Array<object | string | number | boolean | null>): string { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); }
export function decode(s: string) { return JSON.parse(decodeURIComponent(escape(atob(s)))); }

export function encodeToURL(payload: DecodedConfig): void {
  const url = new URL(window.location.href);
  url.searchParams.set("p", encode(payload));
  history.replaceState({}, "", url.toString());
  navigator.clipboard?.writeText(url.toString());
}

export interface DecodedConfig {
  nodes?: any[];
  edges?: any[];
  query?: string;
}

export function decodeFromURL(): DecodedConfig | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search).get("p");
  if (!p) return null;
  try { return decode(p); } catch { return null; }
}