import { FloatingMessageButton } from "./floating-message-button"
import { FloatingChatWindow } from "./floating-chat-window"
import { RequestAdminButton } from "./request-admin-button"
import { useStore } from "@/store"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { chatService } from "@/services/chat.service"

export function FloatingMessageWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { isCustomer, isDriver, isAuthenticated } = useStore()

  // Only show widget for customers and drivers (not admins)
  if (!isAuthenticated || !(isCustomer || isDriver)) {
    return null
  }

  // Get unread message count (optional enhancement)
  const { data: conversations } = useQuery({
    queryKey: [isCustomer ? "customer-conversations" : "driver-conversations"],
    queryFn: () =>
      chatService.getConversations({
        page: 1,
        limit: 50,
      }),
    enabled: isAuthenticated && (isCustomer || isDriver),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Calculate unread count (if lastMessage exists and sender is not current user)
  const unreadCount = conversations?.conversations?.filter((conv) => {
    if (!conv.lastMessage) return false
    // You might want to add a proper unread tracking field from backend
    return true // Placeholder - implement proper unread tracking
  }).length || 0

  const handleRequestAdmin = () => {
    // This will be called when the button in the chat window is clicked
    // The RequestAdminButton component handles the API call
  }

  return (
    <>
      <FloatingMessageButton
        onClick={() => setIsChatOpen(!isChatOpen)}
        unreadCount={unreadCount}
      />
      <FloatingChatWindow
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onRequestAdmin={handleRequestAdmin}
      />
    </>
  )
}

