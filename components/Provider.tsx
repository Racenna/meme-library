"use client";

import { ReactNode } from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}
