"use client";

import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";

export default function Provider({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
