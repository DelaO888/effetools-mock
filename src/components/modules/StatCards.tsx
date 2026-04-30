const stats = [
    {label: "Total Revenue", value: "$592,000", change: "+12% vs last year"},
      { label: "Total Orders", value: "1,240", change: "+8% vs last year" },
  { label: "Clients", value: "87", change: "+3 this month" },
  { label: "Pending Invoices", value: "23", change: "4 overdue" },
]

export default function StatCards(){
    return(
        <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                </div>
            ))}
        </div>
    )
}