import { NextResponse } from "next/server";
import fs from "fs";
import { getSiteData } from "@/components/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { data } = body;
  const [fileData, dataPath] = getSiteData();

  fileData["portfolio"] = data;
  fs.writeFileSync(dataPath, JSON.stringify(fileData, null, 2));

  return NextResponse.json({ message: "Section added successfully!" });
}
