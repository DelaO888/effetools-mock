"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setMaxListeners } from "events";

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      number: (form.elements.namedItem("number") as HTMLInputElement).value,
      client: (form.elements.namedItem("client") as HTMLInputElement).value,
      amount: parseFloat(
        (form.elements.namedItem("amount") as HTMLInputElement).value,
      ),
      status: (form.elements.namedItem("status") as HTMLSelectElement).value,
      dueAt: (form.elements.namedItem("dueAt") as HTMLInputElement).value,
    };

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError("Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/invoicing");
    router.refresh();
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Invoice</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-800">Invoice Number</label>
          <input
            name="number"
            className="border text-gray-800 placeholder:text-gray-400 border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="INV-001"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-800">Client</label>
          <input
            name="client"
            className="border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Acme Corp"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-800">Amount</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            className="border border-gray-300 placeholder:text-gray-400 text-gray-800 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-800">Status</label>
          <select
            name="status"
            className="border placeholder:text-gray-400 border-gray-300 text-gray-800 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-800">Due Date</label>
          <input
            name="dueAt"
            type="date"
            className="border placeholder:text-gray-400 border-gray-300 text-gray-800 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-500 px-6 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
