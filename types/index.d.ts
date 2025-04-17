interface MenuItem {
  label: string;
  link: string;
}

interface MemeItem {
  id: string;
  name: string;
  image: string;
  likes: number;
}

type GetMemesResponse =
  | {
      success: true;
      memes: MemeItem[];
    }
  | {
      success: false;
      error: string;
    };
