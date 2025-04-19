import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "admin" | "manager" | "viewer"

interface AppState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "ecommerce-admin-storage",
    },
  ),
)

// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inventory: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  image: string
  createdAt: string
}

interface ProductsState {
  products: Product[]
  viewMode: "grid" | "list"
  searchQuery: string
  categoryFilter: string | null
  statusFilter: string | null
  setViewMode: (mode: "grid" | "list") => void
  setSearchQuery: (query: string) => void
  setCategoryFilter: (category: string | null) => void
  setStatusFilter: (status: string | null) => void
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [
    {
      id: "1",
      name: "Premium Headphones",
      description: "Noise-cancelling wireless headphones with premium sound quality",
      price: 249.99,
      category: "Electronics",
      inventory: 45,
      status: "in_stock",
      image: "/placeholder.svg?height=200&width=200",
      createdAt: new Date(2023, 5, 15).toISOString(),
    },
    {
      id: "2",
      name: "Ergonomic Office Chair",
      description: "Adjustable office chair with lumbar support",
      price: 199.99,
      category: "Furniture",
      inventory: 12,
      status: "low_stock",
      image: "/placeholder.svg?height=200&width=200",
      createdAt: new Date(2023, 6, 20).toISOString(),
    },
    {
      id: "3",
      name: "Smart Watch Series 5",
      description: "Fitness tracking, heart rate monitoring, and notifications",
      price: 349.99,
      category: "Electronics",
      inventory: 0,
      status: "out_of_stock",
      image: "/placeholder.svg?height=200&width=200",
      createdAt: new Date(2023, 7, 10).toISOString(),
    },
    {
      id: "4",
      name: "Organic Cotton T-Shirt",
      description: "Soft, breathable cotton t-shirt in various colors",
      price: 29.99,
      category: "Clothing",
      inventory: 150,
      status: "in_stock",
      image: "/placeholder.svg?height=200&width=200",
      createdAt: new Date(2023, 8, 5).toISOString(),
    },
    {
      id: "5",
      name: "Professional Blender",
      description: "High-powered blender for smoothies and food preparation",
      price: 129.99,
      category: "Kitchen",
      inventory: 30,
      status: "in_stock",
      image: "/placeholder.svg?height=200&width=200",
      createdAt: new Date(2023, 9, 12).toISOString(),
    },
  ],
  viewMode: "list",
  searchQuery: "",
  categoryFilter: null,
  statusFilter: null,
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((product) => (product.id === id ? { ...product, ...updates } : product)),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}))

// Orders types
export interface Order {
  id: string
  customer: {
    name: string
    email: string
    id: string
  }
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: number
  date: string
  paymentMethod: string
}

interface OrdersState {
  orders: Order[]
  statusFilter: string | null
  dateRangeFilter: { start: string | null; end: string | null }
  setStatusFilter: (status: string | null) => void
  setDateRangeFilter: (range: { start: string | null; end: string | null }) => void
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [
    {
      id: "ORD-1234",
      customer: {
        name: "Alice Johnson",
        email: "alice@example.com",
        id: "CUST-001",
      },
      status: "delivered",
      total: 349.97,
      items: 3,
      date: new Date(2023, 11, 15).toISOString(),
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1235",
      customer: {
        name: "Bob Smith",
        email: "bob@example.com",
        id: "CUST-002",
      },
      status: "processing",
      total: 129.99,
      items: 1,
      date: new Date(2023, 11, 16).toISOString(),
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-1236",
      customer: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        id: "CUST-003",
      },
      status: "shipped",
      total: 459.98,
      items: 2,
      date: new Date(2023, 11, 17).toISOString(),
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1237",
      customer: {
        name: "Diana Prince",
        email: "diana@example.com",
        id: "CUST-004",
      },
      status: "pending",
      total: 79.99,
      items: 1,
      date: new Date(2023, 11, 18).toISOString(),
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-1238",
      customer: {
        name: "Edward Norton",
        email: "edward@example.com",
        id: "CUST-005",
      },
      status: "cancelled",
      total: 199.99,
      items: 1,
      date: new Date(2023, 11, 19).toISOString(),
      paymentMethod: "Credit Card",
    },
  ],
  statusFilter: null,
  dateRangeFilter: { start: null, end: null },
  setStatusFilter: (status) => set({ statusFilter: status }),
  setDateRangeFilter: (range) => set({ dateRangeFilter: range }),
}))

// Analytics data
export interface AnalyticsState {
  salesData: {
    date: string
    amount: number
  }[]
  userGrowthData: {
    date: string
    users: number
  }[]
  revenueDistribution: {
    category: string
    value: number
  }[]
}

export const useAnalyticsStore = create<AnalyticsState>(() => ({
  salesData: [
    { date: "Jan", amount: 4000 },
    { date: "Feb", amount: 3000 },
    { date: "Mar", amount: 5000 },
    { date: "Apr", amount: 4500 },
    { date: "May", amount: 6000 },
    { date: "Jun", amount: 5500 },
    { date: "Jul", amount: 7000 },
    { date: "Aug", amount: 8000 },
    { date: "Sep", amount: 7500 },
    { date: "Oct", amount: 9000 },
    { date: "Nov", amount: 10000 },
    { date: "Dec", amount: 12000 },
  ],
  userGrowthData: [
    { date: "Jan", users: 500 },
    { date: "Feb", users: 600 },
    { date: "Mar", users: 750 },
    { date: "Apr", users: 900 },
    { date: "May", users: 1100 },
    { date: "Jun", users: 1300 },
    { date: "Jul", users: 1500 },
    { date: "Aug", users: 1700 },
    { date: "Sep", users: 1900 },
    { date: "Oct", users: 2100 },
    { date: "Nov", users: 2300 },
    { date: "Dec", users: 2500 },
  ],
  revenueDistribution: [
    { category: "Electronics", value: 35 },
    { category: "Clothing", value: 25 },
    { category: "Furniture", value: 15 },
    { category: "Kitchen", value: 10 },
    { category: "Books", value: 8 },
    { category: "Other", value: 7 },
  ],
}))

// Customer types
export interface Customer {
  id: string
  name: string
  email: string
  avatar: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
}

interface CustomersState {
  customers: Customer[]
}

export const useCustomersStore = create<CustomersState>(() => ({
  customers: [
    {
      id: "CUST-001",
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "/placeholder-user.jpg",
      totalOrders: 5,
      totalSpent: 749.95,
      lastOrderDate: new Date(2023, 11, 15).toISOString(),
    },
    {
      id: "CUST-002",
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "/placeholder-user.jpg",
      totalOrders: 3,
      totalSpent: 329.97,
      lastOrderDate: new Date(2023, 11, 16).toISOString(),
    },
    {
      id: "CUST-003",
      name: "Charlie Brown",
      email: "charlie@example.com",
      avatar: "/placeholder-user.jpg",
      totalOrders: 8,
      totalSpent: 1259.92,
      lastOrderDate: new Date(2023, 11, 17).toISOString(),
    },
    {
      id: "CUST-004",
      name: "Diana Prince",
      email: "diana@example.com",
      avatar: "/placeholder-user.jpg",
      totalOrders: 2,
      totalSpent: 159.98,
      lastOrderDate: new Date(2023, 11, 18).toISOString(),
    },
    {
      id: "CUST-005",
      name: "Edward Norton",
      email: "edward@example.com",
      avatar: "/placeholder-user.jpg",
      totalOrders: 1,
      totalSpent: 199.99,
      lastOrderDate: new Date(2023, 11, 19).toISOString(),
    },
  ],
}))
