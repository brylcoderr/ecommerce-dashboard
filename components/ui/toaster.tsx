"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "group border-border bg-background text-foreground",
          title: "text-foreground text-sm font-medium",
          description: "text-muted-foreground text-sm",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          error: "bg-destructive text-destructive-foreground",
          success: "bg-green-500 text-white",
        },
      }}
    />
  )
}
