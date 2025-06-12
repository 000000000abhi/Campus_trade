"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning" | "default"

interface ToastData {
  id: string
  title?: string
  description: string
  type: ToastType
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

interface ToastContextType {
  toasts: ToastData[]
  addToast: (toast: Omit<ToastData, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = (toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.type}
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id)
            }}
            duration={toast.duration || 5000}
          >
            <div className="flex gap-3">
              {toast.type === "success" && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />}
              {toast.type === "error" && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
              {toast.type === "info" && <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              {toast.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
              <div className="flex-1">
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                <ToastDescription>{toast.description}</ToastDescription>
              </div>
            </div>
            {toast.action && (
              <ToastAction altText={toast.action.label} onClick={toast.action.onClick}>
                {toast.action.label}
              </ToastAction>
            )}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastContextProvider")
  }
  return context
}
