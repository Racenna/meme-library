import { Skeleton } from "@heroui/react";
import React from "react";

const MemeTableLoader = () => {
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {/* Table Header */}
      <Skeleton className="w-full max-w-4xl h-10 rounded-xl" />

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="flex w-full max-w-4xl space-x-4">
          {Array.from({ length: 5 }).map((_, col) => (
            <Skeleton key={col} className="flex-1 h-8 rounded-lg" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MemeTableLoader;
