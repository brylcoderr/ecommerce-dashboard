import { DashboardLayout } from "@/components/dashboard-layout"
import { OrdersManagement } from "@/components/orders-management"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrdersManagement />
    </DashboardLayout>
  )
} 