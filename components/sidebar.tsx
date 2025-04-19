"use client"

import type React from "react"

import Link from "next/link"
import { useAppStore, type UserRole } from "@/lib/store"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  currentPath: string
  userRole: UserRole
  collapsed: boolean
}

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  requiredRole: UserRole[]
}

export function Sidebar({ currentPath, userRole, collapsed }: SidebarProps) {
  const { toggleSidebar } = useAppStore()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      requiredRole: ["admin", "manager", "viewer"],
    },
    {
      title: "Orders",
      href: "/orders",
      icon: ShoppingCart,
      requiredRole: ["admin", "manager", "viewer"],
    },
    {
      title: "Products",
      href: "/products",
      icon: Package,
      requiredRole: ["admin", "manager"],
    },
    {
      title: "Customers",
      href: "/customers",
      icon: Users,
      requiredRole: ["admin", "manager", "viewer"],
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      requiredRole: ["admin", "manager"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      requiredRole: ["admin"],
    },
  ]

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => item.requiredRole.includes(userRole))

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <h1 className={cn("text-xl font-bold", collapsed && "sr-only")}>eCommerce</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        <TooltipProvider delayDuration={0}>
          {filteredNavItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-2xl px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    currentPath === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    collapsed && "justify-center px-0",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  )
}
