"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const modules = [
  { label: "Home", href: "/" },
  { label: "Invoicing", href: "/invoicing" },
  { label: "Inventory", href: "/inventory" },
  { label: "Purchases", href: "/purchases" },
  { label: "Sales", href: "/sales" },
  { label: "Accounting", href: "/accounting" },
  { label: "HR", href: "/hr" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col">
      <nav className="flex flex-col gap-1 p-4">
        {modules.map((mod) => {
          const isActive =
            pathname === mod.href ||
            (mod.href !== "/" && pathname.startsWith(mod.href));
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {mod.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
