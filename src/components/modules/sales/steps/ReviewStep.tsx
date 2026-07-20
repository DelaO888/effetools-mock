"use client";

import { useState } from "react";
import { useOrderContext } from "@/context/OrderContext";
import { useRouter } from "next/navigation";

export default function ReviewStep({ onBack }: { onBack: () => void }) {
  const { customer, items, total, clearOrder } = useOrderContext();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customer?.id,
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? "Failed to create order");
      }

      clearOrder();
      router.push("/sales");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review order</h2>

      <p className="mb-2">
        <span className="font-medium">Customer:</span> {customer?.name}
      </p>

      <div className="divide-y border rounded mb-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between px-3 py-2">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <p className="text-right font-semibold mb-4">
        Total: ${total.toFixed(2)}
      </p>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={submitting}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40"
        >
          {submitting ? "Submitting..." : "Confirm order"}
        </button>
      </div>
    </div>
  );
}
