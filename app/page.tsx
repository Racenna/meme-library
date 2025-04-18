"use client";

import HomePageSlider from "@/components/HomePageSlider";
import MemeEntryCard from "@/components/MemeEntryCard";
import { menuItems } from "@/constants";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function RootPage() {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mx-4">
        Welcome to Meme Handbook
      </h1>
      {!isMobile && (
        <div className="flex justify-center p-8 gap-4 md:gap-8">
          {menuItems.map(({ label, link }) => (
            <MemeEntryCard key={label} label={label} link={link} />
          ))}
        </div>
      )}
      {isMobile && (
        <div className="block overflow-hidden py-8 relative">
          <HomePageSlider />
        </div>
      )}
    </div>
  );
}
