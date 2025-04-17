"use server";

const devUrl = "http://localhost:3000";

export async function getMemesList(): Promise<GetMemesResponse> {
  try {
    const res = await fetch(`${devUrl}/api/memes`, { cache: "no-cache" });

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
