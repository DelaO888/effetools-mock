"use client";

import { useState } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import { useOrderContext } from "@/context/OrderContext";

export default function CustomerStep({ onNext }: { OnNext: () => void }) {
  const { customers, loading, error } = useCustomers();
  const { customer, setCustomer } = useOrderContext();

  const [search, setSearch] = useState("");

  const filtered = customers?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p>Loading Customers....</p>;
  if (error) return <p>Failed to load customers</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Select Customer</h2>

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3"
      />

      <div className="max-h-64 overflow-y-auto border rounded divide-y">
        {filtered?.map((c) => (
          <button
            key={c.id}
            onClick={() => setCustomer(c)}
            className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
              customer?.id === c.id ? "bg-blue-50" : ""
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <button
        disabled={!customer}
        onClick={onNext}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
