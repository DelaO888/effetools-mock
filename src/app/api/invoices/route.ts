import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const invoice = await prisma.invoice.create({
      data: {
        number: body.number,
        client: body.client,
        amount: body.amount,
        status: body.status,
        dueAt: new Date(body.dueAt),
      },
    });
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 },
    );
  }
}
