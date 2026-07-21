"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useOrderContext } from "@/context/OrderContext";

export default function LineItemsStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { products, loading, error } = useProducts();
  const { items, addItem, removeItem, updateQuantity, total } =
    useOrderContext();
  const [search, setSearch] = useState("");

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">Failed to load products.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add line items</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <div className="max-h-48 overflow-y-auto border rounded divide-y mb-4">
        {filtered?.map((product) => (
          <button
            key={product.id}
            onClick={() => addItem(product)}
            disabled={product.stock <= 0}
            className="w-full flex justify-between px-3 py-2 hover:bg-gray-50 disabled:opacity-40"
          >
            <span>{product.name}</span>
            <span className="text-gray-500">
              {" "}
              ${product.price.toFixed(2)} · stock: {product.stock}
            </span>
          </button>
        ))}
      </div>

      {/* Selected items */}

      <h3 className="font-medium mb-2">Order items</h3>
      {items.length === 0 && (
        <p className="text-gray-500 text-sm mb-4">No items added yet.</p>
      )}
      <div className="divide-y border rounded mb-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between px-3 py-2"
          >
            <span className="flex-1">{item.product.name}</span>
            <input
              type="number"
              min={1}
              max={item.product.stock}
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product.id, Number(e.target.value))
              }
              className="w-16 border rounded px-2 py-1 text-center"
            />
            <span className="w-20 text-right">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(item.product.id)}
              className="ml-3 text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <p className="text-right font-semibold mb-4">
        Total: ${total.toFixed(2)}
      </p>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 border rounded">
          Back
        </button>
        <button
          disabled={items.length === 0}
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
