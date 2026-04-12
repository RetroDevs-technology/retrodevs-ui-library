import SearchableInput from "@/components/forms/input-autocomplete"
import BaseModal from "@/components/reusable/base-modal"
import { Button } from "@/components/ui"
import { chatService } from "@/services/chat.service"
import type { AvailableUser, CreateConversationResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MessageCircle, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { useStore } from "@/store"
import { FormBase, FormField } from "./base-form"
import { BaseSelect } from "./base-select"

interface RequestAdminMessageModalProps {
  open: boolean
  onClose: () => void
}

const schema = z.object({
  selectedAdmin: z.object({
    id: z.string(),
    fullName: z.string().nullable(),
    email: z.string(),
  }),
  conversationType: z.enum(["support", "customer_service"]),
})

export type RequestAdminMessageModalFormValues = z.infer<typeof schema>

export function RequestAdminMessageModal({ open, onClose }: RequestAdminMessageModalProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isCustomer, isDriver } = useStore()

  const form = useForm<RequestAdminMessageModalFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      selectedAdmin: {
        id: "",
        fullName: null,
        email: "",
      },
      conversationType: isCustomer ? "customer_service" : "support",
    },
  })

  // Fetch available users (admins)
  const { data: availableUsersData } = useQuery({
    queryKey: ["available-admins"],
    queryFn: async () => {
      const response = await chatService.getAvailableUsers()
      // Filter to only show admin users
      return {
        users: response.users.filter((user: AvailableUser) => user.userType === "admin"),
      }
    },
  })

  const selectedAdmin = form.watch("selectedAdmin")

  const createConversationMutation = useMutation({
    mutationFn: (data: { participants: string[]; conversationType?: string }) =>
      chatService.createConversation({
        participants: data.participants,
        conversationType: data.conversationType as "support" | "customer_service",
      }),
    onSuccess: (conversation: CreateConversationResponse) => {
      toast.success("Conversation created successfully!")
      
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

      // Navigate to messages page or close modal
      const messageRoute = isCustomer ? "/app/customer/messages" : "/app/driver/messages"
      navigate(messageRoute)
      onClose()
      
      // Reset form
      form.reset()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create conversation")
    },
  })

  function onSubmit(data: RequestAdminMessageModalFormValues) {
    if (!data.selectedAdmin.id) {
      toast.error("Please select an admin")
      return
    }

    createConversationMutation.mutate({
      participants: [data.selectedAdmin.id],
      conversationType: data.conversationType,
    })
  }

  const admins = availableUsersData?.users || []

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Message Admin"
      description="Select an admin to start a conversation with"
      size="small"
      hasFooter
      footerContent={
        <div className="flex gap-3 justify-end p-4">
          <Button variant="outline" onClick={onClose} className="px-6">
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={!selectedAdmin.id || createConversationMutation.isPending}
            className="px-6">
            {createConversationMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </div>
            ) : (
              "Start Conversation"
            )}
          </Button>
        </div>
      }>
      <FormBase form={form} onSubmit={onSubmit}>
        <div className="space-y-6 p-4">
          {/* Conversation Type Selection */}
          <div className="space-y-3">
            <FormField
              form={form}
              name="conversationType"
              label="Conversation Type"
              className="text-sm font-semibold text-gray-900">
              {(field) => (
                <BaseSelect
                  items={[
                    {
                      label: "Support",
                      value: "support",
                    },
                    {
                      label: "Customer Service",
                      value: "customer_service",
                    },
                  ]}
                  placeholder="Select conversation type"
                  {...field}
                  value={form.getValues("conversationType")}
                  onChange={(value: string) => {
                    form.setValue(
                      "conversationType",
                      value as "support" | "customer_service",
                    )
                  }}
                  triggerClassName="w-full"
                />
              )}
            </FormField>
          </div>

          {/* Search Admins */}
          <div className="space-y-3">
            <FormField
              form={form}
              name="selectedAdmin"
              label="Select Admin"
              className="text-sm font-semibold text-gray-900">
              {(field) => (
                <SearchableInput
                  title="Select Admin"
                  placeholder="Search admins by name or email..."
                  {...field}
                  valueKey="id"
                  labelKey={(user: AvailableUser) => user.fullName || user.email}
                  fetchKey="users"
                  onSelect={(user) => {
                    if (user && typeof user !== "string") {
                      form.setValue("selectedAdmin", {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                      })
                    }
                  }}
                  onSearch={async (query: string) => {
                    // Custom search function to filter admins
                    const response = await chatService.getAvailableUsers()
                    const admins = response.users.filter(
                      (user: AvailableUser) =>
                        user.userType === "admin" &&
                        (user.fullName?.toLowerCase().includes(query.toLowerCase()) ||
                          user.email.toLowerCase().includes(query.toLowerCase())),
                    )
                    return admins
                  }}
                />
              )}
            </FormField>
          </div>

          {/* Selected Admin Display */}
          {selectedAdmin.id && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {selectedAdmin.fullName || "Admin"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{selectedAdmin.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Admins List (if no search) */}
          {admins.length > 0 && !selectedAdmin.id && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-900">Available Admins</p>
              <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-2">
                {admins.slice(0, 5).map((admin: AvailableUser) => (
                  <button
                    key={admin.id}
                    type="button"
                    onClick={() => {
                      form.setValue("selectedAdmin", {
                        id: admin.id,
                        fullName: admin.fullName,
                        email: admin.email,
                      })
                    }}
                    className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {admin.fullName || "Admin"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{admin.email}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {admins.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500">No admins available at the moment</p>
            </div>
          )}
        </div>
      </FormBase>
    </BaseModal>
  )
}

