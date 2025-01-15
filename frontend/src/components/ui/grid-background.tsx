import React from "react";

export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen grid-background">
      {children}
    </div>
  );
}
