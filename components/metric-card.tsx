import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: React.ElementType
  trend?: number
}

export function MetricCard({ title, value, description, icon: Icon, trend }: MetricCardProps) {
  const showTrend = trend !== undefined
  const isPositive = trend && trend > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2">
          <CardDescription>{description}</CardDescription>
          {showTrend && (
            <span
              className={cn("flex items-center text-xs font-medium", isPositive ? "text-green-500" : "text-red-500")}
            >
              {isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {Math.abs(trend).toFixed(1)}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
