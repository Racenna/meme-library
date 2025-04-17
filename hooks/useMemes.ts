import { getMemesList } from "@/actions/memes.action";
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";

export const useMemes = () => {
  const [memes, setMemes] = useState<MemeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMemes = async () => {
      const memesData = await getMemesList();

      if (!memesData.success) {
        if (isMounted) {
          addToast({
            title: "Error",
            description: memesData.error,
            color: "danger",
          });
          setIsLoading(false);
        }
        return;
      }

      if (isMounted) {
        setMemes(memesData.memes);
        setIsLoading(false);
      }
    };

    fetchMemes();

    return () => {
      isMounted = false;
    };
  }, []);

  return { memes, isLoading };
};
