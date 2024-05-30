import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log("Form Data: ", data);
    const file: File | null = data.get("file") as unknown as File;
    console.log("File: ", file);

    if (!file) {
      return new Response("Please provide file", { status: 400 });
    }

    data.append("pinataMetadata", JSON.stringify({ name: file.name }));

    // console.log("JWT : ", process.env.PINATA_JWT);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    });

    const ipfsResponse = await res.json();

    console.log("IPFS Response: ", ipfsResponse);

    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully",
      ipfsResponse,
    });
  } catch (error) {
    console.error("Error uploading to IPFS: ", error);
    return new Response("Error uploading to IPFS", { status: 500 });
  }
}
