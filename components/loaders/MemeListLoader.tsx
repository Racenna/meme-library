import { Skeleton } from "@heroui/react";
import React from "react";

const MemeListLoader = () => {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-4 max-w-screen-xl mx-auto">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Skeleton
          key={idx}
          className="w-full max-w-sm min-w-60 h-[400px] rounded-xl"
        />
      ))}
    </div>
  );
};

export default MemeListLoader;
