import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json(
      { e: "Failed to Fetch Products" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        sku: body.sku,
        category: body.category,
        stock: parseInt(body.stock),
        price: parseFloat(body.price),
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
