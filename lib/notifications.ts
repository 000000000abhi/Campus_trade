export interface Notification {
  id: string
  type: "message" | "sale" | "price_drop" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  avatar?: string
}

// Mock notifications data
export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from Sarah",
    message: 'About MacBook Pro - "Is this still available?"',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    read: false,
    actionUrl: "/chat/sarah",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    type: "sale",
    title: "Item sold successfully!",
    message: "Your Calculus Textbook has been sold to John Doe",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    read: false,
    actionUrl: "/orders/123",
  },
  {
    id: "3",
    type: "price_drop",
    title: "Price drop alert",
    message: "Gaming Chair is now $100 (was $150)",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: false,
    actionUrl: "/item/gaming-chair-456",
  },
  {
    id: "4",
    type: "system",
    title: "Welcome to CampusTrade!",
    message: "Complete your profile to start trading",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    actionUrl: "/profile",
  },
]

export function getNotifications(): Notification[] {
  return mockNotifications
}

export function getUnreadCount(): number {
  return mockNotifications.filter((n) => !n.read).length
}

export function markAsRead(notificationId: string): void {
  const notification = mockNotifications.find((n) => n.id === notificationId)
  if (notification) {
    notification.read = true
  }
}

export function markAllAsRead(): void {
  mockNotifications.forEach((n) => (n.read = true))
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
}
