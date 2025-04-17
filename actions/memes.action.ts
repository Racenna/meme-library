"use server";

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

// TODO - update
