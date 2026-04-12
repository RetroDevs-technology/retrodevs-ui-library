import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { chatService } from "@/services/chat.service"
import { RequestAdminButton } from "./request-admin-button"
import { RichTextMessage } from "./rich-text-message"
import { useStore } from "@/store"
import type { ChatConversation, ChatMessage } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, MessageCircle, Minus, Search, Send, User, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FloatingChatWindowProps {
  open: boolean
  onClose: () => void
  onRequestAdmin?: () => void
}

export function FloatingChatWindow({ open, onClose, onRequestAdmin }: FloatingChatWindowProps) {
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const { isCustomer, isDriver } = useStore()

  // Get conversations
  const { data: conversationsData, isLoading: conversationsLoading } = useQuery({
    queryKey: [isCustomer ? "customer-conversations" : "driver-conversations"],
    queryFn: () =>
      chatService.getConversations({
        page: 1,
        limit: 50,
      }),
    enabled: open,
    refetchInterval: 10000, // Refetch every 10 seconds
  })

  const conversations = conversationsData?.conversations || []

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conv: ChatConversation) => {
    if (!searchTerm) return true
    return conv.participants.some(
      (p) =>
        p.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  })

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50 transition-all duration-300 shadow-2xl rounded-lg overflow-hidden bg-white border border-gray-200",
        isMinimized ? "w-80 h-14" : "w-[400px] h-[600px]",
        "flex flex-col",
      )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-primary text-white">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Messages</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {!selectedConversation ? (
            // Conversations List View
            <div className="flex flex-col h-full">
              {/* Search and Request Admin */}
              <div className="p-4 border-b space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 rounded-lg border-gray-200"
                  />
                </div>
                {onRequestAdmin && (
                  <RequestAdminButton className="w-full" />
                )}
              </div>

              {/* Conversations List */}
              <ScrollArea className="flex-1">
                {conversationsLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                ) : filteredConversations.length > 0 ? (
                  <div className="p-2 space-y-2">
                    {filteredConversations.map((conversation: ChatConversation) => (
                      <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        onClick={() => setSelectedConversation(conversation)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 text-muted-foreground">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-medium text-gray-600 mb-1">No conversations found</p>
                      <p className="text-sm text-gray-400">
                        {onRequestAdmin
                          ? "Click 'Message Admin' to start a conversation"
                          : "Start a new conversation to get started"}
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          ) : (
            // Chat View
            <ChatView
              conversation={selectedConversation}
              onBack={() => setSelectedConversation(null)}
              conversationQueryKey={isCustomer ? "customer-conversation" : "driver-conversation"}
              conversationsQueryKey={
                isCustomer ? "customer-conversations" : "driver-conversations"
              }
            />
          )}
        </>
      )}
    </div>
  )
}

// Conversation Item Component
interface ConversationItemProps {
  conversation: ChatConversation
  onClick: () => void
}

function ConversationItem({ conversation, onClick }: ConversationItemProps) {
  const { user } = useStore()
  const otherParticipant = conversation.participants.find((p) => p.userId !== user?.id)
  const participantName = otherParticipant?.fullName || "Unknown User"
  const participantEmail = otherParticipant?.email || ""
  const participantType = otherParticipant?.userType

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-lg text-left transition-all",
        "hover:bg-gray-100",
      )}>
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
            {participantName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-sm text-gray-900 truncate">{participantName}</p>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap",
                participantType === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : participantType === "driver"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800",
              )}>
              {participantType === "admin"
                ? "Support"
                : participantType === "driver"
                  ? "Driver"
                  : "User"}
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate">{participantEmail}</p>
          {conversation.lastMessage && (
            <p className="text-xs text-gray-400 truncate mt-1">
              {conversation.lastMessage.text}
            </p>
          )}
        </div>
      </div>
    </button>
  )
}

// Chat View Component
interface ChatViewProps {
  conversation: ChatConversation
  onBack: () => void
  conversationQueryKey: string
  conversationsQueryKey: string
}

function ChatView({
  conversation,
  onBack,
  conversationQueryKey,
  conversationsQueryKey,
}: ChatViewProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useStore()
  const queryClient = useQueryClient()

  const {
    data,
    isSuccess,
    isLoading: conversationLoading,
  } = useQuery({
    queryKey: [conversationQueryKey, conversation.id],
    queryFn: () => chatService.getConversationDetails(conversation.id),
    enabled: !!conversation.id,
  })

  const conversationData = isSuccess ? data.data : null

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => chatService.sendMessage(conversation.id, message),
    onSuccess: () => {
      setNewMessage("")
      queryClient.invalidateQueries({
        queryKey: [conversationsQueryKey],
      })
      queryClient.invalidateQueries({
        queryKey: [conversationQueryKey, conversation.id],
      })
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversationData])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)
    try {
      await sendMessageMutation.mutateAsync(newMessage.trim())
    } finally {
      setIsLoading(false)
    }
  }

  const otherUserMessage = conversationData?.find(
    (message: ChatMessage) => message.sender.id !== user?.id,
  )
  const otherParticipant = otherUserMessage?.sender
  const participantName = otherParticipant?.fullName || "Unknown User"

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Avatar className="w-10 h-10">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {participantName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{participantName}</h3>
          <p className="text-xs text-muted-foreground truncate">{otherParticipant?.userType || "User"}</p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        {conversationLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          </div>
        ) : conversationData && conversationData.length > 0 ? (
          <div className="space-y-3">
            {conversationData.map((message: ChatMessage) => {
              const isCurrentUser = message.sender.id === user?.id
              return (
                <div
                  key={message.id}
                  className={cn("flex gap-2", isCurrentUser ? "justify-end" : "justify-start")}>
                  {!isCurrentUser && (
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {message.sender.fullName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                      isCurrentUser ? "bg-primary text-white" : "bg-gray-100 text-gray-900",
                    )}>
                    <RichTextMessage
                      content={message.text}
                      isCurrentUser={isCurrentUser}
                      className={cn(
                        isCurrentUser ? "text-white" : "text-gray-900",
                      )}
                    />
                    <p
                      className={cn(
                        "text-xs mt-1",
                        isCurrentUser ? "text-primary-foreground/70" : "text-gray-500",
                      )}>
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {isCurrentUser && (
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user?.fullName?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <User className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No messages yet</p>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 h-10"
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            size="sm"
            className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

