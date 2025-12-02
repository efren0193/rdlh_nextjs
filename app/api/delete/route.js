import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json({ error: "No publicId provided" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;

    // 🔐 Auth Basic API Key + API Secret
    const authHeader =
      "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const formData = new URLSearchParams();
    formData.append("public_ids[]", publicId);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const json = await res.json();
    return NextResponse.json(json);

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
