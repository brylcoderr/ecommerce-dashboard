"use client"

import { useOrdersStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentOrdersTable } from "@/components/recent-orders-table"
import { MetricCard } from "@/components/metric-card"
import { SalesChart } from "@/components/sales-chart"
import { UserGrowthChart } from "@/components/user-growth-chart"
import { RevenueDistributionChart } from "@/components/revenue-distribution-chart"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  const { orders } = useOrdersStore()

  // Calculate metrics
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
  const ordersToday = orders.filter((order) => {
    const orderDate = new Date(order.date)
    const today = new Date()
    return orderDate.toDateString() === today.toDateString()
  }).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store performance and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sales"
          value={`$${totalSales.toLocaleString()}`}
          description="Total lifetime sales"
          icon={DollarSign}
          trend={+12.5}
        />
        <MetricCard
          title="Orders Today"
          value={ordersToday.toString()}
          description="Orders in the last 24h"
          icon={ShoppingCart}
          trend={+3.2}
        />
        <MetricCard
          title="Active Users"
          value="2,543"
          description="Users in the last 30 days"
          icon={Users}
          trend={+8.1}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          description="Visitors who made a purchase"
          icon={TrendingUp}
          trend={-0.4}
        />
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Over Time</CardTitle>
              <CardDescription>Monthly sales performance for the current year</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <SalesChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly active users for the current year</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <UserGrowthChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Distribution</CardTitle>
              <CardDescription>Revenue breakdown by product category</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <RevenueDistributionChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentOrdersTable />
        </CardContent>
      </Card>
    </div>
  )
}
