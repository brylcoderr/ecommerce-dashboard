"use client"

import { useAnalyticsStore } from "@/lib/store"
import { useTheme } from "next-themes"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface UserGrowthChartProps {
  data?: { date: string; users: number }[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  const { userGrowthData } = useAnalyticsStore()
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const chartData = data || userGrowthData

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="date" stroke={isDark ? "#888888" : "#666666"} tick={{ fill: isDark ? "#e4e4e7" : "#18181b" }} />
        <YAxis stroke={isDark ? "#888888" : "#666666"} tick={{ fill: isDark ? "#e4e4e7" : "#18181b" }} />
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333333" : "#e5e5e5"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
            borderColor: isDark ? "#333333" : "#e5e5e5",
            color: isDark ? "#e4e4e7" : "#18181b",
          }}
          formatter={(value: number) => [`${value.toLocaleString()}`, "Users"]}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#4ade80"
          strokeWidth={2}
          dot={{ fill: "#4ade80", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
