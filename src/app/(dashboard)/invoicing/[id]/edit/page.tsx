"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    number: "",
    client: "",
    amount: "",
    status: "draft",
    dueAt: "",
  });
}
