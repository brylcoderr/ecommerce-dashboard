"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/sales-chart"
import { UserGrowthChart } from "@/components/user-growth-chart"
import { RevenueDistributionChart } from "@/components/revenue-distribution-chart"
import { useAnalyticsStore } from "@/lib/store"

export function AnalyticsDashboard() {
  const { salesData, userGrowthData, revenueDistribution } = useAnalyticsStore()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your store's performance and growth</p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CardDescription>Last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$75,000.00</div>
                <p className="text-xs text-muted-foreground">+20.1% from last year</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                <CardDescription>Last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,500</div>
                <p className="text-xs text-muted-foreground">+15.3% from last year</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <CardDescription>Last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,320</div>
                <p className="text-xs text-muted-foreground">+12.5% from last year</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales for the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart data = {salesData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>By product category</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueDistributionChart data =  {revenueDistribution} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
              <CardDescription>Monthly sales for the last 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SalesChart data={salesData} />
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RevenueDistributionChart data={revenueDistribution} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Best Selling Products</CardTitle>
                <CardDescription>Top 5 products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Smartphone XS", revenue: 12500, percentage: 22 },
                    { name: "Laptop Pro", revenue: 9800, percentage: 18 },
                    { name: "Wireless Headphones", revenue: 7500, percentage: 14 },
                    { name: "Smart Watch", revenue: 5200, percentage: 10 },
                    { name: "Tablet Air", revenue: 4800, percentage: 9 },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">${product.revenue.toLocaleString()}</div>
                      </div>
                      <div className="text-sm font-medium">{product.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New customer acquisitions over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserGrowthChart data={userGrowthData} />
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Returning vs. new customers</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">68%</div>
                        <div className="text-xs text-muted-foreground">Retention Rate</div>
                      </div>
                    </div>
                    {/* This is a placeholder for a donut chart - in a real app you'd use a proper chart component */}
                    <div className="h-full w-full rounded-full border-8 border-primary opacity-25"></div>
                    <div className="absolute inset-0 h-full w-full rounded-full border-8 border-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 68%, 0 68%)' }}></div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="font-medium">Returning</div>
                      <div className="text-2xl font-bold">68%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">New</div>
                      <div className="text-2xl font-bold">32%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Breakdown by customer lifetime value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { segment: "Premium", customers: 320, percentage: 15, color: "bg-green-500" },
                    { segment: "Standard", customers: 850, percentage: 40, color: "bg-blue-500" },
                    { segment: "Basic", customers: 650, percentage: 30, color: "bg-yellow-500" },
                    { segment: "One-time", customers: 320, percentage: 15, color: "bg-gray-500" },
                  ].map((segment) => (
                    <div key={segment.segment} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{segment.segment}</div>
                        <div className="text-sm text-muted-foreground">{segment.customers} customers ({segment.percentage}%)</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div
                          className={`h-2 rounded-full ${segment.color}`}
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 