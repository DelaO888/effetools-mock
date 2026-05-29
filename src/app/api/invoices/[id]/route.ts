import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: {
        number: body.number,
        client: body.client,
        amount: body.amount,
        status: body.status,
        dueAt: new Date(body.dueAt),
      },
    });

    return NextResponse.json(invoice);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.invoice.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 },
    );
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
    });
    if (!invoice)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
      { status: 500 },
    );
  }
}
