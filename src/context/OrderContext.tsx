"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderContextType {
  customer: Customer | null;
  items: OrderItem[];
  setCustomer: (customer: Customer | null) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearOrder: () => void;
  total: number;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }
}
