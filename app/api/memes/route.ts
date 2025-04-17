import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/memes.json");

export async function GET() {
  try {
    // dev-only, todo - remove
    // await new Promise((res) => setTimeout(res, 3000));

    const fileData = await fs.readFile(filePath, "utf8");
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
    const newMemes = await request.json();
    await fs.writeFile(filePath, JSON.stringify(newMemes, null, 2));
    return Response.json(
      { success: true, message: "Memes updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT ERROR:", error);
    return Response.json(
      { success: false, error: "Failed to update file" },
      { status: 500 }
    );
  }
}
