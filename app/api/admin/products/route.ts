import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "data", "products.json");

export async function GET() {
  try {
    if (!fs.existsSync(productsFilePath)) {
      return NextResponse.json([], { status: 200 });
    }
    const data = fs.readFileSync(productsFilePath, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read products database" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, products } = body;

    // Simple password validation matches login password
    if (password !== "caldim2026") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid products data format" }, { status: 400 });
    }

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update products database" }, { status: 500 });
  }
}
