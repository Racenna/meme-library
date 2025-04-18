import MemeList from "@/components/MemeList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meme List",
  description: "View all memes in a simple list format.",
};

export default async function ListPage() {
  return <MemeList />;
}
