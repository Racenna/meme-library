import { z } from "zod";

export const memeSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, "Name must contain at least 3 characters")
    .max(100, "Name must contain at most 100 characters"),
  image: z
    .string()
    .url("Must be a .jpg or .jpeg URL")
    .regex(/\.jpe?g/i, "Must be a .jpg or .jpeg URL"),
  likes: z.coerce
    .number()
    .int("Likes must be an integer")
    .min(0, "Likes  must be greater than or equal to 0")
    .max(99, "Likes must be less than or equal to 99"),
});
