"use client";

import { useMemes } from "@/hooks/useMemes";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link } from "@heroui/react";
import MemeListLoader from "./loaders/MemeListLoader";

const MemeList = () => {
  const { memes, isLoading } = useMemes();

  if (isLoading) return <MemeListLoader />;

  if (memes.length === 0)
    return (
      <div className="text-center mt-8">
        <h3 className="text-xl sm:text-2xl">Memes Handbook is empty</h3>
      </div>
    );

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-4 max-w-screen-xl mx-auto">
      {memes.map(({ id, name, image, likes }) => (
        <Card
          key={id}
          className="w-full max-w-sm min-w-60 h-[400px] mx-auto py-4 flex flex-col"
        >
          <CardHeader className="px-4">
            <h3 className="text-xl font-semibold">{name}</h3>
          </CardHeader>
          <CardBody className="flex-grow justify-center items-center overflow-hidden my-2">
            <Image
              alt={name}
              src={image}
              width={360}
              height={232}
              className="w-full object-cover rounded-md border border-gray-200 bg-gray-50"
            />
          </CardBody>
          <CardFooter className="justify-between px-4">
            <span className="text-sm text-gray-600">♥️ {likes} likes</span>
            <Link isExternal underline="hover" showAnchorIcon href={image}>
              Open image
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MemeList;
