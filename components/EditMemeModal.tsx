"use client";

import { useActionState, useEffect } from "react";
import {
  Modal as HeroUIModal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { updateMeme } from "@/actions/memes.action";
import { useFormFields } from "@/hooks/useFormFields";
import { addToast } from "@heroui/toast";
import { cn } from "@heroui/react";
import ShuffleIcon from "@/components/svg/Shuffle";
import SmartTooltip from "@/components/SmartTooltip";

interface ModalProps {
  meme: MemeItem | null;
  isOpen: boolean;
  onOpenChange: () => void;
  onSuccess: () => void;
}

const EditMemeModal = ({
  meme,
  isOpen,
  onOpenChange,
  onSuccess,
}: ModalProps) => {
  const [state, formAction, isPending] = useActionState(updateMeme, null);

  const { fields, handleChange, setForm, resetForm } = useFormFields({
    id: meme?.id ?? "",
    name: meme?.name ?? "",
    image: meme?.image ?? "",
    likes: meme?.likes ?? 0,
  });

  useEffect(() => {
    if (meme) setForm({ ...meme });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meme]);

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      addToast({
        color: "danger",
        title: "Failed to submit form",
        description: typeof state.error === "string" ? state.error : "",
        classNames: {
          base:
            typeof state.error === "object"
              ? cn(["flex flex-col items-start gap-1"])
              : undefined,
        },
        endContent:
          typeof state.error === "object" ? (
            <>
              {Object.keys(state.error).map((fieldName) => (
                <p key={fieldName}>
                  <span className="font-semibold mr-1">
                    {fieldName[0].toUpperCase() + fieldName.slice(1)}:
                  </span>
                  {state.error[fieldName].join("; ")}
                </p>
              ))}
            </>
          ) : null,
      });
    } else {
      addToast({
        color: "success",
        title: "Success",
        description: state?.message ?? "Your changes have been saved.",
      });

      resetForm();
      onOpenChange();
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 100);
  };

  return (
    <HeroUIModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={() => {
        if (!isPending) onOpenChange();
      }}
      onClose={() => {
        resetForm();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Meme</ModalHeader>
            <ModalBody>
              <Form
                className="w-full items-stretch"
                validationBehavior="aria"
                action={formAction}
              >
                <div className="flex flex-col gap-3">
                  <Input
                    isReadOnly
                    name="id"
                    value={fields.id}
                    onChange={handleChange}
                    label="ID"
                    labelPlacement="outside"
                    variant="bordered"
                    description="Meme ID. Read only"
                    isDisabled={isPending}
                  />
                  <Input
                    isRequired
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    label="Meme name"
                    labelPlacement="outside"
                    placeholder="Enter meme name"
                    variant="bordered"
                    description="3-100 characters. Enter meme title"
                    validate={(value) => {
                      if (value.length < 3 || value.length > 100) {
                        return "Name must be 3–100 characters long.";
                      }
                    }}
                    isDisabled={isPending}
                  />
                  <Input
                    isRequired
                    name="image"
                    value={fields.image}
                    onChange={handleChange}
                    label="Meme image url"
                    labelPlacement="outside"
                    placeholder="Enter meme image url"
                    type="url"
                    variant="bordered"
                    description="Direct link to a .jpg/.jpeg image"
                    validate={(value) => {
                      if (!/^https?:\/\/.*\.(jpg|jpeg)$/i.test(value)) {
                        return "Enter a valid .jpg or .jpeg URL.";
                      }
                    }}
                    isDisabled={isPending}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      isRequired
                      name="likes"
                      value={String(fields.likes)}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-", "."].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      label="Meme likes"
                      labelPlacement="outside"
                      placeholder="Enter likes count"
                      type="number"
                      variant="bordered"
                      description="Number from 0 to 99"
                      max={99}
                      min={0}
                      validate={(value) => {
                        const number = Number(value);
                        if (!Number.isInteger(number))
                          return "Likes must be an integer.";
                        if (number < 0 || number > 99) {
                          return "Likes must be between 0 and 99.";
                        }
                      }}
                      isDisabled={isPending}
                    />
                    <SmartTooltip
                      color="primary"
                      content="Randomize Likes number"
                    >
                      <Button
                        isIconOnly
                        color="primary"
                        onPress={() => {
                          const likesObject = {
                            target: {
                              name: "likes",
                              value: generateRandomNumber(),
                            },
                          } as unknown as React.ChangeEvent<HTMLInputElement>;

                          handleChange(likesObject);
                        }}
                      >
                        <ShuffleIcon />
                      </Button>
                    </SmartTooltip>
                  </div>
                </div>
                <div className="flex justify-end gap-2 py-2">
                  <Button
                    isDisabled={isPending}
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    isDisabled={isPending}
                    isLoading={isPending}
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </HeroUIModal>
  );
};

export default EditMemeModal;
