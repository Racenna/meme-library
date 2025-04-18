"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Tooltip } from "@heroui/tooltip";
import React, { ReactNode } from "react";

interface SmartTooltipProps {
  children: ReactNode;
  content: string | number;
  color?: "primary" | "default";
  className?: string;
}

const SmartTooltip = ({
  content,
  children,
  className,
  color = "default",
}: SmartTooltipProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    const popoverContent = (
      <PopoverContent>
        <span>{content}</span>
      </PopoverContent>
    );

    return (
      <Popover color={color}>
        <PopoverTrigger>{children}</PopoverTrigger>
        {popoverContent}
      </Popover>
    );
  }

  return (
    <Tooltip content={content} color={color} className={className}>
      {children}
    </Tooltip>
  );
};

export default SmartTooltip;
