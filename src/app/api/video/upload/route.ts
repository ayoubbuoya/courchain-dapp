import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  console.log("Form Data: ", formData);
  const video: File = formData.get("video") as File;
  console.log("File: ", video);

  if (!video) {
    return new Response("Please provide video", { status: 400 });
  }

  const bytes = await video.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // get current working directory in next js
  console.log("Current Working Directory: ", process.cwd());

  // upload video to this local storage
  const videoPath = `${process.cwd() + "/storage/videos/" + video.name}`;
  await writeFile(videoPath, buffer);
  console.log(`open ${videoPath} to see the uploaded file`);
  return NextResponse.json({
    success: true,
    message: "Video uploaded successfully",
    videoUrl: videoPath,
  });
}
