"use client"

import { useAnalyticsStore } from "@/lib/store"
import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface SalesChartProps {
  data?: { date: string; amount: number }[];
}

export function SalesChart({ data }: SalesChartProps) {
  const { salesData } = useAnalyticsStore()
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const chartData = data || salesData

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke={isDark ? "#888888" : "#666666"} tick={{ fill: isDark ? "#e4e4e7" : "#18181b" }} />
        <YAxis
          stroke={isDark ? "#888888" : "#666666"}
          tick={{ fill: isDark ? "#e4e4e7" : "#18181b" }}
          tickFormatter={(value) => `$${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333333" : "#e5e5e5"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
            borderColor: isDark ? "#333333" : "#e5e5e5",
            color: isDark ? "#e4e4e7" : "#18181b",
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
        />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
