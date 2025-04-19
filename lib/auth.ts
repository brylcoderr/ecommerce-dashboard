import type { UserRole } from "@/lib/store"

// Mock user data - in a real application, this would come from a database
export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin" as UserRole,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@example.com",
    password: "manager123", // In a real app, this would be hashed
    role: "manager" as UserRole,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@example.com",
    password: "viewer123", // In a real app, this would be hashed
    role: "viewer" as UserRole,
    avatar: "/placeholder-user.jpg",
  },
]

// Extend next-auth types
declare module "next-auth" {
  interface User {
    id: string
    role: UserRole
    avatar: string
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: UserRole
      avatar: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    avatar: string
  }
}
