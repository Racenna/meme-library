import MemeTable from "@/components/MemeTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meme Table",
  description: "Manage memes using a table view.",
};

export default function TablePage() {
  return <MemeTable />;
}
