"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowLeft,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  DollarSign,
  CheckCheck,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

interface Chat {
  id: string
  participant: {
    name: string
    avatar: string
    isOnline: boolean
    lastSeen: string
  }
  lastMessage: {
    text: string
    timestamp: string
    isRead: boolean
    senderId: string
  }
  unreadCount: number
  item?: {
    title: string
    price: number
    image: string
  }
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  type: "text" | "offer" | "system"
  offer?: {
    amount: number
    status: "pending" | "accepted" | "rejected"
  }
}

export default function ChatPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [offerAmount, setOfferAmount] = useState("")
  const [showOfferForm, setShowOfferForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Mock chat data
  const chats: Chat[] = [
    {
      id: "1",
      participant: {
        name: "Sarah Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
        lastSeen: "now",
      },
      lastMessage: {
        text: "Is the MacBook still available?",
        timestamp: "2024-01-15T10:30:00Z",
        isRead: false,
        senderId: "sarah",
      },
      unreadCount: 2,
      item: {
        title: 'MacBook Pro 13" 2021',
        price: 899,
        image: "/placeholder.svg?height=60&width=60",
      },
    },
    {
      id: "2",
      participant: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
        lastSeen: "2 hours ago",
      },
      lastMessage: {
        text: "Thanks for the quick delivery!",
        timestamp: "2024-01-14T15:45:00Z",
        isRead: true,
        senderId: "mike",
      },
      unreadCount: 0,
      item: {
        title: "Calculus Textbook",
        price: 45,
        image: "/placeholder.svg?height=60&width=60",
      },
    },
  ]

  // Mock messages for selected chat
  const messages: Message[] = [
    {
      id: "1",
      senderId: "sarah",
      text: "Hi! I'm interested in your MacBook Pro. Is it still available?",
      timestamp: "2024-01-15T10:00:00Z",
      type: "text",
    },
    {
      id: "2",
      senderId: currentUser?.id || "1",
      text: "Yes, it's still available! It's in excellent condition.",
      timestamp: "2024-01-15T10:05:00Z",
      type: "text",
    },
    {
      id: "3",
      senderId: "sarah",
      text: "Great! Could you tell me more about the battery health?",
      timestamp: "2024-01-15T10:10:00Z",
      type: "text",
    },
    {
      id: "4",
      senderId: currentUser?.id || "1",
      text: "The battery health is at 94%. I can show you when we meet.",
      timestamp: "2024-01-15T10:15:00Z",
      type: "text",
    },
    {
      id: "5",
      senderId: "sarah",
      text: "Would you accept $850 for it?",
      timestamp: "2024-01-15T10:25:00Z",
      type: "offer",
      offer: {
        amount: 850,
        status: "pending",
      },
    },
    {
      id: "6",
      senderId: "sarah",
      text: "Is the MacBook still available?",
      timestamp: "2024-01-15T10:30:00Z",
      type: "text",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleSendOffer = () => {
    if (offerAmount) {
      // Handle sending offer
      console.log("Sending offer:", offerAmount)
      setOfferAmount("")
      setShowOfferForm(false)
    }
  }

  const handleOfferResponse = (messageId: string, response: "accept" | "reject") => {
    console.log("Offer response:", messageId, response)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)

  return (
    <AuthGuard>
      <div className="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Marketplace
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat List */}
          <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 ${
                    selectedChat === chat.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {chat.participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      {chat.participant.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-slate-900 dark:text-white truncate">{chat.participant.name}</h3>
                        <span className="text-xs text-slate-500">{formatTime(chat.lastMessage.timestamp)}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{chat.lastMessage.text}</p>
                      {chat.item && (
                        <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <img
                            src={chat.item.image || "/placeholder.svg"}
                            alt={chat.item.title}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{chat.item.title}</div>
                            <div className="text-xs text-green-600">${chat.item.price}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    {chat.unreadCount > 0 && <Badge className="bg-blue-500 text-white">{chat.unreadCount}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {selectedChatData?.participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        {selectedChatData?.participant.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedChatData?.participant.name}</h3>
                        <p className="text-sm text-slate-500">
                          {selectedChatData?.participant.isOnline
                            ? "Online"
                            : `Last seen ${selectedChatData?.participant.lastSeen}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md ${msg.senderId === currentUser?.id ? "order-2" : "order-1"}`}
                      >
                        {msg.type === "offer" ? (
                          <Card
                            className={`${msg.senderId === currentUser?.id ? "bg-blue-500 text-white" : "bg-white dark:bg-slate-700"}`}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-4 w-4" />
                                <span className="font-medium">Offer</span>
                              </div>
                              <div className="text-lg font-bold">${msg.offer?.amount}</div>
                              {msg.senderId !== currentUser?.id && msg.offer?.status === "pending" && (
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    onClick={() => handleOfferResponse(msg.id, "accept")}
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleOfferResponse(msg.id, "reject")}
                                  >
                                    Decline
                                  </Button>
                                </div>
                              )}
                              {msg.offer?.status !== "pending" && (
                                <Badge
                                  className="mt-2"
                                  variant={msg.offer?.status === "accepted" ? "default" : "destructive"}
                                >
                                  {msg.offer?.status}
                                </Badge>
                              )}
                            </CardContent>
                          </Card>
                        ) : (
                          <div
                            className={`rounded-lg px-3 py-2 ${
                              msg.senderId === currentUser?.id
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            }`}
                          >
                            <p>{msg.text}</p>
                          </div>
                        )}
                        <div
                          className={`flex items-center gap-1 mt-1 text-xs text-slate-500 ${msg.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
                        >
                          <span>{formatTime(msg.timestamp)}</span>
                          {msg.senderId === currentUser?.id && <CheckCheck className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
                  {showOfferForm && (
                    <Card className="mb-4">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3">Make an Offer</h4>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={offerAmount}
                            onChange={(e) => setOfferAmount(e.target.value)}
                          />
                          <Button onClick={handleSendOffer}>Send Offer</Button>
                          <Button variant="outline" onClick={() => setShowOfferForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowOfferForm(true)}>
                      <DollarSign className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Select a conversation</h3>
                  <p className="text-slate-500">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
