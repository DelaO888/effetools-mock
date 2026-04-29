import Link from "next/link";


const modules = [
        {label: "Home", href: "/"},
          { label: "Invoicing", href: "/invoicing" },
  { label: "Inventory", href: "/inventory" },
  { label: "Purchases", href: "/purchases" },
  { label: "Sales", href: "/sales" },
  { label: "Accounting", href: "/accounting" },
  { label: "HR", href: "/hr" },
    ]

export default function Sidebar(){
    return(
        <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col">
            <nav className="flex flex-col gap-1 p-4">
                {modules.map((mod) => (
                    <Link key={mod.href} href={mod.href} className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                        {mod.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}