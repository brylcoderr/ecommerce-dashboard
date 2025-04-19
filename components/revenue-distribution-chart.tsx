"use client"

import { useAnalyticsStore } from "@/lib/store"
import { useTheme } from "next-themes"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface RevenueDistributionChartProps {
  data?: { category: string; value: number }[];
}

export function RevenueDistributionChart({ data }: RevenueDistributionChartProps) {
  const { revenueDistribution } = useAnalyticsStore()
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57"]

  const chartData = data || revenueDistribution

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
            borderColor: isDark ? "#333333" : "#e5e5e5",
            color: isDark ? "#e4e4e7" : "#18181b",
          }}
          formatter={(value: number) => [`${value}%`, "Revenue"]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
