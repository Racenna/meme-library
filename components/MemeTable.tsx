"use client";

import { useMemes } from "@/hooks/useMemes";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Key, useCallback, useState } from "react";
import EditIcon from "@/components/svg/Edit";
import SmartTooltip from "@/components/SmartTooltip";
import EditMemeModal from "@/components/EditMemeModal";
import MemeTableLoader from "./loaders/MemeTableLoader";

const MemeTable = () => {
  const { memes, isLoading, refetch } = useMemes();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedMeme, setSelectedMeme] = useState<MemeItem | null>(null);

  const openModalHandler = useCallback(
    (meme: MemeItem) => {
      setSelectedMeme(meme);
      onOpen();
    },
    [onOpen]
  );

  const renderCell = useCallback(
    (meme: MemeItem, columnKey: Key) => {
      const cellValue = meme[columnKey as keyof MemeItem];

      switch (columnKey) {
        case "name":
          return (
            <SmartTooltip
              content={cellValue}
              color="primary"
              className="sm:hidden"
            >
              <p className="max-w-[100px] truncate whitespace-nowrap sm:max-w-none">
                {cellValue}
              </p>
            </SmartTooltip>
          );
        case "image":
          return (
            <SmartTooltip
              content={cellValue}
              color="primary"
              className="sm:hidden"
            >
              <p className="max-w-[100px] truncate whitespace-nowrap sm:max-w-none">
                {cellValue}
              </p>
            </SmartTooltip>
          );
        case "actions":
          return (
            <Tooltip color="primary" content="Edit meme">
              <Button isIconOnly onPress={() => openModalHandler(meme)}>
                <EditIcon />
              </Button>
            </Tooltip>
          );
        default:
          return cellValue;
      }
    },
    [openModalHandler]
  );

  if (isLoading) return <MemeTableLoader />;

  if (memes.length === 0)
    return (
      <div className="text-center mt-8">
        <h3 className="text-xl sm:text-2xl">Memes Handbook is empty</h3>
      </div>
    );

  const columns = [
    ...Object.keys(memes[0]).map((key) => ({
      key,
      label: key.toUpperCase(),
    })),
    { key: "actions", label: "ACTIONS" },
  ];

  return (
    <div className="flex justify-center p-4">
      <Table className="max-w-4xl" isStriped aria-label="Meme Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={memes}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditMemeModal
        meme={selectedMeme}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSuccess={refetch}
      />
    </div>
  );
};

export default MemeTable;
