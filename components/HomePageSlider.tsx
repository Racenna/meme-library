"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { menuItems } from "@/constants";
import MemeEntryCard from "@/components/MemeEntryCard";

const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const HomePageSlider = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  useEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const visiblePart = 40; // visible pixels
      const calcOffset = cardWidth - visiblePart;
      setOffsetX(calcOffset);
    }
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && cardIndex < menuItems.length - 1) {
      setCardIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && cardIndex > 0) {
      setCardIndex((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      style={{
        x: dragX,
      }}
      animate={{
        translateX: `-${offsetX * cardIndex}px`,
      }}
      transition={SPRING_OPTIONS}
      onDragEnd={onDragEnd}
      className="flex cursor-grab items-center active:cursor-grabbing"
    >
      {menuItems.map(({ label, link }, idx) => (
        <motion.div
          key={label}
          ref={cardRef}
          animate={{
            scale: cardIndex === idx ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="flex justify-center items-center shrink-0 w-[280px] first:ml-4 last:-ml-2 3xs:w-[300px] 3xs:first:ml-3 2xs:w-80 2xs:last:-ml-3 xs:first:ml-4 xs:last:ml-0"
        >
          <MemeEntryCard label={label} link={link} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HomePageSlider;
