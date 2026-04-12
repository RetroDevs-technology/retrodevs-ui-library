import { Button } from "@/components/ui"
import { chatService } from "@/services/chat.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { useStore } from "@/store"

interface RequestAdminButtonProps {
  onSuccess?: () => void
  className?: string
}

export function RequestAdminButton({ onSuccess, className }: RequestAdminButtonProps) {
  const queryClient = useQueryClient()
  const { isCustomer, isDriver } = useStore()

  const createConversationMutation = useMutation({
    mutationFn: () =>
      chatService.createConversation({
        participants: [], // Empty array - backend will assign admin automatically
        conversationType: isCustomer ? "customer_service" : "support",
      }),
    onSuccess: () => {
      toast.success("Conversation created! You can now chat with an admin.")

      // Invalidate conversations queries
      if (isCustomer) {
        queryClient.invalidateQueries({
          queryKey: ["customer-conversations"],
        })
      } else if (isDriver) {
        queryClient.invalidateQueries({
          queryKey: ["driver-conversations"],
        })
      }

      onSuccess?.()
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create conversation. Please try again.",
      )
    },
  })

  return (
    <Button
      onClick={() => createConversationMutation.mutate()}
      disabled={createConversationMutation.isPending}
      className={className}
      size="sm">
      {createConversationMutation.isPending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Creating...
        </>
      ) : (
        <>
          <MessageCircle className="w-4 h-4 mr-2" />
          Message Admin
        </>
      )}
    </Button>
  )
}

