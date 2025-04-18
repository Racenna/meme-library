import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import SheetIcon from "@/components/svg/Sheet";
import ListIcon from "@/components/svg/List";

const MemeEntryCard = ({ label, link }: { label: string; link: string }) => {
  return (
    <Card className="w-full min-h-[260px] max-w-xs justify-between p-4">
      <CardHeader className="flex justify-center">
        {link.includes("table") ? (
          <SheetIcon className="stroke-foreground size-14" />
        ) : (
          <ListIcon className="stroke-foreground size-14" />
        )}
      </CardHeader>
      <div className="text-center">
        <h3 className="text-lg font-bold">{label}</h3>
        <p className="text-sm mt-1 text-default-500">
          {link.includes("table")
            ? "Edit memes in a compact table."
            : "Browse memes with images, likes and quick view."}
        </p>
      </div>
      <CardFooter className="flex justify-center">
        <Button as={Link} color="primary" href={link}>
          {link.includes("table") ? "Open table editor" : "View meme gallery"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemeEntryCard;
