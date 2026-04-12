import BaseSheet from "@/components/reusable/base-sheet"
import { ConversationChat as AdminConversationChat } from "@/pages/app/admin/messages/_components/conversation-chat"
import { ConversationChat as CustomerConversationChat } from "@/pages/app/customer/messages/_components/conversation-chat"
import { ConversationChat as DriverConversationChat } from "@/pages/app/driver/messages/_components/conversation-chat"

interface ShipmentConversationModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  conversationId: string | null
  userType: "admin" | "customer" | "driver"
}

export function ShipmentConversationModal({
  open,
  setOpen,
  conversationId,
  userType,
}: ShipmentConversationModalProps) {
  const handleClose = () => {
    setOpen(false)
  }

  if (!conversationId) {
    return null
  }

  const renderConversationChat = () => {
    switch (userType) {
      case "admin":
        return <AdminConversationChat conversationId={conversationId} />
      case "customer":
        return <CustomerConversationChat conversationId={conversationId} />
      case "driver":
        return <DriverConversationChat conversationId={conversationId} />
      default:
        return null
    }
  }

  return (
    <BaseSheet
      open={open}
      setOpen={setOpen}
      side="right"
      size="xl"
      title="Shipment Conversation"
      description="View and manage conversation for this shipment"
      contentClassName="p-0 h-full flex flex-col">
      <div className="flex-1 overflow-hidden">{renderConversationChat()}</div>
    </BaseSheet>
  )
}

