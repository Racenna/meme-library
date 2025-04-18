import { getMemesList } from "@/actions/memes.action";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";

export const useMemes = () => {
  const [memes, setMemes] = useState<MemeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMemes = async () => {
    setIsLoading(true);
    const memesData = await getMemesList();

    if (!memesData.success) {
      addToast({
        title: "Error",
        description: memesData.error,
        color: "danger",
      });
      setIsLoading(false);
      return;
    }

    setMemes(memesData.memes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return { memes, isLoading, refetch: fetchMemes };
};
