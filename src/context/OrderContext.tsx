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

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }

  function clearOrder() {
    setCustomer(null);
    setItems([]);
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <OrderContext.Provider
      value={{
        customer,
        items,
        setCustomer,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        total,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrderContext must be used within OrderProvider");
  return context;
}
