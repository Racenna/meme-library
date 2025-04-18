import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/memes.json");

export async function GET() {
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const memes = JSON.parse(fileData);

    return Response.json({ success: true, memes }, { status: 200 });
  } catch (error) {
    console.error("GET ERROR:", error);
    return Response.json(
      { success: false, error: "Failed to read file" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const memes: MemeItem[] = JSON.parse(fileData);
    const updatedMeme: MemeItem = await request.json();
    const index = memes.findIndex((meme) => meme.id === updatedMeme.id);

    if (index === -1) {
      return Response.json(
        {
          success: false,
          error: "Meme not found",
        },
        { status: 500 }
      );
    }

    memes[index] = updatedMeme;

    await fs.writeFile(filePath, JSON.stringify(memes, null, 2), "utf-8");

    return Response.json(
      { success: true, message: "Meme updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT ERROR:", error);

    return Response.json(
      { success: false, error: "Failed to update meme" },
      { status: 500 }
    );
  }
}
