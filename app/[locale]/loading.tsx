import type { ReactNode } from "react";

export default function Loading(): ReactNode {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-muted">Yüklənir...</p>
      </div>
    </div>
  );
}
