import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) return NextResponse.json({ error: "No file" });

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET;
  
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  const formData = new FormData();
  formData.append("file", new Blob([bytes], { type: file.type }));
  formData.append("upload_preset", preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const json = await res.json();
  return NextResponse.json(json);
}
