"use client"

// Demo user data for development
export const DEMO_USERS = [
  {
    id: "1",
    email: "john.doe@university.edu",
    password: "demo123",
    name: "John Doe",
    year: "Junior",
    major: "Computer Science",
    profilePic: "/placeholder.svg?height=100&width=100",
    trustScore: 4.8,
    joinedDate: "2023-09-01",
  },
  {
    id: "2",
    email: "sarah.smith@university.edu",
    password: "demo123",
    name: "Sarah Smith",
    year: "Senior",
    major: "Business Administration",
    profilePic: "/placeholder.svg?height=100&width=100",
    trustScore: 4.9,
    joinedDate: "2023-08-15",
  },
  {
    id: "3",
    email: "mike.johnson@university.edu",
    password: "demo123",
    name: "Mike Johnson",
    year: "Sophomore",
    major: "Engineering",
    profilePic: "/placeholder.svg?height=100&width=100",
    trustScore: 4.6,
    joinedDate: "2024-01-10",
  },
]

export interface User {
  id: string
  email: string
  name: string
  year: string
  major: string
  profilePic: string
  trustScore: number
  joinedDate: string
}

// Simple auth functions for demo
export const authenticateUser = (email: string, password: string): User | null => {
  const user = DEMO_USERS.find((u) => u.email === email && u.password === password)
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("currentUser")
  return userData ? JSON.parse(userData) : null
}

export const setCurrentUser = (user: User) => {
  localStorage.setItem("currentUser", JSON.stringify(user))
}

export const logout = () => {
  localStorage.removeItem("currentUser")
}

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}
