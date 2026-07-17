import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.salesOrder.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const newOrder = await tx.salesOrder.create({
        data: {
          customerId: body.customerId,
          total: body.total,
          status: "pending",
          items: {
            create: body.items.map(
              (item: {
                productId: string;
                quantity: number;
                unitPrice: number;
              }) => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
              }),
            ),
          },
        },
        include: { items: true },
      });

      // 2. Decrement stock for each product
      for (const item of body.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
