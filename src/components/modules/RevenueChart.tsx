"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const data = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 51000 },
  { month: "Apr", revenue: 47000 },
  { month: "May", revenue: 63000 },
  { month: "Jun", revenue: 58000 },
  { month: "Jul", revenue: 71000 },
  { month: "Aug", revenue: 66000 },
  { month: "Sep", revenue: 74000 },
  { month: "Oct", revenue: 69000 },
  { month: "Nov", revenue: 82000 },
  { month: "Dec", revenue: 91000 },
]

export default function RevenueChart(){
    return(
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Revenue 2024</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"></CartesianGrid>
                    <XAxis dataKey="month" tick={{ fill: "#6b7280" }} ></XAxis>
                    <YAxis tick={{ fill: "#6b7280" }} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                      <Line type="monotone" dataKey="revenue" stroke="#2563eb"  strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}></Line>  
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}