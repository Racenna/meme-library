"use server";

import { memeSchema } from "@/constants/schemas";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000";

export async function getMemesList(): Promise<GetMemesResponse> {
  try {
    const res = await fetch(`${baseUrl}/api/memes`, {
      cache: "no-cache",
    });

    return await res.json();
  } catch (error) {
    console.error("Get memes list error:", error);

    return {
      success: false,
      error: "Failed to get memes list",
    };
  }
}

export async function updateMeme(_: unknown, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const result = memeSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    };
  }

  const updated = result.data;

  try {
    const res = await fetch(`${baseUrl}/api/memes`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });

    return await res.json();
  } catch (error) {
    console.error("Get memes list error:", error);

    return {
      success: false,
      error: "Failed to update meme",
    };
  }
}
