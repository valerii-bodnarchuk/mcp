export const Dot = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 8 8" width={8} height={8} {...p}><circle cx="4" cy="4" r="4"/></svg>
);
export const Spark = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...p}><path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/></svg>
);
export const Check = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="14" height="14" {...p}><path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z"/></svg>
);
export const X = (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="14" height="14" {...p}><path fill="currentColor" d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg>
);